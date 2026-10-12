#!/usr/bin/env python3
"""Aggregate benchmark run output into one sanitized CSV of per-run numbers.

    python3 src/reporting/aggregate_runs.py [RUNS_DIR] [OUT_CSV]

RUNS_DIR   fetched run output, default ~/dgx-eval-runs/unit-1
OUT_CSV    default papers/slm-textbooks/data/stage-metrics.csv

Reads the files that src/harness/run_skill.sh writes for each run:

    <label>.status   exit code and wall-clock seconds
    <label>.jsonl    the event stream, one JSON event per line
    <label>.peak     the largest conversation, in tokens, seen during the run

and writes one row per run: stage 1 and stage 2 once per model, stage 3 once
per chapter. Only counts and durations are copied. No path, host name, session
identifier, or text from the event stream reaches the CSV, so the file is safe
to keep in the repository. Model names come from benchmark/models.txt; a run
label spells each name with "-" where the model tag has ":".

A run that hit its time limit has no result event, so its token counts are
empty and its tool calls are counted from the events seen before it stopped.

Standard library only.
"""
import csv
import json
import os
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DEFAULT_RUNS = Path.home() / "dgx-eval-runs" / "unit-1"
DEFAULT_OUT = REPO / "papers" / "slm-textbooks" / "data" / "stage-metrics.csv"
FIELDS = ["model", "stage", "chapter", "exit", "wall_s", "turns", "tool_calls",
          "failed_tool_calls", "output_tokens", "input_tokens",
          "cache_read_tokens", "peak_context_tokens"]


def read_models():
    """Return {label: tag} for every model in benchmark/models.txt."""
    out = {}
    for line in (REPO / "benchmark" / "models.txt").read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            tag = line.split()[0]
            out[tag.replace(":", "-")] = tag
    return out


def read_status(runs, label):
    p = runs / f"{label}.status"
    if not p.exists():
        return None, None
    m = re.search(r"exit=(\S+)\s+wall_s=(\d+)", p.read_text())
    return (m.group(1), int(m.group(2))) if m else (None, None)


def read_peak(runs, label):
    p = runs / f"{label}.peak"
    try:
        return int(p.read_text().strip())
    except (OSError, ValueError):
        return ""


def read_stream(runs, label):
    """Count tool calls, failed tool calls, and read the result event."""
    p = runs / f"{label}.jsonl"
    if not p.exists():
        return None
    calls = failed = turns = 0
    result = None
    with open(p, errors="replace") as f:
        for line in f:
            try:
                e = json.loads(line)
            except ValueError:
                continue
            content = (e.get("message") or {}).get("content")
            if e.get("type") == "assistant" and isinstance(content, list):
                turns += 1
                calls += sum(1 for b in content if b.get("type") == "tool_use")
            elif e.get("type") == "user" and isinstance(content, list):
                failed += sum(1 for b in content
                              if b.get("type") == "tool_result" and b.get("is_error"))
            elif e.get("type") == "result":
                result = e
    row = {"turns": turns, "tool_calls": calls, "failed_tool_calls": failed,
           "output_tokens": "", "input_tokens": "", "cache_read_tokens": ""}
    if result:
        u = result.get("usage") or {}
        row.update(turns=result.get("num_turns", turns),
                   output_tokens=u.get("output_tokens", ""),
                   input_tokens=u.get("input_tokens", ""),
                   cache_read_tokens=u.get("cache_read_input_tokens", ""))
    return row


def run_row(runs, tag, stage, chapter, label):
    exit_code, wall = read_status(runs, label)
    stream = read_stream(runs, label)
    if exit_code is None and stream is None:
        return None
    row = {"model": tag, "stage": stage, "chapter": chapter,
           "exit": exit_code if exit_code is not None else "",
           "wall_s": wall if wall is not None else "",
           "peak_context_tokens": read_peak(runs, label)}
    row.update(stream or {})
    return row


def main():
    runs = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else DEFAULT_RUNS
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUT
    rows = []
    for label, tag in read_models().items():
        for stage in ("s1", "s2"):
            r = run_row(runs, tag, stage, "", f"{stage}-{label}")
            if r:
                rows.append(r)
        for p in sorted(runs.glob(f"s3-{label}-ch*.jsonl")):
            chapter = p.stem.rsplit("-ch", 1)[1]
            r = run_row(runs, tag, "s3", chapter, p.stem)
            if r:
                rows.append(r)
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} runs from {len(set(r['model'] for r in rows))} models -> {out}")


if __name__ == "__main__":
    main()
