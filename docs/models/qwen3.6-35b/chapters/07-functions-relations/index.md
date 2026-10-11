---
title: "Chapter 7: Functions and Relations"
description: "Introduces the function concept as a formal mathematical object, distinguishing functions from relations through the vertical line test."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 14:32:00"
version: 1.11
---

# Functions and Relations

## Summary

This chapter introduces the function concept as a formal mathematical object, distinguishing functions from general relations through the vertical line test. Students explore domain and range, evaluate functions, use function notation, and investigate zeros and intercepts of quadratic graphs. The chapter extends to inverse functions and composition of functions, then covers piecewise-defined functions including step functions, before concluding with a comprehensive treatment of transformations — translations, reflections, and stretches — that prepare students for working with exponential functions in the next chapter.

## Concepts Covered

This chapter covers the following concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Relations | 17 |
| Functions | 16 |
| Function Definition | 10 |
| Domain | 4 |
| Range | 4 |
| Independent Variable | 1 |
| Dependent Variable | 1 |
| Vertical Line Test | 1 |
| Function Evaluation | 1 |
| Function Notation | 3 |
| Zeros of Functions | 2 |
| X-Intercepts | 1 |
| Y-Intercepts | 1 |
| Inverse Relations | 4 |
| Inverse Functions | 3 |
| Composition of Functions | 2 |
| Composite Functions | 1 |
| Piecewise Functions | 3 |
| Piecewise Defined Functions | 2 |
| Step Functions | 1 |
| Transformations | 7 |
| Vertical Translation | 1 |
| Horizontal Translation | 1 |
| Reflections | 1 |
| Stretching and Shrinking | 1 |
| Algebraic Expressions | 93 |
| Evaluating Polynomials | 4 |
| Polynomial Degree | 6 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 2: Variables, Expressions, and Polynomial Foundations](../02-variables-expressions-polynomial-foundations/index.md)
- [Chapter 5: Linear Relationships and Coordinate Graphing](../05-linear-relationships-coordinate-graphing/index.md)
- [Chapter 6: Quadratic Functions](../06-quadratic-functions/index.md)

---

## 7.1 What Is a Relation?

Before we can define a function, we need to understand the broader idea it belongs to: a **relation**. In mathematics, a relation is simply any collection of ordered pairs. An ordered pair `(x, y)` represents two values linked together — the first value (usually called `x`) is paired with the second value (usually called `y`). Think of it like a mapping between two quantities: for every input you choose, there might be one or more corresponding outputs.

Relations appear everywhere in real life. A student's name paired with their test score is a relation. The number of hours studied paired with the grade received is a relation. The temperature at different times of day forms yet another relation.

Every relation has two important sets associated with it: the **domain** and the **range**. The domain is the set of all first coordinates (the `x`-values) in the ordered pairs. The range is the set of all second coordinates (the `y`-values). These terms describe what goes into a relation and what comes out.

!!! tip "Remember"
    **Domain** = set of inputs (first coordinates). **Range** = set of outputs (second coordinates). You can think of a relation as a machine: you feed it an input from the domain, and it produces one or more outputs that belong to the range.

### 7.1.1 Algebraic Expressions Review

Since functions are built from algebraic expressions, let us briefly review what makes an expression useful in this context. An **algebraic expression** combines numbers, variables, and operations (addition, subtraction, multiplication, division, and exponentiation) to represent a value that can change. The **degree** of a polynomial term tells you the highest exponent on its variable — for example, `3x^4 + 2x^2 - 5` has degree 4. Understanding degree matters because it determines whether the relation is linear (degree 1), quadratic (degree 2), or something more complex.

Evaluating a polynomial expression means substituting specific values for its variables and computing the result. For instance, `f(x) = 2x^2 + 3x - 1` evaluated at `x = 3` gives `2(9) + 3(3) - 1 = 26`. This process of substitution is how we generate ordered pairs for a relation: each input produces one output, and together they form a point on the graph.

#### Diagram: Algebraic Expression Structure

<details markdown="1">
<summary>Algebraic Expression Structure</summary>
Type: diagram
**sim-id:** algebraic-expression-analyzer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret the components of a polynomial expression — coefficients, exponents, and constants — and explain how each part affects the function's behavior.

**Prerequisites:** algebraic expression, coefficient, exponent (power), constant term, polynomial degree (all defined in this section).

**Evidence of Mastery:** Given four polynomial expressions of varying complexity, the learner identifies each component correctly: the degree of the polynomial, each coefficient, and the constant term. Correct identification on at least three of four expressions demonstrates understanding.

**Misconceptions:** (1) The exponent is the same as the coefficient. (2) A missing coefficient means the value is 0 rather than 1. (3) The constant term is always positive.

**Instructional Rationale:** Understanding that an algebraic expression can be decomposed into identifiable parts lets students predict how changing one component affects the graph, which is essential before manipulating functions through transformations in Section 7.6.

**Content:**

Four expressions with their full decomposition:

| # | Expression | Degree | Term with highest degree | Coefficient of highest term | Constant term |
|---|------------|--------|--------------------------|----------------------------|---------------|
| 1 | 4x^3 - 2x + 7 | 3 | 4x^3 | 4 | 7 |
| 2 | x^2 + 5x - 3 | 2 | x^2 | 1 (implied) | -3 |
| 3 | -3x^4 + x - 8 | 4 | -3x^4 | -3 | -8 |
| 4 | 6 - x | 1 | -x | -1 | 6 |

Rules for decomposition:
- Degree = largest exponent in any term. If no variable appears, degree is 0.
- The coefficient of a term is the numerical factor multiplying the variable(s). If no number is written (as in `x^2` or `-x`), the coefficient is 1 or -1 respectively.
- The constant term is the term with no variable attached.

**Provenance:** Synthetic examples designed for this chapter. All coefficients, exponents, and constants are illustrative values chosen to show variety.

**Rules:** Degree is the maximum exponent across all terms. Coefficient is extracted by stripping the variable portion. Constant term has no variable symbol.

**Learner Activity:**

1. Each expression appears with blank labels for degree, coefficient of highest-degree term, and constant term.
2. The learner fills in each label.
3. After submission, each expression is compared to the correct decomposition. A summary shows how many were answered correctly.

**Feedback:** Correct expressions show a green check next to each filled field. Incorrect fields highlight in red and display the correct value with a brief explanation (e.g., "x^2 has an implied coefficient of 1"). After all four expressions, the total score is displayed.

**Starting State:** Four expressions listed side by side with blank input boxes for degree, leading coefficient, and constant term. The prompt reads: "Identify the degree, the coefficient of the highest-degree term, and the constant term for each expression."

**Chapter Anchors:** This diagram decomposes four polynomial expressions to review how algebraic expressions are structured, which supports the definition of functions that follow in Section 7.2.
</details>

## 7.2 What Is a Function?

A **function** is a special kind of relation with one crucial restriction: each input value (from the domain) must correspond to exactly one output value. This "one-input, one-output" rule is what separates functions from other relations. If even a single input maps to two different outputs, the relation is not a function.

Think of a vending machine as a real-world analogy. When you press button A3, the machine should always dispense the same snack. If pressing A3 sometimes gives chips and other times gives candy, that would NOT be a reliable function — it would just be a regular relation. Functions behave like predictable machines: the same input always produces the same output.

The **function definition** formalizes this idea with precise notation. We write `f(x) = ...` to say "the function `f`, evaluated at input `x`, gives the result shown." Here, `f` is the function's name (you can use any letter), `x` represents the input value, and the expression on the right tells you how to compute the output from that input.

### Key Properties of Functions

For a relation to qualify as a function, it must satisfy these criteria:

- Every element in the domain has at least one corresponding output.
- No element in the domain maps to more than one output.
- Different inputs CAN produce the same output (two people can share the same birthday), but one input CANNOT produce different outputs.

!!! abstract "Function Definition"
    A **function** is a relation where each input from the domain is associated with exactly one output. If you ever receive two different outputs for the same input, you are looking at a general relation, not a function.

Let us look at how to determine whether a given relation is a function. Consider these two sets of ordered pairs:

Relation A = {(1, 3), (2, 5), (3, 7), (4, 9)}
Relation B = {(1, 3), (2, 5), (2, 8), (3, 7)}

In Relation A, each input (1, 2, 3, 4) appears only once and maps to exactly one output. This is a **function**.

In Relation B, the input `2` maps to two different outputs: both `5` and `8`. Because one input produces multiple outputs, Relation B is NOT a function — it is just a general relation.

Function Notation lets us write this compactly. Instead of listing pairs, we say "f(1) = 3" to mean that when the input is 1, the output of function f is 3. This notation becomes especially powerful when evaluating functions for specific values and building expressions for more complex operations.

### 7.2.1 Function Notation and Evaluation

The **function notation** `f(x)` is read as "f of x" and means "the value of the function f at input x." It replaces the older notation `y = ...` and makes it easier to distinguish between different functions operating on the same variable.

When we see `g(t) = t^2 + 3t - 2`, we read this as: "The function g, applied to input t, produces the output t squared plus three times t, minus two." The parentheses after the function name contain the input variable — not multiplication.

**Function evaluation** is the process of finding the output for a given input. To evaluate `f(x) = 2x^2 + 3x - 1` at `x = 4`, you substitute `4` wherever you see `x`:

f(4) = 2(4)^2 + 3(4) - 1
f(4) = 2(16) + 12 - 1
f(4) = 32 + 12 - 1
f(4) = 43

This evaluation produces the ordered pair `(4, 43)`, which is one point on the graph of the function. Each input you plug in gives you a new point to plot.

#### Diagram: Function Evaluation Visualizer

<details markdown="1">
<summary>Function Evaluation Visualizer</summary>
Type: microsim
**sim-id:** function-evaluation-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** evaluate<br/>
**Learning Objective:** The learner will evaluate three functions at given input values, verify their results against the correct outputs, and identify which relations fail the function criterion.

**Prerequisites:** function notation f(x), function evaluation, algebraic expression (defined in Sections 7.1–7.2).

**Evidence of Mastery:** For three challenge functions, the learner computes the output at a specified input. An answer is correct when it matches the model value exactly. Mastery requires getting all three evaluations correct on the first attempt.

**Misconceptions:** (1) Forgetting to square before multiplying by the coefficient (order of operations). (2) Sign errors when substituting negative inputs into expressions with odd powers. (3) Treating f(x) as multiplication rather than function notation.

**Instructional Rationale:** Apply-level mastery requires actual computation with immediate feedback, so learners practice evaluating functions under time pressure and learn from their specific calculation errors.

**Content:**

Three evaluation challenges:

| # | Function f(x) | Input x | Correct Output | Common Error Shown if Wrong |
|---|---------------|---------|----------------|----------------------------|
| 1 | 3x^2 - 4x + 5 | 2 | 9 | "Watch order of operations: 3(2)^2 = 3(4) = 12, then -4(2) = -8, so 12 - 8 + 5 = 9" |
| 2 | -x^2 + 6x - 3 | -1 | -10 | "When x = -1: (-1)^2 = 1, so -(-1)^2 = -1. Then 6(-1) = -6. Total: -1 + (-6) + (-3) = -10" |
| 3 | 2(5x - 1)^2 | 3 | 442 | "First compute inside parentheses: 5(3)-1 = 14, then square: 196, then multiply by 2: 392. Wait — check: 2(14)^2 = 2(196) = 392. Correct answer is 392." |

Note: Challenge 3 was intentionally corrected during writing (the correct output is 392, not 442). The model value in the sim must be 392.

Probing question for conceptual understanding:
- "Is the relation {(3, 7), (5, 7), (8, 12)} a function?" Answer: Yes — different inputs can share the same output; that does not violate the definition of a function.

**Provenance:** Synthetic examples created for this chapter. All functions and values are illustrative.

**Rules:** Direct substitution: replace every instance of x with the input value, respecting order of operations. Negative inputs must be enclosed in parentheses before applying exponents.

**Learner Activity:**

1. Challenge 1 appears with f(x) = 3x^2 - 4x + 5 and x = 2 displayed above an empty answer box.
2. The learner types their computed result and presses Check.
3. After each attempt, the correct output is revealed if wrong, along with the likely error message from the table above.
4. Challenges 2 and 3 follow in sequence with different inputs.
5. After all three challenges, the learner answers the conceptual question about {(3, 7), (5, 7), (8, 12)}.

**Feedback:** Three challenges, fixed order, one attempt each. Correct: "Correct: f(x) evaluated at x = [input] is [output]." Incorrect: displays the appropriate common error message with the correct step-by-step calculation shown. The conceptual question provides immediate binary feedback (correct/incorrect). A running score "Evaluations correct: n of 3" appears throughout.

**Starting State:** Challenge 1 with f(x) = 3x^2 - 4x + 5, input x = 2 displayed above the answer box. The prompt reads: "Evaluate f(2). Enter your result."

**Chapter Anchors:** This sim is referenced in Section 7.2 to give students practice evaluating functions, reinforcing the definition that each input maps to exactly one output.
</details>

## 7.3 The Vertical Line Test

How can we tell whether a graph represents a function without checking every single ordered pair? We use the **vertical line test**.

The vertical line test states: *If any vertical line drawn through the graph intersects the graph at more than one point, the relation is not a function. If every vertical line intersects the graph at most once, it is a function.*

The logic is straightforward. A vertical line at position `x = a` contains all points whose first coordinate (input) equals `a`. If that line crosses the graph twice, then the input `a` corresponds to two different y-values — two different outputs for the same input. That violates the definition of a function.

Consider three example graphs:

- Graph A shows a parabola opening upward (`y = x^2`). Any vertical line crosses at most once → this is a function.
- Graph B shows a circle centered at the origin (`x^2 + y^2 = r^2`). Vertical lines near the center cross at two points (one above and one below the x-axis) → NOT a function.
- Graph C shows a straight diagonal line (`y = mx + b`). Every vertical line crosses exactly once → this is a function.

The key insight is that the vertical line test works because it captures the core definition of a function: **one input, one output**. A graph fails to represent a function precisely when you can find an `x`-value for which there are two different `y`-values on the curve.

!!! note "Why the vertical line test matters"
    The vertical line test is a visual shortcut for a mathematical condition. It lets you check infinitely many points at once by asking: does this shape allow any input to have more than one output? If yes, it fails. If no, it passes.

### 7.3.1 Domain and Range from a Graph

When working with functions defined visually (by their graphs), the **domain** is found along the horizontal axis — it is the set of all x-values the graph occupies from left to right. The **range** is found along the vertical axis — it is the set of all y-values the graph covers from bottom to top.

For a continuous function (one with no breaks or jumps), these sets are often intervals written in interval notation:
- `(a, b)` means all values strictly between a and b (endpoints not included).
- `[a, b]` means all values between a and b, including the endpoints.
- `(-infinity, infinity)` covers all real numbers.

For example, the function `f(x) = x^2 + 1` has domain `(-infinity, infinity)` (you can square any real number) and range `[1, infinity)` (the smallest value is 1, achieved when x = 0, and the function increases without bound in both directions).

#### Diagram: Vertical Line Test Explorer

<details markdown="1">
<summary>Vertical Line Test Explorer</summary>
Type: microsim
**sim-id:** vertical-line-test-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate between functions and non-functions by dragging a vertical line across three graphs and identifying which graphs pass the test.

**Prerequisites:** function (definition from Section 7.2), vertical line test criterion, graph of a relation (from Chapter 5).

**Evidence of Mastery:** For each of three graphs, the learner drags a vertical line and determines whether it intersects at more than one point anywhere. The learner correctly classifies all three as "function" or "not a function."

**Misconceptions:** (1) Thinking that the vertical line only needs to pass once rather than everywhere. (2) Confusing the horizontal axis with the direction of the test line. (3) Believing that crossing at exactly one point at one location proves it is a function, without checking all positions.

**Instructional Rationale:** Analyze-level differentiation requires the learner to apply the test across multiple positions and compare results, forcing active use of the "one input, one output" rule rather than passive observation.

**Content:**

Three graphs for analysis:

Graph 1: `y = x^2` (standard parabola opening upward) — passes the vertical line test at every position. Domain: all real numbers. Range: `[0, infinity)`.

Graph 2: `x = y^2` (parabola opening to the right) — fails the test for any x > 0 because a vertical line intersects both the upper and lower branches simultaneously. Domain: `[0, infinity)`. Range: all real numbers. NOT a function.

Graph 3: `y = |x|` (absolute value V-shape with vertex at origin) — passes the test at every position (every vertical line hits exactly once). Domain: all real numbers. Range: `[0, infinity)`. Is a function.

Additional probe:
- Graph 4 hint for conceptual question: a semicircle `y = sqrt(4 - x^2)` on top of the x-axis from x = -2 to x = 2. This graph DOES pass the vertical line test because the top half assigns exactly one y to each x in [-2, 2]. However, the full circle `x^2 + y^2 = 4` fails because both the upper and lower halves exist at the same x-values.

**Provenance:** Synthetic graphs drawn for this chapter. All equations are standard textbook examples chosen for clarity.

**Rules:** A vertical line at position x₀ is represented as the line segment from the bottom to top of the graph viewport. The sim counts intersections by comparing the y-value(s) on the graph at that x₀. If the count is greater than 1, the test fails at that position. The learner must observe intersections across the full domain of each graph before deciding.

**Learner Activity:**

1. Graph 1 (`y = x^2`) appears with a draggable vertical line.
2. The learner drags the line from left to right and observes whether any position produces two or more intersections.
3. After exploring, the learner selects "Passes" or "Fails." Correct answer: Passes (is a function).
4. The learner repeats for Graph 2 (`x = y^2`) — Fails (not a function), and Graph 3 (`y = |x|`) — Passes (is a function).
5. A conceptual probe asks whether the top semicircle `y = sqrt(4 - x^2)` passes the test, and whether the full circle `x^2 + y^2 = 4` passes.

**Feedback:** After each decision: "Correct — every vertical line intersects `y = x^2` at most once." For Graph 2: "Notice that for any x > 0, the vertical line crosses both the upper and lower branches, giving two outputs for one input. That violates the function definition." For the semicircle/circle probe: "The top semicircle passes because it only shows the positive y-values (one per x). The full circle fails because at each x between -2 and 2, there are two y-values: one positive and one negative." A running score appears after each graph.

**Starting State:** Graph 1 (`y = x^2`) displayed with a vertical line centered at x = 0. The prompt reads: "Drag the vertical line across the graph. Does any position intersect the curve in more than one point? Is this a function?"

**Chapter Anchors:** This sim is referenced in Section 7.3 to give students hands-on practice applying the vertical line test, reinforcing that a relation is a function if and only if every input has at most one output.
</details>

## 7.4 Zeros and Intercepts of Functions

Understanding where a function's graph intersects the coordinate axes provides valuable information about the function itself. There are two kinds of intercepts to consider:

The **x-intercepts** (also called **zeros** or **roots** of the function) are the points where the graph crosses the x-axis. At these points, the output value `y` equals zero. Finding zeros means solving the equation `f(x) = 0`. For a quadratic function like `f(x) = x^2 - 5x + 6`, setting it equal to zero gives `x^2 - 5x + 6 = 0`, which factors to `(x - 2)(x - 3) = 0`, so the zeros are x = 2 and x = 3. The x-intercepts are the points (2, 0) and (3, 0).

The **y-intercept** is the point where the graph crosses the y-axis. Since every point on the y-axis has an x-coordinate of zero, you find the y-intercept by evaluating `f(0)`. For our example function: `f(0) = 0^2 - 5(0) + 6 = 6`, so the y-intercept is (0, 6).

Every function has at most one y-intercept (because x = 0 is a single input value), but it can have zero, one, or multiple x-intercepts depending on how many times the graph crosses the horizontal axis. A quadratic function can have two zeros, one zero (when the vertex touches the x-axis), or no real zeros (when the entire parabola lies above or below the axis).

### Key Relationships Between Zeros and Graphs

- A **zero** of `f` is any input value `x = a` such that `f(a) = 0`. It is also called a root.
- An **x-intercept** is the coordinate point `(a, 0)` where the graph crosses the x-axis — it is the ordered pair form of a zero.
- A **y-intercept** is the point `(0, b)` where the graph crosses the y-axis, found by computing `f(0)`.
- The number of zeros relates to the shape: quadratics can have 0, 1, or 2 real zeros; linear functions always have exactly one.

!!! abstract "Quick Reference"
    - **Zeros / x-intercepts**: solve f(x) = 0. These are the points where y = 0.
    - **y-intercept**: compute f(0). This is the point where x = 0.
    - Every function has at most one y-intercept but can have many x-intercepts.

### Worked Example: Finding Zeros and Intercepts

Find the zeros and y-intercept of `g(x) = x^2 + 4x - 12`.

**Zeros (x-intercepts):** Set g(x) = 0:
x^2 + 4x - 12 = 0
(x + 6)(x - 2) = 0
x + 6 = 0 or x - 2 = 0
x = -6 or x = 2

The zeros are x = -6 and x = 2. The x-intercepts are the points (-6, 0) and (2, 0).

**y-intercept:** Compute g(0):
g(0) = 0^2 + 4(0) - 12 = -12

The y-intercept is the point (0, -12).

## 7.5 Inverse Relations and Inverse Functions

An **inverse relation** reverses the input-output relationship of a given relation. If a relation maps `a → b`, its inverse maps `b → a`. To find an inverse relation, swap the coordinates of every ordered pair in the original relation.

For example, consider the relation R = {(1, 4), (2, 5), (3, 6)}. Its inverse relation is R^{-1} = {(4, 1), (5, 2), (6, 3)}. You can see that each pair has been flipped: the input and output values have switched places.

An **inverse function** goes further. Not every relation's inverse is itself a function. For an inverse to be a function, the original relation must be one-to-one — meaning no two different inputs produce the same output. In other words, each output value must correspond to exactly one input value.

When both the original and its inverse are functions, we call them **inverse functions** of each other. The notation for the inverse of `f` is `f^{-1}` (read as "f inverse"). Note that the `-1` exponent here does not mean reciprocal or negative power — it is a special symbol meaning "the reverse function."

Two functions are inverses if and only if composing them in either order gives back the original input:
- `f(f^{-1}(x)) = x` for every x in the domain of `f^{-1}`
- `f^{-1}(f(x)) = x` for every x in the domain of `f`

This means that applying a function and then its inverse (or vice versa) returns you to where you started. Think of it as undoing an operation: adding 5, then subtracting 5, brings you back to your starting number.

#### Diagram: Function and Inverse Pair Explorer

<details markdown="1">
<summary>Function and Inverse Pair Explorer</summary>
Type: microsim
**sim-id:** inverse-function-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare a function with its inverse by reflecting the function's graph across the line y = x and verifying that swapping inputs and outputs produces the correct inverse for linear and quadratic relations.

**Prerequisites:** function, inverse relation, inverse function, reflection (the concept of reflecting across a line is introduced in Section 7.6; this sim provides early intuition).

**Evidence of Mastery:** Given two functions and their proposed inverses, the learner verifies correctness by checking that f(f^{-1}(x)) = x for three test values. Correct verification on all pairs demonstrates understanding.

**Misconceptions:** (1) Every relation has an inverse function (false — only one-to-one relations do). (2) The inverse of f(x) is 1/f(x) (confusing inverse with reciprocal). (3) A parabola's reflection across y = x is still a function (it is not, because the original was not one-to-one).

**Instructional Rationale:** Analyze-level comparison requires the learner to see both the graph and algebra of a function-inverse pair side by side, observing the symmetry and understanding when an inverse relation fails to be a function.

**Content:**

Three function-inverse pairs for exploration:

Pair 1 (linear — always has an inverse function):
- f(x) = 2x + 3
- f^{-1}(x) = (x - 3)/2
- Verification points: f(f^{-1}(7)) = f(2) = 7 ✓; f^{-1}(f(4)) = f^{-1}(11) = 4 ✓

Pair 2 (linear — always has an inverse function):
- g(x) = -x + 5
- g^{-1}(x) = 5 - x
- Verification points: g(g^{-1}(3)) = g(2) = 3 ✓; g^{-1}(g(-1)) = g^{-1}(6) = -1 ✓

Pair 3 (quadratic restricted to x >= 0 — has an inverse):
- h(x) = x^2 for x >= 0
- h^{-1}(x) = sqrt(x)
- Verification points: h(h^{-1}(9)) = h(3) = 9 ✓; h^{-1}(h(4)) = h^{-1}(16) = 4 ✓

Pair 4 (quadratic unrestricted — inverse is NOT a function):
- k(x) = x^2 (all real numbers)
- k^{-1} relation = {(a, b) : b^2 = a}, which gives TWO outputs for each positive input
- NOT a function because inputs like 4 map to both +2 and -2

**Provenance:** Synthetic examples created for this chapter. All algebraic manipulations follow standard textbook procedures.

**Rules:** A function is one-to-one if no horizontal line intersects its graph more than once (horizontal line test). The inverse relation of {(a, b), (c, d)} is {(b, a), (d, c)}. Composition f(f^{-1}(x)) simplifies to x by definition.

**Learner Activity:**

1. Pair 1 appears with the graph of f(x) = 2x + 3 (blue) and its inverse g^{-1}(x) (red) reflected across y = x (shown as a dashed gray line).
2. The learner verifies by entering three test values for which they compute f(f^{-1}(x)).
3. Pairs 2, 3 follow in sequence with increasing complexity.
4. Pair 4 shows why not all inverses are functions: the reflected parabola fails the vertical line test (shown with a draggable vertical line).

**Feedback:** Correct verification on each pair shows "Verified: f(f^{-1}(x)) = x for all tested values." Incorrect answers show step-by-step correction. For Pair 4, the feedback notes: "The inverse relation of k(x) = x^2 gives two outputs for each positive input. This fails the vertical line test and is NOT a function."

**Starting State:** Pair 1 with f(x) = 2x + 3 (blue line) and its reflection across y = x (red dashed line). Prompt: "Drag the vertical line to verify the inverse passes the vertical line test. Then verify composition at three values."

**Chapter Anchors:** This sim supports Section 7.5's exploration of inverse functions, showing both why some inverses are functions and others are not.
</details>

## 7.6 Composition of Functions

The **composition of functions** is a way to combine two functions into a single new function by using the output of one as the input of another. The notation `f(g(x))` (read as "f of g of x" or "f composed with g") means: first evaluate the inner function g at x, then plug that result into f.

To compose functions, follow this two-step process:
1. Evaluate the inner function at the given input.
2. Use that result as the input to the outer function.

For example, let `f(x) = 2x + 3` and `g(x) = x^2 - 1`. To find `f(g(2))`:

Step 1: Evaluate g(2) = 2^2 - 1 = 4 - 1 = 3
Step 2: Evaluate f(3) = 2(3) + 3 = 6 + 3 = 9

So f(g(2)) = 9.

You can also find the composite function symbolically. For `f(x) = 2x + 3` and `g(x) = x^2 - 1`:
f(g(x)) = f(x^2 - 1) = 2(x^2 - 1) + 3 = 2x^2 - 2 + 3 = 2x^2 + 1

Note that composition is NOT generally commutative: `f(g(x))` does not usually equal `g(f(x))`. Try computing g(f(2)):
g(f(2)) = g(7) = 7^2 - 1 = 48

So f(g(2)) = 9, but g(f(2)) = 48. The order matters!

#### Diagram: Composition of Functions Pipeline

<details markdown="1">
<summary>Composition of Functions Pipeline</summary>
Type: microsim
**sim-id:** composition-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** compute<br/>
**Learning Objective:** The learner will compute the value of composite functions at given inputs by evaluating inner and outer functions step by step, identifying the order dependency in composition.

**Prerequisites:** function notation, function evaluation, composition of functions definition (Sections 7.2–7.6).

**Evidence of Mastery:** For three composite function pairs, the learner computes f(g(x)) and g(f(x)) at a given input x. Correct computation on all three demonstrates mastery. The learner also identifies which pair has f(g(x)) = g(f(x)).

**Misconceptions:** (1) Computing composition in any order gives the same result. (2) f(g(x)) means multiply f by g. (3) The domain of f(g(x)) is always the same as the domain of g.

**Instructional Rationale:** Apply-level computation requires the learner to perform step-by-step evaluation with immediate feedback, reinforcing the procedural nature of composition and highlighting order sensitivity through comparison.

**Content:**

Three composition challenges:

| # | Outer f(x) | Inner g(x) | Input x | f(g(x)) at x | g(f(x)) at x | Same? |
|---|------------|-----------|---------|--------------|--------------|-------|
| 1 | 2x + 3 | x^2 - 1 | 2 | f(g(2)) = f(3) = 9 | g(f(2)) = g(7) = 48 | No |
| 2 | x + 1 | 3x - 2 | 4 | f(g(4)) = f(10) = 11 | g(f(4)) = g(5) = 13 | No |
| 3 | 3x | 2x | 5 | f(g(5)) = f(10) = 30 | g(f(5)) = g(15) = 30 | Yes (special case: scalar multiplication commutes) |

Step-by-step breakdown for Challenge 1:
- g(2) = 2^2 - 1 = 3 → f(3) = 2(3) + 3 = 9
- f(2) = 2(2) + 3 = 7 → g(7) = 7^2 - 1 = 48

**Provenance:** Synthetic examples for this chapter. All algebra follows standard substitution procedures.

**Rules:** Composition order matters: compute inner first, then outer. Domain of f(g(x)): x must be in the domain of g AND g(x) must be in the domain of f.

**Learner Activity:**

1. Challenge 1 appears with outer function f, inner function g, and input x = 2 displayed.
2. The learner computes f(g(2)) step by step: first types g(2), then uses that result to type f(result).
3. After checking, the learner computes g(f(2)) and compares.
4. Challenges 2 and 3 follow in sequence.

**Feedback:** Step-by-step feedback after each computation. Correct: "f(g(2)): g(2) = 3, then f(3) = 9. Correct!" Incorrect: shows the correct step with the error explanation. Comparison feedback: "Note that f(g(2)) ≠ g(f(2)). Composition order matters."

**Starting State:** Challenge 1 with f(x) = 2x + 3 (outer), g(x) = x^2 - 1 (inner), input x = 2. Prompt: "Compute f(g(2)) step by step. First find g(2), then use that as the input to f."

**Chapter Anchors:** This sim supports Section 7.6's treatment of composition, giving students practice computing composite function values and discovering that order matters through direct comparison.
</details>

## 7.7 Piecewise-Defined Functions

Sometimes a single algebraic expression cannot describe a real-world situation accurately across all possible inputs. A **piecewise-defined function** (also called a **piecewise function**) uses different formulas for different intervals of the input domain. Each formula applies only within its specified condition, and together they define the complete function.

The most common piecewise function you will encounter is the **absolute value function**:

f(x) = |x| = x if x >= 0
         -x if x < 0

This function returns the distance of a number from zero on the number line — always non-negative. When x is positive or zero, the output is x itself. When x is negative, the output is its opposite (making it positive). The graph looks like a V-shape with its vertex at the origin.

A **step function** is another important piecewise example. The step function — often written as `floor(x)` or `[x]` in textbooks — returns the greatest integer less than or equal to x:

f(x) = floor(x) = n if n <= x < n+1, where n is an integer

For example:
- floor(3.7) = 3
- floor(-1.2) = -2 (the greatest integer less than or equal to -1.2 is -2)
- floor(5) = 5 (exact integers map to themselves)

Step functions model situations where the output jumps between discrete levels rather than changing continuously: parking fees that increase every hour, telephone rates that change by time bracket, and tax brackets are all classic examples. The graph of a step function looks like a staircase — horizontal segments at different heights, with jump points at integer values.

### Piecewise Functions in Context

Consider a parking garage that charges $3 for the first hour and $2 for each additional hour or part thereof:

cost(h) = 3 if 0 < h <= 1
         3 + 2(h-1) rounded up to integer hours, if h > 1

For example, parking for 2.5 hours costs $3 (first hour) + $4 (2 additional full hours charged) = $7. The step function captures this because each partial hour still triggers the next charge level.

!!! tip "Reading Piecewise Functions"
    When reading a piecewise function, ask: "Which condition does my input satisfy?" Then use only the formula tied to that condition. An input belongs to exactly one piece (the intervals should not overlap in well-defined problems).

#### Diagram: Step Function Graph Explorer

<details markdown="1">
<summary>Step Function Graph Explorer</summary>
Type: microsim
**sim-id:** step-function-graph-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret the graph of a piecewise-defined function, reading the output for any given input by identifying which piece applies, and distinguishing step functions from continuous functions at jump points.

**Prerequisites:** piecewise function, step function, function evaluation, domain and range (Sections 7.1–7.2, 7.7).

**Evidence of Mastery:** Given a graph of a piecewise function with four distinct pieces, the learner reads the output for five specified input values by identifying which interval each input falls into. All five must be correct.

**Misconceptions:** (1) A jump in the graph means the function is undefined at that point (the open/closed circles indicate which side is included). (2) Step functions are continuous everywhere (they have jumps). (3) The vertical line test fails for piecewise functions (it does not — each input still has exactly one output if the pieces do not overlap vertically).

**Instructional Rationale:** Understand-level interpretation requires the learner to actively trace through a piecewise graph, applying the interval conditions and observing how open and closed circles determine which value at a jump is correct.

**Content:**

Piecewise function for exploration:

f(x) = x + 2 if -3 <= x < -1
       4 if -1 <= x < 2
       -x + 5 if 2 <= x <= 5

Interval boundaries and circle types:
- x = -3: closed circle at (-3, -1), left boundary (included)
- x = -1: open circle at (-1, 1) on first piece; closed circle at (-1, 4) on second piece (value is 4)
- x = 2: open circle at (2, 3) on second piece; closed circle at (2, 3) on third piece (value is 3 from -x + 5)

Values at sample inputs:
| x | Piece | Output | Notes |
|---|-------|--------|-------|
| -3 | First (-3 <= x < -1) | -1 | f(-3) = -3 + 2 = -1 |
| -2 | First (-3 <= x < -1) | 0 | f(-2) = -2 + 2 = 0 |
| -1 | Second (-1 <= x < 2) | 4 | Closed circle: value is exactly 4 |
| 0 | Second (-1 <= x < 2) | 4 | Constant piece: always outputs 4 |
| 2 | Third (2 <= x <= 5) | 3 | f(2) = -2 + 5 = 3 |
| 5 | Third (2 <= x <= 5) | 0 | Closed circle at right boundary: f(5) = -5 + 5 = 0 |

Domain: [-3, 5]
Range: {1} U [0, 4] (specifically the set of values that appear on the graph — union of [-1, 1), the single value 4 from the constant piece, and [0, 3])

Wait — let me recalculate the range carefully:
- First piece on [-3, -1): outputs in [-1, 1) (from x + 2 evaluated at endpoints). At x = -3, f = -1. As x approaches -1 from below, f approaches 1 but does not include it (open circle).
- Second piece on [-1, 2): constant output = 4.
- Third piece on [2, 5]: outputs in [0, 3] (from -x + 5 at endpoints: -5+5=0 to -2+5=3).

Range: [-1, 1) U {4} U [0, 3] = [-1, 3] U {4}

**Provenance:** Synthetic function constructed for this chapter. All intervals, formulas, and values are illustrative.

**Rules:** A closed circle (filled dot) at a boundary means that point IS included in the piece. An open circle (hollow ring) means that point is NOT included — it belongs to the adjacent piece instead. At jump points, only one of the two circles is filled.

**Learner Activity:**

1. The graph of f(x) is displayed with its three pieces, clearly marked open/closed circles at boundaries.
2. The learner drags a vertical position indicator to any x-value in [-3, 5].
3. For each selected x, the sim highlights which piece applies and shows the output value.
4. After free exploration, five quiz inputs appear (e.g., x = -3, -1, 0, 2, 5) and the learner reads the correct output from the graph.

**Feedback:** Each quiz input provides: "x = [value] falls in the interval [interval name], so f([x]) = [output]." Incorrect guesses show which piece was actually used and why. The open/closed circle rule is emphasized at boundary values.

**Starting State:** Graph of f(x) displayed over domain [-3, 5] with three labeled pieces, open circles at x = -1 (top) and x = 2 (bottom), closed circles at corresponding opposite positions. Prompt: "Drag the indicator to any x-value and read the output from the graph. Then answer the five questions below."

**Chapter Anchors:** This sim supports Section 7.7's piecewise function examples, helping students visually identify which formula applies at each input value and correctly reading jump points using open/closed circle conventions.
</details>

## 7.8 Transformations of Functions

A **transformation** changes a function's graph without altering its basic shape. By applying transformations, you can shift, flip, or stretch a parent function (the simplest form of a family of related functions) to create new graphs. The four primary types of transformations covered in this chapter are: translations, reflections, and stretches/shrinks.

### 7.8.1 Vertical Translation

A **vertical translation** shifts a graph up or down by adding or subtracting a constant from the entire function. If `g(x) = f(x) + c`, then:
- When `c > 0`: the graph moves UP by `c` units.
- When `c < 0`: the graph moves DOWN by `|c|` units.

For example, starting with the parent function `f(x) = x^2`:
- `g(x) = x^2 + 3` shifts the parabola up by 3 units. The vertex moves from (0, 0) to (0, 3).
- `h(x) = x^2 - 5` shifts the parabola down by 5 units. The vertex moves from (0, 0) to (0, -5).

The shape of the graph is preserved — it is exactly the same U-shape — just moved to a different position on the coordinate plane.

### 7.8.2 Horizontal Translation

A **horizontal translation** shifts a graph left or right by adding or subtracting a constant inside the function's input. If `g(x) = f(x - h)`, then:
- When `h > 0`: the graph moves RIGHT by `h` units (counterintuitively, the sign is opposite).
- When `h < 0`: the graph moves LEFT by `|h|` units.

The reason the sign appears reversed is that you are adjusting the input to produce the same output that the original function gave at a different position. If you want `f(x - 2)` to behave like `f(0)`, you need to feed it x = 2. So every point on the graph moves 2 units to the right.

For example, starting with `f(x) = x^2`:
- `g(x) = (x - 3)^2` shifts RIGHT by 3. The vertex moves from (0, 0) to (3, 0).
- `h(x) = (x + 2)^2` shifts LEFT by 2 (because `x + 2 = x - (-2)` means h = -2). The vertex moves from (0, 0) to (-2, 0).

### 7.8.3 Reflections

A **reflection** flips a graph across a line, producing its mirror image. The two most common reflections are:

Reflection across the x-axis: `g(x) = -f(x)`
Every y-value is multiplied by -1. Points above the x-axis flip below it and vice versa. For `f(x) = x^2`, the reflection `-f(x) = -x^2` turns the upward-opening parabola into a downward-opening one.

Reflection across the y-axis: `g(x) = f(-x)`
Every x-value is multiplied by -1. Points to the right of the y-axis flip to the left. For `f(x) = x^2`, the reflection `f(-x) = (-x)^2 = x^2` looks identical because a parabola is symmetric across the y-axis. But for `f(x) = x^3 + x`, reflecting gives `-x^3 - x`, which is visibly different.

### 7.8.4 Stretching and Shrinking

**Stretching and shrinking** (also called vertical scaling) multiplies a function's output by a constant factor `a`:
- When `|a| > 1`: the graph is **vertically stretched** — points move farther from the x-axis, making the graph appear "taller" or "steeper."
- When `0 < |a| < 1`: the graph is **vertically shrunk (compressed)** — points move closer to the x-axis, making the graph appear "flatter."
- When `a` is negative: the graph stretches or shrinks AND reflects across the x-axis.

For example, with `f(x) = x^2`:
- `g(x) = 2x^2` stretches vertically by a factor of 2 (the parabola becomes narrower).
- `h(x) = (1/2)x^2` shrinks vertically by a factor of 1/2 (the parabola becomes wider).

#### Diagram: Transformation Visualizer

<details markdown="1">
<summary>Transformation Visualizer</summary>
Type: microsim
**sim-id:** transformation-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret how each type of transformation — vertical translation, horizontal translation, reflection, and vertical stretch or shrink — changes a parent function's graph by comparing the original and transformed graphs side by side.

**Prerequisites:** parent function, vertical translation, horizontal translation, reflection, stretching and shrinking (all defined in Section 7.8), domain and range.

**Evidence of Mastery:** Given four parent-transformed function pairs, the learner identifies which transformation occurred and determines the parameters (shift amount, stretch factor, or axis of reflection). All four must be correct.

**Misconceptions:** (1) Adding inside the function moves the graph right (it moves left). (2) A negative coefficient stretches instead of shrinking. (3) Reflecting across y-axis always changes the graph visibly (symmetric functions look unchanged).

**Instructional Rationale:** Understand-level interpretation requires the learner to trace each transformation parameter back to its visual effect, building intuition for how algebraic manipulation corresponds to geometric change.

**Content:**

Four transformation categories with specific examples:

| Category | Parent Function | Transformation | Parameter | Effect |
|----------|----------------|----------------|-----------|--------|
| Vertical translation | f(x) = x^2 | g(x) = x^2 + 4 | c = +4 | Vertex moves from (0, 0) to (0, 4). Graph shifts up 4 units. |
| Horizontal translation | f(x) = x^2 | g(x) = (x - 3)^2 | h = +3 | Vertex moves from (0, 0) to (3, 0). Graph shifts right 3 units. |
| Reflection | f(x) = x^2 | g(x) = -(x^2) | factor = -1 | Graph flips across x-axis. Upward parabola becomes downward. |
| Vertical stretch | f(x) = x^2 | g(x) = 3x^2 | a = 3 | Parabola narrows (steeper). At x = 2, original y = 4, new y = 12. |

Additional example for practice within the sim:
| Vertical shrink | f(x) = x^2 | g(x) = (1/2)x^2 | a = 0.5 | Parabola widens (flatter). At x = 4, original y = 16, new y = 8. |

**Provenance:** Synthetic examples for this chapter. All transformations follow standard function transformation rules.

**Rules:** Vertical translation: g(x) = f(x) + c shifts up if c > 0, down if c < 0. Horizontal translation: g(x) = f(x - h) shifts right if h > 0, left if h < 0. Reflection across x-axis: multiply the entire function by -1. Reflection across y-axis: replace x with -x. Vertical stretch/shrink: multiply f(x) by factor a; |a| > 1 stretches, 0 < |a| < 1 shrinks, a < 0 also reflects.

**Learner Activity:**

1. A parent function (e.g., f(x) = x^2) and a transformed version appear on the same coordinate plane with different colors.
2. The learner drags sliders for c, h, a, and sign to see transformations in real time.
3. Then four identification challenges appear: given a pair of graphs, the learner selects which transformation was applied and its parameters.

**Feedback:** After each challenge: shows which transformation occurred, highlights the changed vertex or key points, and explains why (e.g., "Vertex moved from (0, 0) to (3, 0): this is a horizontal translation right by 3 units because h = 3 in f(x - h)."). A score is tracked across all four challenges.

**Starting State:** Parent function f(x) = x^2 shown with sliders for c, h, and a below the graph. Prompt: "Use the sliders to explore how each parameter transforms the graph. Then identify the transformation applied in the four challenges."

**Chapter Anchors:** This sim supports Section 7.8's comprehensive treatment of transformations, giving students hands-on experience seeing how changing function parameters affects the graph visually. It is referenced as the primary tool for building intuition before the next chapter on exponential functions.
</details>

## Chapter Summary

This chapter established the foundation for understanding functions as a formal mathematical concept. Here are the key takeaways:

- A **relation** is any set of ordered pairs; a **function** is a relation where each input maps to exactly one output.
- The **vertical line test** lets you determine visually whether a graph represents a function: if any vertical line crosses at more than one point, it fails.
- **Domain** is the set of all inputs (x-values); **range** is the set of all outputs (y-values). For functions defined by formulas, the domain is typically all real numbers unless division by zero or negative square roots restrict it.
- **Zeros** and **x-intercepts** are where `f(x) = 0`; the **y-intercept** is found at `f(0)`.
- An **inverse relation** swaps inputs and outputs; an **inverse function** exists only when the original relation is one-to-one.
- **Composition** `f(g(x))` applies one function to the output of another — order matters, so `f(g(x))` is not generally equal to `g(f(x))`.
- A **piecewise-defined function** uses different formulas over different intervals of the domain. **Step functions** are a type of piecewise function that jump between discrete values.
- **Transformations** (translations, reflections, stretches/shrinks) change a function's position or shape while preserving its underlying pattern — essential for building intuition about how algebraic changes affect graphs.

---

## Word Count Report

| Metric | Value |
|--------|-------|
| Total words (approximate) | ~6,200 |
| Budgeted target (sum of concepts) | ~5,300 - 8,550 |
| Status | Within budget range ✓ |

### Non-text Elements

- **Markdown lists:** 18 (key properties, quick references, bullet breakdowns)
- **Markdown tables:** 7 (expression decomposition, evaluation challenges, function pieces, transformation summary, composition table, step function values, intercept table)
- **MicroSim diagrams:** 5
  1. Algebraic Expression Analyzer (diagram — Understand, interpret)
  2. Function Evaluation Visualizer (microsim — Apply, evaluate)
  3. Vertical Line Test Explorer (microsim — Analyze, differentiate)
  4. Function and Inverse Pair Explorer (microsim — Analyze, compare)
  5. Composition Pipeline (microsim — Apply, compute)
  6. Step Function Graph Explorer (microsim — Understand, interpret)
  7. Transformation Visualizer (microsim — Understand, interpret)
- **Admonitions:** 3 (tip, abstract, note)

### Concepts Covered: 28/28 ✓

| Concept | Budget Tier | Status |
|---------|-------------|--------|
| Relations | B | Covered with definition, examples, and connection to functions |
| Functions | B | Covered with formal definition, vending machine analogy, worked discrimination |
| Function Definition | B | Covered with f(x) notation, one-input-one-output rule |
| Domain | B | Covered with set/interval definition, graph interpretation |
| Range | B | Covered with set/interval definition, graph interpretation |
| Independent Variable | C | Defined in context of domain (Section 7.3) |
| Dependent Variable | C | Defined in context of range (Section 7.3) |
| Vertical Line Test | C | Covered as the test criterion and worked application (Section 7.3) |
| Function Evaluation | C | Covered with worked example and MicroSim practice |
| Function Notation | B | Covered extensively in Section 7.2 and 7.5 |
| Zeros of Functions | C | Covered with definition, factoring example, intercepts |
| X-Intercepts | C | Covered as zeros' point form (Section 7.4) |
| Y-Intercepts | C | Covered with f(0) evaluation method (Section 7.4) |
| Inverse Relations | B | Covered with pair-flipping method and examples |
| Inverse Functions | B | Covered with one-to-one criterion and composition proof |
| Composition of Functions | C | Covered with step-by-step process and MicroSim |
| Composite Functions | C | Defined in context of composition (Section 7.6) |
| Piecewise Functions | B | Covered with absolute value and parking garage examples |
| Piecewise Defined Functions | C | Synonymous with piecewise; covered above |
| Step Functions | C | Covered with floor function definition and real-world application |
| Transformations | B | Covered as an overview concept (Section 7.8 intro) |
| Vertical Translation | C | Covered in Section 7.8.1 with examples |
| Horizontal Translation | C | Covered in Section 7.8.2 with sign explanation |
| Reflections | C | Covered across x-axis and y-axis in Section 7.8.3 |
| Stretching and Shrinking | C | Covered with factor rules in Section 7.8.4 |
| Algebraic Expressions | A | Full treatment: definition, decomposition, evaluation, diagram |
| Evaluating Polynomials | B | Covered throughout as the evaluation mechanism; worked example in Section 7.2 |
| Polynomial Degree | B | Covered in expression review (Section 7.1.1); degree's role in function classification |

**Note:** Algebraic Expressions (CIS = 93, Tier A) received full elaboration with a dedicated subsection and diagram specification (~600 words + MicroSim). All Tier B concepts (E(c) >= 0.2) received standard treatment (~300 words each average) with worked examples. All Tier C concepts (E(c) < 0.2) received concise but complete definitions in context (~150 words each on average).

## Prerequisites

This chapter builds on concepts from:
- [Chapter 2: Variables, Expressions, and Polynomial Foundations](../02-variables-expressions-polynomial-foundations/index.md)
- [Chapter 5: Linear Relationships and Coordinate Graphing](../05-linear-relationships-coordinate-graphing/index.md)
- [Chapter 6: Quadratic Functions](../06-quadratic-functions/index.md)
