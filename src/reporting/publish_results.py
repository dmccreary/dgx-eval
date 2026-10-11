#!/usr/bin/env python3
"""Build the Model Results pages of this book from fetched run output.

    python3 src/reporting/publish_results.py [--runs ~/dgx-eval-runs]

Run on the laptop after orchestration/fetch_runs.sh. For every model in
benchmark/models.txt that produced a learning graph it writes
docs/models/<model>/, where ":" in the model name becomes "-":

    index.md                    what each stage produced and how long it took
    learning-graph-viewer.md    the graph viewer, opened on this model's graph
    learning-graph-quality.md   structural checks and the graph analysis
    chapter-metrics.md          words, diagrams, and reading level per chapter
    course-description.md       the benchmark input, so chapter links resolve
    learning-graph/             the model's learning-graph.json and .csv
    chapters/                   the model's chapters, as it wrote them

It also writes docs/models/index.md, docs/models/models.json for the graph
viewer, and the navigation block in mkdocs.yml between the two
"model-results" comment lines. docs/models/ is rebuilt from nothing on every
run, so do not edit files there by hand.

Only three kinds of run output are copied: the learning graph, the chapter
Markdown, and the course description. Event streams, server output, and logs
are never copied. Every copied file is checked for addresses, tailnet names,
and home-directory paths, and a file that holds one is left out and reported.
Set PUBLISH_BLOCKLIST to a regular expression of the real host names and
logins to have those checked too; they cannot be written in this file.

The chapter text is copied unchanged, with one exception: a link to a page
that does not exist would stop the site from building, so the link is removed
and its text kept. The number removed is reported on the metrics page. The
original stays in the run output.

The published learning-graph.json has one more change: its FOUND group is
moved to the front of "groups" so the viewer always lists Foundation Concepts
first. No group, node, or edge is altered, and the original stays in the run
output.

Nothing here is rewritten from the skills. The graph analysis is the
learning-graph-generator skill's analyze-graph.py and the reading level is
the book-installer skill's analyze-reading-levels.py, both found through
BK_HOME (default ~/Documents/ws/ibook-skills). The reading level needs the
textstat package; without it those columns are left empty.
"""
import argparse
import csv
import importlib.util
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DOCS = REPO / "docs"
OUT = DOCS / "models"
BK_HOME = Path(os.environ.get("BK_HOME", Path.home() / "Documents" / "ws" / "ibook-skills"))
sys.path.insert(0, str(REPO / "src" / "scoring"))
from score_chapters import score as score_chapters  # noqa: E402
from score_learning_graph import score as score_graph  # noqa: E402

NAV_BEGIN = "  # BEGIN model-results (written by src/reporting/publish_results.py; do not edit by hand)"
NAV_END = "  # END model-results"
# What must never be copied into the book. Real host names and logins cannot be
# written here, because this file is public: pass them at run time as a regular
# expression in PUBLISH_BLOCKLIST and they are added to the check.
SENSITIVE = re.compile(
    r"\b\d{1,3}(?:\.\d{1,3}){3}\b|\.ts\.net|/home/[A-Za-z]|/Users/|"
    r"ssh-(?:rsa|ed25519)|PRIVATE KEY"
    + ("|" + os.environ["PUBLISH_BLOCKLIST"] if os.environ.get("PUBLISH_BLOCKLIST") else ""), re.I)
LINK = re.compile(r'(!?)\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)')
UNIT_NAMES = {"unit-1": "DGX unit A", "unit-2": "DGX unit B"}


# ---------------------------------------------------------------- run output

def slug(model):
    return model.replace(":", "-").replace("/", "-")


def read_json(path):
    try:
        return json.loads(Path(path).read_text())
    except (OSError, ValueError):
        return None


def status_of(path):
    """A run's exit code and wall-clock seconds, from its .status file."""
    try:
        text = Path(path).read_text()
    except OSError:
        return None
    code = re.search(r"exit=(\d+)", text)
    seconds = re.search(r"wall_s=(\d+)", text)
    return {"exit": int(code.group(1)) if code else None, "seconds": int(seconds.group(1)) if seconds else 0}


def find_run(runs, label, need_status=True):
    """The newest finished run with this label on any unit, as (directory, unit)."""
    found = []
    for unit in sorted(runs.glob("unit-*")):
        run, status = unit / label, unit / f"{label}.status"
        if run.is_dir() and (status.exists() or not need_status):
            found.append((status.stat().st_mtime if status.exists() else run.stat().st_mtime, run, unit.name))
    if not found:
        return None, None
    _, run, unit = max(found)
    return run, unit


def foundation_group_first(path):
    """Put the FOUND group first in a copied learning-graph.json.

    The graph viewer lists categories in the order the file's "groups" object
    holds them, and a model may write its Foundation Concepts group anywhere.
    Only the key order changes; no group, node, or edge is altered.
    """
    graph = read_json(path)
    groups = graph.get("groups") if isinstance(graph, dict) else None
    if not isinstance(groups, dict):
        return
    found = [key for key in groups if key.upper() == "FOUND"]
    if not found or next(iter(groups)) == found[0]:
        return
    graph["groups"] = {found[0]: groups[found[0]],
                       **{key: value for key, value in groups.items() if key != found[0]}}
    Path(path).write_text(json.dumps(graph, indent=2, ensure_ascii=False))


def minutes(seconds):
    return f"{seconds / 60:.0f} min" if seconds >= 60 else f"{seconds} s"


def is_safe(path, problems):
    try:
        text = Path(path).read_text(errors="replace")
    except OSError:
        return False
    hit = SENSITIVE.search(text)
    if hit:
        problems.append(f"{path}: left out, it contains {hit.group(0)!r}")
    return not hit


# ---------------------------------------------------------------- page parts

def page(title, description, body, hide_toc=False):
    front = ["---", f"title: '{title}'", f"description: '{description}'"]
    if hide_toc:
        front += ["hide:", "  - toc"]
    return "\n".join(front + ["---", "", body.rstrip("\n"), ""])


def heading_of(path, fallback):
    """A chapter's title: its frontmatter title, else its first heading."""
    try:
        text = Path(path).read_text(errors="replace")
    except OSError:
        return fallback
    for pattern in (r'^title:\s*["\']?(.+?)["\']?\s*$', r"^#\s+(.+?)\s*$"):
        found = re.search(pattern, text, re.M)
        if found:
            return re.sub(r"^Chapter\s+\d+\s*[:.-]\s*", "", found.group(1)).strip() or fallback
    return fallback


def remove_dead_links(text, source, published):
    """Drop links whose target will not exist in the book, keeping their text."""
    removed, out, fenced = 0, [], False

    def check(match):
        nonlocal removed
        target = match.group(3)
        if re.match(r"[a-z][a-z0-9+.-]*:|#|/", target, re.I):
            return match.group(0)
        path = target.split("#")[0].split("?")[0]
        if not path or path.endswith("/"):
            return match.group(0)
        resolved = Path(os.path.normpath(source.parent / path))
        if resolved in published:
            return match.group(0)
        removed += 1
        return match.group(2)

    for line in text.splitlines(keepends=True):
        if line.lstrip().startswith("```"):
            fenced = not fenced
        out.append(line if fenced else LINK.sub(check, line))
    return "".join(out), removed


def reading_levels():
    """The book-installer skill's reading-level module, or None without textstat."""
    script = BK_HOME / "skills" / "book-installer" / "scripts" / "analyze-reading-levels.py"
    try:
        spec = importlib.util.spec_from_file_location("reading_levels", script)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    except (SystemExit, Exception):  # the script exits when textstat is missing
        return None


def graph_analysis(csv_path):
    """The learning-graph-generator skill's report on a CSV, headings lowered a level."""
    script = BK_HOME / "skills" / "learning-graph-generator" / "analyze-graph.py"
    with tempfile.TemporaryDirectory() as tmp:
        report = Path(tmp) / "report.md"
        done = subprocess.run([sys.executable, str(script), str(csv_path), str(report)],
                              capture_output=True, text=True)
        if done.returncode != 0 or not report.exists():
            reason = (done.stderr.strip().splitlines() or ["no report was written"])[-1]
            return f"The analysis script could not read this graph: `{reason}`"
        text = report.read_text()
    text = re.sub(r"\A#\s+.*\n", "", text)
    return re.sub(r"^(#{2,5})\s", lambda m: m.group(1) + "# ", text, flags=re.M).strip()


# ---------------------------------------------------------------- one model

def publish_model(model, runs, facts, levels, problems):
    """Write docs/models/<model>/ and return a summary, or None without a graph."""
    name = slug(model)
    s1, s1_unit = find_run(runs, f"s1-{name}")
    graph_dir = s1 / "docs" / "learning-graph" if s1 else None
    if not s1 or not (graph_dir / "learning-graph.json").exists() or not (graph_dir / "learning-graph.csv").exists():
        return None
    out = OUT / name
    (out / "learning-graph").mkdir(parents=True)
    for file in ("learning-graph.json", "learning-graph.csv"):
        if is_safe(graph_dir / file, problems):
            shutil.copyfile(graph_dir / file, out / "learning-graph" / file)
    if (out / "learning-graph" / "learning-graph.json").exists():
        foundation_group_first(out / "learning-graph" / "learning-graph.json")

    s2, s2_unit = find_run(runs, f"s2-{name}")
    book, book_unit = find_run(runs, f"book-{name}", need_status=False)
    content = book or s2
    summary = {"model": model, "name": name, "chapters": [], "has_chapters": False}

    # ---- chapters
    removed_links = {}
    if content and (content / "docs" / "chapters").is_dir():
        sources = {}
        if (content / "docs" / "course-description.md").exists():
            sources[out / "course-description.md"] = content / "docs" / "course-description.md"
        chapters_index = content / "docs" / "chapters" / "index.md"
        if chapters_index.exists():
            sources[out / "chapters" / "index.md"] = chapters_index
        chapter_dirs = sorted((d for d in (content / "docs" / "chapters").glob("*/")
                               if re.match(r"\d+", d.name) and (d / "index.md").exists()),
                              key=lambda d: int(re.match(r"\d+", d.name).group()))
        for d in chapter_dirs:
            sources[out / "chapters" / d.name / "index.md"] = d / "index.md"
        sources = {dest: src for dest, src in sources.items() if is_safe(src, problems)}
        published = set(sources) | {out / "learning-graph" / "learning-graph.json"}
        for dest, src in sources.items():
            text, removed = remove_dead_links(src.read_text(errors="replace"), dest, published)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(text)
            if removed:
                removed_links[dest] = removed
        summary["has_chapters"] = bool(chapter_dirs)
        summary["chapters"] = [(int(re.match(r"\d+", d.name).group()), d.name,
                                heading_of(d / "index.md", d.name))
                               for d in chapter_dirs if (out / "chapters" / d.name / "index.md").exists()]
        summary["chapters_index"] = (out / "chapters" / "index.md").exists()
        summary["course_description"] = (out / "course-description.md").exists()

    # ---- learning graph viewer
    viewer = f"sims/graph-viewer/main.html?model={name}"
    (out / "learning-graph-viewer.md").write_text(page(
        f"Learning Graph: {model}",
        f"The learning graph {model} generated for the Algebra I benchmark, in the interactive viewer.",
        f"""# Learning Graph: `{model}`

[Open the Learning Graph Viewer Fullscreen (recommended)](../../{viewer}){{ .md-button .md-button--primary }}

<iframe src="../../../{viewer}" width="100%" height="700px" scrolling="no"></iframe>

This is the graph `{model}` produced in stage 1, shown as the model wrote it.
Arrows point from a concept to the concepts it depends on. The
[quality report](learning-graph-quality.md) lists what a program found wrong
with it.
""", hide_toc=True))

    # ---- learning graph quality
    g = score_graph(s1)
    j = g.get("json") if isinstance(g.get("json"), dict) else {}
    checks = [
        ("Concepts", f"{g.get('concepts')} of {g.get('target_concepts')} asked for"),
        ("Dependencies", f"{g.get('edges')}, an average of {g.get('avg_dependencies')} per concept"),
        ("Concepts on a cycle", g.get("concepts_on_cycles")),
        ("Concepts with no prerequisite", g.get("foundational_concepts")),
        ("Concepts connected to nothing", g.get("isolated_concepts")),
        ("Duplicate concept labels", g.get("duplicate_labels")),
        ("Labels longer than 32 characters", g.get("labels_over_32_chars")),
        ("Concepts with a taxonomy category", g.get("taxonomy_filled")),
        ("Errors in the CSV file", g.get("csv_error_count")),
        ("JSON file agrees with the CSV file", "Yes" if j.get("matches_csv") else "No"),
        ("Taxonomy groups in the JSON file", j.get("groups")),
        ("Expected files missing", ", ".join(f"`{f}`" for f in g.get("files_missing") or []) or "None"),
        ("Navigation mentions the learning graph", "Yes" if g.get("nav_mentions_learning_graph") else "No"),
    ]
    (out / "learning-graph-quality.md").write_text(page(
        f"Learning Graph Quality Report: {model}",
        f"Automated checks on the learning graph {model} generated for the Algebra I benchmark.",
        f"""# Learning Graph Quality Report: `{model}`

A program wrote this report from the files `{model}` produced in stage 1. It
checks structure. It does not judge whether these are the right concepts for
Algebra I or whether the dependencies make sense.

[View the learning graph](learning-graph-viewer.md){{ .md-button }}

## Structural Checks

From `src/scoring/score_learning_graph.py` in this repository.

| Check | Result |
|---|---|
""" + "\n".join(f"| {label} | {value} |" for label, value in checks) + f"""

## Graph Analysis

From `analyze-graph.py`, the analysis script of the `learning-graph-generator`
skill, run on the model's CSV file when this page was built. It is not the
report the model wrote about its own graph.

{graph_analysis(graph_dir / "learning-graph.csv")}
"""))

    # ---- chapter metrics
    stage3 = [status_of(f) for f in sorted(runs.glob(f"unit-*/s3-{name}-ch*.status"))]
    stage3 = [s for s in stage3 if s]
    if summary["has_chapters"]:
        c = score_chapters(content, s2)
        rows, grades, eases, lengths, diagrams_total, dead_total = [], [], [], [], 0, 0
        for row in c["chapters"]:
            dest = out / "chapters" / row["dir"] / "index.md"
            if not dest.exists():
                continue
            text = dest.read_text(errors="replace")
            number = int(re.match(r"\d+", row["dir"]).group())
            diagrams = len(re.findall(r"^####\s+Diagram\b", text, re.M))
            dead = removed_links.get(dest, 0)
            diagrams_total += diagrams
            dead_total += dead
            reading = ["—", "—", "—"]
            if levels and row["written"]:
                r = levels.analyze_chapter(dest)
                grades.append(r["fk_grade"]); eases.append(r["flesch_ease"]); lengths.append(r["avg_sentence_length"])
                reading = [f"{r['fk_grade']:.1f}", f"{r['flesch_ease']:.1f}", f"{r['avg_sentence_length']:.1f}"]
            title = heading_of(dest, row["dir"])
            rows.append(f"| {number} | [{title}](chapters/{row['dir']}/index.md) | "
                        f"{'Yes' if row['written'] else 'No'} | {row['words']:,} | {diagrams} | "
                        f"{' | '.join(reading)} | {row['lists_missing_blank_line']} | {dead} |")
        mean = lambda values: f"{sum(values) / len(values):.1f}" if values else "—"  # noqa: E731
        index_dead = removed_links.get(out / "chapters" / "index.md", 0)
        summary.update(chapter_count=c["chapter_count"], chapters_written=c["chapters_written"],
                       total_words=c["total_words"], fk_mean=mean(grades), diagrams=diagrams_total)
        reading_note = "" if levels else """
!!! warning "Reading level not measured"

    The `textstat` package was not available when this page was built, so the
    reading-level columns are empty. Install it and run the script again.
"""
        (out / "chapter-metrics.md").write_text(page(
            f"Chapter Content Metrics: {model}",
            f"Words, diagrams specified, and reading level for each chapter {model} wrote in the Algebra I benchmark.",
            f"""# Chapter Content Metrics: `{model}`

A program measured the chapters `{model}` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){{ .md-button }}
{reading_note}
| | Result |
|---|---|
| Chapters written | {c['chapters_written']} of {c['chapter_count']} |
| Words in all chapters | {c['total_words']:,} |
| Diagrams specified | {diagrams_total} |
| Average reading grade of the written chapters | {mean(grades)} |
| Average reading ease of the written chapters | {mean(eases)} |
| Concepts from the learning graph assigned to a chapter | {c['concepts_assigned']} of {c['concepts_in_graph']} |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
""" + "\n".join(rows) + f"""
| | **Whole book** | {c['chapters_written']} of {c['chapter_count']} | {c['total_words']:,} | {diagrams_total} | {mean(grades)} | {mean(eases)} | {mean(lengths)} | {sum(r['lists_missing_blank_line'] for r in c['chapters'])} | {dead_total} |

## What the Columns Mean

- **Written.** The chapter's placeholder is gone and it has at least 1,000
  words. A chapter marked No is still the outline from stage 2.
- **Words.** Every word in the chapter file after its frontmatter, including
  tables and diagram specifications.
- **Diagrams.** The number of `#### Diagram` headings. Each one is a
  specification for a diagram or MicroSim to be built later.
- **Reading grade.** The Flesch-Kincaid grade level: the United States school
  grade at which a reader should follow the text. Algebra I is usually taught
  in grade 9.
- **Reading ease.** The Flesch reading-ease score. Higher is easier; 60 to 70
  is plain English.
- **Words per sentence.** The average sentence length.
- **Lists that will not render.** Lists with no blank line before them, which
  the site shows as a run-on paragraph.
- **Links removed.** Links to pages that do not exist. They were removed from
  this copy so that the site builds, and their text was kept.{f" The chapter list page had {index_dead} more." if index_dead else ""}

The three reading measures come from `analyze-reading-levels.py` in the
`book-installer` skill, which uses the `textstat` package. It strips
formatting first, but tables and diagram specifications still count as prose,
so a chapter with many of them scores as harder than its sentences are. The
whole-book figure is the average of the written chapters. Chapters that were
not written have no reading measures.
"""))

    # ---- model summary
    s1_status = status_of(s1.parent / f"s1-{name}.status")
    s2_status = status_of(s2.parent / f"s2-{name}.status") if s2 else None
    s2_score = score_chapters(s2) if s2 else None
    stage_rows = [
        f"| 1. Learning graph | {g.get('concepts')} concepts, {g.get('edges')} dependencies | "
        f"{minutes(s1_status['seconds']) if s1_status else '—'} | [Graph](learning-graph-viewer.md), "
        f"[quality report](learning-graph-quality.md) |",
        (f"| 2. Book structure | {s2_score['chapter_count']} chapters, "
         f"{s2_score['concepts_assigned']} of {s2_score['concepts_in_graph']} concepts assigned | "
         f"{minutes(s2_status['seconds']) if s2_status else '—'} | "
         f"{'[Chapter list](chapters/index.md)' if summary.get('chapters_index') else '—'} |")
        if s2_score else "| 2. Book structure | Not run yet | — | — |",
        (f"| 3. Chapter content | {summary['chapters_written']} of {summary['chapter_count']} chapters written, "
         f"{summary['total_words']:,} words | {minutes(sum(s['seconds'] for s in stage3))} in "
         f"{len(stage3)} runs | [Chapters](chapters/index.md), [metrics](chapter-metrics.md) |")
        if stage3 and summary["has_chapters"] else "| 3. Chapter content | Not run yet | — | — |",
    ]
    timed_out = sum(1 for s in stage3 if s["exit"] == 124)
    units = sorted({UNIT_NAMES.get(u, u) for u in (s1_unit, s2_unit, book_unit) if u})
    context = (s1.parent / f"context-{name}")
    context = context.read_text().strip() if context.exists() else "?"
    (out / "index.md").write_text(page(
        f"Model Results: {model}",
        f"What {model} produced in each stage of the Algebra I textbook benchmark, with links to its learning graph, quality report, chapters, and chapter metrics.",
        f"""# Model Results: `{model}`

What `{model}` produced in the Algebra I benchmark, run on {" and ".join(units)}
with a context of {int(context):,} tokens. {facts.get(model, '')}

| Stage | Produced | Time | View |
|---|---|---|---|
""" + "\n".join(stage_rows) + f"""
{f'''
{timed_out} of the {len(stage3)} chapter runs reached the time limit.
''' if timed_out else ''}
## What to Look At

- [View Learning Graph](learning-graph-viewer.md): the graph the model wrote,
  in the interactive viewer.
- [View Learning Graph Quality Report](learning-graph-quality.md): what a
  program found when it checked the graph's structure.
""" + ("""- [View Chapter Content](chapters/index.md): the chapters, as the model wrote
  them.
- [View Chapter Content Metrics](chapter-metrics.md): words, diagrams
  specified, and reading level for each chapter.
""" if summary["has_chapters"] else """
The chapter pages appear here once this model has run stages 2 and 3.
""") + """
The learning graph and the chapters are the model's own work, shown as it
wrote them. Two things were changed. Links to pages that do not exist were
removed so that this site builds, and the metrics page counts them. If the
model listed its Foundation Concepts category after others, that category was
moved to the top of the viewer's category list; no concept or dependency was
altered.
"""))
    summary.update(concepts=g.get("concepts"), edges=g.get("edges"))
    return summary


# ---------------------------------------------------------------- the book

def write_nav(summaries):
    quote = lambda text: "'" + text.replace("'", "''") + "'"  # noqa: E731
    lines = [NAV_BEGIN, "  - Model Results:", "    - Overview: models/index.md"]
    for s in summaries:
        base = f"models/{s['name']}"
        lines += [f"    - {quote(s['model'])}:",
                  f"      - Summary: {base}/index.md",
                  f"      - View Learning Graph: {base}/learning-graph-viewer.md",
                  f"      - View Learning Graph Quality Report: {base}/learning-graph-quality.md"]
        if s["has_chapters"]:
            lines.append("      - View Chapter Content:")
            if s.get("chapters_index"):
                lines.append(f"        - List of Chapters: {base}/chapters/index.md")
            lines += [f"        - {quote(f'{number}. {title}')}: {base}/chapters/{directory}/index.md"
                      for number, directory, title in s["chapters"]]
            lines.append(f"      - View Chapter Content Metrics: {base}/chapter-metrics.md")
        if s.get("course_description"):
            lines.append(f"      - Course Description Given to the Model: {base}/course-description.md")
    lines.append(NAV_END)
    block = "\n".join(lines) + "\n"

    path = REPO / "mkdocs.yml"
    text = path.read_text()
    if NAV_BEGIN in text and NAV_END in text:
        start, end = text.index(NAV_BEGIN), text.index(NAV_END) + len(NAV_END) + 1
        text = text[:start] + block + text[end:]
    else:
        anchor = re.search(r"^.*evaluation-status\.md\s*\n", text, re.M)
        if not anchor:
            sys.exit("mkdocs.yml has no evaluation-status.md entry to put the model results after")
        text = text[:anchor.end()] + block + text[anchor.end():]
    path.write_text(text)


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--runs", default=str(Path.home() / "dgx-eval-runs"))
    args = parser.parse_args()
    runs = Path(args.runs).expanduser()

    models = [line.split()[0] for line in (REPO / "benchmark" / "models.txt").read_text().splitlines()
              if line.strip() and not line.lstrip().startswith("#")]
    data = read_json(DOCS / "sims" / "model-fit-by-memory" / "model-data.json") or {}
    facts = {m["name"]: f"The model has {m['parametersBillions']:g} billion parameters."
             for m in data.get("models", [])}
    levels = reading_levels()
    problems = []

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    summaries, without = [], []
    for model in models:
        summary = publish_model(model, runs, facts, levels, problems)
        if summary:
            summaries.append(summary)
        else:
            without.append(model)

    rows = []
    for s in summaries:
        chapters = (f"{s['chapters_written']} of {s['chapter_count']}" if s["has_chapters"] and "chapters_written" in s
                    else "—")
        rows.append(f"| [`{s['model']}`]({s['name']}/index.md) | {s['concepts']} | {chapters} | "
                    f"{format(s['total_words'], ',') if 'total_words' in s else '—'} | "
                    f"{s.get('diagrams', '—')} | {s.get('fk_mean', '—')} |")
    (OUT / "index.md").write_text(page(
        "Model Results: What Each Model Produced",
        "The learning graph, quality report, chapters, and chapter metrics that each candidate model produced in the Algebra I textbook benchmark.",
        """# Model Results

Each model that produced a learning graph has its own section here, holding
what it generated for the Algebra I benchmark and what a program measured
about it. [Evaluation Status](../evaluation-status.md) shows how far each
model has got.

| Model | Concepts | Chapters written | Words | Diagrams specified | Average reading grade |
|---|---:|:---:|---:|---:|---:|
""" + "\n".join(rows) + """

Each model's section has the same four views:

- **View Learning Graph.** The graph the model wrote, in the interactive
  viewer.
- **View Learning Graph Quality Report.** Automated checks on the graph's
  structure.
- **View Chapter Content.** The chapters, as the model wrote them.
- **View Chapter Content Metrics.** Words, diagrams specified, and reading
  level for each chapter.

The chapter views appear once a model has run stages 2 and 3.
""" + ("""
These models have no section because they produced no learning graph: """
       + ", ".join(f"`{m}`" for m in without) + ".\n" if without else "") + """
!!! note "Generated text, not reviewed"

    The graphs and chapters are shown as each model wrote them, apart from
    links to missing pages, which were removed. Nobody has corrected the
    content, and no person has yet judged whether it is right.
"""))
    (OUT / "models.json").write_text(json.dumps(
        [{"id": s["name"], "name": s["model"]} for s in summaries], indent=2) + "\n")
    write_nav(summaries)

    print(f"published {len(summaries)} models to {OUT.relative_to(REPO)}")
    for s in summaries:
        print(f"  {s['model']}: {len(s['chapters'])} chapter pages")
    if not levels:
        print("reading level not measured: the textstat package is missing")
    for problem in problems:
        print("LEFT OUT:", problem)


if __name__ == "__main__":
    main()
