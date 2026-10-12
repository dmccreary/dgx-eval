---
title: "Structured Output Judge"
description: "Judge whether each of six model replies is valid JSON in a required format, and name the defect in each invalid one."
image: /sims/structured-output-judge/structured-output-judge.png
og:image: /sims/structured-output-judge/structured-output-judge.png
twitter:image: /sims/structured-output-judge/structured-output-judge.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Evaluate
---

# Structured Output Judge

<iframe src="main.html" height="626px" width="100%" scrolling="no"></iframe>

[Run the Structured Output Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A program that reads a model reply accepts it only if it parses and matches the required format. A reply that looks right to a person can still fail on a type, a missing field, a sentence around the JSON, or one comma.

This MicroSim keeps the required format on screen and shows six replies that each differ from it in one precise way, or not at all. The format and replies are synthetic examples.

## How to Use

- Compare the reply with the required format, field by field.
- Choose **Valid** or **Invalid**. For **Invalid**, select the defect. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/structured-output-judge/main.html"
        height="626px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will judge whether each of 6 model replies is valid JSON that matches a given required format, naming the defect in each invalid reply, with at least 5 of 6 judged correctly.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Structured output
- JSON object
- Field
- Integer
- String
- Array

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Reply 4 contains exactly the JSON of reply 1. Explain why a program rejects one and accepts the other.

### Assessment

Mastery is 5 of 6 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A reply that looks right is valid.
- A reply containing valid JSON inside explanatory text is valid.
- A trailing comma is harmless.
- An empty array is a missing field.

## References

1. [Chapter 3: Small Language Models](../../chapters/03-small-language-models/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc8259) - RFC 8259. The syntax rules a parser applies, including the rule against trailing commas.
3. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia. Tokens, context windows, and how model size is measured.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
