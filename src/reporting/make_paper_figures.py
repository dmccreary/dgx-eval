#!/usr/bin/env python3
"""Make the figures and the numbers for the paper in papers/slm-textbooks.

    /usr/local/Caskroom/miniforge/base/envs/mkdocs/bin/python \
        src/reporting/make_paper_figures.py

Needs matplotlib and numpy, so run it with the `mkdocs` conda environment.

Inputs, all inside the repository:

    papers/slm-textbooks/data/stage-metrics.csv   per-run counts and times,
                                                  from aggregate_runs.py
    docs/models/<model>/                          the books the models wrote
    docs/chapters/*/index.md                      this book's own chapters
    src/scoring/chapter_quality.py                run here, so every score in
                                                  the paper is regenerated

Outputs:

    papers/slm-textbooks/figures/*.png            300 dpi figures
    papers/slm-textbooks/data/paper-numbers.json  every derived number the
                                                  paper's text and tables use

Nothing here reads the raw run output or contacts a machine. The figures show
no address, host name, or login.
"""
import csv
import json
import random
import re
import statistics as st
import subprocess
import sys
import tempfile
from collections import OrderedDict, defaultdict
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import matplotlib.ticker  # noqa: E402
from matplotlib.patches import FancyBboxPatch, Patch  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
PAPER = REPO / "papers" / "slm-textbooks"
FIG = PAPER / "figures"
DATA = PAPER / "data"
DPI = 300

# Okabe-Ito colour-blind-safe palette
BLUE, ORANGE, GREEN = "#0072B2", "#E69F00", "#009E73"
VERM, SKY, PURPLE, GREY, LIGHT = "#D55E00", "#56B4E9", "#CC79A7", "#7F7F7F", "#E6E6E6"

plt.rcParams.update({
    "font.size": 8.5, "axes.titlesize": 9.5, "axes.labelsize": 8.5,
    "xtick.labelsize": 8, "ytick.labelsize": 8, "legend.fontsize": 8,
    "axes.spines.top": False, "axes.spines.right": False,
    "figure.dpi": 100, "savefig.dpi": DPI,
})

# The ten candidates in the order they were chosen (docs/appendices/model-candidates.md)
CANDIDATES = [
    "qwen3.8:27b", "gemma4:31b", "muse-glimmer:30b", "qwen3.6:35b", "gemma4:26b",
    "nemotron-3.5-lightning:30b", "mistral-medium-3.5:128b", "gpt-oss:120b",
    "devstral-small-2:24b", "granite4.2:30b",
]
FAILURE_NOTE = {
    "muse-glimmer:30b": "lost the task",
    "devstral-small-2:24b": "tool call as text",
    "granite4.2:30b": "150-min limit",
    "mistral-medium-3.5:128b": "no usable context",
}


def slug(tag):
    return tag.replace(":", "-")


def book_dir(tag):
    return REPO / "docs" / "models" / slug(tag)


def save(fig, name):
    FIG.mkdir(parents=True, exist_ok=True)
    out = FIG / name
    fig.savefig(out, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  wrote {out.relative_to(REPO)} ({out.stat().st_size // 1024} KB)")


# ----------------------------------------------------------------- inputs

def load_runs():
    with open(DATA / "stage-metrics.csv") as f:
        return list(csv.DictReader(f))


def run_scorer():
    """Score the six books with the repository's scorer and return its rows."""
    books = [str(book_dir(t)) for t in CANDIDATES if (book_dir(t) / "chapters").exists()]
    with tempfile.TemporaryDirectory() as tmp:
        out = Path(tmp) / "scores.csv"
        subprocess.run([sys.executable, "-I", str(REPO / "src/scoring/chapter_quality.py"),
                        *books, "--csv", str(out)], check=True, capture_output=True)
        with open(out) as f:
            return list(csv.DictReader(f))


def tag_of(book):
    """Map a scorer 'book' name such as gemma4-26b back to its model tag."""
    for t in CANDIDATES:
        if slug(t) == book:
            return t
    raise KeyError(book)


def f(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


# ------------------------------------------------------- derived numbers

def book_summary(rows):
    """Level, consistency, floor and composite score per book, as the scorer defines them."""
    by_book = OrderedDict()
    for r in rows:
        by_book.setdefault(tag_of(r["book"]), []).append(r)
    out = OrderedDict()
    for tag, rs in by_book.items():
        written = [r for r in rs if r["state"] == "written"]
        scores = [f(r["score"]) for r in rs]
        level = sum(scores) / len(scores)
        w = [f(r["score"]) for r in written]
        if len(w) >= 2:
            cons = 100 * (1 - st.pstdev(w) / st.mean(w))
            composite = level * cons / 100
        else:
            cons = composite = None
        grades = [f(r["grade"]) for r in written if f(r["grade"]) is not None]
        out[tag] = {
            "designed": len(rs), "written": len(written),
            "level": level, "consistency": cons,
            "floor": min(w) if w else 0.0, "composite": composite,
            "median_written": st.median(w) if w else None,
            "words_written": sum(f(r["words_total"]) for r in written),
            "words_body": sum(f(r["words_body"]) for r in written),
            "diagram_specs": sum(f(r["diagrams"]) or 0 for r in written),
            "mean_grade": st.mean(grades) if grades else None,
            "equations_ok": sum(f(r["equations_ok"]) or 0 for r in written),
            "equations_bad": sum(f(r["equations_bad"]) or 0 for r in written),
            "scaffold_leaks": sum(f(r["scaffold_leaks"]) or 0 for r in written),
            "lists_unrendered": sum(f(r["lists_unrendered"]) or 0 for r in written),
            "templated_specs": sum(f(r["templated_specs"]) or 0 for r in written),
            "dim_means": {d: (st.mean([f(r[d]) for r in written]) if written else None)
                          for d in ("budget", "placement", "spec", "format", "padding", "reader")},
        }
    return out, by_book


def flag_counts(by_book):
    out = {}
    for tag, rs in by_book.items():
        c = defaultdict(int)
        for r in rs:
            if r["state"] != "written":
                continue
            for t in r["flags"].split():
                c[re.sub(r":\d+$", "", t)] += 1
        out[tag] = dict(c)
    return out


def spearman(xs, ys):
    def rank(v):
        order = sorted(range(len(v)), key=lambda i: v[i])
        r = [0.0] * len(v)
        i = 0
        while i < len(order):
            j = i
            while j + 1 < len(order) and v[order[j + 1]] == v[order[i]]:
                j += 1
            for k in range(i, j + 1):
                r[order[k]] = (i + j) / 2 + 1
            i = j + 1
        return r
    a, b = rank(xs), rank(ys)
    ma, mb = st.mean(a), st.mean(b)
    num = sum((x - ma) * (y - mb) for x, y in zip(a, b))
    den = (sum((x - ma) ** 2 for x in a) * sum((y - mb) ** 2 for y in b)) ** 0.5
    return num / den


WEIGHTS = {"budget": 20, "placement": 20, "spec": 20, "format": 15, "padding": 10, "reader": 15}


def composite_with(rs, weights):
    qs, wr = [], []
    for r in rs:
        if r["state"] == "written":
            q = sum(weights[d] * f(r[d]) for d in weights) / sum(weights.values())
            qs.append(q)
            wr.append(q)
        else:
            qs.append(0.0)
    if len(wr) < 2:
        return None
    return (sum(qs) / len(qs)) * (1 - st.pstdev(wr) / st.mean(wr))


def weight_sensitivity(by_book, trials=500, seed=20261011):
    ranked = [t for t, rs in by_book.items() if composite_with(rs, WEIGHTS) is not None]
    base = {t: composite_with(by_book[t], WEIGHTS) for t in ranked}
    order0 = sorted(ranked, key=lambda t: -base[t])
    pairs = [(a, b) for i, a in enumerate(order0) for b in order0[i + 1:]]
    rng = random.Random(seed)
    same, flips = 0, defaultdict(int)
    for _ in range(trials):
        w = {d: v * rng.uniform(0.6, 1.4) for d, v in WEIGHTS.items()}
        h = {t: composite_with(by_book[t], w) for t in ranked}
        if sorted(ranked, key=lambda t: -h[t]) == order0:
            same += 1
        for a, b in pairs:
            if (h[a] - h[b]) * (base[a] - base[b]) < 0:
                flips[(a, b)] += 1
    return {
        "trials": trials, "same_order_share": same / trials,
        "pair_flip_share": sum(flips.values()) / (trials * len(pairs)),
        "pairs_compared": len(pairs),
        "flipping_pairs": {f"{a} vs {b}": n / trials for (a, b), n in flips.items()},
    }


def run_totals(runs):
    """Wall-clock, calls and tokens per model and stage, from stage-metrics.csv."""
    out = OrderedDict()
    for tag in CANDIDATES:
        rs = [r for r in runs if r["model"] == tag]
        if not rs:
            continue
        d = {"stages": {}}
        for stage in ("s1", "s2", "s3"):
            sr = [r for r in rs if r["stage"] == stage]
            if not sr:
                continue
            wall = [int(r["wall_s"]) for r in sr if r["wall_s"] != ""]
            d["stages"][stage] = {
                "runs": len(sr), "wall_s": sum(wall),
                "timed_out_runs": sum(1 for r in sr if r["exit"] == "124"),
                "timed_out_wall_s": sum(int(r["wall_s"]) for r in sr if r["exit"] == "124"),
                "tool_calls": sum(int(r["tool_calls"] or 0) for r in sr),
                "failed_tool_calls": sum(int(r["failed_tool_calls"] or 0) for r in sr),
                "output_tokens": sum(int(r["output_tokens"] or 0) for r in sr),
                "turns": sum(int(r["turns"] or 0) for r in sr),
                "chapter_wall_s": [int(r["wall_s"]) for r in sr] if stage == "s3" else None,
            }
        d["wall_s"] = sum(s["wall_s"] for s in d["stages"].values())
        d["tool_calls"] = sum(s["tool_calls"] for s in d["stages"].values())
        d["failed_tool_calls"] = sum(s["failed_tool_calls"] for s in d["stages"].values())
        d["output_tokens"] = sum(s["output_tokens"] for s in d["stages"].values())
        d["peak_context_tokens"] = max([int(r["peak_context_tokens"]) for r in rs
                                        if r["peak_context_tokens"] != ""] or [0])
        out[tag] = d
    return out


# ------------------------------------------------------------ cost model
# The assumptions are those of docs/appendices/cost-analysis.md. Restating the
# formulas here lets the sensitivity figure be recomputed, and lets the paper
# put measured wall-clock time next to the page's prediction.

COST_BASE = dict(hardware=6950, accessories=250, life_years=3, setup_hours=40, rate=90,
                 utilization=0.50, watts_gen=150, watts_idle=40, kwh_price=0.1385,
                 ops_hours_month=4, network_month=20, tokens=200_000, turns=280,
                 turn_overhead_s=15, speed_tps=34, stage_share=0.10)


def cost_per_book(**over):
    p = dict(COST_BASE, **over)
    year_hours = 8760
    gen_hours = year_hours * p["utilization"]
    kwh = (gen_hours * p["watts_gen"] + (year_hours - gen_hours) * p["watts_idle"]) / 1000
    yearly = ((p["hardware"] + p["accessories"]) / p["life_years"]
              + p["setup_hours"] * p["rate"] / p["life_years"]
              + kwh * p["kwh_price"]
              + p["ops_hours_month"] * 12 * p["rate"]
              + p["network_month"] * 12)
    per_hour = yearly / gen_hours
    three_stage_h = (p["tokens"] / p["speed_tps"] + p["turns"] * p["turn_overhead_s"]) / 3600
    book_h = three_stage_h / p["stage_share"]
    return {"yearly": yearly, "per_generating_hour": per_hour,
            "three_stage_hours": three_stage_h, "book_hours": book_h,
            "cost": book_h * per_hour, "price_20pct_margin": book_h * per_hour / 0.8}


COST_SCENARIOS = OrderedDict([
    ("Generating share of hours", ("25%", dict(utilization=0.25), "75%", dict(utilization=0.75))),
    ("Operations labor", ("8 h/month", dict(ops_hours_month=8), "none", dict(ops_hours_month=0))),
    ("Three stages' share of a book", ("5%", dict(stage_share=0.05), "20%", dict(stage_share=0.20))),
    ("Hardware price", ("\\$9,000", dict(hardware=9000), "\\$3,999", dict(hardware=3999))),
    ("Service life", ("3 years (base)", {}, "5 years", dict(life_years=5))),
])


# --------------------------------------------------------------- figures

def box(ax, x, y, w, h, text, fc, ec="#333333", fs=8, bold=False, ls="-", tc="black"):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.06",
                                fc=fc, ec=ec, lw=1.0, ls=ls))
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fs,
            fontweight="bold" if bold else "normal", color=tc, linespacing=1.25)


def arrow(ax, p, q, text=None, both=False, dy=0.12, fs=7.5, color="#333333", ls="-"):
    ax.annotate("", xy=q, xytext=p, arrowprops=dict(
        arrowstyle="<|-|>" if both else "-|>", color=color, lw=1.2, ls=ls,
        shrinkA=0, shrinkB=0))
    if text:
        ax.text((p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + dy, text, ha="center", va="bottom",
                fontsize=fs, color=color, linespacing=1.15)


def fig_architecture():
    fig, ax = plt.subplots(figsize=(6.5, 4.0))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8.6)
    ax.axis("off")
    # cloud API (sees only what the orchestrator sends)
    box(ax, 0.2, 7.3, 3.8, 1.1, "Cloud API\nsees orchestrator\ntraffic only", "#FFFFFF",
        ec=GREY, ls="--", fs=7, tc=GREY)
    # laptop
    box(ax, 0.2, 2.5, 3.8, 3.9, "", "#F3F3F3")
    ax.text(2.1, 5.95, "Laptop", ha="center", fontsize=8.5, fontweight="bold")
    box(ax, 0.45, 2.75, 3.3, 2.8,
        "Orchestrator:\na cloud model in an\nagent session that\nstarts, watches and\nscores the runs",
        "#FFFFFF", fs=7)
    arrow(ax, (2.1, 6.4), (2.1, 7.3), color=GREY, ls="--")
    # DGX
    box(ax, 5.4, 0.2, 8.4, 8.2, "", "#EAF3FA")
    ax.text(9.6, 7.95, "DGX unit: one machine, 128 GB unified memory", ha="center",
            fontsize=8, fontweight="bold")
    box(ax, 5.7, 3.6, 3.7, 3.9, "", "#FFFFFF", ls="--")
    ax.text(7.55, 7.15, "Container (filesystem sandbox)", ha="center", fontsize=6.8,
            style="italic")
    box(ax, 5.95, 5.0, 3.2, 1.8, "Harness\nClaude Code,\npinned version", "#FDF2D9", fs=7.5)
    box(ax, 5.95, 3.8, 3.2, 0.95, "Skills (read-only)\nand run directory", "#FFFFFF", fs=7)
    box(ax, 10.7, 4.6, 2.9, 2.5, "Model server\nOllama, loopback\nonly, serving an\nopen-weight model",
        "#D9EAF7", fs=7)
    box(ax, 10.7, 1.4, 2.9, 2.3, "GB10 GPU and CPU\nshared 128 GB pool\nweights and context",
        "#FFFFFF", fs=7)
    box(ax, 5.7, 0.5, 3.7, 2.7,
        "Safeguards\nmemory watchdog,\n20 GiB floor\nvitals log every 30 s\nrun limits 150, 120\nand 90 minutes",
        "#FFFFFF", fs=7)
    arrow(ax, (9.15, 5.9), (10.7, 5.9), "model\nrequests", both=True, dy=0.08, fs=6.5)
    arrow(ax, (12.15, 4.6), (12.15, 3.7), both=True)
    arrow(ax, (4.0, 4.1), (5.4, 4.1), "SSH over\nprivate\nmesh VPN", both=True, dy=0.1, fs=6.5)
    save(fig, "fig-architecture.png")


def stage_cells(tag, runs, scores_by_book, totals):
    """(text, colour) for the three stage cells of one candidate."""
    bdir = book_dir(tag)
    has_graph = (bdir / "learning-graph" / "learning-graph.json").exists()
    s1 = [r for r in runs if r["model"] == tag and r["stage"] == "s1"]
    if not s1:
        return [("not run\nno usable context", LIGHT, "black"), ("-", LIGHT, "black"),
                ("-", LIGHT, "black")]
    mins = int(s1[0]["wall_s"]) / 60
    mins_text = "under 1 min" if mins < 1 else f"{mins:.0f} min"
    if not has_graph:
        c1 = (f"{FAILURE_NOTE.get(tag, 'failed')}\n{mins_text}", VERM, "white")
        return [c1, ("-", LIGHT, "black"), ("-", LIGHT, "black")]
    c1 = (f"200 concepts\n{mins:.0f} min" if tag != "nemotron-3.5-lightning:30b"
          else f"199 concepts\n{mins:.0f} min", GREEN, "white")
    chapters = len(list((bdir / "chapters").glob("*/index.md")))
    s2 = [r for r in runs if r["model"] == tag and r["stage"] == "s2"][0]
    c2 = (f"{chapters} chapters\n{int(s2['wall_s']) / 60:.0f} min", GREEN, "white")
    rs = scores_by_book[tag]
    written = sum(1 for r in rs if r["state"] == "written")
    colour = GREEN if written == len(rs) else (VERM if written == 0 else ORANGE)
    c3 = (f"{written} of {len(rs)} written", colour, "white" if colour != ORANGE else "black")
    return [c1, c2, c3]


def fig_completion(runs, by_book, totals):
    fig, ax = plt.subplots(figsize=(6.5, 3.9))
    cols = ["Stage 1\nlearning graph", "Stage 2\nchapter structure", "Stage 3\nchapter text"]
    for i, tag in enumerate(CANDIDATES):
        y = len(CANDIDATES) - 1 - i
        cells = stage_cells(tag, runs, by_book, totals)
        for j, (text, colour, tc) in enumerate(cells):
            ax.add_patch(plt.Rectangle((j + 0.02, y + 0.04), 0.96, 0.92, fc=colour, ec="white"))
            ax.text(j + 0.5, y + 0.5, text, ha="center", va="center", fontsize=7.3, color=tc,
                    linespacing=1.15)
    ax.set_xlim(0, 3)
    ax.set_ylim(0, len(CANDIDATES))
    ax.set_xticks([0.5, 1.5, 2.5])
    ax.set_xticklabels(cols)
    ax.xaxis.tick_top()
    ax.set_yticks([len(CANDIDATES) - 1 - i + 0.5 for i in range(len(CANDIDATES))])
    ax.set_yticklabels([f"{t}" for t in CANDIDATES], family="monospace", fontsize=7.5)
    ax.tick_params(length=0)
    for s in ax.spines.values():
        s.set_visible(False)
    ax.legend(handles=[Patch(fc=GREEN, label="finished"), Patch(fc=ORANGE, label="partly written"),
                       Patch(fc=VERM, label="failed or none written"),
                       Patch(fc=LIGHT, label="not reached")],
              loc="upper center", bbox_to_anchor=(0.5, -0.02), ncol=4, frameon=False)
    save(fig, "fig-completion.png")


def fig_time(totals, by_book):
    models = [t for t in CANDIDATES if t in totals and "s3" in totals[t]["stages"]]
    models.sort(key=lambda t: totals[t]["wall_s"])
    fig, ax = plt.subplots(figsize=(6.5, 2.9))
    for i, tag in enumerate(models):
        s = totals[tag]["stages"]
        done = (s["s3"]["wall_s"] - s["s3"]["timed_out_wall_s"]) / 3600
        parts = [(s["s1"]["wall_s"] / 3600, BLUE), (s["s2"]["wall_s"] / 3600, SKY),
                 (done, GREEN), (s["s3"]["timed_out_wall_s"] / 3600, VERM)]
        left = 0
        for w, c in parts:
            ax.barh(i, w, left=left, color=c, edgecolor="white", height=0.62)
            left += w
        rs = by_book[tag]
        written = sum(1 for r in rs if r["state"] == "written")
        ax.text(left + 0.08, i, f"{left:.1f} h  |  {written} of {len(rs)} chapters",
                va="center", fontsize=7.8)
    ax.set_yticks(range(len(models)))
    ax.set_yticklabels(models, family="monospace", fontsize=7.5)
    ax.set_xlabel("Machine time for the three stages (hours)")
    ax.set_xlim(0, 9)
    ax.legend(handles=[Patch(fc=BLUE, label="stage 1"), Patch(fc=SKY, label="stage 2"),
                       Patch(fc=GREEN, label="stage 3, runs that ended"),
                       Patch(fc=VERM, label="stage 3, runs stopped at the 90-min limit")],
              loc="upper center", bbox_to_anchor=(0.45, -0.22), ncol=4, frameon=False,
              fontsize=7.3, columnspacing=1.0, handlelength=1.2)
    ax.invert_yaxis()
    save(fig, "fig-time.png")


def fig_quality(summary, by_book):
    models = [t for t in summary if summary[t]["composite"] is not None]
    models.sort(key=lambda t: -summary[t]["composite"])
    fig, (a, b) = plt.subplots(1, 2, figsize=(6.5, 3.0), gridspec_kw={"width_ratios": [1, 1.25]})
    # (a) level against consistency, with iso-composite curves
    xs = [x / 10 for x in range(300, 1001)]
    for h, x0 in ((40, 72.0), (60, 74.0)):
        a.plot(xs, [h / v * 100 for v in xs], color=LIGHT, lw=1)
        a.text(x0, h / x0 * 100 + 1.2, f"composite {h}", color=GREY, fontsize=6.5, ha="left")
    marks = {"qwen3.6:35b": "o", "gemma4:31b": "s", "nemotron-3.5-lightning:30b": "^",
             "gemma4:26b": "D", "gpt-oss:120b": "v"}
    palette = [BLUE, ORANGE, GREEN, PURPLE, VERM]
    for tag, c in zip(models, palette):
        s = summary[tag]
        a.scatter(s["consistency"], s["level"], marker=marks.get(tag, "o"), s=42, color=c,
                  zorder=3, label=tag)
    a.set_xlim(70, 100)
    a.set_ylim(30, 85)
    a.set_xlabel("Consistency (100 = identical chapters)")
    a.set_ylabel("Level (mean score, stubs = 0)")
    a.set_title("(a) Level against consistency", loc="left")
    a.legend(loc="lower left", frameon=False, fontsize=6.5, handletextpad=0.2,
             bbox_to_anchor=(0.0, 0.0))
    # (b) every chapter
    rng = random.Random(7)
    for i, tag in enumerate(models):
        rs = by_book[tag]
        sc = [f(r["score"]) for r in rs if r["state"] == "written"]
        stubs = sum(1 for r in rs if r["state"] != "written")
        b.scatter([i + rng.uniform(-0.16, 0.16) for _ in sc], sc, s=16, color=palette[i],
                  alpha=0.9, zorder=3)
        b.plot([i - 0.28, i + 0.28], [st.median(sc)] * 2, color="black", lw=1.4, zorder=4)
        if stubs:
            b.scatter([i + (k - (stubs - 1) / 2) * 0.1 for k in range(stubs)], [0] * stubs,
                      marker="x", s=14, color=GREY, zorder=3)
        b.text(i, 101.5, f"{summary[tag]['composite']:.1f}", ha="center", fontsize=8,
               fontweight="bold")
    b.set_xticks(range(len(models)))
    b.set_xticklabels([m.replace("nemotron-3.5-lightning", "nemotron") for m in models],
                      rotation=25, ha="right", fontsize=7)
    b.set_ylim(-6, 108)
    b.set_xlim(-0.7, len(models) - 0.3)
    b.set_ylabel("Chapter score")
    b.set_title("(b) Chapters, composite score above", loc="left")
    fig.tight_layout()
    save(fig, "fig-quality.png")


PARTS = [("The target", 1, 2), ("The decision", 3, 6), ("The machine", 7, 10),
         ("The model", 11, 15), ("The harness", 16, 18), ("The evaluation", 19, 23)]


def book_structure():
    rows = []
    for d in sorted((REPO / "docs" / "chapters").glob("[0-9][0-9]-*")):
        text = (d / "index.md").read_text()
        m = re.search(r"covers the following (\d+) concepts", text)
        body = text.split("---", 2)[2] if text.startswith("---") else text
        rows.append({"n": int(d.name[:2]), "concepts": int(m.group(1)) if m else 0,
                     "words": len(body.split())})
    return rows


def fig_book(rows):
    colours = [BLUE, ORANGE, GREEN, PURPLE, SKY, VERM]
    part_of = {n: i for i, (_, a, b) in enumerate(PARTS) for n in range(a, b + 1)}
    fig, axs = plt.subplots(2, 1, figsize=(6.5, 3.6), sharex=True)
    for ax, key, label in ((axs[0], "concepts", "Concepts covered"),
                           (axs[1], "words", "Words of chapter text")):
        ax.bar([r["n"] for r in rows], [r[key] for r in rows],
               color=[colours[part_of[r["n"]]] for r in rows], width=0.75)
        ax.set_ylabel(label)
        ax.axhline(st.mean(r[key] for r in rows), color="black", lw=0.8, ls=":")
    axs[1].set_xlabel("Chapter")
    axs[1].set_xticks([r["n"] for r in rows])
    axs[0].legend(handles=[Patch(fc=c, label=f"{n}: {a}-{b}") for c, (n, a, b) in zip(colours, PARTS)],
                  ncol=3, frameon=False, fontsize=7, loc="upper center", columnspacing=1.2)
    axs[0].set_ylim(0, 40)
    axs[1].yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    fig.tight_layout()
    save(fig, "fig-book-structure.png")


def fig_cost():
    base = cost_per_book()["cost"]
    fig, ax = plt.subplots(figsize=(6.5, 2.5))
    rows = []
    for name, (lo_label, lo, hi_label, hi) in COST_SCENARIOS.items():
        rows.append((name, lo_label, cost_per_book(**lo)["cost"], hi_label, cost_per_book(**hi)["cost"]))
    rows.sort(key=lambda r: -(abs(r[2] - base) + abs(r[4] - base)))
    for i, (name, ll, lv, hl, hv) in enumerate(rows):
        ax.barh(i, lv - base, left=base, color=VERM if lv > base else GREEN, height=0.55)
        ax.barh(i, hv - base, left=base, color=VERM if hv > base else GREEN, height=0.55)
        for v, lab in ((lv, ll), (hv, hl)):
            if abs(v - base) > 0.5:
                ax.text(v + (2 if v > base else -2), i, f"{lab}: \\${v:.0f}",
                        va="center",
                        ha="left" if v > base else "right", fontsize=7.3)
    ax.axvline(base, color="black", lw=1)
    ax.set_yticks(range(len(rows)))
    ax.set_yticklabels([r[0] for r in rows])
    ax.invert_yaxis()
    ax.set_xlim(0, 160)
    ax.set_xlabel(f"Cost of one whole textbook, dollars (base case \\${base:.0f})")
    save(fig, "fig-cost-sensitivity.png")


# ------------------------------------------------------------------ main

def main():
    runs = load_runs()
    rows = run_scorer()
    summary, by_book = book_summary(rows)
    written = [r for r in rows if r["state"] == "written"]
    corr = {k: spearman([f(r[k]) or 0 for r in written], [f(r["score"]) for r in written])
            for k in ("words_body", "words_total", "diagrams", "equations_ok")}
    totals = run_totals(runs)
    structure = book_structure()

    # cost: base case, the six reference cases, and measured time at the base hourly rate
    base = cost_per_book()
    measured = {}
    for tag, t in totals.items():
        hours = t["wall_s"] / 3600
        measured[tag] = {
            "three_stage_hours": hours, "cost_at_base_rate": hours * base["per_generating_hour"],
            "cost_per_1000_written_words": (hours * base["per_generating_hour"]
                                            / (summary[tag]["words_written"] / 1000)
                                            if summary.get(tag, {}).get("words_written") else None),
        }
    numbers = {
        "books": summary, "flags": flag_counts(by_book), "spearman": corr,
        "weight_sensitivity": weight_sensitivity(by_book), "runs": totals,
        "cost_base": base, "cost_measured": measured,
        "cost_scenarios": {name: {lo_l.replace("\\", ""): cost_per_book(**lo)["cost"],
                                  hi_l.replace("\\", ""): cost_per_book(**hi)["cost"]}
                           for name, (lo_l, lo, hi_l, hi) in COST_SCENARIOS.items()},
        "book_structure": structure,
        "written_chapters_scored": len(written),
    }
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "paper-numbers.json").write_text(json.dumps(numbers, indent=1, default=float))
    print(f"wrote {DATA.relative_to(REPO)}/paper-numbers.json")

    print("figures:")
    fig_architecture()
    fig_completion(runs, by_book, totals)
    fig_time(totals, by_book)
    fig_quality(summary, by_book)
    fig_book(structure)
    fig_cost()


if __name__ == "__main__":
    main()
