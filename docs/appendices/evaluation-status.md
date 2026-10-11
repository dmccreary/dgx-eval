---
title: 'Evaluation Status: How Far Each Model Has Got'
description: 'A status table for the ten candidate models: the parameter count and disk space of each, which benchmark stages it has finished on the DGX, and which quality scores exist so far.'
---

# Evaluation Status

Last updated October 10, 2026, at 11:45 PM. Stages 2 and 3 are done for all
six models that produced a learning graph. [Model Results](../models/index.md) holds what each model
produced.

<div class="eval-status" markdown>

| Model Name | Params | Disk Space Used | Learning Graph | Book Structure | Chapters Generated | Automated Quality Score | Human Quality Score |
|---|---:|---:|:---:|:---:|:---:|:---:|:---:|
| [`qwen3.8:27b`](../models/qwen3.8-27b/index.md) | 27 B | 17 GB | ✅ | ✅ | ❌ | — | — |
| [`gemma4:31b`](../models/gemma4-31b/index.md) | 30.7 B | 20 GB | ✅ | ✅ | 10 of 12 | — | — |
| `muse-glimmer:30b` | 30 B | 18 GB | ❌ | — | — | — | — |
| [`qwen3.6:35b`](../models/qwen3.6-35b/index.md) | 35 B | 22 GB | ✅ | ✅ | ✅ | — | — |
| [`gemma4:26b`](../models/gemma4-26b/index.md) | 25.2 B | 18 GB | ✅ | ✅ | 10 of 14 | — | — |
| [`nemotron-3.5-lightning:30b`](../models/nemotron-3.5-lightning-30b/index.md) | 30 B | 25 GB | ✅ | ✅ | ✅ | — | — |
| `mistral-medium-3.5:128b` | 128 B | 160 GB | ❌ | — | — | — | — |
| [`gpt-oss:120b`](../models/gpt-oss-120b/index.md) | 117 B | 65 GB | ✅ | ✅ | 6 of 10 | — | — |
| `devstral-small-2:24b` | 24 B | 30 GB | ❌ | — | — | — | — |
| `granite4.2:30b` | 30 B | 17 GB | ❌ | — | — | — | — |

</div>

Six of the ten models produced a learning graph, and all six have now been
through all three stages. `nemotron-3.5-lightning:30b` wrote all twelve of
its chapters and `qwen3.6:35b` wrote all eleven. `gemma4:31b` wrote ten of
its twelve, `gemma4:26b` ten of its fourteen, and `gpt-oss:120b` six of its
ten. `qwen3.8:27b` designed fourteen chapters and wrote none. No quality
score exists yet.

## How to Read the Table

- ✅ **Done.** The stage ran to the end and produced its output.
- ❌ **Not done.** The stage was tried and failed, or could not be run.
- **A count**, such as 10 of 14. The stage ended with only that many chapters
  written.
- — **Not started.**

A green check records that a stage finished. It says nothing about how good
the output is. The six learning graphs differ in quality, and
[First-Round Results](model-candidates.md#first-round-results) lists what was
wrong with each.

Four models have no learning graph, each for a different reason:

- `muse-glimmer:30b` lost the task after a few steps.
- `mistral-medium-3.5:128b` was not run. With the model loaded, no usable
  context length leaves enough memory free.
- `devstral-small-2:24b` wrote its tool call as text, so nothing ran.
- `granite4.2:30b` was stopped at the 150-minute limit with only the concept
  list written.

`gemma4:26b` ran once for each of its fourteen chapters and wrote ten of
them. In three runs the skill's own check found that the chapter depended on
concepts placed in later chapters, and the model stopped as the skill
requires. That traces back to the chapter structure the same model designed
in stage 2. In one run the model ended without writing anything.

`gpt-oss:120b` ran once for each of its ten chapters and wrote six. In the
other four runs it announced that the skill was running, as if something else
would do the work, and ended its turn without writing the chapter.

`qwen3.8:27b` was too slow to write a chapter. Its first two chapter runs
each used the full 90 minutes and had made about twenty tool calls without
reaching the step that writes the file. The remaining twelve were not run.
This is the model that produced the cleanest learning graph.

`gemma4:31b` ran once for each of its twelve chapters and wrote ten. One run
used the full 90 minutes without writing the chapter. Another ended after
four turns when the model's reply was a stray control token instead of a
tool call.

## What Each Column Means

- **Params.** The total number of parameters, in billions, as the publisher
  states it. [Model Candidates](model-candidates.md) also gives the number
  active for each token, for the models that use only part of their
  parameters at a time.
- **Disk Space Used.** The space the model takes on the unit used for the
  first round. Two models, `mistral-medium-3.5:128b` and
  `devstral-small-2:24b`, are on disk in two variants, the standard one and
  one in llama.cpp format, so each takes twice its download size. Together
  the ten models take about 397 GB.
- **Learning Graph.** Stage 1. The model runs the `learning-graph-generator`
  skill on the Algebra I course description. It is done when the run ends on
  its own and leaves a learning graph as both a CSV file and a JSON file.
- **Book Structure.** Stage 2. The model runs the `book-chapter-generator`
  skill to design the chapters from its own learning graph.
- **Chapters Generated.** Stage 3. The model runs the
  `chapter-content-generator` skill once for each chapter. A chapter counts
  as written when its placeholder is gone and it has at least 1,000 words.
- **Automated Quality Score.** A score a program computes from the output. No
  score has been defined yet. Each model's section in
  [Model Results](../models/index.md) has a learning graph quality report and a
  page of chapter metrics, but they have not been combined into one number.
- **Human Quality Score.** A person's judgment of whether the content is
  correct and worth reading. Nobody has reviewed any output yet.

## What Is Left

- **Repeated runs.** Every test so far has been run once, so nobody knows
  whether a model gives a comparable result the second time.
- **Scoring.** The automated score has to be defined, and a person has to
  review the output.
- **A cloud baseline.** The same book has not yet been generated by a cloud
  service for comparison.
