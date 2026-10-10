#!/usr/bin/env python3
"""Summarize harness runs made by run_skill.sh.

    python3 src/harness/run_report.py [label ...]

With no labels, reports every run in RUNS_DIR (default ~/dgx-eval-runs). Works
on a run that is still going: it reads the event stream written so far.
Standard library only.
"""
import json
import os
import sys
from collections import Counter
from pathlib import Path

RUNS = Path(os.environ.get("RUNS_DIR", Path.home() / "dgx-eval-runs"))


def events(path):
    with open(path, errors="replace") as f:
        for line in f:
            try:
                yield json.loads(line)
            except ValueError:
                continue


def report(label):
    stream = RUNS / f"{label}.jsonl"
    if not stream.exists():
        print(f"== {label}: no event stream")
        return
    status = RUNS / f"{label}.status"
    tools, errors, turns, last_text, result = Counter(), Counter(), 0, "", None
    names = {}
    for e in events(stream):
        content = (e.get("message") or {}).get("content")
        if e.get("type") == "assistant" and isinstance(content, list):
            turns += 1
            for block in content:
                if block.get("type") == "tool_use":
                    tools[block.get("name")] += 1
                    names[block.get("id")] = block.get("name")
                elif block.get("type") == "text" and block.get("text", "").strip():
                    last_text = block["text"].strip()
        elif e.get("type") == "user" and isinstance(content, list):
            for block in content:
                if block.get("type") == "tool_result" and block.get("is_error"):
                    errors[names.get(block.get("tool_use_id"), "?")] += 1
        elif e.get("type") == "result":
            result = e

    calls, failed = sum(tools.values()), sum(errors.values())
    state = status.read_text().strip() if status.exists() else "RUNNING"
    print(f"== {label}: {state}")
    print(f"   assistant messages {turns}, tool calls {calls}, failed {failed}"
          + (f" ({100 * (calls - failed) // calls}% succeeded)" if calls else ""))
    print(f"   tools: {dict(tools.most_common())}")
    if errors:
        print(f"   failed by tool: {dict(errors)}")
    if result:
        u = result.get("usage") or {}
        api_s = result.get("duration_api_ms", 0) / 1000
        out = u.get("output_tokens", 0)
        print(f"   result {result.get('subtype')}, turns {result.get('num_turns')}, "
              f"model time {api_s:.0f} s, input {u.get('input_tokens')}, "
              f"cached input {u.get('cache_read_input_tokens')}, output {out}"
              + (f" ({out / api_s:.1f} tok/s overall)" if api_s else ""))
    elif last_text:
        print(f"   last message: {last_text[:160]!r}")


if __name__ == "__main__":
    labels = sys.argv[1:] or sorted(p.stem for p in RUNS.glob("*.jsonl"))
    for label in labels:
        report(label)
