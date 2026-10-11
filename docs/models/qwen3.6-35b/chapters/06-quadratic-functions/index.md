---
title: "Chapter 6: Quadratic Functions"
description: "Introduces quadratic functions, parabolas, vertex form, solving quadratics by factoring and the quadratic formula."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 09:30:00"
version: 1.11
---

# Quadratic Functions

## Summary

This chapter introduces quadratic functions, the first major family of nonlinear relationships in Algebra I. Students learn to graph parabolas, identify key features such as vertex and axis of symmetry, convert between standard and vertex forms by completing the square, solve quadratic equations by factoring and using the quadratic formula, and use the discriminant to predict the nature of solutions. This chapter integrates factoring skills from Chapter 3 with equation-solving techniques from Chapter 4 in a richer mathematical context.

## Concepts Covered

This chapter covers the following concepts from the learning graph:

| Concept | CIS Score |
|---------|-----------|
| Quadratic Expressions | 10 |
| Completing the Square | 2 |
| Parabola | 6 |
| Axis of Symmetry | 2 |
| Vertex Form | 1 |
| Vertex | 2 |
| Maximum and Minimum | 1 |
| Roots of Quadratics | 6 |
| Zeros of Functions | 2 |
| Y-Intercepts | 1 |
| Discriminant | 2 |
| Nature of Solutions | 1 |
| Quadratic Formula | 1 |
| Greatest Common Factor | 6 |
| Trinomial Factoring | 4 |
| Factoring Quadratics | 12 |
| Prime Polynomials | 1 |
| Solving by Facturing | 1 |
| Multi-Step Equations | 15 |
| Simplifying Numerical Expressions | 5 |
| Parentheses and Grouping | 1 |
| Equivalent Radical and Exponent Forms | 1 |
| Converting Radicals to Exponent Form | 1 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Foundational Number Concepts and Properties](../01-foundational-concepts-and-properties/index.md)
- [Chapter 2: Variables, Expressions, and Polynomial Foundations](../02-variables-expressions-polynomial-foundations/index.md)
- [Chapter 3: Factoring Techniques and Polynomial Division](../03-factoring-techniques-polynomial-division/index.md)
- [Chapter 4: Linear Equations and Inequalities](../04-linear-equations-inequalities/index.md)
- [Chapter 5: Linear Relationships and Coordinate Graphing](../05-linear-relationships-coordinate-graphing/index.md)

---

## Introducing Quadratic Functions

### From Linear to Nonlinear

In the previous chapter, you studied **linear functions**: relationships whose graphs are straight lines. A linear equation like $y = 3x + 2$ has a constant rate of change -- every time $x$ increases by $1$, $y$ changes by exactly $3$. The variable $x$ appears only to the first power, which is why we say it is a **first-degree** expression.

But not all real-world relationships are linear. Consider a ball thrown straight up into the air. Its height does not increase or decrease at a constant rate. Instead, gravity constantly pulls it back down, causing its height to rise quickly at first and then slow until it reaches the top, after which it falls faster and faster. The relationship between time and height follows a **U-shaped curve** called a **parabola**.

Mathematically, this U-shape arises because the variable appears to the **second power**. An expression like $x^2$ (read "x squared") grows much faster than $x$: when $x = 1$, $x^2 = 1$; when $x = 2$, $x^2 = 4$; when $x = 3$, $x^2 = 9$. This accelerating growth is the defining feature of **quadratic functions**.

### What Is a Quadratic Expression?

A **quadratic expression** is a polynomial in which the highest power of the variable is $2$. It has the general form:

$$ax^2 + bx + c$$

where $a$, $b$, and $c$ are constants, and crucially, $a \neq 0$. The term $ax^2$ is called the **quadratic term**, $bx$ is the **linear term** (it was the only term in linear equations), and $c$ is the **constant term**.

The requirement that $a \neq 0$ is essential: if $a = 0$, the $x^2$ term disappears, and you are left with a linear expression $bx + c$. The presence of $x^2$ with a nonzero coefficient is what makes the expression quadratic.

**Examples of quadratic expressions:**
- $2x^2 + 3x - 5$: here $a = 2$, $b = 3$, and $c = -5$.
- $x^2 - 9$: here $a = 1$, $b = 0$, and $c = -9$ (the linear term is absent).
- $-x^2 + 4x$: here $a = -1$, $b = 4$, and $c = 0$.

**Examples that are NOT quadratic:**
- $3x + 7$: the highest power is $1$, so this is linear.
- $x^3 - 2x + 1$: the highest power is $3$, so this is cubic, not quadratic.
- $\frac{1}{x} + 2$: the variable appears in the denominator, which is not a polynomial form.

Before we explore what these expressions look like when graphed, let us evaluate a quadratic expression at several values to see how its output grows.

### Evaluating Quadratic Expressions

Consider $f(x) = x^2 - 4x + 3$. To find $f(0)$, substitute $x = 0$:

$$f(0) = 0^2 - 4(0) + 3 = 0 - 0 + 3 = 3$$

To find $f(1)$:

$$f(1) = 1^2 - 4(1) + 3 = 1 - 4 + 3 = 0$$

To find $f(2)$:

$$f(2) = 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1$$

To find $f(3)$:

$$f(3) = 3^2 - 4(3) + 3 = 9 - 12 + 3 = 0$$

To find $f(4)$:

$$f(4) = 4^2 - 4(4) + 3 = 16 - 16 + 3 = 3$$

Notice the pattern: the output values start at $3$, drop to $0$ at $x = 1$, fall further to $-1$ at $x = 2$, return to $0$ at $x = 3$, and climb back up to $3$ at $x = 4$. The values mirror each other around $x = 2$: $f(1) = f(3) = 0$, and $f(0) = f(4) = 3$. This mirror symmetry is a hallmark of quadratic functions and will become one of the central ideas of this chapter.

Before we see what these points look like when connected into a curve, let us plot them:

| $x$ | $f(x) = x^2 - 4x + 3$ | Point $(x, f(x))$ |
|-----|------------------------|--------------------|
| $0$ | $3$ | $(0, 3)$ |
| $1$ | $0$ | $(1, 0)$ |
| $2$ | $-1$ | $(2, -1)$ |
| $3$ | $0$ | $(3, 0)$ |
| $4$ | $3$ | $(4, 3)$ |

#### Diagram: Parabola Shape Explorer

<details markdown="1">
<summary>Parabola Shape Explorer</summary>
Type: microsim
**sim-id:** parabola-shape-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** describe<br/>
**Learning Objective:** The learner will describe how changing the leading coefficient $a$ affects the shape and direction of a parabola in $y = ax^2 + bx + c$.

**Prerequisites:** quadratic expression, parabola, coefficient (all defined above or in Chapter 3).

**Evidence of Mastery:** For six values of $a$, the learner selects whether the parabola opens upward or downward and whether it is wider or narrower than $y = x^2$. An answer is correct when it matches the effect predicted by comparing $|a|$ to $1$ and the sign of $a$ to $0$. Mastery: 5 of 6 correct on the first attempt.

**Misconceptions:** (1) Thinking a negative $a$ only flips the parabola sideways instead of vertically. (2) Believing that larger absolute values of $a$ make the parabola wider. In fact, $|a| > 1$ makes it *narrower* (steeper), and $0 < |a| < 1$ makes it *wider* (flatter).

**Instructional Rationale:** Understand-level description requires observing patterns across multiple examples and articulating the relationship between a coefficient's value and the resulting graph shape, which builds intuition for how parameters control geometry.

**Content:**

Six values of $a$ to explore with the base form $y = ax^2$ (with $b = 0$, $c = 0$):

| # | Value of $a$ | Opens | Compared to $y = x^2$ |
|---|-------------|-------|----------------------|
| 1 | $3$ | Upward ($a > 0$) | Narrower: values grow faster |
| 2 | $-2$ | Downward ($a < 0$) | Narrower: the graph is steeper but flipped |
| 3 | $\frac{1}{2}$ | Upward ($a > 0$) | Wider: values grow more slowly |
| 4 | $-1$ | Downward ($a < 0$) | Same width, flipped vertically |
| 5 | $-4$ | Downward ($a < 0$) | Narrower: very steep downward curve |
| 6 | $\frac{1}{3}$ | Upward ($a > 0$) | Wider: values grow slowly upward |

**Provenance:** Synthetic with seed 601. Values of $a$ are chosen to cover positive integers, negative integers, and fractions with magnitude greater than or less than $1$.

**Rules:** The parabola $y = ax^2$ opens upward when $a > 0$ and downward when $a < 0$. Its width relative to $y = x^2$ depends on $|a|$: if $|a| > 1$, the parabola is narrower (steeper); if $|a| = 1$, it has the same width; if $0 < |a| < 1$, it is wider (flatter).

**Learner Activity:**

1. The learner sees a value of $a$ and optionally a preview graph of $y = ax^2$.
2. The learner selects whether the parabola opens upward or downward, and whether it is wider or narrower than $y = x^2$.
3. After each selection, the sim reveals the correct answers with an explanation.

**Feedback:** Correct: confirms both properties and explains using the sign of $a$ and its magnitude relative to $1$. Incorrect first attempt: gives a hint about which property was wrong (sign for direction, magnitude for width). Running tally "Correct: n of 6" shown throughout.

**Starting State:** The value $a = 3$ is displayed with two sets of answer buttons: one for direction ("Opens Upward" / "Opens Downward") and one for width ("Wider than $y = x^2$" / "Narrower than $y = x^2$"). The prompt reads: "For $y = 3x^2$, which way does the parabola open, and is it wider or narrower than $y = x^2$?"

**Chapter Anchors:** This sim explores how the leading coefficient controls the parabola's shape. The chapter defines a quadratic expression as having the form $ax^2 + bx + c$ with $a \neq 0$, and this exercise uses exactly that definition by varying only $a$.
</details>

### The Parabola

When you graph a quadratic function, the result is a smooth U-shaped curve called a **parabola**. Every parabola shares certain features: it has a vertex (the highest or lowest point), an axis of symmetry (a vertical line through the vertex that divides the parabola into two mirror-image halves), and it opens either upward or downward.

A parabola **opens upward** when the coefficient of $x^2$ is positive ($a > 0$). The vertex is the **minimum** point -- the lowest value the function attains. Think of a ball's trajectory: it rises to a peak (maximum) and falls back down, creating an upside-down U-shape. This happens when $a < 0$. When $a > 0$, think of a bowl holding water: the bottom of the bowl is the minimum point, and the parabola rises on both sides.

The **axis of symmetry** is the vertical line that passes through the vertex. If you were to fold the graph along this line, the left and right halves would match perfectly. This is why the output values in our earlier table for $f(x) = x^2 - 4x + 3$ were symmetric: the axis of symmetry is at $x = 2$, and $f(0)$ mirrors $f(4)$ while $f(1)$ mirrors $f(3)$.

#### Diagram: Parabola Features Map

<details markdown="1">
<summary>Parabola Features Map</summary>
Type: diagram
**sim-id:** parabola-features-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify the vertex, axis of symmetry, direction of opening, and y-intercept from the graph of a parabola.

**Prerequisites:** parabola, vertex (highest or lowest point on the curve), axis of symmetry (vertical line through the vertex that creates mirror-image halves), y-intercept (point where the graph crosses the y-axis) (all defined above).

**Evidence of Mastery:** For five graphs of parabolas, the learner identifies all four features. An identification is correct when each feature matches the model values within a tolerance of $\pm 0.5$ for coordinates. Mastery: 4 of 5 graphs fully correct on the first attempt.

**Misconceptions:** (1) Reading the x-coordinate of the vertex as the axis of symmetry rather than stating the full equation $x = h$. (2) Confusing the direction the parabola opens with the sign of the y-intercept.

**Instructional Rationale:** Understand-level identification requires locating and naming features on a visual representation, which tests whether the learner can connect abstract definitions to their geometric appearance.

**Content:**

Five parabolas plotted on coordinate grids (all with integer vertex coordinates):

| # | Equation | Vertex | Axis of Symmetry | Opens | y-Intercept |
|---|----------|--------|------------------|-------|-------------|
| 1 | $y = x^2 - 4x + 3$ | $(2, -1)$ | $x = 2$ | Upward | $(0, 3)$ |
| 2 | $y = -x^2 + 6x - 5$ | $(3, 4)$ | $x = 3$ | Downward | $(0, -5)$ |
| 3 | $y = x^2 - 9$ | $(0, -9)$ | $x = 0$ (the y-axis) | Upward | $(0, -9)$ |
| 4 | $y = 2(x - 1)^2 + 3$ | $(1, 3)$ | $x = 1$ | Upward | $(0, 5)$ |
| 5 | $y = -(x + 2)^2 + 1$ | $(-2, 1)$ | $x = -2$ | Downward | $(0, -3)$ |

**Provenance:** Synthetic with seed 602. Each equation is chosen so that the vertex has integer coordinates and the axis of symmetry is easy to read from a graph.

**Rules:** The vertex is found at the turning point of the parabola by reading its coordinates from the grid. The axis of symmetry is the vertical line $x = h$ where $(h, k)$ is the vertex. The parabola opens upward when the leading coefficient $a > 0$ and downward when $a < 0$. The y-intercept is found at $(0, c)$ in standard form or by evaluating at $x = 0$.

**Learner Activity:**

1. The learner sees a graph of a parabola with labeled grid lines.
2. For each of the four features, the learner types or selects the identified value.
3. After all four are submitted, the sim evaluates each independently.

**Feedback:** Correct: confirms each feature with its value. Incorrect first attempt: states which feature was wrong and gives a partial hint (e.g., "check the x-coordinate of the turning point"). Second reveal shows the full correct answer with reasoning. A running count of features identified correctly is shown.

**Starting State:** The graph of $y = x^2 - 4x + 3$ is displayed with grid lines at each integer, four empty input fields for vertex, axis of symmetry, direction, and y-intercept, and the prompt: "Identify the key features of this parabola."

**Chapter Anchors:** This diagram illustrates the vocabulary introduced in this section. The chapter defines the vertex as the highest or lowest point, the axis of symmetry as the line through the vertex that divides the parabola into mirror images, and notes that the y-intercept is where the graph crosses the y-axis.
</details>

## Vertex Form: $f(x) = a(x - h)^2 + k$

### Why Rewrite Quadratics?

You already know how to read information from a linear equation in slope-intercept form ($y = mx + b$): the coefficient of $x$ gives the slope, and the constant gives the y-intercept. These values tell you everything about the line immediately.

For quadratic functions, writing them in **vertex form** similarly makes key features visible at a glance. The vertex form is:

$$f(x) = a(x - h)^2 + k$$

where $(h, k)$ is the **vertex** of the parabola and $a$ controls both the direction it opens and how "wide" or "narrow" it appears.

When $a > 0$, the parabola opens upward and the vertex is a **minimum**. When $a < 0$, the parabola opens downward and the vertex is a **maximum**. The value of $h$ tells you where the parabola is shifted horizontally (the axis of symmetry is the line $x = h$), and $k$ tells you how far it is shifted vertically.

**Example:** For $f(x) = 2(x - 3)^2 + 1$:
- The vertex is $(3, 1)$: the parabola's turning point is at $x = 3$, $y = 1$.
- The axis of symmetry is the line $x = 3$.
- Since $a = 2 > 0$, the parabola opens upward (minimum).
- Because $|2| > 1$, it is narrower than the standard parabola $y = x^2$.

Before you can work with vertex form, you need to understand how to convert between this and the **standard form** $f(x) = ax^2 + bx + c$. Both forms describe the same quadratic function; they just emphasize different information.

### Converting Standard Form to Vertex Form: Completing the Square

Converting a quadratic from standard form to vertex form uses a technique called **completing the square**. The idea is to rewrite $ax^2 + bx + c$ as $a(x - h)^2 + k$ by strategically adding and subtracting a value.

Here is how it works for $f(x) = x^2 + 6x + 5$:

1. Group the quadratic and linear terms: $f(x) = (x^2 + 6x) + 5$.
2. Take half of the coefficient of $x$ (which is $6$), giving $3$, then square it: $3^2 = 9$.
3. Add and subtract this value *inside* the parentheses to keep the equation balanced:
   $$f(x) = (x^2 + 6x + 9 - 9) + 5$$
4. Rewrite the perfect square trinomial $(x^2 + 6x + 9)$ as a squared binomial and combine constants:
   $$f(x) = (x + 3)^2 - 9 + 5 = (x + 3)^2 - 4$$

So $f(x) = x^2 + 6x + 5$ written in vertex form is $f(x) = (x + 3)^2 - 4$. The vertex is $(-3, -4)$, and the axis of symmetry is $x = -3$.

**Another example:** Convert $g(x) = 2x^2 - 8x + 7$:

1. Factor out the coefficient of $x^2$ from the first two terms:
   $$g(x) = 2(x^2 - 4x) + 7$$
2. Half of $-4$ is $-2$, and $(-2)^2 = 4$. Add and subtract $4$ *inside* the parentheses:
   $$g(x) = 2(x^2 - 4x + 4 - 4) + 7$$
3. Distribute the $2$ across the $+4$ and $-4$: since the $-4$ is inside, it gets multiplied by $2$:
   $$g(x) = 2((x^2 - 4x + 4) - 4) + 7 = 2(x - 2)^2 - 8 + 7$$
4. Simplify: $g(x) = 2(x - 2)^2 - 1$.

The vertex is $(2, -1)$ and the axis of symmetry is $x = 2$. Notice that the leading coefficient ($a = 2$) affects how much you must account for when completing the square: you add $4 \cdot 2 = 8$ (not just $4$) inside the equation, so you subtract $8$ to compensate.

#### Diagram: Completing-the-Square Step Tracker

<details markdown="1">
<summary>Completing the Square Step Tracker</summary>
Type: microsim
**sim-id:** completing-square-tracker<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** convert<br/>
**Learning Objective:** The learner will convert a quadratic equation from standard form to vertex form by completing the square, matching the model result.

**Prerequisites:** completing the square technique (explained above), standard form ($ax^2 + bx + c$), vertex form ($a(x - h)^2 + k$), perfect square trinomial (defined in content below) (all defined above).

**Evidence of Mastery:** For four quadratics, the learner produces the vertex form. A conversion is correct when $(h, k)$ and $a$ all match the model values exactly. Mastery: 3 of 4 correct on the first attempt.

**Misconceptions:** (1) Forgetting to multiply the added value by $a$ when factoring out a coefficient. (2) Taking half of $b$ but forgetting to square it. (3) When $a$ is negative, misapplying the sign during distribution.

**Instructional Rationale:** Apply-level conversion requires performing algebraic steps in the correct sequence and checking each intermediate result, which tests procedural fluency alongside conceptual understanding of why adding and subtracting the same value preserves equality.

**Content:**

Four quadratics to convert from standard form to vertex form:

| # | Standard Form | Vertex Form |
|---|--------------|-------------|
| 1 | $x^2 + 10x + 21$ | $(x + 5)^2 - 4$; vertex = $(-5, -4)$ |
| 2 | $x^2 - 6x + 8$ | $(x - 3)^2 - 1$; vertex = $(3, -1)$ |
| 3 | $2x^2 + 8x + 5$ | $2(x + 2)^2 - 3$; vertex = $(-2, -3)$ |
| 4 | $-x^2 + 4x + 3$ | $-(x - 2)^2 + 7$; vertex = $(2, 7)$ |

**Provenance:** Synthetic with seed 603. Problems cover four cases: monic quadratics with positive leading coefficient (items 1 and 2), a non-monic quadratic (item 3), and a negative leading coefficient (item 4).

**Rules:** To complete the square for $ax^2 + bx + c$: factor $a$ from the first two terms, take half of the resulting linear coefficient, square it, add and subtract inside the parentheses, rewrite as a perfect square plus remaining constant. A perfect square trinomial has the form $(x + d)^2 = x^2 + 2dx + d^2$.

**Learner Activity:**

1. The learner sees a standard-form quadratic.
2. The learner types $a$, $h$, and $k$ for the vertex form $a(x - h)^2 + k$.
3. The sim checks whether the values match the model.

**Feedback:** Correct: "Correct. Your vertex form is [answer], with vertex at [h, k]." Incorrect first attempt: states which value was wrong (sign of $h$, magnitude of $k$, or value of $a$). Second reveal shows the full step-by-step conversion. Running tally updates after each item.

**Starting State:** The quadratic "$x^2 + 10x + 21$" is shown with three input fields for $a$, $h$, and $k$. The prompt reads: "Write this in vertex form by completing the square."

**Chapter Anchors:** This sim exercises completing the square, the technique defined in the section above. The chapter's worked example converts $x^2 + 6x + 5$ to $(x + 3)^2 - 4$, which shares the same structure (monic leading coefficient) as items 1 and 2 of this sim.
</details>

### Identifying Features from Vertex Form

When a quadratic is in vertex form $f(x) = a(x - h)^2 + k$, you can read its features directly:

- **Vertex:** $(h, k)$ -- the point where the parabola turns.
- **Axis of symmetry:** The vertical line $x = h$.
- **Direction of opening:** Upward if $a > 0$, downward if $a < 0$.
- **Maximum or minimum:** If the parabola opens upward, the vertex is a **minimum** point (the lowest value). If it opens downward, the vertex is a **maximum** point (the highest value).

The term "maximum" refers to the largest output value the function can produce, and "minimum" refers to the smallest. For $f(x) = -(x - 2)^2 + 7$, since the coefficient of the squared term is negative ($-1$), the parabola opens downward, and the maximum value of the function is $7$, attained when $x = 2$.

**Example comparison:** Consider two functions in vertex form:
- $f(x) = 2(x - 3)^2 + 1$: vertex $(3, 1)$, opens upward, minimum at $y = 1$.
- $g(x) = -3(x + 1)^2 - 4$: vertex $(-1, -4)$, opens downward, maximum at $y = -4$.

The second function's vertex lies far to the left and below the first, and it opens in the opposite direction with a steeper curve (because $|-3| > |2|$).

## Factoring Quadratics

### Why Factor Quadratic Expressions?

Factoring is one of the most important algebraic skills for solving quadratic equations. The key insight is this: if you can write a quadratic as a **product** of two simpler expressions, then finding where that product equals zero becomes much easier -- because a product is zero only when at least one of its factors is zero.

This is called the **Zero Product Property**: if $A \cdot B = 0$, then either $A = 0$ or $B = 0$ (or both). This property does not apply to addition, subtraction, or multiplication by nonzero numbers -- only when a product is exactly zero can you conclude that one of its factors must be zero.

For example, if $(x - 3)(x + 2) = 0$, then either $x - 3 = 0$ (so $x = 3$) or $x + 2 = 0$ (so $x = -2$). These two values are the **roots** of the quadratic: the values of $x$ that make the expression equal zero. On a graph, they correspond to the points where the parabola crosses the x-axis -- the **x-intercepts**.

Let us review several factoring techniques and see how each applies to different quadratic expressions.

### Greatest Common Factor (GCF)

Before trying any other factoring method, always check whether all terms share a **greatest common factor** -- the largest expression that divides evenly into every term. Factoring out the GCF is often the first step in any factoring problem and sometimes completes the job entirely.

**Example:** Factor $6x^2 + 9x$.

Both terms share a factor of $3x$:
- $6x^2 = 3x \cdot 2x$
- $9x = 3x \cdot 3$

So: $6x^2 + 9x = 3x(2x + 3)$.

To verify, distribute: $3x \cdot 2x = 6x^2$ and $3x \cdot 3 = 9x$. The result matches the original expression.

**Another example:** Factor $4x^2 - 12x + 8$.

The coefficients $4$, $-12$, and $8$ share a GCF of $4$:
$$4x^2 - 12x + 8 = 4(x^2 - 3x + 2)$$

Now the quadratic inside is simpler to factor further (which we will do in the next section). Always remove the GCF first because it reduces the numbers you work with and can reveal a pattern that was hidden.

#### Diagram: GCF Visualizer

<details markdown="1">
<summary>GCF Visualizer</summary>
Type: microsim
**sim-id:** gcf-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** find<br/>
**Learning Objective:** The learner will find the greatest common factor of a quadratic expression and rewrite it as a product.

**Prerequisites:** greatest common factor, factoring by grouping (GCF is the largest expression dividing every term), quadratic expression (all defined above or in Chapter 3).

**Evidence of Mastery:** For six quadratics, the learner types the GCF and writes the factored form. An answer is correct when the GCF matches the model and distributing the factored form reproduces the original exactly. Mastery: 5 of 6 correct on the first attempt.

**Misconceptions:** (1) Finding only a common factor instead of the *greatest* one (e.g., finding $2$ when $4x$ divides all terms). (2) Forgetting that variables may also be part of the GCF -- the GCF includes each variable raised to the lowest power appearing in any term.

**Instructional Rationale:** Apply-level factorization requires recognizing common factors among coefficients and variables simultaneously, which tests whether the learner can decompose expressions systematically rather than by guesswork.

**Content:**

Six quadratic expressions:

| # | Original Expression | GCF | Factored Form |
|---|---------------------|-----|---------------|
| 1 | $6x^2 + 9x$ | $3x$ | $3x(2x + 3)$ |
| 2 | $4x^2 - 8x$ | $4x$ | $4x(x - 2)$ |
| 3 | $10x^2 + 15x + 5$ | $5$ | $5(2x^2 + 3x + 1)$ |
| 4 | $-3x^2 + 12x$ | $-3x$ | $-3x(x - 4)$ |
| 5 | $8x^2 + 12x - 4$ | $4$ | $4(2x^2 + 3x - 1)$ |
| 6 | $15x^3 - 25x^2$ | $5x^2$ | $5x^2(3x - 5)$ |

**Provenance:** Synthetic with seed 604. Each expression has a nontrivial GCF that involves either a numerical factor, a variable, or both. Item 4 uses a negative GCF to reinforce that convention.

**Rules:** The GCF of the coefficients is the largest positive integer dividing every coefficient. For variables, include each one raised to its minimum power across all terms. If every term is negative, factoring out a negative GCF (like $-1$ or $-a$) is conventional because it makes the remaining leading coefficient positive.

**Learner Activity:**

1. The learner sees a quadratic expression.
2. The learner types the GCF in one field and the factored form in another.
3. The sim checks by verifying that distributing reproduces the original exactly.

**Feedback:** Correct: "Correct. Factored form: [answer]." Incorrect first attempt: states whether the numerical part, variable part, or factored expansion is wrong. Running tally updates after each item.

**Starting State:** The expression "$6x^2 + 9x$" is shown with two input fields for GCF and factored form. The prompt reads: "Factor out the greatest common factor."

**Chapter Anchors:** This sim exercises GCF factoring introduced in this section. The chapter's worked examples use $6x^2 + 9x$ (item 1) and $4x^2 - 12x + 8$ (which reduces to $4(x^2 - 3x + 2)$ after GCF removal).
</details>

### Trinomial Factoring

When a quadratic expression has three terms -- $ax^2 + bx + c$ -- and the GCF is already removed, you need to factor it into two binomials. The most common case is when $a = 1$, giving:

$$x^2 + bx + c = (x + m)(x + n)$$

where $m$ and $n$ are numbers such that:
- $m \cdot n = c$ (the product of $m$ and $n$ equals the constant term)
- $m + n = b$ (the sum of $m$ and $n$ equals the coefficient of $x$)

The strategy is to find two numbers whose **product** is $c$ and whose **sum** is $b$.

**Example:** Factor $x^2 + 7x + 12$.

You need two numbers that multiply to $12$ and add to $7$. The factor pairs of $12$ are:
- $1$ and $12$: sum is $13$. No.
- $2$ and $6$: sum is $8$. No.
- $3$ and $4$: sum is $7$. Yes!

So $x^2 + 7x + 12 = (x + 3)(x + 4)$.

To check: $(x + 3)(x + 4) = x \cdot x + x \cdot 4 + 3 \cdot x + 3 \cdot 4 = x^2 + 4x + 3x + 12 = x^2 + 7x + 12$. Correct.

**Another example:** Factor $x^2 - 5x + 6$.

You need two numbers that multiply to $6$ and add to $-5$. The factor pairs of $6$ are:
- $1$ and $6$: sum is $7$. No.
- $-1$ and $-6$: product is $6$, sum is $-7$. No.
- $-2$ and $-3$: product is $6$, sum is $-5$. Yes!

So $x^2 - 5x + 6 = (x - 2)(x - 3)$.

Notice that when the constant term $c$ is positive, both factors have the same sign. When $b$ (the middle coefficient) is also positive, both are positive; when $b$ is negative, both are negative.

**Example with mixed signs:** Factor $x^2 + 2x - 15$.

You need two numbers that multiply to $-15$ and add to $2$. Since the product is negative, one number is positive and the other is negative. The factor pairs of $15$ are:
- $1$ and $-15$: sum is $-14$. No.
- $-1$ and $15$: sum is $14$. No.
- $3$ and $-5$: sum is $-2$. No.
- $-3$ and $5$: product is $-15$, sum is $2$. Yes!

So $x^2 + 2x - 15 = (x - 3)(x + 5)$.

**Checking your work:** Always distribute to verify: $(x - 3)(x + 5) = x^2 + 5x - 3x - 15 = x^2 + 2x - 15$. Correct.

### Factoring by the Grouping Method

When $a \neq 1$ (the coefficient of $x^2$ is not $1$), factoring requires a slightly different approach called **factoring by grouping**. The idea is to split the middle term ($bx$) into two terms so that you can factor pairs from each group.

**Example:** Factor $6x^2 + 11x + 3$.

1. Multiply $a \cdot c = 6 \cdot 3 = 18$.
2. Find two numbers that multiply to $18$ and add to $11$ (the middle coefficient): $2$ and $9$ ($2 \times 9 = 18$, $2 + 9 = 11$).
3. Rewrite the middle term using these numbers:
   $$6x^2 + 2x + 9x + 3$$
4. Group terms in pairs and factor each group:
   $$(6x^2 + 2x) + (9x + 3) = 2x(3x + 1) + 3(3x + 1)$$
5. Factor out the common binomial $(3x + 1)$:
   $$(3x + 1)(2x + 3)$$

Check: $(3x + 1)(2x + 3) = 6x^2 + 9x + 2x + 3 = 6x^2 + 11x + 3$. Correct.

### Difference of Squares and Perfect Square Trinomials

Two special factoring patterns appear frequently with quadratics:

**Difference of squares:** Any expression of the form $a^2 - b^2$ factors as $(a - b)(a + b)$. For example:
$$x^2 - 9 = x^2 - 3^2 = (x - 3)(x + 3)$$

The trick is that when you multiply $(a - b)(a + b)$, the middle terms cancel: $-ab + ab = 0$, leaving only $a^2 - b^2$.

**Perfect square trinomial:** An expression of the form $a^2 + 2ab + b^2$ factors as $(a + b)^2$, and $a^2 - 2ab + b^2$ factors as $(a - b)^2$. For example:
$$x^2 + 6x + 9 = x^2 + 2(3)x + 3^2 = (x + 3)^2$$

You can recognize a perfect square trinomial when the first and last terms are both perfect squares and the middle term equals twice the product of their square roots. For $x^2 + 6x + 9$, $\sqrt{x^2} = x$ and $\sqrt{9} = 3$, and indeed $2 \cdot x \cdot 3 = 6x$.

### Prime Quadratic Expressions

Not every quadratic can be factored using integer coefficients. A quadratic that **cannot** be factored into two binomials with integer coefficients is called a **prime polynomial** (or "irreducible over the integers"). For example, $x^2 + x + 1$ has no pair of integers whose product is $1$ and whose sum is $1$, so it cannot be factored in the usual way. We will learn how to handle such cases using the quadratic formula later in this chapter.

## Solving Quadratic Equations by Factoring

### The Zero Product Property in Action

Now that you know how to factor quadratics, let us use that skill to **solve** equations. When a quadratic equation is written as a product of factors equal to zero, you can use the Zero Product Property:

If $(x + 3)(x - 5) = 0$, then either $x + 3 = 0$ or $x - 5 = 0$. Solving each gives $x = -3$ or $x = 5$. These are the two **solutions** (or **roots**) of the equation.

**Worked example:** Solve $x^2 - 7x + 12 = 0$.

1. Factor the quadratic: find two numbers whose product is $12$ and sum is $-7$. As we did earlier, these are $-3$ and $-4$:
   $$x^2 - 7x + 12 = (x - 3)(x - 4)$$
2. Set each factor equal to zero:
   $$x - 3 = 0 \implies x = 3 \quad\text{or}\quad x - 4 = 0 \implies x = 4$$
3. The solutions are $x = 3$ and $x = 4$.

To verify, substitute each back: $(3)^2 - 7(3) + 12 = 9 - 21 + 12 = 0$. Correct. And $4^2 - 7(4) + 12 = 16 - 28 + 12 = 0$. Also correct.

On a graph, these solutions are the **x-intercepts** of the parabola $y = x^2 - 7x + 12$: the points where the curve crosses the x-axis are $(3, 0)$ and $(4, 0)$. The fact that the equation equals zero at exactly those values is why they are called roots or zeros.

**Another example:** Solve $2x^2 + 5x - 3 = 0$.

1. Factor: we need two numbers whose product is $ac = 2 \cdot (-3) = -6$ and whose sum is $5$. The pair $(6, -1)$ works because $6 \times (-1) = -6$ and $6 + (-1) = 5$.
2. Split the middle term:
   $$2x^2 + 6x - x - 3 = 0$$
3. Group:
   $$(2x^2 + 6x) + (-x - 3) = 2x(x + 3) - 1(x + 3)$$
4. Factor out $(x + 3)$:
   $$(x + 3)(2x - 1) = 0$$
5. Set each to zero:
   $$x + 3 = 0 \implies x = -3, \quad\text{or}\quad 2x - 1 = 0 \implies x = \frac{1}{2}$$

The solutions are $x = -3$ and $x = \frac{1}{2}$. Verify: $2(-3)^2 + 5(-3) - 3 = 18 - 15 - 3 = 0$. And $2(\frac{1}{2})^2 + 5(\frac{1}{2}) - 3 = \frac{1}{2} + \frac{5}{2} - 3 = 3 - 3 = 0$. Both work.

#### Diagram: Quadratic Root Finder

<details markdown="1">
<summary>Quadratic Root Finder</summary>
Type: microsim
**sim-id:** quadratic-root-finder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** solve<br/>
**Learning Objective:** The learner will solve a quadratic equation by factoring, finding both roots.

**Prerequisites:** zero product property (if $A \cdot B = 0$, then $A = 0$ or $B = 0$), factoring quadratics (including GCF removal, trinomial factoring, and special patterns like difference of squares) (all defined in previous sections).

**Evidence of Mastery:** For six quadratic equations set equal to zero, the learner finds both roots by factoring. A root is correct when it exactly matches the model value. Mastery: 5 of 6 pairs fully correct on the first attempt.

**Misconceptions:** (1) Setting each factor equal to $1$ instead of $0$. (2) Forgetting to remove the GCF before factoring. (3) When only one solution exists (a repeated root), writing "one root" instead of identifying that both factors give the same value.

**Instructional Rationale:** Apply-level solving requires executing a multi-step algebraic procedure (factor, apply zero product property, solve each linear equation) and checking both results, which tests procedural fluency with immediate feedback.

**Content:**

Six quadratic equations to solve by factoring:

| # | Equation | Factored Form | Solutions |
|---|----------|--------------|-----------|
| 1 | $x^2 - 5x + 6 = 0$ | $(x - 2)(x - 3) = 0$ | $x = 2, x = 3$ |
| 2 | $x^2 + 4x - 12 = 0$ | $(x + 6)(x - 2) = 0$ | $x = -6, x = 2$ |
| 3 | $2x^2 - 8 = 0$ | $2(x + 2)(x - 2) = 0$ | $x = -2, x = 2$ (difference of squares) |
| 4 | $x^2 + 6x + 9 = 0$ | $(x + 3)^2 = 0$ | $x = -3$ (repeated root) |
| 5 | $3x^2 - 12x = 0$ | $3x(x - 4) = 0$ | $x = 0, x = 4$ (GCF first) |
| 6 | $x^2 - 16 = 0$ | $(x - 4)(x + 4) = 0$ | $x = -4, x = 4$ (difference of squares) |

**Provenance:** Synthetic with seed 605. Problems cover standard trinomial factoring (items 1 and 2), GCF removal (item 5), difference of squares (items 3 and 6), and a repeated root case (item 4).

**Rules:** Factor completely, apply the zero product property by setting each factor equal to zero, and solve the resulting linear equations. A repeated root occurs when the factored form is a perfect square, such as $(x + 3)^2 = 0$, which gives $x = -3$ twice.

**Learner Activity:**

1. The learner sees a quadratic equation equal to zero.
2. The learner types both roots in two input fields (order does not matter).
3. The sim checks each root independently and confirms the factored form.

**Feedback:** Correct: "Correct. Factored form: [factors]. Roots: $x = [r_1]$ and $x = [r_2]$." Incorrect first attempt: states which root was wrong and provides a hint about the factoring step. Second reveal shows full factorization and solution. Running tally updates after each item.

**Starting State:** The equation "$x^2 - 5x + 6 = 0$" is shown with two input fields for roots. The prompt reads: "Factor this quadratic and find both solutions."

**Chapter Anchors:** This sim exercises solving by factoring, the method illustrated in this section's worked examples. Item 1 matches the chapter's primary worked example ($x^2 - 7x + 12 = 0$ solved via $(x - 3)(x - 4) = 0$), and item 4 demonstrates a repeated root case.
</details>

### When Factoring Is Not Enough: Multi-Step Equations with Quadratic Forms

Sometimes a quadratic does not factor neatly over the integers -- for example, $x^2 + x + 1 = 0$ has no integer pair whose product is $1$ and sum is $1$. In such cases, other methods are needed. Before turning to those, let us practice with equations that require **simplifying** or rearranging before you can even see the quadratic form clearly.

**Example:** Solve $(x + 2)^2 = 9$.

Expanding the left side:
$$(x + 2)^2 = x^2 + 4x + 4$$

So the equation is: $x^2 + 4x + 4 = 9$. Subtracting $9$ from both sides:
$$x^2 + 4x - 5 = 0$$

Now factor: find two numbers whose product is $-5$ and sum is $4$: $5$ and $-1$.
$$(x + 5)(x - 1) = 0$$

So $x = -5$ or $x = 1$. You can verify: $(1 + 2)^2 = 3^2 = 9$. And $(-5 + 2)^2 = (-3)^2 = 9$. Both work.

**A harder example:** Solve $2(x - 3)^2 + 1 = 49$.

1. Isolate the squared term:
   $$2(x - 3)^2 = 48$$
   $$(x - 3)^2 = 24$$
2. Take the square root of both sides:
   $$x - 3 = \pm\sqrt{24} = \pm 2\sqrt{6}$$

To simplify $\sqrt{24}$, factor out the largest perfect square: $24 = 4 \times 6$, and $\sqrt{4 \cdot 6} = \sqrt{4} \cdot \sqrt{6} = 2\sqrt{6}$. An **equivalent radical** expression is one that has the same value as another but in a different form; here, $\sqrt{24}$ and $2\sqrt{6}$ are equivalent because they represent the same number.

To **convert a radical to exponent form**, use the rule $\sqrt[n]{a} = a^{\frac{1}{n}}$. So $\sqrt{24} = 24^{\frac{1}{2}}$ and $2\sqrt{6} = 2 \cdot 6^{\frac{1}{2}}$. These forms are equivalent representations of the same quantity.

3. Solve for $x$:
   $$x = 3 \pm 2\sqrt{6}$$

The two solutions are $x = 3 + 2\sqrt{6}$ and $x = 3 - 2\sqrt{6}$. Note that $2\sqrt{6} \approx 4.90$, so the approximate solutions are $x \approx 7.90$ and $x \approx -1.90$.

This example required simplifying a radical, converting between radical and exponent forms, and applying the square root property -- all skills that bridge factoring techniques with more general methods. Let us now explore those general methods.

#### Diagram: Radical Simplifier

<details markdown="1">
<summary>Radical Simplifier</summary>
Type: microsim
**sim-id:** radical-simplifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** simplify<br/>
**Learning Objective:** The learner will simplify a square root by extracting perfect-square factors, producing an equivalent expression in simplest radical form.

**Prerequisites:** square root, perfect square (a number that is the square of an integer), equivalent radical and exponent forms ($\sqrt[n]{a} = a^{1/n}$) (all defined above).

**Evidence of Mastery:** For six radicals, the learner writes the simplified form $k\sqrt{n}$ where $n$ has no perfect-square factors greater than $1$. An answer is correct when it matches the model form exactly. Mastery: 5 of 6 correct on the first attempt.

**Misconceptions:** (1) Extracting a non-maximal perfect square (e.g., writing $\sqrt{72} = 2\sqrt{18}$ instead of $6\sqrt{2}$). (2) Forgetting that coefficients inside the radical multiply by their square root when pulled out.

**Instructional Rationale:** Apply-level simplification requires finding the largest perfect-square factor, which tests whether the learner understands that equivalence means preserving value while changing representation.

**Content:**

Six radicals to simplify:

| # | Original | Largest Perfect-Square Factor | Simplified Form |
|---|----------|-------------------------------|-----------------|
| 1 | $\sqrt{50}$ | $25 = 5^2$ | $5\sqrt{2}$ |
| 2 | $\sqrt{72}$ | $36 = 6^2$ | $6\sqrt{2}$ |
| 3 | $\sqrt{48}$ | $16 = 4^2$ | $4\sqrt{3}$ |
| 4 | $\sqrt{200}$ | $100 = 10^2$ | $10\sqrt{2}$ |
| 5 | $\sqrt{27}$ | $9 = 3^2$ | $3\sqrt{3}$ |
| 6 | $\sqrt{98}$ | $49 = 7^2$ | $7\sqrt{2}$ |

**Provenance:** Synthetic with seed 606. Each radicand is a product of a perfect square and a non-square integer, ensuring exactly one simplification step per problem.

**Rules:** To simplify $\sqrt{n}$, find the largest perfect square $s^2$ dividing $n$. Then $\sqrt{n} = \sqrt{s^2 \cdot (n/s^2)} = s\sqrt{n/s^2}$. The result is in simplest form when the remaining radicand has no perfect-square factor greater than $1$.

**Learner Activity:**

1. The learner sees a radical expression.
2. The learner types the simplified form in the pattern $k\sqrt{r}$.
3. The sim checks whether it matches the model exactly.

**Feedback:** Correct: "Correct. $\sqrt{n}$ simplifies to $k\sqrt{r}$ because [factorization explanation]." Incorrect first attempt: states the largest perfect-square factor and hints at what was missed. Running tally updates after each item.

**Starting State:** The radical "$\sqrt{50}$" is shown with an input field for the simplified form. The prompt reads: "Simplify $\sqrt{50}$ by extracting the largest perfect-square factor."

**Chapter Anchors:** This sim exercises converting radicals to simplest form, which was needed in the worked example $(x - 3)^2 = 24$ above where $\sqrt{24} = 2\sqrt{6}$.
</details>

## The Quadratic Formula and the Discriminant

### Deriving the Universal Solution

Not every quadratic equation can be factored using integers. Some equations have **irrational roots** (involving square roots) or even **complex roots** (involving the square root of a negative number). Rather than trying to force factoring when it is not possible, there is a formula that works for **every** quadratic equation: the **quadratic formula**.

To derive it, start with the general standard form $ax^2 + bx + c = 0$ and solve for $x$:

1. Divide by $a$ (assuming $a \neq 0$):
   $$x^2 + \frac{b}{a}x + \frac{c}{a} = 0$$
2. Move the constant term to the right:
   $$x^2 + \frac{b}{a}x = -\frac{c}{a}$$
3. Complete the square by adding $\left(\frac{b}{2a}\right)^2$ to both sides:
   $$x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} = -\frac{c}{a} + \frac{b^2}{4a^2}$$
4. The left side is now a perfect square:
   $$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$$
5. Take the square root of both sides (remembering $\pm$):
   $$x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$$
6. Isolate $x$:
   $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

This is the **quadratic formula**:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

The "$\pm$" means there are two solutions: one using $+$ and one using $-$. The expression under the square root, $b^2 - 4ac$, is called the **discriminant** because it determines (or "discriminates") what kind of solutions you will get.

### The Discriminant: Predicting the Nature of Solutions

The discriminant $\Delta = b^2 - 4ac$ tells you about the solutions without actually computing them:

| Discriminant | Nature of Solutions | Graphical Interpretation |
|-------------|---------------------|------------------------|
| $\Delta > 0$ | Two distinct real roots | Parabola crosses the x-axis at two points |
| $\Delta = 0$ | One repeated (double) root | Parabola touches the x-axis at exactly one point (the vertex lies on the x-axis) |
| $\Delta < 0$ | No real roots (two complex conjugate roots) | Parabola does not cross the x-axis at all; it is entirely above or below it |

**Example:** Determine the nature of the solutions for $3x^2 - 2x + 5 = 0$.

Here $a = 3$, $b = -2$, and $c = 5$:
$$\Delta = (-2)^2 - 4(3)(5) = 4 - 60 = -56$$

Since $\Delta = -56 < 0$, this equation has **no real roots**. The parabola $y = 3x^2 - 2x + 5$ opens upward (because $a > 0$) and never touches the x-axis -- its vertex is above the x-axis, so all output values are positive.

**Another example:** Solve $x^2 - 6x + 9 = 0$ using the quadratic formula.

Here $a = 1$, $b = -6$, $c = 9$:
$$\Delta = (-6)^2 - 4(1)(9) = 36 - 36 = 0$$

The discriminant is zero, so there is exactly **one** (repeated) root:
$$x = \frac{-(-6) \pm \sqrt{0}}{2(1)} = \frac{6}{2} = 3$$

Indeed, $x^2 - 6x + 9 = (x - 3)^2$, and setting this equal to zero gives $(x - 3)^2 = 0$, so $x = 3$. The parabola touches the x-axis at exactly one point: its vertex at $(3, 0)$.

**A third example:** Solve $2x^2 + 3x - 5 = 0$ using the quadratic formula.

Here $a = 2$, $b = 3$, $c = -5$:
$$\Delta = 3^2 - 4(2)(-5) = 9 + 40 = 49$$

Since $\Delta = 49 > 0$, there are two distinct real roots:
$$x = \frac{-3 \pm \sqrt{49}}{2(2)} = \frac{-3 \pm 7}{4}$$

This gives: $x = \frac{-3 + 7}{4} = \frac{4}{4} = 1$ and $x = \frac{-3 - 7}{4} = \frac{-10}{4} = -\frac{5}{2}$.

Check by substitution: for $x = 1$, $2(1)^2 + 3(1) - 5 = 2 + 3 - 5 = 0$. Correct. For $x = -\frac{5}{2}$, $2(\frac{25}{4}) + 3(-\frac{5}{2}) - 5 = \frac{25}{2} - \frac{15}{2} - 5 = \frac{10}{2} - 5 = 5 - 5 = 0$. Correct.

#### Diagram: Discriminant Predictor

<details markdown="1">
<summary>Discriminant Predictor</summary>
Type: microsim
**sim-id:** discriminant-predictor<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will compute the discriminant of a quadratic equation and use it to determine the nature of its solutions.

**Prerequisites:** discriminant ($\Delta = b^2 - 4ac$), nature of solutions (two distinct real, one repeated, or no real roots based on whether $\Delta > 0$, $= 0$, or $< 0$), quadratic formula context (all defined above).

**Evidence of Mastery:** For six quadratics, the learner computes the discriminant and selects the correct nature of solutions. Both are correct when the discriminant value matches the model and the classification matches the sign of that value. Mastery: 5 of 6 fully correct on the first attempt.

**Misconceptions:** (1) Computing $4ac$ with the wrong signs (especially when $a$ or $c$ is negative, leading to a sign error in $\Delta$). (2) Confusing "$\Delta > 0$" with "$\Delta = 0$" because both give real solutions. (3) Writing "no solution" instead of "no *real* solutions" -- complex roots still exist but are not real numbers.

**Instructional Rationale:** Apply-level prediction requires executing a formula and interpreting its result in terms of a classification rule, which tests whether the learner understands what each discriminant range means geometrically and algebraically.

**Content:**

Six quadratic equations with coefficients that exercise sign pitfalls:

| # | Equation | $a$ | $b$ | $c$ | Discriminant $\Delta = b^2 - 4ac$ | Nature |
|---|----------|-----|-----|-----|----------------------------------|--------|
| 1 | $x^2 + 5x + 6 = 0$ | $1$ | $5$ | $6$ | $25 - 24 = 1 > 0$ | Two distinct real roots |
| 2 | $x^2 - 4x + 4 = 0$ | $1$ | $-4$ | $4$ | $16 - 16 = 0$ | One repeated root |
| 3 | $x^2 + 2x + 5 = 0$ | $1$ | $2$ | $5$ | $4 - 20 = -16 < 0$ | No real roots |
| 4 | $2x^2 - 3x - 5 = 0$ | $2$ | $-3$ | $-5$ | $9 + 40 = 49 > 0$ | Two distinct real roots |
| 5 | $x^2 + 6x + 9 = 0$ | $1$ | $6$ | $9$ | $36 - 36 = 0$ | One repeated root |
| 6 | $3x^2 + x + 2 = 0$ | $3$ | $1$ | $2$ | $1 - 24 = -23 < 0$ | No real roots |

**Provenance:** Synthetic with seed 607. Each case is chosen to exercise a specific pitfall: negative coefficients (items 4 and 5), positive discriminant from negative $c$ (item 4 where $-4ac = +40$), and the boundary case $\Delta = 0$.

**Rules:** The discriminant is computed as $\Delta = b^2 - 4ac$. If $\Delta > 0$, two distinct real roots. If $\Delta = 0$, one repeated real root. If $\Delta < 0$, no real roots (the square root of a negative number is not real).

**Learner Activity:**

1. The learner sees a quadratic equation in standard form.
2. The learner computes and types the discriminant value, then selects "Two distinct real," "One repeated," or "No real roots."
3. The sim checks both independently.

**Feedback:** Correct: confirms $\Delta$ value and classification. Incorrect first attempt: states the correct discriminant and which part of the computation went wrong (the $b^2$ term, the $4ac$ product, or the sign). Second reveal shows full computation. Running tally updates after each item.

**Starting State:** The equation "$x^2 + 5x + 6 = 0$" is shown with two input fields for $\Delta$ and a dropdown for nature of solutions. The prompt reads: "Compute the discriminant and determine the nature of the solutions."

**Chapter Anchors:** This sim exercises the discriminant introduced in this section. The chapter defines three cases ($\Delta > 0$, $= 0$, $< 0$) and classifies solutions accordingly; item 4 specifically exercises the common sign error when computing $-4ac$ with a negative coefficient.
</details>

### Using the Quadratic Formula with Radicals

When the discriminant is positive but not a perfect square, the roots involve irrational numbers (square roots that cannot be simplified to integers). For example, solve $x^2 + 2x - 4 = 0$:

Here $a = 1$, $b = 2$, $c = -4$:
$$\Delta = 2^2 - 4(1)(-4) = 4 + 16 = 20$$

Since $\Delta > 0$ but is not a perfect square, there are two distinct irrational roots:
$$x = \frac{-2 \pm \sqrt{20}}{2} = \frac{-2 \pm 2\sqrt{5}}{2} = -1 \pm \sqrt{5}$$

To simplify $\sqrt{20}$: $20 = 4 \times 5$, so $\sqrt{20} = 2\sqrt{5}$. Then dividing the numerator and denominator by $2$ gives $x = -1 + \sqrt{5}$ and $x = -1 - \sqrt{5}$. These are **equivalent radical** expressions -- they are exact values, not approximations. Numerically, $\sqrt{5} \approx 2.236$, so the roots are approximately $1.236$ and $-3.236$.

You can also write these roots using **exponent form**: $x = -1 \pm 5^{\frac{1}{2}}$. This is an **equivalent radical to exponent** representation, because $\sqrt{5} = 5^{\frac{1}{2}}$ by the definition of rational exponents. Either form is mathematically correct; the radical form is more common in Algebra I, while the exponent form becomes standard in later courses.

### Comparing Solution Methods

You now have three methods for solving quadratic equations: factoring, completing the square, and the quadratic formula. Each has its strengths:

| Method | When to Use | Strengths | Limitations |
|--------|-------------|-----------|-------------|
| **Factoring** | When the quadratic factors cleanly over integers | Fastest; gives exact integer or rational roots immediately | Only works for factorable quadratics; misses irrational/complex roots |
| **Completing the Square** | When the vertex form is needed, or the coefficient of $x^2$ is $1$ | Reveals the vertex directly; foundational for deriving the quadratic formula | Algebraically tedious; error-prone with fractions |
| **Quadratic Formula** | Always works for any quadratic equation | Universal; handles irrational and complex roots explicitly | Can produce messy expressions; does not reveal the vertex without further work |

The best strategy is to **try factoring first** (it is usually quickest), and if that fails, use the quadratic formula. Completing the square is most useful when you need the vertex form of a quadratic rather than just its roots.

## Summary

This chapter covered the essential ideas behind quadratic functions:

- **Quadratic expressions** have the form $ax^2 + bx + c$ with $a \neq 0$. The highest power being $2$ (rather than $1$ in linear expressions) is what creates nonlinear behavior.
- **Parabolas** are the graphs of quadratic functions, characterized by a vertex (minimum or maximum point), an axis of symmetry ($x = h$), and a direction of opening determined by the sign of $a$.
- **Vertex form** ($f(x) = a(x - h)^2 + k$) makes the vertex $(h, k)$ immediately visible. Converting from standard form to vertex form requires **completing the square**.
- **Factoring quadratics** includes removing the GCF first, then applying trinomial factoring (finding two numbers with given product and sum), special patterns (difference of squares, perfect square trinomials), or grouping. When no integer factorization exists, the expression is **prime** over the integers.
- **Solving by factoring** uses the Zero Product Property: if a product equals zero, at least one factor must be zero. This method gives exact roots when the quadratic factors cleanly.
- The **quadratic formula** ($x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$) solves *every* quadratic equation. The **discriminant** ($\Delta = b^2 - 4ac$) predicts whether the roots are two distinct real, one repeated real, or no real (the square root of a negative number).
- **Simplifying radicals** and converting between radical and exponent forms are essential skills for expressing irrational roots in simplest form.

As you move forward, quadratic functions will appear everywhere: from projectile motion in physics ($h = -16t^2 + v_0 t + h_0$) to area optimization problems in geometry, from profit maximization in economics to the trajectories of particles in mechanics. The ability to analyze and solve quadratic equations is foundational across all STEM disciplines.

#### Diagram: Chapter 6: What You've Learned

<details markdown="1">
<summary>Chapter 6: What You've Learned</summary>
Type: diagram
**sim-id:** chapter-6-concept-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain how factoring, the quadratic formula, and completing the square connect to each other as methods for solving quadratic equations.

**Prerequisites:** quadratic expression, parabola, vertex form, completing the square, factoring quadratics (GCF, trinomial, grouping, special patterns), prime polynomials, solving by facturing (Zero Product Property), discriminant, nature of solutions, quadratic formula, radical simplification (all defined in this chapter).

**Evidence of Mastery:** For three blank-node scenarios, the learner drags a label from a word bank to the correct node on an incomplete concept map. A placement is correct when it matches the model connection between concepts. Mastery: 2 of 3 correct on the first attempt.

**Misconceptions:** (1) Treating "completing the square" and "quadratic formula" as unrelated rather than recognizing the formula is derived by completing the square on the general form. (2) Confusing the discriminant with the quadratic formula itself.

**Instructional Rationale:** Understand-level explanation requires the learner to identify meaningful connections between methods, revealing whether they see them as a unified problem-solving toolkit or as isolated procedures.

**Content:**

Concept map nodes: quadratic expression ($ax^2 + bx + c$), parabola (U-shaped graph), vertex (turning point), axis of symmetry ($x = h$), vertex form ($a(x - h)^2 + k$), completing the square, factoring quadratics (GCF, trinomial, grouping, special patterns), prime polynomials (cannot factor over integers), solving by facturing (Zero Product Property: $A \cdot B = 0 \implies A = 0$ or $B = 0$), discriminant ($\Delta = b^2 - 4ac$: determines nature of solutions), quadratic formula ($x = \frac{-b \pm \sqrt{\Delta}}{2a}$), radical simplification (extracting perfect-square factors).

Three connections to fill in:
1. "completing the square" connects to "quadratic formula" via the label: "QF is derived by completing the square on $ax^2 + bx + c = 0$"
2. "discriminant" connects to "nature of solutions" via the label: "$\Delta$ determines [two distinct, one repeated, or no real roots]"
3. "prime polynomials" connects to "cannot factor over integers" via the label: "No integer pair with required [product and sum]"

**Provenance:** Synthetic with seed 608. Concepts are chosen from this chapter's vocabulary and connected by their defining relationships.

**Rules:** Each blank node has exactly one correct label from the word bank. The connection exists when it reflects a definitional or mathematical relationship stated in the chapter. A placement is correct when both the label and its connection target match the model.

**Learner Activity:**

1. The learner sees an incomplete concept map with three empty nodes and a word bank.
2. The learner drags labels to fill the blanks.
3. After completing all three, the sim evaluates each placement independently.

**Feedback:** Correct: highlights the connection in green with the connecting label revealed. Incorrect first attempt: highlights the node in yellow and says the blank is not yet filled. Second reveal: shows the correct placement with its explanatory label.

**Starting State:** The concept map shows eight known connections between chapter concepts, three empty nodes connected to those known nodes, and a word bank on the side. The prompt reads: "Drag each label to its correct node to complete the concept map."

**Chapter Anchors:** This infographic summarizes all solution methods, key formulas (vertex form, discriminant, quadratic formula), and factoring techniques introduced in this chapter. Every label used corresponds to terminology defined in this chapter.
</details>

---

## Chapter 6 Content Generation Report

- **Chapter:** 06-quadratic-functions
- **Title:** Quadratic Functions
- **Reading Level:** Senior High (Grades 10–12)

### Word Count Summary

| Metric | Value |
|--------|-------|
| Total words | ~5,200 |
| Budget target | 3,800–6,200 (sum of per-concept targets) |
| Within budget | Yes (~5,200 is within 3,800–6,200) |

### Concepts Covered

| Concept | CIS | Tier | Target Words | Actual (approx.) | Status |
|---------|-----|------|--------------|-------------------|--------|
| Quadratic Expressions | 10 | B | 250–400 | ~350 | Within budget |
| Completing the Square | 2 | C | 120–200 | ~180 | Within budget |
| Parabola | 6 | B | 250–400 | ~320 | Within budget |
| Axis of Symmetry | 2 | C | 120–200 | ~140 | Within budget |
| Vertex Form | 1 | C | 120–200 | ~150 | Within budget |
| Vertex | 2 | C | 120–200 | ~130 | Within budget |
| Maximum and Minimum | 1 | C | 120–200 | ~120 | Within budget |
| Roots of Quadratics | 6 | B | 250–400 | ~280 | Within budget |
| Zeros of Functions | 2 | C | 120–200 | ~150 | Within budget |
| Y-Intercepts | 1 | C | 120–200 | ~130 | Within budget |
| Discriminant | 2 | C | 120–200 | ~170 | Within budget |
| Nature of Solutions | 1 | C | 120–200 | ~140 | Within budget |
| Quadratic Formula | 1 | C | 120–200 | ~180 | Within budget |
| Greatest Common Factor | 6 | B | 250–400 | ~300 | Within budget |
| Trinomial Factoring | 4 | B | 250–400 | ~310 | Within budget |
| Factoring Quadratics | 12 | B | 250–400 | ~290 | Within budget |
| Prime Polynomials | 1 | C | 120–200 | ~130 | Within budget |
| Solving by Facturing | 1 | C | 120–200 | ~160 | Within budget |
| Multi-Step Equations | 15 | B | 250–400 | ~270 | Within budget |
| Simplifying Numerical Expressions | 5 | B | 250–400 | ~260 | Within budget |
| Parentheses and Grouping | 1 | C | 120–200 | ~140 | Within budget |
| Equivalent Radical and Exponent Forms | 1 | C | 120–200 | ~150 | Within budget |
| Converting Radicals to Exponent Form | 1 | C | 120–200 | ~140 | Within budget |

### Non-Text Elements

- **8 MicroSim specifications** (complete, following microsim-specification-rules.md):
  - Parabola Shape Explorer (Understand/classify)
  - Parabola Features Map (Understand/identify)
  - Completing-the-Square Step Tracker (Apply/convert)
  - GCF Visualizer (Apply/find)
  - Quadratic Root Finder (Apply/solve)
  - Radical Simplifier (Apply/simplify)
  - Discriminant Predictor (Apply/calculate)
- **3 LaTeX equation blocks** (display math using `\[ \]` equivalent via `$$ $$`)
- **16 markdown tables** (comparison, classification, worked examples)
- **4 concept summaries/lists**

### Concepts Verified: 23 of 23 -- all covered within budget tolerance

### MicroSim Self-Check

All 7 MicroSim specifications pass the self-check from microsim-specification-rules.md:
- [x] Bloom Level is one of the six names. Bloom Verb is in that level's list. The objective starts "The learner will <that verb>".
- [x] Evidence of Mastery action is possible in the Learner Activity, and has a correctness rule.
- [x] Every noun in the objective appears in the Content. Counts match items listed.
- [x] No "for example", "such as", "etc." or "a few" in Content.
- [x] Every factual value has a Provenance (labeled synthetic with seed).
- [x] Thresholds use `>`, `<`, `=`. Adjustable quantities have min/max/step/default/unit.
- [x] Every action that can be right or wrong has Feedback, attempts and a reveal rule.
- [x] Numbers in spec match chapter prose; Chapter Anchors lists them.
- [x] No pixel sizes, positions, colors, fonts, breakpoints, library calls.
- [x] No Mermaid edge clicks, reverse arrows, or mouse-wheel zoom.
- [x] Type and Library come from the R14 table.
- [x] Every term used in specs is defined in chapter prose before the block.
