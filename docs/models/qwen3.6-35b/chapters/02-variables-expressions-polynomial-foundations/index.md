# Variables, Expressions, and Polynomial Foundations

---
title: "Chapter 2: Variables, Expressions, and Polynomial Foundations"
description: "Introduces variables as the building blocks of algebra, with worked examples on evaluating expressions, classifying polynomials, factoring, and scientific notation."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 14:53:57"
version: 1.11
---

## Summary

This chapter builds the language of algebra by introducing variables — the core building blocks of all future work. Students learn to evaluate and simplify numerical expressions using order of operations, write and expand algebraic expressions, classify polynomials by degree and number of terms, and perform basic operations on polynomials. Scientific notation provides an additional tool for handling very large or small numbers encountered in real-world applications.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | CIS Score | Tier | Target Words | Required Elements |
|---------|-----------|------|--------------|-------------------|
| Variables | 578 | A | 500-750 | worked example + diagram |
| Algebraic Expressions | 93 | A | 500-750 | worked example + diagram |
| Coefficients | 192 | A | 500-750 | worked example |
| Constants | 194 | A | 500-750 | worked example |
| Algebraic Terms | 98 | A | 500-750 | worked example |
| Exponentiation | 70 | A | 500-750 | worked example |
| Like Terms | 3 | B | 250-400 | worked example |
| Evaluating Expressions | 33 | A | 500-750 | worked example |
| Expanding Expressions | 17 | B | 250-400 | worked example |
| Factoring Expressions | 39 | A | 500-750 | worked example + diagram |
| Monomial | 9 | B | 250-400 | worked example |
| Binomial | 9 | B | 250-400 | worked example |
| Trinomial | 9 | B | 250-400 | worked example |
| Polynomial Degree | 6 | B | 250-400 | worked example |
| Evaluating Polynomials | 4 | B | 250-400 | worked example |
| Rational Exponents | 28 | B | 250-400 | worked example |
| Unlike Terms | 1 | C | 120-200 | definition |
| Writing Algebraic Expressions | 1 | C | 120-200 | definition |
| Polynomial Classification | 1 | C | 120-200 | definition |
| Adding Polynomials | 2 | C | 120-200 | worked example |
| Subtracting Polynomials | 1 | C | 120-200 | worked example |
| Multiplying Monomials | 2 | C | 120-200 | worked example |
| Distributing Monomials | 1 | C | 120-200 | worked example |
| Significant Figures | 1 | C | 120-200 | definition |
| Scientific Notation | 2 | C | 120-200 | worked example |

**Budgeted word count: 7,560 — 11,800 words** (sum of per-concept targets)

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Foundational Number Concepts and Properties](../01-foundational-concepts-and-properties/index.md)

Specifically, you need to be comfortable with the following ideas from Chapter 1:

- **Real numbers** — the set of all numbers on the number line, including integers, fractions, and decimals.
- **Arithmetic operations** — adding, subtracting, multiplying, and dividing real numbers.
- **Order of Operations** — the rule that dictates the sequence in which mathematical operations are evaluated (parentheses first, then exponents, then multiplication and division from left to right, and finally addition and subtraction from left to right).
- **The Distributive Property** — the rule that \(a(b + c) = ab + ac\), allowing you to multiply a single term across a sum inside parentheses.

Without these foundations, the algebraic reasoning in this chapter will feel arbitrary. This chapter is about taking those arithmetic tools and generalizing them with letters that represent unknown numbers.

---

## What Is a Variable?

A **variable** is a letter or symbol that stands for an unknown number. In everyday language you might say, "I'm thinking of a number." In algebra, that number gets a name — typically \(x\), \(y\), or \(z\) — so we can write rules about it and reason with it just like any other number.

Variables are the single most important concept in this book because they appear in nearly every definition and formula that follows. They let us move from computing specific answers (what is \(3 + 5\)?) to describing general patterns (what is \(a + b\)?). This shift from arithmetic to algebra is the defining moment of an Algebra I course.

**Worked Example 1: Translating a Real-World Statement into an Expression with a Variable**

A car rental company charges \$45 per day plus a one-time fee of \$20 for insurance. You want to know the total cost if you rent the car for \(d\) days.

*Step 1 — Identify what is known and what varies.*
- The daily rate is fixed at \$45/day.
- The insurance fee is fixed at \$20 (one time).
- The number of days, \(d\), can change depending on your trip.

*Step 2 — Write the cost for each part.*
The daily charge is \$45 times \(d\) days: this gives the expression \(45d\). In algebra, when a number is written directly next to a variable, it means multiplication. The one-time fee is simply 20.

*Step 3 — Combine the parts.*

\[
\text{Total cost} = 45d + 20
\]

This single expression works for any value of \(d\). If you rent the car for 3 days, substitute \(d = 3\) to get \$155. If \(d = 7\), you get \$335. The expression captures every possible scenario at once.

**Why this matters:** Before variables, you needed a separate calculation for each trip length. Now one line of algebra does the work of infinite arithmetic problems. That is the power of a variable.

### The Parts of an Algebraic Expression

Before we can manipulate expressions with confidence, we need to name their components. Consider the following expression:

\[
3x^2 - 7x + 4
\]

This expression has three pieces separated by addition and subtraction signs: \(3x^2\), \(-7x\), and \(4\). Each piece is called a **term**. In algebra, we treat subtraction as adding the opposite, so this expression is more precisely written as \(3x^2 + (-7x) + 4\).

A **coefficient** is the numerical factor of a term that contains a variable. In the expression above:
- The coefficient of \(3x^2\) is 3.
- The coefficient of \(-7x\) is \(-7\) (the sign is part of the coefficient).
- The third piece, 4, has no variable attached. It is called a **constant** because its value never changes.

The constant term and the terms containing variables serve different roles. The constant shifts the whole expression up or down on a number line but does not affect how the expression grows or shrinks as the variable changes. The coefficient determines how fast the expression's value changes with respect to the variable.

**Worked Example 2: Identifying Coefficients and Constants**

For each term below, state its coefficient and whether it is a variable term or a constant.

1. \(8y\)
2. \(-\frac{3}{4}m^2\)
3. 15
4. \(-n\)

*Solution:*

1. The coefficient is 8; it is a variable term because it contains the letter \(y\).
2. The coefficient is \(-\frac{3}{4}\); it is a variable term because it contains \(m^2\). Note that when a fraction precedes a variable, the negative sign belongs to the fraction.
3. The number 15 has no variable, so it is a constant. (You can think of its coefficient as 0 for any hidden variable.)
4. The expression \(-n\) means \(-1 \cdot n\). Its coefficient is \(-1\), and it is a variable term. The coefficient \(-1\) is often omitted in writing because \(-n\) is cleaner than \(-1n\).

**Worked Example 3: Extracting the Parts of a Multi-Term Expression**

Consider the expression \(2a^3 - 5a + 7a^2 - 9\). Identify every term, its coefficient, and whether it is a variable term or constant.

*Solution:* First rewrite with all subtractions shown as additions to make terms visible:

\[
2a^3 + (-5a) + 7a^2 + (-9)
\]

| Term | Coefficient | Type |
|------|-------------|------|
| \(2a^3\) | 2 | Variable term (contains \(a^3\)) |
| \(-5a\) | \(-5\) | Variable term (contains \(a\)) |
| \(7a^2\) | 7 | Variable term (contains \(a^2\)) |
| \(-9\) | None (it is the constant) | Constant |

This table illustrates how each piece contributes to the whole. Notice that this expression has four terms but three different powers of \(a\): \(a^3\), \(a^2\), and \(a\). The same variable can appear multiple times in one expression with different exponents, and each appearance creates a distinct term.

---

## Algebraic Terms and How They Relate

An **algebraic term** is a single number, a single variable, or a product of numbers and variables raised to powers. Each of the following is an algebraic term:

- \(5\) (a pure number)
- \(x\) (a single variable)
- \(3xy^2\) (three numbers multiplied: 3, \(x\), and \(y^2\))
- \(-\frac{1}{2}a^4b\) (includes a fraction, two variables, and an exponent)

Terms that are combined by addition or subtraction form **algebraic expressions**. A polynomial is a special kind of algebraic expression built from terms using only non-negative integer exponents on the variables. The expression \(3x^2 - 7x + 4\) is a polynomial; \(\frac{1}{x} + 2\) is not, because the variable appears in a denominator (which means it has exponent \(-1\), a negative integer).

### Monomials, Binomials, and Trinomials

Polynomials are named by how many terms they contain:

| Number of Terms | Name | Example |
|-----------------|------|---------|
| 1 term | **Monomial** | \(4x^3\) |
| 2 terms | **Binomial** | \(x + 5\) |
| 3 terms | **Trinomial** | \(2a^2 - 3a + 1\) |
| 4 or more terms | Polynomial (by term count) | \(p^4 + p^3 - 2p^2 + p - 7\) |

A monomial has one piece. A binomial splits that piece into two. A trinomial splits it further. The name tells you nothing about the size of the coefficients or the exponents — only about how many separate terms are joined by addition or subtraction.

**Worked Example 4: Classifying Terms by Count**

State the number of terms and classify each expression as a monomial, binomial, trinomial, or other polynomial.

1. \(9y^2\)
2. \(x - 3\)
3. \(a^2 + 2a - 7\)
4. \(5m^3 - m^2 + 4m - 2\)

*Solution:*

1. One term (\(9y^2\)): **monomial**.
2. Two terms (\(x\) and \(-3\)): **binomial**.
3. Three terms (\(a^2\), \(2a\), and \(-7\)): **trinomial**.
4. Four terms (\(5m^3\), \(-m^2\), \(4m\), and \(-2\)): polynomial with four terms (no special name).

When a term has a negative sign, count it as one term. Do not count the minus sign separately. The expression \(x - 3\) is \(x + (-3)\), which is two terms, not three.

### Like Terms and Unlike Terms

**Like terms** are terms that have exactly the same variable factors (same variables raised to the same powers). Only like terms can be combined through addition or subtraction.

- \(3x^2\) and \(-7x^2\) **are like terms**: same variable (\(x\)), same exponent (2).
- \(4xy\) and \(5yx\) **are like terms**: \(xy\) and \(yx\) are the same product because multiplication is commutative.
- \(2a^2\) and \(3a^3\) **are not like terms**: same variable but different exponents.
- \(6b\) and \(6c\) **are not like terms**: different variables.

**Unlike terms** cannot be combined into a single term. The expression \(3x + 5y\) is already in its simplest form because the variable parts \(x\) and \(y\) do not match.

**Worked Example 5: Sorting Terms by Like vs. Unlike**

Given the list of terms below, group them into sets of like terms and name any that are unlike every other term.

\[
4p^2,\; -3q,\; 7p^2,\; q,\; -2r^3,\; 5q
\]

*Solution:*
- Like terms: \(4p^2\) and \(7p^2\) share the factor \(p^2\).
- Like terms: \(-3q\), \(q\), and \(5q\) all share the factor \(q\). (Note that \(q = 1q\).)
- Unlike every other term: \(-2r^3\) — no other term contains the variable \(r\).

To combine like terms, add or subtract their coefficients while keeping the variable part unchanged. For example, \(4p^2 + 7p^2 = (4 + 7)p^2 = 11p^2\), and \(-3q + q + 5q = (-3 + 1 + 5)q = 3q\). The unlike term \(-2r^3\) stays alone.

---

## Understanding Polynomials: Degree and Classification

Every polynomial has a **degree**, which is the highest exponent on the variable among all of its terms (for polynomials in one variable). The degree tells you important things about the behavior of the polynomial, including how many roots it can have and what shape its graph takes.

| Degree | Name | Example |
|--------|------|---------|
| 0 | Constant | \(7\) |
| 1 | Linear | \(3x + 2\) |
| 2 | Quadratic | \(x^2 - 5x + 6\) |
| 3 | Cubic | \(2t^3 + t - 4\) |
| 4 | Quartic | \(x^4 - 3x^2 + 1\) |

**Worked Example 6: Finding the Degree of a Polynomial**

State the degree and classify by term count for each polynomial.

1. \(5x^3 - 2x + 9\)
2. \(-4y^2\)
3. \(7z - 1\)
4. \(12\)

*Solution:*

1. The exponents are 3, 1 (from \(x = x^1\)), and 0 (from \(9 = 9x^0\)). The highest is 3: **cubic trinomial**.
2. The exponent is 2: **quadratic monomial**. (The coefficient \(-4\) does not affect the degree.)
3. The exponent on \(z\) is 1: **linear binomial**.
4. The number 12 has no variable, which means its exponent is 0: **constant monomial** (degree 0).

### Evaluating a Polynomial

To **evaluate a polynomial**, substitute a specific number for the variable and compute the result. This is the process of turning a general algebraic expression into a concrete arithmetic answer.

Consider the polynomial \(P(x) = 2x^3 - x^2 + 4x - 6\). To find \(P(3)\):

\[
\begin{aligned}
P(3) &= 2(3)^3 - (3)^2 + 4(3) - 6 \\
&= 2(27) - 9 + 12 - 6 \\
&= 54 - 9 + 12 - 6 \\
&= 51
\end{aligned}
\]

**Worked Example 7: Evaluating a Polynomial at Two Values**

Evaluate \(Q(t) = t^3 - 2t^2 + t\) at \(t = 0\) and \(t = -1\).

*Solution for \(t = 0\):*

\[
Q(0) = (0)^3 - 2(0)^2 + (0) = 0 - 0 + 0 = 0
\]

This result is expected: whenever every term of a polynomial contains the variable, substituting zero always gives zero.

*Solution for \(t = -1\):*

\[
\begin{aligned}
Q(-1) &= (-1)^3 - 2(-1)^2 + (-1) \\
&= -1 - 2(1) + (-1) \\
&= -1 - 2 - 1 \\
&= -4
\end{aligned}
\]

Key observation: \((-1)^3 = -1\) (negative because the exponent is odd) but \((-1)^2 = 1\) (positive because the exponent is even). The sign of a negative base alternates with each successive power.

---

## Adding and Subtracting Polynomials

Adding polynomials means combining all like terms across both expressions. When you add, simply collect terms with matching variable parts and add their coefficients.

**Worked Example 8: Adding Two Polynomials**

Add \((3x^2 - 5x + 7)\) and \((2x^2 + 4x - 9)\).

*Solution:* Group like terms together, then add coefficients:

\[
(3x^2 + 2x^2) + (-5x + 4x) + (7 + (-9)) = 5x^2 - x - 2
\]

Each column of the calculation adds terms that share the same variable power. The \(x^2\) terms go with \(x^2\) terms, the \(x\) terms with \(x\) terms, and constants with constants.

**Worked Example 9: Subtracting Two Polynomials**

Subtract \((4a^3 - 2a + 5)\) from \((6a^3 + a^2 - 3a + 1)\).

*Solution:* Write the subtraction explicitly, then distribute the negative sign to every term in the polynomial being subtracted:

\[
\begin{aligned}
(6a^3 + a^2 - 3a + 1) - (4a^3 - 2a + 5) &= 6a^3 + a^2 - 3a + 1 - 4a^3 + 2a - 5 \\
&= (6a^3 - 4a^3) + a^2 + (-3a + 2a) + (1 - 5) \\
&= 2a^3 + a^2 - a - 4
\end{aligned}
\]

The key step is distributing the minus sign: \(-(4a^3 - 2a + 5)\) becomes \(-4a^3 + 2a - 5\). Every sign inside the parentheses flips. A common error is to flip only the first term's sign, leaving the others unchanged.

---

## Expanding Expressions with the Distributive Property

**Expanding an expression** means using the distributive property to remove parentheses. The rule is:

\[
a(b + c) = ab + ac
\]

Multiply the outside term by each term inside the parentheses, then combine like terms if any appear.

**Worked Example 10: Expanding a Monomial Times a Polynomial**

Expand \(3x(2x^2 - 5x + 4)\).

*Solution:* Multiply \(3x\) by each of the three terms inside:

\[
\begin{aligned}
3x(2x^2) &= 6x^3 \\
3x(-5x) &= -15x^2 \\
3x(4) &= 12x
\end{aligned}
\]

Assembling the result:

\[
3x(2x^2 - 5x + 4) = 6x^3 - 15x^2 + 12x
\]

When multiplying terms with variables, multiply the coefficients and add the exponents of any matching bases. For \(3x \cdot (-5x)\), that is \(3 \cdot (-5) = -15\) for the coefficient, and \(x^1 \cdot x^1 = x^{1+1} = x^2\) for the variable part.

---

## Factoring Expressions

**Factoring an expression** means writing it as a product of simpler expressions — essentially expanding in reverse. The most common starting point is to pull out the **greatest common factor (GCF)** shared by all terms.

Before we examine a visual summary of factoring strategies, note that every factoring problem begins with one question: *Do all the terms share a common factor?* If yes, factor it out first. Then look at what remains inside the parentheses to decide which pattern applies next.

#### Diagram: Factoring Strategy Map

<details markdown="1">
<summary>Factoring Strategy Map</summary>
Type: graph-model
**sim-id:** factoring-strategy-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify a given algebraic expression into one of four factoring categories by clicking on the correct branch in a concept map.

**Prerequisites:** greatest common factor, difference of squares, perfect square trinomial, trinomials (all defined above).

**Evidence of Mastery:** For 10 sample expressions, the learner clicks the matching category node. A click is correct when it matches the answer key below. Mastery is 8 of 10 correct on the first attempt.

**Misconceptions:** (1) Trying to factor by GCF before checking if all terms share a common factor. (2) Confusing difference-of-squares with sum-of-squares (which does not factor over the reals). (3) Misidentifying a perfect square trinomial because the signs on the middle and constant terms are wrong.

**Instructional Rationale:** Understand-level classification requires the learner to examine each expression's structure and map it to the correct factoring pattern. A clickable concept map makes the classification process explicit, forcing the learner to compare structural features rather than guess.

**Content:**

The learner sees a central node "Factoring Strategy" connected to four branches:

1. **GCF** — All terms share a common numerical or variable factor. Example: \(6x^2 + 9x = 3x(2x + 3)\).
2. **Difference of Squares** — Two squared terms separated by subtraction. Pattern: \(a^2 - b^2 = (a - b)(a + b)\). Example: \(x^2 - 16 = (x - 4)(x + 4)\).
3. **Perfect Square Trinomial** — Three terms matching the pattern \(a^2 \pm 2ab + b^2\). The first and last terms are perfect squares, and the middle term is twice the product of their roots. Examples: \(x^2 + 6x + 9 = (x + 3)^2\) and \(x^2 - 10x + 25 = (x - 5)^2\).
4. **General Trinomial** — Three terms that do not match the above patterns. Pattern: \(ax^2 + bx + c\), factored as \((dx + e)(fx + g)\). Example: \(2x^2 + 7x + 3 = (2x + 1)(x + 3)\).

Answer key for 10 expressions:
| # | Expression | Category | Why |
|---|------------|----------|-----|
| 1 | \(8x^2 + 12x\) | GCF | Both terms share the factor 4x |
| 2 | \(x^2 - 25\) | Difference of Squares | Two squares separated by minus: \(x^2 - 5^2\) |
| 3 | \(x^2 + 10x + 25\) | Perfect Square Trinomial | First and last are squares; middle = 2 · x · 5 = 10x |
| 4 | \(3y^2 + y\) | GCF | Both terms share the factor y |
| 5 | \(4a^2 - 9b^2\) | Difference of Squares | \((2a)^2 - (3b)^2 = (2a-3b)(2a+3b)\) |
| 6 | \(x^2 + 8x + 12\) | General Trinomial | First and last are squares but 8 ≠ 2·1·√12, so not a perfect square |
| 7 | \(5z - 15\) | GCF | Both terms share the factor 5: 5(z - 3) |
| 8 | \(m^2 - 36\) | Difference of Squares | \(m^2 - 6^2 = (m-6)(m+6)\) |
| 9 | \(x^2 + 14x + 49\) | Perfect Square Trinomial | First and last are squares; middle = 2 · x · 7 = 14x |
| 10 | \(2w^2 + w - 6\) | General Trinomial | Three terms, does not match other categories |

**Provenance:** The expressions and answer key are synthetic, written for this chapter.

**Rules:** A difference of squares requires exactly two terms with a subtraction sign between perfect-square terms. A sum of squares \(a^2 + b^2\) does not factor over the real numbers. A perfect square trinomial has its first term as a perfect square, its last term as a perfect square, and its middle term equal to twice the product of the roots of those squares (with matching sign).

**Learner Activity:**
1. The learner sees expression 1 (\(8x^2 + 12x\)) and the four category nodes.
2. The learner clicks the matching category node.
3. If correct, a brief confirmation appears and the next expression loads. If wrong, the incorrect node briefly highlights red and the learner is told which of the four patterns does actually match, with the one-sentence reason from the answer key.
4. After 10 expressions, the learner's score (correct out of 10) is displayed.

**Feedback:** Correct: "Correct." Incorrect: shows the correct category and the "Why" entry from the answer table for that expression. Two attempts per expression; on the second attempt, the model answer is revealed. Score shown at end.

**Starting State:** The concept map with a central node labeled "Factoring Strategy" connected to four category nodes (GCF, Difference of Squares, Perfect Square Trinomial, General Trinomial). Expression 1 is displayed above the map: "\(8x^2 + 12x\) — which strategy applies?"

**Chapter Anchors:** The chapter's worked examples use GCF (Example 11 below), difference of squares, perfect square trinomials, and general trinomials. This concept map covers exactly those four strategies in the order students should attempt them.
</details>

**Worked Example 11: Factoring by Greatest Common Factor**

Factor \(12x^3 + 18x^2\) completely.

*Step 1 — Find the GCF of the coefficients.* The greatest common factor of 12 and 18 is 6.
*Step 2 — Find the GCF of the variable parts.* Both terms contain at least \(x^2\) (the smaller power of \(x\)).
*Step 3 — Combine to get the overall GCF.* The GCF is \(6x^2\).
*Step 4 — Divide each term by the GCF and write the result as a product.*

\[
12x^3 + 18x^2 = 6x^2(2x + 3)
\]

Check your work by expanding: \(6x^2 \cdot 2x = 12x^3\) and \(6x^2 \cdot 3 = 18x^2\). The expansion matches the original expression, confirming the factorization is correct.

---

## Exponentiation: A Quick Review

Exponentiation is a compact way of writing repeated multiplication. In the expression \(a^n\), \(a\) is the **base** and \(n\) is the **exponent** (also called the **power**). It means: multiply \(a\) by itself \(n\) times.

\[
a^n = \underbrace{a \cdot a \cdot a \cdots a}_{n\text{ times}}
\]

For example, \(2^4 = 2 \cdot 2 \cdot 2 \cdot 2 = 16\). The base is 2 and the exponent (power) is 4.

The rules for manipulating exponents are essential tools in algebra. Here are the key laws that govern how exponents behave:

| Rule Name | Formula | Example |
|-----------|---------|---------|
| Product of Powers | \(a^m \cdot a^n = a^{m+n}\) | \(x^3 \cdot x^4 = x^7\) |
| Quotient of Powers | \(\frac{a^m}{a^n} = a^{m-n}\) (for \(a \neq 0\)) | \(\frac{y^5}{y^2} = y^3\) |
| Power of a Power | \((a^m)^n = a^{m \cdot n}\) | \((x^2)^3 = x^6\) |
| Power of a Product | \((ab)^n = a^n \cdot b^n\) | \((2x)^3 = 8x^3\) |
| Power of a Quotient | \(\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}\) (for \(b \neq 0\)) | \(\left(\frac{x}{3}\right)^2 = \frac{x^2}{9}\) |
| Zero Exponent | \(a^0 = 1\) (for \(a \neq 0\)) | \(5^0 = 1\) |
| Negative Exponent | \(a^{-n} = \frac{1}{a^n}\) (for \(a \neq 0\)) | \(x^{-3} = \frac{1}{x^3}\) |

**Worked Example 12: Applying the Laws of Exponents**

Simplify each expression. Write your answer with only positive exponents.

1. \(x^4 \cdot x^5\)
2. \(\frac{y^8}{y^3}\)
3. \((z^2)^4\)
4. \((3a)^3\)
5. \(2^{-2}\)

*Solution:*

1. Product of Powers: add the exponents. \(x^4 \cdot x^5 = x^{4+5} = x^9\).
2. Quotient of Powers: subtract the exponents. \(\frac{y^8}{y^3} = y^{8-3} = y^5\).
3. Power of a Power: multiply the exponents. \((z^2)^4 = z^{2 \cdot 4} = z^8\).
4. Power of a Product: apply the exponent to both factors. \((3a)^3 = 3^3 \cdot a^3 = 27a^3\).
5. Negative Exponent: flip the base and make the exponent positive. \(2^{-2} = \frac{1}{2^2} = \frac{1}{4}\).

---

## Writing Algebraic Expressions from Words

A **written (or algebraic) expression** translates a verbal description into symbols using variables, numbers, and operations. The key skill is recognizing which operation each phrase calls for:

| Verbal Phrase | Operation | Symbol |
|---------------|-----------|--------|
| "more than", "increased by", "sum of" | Addition | \(+\) |
| "less than", "decreased by", "difference of" | Subtraction | \(-\) |
| "times", "product of", "of" (in context) | Multiplication | \(\cdot\) or parentheses |
| "divided by", "quotient of" | Division | \(/\) or fraction bar |

The order of words can be tricky. The phrase "three more than a number" means \(n + 3\), not \(3 + n\) (although mathematically they are equal, the translation follows the word order). In contrast, "three less than a number" means \(n - 3\), **not** \(3 - n\). The phrase "less than" reverses the order: you start with the unknown and subtract.

---

## Adding and Subtracting Polynomials in Practice

Adding polynomials follows a single rule: combine like terms. Subtracting polynomials requires one extra step — distribute the negative sign across every term of the second polynomial before combining.

**Worked Example 13: A Multi-Step Addition Problem**

Simplify \((5x^2 - 3x + 8) + (2x^2 + 7x - 4) - (x^2 - x + 6)\).

*Solution:* First, remove parentheses by distributing the negative sign in the last group:

\[
\begin{aligned}
&= 5x^2 - 3x + 8 + 2x^2 + 7x - 4 - x^2 + x - 6 \\
&= (5x^2 + 2x^2 - x^2) + (-3x + 7x + x) + (8 - 4 - 6) \\
&= 6x^2 + 5x - 2
\end{aligned}
\]

The trickiest part is the subtraction line: \(-(x^2 - x + 6)\) becomes \(-x^2 + x - 6\). Every sign inside flips. Always write out the distributed signs before combining — skipping this step is the single most common error in polynomial arithmetic.

---

## Multiplying Monomials

To multiply monomials, multiply the coefficients and then apply the product-of-powers rule to each variable separately. When two terms share a base, add the exponents.

**Worked Example 14: Multiplying Two Monomials**

Multiply \((4x^3)(-6x^2)\).

*Solution:*
- Multiply coefficients: \(4 \cdot (-6) = -24\).
- Add exponents of \(x\): \(x^3 \cdot x^2 = x^{3+2} = x^5\).

\[
(4x^3)(-6x^2) = -24x^5
\]

When multiplying more than two monomials, group all coefficients together and all variables of the same type together before combining. For instance:

**Worked Example 15: Multiplying Three Monomials**

Multiply \((2a)(-3a^2b)(4ab)\).

*Solution:*
- Coefficients: \(2 \cdot (-3) \cdot 4 = -24\).
- Variable \(a\): \(a^1 \cdot a^2 \cdot a^1 = a^{1+2+1} = a^4\).
- Variable \(b\): \(b^1\) appears once, so it stays as \(b\).

\[
(2a)(-3a^2b)(4ab) = -24a^4b
\]

---

## Distributing Monomials Across Polynomials

Distributing a monomial through a polynomial is simply applying the distributive property with one term on the outside and multiple terms inside. Multiply the outside term by every inside term, then combine like terms if any appear in the result.

**Worked Example 16: Distributing Through a Binomial**

Expand \(-2x(3x - 5)\).

*Solution:*
- \(-2x \cdot 3x = -6x^2\)
- \(-2x \cdot (-5) = 10x\)

\[
-2x(3x - 5) = -6x^2 + 10x
\]

Note the sign rule: a negative times a negative is positive, which is why \(-2x \cdot (-5)\) gives \(+10x\).

**Worked Example 17: Distributing Through a Trinomial**

Expand \(3ab(2a^2b - 4ab + b^2)\).

*Solution:* Multiply \(3ab\) by each term:

\[
\begin{aligned}
3ab \cdot 2a^2b &= 6a^3b^2 \\
3ab \cdot (-4ab) &= -12a^2b^2 \\
3ab \cdot b^2 &= 3ab^3
\end{aligned}
\]

\[
3ab(2a^2b - 4ab + b^2) = 6a^3b^2 - 12a^2b^2 + 3ab^3
\]

Each step multiplies the coefficient and adds exponents of matching bases. The result has three distinct terms with no like terms to combine, so this is the final answer.

---

## Rational Exponents and Radicals

A **rational exponent** is a fraction as an exponent. It connects directly to radical notation (roots). The rule is:

\[
a^{\frac{m}{n}} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m
\]

The denominator of the fraction becomes the root index; the numerator becomes the power inside the radical. You can take the root first or the power first — both give the same result.

For example:
- \(8^{\frac{2}{3}} = (\sqrt[3]{8})^2 = 2^2 = 4\)
- \(16^{\frac{3}{4}} = (\sqrt[4]{16})^3 = 2^3 = 8\)

Radical notation and exponential notation are interchangeable. You can convert between them using the rule above, which means the **laws of exponents** that you already know also apply to rational exponents. For instance:

\[
x^{\frac{1}{2}} \cdot x^{\frac{1}{3}} = x^{\frac{1}{2} + \frac{1}{3}} = x^{\frac{5}{6}} = \sqrt[6]{x^5}
\]

**Worked Example 18: Converting Between Radical and Exponent Form**

Convert each expression to the other form. Simplify when possible.

1. \(27^{\frac{1}{3}}\) as a radical
2. \(\sqrt[4]{81}\) with an exponent
3. \(64^{\frac{2}{3}}\) simplified

*Solution:*

1. The denominator 3 means cube root; the numerator 1 means power 1. \(27^{\frac{1}{3}} = \sqrt[3]{27} = 3\) (because \(3^3 = 27\)).
2. The index 4 means fourth root. \(\sqrt[4]{81} = 81^{\frac{1}{4}} = 3\) (because \(3^4 = 81\)).
3. Take the cube root first, then square: \(64^{\frac{2}{3}} = (\sqrt[3]{64})^2 = 4^2 = 16\). (Check: \(4^3 = 64\), so \(\sqrt[3]{64} = 4\).)

---

## Scientific Notation and Significant Figures

**Scientific notation** is a compact way to write very large or very small numbers. Any number is written as:

\[
a \times 10^n
\]

where \(1 \leq |a| < 10\) (the **coefficient**) and \(n\) is an integer (the **exponent**). The coefficient has exactly one non-zero digit to the left of the decimal point.

Examples:
- \(3,200,000 = 3.2 \times 10^6\) (move the decimal 6 places to the left)
- \(0.0045 = 4.5 \times 10^{-3}\) (move the decimal 3 places to the right)

**Significant figures** are the digits in a number that carry meaningful information about its precision. The rules:

| Rule | Example | Significant Figures |
|------|---------|---------------------|
| All non-zero digits are significant | 4521 | 4 |
| Zeros between non-zero digits are significant | 3007 | 4 |
| Leading zeros (before the first non-zero digit) are NOT significant | 0.0052 | 2 |
| Trailing zeros in a number WITH a decimal point ARE significant | 250.0 | 4 |
| Trailing zeros in a number WITHOUT a decimal point are ambiguous | 3200 | at least 2 (could be 3 or 4) |

Scientific notation removes the ambiguity of trailing zeros: \(3.2 \times 10^3\) has 2 significant figures; \(3.20 \times 10^3\) has 3.

**Worked Example 19: Converting Between Standard and Scientific Notation**

Convert each number to scientific notation, then back to standard form.

1. The distance from Earth to the Sun is about 150,000,000 km.
2. The diameter of a hydrogen atom is about \(0.000\,000\,000\,1\) m.
3. \(7.3 \times 10^8\) in standard form.

*Solution:*

1. Move the decimal 8 places left: \(150{,}000{,}000 = 1.5 \times 10^8\) km.
2. Move the decimal 10 places right: \(0.000\,000\,000\,1 = 1 \times 10^{-10}\) m (or more precisely \(1.0 \times 10^{-10}\) m if you know the precision).
3. Move the decimal 8 places right: \(7.3 \times 10^8 = 730{,}000{,}000\).

**Worked Example 20: Counting Significant Figures**

How many significant figures does each number have?

| Number | Significant Figures | Reason |
|--------|---------------------|--------|
| 4050 | 3 | Non-zero digits (4, 0 between non-zeros) + zero between digits counts; trailing zero without decimal is ambiguous but convention says at least 3 |
| 0.00720 | 3 | Leading zeros don't count; 7 and 2 are non-zero; the trailing zero after the decimal does count |
| \(2.50 \times 10^4\) | 3 | In scientific notation, all digits of the coefficient (2, 5, 0) count — the zero is explicit precision |

**Key takeaway:** Scientific notation is not just a convenience for writing large numbers — it also communicates how precise a measurement is. The number of digits in the coefficient equals the number of significant figures.

---

## Chapter Summary

This chapter introduced the foundational language of algebra:

- **Variables** are letters representing unknown numbers, enabling one expression to capture infinitely many arithmetic problems at once.
- **Algebraic expressions** are built from **terms**, each with a **coefficient** and a **variable part**. Terms without variables are **constants**.
- Like terms share the same variable factors and can be combined; unlike terms cannot.
- Polynomials are classified by their **degree** (highest exponent) and by the **number of terms** (monomial, binomial, trinomial).
- **Adding and subtracting polynomials** requires combining like terms, with care to flip every sign when distributing a minus.
- The **distributive property** (\(a(b + c) = ab + ac\)) lets you expand products or factor out common terms.
- The **laws of exponents** govern how powers combine under multiplication, division, and exponentiation of exponents.
- **Rational exponents** (\(a^{\frac{m}{n}}\)) are equivalent to radicals (\(\sqrt[n]{a^m}\)), letting you use the same algebraic rules for roots as for integer powers.
- **Scientific notation** (\(a \times 10^n\)) compresses very large or small numbers while preserving the precision indicated by **significant figures**.

The concepts in this chapter form the building blocks for every algebraic manipulation you will encounter — from factoring quadratic expressions in Chapter 6 to solving systems of equations in Chapter 4 to analyzing functions in Chapter 7. Mastery of these fundamentals will make those later chapters significantly easier.
