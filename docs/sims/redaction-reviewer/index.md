---
title: "Redaction Reviewer"
description: "Judge ten lines of captured output as safe to publish or in need of redaction, and name the category of detail to remove."
image: /sims/redaction-reviewer/redaction-reviewer.png
og:image: /sims/redaction-reviewer/redaction-reviewer.png
twitter:image: /sims/redaction-reviewer/redaction-reviewer.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Evaluate
---

# Redaction Reviewer

<iframe src="main.html" height="554px" width="100%" scrolling="no"></iframe>

[Run the Redaction Reviewer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Before command output is published, every detail that identifies or helps reach a machine has to come out: addresses, names, hardware identifiers, account paths, and keys. Lines that identify nothing should be left alone.

This MicroSim shows ten lines. Four kinds of identifier are mixed with safe lines, including one that is already a placeholder. Every address comes from a documentation range and every name is an inert example.

## How to Use

- Read the line and choose **Safe to publish** or **Redact**.
- For **Redact**, select the category of the detail. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/redaction-reviewer/main.html"
        height="554px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will judge each of 10 lines of captured output as safe to publish or in need of redaction, and name the category of any detail to redact, with at least 9 of 10 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Device-identifying details
- IP address
- Hostname
- Tailnet name
- Hardware identifiers
- Keys and tokens
- Home directory path
- Placeholder conventions
- Documentation address ranges

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Line 10 contains an address and a host name and is still safe. Explain what makes it so.

### Assessment

Mastery is 9 of 10 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A private address is not identifying.
- A serial number or unique identifier is harmless because it grants no access.
- A line already shown in a tutorial is safe.
- Placeholders and documentation ranges still need redacting.

## References

1. [Chapter 23: Sanitizing Evaluation Artifacts and Publishing the Report](../../chapters/23-sanitizing-and-publishing/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Sanitization (Classified Information)](https://en.wikipedia.org/wiki/Sanitization_(classified_information)) - Wikipedia. Removing sensitive details from a document before it is released.
3. [IPv4 Address Blocks Reserved for Documentation](https://www.rfc-editor.org/rfc/rfc5737) - RFC 5737. The address ranges that are safe to print in examples.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
