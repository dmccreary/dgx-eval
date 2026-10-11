#!/usr/bin/env python3
"""Score the chapter structure and the chapter content of a run.

    python3 src/scoring/score_chapters.py <run-dir> [--outline <stage-2-run-dir>]

Works on stage 2 output, where each chapter is an outline, and on stage 3
output, where chapters have been written. With --outline it also reports how
many words each chapter had before stage 3 touched it.

Checks structure only: the chapter files exist, each concept in the learning
graph is assigned to a chapter, and each chapter has been written. A chapter
counts as written when its placeholder is gone and it has at least
WRITTEN_WORDS words. It does not judge whether the text is correct or worth
reading. Standard library only.
"""
import csv
import json
import re
import sys
from pathlib import Path

WRITTEN_WORDS = 1000
PLACEHOLDER = "TODO: Generate Chapter Content"


def body(path):
    """The page text without its frontmatter."""
    try:
        text = Path(path).read_text(errors="replace")
    except OSError:
        return ""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            text = text[end + 4:]
    return text


def chapter_dirs(run_dir):
    chapters = Path(run_dir) / "docs" / "chapters"
    found = [d for d in chapters.glob("*/") if re.match(r"\d+", d.name) and (d / "index.md").exists()]
    return sorted(found, key=lambda d: int(re.match(r"\d+", d.name).group()))


def concepts_listed(text):
    """Entries under the "Concepts Covered" heading, lower-cased."""
    section = re.search(r"^##\s+Concepts Covered\s*$(.*?)(?=^##\s|\Z)", text, re.M | re.S | re.I)
    entries = set()
    for line in (section.group(1) if section else "").splitlines():
        line = re.sub(r"^\s*(?:[-*+]|\d+[.)])\s+", "", line.strip())
        for cell in [line] + line.split("|"):
            cell = re.sub(r"[*_`]", "", cell).strip().lower()
            if cell:
                entries.add(cell)
    return entries


def lists_missing_blank_line(text):
    """Lists that start right after a line of text, which MkDocs will not render as lists."""
    count, previous, fenced = 0, "", False
    item = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s+\S")
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            fenced = not fenced
        elif not fenced and item.match(line) and previous.strip() and not item.match(previous) \
                and not previous.startswith((" ", "\t", "#", "|", ">")):
            count += 1
        previous = line
    return count


def score(run_dir, outline_dir=None):
    run_dir = Path(run_dir)
    out = {"chapters_index": (run_dir / "docs" / "chapters" / "index.md").exists()}
    try:
        nav = (run_dir / "mkdocs.yml").read_text(errors="replace")
    except OSError:
        nav = ""

    labels = []
    try:
        with open(run_dir / "docs" / "learning-graph" / "learning-graph.csv", newline="", errors="replace") as f:
            labels = [(r.get("ConceptLabel") or "").strip().lower() for r in csv.DictReader(f)]
    except OSError:
        pass
    labels = [l for l in labels if l]
    assigned = {label: 0 for label in labels}

    chapters = []
    for d in chapter_dirs(run_dir):
        text = body(d / "index.md")
        listed = concepts_listed(text)
        for label in assigned:
            assigned[label] += label in listed
        words = len(text.split())
        todo = PLACEHOLDER.lower() in text.lower()
        row = {
            "dir": d.name,
            "words": words,
            "placeholder_left": todo,
            "written": words >= WRITTEN_WORDS and not todo,
            "h2_sections": len(re.findall(r"^##\s", text, re.M)),
            "details_blocks": len(re.findall(r"<details", text)),
            "lists_missing_blank_line": lists_missing_blank_line(text),
            "in_nav": f"chapters/{d.name}/index.md" in nav,
        }
        if outline_dir:
            row["words_in_outline"] = len(body(Path(outline_dir) / "docs" / "chapters" / d.name / "index.md").split())
        chapters.append(row)

    out.update({
        "chapter_count": len(chapters),
        "chapters_written": sum(c["written"] for c in chapters),
        "chapters_in_nav": sum(c["in_nav"] for c in chapters),
        "total_words": sum(c["words"] for c in chapters),
        "concepts_in_graph": len(labels),
        "concepts_assigned": sum(1 for n in assigned.values() if n),
        "concepts_in_two_chapters": sum(1 for n in assigned.values() if n > 1),
        "chapters": chapters,
    })
    return out


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    outline = sys.argv[sys.argv.index("--outline") + 1] if "--outline" in sys.argv else None
    print(json.dumps(score(sys.argv[1], outline), indent=2))
