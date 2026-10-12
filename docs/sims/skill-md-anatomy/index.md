---
title: "SKILL.md Anatomy"
description: "Find the part of a skill folder that answers each of six questions about how a harness uses a skill."
image: /sims/skill-md-anatomy/skill-md-anatomy.png
og:image: /sims/skill-md-anatomy/skill-md-anatomy.png
twitter:image: /sims/skill-md-anatomy/skill-md-anatomy.png
social:
   cards: false
quality_score: 100
status: built
library: html
bloom_level: Remember
---

# SKILL.md Anatomy

<iframe src="main.html" height="730px" width="100%" scrolling="no"></iframe>

[Run the SKILL.md Anatomy MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A skill is a folder: a SKILL.md file with a short header and a body of instructions, plus optional folders of reference documents and scripts. A harness loads these parts at different times, which is what keeps a large skill library cheap.

This MicroSim shows an annotated skill folder with six regions. Each question names a job, and you select the region that does it. The skill shown is a synthetic example.

## How to Use

- Point at a region to read its label. The label appears under the folder.
- Click the region that answers the question, then press **Confirm**. The correct region and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/skill-md-anatomy/main.html"
        height="730px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will identify the part of a skill that answers each of 6 questions about how a harness uses it, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Agent skill
- SKILL.md format
- Skill loading
- Skill installation

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): A harness with 50 skills installed reads only two fields of each at startup. Estimate what would change if it read every body instead.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- The harness reads every file in a skill at startup.
- The body of `SKILL.md` is how a skill is chosen.
- Reference documents are loaded with the instructions.
- A skill's scripts run by themselves.

## References

1. [Chapter 17: Agent Skills and Connecting a Harness to a Local Model](../../chapters/17-agent-skills-and-harness/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Agent Skills](https://agentskills.io/home) - The open standard for the skill format this MicroSim annotates.
3. [Intelligent Agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia. The perceive, decide, and act loop that an agent harness implements.
