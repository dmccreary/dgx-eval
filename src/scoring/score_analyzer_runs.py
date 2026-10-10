#!/usr/bin/env python3
"""Score runs of the course-description-analyzer smoke test.

    python3 src/scoring/score_analyzer_runs.py [runs-dir]

For each <label>.json result in the runs directory (default ~/dgx-eval-runs),
checks what the skill should have left in <label>/: the assessment report, a
score, the quality_score frontmatter, both nav entries, and a site that passes
`mkdocs build --strict`.

Set MKDOCS to the command that runs MkDocs when it is not on PATH, for
example MKDOCS="conda run -n mkdocs mkdocs". Other needs: standard library.
"""
import json
import os
import re
import shlex
import subprocess
import sys
import tempfile
from pathlib import Path

MKDOCS = shlex.split(os.environ.get("MKDOCS", "mkdocs"))


def strict_build(workspace):
    """Return (passed, last line of output) for a strict build of a workspace."""
    with tempfile.TemporaryDirectory() as site:
        try:
            build = subprocess.run(MKDOCS + ["build", "--strict", "-q", "-d", site],
                                   cwd=workspace, capture_output=True, text=True)
        except OSError as e:
            return False, f"could not run MkDocs: {e}"
    lines = [l for l in (build.stderr or build.stdout).strip().splitlines() if l.strip()]
    return build.returncode == 0, (lines[-1][:200] if lines else "")


def score(result_path):
    runs, label = result_path.parent, result_path.stem
    ws = runs / label
    status_file = runs / f"{label}.status"
    status = status_file.read_text().strip() if status_file.exists() else "running"
    try:
        r = json.loads(result_path.read_text())
    except ValueError:
        print(f"== {label}: {status}; no result yet")
        return
    if not ws.is_dir():
        print(f"== {label}: {status}; run directory is missing")
        return

    u = r.get("usage") or {}
    report = ws / "docs/learning-graph/course-description-assessment.md"
    text = report.read_text(errors="replace") if report.exists() else ""
    given = re.search(r"(\d{1,3})\s*/\s*100", text)
    description = (ws / "docs/course-description.md").read_text(errors="replace")
    nav = (ws / "mkdocs.yml").read_text(errors="replace")
    built, build_message = strict_build(ws)

    print(f"== {label}: {status}")
    print(f"   result {r.get('subtype')}, turns {r.get('num_turns')}, "
          f"model time {round(r.get('duration_api_ms', 0) / 1000)} s, "
          f"input {u.get('input_tokens')}, cached input {u.get('cache_read_input_tokens')}, "
          f"output {u.get('output_tokens')}")
    print(f"   refused tool calls: {[d.get('tool_name') for d in r.get('permission_denials', [])]}")
    print(f"   report written {report.exists()}, {len(text.split())} words, "
          f"score given {given.group(1) if given else None}, "
          f"frontmatter score {bool(re.search(r'^quality_score:', description, re.M))}, "
          f"nav updated {'course-description-assessment.md' in nav and 'course-description.md' in nav}, "
          f"strict build {'passed' if built else 'FAILED'}")
    if not built and build_message:
        print(f"   build: {build_message}")


if __name__ == "__main__":
    runs_dir = Path(sys.argv[1] if len(sys.argv) > 1 else Path.home() / "dgx-eval-runs").expanduser()
    for result in sorted(runs_dir.glob("*.json")):
        score(result)
