---
title: "Candidate Model Explorer"
description: "Compare ten candidate models on a bubble chart of parameter count, generation speed, and download size, then answer five questions."
image: /sims/candidate-model-explorer/candidate-model-explorer.png
og:image: /sims/candidate-model-explorer/candidate-model-explorer.png
twitter:image: /sims/candidate-model-explorer/candidate-model-explorer.png
social:
   cards: false
quality_score: 100
status: built
library: Chart.js
bloom_level: Analyze
---

# Candidate Model Explorer

<iframe src="main.html" height="752px" width="100%" scrolling="no"></iframe>

[Run the Candidate Model Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Each bubble is one of the ten candidate models. Its horizontal position is the parameter count in billions on a logarithmic scale, its height is the generation speed in tokens per second, and its size is the download in gigabytes.

Five questions need two of those dimensions at a time. The values are the midpoints of the measured ranges in the chapter. They were measured once each and are provisional.

## How to Use

- Point at a bubble to read its three values. Each bubble carries the letter of its model.
- Click a bubble or a model button to choose a model, then press **Confirm**. The correct model and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/candidate-model-explorer/main.html"
        height="752px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will compare the ten candidate models on parameter count, generation speed, and download size by answering 5 questions from a bubble chart, with at least 4 of 5 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Dense model
- Mixture of experts
- Active parameters
- Tokens per second
- Model download

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): The two models above 100 billion parameters differ in speed by more than ten times. Use the chapter to explain what accounts for the difference.

### Assessment

Mastery is 4 of 5 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A bigger model is a faster model.
- A bigger download means more parameters.
- A mixture-of-experts model needs less memory.
- The model with the most parameters is the best choice.

## References

1. [Chapter 14: Open-Weight Model Families and Candidate Models](../../chapters/14-candidate-models/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Bubble Chart](https://www.chartjs.org/docs/latest/charts/bubble.html) - Chart.js. The chart type used to draw this MicroSim.
3. [Bubble Chart](https://en.wikipedia.org/wiki/Bubble_chart) - Wikipedia. Reading three quantities from position and size.
4. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia. Tokens, context windows, and how model size is measured.
