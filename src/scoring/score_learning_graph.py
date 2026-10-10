#!/usr/bin/env python3
"""Score the output of the learning-graph-generator stage.

    python3 src/scoring/score_learning_graph.py <run-dir> [target-concepts]

Checks structure only: the files exist, the CSV is a valid dependency graph
with no cycles, and the JSON agrees with it. It does not judge whether the
concepts are the right ones for the course. Standard library only.
"""
import csv
import json
import re
import sys
from pathlib import Path

EXPECTED = ["concept-list.md", "learning-graph.csv", "learning-graph.json",
            "concept-taxonomy.md", "quality-metrics.md", "taxonomy-distribution.md",
            "index.md"]


def score(run_dir, target=200):
    lg = Path(run_dir) / "docs" / "learning-graph"
    out = {"files_missing": [f for f in EXPECTED if not (lg / f).exists()]}

    csv_path = lg / "learning-graph.csv"
    if not csv_path.exists():
        out["csv"] = "missing"
        return out
    with open(csv_path, newline="", errors="replace") as f:
        rows = list(csv.DictReader(f))
    out["csv_columns"] = list(rows[0].keys()) if rows else []
    ids, labels, deps, bad = [], [], {}, []
    for r in rows:
        try:
            cid = int(r.get("ConceptID", "").strip())
        except ValueError:
            bad.append(f"non-integer id {r.get('ConceptID')!r}")
            continue
        ids.append(cid)
        labels.append((r.get("ConceptLabel") or "").strip())
        raw = (r.get("Dependencies") or "").strip()
        try:
            deps[cid] = [int(x) for x in re.split(r"[|;, ]+", raw) if x]
        except ValueError:
            bad.append(f"concept {cid}: unparsable dependencies {raw!r}")
            deps[cid] = []
    id_set = set(ids)
    for cid, ds in deps.items():
        bad += [f"concept {cid} depends on itself" for d in ds if d == cid]
        bad += [f"concept {cid} depends on unknown id {d}" for d in ds if d not in id_set]

    # Kahn's algorithm: whatever cannot be ordered sits on a cycle.
    remaining = {c: {d for d in ds if d in id_set and d != c} for c, ds in deps.items()}
    ordered = 0
    while True:
        ready = [c for c, ds in remaining.items() if not ds]
        if not ready:
            break
        ordered += len(ready)
        for c in ready:
            del remaining[c]
        for ds in remaining.values():
            ds.difference_update(ready)

    depended_on = {d for ds in deps.values() for d in ds}
    edges = sum(len(ds) for ds in deps.values())
    out.update({
        "concepts": len(ids),
        "target_concepts": target,
        "hit_target": len(ids) == target,
        "ids_consecutive_from_1": sorted(ids) == list(range(1, len(ids) + 1)),
        "duplicate_labels": len(labels) - len(set(l.lower() for l in labels)),
        "labels_over_32_chars": sum(len(l) > 32 for l in labels),
        "edges": edges,
        "avg_dependencies": round(edges / len(ids), 2) if ids else 0,
        "foundational_concepts": sum(not ds for ds in deps.values()),
        "isolated_concepts": sum(1 for c in ids if not deps[c] and c not in depended_on),
        "concepts_on_cycles": len(remaining),
        "is_dag": not remaining,
        "taxonomy_filled": sum(bool((r.get("TaxonomyID") or "").strip()) for r in rows),
        "csv_errors": bad[:10],
        "csv_error_count": len(bad),
    })

    json_path = lg / "learning-graph.json"
    if json_path.exists():
        try:
            g = json.loads(json_path.read_text(errors="replace"))
            nodes, jedges = g.get("nodes", []), g.get("edges", [])
            out["json"] = {
                "valid": True,
                "nodes": len(nodes),
                "edges": len(jedges),
                "matches_csv": len(nodes) == len(ids) and len(jedges) == edges,
                "has_metadata": bool(g.get("metadata")),
                "groups": len(g.get("groups") or {}),
                "nodes_with_cis": sum("cis" in n for n in nodes),
            }
        except ValueError as e:
            out["json"] = {"valid": False, "error": str(e)[:120]}
    else:
        out["json"] = "missing"

    nav = (Path(run_dir) / "mkdocs.yml").read_text(errors="replace")
    out["nav_mentions_learning_graph"] = "learning-graph/" in nav
    return out


if __name__ == "__main__":
    target = int(sys.argv[2]) if len(sys.argv) > 2 else 200
    print(json.dumps(score(sys.argv[1], target), indent=2))
