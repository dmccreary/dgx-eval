---
title: "Environment Reproducibility Auditor"
description: "Judge whether each of six environment specifications rebuilds the same software on a second machine, and name the reason when it does not."
image: /sims/environment-reproducibility-auditor/environment-reproducibility-auditor.png
og:image: /sims/environment-reproducibility-auditor/environment-reproducibility-auditor.png
twitter:image: /sims/environment-reproducibility-auditor/environment-reproducibility-auditor.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Evaluate
---

# Environment Reproducibility Auditor

<iframe src="main.html" height="544px" width="100%" scrolling="no"></iframe>

[Run the Environment Reproducibility Auditor MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An environment file is reproducible only if a second machine resolves it to the same software. Unpinned versions, platform-specific builds, an unnamed channel, and a build that may lack CUDA each defeat that.

This MicroSim shows six specifications. Each failing one fails for exactly one of those reasons, and two pass. The specifications are synthetic examples with illustrative version numbers.

## How to Use

- Read the specification and choose **Reproducible** or **Not reproducible**.
- For **Not reproducible**, select the one reason from the list. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/environment-reproducibility-auditor/main.html"
        height="544px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will judge whether each of 6 environment specifications rebuilds the same software on a second machine, and name the reason, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Environment.yml
- Python version pinning
- Package channel
- Architecture-specific wheels
- Conda export forms
- CUDA-enabled PyTorch
- Environment rebuild

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Specification 4 installs a package that imports without error. Describe the one-line check that would have exposed the problem.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A file that lists packages is automatically reproducible.
- A full export from one machine rebuilds on any machine.
- A package that imports without error has the capabilities you need.
- An unnamed channel is harmless.

## References

1. [Chapter 8: Reproducible Python Environments with Conda](../../chapters/08-conda-environments/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Managing Environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html) - conda. Exporting an environment, including the portable from-history form.
3. [Reproducibility](https://en.wikipedia.org/wiki/Reproducibility) - Wikipedia. What it means for a result or a setup to be obtained again.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
