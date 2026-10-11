---
title: 'Model Results: What Each Model Produced'
description: 'The learning graph, quality report, chapters, and chapter metrics that each candidate model produced in the Algebra I textbook benchmark.'
---

# Model Results

Each model that produced a learning graph has its own section here, holding
what it generated for the Algebra I benchmark and what a program measured
about it. [Evaluation Status](../evaluation-status.md) shows how far each
model has got.

| Model | Concepts | Chapters written | Words | Diagrams specified | Average reading grade |
|---|---:|:---:|---:|---:|---:|
| [`gemma4:26b`](gemma4-26b/index.md) | 200 | 10 of 14 | 27,217 | 18 | 11.5 |
| [`qwen3.8:27b`](qwen3.8-27b/index.md) | 200 | 0 of 14 | 2,919 | 0 | — |
| [`gemma4:31b`](gemma4-31b/index.md) | 200 | — | — | — | — |
| [`qwen3.6:35b`](qwen3.6-35b/index.md) | 200 | 11 of 11 | 75,425 | 33 | 11.3 |
| [`nemotron-3.5-lightning:30b`](nemotron-3.5-lightning-30b/index.md) | 199 | 12 of 12 | 81,739 | 51 | 12.0 |
| [`gpt-oss:120b`](gpt-oss-120b/index.md) | 200 | 6 of 10 | 18,624 | 88 | 12.5 |

Each model's section has the same four views:

- **View Learning Graph.** The graph the model wrote, in the interactive
  viewer.
- **View Learning Graph Quality Report.** Automated checks on the graph's
  structure.
- **View Chapter Content.** The chapters, as the model wrote them.
- **View Chapter Content Metrics.** Words, diagrams specified, and reading
  level for each chapter.

The chapter views appear once a model has run stages 2 and 3.

These models have no section because they produced no learning graph: `devstral-small-2:24b`, `muse-glimmer:30b`, `granite4.2:30b`, `mistral-medium-3.5:128b`.

!!! note "Generated text, not reviewed"

    The graphs and chapters are shown as each model wrote them, apart from
    links to missing pages, which were removed. Nobody has corrected the
    content, and no person has yet judged whether it is right.
