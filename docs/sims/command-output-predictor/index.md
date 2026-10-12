---
title: "Command Output Predictor"
description: "Predict what five shell commands print, in order, against a small practice directory, and watch the working directory carry over."
image: /sims/command-output-predictor/command-output-predictor.png
og:image: /sims/command-output-predictor/command-output-predictor.png
twitter:image: /sims/command-output-predictor/command-output-predictor.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Command Output Predictor

<iframe src="main.html" height="714px" width="100%" scrolling="no"></iframe>

[Run the Command Output Predictor MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A shell keeps a working directory, and each command runs from wherever the last one left it. This MicroSim runs five commands in a fixed order against a practice directory, so a prediction for one command depends on the commands before it.

The directory and its file contents are a synthetic example. The terminal on the right builds up the real session as you go.

## How to Use

- Read the directory tree. The highlighted line is the working directory.
- Click the output you predict for the command at the prompt. The click is final: the terminal shows the real output at once, with the reason.
- Press **Next command** and watch the working directory. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/command-output-predictor/main.html"
        height="714px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will execute five shell commands against a given directory tree by predicting the output and the resulting working directory after each, with at least 4 of 5 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Terminal
- Shell
- Working directory
- Path
- Absolute path
- Relative path
- Command
- Argument

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Command 3 prints nothing. Name the evidence, in commands 4 and 5, that it did something.

### Assessment

Mastery is 4 of 5 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- `ls` lists everything below the working directory, including the contents of subfolders.
- `cd` prints the new path.
- `..` names the current folder rather than the parent folder.
- Each command starts fresh instead of continuing from the working directory the previous command left.

## References

1. [Chapter 1: Prerequisites and the Intelligent Textbook](../../chapters/01-intro-intelligent-textbooks/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Working Directory](https://en.wikipedia.org/wiki/Working_directory) - Wikipedia. The directory a shell command runs in and how relative paths use it.
3. [Path (Computing)](https://en.wikipedia.org/wiki/Path_(computing)) - Wikipedia. Absolute and relative paths, and the meaning of two dots.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
