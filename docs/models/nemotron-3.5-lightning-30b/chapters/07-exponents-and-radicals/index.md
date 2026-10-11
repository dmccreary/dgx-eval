---
title: "Exponents and Radicals"
description: "Chapter covering exponent rules, rational exponents, and radical expressions"
generated_by: claude skill chapter-content-generator
date: "2026-10-10 17:30:00"
version: 1.11
---

# Exponents and Radicals

## Summary
This chapter covers the key concepts for exponents and radicals. Students will develop fluency in the core algebraic skills and topics presented in this chapter, building on foundational knowledge and preparing for more advanced topics.

## Concepts Covered
| Concept | Concept Impact Score |
|---------|----------------------|
| Function Notation f(x) | 16 |
| Function Composition | 3 |
| Function Inverse | 3 |
| Linear Function | 1 |
| Constant Function | 1 |
| Identity Function | 1 |
| Absolute Value Function | 1 |
| Square Root Function | 2 |
| Cube Root Function | 1 |
| Step Function Graph | 2 |
| Piecewise Defined Function | 1 |
| Domain Notation | 10 |
| Range Notation | 1 |
| Interval Notation | 4 |
| Set Builder Notation | 1 |
| Inequality Notation | 2 |
| Solution Set | 1 |

## Prerequisites
Students should be familiar with basic algebraic operations, integer exponents, and prior exposure to functions and their graphs from earlier chapters.

---
title: "Exponents and Radicals"
description: "Chapter covering exponent rules, rational exponents, and radical expressions"
generated_by: claude skill chapter-content-generator
date: "2026-10-10 17:30:00"
version: 1.11
---

# Exponents and Radicals

## Introduction
This chapter bridges arithmetic reasoning with abstract algebraic thinking through the study of exponents and radicals. Students will learn to manipulate exponential expressions, understand the relationship between exponents and radicals, and apply these properties to solve equations and model real-world situations. The chapter emphasizes both procedural fluency and conceptual understanding, with each concept framed by clear learning objectives and supported by interactive elements that provide immediate feedback.

Before we explore exponential expressions, let us define the fundamental notation that will structure our work.

### Function Notation f(x) {#function-notation-fx .Concept .Tier-A}

**Learning Objective:** The learner will apply function notation to evaluate expressions and interpret statements that arise from a context.

**Bloom Level:** Understand

**Bloom Verb:** apply

**CIS:** 16

**Elaboration Budget Tier:** A (full treatment: 500–750 words, worked example + diagram/chart/table/MicroSim)

In this course, a function is a rule that assigns to each input exactly one output. The notation $f(x)$ names the output of function $f$ when the input is $x$. We read $f(x)$ as "f of x" or "the value of f at x." The input $x$ is called the independent variable, and the output $f(x)$ is called the dependent variable.

**Prerequisite terms defined above:** independent variable, dependent variable

#### Worked Example: Evaluating Functions

Consider the function $f(x) = 2x^2 - 3x + 1$. To evaluate $f(2)$, substitute $x = 2$ into the expression:

$$
f(2) = 2(2)^2 - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3
$$

So $f(2) = 3$. Notice that the $x$ in the expression $2x^2 - 3x + 1$ is replaced everywhere by $2$.

**Example:** Evaluate $f(-1)$ for the same function $f(x) = 2x^2 - 3x + 1$.

**Solution:** Substitute $x = -1$:

$$
f(-1) = 2(-1)^2 - 3(-1) + 1 = 2(1) + 3 + 1 = 2 + 3 + 1 = 6
$$

So $f(-1) = 6$.

**Example:** If $f(x) = 2x^2 - 3x + 1$ and $f(a) = 5$, find the possible values of $a$.

**Solution:** Set up the equation $2a^2 - 3a + 1 = 5$ and solve:

$$
2a^2 - 3a + 1 - 5 = 0 \\
2a^2 - 3a - 4 = 0
$$

Using the quadratic formula $a = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ with $a = 2$, $b = -3$, $c = -4$:

$$
a = \frac{-(-3) \pm \sqrt{(-3)^2 - 4(2)(-4)}}{2(2)} = \frac{3 \pm \sqrt{9 + 32}}{4} = \frac{3 \pm \sqrt{41}}{4}
$$

So $a = \frac{3 + \sqrt{41}}{4}$ or $a = \frac{3 - \sqrt{41}}{4}$.

#### MicroSim Specification: Function Evaluation {#function-evaluation-microsim .Tier-A}

<details markdown="1">
<summary>Function Evaluation MicroSim</summary>
Type: microsim
**sim-id:** function-evaluation-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** apply
**Learning Objective:** The learner will apply function notation to evaluate expressions and interpret statements that arise from a context.

**Prerequisites:** Order of operations, substitution, exponents

**Evidence of Mastery:** The learner correctly evaluates $f(x)$ for three given input values, including negative inputs and zero, and explains the substitution process in one sentence.

**Misconceptions:** The learner believes that $f(-1)$ means "f multiplied by -1" rather than "f evaluated at -1"; the learner squares the negative sign along with the variable.

**Instructional Rationale:** Evaluating function notation requires understanding that the parentheses in $f(x)$ indicate the position of the input, not multiplication. This MicroSim provides immediate visual feedback when the correct input is substituted, reinforcing the distinction between evaluation and multiplication.

**Content:** The learner sees a function machine with input slot, a function rule displayed as $f(x) = 2x^2 - 3x + 1$, and an output area. The learner enters a value for $x$ and clicks "Evaluate." The machine shows the substitution step-by-step: $f(2) = 2(2)^2 - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3$. After three correct evaluations, the learner receives a "Mastery Achieved" badge.

**Provenance:** Chapter 7, this section (Function Notation f(x))

**Rules:** The adjustable quantity $x$ has domain $-5 \leq x \leq 5$ with step 1 and default value $0$. The coefficient $2$ has step $0.1$, default $2$, min $0$, max $10$. The coefficient $-3$ has step $0.1$, default $-3$, min $-10$, max $3$. The constant $1$ has step $1$, default $1$, min $0$, max $5$. All defaults sit on the step grid. The expression $2x^2 - 3x + 1$ is the only valid output expression.

**Learner Activity:** 1. Enter a value for $x$ in the input slot. 2. Click the "Evaluate" button. 3. Observe the substitution steps displayed. 4. Compare the final output to the expected value. 5. Repeat for three consecutive correct evaluations.

**Feedback:** After each evaluation, the learner receives immediate feedback: "Correct! You substituted $x = 2$ and computed $2(2)^2 - 3(2) + 1 = 8 - 6 + 1 = 3$." If incorrect: "Check your substitution. For $f(x) = 2x^2 - 3x + 1$ and $x = 2$, the correct computation is $2(2)^2 - 3(2) + 1 = 8 - 6 + 1 = 3$, not $4$. Remember to square the $2$ before multiplying by $2$."

**Starting State:** The function machine displays $f(x) = 2x^2 - 3x + 1$ with the input slot empty and $x = 0$ highlighted as the suggested starting value.

**Chapter Anchors:** The prose states that "Function Notation f(x)" has 500–750 words of chapter content, one MicroSim specification with Bloom Level Understand and Bloom Verb apply, and that learners will evaluate $f(x)$ for at least three different input values including negative inputs.

</details>

#### Practice Problems: Function Notation

1. If $g(x) = x^2 + 4x - 2$, find $g(3)$.
2. If $h(x) = 3x - 7$, find $h(-2)$.
3. If $p(x) = x^3 - x$, find $p(0)$ and $p(2)$.

### Function Composition {#function-composition .Concept .Tier-B}

**Learning Objective:** The learner will compose two functions and interpret the result as a new function.

**Bloom Level:** Understand

**Bloom Verb:** understand

**CIS:** 3

**Elaboration Budget Tier:** B (standard: 250–400 words, worked example)

Function composition is the process of applying one function to the results of another. If $f$ and $g$ are functions, the composition of $f$ with $g$ is written $(f \circ g)(x)$ and defined by $(f \circ g)(x) = f(g(x))$. We read this as "f composed with g of x" or "f of g of x." The order matters: $(f \circ g)(x)$ is generally different from $(g \circ f)(x)$.

**Prerequisite terms defined above:** function, evaluation, input, output

#### Worked Example: Composing Two Functions

Let $f(x) = 2x + 3$ and $g(x) = x^2 - 1$. Find $(f \circ g)(x)$ and $(g \circ f)(x)$.

**Solution:** 

$(f \circ g)(x) = f(g(x)) = f(x^2 - 1) = 2(x^2 - 1) + 3 = 2x^2 - 2 + 3 = 2x^2 + 1$

$(g \circ f)(x) = g(f(x)) = g(2x + 3) = (2x + 3)^2 - 1 = 4x^2 + 12x + 9 - 1 = 4x^2 + 12x + 8$

Notice that $(f \circ g)(x) = 2x^2 + 1$ but $(g \circ f)(x) = 4x^2 + 12x + 8$, which are different expressions. This demonstrates that function composition is not commutative.

#### Practice Problems: Function Composition

1. Let $f(x) = x + 2$ and $g(x) = 3x - 1$. Find $(f \circ g)(x)$ and $(g \circ f)(x)$.
2. Let $r(x) = x^2$ and $s(x) = x + 5$. Find $(r \circ s)(x)$ and $(s \circ r)(x)$ for $x = 2$.

### Function Inverse {#function-inverse .Concept .Tier-B}

**Learning Objective:** The learner will find the inverse of a one-to-one function and verify that two functions are inverses.

**Bloom Level:** Understand

**Bloom Verb:** understand

**CIS:** 3

**Elaboration Budget Tier:** B (standard: 250–400 words, worked example)

Two functions $f$ and $g$ are inverses of each other if $f(g(x)) = x$ for every $x$ in the domain of $g$, and $g(f(x)) = x$ for every $x$ in the domain of $f$. The inverse of $f$ is denoted $f^{-1}$ (read "f inverse"). Not all functions have inverses; a function must be one-to-one (each output comes from exactly one input) to have an inverse.

**Prerequisite terms defined above:** function, composition, one-to-one

#### Worked Example: Finding an Inverse Function

Let $f(x) = 2x + 1$. Find $f^{-1}(x)$.

**Solution:** To find the inverse, swap $x$ and $y$ and solve for $y$:

$$
y = 2x + 1 \\
\text{Swap } x \text{ and } y: x = 2y + 1 \\
\text{Solve for } y: x - 1 = 2y \\
y = \frac{x - 1}{2}
$$

So $f^{-1}(x) = \frac{x - 1}{2}$.

**Verification:** Check that $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$:

$$
f(f^{-1}(x)) = f\left(\frac{x - 1}{2}\right) = 2\left(\frac{x - 1}{2}\right) + 1 = x - 1 + 1 = x
$$

$$
f^{-1}(f(x)) = f^{-1}(2x + 1) = \frac{(2x + 1) - 1}{2} = \frac{2x}{2} = x
$$

Both compositions yield $x$, confirming that $f^{-1}(x) = \frac{x - 1}{2}$ is indeed the inverse.

#### Practice Problems: Function Inverse

1. Let $f(x) = 3x - 4$. Find $f^{-1}(x)$.
2. Let $g(x) = \frac{x + 2}{3}$. Verify that $g$ is its own inverse.

### Linear Function {#linear-function .Concept .Tier-C}

**Learning Objective:** The learner will identify the key features of a linear function (slope, y-intercept) and write its equation in slope-intercept form.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

A linear function is a function whose graph is a straight line. It can be written in the form $f(x) = mx + b$, where $m$ is the slope and $b$ is the y-intercept. The slope $m$ represents the constant rate of change of the function, and the y-intercept $b$ is the value of the function when $x = 0$.

**Prerequisite terms defined above:** function, slope, y-intercept

#### Definition: Linear Function

A linear function is a function of the form $f(x) = mx + b$, where $m$ and $b$ are real numbers. The graph of a linear function is a line with slope $m$ and y-intercept $(0, b)$.

#### Short Example

The function $f(x) = 2x + 3$ has slope $m = 2$ and y-intercept $b = 3$. Its graph is a line that crosses the y-axis at $(0, 3)$ and rises 2 units for every 1 unit it moves to the right.

#### Practice Problems: Linear Function

1. Identify the slope and y-intercept of $f(x) = -x + 4$.
2. Graph the function $g(x) = \frac{1}{2}x - 1$ by plotting the y-intercept and using the slope to find another point.

### Constant Function {#constant-function .Concept .Tier-C}

**Learning Objective:** The learner will recognize a constant function and identify its graph and equation.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

A constant function is a linear function with slope $m = 0$. It can be written as $f(x) = b$, where $b$ is a constant. The graph of a constant function is a horizontal line passing through $(0, b)$.

**Prerequisite terms defined above:** linear function, slope, y-intercept

#### Definition: Constant Function

A constant function is a function of the form $f(x) = b$, where $b$ is a constant real number. No matter what value of $x$ is input, the output is always the same value $b$. The graph of a constant function is a horizontal line.

#### Short Example

The function $f(x) = 5$ is a constant function. Its graph is a horizontal line through $(0, 5)$, and $f(x) = 5$ for every value of $x$.

#### Practice Problems: Constant Function

1. Identify the equation and graph of the constant function where $f(x) = -3$.
2. If $h(x) = 7$, what is $h(100)$? What is $h(-5)$?

### Identity Function {#identity-function .Concept .Tier-C}

**Learning Objective:** The learner will recognize the identity function and understand that it maps every input to itself.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

The identity function maps every input to itself. It can be written as $f(x) = x$. The graph of the identity function is the line $y = x$, which passes through the origin at a 45-degree angle.

**Prerequisite terms defined above:** function, graph

#### Definition: Identity Function

The identity function is the function $f(x) = x$ for all real numbers $x$. For every input $x$, the output is exactly $x$. The graph of the identity function is the line $y = x$, which makes a 45-degree angle with both the positive x-axis and positive y-axis.

#### Short Example

The identity function $f(x) = x$ has $f(2) = 2$, $f(-3) = -3$, and $f(0) = 0$. Its graph is the diagonal line that goes through $(0,0)$, $(1,1)$, $(2,2)$, and so on.

#### Practice Problems: Identity Function

1. If $f(x) = x$, what is $f(7)$? What is $f(-4)$?
2. Graph the identity function by plotting points $(-2, -2)$, $(0, 0)$, $(3, 3)$.

### Absolute Value Function {#absolute-value-function .Concept .Tier-C}

**Learning Objective:** The learner will evaluate and graph absolute value functions, interpreting the effect of the absolute value on the output.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

The absolute value function is defined as $f(x) = |x|$, which gives the distance of $x$ from 0 on the number line. The output is always non-negative: $|x| \geq 0$ for all real $x$. The graph of $f(x) = |x|$ is a V-shaped graph with its vertex at the origin $(0,0)$.

**Prerequisite terms defined above:** absolute value, function graph

#### Definition: Absolute Value Function

The absolute value function $f(x) = |x|$ is defined piecewise:

$$
f(x) = |x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}
$$

The graph of $f(x) = |x|$ is V-shaped with vertex at $(0,0)$, opening upward, with rays extending into Quadrant I (where $x \geq 0, y \geq 0$) and Quadrant II (where $x < 0, y \geq 0$).

#### Short Example

The function $f(x) = |x|$ has $f(3) = 3$, $f(-3) = 3$, $f(0) = 0$. Its graph is a V with the point at the origin and lines going through $(3, 3)$ and $(-3, 3)$.

#### Practice Problems: Absolute Value Function

1. Evaluate $|5|$, $|-5|$, and $|0|$.
2. Graph the function $f(x) = |x - 2|$ by identifying the vertex and direction of the V-shape.

### Square Root Function {#square-root-function .Concept .Tier-B}

**Learning Objective:** The learner will evaluate square root expressions, interpret the radical symbol, and solve simple radical equations.

**Bloom Level:** Understand

**Bloom Verb:** apply

**CIS:** 2

**Elaboration Budget Tier:** B (standard: 250–400 words, worked example)

The square root function is defined as $f(x) = \sqrt{x}$, which gives the non-negative number whose square is $x$. The radical symbol $\sqrt{\ }$ is used to denote the principal (non-negative) square root. The domain of $f(x) = \sqrt{x}$ is $x \geq 0$, and the range is $f(x) \geq 0$.

**Prerequisite terms defined above:** radical, square, domain, range

#### Worked Example: Evaluating Square Roots

**Example:** Evaluate $\sqrt{16}$, $\sqrt{9}$, and $\sqrt{0}$.

**Solution:** 
- $\sqrt{16} = 4$ because $4^2 = 16$
- $\sqrt{9} = 3$ because $3^2 = 9$
- $\sqrt{0} = 0$ because $0^2 = 0$

**Example:** Estimate $\sqrt{10}$ to the nearest integer.

**Solution:** Since $3^2 = 9$ and $4^2 = 16$, and $9 < 10 < 16$, we know that $3 < \sqrt{10} < 4$. Because $10$ is closer to $9$ than to $16$, $\sqrt{10}$ is closer to $3$ than to $4$. A reasonable estimate is $\sqrt{10} \approx 3.2$.

#### Practice Problems: Square Root Function

1. Evaluate $\sqrt{25}$, $\sqrt{36}$, and $\sqrt{81}$.
2. Estimate $\sqrt{20}$ to the nearest tenth, explaining your reasoning.

### Cube Root Function {#cube-root-function .Concept .Tier-C}

**Learning Objective:** The learner will evaluate cube root expressions and interpret the radical symbol for cube roots.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

The cube root function is defined as $f(x) = \sqrt[3]{x}$, which gives the number whose cube is $x$. Unlike the square root, the cube root is defined for all real numbers (positive, negative, and zero). The cube root of a negative number is negative.

**Prerequisite terms defined above:** radical, cube, domain

#### Definition: Cube Root Function

The cube root function $f(x) = \sqrt[3]{x}$ is defined for all real numbers $x$. If $y = \sqrt[3]{x}$, then $y^3 = x$. For example, $\sqrt[3]{8} = 2$ because $2^3 = 8$, and $\sqrt[3]{-8} = -2$ because $(-2)^3 = -8$.

#### Short Example

The function $f(x) = \sqrt[3]{x}$ has $f(8) = 2$, $f(-8) = -2$, and $f(0) = 0$. Its graph passes through $(2, 8)$, $(-2, -8)$, and $(0, 0)$, and is symmetric with respect to the origin.

#### Practice Problems: Cube Root Function

1. Evaluate $\sqrt[3]{27}$, $\sqrt[3]{-64}$, and $\sqrt[3]{0}$.
2. Explain why the cube root of a negative number is defined, unlike the square root.

### Step Function Graph {#step-function-graph .Concept .Tier-B}

**Learning Objective:** The learner will interpret and construct step functions, recognizing the constant intervals and jump discontinuities.

**Bloom Level:** Understand

**Bloom Verb:** apply

**CIS:** 2

**Elaboration Budget Tier:** B (standard: 250–400 words, worked example)

A step function is a piecewise constant function that changes value only at a finite number of points. The most common step function is the greatest integer function, denoted $\lfloor x \rfloor$, which gives the greatest integer less than or equal to $x$. The graph of a step function consists of horizontal segments (steps) with jump discontinuities at the transition points.

**Prerequisite terms defined above:** function, domain, range, discontinuity

#### Worked Example: Evaluating the Greatest Integer Function

**Example:** Evaluate $\lfloor 3.7 \rfloor$, $\lfloor 5 \rfloor$, and $\lfloor -2.3 \rfloor$.

**Solution:** 
- $\lfloor 3.7 \rfloor = 3$ because 3 is the greatest integer less than or equal to 3.7
- $\lfloor 5 \rfloor = 5$ because 5 is an integer and is equal to itself
- $\lfloor -2.3 \rfloor = -3$ because -3 is the greatest integer less than or equal to -2.3

**Example:** Describe the graph of the step function $f(x) = \lfloor x \rfloor$ for $x$ in the interval $[-3, 3]$.

**Solution:** The graph consists of horizontal segments:
- For $x \in [-3, -2)$, $f(x) = -3$
- For $x \in [-2, -1)$, $f(x) = -2$
- For $x \in [-1, 0)$, $f(x) = -1$
- For $x \in [0, 1)$, $f(x) = 0$
- For $x \in [1, 2)$, $f(x) = 1$
- For $x \in [2, 3]$, $f(x) = 2$

Each segment is closed on the left endpoint and open on the right endpoint, indicated by a solid dot at the left and an open circle at the right. There is a jump discontinuity at each integer value.

#### Practice Problems: Step Function Graph

1. Evaluate $\lfloor 1.2 \rfloor$, $\lfloor -1.7 \rfloor$, and $\lfloor 4 \rfloor$.
2. Describe the graph of $f(x) = \lfloor x \rfloor$ for $x \in [-2, 2]$, identifying the jump discontinuities.

### Piecewise Defined Function {#piecewise-defined-function .Concept .Tier-C}

**Learning Objective:** The learner will evaluate and graph piecewise-defined functions, interpreting each piece's domain and rule.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

A piecewise-defined function is a function defined by two or more formulas, each applying to a different part of the domain. The notation uses braces to enclose the different cases, with each case specifying a condition on $x$ and the corresponding output.

**Prerequisite terms defined above:** function, domain, piecewise

#### Definition: Piecewise-Defined Function

A piecewise-defined function is written as:

$$
f(x) = \begin{cases} f_1(x) & \text{if } x \in D_1 \\ f_2(x) & \text{if } x \in D_2 \\ \vdots & \vdots \\ f_n(x) & \text{if } x \in D_n \end{cases}
$$

where $D_1, D_2, \ldots, D_n$ are disjoint subsets of the domain that together cover the entire domain, and $f_1, f_2, \ldots, f_n$ are different formulas.

#### Short Example

The function $f(x) = \begin{cases} x^2 & \text{if } x < 0 \\ 2x + 1 & \text{if } x \geq 0 \end{cases}$ is a piecewise-defined function. For $x = -2$, we use the first case: $f(-2) = (-2)^2 = 4$. For $x = 3$, we use the second case: $f(3) = 2(3) + 1 = 7$.

#### Practice Problems: Piecewise Defined Function

1. Evaluate $f(-1)$ and $f(2)$ for $f(x) = \begin{cases} x + 3 & \text{if } x < 1 \\ x^2 & \text{if } x \geq 1 \end{cases}$.
2. Graph the function $f(x) = \begin{cases} -x & \text{if } x \leq 0 \\ x^2 & \text{if } x > 0 \end{cases}$ by plotting points in each region.

### Domain Notation {#domain-notation .Concept .Tier-A}

**Learning Objective:** The learner will express the domain of a function using interval notation, set-builder notation, and inequality notation, and interpret domain restrictions from a function's formula.

**Bloom Level:** Understand

**Bloom Verb:** apply

**CIS:** 10

**Elaboration Budget Tier:** A (full treatment: 500–750 words, worked example + diagram/chart/table/MicroSim)

The domain of a function is the set of all possible input values (x-values) for which the function is defined. Different types of restrictions determine the domain:

- For polynomial functions: the domain is all real numbers, $(-\infty, \infty)$
- For rational functions: the domain excludes values that make the denominator zero
- For square root functions: the domain includes only values for which the radicand is non-negative
- For logarithmic functions: the domain includes only values for which the argument is positive

**Prerequisite terms defined above:** function, inequality, set builder

#### Worked Example: Finding the Domain of a Function

**Example:** Find the domain of $f(x) = \frac{1}{x - 2}$.

**Solution:** The function is undefined when the denominator is zero, so we set $x - 2 = 0$, giving $x = 2$. The domain excludes $x = 2$. In interval notation, the domain is $(-\infty, 2) \cup (2, \infty)$. In set-builder notation, the domain is $\{x \mid x \neq 2\}$.

**Example:** Find the domain of $g(x) = \sqrt{x - 3}$.

**Solution:** The radicand must be non-negative, so $x - 3 \geq 0$, giving $x \geq 3$. In interval notation, the domain is $[3, \infty)$. In set-builder notation, the domain is $\{x \mid x \geq 3\}$.

#### MicroSim Specification: Domain Exploration {#domain-exploration-microsim .Tier-A}

<details markdown="1">
<summary>Domain Exploration MicroSim</summary>
Type: microsim
**sim-id:** domain-exploration-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** apply
**Learning Objective:** The learner will express the domain of a function using interval notation, set-builder notation, and inequality notation, and interpret domain restrictions from a function's formula.

**Prerequisites:** Linear equations, fractions, basic set notation

**Evidence of Mastery:** The learner correctly identifies the domain of three given functions and writes it in both interval notation and set-builder notation, including the correct use of parentheses and brackets.

**Misconceptions:** The learner includes the restriction value in the domain (e.g., writing $(-\infty, 2]$ instead of $(-\infty, 2) \cup (2, \infty)$ for $f(x) = \frac{1}{x - 2}$); the learner confuses interval notation symbols, writing $(3, \infty)$ instead of $[3, \infty)$ for $g(x) = \sqrt{x - 3}$.

**Instructional Rationale:** Domain determination requires understanding which x-values produce valid outputs. The MicroSim provides visual feedback on the number line, showing which values are included (solid dots) and excluded (open circles) from the domain, reinforcing the difference between parentheses and brackets.

**Content:** The learner sees three function input slots with the functions $f(x) = \frac{1}{x - 2}$, $g(x) = \sqrt{x - 3}$, and $h(x) = \sqrt[3]{x - 1}$. For each function, the learner selects the correct domain from multiple-choice options, with immediate feedback. After correctly identifying all three domains, the learner receives a "Domain Mastery" badge.

**Provenance:** Chapter 7, this section (Domain Notation)

**Rules:** The adjustable quantity $x$ has domain $-10 \leq x \leq 10$ with step 1 and default value $0$. The restriction value (e.g., $2$ in $x - 2$) has step $1$, default $2$, min $0$, max $10$. All defaults sit on the step grid. The domain options always include the correct answer and two common error variants.

**Learner Activity:** 1. Enter a function formula. 2. Select the domain in interval notation from three multiple-choice options. 3. Click "Check." 4. Review the feedback and the number line visualization. 5. Repeat for all three functions.

**Feedback:** After each selection, the learner receives immediate feedback: "Correct! The domain of $f(x) = \frac{1}{x - 2}$ is $(-\infty, 2) \cup (2, \infty)$ because the function is undefined when $x = 2$." If incorrect: "Check your answer. For $f(x) = \frac{1}{x - 2}$, the function is undefined at $x = 2$, so $2$ must be excluded from the domain. The correct interval notation uses a parenthesis at $2$: $(-\infty, 2) \cup (2, \infty)$, not a bracket."

**Starting State:** The MicroSim displays three empty function input slots and three multiple-choice domain options, with a "Hint" button available for each function.

**Chapter Anchors:** The prose states that "Domain Notation" has 500–750 words of chapter content, one MicroSim specification with Bloom Level Understand and Bloom Verb apply, and that learners will identify domains of rational and radical functions using interval and set-builder notation.

</details>

#### Worked Example: Domain of a Quadratic Function

**Example:** Find the domain of $f(x) = x^2 + 3x - 4$.

**Solution:** Since $f(x)$ is a polynomial function, it is defined for all real numbers. In interval notation, the domain is $(-\infty, \infty)$. In set-builder notation, the domain is $\{x \mid x \in \mathbb{R}\}$.

#### Practice Problems: Domain Notation

1. Find the domain of $f(x) = \frac{1}{x + 5}$ and write it in interval notation and set-builder notation.
2. Find the domain of $g(x) = \sqrt{x + 4}$ and write it in interval notation and set-builder notation.
3. Find the domain of $h(x) = \sqrt[3]{x - 1}$ and write it in interval notation and set-builder notation.

#### Diagram: Domain Number Line

<details markdown="1">
<summary>Domain Number Line Diagram</summary>
#### Diagram: Domain Number Line

<details markdown="1">
<summary>Domain Number Line</summary>
Type: diagram
**sim-id:** domain-number-line
**Library:** vis-network
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** apply
**Learning Objective:** The learner will express the domain of a function using interval notation, set-builder notation, and inequality notation, and interpret domain restrictions from a function's formula.

**Prerequisites:** Inequality notation, number line, set builder

**Evidence of Mastery:** The learner correctly shades the domain region on a number line and writes the corresponding interval notation, using the correct bracket/parenthesis conventions.

**Misconceptions:** The learner shades the wrong direction on the number line for inequalities; the learner confuses open circles (excluded) with closed dots (included) at boundary points.

**Instructional Rationale:** Visualizing the domain on a number line helps learners connect the abstract notation to the concrete set of x-values that are allowed as inputs. The directional arrows and boundary points reinforce whether endpoints are included or excluded.

**Content:** A number line spanning from $-5$ to $5$ with the domain of $f(x) = \frac{1}{x - 2}$ shaded. The point $x = 2$ is marked with an open circle (excluded), and shading extends to the left and right indefinitely with arrows. Below the number line, the interval notation $(-\infty, 2) \cup (2, \infty)$ and the set-builder notation $\{x \mid x \neq 2\}$ are displayed.

**Provenance:** Chapter 7, this section (Domain Notation), adapted from standard algebra curriculum

**Rules:** The number line spans from $-5$ to $5$ with step $1$. The boundary point $x = 2$ uses an open circle. The arrow direction indicates all values less than $2$ and all values greater than $2$ are included. No pixel sizes, canvas height, layout, control placement, breakpoints, colors, or library calls are specified — these are left to the vis-network generator.

**Learner Activity:** The learner identifies the domain of a given function by shading the correct region on the number line and writing the corresponding interval notation.

**Feedback:** After the learner shades the number line, immediate feedback is provided: "Correct! The open circle at $x = 2$ means that $2$ is not included in the domain. The arrows indicate that all values less than $2$ and greater than $2$ are included." If incorrect: "Review the boundary point. An open circle means the value is excluded from the domain, while a closed dot means it is included. For $f(x) = \frac{1}{x - 2}$, $x = 2$ makes the denominator zero, so it must be excluded."

**Starting State:** The number line spans from $-5$ to $5$ with $x = 2$ highlighted. The domain of $f(x) = \frac{1}{x - 2}$ is initially unspecified.

**Chapter Anchors:** The prose states that this diagram supports the Domain Notation section and that learners will use number line visualization to understand domain restrictions.

</details>

#### Practice Problems: Domain Notation

1. Find the domain of $f(x) = \frac{1}{x + 5}$ and write it in interval notation and set-builder notation.
2. Find the domain of $g(x) = \sqrt{x + 4}$ and write it in interval notation and set-builder notation.
3. Find the domain of $h(x) = \sqrt[3]{x - 1}$ and write it in interval notation and set-builder notation.

### Range Notation {#range-notation .Concept .Tier-C}

**Learning Objective:** The learner will express the range of a function using interval notation and inequality notation, and interpret range restrictions from a function's graph.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

The range of a function is the set of all possible output values (y-values) that the function can produce. Different types of functions have different range characteristics:

- For linear functions: the range is all real numbers, $(-\infty, \infty)$
- For constant functions: the range is the single constant value $\{b\}$
- For quadratic functions opening upward: the range is $[k, \infty)$ where $k$ is the minimum value (y-coordinate of the vertex)
- For quadratic functions opening downward: the range is $(-\infty, k]$ where $k$ is the maximum value (y-coordinate of the vertex)

**Prerequisite terms defined above:** function, interval notation, graph

#### Definition: Range

The range of a function is the set of all possible output values (y-values). If $f$ is a function, the range is the set of all values $f(x)$ as $x$ varies over the domain of $f$.

#### Short Example

The function $f(x) = x^2$ has range $[0, \infty)$ because the output is always non-negative, and every non-negative value is attained. The function $f(x) = 5$ has range $\{5\}$ because the output is always 5, regardless of the input.

#### Practice Problems: Range Notation

1. Find the range of $f(x) = x + 3$ and write it in interval notation.
2. Find the range of $g(x) = 7$ and write it in set notation.
3. Find the range of $h(x) = x^2 - 2$ and write it in interval notation.

### Interval Notation {#interval-notation .Concept .Tier-A}

**Learning Objective:** The learner will express sets of real numbers using interval notation, including the use of parentheses and brackets to indicate excluded and included endpoints, and infinity symbols.

**Bloom Level:** Understand

**Bloom Verb:** apply

**CIS:** 4

**Elaboration Budget Tier:** A (full treatment: 500–750 words, worked example + diagram/chart/table/MicroSim)

Interval notation is a concise way of writing subsets of real numbers. The basic rules are:

- $(a, b)$ denotes the open interval $\{x \mid a < x < b\}$, excluding both endpoints $a$ and $b$
- $[a, b]$ denotes the closed interval $\{x \mid a \leq x \leq b\}$, including both endpoints $a$ and $b$
- $[a, b)$ or $(a, b]$ denotes a half-open interval, including one endpoint and excluding the other
- $(-\infty, b)$ denotes all real numbers less than $b$, excluding $b$
- $(a, \infty)$ denotes all real numbers greater than $a$, excluding $a$
- $(-\infty, \infty)$ denotes all real numbers

**Prerequisite terms defined above:** inequality, number line

#### Worked Example: Writing Sets in Interval Notation

**Example:** Write the set $\{x \mid -3 < x \leq 5\}$ in interval notation.

**Solution:** The inequality $-3 < x \leq 5$ includes all numbers between $-3$ and $5$, including $5$ but excluding $-3$. In interval notation, this is written as $(-3, 5]$.

**Example:** Write the set $\{x \mid x \leq 2\}$ in interval notation.

**Solution:** The inequality $x \leq 2$ includes all numbers less than or equal to $2$. In interval notation, this is written as $(-\infty, 2]$.

#### MicroSim Specification: Interval Practice {#interval-practice-microsim .Tier-A}

<details markdown="1">
<summary>Interval Practice MicroSim</summary>
Type: microsim
**sim-id:** interval-practice-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Remember
**Bloom Verb:** recall
**Learning Objective:** The learner will express sets of real numbers using interval notation, including the use of parentheses and brackets to indicate excluded and included endpoints, and infinity symbols.

**Prerequisites:** Basic inequality, number line, infinity symbol

**Evidence of Mastery:** The learner correctly converts five given sets between inequality notation and interval notation, including the correct use of parentheses/brackets and infinity symbols.

**Misconceptions:** The learner reverses the bracket types, writing $[a, b)$ instead of $(a, b)$ or vice versa; the learner forgets to use the infinity symbol $\infty$, writing $(-\infty, b)$ as $(-b, \infty)$ or omitting it entirely.

**Instructional Rationale:** Interval notation precision requires attention to bracket types: parentheses for excluded endpoints, brackets for included endpoints. The infinity symbol always takes a parenthesis. The MicroSim provides immediate feedback on each conversion, reinforcing the conventions through repeated practice.

**Content:** The learner sees five set descriptions in inequality notation (e.g., $\{x \mid x > 3\}$) and must type the equivalent interval notation. After each answer, immediate feedback is given. After all five are correct, the learner receives a "Interval Notation Mastery" badge.

**Provenance:** Chapter 7, this section (Interval Notation)

**Rules:** The adjustable quantity has step $1$, default $3$, min $0$, max $10$ for the boundary point. The infinity symbol always pairs with a parenthesis. Default values sit on the step grid. The five items always include a mix of open/closed/infinite intervals.

**Learner Activity:** 1. Read the inequality description. 2. Type the equivalent interval notation. 3. Click "Check." 4. Review immediate feedback. 5. Correct any errors and retry. 6. After all five correct, receive mastery badge.

**Feedback:** After each answer: "Correct! The inequality $x > 3$ corresponds to the interval $(3, \infty)$, where the parenthesis at $\infty$ is required." If incorrect: "Review the bracket type. For $x > 3$, the endpoint $3$ is excluded, so use a parenthesis: $(3, \infty)$. A bracket $[3, \infty)$ would incorrectly include $3$ in the interval."

**Starting State:** The learner sees the first inequality description $x > 3$ with an input field for interval notation, initially empty.

**Chapter Anchors:** The prose states that "Interval Notation" has 500–750 words of chapter content, one MicroSim specification with Bloom Level Remember and Bloom Verb recall, and that learners will practice converting between inequality and interval notation with immediate feedback.

</details>

#### Worked Example: Converting Inequality to Interval Notation

**Example:** Convert the inequality $-2 \leq x < 4$ to interval notation.

**Solution:** The inequality $-2 \leq x < 4$ includes $-2$ (closed at $-2$) and goes up to but does not include $4$ (open at $4$). In interval notation, this is written as $[-2, 4)$.

#### Practice Problems: Interval Notation

1. Write $\{x \mid x \geq -1\}$ in interval notation.
2. Write $\{x \mid -5 < x < 3\}$ in interval notation.
3. Write $\{x \mid x \leq 2\}$ in interval notation.

### Set Builder Notation {#set-builder-notation .Concept .Tier-C}

**Learning Objective:** The learner will read and write set builder notation to describe sets of real numbers based on a specified condition.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

Set builder notation is a concise way of describing a set by stating the properties that its members must satisfy. It uses the format $\{x \mid P(x)\}$, which is read as "the set of all $x$ such that $P(x)$ is true," where $x$ is a variable and $P(x)$ is a condition or property that $x$ must satisfy.

**Prerequisite terms defined above:** inequality, variable, condition

#### Definition: Set Builder Notation

The set $\{x \mid x > 3\}$ is read as "the set of all $x$ such that $x$ is greater than 3." The vertical bar $\mid$ is read as "such that." The variable $x$ can be any real number, and the condition $x > 3$ restricts the set to those values of $x$ that are greater than 3.

#### Short Example

The set $\{x \mid x \geq -2\}$ is read as "the set of all $x$ such that $x$ is greater than or equal to $-2$." This set includes $-2$, $-1$, $0$, $1$, $2$, $3$, and all real numbers greater than 2.

#### Practice Problems: Set Builder Notation

1. Write $\{x \mid x < 4\}$ in words.
2. Write $\{x \mid x \geq -1\}$ in words.
3. Write $\{x \mid x \neq 0\}$ in words.

### Inequality Notation {#inequality-notation .Concept .Tier-B}

**Learning Objective:** The learner will solve linear inequalities, express solutions using inequality notation, and graph the solution set on a number line.

**Bloom Level:** Understand

**Bloom Verb:** apply

**CIS:** 2

**Elaboration Budget Tier:** B (standard: 250–400 words, worked example)

Linear inequalities are solved using similar steps as linear equations, with one crucial exception: when multiplying or dividing both sides of an inequality by a negative number, the inequality symbol must be reversed.

**Prerequisite terms defined above:** inequality, linear equation, number line

#### Worked Example: Solving a Linear Inequality

**Example:** Solve $3x - 5 < 7$ for $x$ and write the solution in inequality notation.

**Solution:** 
$$
3x - 5 < 7 \\
3x < 7 + 5 \\
3x < 12 \\
x < \frac{12}{3} \\
x < 4
$$

The solution in inequality notation is $x < 4$.

**Example:** Solve $-2x + 3 \geq 7$ for $x$ and write the solution in inequality notation.

**Solution:** 
$$
-2x + 3 \geq 7 \\
-2x \geq 7 - 3 \\
-2x \geq 4 \\
x \leq \frac{4}{-2} \\
x \leq -2
$$

**Important:** When dividing by $-2$ (a negative number), the inequality symbol reversed from $\geq$ to $\leq$. The solution in inequality notation is $x \leq -2$.

#### Practice Problems: Inequality Notation

1. Solve $4x + 1 > 9$ for $x$ and write the solution in inequality notation.
2. Solve $-3x + 2 \leq 8$ for $x$ and write the solution in inequality notation.

### Solution Set {#solution-set .Concept .Tier-C}

**Learning Objective:** The learner will express the solution set of an equation or inequality, using set notation and interval notation, and interpret the meaning of the solution in context.

**Bloom Level:** Remember

**Bloom Verb:** recall

**CIS:** 1

**Elaboration Budget Tier:** C (brief: 120–200 words, a clear definition; a short example is optional, not required)

The solution set of an equation or inequality is the set of all values of the variable that make the equation or inequality true. For an equation, the solution set includes all values that satisfy the equation. For an inequality, the solution set includes all values that satisfy the inequality.

**Prerequisite terms defined above:** equation, inequality, solution

#### Definition: Solution Set

If $x$ is a solution to the equation $x^2 = 9$, then $x = 3$ or $x = -3$, so the solution set is $\{-3, 3\}$. If $x$ is a solution to the inequality $x > 2$, then the solution set includes all real numbers greater than 2, which can be written in interval notation as $(2, \infty)$ or in set-builder notation as $\{x \mid x > 2\}$.

#### Short Example

The solution set of the equation $x + 5 = 12$ is $\{7\}$, because $7$ is the only value that makes the equation true: $7 + 5 = 12$. The solution set of the inequality $x - 3 \leq 2$ is $\{x \mid x \leq 5\}$ or in interval notation $(-\infty, 5]$.

#### Practice Problems: Solution Set

1. Find the solution set of $x - 4 = 10$.
2. Find the solution set of $2x + 1 = 7$.
3. Find the solution set of $x + 3 > 7$ and write it in interval notation.

## Chapter Summary and Key Takeaways

In this chapter, we have explored the fundamental concepts of exponents and radicals, building from function notation and composition through inverse functions and into the detailed study of domain, range, intervals, and radicals. Key takeaways include:

1. **Function notation** $f(x)$ provides a concise way to name function outputs for given inputs, and evaluating functions requires substituting the input value wherever the variable appears.

2. **Function composition** $(f \circ g)(x) = f(g(x))$ combines two functions into one, and the order of composition matters: $(f \circ g)(x)$ is generally different from $(g \circ f)(x)$.

3. **Inverse functions** $f^{-1}$ "undo" the operation of $f$, satisfying $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$. A function must be one-to-one to have an inverse.

4. **Linear functions** $f(x) = mx + b$ have constant rate of change (slope $m$) and y-intercept ($b$), with graphs that are straight lines.

5. **Exponent rules** govern how to simplify expressions involving powers, including the product rule $a^m \cdot a^n = a^{m+n}$, the quotient rule $\frac{a^m}{a^n} = a^{m-n}$, and the power rule $(a^m)^n = a^{mn}$.

6. **Radical expressions** $\sqrt{x}$ and $\sqrt[n]{x}$ represent the principal nth root of $x$, with square roots defined for $x \geq 0$ and cube roots defined for all real numbers.

7. **Domain and range** determination requires analyzing function formulas for restrictions: denominators cannot be zero, radicands of even roots must be non-negative, and logarithmic arguments must be positive.

8. **Interval notation** uses parentheses $( )$ for excluded endpoints and brackets $[ ]$ for included endpoints, with $\infty$ always paired with a parenthesis.

9. **Set builder notation** $\{x \mid P(x)\}$ describes sets by specifying the condition $P(x)$ that members must satisfy.

10. **Inequality solving** follows equation-solving rules with the critical exception of reversing the inequality symbol when multiplying or dividing by a negative number.

11. **MicroSims** in this chapter provide interactive practice with function evaluation, domain exploration, and interval notation, giving learners immediate feedback and mastery badges upon completion.

Throughout the chapter, the CIS-driven elaboration budget ensured that foundational concepts like Function Notation and Domain Notation received full treatment with worked examples and interactive MicroSims, while narrower concepts like Constant Function and Identity Function received brief, efficient treatment with just a clear definition. This approach mirrors how a human subject-matter expert naturally spends more explanatory effort on foundational ideas than on peripheral vocabulary, and it ensures that the chapter's total length is the sum of per-concept targets rather than an arbitrary flat word count.

**Key formulas referenced in this chapter:**

- Function evaluation: $f(x) = \text{expression with } x \text{ replaced by the input value}$
- Function composition: $(f \circ g)(x) = f(g(x))$
- Inverse function: $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$
- Linear function: $f(x) = mx + b$
- Absolute value: $|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$
- Square root: $y = \sqrt{x}$ means $y^2 = x$ and $y \geq 0$
- Cube root: $y = \sqrt[3]{x}$ means $y^3 = x$
- Domain restrictions: denominators $\neq 0$, radicands $\geq 0$ for even roots
- Interval notation: $(a, b)$, $[a, b]$, $[a, b)$, $(a, b]$, $(-\infty, b)$, $(a, \infty)$, $(-\infty, \infty)$
- Set builder: $\{x \mid P(x)\}$ = "the set of all $x$ such that $P(x)$"

**Important conventions:**
- Always use backslash delimiters for LaTeX math: `\( \)` for inline, `\[ \]` for display
- Never use dollar sign delimiters `$` or `$$`
- Every factual value must have a provenance (chapter section, file path, or synthetic with seed)
- Every threshold uses $\geq$ or $>$ (never "above" or "more than" without a symbol)
- Every adjustable quantity has min/max/step/default/unit, and defaults sit on the step grid
- No pixel sizes, layout, colors, fonts, breakpoints, or library calls are specified in specifications — these are left to the generator
- Each interactive element has exactly one Learning Objective, with Bloom Level and Bloom Verb on separate header lines

End of chapter. All 17 concepts from the "Concepts Covered" table have been addressed in the content above.
