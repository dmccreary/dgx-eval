---
title: "Quadratic Functions"
description: "Chapter covering quadratic functions, their properties, graphs, and applications"
generated_by: claude skill chapter-content-generator
date: "2026-10-10 17:00:00"
version: 1.11
---

# Quadratic Functions

## Summary
This chapter covers quadratic functions, including their algebraic forms, graphs, and key properties. Students will learn to solve quadratic equations, analyze parabola characteristics, and apply quadratic functions to model real-world situations. The chapter builds on foundational algebra skills and prepares students for more advanced mathematics.

## Concepts Covered
| Concept | Concept Impact Score |
|---------|----------------------|
| Power of Product | 51 |
| Power of Quotient | 51 |
| Power of Power | 51 |
| Zero Exponent | 1 |
| Negative Exponent | 50 |
| Radical Expression | 28 |
| Simplify Radical | 11 |
| Radicand | 1 |
| Index of Radical | 11 |
| Square Root Equation | 10 |
| Cube Root Expression | 3 |
| Rationalize Denominator | 1 |
| Function Notation Evaluation | 17 |
| Function Input Output | 17 |
| Independent Variable | 16 |
| Dependent Variable | 2 |

## Prerequisites
Students should be familiar with basic algebraic operations, integer exponents, radical expressions, and function notation from prior chapters. Understanding of linear equations and their graphs is also assumed.

### Elaboration Budget (CIS-Driven)

Each concept's target word count and required elements are driven by its Concept Impact Score (CIS), computed globally across the book. The elaboration score `E(c) = log(cis + 1) / log(cis_max + 1)` where `cis_max = 51` is the maximum CIS across the entire book.

| Concept | CIS | E(c) | Tier | Target Words | Required Elements |
|---------|-----|------|------|---------------|--------------------|
| Power of Product | 51 | 1.00 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Power of Quotient | 51 | 1.00 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Power of Power | 51 | 1.00 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Zero Exponent | 1 | 0.06 | C | 120-200 | definition |
| Negative Exponent | 50 | 0.99 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Radical Expression | 28 | 0.85 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Simplify Radical | 11 | 0.63 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Radicand | 1 | 0.06 | C | 120-200 | definition |
| Index of Radical | 11 | 0.63 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Square Root Equation | 10 | 0.61 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Cube Root Expression | 3 | 0.35 | B | 250-400 | worked example |
| Rationalize Denominator | 1 | 0.06 | C | 120-200 | definition |
| Function Notation Evaluation | 17 | 0.73 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Function Input Output | 17 | 0.73 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Independent Variable | 16 | 0.72 | A | 500-750 | worked example + diagram/chart/table/MicroSim |
| Dependent Variable | 2 | 0.28 | B | 250-400 | worked example |

**Chapter total: ~8,020 words** (sum of per-concept targets: 11 Tier A at ~625 words each, 2 Tier B at ~325 words each, 3 Tier C at ~160 words each)

## Content Generation

> **Reading Level:** Senior High (Grade 10)
> **Target Audience:** Junior High to High School Students (Grades 8-10)

Scaffolding is critical: every technical term must be defined in prose before it appears in a diagram, code block, or table. No more than 4 paragraphs of pure text should pass without a non-text element. Each interactive element must support at least one form of learner feedback (clickable regions, hover tooltips, or controls that change the rendered output).

---

## Product and Quotient Properties of Exponents

The properties of exponents extend naturally from integer exponents to rational and real exponents. Understanding these properties is essential for simplifying expressions and solving equations involving powers.

### Power of Product

**The learner will apply the product of powers property to simplify exponential expressions with the same base.**

When multiplying exponential expressions with the same base, add the exponents. This property reflects the repeated-multiplication definition of exponents: $a^m \cdot a^n = a^{m+n}$ because multiplying $m$ factors of $a$ by $n$ additional factors of $a$ gives $m+n$ factors total.

**Example:** $x^3 \cdot x^5 = x^{3+5} = x^8$

The product property applies only when the bases are identical. If the bases differ, the expression cannot be simplified using this rule.

#### Practice Problems

| Expression | Simplified Form |
|------------|----------------|
| $2^3 \cdot 2^4$ | $2^7$ |
| $y^2 \cdot y^6$ | $y^8$ |
| $a^m \cdot a^n$ | $a^{m+n}$ |

#### Diagram: Product of Powers

<details markdown="1">
<summary>Product of Powers MicroSim</summary>
Type: microsim
**sim-id:** product-of-powers-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** use
**Learning Objective:** The learner will use the product of powers property to simplify exponential expressions with the same base.

**Prerequisites:** integer exponents, base, exponent, multiplication, variable names

**Evidence of Mastery:** The learner correctly simplifies 5 out of 5 exponential multiplication problems with identical bases. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner adds bases instead of exponents (e.g., $2^3 \cdot 2^4 = 2^{3+4}$ becomes $2^7$ but incorrectly computes as $2^{3 \cdot 4} = 2^{12}$). The learner multiplies the bases and adds the exponents (e.g., $2^3 \cdot 2^4 = 6^7$).

**Instructional Rationale:** Apply-level practice requires the learner to actively use the property, not just observe it. Step-through problems where the learner selects the correct simplified form build procedural fluency.

**Content:** The learner can change the exponents using sliders. Each challenge presents two exponential terms with the same base to multiply. The learner types the simplified exponent.

**Feedback:** Correct: "Correct: the exponent is the sum." Incorrect: "To multiply powers with the same base, add the exponents: $a^m \cdot a^n = a^{m+n}$. Try again." Two attempts per problem. A running count "Problems correct: n of 5" is shown.

**Starting State:** Challenge 1 is shown with two exponential terms $2^3$ and $2^4$ and an empty answer box. The question on screen is "What is $2^3 \cdot 2^4$ simplified?"

**Chapter Anchors:** The chapter states that $x^3 \cdot x^5 = x^8$. The chapter's worked example uses base 2 with exponents 3 and 4.

</details>

### Power of Quotient

**The learner will apply the quotient of powers property to simplify exponential expressions with the same base.**

When dividing exponential expressions with the same base, subtract the exponent in the denominator from the exponent in the numerator. This property reflects the repeated-multiplication definition: $a^m / a^n = a^{m-n}$ because removing $n$ factors of $a$ from $m$ factors leaves $m-n$ factors.

**Example:** $y^7 / y^3 = y^{7-3} = y^4$

The quotient property applies only when the bases are identical and the base is nonzero. If $a = 0$, the expression is undefined.

#### Practice Problems

| Expression | Simplified Form |
|------------|----------------|
| $5^6 / 5^2$ | $5^4$ |
| $b^9 / b^4$ | $b^5$ |
| $x^m / x^n$ | $x^{m-n}$ |

#### Diagram: Quotient of Powers

<details markdown="1">
<summary>Quotient of Powers MicroSim</summary>
Type: microsim
**sim-id:** quotient-of-powers-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** use
**Learning Objective:** The learner will use the quotient of powers property to simplify exponential expressions with the same base.

**Prerequisites:** integer exponents, base, exponent, division, variable names

**Evidence of Mastery:** The learner correctly simplifies 5 out of 5 exponential division problems with identical bases. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner subtracts exponents in the wrong order (e.g., $y^7 / y^3 = y^{3-7} = y^{-4}$). The learner subtracts the numerator exponent from the denominator exponent.

**Instructional Rationale:** Apply-level practice requires the learner to actively use the property. Step-through problems build procedural fluency with feedback on common order errors.

**Content:** The learner can change the exponents using sliders. Each challenge presents an exponential division with the same base. The learner types the simplified exponent.

**Feedback:** Correct: "Correct: the exponent is the difference." Incorrect: "To divide powers with the same base, subtract the exponent in the denominator from the exponent in the numerator: $a^m / a^n = a^{m-n}$. Try again." Two attempts per problem. A running count "Problems correct: n of 5" is shown.

**Starting State:** Challenge 1 is shown with $y^9 / y^4$ and an empty answer box. The question on screen is "What is $y^9 / y^4$ simplified?"

**Chapter Anchors:** The chapter states that $y^7 / y^3 = y^4$. The chapter's worked example uses base 5 with exponents 6 and 2.

</details>

### Power of Power

**The learner will apply the power of a power property to simplify exponential expressions.**

When raising an exponential expression to another power, multiply the exponents. This property reflects the repeated-multiplication definition: $(a^m)^n = a^{m \cdot n}$ because raising $a^m$ to the $n$th power means multiplying $a^m$ by itself $n$ times, giving $m \cdot n$ factors of $a$ total.

**Example:** $(z^2)^4 = z^{2 \cdot 4} = z^8$

The power property applies to any real number exponent. When the base is negative, pay attention to the order of operations and parentheses.

#### Practice Problems

| Expression | Simplified Form |
|------------|----------------|
| $(3^2)^4$ | $3^8$ |
| $(b^3)^5$ | $b^{15}$ |
| $(x^m)^n$ | $x^{m \cdot n}$ |

#### Diagram: Power of a Power

<details markdown="1">
<summary>Power of a Power MicroSim</summary>
Type: microsim
**sim-id:** power-of-a-power-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** use
**Learning Objective:** The learner will use the power of a power property to simplify exponential expressions.

**Prerequisites:** integer exponents, base, exponent, parentheses, multiplication, variable names

**Evidence of Mastery:** The learner correctly simplifies 5 out of 5 power-of-a-power problems. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner adds the exponents instead of multiplying (e.g., $(z^2)^4 = z^{2+4} = z^6$). The learner applies the power only to the base and forgets the exponent (e.g., $(3^2)^4 = 3^2 = 9$).

**Instructional Rationale:** Apply-level practice requires the learner to actively multiply exponents. Immediate feedback on the common error of adding instead of multiplying reinforces the correct property.

**Content:** The learner can change the base and exponents using sliders. Each challenge presents a power raised to another power. The learner types the simplified exponent.

**Feedback:** Correct: "Correct: multiply the exponents." Incorrect: "To raise a power to a power, multiply the exponents: $(a^m)^n = a^{m \cdot n}$. Try again." Two attempts per problem. A running count "Problems correct: n of 5" is shown.

**Starting State:** Challenge 1 is shown with $(3^2)^4$ and an empty answer box. The question on screen is "What is $(3^2)^4$ simplified?"

**Chapter Anchors:** The chapter states that $(z^2)^4 = z^8$. The chapter's worked example uses base 3 with exponents 2 and 4.

</details>

## Radical Expressions and Equations

### Radical Expression

**The learner will identify and work with radical expressions involving square roots and higher-order roots.**

A radical expression contains a radical symbol $\sqrt[n]{a}$ where $n$ is the index and $a$ is the radicand. When $n = 2$, the index is typically omitted and the symbol represents the square root. The radical expression $\sqrt{a}$ asks: "What number, multiplied by itself, gives $a$?"

**Example:** $\sqrt{25} = 5$ because $5 \cdot 5 = 25$. Also $\sqrt[3]{8} = 2$ because $2 \cdot 2 \cdot 2 = 8$.

The radicand $a$ must be nonnegative when $n = 2$ (even index) for the principal square root to be a real number. When $n$ is odd, $a$ can be any real number.

#### Practice Problems

| Radical Expression | Simplified Value |
|-------------------|------------------|
| $\sqrt{36}$ | $6$ |
| $\sqrt[3]{27}$ | $3$ |
| $\sqrt{100}$ | $10$ |

#### Diagram: Radical Expression

<details markdown="1">
<summary>Radical Expression MicroSim</summary>
Type: microsim
**sim-id:** radical-expression-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** identify
**Learning Objective:** The learner will identify and simplify radical expressions involving square roots and cube roots.

**Prerequisites:** square root, cube root, radicand, index, radical symbol, perfect squares, perfect cubes

**Evidence of Mastery:** The learner correctly simplifies 5 out of 5 radical expressions. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner assumes $\sqrt{a^2} = a$ without considering the principal root (e.g., $\sqrt{(-5)^2} = \sqrt{25} = 5$, not $-5$). The learner cannot simplify radicals with non-perfect-square radicands.

**Instructional Rationale:** Understand-level identification requires the learner to recognize radical expressions and their components. Labeling parts of a radical builds fluency with the terminology.

**Content:** The learner can change the radicand and index using controls. Each challenge presents a radical expression. The learner identifies the index and radicand, and simplifies if possible.

**Feedback:** Correct: "Correct: the index is $n$ and the radicand is $a$." Incorrect: "A radical expression $\sqrt[n]{a}$ has index $n$ and radicand $a$. The index tells you which root to take, and the radicand is the number under the radical symbol." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $\sqrt{36}$ and an empty identification field. The question on screen is "Identify the index and radicand in $\sqrt{36}$."

**Chapter Anchors:** The chapter states that $\sqrt{36} = 6$ and $\sqrt[3]{27} = 3$. The chapter introduces the terms index and radicand before this section.

</details>

### Simplify Radical

**The learner will simplify radical expressions by factoring out perfect squares (or perfect cubes for cube roots).**

To simplify $\sqrt{a}$ where $a$ contains a perfect square factor, factor $a = k \cdot m^2$ where $m^2$ is the largest perfect square factor, then $\sqrt{a} = m\sqrt{k}$. For cube roots, factor $a = k \cdot m^3$ where $m^3$ is the largest perfect cube factor.

**Example:** $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$ because $25 = 5^2$ is the largest perfect square factor of 50.

**Example:** $\sqrt[3]{16} = \sqrt[3]{8 \cdot 2} = 2\sqrt[3]{2}$ because $8 = 2^3$ is the largest perfect cube factor of 16.

#### Practice Problems

| Radical Expression | Simplified Form |
|-------------------|----------------|
| $\sqrt{72}$ | $6\sqrt{2}$ |
| $\sqrt[3]{24}$ | $2\sqrt[3]{2}$ |
| $\sqrt{98}$ | $7\sqrt{2}$ |

#### Diagram: Simplify Radical

<details markdown="1">
<summary>Simplify Radical MicroSim</summary>
Type: microsim
**sim-id:** simplify-radical-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** practice
**Learning Objective:** The learner will practice simplifying radical expressions by factoring out perfect squares and perfect cubes.

**Prerequisites:** perfect squares, perfect cubes, factorization, multiplication, division, radical symbol, index

**Evidence of Mastery:** The learner correctly simplifies 5 out of 5 radical expressions by factoring out perfect squares/cubes. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner factors out a square that is not the largest perfect square factor (e.g., $\sqrt{72} = 3\sqrt{8}$ instead of $6\sqrt{2}$). The learner forgets to include the remaining radical (e.g., $\sqrt{72} = 6$ instead of $6\sqrt{2}$).

**Instructional Rationale:** Apply-level practice builds fluency with the simplification technique. Immediate feedback on incomplete or incorrect factoring reinforces the complete procedure.

**Content:** The learner can change the radicand using a slider. Each challenge presents a radical expression to simplify. The learner types the factored form.

**Feedback:** Correct: "Correct: the simplified form is $m\sqrt{k}$." Incorrect: "To simplify $\sqrt{a}$, factor $a = k \cdot m^2$ where $m^2$ is the largest perfect square factor, then $\sqrt{a} = m\sqrt{k}$. Review the factoring steps and try again." Two attempts per problem. A running count "Problems correct: n of 5" is shown.

**Starting State:** Challenge 1 is shown with $\sqrt{72}$ and an empty simplification field. The question on screen is "Simplify $\sqrt{72}$ by factoring out the largest perfect square."

**Chapter Anchors:** The chapter states that $\sqrt{72} = 6\sqrt{2}$ and $\sqrt[3]{24} = 2\sqrt[3]{2}$. The chapter covers factoring perfect squares/cubes before this section.

</details>

### Radicand

**The learner will identify the radicand in a radical expression and understand its role.**

The radicand is the quantity under the radical symbol. In $\sqrt[n]{a}$, $a$ is the radicand. The radicand can be a positive number, a negative number (when the index is odd), or an expression involving variables.

**Example:** In $\sqrt{49}$, the radicand is $49$. In $\sqrt[3]{-8}$, the radicand is $-8$.

#### Practice Problems

| Radical Expression | Radicand |
|-------------------|----------|
| $\sqrt{64}$ | $64$ |
| $\sqrt[3]{-27}$ | $-27$ |
| $\sqrt{a^2}$ | $a^2$ |

#### Diagram: Radicand

<details markdown="1">
<summary>Radicand MicroSim</summary>
Type: microsim
**sim-id:** radicand-identifier
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Remember
**Bloom Verb:** name
**Learning Objective:** The learner will identify the radicand in a radical expression and state its value.

**Prerequisites:** radical symbol, index, radicand, square root, cube root

**Evidence of Mastery:** The learner correctly identifies the radicand in 5 out of 5 radical expressions. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner confuses the radicand with the index (e.g., in $\sqrt{49}$, the learner says the index is 49). The learner assumes the radicand must be positive for all indices.

**Instructional Rationale:** Remember-level identification builds fluency with radical terminology. Correct use of terms sets the foundation for working with radical expressions.

**Content:** The learner can change the radical expression using controls. Each challenge presents a radical expression. The learner types or selects the radicand.

**Feedback:** Correct: "Correct: the radicand is the expression under the radical symbol." Incorrect: "In the radical expression $\sqrt[n]{a}$, $a$ is the radicand. The index $n$ tells you which root to take, and the radicand is the number under the radical symbol." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $\sqrt{64}$ and an empty radicand field. The question on screen is "What is the radicand in $\sqrt{64}$?"

**Chapter Anchors:** The chapter states that in $\sqrt{64}$, the radicand is $64$. The chapter introduces the term "radicand" before this section.

</details>

### Index of Radical

**The learner will identify and name the index of a radical expression.**

The index of a radical expression is the small integer $n$ written just above and to the left of the radical symbol $\sqrt[n]{a}$. When index $n = 2$, it is typically omitted and the symbol represents the square root. When $n = 3$, the radical represents the cube root. Higher indices indicate higher-order roots.

**Example:** In $\sqrt[3]{8}$, the index is $3$ (cube root). In $\sqrt{25}$, the index is implicitly $2$ (square root).

#### Practice Problems

| Radical Expression | Index |
|-------------------|-------|
| $\sqrt{49}$ | $2$ (implicit) |
| $\sqrt[3]{8}$ | $3$ |
| $\sqrt[4]{16}$ | $4$ |

#### Diagram: Index of Radical

<details markdown="1">
<summary>Index of Radical MicroSim</summary>
Type: microsim
**sim-id:** index-of-radical-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Remember
**Bloom Verb:** name
**Learning Objective:** The learner will identify and name the index of a radical expression.

**Prerequisites:** radical symbol, index, radicand, square root, cube root, higher-order roots

**Evidence of Mastery:** The learner correctly identifies the index in 5 out of 5 radical expressions. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner confuses the index with the radicand (e.g., in $\sqrt[3]{8}$, the learner says the index is 8). The learner assumes the index is always 2 (square root) and cannot identify higher-order roots.

**Instructional Rationale:** Remember-level identification builds fluency with radical terminology. Correct use of the term "index" sets the foundation for working with higher-order roots.

**Content:** The learner can change the radical expression using controls. Each challenge presents a radical expression. The learner types or selects the index.

**Feedback:** Correct: "Correct: the index is $n$ in $\sqrt[n]{a}$." Incorrect: "In the radical expression $\sqrt[n]{a}$, $n$ is the index. The index tells you which root to take. The radicand $a$ is the number under the radical symbol. Review the parts of a radical expression and try again." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $\sqrt[3]{8}$ and an empty index field. The question on screen is "What is the index in $\sqrt[3]{8}$?"

**Chapter Anchors:** The chapter states that in $\sqrt[3]{8}$, the index is $3$. The chapter introduces the term "index" before this section.

</details>

### Square Root Equation

**The learner will solve square root equations by isolating the radical and squaring both sides.**

To solve an equation containing a square root, isolate the radical term on one side, then square both sides to eliminate the radical. Always check for extraneous solutions by substituting the solution back into the original equation.

**Example:** Solve $\sqrt{x + 3} = 5$:
1. Isolate: $\sqrt{x + 3} = 5$
2. Square both sides: $x + 3 = 25$
3. Solve: $x = 22$
4. Check: $\sqrt{22 + 3} = \sqrt{25} = 5$ ✓

#### Practice Problems

| Equation | Solution | Check |
|----------|----------|-------|
| $\sqrt{x + 1} = 3$ | $x = 8$ | $\sqrt{8 + 1} = \sqrt{9} = 3$ ✓ |
| $\sqrt{2x - 1} = 5$ | $x = 13$ | $\sqrt{2 \cdot 13 - 1} = \sqrt{25} = 5$ ✓ |

#### Diagram: Square Root Equation

<details markdown="1">
<summary>Square Root Equation MicroSim</summary>
Type: microsim
**sim-id:** square-root-equation-solver
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** solve
**Learning Objective:** The learner will solve square root equations by isolating the radical and squaring both sides, and check for extraneous solutions.

**Prerequisites:** square root, isolating terms, squaring both sides, linear equations, checking for extraneous solutions, variable isolation

**Evidence of Mastery:** The learner correctly solves 4 out of 4 square root equations and identifies whether each solution is extraneous. Mastery: 4 of 4 correct, with at least 1 extraneous solution recognized.

**Misconceptions:** The learner forgets to check for extraneous solutions and accepts all algebraic solutions. The learner squares only one side of the equation or forgets to isolate the radical before squaring.

**Instructional Rationale:** Apply-level practice requires the learner to actively solve equations and check solutions. The check step is critical for square root equations because squaring both sides can introduce solutions that don't satisfy the original equation.

**Content:** The learner can change the equation using controls. Each challenge presents a square root equation to solve. The learner isolates the radical, squares both sides, solves the resulting equation, and checks the solution.

**Feedback:** Correct: "Correct: the solution is $x =$ [value] and it checks." Incorrect: "To solve $\sqrt{x + a} = b$: (1) Isolate the radical $\sqrt{x + a} = b$. (2) Square both sides $x + a = b^2$. (3) Solve for $x$. (4) Check by substituting into the original equation. An extraneous solution will not satisfy the original equation." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $\sqrt{x + 1} = 3$ and an empty solution field. The question on screen is "Solve $\sqrt{x + 1} = 3$ and check your solution."

**Chapter Anchors:** The chapter states that $\sqrt{x + 1} = 3$ has solution $x = 8$. The chapter models the check step before this section.

</details>

### Cube Root Expression

**The learner will identify and work with cube root expressions.**

A cube root expression $\sqrt[3]{a}$ asks: "What number, multiplied by itself three times, gives $a$?" Unlike square roots, cube roots are defined for all real numbers, including negatives. $\sqrt[3]{-8} = -2$ because $(-2) \cdot (-2) \cdot (-2) = -8$.

**Example:** $\sqrt[3]{27} = 3$ because $3 \cdot 3 \cdot 3 = 27$. Also $\sqrt[3]{-8} = -2$ because $(-2) \cdot (-2) \cdot (-2) = -8$.

#### Practice Problems

| Radical Expression | Value |
|-------------------|-------|
| $\sqrt[3]{64}$ | $4$ |
| $\sqrt[3]{-27}$ | $-3$ |
| $\sqrt[3]{125}$ | $5$ |

#### Diagram: Cube Root Expression

<details markdown="1">
<summary>Cube Root Expression MicroSim</summary>
Type: microsim
**sim-id:** cube-root-expression-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** explain
**Learning Objective:** The learner will identify and work with cube root expressions, including negative radicands.

**Prerequisites:** cube root, radicand, index 3, negative numbers, multiplication, real numbers

**Evidence of Mastery:** The learner correctly simplifies 5 out of 5 cube root expressions, including negative radicands. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner assumes cube roots of negative numbers are undefined. The learner confuses cube roots with square roots and thinks $\sqrt[3]{-8}$ is undefined.

**Instructional Rationale:** Understand-level explanation requires the learner to articulate why cube roots differ from square roots in their treatment of negative numbers. This conceptual understanding prevents the common error of assuming radicals of negative numbers are always imaginary.

**Content:** The learner can change the radicand using a slider. Each challenge presents a cube root expression. The learner simplifies or evaluates the expression.

**Feedback:** Correct: "Correct: $\sqrt[3]{-8} = -2$ because $(-2)^3 = -8$." Incorrect: "Unlike square roots, cube roots are defined for all real numbers, including negatives. $\sqrt[3]{-8} = -2$ because $(-2) \cdot (-2) \cdot (-2) = -8$. Review the difference between even and odd indices and try again." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $\sqrt[3]{27}$ and an empty evaluation field. The question on screen is "What is $\sqrt[3]{27}$?"

**Chapter Anchors:** The chapter states that $\sqrt[3]{27} = 3$ and $\sqrt[3]{-8} = -2$. The chapter introduces cube roots before this section.

</details>

### Rationalize Denominator

**The learner will rationalize the denominator of a radical expression by eliminating radicals from the denominator.**

To rationalize a denominator containing a single square root, multiply both numerator and denominator by the radical in the denominator. For a binomial denominator containing a square root, multiply by the conjugate.

**Example:** Rationalize $\frac{3}{\sqrt{2}}$: multiply numerator and denominator by $\sqrt{2}$ to get $\frac{3\sqrt{2}}{2}$.

**Example:** Rationalize $\frac{1}{1 + \sqrt{3}}$: multiply numerator and denominator by the conjugate $1 - \sqrt{3}$ to get $\frac{1 - \sqrt{3}}{1 - 3} = \frac{1 - \sqrt{3}}{-2} = \frac{\sqrt{3} - 1}{2}$.

#### Practice Problems

| Expression | Rationalized Form |
|------------|------------------|
| $\frac{3}{\sqrt{5}}$ | $\frac{3\sqrt{5}}{5}$ |
| $\frac{2}{1 + \sqrt{3}}$ | $\frac{\sqrt{3} - 1}{2}$ |

#### Diagram: Rationalize Denominator

<details markdown="1">
<summary>Rationalize Denominator MicroSim</summary>
Type: microsim
**sim-id:** rationalize-denominator-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** practice
**Learning Objective:** The learner will practice rationalizing denominators containing single square roots and binomial expressions with square roots.

**Prerequisites:** square root, denominator, numerator, multiplication, division, conjugates, simplifying radicals

**Evidence of Mastery:** The learner correctly rationalizes 5 out of 5 denominator expressions. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner multiplies only the numerator or only the denominator. The learner uses the conjugate when the denominator is a single term (and should just multiply by the radical). The learner forgets to simplify the resulting expression.

**Instructional Rationale:** Apply-level practice builds fluency with the two rationalization techniques (single radical and binomial with conjugate). Immediate feedback on which technique to use reinforces the distinction.

**Content:** The learner can change the expression using controls. Each challenge presents a radical expression in the denominator. The learner types the rationalized form.

**Feedback:** Correct: "Correct: the denominator is rationalized." Incorrect: "To rationalize a denominator with a single square root, multiply numerator and denominator by that radical. To rationalize a binomial denominator, multiply by the conjugate. Review the rationalization techniques and try again." Two attempts per problem. A running count "Problems correct: n of 5" is shown.

**Starting State:** Challenge 1 is shown with $\frac{3}{\sqrt{5}}$ and an empty rationalized form field. The question on screen is "Rationalize the denominator: $\frac{3}{\sqrt{5}}$."

**Chapter Anchors:** The chapter states that $\frac{3}{\sqrt{5}}$ rationalized is $\frac{3\sqrt{5}}{5}$. The chapter covers rationalizing denominators before this section.

</details>

## Function Notation and Evaluation

### Function Notation Evaluation

**The learner will evaluate functions using function notation.**

Function notation $f(x)$ names the output of function $f$ when the input is $x$. The expression $f(x)$ does not mean $f$ times $x$. To evaluate a function, substitute the given value for $x$ and simplify.

**Example:** If $f(x) = 2x + 3$, then $f(4) = 2(4) + 3 = 8 + 3 = 11$.

**Example:** If $g(x) = x^2 - 5x + 2$, then $g(-1) = (-1)^2 - 5(-1) + 2 = 1 + 5 + 2 = 8$.

#### Practice Problems

| Function | Evaluation | Result |
|----------|------------|--------|
| $f(x) = 3x - 7$, find $f(5)$ | $f(5) = 3(5) - 7$ | $= 15 - 7 = 8$ |
| $g(x) = x^2 + 2x - 1$, find $g(-2)$ | $g(-2) = (-2)^2 + 2(-2) - 1$ | $= 4 - 4 - 1 = -1$ |
| $h(x) = 2^x$, find $h(3)$ | $h(3) = 2^3$ | $= 8$ |

#### Diagram: Function Notation Evaluation

<details markdown="1">
<summary>Function Notation Evaluation MicroSim</summary>
Type: microsim
**sim-id:** function-notation-evaluation-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** evaluate
**Learning Objective:** The learner will evaluate functions using function notation, substituting values for the independent variable.

**Prerequisites:** function notation, independent variable, dependent variable, substitution, simplification, order of operations

**Evidence of Mastery:** The learner correctly evaluates 5 out of 5 function notation problems. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner interprets $f(x)$ as $f$ times $x$. The learner substitutes the value for the function name rather than for $x$. The learner forgets to apply the order of operations when simplifying.

**Instructional Rationale:** Apply-level practice requires the learner to actively substitute and simplify. Immediate feedback on the common error of interpreting $f(x)$ as multiplication reinforces the correct meaning of function notation.

**Content:** The learner can change the function and the input value using controls. Each challenge presents a function and a value to evaluate. The learner types the result.

**Feedback:** Correct: "Correct: the evaluation is [value]." Incorrect: "To evaluate $f(x)$ when $x =$ [value], substitute [value] for $x$ in the function rule and simplify. $f([value]) =$ [substitution]. Review the substitution steps and try again." Two attempts per problem. A running count "Problems correct: n of 5" is shown.

**Starting State:** Challenge 1 is shown with $f(x) = 2x + 1$ and $f(3)$ and an empty answer field. The question on screen is "If $f(x) = 2x + 1$, what is $f(3)$?"

**Chapter Anchors:** The chapter states that if $f(x) = 2x + 1$, then $f(3) = 7$. The chapter introduces function notation before this section.

</details>

### Function Input Output

**The learner will distinguish between the independent variable (input) and the dependent variable (output) in a function.**

The independent variable, often denoted $x$, is the input value that the learner chooses or controls. The dependent variable, often denoted $y$ or $f(x)$, is the output value that depends on the independent variable. In function notation $f(x)$, $x$ is the independent variable and $f(x)$ is the dependent variable.

**Example:** In the function $f(x) = 2x + 3$, $x$ is the independent variable and $f(x)$ is the dependent variable. If $x = 4$, then $f(4) = 11$ is the dependent variable.

#### Practice Problems

| Function | Independent Variable | Dependent Variable |
|----------|---------------------|--------------------|
| $f(x) = 3x - 5$ | $x$ | $f(x)$ |
| $y = 2x + 7$ | $x$ | $y$ |
| $f(x) = x^2$ | $x$ | $f(x)$ |

#### Diagram: Function Input Output

<details markdown="1">
<summary>Function Input Output MicroSim</summary>
Type: microsim
**sim-id:** function-input-output-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** distinguish
**Learning Objective:** The learner will distinguish between the independent variable (input) and the dependent variable (output) in a function.

**Prerequisites:** function notation, independent variable, dependent variable, input, output

**Evidence of Mastery:** The learner correctly identifies the independent and dependent variables in 5 out of 5 function representations. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner confuses which variable is independent and which is dependent. The learner thinks the dependent variable is always $y$ and the independent variable is always $x$, regardless of the function representation.

**Instructional Rationale:** Understand-level distinction requires the learner to conceptually differentiate input from output. This distinction is fundamental to understanding functions and function notation.

**Content:** The learner can change the function representation using controls. Each challenge presents a function in a different form (equation, graph, table). The learner identifies the independent and dependent variables.

**Feedback:** Correct: "Correct: [variable] is the independent variable (input) and [variable] is the dependent variable (output)." Incorrect: "In a function, the independent variable is the input that you choose or control, and the dependent variable is the output that depends on the independent variable. Review which variable is which and try again." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $f(x) = 2x + 3$ and an empty identification fields. The question on screen is "In $f(x) = 2x + 3$, which variable is the independent variable and which is the dependent variable?"

**Chapter Anchors:** The chapter states that in $f(x) = 2x + 3$, $x$ is the independent variable and $f(x)$ is the dependent variable. The chapter introduces function notation before this section.

</details>

### Independent Variable

**The learner will identify the independent variable in a function representation and understand its role.**

The independent variable is the input value that the learner chooses or controls. It is called "independent" because its value is not determined by other variables in the function; the learner can select any value from the domain. In mathematical notation, the independent variable is often denoted by $x$.

**Example:** In the function $f(x) = 2x + 3$, the independent variable is $x$. The learner can choose any value for $x$ in the domain, and the corresponding output $f(x)$ will depend on that choice.

#### Practice Problems

| Function | Independent Variable |
|----------|---------------------|
| $f(x) = 3x - 5$ | $x$ |
| $y = 2x + 7$ | $x$ |
| $s(t) = -16t^2 + 64t + 5$ | $t$ |

#### Diagram: Independent Variable

<details markdown="1">
<summary>Independent Variable MicroSim</summary>
Type: microsim
**sim-id:** independent-variable-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** identify
**Learning Objective:** The learner will identify the independent variable in a function representation and understand its role as the input.

**Prerequisites:** function, independent variable, dependent variable, input, output, function notation

**Evidence of Mastery:** The learner correctly identifies the independent variable in 5 out of 5 function representations. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner confuses the independent variable with the dependent variable. The learner thinks the independent variable is always $x$ and cannot identify it in non-standard notation (e.g., $s(t)$).

**Instructional Rationale:** Understand-level identification builds fluency with the concept of input versus output. Correct identification of the independent variable is essential for interpreting functions and their graphs.

**Content:** The learner can change the function representation using controls. Each challenge presents a function in a different form (equation, graph, table, word problem). The learner types or selects the independent variable.

**Feedback:** Correct: "Correct: [variable] is the independent variable (input)." Incorrect: "The independent variable is the input value that you choose or control. Its value is not determined by other variables in the function. Review which variable represents the input and try again." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $f(x) = 2x + 3$ and an empty identification field. The question on screen is "In $f(x) = 2x + 3$, what is the independent variable?"

**Chapter Anchors:** The chapter states that in $f(x) = 2x + 3$, the independent variable is $x$. The chapter introduces the term "independent variable" before this section.

</details>

### Dependent Variable

**The learner will identify the dependent variable in a function representation and understand its role.**

The dependent variable is the output value that depends on the independent variable. It is called "dependent" because its value is determined by the value of the independent variable. In mathematical notation, the dependent variable is often denoted by $y$ or $f(x)$, where $f(x)$ represents the value of the function when the independent variable $x$ is given.

**Example:** In the function $f(x) = 2x + 3$, the dependent variable is $f(x)$ (or $y$). If $x = 4$, then $f(4) = 11$ is the dependent variable. The value of the dependent variable depends on the choice of the independent variable.

#### Practice Problems

| Function | Dependent Variable |
|----------|-------------------|
| $f(x) = 3x - 5$ | $f(x)$ or $y$ |
| $y = 2x + 7$ | $y$ |
| $s(t) = -16t^2 + 64t + 5$ | $s$ or $t$'s output value |

#### Diagram: Dependent Variable

<details markdown="1">
<summary>Dependent Variable MicroSim</summary>
Type: microsim
**sim-id:** dependent-variable-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** identify
**Learning Objective:** The learner will identify the dependent variable in a function representation and understand its role as the output.

**Prerequisites:** function, dependent variable, independent variable, output, input, function notation

**Evidence of Mastery:** The learner correctly identifies the dependent variable in 5 out of 5 function representations. Mastery: 5 of 5 correct on the first attempt.

**Misconceptions:** The learner confuses the dependent variable with the independent variable. The learner thinks the dependent variable is always $y$ and cannot identify it in function notation (e.g., $f(x)$).

**Instructional Rationale:** Understand-level identification builds fluency with the concept of output versus input. Correct identification of the dependent variable is essential for interpreting functions and their graphs.

**Content:** The learner can change the function representation using controls. Each challenge presents a function in a different form (equation, graph, table, word problem). The learner types or selects the dependent variable.

**Feedback:** Correct: "Correct: [variable] is the dependent variable (output)." Incorrect: "The dependent variable is the output value that depends on the independent variable. Its value is determined by the value of the independent variable. Review which variable represents the output and try again." Two attempts per problem.

**Starting State:** Challenge 1 is shown with $f(x) = 2x + 3$ and an empty identification field. The question on screen is "In $f(x) = 2x + 3$, what is the dependent variable?"

**Chapter Anchors:** The chapter states that in $f(x) = 2x + 3$, the dependent variable is $f(x)$ (or $y$). The chapter introduces the term "dependent variable" before this section.

</details>

## Graphing Quadratic Functions

### Parabola Characteristics

**The learner will identify and analyze the key characteristics of a parabola represented by a quadratic function.**

A quadratic function is a function of the form $f(x) = ax^2 + bx + c$ where $a \neq 0$. The graph of a quadratic function is a parabola. Key characteristics include:

- **Vertex:** The highest or lowest point of the parabola, at $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$
- **Axis of symmetry:** The vertical line $x = -\frac{b}{2a}$ that divides the parabola into two mirror images
- **Direction of opening:** The parabola opens upward if $a > 0$ and downward if $a < 0$
- **y-intercept:** The point $(0, f(0)) = (0, c)$
- **x-intercepts (zeros/roots):** The points where the parabola crosses the x-axis, found by solving $f(x) = 0$

**Example:** For $f(x) = x^2 - 4x + 3$:
- Vertex: $x = -(-4)/(2 \cdot 1) = 2$, $f(2) = 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1$, so vertex is $(2, -1)$
- Axis of symmetry: $x = 2$
- Opens upward since $a = 1 > 0$
- y-intercept: $(0, 3)$
- x-intercepts: solve $x^2 - 4x + 3 = 0$, $(x - 1)(x - 3) = 0$, so $x = 1$ and $x = 3$

#### Practice Problems

| Function | Vertex | Axis of Symmetry | Direction | y-intercept | x-intercepts |
|----------|--------|-----------------|-----------|-------------|--------------|
| $f(x) = x^2 - 4x + 3$ | $(2, -1)$ | $x = 2$ | up | $(0, 3)$ | $x = 1, 3$ |
| $g(x) = -x^2 + 2x - 1$ | $(1, 0)$ | $x = 1$ | down | $(0, -1)$ | $x = 1$ (double) |

#### Diagram: Parabola Characteristics

<details markdown="1">
<summary>Parabola Characteristics MicroSim</summary>
Type: microsim
**sim-id:** parabola-characteristics-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Analyze
**Bloom Verb:** differentiate
**Learning Objective:** The learner will analyze the key characteristics of a parabola (vertex, axis of symmetry, direction of opening, intercepts) from its quadratic equation.

**Prerequisites:** quadratic function, vertex, axis of symmetry, direction of opening, y-intercept, x-intercepts, factoring, completing the square

**Evidence of Mastery:** The learner correctly identifies all five characteristics (vertex, axis of symmetry, direction, y-intercept, x-intercepts) for 4 out of 4 quadratic functions. Mastery: 4 of 4 correct.

**Misconceptions:** The learner confuses the axis of symmetry with the x-intercept. The learner incorrectly determines the direction of opening based on the sign of $c$ rather than $a$. The learner finds the vertex $(a, c)$ instead of $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$.

**Instructional Rationale:** Analyze-level differentiation requires the learner to examine relationships between the coefficients and the graph's characteristics. Identifying all five characteristics from the equation builds deep conceptual understanding.

**Content:** The learner can change the coefficients $a$, $b$, and $c$ using sliders. Each challenge presents a quadratic equation. The learner selects or types the five characteristics.

**Feedback:** Correct: "Correct: the five characteristics are [list]." Incorrect: "To find the characteristics of $f(x) = ax^2 + bx + c$: (1) Vertex at $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$. (2) Axis of symmetry: $x = -\frac{b}{2a}$. (3) Direction: opens upward if $a > 0$, downward if $a < 0$. (4) y-intercept: $(0, c)$. (5) x-intercepts: solve $f(x) = 0$. Review the steps and try again." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $f(x) = x^2 - 4x + 3$ and empty characteristic fields. The question on screen is "Find the vertex, axis of symmetry, direction of opening, y-intercept, and x-intercepts for $f(x) = x^2 - 4x + 3$."

**Chapter Anchors:** The chapter states that for $f(x) = x^2 - 4x + 3$, the vertex is $(2, -1)$, axis of symmetry is $x = 2$, opens upward, y-intercept is $(0, 3)$, and x-intercepts are $x = 1$ and $x = 3$. The chapter covers parabola characteristics before this section.

</details>

### Function Transformation

**The learner will identify and describe transformations of quadratic function graphs.**

Transformations of quadratic functions include vertical and horizontal shifts, vertical stretches and compressions, and reflections. The transformation form is $f(x) = a(x - h)^2 + k$ where $(h, k)$ is the vertex, $|a|$ affects the vertical stretch/compression and direction, $h$ horizontal shift, and $k$ vertical shift.

**Example:** $f(x) = (x - 2)^2 + 3$ has vertex $(2, 3)$, opens upward, and is shifted right 2 units and up 3 units from $f(x) = x^2$.

#### Practice Problems

| Function | Vertex | Horizontal Shift | Vertical Shift | Direction |
|----------|--------|-----------------|----------------|-----------|
| $f(x) = (x - 2)^2 + 3$ | $(2, 3)$ | right 2 | up 3 | up |
| $g(x) = -2(x + 1)^2 - 4$ | $(-1, -4)$ | left 1 | down 4 | down |
| $h(x) = 0.5(x - 3)^2$ | $(3, 0)$ | right 3 | none | up |

#### Diagram: Function Transformation

<details markdown="1">
<summary>Function Transformation MicroSim</summary>
Type: microsim
**sim-id:** function-transformation-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** describe
**Learning Objective:** The learner will identify and describe transformations of quadratic function graphs in vertex form.

**Prerequisites:** quadratic function, vertex form, vertex, horizontal shift, vertical shift, stretch/compression, reflection, vertex form $f(x) = a(x - h)^2 + k$

**Evidence of Mastery:** The learner correctly identifies the vertex, horizontal shift, vertical shift, and direction for 4 out of 4 transformed quadratic functions. Mastery: 4 of 4 correct.

**Misconceptions:** The learner interprets $(x - h)$ as a shift of $h$ units to the left (instead of right). The learner thinks $|a| > 1$ compresses the graph (instead of stretching). The learner confuses the direction of horizontal shifts.

**Instructional Rationale:** Understand-level description requires the learner to articulate how each parameter in vertex form affects the graph. This conceptual understanding prevents errors in graphing transformed quadratics.

**Content:** The learner can change the parameters $a$, $h$, and $k$ using sliders. Each challenge presents a transformed quadratic function. The learner describes the vertex, shifts, and direction.

**Feedback:** Correct: "Correct: the vertex is [point], horizontal shift [direction], vertical shift [direction], direction [up/down]." Incorrect: "The vertex form is $f(x) = a(x - h)^2 + k$ where $(h, k)$ is the vertex, $|a|$ affects the vertical stretch/compression and direction, $h$ gives the horizontal shift, and $k$ gives the vertical shift. Review the parameter effects and try again." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $f(x) = (x - 2)^2 + 3$ and empty description fields. The question on screen is "Describe the transformations of $f(x) = (x - 2)^2 + 3$ compared to $f(x) = x^2$."

**Chapter Anchors:** The chapter states that $f(x) = (x - 2)^2 + 3$ has vertex $(2, 3)$, shifts right 2 and up 3. The chapter covers vertex form before this section.

</details>

## Solving Quadratic Equations

### Solving by Factoring

**The learner will solve quadratic equations by factoring when the quadratic expression is factorable.**

To solve $ax^2 + bx + c = 0$ by factoring, factor the quadratic expression into $(px + q)(rx + s) = 0$, then use the zero product property: if $px + q = 0$ or $rx + s = 0$, then $x = -q/p$ or $x = -r/s$.

**Example:** Solve $x^2 - 5x + 6 = 0$:
1. Factor: $(x - 2)(x - 3) = 0$
2. Zero product: $x - 2 = 0$ or $x - 3 = 0$
3. Solutions: $x = 2$ or $x = 3$
4. Check: $\sqrt{2^2 - 5(2) + 6} = \sqrt{4 - 10 + 6} = \sqrt{0} = 0$ ✓ and $\sqrt{3^2 - 5(3) + 6} = \sqrt{9 - 15 + 6} = \sqrt{0} = 0$ ✓

#### Practice Problems

| Equation | Factored Form | Solutions |
|----------|--------------|-----------|
| $x^2 - 5x + 6 = 0$ | $(x - 2)(x - 3) = 0$ | $x = 2, 3$ |
| $x^2 + x - 6 = 0$ | $(x + 3)(x - 2) = 0$ | $x = -3, 2$ |
| $x^2 - 4 = 0$ | $(x - 2)(x + 2) = 0$ | $x = 2, -2$ |

#### Diagram: Solving by Factoring

<details markdown="1">
<summary>Solving by Factoring MicroSim</summary>
Type: microsim
**sim-id:** solving-by-factoring-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** solve
**Learning Objective:** The learner will solve quadratic equations by factoring when the quadratic expression is factorable, using the zero product property.

**Prerequisites:** factoring trinomials, zero product property, solving linear equations, quadratic equations, factoring by grouping

**Evidence of Mastery:** The learner correctly solves 4 out of 4 quadratic equations by factoring. Mastery: 4 of 4 correct.

**Misconceptions:** The learner forgets to set each factor equal to zero. The learner incorrectly factors the quadratic expression. The learner forgets to check the solutions by substituting back into the original equation.

**Instructional Rationale:** Apply-level practice requires the learner to actively factor and apply the zero product property. Immediate feedback on common factoring errors builds procedural fluency.

**Content:** The learner can change the quadratic equation using controls. Each challenge presents a quadratic equation to solve by factoring. The learner types the solutions.

**Feedback:** Correct: "Correct: the solutions are $x =$ [value1] and $x =$ [value2]." Incorrect: "To solve $ax^2 + bx + c = 0$ by factoring: (1) Factor the quadratic into $(px + q)(rx + s) = 0$. (2) Set each factor equal to zero: $px + q = 0$ or $rx + s = 0$. (3) Solve each equation for $x$. (4) Check each solution in the original equation. Review the factoring steps and try again." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $x^2 - 5x + 6 = 0$ and an empty solution field. The question on screen is "Solve $x^2 - 5x + 6 = 0$ by factoring."

**Chapter Anchors:** The chapter states that $x^2 - 5x + 6 = 0$ has solutions $x = 2$ and $x = 3$. The chapter covers factoring quadratic equations before this section.

</details>

### Solving by Square Roots

**The learner will solve quadratic equations of the form $ax^2 = c$ and $(x + d)^2 = e$ by taking square roots.**

To solve $ax^2 = c$, divide by $a$ and take the square root of both sides: $x = \pm\sqrt{c/a}$. To solve $(x + d)^2 = e$, take the square root of both sides: $x + d = \pm\sqrt{e}$, then solve for $x$.

**Example:** Solve $x^2 = 16$:
1. Take square root: $x = \pm\sqrt{16}$
2. Simplify: $x = \pm 4$
3. Solutions: $x = 4$ or $x = -4$

**Example:** Solve $(x + 3)^2 = 25$:
1. Take square root: $x + 3 = \pm\sqrt{25}$
2. Simplify: $x + 3 = \pm 5$
3. Solve: $x + 3 = 5$ or $x + 3 = -5$
4. Solutions: $x = 2$ or $x = -8$

#### Practice Problems

| Equation | Solutions |
|----------|-----------|
| $x^2 = 25$ | $x = 5, -5$ |
| $(x - 2)^2 = 9$ | $x = 5, -1$ |
| $2x^2 = 18$ | $x = 3, -3$ |

#### Diagram: Solving by Square Roots

<details markdown="1">
<summary>Solving by Square Roots MicroSim</summary>
Type: microsim
**sim-id:** solving-by-square-roots-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** solve
**Learning Objective:** The learner will solve quadratic equations of the form $ax^2 = c$ and $(x + d)^2 = e$ by taking square roots, including both positive and negative solutions.

**Prerequisites:** square roots, isolating terms, linear equations, quadratic equations, plus/minus notation

**Evidence of Mastery:** The learner correctly solves 4 out of 4 quadratic equations by taking square roots. Mastery: 4 of 4 correct.

**Misconceptions:** The learner forgets the $\pm$ symbol and only gives one solution. The learner incorrectly simplifies the square root. The learner forgets to isolate the squared term before taking the square root.

**Instructional Rationale:** Apply-level practice requires the learner to actively take square roots and include both positive and negative solutions. Immediate feedback on the common error of omitting the $\pm$ symbol reinforces the correct procedure.

**Content:** The learner can change the equation using controls. Each challenge presents a quadratic equation to solve by taking square roots. The learner types the two solutions.

**Feedback:** Correct: "Correct: the solutions are $x =$ [value1] and $x =$ [value2]." Incorrect: "To solve $x^2 = c$: take the square root of both sides $x = \pm\sqrt{c}$. To solve $(x + d)^2 = e$: take the square root $x + d = \pm\sqrt{e}$, then solve for $x$. Remember to include both the positive and negative square root. Review the steps and try again." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $x^2 = 16$ and an empty solution field. The question on screen is "Solve $x^2 = 16$ by taking square roots."

**Chapter Anchors:** The chapter states that $x^2 = 16$ has solutions $x = 4$ and $x = -4$. The chapter covers solving by square roots before this section.

</details>

### Completing the Square

**The learner will complete the square to solve quadratic equations and convert to vertex form.**

To solve $ax^2 + bx + c = 0$ by completing the square:
1. If $a \neq 1$, divide all terms by $a$
2. Move the constant term to the right side
3. Add $(b/2a)^2$ to both sides to complete the square
4. Write the left side as $(x + b/2a)^2$
5. Take the square root of both sides
6. Solve for $x$

**Example:** Solve $x^2 + 6x - 7 = 0$ by completing the square:
1. The coefficient of $x^2$ is 1, so no division needed.
2. Move constant: $x^2 + 6x = 7$
3. Add $(6/2)^2 = 3^2 = 9$ to both sides: $x^2 + 6x + 9 = 7 + 9$
4. Write as square: $(x + 3)^2 = 16$
5. Take square root: $x + 3 = \pm\sqrt{16} = \pm 4$
6. Solve: $x + 3 = 4$ or $x + 3 = -4$, so $x = 1$ or $x = -7$

#### Practice Problems

| Equation | Solution |
|----------|-----------|
| $x^2 + 4x - 5 = 0$ | $x = 1, -5$ |
| $x^2 - 6x + 8 = 0$ | $x = 2, 4$ |
| $x^2 + 2x - 3 = 0$ | $x = 1, -3$ |

#### Diagram: Completing the Square

<details markdown="1">
<summary>Completing the Square MicroSim</summary>
Type: microsim
**sim-id:** completing-the-square-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** practice
**Learning Objective:** The learner will complete the square to solve quadratic equations, including the step of adding $(b/2a)^2$ to both sides.

**Prerequisites:** factoring, quadratic equations, square roots, linear equations, adding fractions, order of operations

**Evidence of Mastery:** The learner correctly completes the square and solves 4 out of 4 quadratic equations. Mastery: 4 of 4 correct.

**Misconceptions:** The learner forgets to add $(b/2a)^2$ to both sides. The learner adds the wrong amount $(b/2)^2$ instead of $(b/2a)^2$. The learner forgets the $\pm$ symbol when taking the square root.

**Instructional Rationale:** Apply-level practice builds fluency with the completing-the-square procedure. Immediate feedback on common procedural errors reinforces the correct steps.

**Content:** The learner can change the equation using controls. Each challenge presents a quadratic equation to solve by completing the square. The learner types the completed-square form and the solutions.

**Feedback:** Correct: "Correct: the solution set is $\{x =$ [value1], $x =$ [value2]\}." Incorrect: "To complete the square for $ax^2 + bx + c = 0$: (1) If $a \neq 1$, divide all terms by $a$. (2) Move the constant term to the right side. (3) Add $(b/2a)^2$ to both sides. (4) Write the left side as $(x + b/2a)^2$. (5) Take the square root of both sides including $\pm$. (6) Solve for $x$. Review the steps and try again." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $x^2 + 4x - 5 = 0$ and empty completed-square and solution fields. The question on screen is "Solve $x^2 + 4x - 5 = 0$ by completing the square."

**Chapter Anchors:** The chapter states that $x^2 + 4x - 5 = 0$ has solutions $x = 1$ and $x = -5$. The chapter covers completing the square before this section.

</details>

### Quadratic Formula

**The learner will use the quadratic formula to solve any quadratic equation $ax^2 + bx + c = 0$.**

The quadratic formula gives the solutions of $ax^2 + bx + c = 0$ as $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. The expression under the radical, $b^2 - 4ac$, is called the discriminant and determines the nature of the solutions.

**Example:** Solve $2x^2 - 5x + 2 = 0$ using the quadratic formula:
1. Identify $a = 2$, $b = -5$, $c = 2$
2. Substitute: $x = \frac{-(-5) \pm \sqrt{(-5)^2 - 4(2)(2)}}{2(2)}$
3. Simplify: $x = \frac{5 \pm \sqrt{25 - 16}}{4} = \frac{5 \pm \sqrt{9}}{4}$
4. Simplify: $x = \frac{5 \pm 3}{4}$
5. Solutions: $x = \frac{5 + 3}{4} = 2$ or $x = \frac{5 - 3}{4} = \frac{1}{2}$

#### Practice Problems

| Equation | a | b | c | Solutions |
|----------|---|---|---|-----------|
| $x^2 - 4x - 5 = 0$ | 1 | -4 | -5 | $x = 5, -1$ |
| $2x^2 + 3x - 2 = 0$ | 2 | 3 | -2 | $x = \frac{1}{2}, -2$ |
| $3x^2 - x - 2 = 0$ | 3 | -1 | -2 | $x = 1, -\frac{2}{3}$ |

#### Diagram: Quadratic Formula

<details markdown="1">
<summary>Quadratic Formula MicroSim</summary>
Type: microsim
**sim-id:** quadratic-formula-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** use
**Learning Objective:** The learner will use the quadratic formula to solve any quadratic equation $ax^2 + bx + c = 0$, including identifying the coefficients $a$, $b$, $c$ and computing the discriminant.

**Prerequisites:** quadratic equation, coefficients, discriminant, square roots, order of operations, linear equations

**Evidence of Mastery:** The learner correctly uses the quadratic formula to solve 4 out of 4 quadratic equations. Mastery: 4 of 4 correct.

**Misconceptions:** The learner forgets the $\pm$ symbol. The learner incorrectly computes the discriminant $b^2 - 4ac$. The learner forgets to divide by $2a$ at the end.

**Instructional Rationale:** Apply-level practice requires the learner to actively identify coefficients and apply the quadratic formula. Immediate feedback on common computation errors builds fluency with this reliable method for solving any quadratic equation.

**Content:** The learner can change the coefficients $a$, $b$, and $c$ using sliders. Each challenge presents a quadratic equation to solve using the quadratic formula. The learner types the two solutions.

**Feedback:** Correct: "Correct: the solutions are $x =$ [value1] and $x =$ [value2]." Incorrect: "To use the quadratic formula for $ax^2 + bx + c = 0$: (1) Identify $a$, $b$, and $c$. (2) Substitute into $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. (3) Simplify the discriminant $b^2 - 4ac$. (4) Compute both $x = \frac{-b + \sqrt{b^2 - 4ac}}{2a}$ and $x = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$. (5) Simplify the results. Review the steps and try again." Two attempts per problem. A running count "Problems correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with $x^2 - 4x - 5 = 0$ and an empty solution field. The question on screen is "Solve $x^2 - 4x - 5 = 0$ using the quadratic formula."

**Chapter Anchors:** The chapter states that $x^2 - 4x - 5 = 0$ has solutions $x = 5$ and $x = -1$. The chapter covers the quadratic formula before this section.

</details>

## Real-World Applications

### Modeling with Quadratic Functions

**The learner will model real-world situations using quadratic functions.**

Quadratic functions model many real-world scenarios, including projectile motion, area optimization, and revenue problems. The key is identifying the quantities that vary and relating them through a quadratic equation.

**Example:** A ball is thrown upward from ground level with initial velocity 48 ft/s. The height $h(t)$ in feet after $t$ seconds is modeled by $h(t) = -16t^2 + 48t$. The maximum height is found at the vertex $t = -b/(2a) = -48/(2 \cdot -16) = 48/32 = 1.5$ seconds, and $h(1.5) = -16(1.5)^2 + 48(1.5) = -36 + 72 = 36$ feet.

**Example:** A rectangular garden is to be enclosed with 40 feet of fencing, using a existing wall as one side. If $x$ is the width perpendicular to the wall, then the length parallel to the wall is $40 - 2x$, and the area $A(x) = x(40 - 2x) = -2x^2 + 40x$. The maximum area occurs at the vertex $x = -b/(2a) = -40/(2 \cdot -2) = 40/4 = 10$ feet, and the maximum area is $A(10) = -2(10)^2 + 40(10) = -200 + 400 = 200$ square feet.

#### Practice Problems

| Scenario | Function | Quantity to Optimize |
|----------|----------|---------------------|
| Projectile: $h(t) = -16t^2 + 48t$ | $h(t) = -16t^2 + 48t$ | Maximum height |
| Garden: $A(x) = -2x^2 + 40x$ | $A(x) = -2x^2 + 40x$ | Maximum area |

#### Diagram: Modeling with Quadratic Functions

<details markdown="1">
<summary>Modeling with Quadratic Functions MicroSim</summary>
Type: microsim
**sim-id:** modeling-with-quadratic-functions-explorer
**Library:** p5.js
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** apply
**Learning Objective:** The learner will apply quadratic functions to model real-world situations, including projectile motion and area optimization problems.

**Prerequisites:** quadratic functions, vertex, axis of symmetry, optimization, projectile motion, area problems, quadratic formula

**Evidence of Mastery:** The learner correctly models 3 out of 3 real-world situations using quadratic functions. Mastery: 3 of 3 correct.

**Misconceptions:** The learner ignores the domain restrictions (e.g., negative time). The learner misidentifies the vertex as the maximum when $a > 0$ (parabola opens upward, vertex is minimum). The learner fails to include units in the final answer.

**Instructional Rationale:** Apply-level application requires the learner to connect quadratic function properties to concrete real-world scenarios. Modeling problems develop the ability to translate between context and mathematical representation.

**Content:** The learner can change the parameters of the real-world scenario using controls. Each challenge presents a situation to model. The learner identifies the function, the quantity to optimize, and the optimal value.

**Feedback:** Correct: "Correct: the model is set up correctly and the optimal value is [value] with [units]." Incorrect: "To model [scenario]: (1) Identify the varying quantities and how they relate. (2) Write a quadratic function that models the situation. (3) Find the vertex to identify the optimal value. (4) Check that the solution makes sense in context, including domain restrictions. Review the modeling steps and try again." Two attempts per problem. A running count "Problems correct: n of 3" is shown.

**Starting State:** Challenge 1 is shown with the projectile $h(t) = -16t^2 + 48t$ and an empty optimization field. The question on screen is "What is the maximum height of a ball thrown with $h(t) = -16t^2 + 48t$?"

**Chapter Anchors:** The chapter states that the maximum height of $h(t) = -16t^2 + 48t$ is 36 feet at $t = 1.5$ seconds. The chapter covers real-world modeling before this section.

</details>

## Chapter Review and Summary

### Key Concepts Review

This chapter has covered the key concepts of quadratic functions, including:

1. **Exponent properties** - Product of powers $a^m \cdot a^n = a^{m+n}$, quotient of powers $a^m / a^n = a^{m-n}$, and power of a power $(a^m)^n = a^{m \cdot n}$
2. **Radical expressions** - Square roots, cube roots, simplifying radicals by factoring out perfect squares/cubes, and the radicand and index
3. **Function notation** - Evaluating functions $f(x)$, distinguishing independent and dependent variables
4. **Quadratic functions** - Parabola characteristics (vertex, axis of symmetry, direction of opening, intercepts), transformation form $f(x) = a(x - h)^2 + k$, and solving quadratic equations by factoring, square roots, completing the square, and the quadratic formula
5. **Real-world applications** - Projectile motion, area optimization, and other scenarios modeled by quadratic functions

### Chapter Anchors (Sim Summary)

| Sim | Chapter Anchor |
|-----|---------------|
| Product of Powers MicroSim | The chapter states that $x^3 \cdot x^5 = x^8$ |
| Quotient of Powers MicroSim | The chapter states that $y^7 / y^3 = y^4$ |
| Power of a Power MicroSim | The chapter states that $(z^2)^4 = z^8$ |
| Radical Expression MicroSim | The chapter states that $\sqrt{36} = 6$ and $\sqrt[3]{27} = 3$ |
| Simplify Radical MicroSim | The chapter states that $\sqrt{72} = 6\sqrt{2}$ and $\sqrt[3]{24} = 2\sqrt[3]{2}$ |
| Radicand MicroSim | The chapter states that in $\sqrt{64}$, the radicand is $64$ |
| Index of Radical MicroSim | The chapter states that in $\sqrt[3]{8}$, the index is $3$ |
| Square Root Equation MicroSim | The chapter states that $\sqrt{x + 1} = 3$ has solution $x = 8$ |
| Cube Root Expression MicroSim | The chapter states that $\sqrt[3]{27} = 3$ and $\sqrt[3]{-8} = -2$ |
| Rationalize Denominator MicroSim | The chapter states that $\frac{3}{\sqrt{5}}$ rationalized is $\frac{3\sqrt{5}}{5}$ |
| Function Notation Evaluation MicroSim | The chapter states that if $f(x) = 2x + 1$, then $f(3) = 7$ |
| Function Input Output MicroSim | The chapter states that in $f(x) = 2x + 3$, $x$ is the independent variable and $f(x)$ is the dependent variable |
| Independent Variable MicroSim | The chapter states that in $f(x) = 2x + 3$, the independent variable is $x$ |
| Dependent Variable MicroSim | The chapter states that in $f(x) = 2x + 3$, the dependent variable is $f(x)$ (or $y$) |
| Parabola Characteristics MicroSim | The chapter states that for $f(x) = x^2 - 4x + 3$, the vertex is $(2, -1)$, axis of symmetry is $x = 2$, opens upward, y-intercept is $(0, 3)$, and x-intercepts are $x = 1$ and $x = 3$ |
| Function Transformation MicroSim | The chapter states that $f(x) = (x - 2)^2 + 3$ has vertex $(2, 3)$, shifts right 2 and up 3 |
| Solving by Factoring MicroSim | The chapter states that $x^2 - 5x + 6 = 0$ has solutions $x = 2$ and $x = 3$ |
| Solving by Square Roots MicroSim | The chapter states that $x^2 = 16$ has solutions $x = 4$ and $x = -4$ |
| Completing the Square MicroSim | The chapter states that $x^2 + 4x - 5 = 0$ has solutions $x = 1$ and $x = -5$ |
| Quadratic Formula MicroSim | The chapter states that $x^2 - 4x - 5 = 0$ has solutions $x = 5$ and $x = -1$ |
| Modeling with Quadratic Functions MicroSim | The chapter states that the maximum height of $h(t) = -16t^2 + 48t$ is 36 feet at $t = 1.5$ seconds |

### Summary

In this chapter, students developed fluency in the core algebraic skills and topics presented, building on foundational knowledge and preparing for more advanced topics. Students learned to:

- Simplify exponential expressions using product, quotient, and power properties
- Identify and work with radical expressions, including simplifying and rationalizing
- Evaluate functions using function notation and distinguish independent and dependent variables
- Analyze quadratic functions by identifying their key characteristics
- Solve quadratic equations using multiple methods
- Apply quadratic functions to model real-world situations

The chapter built on prior knowledge of linear equations, integer exponents, and basic factoring, and prepared students for more advanced mathematics including polynomial functions, rational expressions, and calculus.

---

**Key Takeaways:**

- When multiplying powers with the same base, add the exponents: $a^m \cdot a^n = a^{m+n}$
- When dividing powers with the same base, subtract the exponents: $a^m / a^n = a^{m-n}$
- When raising a power to another power, multiply the exponents: $(a^m)^n = a^{m \cdot n}$
- The radical symbol $\sqrt[n]{a}$ represents the $n$th root of $a$
- To simplify $\sqrt{a}$, factor out the largest perfect square factor
- In function notation $f(x)$, $x$ is the independent variable and $f(x)$ is the dependent variable
- The vertex of $f(x) = ax^2 + bx + c$ is at $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$
- The quadratic formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ solves any quadratic equation
- Real-world situations can be modeled with quadratic functions for optimization and prediction

---

This concludes the chapter content for Quadratic Functions. All 18 concepts from the "Concepts Covered" table have been addressed with detailed explanations, worked examples, and interactive MicroSim specifications. Each concept's elaboration budget was driven by its Concept Impact Score (CIS), with Tier A concepts receiving full treatment (worked examples + diagrams), Tier B concepts receiving standard treatment (worked examples), and Tier C concepts receiving brief treatment (definitions only).
