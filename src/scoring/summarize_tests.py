#!/usr/bin/env python3
"""Summarize what harness/test_models.sh has produced so far. Run on the DGX.

    python3 src/scoring/summarize_tests.py benchmark/models.txt

For each model in the list it reports the model-only smoke test, the context
length chosen, the harness smoke test, and benchmark stages 1 to 3. A step
that has not run yet is shown as "-". Standard library only.
"""
import json
import os
import re
import sys
from collections import Counter
from pathlib import Path

RUNS = Path(os.environ.get("RUNS_DIR", Path.home() / "dgx-eval-runs"))
BENCH = Path(os.environ.get("BENCH_DIR", Path.home() / "bench"))


def read_json(path):
    try:
        return json.loads(Path(path).read_text())
    except (OSError, ValueError):
        return None


def read_text(path):
    try:
        return Path(path).read_text().strip()
    except OSError:
        return ""


def smoke(model):
    report = read_json(BENCH / "short" / re.sub(r"[^\w.-]", "_", model) / "report.json")
    if not report:
        return "-"
    tests = report["tests"]
    speeds = [t["output_tok_per_s"] for t in tests.values() if t.get("output_tok_per_s") and t["output_tokens"] >= 40]
    failed = [f"{name}:{check}" for name, t in tests.items() for check, ok in t["checks"].items() if ok is False]
    long_prompt = tests.get("long_prompt", {})
    return (f"{min(speeds):.0f}-{max(speeds):.0f} tok/s, long prompt {long_prompt.get('prompt_tok_per_s')} tok/s, "
            f"{report.get('memory_used_by_model_gib')} GiB at 32K, "
            f"peak {report.get('gpu', {}).get('temp_c_max')} C, failed checks: {failed or 'none'}")


def tool_calls(label):
    calls, failed, names = Counter(), 0, {}
    try:
        with open(RUNS / f"{label}.jsonl", errors="replace") as f:
            for line in f:
                try:
                    e = json.loads(line)
                except ValueError:
                    continue
                content = (e.get("message") or {}).get("content")
                if not isinstance(content, list):
                    continue
                for block in content:
                    if e.get("type") == "assistant" and block.get("type") == "tool_use":
                        calls[block.get("name")] += 1
                    elif e.get("type") == "user" and block.get("type") == "tool_result" and block.get("is_error"):
                        failed += 1
    except OSError:
        return None
    return sum(calls.values()), failed


def run(label):
    status = read_text(RUNS / f"{label}.status")
    if not status:
        return "running" if (RUNS / f"{label}.jsonl").exists() else "-"
    result = read_json(RUNS / f"{label}.json") or {}
    usage = result.get("usage") or {}
    calls = tool_calls(label)
    build = re.search(r"exit=(\d+)", read_text(RUNS / f"{label}.build.txt"))
    parts = [status]
    if status.startswith("exit=124"):
        parts.append("TIMED OUT")
    if result:
        parts.append(f"{result.get('subtype')}, {result.get('num_turns')} turns, "
                     f"{usage.get('output_tokens')} output tokens")
    if calls:
        parts.append(f"{calls[0]} tool calls, {calls[1]} failed")
    parts.append(f"peak context {read_text(RUNS / f'{label}.peak') or '?'}")
    parts.append("strict build " + ("passed" if build and build.group(1) == "0" else "FAILED" if build else "?"))
    return "; ".join(parts)


def graph(label):
    s = read_json(RUNS / f"{label}.score.json")
    if not s or "concepts" not in s:
        return "-"
    j = s.get("json") if isinstance(s.get("json"), dict) else {}
    return (f"{s['concepts']} concepts, {s['edges']} dependencies, "
            f"{'no cycles' if s['is_dag'] else str(s['concepts_on_cycles']) + ' concepts on cycles'}, "
            f"{s['csv_error_count']} CSV errors, JSON {'valid and matching' if j.get('matches_csv') else 'missing or not matching'}, "
            f"missing files: {s['files_missing'] or 'none'}")


def chapters(label):
    s = read_json(RUNS / f"{label}.score.json")
    if not s or "chapter_count" not in s:
        return "-"
    return (f"{s['chapter_count']} chapters, {s['chapters_written']} written, {s['total_words']} words, "
            f"{s['concepts_assigned']} of {s['concepts_in_graph']} concepts assigned, "
            f"{s['chapters_in_nav']} chapters in the navigation")


def chapter_runs(name):
    """Stage 3 is one run per chapter: add up their status files."""
    statuses = [read_text(f) for f in sorted(RUNS.glob(f"s3-{name}-ch*.status"))]
    if not statuses:
        return "-"
    seconds = sum(int(m.group(1)) for m in (re.search(r"wall_s=(\d+)", s) for s in statuses) if m)
    timed_out = sum(s.startswith("exit=124") for s in statuses)
    ended = sum(s.startswith("exit=0") for s in statuses)
    return (f"{len(statuses)} chapter runs, {ended} ended on their own, {timed_out} timed out, "
            f"{seconds / 60:.0f} minutes in all")


def main():
    models = [l.split()[0] for l in open(sys.argv[1]) if l.strip() and not l.lstrip().startswith("#")]
    for model in models:
        name = model.replace(":", "-").replace("/", "-")
        print(f"== {model}")
        print(f"   model test:    {smoke(model)}")
        print(f"   context:       {read_text(RUNS / f'context-{name}') or '-'}")
        print(f"   harness smoke: {run('short-' + name)}")
        print(f"   stage 1:       {run('s1-' + name)}")
        print(f"   learning graph: {graph('s1-' + name)}")
        print(f"   stage 2:       {run('s2-' + name)}")
        print(f"   chapter plan:  {chapters('s2-' + name)}")
        print(f"   stage 3:       {chapter_runs(name)}")
        print(f"   book:          {chapters('book-' + name)}")


if __name__ == "__main__":
    main()
