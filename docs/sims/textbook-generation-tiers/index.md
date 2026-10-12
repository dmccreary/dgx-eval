---
title: "Five Tiers of Textbook Generation"
description: "See the five tiers that turn one course description into a whole intelligent textbook, then check which tier does what."
image: /sims/textbook-generation-tiers/textbook-generation-tiers.png
og:image: /sims/textbook-generation-tiers/textbook-generation-tiers.png
twitter:image: /sims/textbook-generation-tiers/textbook-generation-tiers.png
social:
   cards: false
quality_score: 100
status: built
library: html
bloom_level: Remember
---

# Five Tiers of Textbook Generation

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run the Five Tiers of Textbook Generation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

An intelligent textbook is generated from the top down. A person writes a course description, and four more tiers follow from it: a learning graph, a book structure, the chapter content, and the MicroSims with their supplementary content. Each tier is built from the tiers above it, which is why the stack gets wider toward the bottom.

This MicroSim shows the five tiers as one picture, with the size of each for the Algebra I course this book uses as its test. The benchmark gives every model the same tier 1 and measures its attempt at tiers 2, 3, and 4. Tier 5 is outside the benchmark. The picture in tier 2 is the 200-concept learning graph that the model `qwen3.6:35b` generated in this evaluation, shown in this book's [learning graph viewer](../graph-viewer/index.md).

## How to Use

- Click each tier to read what it holds and one rule it must follow. Tier 2 has a link to its graph in the live viewer.
- When all five are open, press **Start the questions**. Choose one tier for each question, then press **Confirm**.
- There is one attempt for each question. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/textbook-generation-tiers/main.html"
        height="642px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will identify which of the five tiers of textbook generation matches a description, for 5 descriptions, with at least 4 of 5 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Course description
- Learning graph
- Concept and dependency
- Book structure
- Chapter content
- MicroSim and MicroSim specification

### Activities

1. **Read the stack** (3 min): Open each tier in order, from 1 to 5, and read its description and example rule.
2. **Work alone** (4 min): Answer the five questions without notes, committing each answer before the reveal.
3. **Discuss** (3 min): The book structure tier wrote no prose. Explain how a mistake made there could still stop a chapter from being written.

### Assessment

Mastery is 4 of 5 correct on the first attempt. Opening a tier is practice and does not count as evidence.

### Misconceptions Addressed

- The model writes the course description.
- Chapters are written straight from the course description, with no learning graph and no structure step.
- MicroSim specifications are written in tier 5, when the MicroSims are built.
- The benchmark covers all five tiers.

## References

1. [Chapter 1: Prerequisites and the Intelligent Textbook](../../chapters/01-intro-intelligent-textbooks/index.md) - The chapter of this book that introduces the five tiers.
2. [Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks/) - Dan McCreary. The five levels of intelligent textbooks and the workflow that builds them.
3. [Agent Skills](https://agentskills.io/home) - The open standard for the skills that carry the rules of tiers 2, 3, and 4.
4. [Evaluation Status](../../appendices/evaluation-status.md) - How far each candidate model got through the three benchmark stages.
