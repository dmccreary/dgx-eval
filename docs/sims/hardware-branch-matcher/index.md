---
title: "Hardware Finding to Setup Branch Matcher"
description: "Match six hardware probe findings to the setup branch each one triggers."
image: /sims/hardware-branch-matcher/hardware-branch-matcher.png
og:image: /sims/hardware-branch-matcher/hardware-branch-matcher.png
twitter:image: /sims/hardware-branch-matcher/hardware-branch-matcher.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Hardware Finding to Setup Branch Matcher

<iframe src="main.html" height="534px" width="100%" scrolling="no"></iframe>

[Run the Hardware Finding to Setup Branch Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

What a probe reports decides how a machine is set up: which package builds run, what memory a model is sized against, and which CUDA build is safe. Each finding here triggers exactly one branch.

This MicroSim shows six findings as a probe would print them. The findings are synthetic examples.

## How to Use

- Read the finding and decide which rule from the chapter it calls for.
- Select one branch from the list. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/hardware-branch-matcher/main.html"
        height="534px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will apply the hardware-to-setup rules of this chapter to 6 findings by choosing the setup branch each finding triggers, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- CPU architecture
- X86_64
- Aarch64
- Dedicated GPU memory
- Unified memory
- Multi-GPU system
- NVIDIA driver
- CUDA

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Findings 3 and 4 both list one GPU. Explain why they lead to different ways of sizing a model.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Every DGX has dedicated GPU memory.
- A download that completes will run on any DGX.
- `nvidia-smi` always reports how much GPU memory there is.
- A newer CUDA build is always better.

## References

1. [Chapter 5: NVIDIA DGX Hardware Architecture](../../chapters/05-dgx-hardware-architecture/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. The unified memory design of the system evaluated in this book.
3. [AArch64](https://en.wikipedia.org/wiki/AArch64) - Wikipedia. The 64-bit Arm architecture and why its builds differ from x86-64 builds.
4. [CUDA](https://en.wikipedia.org/wiki/CUDA) - Wikipedia. The NVIDIA computing platform whose version the driver limits.
