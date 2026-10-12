---
title: "CIS Calculator"
description: "Calculate the concept impact score of six concepts in a small dependency graph, starting from the concepts nothing depends on."
image: /sims/cis-calculator/cis-calculator.png
og:image: /sims/cis-calculator/cis-calculator.png
twitter:image: /sims/cis-calculator/cis-calculator.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# CIS Calculator

<iframe src="main.html" height="534px" width="100%" scrolling="no"></iframe>

[Run the CIS Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The concept impact score (CIS) of a concept is 1 plus the sum of the scores of the concepts that need it directly. A score can therefore be worked out only after the scores of its dependents are known.

This MicroSim presents six concepts in an order that makes that possible. Each confirmed value is written on the graph, so later steps can use it. The graph is a synthetic example.

## How to Use

- Find the highlighted concept and the concepts whose arrows point to it. Those are its direct dependents.
- Type a whole number from 1 to 20 and press **Confirm**. The correct value and the working appear, and the entry is final.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/cis-calculator/main.html"
        height="534px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the concept impact score of each of 6 concepts in a small dependency graph, working from the concepts nothing depends on, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Concept dependency
- Dependents
- Concept impact score and its formula

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): B has one direct dependent and C has two, yet the scores are 3 and 4. Explain why the scores are not 2 and 3.

### Assessment

Mastery is 5 of 6 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A concept's score counts only its direct dependents' count, not their scores.
- A concept's score excludes itself.
- The concept with the most direct dependents always has the highest score.

## References

1. [Chapter 2: Learning Graphs, MicroSims, and Content Generation Rules](../../chapters/02-learning-graphs-microsims-rules/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia. Definition of a graph with directed edges and no cycles.
3. [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting) - Wikipedia. Why an order that respects every dependency exists only when there is no cycle.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
