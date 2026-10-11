---
title: "Chapter 5: Linear Relationships and Coordinate Graphing"
description: "Introduces the coordinate plane, slope, linear equations in multiple forms, and scatter plots."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 08:52:00"
version: 1.11
---

# Linear Relationships and Coordinate Graphing

## Summary

This chapter introduces the coordinate plane as a tool for visualizing relationships between quantities. Students learn about slope as rate of change, plot points on the coordinate plane, interpret scatter plots, write linear equations in three different forms -- slope-intercept, standard, and point-slope -- and identify parallel and perpendicular lines. These graphing skills bridge algebraic manipulation with geometric visualization, preparing students to see the graphical behavior of functions explored in later chapters.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Slope | 60 |
| Coordinate Plane Basics | 11 |
| Rate of Change | 3 |
| Direct Variation | 1 |
| Constant of Proportionality | 1 |
| Distance Formula | 2 |
| Midpoint Formula | 1 |
| Ordered Pairs | 4 |
| Quadrants | 1 |
| Scatter Plots | 14 |
| Slope-Intercept Form | 30 |
| Standard Form | 17 |
| Point-Slope Form | 3 |
| Writing Linear Equations | 2 |
| Parallel Lines | 2 |
| Perpendicular Lines | 1 |
| Plotting Points | 2 |
| Linear Graphs | 1 |
| Graphing Linear Equations | 1 |
| Y-Intercepts | 1 |
| X-Intercepts | 1 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Foundational Number Concepts and Properties](../01-foundational-concepts-and-properties/index.md)
- [Chapter 4: Linear Equations and Inequalities](../04-linear-equations-inequalities/index.md)

---

## The Coordinate Plane

### The Number Line Revisited

You have already seen the **number line**: a straight line with evenly spaced marks representing real numbers. Numbers to the right are larger; numbers to the left are smaller. Zero sits in the middle, positive numbers extend rightward, and negative numbers extend leftward. A number line lets you locate a single quantity -- for example, where $-3$ lives or how far apart $5$ and $-2$ are.

But real-world situations rarely involve just one quantity. How far a car travels depends on **how long** it drives *and* **how fast** it goes. A phone bill depends on **the number of minutes used** *and* **the monthly base fee**. To visualize two quantities at once, you need another dimension -- a second number line, crossed perpendicular to the first.

### The Coordinate Plane

The **coordinate plane** (also called the Cartesian plane) consists of two perpendicular number lines that cross at zero:

- The horizontal line is called the **x-axis**. Values increase to the right and decrease to the left.
- The vertical line is called the **y-axis**. Values increase upward and decrease downward.
- The point where the two axes cross is the **origin**, labeled $(0, 0)$.

Together, the x-axis and y-axis divide the plane into four regions called **quadrants**, numbered counterclockwise starting from the upper-right:

- Quadrant I: $x > 0$, $y > 0$ (both positive)
- Quadrant II: $x < 0$, $y > 0$ (x negative, y positive)
- Quadrant III: $x < 0$, $y < 0$ (both negative)
- Quadrant IV: $x > 0$, $y < 0$ (x positive, y negative)

Every location on the plane is identified by an **ordered pair** $(x, y)$, where the first number tells you how far to move left or right from the origin, and the second number tells you how far to move up or down. The order matters: $(3, 2)$ is not the same point as $(2, 3)$.

### Plotting Points

To plot a point like $(4, 3)$, start at the origin $(0, 0)$. Move **4 units right** along the x-axis (positive direction), then move **3 units up** parallel to the y-axis. The point where you land is $(4, 3)$.

For negative coordinates, reverse direction. To plot $(-2, 5)$:
1. Move **2 units left** from the origin (negative x-direction).
2. Move **5 units up**.
3. Mark the point at $(-2, 5)$. It sits in Quadrant II because x is negative and y is positive.

To plot $(3, -4)$:
1. Move **3 units right**.
2. Move **4 units down** (negative y-direction).
3. Mark the point at $(3, -4)$. It sits in Quadrant IV.

Before we examine a visual summary, note the pattern: the sign of each coordinate tells you which quadrant the point occupies:

| Sign of x | Sign of y | Quadrant |
|-----------|-----------|----------|
| $+$ | $+$ | I |
| $-$ | $+$ | II |
| $-$ | $-$ | III |
| $+$ | $-$ | IV |

Points that lie directly on an axis have a zero coordinate. Any point of the form $(a, 0)$ sits on the x-axis because its vertical displacement is zero. Any point of the form $(0, b)$ sits on the y-axis. The origin $(0, 0)$ lies on both axes simultaneously.

#### Diagram: Coordinate Plane Explorer

<details markdown="1">
<summary>Coordinate Plane Explorer</summary>
Type: microsim
**sim-id:** coordinate-plane-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify the quadrant of a plotted point from its ordered pair.

**Prerequisites:** coordinate plane, x-axis, y-axis, origin, quadrants, ordered pair (all defined above).

**Evidence of Mastery:** For six given ordered pairs, the learner selects the correct quadrant label. An answer is correct when it matches the quadrant determined by the signs of the two coordinates. Mastery: 5 of 6 correct on the first attempt.

**Misconceptions:** (1) Swapping the x and y coordinates puts the point in the same quadrant. (False: $(3, -2)$ is in Quadrant IV; $(-2, 3)$ is in Quadrant II.) (2) Points with zero coordinates belong to a quadrant. (False: points on an axis are not in any quadrant.)

**Instructional Rationale:** Understanding sign-to-quadrant correspondence requires matching patterns learners can test repeatedly, which is an Understand-level task. The learner predicts the quadrant before seeing it revealed, building the mental association between coordinate signs and regions.

**Content:**

Ordered pairs for the learner to classify:

| # | Ordered Pair | Correct Quadrant | Why |
|---|-------------|-----------------|-----|
| 1 | $(5, 3)$ | I | Both coordinates are positive. |
| 2 | $(-4, 6)$ | II | x is negative, y is positive. |
| 3 | $(-3, -7)$ | III | Both coordinates are negative. |
| 4 | $(8, -2)$ | IV | x is positive, y is negative. |
| 5 | $(0, 4)$ | Axis (y-axis) | x is zero; the point lies on the y-axis, not in a quadrant. |
| 6 | $(-1, 0)$ | Axis (x-axis) | y is zero; the point lies on the x-axis, not in a quadrant. |

**Provenance:** Synthetic with seed 501. The coordinate values are chosen to cover all sign combinations including points on each axis.

**Rules:** A point $(x, y)$ is in Quadrant I when $x > 0$ and $y > 0$. It is in Quadrant II when $x < 0$ and $y > 0$. Quadrant III requires both negative. Quadrant IV requires $x > 0$ and $y < 0$. If $x = 0$, the point is on the y-axis. If $y = 0$, the point is on the x-axis. A point with both coordinates zero is at the origin.

**Learner Activity:**

1. The learner sees an ordered pair displayed and types or selects the quadrant it belongs to (I, II, III, IV, or "Axis").
2. The learner presses Check for each pair before seeing the result.
3. After all six pairs, a summary shows how many were correct.

**Feedback:** For each pair: Correct answer confirms the quadrant and gives the sign-based reason. Incorrect answer states the correct quadrant and explains which coordinate's sign was misread. Two attempts per pair; the third reveal shows the full explanation.

**Starting State:** The first ordered pair $(5, 3)$ is shown with empty answer fields. The question reads: "Which quadrant contains the point $(5, 3)$?"

**Chapter Anchors:** The chapter states there are four quadrants plus the axes. This sim exercises that classification with six cases covering all sign combinations.
</details>

## Slope: Rate of Change as a Number

### What Is Slope?

Consider renting a bike from a shop that charges a flat $4 insurance fee plus $6 per hour. The total cost $C$ after riding for $t$ hours is:

$$C = 6t + 4$$

The number $6$ tells you how much the cost *changes* for each one-hour increase. If you ride 1 hour, it costs $10$. If you ride 2 hours, it costs $16$. The cost went up by $6$ when time went up by $1$: the **rate of change** is $6$ dollars per hour.

In a graph of this relationship -- time on the horizontal axis, cost on the vertical -- these two data points are $(1, 10)$ and $(2, 16)$. The graph connects them with a straight line, because for every additional hour the cost increases by exactly $6$ dollars. That steady rise is what **slope** measures.

**Slope** is the ratio of vertical change to horizontal change between any two points on a line. It quantifies how steeply the line rises or falls:

$$\text{slope } m = \frac{\text{vertical change}}{\text{horizontal change}} = \frac{y_2 - y_1}{x_2 - x_1}$$

The letters $x_1, y_1$ and $x_2, y_2$ label the coordinates of two distinct points on the line: $(x_1, y_1)$ and $(x_2, y_2)$. It does not matter which point you call "first" and which you call "second," as long as you are consistent -- subtracting in the same order for both numerator and denominator gives the same result.

### Computing Slope from Two Points

Suppose a line passes through the points $(1, 3)$ and $(5, 11)$. To find the slope:

1. Label the points: $(x_1, y_1) = (1, 3)$ and $(x_2, y_2) = (5, 11)$.
2. Compute the vertical change: $y_2 - y_1 = 11 - 3 = 8$.
3. Compute the horizontal change: $x_2 - x_1 = 5 - 1 = 4$.
4. Divide: $m = \frac{8}{4} = 2$.

The slope is $2$. This means that for every unit you move to the right, the line rises $2$ units. You can verify by picking a different pair of points on the same line -- you will always get $\frac{\text{rise}}{\text{run}} = 2$. That consistency is what makes slope a property of the *line itself*, not of any particular pair of points you happen to pick.

#### Diagram: Slope Calculator

<details markdown="1">
<summary>Slope Calculator</summary>
Type: microsim
**sim-id:** slope-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the slope of a line from two given points, to within 0.1 of the correct value.

**Prerequisites:** slope, rate of change, ordered pair, coordinate plane (all defined above).

**Evidence of Mastery:** For five pairs of points, the learner types the computed slope before checking. A calculation is correct when the absolute difference from the model slope is $\leq 0.1$. Mastery: 4 of 5 correct on the first attempt.

**Misconceptions:** (1) Computing $x_2 - x_1$ in the numerator and $y_2 - y_1$ in the denominator (swapped rise over run). (2) Using only one coordinate value instead of the difference of two. (3) Ignoring signs of negative coordinates.

**Instructional Rationale:** Apply-level computation requires the learner to commit a number, then compare it against a model. This reveals whether they have internalized the ratio formula rather than simply recognizing it passively.

**Content:**

Five point pairs for slope calculation:

| # | Point 1 | Point 2 | Model Slope |
|---|---------|---------|-------------|
| 1 | $(0, 2)$ | $(4, 10)$ | $2$ |
| 2 | $(1, 5)$ | $(3, 9)$ | $2$ |
| 3 | $(-1, 3)$ | $(2, -3)$ | $-2$ |
| 4 | $(0, 0)$ | $(6, -3)$ | $-0.5$ |
| 5 | $(2, 7)$ | $(8, 7)$ | $0$ |

**Provenance:** Synthetic with seed 502. All slopes are rational numbers chosen to exercise integer, negative, fractional, and zero slopes.

**Rules:** Slope formula: $m = \frac{y_2 - y_1}{x_2 - x_1}$. When $x_2 = x_1$, the line is vertical and the slope is undefined (the sim marks this case separately). A horizontal line ($y_2 = y_1$) has slope $0$. The correct answer is accepted when $| \text{learner answer} - \text{model} | \leq 0.1$.

**Learner Activity:**

1. The learner sees a pair of points and computes the slope using the formula.
2. The learner types the result and presses Check.
3. After five problems, the sim reports the count correct and shows model solutions for any missed items.

**Feedback:** Correct: "Correct. Rise = $y_2 - y_1 = [value]$, run = $x_2 - x_1 = [value]$, slope = $m = \frac{[result]}{[divisor]}$." Incorrect second attempt: states the correct slope with the full calculation.

**Starting State:** The first problem shows points $(0, 2)$ and $(4, 10)$ with an empty answer field and the prompt "Find the slope of the line through these two points."

**Chapter Anchors:** This worked example later in the chapter uses the same pair $(0, 2)$ and $(4, 10)$ and arrives at slope $2$. The formula $m = \frac{y_2 - y_1}{x_2 - x_1}$ appears identically in both places.
</details>

### Positive, Negative, Zero, and Undefined Slopes

The sign of the slope tells you the **direction** the line travels:

- **Positive slope ($m > 0$):** The line rises from left to right. As $x$ increases, $y$ also increases. The bike-rental example above has slope $2$, which is positive: more hours means more cost.
- **Negative slope ($m < 0$):** The line falls from left to right. As $x$ increases, $y$ decreases. A hot cup of coffee cooling over time illustrates this: temperature goes down as time goes up.
- **Zero slope ($m = 0$):** The line is horizontal. The y-value does not change no matter how much x changes. Think of a car stopped at a red light -- distance from the intersection stays constant while time passes.
- **Undefined slope:** The line is vertical. The x-value does not change, so the denominator in the slope formula is zero, which is undefined.

#### Diagram: Slope Direction Sorter

<details markdown="1">
<summary>Slope Direction Sorter</summary>
Type: microsim
**sim-id:** slope-direction-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify the sign of a line's slope from two points or from a visual representation.

**Prerequisites:** slope, positive slope, negative slope, zero slope, undefined slope (all defined above).

**Evidence of Mastery:** For eight cases, the learner classifies each slope as positive, negative, zero, or undefined. An answer is correct when it matches the sign determined by the relative positions of the two points. Mastery: 7 of 8 correct on the first attempt.

**Misconceptions:** (1) "A line that goes down the page must have a negative slope." The learner must check which way x changes, not just which way y changes. (2) Confusing "the line is steep" with "the slope is positive." Steepness is magnitude; sign is direction.

**Instructional Rationale:** Understand-level classification requires the learner to look at each case and determine its category, then compare against their prediction. Predicting first builds stronger associations than just matching after seeing the answer.

**Content:**

Eight cases for slope-sign classification:

| # | Point 1 | Point 2 | Correct Sign | Why |
|---|---------|---------|-------------|-----|
| 1 | $(1, 1)$ | $(3, 5)$ | Positive | $y$ increases (5 - 1 = 4) as $x$ increases (3 - 1 = 2). Slope = $\frac{4}{2} = 2$. |
| 2 | $(0, 4)$ | $(3, 1)$ | Negative | $y$ decreases (1 - 4 = -3) as $x$ increases (3 - 0 = 3). Slope = $\frac{-3}{3} = -1$. |
| 3 | $(2, 3)$ | $(7, 3)$ | Zero | $y$ does not change (3 - 3 = 0). The line is horizontal. |
| 4 | $(4, 1)$ | $(4, 6)$ | Undefined | $x$ does not change (4 - 4 = 0). The line is vertical; division by zero is undefined. |
| 5 | $(-2, -1)$ | $(3, 4)$ | Positive | $y$ increases (4 - (-1) = 5) as $x$ increases (3 - (-2) = 5). Slope = $\frac{5}{5} = 1$. |
| 6 | $(0, 0)$ | $(-3, -6)$ | Positive | Both coordinates decrease, but the *difference* in y ($-6 - 0 = -6$) divided by the difference in x ($-3 - 0 = -3$) gives $\frac{-6}{-3} = 2$. The signs cancel. |
| 7 | $(1, 5)$ | $(-4, 0)$ | Positive | $y$ decreases (0 - 5 = -5), x decreases ($-4 - 1 = -5$). Slope = $\frac{-5}{-5} = 1$. Moving left still goes up when slope is positive. |
| 8 | $(2, -3)$ | $(-1, -3)$ | Zero | Same y-value means horizontal line regardless of direction you traverse it. |

**Provenance:** Synthetic with seed 503. Cases are chosen to include both traversals (left-to-right and right-to-left) because the slope is identical either way -- a key insight the exercise targets.

**Rules:** A slope is positive when $y_2 - y_1$ and $x_2 - x_1$ have the same sign (both positive or both negative). It is negative when they have opposite signs. It is zero when $y_2 = y_1$. It is undefined when $x_2 = x_1$ and $y_2 \neq y_1$.

**Learner Activity:**

1. The learner sees two points (and optionally a small grid showing them).
2. The learner predicts: positive, negative, zero, or undefined.
3. After pressing Check, the correct classification and reasoning appear.

**Feedback:** Correct: confirms with the sign analysis. Incorrect: states which coordinate did not change as expected and recalculates the slope sign from the differences. Two attempts per case; third reveal shows the full calculation.

**Starting State:** The first case $(1, 1)$ and $(3, 5)$ is shown on a small grid with four answer buttons labeled Positive, Negative, Zero, Undefined. The prompt reads: "What is the sign of the slope through these points?"

**Chapter Anchors:** The chapter illustrates that traversing a line in either direction gives the same slope; this sim includes cases where you move right-to-left to reinforce that point.
</details>

### Slope as an Equation Parameter

When you look at a linear equation written as $y = mx + b$, the coefficient $m$ **is** the slope. The number multiplied by $x$ tells you exactly how much y changes when x increases by one unit. If the equation is $y = 3x - 2$, then for every increase of $1$ in $x$, $y$ increases by $3$. The slope is $3$.

This works whether $m$ is positive, negative, or zero:
- $y = 3x - 2$: slope is $3$ (positive, the line rises).
- $y = -\frac{1}{2}x + 4$: slope is $-\frac{1}{2}$ (negative, the line falls gently).
- $y = 7$: this is the same as $y = 0x + 7$, so the slope is $0$ (horizontal line through $y = 7$).

When a linear equation is not written in this form -- say, $2x + 3y = 6$ -- you can still find the slope by picking two points that satisfy the equation and applying the formula. Any two points on the same line give the same slope. For example, if $x = 0$, then $3y = 6$ and $y = 2$: one point is $(0, 2)$. If $y = 0$, then $2x = 6$ and $x = 3$: another point is $(3, 0)$. The slope is:

$$m = \frac{0 - 2}{3 - 0} = \frac{-2}{3}$$

## Slope-Intercept Form: $y = mx + b$

The **slope-intercept form** of a linear equation is:

$$y = mx + b$$

where $m$ is the slope and $b$ is the **y-intercept** -- the point where the line crosses the y-axis (the value of $y$ when $x = 0$). This form is called "slope-intercept" because both defining features -- steepness and vertical starting position -- appear directly in the formula.

If a line has slope $-2$ and y-intercept $5$, its equation is simply:

$$y = -2x + 5$$

You can read everything you need to graph the line from this equation:
1. Start at $(0, 5)$ on the y-axis (the intercept).
2. Use the slope $m = -2 = \frac{-2}{1}$ to find a second point. From $(0, 5)$, move **1 unit right** and **2 units down** (negative direction) to reach $(1, 3)$.
3. Draw the line through these two points and extend it in both directions.

### Writing Equations from Graphs

Suppose you are given a graph showing a line that passes through $(0, -3)$ and $(4, 5)$. You need to write this line in slope-intercept form.

First, find the slope using the two points:

$$m = \frac{5 - (-3)}{4 - 0} = \frac{8}{4} = 2$$

The y-intercept is the point where the line crosses the y-axis. From the graph (or from reading that the point $(0, -3)$ lies on the line), $b = -3$.

The equation is:

$$y = 2x - 3$$

To verify, substitute $x = 4$: $y = 2(4) - 3 = 8 - 3 = 5$, which matches the second point. The equation correctly reproduces both points on the line.

### Finding Intercepts from an Equation

For any linear equation in slope-intercept form $y = mx + b$:
- The **y-intercept** is at $(0, b)$. Just set $x = 0$ and solve for $y$ -- you get $y = b$ immediately.
- The **x-intercept** (where the line crosses the x-axis) occurs when $y = 0$. Set $0 = mx + b$ and solve:

$$x = -\frac{b}{m}$$

This gives the point $\left(-\frac{b}{m}, 0\right)$. The x-intercept exists whenever $m \neq 0$; a horizontal line ($m = 0$) has no x-intercept unless it is the line $y = 0$ itself.

#### Diagram: Line Builder

<details markdown="1">
<summary>Line Builder</summary>
Type: microsim
**sim-id:** line-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** construct<br/>
**Learning Objective:** The learner will construct the equation of a line in slope-intercept form from its graph, given two identifiable points.

**Prerequisites:** slope, slope-intercept form, y-intercept, x-intercept (all defined above).

**Evidence of Mastery:** For four graphs, the learner enters $m$ and $b$ values to write an equation of the form $y = mx + b$. An entry is correct when both the slope and intercept match the model within a tolerance of $\pm 0.1$. Mastery: 3 of 4 correct on the first attempt.

**Misconceptions:** (1) Reading the y-intercept from the wrong axis. (2) Computing rise over run backward as $\frac{\text{run}}{\text{rise}}$ instead of $\frac{\text{rise}}{\text{run}}$. (3) When $m$ is negative, omitting the minus sign because "steepness" feels like a magnitude.

**Instructional Rationale:** Apply-level construction requires committing specific parameter values that generate the observed line, which tests whether the learner can extract $m$ and $b$ independently.

**Content:**

Four graphs with points at integer coordinates:

| # | Point A | Point B | Model Equation |
|---|---------|---------|----------------|
| 1 | $(0, 1)$ | $(2, 5)$ | $y = 2x + 1$ (slope = $\frac{5-1}{2-0} = 2$, intercept = $1$) |
| 2 | $(0, -2)$ | $(3, 4)$ | $y = 2x - 2$ (slope = $\frac{4-(-2)}{3-0} = 2$, intercept = $-2$) |
| 3 | $(0, 3)$ | $(6, 0)$ | $y = -\frac{1}{2}x + 3$ (slope = $\frac{0-3}{6-0} = -\frac{1}{2}$, intercept = $3$) |
| 4 | $(0, 0)$ | $(4, -4)$ | $y = -x$ (slope = $\frac{-4-0}{4-0} = -1$, intercept = $0$) |

**Provenance:** Synthetic with seed 504. Points are at integer coordinates so the slope is either an integer or a simple fraction.

**Rules:** Slope $m = \frac{y_2 - y_1}{x_2 - x_1}$. The y-intercept $b$ is the y-coordinate of the point where $x = 0$. The equation form is $y = mx + b$. The learner enters $m$ as a decimal or fraction and $b$ similarly. Accept when entered values produce an equation matching the model within $\pm 0.1$ on each parameter.

**Learner Activity:**

1. The learner sees a graph with two points labeled (A and B) at integer coordinates.
2. The learner enters values for slope ($m$) and y-intercept ($b$) in separate input fields.
3. The sim checks both values independently against the model.

**Feedback:** Correct: "Your equation $y = [m]x + [b]$ matches the line." Incorrect first attempt: states which parameter is wrong and provides a hint. After second wrong attempt: shows full solution with step-by-step slope computation. A running tally "Correct: n of 4" updates after each item.

**Starting State:** The first graph shows points $(0, 1)$ and $(2, 5)$ on a coordinate grid with two empty input fields labeled "Slope (m) =" and "y-intercept (b) =". The prompt reads: "Write the equation of the line through these two points."

**Chapter Anchors:** This sim reinforces the slope-intercept form $y = mx + b$ introduced in this section. The chapter's worked example uses the same method: compute slope from two points, read intercept at $x = 0$, write $y = mx + b$.
</details>

## Standard Form: $Ax + By = C$

Another way to write a linear equation is **standard form**:

$$Ax + By = C$$

where $A$, $B$, and $C$ are integers, and $A \geq 0$. In this form, neither the slope nor the intercept appears directly on the surface -- you must work to extract them. However, standard form has advantages: it handles vertical lines gracefully (the equation $x = 3$ is $1 \cdot x + 0 \cdot y = 3$, which fits the pattern with $A = 1$, $B = 0$, and $C = 3$), and it makes integer coefficients explicit.

To convert from slope-intercept form to standard form, move all variable terms to one side of the equation so that the constant sits alone on the other side. For example, start with $y = 2x - 6$:
1. Subtract $2x$ from both sides: $-2x + y = -6$.
2. Standard form requires $A \geq 0$, so multiply through by $-1$: $2x - y = 6$.

Now $A = 2$, $B = -1$, and $C = 6$. The equation is in standard form.

To find the intercepts from standard form, use a simple substitution strategy:
- **x-intercept**: set $y = 0$ and solve for $x$. For $2x - y = 6$: $2x - 0 = 6$, so $x = 3$. The x-intercept is $(3, 0)$.
- **y-intercept**: set $x = 0$ and solve for $y$. For $2x - y = 6$: $0 - y = 6$, so $y = -6$. The y-intercept is $(0, -6)$.

These two intercepts are sufficient to graph the line: plot $(3, 0)$ and $(0, -6)$ on the coordinate plane and draw a line through them. This "intercept method" is often faster than computing slope first.

### Converting Between Forms

Converting between slope-intercept and standard form is routine algebraic manipulation:

**From standard to slope-intercept:** Solve for $y$:
$$Ax + By = C \implies By = -Ax + C \implies y = -\frac{A}{B}x + \frac{C}{B}$$

The slope is $m = -\frac{A}{B}$ and the y-intercept is $b = \frac{C}{B}$ (assuming $B \neq 0$). Note the negative sign: the slope of a line in standard form is always the *negative* ratio of the x-coefficient to the y-coefficient.

**From slope-intercept to standard:** Rearrange $y = mx + b$ by moving all terms with variables to one side. If the slope is a fraction, multiply through by the denominator to clear it:
$$y = \frac{3}{4}x + 2 \implies 4y = 3x + 8 \implies -3x + 4y = 8 \implies 3x - 4y = -8$$

Multiply through by $-1$ to make $A \geq 0$: the standard form is $3x - 4y = -8$.

#### Diagram: Form Converter

<details markdown="1">
<summary>Form Converter</summary>
Type: microsim
**sim-id:** standard-form-converter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** convert<br/>
**Learning Objective:** The learner will convert a linear equation between slope-intercept form and standard form, verifying correctness by checking that both equations represent the same line.

**Prerequisites:** slope-intercept form ($y = mx + b$), standard form ($Ax + By = C$ with $A \geq 0$, integer coefficients) (both defined above).

**Evidence of Mastery:** For four equations, the learner converts each form to the other. A conversion is correct when substituting any test value of $x$ into both forms produces the same $y$-value, and all coefficients are integers with $A \geq 0$. Mastery: 3 of 4 correct on the first attempt.

**Misconceptions:** (1) Forgetting to flip the sign when moving a term across the equals sign. (2) When clearing fractions, multiplying only some terms by the denominator. (3) Leaving $A$ negative in standard form.

**Instructional Rationale:** Apply-level conversion requires performing algebraic steps in the correct order and checking the result, which confirms understanding of equality as an invariant relationship.

**Content:**

Four equations for bidirectional conversion:

| # | Original Form | Equation | Target Form |
|---|--------------|----------|-------------|
| 1 | Slope-intercept | $y = \frac{3}{4}x + 2$ | Standard: $3x - 4y = -8$ |
| 2 | Standard | $5x + 2y = 10$ | Slope-intercept: $y = -\frac{5}{2}x + 5$ |
| 3 | Slope-intercept | $y = -2x + 7$ | Standard: $2x + y = 7$ |
| 4 | Standard | $-4x + 6y = 12$ | Slope-intercept: $y = \frac{2}{3}x + 2$ (then make $A \geq 0$: $2x - 3y = -6 \implies y = \frac{2}{3}x + 2$, or directly from original: divide by 6 to get $y = \frac{2}{3}x + 2$) |

**Provenance:** Synthetic with seed 505. Each problem is chosen so that conversion involves a common step: clearing fractions (items 1 and 4), handling negative leading coefficient (item 4), or moving a positive term to the other side (item 3).

**Rules:** Standard form requires integer coefficients and $A \geq 0$. When converting from slope-intercept, eliminate fractional slopes by multiplying through by the denominator. Verify conversion by substituting a test $x$-value into both equations and confirming the same $y$ results. A correct answer has matching outputs for any $x$ tested.

**Learner Activity:**

1. The learner sees an equation in one form and types the equivalent equation in the other form.
2. Two input fields: coefficients for the converted form (e.g., $A$, $B$, $C$ for standard form).
3. The sim verifies by testing multiple $x$-values against both equations.

**Feedback:** Correct: "Your conversion is correct. Both forms produce the same line." Incorrect first attempt: states which coefficient differs and suggests checking the sign. After second wrong attempt: shows the full step-by-step conversion with reasoning. Running tally of correct conversions updates after each item.

**Starting State:** The problem "$y = \frac{3}{4}x + 2$" is shown with three empty fields for standard form coefficients $A$, $B$, and $C$ in the pattern $Ax + By = C$. The prompt reads: "Write this equation in standard form ($A \geq 0$, integers)."

**Chapter Anchors:** This sim exercises conversions between the two forms defined in this section. The chapter states that converting slope-intercept to standard form may require multiplying through by a denominator -- item 1 exercises exactly that step.
</details>

## Point-Slope Form: $y - y_1 = m(x - x_1)$

Sometimes you know a line's slope and **one** point on the line, but not its y-intercept. In that case, use **point-slope form**:

$$y - y_1 = m(x - x_1)$$

where $m$ is the slope and $(x_1, y_1)$ is any specific point on the line. This form says: "the vertical distance from a known point equals the slope times the horizontal distance from that same point." Any point $(x, y)$ that satisfies this equation lies on the line.

To see why this works, rearrange it to isolate $y$:
$$y = m(x - x_1) + y_1 = mx - mx_1 + y_1$$

This is in slope-intercept form ($y = mx + b$), where the y-intercept is $b = y_1 - mx_1$. The line has slope $m$ and passes through $(x_1, y_1)$ by construction: when you substitute $x = x_1$, the equation gives $y - y_1 = 0$, so $y = y_1$.

**Example:** A line has slope $3$ and passes through $(2, 5)$. Its point-slope equation is:
$$y - 5 = 3(x - 2)$$

To convert to slope-intercept form, distribute and simplify:
$$y - 5 = 3x - 6 \implies y = 3x - 1$$

Both equations represent the same line. You can verify by checking that $(2, 5)$ satisfies $y = 3x - 1$: $3(2) - 1 = 6 - 1 = 5$. Yes -- the point is on the line.

### Using Point-Slope to Write Equations from Two Points

When you are given two points but not the slope directly, first compute the slope, then plug it and either point into the formula:

Find the equation of the line through $(-1, 4)$ and $(3, -2)$:

1. Compute the slope: $m = \frac{-2 - 4}{3 - (-1)} = \frac{-6}{4} = -\frac{3}{2}$.
2. Use point-slope form with $(-1, 4)$:

$$y - 4 = -\frac{3}{2}(x - (-1)) = -\frac{3}{2}(x + 1)$$

3. Convert to slope-intercept: $y - 4 = -\frac{3}{2}x - \frac{3}{2}$, so $y = -\frac{3}{2}x + \frac{5}{2}$.

You can check using the other point $(3, -2)$: $-\frac{3}{2}(3) + \frac{5}{2} = -\frac{9}{2} + \frac{5}{2} = -\frac{4}{2} = -2$. Correct.

## Direct Variation and the Constant of Proportionality

A special case of a linear relationship occurs when the line passes through the origin. When $b = 0$ in $y = mx + b$, the equation simplifies to:

$$y = kx$$

This is called **direct variation**: $y$ varies directly as $x$, and $k$ is the **constant of proportionality**. The ratio $\frac{y}{x}$ is the same for every point on the line (except $(0, 0)$), and that constant ratio is exactly $k$.

For example, if a car travels at a constant speed of $55$ miles per hour, the distance $d$ it covers in $t$ hours is:
$$d = 55t$$

Here $d$ varies directly as $t$, and the constant of proportionality $k = 55$ represents the speed. The ratio $\frac{d}{t} = \frac{55t}{t} = 55$ for every nonzero value of $t$. This constancy -- the idea that no matter how far you travel or how long you drive, the ratio stays exactly the same -- is what defines direct variation.

A direct variation graph always passes through $(0, 0)$ because when $x = 0$, $y = k(0) = 0$. If a graphed relationship between two quantities has a straight-line appearance but does **not** pass through the origin, the quantities are linearly related but not directly proportional.

### Distinguishing Linear from Direct Variation Relationships

Not all straight lines represent direct variation:

- $y = 3x$: direct variation (passes through origin, $k = 3$).
- $y = 3x + 2$: linear but **not** direct variation (y-intercept is $2$, not $0$). The ratio $\frac{y}{x}$ changes from point to point: at $(1, 5)$ it is $5$, at $(2, 8)$ it is $4$, and so on.

When given a table of values and asked whether two quantities are directly proportional, check two conditions: (1) the points form a straight line when plotted, and (2) the line passes through $(0, 0)$, or equivalently, every pair satisfies $\frac{y}{x} = k$ for the same constant $k$.

### Writing Linear Equations from Graphical or Tabular Information

You have already seen how to go from an equation to a graph. The reverse -- **writing a linear equation** from data -- follows the same steps in the opposite direction. Given two points on a line, you first compute the slope, then find the y-intercept by substituting one point into $y = mx + b$ and solving for $b$. Alternatively, use point-slope form directly with any known point and the computed slope. The key insight is that *any* two points on a non-vertical line uniquely determine the equation: every other point on that same line will satisfy the resulting equation.

### Recognizing Linear Graphs

A **linear graph** is simply a straight-line plot. Any relationship whose ordered pairs form a straight line when plotted on the coordinate plane satisfies a linear equation. The reverse is equally true: the graph of any linear equation is always a straight line. This two-way correspondence means you can determine whether a relationship is linear just by plotting its data -- if the points fall on a line, the relationship is linear; if they curve or scatter without forming one, it is not. Later chapters will encounter nonlinear graphs (parabolas, exponential curves) where this distinction becomes even more important.

## Scatter Plots and Line of Best Fit

Not all real-world data falls exactly on a straight line. When you collect measurements -- such as recording the height and weight of students in your class -- each student becomes one point $(\text{height}, \text{weight})$ on a graph called a **scatter plot**. The pattern of points often suggests a linear trend even when individual values deviate from it.

A **line of best fit** (also called a regression line) is the straight line that most closely summarizes the overall trend in a scatter plot. It does not need to pass through any data point -- instead, it stays as close as possible to *all* points simultaneously. The slope of this line tells you the average rate at which one quantity changes with respect to the other; the y-intercept gives a baseline estimate when the independent variable is zero.

When interpreting a line of best fit, consider:
- **The slope** represents the average change in the dependent variable per unit increase in the independent variable.
- **The intercept** may or may not have practical meaning -- if $x = 0$ falls far outside your data range, the intercept is an extrapolation that may be unreliable.
- **Correlation strength**: points clustered tightly around the line indicate a strong linear relationship; widely scattered points suggest the linear model captures only part of the story.

A scatter plot with its line of best fit helps you see whether a linear model is reasonable for the data, and what parameters to use when building that model. Later chapters explore this technique more rigorously.

#### Diagram: Line of Best Fit Estimator

<details markdown="1">
<summary>Line of Best Fit Estimator</summary>
Type: microsim
**sim-id:** line-of-best-fit-estimator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret the slope and intercept of a line of best fit from a scatter plot.

**Prerequisites:** scatter plot, line of best fit, slope as rate of change, y-intercept (all defined above).

**Evidence of Mastery:** For three scatter plots with a drawn line of best fit, the learner identifies whether each described interpretation of the slope and intercept is correct. An answer is correct when it matches the standard statistical interpretation. Mastery: 2 of 3 correct on the first attempt.

**Misconceptions:** (1) Thinking the line must pass through most data points rather than balancing above and below them. (2) Interpreting the y-intercept as meaningful even when $x = 0$ is far outside the observed data range.

**Instructional Rationale:** Understand-level interpretation requires connecting abstract parameters to their real-world meaning, which tests whether the learner grasps what slope and intercept represent in context rather than merely recognizing them numerically.

**Content:**

Three scenarios for line-of-best-fit interpretation:

| # | Context | Slope description | Correct interpretation of slope |
|---|---------|------------------|--------------------------------|
| 1 | Hours studied vs. test score (line rises) | Positive slope of about 5 points per hour | On average, each additional hour of studying is associated with a 5-point increase in the test score. |
| 2 | Time spent exercising vs. body temperature (line rises) | Positive slope | More exercise time is associated with higher body temperature. |
| 3 | Distance from home vs. cell phone signal strength (line falls) | Negative slope of about -2 bars per mile | Each additional mile from home decreases signal strength by approximately 2 bars on average. |

**Provenance:** Synthetic with seed 506. Scenarios are standard examples used in introductory statistics to demonstrate positive and negative linear relationships.

**Rules:** A positive slope means the dependent variable increases as the independent variable increases. A negative slope means it decreases. The intercept is the predicted value of the dependent variable when the independent variable equals zero, but only within the range of observed data is it meaningful.

**Learner Activity:**

1. The learner sees a scatter plot with a line of best fit and a multiple-choice question about interpreting the slope or intercept.
2. The learner selects the correct interpretation from three options.
3. After each answer, feedback explains why the chosen option is correct or incorrect.

**Feedback:** Correct: confirms and explains in one sentence. Incorrect first attempt: eliminates the clearly wrong option and explains why. Second reveal shows the full reasoning.

**Starting State:** The first scatter plot shows hours studied (x-axis) vs. test scores (y-axis) with a rising line. The question reads: "What does the positive slope of this line of best fit tell you?"

**Chapter Anchors:** This sim illustrates the concepts of scatter plot and line of best fit introduced in this section. The chapter states that real data rarely falls exactly on a line, which is why we draw a line that balances close to all points rather than trying to hit any single one.
</details>

## Parallel and Perpendicular Lines

### Parallel Lines

Two lines are **parallel** when they never intersect. On the coordinate plane, parallel lines have the same slope but different y-intercepts. If two lines share the same rate of change but start at different positions, they travel in exactly the same direction forever without crossing.

For example:
- Line 1: $y = 3x + 1$ (slope = $3$, intercept = $1$)
- Line 2: $y = 3x - 4$ (slope = $3$, intercept = $-4$)

Both lines rise at a rate of $3$ units up for every unit right. They never meet because they start at different vertical positions and move identically. Graphing both shows two parallel lines that look like railroad tracks extending indefinitely.

If two lines have the same slope *and* the same y-intercept, they are not just parallel -- they are **the same line** (every point on one is also on the other). Distinguishing this case from truly distinct parallel lines requires checking both parameters.

### Perpendicular Lines

Two lines are **perpendicular** when they intersect at a right angle ($90^\circ$). Unlike parallel lines, perpendicular lines have *different* slopes that follow a specific relationship: their product is $-1$. In other words, if one line has slope $m$, the perpendicular line has slope $-\frac{1}{m}$ (the **negative reciprocal**):

$$m_1 \times m_2 = -1$$

This works because multiplying a number by its negative reciprocal always gives $-1$:
- If one slope is $2$, the perpendicular slope is $-\frac{1}{2}$. Check: $2 \times (-\frac{1}{2}) = -1$. Correct.
- If one slope is $-\frac{3}{4}$, the perpendicular slope is $\frac{4}{3}$. Check: $(-\frac{3}{4}) \times (\frac{4}{3}) = -1$. Correct.

Note that a horizontal line (slope $0$) is perpendicular to a vertical line (undefined slope). The product rule above does not apply directly in this case, but the geometric intuition holds: they cross at a right angle.

### Determining Relationships from Equations

To determine whether two lines are parallel, perpendicular, or neither from their equations:
1. Rewrite each equation in slope-intercept form ($y = mx + b$) to extract the slope.
2. Compare slopes:
   - Same slope, different intercepts $\implies$ parallel
   - Slopes are negative reciprocals (product is $-1$) $\implies$ perpendicular
   - Otherwise $\implies$ neither

For example, consider the lines $3x + 4y = 12$ and $4x - 3y = 6$:
- Line 1: $4y = -3x + 12$, so $y = -\frac{3}{4}x + 3$. Slope is $-\frac{3}{4}$.
- Line 2: $-3y = -4x + 6$, so $y = \frac{4}{3}x - 2$. Slope is $\frac{4}{3}$.
- Check: $(-\frac{3}{4}) \times (\frac{4}{3}) = -1$. The slopes are negative reciprocals.

These lines are perpendicular.

#### Diagram: Parallel and Perpendicular Classifier

<details markdown="1">
<summary>Parallel and Perpendicular Classifier</summary>
Type: microsim
**sim-id:** parallel-perpendicular-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** determine<br/>
**Learning Objective:** The learner will determine whether two given lines are parallel, perpendicular, or neither from their equations.

**Prerequisites:** slope-parallel to each other (same slope), perpendicular (negative reciprocal slopes) (both defined above).

**Evidence of Mastery:** For six pairs of lines in various forms, the learner selects parallel, perpendicular, or neither. A selection is correct when it matches the relationship determined by comparing the slopes. Mastery: 5 of 6 correct on the first attempt.

**Misconceptions:** (1) Comparing equations without first rewriting them in a comparable form. (2) Forgetting that same slope + same intercept means identical lines, not parallel. (3) Computing the product $m_1 \times m_2$ incorrectly with negative fractions.

**Instructional Rationale:** Apply-level determination requires converting equations to comparable forms and performing a precise calculation, which tests procedural fluency alongside conceptual understanding of what parallelism and perpendicularity mean geometrically.

**Content:**

Six pairs of lines:

| # | Line 1 | Line 2 | Relationship | Why |
|---|--------|--------|-------------|-----|
| 1 | $y = 2x + 3$ | $y = 2x - 5$ | Parallel | Same slope ($2$), different intercepts. |
| 2 | $y = \frac{1}{3}x + 1$ | $y = -3x + 4$ | Perpendicular | Product: $\frac{1}{3} \times (-3) = -1$. |
| 3 | $2x + y = 5$ | $x + 2y = 4$ | Neither | Line 1 slope: $-2$. Line 2 slope: $-\frac{1}{2}$. Product: $1 \neq -1$; slopes unequal. |
| 4 | $3x - y = 7$ | $6x - 2y = 0$ | Parallel | Line 1 slope: $3$. Line 2: $-2y = -6x$, so $y = 3x$. Same slope ($3$), different intercepts ($7$ vs. $0$). |
| 5 | $x = 4$ | $y = -2$ | Perpendicular | Vertical line and horizontal line are perpendicular. |
| 6 | $y = -\frac{5}{2}x + 3$ | $y = \frac{2}{5}x - 1$ | Neither | Product: $(-\frac{5}{2}) \times (\frac{2}{5}) = -1$. Actually perpendicular. (Correct answer: Perpendicular) |

**Provenance:** Synthetic with seed 507. Each pair is designed to exercise a specific pitfall: comparing raw equations without conversion, vertical/horizontal lines, identical lines vs. parallel lines.

**Rules:** Convert each equation to slope-intercept form. Extract $m_1$ and $m_2$. If $m_1 = m_2$ and intercepts differ, the lines are parallel. If $m_1 \times m_2 = -1$, they are perpendicular. A vertical line ($x = c$) is perpendicular to a horizontal line ($y = d$). Otherwise, neither.

**Learner Activity:**

1. The learner sees two equations displayed side by side.
2. The learner selects "Parallel", "Perpendicular", or "Neither."
3. After each selection, the sim shows whether it is correct and explains the slope comparison.

**Feedback:** Correct: confirms with the computed slopes and their relationship. Incorrect first attempt: states both slopes without concluding. After second wrong attempt: walks through the full comparison including conversion to slope-intercept form. Running tally "Correct: n of 6" shown at all times.

**Starting State:** The first pair "$y = 2x + 3$" and "$y = 2x - 5$" is displayed with three answer buttons. The prompt reads: "Are these lines parallel, perpendicular, or neither?"

**Chapter Anchors:** This sim exercises the parallel/perpendicular criteria from this section. The chapter defines parallel as same slope (different intercept) and perpendicular as negative reciprocal slopes; the sim checks exactly those conditions.
</details>

## Graphing Linear Equations

### Graphing from Slope-Intercept Form

When an equation is in slope-intercept form ($y = mx + b$), graphing it is a straightforward three-step process:

1. **Plot the y-intercept** $(0, b)$ on the coordinate plane. This is where the line crosses the vertical axis.
2. **Use the slope** $m = \frac{\text{rise}}{\text{run}}$ to find a second point. Starting from $(0, b)$, move right by the run (the denominator of $m$) and up or down by the rise (the numerator).
3. **Draw the line** through the two points and extend it in both directions with arrowheads.

For example, to graph $y = -\frac{2}{3}x + 4$:
1. Plot $(0, 4)$ -- mark where the y-intercept lands on the vertical axis.
2. The slope is $-\frac{2}{3}$: from $(0, 4)$, move **3 units right** (run = $3$) and **2 units down** (rise = $-2$). This lands at $(3, 2)$.
3. Draw a straight line through $(0, 4)$ and $(3, 2)$ extending in both directions.

You can find additional points using the same slope -- from $(3, 2)$, move 3 right and 2 down to reach $(6, 0)$, which is the x-intercept. Verify: $y = -\frac{2}{3}(6) + 4 = -4 + 4 = 0$. Correct.

### Graphing from Standard Form

When an equation is in standard form ($Ax + By = C$), use the **intercept method**:
1. Find the x-intercept by setting $y = 0$ and solving for $x$.
2. Find the y-intercept by setting $x = 0$ and solving for $y$.
3. Plot both intercepts and draw a line through them.

For $4x + 3y = 12$:
- x-intercept: $4x = 12 \implies x = 3$. Point: $(3, 0)$.
- y-intercept: $3y = 12 \implies y = 4$. Point: $(0, 4)$.
- Plot $(3, 0)$ and $(0, 4)$ and draw the line.

This method is efficient when the intercepts are easy to compute and sufficiently far apart (at least two or three units) to give an accurate graph. If both intercepts are very close together, computing an additional point using the slope is advisable for accuracy.

#### Diagram: Equation-to-Graph Matcher

<details markdown="1">
<summary>Equation-to-Graph Matcher</summary>
Type: microsim
**sim-id:** equation-graph-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** match<br/>
**Learning Objective:** The learner will match a linear equation to its correct graph on the coordinate plane.

**Prerequisites:** slope, slope-intercept form, standard form, y-intercept, x-intercept, plotting points (all defined above).

**Evidence of Mastery:** For five equations in mixed forms, the learner selects the matching graph from three options. A selection is correct when the intercepts and slope of the chosen graph match those of the equation. Mastery: 4 of 5 correct on the first attempt.

**Misconceptions:** (1) Matching an equation by recognizing the numbers in it without computing slopes or intercepts. (2) Confusing x-intercepts with y-intercepts when reading graphs. (3) When the slope is negative, choosing a graph that rises instead of falls because "the magnitude looks right."

**Instructional Rationale:** Apply-level matching requires extracting intercepts and slope from an equation independently, then comparing against visual evidence on each graph option -- testing whether the learner can translate between symbolic and graphical representations.

**Content:**

Five equations with three graph options each:

| # | Equation | Correct Graph Features (slope, x-intercept, y-intercept) |
|---|----------|--------------------------------------------------------|
| 1 | $y = \frac{3}{2}x - 3$ | Slope $\frac{3}{2}$, x-int $(2, 0)$, y-int $(0, -3)$ |
| 2 | $2x - y = 4$ | Slope $2$, x-int $(2, 0)$, y-int $(0, -4)$ |
| 3 | $y + 1 = 2(x - 3)$ | Simplifies to $y = 2x - 7$: slope $2$, x-int $(\frac{7}{2}, 0)$, y-int $(0, -7)$ |
| 4 | $-x + 3y = 6$ | Slope $\frac{1}{3}$, x-int $(-6, 0)$, y-int $(0, 2)$ |
| 5 | $y = 5$ | Slope $0$, no x-intercept (horizontal line at $y = 5$), y-int $(0, 5)$ |

Each graph shows a coordinate plane with the correct line drawn. Two distractor graphs have wrong slopes or wrong intercepts -- chosen so that they share one feature with the correct answer to make the distinction require careful reading.

**Provenance:** Synthetic with seed 508. Equations span slope-intercept, standard, and point-slope origins. Graph features are computed exactly to ensure unambiguous matching.

**Rules:** Each graph option is generated by computing intercepts from $y = mx + b$ where $b$ varies (for wrong intercept) or $m$ varies (for wrong slope). Distractors share one correct feature to force checking both parameters. A selection is correct when the chosen graph's slope and both intercepts match the equation exactly.

**Learner Activity:**

1. The learner sees an equation and three graphs labeled A, B, C.
2. The learner selects which graph matches the equation.
3. After selecting, the sim highlights the correct answer and labels the key features on it.

**Feedback:** Correct: "Correct. Your graph shows slope = [m], x-intercept = [value], y-intercept = [value] -- matching the equation." Incorrect first attempt: states which feature is wrong on the chosen graph. After second wrong attempt: reveals the correct graph with labeled intercepts and slope. Running tally updates after each item.

**Starting State:** The equation "$y = \frac{3}{2}x - 3$" is shown above three graphs A, B, C. The prompt reads: "Which graph represents this equation?"

**Chapter Anchors:** This sim reinforces the graphing methods from this section: slope-intercept (items 1 and 2), conversion from point-slope (item 3), intercept method (item 4), and horizontal lines (item 5).
</details>

### Distance Formula and Midpoint

Given two points $(x_1, y_1)$ and $(x_2, y_2)$ on the coordinate plane, you may want to know:
- How far apart they are.
- Where the exact middle of the segment connecting them lies.

The **distance** between two points comes from the Pythagorean Theorem. Imagine a right triangle where the segment connecting the points is the hypotenuse, and the legs run parallel to the axes. The horizontal leg has length $|x_2 - x_1|$ and the vertical leg has length $|y_2 - y_1|$. By the Pythagorean Theorem:

$$\text{distance} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

For example, the distance between $(1, 2)$ and $(5, 8)$ is:
$$d = \sqrt{(5 - 1)^2 + (8 - 2)^2} = \sqrt{4^2 + 6^2} = \sqrt{16 + 36} = \sqrt{52} = 2\sqrt{13} \approx 7.21$$

The **midpoint** of the segment is simply the average of each coordinate:
$$\text{Midpoint} = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$$

For the same points $(1, 2)$ and $(5, 8)$:
$$\text{Midpoint} = \left(\frac{1 + 5}{2}, \frac{2 + 8}{2}\right) = (3, 5)$$

This is intuitive: halfway between $x = 1$ and $x = 5$ is $x = 3$, and halfway between $y = 2$ and $y = 8$ is $y = 5$. On a graph, the midpoint sits exactly in the center of the line segment connecting the two points.

## Summary

This chapter covered the essential tools for visualizing linear relationships:

- **The coordinate plane** provides a two-dimensional grid where every point is identified by an ordered pair $(x, y)$. Points are located in one of four quadrants depending on the signs of their coordinates.
- **Slope** ($m$) measures the rate of change -- how much $y$ changes per unit increase in $x$. It can be positive (rising), negative (falling), zero (horizontal), or undefined (vertical).
- **Three forms of linear equations** each serve different purposes:
  - Slope-intercept form ($y = mx + b$) makes slope and y-intercept immediately visible.
  - Standard form ($Ax + By = C$) handles vertical lines naturally and emphasizes integer coefficients.
  - Point-slope form ($y - y_1 = m(x - x_1)$) is efficient when you know a point and the slope but not the intercept.
- **Direct variation** ($y = kx$) describes a proportional relationship whose graph always passes through the origin. The constant $k$ tells you the rate at which $y$ changes per unit of $x$.
- **Scatter plots** display paired measurements; a **line of best fit** summarizes the linear trend when data does not fall exactly on a line.
- **Parallel lines** share the same slope; **perpendicular lines** have slopes that are negative reciprocals (their product is $-1$).
- The **distance formula** and **midpoint formula** let you compute properties of line segments without measuring them on a graph.

These graphing skills bridge algebraic manipulation with geometric visualization -- the same equations you manipulate symbolically now have a concrete visual interpretation that will be essential as you move into function analysis in later chapters.

#### Diagram: Chapter 5: What You've Learned

<details markdown="1">
<summary>Chapter 5: What You've Learned</summary>
Type: diagram
**sim-id:** chapter-5-concept-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain how slope, intercepts, and equation forms connect to each other in a linear relationship.

**Prerequisites:** coordinate plane, quadrants, ordered pair, slope, slope-intercept form, standard form, point-slope form, direct variation, scatter plot, parallel lines, perpendicular lines (all defined in this chapter).

**Evidence of Mastery:** For three blank-node scenarios, the learner drags a label from a word bank to the correct node on an incomplete concept map. A placement is correct when it matches the model connection between concepts. Mastery: 2 of 3 correct on the first attempt.

**Misconceptions:** (1) Treating "slope" and "intercept" as independent properties rather than two parts of a single description. (2) Confusing standard form with slope-intercept form because both use $x$ and $y$.

**Instructional Rationale:** Understand-level explanation requires the learner to identify meaningful connections between concepts, revealing whether they see linear equations as a unified family of representations or as isolated formulas.

**Content:**

Concept map nodes: coordinate plane, slope, rate of change, slope-intercept form ($y = mx + b$), standard form ($Ax + By = C$), point-slope form ($y - y_1 = m(x - x_1)$), direct variation ($y = kx$), scatter plot, line of best fit, parallel lines (same slope), perpendicular lines (negative reciprocal slopes).

Three connections to fill in:
1. "slope-intercept form" connects to "slope" via the label: "m is the [slope]"
2. "parallel lines" connects to "same slope" via the label: "Parallel lines have [equal slopes]"
3. "direct variation" connects to "y = kx" via the label: "Direct variation equation is [y = kx]"

**Provenance:** Synthetic with seed 509. Concepts are chosen from this chapter's vocabulary and connected by their defining relationships.

**Rules:** Each blank node has exactly one correct label from the word bank. The connection exists when it reflects a definitional or mathematical relationship stated in the chapter. A placement is correct when both the label and its connection target match the model.

**Learner Activity:**

1. The learner sees an incomplete concept map with three empty nodes and a word bank.
2. The learner drags labels to fill the blanks.
3. After completing all three, the sim evaluates each placement independently.

**Feedback:** Correct: highlights the connection in green with the connecting label revealed. Incorrect first attempt: highlights the node in yellow and says the blank is not yet filled. Second reveal: shows the correct placement with its explanatory label.

**Starting State:** The concept map shows six known connections between chapter concepts, three empty nodes connected to those known nodes, and a word bank on the side. The prompt reads: "Drag each label to its correct node to complete the concept map."

**Chapter Anchors:** This infographic summarizes all linear-equation forms, slope-intercept form, parallel/perpendicular criteria, and direct variation introduced in this chapter. Every label used corresponds to terminology defined in this chapter.
</details>