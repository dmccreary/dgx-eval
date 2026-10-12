---
title: "Evaluation Design Flaw Finder"
description: "Read a described comparison of a local and a cloud model, then judge eight statements about it as a flaw or not a flaw."
image: /sims/design-flaw-finder/design-flaw-finder.png
og:image: /sims/design-flaw-finder/design-flaw-finder.png
twitter:image: /sims/design-flaw-finder/design-flaw-finder.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Evaluate
---

# Evaluation Design Flaw Finder

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Evaluation Design Flaw Finder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A fair comparison changes one thing and holds the rest fixed, repeats its runs, scores neutrally, and states its limits. This MicroSim describes an evaluation that does some of those things and fails at others.

Eight statements follow. Five name real flaws and three name sound practices, so answering "flaw" every time does not work. The evaluation and the statements are synthetic examples.

## How to Use

- Read the described evaluation. It stays on screen for every statement.
- Choose **Flaw** or **Not a flaw** for the statement. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/design-flaw-finder/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will critique a described evaluation by judging each of 8 statements about it as a flaw or not a flaw, with at least 7 of 8 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Evaluation question
- Controlled variables
- Fixed inputs
- Repeated runs
- Sample size
- Fair comparison
- Bias
- Limitations statement

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Rewrite the described evaluation in three sentences so that none of the five flaws remains.

### Assessment

Mastery is 7 of 8 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A comparison of two systems needs no controls if one is clearly stronger.
- A single run is enough to rank.
- A result scored by the system that produced it is neutral.
- Having a method is the same as having a fair method.

## References

1. [Chapter 19: Designing a Fair Evaluation](../../chapters/19-fair-evaluation-design/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Design of Experiments](https://en.wikipedia.org/wiki/Design_of_experiments) - Wikipedia. Controls, replication, and the other elements of a fair comparison.
3. [Confounding](https://en.wikipedia.org/wiki/Confounding) - Wikipedia. How an uncontrolled variable can be mistaken for the effect being studied.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
