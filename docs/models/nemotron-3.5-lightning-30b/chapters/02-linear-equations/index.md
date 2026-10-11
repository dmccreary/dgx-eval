---
title: "Linear Equations"
description: "Key concepts for linear equations, building on foundational knowledge and preparing for more advanced topics."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 16:41:22"
version: 1.11
---

# Linear Equations

## Summary
This chapter covers the key concepts for linear equations. Students will develop fluency in the core algebraic skills and topics presented in this chapter, building on foundational knowledge and preparing for more advanced topics.

## Concepts Covered
| Concept | Concept Impact Score |
|---------|----------------------|
| Solve Linear Inequality | 5 |
| Graph Linear Inequality | 1 |
| Absolute Value Equation | 4 |
| Absolute Value Inequality | 2 |
| Function Concept | 189 |
| Function Notation | 188 |
| Domain of Function | 50 |
| Range of Function | 36 |
| Interpret Function Graph | 19 |
| Interpret Function Table | 3 |
| Piecewise Function | 4 |
| Step Function | 7 |
| Slope Rate of Change | 381 |
| Slope-Intercept Form | 4 |
| Point-Slope Form | 122 |
| Standard Form Equation | 125 |
| Graph Linear Equation | 118 |
|

## Prerequisites
[Prerequisites from prior chapters or course description]

## Elaboration Budget (CIS-Driven)
| Concept | CIS | E(c) | Tier | Target Words | Required Elements |
|---------|-----|------|------|---------------|--------------------|
| Slope Rate of Change | 381 | 1.0000 | A (full treatment) | 500-750 | worked example + diagram |
| Function Concept | 189 | 0.8825 | A (full treatment) | 500-750 | worked example + diagram |
| Function Notation | 188 | 0.8816 | A (full treatment) | 500-750 | worked example + diagram |
| Standard Form Equation | 125 | 0.8134 | A (full treatment) | 500-750 | worked example + diagram |
| Point-Slope Form | 122 | 0.8094 | A (full treatment) | 500-750 | worked example + diagram |
| Graph Linear Equation | 118 | 0.8038 | A (full treatment) | 500-750 | worked example + diagram |
| Domain of Function | 50 | 0.6613 | A (full treatment) | 500-750 | worked example + diagram |
| Range of Function | 36 | 0.6073 | A (full treatment) | 500-750 | worked example + diagram |
| Interpret Function Graph | 19 | 0.5039 | A (full treatment) | 500-750 | worked example + diagram |
| Step Function | 7 | 0.3498 | B (standard) | 250-400 | worked example |
| Solve Linear Inequality | 5 | 0.3014 | B (standard) | 250-400 | worked example |
| Absolute Value Equation | 4 | 0.2707 | B (standard) | 250-400 | worked example |
| Piecewise Function | 4 | 0.2707 | B (standard) | 250-400 | worked example |
| Slope-Intercept Form | 4 | 0.2707 | B (standard) | 250-400 | worked example |
| Interpret Function Table | 3 | 0.2332 | B (standard) | 250-400 | worked example |
| Absolute Value Inequality | 2 | 0.1848 | C (brief) | 120-200 | clear definition |
| Graph Linear Inequality | 1 | 0.1166 | C (brief) | 120-200 | clear definition |
---

# Linear Equations in One Variable

In this chapter, you will learn how to solve linear equations and inequalities in one variable, graph relationships, and understand functions—the machinery that describes how one quantity depends on another. Algebra I is your bridge from arithmetic, where you compute with specific numbers, to algebra, where you work with variables that can represent any number in a given set. By the end of this chapter, you will be able to model real-world situations such as calculating phone bills, determining break-even points for business ventures, and analyzing motion at constant speed.

## From Arithmetic to Algebra

Before diving into equations, recall how arithmetic works: you are given two numbers and an operation, and you produce a result. In algebra, some of the numbers are replaced by letters—variables—that stand for unknown values. The goal is the same: find the value that makes the statement true. The difference is that now we must reason about what the value must be, rather than just computing it directly.

## 1. Understanding Functions

**Function Concept** (Tier A: 500–750 words, worked example + diagram)

A function is a rule that assigns to each input exactly one output. We write this as $f(x)$, read as "f of x," where $x$ is the input and $f(x)$ is the output. The set of all possible inputs is the **domain**, and the set of all possible outputs is the **range**.

> **Key terms defined before the diagram:**  
> - **Input:** A value you put into a function.  
> - **Output:** The result you get after applying the function rule.  
> - **Domain:** The set of all acceptable input values.  
> - **Range:** The set of all resulting output values.

Before we examine the diagram below, let's define two key terms. The **independent variable** is the input—you can choose any value from the domain. The **dependent variable** is the output—its value depends on which input you select. For example, in the function $f(x) = 2x + 3$, $x$ is the independent variable and $f(x)$ is the dependent variable.

<details markdown="1">
<summary>Function Concept</summary>
Type: microsim
Library: p5.js
Bloom Level: Understand
Bloom Verb: Explain
Learning Objective: The learner will explain the relationship between the domain, the function rule, and the range given a specific function.

Prerequisites: Input, Output, Domain, Range
Evidence of Mastery: The learner can identify the domain and range of a function from its graph or equation, and explain how the function rule maps each domain element to exactly one range element.
Misconceptions: The mistaken belief that a graph passing the vertical line test is sufficient to confirm a function, without checking that each input maps to exactly one output.
Instructional Rationale: Working with interactive function diagrams helps learners build an intuition for how changing inputs produces predictable outputs, reinforcing the "exactly one output" requirement through direct manipulation.
Content: The learner sees a coordinate plane with a draggable point representing the input $x$. As the point moves along the $x$-axis, the corresponding output $f(x)$ moves along the $y$-axis. The learner can toggle between three function rules: $f(x) = 2x + 1$, $f(x) = x^2$, and $f(x) = |x|$. For each rule, the learner must determine the domain (e.g., "all real numbers" or "$x \geq 0$") and the range (e.g., "all real numbers greater than or equal to 1").
Provenance: Synthetic with seed 2026-AlgebraI-001
Rules: The domain is set to all real numbers unless the function contains a square root or denominator that restricts values. The range depends on the function rule: for $f(x) = 2x + 1$, the range is all real numbers; for $f(x) = x^2$, the range is $y \geq 0$; for $f(x) = |x|$, the range is $y \geq 0$.
Learner Activity: [1] Drag the input point along the $x$-axis and observe how the output point moves. [2] For each of the three function rules, type the domain and range in the provided text fields. [3] Click "Check" to see if your answers are correct. [4] Click "Explain" to see a written explanation of the domain and range.
Feedback: [Correct] "Your domain and range are correct. The function rule maps each input to exactly one output." [Incorrect] "Check: for $f(x) = x^2$, the domain is all real numbers, but the range is $y \geq 0$. Remember that squaring any real number results in a non-negative output." [Attempt 3 incorrect] "Review the definitions of domain and range, and try again."
Starting State: The input point is at $x = 0$, and the output is at $f(0) = 1$ for the first function rule.
Chapter Anchors: The learner will be able to state the domain and range of a function given its equation or graph. The function $f(x) = 2x + 1$ has domain "all real numbers" and range "all real numbers."
</details>

<details markdown="1">
<summary>Function Notation</summary>
Type: microsim
Library: p5.js
Bloom Level: Understand
Bloom Verb: Explain
Learning Objective: The learner will interpret function notation $f(x)$ and evaluate functions for specific input values.

Prerequisites: Function Concept
Evidence of Mastery: The learner can substitute a given value for $x$ and compute $f(x)$, and can write the output using correct function notation.
Misconceptions: The mistaken belief that $f(x)$ means "f times x," rather than "the value of f at x."
Instructional Rationale: Practicing evaluation of function notation builds fluency in reading and writing function-based relationships, which is essential for later work with graphs and equations.
Content: The learner sees a function machine display with a function rule $f(x) = 3x - 2$ and an input field labeled "Enter x." Below, three pairs of (input, output) are shown with the outputs blanked out. The learner must enter the missing output values.
Provenance: Synthetic with seed 2026-AlgebraI-002
Rules: The input $x$ is an integer from the set $\{-2, -1, 0, 1, 2\}$. The output is computed as $3x - 2$. Default input values are used for the first pair.
Learner Activity: [1] Look at the function rule $f(x) = 3x - 2$. [2] Compute $f(-2)$, $f(0)$, and $f(2)$ by substituting each value for $x$. [3] Enter your answers in the three output fields. [4] Click "Check" to verify.
Feedback: [Correct] "Great work! $f(-2) = -8$, $f(0) = -2$, and $f(2) = 4$." [Incorrect] "For $f(x) = 3x - 2$: substitute $-2$ for $x$ to get $3(-2) - 2 = -8$. Similarly, $f(0) = -2$ and $f(2) = 4$. Try again."
Starting State: The function rule $f(x) = 3x - 2$ is displayed, and the first input pair is $(-2, \text{blank})$.
Chapter Anchors: The learner will be able to evaluate a function notation expression for a given domain value. For $f(x) = 3x - 2$, $f(2) = 4$.
</details>

<details markdown="1">
<summary>Domain of Function</summary>
Type: microsim
Library: p5.js
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will determine the domain of a function from its equation, identifying values that make the expression undefined.

Prerequisites: Function Concept, Function Notation
Evidence of Mastery: The learner can look at a function equation and state the domain using correct interval or set-builder notation, excluding values that cause division by zero or take square roots of negative numbers.
Misconceptions: The belief that the domain is always "all real numbers" regardless of the function expression.
Instructional Rationale: Determining domains is a foundational skill for working with rational and radical functions; errors here propagate into incorrect graphing and equation solving.
Content: The learner sees four function equations one at a time: $f(x) = \frac{1}{x}$, $f(x) = \sqrt{x}$, $f(x) = \frac{1}{x-2}$, and $f(x) = \sqrt{x-3}$. For each, the learner must type the domain in a text field. Correct answers use interval notation $(a, b)$ or set-builder notation $\{x \mid \text{condition}\}$.
Provenance: Synthetic with seed 2026-AlgebraI-003
Rules: Denominator zero is excluded; square root of negative number is excluded. If both restrictions apply, both must be listed.
Learner Activity: [1] Look at each function equation. [2] Identify any restricted $x$-values. [3] Type the domain in the provided text field using interval or set-builder notation. [4] Click "Check" to verify all four answers.
Feedback: [Correct] "All domains are correct. You correctly excluded values that make the expression undefined." [Incorrect] "For $f(x) = \frac{1}{x-2}$, the value $x = 2$ makes the denominator zero, so it must be excluded from the domain. The domain is $x \neq 2$ or $(-\infty, 2) \cup (2, \infty)$. Try again." [Attempt 3 incorrect] "Review: identify values of $x$ that cause division by zero or take square roots of negative numbers. Then express the domain using interval or set-builder notation."
Starting State: The first function $f(x) = \frac{1}{x}$ is displayed.
Chapter Anchors: The learner will be able to determine the domain of a function from its equation. For $f(x) = \frac{1}{x-2}$, the domain is $x \neq 2$.
</details>

<details markdown="1">
<summary>Range of Function</summary>
Type: microsim
Library: p5.js
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will determine the range of a function from its equation, using graphical and algebraic reasoning.

Prerequisites: Function Concept, Function Notation, Domain of Function
Evidence of Mastery: The learner can look at a function equation and state the range using correct interval or set-builder notation, considering the function's shape and any restrictions on output values.
Misconceptions: The belief that the range is always "all real numbers" regardless of the function expression.
Instructional Rationale: Just as with domains, determining ranges requires analyzing the function's expression and graph; this skill is essential for later work with quadratic and rational functions.
Content: The learner sees four function equations one at a time: $f(x) = x^2$, $f(x) = -x^2 + 3$, $f(x) = |x|$, and $f(x) = \frac{1}{x}$. For each, the learner must type the range in a text field. Correct answers use interval or set-builder notation.
Provenance: Synthetic with seed 2026-AlgebraI-004
Rules: For $f(x) = x^2$, the range is $y \geq 0$. For $f(x) = -x^2 + 3$, the range is $y \leq 3$. For $f(x) = |x|$, the range is $y \geq 0$. For $f(x) = \frac{1}{x}$, the range is $y \neq 0$.
Learner Activity: [1] Look at each function equation. [2] Determine the possible output values (y-values). [3] Type the range in the provided text field using interval or set-builder notation. [4] Click "Check" to verify all four answers.
Feedback: [Correct] "All ranges are correct. You analyzed each function's shape to determine the output values." [Incorrect] "For $f(x) = \frac{1}{x}$, the output can be any real number except 0, because the numerator is 1 and the denominator can be any non-zero real number. Try again." [Attempt 3 incorrect] "Review: consider the function's shape and any asymptotes. For reciprocals, the output never equals 0. Try again."
Starting State: The first function $f(x) = x^2$ is displayed.
Chapter Anchors: The learner will be able to determine the range of a function from its equation. For $f(x) = \frac{1}{x}$, the range is $y \neq 0$.
</details>

## 2. Linear Equations

**Slope Rate of Change** (Tier A: 500–750 words, worked example + diagram)

The concept of slope connects directly to what you already know about rate of change. In everyday life, we encounter rates such as 60 miles per hour, 3.5 grams per deciliter, or 2 liters per minute. In each case, a quantity changes at a constant rate with respect to another quantity. In algebra, when two quantities change at a constant rate with respect to each other, we say the relationship has a constant rate of change, or **slope**.

Suppose a car travels at a constant speed of 60 miles per hour. After 1 hour, it has traveled 60 miles; after 2 hours, 120 miles; after 3 hours, 180 miles. The ratio of the change in distance to the change in time is always 60 miles per 1 hour. This constant ratio is the slope of the line describing the car's distance over time.

<formula>
$m = \frac{y_2 - y_1}{x_2 - x_1}$
</formula>

where $(x_1, y_1)$ and $(x_2, y_2)$ are two distinct points on the line, and $m$ is the slope. The numerator $y_2 - y_1$ is the **vertical change** (rise), and the denominator $x_2 - x_1$ is the **horizontal change** (run). The slope tells us both the direction and the steepness of the line.

>A line with a positive slope rises from left to right. A line with a negative slope falls from left to right. A horizontal line has slope 0, and a vertical line has undefined slope.

<details markdown="1">
<summary>Slope Rate of Change</summary>
Type: diagram
Library: vis-network
Bloom Level: Understand
Bloom Verb: Explain
Learning Objective: The learner will explain the concept of slope as rate of change, using the rise-over-run formula and interpreting the sign and magnitude of the slope.

Prerequisites: From Arithmetic to Algebra
Evidence of Mastery: The learner can compute the slope of a line given two points, and describe what the sign (positive, negative, zero, undefined) and magnitude of the slope indicate about the line's direction and steepness.
Misconceptions: The belief that a larger absolute value of slope always means a "steeper" line regardless of context, or that slope can be computed for vertical lines.
Instructional Rationale: Visualizing slope as rise over run on a coordinate plane helps learners connect the formula to a geometric interpretation, reinforcing the meaning of positive, negative, zero, and undefined slopes.
Content: A coordinate plane displays three lines: Line A passes through $(-2, 1)$ and $(2, 5)$ with slope $m = \frac{5-1}{2-(-2)} = \frac{4}{4} = 1$ (positive, rising). Line B passes through $(-3, 4)$ and $(1, -2)$ with slope $m = \frac{-2-4}{1-(-3)} = \frac{-6}{4} = -\frac{3}{2}$ (negative, steeper than 45°). Line C is horizontal through $y = 3$, with slope $m = 0$. The learner can drag points to change the slope and see the line update in real time.
Provenance: Synthetic with seed 2026-AlgebraI-010
Rules: The slope formula $m = \frac{y_2 - y_1}{x_2 - x_1}$ is applied correctly. The sign of the slope matches the line's direction (positive = rising, negative = falling). A vertical line is noted as having undefined slope because division by zero is undefined.
Learner Activity: [1] Observe the three lines and their slopes on the coordinate plane. [2] Drag the endpoints of each line to create new points and observe how the slope changes. [3] For each line, state whether the slope is positive, negative, zero, or undefined, and describe what it means about the line's direction.
Feedback: [Correct] "Excellent! You correctly identified the slope signs and meanings." [Incorrect] "Review: slope $m = \frac{\text{rise}}{\text{run}} = \frac{y_2 - y_1}{x_2 - x_1}$. A positive slope means the line rises from left to right; a negative slope means it falls; a slope of 0 means the line is horizontal; an undefined slope means the line is vertical."
Starting State: Line A through $(-2, 1)$ and $(2, 5)$ is displayed with $m = 1$.
Chapter Anchors: The learner will be able to compute the slope of a line given two points and interpret the sign and magnitude of the slope.
</details>

**Slope-Intercept Form** (Tier B: 250–400 words, worked example)

The most useful form for graphing a linear equation is the **slope-intercept form**:

<formula>
$y = mx + b$
</formula>

In this form, $m$ is the slope and $b$ is the $y$-intercept—the point where the line crosses the $y$-axis $(0, b)$. This form makes it easy to graph a line: first plot the $y$-intercept, then use the slope to find another point.

Let's work through an example.

> **Example:** Graph the equation $y = 2x + 3$.

**Solution:** Here, $m = 2$ and $b = 3$. First, plot the $y$-intercept $(0, 3)$. Then, from $(0, 3)$, move up 2 units (the rise) and right 1 unit (the run) to reach $(1, 5)$. Draw a line through these two points.

<details markdown="1">
<summary>Slope-Intercept Form</summary>
Type: diagram
Library: vis-network
Bloom Level: Understand
Bloom Verb: Explain
Learning Objective: The learner will identify the slope and $y$-intercept from a linear equation in slope-intercept form, and graph the line using these values.

Prerequisites: Slope Rate of Change
Evidence of Mastery: The learner can given a linear equation in the form $y = mx + b$, state the values of $m$ and $b$, and graph the line by plotting the $y$-intercept and using the slope to find a second point.
Misconceptions: The belief that $b$ is the $x$-intercept, or that the slope $m$ is the line's $y$-value at $x = 1$.
Instructional Rationale: Recognizing slope-intercept form enables rapid graphing without needing to compute two points via the slope formula, building confidence and fluency in line graphing.
Content: The learner sees a linear equation $y = 2x + 3$ and three input fields: one for $m$ (slope), one for $b$ (y-intercept), and one for the next point's $x$-coordinate. The learner must correctly fill in $m = 2$, $b = 3$, and then compute the next point using the slope.
Provenance: Adapted from common Algebra I curriculum materials
Rules: The slope $m$ is the coefficient of $x$. The $y$-intercept $b$ is the constant term. The next point is found by moving $m$ units vertically and 1 unit horizontally from the $y$-intercept.
Learner Activity: [1] Look at the equation $y = 2x + 3$. [2] Enter the values of $m$ and $b$ in the provided fields. [3] Click "Find next point" to see how the slope moves from the y-intercept. [4] Plot the line through the y-intercept and the new point.
Feedback: [Correct] "Perfect! You identified $m = 2$ and $b = 3$, and correctly used the slope to find the next point." [Incorrect] "Remember: in $y = mx + b$, $m$ is the slope and $b$ is the y-intercept. For $y = 2x + 3$, $m = 2$ and $b = 3$. Try again."
Starting State: The equation $y = 2x + 3$ is displayed with empty input fields.
Chapter Anchors: The learner will be able to identify the slope and y-intercept from a linear equation in slope-intercept form, and graph the line using these values.
</details>

**Point-Slope Form** (Tier A: 500–750 words, worked example + diagram)

Sometimes you know a line's slope and one point on the line, but not the $y$-intercept. In that case, the **point-slope form** is most convenient:

<formula>
$y - y_1 = m(x - x_1)$
</formula>

where $m$ is the slope and $(x_1, y_1)$ is a point on the line. This form lets you write the equation of a line directly from its slope and a point.

> **Example:** Write the equation of the line with slope $3$ that passes through the point $(2, 5)$.

**Solution:** Substitute $m = 3$, $x_1 = 2$, and $y_1 = 5$ into the point-slope form:
$y - 5 = 3(x - 2)$
This can be simplified to slope-intercept form: $y = 3x - 1$.

<details markdown="1">
<summary>Point-Slope Form</summary>
Type: diagram
Library: vis-network
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will write the equation of a line in point-slope form given the slope and a point on the line, and convert between point-slope and slope-intercept forms.

Prerequisites: Slope Rate of Change, Slope-Intercept Form
Evidence of Mastery: The learner can given the slope $m$ and a point $(x_1, y_1)$, write the equation $y - y_1 = m(x - x_1)$, and rearrange it into the form $y = mx + b$.
Misconceptions: The belief that the point-slope form can only be used when the $y$-intercept is unknown, or that the point $(x_1, y_1)$ must be the $y$-intercept.
Instructional Rationale: Point-slope form is the most flexible way to write a line's equation when you have a point and a slope, and mastering the conversion to slope-intercept form builds algebraic flexibility.
Content: The learner sees a dynamic coordinate plane with a draggable point $P = (x_1, y_1)$ and a slope slider $m$. As the point and slope change, the line and its equation in point-slope form update automatically. The learner must type the equivalent slope-intercept form $y = mx + b$.
Provenance: Adapted from common Algebra I curriculum materials
Rules: The slope $m$ and point $(x_1, y_1)$ must match the displayed values. The conversion to slope-intercept form is done by expanding and simplifying $y - y_1 = m(x - x_1)$ to $y = mx + (y_1 - mx_1)$, where $b = y_1 - mx_1$.
Learner Activity: [1] Drag point $P$ to $(2, 5)$ and set the slope slider to $m = 3$. [2] Type the equivalent slope-intercept form $y = 3x - 1$. [3] Click "Check" to verify.
Feedback: [Correct] "Excellent! You correctly converted from point-slope to slope-intercept form." [Incorrect] "Review: starting from $y - y_1 = m(x - x_1)$, expand to $y - y_1 = mx - mx_1$, then add $y_1$ to both sides to get $y = mx + (y_1 - mx_1)$. For $y - 5 = 3(x - 2)$, this gives $y = 3x + (5 - 3\cdot2) = 3x - 1$. Try again."
Starting State: Point $P$ is at $(2, 5)$ and the slope slider is set to $m = 3$.
Chapter Anchors: The learner will be able to write the equation of a line in point-slope form given the slope and a point, and convert to slope-intercept form.
</details>

**Standard Form Equation** (Tier A: 500–750 words, worked example + diagram)

Another common way to write a linear equation is the **standard form**:

<formula>
$Ax + By = C$
</formula>

where $A$, $B$, and $C$ are integers, and $A \geq 0$. This form is useful for quickly finding intercepts: set $x = 0$ to find the $y$-intercept, and set $y = 0$ to find the $x$-intercept.

> **Example:** Convert $y = 2x + 3$ to standard form.

**Solution:** Subtract $2x$ from both sides: $-2x + y = 3$. Multiply by $-1$ to make the $x$-coefficient positive: $2x - y = -3$. This is the standard form, where $A = 2$, $B = -1$, and $C = -3$.

<details markdown="1">
<summary>Standard Form Equation</summary>
Type: diagram
Library: vis-network
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will convert a linear equation from slope-intercept form to standard form $Ax + By = C$, and find the $x$- and $y$-intercepts from standard form.

Prerequisites: Slope-Intercept Form, Point-Slope Form
Evidence of Mastery: The learner can given a linear equation in slope-intercept or point-slope form, rearrange it into standard form $Ax + By = C$ with integer coefficients and $A \geq 0$, and find both intercepts from the standard form.
Misconceptions: The belief that standard form requires $A$, $B$, and $C$ to be positive, or that the $x$-intercept is found by setting $y = C$ rather than $y = 0$.
Instructional Rationale: Standard form is essential for systems of equations and for applications where intercepts have direct real-world meaning; fluency in converting between forms builds algebraic versatility.
Content: The learner sees a linear equation in slope-intercept form and three input fields: one for $A$, one for $B$, and one for $C$. The learner must correctly enter the standard form coefficients and then click buttons to find the $x$- and $y$-intercepts by setting $y = 0$ and $x = 0$, respectively.
Provenance: Adapted from common Algebra I curriculum materials
Rules: $A$, $B$, $C$ are integers. $A \geq 0$. To find the $x$-intercept, set $y = 0$ and solve $Ax = C$. To find the $y$-intercept, set $x = 0$ and solve $By = C$.
Learner Activity: [1] Look at the equation $y = 2x + 3$. [2] Convert to standard form and enter the values of $A$, $B$, and $C$. [3] Click "Find x-intercept" and "Find y-intercept" to see the results. [4] Verify that the intercepts match the graph.
Feedback: [Correct] "Great work! You converted $y = 2x + 3$ to $2x - y = -3$ and found the intercepts correctly." [Incorrect] "Remember: to convert $y = 2x + 3$ to standard form, subtract $2x$ from both sides to get $-2x + y = 3$, then multiply by $-1$ to get $2x - y = -3$. To find the $x$-intercept, set $y = 0$ and solve $2x = -3$. To find the $y$-intercept, set $x = 0$ and solve $-y = 3$. Try again."
Starting State: The equation $y = 2x + 3$ is displayed with empty input fields.
Chapter Anchors: The learner will be able to convert a linear equation to standard form and find both intercepts from the standard form.
</details>

**Graph Linear Equation** (Tier A: 500–750 words, worked example + diagram)

Now let's put together all the forms you've learned to graph a linear equation from scratch.

> **Example:** Graph the equation $3x - 2y = 6$ by finding the intercepts.

**Solution:** In standard form, to find the $x$-intercept, set $y = 0$ and solve for $x$: $3x - 2(0) = 6$, so $x = 2$. The $x$-intercept is $(2, 0)$. To find the $y$-intercept, set $x = 0$ and solve for $y$: $3(0) - 2y = 6$, so $y = -3$. The $y$-intercept is $(0, -3)$. Plot these two points and draw a line through them.

<details markdown="1">
<summary>Graph Linear Equation</summary>
Type: diagram
Library: vis-network
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will graph a linear equation in standard form by finding the $x$- and $y$-intercepts, and verify the graph using a second point if needed.

Prerequisites: Standard Form Equation
Evidence of Mastery: The learner can given a linear equation in standard form $Ax + By = C$, find the $x$- and $y$-intercepts, plot them on a coordinate plane, and draw the line through them.
Misconceptions: The belief that two points are always sufficient, without checking that they are distinct; or that the intercepts are always $(0, C)$ and $(C, 0)$.
Instructional Rationale: Graphing using intercepts is a efficient method that works for any linear equation in standard form, and it reinforces the geometric meaning of intercepts.
Content: The learner sees the equation $3x - 2y = 6$ and an empty coordinate plane. The learner must first compute the $x$-intercept by setting $y = 0$ and solving for $x$, then the $y$-intercept by setting $x = 0$ and solving for $y$. After entering the intercepts, the learner clicks "Plot" to see the points plotted and the line drawn. The learner can also add a third point for verification.
Provenance: Adapted from common Algebra I curriculum materials
Rules: The $x$-intercept is found by setting $y = 0$ and solving $Ax = C$. The $y$-intercept is found by setting $x = 0$ and solving $By = C$. If $A = 0$, the equation represents a horizontal line; if $B = 0$, it represents a vertical line.
Learner Activity: [1] Look at the equation $3x - 2y = 6$. [2] Compute the $x$-intercept by setting $y = 0$ and solving for $x$. [3] Compute the $y$-intercept by setting $x = 0$ and solving for $y$. [4] Click "Plot intercepts" to see the points and line drawn. [5] Optionally, add a third point for verification by choosing an $x$-value and computing the corresponding $y$-value.
Feedback: [Correct] "Perfect! You found the intercepts $(2, 0)$ and $(0, -3)$ and graphed the line correctly." [Incorrect] "Review: to find the $x$-intercept of $3x - 2y = 6$, set $y = 0$ and solve $3x = 6$, giving $x = 2$. To find the $y$-intercept, set $x = 0$ and solve $-2y = 6$, giving $y = -3$. Try again."
Starting State: The equation $3x - 2y = 6$ is displayed with an empty coordinate plane.
Chapter Anchors: The learner will be able to graph a linear equation in standard form by finding and plotting the $x$- and $y$-intercepts.
</details>

## 3. Linear Inequalities

**Absolute Value Equation** (Tier B: 250–400 words, worked example)

An **absolute value equation** contains an absolute value expression, which is defined as the distance of a number from zero on the number line. The absolute value of $x$, written $|x|$, is always non-negative: $|x| \geq 0$. To solve an absolute value equation, we use the fact that if $|u| = a$ where $a \geq 0$, then either $u = a$ or $u = -a$.

> **Example:** Solve $|x - 3| = 5$.

**Solution:** 
$$
\begin{aligned}
|x - 3| &= 5 \\
x - 3 &= 5 \quad \text{or} \quad x - 3 = -5 \\
x &= 8 \quad \text{or} \quad x = -2
\end{aligned}
$$

The solution set is $\{-2, 8\}$.

<details markdown="1">
<summary>Absolute Value Equation</summary>
Type: microsim
Library: p5.js
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will solve absolute value equations of the form $|x - a| = b$ by writing and solving the two related linear equations.

Prerequisites: From Arithmetic to Algebra
Evidence of Mastery: The learner can given an equation $|x - a| = b$ with $b \geq 0$, write the two cases $x - a = b$ and $x - a = -b$, solve each, and list the solution set.
Misconceptions: The belief that $|x - a| = b$ always yields two solutions, even when $b < 0$ (which yields no solution), or that the two solutions are always $x = a + b$ and $x = a - b$ without checking.
Instructional Rationale: Practicing the two-case method builds fluency in isolating the absolute value expression and solving the resulting linear equations, which is essential for later work with inequalities and graphing.
Content: The learner sees an absolute value equation $|x - a| = b$ with sliders for $a$ and $b$. The learner must first determine whether $b \geq 0$; if $b < 0$, the equation has no solution. If $b \geq 0$, the learner writes the two related linear equations and solves for $x$. Immediate feedback is provided after each step.
Provenance: Adapted from common Algebra I curriculum materials
Rules: If $b < 0$, the equation $|x - a| = b$ has no solution. If $b \geq 0$, the two cases are $x - a = b$ and $x - a = -b$. The solution set is $\{a + b, a - b\}$ when $b > 0$, and $\{a\}$ when $b = 0$.
Learner Activity: [1] Adjust the sliders for $a$ and $b$. [2] Determine whether $b \geq 0$. [3] If $b \geq 0$, write the two cases $x - a = b$ and $x - a = -b$. [4] Solve each equation for $x$. [5] Enter the solution set. [6] Click "Check" to verify.
Feedback: [Correct] "Correct! You solved the absolute value equation and found the solution set." [Incorrect] "Review: to solve $|x - a| = b$, first check that $b \geq 0$. Then write the two cases $x - a = b$ and $x - a = -b$. For $|x - 3| = 5$, the cases are $x - 3 = 5$ and $x - 3 = -5$, giving $x = 8$ and $x = -2$. Try again."
Starting State: The equation $|x - 3| = 5$ is displayed with $a = 3$ and $b = 5$.
Chapter Anchors: The learner will be able to solve absolute value equations of the form $|x - a| = b$.
</details>

**Absolute Value Inequality** (Tier C: 120–200 words, clear definition)

An **absolute value inequality** compares an absolute value expression to a number. The two basic forms are $|u| < a$ and $|u| > a$ where $a > 0$.

> **Key idea:** $|u| < a$ means the distance from $u$ to zero is less than $a$, which is equivalent to $-a < u < a$. And $|u| > a$ means the distance from $u$ to zero is greater than $a$, which is equivalent to $u < -a$ or $u > a$.

<details markdown="1">
<summary>Absolute Value Inequality</summary>
Type: diagram
Library: vis-network
Bloom Level: Remember
Bloom Verb: Recall
Learning Objective: The learner will recall the solution methods for basic absolute value inequalities $|u| < a$ and $|u| > a$ where $a > 0$.

Prerequisites: Absolute Value Equation
Evidence of Mastery: The learner can given an inequality of the form $|u| < a$ or $|u| > a$ with $a > 0$, rewrite it as a compound inequality and solve for $u$.
Misconceptions: The belief that $|u| < a$ is equivalent to $u < a$ or $u > -a$, or that $|u| > a$ is equivalent to $u > a$ only (missing the $u < -a$ case).
Instructional Rationale: Understanding the "distance" interpretation of absolute value inequalities helps learners translate between absolute value and compound inequality forms, which is essential for graphing solution sets on number lines and coordinate planes.
Content: The learner sees two inequality formats: $|x - a| < b$ and $|x - a| > b$ with a slider for $b > 0$. The learner must drag the inequality to the correct compound inequality form: $|x - a| < b \rightarrow -b < x - a < b$, and $|x - a| > b \rightarrow x - a < -a$ or $x - a > a$. Visual number line feedback is provided.
Provenance: Adapted from common Algebra I curriculum materials
Rules: For $|u| < a$ with $a > 0$, rewrite as $-a < u < a$. For $|u| > a$ with $a > 0$, rewrite as $u < -a$ or $u > a$. If $a \leq 0$, the inequality $|u| < a$ has no solution, and $|u| > a$ is all real numbers.
Learner Activity: [1] Look at the inequality $|x - a| < b$ or $|x - a| > b$. [2] Drag the inequality to the correct compound inequality form on the number line. [3] Solve the resulting compound inequality for $x$. [4] Click "Check" to verify.
Feedback: [Correct] "Great work! You correctly rewrote the absolute value inequality as a compound inequality." [Incorrect] "Review: for $|x - a| < b$ with $b > 0$, rewrite as $-b < x - a < b$. For $|x - a| > b$ with $b > 0$, rewrite as $x - a < -b$ or $x - a > b$. If $b \leq 0$, the inequality $|x - a| < b$ has no solution, and $|x - a| > b$ is true for all real numbers. Try again."
Starting State: The inequality $|x - 3| < 5$ is displayed with $a = 3$ and $b = 5$.
Chapter Anchors: The learner will be able to solve basic absolute value inequalities $|u| < a$ and $|u| > a$ where $a > 0$.
</details>

**Solve Linear Inequality** (Tier B: 250–400 words, worked example)

A **linear inequality** looks like a linear equation but uses inequality symbols ($<$, $>$, $\leq$, $\geq$) instead of an equals sign. The solution is a range of values, not a single number. An important rule when solving inequalities: if you multiply or divide both sides by a negative number, you must reverse the inequality sign.

> **Example:** Solve $2x - 5 < 7$.

**Solution:**
$$
\begin{aligned}
2x - 5 &< 7 \\
2x &< 7 + 5 \\
2x &< 12 \\
x &< 6
\end{aligned}
$$

The solution is $x < 6$, or in interval notation, $(-\infty, 6)$.

<details markdown="1">
<summary>Solve Linear Inequality</summary>
Type: microsim
Library: p5.js
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will solve linear inequalities in one variable, correctly handling the inequality sign when multiplying or dividing by negative numbers.

Prerequisites: From Arithmetic to Algebra
Evidence of Mastery: The learner can solve a linear inequality in one variable, write the solution in inequality notation and interval notation, and correctly reverse the inequality sign when multiplying or dividing by a negative number.
Misconceptions: The belief that the inequality sign stays the same when multiplying or dividing by a negative number, or that the solution set of $x < 6$ includes 6.
Instructional Rationale: The sign-reversal rule is the most common error in linear inequality solving; targeted practice builds the habit of checking the sign after each multiplication or division step.
Content: The learner sees a linear inequality $ax + b < c$ with sliders for $a$, $b$, and $c$. The learner solves the inequality step by step, entering each result. After each step, immediate feedback is provided, and a special flag appears if the learner multiplies or divides by a negative number without reversing the inequality sign.
Provenance: Adapted from common Algebra I curriculum materials
Rules: The inequality is solved using additive and multiplicative inverse operations. If the coefficient of $x$ is negative, the inequality sign must be reversed when dividing. The solution is expressed in both $x < k$ and $(-\infty, k)$ notation.
Learner Activity: [1] Look at the inequality $ax + b < c$. [2] Subtract $b$ from both sides and enter the result. [3] Divide by the coefficient of $x$ and enter the result, reversing the inequality sign if the coefficient is negative. [4] Enter the solution in both inequality and interval notation. [5] Click "Check" to verify.
Feedback: [Correct] "Excellent! You solved the inequality and correctly reversed the sign when needed." [Incorrect] "Review: to solve $2x - 5 < 7$, first add 5 to both sides to get $2x < 12$, then divide by 2 to get $x < 6$. If you multiply or divide by a negative number, remember to reverse the inequality sign. Try again."
Starting State: The inequality $2x - 5 < 7$ is displayed.
Chapter Anchors: The learner will be able to solve linear inequalities in one variable and correctly handle the inequality sign when multiplying or dividing by negative numbers.
</details>

**Graph Linear Inequality** (Tier C: 120–200 words, clear definition)

A **linear inequality in two variables**, such as $y > 2x + 1$, is graphed by shading the half-plane that contains the solutions. The boundary line $y = 2x + 1$ is drawn as dashed if the inequality is strict ($<$ or $>$) and solid if inclusive ($\leq$ or $\geq$). The shading indicates all points that satisfy the inequality.

<details markdown="1">
<summary>Graph Linear Inequality</summary>
Type: diagram
Library: vis-network
Bloom Level: Remember
Bloom Verb: Recall
Learning Objective: The learner will graph a linear inequality in two variables by drawing the boundary line and shading the solution half-plane.

Prerequisites: From Arithmetic to Algebra
Evidence of Mastery: The learner can given a linear inequality in two variables $y > mx + b$ (or $\geq$, $\leq$), graph the boundary line (dashed for $<$ or $>$, solid for $\leq$ or $\geq$), and shade the half-plane that contains the solutions.
Misconceptions: The belief that the boundary line is always included, or that shading above the line always corresponds to $y > mx + b$ without testing a point.
Instructional Rationale: Visualizing linear inequalities as half-planes helps learners connect algebraic solutions to geometric representations, which is essential for systems of inequalities and linear programming.
Content: The learner sees a coordinate plane and a linear inequality $y > mx + b$. The learner must first graph the boundary line $y = mx + b$ (dashed if $>$ or $<$, solid if $\geq$ or $\leq$). Then the learner selects a test point (e.g., $(0, 0)$) and substitutes it into the inequality to determine which half-plane to shade. Immediate visual feedback is provided.
Provenance: Adapted from common Algebra I curriculum materials
Rules: The boundary line is dashed for strict inequalities ($<$ or $>$) and solid for inclusive inequalities ($\leq$ or $\geq$). The test point $(0, 0)$ is shaded if it satisfies the inequality; otherwise, the opposite half-plane is shaded.
Learner Activity: [1] Look at the inequality $y > 2x + 1$. [2] Graph the boundary line $y = 2x + 1$ as a dashed line. [3] Test the point $(0, 0)$ by substituting into the inequality. [3] Shade the half-plane that contains the solutions. [4] Click "Check" to verify.
Feedback: [Correct] "Perfect! You correctly graphed the inequality and shaded the solution half-plane." [Incorrect] "Review: to graph $y > 2x + 1$, first graph the boundary line $y = 2x + 1$ as a dashed line (because the inequality is strict). Test the point $(0, 0)$: $0 > 2(0) + 1$ is $0 > 1$, which is false, so shade the half-plane that does NOT contain $(0, 0)$. Try again."
Starting State: The inequality $y > 2x + 1$ is displayed.
Chapter Anchors: The learner will be able to graph a linear inequality in two variables by drawing the boundary line and shading the solution half-plane.
</details>

**Piecewise Function** (Tier B: 250–400 words, worked example)

A **piecewise function** is defined by different expressions depending on the input value. The notation uses braces to list each "piece" and its corresponding domain interval.

> **Example:** Evaluate the piecewise function
> $$f(x) = \begin{cases} x + 2 & \text{if } x < 0 \\ 2x - 1 & \text{if } x \geq 0 \end{cases}$$
> at $x = -3$, $x = 0$, and $x = 2$.

**Solution:**
- For $x = -3$: Since $-3 < 0$, use the first piece: $f(-3) = -3 + 2 = -1$.
- For $x = 0$: Since $0 \geq 0$, use the second piece: $f(0) = 2(0) - 1 = -1$.
- For $x = 2$: Since $2 \geq 0$, use the second piece: $f(2) = 2(2) - 1 = 3$.

<details markdown="1">
<summary>Piecewise Function</summary>
Type: microsim
Library: p5.js
Bloom Level: Apply
Bloom Verb: Apply
Learning Objective: The learner will evaluate a piecewise function at a given input value by identifying the correct piece and computing the output.

Prerequisites: From Arithmetic to Algebra
Evidence of Mastery: The learner can given a piecewise function and an input value, identify which piece's condition is satisfied, and compute the output using that piece's expression.
Misconceptions: The belief that all pieces are evaluated for every input, or that the domain boundaries are always inclusive or exclusive without checking the inequality symbols.
Instructional Rationale: Learning to navigate piecewise functions builds the critical skill of reading conditional definitions, which is essential for calculus and real-world modeling where different rules apply in different intervals.
Content: The learner sees a piecewise function defined by two expressions with a boundary at $x = 0$. The learner types an input value, and the simulation highlights the active piece and computes the output. Three practice problems with immediate feedback are provided.
Provenance: Adapted from common Algebra I curriculum materials
Rules: The condition for each piece (e.g., $x < 0$ or $x \geq 0$) determines which expression to use. If the input satisfies multiple conditions, the first (topmost) piece is used. If the input satisfies no piece, the function is undefined at that input.
Learner Activity: [1] Look at the piecewise function definition. [2] Type an input value in the provided field. [3] Click "Evaluate" to see which piece is active and the corresponding output. [4] Complete three practice problems with immediate feedback.
Feedback: [Correct] "Correct! You identified the active piece and computed the output." [Incorrect] "Review: to evaluate a piecewise function, first determine which condition the input satisfies. For $f(x) = \begin{cases} x + 2 & \text{if } x < 0 \\ 2x - 1 & \text{if } x \geq 0 \end{cases}$, if $x = -3$, use the first piece since $-3 < 0$, giving $f(-3) = -3 + 2 = -1$. Try again."
Starting State: The piecewise function definition is displayed with an empty input field.
Chapter Anchors: The learner will be able to evaluate a piecewise function at a given input value by identifying the correct piece and computing the output.
</details>

**Step Function** (Tier B: 250–400 words, worked example)

A **step function** is a piecewise constant function that jumps from one value to another without taking on intermediate values. The most common example is the greatest integer function, also called the **floor function**, denoted $\lfloor x \rfloor$, which gives the greatest integer less than or equal to $x$.

<details markdown="1">
<summary>Step Function</summary>
Type: diagram
Library: vis-network
Bloom Level: Understand
Bloom Verb: Explain
Learning Objective: The learner will describe the behavior of the step function (greatest integer/floor function) and interpret its graph as a sequence of horizontal segments.

Prerequisites: From Arithmetic to Algebra
Evidence of Mastery: The learner can given a value of $x$, state $\lfloor x \rfloor$, and describe the graph of $y = \lfloor x \rfloor$ as a series of horizontal segments (steps) with jumps at integer values.
Misconceptions: The belief that $\lfloor x \rfloor$ rounds $x$ to the nearest integer, or that the steps include the right-endpoint integer value.
Instructional Rationale: The floor function introduces the idea of a function that is constant on intervals and changes value abruptly, which is a precursor to understanding more complex piecewise and discontinuous functions.
Content: The learner sees a coordinate plane with the graph of $y = \lfloor x \rfloor$. The learner can drag a vertical line at any $x$-value, and the corresponding $y$-value (the greatest integer $\leq x$) is shown. The learner must identify the step structure and label the jump points.
Provenance: Adapted from common Algebra I curriculum materials
Rules: $\lfloor x \rfloor = n$ where $n$ is the greatest integer satisfying $n \leq x$. The graph consists of horizontal segments $[n, n+1)$ at height $n$, for each integer $n$. The segment at $[n, n+1)$ is closed at the left endpoint and open at the right endpoint.
Learner Activity: [1] Look at the graph of $y = \lfloor x \rfloor$. [2] Drag the vertical line to $x = 2.3$ and observe that $y = \lfloor 2.3 \rfloor = 2$. [3] Drag the vertical line to $x = -1.7$ and observe that $y = \lfloor -1.7 \rfloor = -2$. [4] Identify the jump points at integer values. [5] Click "Show steps" to highlight the horizontal segments.
Feedback: [Correct] "Excellent! You correctly interpreted the step function and identified the jump points." [Incorrect] "Review: the floor function $\lfloor x \rfloor$ gives the greatest integer less than or equal to $x$. For $x = 2.3$, $\lfloor 2.3 \rfloor = 2$ since 2 is the greatest integer $\leq 2.3$. For $x = -1.7$, $\lfloor -1.7 \rfloor = -2$ since -2 is the greatest integer $\leq -1.7$. The graph consists of horizontal segments at integer heights. Try again."
Starting State: The graph of $y = \lfloor x \rfloor$ is displayed with the vertical line at $x = 0$.
Chapter Anchors: The learner will be able to describe the behavior of the step function (greatest integer/floor function) and interpret its graph as a sequence of horizontal segments with jumps at integer values.
</details>

**Function Table** (Tier B: 250–400 words, worked example)

A **function table** (or input-output table) lists representative input values and their corresponding output values for a given function. It's a useful way to see how a function transforms inputs into outputs.

> **Example:** Complete the function table for $f(x) = 2x + 1$.

| $x$ (input) | $f(x)$ (output) |
|-------------|-----------------|
| $-2$        | ?               |
| $-1$        | ?               |
| $0$         | ?               |
| $1$         | ?               |
| $2$         | ?               |

**Solution:** Substitute each $x$-value into the function rule.

| $x$ (input) | $f(x)$ (output) |
|-------------|-----------------|
| $-2$        | $2(-2) + 1 = -3$ |
| $-1$        | $2(-1) + 1 = -1$ |
| $0$         | $2(0) + 1 = 1$ |
| $1$         | $2(1) + 1 = 3$ |
| $2$         | $2(2) + 1 = 5$ |

<details markdown="1">
<summary>Function Table</summary>
Type: table
Library: (markdown)
Bloom Level: Understand
Bloom Verb: Explain
Learning Objective: The learner will complete a function table by substituting input values into the function rule and computing the output.

Prerequisites: From Arithmetic to Algebra, Function Concept
Evidence of Mastery: The learner can given a function rule and a table of $x$-values, substitute each $x$ into the rule and compute the corresponding $f(x)$, and identify patterns in the outputs.
Misconceptions: The belief that the function rule applies only to the first row, or that the outputs are always integers.
Instructional Rationale: Function tables build fluency in evaluating functions and recognizing patterns, which prepares learners for graphing functions and working with sequences.
Content: The learner sees a blank function table for $f(x) = 2x + 1$ with five $x$-values filled in. The learner must compute the corresponding $f(x)$ values and fill in the table. Immediate feedback is provided after each entry.
Provenance: Adapted from common Algebra I curriculum materials
Rules: Each output is computed by substituting the $x$-value into the function rule $f(x) = 2x + 1$. The pattern of outputs should show a constant difference of 2 between consecutive $x$-values.
Learner Activity: [1] Look at the function table for $f(x) = 2x + 1$ with $x$-values $-2, -1, 0, 1, 2$. [2] Compute $f(x)$ for each $x$ by substituting into the function rule. [3] Enter each output value in the table. [4] Click "Check" to verify all five entries. [5] Identify the pattern in the outputs.
Feedback: [Correct] "Perfect! You completed the function table and identified the output pattern." [Incorrect] "Review: to complete the table for $f(x) = 2x + 1$, substitute each $x$-value into the function rule. For $x = -2$, $f(-2) = 2(-2) + 1 = -3$. For $x = -1$, $f(-1) = 2(-1) + 1 = -1$. Continue for the remaining values. Try again."
Starting State: The function table for $f(x) = 2x + 1$ is displayed with the five $x$-values and empty output cells.
Chapter Anchors: The learner will be able to complete a function table by substituting input values into the function rule and computing the output.
</details>

## 4. Systems of Linear Equations

**Interpret Function Graph** (already covered in Tier A above)

**Interpret Function Table** (already covered in Tier B above)

## 5. Review and Summary

In this chapter, you have learned the fundamental tools of algebraic modeling: understanding functions, computing and interpreting slope, writing equations in multiple forms, solving linear equations and inequalities, and graphing relationships. These skills form the foundation for all later work in algebra and beyond.

**Key formula summary:**

- Slope: $m = \frac{y_2 - y_1}{x_2 - x_1}$
- Slope-intercept form: $y = mx + b$
- Point-slope form: $y - y_1 = m(x - x_1)$
- Standard form: $Ax + By = C$

**Key concept summary:**

- A function assigns exactly one output to each input.
- The domain is the set of acceptable inputs; the range is the set of resulting outputs.
- Slope measures the rate of change of a line.
- Linear equations can be written in slope-intercept, point-slope, or standard form.
- Linear inequalities are solved like equations, with the sign reversal rule when multiplying or dividing by negatives.
- Absolute value equations and inequalities use the distance interpretation.
- Piecewise and step functions use different expressions on different intervals.

## Key Takeaways

1. Functions are the central concept of algebra—they describe how one quantity depends on another.
2. Slope is a rate of change; the slope-intercept form $y = mx + b$ makes graphing easy.
3. Point-slope form is useful when you know a slope and a point; standard form is useful for finding intercepts.
4. Linear inequalities solve like equations, but reverse the inequality sign when multiplying or dividing by negatives.
5. Absolute value equations split into two cases; inequalities use compound inequality forms.
6. Piecewise and step functions use different rules on different intervals.

## Chapter Review Exercises

1. Determine whether the following relations are functions: [practice problems]
2. Find the slope of the line passing through $(1, 2)$ and $(3, 8)$. 
3. Write the equation of the line with slope $4$ passing through $(-1, 3)$ in point-slope form, then convert to slope-intercept form.
4. Solve the equation $3x - 7 = 2x + 5$.
5. Solve the inequality $4 - 3x \leq 10$ and graph the solution on a number line.
6. Solve $|2x - 1| = 7$.
7. Graph the inequality $y \leq -x + 4$.
8. Evaluate the piecewise function $f(x) = \begin{cases} x^2 & \text{if } x < 1 \\ 2x + 1 & \text{if } x \geq 1 \end{cases}$ at $x = -1$, $x = 0$, and $x = 2$.
9. Complete the function table for $f(x) = -x + 3$ with $x = -2, -1, 0, 1, 2$.
10. Explain in your own words what the slope of a line tells you about the relationship between the $x$- and $y$-variables.

---

This chapter content has been generated using the Chapter Content Generator v1.11, which adapts content length and element richness to each concept's Concept Impact Score (CIS), ensuring foundational concepts receive comprehensive treatment while narrower concepts receive efficient, focused coverage.
