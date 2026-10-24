#!/usr/bin/env python3
"""Check every entry of a BibTeX file against an authoritative source.

    python3 src/reporting/verify_references.py [BIB] [--json OUT]

BIB   default papers/slm-textbooks/sections/references.bib

For each entry the script asks the source that fits the entry:

    eprint field or     the arXiv API, by identifier
    "arXiv:ID" in note
    doi field           Crossref, by DOI
    url in note         an HTTP GET, which must return a page
    anything else       Crossref by title, then arXiv by title, and for
                        books Open Library

and prints the entry's own title, first author, and year beside what the
source says, with a title similarity score. A line marked "ok" has a title
similarity of at least 0.90, the same first-author surname, and a year within
one of the source. Everything else is marked "REVIEW" and needs a person.

The script only finds what a source says. It cannot tell whether the cited
work supports the sentence that cites it, and it cannot check a venue that no
source lists (ICLR, NeurIPS, NDSS); check those by hand.

Standard library only. Needs network access. Calls are spaced out to respect
the arXiv API terms.
"""
import argparse
import difflib
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DEFAULT_BIB = REPO / "papers" / "slm-textbooks" / "sections" / "references.bib"
UA = "Mozilla/5.0 (compatible; dgx-eval-reference-check/1.0)"
ATOM = "{http://www.w3.org/2005/Atom}"
ARXIV = "{http://arxiv.org/schemas/atom}"


# ---------------------------------------------------------------- BibTeX ----
def read_value(body, pos):
    """Read one field value starting at pos; return (text, next_pos)."""
    if body[pos] == "{":
        depth, j = 1, pos + 1
        while j < len(body) and depth:
            depth += {"{": 1, "}": -1}.get(body[j], 0)
            j += 1
        return body[pos + 1:j - 1], j
    if body[pos] == '"':
        j = pos + 1
        while body[j] != '"':
            j += 1
        return body[pos + 1:j], j + 1
    m = re.compile(r"[^,\s]+").match(body, pos)
    return m.group(0), m.end()


def parse_bib(text):
    entries = []
    for m in re.finditer(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", text):
        i, depth, j = m.end(), 1, m.end()
        while j < len(text) and depth:
            depth += {"{": 1, "}": -1}.get(text[j], 0)
            j += 1
        body, pos, fields = text[i:j - 1], 0, {}
        field = re.compile(r"\s*,?\s*(\w+)\s*=\s*")
        while True:
            fm = field.match(body, pos)
            if not fm:
                break
            value, pos = read_value(body, fm.end())
            fields[fm.group(1).lower()] = value
        entries.append({"key": m.group(2), "type": m.group(1).lower(), **fields})
    return entries


def plain(s):
    """Drop BibTeX braces and LaTeX accents so two spellings compare equal."""
    s = re.sub(r"\\url\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\\[`'^\"~=.]\{?(\w)\}?", r"\1", s)
    s = s.replace("\\&", "&").replace("{", "").replace("}", "")
    return re.sub(r"\s+", " ", s).strip()


def norm(s):
    s = unicodedata.normalize("NFKD", plain(s)).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def surname(author):
    a = plain(author.split(" and ")[0]).strip()
    return a.split(",")[0].strip() if "," in a else a.split()[-1]


def similarity(a, b):
    return difflib.SequenceMatcher(None, norm(a), norm(b)).ratio()


# --------------------------------------------------------------- sources ----
def get(url, tries=3, timeout=25):
    for n in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.status, r.geturl(), r.read(400_000).decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and n < tries - 1:
                time.sleep(5 * (n + 1))
                continue
            return e.code, url, ""
        except Exception as e:  # network error, timeout, bad TLS
            if n == tries - 1:
                return 0, url, str(e)
            time.sleep(2)


def arxiv(query):
    """Return a list of {title, authors, year, venue, doi, id} for a query."""
    time.sleep(3.2)  # arXiv asks for one call per three seconds
    status, _, body = get("https://export.arxiv.org/api/query?" + query)
    if status != 200:
        return []
    out = []
    for e in ET.fromstring(body).findall(ATOM + "entry"):
        title = re.sub(r"\s+", " ", e.findtext(ATOM + "title", ""))
        if title == "Error":
            continue
        out.append({
            "title": title,
            "authors": [a.findtext(ATOM + "name") for a in e.findall(ATOM + "author")],
            "year": (e.findtext(ATOM + "published") or "")[:4],
            "venue": e.findtext(ARXIV + "journal_ref") or "",
            "doi": e.findtext(ARXIV + "doi") or "",
            "id": e.findtext(ATOM + "id", "").rsplit("/abs/", 1)[-1],
        })
    return out


def crossref_item(m):
    issued = (m.get("issued") or {}).get("date-parts") or [[""]]
    return {
        "title": (m.get("title") or [""])[0],
        "authors": [f"{a.get('given', '')} {a.get('family', a.get('name', ''))}".strip()
                    for a in m.get("author", [])],
        "year": str(issued[0][0] or ""),
        "venue": (m.get("container-title") or [""])[0],
        "doi": m.get("DOI", ""),
        "extra": " ".join(x for x in (
            f"vol {m['volume']}" if m.get("volume") else "",
            f"no {m['issue']}" if m.get("issue") else "",
            f"pp {m['page']}" if m.get("page") else "") if x),
    }


def crossref_doi(doi):
    time.sleep(0.3)
    status, _, body = get("https://api.crossref.org/works/" + urllib.parse.quote(doi))
    return [crossref_item(json.loads(body)["message"])] if status == 200 else []


def crossref_search(title, author):
    time.sleep(0.3)
    q = urllib.parse.urlencode({"query.bibliographic": f"{plain(title)} {author}", "rows": 5})
    status, _, body = get("https://api.crossref.org/works?" + q)
    if status != 200:
        return []
    return [crossref_item(m) for m in json.loads(body)["message"]["items"]]


def openlibrary(title, author):
    time.sleep(0.3)
    q = urllib.parse.urlencode({
        "title": plain(title).split(":")[0], "author": author, "limit": 5,
        "fields": "title,author_name,first_publish_year,publisher"})
    status, _, body = get("https://openlibrary.org/search.json?" + q)
    if status != 200:
        return []
    return [{"title": d.get("title", ""), "authors": d.get("author_name", []),
             "year": str(d.get("first_publish_year", "")),
             "venue": "; ".join(d.get("publisher", [])[:4]), "doi": ""}
            for d in json.loads(body).get("docs", [])]


def page(url):
    status, final, body = get(url)
    m = re.search(r"<title[^>]*>(.*?)</title>", body, re.S | re.I)
    return status, final, re.sub(r"\s+", " ", m.group(1)).strip() if m else ""


# ----------------------------------------------------------------- check ----
def best(candidates, title, last):
    """Pick the candidate closest to the entry's title, break ties on surname."""
    def score(c):
        s = similarity(title, c["title"])
        if any(norm(a).split()[-1:] == norm(last).split()[-1:] for a in c["authors"][:1]):
            s += 0.001
        return s
    return max(candidates, key=score) if candidates else None


def check(entry):
    title = entry.get("title", "")
    last = surname(entry["author"]) if "author" in entry else ""
    note = entry.get("note", "")
    url = (re.search(r"\\url\{([^}]+)\}", note) or [None, None])[1]
    result = {"key": entry["key"], "type": entry["type"], "bib_title": plain(title),
              "bib_author": last, "bib_year": entry.get("year", ""), "source": "", "match": None}

    # ieeetr prints no eprint field, so the bibliography also carries the
    # identifier in note = {arXiv:...}; either spelling selects the arXiv API.
    eprint = entry.get("eprint") or (re.search(r"arXiv:(\d{4}\.\d{4,5})", note) or [None, None])[1]
    if eprint:
        c = arxiv("id_list=" + eprint)
        result["source"] = f"arXiv {eprint}"
        result["match"] = c[0] if c else None
    elif "doi" in entry:
        c = crossref_doi(entry["doi"])
        result["source"] = f"Crossref {entry['doi']}"
        result["match"] = c[0] if c else None
    elif url:
        # A web page or repository: the URL must answer, and its <title> is shown.
        status, final, ptitle = page(url)
        result["source"] = f"GET {url}"
        result["page"] = {"status": status, "final": final, "title": ptitle}
        result["match"] = {"title": ptitle or title, "authors": [plain(entry["author"])],
                           "year": entry.get("year", ""), "venue": "", "doi": ""}
    else:
        pool = []
        if entry["type"] == "book":
            pool += [dict(c, via="Open Library") for c in openlibrary(title, last)]
        pool += [dict(c, via="Crossref") for c in crossref_search(title, last)]
        words = norm(title).split()[:9]
        if entry["type"] != "book" and words:
            q = urllib.parse.urlencode({
                "search_query": " AND ".join("ti:" + w for w in words), "max_results": 3})
            pool += [dict(c, via="arXiv") for c in arxiv(q)]
        m = best(pool, title, last)
        result["source"] = f"search ({m['via']})" if m else "search (no result)"
        result["match"] = m

    m = result["match"]
    if m:
        result["title_similarity"] = round(similarity(title, m["title"]), 2)
        result["author_match"] = bool(m["authors"]) and (
            norm(last) in norm(m["authors"][0]) or norm(m["authors"][0]) in norm(last))
        try:
            result["year_gap"] = abs(int(m["year"]) - int(entry.get("year", 0)))
        except ValueError:
            result["year_gap"] = None
    ok = (m is not None and result["title_similarity"] >= 0.90
          and (result["author_match"] or entry.get("author", "").startswith("{"))
          and result.get("year_gap") in (0, 1, None))
    if "page" in result:
        ok = ok and result["page"]["status"] == 200
    result["verdict"] = "ok" if ok else "REVIEW"
    return result


def show(r):
    print(f"[{r['verdict']:6}] {r['key']}  ({r['type']})  via {r['source']}")
    print(f"         bib : {r['bib_title']} | {r['bib_author']} | {r['bib_year']}")
    m = r["match"]
    if not m:
        print("         src : nothing found")
        return
    who = ", ".join(m["authors"][:3]) + (" ..." if len(m["authors"]) > 3 else "")
    print(f"         src : {m['title']} | {who} | {m['year']}")
    bits = [f"similarity {r.get('title_similarity')}", f"first author {'yes' if r.get('author_match') else 'NO'}",
            f"year gap {r.get('year_gap')}"]
    if m.get("venue"):
        bits.append(f"venue: {m['venue']} {m.get('extra', '')}".strip())
    if m.get("doi"):
        bits.append(f"doi {m['doi']}")
    if "page" in r:
        bits.append(f"HTTP {r['page']['status']}")
    print("         " + "; ".join(bits))


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("bib", nargs="?", default=str(DEFAULT_BIB))
    ap.add_argument("--json", help="also write the results to this file")
    args = ap.parse_args()
    entries = parse_bib(Path(args.bib).read_text())
    print(f"{len(entries)} entries in {args.bib}\n")
    results = []
    for e in entries:
        r = check(e)
        results.append(r)
        show(r)
    bad = [r["key"] for r in results if r["verdict"] != "ok"]
    print(f"\n{len(results) - len(bad)} ok, {len(bad)} to review" + (": " + ", ".join(bad) if bad else ""))
    if args.json:
        Path(args.json).write_text(json.dumps(results, indent=2))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
