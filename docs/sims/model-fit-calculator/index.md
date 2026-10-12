---
title: "Model-Fit Calculator"
description: "Calculate the memory a model needs from its parameter count, precision, and context length, state whether it fits, then explore seven inputs."
image: /sims/model-fit-calculator/model-fit-calculator.png
og:image: /sims/model-fit-calculator/model-fit-calculator.png
twitter:image: /sims/model-fit-calculator/model-fit-calculator.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Model-Fit Calculator

<iframe src="main.html" height="732px" width="100%" scrolling="no"></iframe>

[Run the Model-Fit Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The memory a model needs has three terms: the weights, the cache that grows with the context, and a runtime overhead. A model fits when that total is within the usable memory, which is the memory less a safety headroom.

Three challenges each move a different term. Free exploration follows, with seven sliders and a bar that marks the usable limit and the memory. The 8-bit figure and the cache size per token are illustrative and are not published figures.

## How to Use

- Read what the challenge gives and the rules, then type the memory needed in gigabytes.
- Choose one of the three verdicts and press **Check**. An answer within 1 GB with the right verdict is correct. Each challenge allows two attempts.
- After the third challenge, press **Start exploring** and move the sliders to see the bar change.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/model-fit-calculator/main.html"
        height="732px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the memory a model needs from its parameter count, precision, and context length, to within 1 GB, and state the fit verdict, for 3 challenges.

### Grade Level

Professional development and adult continuing education

### Duration

15 minutes

### Prerequisites

- Model weights
- Numeric precision
- Quantization
- KV cache
- Runtime overhead
- Safety headroom
- Fit verdict
- Unified memory fit

### Activities

1. **Work the challenges** (6 min): Do each calculation on paper before typing it. Use the second attempt only after finding the step that went wrong.
2. **Explore** (5 min): Change one slider at a time, and predict which way the result moves before looking.
3. **Discuss** (4 min): In challenge 3 the model loads and the verdict is still not "Fits". Explain what the headroom is for on a unified-memory machine.

### Assessment

Mastery is 3 of 3. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A 4-bit file uses exactly 4 bits per parameter.
- The context length does not change memory until the conversation is long.
- A model that loads has therefore fit.
- A larger memory always means a bigger model can be run.

## References

1. [Chapter 11: Model Sizing and Fit](../../chapters/11-model-sizing-and-fit/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. The unified memory design of the system evaluated in this book.
3. [Quantization (Signal Processing)](https://en.wikipedia.org/wiki/Quantization_(signal_processing)) - Wikipedia. Storing numbers at lower precision, the idea behind 8-bit and 4-bit model files.
4. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia. Tokens, context windows, and how model size is measured.
