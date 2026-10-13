#!/usr/bin/env python3
r"""Score every chapter of a generated textbook against the book's content rules.

    python3 src/scoring/chapter_quality.py <book | chapters-dir | chapter.md> ... [options]

    --json FILE           write every raw metric and sub-score, for calibration
    --csv FILE            write one flat row per chapter
    --graph FILE          learning-graph.json to take the book's maximum CIS from
                          (default: <docs>/learning-graph/learning-graph.json; with
                          several books, leave it unset so each uses its own)
    --target-grade N      reading grade the book is written for (default 9.0, Algebra I)
    --reading-engine E    auto | textstat | builtin (default auto)
    --mascot M            auto | on | off (default auto: score the mascot rules only
                          when the book defines a mascot)
    --raw                 also print the raw-metrics table (words, diagrams, grade ...)

A <book> is a directory holding docs/chapters/, or docs/models/<model>/. Give
several and the output ends with a comparison table.

Every number here is a count a program can verify: words, headings, blocks,
fields, regular-expression hits. None of it needs a model to judge, and a
rerun on the same files always gives the same score. What it measures is
conformance to the written rules, not whether the mathematics is correct.

How the score is built (the scale is 0-100; weights are in WEIGHTS below):

  budget     Does the chapter hold the words, worked examples, and non-text
             elements that its own Concept Impact Scores call for? Targets come
             from CONTENT-GENERATION-GUIDE.md, "Concept Depth & Word-Count
             Targets". Full credit sits on a wide plateau, so a chapter is never
             rewarded for exceeding its budget.
  placement  Is each diagram introduced by prose, under a #### Diagram: header,
             after the terms it uses are defined, near the text it illustrates,
             and spread through the chapter?
  spec       Does each diagram specification carry the fields and the precision
             that skills/chapter-content-generator/references/
             microsim-specification-rules.md (R1-R14) asks for?
  format     Markdown rules from the guide (blank line before lists, four-space
             admonition bodies, resolvable images), heading structure, leaked
             generator scaffolding, and, where a mascot is defined, its placement
             rules. $...$, \(...\), $$...$$ and \[...\] are all accepted as math;
             mkdocs.yml renders each of them.
  padding    Repeated sentences, near-duplicate paragraphs, compressibility,
             filler phrases, and specs that are copies of each other.
  reader     Reading grade near the target, sentence length, equations present,
             worked-example density, variety of element types.

Each sub-score is a conformance measure against the chapter's own expectation,
never a raw count, and it saturates. The book-level numbers are what carry
"consistency over absolute quality":

  level        mean chapter score, unwritten chapters counted as 0
  consistency  100 x (1 - coefficient of variation of the written chapters)
  composite    level x consistency / 100

One metric is reported and deliberately not scored: how many equations are well
formed and how many are malformed (equations_ok, equations_bad, and the kinds of
fault in equation_problems; --json also lists each malformed one under
math_issues). Malformed means the site's renderer would show source text instead
of math: a delimiter that never closes, TeX that KaTeX cannot parse, or TeX
commands left in the prose with no delimiters. It is a syntax check, so it says
nothing about whether the mathematics is right. See the Equations section.

Standard library only. textstat is used for reading level when it is installed.
"""
from __future__ import annotations

import argparse
import csv
import json
import math
import re
import statistics
import sys
import zlib
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from score_chapters import PLACEHOLDER, WRITTEN_WORDS  # noqa: E402  (one definition of "written")

# --------------------------------------------------------------------------- #
# Configuration. Change a number here, rerun, and every score follows.
# --------------------------------------------------------------------------- #

WEIGHTS = {"budget": 20, "placement": 20, "spec": 20, "format": 15, "padding": 10, "reader": 15}

# Tier table from CONTENT-GENERATION-GUIDE.md. (min E(c), low words, high words)
TIERS = [("A", 0.5, 500, 750), ("B", 0.2, 250, 400), ("C", 0.0, 120, 200)]

# The guide calls the budget "guidelines, not requirements" and says a dense
# chapter beats a padded one, so full credit starts well below the target.
BUDGET_FULL_LOW = 0.6        # x the sum of per-concept low targets
BUDGET_ZERO_LOW = 0.2
BUDGET_FULL_HIGH = 1.25      # x the sum of per-concept high targets
BUDGET_ZERO_HIGH = 2.5
ELEMENT_TOLERANCE = 0.6      # share of required worked examples / non-text elements

MAX_PARAGRAPHS_WITHOUT_ELEMENT = 4   # skill, Step 2.4 "Non-text elements"
DIAGRAMS_PER_1000 = (0.0, 0.8, 4.0, 8.0)   # zero, full-low, full-high, zero-high
MATH_PER_1000 = (0.0, 3.0, 80.0, 250.0)
WORKED_PER_1000 = 1.0

SPEC_FIELDS = [
    "Type", "sim-id", "Library", "Status", "Bloom Level", "Bloom Verb",
    "Learning Objective", "Prerequisites", "Evidence of Mastery", "Misconceptions",
    "Instructional Rationale", "Content", "Provenance", "Rules", "Learner Activity",
    "Feedback", "Starting State", "Chapter Anchors",
]
HEADER_BR_FIELDS = ["sim-id", "Library", "Status", "Bloom Level", "Bloom Verb"]
TYPE_LIBRARY = {   # R14 table, with Mermaid allowed for flow diagrams
    "microsim": {"p5.js"}, "chart": {"Chart.js", "Plotly"},
    "diagram": {"venn.js", "html", "Mermaid"}, "infographic": {"html"},
    "timeline": {"vis-timeline"}, "map": {"Leaflet"}, "workflow": {"Mermaid"},
    "graph-model": {"vis-network"}, "causal-loop": {"vis-network"},
}
LIBRARIES = {lib for libs in TYPE_LIBRARY.values() for lib in libs}
BLOOM = {   # skills/chapter-content-generator/references/blooms-taxonomy.md, Part 1
    "Remember": "list define recall identify name recognize locate describe",
    "Understand": "explain summarize interpret classify compare contrast exemplify infer",
    "Apply": "use execute implement solve demonstrate calculate apply practice",
    "Analyze": "differentiate organize attribute compare contrast examine deconstruct distinguish",
    "Evaluate": "judge critique assess justify prioritize recommend validate defend",
    "Create": "design construct develop formulate compose produce invent generate",
}
BLOOM = {k: set(v.split()) for k, v in BLOOM.items()}
BANNED_VERBS = re.compile(r"\bthe learner will\s+(understand|learn|know|explore|be familiar)\b", re.I)

BOILERPLATE_SECTIONS = {"summary", "concepts covered", "prerequisites"}
FILLER = [
    r"let'?s talk about", r"the concept of .{1,40} is (?:fundamental|crucial|essential)",
    r"it is (?:important|worth) (?:to note|noting)", r"it'?s worth noting", r"in conclusion",
    r"in summary", r"as we (?:have|'ve) seen", r"\bdelve", r"plays? a (?:crucial|vital|key) role",
    r"in today'?s", r"dive into", r"game[- ]changer", r"this chapter (?:will )?(?:cover|explore|introduce)",
    r"in this section,? we will",
]
FILLER_RE = re.compile("|".join(FILLER), re.I)

# Text the generating agent wrote for itself (its elaboration-budget working) that
# must not reach the reader.
SCAFFOLD_RE = re.compile(r"\(Tier [ABC][:)]|\bTier [ABC]:\s*\d+\s*-\s*\d+\s*words|Elaboration Budget|"
                         r"\bTarget Words\b|\bRequired Elements\b|\[Prerequisites from|\bE\(c\)|"
                         r"Content Generation\s*$", re.I | re.M)
GENERIC_TITLE_WORDS = {"foundation", "foundational", "introduction", "overview", "basic", "essential",
                       "fundamental", "advanced", "topic", "review", "applied", "application", "capstone",
                       "concept", "part", "unit"}
# Hosts that mean the model invented the URL.
FAKE_HOST_RE = re.compile(r"//(?:[\w.-]*\.)?(?:example\.(?:com|org|net)|localhost|127\.0\.0\.1)\b|"
                          r"your-?domain|placeholder|src=[\"'][^\"']*<[^>]+>", re.I)
COMPRESSION_WINDOW = 600     # words; ratios are averaged over windows so length does not bias them

STOP = set("""a an the and or of to in on for with by from at as is are be this that these those it its
learner will given each into then than when which what using use can may not you your their there
chapter section above below diagram example value values number numbers""".split())

# --------------------------------------------------------------------------- #
# Small helpers
# --------------------------------------------------------------------------- #


def clamp01(x):
    return max(0.0, min(1.0, x))


def at_least(x, full, zero):
    """1.0 at or above `full`, falling linearly to 0.0 at `zero`."""
    return clamp01((x - zero) / (full - zero)) if full != zero else float(x >= full)


def at_most(x, full, zero):
    """1.0 at or below `full`, falling linearly to 0.0 at `zero`."""
    return clamp01((zero - x) / (zero - full)) if full != zero else float(x <= full)


def band(x, zero_lo, full_lo, full_hi, zero_hi):
    """1.0 inside [full_lo, full_hi], linear to 0.0 at the two outer edges."""
    if x < full_lo:
        return at_least(x, full_lo, zero_lo)
    if x > full_hi:
        return at_most(x, full_hi, zero_hi)
    return 1.0


def wmean(pairs):
    """Weighted mean of (score, weight) pairs, skipping scores that are None."""
    pairs = [(s, w) for s, w in pairs if s is not None]
    total = sum(w for _, w in pairs)
    return sum(s * w for s, w in pairs) / total if total else None


def r3(x):
    return None if x is None else round(x, 3)


def stem(tok):
    if len(tok) > 4 and tok.endswith("ies"):
        return tok[:-3] + "y"
    if len(tok) > 3 and tok.endswith("s") and not tok.endswith("ss"):
        return tok[:-1]
    return tok


def norm(text):
    """Lower-case, punctuation to spaces, light stemming. Used for term matching."""
    toks = re.findall(r"[a-z0-9]+", text.lower())
    return " ".join(stem(t) for t in toks)


def content_tokens(text):
    return {stem(t) for t in re.findall(r"[a-z]{4,}", text.lower())} - STOP


def words(text):
    return len(text.split())


# --------------------------------------------------------------------------- #
# Parsing a chapter into elements
# --------------------------------------------------------------------------- #

FENCE_RE = re.compile(r"^\s*(`{3,}|~{3,})")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*#*\s*$")
LIST_RE = re.compile(r"^(\s*)(?:[-*+]|\d+[.)])\s+\S")
ADMON_RE = re.compile(r"^(\s*)(!!!|\?\?\?\+?)\s+([\w-]+)(?:\s+\"([^\"]*)\")?")
DETAILS_RE = re.compile(r"^\s*<details\b", re.I)
MATH_START_RE = re.compile(r"^\s*(\$\$|\\\[)")
LABEL_RE = re.compile(
    r"^[ \t]*(\*\*)?(" + "|".join(re.escape(f) for f in SPEC_FIELDS) + r")(?::\*\*|\*\*:|:)[ \t]*(.*)$",
    re.I | re.M,
)
MD_IMG_RE = re.compile(r"!\[[^\]]*\]\(([^)\s]*)[^)]*\)")
MASCOT_IMG_RE = re.compile(r"!\[[^\]]*\]\([^)]*\)\s*\{[^}]*mascot-admonition-img[^}]*\}|<img[^>]*mascot-admonition-img")
BROKEN_IMG_RE = re.compile(r"!\[[^\]]*\]\s*\{")      # ![alt]{ class=... } with no target
TERMINAL_RE = re.compile(r"[.!?:;)\]}*_`>|\"'”’]$")


def split_frontmatter(text):
    meta = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            for line in text[3:end].splitlines():
                m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
                if m:
                    meta[m.group(1)] = m.group(2).strip().strip("\"'")
            text = text[end + 4:]
    return meta, text


def parse_elements(text):
    """Split a page into top-level blocks: heading, paragraph, list, table, code,
    math, admonition, details, html. Each carries its 0-based first line."""
    lines = text.splitlines()
    n = len(lines)
    els = []
    i = 0

    def starts_block(k):
        raw = lines[k]
        return bool(FENCE_RE.match(raw) or DETAILS_RE.match(raw) or HEADING_RE.match(raw)
                    or ADMON_RE.match(raw) or raw.strip().startswith("|") or LIST_RE.match(raw)
                    or MATH_START_RE.match(raw))

    while i < n:
        raw = lines[i]
        s = raw.strip()
        if not s:
            i += 1
            continue
        m = FENCE_RE.match(raw)
        if m:
            marker = m.group(1)[0] * 3
            j = i + 1
            while j < n and not lines[j].strip().startswith(marker):
                j += 1
            els.append({"kind": "code", "line": i, "text": "\n".join(lines[i:j + 1])})
            i = j + 1
            continue
        if DETAILS_RE.match(raw):
            depth, j = 0, i
            while j < n:
                depth += len(re.findall(r"<details\b", lines[j], re.I))
                depth -= len(re.findall(r"</details>", lines[j], re.I))
                if depth <= 0:
                    break
                j += 1
            els.append({"kind": "details", "line": i, "text": "\n".join(lines[i:j + 1]), "closed": depth <= 0})
            i = j + 1
            continue
        m = HEADING_RE.match(raw) if not raw.startswith("    ") else None
        if m:
            els.append({"kind": "heading", "line": i, "level": len(m.group(1)), "text": m.group(2)})
            i += 1
            continue
        m = ADMON_RE.match(raw)
        if m:
            j = i + 1
            body = []
            while j < n and (not lines[j].strip() or lines[j][:1] in (" ", "\t")):
                body.append(lines[j])
                j += 1
            while body and not body[-1].strip():
                body.pop()
            first = next((b for b in body if b.strip()), None)
            indent = None if first is None else (4 if first.startswith("\t") else len(first) - len(first.lstrip(" ")))
            els.append({"kind": "admonition", "line": i, "adm_type": m.group(3), "title": m.group(4) or "",
                        "body": "\n".join(body), "indent": indent, "text": "\n".join(lines[i:j])})
            i = j
            continue
        if s.startswith("|"):
            j = i
            while j < n and lines[j].strip().startswith("|"):
                j += 1
            els.append({"kind": "table", "line": i, "text": "\n".join(lines[i:j])})
            i = j
            continue
        if MATH_START_RE.match(raw):
            close = "$$" if s.startswith("$$") else "\\]"
            j = i
            if not (len(s) > 2 and s.endswith(close)):
                j = i + 1
                while j < n and close not in lines[j]:
                    j += 1
            els.append({"kind": "math", "line": i, "text": "\n".join(lines[i:j + 1])})
            i = j + 1
            continue
        if LIST_RE.match(raw):
            j = i
            while j < n:
                cur = lines[j]
                if not cur.strip():
                    k = j + 1
                    while k < n and not lines[k].strip():
                        k += 1
                    if k < n and (LIST_RE.match(lines[k]) or lines[k][:2] == "  ") and not DETAILS_RE.match(lines[k]):
                        j = k
                        continue
                    break
                if LIST_RE.match(cur) or cur[:1] in (" ", "\t"):
                    j += 1
                    continue
                break
            els.append({"kind": "list", "line": i, "text": "\n".join(lines[i:j])})
            i = j
            continue
        if s.startswith("<!--"):
            j = i
            while j < n and "-->" not in lines[j]:
                j += 1
            els.append({"kind": "comment", "line": i, "text": "\n".join(lines[i:j + 1])})
            i = j + 1
            continue
        if s.startswith("<") and not s.startswith("<br"):
            j = i
            while j < n and lines[j].strip():
                j += 1
            els.append({"kind": "html", "line": i, "text": "\n".join(lines[i:j])})
            i = j
            continue
        j = i + 1
        while j < n and lines[j].strip() and not starts_block(j):
            j += 1
        els.append({"kind": "paragraph", "line": i, "text": "\n".join(lines[i:j])})
        i = j
    return els


def list_stats(text):
    """(lists, lists with no blank line before them). Same rule as score_chapters.py."""
    total = missing = 0
    previous, fenced = "", False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            fenced = not fenced
        elif not fenced and LIST_RE.match(line) and not LIST_RE.match(previous):
            total += 1
            if previous.strip() and not previous.startswith((" ", "\t", "#", "|", ">")):
                missing += 1
        previous = line
    return total, missing


# --------------------------------------------------------------------------- #
# Concepts, budget
# --------------------------------------------------------------------------- #


def parse_concept_table(table_text):
    rows = [[c.strip() for c in ln.strip().strip("|").split("|")] for ln in table_text.splitlines()]
    rows = [r for r in rows if r and not all(re.fullmatch(r":?-{2,}:?", c) or not c for c in r)]
    if len(rows) < 2:
        return []
    head = [c.lower() for c in rows[0]]
    cis_col = next((k for k, c in enumerate(head) if "impact" in c or "cis" in c or "score" in c), None)
    label_col = next((k for k, c in enumerate(head) if "concept" in c and k != cis_col
                      and not any(w in c for w in ("impact", "score", "cis"))), None)
    if label_col is None:
        label_col = 1 if head and head[0] in ("#", "no", "no.", "id") and len(head) > 1 else 0
    out = []
    for r in rows[1:]:
        if label_col >= len(r):
            continue
        label = re.sub(r"[*_`]", "", r[label_col]).strip()
        cis = None
        if cis_col is not None and cis_col < len(r):
            digits = re.sub(r"[^\d.]", "", r[cis_col])
            cis = float(digits) if digits else None
        if label:
            out.append((label, cis))
    return out


def concepts_covered(els):
    """Concepts from the '## Concepts Covered' table (or list), and the table element."""
    for idx, e in enumerate(els):
        if e["kind"] == "heading" and e["level"] == 2 and e["text"].strip().lower() == "concepts covered":
            for nxt in els[idx + 1:]:
                if nxt["kind"] == "heading" and nxt["level"] <= 2:
                    break
                if nxt["kind"] == "table":
                    return parse_concept_table(nxt["text"]), nxt
                if nxt["kind"] == "list":
                    items = [re.sub(r"[*_`]", "", re.sub(r"^\s*(?:[-*+]|\d+[.)])\s+", "", ln)).strip()
                             for ln in nxt["text"].splitlines() if LIST_RE.match(ln)]
                    return [(t, None) for t in items if t], nxt
    return [], None


def tier_for(cis, cis_max):
    if cis is None:
        return "B", None
    e = 0.0 if cis_max <= 1 else math.log(cis + 1) / math.log(cis_max + 1)
    for name, floor, _, _ in TIERS:
        if e >= floor:
            return name, e
    return "C", e


def budget_for(concepts, cis_max):
    counts = {"A": 0, "B": 0, "C": 0}
    lo = hi = 0
    for _, cis in concepts:
        tier, _ = tier_for(cis, cis_max)
        counts[tier] += 1
        _, _, tl, th = next(t for t in TIERS if t[0] == tier)
        lo += tl
        hi += th
    return counts, lo, hi


# --------------------------------------------------------------------------- #
# Inline cleanup, reading level
# --------------------------------------------------------------------------- #

PAREN_MATH = re.compile(r"\\\((.+?)\\\)", re.S)
BRACK_MATH = re.compile(r"\\\[(.+?)\\\]", re.S)
DOLLAR2_MATH = re.compile(r"\$\$(.+?)\$\$", re.S)
DOLLAR_MATH = re.compile(r"(?<![\\\w$])\$(?!\s)([^$\n]+?)(?<!\s)\$(?![\w$])")


def count_math(text):
    d2 = len(DOLLAR2_MATH.findall(text))
    t = DOLLAR2_MATH.sub(" ", text)
    return {"paren": len(PAREN_MATH.findall(text)), "bracket": len(BRACK_MATH.findall(text)),
            "dollar": d2 + len(DOLLAR_MATH.findall(t))}


def strip_inline(text):
    t = DOLLAR2_MATH.sub(" ", text)
    t = BRACK_MATH.sub(" ", t)
    t = PAREN_MATH.sub(" ", t)
    t = DOLLAR_MATH.sub(" ", t)
    t = re.sub(r"!\[[^\]]*\]\([^)]*\)(?:\s*\{[^}]*\})?", " ", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"`[^`]*`", " ", t)
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"(\*\*|__|\*|_)", "", t)
    t = re.sub(r"^\s*(?:[-*+]|\d+[.)])\s+", "", t, flags=re.M)
    t = re.sub(r"^(?:!!!|\?\?\?\+?)\s+[\w-]+\s*(?:\"[^\"]*\")?", "", t, flags=re.M)
    return re.sub(r"\s+", " ", t).strip()


def window_compression(prose, size=COMPRESSION_WINDOW):
    """Mean zlib ratio over fixed-size word windows. A whole-chapter ratio falls as the
    chapter grows, which would punish length; fixed windows do not."""
    toks = prose.split()
    if not toks:
        return 1.0
    chunks = [toks[i:i + size] for i in range(0, len(toks), size)]
    if len(chunks) > 1 and len(chunks[-1]) < size // 2:
        chunks[-2].extend(chunks.pop())
    ratios = []
    for c in chunks:
        b = " ".join(c).encode()
        ratios.append(len(zlib.compress(b, 9)) / len(b))
    return sum(ratios) / len(ratios)


def split_sentences(text):
    return [s for s in re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"“(])", text) if s.strip()]


def _syllables(word):
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 0
    if len(w) <= 3:
        return 1
    w = re.sub(r"(?:[^laeiouy]es|ed|[^laeiouy]e)$", "", w)
    w = re.sub(r"^y", "", w)
    return max(1, len(re.findall(r"[aeiouy]{1,2}", w)))


def reading_stats(prose, engine):
    """(grade, reading ease, words per sentence, engine used)."""
    toks = re.findall(r"[A-Za-z][A-Za-z'’-]*", prose)
    sents = split_sentences(prose)
    if len(toks) < 30 or not sents:
        return None, None, None, engine
    wps = len(toks) / len(sents)
    if engine == "textstat":
        import textstat
        return textstat.flesch_kincaid_grade(prose), textstat.flesch_reading_ease(prose), wps, engine
    syl = sum(_syllables(t) for t in toks) / len(toks)
    return 0.39 * wps + 11.8 * syl - 15.59, 206.835 - 1.015 * wps - 84.6 * syl, wps, "builtin"


# --------------------------------------------------------------------------- #
# Equations: how many are well formed, how many are not
# --------------------------------------------------------------------------- #
#
# "Well formed" means what the site's renderer needs. mkdocs.yml runs
# pymdownx.arithmatex (smart_dollar; inline $...$ and \(...\); display $$...$$ and
# \[...\]) and then KaTeX with throwOnError: false, so an equation KaTeX cannot
# parse is drawn as red source text instead of math. An equation is counted as
# malformed when
#   - its delimiters never close, or a $ is left over that is not a price;
#   - the TeX inside would not parse: unbalanced braces, \left without \right,
#     \begin without \end, a command or environment KaTeX does not have, a
#     missing argument, a dangling or doubled ^ or _, a & outside an alignment
#     environment, a bare $ inside the math, an unescaped % (it starts a comment
#     and drops the rest of the line), or an empty body;
#   - TeX commands sit in the prose with no delimiters around them.
#
# This is a syntax check. It does not say the mathematics is right. It is also
# not a KaTeX run: the command lists below come from the KaTeX 0.16 function list
# (the version mkdocs.yml loads) and lean generous, because a name missing from
# them is reported as a malformed equation. The unknown name is kept in
# math_issues so a valid one that was left out is easy to see and add.

INLINE_CODE_RE = re.compile(r"(?<!\\)(`+)((?:[^\n]|\n(?![ \t]*\n))+?)(?<!`)\1(?!`)")
FENCED_CODE_RE = re.compile(r"^[ \t]*(`{3,}|~{3,})[^\n]*\n.*?(?:^[ \t]*\1[`~]*[ \t]*$|\Z)", re.S | re.M)
PARAGRAPH_RE = re.compile(r"(?:^[^\n]*\S[^\n]*(?:\n|\Z))+", re.M)

# The delimiter patterns pymdownx.arithmatex uses with the mkdocs.yml settings
# (RE_SMART_DOLLAR_INLINE, RE_DOLLAR_BLOCK, RE_BRACKET_INLINE, RE_BRACKET_BLOCK).
# They are tried per paragraph, so an equation cannot run across a blank line.
EQ_DOLLAR2 = re.compile(r"\$\$((?:\\.|[^\\])+?)\$\$", re.S)
EQ_DOLLAR = re.compile(r"\$(?!\s)((?:\\.|[^\\$])+?)(?<!\s)\$", re.S)
EQ_PAREN = re.compile(r"\\\(((?:\\[^)]|[^\\])+?)\\\)", re.S)
EQ_BRACKET = re.compile(r"\\\[((?:\\[^\]]|[^\\])+?)\\\]", re.S)
EQ_TOKEN = re.compile(r"\\\\|\\\$|\$\$|\$|\\\(|\\\[|\\\)|\\\]")
# smart_dollar leaves "$5 for", "$1,000.", "$4.80" as text on purpose: not an equation.
PRICE_RE = re.compile(r"\$\d[\d,]*(?:\.\d+)?(?![\w^_{\\(])")
MISSING_BACKSLASH_RE = re.compile(r"(?<![\\A-Za-z])(?:d?frac|sqrt|mathbf|mathrm|overline|boldsymbol)\s*\{")
MACRO_DEF_RE = re.compile(r"\\(?:re|provide)?newcommand\*?\s*\{?\s*\\([A-Za-z]+)|\\[gex]?def\s*\\([A-Za-z]+)")


def _names(s):
    return frozenset(s.split())


TEX_GREEK = _names("""
alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau
upsilon phi chi psi omega varepsilon vartheta varpi varrho varsigma varphi varkappa digamma
Gamma Delta Theta Lambda Xi Pi Sigma Upsilon Phi Psi Omega varGamma varDelta varTheta varLambda
varXi varPi varSigma varUpsilon varPhi varPsi varOmega Alpha Beta Epsilon Zeta Eta Iota Kappa Mu
Nu Omicron Rho Tau Chi backepsilon aleph beth gimel daleth
""")
TEX_OPERATORS_RELATIONS = _names("""
times div cdot cdotp pm mp ast star circ bullet oplus ominus otimes oslash odot bigcirc dagger
ddagger amalg wedge vee cap cup uplus sqcap sqcup land lor lnot neg setminus smallsetminus wr
diamond triangle bigtriangleup bigtriangledown triangleleft triangleright lhd rhd unlhd unrhd
centerdot circledast circledcirc circleddash dotplus divideontimes doublebarwedge doublecap
doublecup barwedge veebar curlywedge curlyvee leftthreetimes rightthreetimes ltimes rtimes
intercal Cap Cup boxdot boxminus boxplus boxtimes ldotp
eq ne neq le leq ge geq lt gt ll gg lll ggg equiv sim simeq approx approxeq cong ncong propto
varpropto doteq doteqdot Doteq fallingdotseq risingdotseq parallel nparallel shortparallel
nshortparallel perp mid nmid smallfrown smallsmile frown smile asymp bowtie Join models vdash
Vdash vDash Vvdash dashv subset supset subseteq supseteq subsetneq supsetneq nsubseteq nsupseteq
subseteqq supseteqq subsetneqq supsetneqq sqsubset sqsupset sqsubseteq sqsupseteq in ni notin
owns isin Subset Supset prec succ preceq succeq precsim succsim precapprox succapprox
preccurlyeq succcurlyeq curlyeqprec curlyeqsucc nprec nsucc npreceq nsucceq lesssim gtrsim
lessapprox gtrapprox lessgtr gtrless lesseqgtr gtreqless lessdot gtrdot leqslant geqslant leqq
geqq lneq gneq lneqq gneqq lnsim gnsim lnapprox gnapprox nleq ngeq nless ngtr nleqslant
ngeqslant nleqq ngeqq nsim not triangleq trianglelefteq trianglerighteq vartriangleleft
vartriangleright ntriangleleft ntriangleright ntrianglelefteq ntrianglerighteq between
pitchfork backsim backsimeq thicksim thickapprox bumpeq Bumpeq eqcirc circeq eqsim eqslantless
eqslantgtr questeq therefore because
""")
TEX_ARROWS = _names("""
leftarrow rightarrow to gets leftrightarrow Leftarrow Rightarrow Leftrightarrow iff implies
impliedby uparrow downarrow updownarrow Uparrow Downarrow Updownarrow longleftarrow
longrightarrow longleftrightarrow Longleftarrow Longrightarrow Longleftrightarrow mapsto
longmapsto hookleftarrow hookrightarrow leftharpoonup leftharpoondown rightharpoonup
rightharpoondown rightleftharpoons leftrightharpoons nearrow searrow swarrow nwarrow nleftarrow
nrightarrow nleftrightarrow nLeftarrow nRightarrow nLeftrightarrow leftleftarrows
rightrightarrows leftrightarrows rightleftarrows Lleftarrow Rrightarrow twoheadleftarrow
twoheadrightarrow leftarrowtail rightarrowtail looparrowleft looparrowright curvearrowleft
curvearrowright circlearrowleft circlearrowright Lsh Rsh upuparrows downdownarrows
upharpoonleft upharpoonright downharpoonleft downharpoonright leftrightsquigarrow
rightsquigarrow dashleftarrow dashrightarrow multimap restriction
""")
TEX_MISC_SYMBOLS = _names("""
infty partial nabla forall exists nexists emptyset varnothing empty ell hbar hslash imath jmath
wp Re Im prime backprime angle measuredangle sphericalangle top bot flat natural sharp clubsuit
diamondsuit heartsuit spadesuit surd checkmark maltese complement Finv Game eth mho Bbbk
cdots ldots dots dotsb dotsc dotsi dotsm dotso vdots ddots iddots hdots mathellipsis
square blacksquare Box Diamond lozenge blacklozenge blacktriangle blacktriangledown
blacktriangleleft blacktriangleright bigstar vartriangle triangledown circledR circledS
degree pounds yen textdegree copyright dag ddag S P ss ae AE oe OE o O aa AA i j l L
lbrace rbrace lbrack rbrack langle rangle lvert rvert lVert rVert vert Vert lceil rceil
lfloor rfloor lgroup rgroup lmoustache rmoustache ulcorner urcorner llcorner lrcorner
backslash slash N R Z Q C H Reals reals Complex cnums natnums Bbb bold TeX LaTeX KaTeX
""")
TEX_BIG_OPERATORS = _names("""
sum prod coprod int iint iiint oint oiint oiiint intop smallint bigcup bigcap bigvee bigwedge
bigoplus bigotimes bigodot biguplus bigsqcup
""")
TEX_FUNCTIONS = _names("""
sin cos tan cot sec csc arcsin arccos arctan arccot sinh cosh tanh coth sech csch log ln lg exp
lim limsup liminf max min sup inf arg det dim gcd hom ker deg Pr mod bmod pmod pod operatorname
varlimsup varliminf varinjlim varprojlim injlim projlim argmax argmin sgn plim lcm
""")
TEX_FONTS = _names("""
mathrm mathbf mathit mathsf mathtt mathnormal mathbb mathcal mathfrak mathscr boldsymbol bm
pmb rm bf it sf tt cal frak scr text textrm textbf textit textsf texttt textnormal textup
textmd emph mbox hbox fbox
""")
TEX_STRUCTURE = _names("""
frac dfrac tfrac cfrac binom dbinom tbinom genfrac sqrt overset underset stackrel atop over
choose brace brack above overbrace underbrace overline underline overleftarrow overrightarrow
overleftrightarrow underleftarrow underrightarrow underleftrightarrow overgroup undergroup
overlinesegment underlinesegment Overrightarrow overleftharpoon overrightharpoon
xleftarrow xrightarrow xLeftarrow xRightarrow xleftrightarrow xLeftrightarrow xhookleftarrow
xhookrightarrow xtwoheadleftarrow xtwoheadrightarrow xleftharpoonup xleftharpoondown
xrightharpoonup xrightharpoondown xleftrightharpoons xrightleftharpoons xtofrom xlongequal
xmapsto hat widehat bar check tilde widetilde vec dot ddot dddot ddddot acute grave breve
mathring utilde boxed cancel bcancel xcancel sout phantom hphantom vphantom smash
mathstrut strut substack mathop mathrel mathbin mathord mathopen mathclose mathpunct
mathinner left right middle big Big bigg Bigg bigl Bigl biggl Biggl bigr Bigr biggr Biggr
bigm Bigm biggm Biggm limits nolimits displaystyle textstyle scriptstyle scriptscriptstyle
tiny scriptsize footnotesize small normalsize large Large LARGE huge Huge color textcolor
colorbox fcolorbox kern mkern mskip hskip hspace rule raisebox quad qquad enspace thinspace
medspace thickspace negthinspace negmedspace negthickspace nobreakspace space tag nonumber
notag hline hdashline cr newline begin end bra ket braket set Set Bra Ket Braket
newcommand renewcommand providecommand def gdef edef xdef let global long relax
href url verb unicode mathchoice
""")
TEX_KNOWN = (TEX_GREEK | TEX_OPERATORS_RELATIONS | TEX_ARROWS | TEX_MISC_SYMBOLS |
             TEX_BIG_OPERATORS | TEX_FUNCTIONS | TEX_FONTS | TEX_STRUCTURE)
# Commands that belong to prose (bold, italic ...) are not an equation when they
# appear outside delimiters; every other known command is.
TEX_TEXT_ONLY = _names("""textrm textbf textit textsf texttt textnormal textup textmd emph mbox hbox
fbox textdegree copyright dag ddag S P ss ae AE oe OE o O aa AA i j l L degree pounds yen href url
verb unicode newcommand renewcommand providecommand def gdef edef xdef let global long relax
TeX LaTeX KaTeX N R Z Q C H S""")
TEX_TEXT_MODE = _names("text textrm textbf textit textsf texttt textnormal textup textmd emph mbox hbox fbox")
TEX_ONE_ARG = _names("""
text textrm textbf textit textsf texttt textnormal textup textmd emph mbox hbox fbox
mathrm mathbf mathit mathsf mathtt mathnormal mathbb mathcal mathfrak mathscr boldsymbol bm pmb
operatorname hat widehat bar check tilde widetilde vec dot ddot dddot acute grave breve mathring
overline underline overbrace underbrace overleftarrow overrightarrow boxed cancel bcancel
xcancel sout phantom hphantom vphantom smash substack mathop mathrel mathbin mathord mathopen
mathclose mathpunct mathinner pmod xrightarrow xleftarrow color
""")
TEX_TWO_ARGS = _names("frac dfrac tfrac cfrac binom dbinom tbinom overset underset stackrel textcolor colorbox")
TEX_OPTIONAL_BRACKET = _names("sqrt xrightarrow xleftarrow")
TEX_DELIMITER_COMMANDS = _names("""
lbrace rbrace langle rangle lvert rvert lVert rVert vert Vert lceil rceil lfloor rfloor lbrack
rbrack lgroup rgroup lmoustache rmoustache ulcorner urcorner llcorner lrcorner uparrow downarrow
updownarrow Uparrow Downarrow Updownarrow backslash lt gt
""")
TEX_ENVIRONMENTS = _names("""
matrix pmatrix bmatrix Bmatrix vmatrix Vmatrix smallmatrix array subarray darray cases rcases
dcases drcases aligned alignedat gathered split align align* alignat alignat* gather gather*
equation equation* eqnarray eqnarray* CD
""")
# Open a text group: inside it ^ _ & $ are not math syntax.
TEX_NAKED = TEX_KNOWN - TEX_TEXT_ONLY


def _tex_tokens(body, probs):
    """Split an equation body into (type, value) tokens: ('cmd', name), ('sym', ch),
    the characters { } ^ _ & $ ' , and ('char', c). Whitespace is dropped and a %
    comment is skipped to the end of its line, as TeX does."""
    toks = []
    i, n = 0, len(body)
    name = re.compile(r"[A-Za-z]+")
    while i < n:
        c = body[i]
        if c == "\\":
            m = name.match(body, i + 1)
            if m:
                toks.append(("cmd", m.group()))
                i = m.end()
            elif i + 1 < n:
                toks.append(("sym", body[i + 1]))
                i += 2
            else:
                probs.add("trailing_backslash")
                i += 1
        elif c.isspace():
            i += 1
        elif c == "%":
            probs.add("unescaped_percent")
            j = body.find("\n", i)
            i = n if j < 0 else j + 1
        elif c in "{}^_&$'":
            toks.append((c, c))
            i += 1
        else:
            toks.append(("char", c))
            i += 1
    return toks


def _skip_tex_arg(toks, j):
    """Index just past the argument that starts at toks[j], or None if there is none:
    one {group} or one token."""
    if j >= len(toks):
        return None
    t, v = toks[j]
    if t == "{":
        depth = 0
        for k in range(j, len(toks)):
            if toks[k][0] == "{":
                depth += 1
            elif toks[k][0] == "}":
                depth -= 1
                if depth == 0:
                    return k + 1
        return None
    if t in ("}", "^", "_", "&") or (t == "cmd" and v in ("right", "end", "middle")):
        return None
    return j + 1


def _frame(kind, text=False, env=None):
    return {"k": kind, "text": text, "env": env, "sup": False, "sub": False, "arg": False}


def tex_problems(body):
    """Problem codes for one equation body; an empty list means it would parse."""
    probs = set()
    if not body.strip():
        return ["empty"]
    if MISSING_BACKSLASH_RE.search(body):
        probs.add("missing_backslash")
    toks = _tex_tokens(body, probs)
    macros = {n for pair in MACRO_DEF_RE.findall(body) for n in pair if n}
    stack = [_frame("root")]
    n = len(toks)
    i = 0
    while i < n:
        t, v = toks[i]
        top = stack[-1]
        is_arg, top["arg"] = top["arg"], False
        in_text = top["text"]

        if t == "}":
            if top["k"] == "brace":
                stack.pop()
            else:
                probs.add("unbalanced_braces")
            i += 1
            continue
        if t in ("^", "_") and not in_text:
            key = "sup" if t == "^" else "sub"
            if is_arg:
                probs.add("dangling_script")
            if top[key]:
                probs.add("double_superscript" if t == "^" else "double_subscript")
            top[key] = True
            nxt = toks[i + 1] if i + 1 < n else None
            if nxt is None or nxt[0] in ("}", "&") or (nxt[0] == "cmd" and nxt[1] in ("right", "end", "middle")):
                probs.add("dangling_script")
            else:
                top["arg"] = True
            i += 1
            continue
        if t == "'" and not in_text:
            # KaTeX folds primes and a ^ that follows them into one superscript.
            if top["sup"]:
                probs.add("double_superscript")
            top["sup"] = True
            while i + 1 < n and toks[i + 1][0] == "'":
                i += 1
            if i + 1 < n and toks[i + 1][0] == "^":
                i += 1
                top["arg"] = True
            i += 1
            continue
        if not is_arg:
            top["sup"] = top["sub"] = False      # a new atom starts here

        if t == "{":
            prev = toks[i - 1] if i else None
            text = in_text or bool(prev and prev[0] == "cmd" and prev[1] in TEX_TEXT_MODE)
            stack.append(_frame("brace", text))
        elif t == "&":
            if not in_text and not any(f["k"] == "env" for f in stack):
                probs.add("ampersand_outside_environment")
        elif t == "$":
            if not in_text:
                probs.add("dollar_in_math")
        elif t == "cmd":
            if v in ("left", "right"):
                nxt = toks[i + 1] if i + 1 < n else None
                ok = bool(nxt and ((nxt[0] == "char" and nxt[1] in "()[]|./<>")
                                   or (nxt[0] == "sym" and nxt[1] in "{}|")
                                   or (nxt[0] == "cmd" and nxt[1] in TEX_DELIMITER_COMMANDS)))
                if not ok:
                    probs.add("bad_delimiter")
                if v == "left":
                    stack.append(_frame("left"))
                elif top["k"] == "left":
                    stack.pop()
                else:
                    probs.add("unmatched_left_right")
            elif v == "middle":
                if not any(f["k"] == "left" for f in stack):
                    probs.add("unmatched_left_right")
            elif v in ("begin", "end"):
                j = i + 1
                name = ""
                ok = j < n and toks[j][0] == "{"
                if ok:
                    j += 1
                    while j < n and toks[j][0] == "char":
                        name += toks[j][1]
                        j += 1
                    ok = j < n and toks[j][0] == "}" and bool(name)
                if not ok:
                    probs.add("bad_environment")
                else:
                    if name not in TEX_ENVIRONMENTS:
                        probs.add("unknown_environment:" + name)
                    if v == "begin":
                        stack.append(_frame("env", env=name))
                    elif top["k"] == "env" and top["env"] == name:
                        stack.pop()
                    else:
                        probs.add("unmatched_environment")
                    i = j
            else:
                if v not in TEX_KNOWN and v not in macros:
                    probs.add("unknown_command:\\" + v)
                needs = 2 if v in TEX_TWO_ARGS else 1 if v in TEX_ONE_ARG or v == "sqrt" else 0
                if needs:
                    j = i + 1
                    if v in TEX_OPTIONAL_BRACKET and j < n and toks[j] == ("char", "["):
                        while j < n and toks[j] != ("char", "]"):
                            j += 1
                        j += 1
                    for _ in range(needs):
                        j = _skip_tex_arg(toks, j) if j is not None else None
                    if j is None:
                        probs.add("missing_argument")
        i += 1
    for f in stack[1:]:
        probs.add({"brace": "unbalanced_braces", "left": "unmatched_left_right",
                   "env": "unmatched_environment"}[f["k"]])
    return sorted(probs)


def _blank(match):
    return re.sub(r"[^\n]", " ", match.group())


def scan_equations(text):
    """Every equation and every attempt at one in `text`, as a list of
    {"form", "excerpt", "problems"}. `problems` is empty for a well-formed equation."""
    text = FENCED_CODE_RE.sub(_blank, text)
    text = INLINE_CODE_RE.sub(_blank, text)
    found = []

    def add(form, body, problems):
        found.append({"form": form, "excerpt": re.sub(r"\s+", " ", body).strip()[:70], "problems": problems})

    for para in PARAGRAPH_RE.finditer(text):
        p = para.group()
        prose = list(p)                  # the paragraph with every equation blanked out

        def blank(a, b):
            for k in range(a, b):
                if prose[k] != "\n":
                    prose[k] = " "

        stray = None                     # an unmatched, non-price $ waiting for its partner
        pos = 0
        while True:
            m = EQ_TOKEN.search(p, pos)
            if not m:
                break
            tok, s = m.group(), m.start()
            pos = m.end()
            if tok in ("\\\\", "\\$"):
                continue
            if tok in ("\\)", "\\]"):
                add(tok, p[max(0, s - 30):s + 2], ["closing_without_opening"])
                continue
            pat, form, code = {"$$": (EQ_DOLLAR2, "$$", "unclosed_display_dollar"),
                               "$": (EQ_DOLLAR, "$", "stray_dollar"),
                               "\\(": (EQ_PAREN, "\\(", "unclosed_paren"),
                               "\\[": (EQ_BRACKET, "\\[", "unclosed_bracket")}[tok]
            mm = pat.match(p, s)
            if mm:
                if stray is not None:           # a lone $ before a real equation was text
                    add("$", p[stray:s], ["stray_dollar"])
                    stray = None
                add(form, mm.group(1), tex_problems(mm.group(1)))
                blank(s, mm.end())
                pos = mm.end()
            elif tok == "$":
                if PRICE_RE.match(p, s):
                    continue
                if stray is None:
                    stray = s
                else:                           # two strays are one equation that never closed
                    add("$", p[stray:s + 1], ["stray_dollar"])
                    blank(stray, s + 1)
                    stray = None
            else:
                add(form, p[s:s + 70], [code])
                blank(s, len(p))
                break
        if stray is not None:
            add("$", p[stray:stray + 70], ["stray_dollar"])
            blank(stray, len(p))
        for line in "".join(prose).splitlines():
            names = [x for x in re.findall(r"\\([A-Za-z]+)", line) if x in TEX_NAKED]
            if names:
                add("naked", line, ["naked_tex"])
    return found


def summarize_equations(equations):
    """(well formed, malformed, 'problem:count ...' text) for scan_equations output."""
    bad = [e for e in equations if e["problems"]]
    kinds = {}
    for e in bad:
        for code in e["problems"]:
            kinds[code] = kinds.get(code, 0) + 1
    detail = " ".join(f"{k}:{v}" for k, v in sorted(kinds.items(), key=lambda kv: (-kv[1], kv[0])))
    return len(equations) - len(bad), len(bad), detail


# --------------------------------------------------------------------------- #
# Diagram specifications
# --------------------------------------------------------------------------- #

VAGUE_RE = re.compile(r"\b(for example|such as|e\.g\.|etc\.?|a few|several|various|some of|and so on)\b", re.I)
CRITERION_RE = re.compile(r"\b(correct|matches|within|at least|threshold|mastery|mastered|\d+ of \d+|"
                          r"when|if|is right|is accepted)\b|[±≥≤<>=]", re.I)
FORMULA_RE = re.compile(r"[<>=≤≥±^*/]|\\\(|\\\[|\$|\d")
INTERACT_RE = re.compile(r"\b(click|hover|drag|select|choose|type|enter|press|slide|slider|toggle|step|move|"
                         r"tap|adjust|set|pick|predict|answer|check|sort|match|order|place|assign|reveal|"
                         r"expand|change|enter)\w*\b", re.I)
BUILD_RE = re.compile(r"\b\d+\s?px\b|#[0-9a-fA-F]{6}\b|\bcanvas\b|\bcreate(?:Slider|Button|Canvas|Select|Checkbox|Input)\b|"
                      r"\bImplementation:|\bpixels?\b|\bfont(?:s| size)?\b|\bframe ?rate\b|\bfps\b|"
                      r"\b(?:top|bottom)[- ](?:left|right)\b|\b(?:left|right) (?:panel|region|side of the (?:canvas|screen))\b|"
                      r"\bcontrol (?:area|panel|region)\b|\bbreakpoint\b|\bresponsive\b", re.I)
IMPOSSIBLE_RE = re.compile(r"mouse[- ]?wheel|scroll[- ]?wheel|scroll to zoom|pinch|reverse arrow|"
                           r"click(?:able)? (?:on )?(?:the )?edges?", re.I)
PLACEHOLDER_RE = re.compile(r"\b(TODO|TBD|FIXME|lorem ipsum|XXX)\b|\[Insert", re.I)
# An unfilled template slot such as <Title Case Name>. Case-sensitive on purpose:
# HTML tags are lower case, and a case-insensitive pattern matches <summary>.
ANGLE_SLOT_RE = re.compile(r"<[A-Z][A-Za-z ]+>")
PROVENANCE_RE = re.compile(r"chapter|section|synthetic|illustrative|from |http|\.md|\.csv|\.json|source|computed|"
                           r"standard|derived|rule|textbook|formula", re.I)
SIGNPOST_RE = re.compile(r"\b(diagram|figure|simulation|sim\b|microsim|interactive|below|following|"
                         r"let'?s (?:look|see|explore|try)|before we|look at|shown|explore|try|notice|"
                         r"visuali[sz]e|illustrat)", re.I)
KEBAB_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def find_header(els, k):
    """Index of the '#### Diagram:' heading that owns the block at k, or None.

    Mirrors microsim-utils/scripts/create-microsim-todo-json-files.py, which splits a
    chapter on '#### Diagram:' headers and takes the first <details> block after each.
    Prose, an iframe, or a fullscreen button may sit between the two; another
    <details> block may not. A section heading (level 3 or higher up) also ends the
    search, which the tool does not, because a diagram under a new section is not
    placed by the header of the previous one."""
    for j in range(k - 1, -1, -1):
        e = els[j]
        if e["kind"] == "details":
            return None
        if e["kind"] == "heading":
            if re.match(r"diagram\b", e["text"], re.I):
                return j
            if e["level"] <= 3:
                return None
    return None


def parse_spec(block_text):
    """Fields of a specification block: {name: {value, bold, br}} plus summary."""
    inner = re.sub(r"^\s*<details[^>]*>", "", block_text, count=1, flags=re.I)
    inner = re.sub(r"</details>\s*$", "", inner, flags=re.I)
    sm = re.search(r"<summary>(.*?)</summary>", inner, re.S | re.I)
    summary = re.sub(r"<[^>]+>", "", sm.group(1)).strip() if sm else ""
    if sm:
        inner = inner[:sm.start()] + inner[sm.end():]
    ms = list(LABEL_RE.finditer(inner))
    fields = {}
    canon = {f.lower(): f for f in SPEC_FIELDS}
    for k, m in enumerate(ms):
        name = canon[m.group(2).lower()]
        end = ms[k + 1].start() if k + 1 < len(ms) else len(inner)
        raw = (m.group(3) + "\n" + inner[m.end():end]).strip()
        first_line = m.group(3).rstrip()
        if name not in fields:
            fields[name] = {"value": re.sub(r"(<br\s*/?>)+\s*$", "", raw).strip(),
                            "bold": bool(m.group(1)) or "**" in m.group(0)[:len(m.group(0)) - len(m.group(3))],
                            "br": first_line.endswith(("<br/>", "<br>", "<br />"))}
    return fields, summary


def kebab_ok(s):
    return bool(KEBAB_RE.match(s or ""))


def check_spec(fields, summary, header_title, chapter_numbers, sim_ids_seen, block_text):
    """Return {check: score 0..1}. See microsim-specification-rules.md."""

    def val(name):
        return fields.get(name, {}).get("value", "")

    s = {}
    present = [f for f in SPEC_FIELDS if val(f)]
    s["fields_present"] = len(present) / len(SPEC_FIELDS)

    bold_ok = [fields[f]["bold"] for f in present if f != "Type"]
    br_ok = [fields[f]["br"] for f in HEADER_BR_FIELDS if f in fields]
    s["label_format"] = (0.7 * (sum(bold_ok) / len(bold_ok) if bold_ok else 0)
                         + 0.3 * (sum(br_ok) / len(HEADER_BR_FIELDS)))

    typ, lib = val("Type").strip(), val("Library").strip()
    s["enums_valid"] = ((typ in TYPE_LIBRARY) + (lib in LIBRARIES)) / 2
    s["type_library"] = float(typ in TYPE_LIBRARY and lib in TYPE_LIBRARY[typ])

    level, verb = val("Bloom Level").strip(), val("Bloom Verb").strip().lower()
    s["bloom"] = 0.5 * (level in BLOOM) + 0.5 * (level in BLOOM and verb in BLOOM[level])

    obj = val("Learning Objective")
    s["objective_form"] = (0.5 * bool(re.match(r"\s*The learner will\b", obj))
                           + 0.25 * (not BANNED_VERBS.search(obj)) + 0.25 * (words(obj) >= 8))

    content = val("Content")
    rows = [ln for ln in content.splitlines() if ln.strip().startswith("|")]
    items = [ln for ln in content.splitlines() if LIST_RE.match(ln)]
    structured = len(rows) >= 4 or len(items) >= 3
    s["content_specific"] = (0.5 * (not VAGUE_RE.search(content))
                             + 0.5 * (1.0 if structured else min(1.0, words(content) / 40)))

    ev = val("Evidence of Mastery")
    s["evidence_rule"] = 0.5 * (words(ev) >= 12) + 0.5 * bool(CRITERION_RE.search(ev))

    prov = val("Provenance")
    s["provenance"] = 0.0 if not prov else (1.0 if PROVENANCE_RE.search(prov) else 0.5)

    rules = val("Rules")
    s["rules_model"] = 0.4 * (words(rules) >= 10) + 0.6 * bool(FORMULA_RE.search(rules))

    act = val("Learner Activity")
    numbered = len(re.findall(r"^\s*\d+[.)]\s+\S", act, re.M))
    inline = len(re.findall(r"\[\d+\]|\(\d+\)", act))
    s["activity_steps"] = 1.0 if numbered >= 2 else (0.5 if inline >= 2 else 0.0)
    s["activity_interactive"] = float(bool(INTERACT_RE.search(act)))

    fb = val("Feedback")
    s["feedback_complete"] = (bool(re.search(r"correct|right", fb, re.I))
                              + bool(re.search(r"incorrect|wrong|not quite|miss|mistake|try again", fb, re.I))
                              + bool(re.search(r"attempt|tr(?:y|ies)|retry|chance|reveal", fb, re.I))) / 3

    s["starting_state"] = float(words(val("Starting State")) >= 5)

    anchors = val("Chapter Anchors")
    if not anchors:
        s["anchors"] = 0.0
    else:
        nums = set(re.findall(r"\d+(?:\.\d+)?", anchors))
        ok = (not nums) or nums <= chapter_numbers
        s["anchors"] = 0.5 + 0.5 * ok

    visible = re.sub(r"<[^>]+>", " ", block_text)
    hits = len(BUILD_RE.findall(visible))
    s["no_build_details"] = 1.0 if hits == 0 else (0.5 if hits == 1 else 0.0)
    s["no_impossible"] = float(not IMPOSSIBLE_RE.search(visible))
    s["no_placeholder"] = float(not (PLACEHOLDER_RE.search(block_text) or ANGLE_SLOT_RE.search(block_text)))

    sid = val("sim-id").strip()
    s["sim_id"] = 0.5 * kebab_ok(sid) + 0.5 * (bool(sid) and sid not in sim_ids_seen)

    norm_sum, norm_head = norm(summary), norm(header_title or "")
    s["summary_matches"] = float(bool(header_title) and bool(norm_sum) and norm_sum == norm_head)
    s["status"] = float(val("Status").strip() in ("Specified", "Reused"))
    s["spec_depth"] = band(words(visible), 40, 150, 1200, 3000)
    return s


SPEC_WEIGHTS = {
    "fields_present": 3, "label_format": 1, "enums_valid": 1.5, "type_library": 1, "bloom": 2,
    "objective_form": 1, "content_specific": 3, "evidence_rule": 2, "provenance": 1, "rules_model": 2,
    "activity_steps": 1.5, "activity_interactive": 1.5, "feedback_complete": 2, "starting_state": 1,
    "anchors": 1, "no_build_details": 1.5, "no_impossible": 0.5, "no_placeholder": 1, "sim_id": 1,
    "summary_matches": 0.5, "status": 0.5, "spec_depth": 1,
}

PLACEMENT_WEIGHTS = {"header": 0.25, "bridge": 0.15, "terms_defined": 0.20, "relevance": 0.15,
                     "spacing": 0.10, "evenness": 0.10, "density": 0.05}

# --------------------------------------------------------------------------- #
# Mascot rules (CONTENT-GENERATION-GUIDE.md, "Placement Rules" and "Hard Limits")
# --------------------------------------------------------------------------- #

POSE_LIMITS = {"mascot-welcome": (1, 1), "mascot-thinking": (1, 4), "mascot-tip": (0, 3),
               "mascot-warning": (0, 3), "mascot-encourage": (0, 2), "mascot-celebration": (0, 1),
               "mascot-neutral": (0, 1)}


def mascot_checks(els, chapter_number):
    mas = [e for e in els if e["kind"] == "admonition" and e["adm_type"].startswith("mascot-")]
    counts = {p: sum(1 for e in mas if e["adm_type"] == p) for p in POSE_LIMITS}
    out = {}
    out["pose_counts"] = float(all(lo <= counts[p] <= hi for p, (lo, hi) in POSE_LIMITS.items()))
    out["known_poses"] = float(all(e["adm_type"] in POSE_LIMITS for e in mas))

    since_prose, back_to_back = True, 0
    seen_any = False
    for e in els:
        if e["kind"] == "paragraph":
            since_prose = True
        elif e["kind"] == "admonition" and e["adm_type"].startswith("mascot-"):
            if seen_any and not since_prose:
                back_to_back += 1
            seen_any, since_prose = True, False
    out["no_back_to_back"] = float(back_to_back == 0)

    with_img = sum(1 for e in mas if MASCOT_IMG_RE.search(e["text"]))
    out["image_in_body"] = (with_img / len(mas)) if mas else 0.0

    ok = 0
    for e in mas:
        body = MASCOT_IMG_RE.sub("", e["body"])
        sentences = len(re.findall(r"[.!?](?:\s|$)", strip_inline(body)))
        intro = chapter_number == 1 and bool(re.search(r"^\s+\d+\.\s+\*\*", e["body"], re.M))
        cap = 4 if e["adm_type"] == "mascot-welcome" else 3
        ok += intro or (1 <= sentences <= cap)
    out["body_length"] = (ok / len(mas)) if mas else 0.0
    out["opens_with_welcome"] = float(bool(mas) and mas[0]["adm_type"] == "mascot-welcome")
    out["closes_with_celebration"] = float(bool(mas) and mas[-1]["adm_type"] == "mascot-celebration")
    return out, len(mas)


# --------------------------------------------------------------------------- #
# Scoring one chapter
# --------------------------------------------------------------------------- #


def teaching_start(els):
    """Index of the first element of the chapter's teaching text.

    Summary, Concepts Covered and Prerequisites are boilerplate. A boilerplate
    section ends at the next heading, at a horizontal rule, or at the first
    paragraph that follows the section's own list or table. Models do not always
    open a new section, so ending only at a heading would swallow the whole chapter."""
    in_boiler = saw_block = False
    last = 0
    for k, e in enumerate(els):
        if e["kind"] == "heading":
            if e["level"] == 1:
                last = k + 1
                continue
            if e["text"].strip().lower() in BOILERPLATE_SECTIONS:
                in_boiler, saw_block = True, False
                last = k + 1
                continue
            return k
        if not in_boiler:
            return k
        if e["kind"] == "paragraph" and not e["text"].strip().strip("-*_ "):
            return k + 1                      # a horizontal rule closes the section
        if e["kind"] in ("list", "table"):
            saw_block = True
        elif e["kind"] == "paragraph" and saw_block:
            return k                          # prose after the section's list or table
        last = k + 1
    return last


def element_prose(e):
    if e["kind"] == "paragraph":
        return e["text"]
    if e["kind"] == "list":
        return e["text"]
    if e["kind"] == "admonition":
        return e["body"]
    return ""


def score_chapter(path, ctx):
    raw = Path(path).read_text(errors="replace")
    meta, text = split_frontmatter(raw)
    els = parse_elements(text)
    chapter_number = int(re.match(r"\d+", path.parent.name).group()) if re.match(r"\d+", path.parent.name) else 0

    # ---- classify elements --------------------------------------------------
    concepts, concept_table = concepts_covered(els)
    specs, others = [], []
    for k, e in enumerate(els):
        if e["kind"] != "details":
            continue
        hj = find_header(els, k)
        header = els[hj] if hj is not None else None
        labels = len(LABEL_RE.findall(e["text"]))
        reused = bool(re.search(r"<iframe|\(reused microsim\)", e["text"], re.I))
        sm = re.search(r"<summary>(.*?)</summary>", e["text"], re.S | re.I)
        diagram_summary = bool(sm and re.match(r"\s*(?:#{1,6}\s*)?Diagram\b", re.sub(r"<[^>]+>", "", sm.group(1)), re.I))
        if header is not None or labels >= 3 or reused or diagram_summary:
            e["header"] = header
            e["header_index"] = hj
            e["reused"] = reused
            e["index"] = k
            specs.append(e)
        else:
            others.append(e)
    attached = {e["header_index"] for e in specs if e.get("header_index") is not None}
    for k, e in enumerate(els):
        if e["kind"] == "heading" and re.match(r"diagram\b", e["text"], re.I):
            nxt = next((x for x in els[k + 1:k + 3] if x["kind"] != "paragraph"), None)
            if nxt is not None and nxt["kind"] == "html" and "<iframe" in nxt["text"].lower():
                attached.add(k)
    bare_headers = sum(1 for k, e in enumerate(els)
                       if e["kind"] == "heading" and re.match(r"diagram\b", e["text"], re.I)
                       and k not in attached)
    if bare_headers:
        flags_pending = [f"BARE_DIAGRAM_HEADER:{bare_headers}"]
    else:
        flags_pending = []
    all_iframes = [e for e in els if e["kind"] == "html" and "<iframe" in e["text"].lower()]
    iframes = [e for e in all_iframes if not FAKE_HOST_RE.search(e["text"])]
    external_iframes = len(all_iframes) - len(iframes)

    prose_kinds = ("paragraph", "list", "admonition")
    body_text = "\n\n".join(element_prose(e) for e in els if e["kind"] in prose_kinds)
    words_total = words(text)
    # Student-facing words: whitespace tokens, as the guide counts them, minus the
    # specification blocks, code, and the Concepts Covered table.
    skip = {id(e) for e in specs} | ({id(concept_table)} if concept_table else set())
    counted = [e for e in els if e["kind"] != "code" and id(e) not in skip]
    words_body = sum(words(e["text"]) for e in counted)
    stub = (PLACEHOLDER.lower() in text.lower()) or words_total < WRITTEN_WORDS

    # ---- raw metrics ----------------------------------------------------------
    math = count_math("\n".join(e["text"] for e in els if e["kind"] != "code"))
    equations = scan_equations("\n".join(e["text"] for e in els if e["kind"] != "code"))
    eq_ok, eq_bad, eq_detail = summarize_equations(equations)
    math_issues = [{"form": e["form"], "problems": e["problems"], "excerpt": e["excerpt"]}
                   for e in equations if e["problems"]]
    lists_total, lists_missing = list_stats(text)
    tables = [e for e in els if e["kind"] == "table" and e is not concept_table]
    counted_text = "\n".join(e["text"] for e in counted if e["kind"] != "table")
    worked = len(re.findall(r"^\s*(?:#{1,6}\s*)?(?:\*{1,2}|_{1,2})?\s*(?:worked\s+)?example\b",
                            counted_text, re.I | re.M))
    prose = strip_inline(body_text)
    grade, ease, wps, engine = reading_stats(prose, ctx["engine"])

    counts, tlo, thi = budget_for(concepts, ctx["cis_max"])
    n_a, n_b = counts["A"], counts["B"]

    admons = [e for e in els if e["kind"] == "admonition"]
    metrics = {
        "words_total": words_total, "words_body": words_body, "stub": stub,
        "concepts": len(concepts), "tier_a": n_a, "tier_b": n_b, "tier_c": counts["C"],
        "target_words_low": tlo, "target_words_high": thi,
        "diagrams": len(specs), "iframes": len(iframes), "iframes_fake_host": external_iframes,
        "tables": len(tables), "lists": lists_total,
        "lists_unrendered": lists_missing, "worked_examples": worked,
        "admonitions": len(admons), "code_blocks": sum(1 for e in els if e["kind"] == "code"),
        "math_paren": math["paren"], "math_bracket": math["bracket"], "math_dollar": math["dollar"],
        "equations_ok": eq_ok, "equations_bad": eq_bad, "equation_problems": eq_detail,
        "grade": r3(grade), "ease": r3(ease), "words_per_sentence": r3(wps),
        "headings_h1": sum(1 for e in els if e["kind"] == "heading" and e["level"] == 1),
    }
    flags = list(flags_pending)
    if eq_bad:
        flags.append(f"MALFORMED_MATH:{eq_bad}")
    metrics["diagram_headers_without_block"] = bare_headers
    if stub:
        flags.append("STUB")
        return {"chapter": path.parent.name, "title": meta.get("title", ""), "state": "stub", "score": 0.0,
                "dims": {}, "metrics": metrics, "flags": flags, "subscores": {}, "reading_engine": engine,
                "math_issues": math_issues}

    start = teaching_start(els)
    # ---- budget ---------------------------------------------------------------
    sub = {}
    if tlo:
        sub["words_fit"] = band(words_body, BUDGET_ZERO_LOW * tlo, BUDGET_FULL_LOW * tlo,
                                BUDGET_FULL_HIGH * thi, BUDGET_ZERO_HIGH * thi)
        if words_body < 0.5 * tlo:
            flags.append("UNDER_BUDGET")
        if words_body > 2 * thi:
            flags.append("OVER_BUDGET")
    else:
        sub["words_fit"] = None
    need_worked = n_a + n_b
    sub["worked_examples"] = (at_least(worked, ELEMENT_TOLERANCE * need_worked, 0) if need_worked else None)
    non_text = len(specs) + len(iframes) + len(tables)
    sub["non_text"] = (at_least(non_text, ELEMENT_TOLERANCE * n_a, 0) if n_a else None)
    norm_body = " " + norm(strip_inline(body_text)) + " "
    found = 0
    for label, _ in concepts:
        variants = {label, re.sub(r"\s*\([^)]*\)", "", label)} | set(re.findall(r"\(([^)]+)\)", label))
        if any(norm(v) and f" {norm(v)} " in norm_body for v in variants if v.strip()):
            found += 1
    sub["concept_coverage"] = (found / len(concepts)) if concepts else None
    metrics["concepts_found"] = found
    title_toks = content_tokens(meta.get("title", "") or next(
        (e["text"] for e in els if e["kind"] == "heading" and e["level"] == 1), ""))
    pool = content_tokens(" ".join(l for l, _ in concepts) + " " +
                          " ".join(e["text"] for e in els if e["kind"] == "heading" and e["level"] >= 2))
    title_toks -= GENERIC_TITLE_WORDS
    sub["title_alignment"] = float(bool(title_toks & pool)) if (title_toks and concepts) else None
    if sub["title_alignment"] == 0.0:
        flags.append("TITLE_MISMATCH")
    budget = wmean([(sub["words_fit"], 0.35), (sub["worked_examples"], 0.20),
                    (sub["non_text"], 0.15), (sub["concept_coverage"], 0.20),
                    (sub["title_alignment"], 0.10)])
    if budget is None:
        budget = 0.0
        flags.append("NO_CONCEPT_TABLE")

    # ---- diagram placement and spec quality -----------------------------------
    chapter_numbers = set(re.findall(r"\d+(?:\.\d+)?", strip_inline(body_text))) | set(
        re.findall(r"\d+(?:\.\d+)?", body_text))
    spec_scores, block_rows, sim_ids = [], [], set()
    place_rows = {k: [] for k in ("header", "bridge", "terms_defined", "relevance")}
    positions = []
    word_offset = 0
    offsets = []
    for k, e in enumerate(els):
        offsets.append(word_offset)
        if e["kind"] != "code" and id(e) not in skip:
            word_offset += words(e["text"])
    no_header = 0
    for e in specs:
        k = e["index"]
        fields, summary = parse_spec(e["text"])
        header = e["header"]
        title = re.sub(r"^diagram\s*:?\s*", "", header["text"], flags=re.I).strip() if header else ""
        if not header:
            title = re.sub(r"^(?:#{1,6}\s*)?diagram\s*:?\s*", "", summary, flags=re.I).strip() or summary
        if header is None:
            no_header += 1
            place_rows["header"].append(0.0)
        else:
            exact = header["level"] == 4 and re.match(r"Diagram:\s+\S", header["text"])
            place_rows["header"].append(1.0 if exact else 0.5)

        # bridge: a paragraph right before the header, or right before the block
        cands = []
        if header is not None and e["header_index"] >= 1:
            cands.append(els[e["header_index"] - 1])
        if k >= 1 and (header is None or k - 1 > e["header_index"]):
            cands.append(els[k - 1])
        bridge = 0.0
        for before in cands:
            if before["kind"] == "paragraph" and words(before["text"]) >= 8:
                tail = " ".join(split_sentences(strip_inline(before["text"]))[-2:])
                bridge = max(bridge, 1.0 if SIGNPOST_RE.search(tail) else 0.5)
        place_rows["bridge"].append(bridge)

        # terms defined before the block
        before_text = norm(" ".join(
            strip_inline(element_prose(x)) if x["kind"] in prose_kinds else (x["text"] if x["kind"] == "heading" else "")
            for x in els[start:k]))
        prereq = fields.get("Prerequisites", {}).get("value", "")
        if not prereq:
            place_rows["terms_defined"].append(0.0)
        else:
            cleaned = re.sub(r"\([^)]*\)", "", prereq)
            terms = [t.strip(" .") for t in re.split(r"[;,]|\band\b|\n", cleaned) if t.strip(" .")]
            terms = [t for t in terms if t.lower() not in ("none", "n/a", "no prerequisites")]
            if not terms:
                place_rows["terms_defined"].append(1.0)
            else:
                got = []
                for t in terms:
                    nt = norm(t)
                    if f" {nt} " in f" {before_text} ":
                        got.append(1.0)
                    elif nt and all(f" {tok} " in f" {before_text} " for tok in nt.split() if len(tok) > 2):
                        got.append(0.5)
                    else:
                        got.append(0.0)
                place_rows["terms_defined"].append(sum(got) / len(got))

        # relevance: objective and title words appear in the preceding 300 words
        want = content_tokens(title + " " + fields.get("Learning Objective", {}).get("value", ""))
        window = []
        n_words = 0
        for x in reversed(els[start:k]):
            if x["kind"] in prose_kinds:
                t = strip_inline(element_prose(x))
            elif x["kind"] == "heading":
                t = x["text"]
            else:
                continue
            window.append(t)
            n_words += words(t)
            if n_words >= 300:
                break
        have = content_tokens(" ".join(window))
        place_rows["relevance"].append(clamp01((len(want & have) / len(want)) / 0.5) if want else 0.0)

        # spec fields
        if e["reused"]:
            sc = {name: 1.0 for name in SPEC_WEIGHTS}
        else:
            sc = check_spec(fields, summary, title if header else "", chapter_numbers, sim_ids, e["text"])
        sid = fields.get("sim-id", {}).get("value", "").strip()
        if sid:
            sim_ids.add(sid)
        block_score = wmean([(sc[name], w) for name, w in SPEC_WEIGHTS.items()])
        spec_scores.append(block_score)
        block_rows.append({"title": title or summary, "score": r3(block_score), "fields": fields, "checks": sc})
        positions.append(offsets[k])
    if no_header:
        flags.append(f"NO_HEADER:{no_header}")

    n_spec = len(specs)
    placement_sub = {"header": None, "bridge": None, "terms_defined": None, "relevance": None}
    if n_spec:
        for name, vals in place_rows.items():
            placement_sub[name] = sum(vals) / len(vals)
    else:
        placement_sub = {k: 0.0 for k in placement_sub}
        flags.append("NO_DIAGRAMS")

    # spacing: longest run of plain paragraphs between non-text elements
    runs, run = [], 0
    for e in els[start:]:
        if e["kind"] == "paragraph":
            run += 1
        elif e["kind"] == "heading":
            continue
        else:
            runs.append(run)
            run = 0
    runs.append(run)
    excess = sum(max(0, r - MAX_PARAGRAPHS_WITHOUT_ELEMENT) for r in runs)
    paragraphs = sum(runs)
    placement_sub["spacing"] = at_most(excess / paragraphs, 0.0, 0.5) if paragraphs else 0.0
    metrics["paragraph_excess"] = excess
    metrics["longest_paragraph_run"] = max(runs) if runs else 0

    # evenness: largest gap between diagrams, relative to the ideal 1 / (n + 1)
    if n_spec and words_body:
        marks = [0] + sorted(positions) + [words_body]
        gap = max(b - a for a, b in zip(marks, marks[1:])) / words_body
        placement_sub["evenness"] = clamp01((1 / (n_spec + 1)) / gap)
    else:
        placement_sub["evenness"] = 0.0
    per_k = n_spec / (words_body / 1000) if words_body else 0
    metrics["diagrams_per_1000_words"] = r3(per_k)
    placement_sub["density"] = band(per_k, *DIAGRAMS_PER_1000)
    placement = wmean([(placement_sub[k], w) for k, w in PLACEMENT_WEIGHTS.items()])

    spec = (sum(spec_scores) / len(spec_scores)) if spec_scores else 0.0
    if n_spec and spec < 0.5:
        flags.append("THIN_SPEC")
    metrics["spec_mean"] = r3(spec)

    # ---- padding --------------------------------------------------------------
    sents = [norm(s) for s in split_sentences(prose)]
    sents = [s for s in sents if len(s.split()) >= 6]
    dup_rate = (len(sents) - len(set(sents))) / len(sents) if sents else 0.0
    paras = [norm(strip_inline(e["text"])).split() for e in els if e["kind"] == "paragraph"]
    paras = [p for p in paras if len(p) >= 25]
    shingles = [{" ".join(p[i:i + 4]) for i in range(len(p) - 3)} for p in paras]
    dup_paras = set()
    for a in range(len(shingles)):
        for b in range(a + 1, len(shingles)):
            u = len(shingles[a] | shingles[b])
            if u and len(shingles[a] & shingles[b]) / u >= 0.7:
                dup_paras.update((a, b))
    near_dup = len(dup_paras) / len(paras) if paras else 0.0
    compress = window_compression(prose)
    filler = len(FILLER_RE.findall(prose)) / (words_body / 1000) if words_body else 0.0

    templated = 0
    if n_spec > 1:
        keyed = []
        for br in block_rows:
            f = br["fields"]
            keyed.append({n: norm(f[n]["value"]) for n in
                          ("Evidence of Mastery", "Misconceptions", "Instructional Rationale", "Rules",
                           "Feedback", "Starting State") if n in f and f[n]["value"]})
        for a in range(len(keyed)):
            for b in range(len(keyed)):
                if a != b and sum(1 for n, v in keyed[a].items() if keyed[b].get(n) == v) >= 2:
                    templated += 1
                    break
        titles = [norm(br["title"]) for br in block_rows]
        templated += len(titles) - len(set(titles))
        templated = min(templated, n_spec)
    metrics.update({"dup_sentence_rate": r3(dup_rate), "near_dup_paragraph_rate": r3(near_dup),
                    "compression_ratio": r3(compress), "filler_per_1000": r3(filler),
                    "templated_specs": templated})
    if templated:
        flags.append(f"TEMPLATED:{templated}")
    padding_sub = {
        "dup_sentences": at_most(dup_rate, 0.02, 0.15),
        "near_dup_paragraphs": at_most(near_dup, 0.0, 0.25),
        "compression": at_least(compress, 0.30, 0.18),
        "filler": at_most(filler, 1.0, 6.0),
        "templated_specs": (1 - templated / n_spec) if n_spec else 1.0,
    }
    padding = wmean([(padding_sub["dup_sentences"], 0.25), (padding_sub["near_dup_paragraphs"], 0.15),
                     (padding_sub["compression"], 0.20), (padding_sub["filler"], 0.20),
                     (padding_sub["templated_specs"], 0.20)])

    # ---- format ---------------------------------------------------------------
    heads = [e for e in els if e["kind"] == "heading"]
    skipped = sum(1 for a, b in zip(heads, heads[1:]) if b["level"] > a["level"] + 1)
    present = {h["text"].strip().lower() for h in heads if h["level"] == 2}
    adm_ok = [e for e in admons if e["indent"] is not None and e["indent"] % 4 == 0 and e["indent"] >= 4]
    imgs = [m for e in els if e["kind"] != "code" for m in MD_IMG_RE.findall(e["text"])]
    broken_syntax = sum(len(BROKEN_IMG_RE.findall(e["text"])) for e in els if e["kind"] != "code")
    img_ok = 0
    for target in imgs:
        t = target.split("#")[0].split("?")[0]
        if not t or re.match(r"^(?:https?:|data:|mailto:)", t):
            img_ok += 1
        elif (path.parent / t).exists():
            img_ok += 1
    n_imgs = len(imgs) + broken_syntax
    detail_open = len(re.findall(r"<details\b", text, re.I))
    markdown_attr = len(re.findall(r"<details[^>]*\bmarkdown=\"1\"", text, re.I))
    last_text = next((ln.strip() for ln in reversed(text.splitlines()) if ln.strip()), "")
    fences = len(re.findall(r"^\s*(?:```|~~~)", text, re.M))
    balanced = (fences % 2 == 0 and detail_open == len(re.findall(r"</details>", text, re.I))
                and text.count("$$") % 2 == 0)
    truncated = bool(last_text) and not TERMINAL_RE.search(last_text) and not last_text.startswith(("![", "<", "---"))
    if truncated:
        flags.append("TRUNCATED")
    if lists_missing:
        flags.append(f"LISTS:{lists_missing}")
    if broken_syntax or (n_imgs - img_ok - broken_syntax) > 0:
        flags.append(f"IMG_BROKEN:{n_imgs - img_ok}")
    if external_iframes:
        flags.append(f"IFRAME_FAKE_HOST:{external_iframes}")

    leak_text = "\n".join(e["text"] for e in els if e["kind"] in ("heading", "paragraph", "list", "table", "html"))
    leaks = len(SCAFFOLD_RE.findall(leak_text))
    metrics["scaffold_leaks"] = leaks
    if leaks:
        flags.append(f"SCAFFOLD_LEAK:{leaks}")
    format_sub = {
        "no_scaffold_leak": at_most(leaks, 0, 3),
        "list_spacing": (1 - lists_missing / lists_total) if lists_total else 1.0,
        "admonition_indent": (len(adm_ok) / len(admons)) if admons else None,
        "images": ((img_ok + len(iframes)) / (n_imgs + len(all_iframes))) if (n_imgs + len(all_iframes)) else None,
        "headings": (0.25 * (metrics["headings_h1"] == 1) + 0.25 * (skipped == 0)
                     + 0.5 * (len(BOILERPLATE_SECTIONS & present) / len(BOILERPLATE_SECTIONS))),
        "details_markdown": (markdown_attr / detail_open) if detail_open else None,
        "well_formed": float(balanced and not truncated),
        "frontmatter": float(bool(meta.get("title")) and bool(meta.get("description"))),
    }
    fmt_pairs = [(format_sub["no_scaffold_leak"], 0.15), (format_sub["list_spacing"], 0.25),
                 (format_sub["admonition_indent"], 0.10),
                 (format_sub["images"], 0.10),
                 (format_sub["headings"], 0.15), (format_sub["details_markdown"], 0.10),
                 (format_sub["well_formed"], 0.10), (format_sub["frontmatter"], 0.05)]
    mascot_mode = ctx["mascot"]
    mas_sub, mas_n = mascot_checks(els, chapter_number)
    metrics["mascot_admonitions"] = mas_n
    if mascot_mode == "on":
        fmt_pairs.append((sum(mas_sub.values()) / len(mas_sub), 0.20))
        format_sub["mascot"] = sum(mas_sub.values()) / len(mas_sub)
    elif mas_n:
        fmt_pairs.append((0.0, 0.20))
        format_sub["mascot"] = 0.0
        flags.append("MASCOT_UNDEFINED")
    fmt = wmean(fmt_pairs)

    # ---- reader fit -------------------------------------------------------------
    t = ctx["target_grade"]
    math_per_k = sum(math.values()) / (words_body / 1000) if words_body else 0.0
    worked_per_k = worked / (words_body / 1000) if words_body else 0.0
    kinds = sum(bool(x) for x in (lists_total, tables, specs or iframes, admons, metrics["code_blocks"],
                                  math["bracket"] + sum(1 for e in els if e["kind"] == "math"), imgs))
    reader_sub = {
        "grade": band(grade, t - 5, t - 2, t + 1.5, t + 5) if grade is not None else 0.0,
        "sentence_length": band(wps, 6, 10, 20, 32) if wps is not None else 0.0,
        "math_present": band(math_per_k, *MATH_PER_1000),
        "worked_density": at_least(worked_per_k, WORKED_PER_1000, 0.0),
        "variety": at_least(kinds, 4, 1),
    }
    reader = wmean([(reader_sub["grade"], 0.40), (reader_sub["sentence_length"], 0.15),
                    (reader_sub["math_present"], 0.20), (reader_sub["worked_density"], 0.15),
                    (reader_sub["variety"], 0.10)])
    metrics["math_per_1000"] = r3(math_per_k)
    metrics["worked_per_1000"] = r3(worked_per_k)

    dims = {"budget": budget, "placement": placement, "spec": spec, "format": fmt,
            "padding": padding, "reader": reader}
    score = sum(WEIGHTS[k] * dims[k] for k in WEIGHTS) / sum(WEIGHTS.values()) * 100
    subscores = {"budget": sub, "placement": placement_sub, "format": format_sub,
                 "padding": padding_sub, "reader": reader_sub}
    return {"chapter": path.parent.name, "title": meta.get("title", ""), "state": "written",
            "score": round(score, 1), "dims": {k: round(v * 100, 1) for k, v in dims.items()},
            "metrics": metrics, "flags": flags, "reading_engine": engine, "math_issues": math_issues,
            "subscores": {d: {k: r3(v) for k, v in s.items()} for d, s in subscores.items()},
            "diagram_blocks": [{"title": b["title"], "score": b["score"],
                                "failed": [k for k, v in b["checks"].items() if v < 1.0]} for b in block_rows]}


# --------------------------------------------------------------------------- #
# Books
# --------------------------------------------------------------------------- #


def resolve(path):
    """Return (name, chapters_dir, chapter_files)."""
    p = Path(path).expanduser().resolve()
    if p.is_file():
        return p.parent.parent.parent.name, p.parent.parent, [p]
    for cand in (p / "docs" / "chapters", p / "chapters", p):
        files = [d / "index.md" for d in cand.glob("*/") if re.match(r"\d+", d.name) and (d / "index.md").exists()]
        if files:
            files.sort(key=lambda f: int(re.match(r"\d+", f.parent.name).group()))
            name = cand.parent.parent.name if cand.parent.name == "docs" else cand.parent.name
            return name, cand, files
    raise SystemExit(f"no chapters found under {path}")


def load_cis_max(chapters_dir, explicit, all_tables_max):
    for cand in ([Path(explicit)] if explicit else []) + [chapters_dir.parent / "learning-graph" / "learning-graph.json"]:
        try:
            nodes = json.loads(cand.read_text())["nodes"]
            top = max(float(n.get("cis", 0)) for n in nodes)
            if top > 0:
                return top, "learning-graph.json"
        except (OSError, ValueError, KeyError, TypeError):
            continue
    return all_tables_max, "chapter tables"


def pick_engine(want):
    if want in ("auto", "textstat"):
        try:
            import textstat  # noqa: F401
            return "textstat"
        except ImportError:
            if want == "textstat":
                raise SystemExit("textstat is not installed")
    return "builtin"


def score_book(path, args):
    name, chapters_dir, files = resolve(path)
    table_max = 1.0
    for f in files:
        _, body = split_frontmatter(f.read_text(errors="replace"))
        cs, _ = concepts_covered(parse_elements(body))
        table_max = max([table_max] + [c for _, c in cs if c])
    cis_max, cis_src = load_cis_max(chapters_dir, args.graph, table_max)
    defined = (chapters_dir.parent / "img" / "mascot").is_dir()
    mascot = {"on": "on", "off": "off", "auto": "on" if defined else "off"}[args.mascot]
    ctx = {"cis_max": cis_max, "engine": pick_engine(args.reading_engine),
           "target_grade": args.target_grade, "mascot": mascot}
    chapters = [score_chapter(f, ctx) for f in files]

    written = [c for c in chapters if c["state"] == "written"]
    q = [c["score"] for c in written]
    mean_w = statistics.fmean(q) if q else 0.0
    cv = (statistics.pstdev(q) / mean_w) if len(q) > 1 and mean_w else 0.0
    consistency = max(0.0, 1 - cv) * 100 if len(q) > 1 else None
    level = statistics.fmean(c["score"] for c in chapters)
    med = statistics.median(q) if q else 0.0
    mad = statistics.median(abs(x - med) for x in q) if q else 0.0
    for c in chapters:
        c["z"] = None
        if c["state"] == "written" and len(q) >= 4:
            c["z"] = round((c["score"] - med) / max(1.4826 * mad, 2.0), 2)
            if abs(c["z"]) >= 2:
                c["flags"].append("OUTLIER_LOW" if c["z"] < 0 else "OUTLIER_HIGH")
    dim_stats = {}
    for d in WEIGHTS:
        vals = [c["dims"][d] for c in written]
        if vals:
            m = statistics.fmean(vals)
            dim_stats[d] = {"mean": round(m, 1), "cv": round(statistics.pstdev(vals) / m, 2) if m and len(vals) > 1 else None}
    summary = {
        "book": name, "chapters": len(chapters), "written": len(written),
        "level": round(level, 1), "median_written": round(med, 1),
        "consistency": None if consistency is None else round(consistency, 1),
        "floor": round(min(q), 1) if q else 0.0,
        "composite": None if consistency is None else round(level * consistency / 100, 1),
        "equations_ok": sum(c["metrics"]["equations_ok"] for c in chapters),
        "equations_bad": sum(c["metrics"]["equations_bad"] for c in chapters),
        "equations_bad_chapters": sum(1 for c in chapters if c["metrics"]["equations_bad"]),
        "dimensions": dim_stats, "cis_max": cis_max, "cis_max_source": cis_src,
        "reading_engine": ctx["engine"], "mascot_rules": mascot,
    }
    return {"summary": summary, "chapters": chapters}


# --------------------------------------------------------------------------- #
# Output
# --------------------------------------------------------------------------- #


def fmt_num(x, d=1):
    return "—" if x is None else f"{x:.{d}f}"


def print_book(book, raw):
    s = book["summary"]
    print(f"\n## {s['book']}\n")
    print(f"- Chapters written: {s['written']} of {s['chapters']}")
    print(f"- Level {s['level']} (mean score, unwritten = 0) · median of written {s['median_written']} · "
          f"floor {s['floor']}")
    print(f"- Consistency {fmt_num(s['consistency'])} · **Composite {fmt_num(s['composite'])}**")
    n_bad = s["equations_bad_chapters"]
    eq_where = f" in {n_bad} chapter{'s' if n_bad != 1 else ''}" if s["equations_bad"] else ""
    print(f"- Equations: {s['equations_ok']} well formed, {s['equations_bad']} malformed{eq_where} "
          f"(reported, not scored)")
    print(f"- Max CIS {s['cis_max']:.0f} from {s['cis_max_source']}; reading engine {s['reading_engine']}; "
          f"mascot rules {s['mascot_rules']}\n")
    print("| Chapter | State | Score | Budget | Place | Spec | Format | Pad | Reader | Flags |")
    print("|---|---|---:|---:|---:|---:|---:|---:|---:|---|")
    for c in book["chapters"]:
        d = c["dims"]
        row = [f"{d[k]:.0f}" if d else "—" for k in ("budget", "placement", "spec", "format", "padding", "reader")]
        print(f"| {c['chapter']} | {c['state']} | {c['score']:.1f} | " + " | ".join(row)
              + f" | {', '.join(c['flags'])} |")
    dims = s["dimensions"]
    if dims:
        print("\n| Dimension | " + " | ".join(dims) + " |")
        print("|---|" + "---:|" * len(dims))
        print("| mean | " + " | ".join(f"{v['mean']:.0f}" for v in dims.values()) + " |")
        print("| CV | " + " | ".join(fmt_num(v["cv"], 2) for v in dims.values()) + " |")
    if raw:
        print("\n| Chapter | Words | Body | Target | Concepts A/B/C | Diagrams | Worked | Tables | Lists (bad) "
              "| Math | Eq ok | Eq bad | Grade | Ease | Words/sent |")
        print("|---|---:|---:|---:|---|---:|---:|---:|---|---:|---:|---:|---:|---:|---:|")
        for c in book["chapters"]:
            m = c["metrics"]
            math = m["math_paren"] + m["math_bracket"] + m["math_dollar"]
            print(f"| {c['chapter']} | {m['words_total']} | {m['words_body']} | "
                  f"{m['target_words_low']}-{m['target_words_high']} | "
                  f"{m['tier_a']}/{m['tier_b']}/{m['tier_c']} | {m['diagrams']} | {m['worked_examples']} | "
                  f"{m['tables']} | {m['lists']} ({m['lists_unrendered']}) | {math} | "
                  f"{m['equations_ok']} | {m['equations_bad']} | "
                  f"{fmt_num(m['grade'])} | {fmt_num(m['ease'])} | {fmt_num(m['words_per_sentence'])} |")


def print_comparison(books):
    print("\n## Comparison\n")
    print("| Book | Written | Level | Consistency | Floor | Composite | Budget | Place | Spec | Format | Pad | Reader "
          "| Math ok/bad |")
    print("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
    for b in sorted(books, key=lambda b: -(b["summary"]["composite"] or 0.0)):
        s = b["summary"]
        dm = [fmt_num(s["dimensions"].get(k, {}).get("mean"), 0) for k in WEIGHTS]
        print(f"| {s['book']} | {s['written']}/{s['chapters']} | {s['level']:.1f} | {fmt_num(s['consistency'])} | "
              f"{s['floor']:.1f} | **{fmt_num(s['composite'])}** | " + " | ".join(dm)
              + f" | {s['equations_ok']}/{s['equations_bad']} |")


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="+")
    ap.add_argument("--json")
    ap.add_argument("--csv")
    ap.add_argument("--graph")
    ap.add_argument("--target-grade", type=float, default=9.0)
    ap.add_argument("--reading-engine", choices=("auto", "textstat", "builtin"), default="auto")
    ap.add_argument("--mascot", choices=("auto", "on", "off"), default="auto")
    ap.add_argument("--raw", action="store_true")
    args = ap.parse_args(argv)

    books = [score_book(p, args) for p in args.paths]
    for b in books:
        print_book(b, args.raw)
    if len(books) > 1:
        print_comparison(books)
    if args.json:
        Path(args.json).write_text(json.dumps(books, indent=1))
    if args.csv:
        with open(args.csv, "w", newline="") as f:
            w = csv.writer(f)
            head = ["book", "chapter", "state", "score", *WEIGHTS, "flags"]
            mk = sorted({k for b in books for c in b["chapters"] for k in c["metrics"]})
            w.writerow(head + mk)
            for b in books:
                for c in b["chapters"]:
                    w.writerow([b["summary"]["book"], c["chapter"], c["state"], c["score"],
                                *[c["dims"].get(k, "") for k in WEIGHTS], " ".join(c["flags"]),
                                *[c["metrics"].get(k, "") for k in mk]])


if __name__ == "__main__":
    main()
