---
title: 'Model Results: qwen3.8:27b'
description: 'What qwen3.8:27b produced in each stage of the Algebra I textbook benchmark, with links to its learning graph, quality report, chapters, and chapter metrics.'
---

# Model Results: `qwen3.8:27b`

What `qwen3.8:27b` produced in the Algebra I benchmark, run on DGX unit A
with a context of 163,840 tokens. The model has 27 billion parameters.

| Stage | Produced | Time | View |
|---|---|---|---|
| 1. Learning graph | 200 concepts, 299 dependencies | 102 min | [Graph](learning-graph-viewer.md), [quality report](learning-graph-quality.md) |
| 2. Book structure | 14 chapters, 200 of 200 concepts assigned | 53 min | [Chapter list](chapters/index.md) |
| 3. Chapter content | 0 of 14 chapters written, 2,919 words | 180 min in 2 runs | [Chapters](chapters/index.md), [metrics](chapter-metrics.md) |

2 of the 2 chapter runs reached the time limit.

## What to Look At

- [View Learning Graph](learning-graph-viewer.md): the graph the model wrote,
  in the interactive viewer.
- [View Learning Graph Quality Report](learning-graph-quality.md): what a
  program found when it checked the graph's structure.
- [View Chapter Content](chapters/index.md): the chapters, as the model wrote
  them.
- [View Chapter Content Metrics](chapter-metrics.md): words, diagrams
  specified, and reading level for each chapter.

The learning graph and the chapters are the model's own work, shown as it
wrote them. Two things were changed. Links to pages that do not exist were
removed so that this site builds, and the metrics page counts them. If the
model listed its Foundation Concepts category after others, that category was
moved to the top of the viewer's category list; no concept or dependency was
altered.
