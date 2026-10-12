---
title: "Words to Tokens Estimator"
description: "Estimate the token count of six documents from their word counts and decide whether each fits a context window with a 2,000-token reply."
image: /sims/words-to-tokens-estimator/words-to-tokens-estimator.png
og:image: /sims/words-to-tokens-estimator/words-to-tokens-estimator.png
twitter:image: /sims/words-to-tokens-estimator/words-to-tokens-estimator.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Words to Tokens Estimator

<iframe src="main.html" height="588px" width="100%" scrolling="no"></iframe>

[Run the Words to Tokens Estimator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A model counts tokens, not words, and its context window holds both the text it is given and the text it writes. A document that fits by itself can therefore fail to fit once the reply is counted.

This MicroSim gives six documents and windows. You estimate the tokens at 1.33 per word and then decide the fit. The reveal draws the document and the reply against the window. All numbers are illustrative.

## How to Use

- Multiply the word count by 1.33 and type the result as a whole number. An entry within 1% is accepted.
- Choose **Fits** or **Does not fit**, remembering the 2,000-token reply. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/words-to-tokens-estimator/main.html"
        height="588px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the estimated token count of a document from its word count and decide whether the document and a 2,000-token reply fit in a given context window, correct on at least 5 of 6 items.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Token
- Tokens per word
- Context window

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Items 5 and 6 use the same document. Explain what changed, and what did not.

### Assessment

Mastery is 5 of 6 correct. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A token is a word, so the token count equals the word count.
- The context window holds only the document, and the reply does not count against it.
- A document that fits by itself also fits with the reply.
- A model with a larger window can always use all of it.

## References

1. [Chapter 3: Small Language Models](../../chapters/03-small-language-models/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia. Tokens, context windows, and how model size is measured.
3. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
