---
title: "Agent Turn Time Breakdown"
description: "Calculate the time of one agent turn from its tokens, speeds, and tool time, name the part that dominates, then explore five inputs."
image: /sims/turn-time-breakdown/turn-time-breakdown.png
og:image: /sims/turn-time-breakdown/turn-time-breakdown.png
twitter:image: /sims/turn-time-breakdown/turn-time-breakdown.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Agent Turn Time Breakdown

<iframe src="main.html" height="592px" width="100%" scrolling="no"></iframe>

[Run the Agent Turn Time Breakdown MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

One agent turn spends time reading the prompt, writing the reply, and running a tool. Which of the three dominates decides what is worth optimizing: a faster generation speed does little for a turn that spends its time re-reading the prompt.

Three challenges each have a different dominant part. Free exploration follows, with five sliders and a bar split into the three parts. The speeds are drawn from measurements in this book, and the tool times are illustrative.

## How to Use

- Read what the challenge gives and the rules, then type the turn time in seconds.
- Choose the dominant component and press **Check**. An answer within one second with the right component is correct. Each challenge allows two attempts.
- After the third challenge, press **Start exploring** and move the sliders to see the bar change.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/turn-time-breakdown/main.html"
        height="592px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the time of an agent turn from its prompt tokens, reply tokens, speeds, and tool time to within 1 second, and name the component that dominates it, for 3 challenges.

### Grade Level

Professional development and adult continuing education

### Duration

15 minutes

### Prerequisites

- Prompt processing speed
- Tokens per second
- Prompt caching
- Prompt re-reading
- Latency
- Time breakdown

### Activities

1. **Work the challenges** (6 min): Do each calculation on paper before typing it. Use the second attempt only after finding the step that went wrong.
2. **Explore** (5 min): Change one slider at a time, and predict which way the result moves before looking.
3. **Discuss** (4 min): Challenge 2 is almost six times slower than challenge 1, and its model generates only a little more slowly. Explain where the time went.

### Assessment

Mastery is 3 of 3. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Faster generation always makes a turn faster.
- Prompt reading is negligible.
- A model's speed is one number for every workload.
- Re-reading happens only when the context is full.

## References

1. [Chapter 15: Optimizing Small Language Model Performance](../../chapters/15-optimizing-performance/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Latency (Engineering)](https://en.wikipedia.org/wiki/Latency_(engineering)) - Wikipedia. Delay as a sum of separate components.
3. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia. Tokens, context windows, and how model size is measured.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
