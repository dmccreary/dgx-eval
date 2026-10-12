---
title: "Textbook Generation Pipeline Explorer"
description: "Open the eight artifacts of the textbook pipeline, then check which artifacts each generated one is built from."
image: /sims/textbook-pipeline-explorer/textbook-pipeline-explorer.png
og:image: /sims/textbook-pipeline-explorer/textbook-pipeline-explorer.png
twitter:image: /sims/textbook-pipeline-explorer/textbook-pipeline-explorer.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Remember
---

# Textbook Generation Pipeline Explorer

<iframe src="main.html" height="594px" width="100%" scrolling="no"></iframe>

[Run the Textbook Generation Pipeline Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An intelligent textbook is built as a chain: a course description, then a learning graph, a chapter structure, chapter content, MicroSims, a glossary, an FAQ, and quizzes. Knowing what each artifact is built from tells you what to regenerate when something upstream changes.

This MicroSim lets you read what each artifact contains and where it is stored, then checks the inputs of the seven generated ones. The names, inputs, and locations come from the ibook-skills pipeline.

## How to Use

- Click each artifact to read what it contains and where it is stored, then press **Start the check**.
- Check every artifact that the highlighted one is built from. Clicking an artifact in the diagram checks its box.
- Press **Submit**. The set must match exactly: a missing artifact and an extra one are both wrong. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/textbook-pipeline-explorer/main.html"
        height="594px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will identify, for each of the seven generated artifacts of the textbook pipeline, which of the other seven artifacts it is built from, with at least 6 of 7 exactly correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Course description
- Learning graph
- Skill
- Glossary
- FAQ
- Quiz
- MicroSim

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Chapter Structure and Chapter Content are stored in the same file. Explain how that can be true when one is built from the other.

### Assessment

Mastery is 6 of 7 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- The chapters are written directly from the course description without a learning graph.
- The glossary is written from the chapters rather than from the concept list.
- A MicroSim is built from the course description rather than from a specification inside a chapter.

## References

1. [Chapter 1: Prerequisites and the Intelligent Textbook](../../chapters/01-intro-intelligent-textbooks/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks/) - Dan McCreary. The five levels of intelligent textbooks and the pipeline that builds them.
3. [Agent Skills](https://agentskills.io/home) - The open standard for the skill format this MicroSim annotates.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
