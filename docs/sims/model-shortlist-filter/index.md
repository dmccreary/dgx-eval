---
title: "Model Shortlist Filter"
description: "Apply four selection criteria, in order, to eight candidate models and name the first criterion each excluded model fails."
image: /sims/model-shortlist-filter/model-shortlist-filter.png
og:image: /sims/model-shortlist-filter/model-shortlist-filter.png
twitter:image: /sims/model-shortlist-filter/model-shortlist-filter.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Model Shortlist Filter

<iframe src="main.html" height="636px" width="100%" scrolling="no"></iframe>

[Run the Model Shortlist Filter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A model goes on the shortlist only if it supports tool calling, has a large enough context window, fits in memory with headroom, and comes from an identified publisher with readable terms. The criteria are checked in that order.

This MicroSim shows eight model cards for a 128 GB unified-memory machine. Each card fails at most one criterion, and three pass. The candidates are synthetic examples.

## How to Use

- Read the card against the four criteria on the right, from top to bottom.
- Choose **Shortlist** or **Exclude**. For **Exclude**, select the first criterion that fails.
- Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/model-shortlist-filter/main.html"
        height="636px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will apply four selection criteria to 8 candidate models for a 128 GB unified-memory machine, deciding shortlist or exclude and naming the first failed criterion, with at least 7 of 8 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Model selection criteria
- Tool-calling reliability
- Context window
- Safety headroom
- Publisher provenance
- License review
- Exclusion rationale

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Model D would load on this machine. Explain why it is excluded anyway.

### Assessment

Mastery is 7 of 8 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A model that fits in raw memory is acceptable.
- A large context window makes up for a missing tool-calling feature.
- A missing license statement is as good as a permissive one.
- A popular name is proof of provenance.

## References

1. [Chapter 12: Selecting and Downloading an Open-Weight Model](../../chapters/12-selecting-downloading-models/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia. Tokens, context windows, and how model size is measured.
3. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. The unified memory design of the system evaluated in this book.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
