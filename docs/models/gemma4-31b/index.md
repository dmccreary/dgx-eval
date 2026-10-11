---
title: 'Model Results: gemma4:31b'
description: 'What gemma4:31b produced in each stage of the Algebra I textbook benchmark, with links to its learning graph, quality report, chapters, and chapter metrics.'
---

# Model Results: `gemma4:31b`

What `gemma4:31b` produced in the Algebra I benchmark, run on DGX unit A
with a context of 163,840 tokens. The model has 30.7 billion parameters.

| Stage | Produced | Time | View |
|---|---|---|---|
| 1. Learning graph | 200 concepts, 348 dependencies | 21 min | [Graph](learning-graph-viewer.md), [quality report](learning-graph-quality.md) |
| 2. Book structure | Not run yet | — | — |
| 3. Chapter content | Not run yet | — | — |

## What to Look At

- [View Learning Graph](learning-graph-viewer.md): the graph the model wrote,
  in the interactive viewer.
- [View Learning Graph Quality Report](learning-graph-quality.md): what a
  program found when it checked the graph's structure.

The chapter pages appear here once this model has run stages 2 and 3.

The learning graph and the chapters are the model's own work, shown as it
wrote them. Two things were changed. Links to pages that do not exist were
removed so that this site builds, and the metrics page counts them. If the
model listed its Foundation Concepts category after others, that category was
moved to the top of the viewer's category list; no concept or dependency was
altered.
