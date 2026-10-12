---
title: "Cost per Textbook Calculator"
description: "Calculate what one generated textbook costs on an owned machine and what it must sell for at a stated margin, then explore five inputs."
image: /sims/cost-per-textbook-calculator/cost-per-textbook-calculator.png
og:image: /sims/cost-per-textbook-calculator/cost-per-textbook-calculator.png
twitter:image: /sims/cost-per-textbook-calculator/cost-per-textbook-calculator.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Apply
---

# Cost per Textbook Calculator

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Cost per Textbook Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An owned machine costs a fixed amount each year whether or not it is generating. The cost of one book is therefore the yearly cost spread over the hours the machine actually generates, times the hours a book takes.

Three scenarios ask for the cost per book and the price at a 20% margin. Free exploration follows, with five sliders. All values are estimates from the cost analysis in this book, not measurements.

## How to Use

- Read what the scenario gives and the rules, then type the cost per book and the price in dollars.
- Press **Check**. An answer within one dollar on both values is correct. Each scenario allows two attempts, and the working is shown after a wrong one.
- After the third scenario, press **Start exploring** and move the sliders to see the cost per book, the price, the cost per chapter, and the books a year.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/cost-per-textbook-calculator/main.html"
        height="622px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the cost per textbook and the price at a stated margin to within 1 dollar for 3 scenarios.

### Grade Level

Professional development and adult continuing education

### Duration

15 minutes

### Prerequisites

- Utilization rate
- Whole-book time estimate
- Cost per textbook
- Service price calculation
- Margin versus markup

### Activities

1. **Work the challenges** (6 min): Do each calculation on paper before typing it. Use the second attempt only after finding the step that went wrong.
2. **Explore** (5 min): Change one slider at a time, and predict which way the result moves before looking.
3. **Discuss** (4 min): Halving the utilization doubles the cost per book, while a 10% change in the yearly cost moves it by 10%. Explain which input an owner has more control over.

### Assessment

Mastery is 3 of 3. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- A faster model always lowers the cost per book.
- The cost is set by the electricity.
- A 20% margin means a 20% markup.
- A machine's cost per book does not depend on how often it is used.

## References

1. [Chapter 22: Diagnosing Failures, Reporting, and Cost per Textbook](../../chapters/22-diagnosis-and-reporting/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Total Cost of Ownership](https://en.wikipedia.org/wiki/Total_cost_of_ownership) - Wikipedia. The costs of owning and operating an asset beyond its purchase price.
3. [Gross Margin](https://en.wikipedia.org/wiki/Gross_margin) - Wikipedia. Margin as a share of the price, and how it differs from markup.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
