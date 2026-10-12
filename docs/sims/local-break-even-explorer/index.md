---
title: "Local Versus Cloud Break-Even Explorer"
description: "Calculate the volume at which a local machine costs the same as a per-book alternative, decide whether one unit can reach it, then explore."
image: /sims/local-break-even-explorer/local-break-even-explorer.png
og:image: /sims/local-break-even-explorer/local-break-even-explorer.png
twitter:image: /sims/local-break-even-explorer/local-break-even-explorer.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Local Versus Cloud Break-Even Explorer

<iframe src="main.html" height="706px" width="100%" scrolling="no"></iframe>

[Run the Local Versus Cloud Break-Even Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A local machine has a fixed yearly cost and a small cost per book. A service has a price per book and no fixed cost. The break-even volume is where the two yearly cost lines cross, and it matters only if one machine can produce that many books.

Three challenges ask for the break-even volume and whether it is reachable. Free exploration follows, with four sliders and a chart of the two cost lines. The prices are illustrative and are not a provider quote.

## How to Use

- Read what the challenge gives and the rules, then type the break-even volume in books a year.
- Choose **Reachable** or **Not reachable** and press **Check**. Each challenge allows two attempts, and the working is shown after a wrong one.
- After the third challenge, press **Start exploring** and move the sliders to watch the break-even point and the capacity line.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/local-break-even-explorer/main.html"
        height="706px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the break-even volume of a local machine against a per-book price to within 1 book for 3 challenges, and state whether one unit can reach it.

### Grade Level

Professional development and adult continuing education

### Duration

15 minutes

### Prerequisites

- Fixed costs
- Variable costs
- Break-even volume
- Utilization rate

### Activities

1. **Work the challenges** (6 min): Do each calculation on paper before typing it. Use the second attempt only after finding the step that went wrong.
2. **Explore** (5 min): Change one slider at a time, and predict which way the result moves before looking.
3. **Discuss** (4 min): In challenge 2 the arithmetic gives a break-even volume, and the answer is still "Not reachable". Explain what an owner could change to make it reachable.

### Assessment

Mastery is 3 of 3. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Local generation is always cheaper than a service.
- A break-even volume can always be reached by producing more.
- A machine that is idle costs nothing.

## References

1. [Chapter 6: Cost, Price, and Quality](../../chapters/06-cost-price-quality/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Break-even Point](https://en.wikipedia.org/wiki/Break-even_point) - Wikipedia. Fixed cost, variable cost, and the volume at which two cost lines cross.
3. [Fixed Cost](https://en.wikipedia.org/wiki/Fixed_cost) - Wikipedia. Costs that do not change with the volume produced.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
