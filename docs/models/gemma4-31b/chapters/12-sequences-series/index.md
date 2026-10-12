---
title: "Sequences and Series"
description: "An introduction to arithmetic and geometric sequences, including recursive and explicit formulas."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 14:35:22"
version: 1.11
---

# Sequences and Series

## Summary

The final chapter introduces arithmetic and geometric sequences, teaching students how to write explicit and recursive formulas to describe patterns in numbers.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Sequence | 21 |
| Arithmetic Sequence | 10 |
| Common Difference | 1 |
| Geometric Sequence | 10 |
| Common Ratio | 1 |
| Explicit Formula for Sequences | 4 |
| Recursive Formula for Sequences | 4 |
| Sum of a Sequence | 3 |
| Divergent Sequence | 1 |
| Convergent Sequence | 1 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Algebra Foundations](../01-algebra-foundations/index.md)
- [Chapter 2: Exponents and Radicals](../02-exponents-radicals/index.md)
- [Chapter 6: Linear Functions and Slope](../06-linear-functions-slope/index.md)

---

## Understanding Sequences

Before we dive into specific types of patterns, we first need to understand what a sequence actually is. In mathematics, a **sequence** is an ordered list of numbers. Each number in the list is called a **term**. We typically denote the position of a term using a subscript, such as \( a_1 \) for the first term, \( a_2 \) for the second, and \( a_n \) for the "nth" or general term.

Unlike a set of numbers, the order in which the terms appear in a sequence is critical. For example, the sequence \( 2, 4, 8, 16, \dots \) is very different from the sequence \( 16, 8, 4, 2, \dots \). A sequence can be finite (ending after a certain number of terms) or infinite (continuing forever, indicated by an ellipsis `...`).

### Worked Example: Identifying Terms
Consider the sequence: \( 5, 12, 19, 26, 33, \dots \)
- The first term \( a_1 \) is **5**.
- The fourth term \( a_4 \) is **26**.
- The fifth term \( a_5 \) is **33**.

#### Diagram: Sequence Explorer
<iframe src="https://microsims.example.com/sequence-explorer" width="100%" height="500px" scrolling="no"></iframe>

[Run the Sequence Explorer MicroSim fullscreen](https://microsims.example.com/sequence-explorer){ .md-button }

<details markdown="1">
<summary>Sequence Explorer (new specification)</summary>
Type: microsim
**sim-id:** sequence-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Compare<br/>
**Learning Objective:** The learner will compare the growth patterns of arithmetic and geometric sequences by adjusting starting values and growth factors.

**Prerequisites:** Sequence, Term

**Evidence of Mastery:** The learner can correctly identify whether a generated sequence is arithmetic or geometric based on the visual slope of the points on a coordinate plane.

**Misconceptions:** Students often think all sequences grow at a constant rate; the sim shows the difference between linear (arithmetic) and exponential (geometric) growth.

**Instructional Rationale:** Visualizing terms as points on a graph helps students connect sequences to the functions they learned in Chapter 6.

**Content:**
- Toggle: "Arithmetic vs Geometric"
- Slider: "Starting Term \( a_1 \)" (Range: -10 to 10, Step: 1, Default: 2)
- Slider: "Growth Factor (d or r)" (Range: -5 to 5, Step: 0.5, Default: 3)
- Display: "Current Terms: \( a_1, a_2, a_3, a_4, a_5 \)"
- Graph: X-axis (Term Index), Y-axis (Term Value)

**Provenance:** Synthetic with seed 42

**Rules:**
- Arithmetic: \( a_n = a_{n-1} + d \)
- Geometric: \( a_n = a_{n-1} \times r \)

**Learner Activity:**
1. Set the toggle to "Arithmetic" and adjust the growth factor. Notice the points form a straight line.
2. Set the toggle to "Geometric" and adjust the growth factor. Notice the points form a curve.
3. Try a negative growth factor to see the terms oscillate.

**Feedback:** When the user clicks a "Check" button, the sim asks "Is this growth linear or exponential?" Correct answer is based on the current toggle.

**Starting State:** Toggle set to Arithmetic, \( a_1 = 2 \), \( d = 3 \). Points \( (1,2), (2,5), (3,8), (4,11), (5,14) \) are plotted.

**Chapter Anchors:** none
</details>

## Arithmetic Sequences

An **arithmetic sequence** is a sequence where the difference between any two consecutive terms is constant. This means you add (or subtract) the same value every time to get to the next term.

This constant value is known as the **common difference**, denoted by \( d \). If \( d > 0 \), the sequence is increasing; if \( d < 0 \), the sequence is decreasing.

### The Common Difference
To find the common difference, you can subtract any term from the term that follows it:
\[ d = a_{n} - a_{n-1} \]

For example, in the sequence \( 10, 7, 4, 1, \dots \), the common difference is \( 7 - 10 = -3 \).

### Worked Example: Finding the Next Terms
Find the next three terms of the arithmetic sequence: \( 4, 11, 18, \dots \)

1. **Find \( d \):** \( 11 - 4 = 7 \). The common difference is 7.
2. **Add \( d \) to the last known term:** \( 18 + 7 = 25 \).
3. **Repeat:** \( 25 + 7 = 32 \).
4. **Repeat:** \( 32 + 7 = 39 \).
The next three terms are **25, 32, 39**.

## Geometric Sequences

While arithmetic sequences add a constant, a **geometric sequence** is a sequence where each term after the first is found by multiplying the previous term by a constant.

This multiplier is called the **common ratio**, denoted by \( r \). If \( |r| > 1 \), the sequence grows rapidly (diverges). If \( 0 < |r| < 1 \), the sequence shrinks (converges).

### The Common Ratio
To find the common ratio, divide any term by the term that precedes it:
\[ r = \frac{a_n}{a_{n-1}} \]

For example, in the sequence \( 3, 6, 12, 24, \dots \), the common ratio is \( 6 \div 3 = 2 \).

### Worked Example: Identifying a Geometric Sequence
Is the sequence \( 80, 40, 20, 10, \dots \) geometric?

1. **Check the ratio of the first two terms:** \( 40 \div 80 = 0.5 \).
2. **Check the ratio of the next two terms:** \( 20 \div 40 = 0.5 \).
3. **Check the ratio of the final two terms:** \( 10 \div 20 = 0.5 \).
Since the ratio is constant (\( r = 0.5 \)), this is a geometric sequence.

## Formulas for Sequences

Instead of listing terms one by one, we use formulas to find any term in a sequence without knowing the ones before it.

### Recursive Formulas
A **recursive formula** defines each term in terms of the one before it. It always requires two parts: the first term and the rule for finding the next term.

- **Arithmetic Recursive:** \( a_n = a_{n-1} + d \)
- **Geometric Recursive:** \( a_n = a_{n-1} \times r \)

*Example:* For the sequence \( 5, 8, 11, \dots \), the recursive formula is: \( a_1 = 5; a_n = a_{n-1} + 3 \).

### Explicit Formulas
An **explicit formula** allows you to calculate any term \( a_n \) directly using the term's position \( n \). This is much more efficient for finding large terms (like the 100th term).

- **Arithmetic Explicit:** \( a_n = a_1 + (n-1)d \)
- **Geometric Explicit:** \( a_n = a_1 \times r^{n-1} \)

*Example:* For the sequence \( 5, 8, 11, \dots \), the explicit formula is \( a_n = 5 + (n-1)3 \). To find the 100th term: \( a_{100} = 5 + (99 \times 3) = 5 + 297 = 302 \).

#### Diagram: Formula Builder
<details markdown="1">
<summary>Formula Builder (interactive infographic)</summary>
Type: infographic
**sim-id:** formula-builder<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Differentiate<br/>
**Learning Objective:** The learner will differentiate between recursive and explicit formulas by mapping the "requirements" (what you need to know) to the correct formula type.

**Prerequisites:** Recursive Formula for Sequences, Explicit Formula for Sequences

**Evidence of Mastery:** The learner correctly drags "previous term" to the recursive side and "term position (n)" to the explicit side.

**Misconceptions:** Students often confuse the two, thinking they can find the 100th term using a recursive formula without calculating the first 99.

**Instructional Rationale:** A sorting activity emphasizes the fundamental difference in how these formulas access data.

**Content:**
- Column A: "Recursive"
- Column B: "Explicit"
- Draggable items: "Needs the previous term", "Needs the term position (n)", "Fast for finding \( a_{100} \)", "Step-by-step process", "Direct calculation", "Requires \( a_1 \) only"
- Correct mappings:
  - Recursive: "Needs the previous term", "Step-by-step process"
  - Explicit: "Needs the term position (n)", "Fast for finding \( a_{100} \)", "Direct calculation", "Requires \( a_1 \) only"

**Provenance:** Synthetic

**Rules:** Correct items must be placed in the matching column to clear the level.

**Learner Activity:**
1. Read the description of a formula property.
2. Drag the property to either the Recursive or Explicit column.
3. Click "Verify" to see correct/incorrect placements.

**Feedback:** Correct: "Correct! This is a hallmark of [Recursive/Explicit] formulas." Incorrect: "Not quite. Think about whether this method requires you to know the term right before it."

**Starting State:** Two empty columns and a pile of draggable items.

**Chapter Anchors:** none
</details>

## Summing Sequences

When we add the terms of a sequence together, we create a **series**. The **sum of a sequence** is the total of all terms up to a certain point.

For a finite arithmetic sequence, the sum \( S_n \) can be found using:
\[ S_n = \frac{n(a_1 + a_n)}{2} \]
Essentially, you average the first and last terms and multiply by the number of terms.

## Convergence and Divergence

Finally, we look at what happens to a sequence as \( n \) becomes infinitely large.

A **divergent sequence** is one where the terms do not approach a specific finite value. Instead, they grow without bound toward positive or negative infinity.
*Example:* \( 2, 4, 8, 16, \dots \) is divergent because the numbers keep getting larger.

A **convergent sequence** is one where the terms approach a specific finite limit as \( n \) increases.
*Example:* \( 1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \dots \) is convergent because the terms get closer and closer to **0**.

---

## Key Takeaways

- **Sequences** are ordered lists of terms.
- **Arithmetic sequences** add a constant **common difference** \( d \).
- **Geometric sequences** multiply by a constant **common ratio** \( r \).
- **Recursive formulas** are step-by-step; **explicit formulas** are direct calculations.
- **Divergent sequences** grow without bound; **convergent sequences** approach a limit.
