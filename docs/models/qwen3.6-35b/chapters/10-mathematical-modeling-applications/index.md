---
title: "Chapter 10: Mathematical Modeling and Applications"
description: "A capstone chapter that brings together algebraic tools to solve real-world problems through mathematical models, linear equations, and exponential functions."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 14:35:00"
version: 1.11
---

# Chapter 10: Mathematical Modeling and Applications

## Summary

This final chapter brings together the full range of algebraic tools studied throughout the course to solve real-world problems. Students learn to translate word problems into mathematical equations, build linear models from data or verbal descriptions, model exponential growth and decay scenarios with transformations applied to parent functions, compare different model types using parent function analysis, and explore how these mathematical structures appear in scientific and engineering contexts. This chapter serves as a capstone that reinforces connections across all previously studied topics.

## Prerequisites

This chapter builds on concepts from:
- [Chapter 3: Factoring Techniques and Polynomial Division](../03-factoring-techniques-polynomial-division/index.md)
- [Chapter 4: Linear Equations and Inequalities](../04-linear-equations-inequalities/index.md)
- [Chapter 5: Linear Relationships and Coordinate Graphing](../05-linear-relationships-coordinate-graphing/index.md)
- [Chapter 7: Functions and Relations](../07-functions-relations/index.md)
- [Chapter 8: Exponential Functions and Sequences](../08-exponential-functions-sequences/index.md)

---

## What Is a Mathematical Model?

A mathematical model is an equation, inequality, or system of equations that represents a real-world situation. Models let us describe patterns in data, make predictions about future outcomes, and answer questions that would be difficult or expensive to investigate by experiment alone. Throughout this book you have encountered several kinds of models without necessarily naming them: linear functions when quantities change at a constant rate, quadratic functions when quantities accelerate, and exponential functions when quantities multiply by the same factor over equal intervals.

Mathematical models fall into two broad categories. Analytical models express relationships through explicit formulas—such as $d = rt$ for distance, rate, and time. Numerical models approximate behavior through data-driven techniques like regression or simulation. This chapter focuses on analytical models built from algebraic equations and functions.

Before building any model, you must first decide which family of functions fits the situation. The key distinction is whether the quantity changes by adding a fixed amount (linear) or multiplying by a fixed factor (exponential). This choice determines every step that follows.

!!! tip "Choosing Between Linear and Exponential"
    Ask yourself: does the situation involve a constant rate of change (the same number added each time) or a constant percent rate of change (the same percentage multiplied each time)? The answer tells you which model family to use immediately.

## Translating Word Problems into Equations

Translating word problems into mathematical equations is the first and most critical step in modeling. A word problem describes a situation in everyday language; your job is to identify the quantities involved, assign variable names to the unknowns, and write an equation that captures the relationships described.

The process breaks into four steps:

1. **Identify what you are looking for.** Underline or highlight the question at the end of the problem. This tells you which quantity to solve for.
2. **Name the unknown(s).** Assign a variable, typically $x$ or another letter that suggests the quantity (for example, $t$ for time, $w$ for width).
3. **Translate each sentence into algebra.** Look for key phrases: "sum of" means addition, "twice" means multiplication by 2, "decreased by" means subtraction, "is equal to" becomes an equals sign.
4. **Solve and check.** Use the equation-solving techniques from Chapters 4 and 7, then verify that your answer makes sense in the context of the problem.

Consider a worked example to see how these steps work together in practice.

### Worked Example: Translating and Solving a Word Problem

A cell phone plan charges a flat monthly fee of $20 plus $0.15 per text message sent. Another plan charges a flat fee of $35 with $0.05 per text. At how many text messages do the two plans cost the same amount?

To translate this into an equation, let $t$ represent the number of text messages sent in a month. The total cost of the first plan is $20 + 0.15t$, since the monthly fee adds to the per-text charge. The total cost of the second plan is $35 + 0.05t$ for the same reasoning. Setting these equal gives the equation:

$$20 + 0.15t = 35 + 0.05t$$

To solve, subtract $0.05t$ from both sides and subtract 20 from both sides:

$$0.15t - 0.05t = 35 - 20$$
$$0.10t = 15$$
$$t = 150$$

The plans cost the same at 150 text messages per month. You can verify this by substituting back: Plan A gives $20 + 0.15(150) = 20 + 22.50 = 42.50$, and Plan B gives $35 + 0.05(150) = 35 + 7.50 = 42.50$. Both match, so the answer is correct.

---

## Linear Modeling

Linear modeling applies when a quantity changes at a constant rate—the defining feature of linear relationships studied in Chapter 5. The standard form for a linear model is:

$$y = mx + b$$

where $m$ is the slope (rate of change) and $b$ is the initial value or vertical intercept. In context, $b$ represents the starting amount when the independent variable equals zero, and $m$ tells you how much the dependent variable increases for each unit increase in the independent variable.

Real-world situations that produce linear models include any scenario with a constant rate of change: a car traveling at constant speed, a savings account earning simple interest, or a printer producing pages at a steady rate. The linear equation $y = mx + b$ captures these relationships compactly and allows you to answer questions about any point on the line.

When building a linear model from a word problem, identify two key numbers: the starting value ($b$) and the constant rate of change ($m$). Once you have those, writing the equation is straightforward—you substitute each into the slope-intercept form. The resulting model then lets you predict outcomes for any input value within the model's valid range.

!!! abstract "Key Properties of Linear Models"
    Linear models have these signature characteristics: (1) their graphs are straight lines; (2) the difference between successive outputs is constant when inputs increase by equal amounts; (3) the ratio of output differences to input differences always equals the slope $m$; and (4) they grow or decline by equal increments, not by equal factors.

---

## Exponential Modeling

Exponential modeling applies when a quantity changes by a constant percent rate over equal intervals—the defining feature studied in Chapter 8. The standard form for an exponential model is:

$$y = a \cdot b^x$$

where $a$ is the initial value (the output when $x = 0$) and $b$ is the growth or decay factor. When $b > 1$, the function represents exponential growth—the quantity multiplies by the factor $b$ each time $x$ increases by 1. When $0 < b < 1$, the function represents exponential decay—the quantity is multiplied by a fraction less than 1 at each step, causing it to shrink toward zero.

Two key parameters in exponential modeling are the growth rate and the decay factor. The growth rate $r$ (expressed as a percentage) relates to the growth factor by $b = 1 + r$. For example, a 5% annual growth rate corresponds to a growth factor of $b = 1 + 0.05 = 1.05$. Conversely, the decay factor is simply $b$ itself when describing exponential decay; the decay rate is $1 - b$. A decay factor of 0.85 means the quantity retains 85% of its value each period, or equivalently, decreases by 15% per period.

Real-world situations that produce exponential models include population growth, compound interest, radioactive decay, and the spread of infectious diseases. The hallmark of exponential behavior is that equal changes in input produce equal factors in output—not equal differences. This property distinguishes it fundamentally from linear growth.

### Worked Example: Exponential Decay

A pharmaceutical drug is eliminated from the bloodstream at a rate such that 25% of the remaining amount is cleared each hour. If an initial dose of 200 mg enters the bloodstream, write an exponential model for the amount remaining after $t$ hours.

The decay factor is $b = 1 - 0.25 = 0.75$, since 75% of the drug remains after each hour. The initial value is $a = 200$. Substituting into the standard form:

$$A(t) = 200 \cdot (0.75)^t$$

After 3 hours, the remaining amount is $A(3) = 200 \cdot 0.75^3 = 200 \cdot 0.421875 \approx 84.38$ mg.

---

## Transforming Exponential Functions

Just as with other parent functions studied in Chapter 7, exponential functions can be transformed by shifting, reflecting, or stretching their graphs. These transformations let you adapt the basic model $y = b^x$ to match data that does not start at $(0, 1)$.

The general transformed form is:

$$y = a \cdot b^{(x - h)} + k$$

Each parameter controls a specific transformation of the parent exponential function:

| Parameter | Effect | Description |
|-----------|--------|-------------|
| $a$ | Vertical stretch or reflection | Scales the output vertically; if $a < 0$, the graph reflects across the x-axis |
| $b$ | Growth or decay rate | Determines how quickly the function grows ($b > 1$) or decays ($0 < b < 1$) |
| $h$ | Horizontal shift | Moves the graph left ($h < 0$) or right ($h > 0$); shifts which input produces the initial value |
| $k$ | Vertical shift (horizontal asymptote) | Raises or lowers the entire graph; sets the horizontal asymptote at $y = k$ |

The most practically important transformation is the vertical shift $k$, which establishes a nonzero horizontal asymptote. In real-world contexts, this often represents a carrying capacity (for decay toward a baseline) or an equilibrium level. For example, a cooling object approaches room temperature as its asymptote—the exponential model describes how far above that temperature it remains at each moment.

!!! info "Horizontal Asymptote in Exponential Models"
    Every exponential function of the form $y = a \cdot b^x + k$ has a horizontal asymptote at $y = k$. As $x$ becomes very large (positive or negative depending on whether $b > 1$ or $0 < b < 1$), the term $a \cdot b^x$ dominates for growth and approaches zero for decay, leaving $y$ to approach $k$. This asymptote represents a floor or ceiling that the modeled quantity never crosses.

---

## Mathematical Models in STEM

Mathematical modeling appears throughout science, technology, engineering, and mathematics (STEM). Each discipline uses models to represent systems, predict behavior, and communicate findings. Understanding how algebraic structures manifest across fields builds intuition for choosing the right model in any new context.

Below is a sampling of common modeling applications across STEM disciplines:

| Discipline | Application | Model Type | Key Equation or Form |
|------------|-------------|------------|---------------------|
| Physics | Free-fall distance near Earth's surface | Quadratic | $d = \frac{1}{2}gt^2$ |
| Biology | Population growth (unlimited resources) | Exponential | $P(t) = P_0 \cdot e^{rt}$ |
| Chemistry | Radioactive half-life decay | Exponential decay | $N(t) = N_0 \cdot (0.5)^{t/t_{1/2}}$ |
| Economics | Compound interest | Exponential | $A = P(1 + r/n)^{nt}$ |
| Engineering | Linear stress-strain relationship | Linear | $\sigma = E \cdot \epsilon$ |
| Epidemiology | Disease spread (SIR model) | System of equations | Differential equations |
| Environmental Science | Cooling of objects | Exponential decay | $T(t) = T_{env} + (T_0 - T_{env})e^{-kt}$ |

Each row shows how a real phenomenon maps to a specific algebraic structure. The same exponential form that models bacterial growth also describes drug elimination and radioactive decay—these phenomena share the underlying mechanism of proportional change, where the rate at which something changes depends on the current amount present. Recognizing this shared pattern lets you transfer solution strategies from one domain to another.

Before building any model in a new field, ask three questions: (1) Does the quantity increase by equal amounts or by equal factors? (2) Is there an initial value and a constant rate? (3) Is there a floor or ceiling that the quantity approaches but never crosses? These answers narrow your choices from "any equation" to one specific model family.

---

## Chapter 10 Interactive: Choosing the Right Model

#### Diagram: Linear vs Exponential Model Explorer

<details markdown="1">
<summary>Linear vs Exponential Model Explorer</summary>
Type: microsim
**sim-id:** linear-vs-exponential-model-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply the distinguishing features of linear and exponential growth to select the correct model type for a given word problem.

**Prerequisites:** slope, rate of change, exponential growth, exponential decay, growth factor, horizontal asymptote (all defined in the sections above).

**Evidence of Mastery:** For five described scenarios, the learner selects either "linear" or "exponential" as the correct model type and inputs the equation parameters. A selection is correct when it matches the answer column in Content. Mastery requires 4 of 5 correct on the first attempt.

**Misconceptions:** (1) Confusing constant absolute change with constant percent change. (2) Assuming all growth is linear because numbers increase over time. (3) Believing exponential graphs can cross a horizontal axis rather than their asymptote.

**Instructional Rationale:** Apply-level model selection requires the learner to use distinguishing features—equal differences for linear, equal factors for exponential—to identify the correct family. Providing both the classification and equation parameters ensures the learner can execute the translation from words to algebra, which is the core competency of this chapter.

**Content:**

Five scenarios presented one at a time, each with a short verbal description and a table of sampled data:

| # | Scenario Description | Data Pattern (x = time in months) | Correct Model | Equation Parameters |
|---|----------------------|-----------------------------------|---------------|--------------------|
| 1 | A savings account starts at $500. Each month, $50 is deposited. Fixed deposit, no interest. x: 0, 1, 2, 3 gives y: 500, 550, 600, 650. Difference between successive y-values is always 50. | Linear | m = 50, b = 500 → y = 50x + 500 |
| 2 | A bacteria culture starts at 100 cells and doubles every hour. x: 0, 1, 2, 3 gives y: 100, 200, 400, 800. Ratio between successive y-values is always 2. | Exponential | a = 100, b = 2 → y = 100 · 2^x |
| 3 | A car travels at a constant speed of 65 mph. Distance from start increases equally each hour. x: 0, 1, 2, 3 gives y: 0, 65, 130, 195. Difference between successive y-values is always 65. | Linear | m = 65, b = 0 → y = 65x |
| 4 | A car's value depreciates by 12% each year. It was purchased for $28,000. x: 0, 1, 2, 3 gives y: 28000, 24640, 21683, 19081. Each value is 0.88 of the previous. | Exponential | a = 28000, b = 0.88 → y = 28000 · (0.88)^x |
| 5 | A printer produces 40 pages per minute. Starting from zero printed pages. x: 0, 1, 2, 3 gives y: 0, 40, 80, 120. Difference is always 40. | Linear | m = 40, b = 0 → y = 40x |

For each scenario, a side-by-side graph shows sample points plotted on the same coordinate plane so the learner can compare straight-line versus curved behavior visually. The horizontal axis represents time; the vertical axis represents the modeled quantity.

**Provenance:** Scenarios are synthetic with seed 10 for reproducibility. Data values are computed from the stated model equations and rounded to the nearest whole number where applicable. The depreciation scenario uses b = 1 − 0.12 = 0.88 exactly.

**Rules:** (a) The learner selects a model type (linear or exponential) for each scenario by clicking one of two buttons. (b) After submitting a selection, the correct answer is revealed with the equation parameters and the computed data column shown explicitly. (c) A numeric score "Score: n of 5" updates after each submission. (d) The learner may proceed through all five scenarios in fixed order.

**Learner Activity:**

1. The learner reads scenario 1 and observes the data table with the plotted points below it.
2. The learner clicks either "Linear Model" or "Exponential Model" as the correct classification.
3. The learner presses Check Answer. The sim reveals whether the selection is correct, displays the equation with its parameters, and shows the data column with differences or ratios highlighted to reinforce the distinguishing feature.
4. Steps 1–3 repeat for scenarios 2 through 5 in order.
5. After all five, the final score is displayed along with a summary of which types were missed.

**Feedback:** Correct selection: "Correct: this scenario shows equal differences (or equal factors), so it is a [linear / exponential] model." Incorrect selection: "Not quite. Check whether the data has equal _differences_ between successive values (linear) or equal _factors_ (ratios). The table above highlights this pattern." After scenario 5, if the learner scored below 4 of 5, suggest reviewing Sections 3 and 6 on linear and exponential modeling.

**Starting State:** Scenario 1 is displayed with its description, data table, and two unanswered buttons: "Linear Model" and "Exponential Model." The question posed is "Which type of model best fits this situation?"

**Chapter Anchors:** Section 4 states the depreciation rate of 12% per year. Section 3 gives the cell phone plan example with $20 + 0.15t = 35 + 0.05t yielding t = 150 text messages.
</details>

---

## Chapter Summary

This chapter introduced the concept of mathematical models—equations and functions that represent real-world situations—and showed how to move from word problems to algebraic expressions through a systematic translation process. Linear modeling captures constant-rate change with the form $y = mx + b$, while exponential modeling captures constant-percent change with the form $y = a \cdot b^x$. Transforming exponential functions through vertical shifts, horizontal shifts, stretches, and reflections extends the basic parent function to match real data that does not start at $(0, 1)$. Across science and engineering, these algebraic structures appear repeatedly because many natural and social processes follow proportional-change mechanisms.

The distinguishing feature between model types is the most practical tool you now carry: equal differences in output for equal input steps signals a linear model, while equal factors (ratios) between successive outputs signals exponential behavior. Recognizing this pattern at the data stage prevents choosing the wrong equation family—a common error that cascades through every subsequent calculation.

---

## Key Takeaways

- A mathematical model translates a real-world situation into an equation that can be analyzed and used for predictions.
- Linear models use constant absolute change ($y = mx + b$); exponential models use constant percent change ($y = a \cdot b^x$).
- The growth factor $b$ relates to the growth rate $r$ by $b = 1 + r$; for decay, the decay rate is $1 - b$.
- Transformations of exponential functions include vertical stretch ($a$), horizontal shift ($h$), and vertical shift with asymptote ($k$).
- Choosing between model families depends on whether data shows equal differences or equal ratios between successive outputs.
