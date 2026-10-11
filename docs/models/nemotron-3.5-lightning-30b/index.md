---
title: 'Model Results: nemotron-3.5-lightning:30b'
description: 'What nemotron-3.5-lightning:30b produced in each stage of the Algebra I textbook benchmark, with links to its learning graph, quality report, chapters, and chapter metrics.'
---

# Model Results: `nemotron-3.5-lightning:30b`

What `nemotron-3.5-lightning:30b` produced in the Algebra I benchmark, run on DGX unit A
with a context of 163,840 tokens. The model has 30 billion parameters.

| Stage | Produced | Time | View |
|---|---|---|---|
| 1. Learning graph | 199 concepts, 494 dependencies | 18 min | [Graph](learning-graph-viewer.md), [quality report](learning-graph-quality.md) |
| 2. Book structure | 12 chapters, 199 of 199 concepts assigned | 22 min | [Chapter list](chapters/index.md) |
| 3. Chapter content | 12 of 12 chapters written, 81,739 words | 120 min in 12 runs | [Chapters](chapters/index.md), [metrics](chapter-metrics.md) |

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
