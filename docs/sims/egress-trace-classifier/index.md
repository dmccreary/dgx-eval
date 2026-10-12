---
title: "Data Egress Trace Classifier"
description: "Decide where the data in each of eight flows ends up: on the DGX, on the evaluator's own machine, or with a third party."
image: /sims/egress-trace-classifier/egress-trace-classifier.png
og:image: /sims/egress-trace-classifier/egress-trace-classifier.png
twitter:image: /sims/egress-trace-classifier/egress-trace-classifier.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Analyze
---

# Data Egress Trace Classifier

<iframe src="main.html" height="534px" width="100%" scrolling="no"></iframe>

[Run the Data Egress Trace Classifier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Running a model locally does not mean that no data leaves the machine. Downloads, container builds, update checks, and a cloud-based supervisor all send something somewhere.

This MicroSim shows eight flows and three places they can end. The place a flow starts is marked, and the reveal draws the flow to its destination. The flows are synthetic examples that follow the egress table in the chapter.

## How to Use

- Read the flow. The blue dot marks where it starts.
- Choose one of the three destinations. A destination is where the data ends, not its first hop.
- Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/egress-trace-classifier/main.html"
        height="534px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will distinguish, for 8 data flows in a local-generation setup, whether each stays on the DGX, goes to the evaluator's own machine, or goes to a third party, with at least 7 of 8 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Network boundary
- Data egress trace
- Supervision data exposure
- Host network mode
- Telemetry disabled

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Flow 5 starts on the evaluator's own laptop and still counts as going to a third party. Explain why.

### Assessment

Mastery is 7 of 8 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A locally hosted model means no data leaves.
- Traffic to the evaluator's own laptop is traffic to a third party.
- A one-time download is not egress.
- The supervising assistant's reads are local.

## References

1. [Chapter 18: Containing the Harness: Containers and Network Boundaries](../../chapters/18-containing-the-harness/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Data Exfiltration](https://en.wikipedia.org/wiki/Data_exfiltration) - Wikipedia. How data leaves a system, wanted or not.
3. [Localhost](https://en.wikipedia.org/wiki/Localhost) - Wikipedia. The loopback address and why only the same machine can reach it.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
