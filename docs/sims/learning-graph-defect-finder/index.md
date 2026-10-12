---
title: "Learning Graph Defect Finder"
description: "Examine a 16-concept dependency graph and flag the concepts that have one of four structural defects."
image: /sims/learning-graph-defect-finder/learning-graph-defect-finder.png
og:image: /sims/learning-graph-defect-finder/learning-graph-defect-finder.png
twitter:image: /sims/learning-graph-defect-finder/learning-graph-defect-finder.png
social:
   cards: false
quality_score: 100
status: built
library: vis-network
bloom_level: Analyze
---

# Learning Graph Defect Finder

<iframe src="main.html" height="838px" width="100%" scrolling="no"></iframe>

[Run the Learning Graph Defect Finder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Four structural checks catch most broken learning graphs: duplicate labels, orphans, cycles, and labels over the length limit. Each check has to be applied to the whole graph, not to whatever looks unusual.

This MicroSim seeds each defect once in a graph of 16 concepts and adds two legitimate look-alikes. An arrow points from a concept to each concept it depends on. The graph is a synthetic example.

## How to Use

- Click a concept, or choose it from the **Concept** list, to read its label length, its prerequisites, and its dependents.
- Choose a defect type and press **Flag**. A concept in a cycle or a duplicate pair is flagged individually. **Remove flag** undoes a flag.
- Press **Submit** once you are satisfied. Each defect is marked found or missed with its reason, and false flags are listed.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/learning-graph-defect-finder/main.html"
        height="838px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will examine a 16-concept dependency graph and mark the concepts that have one of four structural defects, finding all 4 defects with no more than 1 false flag.

### Grade Level

Professional development and adult continuing education

### Duration

15 minutes

### Prerequisites

- Duplicate concept labels
- Orphaned concepts
- Dependency cycle check
- Label length limit
- Structural checks

### Activities

1. **Inspect** (5 min): Apply each of the four checks to the whole graph before placing a flag.
2. **Flag and submit** (5 min): Place the flags, submit once, and read the reason given for each defect and each false flag.
3. **Discuss** (5 min): Concept 1 and concept 14 both have no prerequisites. Explain why only one of them is a defect.

### Assessment

Mastery is all 4 defects found, with no more than 1 flag on a concept that is not in the answer key. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A concept with no prerequisites is always a defect.
- A label at the limit is over it.
- Two concepts whose labels differ only in case are different.
- A cycle is visible only as one edge.

## References

1. [Chapter 20: Scoring, Bias, and Structural Checks](../../chapters/20-scoring-and-bias/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - vis.js. The graph library used to draw this MicroSim.
3. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia. Definition of a graph with directed edges and no cycles.
4. [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting) - Wikipedia. Why an order that respects every dependency exists only when there is no cycle.
