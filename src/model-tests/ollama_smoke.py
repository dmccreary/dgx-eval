#!/usr/bin/env python3
"""Smoke-test one Ollama model on the tasks textbook generation depends on.

Runs five short tasks against a local Ollama server and writes a JSON report:
long-form Markdown, p5.js MicroSim code, schema-constrained JSON, a tool call,
and a long prompt. Each task is run once, so treat the numbers as a first
look, not a benchmark. Standard library only, so it runs on a fresh DGX.

    python3 ollama_smoke.py qwen3.8:27b --out ~/bench

The report holds no addresses, hostnames, or hardware identifiers.
"""
import argparse
import json
import os
import random
import re
import subprocess
import threading
import time
import urllib.request

SYSTEM = (
    "You are generating content for an intelligent textbook built with "
    "MkDocs Material. Follow the formatting rules in each request exactly."
)

WRITING = (
    "Write a textbook section titled 'Quantization' for adult professionals "
    "who are evaluating local AI hardware. Aim for about 500 words.\n"
    "Requirements:\n"
    "- Start with a level-2 Markdown heading.\n"
    "- Explain what quantization is, why it shrinks memory use, and what it "
    "costs in quality.\n"
    "- Include one worked numeric example: the weight memory of a "
    "27-billion-parameter model at 16-bit precision and at 4-bit precision.\n"
    "- Include one bulleted list, with a blank line before the list.\n"
    "- Include one MkDocs admonition that starts with `!!! note` and whose "
    "body is indented four spaces.\n"
    "Output only the Markdown."
)

CODE = (
    "Write the complete JavaScript for a p5.js MicroSim named 'Tokens per "
    "Second'. It shows words appearing on the canvas at an adjustable rate.\n"
    "Rules:\n"
    "1. The first statement in setup() must be updateCanvasSize();\n"
    "2. Define updateCanvasSize() so it reads the container width from "
    "document.querySelector('main').\n"
    "3. Create the canvas, then parent it with "
    "canvas.parent(document.querySelector('main'));\n"
    "4. Use p5.js built-in controls only: one createSlider for tokens per "
    "second (1 to 100) and one createButton that restarts the animation.\n"
    "5. Never draw a control by hand.\n"
    "Output exactly one ```javascript code block and nothing else."
)

GRAPH = (
    "List exactly 12 concepts a learner needs in order to run a language "
    "model on a local GPU, ordered from foundational to advanced. Give each "
    "concept an integer id from 1 to 12, a short label, and the ids of the "
    "concepts it directly depends on. Foundational concepts have an empty "
    "dependency list. A concept may depend only on concepts with lower ids."
)
GRAPH_SCHEMA = {
    "type": "object",
    "properties": {
        "concepts": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "label": {"type": "string"},
                    "dependencies": {"type": "array", "items": {"type": "integer"}},
                },
                "required": ["id", "label", "dependencies"],
            },
        }
    },
    "required": ["concepts"],
}

TOOL = (
    "Create the lesson page for a new MicroSim whose id is pendulum. The page "
    "lives at docs/sims/pendulum/index.md. It needs YAML frontmatter with "
    "title set to Pendulum and status set to scaffold, followed by a level-1 "
    "heading. Use the tools. Do not print the file in your reply."
)
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Create or overwrite a text file in the repository.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Repo-relative path"},
                    "content": {"type": "string", "description": "Full file content"},
                },
                "required": ["path", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "run_command",
            "description": "Run a shell command in the repository root.",
            "parameters": {
                "type": "object",
                "properties": {"command": {"type": "string"}},
                "required": ["command"],
            },
        },
    },
]


def long_prompt(lines=1500, needle=937):
    """A long, non-repeating prompt with one fact to retrieve."""
    rng = random.Random(7)
    rows, answer = [], None
    for i in range(1, lines + 1):
        value = f"{rng.uniform(10, 99):.1f}"
        if i == needle:
            answer = value
        rows.append(f"Reading {i:04d}: sensor S-{rng.randint(10, 99)} reported {value} units")
    question = f"\n\nWhat value did reading {needle:04d} report? Answer with the number only."
    return "\n".join(rows) + question, answer


class GpuSampler(threading.Thread):
    """Poll nvidia-smi for power, temperature, and utilization during a run."""

    def __init__(self, period=2.0):
        super().__init__(daemon=True)
        self.period, self.rows, self._stop = period, [], threading.Event()

    def run(self):
        query = ["nvidia-smi", "--query-gpu=power.draw,temperature.gpu,utilization.gpu",
                 "--format=csv,noheader,nounits"]
        while not self._stop.is_set():
            try:
                out = subprocess.run(query, capture_output=True, text=True, timeout=5).stdout
                self.rows.append([float(x) for x in out.strip().split(",")])
            except (ValueError, OSError, subprocess.SubprocessError):
                pass
            self._stop.wait(self.period)

    def stop(self):
        self._stop.set()
        if not self.rows:
            return {}
        power, temp, util = zip(*self.rows)
        return {
            "samples": len(self.rows),
            "power_w_avg": round(sum(power) / len(power), 1),
            "power_w_max": max(power),
            "temp_c_max": max(temp),
            "gpu_util_avg": round(sum(util) / len(util)),
        }


def mem_available_gib():
    with open("/proc/meminfo") as f:
        for line in f:
            if line.startswith("MemAvailable:"):
                return int(line.split()[1]) / 1048576
    return None


def post(host, path, body, timeout=3600):
    req = urllib.request.Request(
        host + path, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.load(resp)


def chat(args, user, max_tokens, **extra):
    body = {
        "model": args.model,
        "stream": False,
        "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}],
        "options": {"num_ctx": args.ctx, "num_predict": max_tokens, "seed": 42},
    }
    if args.think != "default":
        body["think"] = {"off": False, "on": True}.get(args.think, args.think)
    body.update(extra)
    started = time.time()
    r = post(args.host, "/api/chat", body)
    wall = time.time() - started
    msg = r.get("message", {})
    ns = 1e9
    gen_s = r.get("eval_duration", 0) / ns
    prompt_s = r.get("prompt_eval_duration", 0) / ns
    metrics = {
        "wall_s": round(wall, 1),
        "load_s": round(r.get("load_duration", 0) / ns, 1),
        "prompt_tokens": r.get("prompt_eval_count", 0),
        "prompt_tok_per_s": round(r.get("prompt_eval_count", 0) / prompt_s, 1) if prompt_s else None,
        "output_tokens": r.get("eval_count", 0),
        "output_tok_per_s": round(r.get("eval_count", 0) / gen_s, 1) if gen_s else None,
        "done_reason": r.get("done_reason"),
        "thinking_chars": len(msg.get("thinking") or ""),
        "content_chars": len(msg.get("content") or ""),
    }
    return msg, metrics


ITEM = re.compile(r"^\s*([-*+]|\d+\.)\s+")


def check_writing(md):
    lines = md.splitlines()
    list_items = [i for i, line in enumerate(lines) if ITEM.match(line)]
    unspaced = [
        i for i in list_items
        if i > 0 and lines[i - 1].strip() and not ITEM.match(lines[i - 1])
        and not lines[i - 1].startswith("    ")
    ]
    note = re.search(r"^!!! note.*\n(?:\s*\n)?(.*)$", md, re.M)
    return {
        "words": len(md.split()),
        "starts_with_h2": md.lstrip().startswith("## "),
        "has_list": bool(list_items),
        "lists_have_blank_line_before": bool(list_items) and not unspaced,
        "admonition_body_indented": bool(note and note.group(1).startswith("    ")),
        # Allow a little markup between the number and the unit, e.g. LaTeX \text{ GB}.
        "example_16bit_54gb": bool(re.search(r"\b54(\.0)?\b[^\n]{0,12}(GB|gigabytes)", md, re.I)),
        "example_4bit_13_5gb": bool(re.search(r"\b13\.5\b[^\n]{0,12}(GB|gigabytes)", md, re.I)),
    }


def check_code(text):
    block = re.search(r"```(?:javascript|js)\s*\n(.*?)```", text, re.S)
    js = block.group(1) if block else text
    # Accept the canvas parented to <main> directly or through a variable; a
    # bare parent(...) call is not a p5.js function and fails at run time.
    main = r"document\.querySelector\(\s*['\"]main['\"]\s*\)"
    main_vars = re.findall(r"(?:const|let|var)\s+(\w+)\s*=\s*" + main, js)
    parented = re.search(r"\w\.parent\(\s*" + main + r"\s*\)", js) or any(
        re.search(r"\w\.parent\(\s*" + re.escape(v) + r"\s*\)", js) for v in main_vars
    )
    return {
        "one_code_block": len(re.findall(r"```", text)) == 2,
        "update_canvas_size_first_in_setup": bool(re.search(
            r"function\s+setup\s*\(\s*\)\s*\{\s*(?://[^\n]*\n\s*)*updateCanvasSize\s*\(\s*\)", js)),
        "defines_update_canvas_size": bool(re.search(r"function\s+updateCanvasSize\s*\(", js)),
        "parents_canvas_to_main": bool(parented),
        "uses_create_slider": "createSlider(" in js,
        "uses_create_button": "createButton(" in js,
        "has_draw": bool(re.search(r"function\s+draw\s*\(", js)),
        "braces_balanced": js.count("{") == js.count("}") and js.count("(") == js.count(")"),
        "lines": len(js.splitlines()),
    }


def check_graph(text):
    try:
        concepts = json.loads(text)["concepts"]
    except (ValueError, KeyError, TypeError):
        return {"valid_json": False}
    ids = [c.get("id") for c in concepts]
    deps_ok = all(
        all(isinstance(d, int) and d in ids and d < c["id"] for d in c.get("dependencies", []))
        for c in concepts
    )
    return {
        "valid_json": True,
        "exactly_12": len(concepts) == 12,
        "ids_1_to_12": sorted(ids) == list(range(1, 13)),
        "dependencies_valid_and_acyclic": deps_ok,
        "has_foundational_concept": any(not c.get("dependencies") for c in concepts),
        "edges": sum(len(c.get("dependencies", [])) for c in concepts),
    }


def check_tool(msg):
    calls = msg.get("tool_calls") or []
    first = calls[0]["function"] if calls else {}
    fn_args = first.get("arguments") or {}
    content = fn_args.get("content", "") if isinstance(fn_args, dict) else ""
    return {
        "made_tool_call": bool(calls),
        "called_write_file": first.get("name") == "write_file",
        "path_correct": isinstance(fn_args, dict)
        and fn_args.get("path") == "docs/sims/pendulum/index.md",
        "frontmatter_status_scaffold": bool(re.search(r"^status:\s*scaffold\s*$", content, re.M)),
        "has_h1": bool(re.search(r"^# \S", content, re.M)),
        "did_not_print_file": "status:" not in (msg.get("content") or ""),
    }


def main():
    p = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    p.add_argument("model")
    p.add_argument("--host", default="http://127.0.0.1:11434")
    p.add_argument("--ctx", type=int, default=32768, help="context window in tokens")
    p.add_argument("--think", default="off",
                   help="off, on, default, or a level such as low (default: off)")
    p.add_argument("--out", default="~/bench")
    args = p.parse_args()

    out = os.path.join(os.path.expanduser(args.out), re.sub(r"[^\w.-]", "_", args.model))
    os.makedirs(out, exist_ok=True)
    report = {"model": args.model, "num_ctx": args.ctx, "think": args.think, "tests": {}}

    def save(name, text):
        with open(os.path.join(out, name), "w") as f:
            f.write(text or "")

    # Unload whatever is loaded, so the memory reading starts from a cold GPU.
    try:
        with urllib.request.urlopen(args.host + "/api/ps", timeout=10) as resp:
            for loaded_model in json.load(resp).get("models", []):
                post(args.host, "/api/generate", {"model": loaded_model["name"], "keep_alive": 0})
        time.sleep(3)
    except OSError:
        pass
    free_before = mem_available_gib()
    sampler = GpuSampler()
    sampler.start()

    msg, m = chat(args, WRITING, 3000)
    save("writing.md", msg.get("content"))
    report["tests"]["writing"] = {**m, "checks": check_writing(msg.get("content") or "")}
    report["load_s"] = m["load_s"]
    report["memory_used_by_model_gib"] = round(free_before - mem_available_gib(), 1)
    try:
        with urllib.request.urlopen(args.host + "/api/ps", timeout=10) as resp:
            loaded = json.load(resp).get("models", [])
    except OSError:
        loaded = []
    if loaded:
        report["ollama_ps"] = {
            "size_gib": round(loaded[0].get("size", 0) / 2**30, 1),
            "size_on_gpu_gib": round(loaded[0].get("size_vram", 0) / 2**30, 1),
            "context_length": loaded[0].get("context_length"),
        }

    msg, m = chat(args, CODE, 3000)
    save("microsim.js.md", msg.get("content"))
    report["tests"]["code"] = {**m, "checks": check_code(msg.get("content") or "")}

    msg, m = chat(args, GRAPH, 2000, format=GRAPH_SCHEMA)
    save("graph.json", msg.get("content"))
    report["tests"]["structured_json"] = {**m, "checks": check_graph(msg.get("content") or "")}

    msg, m = chat(args, TOOL, 1500, tools=TOOLS)
    save("tool_call.json", json.dumps(msg, indent=2))
    report["tests"]["tool_call"] = {**m, "checks": check_tool(msg)}

    prompt, answer = long_prompt()
    msg, m = chat(args, prompt, 400)
    save("long_prompt_answer.txt", f"expected: {answer}\n\n{msg.get('content')}")
    report["tests"]["long_prompt"] = {
        **m, "checks": {"retrieved_fact": answer in (msg.get("content") or "")}
    }

    report["gpu"] = sampler.stop()
    with open(os.path.join(out, "report.json"), "w") as f:
        json.dump(report, f, indent=2)

    print(f"== {args.model}  ctx={args.ctx}  think={args.think}")
    print(f"   load {report['load_s']} s, memory {report['memory_used_by_model_gib']} GiB, "
          f"gpu {report['gpu']}")
    for name, t in report["tests"].items():
        failed = [k for k, v in t["checks"].items() if v is False]
        print(f"   {name:16} out {t['output_tok_per_s']} tok/s ({t['output_tokens']} tok), "
              f"prompt {t['prompt_tok_per_s']} tok/s ({t['prompt_tokens']} tok), "
              f"wall {t['wall_s']} s, {t['done_reason']}, "
              f"failed checks: {failed or 'none'}")


if __name__ == "__main__":
    main()
