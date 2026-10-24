#!/usr/bin/env python3
"""Build the arXiv submission package for a paper and scan it for device details.

    python3 src/reporting/make_arxiv_package.py [PAPER_DIR]

PAPER_DIR   default papers/slm-textbooks; it holds main.tex, sections/, figures/

Writes PAPER_DIR/arxiv-submission/ and PAPER_DIR/arxiv-submission.zip with:

    arxiv-submission.tex   main.tex with every \\input expanded, every comment
                           removed, and the bibliography inlined
    figures/               only the figures the text includes

Why a script and not a copy: arXiv publishes the TeX source of every paper,
including comments and every file in the upload. The rules of this repository
(AGENTS.md, "Security: never expose the device under test") apply to that
source as much as to the PDF. So the script

  1. flattens and strips comments, so no draft note or "% VERIFIED" line ships;
  2. builds the bibliography with BibTeX through Tectonic and inlines the
     result, so no .bib file ships;
  3. compiles the flattened file by itself and reports its page count, so a
     package that does not build is caught here and not on arXiv;
  4. scans the TeX and the PNG metadata for the patterns in SCAN_PATTERNS, and
     for any whole words listed in the DGX_EVAL_SCAN_TERMS environment variable
     (comma-separated: the administrator's name, the units' labels). It exits
     with status 1 on any hit and writes no zip in that case.

A hit is a prompt to read the line, not proof of a leak: a version number can
look like an address. The scan finds shapes. It does not find an unusual
hostname in a caption, so a person still reads the package before upload.

Needs Tectonic on the PATH. Standard library only.
"""
import os
import re
import shutil
import struct
import subprocess
import sys
import tempfile
import zipfile
import zlib
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DEFAULT_PAPER = REPO / "papers" / "slm-textbooks"
PACKAGE = "arxiv-submission"

# (label, regex). Documentation ranges and loopback are removed by ALLOWED.
SCAN_PATTERNS = [
    ("IPv4 address", r"\b(?:\d{1,3}\.){3}\d{1,3}\b"),
    # Groups joined by ":" or the compressed "::", at least three groups.
    ("IPv6 address", r"\b[0-9a-fA-F]{1,4}(?::{1,2}[0-9a-fA-F]{1,4}){2,7}\b"),
    ("MAC address", r"\b(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}\b"),
    ("tailnet or local name", r"[A-Za-z0-9-]+\.(?:ts\.net|local|lan|internal)\b"),
    ("private key header", r"BEGIN [A-Z ]*PRIVATE KEY"),
    ("Tailscale auth key", r"tskey-[A-Za-z0-9-]+"),
    ("model-hub or API token", r"\b(?:hf_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})"),
    ("home-directory path", r"/home/[a-z_]|/Users/[A-Za-z]|C:\\Users"),
    ("serial number or GPU id", r"SERIAL=|Serial Number|GPU-[0-9a-f]{8}-"),
    ("login or credential word", r"(?i)\bpassword\s*[:=]|\bpassphrase\b|\bssh\s+[a-z_][\w-]*@"),
    ("user@host", r"\b[a-z_][a-z0-9_.-]*@[a-z0-9-]+(?:\.[a-z0-9-]+)+\b"),
]
# Names that must never appear (the administrator's name, the units' labels) are
# the very things that must not be written into this public repository, so they
# come from the environment, as the SSH targets do:
#     export DGX_EVAL_SCAN_TERMS="<name>,<unit-label>"
ENV_TERMS = "DGX_EVAL_SCAN_TERMS"

ALLOWED = re.compile(r"\b(?:192\.0\.2|198\.51\.100|203\.0\.113)\.\d+\b|100\.x\.y\.z|\b127\.0\.0\.1\b|\b0\.0\.0\.0\b")


def flatten(path, root):
    """Expand \\input{...} recursively."""
    text = path.read_text()

    def expand(m):
        name = m.group(1)
        target = root / (name if name.endswith(".tex") else name + ".tex")
        return flatten(target, root)

    return re.sub(r"\\input\{([^}]+)\}", expand, text)


def strip_comments(text):
    """Remove % comments the way TeX reads them.

    A comment-only line vanishes. An inline comment also swallows the newline
    and the next line's indentation, which is what TeX does, so spacing is
    unchanged. An escaped percent sign is kept.
    """
    out = []
    for line in text.split("\n"):
        m = re.search(r"(?<!\\)%", line)
        if m is None:
            out.append(line + "\n")
        elif line[:m.start()].strip():
            out.append(line[:m.start()].rstrip() + "%\n")  # keep TeX's own join
        # comment-only line: dropped
    return "".join(out).rstrip("\n") + "\n"


def run_tectonic(cwd, tex, extra=()):
    r = subprocess.run(["tectonic", *extra, tex.name], cwd=cwd,
                       capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"tectonic failed on {tex.name}:\n{r.stderr[-1500:]}")
    return r


def build_bbl(flat, paper):
    """Run BibTeX through Tectonic on a scratch copy and return the .bbl text."""
    with tempfile.TemporaryDirectory() as tmp:
        t = Path(tmp)
        (t / "sections").mkdir()
        shutil.copy(paper / "sections" / "references.bib", t / "sections" / "references.bib")
        shutil.copytree(paper / "figures", t / "figures")
        tex = t / f"{PACKAGE}.tex"
        tex.write_text(flat)
        run_tectonic(t, tex, ["--keep-intermediates"])
        return (t / f"{PACKAGE}.bbl").read_text()


def inline_bibliography(flat, bbl):
    pat = r"\\bibliographystyle\{[^}]*\}\s*\\bibliography\{[^}]*\}"
    if not re.search(pat, flat):
        sys.exit("main.tex has no \\bibliographystyle/\\bibliography pair to inline")
    return re.sub(pat, lambda _: bbl.strip(), flat)


def png_text_chunks(path):
    """Return (keyword, value) for every text chunk in a PNG."""
    data, pos, found = path.read_bytes(), 8, []
    while pos < len(data):
        (length,) = struct.unpack(">I", data[pos:pos + 4])
        kind, body = data[pos + 4:pos + 8], data[pos + 8:pos + 8 + length]
        if kind == b"tEXt":
            k, _, v = body.partition(b"\0")
            found.append((k.decode("latin-1"), v.decode("latin-1")))
        elif kind == b"zTXt":
            k, _, rest = body.partition(b"\0")
            found.append((k.decode("latin-1"), zlib.decompress(rest[1:]).decode("latin-1")))
        elif kind == b"iTXt":
            k, _, rest = body.partition(b"\0")
            found.append((k.decode("latin-1"), rest[:200].decode("utf-8", "replace")))
        elif kind == b"eXIf":
            found.append(("eXIf", f"{length} bytes of EXIF"))
        pos += 12 + length
    return found


def scan_patterns():
    """The fixed patterns plus one whole-word pattern per term in the environment."""
    terms = [x.strip() for x in os.environ.get(ENV_TERMS, "").split(",") if x.strip()]
    return SCAN_PATTERNS + [("project-specific term", r"(?i)\b" + re.escape(x) + r"\b") for x in terms]


def scan(texts):
    """texts: {label: text}. Return a list of (label, line_no, pattern, line)."""
    hits = []
    for label, text in texts.items():
        for n, line in enumerate(text.split("\n"), 1):
            cleaned = ALLOWED.sub("", line)
            for name, pat in scan_patterns():
                if re.search(pat, cleaned):
                    hits.append((label, n, name, line.strip()[:160]))
    return hits


def main():
    paper = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_PAPER
    if shutil.which("tectonic") is None:
        sys.exit("Tectonic is not installed: brew install tectonic")

    flat = strip_comments(flatten(paper / "main.tex", paper))
    flat = inline_bibliography(flat, build_bbl(flat, paper))
    used = sorted(set(re.findall(r"\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}", flat)))
    missing = [f for f in used if not (paper / f).exists()]
    if missing:
        sys.exit(f"figures included but missing on disk: {missing}")

    # The package must build alone.
    with tempfile.TemporaryDirectory() as tmp:
        t = Path(tmp)
        for f in used:
            (t / f).parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(paper / f, t / f)
        tex = t / f"{PACKAGE}.tex"
        tex.write_text(flat)
        run_tectonic(t, tex)
        pages = subprocess.run(["pdfinfo", str(t / f"{PACKAGE}.pdf")], capture_output=True,
                               text=True).stdout
        print("package compiles on its own;",
              next((l for l in pages.splitlines() if l.startswith("Pages")), "pages unknown"))

    texts = {f"{PACKAGE}.tex": flat}
    for f in used:
        for key, value in png_text_chunks(paper / f):
            texts[f"{f} [PNG {key}]"] = value
    hits = scan(texts)
    n_terms = len(scan_patterns()) - len(SCAN_PATTERNS)
    print(f"scanned {len(texts)} text sources with {len(SCAN_PATTERNS)} patterns and {n_terms} named terms")
    if not n_terms:
        print(f"  note: {ENV_TERMS} is not set, so no names were checked")
    if hits:
        print("\nPossible device details. Read each line; the package was NOT written:")
        for label, n, name, line in hits:
            print(f"  {label}:{n}  [{name}]  {line}")
        return 1

    out = paper / PACKAGE
    if out.exists():
        shutil.rmtree(out)
    out.mkdir()
    (out / f"{PACKAGE}.tex").write_text(flat)
    for f in used:
        (out / f).parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(paper / f, out / f)
    zip_path = paper / f"{PACKAGE}.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for p in sorted(out.rglob("*")):
            if p.is_file():
                z.write(p, p.relative_to(out))
    print(f"wrote {out.relative_to(REPO)}/ and {zip_path.relative_to(REPO)} "
          f"({zip_path.stat().st_size // 1024} KB, {len(used)} figures)")
    print("no hits. Still read the package once before upload.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
