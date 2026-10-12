---
title: "Local, Cloud, or Hybrid Chooser"
description: "Recommend local, cloud, or hybrid deployment for six scenarios and name the one constraint that decides each."
image: /sims/local-cloud-hybrid-chooser/local-cloud-hybrid-chooser.png
og:image: /sims/local-cloud-hybrid-chooser/local-cloud-hybrid-chooser.png
twitter:image: /sims/local-cloud-hybrid-chooser/local-cloud-hybrid-chooser.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Evaluate
---

# Local, Cloud, or Hybrid Chooser

<iframe src="main.html" height="594px" width="100%" scrolling="no"></iframe>

[Run the Local, Cloud, or Hybrid Chooser MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Where a model should run follows from the constraints of the work: whether data may leave the site, whether there is a network, how steady the volume is, and whether anyone can operate hardware. A constraint that makes a deployment impossible outranks one that only makes it costly.

This MicroSim gives six scenarios. Each needs both a deployment and the deciding constraint, and both must be right. The scenarios are synthetic examples.

## How to Use

- Read the scenario and choose **Local**, **Cloud**, or **Hybrid**.
- Select the one constraint that decides it. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/local-cloud-hybrid-chooser/main.html"
        height="594px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will recommend local, cloud, or hybrid deployment for each of 6 scenarios and identify the constraint that decides it, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Cloud LLM service
- Local model deployment
- Privacy
- Data sovereignty
- Offline operation
- Rate limits
- Operational burden
- Hybrid workflow

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Scenario 5 is the only hybrid answer. State what would have to change in scenario 1 for hybrid to become acceptable there.

### Assessment

Mastery is 5 of 6 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Local is always cheaper.
- Cloud always gives the best result for the task.
- Hybrid is always the safest answer.
- A privacy requirement can always be met by a cloud provider's contract.

## References

1. [Chapter 4: Local SLMs Versus Cloud LLM Services](../../chapters/04-local-versus-cloud/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Cloud Computing](https://en.wikipedia.org/wiki/Cloud_computing) - Wikipedia. Service models and the trade-offs against owned hardware.
3. [Data Sovereignty](https://en.wikipedia.org/wiki/Data_sovereignty) - Wikipedia. Why some data may not leave a site or a jurisdiction.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
