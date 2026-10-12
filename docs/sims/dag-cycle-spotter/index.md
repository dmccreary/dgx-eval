---
title: "DAG Cycle Spotter"
description: "Inspect six small prerequisite graphs, decide which contain a cycle, and mark the concepts that lie on it."
image: /sims/dag-cycle-spotter/dag-cycle-spotter.png
og:image: /sims/dag-cycle-spotter/dag-cycle-spotter.png
twitter:image: /sims/dag-cycle-spotter/dag-cycle-spotter.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Analyze
---

# DAG Cycle Spotter

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the DAG Cycle Spotter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A learning graph must be a directed acyclic graph: if a concept can reach itself by following its prerequisites, no teaching order exists. Shared prerequisites, long chains, and separate parts are all fine.

This MicroSim shows six graphs built so that those surface features do not predict the answer. Each graph is drawn with arrows and also listed as dependencies. The graphs are synthetic examples.

## How to Use

- Trace the arrows. An arrow from one concept to another means the first needs the second.
- Choose **Valid (no cycle)** or **Has a cycle**. For a cycle, check the concepts that lie on it, or click them in the graph.
- Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt. The reveal outlines the cycle. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/dag-cycle-spotter/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will distinguish prerequisite graphs that contain a cycle from graphs that do not, in 6 small graphs, with at least 5 of 6 classified correctly.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Concept dependency
- Edge direction
- Directed acyclic graph
- Cycle
- Topological order

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Graph 4 has a concept that is not on the cycle. Explain why removing that concept would not make the graph valid.

### Assessment

Mastery is 5 of 6 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Two concepts that share a prerequisite form a cycle.
- A graph with two disconnected parts is invalid.
- A concept that depends on itself is not a cycle.
- A longer chain of dependencies is more likely to contain a cycle.

## References

1. [Chapter 2: Learning Graphs, MicroSims, and Content Generation Rules](../../chapters/02-learning-graphs-microsims-rules/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia. Definition of a graph with directed edges and no cycles.
3. [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting) - Wikipedia. Why an order that respects every dependency exists only when there is no cycle.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
