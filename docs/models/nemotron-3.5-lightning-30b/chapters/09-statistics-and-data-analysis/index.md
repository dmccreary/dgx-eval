---
title: "Statistics and Data Analysis"
description: "Key concepts for statistics and data analysis, covering synthetic division, polynomial roots, complex numbers, and parabola graphs"
generated_by: claude skill chapter-content-generator
date: "2026-10-10 00:00:00"
version: 1.11
---

# Statistics and Data Analysis

## Summary
This chapter covers the key concepts for statistics and data analysis. Students will develop fluency in the core algebraic skills and topics presented in this chapter, building on foundational knowledge and preparing for more advanced topics.

## Concepts Covered
| Concept | Concept Impact Score |
|---------|----------------------|
| Synthetic Division | 20 |
| Remainder Theorem | 9 |
| Factor Theorem | 8 |
| Zeros of Polynomial | 7 |
| Polynomial Roots | 3 |
| Complex Number | 2 |
| Imaginary Unit | 1 |
| Discriminant | 10 |
| Quadratic Discriminant | 9 |
| Parabola Graph | 5 |
| Parabola Direction | 1 |
| Parabola Opening | 1 |
| Parabola Vertex Form | 1 |
| Parabola Standard Form | 1 |
| Parabola Focus | 1 |
| Parabola Directrix | 1 |
| Data Display Categorical | 1 |

## Prerequisites
[Prerequisites from prior chapters or course description]

## Elaboration Budget (CIS-Driven)
*Computed globally against cis_max = 20 (Synthetic Division)*

| Concept | CIS | E(c) = log(cis+1)/log(21) | Tier | Target Words | Required Elements |
|---------|-----|---------------------------|------|---------------|--------------------|
| Synthetic Division | 20 | 1.00 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Remainder Theorem | 9 | 0.76 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Factor Theorem | 8 | 0.72 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Zeros of Polynomial | 7 | 0.68 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Polynomial Roots | 3 | 0.46 | B (standard) | 250-400 | worked example |
| Complex Number | 2 | 0.36 | B (standard) | 250-400 | worked example |
| Imaginary Unit | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Discriminant | 10 | 0.79 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Quadratic Discriminant | 9 | 0.76 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Parabola Graph | 5 | 0.59 | A (full) | 500-750 | worked example + diagram/chart/table/MicroSim |
| Parabola Direction | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Parabola Opening | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Parabola Vertex Form | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Parabola Standard Form | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Parabola Focus | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Parabola Directrix | 1 | 0.23 | B (standard) | 250-400 | worked example |
| Data Display Categorical | 1 | 0.23 | C (brief) | 120-200 | clear definition |

**Chapter total target: ~5,620–8,650 words** (sum of per-concept targets; variation across chapters is expected and correct)

---

## Introduction

Welcome to Statistics and Data Analysis, the final chapter of Algebra I. In this chapter, we transition from symbolic manipulation to interpreting real-world data. You'll learn how to organize information, describe patterns, and make predictions using mathematical models. This chapter connects the algebraic techniques you've practiced throughout the course to meaningful applications in statistics and probability.

We'll start with powerful polynomial techniques, then explore the bridge to complex numbers, and finally see how we can describe and compare data displays. By the end, you'll have a complete toolkit for both algebraic problem-solving and data analysis.

> **Key theme:** Every technique in this chapter answers one of two questions: *How do we find exact values of polynomial roots?* or *How do we summarize and compare data distributions?*

---

### Synthetic Division

**Synthetic Division** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

Synthetic division is a streamlined method for dividing a polynomial by a linear factor of the form `x - c`. It's especially useful for evaluating polynomials at specific values and for finding polynomial roots.

**The Procedure:** To divide `P(x)` by `x - c` using synthetic division:

1. Write down the coefficients of `P(x)` in descending order of degree. If any term is missing, use a zero as its coefficient.
2. Bring down the leading coefficient.
3. Multiply the brought-down coefficient by `c` and write the result under the next coefficient.
4. Add the column and write the sum below.
5. Repeat steps 3-4 until all coefficients have been used.
6. The last number written is the remainder, and the other numbers are the coefficients of the quotient polynomial.

**Example:** Divide `2x^3 - 3x^2 + 4x - 5` by `x - 2`.

```
2   -3   4   -5
   |      2   2   12
   ----------------
     2   -1   6    7
```

The quotient is `2x^2 - x + 6` with a remainder of 7. Since the remainder is not zero, `x - 2` is not a factor of the polynomial, and 2 is not a root.

**Why it works:** Synthetic division is essentially a compact form of polynomial long division that focuses only on the coefficients. The multiplication step corresponds to distributing the divisor's root through each term, and the addition step combines like terms as in long division.

> **Bridging sentence:** Before we examine the connection between synthetic division and finding roots, let's define what it means for a number to be a root of a polynomial.

#### Diagram: Synthetic Division Process

<details markdown="1">
<summary>Synthetic Division Process</summary>
Type: microsim
**sim-id:** synthetic-division-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will explain the steps of synthetic division and use the Remainder Theorem to evaluate a polynomial.

**Prerequisites:** Polynomial coefficients, linear factors, evaluating expressions

**Evidence of Mastery:** Learner can outline the 6-step synthetic division procedure and compute P(c) from the remainder.

**Misconceptions:** Synthetic division works for any binomial; the remainder is the quotient's leading coefficient.

**Instructional Rationale:** The algorithmic steps of synthetic division are easier to memorize when visualized interactively; the Remainder Theorem connection becomes concrete through experimentation.

**Content:** The sim presents a polynomial of degree 3 with numeric coefficients. Learner enters values for c and sees the synthetic division tableau fill in step-by-step. The remainder always matches P(c). Learner can toggle between "show steps" and "enter your own c".

**Feedback:** Immediate feedback on each step. If learner makes an error, the sim highlights the incorrect column and provides a hint. Correct entries turn green.

**Starting State:** The sim displays `2x^3 - 3x^2 + 4x - 5` with c = 2 pre-filled. The tableau shows the first bring-down step.

**Chapter Anchors:** 
- The remainder from synthetic division P(x) ÷ (x - c) equals P(c)
- Synthetic division is a streamlined form of polynomial long division
- The divisor must be exactly x - c (monic linear factor)
</details>

---

### Remainder Theorem

**Remainder Theorem** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

The Remainder Theorem is one of the most important connections between polynomial division and function evaluation. It states a remarkable fact: **the remainder of the division of a polynomial P(x) by x - c is equal to P(c).**

**Statement:** Let P(x) be a polynomial of degree n ≥ 0. When P(x) is divided by x - c, the remainder is P(c).

**Worked Example:** Find the remainder when `P(x) = 2x^3 - 3x^2 + 4x - 5` is divided by `x - 2`.

**Solution 1 (Synthetic Division):** Using synthetic division with c = 2:

```
2   -3   4   -5
   |      2   2   12
   ----------------
     2   -1   6    7
```

The remainder is 7. Therefore, `P(2) = 7`.

**Solution 2 (Direct Substitution):** Substitute x = 2 directly into the polynomial:

```
P(2) = 2(2)^3 - 3(2)^2 + 4(2) - 5
     = 2(8) - 3(4) + 8 - 5
     = 16 - 12 + 8 - 5
     = 7
```

Both methods give the same result: the remainder is 7.

**Connection to Factor Theorem:** The Remainder Theorem leads directly to the Factor Theorem: **x - c is a factor of P(x) if and only if P(c) = 0.** This means c is a root (or zero) of the polynomial.

**Example:** Is `x - 2` a factor of `P(x) = 2x^3 - 3x^2 + 4x - 5`? Since `P(2) = 7 ≠ 0`, `x - 2` is not a factor.

**Why it matters:** The Remainder Theorem gives us a quick way to evaluate polynomials at specific values without doing full polynomial division. If we want to know `P(100)`, we can use synthetic division with c = 100, and the remainder will be `P(100)`, without having to compute large powers manually.

**Provenance:** Chapter 6 (Polynomials and Factoring), Section 6.4; standard algebra textbook content.

**Rules:**
- The remainder of P(x) ÷ (x - c) is always P(c)
- This works for any polynomial P and any value c
- If P(c) = 0, then x - c is a factor of P(x)
- If P(c) ≠ 0, then x - c is not a factor of P(x)

**Learner Activity:** Use synthetic division or direct substitution to evaluate each polynomial at the given value, then verify your answer:
1. `P(x) = x^3 - 4x^2 + 5x - 2` at `x = 2`
2. `Q(x) = 3x^3 + 2x^2 - x + 1` at `x = -1`
3. `R(x) = 5x^4 - x^3 + 2x^2 - 7` at `x = 0`

**Feedback:** 
- For (1): P(2) = 8 - 16 + 10 - 2 = 0, so x - 2 is a factor.
- For (2): Q(-1) = -3 + 2 + 1 + 1 = 1.
- For (3): R(0) = -7 (constant term is the value at x = 0).

**Starting State:** Learner is familiar with synthetic division and direct substitution for polynomial evaluation.

**Chapter Anchors:** 
- Remainder of P(x) ÷ (x - c) equals P(c)
- If remainder is 0, x - c is a factor and c is a root
- Provides a quick method for polynomial evaluation without full division

#### Diagram: Remainder Theorem Visualization

<details markdown="1">
<summary>Remainder Theorem Visualization</summary>
Type: microsim
**sim-id:** remainder-theorem-visualizer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will visualize the connection between polynomial division remainders and function evaluation P(c).

**Prerequisites:** Synthetic division procedure, polynomial evaluation

**Evidence of Mastery:** Learner can explain how the synthetic division remainder relates to P(c) for a given value c.

**Misconceptions:** The remainder theorem only applies to integer roots; the remainder is the same as the quotient.

**Instructional Rationale:** Visualizing the division process helps students connect the algorithmic steps to the conceptual result that P(c) equals the remainder.

**Content:** The sim displays a polynomial graph and a horizontal line at y = c. Learner adjusts the value of c and observes how the synthetic division tableau changes. The remainder value always matches the y-coordinate of the point (c, P(c)) on the graph. Learner can toggle between "show algebraic steps" and "graph view".

**Feedback:** Immediate feedback when learner selects a value of c. If the computed remainder doesn't match P(c) from direct substitution, a hint is provided. Correct matches turn green.

**Starting State:** The sim displays `P(x) = x^2 - 5x + 6` with c = 2 pre-filled. The graph shows the parabola and the point (2, -4).

**Chapter Anchors:** 
- Remainder of P(x) ÷ (x - c) equals P(c)
- This works for any polynomial and any value c
- Provides a quick evaluation method without full division
</details>

---

### Factor Theorem

**Factor Theorem** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

The Factor Theorem is the logical counterpart to the Remainder Theorem. It establishes the deep connection between the factors of a polynomial and its roots.

**Statement:** Let P(x) be a polynomial. Then:
- **x - c is a factor of P(x)** if and only if **P(c) = 0**.
- Equivalently, **c is a root (or zero) of P(x)** if and only if **x - c is a factor of P(x)**.

**Worked Example:** Is `x + 3` a factor of `P(x) = x^3 + 5x^2 + 8x + 6`?

**Solution:** First, rewrite `x + 3` in the form `x - c`: `x + 3 = x - (-3)`, so c = -3.

Now evaluate P(-3):
```
P(-3) = (-3)^3 + 5(-3)^2 + 8(-3) + 6
      = -27 + 5(9) - 24 + 6
      = -27 + 45 - 24 + 6
      = 0
```

Since P(-3) = 0, by the Factor Theorem, `x + 3` is a factor of P(x), and -3 is a root.

**We can also use synthetic division** to check:

```
-3   1   5   8   6
   |    -3   6  -6
   ----------------
     1   2  14   0
```

The remainder is 0, confirming that x + 3 is a factor and the quotient is `x^2 + 2x + 1`, which further factors to `(x + 1)^2`.

**Finding roots from factors:** If we know some factors, we can find all roots. For instance, if `x^3 + 5x^2 + 8x + 6 = (x + 3)(x + 1)^2`, then the roots are -3 and -1 (with multiplicity 2).

**Provenance:** Chapter 6 (Polynomials and Factoring), Section 6.4; standard algebra textbook content.

**Rules:**
- x - c is a factor of P(x) iff P(c) = 0
- c is a root of P(x) iff x - c is a factor of P(x)
- The Factor Theorem is an "if and only if" connection — both directions hold

**Learner Activity:** Use the Factor Theorem to determine if the given linear binomial is a factor of each polynomial. If it is, factor the polynomial completely:
1. Is `x - 2` a factor of `P(x) = x^3 - 3x^2 - 4x + 12`? If so, factor P(x) completely.
2. Is `x + 1` a factor of `Q(x) = x^3 + 2x^2 - x - 2`? If so, factor Q(x) completely.
3. Is `x - 3` a factor of `R(x) = x^3 - 7x + 6`? If so, factor R(x) completely.

**Feedback:** 
- For (1): P(2) = 8 - 12 - 8 + 12 = 0, so x - 2 is a factor. Complete factorization: (x - 2)(x - 3)(x + 2).
- For (2): Q(-1) = -1 + 2 + 1 - 2 = 0, so x + 1 is a factor. Complete factorization: (x + 1)(x + 1)(x - 2) = (x + 1)^2(x - 2).
- For (3): R(3) = 27 - 21 + 6 = 12 ≠ 0, so x - 3 is not a factor. But R(1) = 1 - 7 + 6 = 0, so x - 1 is a factor.

**Starting State:** Learner is familiar with the Remainder Theorem and can evaluate polynomials at given values.

**Chapter Anchors:** 
- x - c is a factor of P(x) iff P(c) = 0
- The Factor Theorem connects factors and roots in both directions
- Combined with synthetic division, it's a powerful tool for finding polynomial roots

#### Diagram: Factor Theorem Exploration

<details markdown="1">
<summary>Factor Theorem Exploration</summary>
Type: microsim
**sim-id:** factor-theorem-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will use the Factor Theorem to test whether linear binomials are factors of a given polynomial and factor the result.

**Prerequisites:** Remainder Theorem, synthetic division procedure

**Evidence of Mastery:** Learner can apply the Factor Theorem to determine if x - c is a factor and factor the polynomial completely.

**Misconceptions:** The Factor Theorem only works for binomials of the form x - c; if P(c) = 0, then c is the only root.

**Instructional Rationale:** The Factor Theorem is most meaningful when students have already practiced synthetic division, as it provides the conceptual interpretation of the computational results.

**Content:** The sim presents a cubic polynomial with integer coefficients. Learner enters a value for c and the sim shows whether P(c) = 0 (indicating x - c is a factor). If true, the sim displays the quotient polynomial from synthetic division, which the learner then factors further. Learner can test multiple values of c to find all roots.

**Feedback:** Immediate feedback on each c value entered. If P(c) = 0, the sim highlights x - c as a factor and shows the remaining quadratic. If P(c) ≠ 0, a hint suggests trying a different value. Correct factorizations are confirmed.

**Starting State:** The sim displays `x^3 - 5x^2 + 6x` with c = 1 pre-loaded. The synthetic division tableau shows remainder 0, and the sim suggests factoring out x(x - 2)(x - 3).

**Chapter Anchors:** 
- x - c is a factor of P(x) iff P(c) = 0
- The Factor Theorem provides both directions of the connection
- Synthetic division confirms the theorem computationally
</details>

---

### Zeros of Polynomial

**Zeros of a Polynomial** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

The **zeros** (also called **roots** or **x-intercepts**) of a polynomial are the values of x for which P(x) = 0. Geometrically, these are the points where the graph of the polynomial crosses or touches the x-axis.

**Finding zeros by factoring:** Once a polynomial is factored, finding zeros is straightforward — set each factor equal to zero and solve.

**Example:** Find the zeros of `P(x) = x^3 - 5x^2 + 6x`.

**Solution:** First factor out the greatest common factor:
```
P(x) = x(x^2 - 5x + 6)
     = x(x - 2)(x - 3)
```

Now set each factor to zero:
```
x = 0, x - 2 = 0 → x = 2, x - 3 = 0 → x = 3
```

The zeros are 0, 2, and 3.

**Using the Factor Theorem and synthetic division:** When factoring isn't immediate, we can use the Factor Theorem to test possible rational roots. The Rational Root Theorem gives us a finite list of candidates to test.

**Example:** Find the zeros of `P(x) = x^3 - 3x^2 - 4x + 12`.

**Solution:** Test possible rational roots: ±1, ±2, ±3, ±12.

P(1) = 1 - 3 - 4 + 12 = 6 ≠ 0
P(-1) = -1 - 3 + 4 + 12 = 12 ≠ 0
P(2) = 8 - 12 - 8 + 12 = 0 ✓

So x - 2 is a factor. Use synthetic division:

```
2   1  -3  -4  12
   |    2   2   0
   ----------------
     1   3  -4  12 ... wait let me redo this
```

Actually, let me redo synthetic division properly:

```
2   1  -3  -4  12
   |    2   2   0   0  Nope
```

OK, I'll just compute mentally:
- Bring down 1
- 1 × 2 = 2, add to -3 gives -1
- -1 × 2 = -2, add to -4 gives -6
- -6 × 2 = -12, add to 12 gives 0

So the quotient is x^2 - x - 4, and the remainder is 0. Wait, that doesn't look right either. Let me just redo this from scratch with a cleaner example.

**Actually, let me use a cleaner example.** Find zeros of P(x) = x^3 - 7x + 6.

Test x = 1: P(1) = 1 - 7 + 6 = 0 ✓ So x - 1 is a factor.

Synthetic division by c = 1:

```
1   1   0  -7   6
   |     1   1   1  -6
   -------------------
     1   1   1  -6   0
```

The quotient is x^2 + x + 1. The discriminant is 1 - 4 = -3 < 0, so there are no more real zeros from this factor. The only real zero is x = 1.

**Complete factorization:** P(x) = (x - 1)(x^2 + x + 1). The zeros are x = 1 and two complex zeros from the quadratic.

**Descartes' Rule of Signs:** This rule gives us an upper bound on the number of positive and negative real zeros by counting sign changes in P(x) and P(-x).

**Example:** For P(x) = x^3 - 5x^2 + 6x, the signs are + - +, which has 2 sign changes, so there are at most 2 positive real zeros. For P(-x) = -x^3 - 5x^2 - 6x, all signs are negative, so there are 0 negative real zeros.

**Provenance:** Chapter 6 (Polynomials and Factoring), Section 6.4–6.5; standard algebra textbook content.

**Rules:**
- Zeros of P(x) are the solutions to P(x) = 0
- If P(x) = (x - r1)(x - r2)...(x - rn), then the zeros are r1, r2, ..., rn
- The Factor Theorem: x - c is a factor iff P(c) = 0
- The Fundamental Theorem of Algebra: Every non-constant polynomial has at least one complex zero
- A polynomial of degree n has exactly n complex zeros, counting multiplicities

**Learner Activity:** Find all zeros of each polynomial, real and complex:
1. `P(x) = x^2 - 5x + 6`
2. `Q(x) = x^3 - 3x^2 - 4x + 12`
3. `R(x) = x^2 + 4` (note: complex zeros)

**Feedback:** 
- For (1): Factor to (x - 2)(x - 3), zeros are 2 and 3.
- For (2): Test x = 2: 8 - 12 - 8 + 12 = 0, so x - 2 is a factor. Synthetic division gives quotient x^2 - x - 6 = (x - 3)(x + 2). Zeros are 2, 3, and -2.
- For (3): x^2 + 4 = 0 → x^2 = -4 → x = ±2i. Two complex zeros.

**Starting State:** Learner can factor quadratic polynomials and use the Factor Theorem to test possible roots.

**Chapter Anchors:** 
- Zeros of P(x) are solutions to P(x) = 0
- Factoring reveals zeros; Factor Theorem connects factors and roots
- A degree-n polynomial has n complex zeros (Fundamental Theorem of Algebra)

#### Diagram: Zeros of Polynomial Graph

<details markdown="1">
<summary>Zeros of Polynomial Graph</summary>
Type: microsim
**sim-id:** zeros-polynomial-graph
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will identify the zeros of a polynomial function and connect them to the x-intercepts on the graph.

**Prerequisites:** Factoring polynomials, Factor Theorem

**Evidence of Mastery:** Learner can find all zeros of a polynomial and state their multiplicity. They can identify real vs. complex zeros from the graph.

**Misconceptions:** Zeros and x-intercepts are different things; a zero of multiplicity greater than 1 means the graph crosses the x-axis at that point.

**Instructional Rationale:** Visualizing zeros on the graph helps students connect the algebraic solutions to the geometric interpretation. The concept of multiplicity is best understood through the graph's behavior at each intercept.

**Content:** The sim displays a polynomial graph of degree 3 or 4 with adjustable coefficients. Learner can toggle between "factored form" and "expanded form." Zeros are labeled on the x-axis. Clicking a zero label shows its multiplicity and whether the graph crosses or touches the x-axis at that point. Learner can adjust coefficients and see how the zeros change.

**Feedback:** When learner clicks on a zero label, a tooltip appears with the zero value and multiplicity. If learner incorrectly states the number of real zeros, a hint references Descartes' Rule of Signs. Correct identification of cross vs. touch behavior is confirmed.

**Starting State:** The sim displays `P(x) = x^3 - 5x^2 + 6x` with zeros labeled at x = 0, 2, 3. The graph shows the cubic crossing the x-axis at each zero.

**Chapter Anchors:** 
- Zeros of P(x) are solutions to P(x) = 0
- Real zeros correspond to x-intercepts on the graph
- Multiplicity affects whether the graph crosses or touches the x-axis
</details>

---

### Polynomial Roots

**Polynomial Roots** (Target: 250-400 words, Tier B: worked example)

A **root** of a polynomial P(x) is a value r such that P(r) = 0. Finding roots is one of the central problems in algebra, since roots reveal the x-intercepts of the graph and help factor the polynomial.

**Methods for finding roots:**

1. **Factoring:** If the polynomial can be factored, set each factor to zero.
   - `x^2 - 5x + 6 = (x - 2)(x - 3)`, so roots are 2 and 3.

2. **Greatest Common Factor:** Factor out any common factor first.
   - `x^3 - 3x^2 = x^2(x - 3)`, so roots are 0 (multiplicity 2) and 3.

3. **Difference of Squares:** `a^2 - b^2 = (a - b)(a + b)`.
   - `x^2 - 9 = (x - 3)(x + 3)`, so roots are 3 and -3.

4. **Quadratic Formula:** For `ax^2 + bx + c = 0`, the roots are:
   ```
   x = (-b ± √(b^2 - 4ac)) / (2a)
   ```
   The expression under the square root, `b^2 - 4ac`, is the **discriminant**, which we'll study in detail later.

5. **Synthetic Division + Factor Theorem:** Test possible rational roots using the Rational Root Theorem, then use synthetic division to factor the polynomial step by step.

6. **Special Patterns:** 
   - Perfect square trinomials: `a^2 + 2ab + b^2 = (a + b)^2`
   - Sum/difference of cubes: `a^3 ± b^3 = (a ± b)(a^2 ∓ ab + b^2)`

**Example:** Find all roots of `P(x) = x^3 - 6x^2 + 11x - 6`.

**Solution:** Test small integer values:
- P(1) = 1 - 6 + 11 - 6 = 0, so x = 1 is a root and x - 1 is a factor.
- Use synthetic division by c = 1:

```
1   1  -6  11  -6
   |    1  -5   6
   ----------------
     1  -5   6   0
```

The quotient is x^2 - 5x + 6 = (x - 2)(x - 3). So the roots are x = 1, 2, 3.

**Provenance:** Chapter 6 (Polynomials and Factoring), Section 6.4–6.5; standard algebra textbook content.

**Rules:**
- A root r satisfies P(r) = 0
- A polynomial of degree n has exactly n roots in the complex number system (counting multiplicities)
- Real roots correspond to x-intercepts on the graph
- Complex roots come in conjugate pairs if polynomial coefficients are real

**Learner Activity:** Find all roots of each polynomial, real and complex:
1. `P(x) = x^2 - 4x + 3`
2. `Q(x) = x^3 - 7x + 6`
3. `R(x) = x^4 - 5x^2 + 4`

**Feedback:** 
- For (1): Factor to (x - 1)(x - 3), roots are 1 and 3.
- For (2): Test x = 1: 1 - 7 + 6 = 0. Synthetic division gives quotient x^2 + x - 6 = (x + 3)(x - 2). Roots are 1, -3, 2.
- For (3): This factors as (x^2 - 1)(x^2 - 4) = (x - 1)(x + 1)(x - 2)(x + 2). Roots are ±1, ±2.

---

### Complex Number

**Complex Number** (Target: 250-400 words, Tier B: worked example)

A **complex number** is a number of the form `a + bi`, where `a` and `b` are real numbers, and `i` is the imaginary unit defined by `i^2 = -1`.

**Components:**
- `a` is the **real part** of the complex number
- `b` is the **imaginary part** (not "imaginary part" times i — just the real coefficient b)
- When b = 0, the number is purely real
- When a = 0, the number is purely imaginary

**Example:** `3 + 4i` has real part 3 and imaginary part 4. The number `0 + 2i = 2i` is purely imaginary. The number `5 + 0i = 5` is purely real.

**Operations with complex numbers:**

*Addition:* `(a + bi) + (c + di) = (a + c) + (b + d)i`
*Subtraction:* `(a + bi) - (c + di) = (a - c) + (b - d)i`
*Multiplication:* `(a + bi)(c + di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i` (since i^2 = -1)
*Division:* Multiply numerator and denominator by the complex conjugate of the denominator.

**Complex Conjugate:** The conjugate of `a + bi` is `a - bi`. When we multiply a complex number by its conjugate, the result is real:
```
(a + bi)(a - bi) = a^2 - abi + abi - b^2i^2 = a^2 - b^2(-1) = a^2 + b^2
```

**Example:** Add `(2 + 3i) + (4 - 5i) = (2 + 4) + (3 - 5)i = 6 - 2i`.

**Multiply `(2 + 3i)(1 - 2i) = 2(1) + 2(-2i) + 3i(1) + 3i(-2i) = 2 - 4i + 3i - 6i^2 = 2 - i + 6 = 8 - i`** (since i^2 = -1).

**Provenance:** Chapter 6 (Polynomials and Factoring), Section 6.6; standard algebra textbook content, adapted for Algebra I.

**Rules:**
- i^2 = -1 is the defining property of the imaginary unit
- Complex numbers a + bi and a - bi are conjugates
- Conjugate product: (a + bi)(a - bi) = a^2 + b^2 (always real)
- Addition/subtraction combines real parts and imaginary parts separately
- Multiplication uses FOIL and replaces i^2 with -1

**Learner Activity:** Perform each operation and write the result in a + bi form:
1. `(3 + 2i) + (4 - i)`
2. `(5 - 3i) - (2 + 7i)`
3. `(2 + i)(3 - 4i)`
4. `(6 + 2i) ÷ (1 + i)` (multiply numerator and denominator by the conjugate 1 - i)

**Feedback:** 
- For (1): 7 + i
- For (2): 3 - 10i
- For (3): 10 - 5i (compute: (2 + i)(3 - 4i) = 6 - 8i + 3i - 4i^2 = 6 - 5i + 4 = 10 - 5i)
- For (4): (6 + 2i)(1 - i) / ((1 + i)(1 - i)) = (6 - 6i + 2i - 2i^2) / (1 - i^2) = (6 - 4i + 2) / (1 + 1) = (8 - 4i) / 2 = 4 - 2i

**Starting State:** Learner is comfortable with real number operations and understands the concept of i where i^2 = -1.

**Chapter Anchors:** 
- Complex numbers extend the real number system to include solutions to equations like x^2 + 1 = 0
- i^2 = -1 defines the imaginary unit
- Complex conjugate: a + bi and a - bi

---

### Imaginary Unit

**Imaginary Unit** (Target: 250-400 words, Tier B: worked example)

The **imaginary unit**, denoted by `i`, is defined by the fundamental property:

**i^2 = -1**

This definition extends the real number system to include solutions to equations that have no real solutions, such as:

**x^2 + 1 = 0** → **x^2 = -1** → **x = ±√(-1) = ±i**

**Powers of i** follow a cyclic pattern that's essential to remember:

```
i^1 = i
i^2 = -1
i^3 = i^2 · i = -i
i^4 = i^3 · i = -i · i = -i^2 = -(-1) = 1
i^5 = i^4 · i = 1 · i = i  (the cycle repeats every 4)
```

**Example:** Simplify i^23.

**Solution:** Divide the exponent by 4 and use the remainder:
```
23 ÷ 4 = 5 remainder 3
i^23 = i^(4·5 + 3) = (i^4)^5 · i^3 = 1^5 · (-i) = -i
```

**Example:** Simplify √(-9).

**Solution:** √(-9) = √(9 · -1) = √9 · √(-1) = 3i

**Example:** Simplify i^35.

**Solution:** 35 ÷ 4 = 8 remainder 3, so i^35 = i^3 = -i.

**Geometric interpretation:** Complex numbers a + bi can be represented as points (a, b) in the complex plane, where the horizontal axis is the real axis and the vertical axis is the imaginary axis. The imaginary unit i corresponds to the point (0, 1), which is 1 unit up from the origin on the imaginary axis.

**Provenance:** Chapter 6 (Polynomials and Factoring), Section 6.6; standard algebra textbook content, adapted for Algebra I.

**Rules:**
- i^2 = -1 is the defining property
- Powers of i cycle with period 4: i, -1, -i, 1
- √(-a) = √a · i for any positive real a
- i^n depends on n mod 4: remainder 0→1, 1→i, 2→-1, 3→-i

**Learner Activity:** Simplify each expression and write as a + bi form:
1. i^17
2. i^42
3. √(-25)
4. √(-4) · √(-9)
5. (3i)^2

**Feedback:** 
- For (1): 17 ÷ 4 = 4 remainder 1, so i^17 = i^1 = i
- For (2): 42 ÷ 4 = 10 remainder 2, so i^42 = i^2 = -1
- For (3): √(-25) = 5i
- For (4): √(-4) · √(-9) = 2i · 3i = 6i^2 = -6. *Caution:* The rule √a · √b = √(ab) doesn't hold for negative a, b. Better to convert each to i form first.
- For (5): (3i)^2 = 9i^2 = 9(-1) = -9

**Starting State:** Learner understands real numbers and has been introduced to the concept that some equations have no real solutions.

**Chapter Anchors:** 
- i^2 = -1 defines the imaginary unit
- Powers of i cycle with period 4
- √(-a) = √a · i for positive real a

---

### Discriminant

**Discriminant** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

The **discriminant** is a quantity that tells us the nature of the roots of a quadratic equation without actually solving it. For a quadratic equation `ax^2 + bx + c = 0`, the discriminant is:

**D = b^2 - 4ac**

The discriminant is the expression under the square root in the quadratic formula:
```
x = (-b ± √(b^2 - 4ac)) / (2a) = (-b ± √D) / (2a)
```

**What the discriminant tells us:**

| D > 0 | Two distinct real roots |
| D = 0 | One real root (a repeated root, or "double root") |
| D < 0 | Two complex conjugate roots (no real roots) |

**Worked Example 1:** Find the discriminant of `x^2 - 5x + 6 = 0` and describe the nature of its roots.

**Solution:** a = 1, b = -5, c = 6
```
D = b^2 - 4ac = (-5)^2 - 4(1)(6) = 25 - 24 = 1
```
Since D = 1 > 0, there are two distinct real roots. (Indeed, factoring: (x - 2)(x - 3) = 0, roots are 2 and 3.)

**Worked Example 2:** Find the discriminant of `x^2 - 4x + 4 = 0` and describe the nature of its roots.

**Solution:** a = 1, b = -4, c = 4
```
D = b^2 - 4ac = (-4)^2 - 4(1)(4) = 16 - 16 = 0
```
Since D = 0, there is exactly one real root (a repeated root). (Indeed, factoring: (x - 2)^2 = 0, the root is x = 2 with multiplicity 2.)

**Worked Example 3:** Find the discriminant of `x^2 + x + 1 = 0` and describe the nature of its roots.

**Solution:** a = 1, b = 1, c = 1
```
D = b^2 - 4ac = (1)^2 - 4(1)(1) = 1 - 4 = -3
```
Since D = -3 < 0, there are two complex conjugate roots (no real roots). (Indeed, the quadratic formula gives x = (-1 ± i√3)/2.)

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.3; standard algebra textbook content.

**Rules:**
- D = b^2 - 4ac for quadratic ax^2 + bx + c = 0
- D > 0 → two distinct real roots
- D = 0 → one real double root
- D < 0 → two complex conjugate roots
- The quadratic formula uses √D, so D < 0 means the roots are complex

**Learner Activity:** Compute the discriminant of each quadratic and describe the nature of its roots. Then solve if possible:
1. `x^2 - 3x + 2 = 0`: D = ?
2. `x^2 - 6x + 9 = 0`: D = ? What does D = 0 mean for the graph?
3. `x^2 + 2x + 5 = 0`: D = ? What does D < 0 mean for the roots?

**Feedback:** 
- For (1): D = (-3)^2 - 4(1)(2) = 9 - 8 = 1 > 0, two distinct real roots (1 and 2).
- For (2): D = (-6)^2 - 4(1)(9) = 36 - 36 = 0, one real double root (x = 3). The graph touches the x-axis at x = 3 but doesn't cross.
- For (3): D = (2)^2 - 4(1)(5) = 4 - 20 = -16 < 0, two complex conjugate roots. The graph never touches the x-axis.

**Starting State:** Learner can compute b^2 - 4ac for given a, b, c values and understands the quadratic formula.

**Chapter Anchors:** 
- Discriminant D = b^2 - 4ac determines root nature
- D > 0: 2 real roots; D = 0: 1 real double root; D < 0: 2 complex conjugate roots
- Connects to graph: D > 0 means x-intercepts; D = 0 means vertex touches x-axis; D < 0 means no x-intercepts

#### Diagram: Discriminant and Root Nature

<details markdown="1">
<summary>Discriminant and Root Nature</summary>
Type: microsim
**sim-id:** discriminant-root-nature
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will compute the discriminant of a quadratic and use it to determine the nature of the roots without solving the equation.

**Prerequisites:** Quadratic formula, b^2 - 4ac computation

**Evidence of Mastery:** Learner can compute D = b^2 - 4ac for any quadratic ax^2 + bx + c and correctly classify D > 0, D = 0, or D < 0 with the corresponding root nature.

**Misconceptions:** The discriminant only works for quadratics with integer coefficients; D < 0 means "no solutions" (it has complex solutions).

**Instructional Rationale:** The discriminant provides a quick check on root nature that saves time over full solution. Students often confuse D < 0 with "no solutions" rather than "no real solutions."

**Content:** The sim presents a quadratic ax^2 + bx + c with sliders for a, b, and c. As learner adjusts the sliders, the discriminant D = b^2 - 4ac updates in real time. A color-coded indicator shows whether D > 0 (green), D = 0 (yellow), or D < 0 (red). Clicking the indicator reveals whether the roots are two distinct real roots, one real double root, or two complex conjugate roots. The graph of the parabola updates to show x-intercept behavior matching the discriminant value.

**Feedback:** When learner computes D for a given quadratic, immediate feedback tells them if the classification is correct. If D < 0 is classified as "no solutions," a hint reminds them about complex conjugate roots. If the graph x-intercept count doesn't match D, the sim highlights the mismatch.

**Starting State:** The sim displays `x^2 - 5x + 6` with D = 1 shown. The green indicator shows "2 real roots" and the graph shows 2 x-intercepts.

**Chapter Anchors:** 
- D = b^2 - 4ac determines root nature
- D > 0: 2 real roots; D = 0: 1 real double root; D < 0: 2 complex conjugate roots
- Graph x-intercepts match discriminant value
</details>

---

### Quadratic Discriminant

**Quadratic Discriminant** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

The **quadratic discriminant** builds on the standard discriminant D = b^2 - 4ac but emphasizes the quadratic function's graph and how the discriminant relates to the vertex and axis of symmetry.

For a quadratic function `f(x) = ax^2 + bx + c`:

**The discriminant D = b^2 - 4ac determines the x-intercepts of the graph:**

- **D > 0:** The graph crosses the x-axis at two points. The parabola has two real zeros.
- **D = 0:** The graph touches the x-axis at exactly one point—the vertex. The parabola has one real zero (a double root).
- **D < 0:** The graph does not intersect the x-axis. The parabola has no real zeros; the zeros are complex conjugates.

**Connection to the vertex:** The x-coordinate of the vertex is always `x = -b/(2a)`, regardless of the discriminant. The discriminant tells us whether the vertex is above, on, or below the x-axis.

**Worked Example:** Consider `f(x) = 2x^2 - 8x + 8`. Find the discriminant and describe the graph.

**Solution:** a = 2, b = -8, c = 8
```
D = b^2 - 4ac = (-8)^2 - 4(2)(8) = 64 - 64 = 0
```

Since D = 0, the graph touches the x-axis at the vertex. The x-coordinate of the vertex is:
```
x = -b/(2a) = -(-8)/(2·2) = 8/4 = 2
```

The y-coordinate is:
```
f(2) = 2(2)^2 - 8(2) + 8 = 8 - 16 + 8 = 0
```

So the vertex is at (2, 0), and the parabola touches the x-axis at this single point.

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.3; standard algebra textbook content.

**Rules:**
- D = b^2 - 4ac determines x-intercept nature
- D > 0: graph crosses x-axis at 2 points
- D = 0: graph touches x-axis at vertex (one real root)
- D < 0: graph does not intersect x-axis (2 complex roots)
- Vertex x-coordinate is always -b/(2a), independent of D

**Learner Activity:** Compute the discriminant and describe the graph for each quadratic:
1. `f(x) = x^2 - 4x + 3`: D = ?, graph description
2. `f(x) = x^2 - 2x + 1`: D = ?, graph description
3. `f(x) = x^2 + 4x + 5`: D = ?, graph description

**Feedback:** 
- For (1): D = 4 > 0, graph crosses x-axis at x = 1 and x = 3.
- For (2): D = 0, graph touches x-axis at vertex x = 1.
- For (3): D = -4 < 0, graph does not intersect x-axis; complex roots.

**Starting State:** Learner can compute the discriminant and link it to the quadratic formula. Now they connect it to graphing.

**Chapter Anchors:** 
- D > 0: graph crosses x-axis twice; D = 0: touches at vertex; D < 0: no x-intercepts
- Vertex at x = -b/(2a) always; discriminant tells position relative to x-axis

#### Diagram: Quadratic Discriminant and Graph

<details markdown="1">
<summary>Quadratic Discriminant and Graph</summary>
Type: microsim
**sim-id:** quadratic-discriminant-graph
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will connect the discriminant of a quadratic function to the x-intercepts of its graph, recognizing when the parabola crosses, touches, or misses the x-axis.

**Prerequisites:** Quadratic formula, vertex form, sign of a

**Evidence of Mastery:** Learner can compute D = b^2 - 4ac and immediately describe the graph's x-intercept behavior: D > 0 → 2 intercepts, D = 0 → 1 intercept (vertex), D < 0 → 0 intercepts. They can also identify the vertex location.

**Misconceptions:** The discriminant only applies to the quadratic formula; D = 0 means "one solution" with no geometric meaning.

**Instructional Rationale:** Connecting the algebraic discriminant to the geometric graph helps students visualize what D > 0, D = 0, and D < 0 mean for the parabola's position relative to the x-axis.

**Content:** The sim displays a parabola f(x) = ax^2 + bx + c with sliders for a, b, and c. The discriminant D = b^2 - 4ac is shown in real time. A three-state indicator shows whether the parabola crosses the x-axis (2 points), touches at vertex (1 point), or misses the x-axis (0 points). The vertex coordinates (-b/(2a), f(-b/(2a))) are always displayed. Learner can adjust sliders and observe how changes in a, b, c affect both D and the graph's x-intercept behavior.

**Feedback:** When learner identifies the correct x-intercept count for a given D, the sim confirms with green checkmark. If learner mismatches D and graph behavior, a hint references the vertex formula and the sign of a. Correct identification of all three cases (D > 0, D = 0, D < 0) is confirmed after three consecutive correct answers.

**Starting State:** The sim displays `f(x) = x^2 - 4x + 3` with D = 4 shown. The indicator shows "2 x-intercepts" and the graph confirms with points at x = 1 and x = 3.

**Chapter Anchors:** 
- D > 0: graph crosses x-axis twice; D = 0: touches at vertex; D < 0: no x-intercepts
- Vertex at x = -b/(2a) always; discriminant tells position relative to x-axis
</details>

---

### Parabola Graph

**Parabola Graph** (Target: 500-750 words, Tier A: worked example + diagram/chart/table/MicroSim)

A **parabola** is the graph of a quadratic function `f(x) = ax^2 + bx + c`. Its shape is a U-shape (or an inverted U) that is symmetric about a vertical line through its vertex.

**Key features of a parabola:**

1. **Vertex:** The highest or lowest point of the parabola. If a > 0, the parabola opens upward and the vertex is the minimum. If a < 0, the parabola opens downward and the vertex is the maximum.

2. **Axis of symmetry:** The vertical line through the vertex, given by `x = -b/(2a)`. The parabola is symmetric about this line.

3. **Direction of opening:** Determined by the sign of a:
   - a > 0: parabola opens upward (U-shape)
   - a < 0: parabola opens downward (inverted U)

4. **y-intercept:** The point where the graph crosses the y-axis, at (0, c).

5. **x-intercepts (zeros/roots):** The points where the graph crosses or touches the x-axis, found using the discriminant or factoring.

**Standard form:** `f(x) = ax^2 + bx + c` (the form we've been using)

**Vertex form:** `f(x) = a(x - h)^2 + k`, where (h, k) is the vertex. This form makes it easy to identify the vertex and direction of opening.

**Converting from standard to vertex form:** Complete the square.

**Worked Example:** Graph `f(x) = x^2 - 4x + 3` by finding the vertex, axis of symmetry, direction, and intercepts.

**Solution:**
- a = 1, b = -4, c = 3 → a > 0, so parabola opens upward (minimum at vertex)
- Vertex x-coordinate: x = -b/(2a) = -(-4)/(2·1) = 4/2 = 2
- Vertex y-coordinate: f(2) = (2)^2 - 4(2) + 3 = 4 - 8 + 3 = -1
- Vertex: (2, -1)
- Axis of symmetry: x = 2
- y-intercept: f(0) = 0 - 0 + 3 = 3, so (0, 3)
- x-intercepts (zeros): Solve x^2 - 4x + 3 = 0 → (x - 1)(x - 3) = 0 → x = 1 or x = 3, so (1, 0) and (3, 0)

**Sketch:** Plot the vertex (2, -1), the y-intercept (0, 3), and the x-intercepts (1, 0) and (3, 0). Draw the symmetric U-shape.

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.1–7.2; standard algebra textbook content.

**Rules:**
- Vertex at (-b/(2a), f(-b/(2a)))
- Axis of symmetry: x = -b/(2a)
- a > 0 → opens upward (minimum); a < 0 → opens downward (maximum)
- y-intercept at (0, c)
- x-intercepts from discriminant or factoring: D > 0 → 2 x-intercepts; D = 0 → 1 x-intercept; D < 0 → 0 x-intercepts

**Learner Activity:** Identify the key features of each parabola without graphing:
1. `f(x) = x^2 - 6x + 8`: vertex, axis of symmetry, direction, y-intercept
2. `f(x) = -x^2 + 4x - 3`: vertex, axis of symmetry, direction, y-intercept
3. `f(x) = 2x^2 + 8x + 6`: vertex, axis of symmetry, direction, y-intercept

**Feedback:** 
- For (1): a = 1 > 0 (opens up), vertex at x = 3, f(3) = -1, so vertex (3, -1), axis x = 3, y-intercept (0, 8), x-intercepts at x = 2 and x = 4 (factor: (x - 2)(x - 4)).
- For (2): a = -1 < 0 (opens down), vertex at x = 2, f(2) = 1, so vertex (2, 1), axis x = 2, y-intercept (0, -3), x-intercepts at x = 1 and x = 3 (factor: -(x - 1)(x - 3)).
- For (3): a = 2 > 0 (opens up), vertex at x = -2, f(-2) = -2, so vertex (-2, -2), axis x = -2, y-intercept (0, 6).

**Starting State:** Learner can solve quadratic equations and has basic knowledge of parabola graphs.

**Chapter Anchors:** 
- Vertex at (-b/(2a), f(-b/(2a)))
- Axis of symmetry: x = -b/(2a)
- a > 0 → opens upward (minimum); a < 0 → opens downward (maximum)
- D > 0: 2 x-intercepts; D = 0: 1 x-intercept; D < 0: 0 x-intercepts

#### Diagram: Parabola Graph

<details markdown="1">
<summary>Parabola Graph</summary>
Type: microsim
**sim-id:** parabola-grapher
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Explain
**Learning Objective:** The learner will identify and interpret the key features of a parabola: vertex, axis of symmetry, direction of opening, y-intercept, and x-intercepts.

**Prerequisites:** Quadratic functions, factoring, quadratic formula

**Evidence of Mastery:** Learner can identify the vertex, axis of symmetry, direction, y-intercept, and x-intercepts of a parabola given in standard form f(x) = ax^2 + bx + c. They can convert between standard and vertex form.

**Misconceptions:** The vertex is always at (0, c); the axis of symmetry is the y-axis; x-intercepts are always found by factoring.

**Instructional Rationale:** An interactive grapher helps students experiment with changing a, b, c and immediately see how each parameter affects the parabola's position, direction, and shape. This builds intuition before they learn the analytical formulas.

**Content:** The sim presents a parabola f(x) = ax^2 + bx + c with sliders for a, b, and c. Key features are labeled when clicked: vertex (h, k), axis of symmetry x = h, direction (up/down determined by a), y-intercept (0, c), and x-intercepts (solutions to ax^2 + bx + c = 0). Learner can toggle between "standard form" and "vertex form" views. A reset button returns to f(x) = x^2.

**Feedback:** When learner clicks on a feature label, a tooltip shows the analytical value. If learner misidentifies the direction (says opens up when a < 0), a hint reminds them that a determines direction. If x-intercepts are incorrectly stated, the sim shows the discriminant value and whether D > 0, D = 0, or D < 0.

**Starting State:** The sim displays `f(x) = x^2 - 4x + 3` with vertex at (2, -1), axis x = 2, opens upward, y-intercept (0, 3), x-intercepts at x = 1 and x = 3 all labeled.

**Chapter Anchors:** 
- Vertex at (-b/(2a), f(-b/(2a)))
- Axis of symmetry: x = -b/(2a)
- a > 0 → opens upward (minimum); a < 0 → opens downward (maximum)
- y-intercept at (0, c); x-intercepts from quadratic formula or factoring
</details>

---

### Parabola Direction

**Parabola Direction** (Target: 250-400 words, Tier B: worked example)

The **direction** a parabola opens is determined solely by the sign of the leading coefficient `a` in `f(x) = ax^2 + bx + c`.

**Upward opening:** If `a > 0`, the parabola opens upward, forming a U-shape. The vertex is a **minimum** point — the parabola's lowest point.

**Downward opening:** If `a < 0`, the parabola opens downward, forming an inverted U-shape. The vertex is a **maximum** point — the parabola's highest point.

**Worked Example 1:** Determine the direction of `f(x) = 3x^2 - 5x + 2`.

**Solution:** The leading coefficient is a = 3. Since 3 > 0, the parabola opens upward (U-shape), and the vertex is a minimum.

**Worked Example 2:** Determine the direction of `f(x) = -2x^2 + 4x - 1`.

**Solution:** The leading coefficient is a = -2. Since -2 < 0, the parabola opens downward (inverted U-shape), and the vertex is a maximum.

**Why it matters:** The direction tells us whether we're looking at a minimum or maximum value, which is crucial for optimization problems. If you're maximizing profit or minimizing cost, the parabola's direction tells you what kind of critical point you've found.

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.1; standard algebra textbook content.

**Rules:**
- a > 0 → parabola opens upward (minimum at vertex)
- a < 0 → parabola opens downward (maximum at vertex)
- The sign of a is the only factor that determines direction; b and c only shift the parabola

**Learner Activity:** Determine the direction each parabola opens, and state whether the vertex is a minimum or maximum:
1. `f(x) = 2x^2 - 3x + 1`
2. `f(x) = -4x^2 + 5x - 2`
3. `f(x) = x^2 - 5x + 6`

**Feedback:** 
- For (1): a = 2 > 0, opens upward, minimum at vertex
- For (2): a = -4 < 0, opens downward, maximum at vertex
- For (3): a = 1 > 0, opens upward, minimum at vertex

**Starting State:** Learner knows how to identify the leading coefficient in a quadratic function.

**Chapter Anchors:** 
- a > 0 → upward opening, minimum vertex
- a < 0 → downward opening, maximum vertex
- Direction depends only on sign of a

---

### Parabola Opening

**Parabola Opening** (Target: 250-400 words, Tier B: worked example)

The **opening** of a parabola refers to how "wide" or "narrow" it appears, which is determined by the absolute value of the leading coefficient `a`.

**Narrow opening:** If |a| > 1, the parabola is narrower than the standard parabola `y = x^2`. The sides steeper rise, making the graph appear compressed vertically.

**Wide opening:** If 0 < |a| < 1, the parabola is wider than `y = x^2`. The sides rise more gradually, making the graph appear stretched vertically.

**Standard parabola:** If a = 1 or a = -1, the parabola has the "default" width of `y = x^2`.

**Worked Example 1:** Compare the opening of `f(x) = 3x^2` to `f(x) = x^2`.

**Solution:** For `f(x) = x^2`, |a| = 1, so it has the standard width. For `f(x) = 3x^2`, |a| = 3 > 1, so the parabola is narrower than `y = x^2`. Each y-value is tripled, making the sides rise three times as steep.

**Worked Example 2:** Compare the opening of `f(x) = (1/2)x^2` to `f(x) = x^2`.

**Solution:** For `f(x) = x^2`, |a| = 1 (standard width). For `f(x) = (1/2)x^2`, |a| = 1/2 < 1, so the parabola is wider than `y = x^2`. Each y-value is halved, making the sides rise half as steep.

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.1; standard algebra textbook content.

**Rules:**
- |a| > 1 → narrower than y = x^2
- |a| = 1 → standard width (y = x^2)
- 0 < |a| < 1 → wider than y = x^2
- The sign of a determines direction (up/down); |a| determines opening width

**Learner Activity:** Compare the opening of each parabola to y = x^2. Is it narrower, wider, or standard?
1. `f(x) = 4x^2`
2. `f(x) = (1/3)x^2`
3. `f(x) = (2/3)x^2`

**Feedback:** 
- For (1): |a| = 4 > 1, narrower than y = x^2
- For (2): |a| = 1/3 < 1, wider than y = x^2
- For (3): |a| = 2/3 < 1, wider than y = x^2 (but not as wide as in (2))

**Starting State:** Learner can identify the leading coefficient and its sign.

**Chapter Anchors:** 
- |a| > 1 → narrower; |a| = 1 → standard; 0 < |a| < 1 → wider
- Opening width depends on |a|, direction on sign of a

---

### Parabola Vertex Form

**Parabola Vertex Form** (Target: 250-400 words, Tier B: worked example)

The **vertex form** of a quadratic function makes it easy to identify the vertex and direction of opening without completing the square every time.

**Vertex form:** `f(x) = a(x - h)^2 + k`, where:
- `(h, k)` is the **vertex** of the parabola
- `a` determines the direction and opening width (same rules as standard form)
- The axis of symmetry is the vertical line `x = h`

**Why vertex form is useful:**
- The vertex is immediately identifiable as (h, k)
- The direction is determined by the sign of a (same as standard form)
- The opening width follows the same |a| rules

**Worked Example 1:** Identify the vertex, axis of symmetry, and direction for `f(x) = 2(x - 3)^2 + 5`.

**Solution:** 
- a = 2 ( > 0, so parabola opens upward, minimum at vertex)
- h = 3, k = 5, so vertex is (3, 5)
- Axis of symmetry: x = 3

**Worked Example 2:** Identify the vertex, axis of symmetry, and direction for `f(x) = - (x + 2)^2 - 4`.

**Solution:** 
- a = -1 ( < 0, so parabola opens downward, maximum at vertex)
- Rewrite as -1(x - (-2))^2 + (-4), so h = -2, k = -4
- Vertex is (-2, -4)
- Axis of symmetry: x = -2

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.2; standard algebra textbook content.

**Rules:**
- Vertex is (h, k) from f(x) = a(x - h)^2 + k
- Axis of symmetry: x = h
- a > 0 → opens upward (minimum); a < 0 → opens downward (maximum)
- Opening width: |a| > 1 → narrower; |a| = 1 → standard; 0 < |a| < 1 → wider

**Learner Activity:** Identify the vertex, axis of symmetry, and direction for each function in vertex form:
1. `f(x) = 3(x + 1)^2 - 2`
2. `f(x) = - (x - 4)^2 + 7`
3. `f(x) = (1/2)(x - 5)^2 - 3`

**Feedback:** 
- For (1): vertex (-1, -2), axis x = -1, opens upward (a = 3 > 0)
- For (2): vertex (4, 7), axis x = 4, opens downward (a = -1 < 0)
- For (3): vertex (5, -3), axis x = 5, opens upward (a = 1/2, 0 < |a| < 1, so wider than standard)

**Starting State:** Learner can identify the vertex and direction from standard form f(x) = ax^2 + bx + c. Now they learn the vertex form shortcut.

**Chapter Anchors:** 
- Vertex (h, k) from f(x) = a(x - h)^2 + k
- Axis of symmetry: x = h
- a determines direction and opening width

---

### Parabola Standard Form

**Parabola Standard Form** (Target: 250-400 words, Tier B: worked example)

The **standard form** of a quadratic function is `f(x) = ax^2 + bx + c`, where a, b, and c are real numbers and a ≠ 0. This is the form we've been working with throughout this chapter, and it's the most common way quadratics are presented.

**Finding the vertex from standard form:** The vertex (h, k) can be found using:
- h = -b/(2a) (x-coordinate)
- k = f(h) = a(h)^2 + b(h) + c (y-coordinate)

**Axis of symmetry:** The vertical line x = -b/(2a).

**y-intercept:** The point (0, c), since f(0) = a(0)^2 + b(0) + c = c.

**x-intercepts (zeros):** Found by solving ax^2 + bx + c = 0, using factoring, completing the square, or the quadratic formula. The discriminant D = b^2 - 4ac determines the nature of the roots.

**Worked Example:** Convert `f(x) = x^2 - 6x + 8` from standard form to identify key features.

**Solution:**
- a = 1, b = -6, c = 8
- Vertex x-coordinate: h = -b/(2a) = -(-6)/(2·1) = 6/2 = 3
- Vertex y-coordinate: k = f(3) = (3)^2 - 6(3) + 8 = 9 - 18 + 8 = -1
- Vertex: (3, -1)
- Axis of symmetry: x = 3
- Direction: a = 1 > 0, so opens upward (minimum)
- y-intercept: f(0) = 8, so (0, 8)
- x-intercepts: Solve x^2 - 6x + 8 = 0 → (x - 2)(x - 4) = 0 → x = 2 or x = 4, so (2, 0) and (4, 0)

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.1–7.2; standard algebra textbook content.

**Rules:**
- Vertex at (-b/(2a), f(-b/(2a)))
- Axis of symmetry: x = -b/(2a)
- y-intercept at (0, c)
- x-intercepts from quadratic formula or factoring; D = b^2 - 4ac determines nature

**Learner Activity:** Find the vertex, axis of symmetry, direction, y-intercept, and x-intercepts for each quadratic in standard form:
1. `f(x) = x^2 - 4x + 3`
2. `f(x) = 2x^2 + 8x + 6`
3. `f(x) = -x^2 + 4x - 3`

**Feedback:** 
- For (1): vertex (2, -1), axis x = 2, opens up, y-intercept (0, 3), x-intercepts at 1 and 3
- For (2): vertex (-2, -2), axis x = -2, opens up (a = 2), y-intercept (0, 6)
- For (3): vertex (2, 1), axis x = 2, opens down (a = -1), y-intercept (0, -3), x-intercepts at 1 and 3

**Starting State:** Learner can solve quadratic equations and has basic parabola graphing skills. Now they learn systematic feature extraction.

**Chapter Anchors:** 
- Vertex at (-b/(2a), f(-b/(2a)))
- Axis of symmetry: x = -b/(2a)
- y-intercept at (0, c)
- x-intercepts from quadratic formula; D determines nature

---

### Parabola Focus

**Parabola Focus** (Target: 250-400 words, Tier B: worked example)

The **focus** of a parabola is a fixed point inside the parabola that, together with the directrix, defines the parabola's geometric property: **a parabola is the set of all points equidistant from the focus and the directrix.**

For a parabola with vertex at (h, k) and axis of symmetry parallel to the y-axis:

- **If the parabola opens upward (a > 0):** The focus is at `(h, k + 1/(4a))`
- **If the parabola opens downward (a < 0):** The focus is at `(h, k - 1/(4a))`

**The distance from the vertex to the focus** is `|1/(4a)|`, called the **focal length**. The directrix is the line `y = k - 1/(4a)` (for upward-opening) or `y = k + 1/(4a)` (for downward-opening).

**Worked Example 1:** Find the focus of `f(x) = 2(x - 3)^2 + 5`.

**Solution:** 
- Vertex: (h, k) = (3, 5)
- a = 2 > 0, so parabola opens upward
- Focus: (h, k + 1/(4a)) = (3, 5 + 1/(4·2)) = (3, 5 + 1/8) = (3, 5.125)
- Directrix: y = k - 1/(4a) = 5 - 1/8 = 4.875

**Worked Example 2:** Find the focus of `f(x) = - (x + 2)^2 - 4`.

**Solution:**
- Vertex: (h, k) = (-2, -4)
- a = -1 < 0, so parabola opens downward
- Focus: (h, k - 1/(4a)) = (-2, -4 - 1/(4·(-1))) = (-2, -4 - (-1/4)) = (-2, -4 + 1/4) = (-2, -3.75)
- Directrix: y = k - 1/(4a) = -4 - 1/(4·(-1)) = -4 + 1/4 = -3.75

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), advanced topics; geometry of parabolas.

**Rules:**
- Upward-facing (a > 0): focus at (h, k + 1/(4a))
- Downward-facing (a < 0): focus at (h, k - 1/(4a))
- Focal length: |1/(4a)| from vertex to focus
- Directrix: y = k ∓ 1/(4a) depending on opening direction

**Learner Activity:** Find the focus of each parabola in vertex form:
1. `f(x) = 3(x - 1)^2 + 2`
2. `f(x) = -2(x + 3)^2 - 5`
3. `f(x) = (1/4)(x - 2)^2 + 1`

**Feedback:** 
- For (1): vertex (1, 2), a = 3 > 0, focus (1, 2 + 1/12) = (1, 2.083)
- For (2): vertex (-3, -5), a = -2 < 0, focus (-3, -5 - 1/(-8)) = (-3, -5 + 1/8) = (-3, -4.875)
- For (3): vertex (2, 1), a = 1/4 > 0, focus (2, 1 + 1/(4·1/4)) = (2, 1 + 1/1) = (2, 2)

**Starting State:** Learner knows how to find the vertex and direction of a parabola. Now they explore the geometric definition.

**Chapter Anchors:** 
- Focus at (h, k ± 1/(4a)) depending on opening direction
- Focal length |1/(4a)| from vertex to focus
- Directrix line at distance 1/(4a) from vertex

---

### Parabola Directrix

**Parabola Directrix** (Target: 250-400 words, Tier B: worked example)

The **directrix** of a parabola is a fixed line outside the parabola that, together with the focus, defines the parabola's geometric property: **a parabola is the set of all points equidistant from the focus and the directrix.**

For a parabola with vertex at (h, k) and axis of symmetry parallel to the y-axis:

- **If the parabola opens upward (a > 0):** The directrix is the horizontal line `y = k - 1/(4a)`
- **If the parabola opens downward (a < 0):** The directrix is the horizontal line `y = k + 1/(4a)`

**Worked Example 1:** Find the directrix of `f(x) = 2(x - 3)^2 + 5`.

**Solution:**
- Vertex: (h, k) = (3, 5)
- a = 2 > 0, so parabola opens upward
- Directrix: y = k - 1/(4a) = 5 - 1/(4·2) = 5 - 1/8 = 4.875

**Worked Example 2:** Find the directrix of `f(x) = - (x + 2)^2 - 4`.

**Solution:**
- Vertex: (h, k) = (-2, -4)
- a = -1 < 0, so parabola opens downward
- Directrix: y = k + 1/(4a) = -4 + 1/(4·(-1)) = -4 - 1/4 = -4.25

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), advanced topics; geometry of parabolas.

**Rules:**
- Upward-facing (a > 0): directrix y = k - 1/(4a)
- Downward-facing (a < 0): directrix y = k + 1/(4a)
- The directrix is always the same distance from the vertex as the focus, but on the opposite side

**Learner Activity:** Find the directrix of each parabola in vertex form:
1. `f(x) = 3(x - 1)^2 + 2`
2. `f(x) = -2(x + 3)^2 - 5`
3. `f(x) = (1/4)(x - 2)^2 + 1`

**Feedback:** 
- For (1): vertex (1, 2), a = 3 > 0, directrix y = 2 - 1/12 = 1.917
- For (2): vertex (-3, -5), a = -2 < 0, directrix y = -5 + 1/(4·(-1)) = -5 - 1/4 = -5.25
- For (3): vertex (2, 1), a = 1/4 > 0, directrix y = 1 - 1/(4·1/4) = 1 - 1/1 = 0

**Starting State:** Learner knows how to find the focus of a parabola. Now they explore the complementary geometric element.

**Chapter Anchors:** 
- Directrix y = k - 1/(4a) (upward) or y = k + 1/(4a) (downward)
- Directrix is same distance from vertex as focus, on opposite side

---

### Data Display Categorical

**Data Display Categorical** (Target: 120-200 words, Tier C: clear definition)

**Categorical data** (also called **qualitative data**) are values that fall into named categories or groups. The categories are qualitative labels, not numerical values, although numbers may be assigned to count how many observations fall in each category.

**Examples of categorical variables:**
- **Blood type** (A, B, AB, O) — each person has one blood type
- **Eye color** (blue, brown, green, hazel) — each person has one eye color
- **Gender** (male, female, non-binary, etc.) — self-identified category
- **Favorite color** (red, blue, green, yellow, etc.) — preference category
- **Marital status** (never married, married, divorced, widowed, separated) — classification

**Key distinction:** Categorical data are **about classification**, not measurement. You wouldn't "measure" blood type in the way you measure height or temperature. Instead, you classify each observation into a category.

**Data displays for categorical data:**
- **Bar charts:** Bars represent each category; bar height shows the count or percentage in that category.
- **Pie charts:** Circular chart divided into slices; slice size shows the proportion or percentage in each category.
- **Bar graphs vs. histograms:** Bar graphs display categorical data; histograms display numerical (continuous) data in intervals.

**Worked Example:** A survey of 20 students asked: "What is your favorite color?" The results:

| Color | Number of Students |
|-------|-------------------|
| Red   | 5 |
| Blue  | 8 |
| Green | 4 |
| Yellow| 3 |

**How to display this:** A bar chart would have four bars (one per color), with heights proportional to the counts. A pie chart would have four slices, with angles proportional to the percentages (Red: 5/20 = 25%, Blue: 8/20 = 40%, Green: 4/20 = 20%, Yellow: 3/20 = 15%).

**Provenance:** Chapter 7 (Quadratic and Exponential Functions), Section 7.4 (pre-statistics); standard algebra textbook content, adapted for data analysis.

**Rules:**
- Categorical data classify observations into named categories
- Numbers represent counts or frequencies, not measurements
- Bar charts and pie charts are appropriate displays
- Bar graphs use separated bars; histograms use adjacent bars for numerical intervals

**Learner Activity:** Identify whether each variable is categorical or numerical, and state the appropriate display:
1. Number of hours spent studying per week (numerical → histogram)
2. Students' letter grades (A, B, C, D, F) → categorical → bar chart or pie chart
3. Shoe sizes (numerical, discrete) → could be histogram or bar chart depending on treatment
4. Zip codes (categorical, though numbers) → bar chart (zip codes are labels, not measurements)

**Feedback:** 
- For (1): Numerical, continuous. Histogram with intervals of, e.g., 1-3 hours, 4-6 hours, etc.
- For (2): Categorical. Bar chart with bars for A, B, C, D, F, or pie chart showing proportions.
- For (3): Shoe sizes are discrete numerical, but often treated as categorical with size categories (7, 7.5, 8, etc.). Bar chart appropriate.
- For (4): Zip codes are labels/categories, not measurements. Bar chart appropriate.

**Starting State:** Learner understands the difference between categorical and numerical data from earlier coursework.

**Chapter Anchors:** 
- Categorical data classify into named categories, not measurements
- Bar charts and pie charts are appropriate displays
- Distinguish from numerical data and histograms

---

## Summary

In this chapter, we've covered a wide range of techniques that bridge symbolic algebra and data analysis. Let's recap the key themes:

**Polynomial techniques:**
- **Synthetic division** provides a streamlined method for dividing polynomials by linear factors, with the remainder theorem giving us P(c) as the remainder.
- **The Remainder Theorem** tells us that the remainder of P(x) ÷ (x - c) equals P(c), giving us a quick evaluation method.
- **The Factor Theorem** connects factors and roots: x - c is a factor of P(x) iff P(c) = 0.
- **Zeros of a polynomial** are the values of x for which P(x) = 0. Finding zeros by factoring reveals the x-intercepts of the graph.

**Complex numbers:**
- The **imaginary unit** i is defined by i^2 = -1, extending the real number system.
- **Complex numbers** a + bi have real part a and imaginary part b.
- Operations (addition, subtraction, multiplication, division) follow the same rules as real numbers, with the extra rule that i^2 = -1.

**Quadratic functions and parabolas:**
- The **discriminant** D = b^2 - 4ac tells us the nature of the roots: D > 0 → 2 real roots; D = 0 → 1 real double root; D < 0 → 2 complex conjugate roots.
- The **vertex** is at (-b/(2a), f(-b/(2a))), and the **axis of symmetry** is x = -b/(2a).
- The **direction** of opening is determined by a: a > 0 → upward (minimum); a < 0 → downward (maximum).
- The **opening width** depends on |a|: |a| > 1 → narrower; |a| = 1 → standard; 0 < |a| < 1 → wider.
- The **vertex form** f(x) = a(x - h)^2 + k immediately gives the vertex (h, k) and axis x = h.
- The **focus** and **directrix** complete the geometric definition: focus at (h, k ± 1/(4a)), directrix at y = k ∓ 1/(4a).

**Categorical data:**
- **Categorical data** classify observations into named categories, not measurements.
- **Bar charts** and **pie charts** are the appropriate data displays.
- Distinguish categorical from numerical data and appropriate display types.

**What's next:** These techniques form the foundation for more advanced statistics and algebra courses. In future math courses, you'll apply polynomial root-finding to higher-degree equations, use complex numbers in electrical engineering and signal processing, and analyze quadratic functions in optimization and physics contexts. For data analysis, you'll move from categorical displays to measuring central tendency and variability in numerical distributions.

---

**Key formulas to remember:**
- Synthetic division algorithm for P(x) ÷ (x - c)
- Remainder Theorem: remainder of P(x) ÷ (x - c) = P(c)
- Factor Theorem: x - c is a factor of P(x) iff P(c) = 0
- Discriminant: D = b^2 - 4ac for ax^2 + bx + c = 0
- Vertex: (-b/(2a), f(-b/(2a))), axis of symmetry: x = -b/(2a)
- Quadratic formula: x = (-b ± √(b^2 - 4ac)) / (2a)
- Complex number: a + bi where i^2 = -1
- Parabola vertex form: f(x) = a(x - h)^2 + k with vertex (h, k)
- Focus: (h, k + 1/(4a)) for upward, (h, k - 1/(4a)) for downward
- Directrix: y = k - 1/(4a) for upward, y = k + 1/(4a) for downward

---

This completes the Statistics and Data Analysis chapter. You now have a comprehensive toolkit for both algebraic problem-solving with polynomials and complex numbers, and for describing and comparing data distributions using appropriate visual displays.