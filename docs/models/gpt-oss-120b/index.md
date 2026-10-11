---
title: 'Model Results: gpt-oss:120b'
description: 'What gpt-oss:120b produced in each stage of the Algebra I textbook benchmark, with links to its learning graph, quality report, chapters, and chapter metrics.'
---

# Model Results: `gpt-oss:120b`

What `gpt-oss:120b` produced in the Algebra I benchmark, run on DGX unit A
with a context of 131,072 tokens. The model has 117 billion parameters.

| Stage | Produced | Time | View |
|---|---|---|---|
| 1. Learning graph | 200 concepts, 180 dependencies | 17 min | [Graph](learning-graph-viewer.md), [quality report](learning-graph-quality.md) |
| 2. Book structure | 10 chapters, 200 of 200 concepts assigned | 9 min | [Chapter list](chapters/index.md) |
| 3. Chapter content | 6 of 10 chapters written, 18,624 words | 89 min in 10 runs | [Chapters](chapters/index.md), [metrics](chapter-metrics.md) |

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
