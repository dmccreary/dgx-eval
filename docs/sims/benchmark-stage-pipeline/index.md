---
title: "Benchmark Stage Pipeline"
description: "Open the seven elements of the three-stage benchmark pipeline, then answer four questions about what starts from what."
image: /sims/benchmark-stage-pipeline/benchmark-stage-pipeline.png
og:image: /sims/benchmark-stage-pipeline/benchmark-stage-pipeline.png
twitter:image: /sims/benchmark-stage-pipeline/benchmark-stage-pipeline.png
social:
   cards: false
quality_score: 100
status: built
library: Mermaid
bloom_level: Understand
---

# Benchmark Stage Pipeline

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Benchmark Stage Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The benchmark runs three stages, and each stage starts from a copy of what the stage before it left. This MicroSim draws the template workspace, the three runs, and their outputs as one flow.

Opening an element shows where it starts from and what it leaves. Once all seven are open, four questions ask you to locate a fact in that structure. The elements and limits come from the benchmark runner, and the questions are synthetic examples.

## How to Use

- Click each element in the diagram, or its button below the diagram, to read its description.
- When all seven are open, press **Start the questions**. Choose one element for each question, then press **Confirm**.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/benchmark-stage-pipeline/main.html"
        height="522px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will explain how the three benchmark stages chain by opening each of 7 elements of the pipeline and then answering 4 questions about what starts from what, with at least 3 of 4 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Pipeline stage
- Stage chaining
- Benchmark workspace template
- Per-chapter generation run
- Run time limit
- Run event stream

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Explain what would go wrong with the comparison between models if stage 2 started from the template instead of from the stage 1 output.

### Assessment

Mastery is 3 of 4 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Every stage starts from the template.
- Stage 3 is one run for the whole book.
- A run that hits its time limit loses what it wrote.
- A run can change its starting directory.

## References

1. [Chapter 21: Running the Textbook Benchmark](../../chapters/21-running-the-benchmark/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Flowcharts Syntax](https://mermaid.js.org/syntax/flowchart.html) - Mermaid. The diagram language used to draw this MicroSim.
3. [Design of Experiments](https://en.wikipedia.org/wiki/Design_of_experiments) - Wikipedia. Controls, replication, and the other elements of a fair comparison.
