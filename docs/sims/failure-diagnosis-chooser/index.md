---
title: "Failure Diagnosis Chooser"
description: "Attribute each of eight failed-run symptoms to its most likely cause from a list of eight."
image: /sims/failure-diagnosis-chooser/failure-diagnosis-chooser.png
og:image: /sims/failure-diagnosis-chooser/failure-diagnosis-chooser.png
twitter:image: /sims/failure-diagnosis-chooser/failure-diagnosis-chooser.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Analyze
---

# Failure Diagnosis Chooser

<iframe src="main.html" height="574px" width="100%" scrolling="no"></iframe>

[Run the Failure Diagnosis Chooser MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A failed benchmark run can fail in the model, in the harness, or in an earlier stage, and the symptom alone often looks the same. The discriminating detail is usually one phrase: how many turns, which stage, what the log shows.

This MicroSim gives eight symptoms and eight causes, each cause used once. The symptoms are synthetic examples that follow failures observed in this evaluation.

## How to Use

- Read the symptom and look for the detail that separates it from the others.
- Select one cause from the list. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/failure-diagnosis-chooser/main.html"
        height="574px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will attribute each of 8 failed-run symptoms to its most likely cause from a list of 8, with at least 7 of 8 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Malformed tool call
- Text-emitted tool call
- Premature turn termination
- Task loss
- Context overflow
- Harness misconfiguration
- Prompt re-reading
- Chapter dependency check

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Symptoms 1 and 6 both end a run with nothing done. State the detail in each that tells the two causes apart.

### Assessment

Mastery is 7 of 8 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A failure that ends a run is always a model failure.
- A tool error means the run cannot recover.
- A slow run is a failed run.
- A model that says it is doing the work has done it.

## References

1. [Chapter 22: Diagnosing Failures, Reporting, and Cost per Textbook](../../chapters/22-diagnosis-and-reporting/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Root Cause Analysis](https://en.wikipedia.org/wiki/Root_cause_analysis) - Wikipedia. Separating a symptom from the cause that produced it.
3. [Intelligent Agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia. The perceive, decide, and act loop that an agent harness implements.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
