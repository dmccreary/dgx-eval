---
title: "Chapter 3: Factoring Techniques and Polynomial Division"
description: "A comprehensive study of factoring methods — GCF, grouping, special products, trinomial factoring — plus exponent laws, polynomial division, and the connection between roots and factors."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 14:35:00"
version: 1.11
---

# Factoring Techniques and Polynomial Division

## Summary

This chapter covers the full range of factoring methods that allow students to decompose polynomials into their component factors. Beginning with Greatest Common Factor and progressing through grouping, special products (difference of squares and perfect square trinomials), and trinomial factoring, students build a comprehensive factoring strategy. The second half introduces polynomial and synthetic division along with the remainder and factor theorems, connecting algebraic factoring to the study of roots and their multiplicity. Along the way, integer exponents (including negative and zero exponents) and the laws of exponents provide the tools needed to simplify expressions before and after factoring.

## Concepts Covered

This chapter covers the following 27 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Greatest Common Factor | 6 |
| Factoring Strategy | 2 |
| Factoring by GCF | 3 |
| Grouping Method | 3 |
| Difference of Squares | 3 |
| Perfect Square Trinomials | 3 |
| Trinomial Factoring | 4 |
| Prime Polynomials | 1 |
| Polynomial Division | 7 |
| Synthetic Division | 1 |
| Remainder Theorem | 5 |
| Factor Theorem | 4 |
| Roots and Factors | 3 |
| Rational Root Theorem | 1 |
| Multiplicity of Roots | 1 |
| Solving by Factoring | 1 |
| Integer Exponents | 65 |
| Zero Exponent Rule | 1 |
| Negative Exponents | 29 |
| Laws of Exponents | 34 |
| Product of Powers Property | 1 |
| Quotient of Powers Property | 1 |
| Power of a Power Property | 1 |
| Power of a Product Property | 1 |
| Power of a Quotient Property | 1 |
| Radical Notation | 3 |
| Rationalizing Radicals | 1 |

---

## Part A: Exponent Laws and Integer Exponents

Before diving into factoring, it helps to have solid command of the exponent rules that appear throughout simplification. You may recall from earlier work that exponents represent repeated multiplication: \(x^n\) means multiplying the base \(x\) by itself \(n\) times when \(n\) is a positive integer. The remaining exponent laws extend this idea consistently to zero, negative, and compound exponents.

### Laws of Exponents

The **laws of exponents** are five rules that govern how powers combine under multiplication, division, nesting, and scalar multiplication. Each rule preserves the base while transforming the exponent arithmetically. Memorizing the formulas is necessary but not sufficient — you should be able to justify each one by unwinding what an exponent means as repeated multiplication.

| Law | Formula | Condition |
|-----|---------|-----------|
| Product of Powers | \(x^m \cdot x^n = x^{m+n}\) | same base |
| Quotient of Powers | \(\frac{x^m}{x^n} = x^{m-n}\) | \(x \ne 0\) |
| Power of a Power | \((x^m)^n = x^{m \cdot n}\) | any real \(m, n\) |
| Power of a Product | \((xy)^n = x^n \cdot y^n\) | any real \(n\) |
| Power of a Quotient | \(\left(\frac{x}{y}\right)^n = \frac{x^n}{y^n}\) | \(y \ne 0\) |

**Product of Powers Property.** When two powers with the same base are multiplied, add the exponents. For example:
\[x^3 \cdot x^5 = x^{3+5} = x^8\]
This follows directly from counting factors: \(x^3 = xxx\) and \(x^5 = xxxxx\), so their product has eight factors of \(x\).

**Quotient of Powers Property.** When two powers with the same base are divided, subtract the exponent of the denominator from the exponent of the numerator. For example:
\[\frac{x^7}{x^4} = x^{7-4} = x^3\]
This follows from canceling factors: four \(x\)'s in the denominator cancel four \(x\)'s in the numerator, leaving three.

**Power of a Power Property.** When a power is raised to another exponent, multiply the exponents. For example:
\[(x^3)^4 = x^{3 \cdot 4} = x^{12}\]
This follows because \((x^3)^4\) means \(x^3\) multiplied by itself four times, giving a total of \(3+3+3+3 = 12\) factors.

**Power of a Product Property.** When a product is raised to an exponent, each factor is raised to that exponent. For example:
\[(3x)^4 = 3^4 \cdot x^4 = 81x^4\]
This follows from the commutative property of multiplication — you can reorder and regroup factors.

**Power of a Quotient Property.** When a quotient is raised to an exponent, both numerator and denominator are raised to that exponent. For example:
\[\left(\frac{2}{x}\right)^3 = \frac{2^3}{x^3} = \frac{8}{x^3}\]
This follows from applying the power of a product rule to \(2 \cdot x^{-1}\).

**Combining multiple laws.** In practice, you will often need to apply more than one law in sequence. Consider simplifying \(\frac{(2x^3)^4}{4x^5}\):

Step 1: Apply Power of a Product to the numerator — \((2x^3)^4 = 2^4 \cdot (x^3)^4 = 16x^{12}\).
Step 2: Rewrite the expression — \(\frac{16x^{12}}{4x^5}\).
Step 3: Apply Quotient of Powers to coefficients and variables separately — \(\frac{16}{4} = 4\) and \(x^{12-5} = x^7\).

Result: \(4x^7\). When combining laws, apply them in this order: (1) power of a product or quotient first (expand nested powers), (2) product or quotient of powers second (combine like bases), (3) simplify coefficients. This ordering prevents double-counting exponents, which is a common error when students try to combine steps mentally.

Here is a summary table showing each law with a worked example:

| Law | Formula | Worked Example | Result |
|-----|---------|---------------|--------|
| Product of Powers | \(x^m \cdot x^n = x^{m+n}\) | \(x^4 \cdot x^6\) | \(x^{10}\) |
| Quotient of Powers | \(\frac{x^m}{x^n} = x^{m-n}\) | \(\frac{y^9}{y^4}\) | \(y^5\) |
| Power of a Power | \((x^m)^n = x^{mn}\) | \((z^2)^5\) | \(z^{10}\) |
| Power of a Product | \((xy)^n = x^n y^n\) | \((3a)^3\) | \(27a^3\) |
| Power of a Quotient | \(\left(\frac{x}{y}\right)^n = \frac{x^n}{y^n}\) | \(\left(\frac{b}{4}\right)^2\) | \(\frac{b^2}{16}\) |

### Integer Exponents

**Integer exponents** extend the concept of exponentiation beyond positive integers to include zero and negative whole numbers. This extension is not arbitrary — it is defined by requiring the five laws above to remain valid for all integer exponents simultaneously. The rules below are the direct consequences of that requirement.

Before examining how zero and negative exponents work, let's define two terms: a **positive exponent** means repeated multiplication of the base (\(x^n\) for \(n > 0\)), and a **negative exponent** represents the reciprocal of the same positive power. The key insight is that both must satisfy the quotient-of-powers law consistently.

Consider \(\frac{x^3}{x^5}\) using the quotient rule:
\[\frac{x^3}{x^5} = x^{3-5} = x^{-2}\]
But expanding and canceling by hand gives:
\[\frac{x \cdot x \cdot x}{x \cdot x \cdot x \cdot x \cdot x} = \frac{1}{x^2}\]
Since both approaches must agree, we define \(x^{-2} = \frac{1}{x^2}\) for \(x \ne 0\).

#### Diagram: Integer Exponents Explorer

<details markdown="1">
<summary>Integer Exponents Explorer</summary>
Type: microsim
**sim-id:** integer-exponents-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will evaluate expressions with positive, zero, and negative integer exponents for a given base value, achieving at least 4 of 5 correct.

**Prerequisites:** exponent (repeated multiplication), base, reciprocal (the number that multiplies to give 1, e.g., the reciprocal of 3 is 1/3), fraction notation

**Evidence of Mastery:** For five challenge expressions of the form \(b^e\) where \(b\) is an integer from \(-4\) to \(4\) (excluding 0) and \(e\) is any integer from \(-5\) to \(5\), the learner types the simplified value. An answer is correct when it matches the computed model value exactly. Mastery: at least 4 of 5 correct.

**Misconceptions:** (1) Any base raised to power 0 equals 0. (2) A negative exponent makes the result negative. (3) \((-3)^2 = -9\) instead of \(+9\). (4) Confusing \(b^{-n}\) with \(-b^n\).

**Instructional Rationale:** Apply-level evaluation requires committed numerical answers followed by immediate verification, which is more instructive than passive observation. The five-challenge format gives enough practice to reveal patterns without fatiguing the learner.

**Content:**

Base values available: \(-4, -3, -2, -1, 1, 2, 3, 4\) (0 excluded to avoid undefined expressions).
Exponent range for challenges: integers from \(-5\) to \(5\).

Five challenge sets with computed answers:

| # | Expression | Correct Answer | Why |
|---|------------|---------------|-----|
| 1 | \(3^0\) | 1 | Any nonzero base raised to power 0 equals 1 |
| 2 | \(2^{-3}\) | 1/8 or 0.125 | Negative exponent means reciprocal: \(1/(2^3) = 1/8\) |
| 3 | \((-3)^2\) | 9 | The base is negative but the exponent is even, so the result is positive: \((-3)(-3) = 9\) |
| 4 | \(5^{-1}\) | 1/5 or 0.2 | Reciprocal of 5 |
| 5 | \((-2)^{-2}\) | 1/4 or 0.25 | First flip: \(1/(−2)^2\), then square: \((−2)^2 = 4\), so result is 1/4 |

All values are synthetic, generated by computing \(b^e\) using integer arithmetic and rational conversion.

**Provenance:** Synthetic with integer base values from \(-4\) to \(4\) (excluding 0) and exponents from \(-5\) to \(5\). Model values computed exactly using integer arithmetic, then converted to fractions and decimal approximations.

**Rules:** \(b^0 = 1\) for all \(b \ne 0\). \(b^{-n} = \frac{1}{b^n}\) for all \(b \ne 0\) and positive integer \(n\). \((-b)^{\text{even}} > 0\), \((-b)^{\text{odd}} < 0\). A learner's answer is correct when it matches the model value exactly (fraction or decimal accepted within ±0.001 tolerance).

**Learner Activity:**

1. The learner selects a base from the available values (\(-4\) to \(4\), excluding 0) and an exponent from \(-5\) to \(5\), then types the simplified result in the answer box.
2. The learner presses Check. The sim displays whether the answer is correct along with the worked evaluation step by step.
3. After each challenge, a new challenge appears automatically until all five are complete.
4. A running score "Correct: n of 5" is displayed throughout.

**Feedback:** Five challenges in fixed order, two attempts each. Correct response: "Correct! \([expression] = [answer]\)." Incorrect response on first attempt: the step-by-step worked evaluation showing how to handle the base sign, exponent type (zero or negative), and final computation. After the second wrong attempt, the correct answer is shown and the challenge counts as missed. A running tally "Correct: n of 5" appears at all times.

**Starting State:** Challenge 1 (\(3^0\)) with an empty answer box and the question "What does any nonzero base raised to the power 0 equal?" The base selector is pre-set to positive values for the first challenge.

**Chapter Anchors:** The chapter defines three key misconceptions about integer exponents (zero exponent equals zero, negative exponent yields a negative result, even powers of negatives are negative). Chapter Anchors lists the five example expressions and their exact computed answers shown above.
</details>

### Zero Exponent Rule

The **zero exponent rule** states that any nonzero number raised to the power 0 equals 1. This is written as:
\[x^0 = 1 \quad \text{for all } x \ne 0\]

This rule is not a definition chosen for convenience — it is forced by consistency with the quotient-of-powers law. Consider \(\frac{x^3}{x^3}\):

Expanding gives \(\frac{x \cdot x \cdot x}{x \cdot x \cdot x} = 1\) (all factors cancel).
Using the quotient rule gives \(x^{3-3} = x^0\).

For both results to agree, we must have \(x^0 = 1\). The exclusion of zero is critical: \(0^0\) is **undefined** because it creates a contradiction — expanding \(\frac{0^3}{0^3}\) fails since division by zero has no meaning.

Note that \(0^0\) is sometimes *defined* as 1 in combinatorics and algebra for notational convenience, but in the context of exponent laws applied to variable expressions, leaving it undefined avoids errors when substituting values.

Here are several examples confirming the rule:
- \(7^0 = 1\): Any positive number to power 0 is 1.
- \((-5)^0 = 1\): The base can be negative; zero power always yields 1 (as long as the base itself is not 0).
- \((3x)^0 = 1\) for \(x \ne 0\): Even an algebraic expression raised to power 0 equals 1.

A common error is confusing \(x^0\) with \(0^x\). The former (any nonzero base to power 0) always equals 1, while the latter (zero to any positive power) always equals 0. These are fundamentally different operations:

\[5^0 = 1 \quad \text{(base is nonzero, so result is 1)}\]
\[0^5 = 0 \quad \text{(base is zero, so result is 0)}\]

### Negative Exponents

A **negative exponent** indicates the reciprocal of the corresponding positive power. The rule is:
\[x^{-n} = \frac{1}{x^n} \quad \text{for } x \ne 0\]

Conversely, moving a factor with a negative exponent across the fraction bar flips the sign:
\[\frac{1}{x^{-n}} = x^n\]

The key pattern is that a negative exponent does **not** make the result negative — it makes the base reciprocal. For example:
\[2^{-3} = \frac{1}{2^3} = \frac{1}{8} \quad \text{(positive, not negative)}\]
\[(−5)^{-2} = \frac{1}{(−5)^2} = \frac{1}{25} \quad \text{(also positive because the even power removed the negative sign)}\]

A common error is confusing \(x^{-n}\) with \(-x^n\). The first flips the base to its reciprocal; the second negates the result of a positive exponent. They are fundamentally different:
\[3^{-2} = \frac{1}{9} \neq -9 = -3^2\]

**Worked Examples: Simplifying Negative Exponents.** Here are several examples showing step-by-step simplification:

- \(4^{-2}\): Step 1 — write reciprocal: \(\frac{1}{4^2}\). Step 2 — evaluate: \(\frac{1}{16}\).
- \((-3)^{-1}\): Step 1 — write reciprocal: \(\frac{1}{(-3)^1}\). Step 2 — simplify: \(-\frac{1}{3}\). Note the negative sign on the base carries through, unlike the previous example where a negative base with an even power became positive.
- \(\frac{1}{5^{-3}}\): Step 1 — flip the negative exponent across the fraction bar: \(5^3\). Step 2 — evaluate: \(125\). This illustrates the reciprocal-of-reciprocal pattern: dividing by \(\frac{1}{x}\) gives back \(x\).
- \(2^{-4} \cdot 6^2\): Step 1 — convert negative exponent: \(\frac{1}{2^4} \cdot 36 = \frac{36}{16}\). Step 2 — simplify: \(\frac{9}{4}\). When a term with a negative exponent multiplies another term, you first rewrite the reciprocal and then combine normally.

**Negative exponents with coefficients.** A common pitfall occurs when there is a coefficient in front of the variable. Consider \(3x^{-2}\). This does **not** mean \(\frac{1}{3x^2}\) — the negative exponent only applies to the base immediately before it, which is \(x\), not \(3\):

\[3x^{-2} = 3 \cdot \frac{1}{x^2} = \frac{3}{x^2}\]

The coefficient 3 remains in the numerator. To see why this matters, compare:
- \(3x^{-2} = \frac{3}{x^2}\) (only the variable part has the negative exponent)
- \((3x)^{-2} = \frac{1}{(3x)^2} = \frac{1}{9x^2}\) (the parentheses include 3, so both flip)

**Combining negative exponents with other laws.** When simplifying expressions that mix negative exponents with quotient or product rules, convert all negative exponents to positive first, then apply the standard laws. For example:
\[\frac{x^{-3}}{x^{-5}} = \frac{\frac{1}{x^3}}{\frac{1}{x^5}} = \frac{1}{x^3} \cdot x^5 = x^{5-3} = x^2\]

Alternatively, use the quotient rule directly: \(x^{-3 - (-5)} = x^{-3+5} = x^2\). Both methods agree, confirming the consistency of the rules.

### Exponents and Radicals

**Radical notation** uses the symbol \(\sqrt[n]{\phantom{x}}\) to represent roots — the inverse operation of exponentiation. The **radicand** is the expression under the radical sign, the **index** \(n\) specifies which root (2 for square root, 3 for cube root), and when the index is 2 it is conventionally omitted: \(\sqrt{x}\) means the square root of \(x\).

The relationship between radicals and rational exponents is:
\[\sqrt[n]{x} = x^{1/n}\]

This equivalence lets you apply all five exponent laws to radical expressions. For example, simplifying a product of radicals:
\[\sqrt[3]{x^2} \cdot \sqrt{x} = x^{2/3} \cdot x^{1/2} = x^{2/3 + 1/2} = x^{7/6}\]

Converting between forms follows directly: to rewrite a radical as an exponential expression, the numerator of the fractional exponent becomes the power inside the radical and the denominator becomes the index. Conversely, to convert an exponential expression to radical form, the denominator of the fractional exponent becomes the index and the numerator remains as the power on the base.

**Worked Examples: Converting between forms.**

- \(\sqrt[4]{x^3} = x^{3/4}\): Index 4 becomes the denominator, power 3 stays in the numerator.
- \(y^{2/5} = \sqrt[5]{y^2}\): Denominator 5 is the root index; numerator 2 is the power on \(y\).
- \(\sqrt{x^3} = x^{3/2}\): When no explicit index is shown (square root), the denominator is 2.
- \((2x)^{1/2} = \sqrt{2x}\): The entire expression inside the parentheses gets the square root.

**Simplifying radical expressions.** You can simplify radicals by extracting perfect powers from under the radical sign. For example:
\[\sqrt{50} = \sqrt{25 \cdot 2} = \sqrt{25} \cdot \sqrt{2} = 5\sqrt{2}\]

The strategy is to factor the radicand into a product where at least one factor is a perfect square (or perfect cube, etc., depending on the index), extract that factor, and leave the remainder under the radical. This works because \(\sqrt{ab} = \sqrt{a} \cdot \sqrt{b}\) for non-negative \(a\) and \(b\).

When simplifying variable radicals, the same logic applies:
\[\sqrt{x^8} = x^{8/2} = x^4\]
\[\sqrt[3]{x^{12}} = x^{12/3} = x^4\]
\[\sqrt{x^5} = \sqrt{x^4 \cdot x} = x^2\sqrt{x}\]

For a radical expression to be in simplest form, the radicand should contain no perfect-square factors (for square roots), no fractions, and no radicals in the denominator. The last requirement leads directly to rationalizing the denominator.

#### Diagram: Factoring Strategy Selector

<details markdown="1">
<summary>Factoring Strategy Selector</summary>
Type: microsim
**sim-id:** factoring-strategy-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of ten polynomials into the correct factoring method (GCF, grouping, difference of squares, perfect square trinomial, or trinomial) and justify the choice based on structural features.

**Prerequisites:** GCF (greatest common factor), grouping method, difference of squares, perfect square trinomial, trinomial factoring, polynomial degree (the highest exponent on the variable in a polynomial), monomial, binomial, trinomial

**Evidence of Mastery:** For ten challenge polynomials, the learner selects the appropriate factoring method from five options and submits. A selection is correct when it matches the intended method for that polynomial's structure. Mastery: at least 8 of 10 correct.

**Misconceptions:** (1) Every polynomial can be factored. (2) If a polynomial has three terms, it must use trinomial factoring. (3) Difference of squares applies to any binomial. (4) GCF is always greater than 1.

**Instructional Rationale:** Analyze-level classification requires the learner to inspect structural features and decide which pattern applies, rather than being told the method in advance. This mirrors how students actually approach factoring problems — they must first recognize the structure before selecting a tool.

**Content:**

Ten challenge polynomials with correct classifications:

| # | Polynomial | Correct Method | Why (structural clue) |
|---|------------|---------------|----------------------|
| 1 | \(6x^2 + 9x\) | GCF | Both terms share a factor of \(3x\) → \(3x(2x + 3)\) |
| 2 | \(x^2 + 7x + 12\) | Trinomial | Three terms, \(a=1\), look for two numbers that multiply to 12 and add to 7 → \((x+3)(x+4)\) |
| 3 | \(4x^2 - 25\) | Difference of Squares | Two terms, both perfect squares with subtraction → \((2x+5)(2x-5)\) |
| 4 | \(x^2 + 6x + 9\) | Perfect Square Trinomial | Three terms, first and last are perfect squares, middle is \(2 \cdot 1 \cdot 3 = 6\) → \((x+3)^2\) |
| 5 | \(x^3 + 2x^2 + 3x + 6\) | Grouping | Four terms, group in pairs: \((x^3+2x^2)+(3x+6) = x^2(x+2)+3(x+2)\) → \((x^2+3)(x+2)\) |
| 6 | \(8x^3 - 27\) | Difference of Cubes (not in scope, classify as none of the five listed) | Two terms, not difference of squares (cubes) → no match among options |
| 7 | \(5x^2 - 20\) | GCF first, then Difference of Squares | Factor out 5: \(5(x^2-4)\), then \(5(x+2)(x-2)\) |
| 8 | \(x^2 - 16x + 64\) | Perfect Square Trinomial | First and last are perfect squares (\(x^2\), \(64 = 8^2\)), middle is \(-2 \cdot x \cdot 8 = -16x\) → \((x-8)^2\) |
| 9 | \(3x^2 + 15x\) | GCF | Both terms share \(3x\) → \(3x(x+5)\) |
| 10 | \(x^2 + 5x + 6\) | Trinomial | Three terms, look for factors of 6 that add to 5 → \((x+2)(x+3)\) |

All polynomial content is synthetic, generated by choosing a factorization and expanding.

**Provenance:** Synthetic polynomials constructed by selecting a factoring method, performing the factorization, then expanding to get the challenge form. This ensures correctness and complete coverage of the five methods.

**Rules:** The learner selects exactly one method from: GCF, Grouping, Difference of Squares, Perfect Square Trinomial, Trinomial. The correct answer is determined by matching the polynomial's structural features to the classification table above. A selection for #6 (which does not match any of the five listed methods) is considered incorrect. Mastery threshold: 8 of 10 correct.

**Learner Activity:**

1. For each challenge, the learner examines the polynomial's structure (number of terms, whether terms are perfect squares, common factors).
2. The learner selects the appropriate method from the five options and presses Check.
3. After each response, the sim displays the classification result, the correct answer with a brief structural explanation, then advances to the next challenge automatically.
4. A running score "Correct: n of 10" is displayed throughout.

**Feedback:** Ten challenges in fixed order, two attempts each. Correct: "Correct! \([polynomial]\) is a [correct method] pattern because [structural reason]." Incorrect on first attempt: the structural analysis showing which features led to the correct method (number of terms, perfect squares present, common factors). After second wrong attempt, full factorization is shown and the challenge counts as missed.

**Starting State:** Challenge 1 (\(6x^2 + 9x\)) with five method buttons (GCF, Grouping, Difference of Squares, Perfect Square Trinomial, Trinomial) and the question "Which factoring method applies to this polynomial?"

**Chapter Anchors:** The chapter lists ten polynomials classified into five methods: GCF (3 times), Trinomial (2 times), Difference of Squares (1 time perfect square context), Perfect Square Trinomial (2 times), Grouping (1 time). Mastery requires 8 of 10 correct.
</details>

## Part B: Factoring Techniques

Factoring is the process of expressing a polynomial as a product of simpler polynomials — essentially the reverse of multiplication. Every factoring method identifies a structural pattern in the polynomial and uses that pattern to write it in factored form. The methods below are arranged from simplest (finding a common factor) to most complex (recognizing special algebraic identities).

### Greatest Common Factor (GCF)

The **greatest common factor** of two or more terms is the largest expression that divides each term evenly. Factoring by GCF means pulling this common factor out in front of a set of parentheses containing what remains.

To find the GCF:
1. Break each coefficient into its prime factors.
2. Identify common prime factors across all terms.
3. For each variable, use the smallest exponent that appears in every term.
4. Multiply these together.

**Worked Example:** Factor \(12x^3 + 18x^2\).

Step 1: Coefficients — \(12 = 2 \cdot 2 \cdot 3\) and \(18 = 2 \cdot 3 \cdot 3\). Common factors: one 2 and one 3, giving GCF coefficient = \(6\).
Step 2: Variables — \(x^3\) and \(x^2\), the smaller exponent is 2, so common variable part is \(x^2\).
Step 3: The GCF is \(6x^2\).
Step 4: Divide each term by the GCF: \(\frac{12x^3}{6x^2} = 2x\) and \(\frac{18x^2}{6x^2} = 3\).

Result: \(12x^3 + 18x^2 = 6x^2(2x + 3)\).

**Verification:** Multiply back — \(6x^2 \cdot 2x = 12x^3\) and \(6x^2 \cdot 3 = 18x^2\), which recovers the original.

GCF factoring always works when terms share a common factor. A useful rule: if the GCF of the coefficients is 1 and no variable appears in every term, there is no further GCF to factor out. In such cases, move to another method.

### Factoring by Grouping

The **grouping method** applies when a polynomial has four or more terms that do not share a single common factor across all terms. The strategy is to split the polynomial into two groups, factor each group separately, then check whether the resulting binomials match. If they do, that shared binomial becomes the second factor.

For a four-term polynomial \(ax^3 + bx^2 + cx + d\):
1. Group terms: \((ax^3 + bx^2) + (cx + d)\).
2. Factor the GCF from each group.
3. If the remaining binomials are identical, factor it out.

**Worked Example:** Factor \(x^3 + 4x^2 + 3x + 12\).

Step 1: Group → \((x^3 + 4x^2) + (3x + 12)\).
Step 2: Factor each group → \(x^2(x + 4) + 3(x + 4)\).
Step 3: The binomial \((x + 4)\) appears in both groups, so factor it out.

Result: \(x^3 + 4x^2 + 3x + 12 = (x + 4)(x^2 + 3)\).

The grouping method fails when the binomials after step 2 do not match. This usually signals that either (a) a GCF should have been pulled out first, or (b) this polynomial is not factorable by grouping and requires a different approach.

### Difference of Squares

A **difference of squares** is a binomial where both terms are perfect squares and they are separated by a minus sign. The pattern is:
\[a^2 - b^2 = (a + b)(a - b)\]

To factor a difference of squares, take the square root of each term (which gives \(a\) and \(b\)), write the two factors as a sum and a difference of those roots, and verify by multiplying back.

**Worked Example:** Factor \(9x^2 - 16\).

Step 1: Identify perfect squares — \(9x^2 = (3x)^2\) and \(16 = 4^2\), so \(a = 3x\) and \(b = 4\).
Step 2: Apply the pattern → \((3x + 4)(3x - 4)\).
Step 3: Verify — \((3x+4)(3x-4) = 9x^2 - 12x + 12x - 16 = 9x^2 - 16\). ✓

The difference of squares pattern works in multiple dimensions: \(4x^4 - 81y^2 = (2x^2 + 9y^2)(2x^2 - 9y)\), and sometimes the result can be factored further. For example, \(16 - x^4 = (4 + x^2)(4 - x^2)\), and \((4 - x^2)\) itself is a difference of squares: \((4-x^2) = (2+x)(2-x)\), giving the complete factorization \((4+x^2)(2+x)(2-x)\).

A common error is applying this pattern to a sum of squares, \(a^2 + b^2\). **Sums of squares do not factor over the real numbers** — there is no real-number factorization analogous to the difference-of-squares formula. The expression \(x^2 + 9\) is irreducible (cannot be factored) in the real number system.

### Perfect Square Trinomials

A **perfect square trinomial** is a three-term polynomial that results from squaring a binomial. There are two forms:
\[(a + b)^2 = a^2 + 2ab + b^2 \quad \text{(plus pattern)}\]
\[(a - b)^2 = a^2 - 2ab + b^2 \quad \text{(minus pattern)}\]

To recognize a perfect square trinomial, check three things: (1) is the first term a perfect square? (2) is the last term a perfect square? (3) is the middle term exactly twice the product of those two square roots? All three must be true.

**Worked Example:** Factor \(x^2 + 10x + 25\).

Step 1: First term — \(x^2 = (x)^2\), so \(a = x\).
Step 2: Last term — \(25 = 5^2\), so \(b = 5\).
Step 3: Middle term check — is \(10x = 2 \cdot x \cdot 5\)? Yes, \(2 \cdot x \cdot 5 = 10x\). ✓

Result: \(x^2 + 10x + 25 = (x + 5)^2\).

**Worked Example:** Factor \(4y^2 - 20y + 25\).

Step 1: First term — \(4y^2 = (2y)^2\), so \(a = 2y\).
Step 2: Last term — \(25 = 5^2\), so \(b = 5\).
Step 3: Middle term check — is \(-20y = -2 \cdot 2y \cdot 5\)? Yes, \(-2(2y)(5) = -20y\). ✓

Result: \(4y^2 - 20y + 25 = (2y - 5)^2\). Note the minus sign on the middle term produces a binomial with subtraction.

If the middle term fails the check (it is not exactly \(2ab\)), the trinomial is **not** a perfect square, regardless of whether the first and last terms are perfect squares. For example, \(x^2 + 8x + 9\) has perfect-square ends (\(x^2\) and 9) but \(8 \neq 2 \cdot x \cdot 3 = 6\), so it is not a perfect square trinomial.

### Trinomial Factoring

**Trinomial factoring** handles expressions of the form \(ax^2 + bx + c\) where \(a \neq 1\). When \(a = 1\), you look for two integers that multiply to \(c\) and add to \(b\). When \(a \neq 1\), the process requires an additional step: find two numbers whose product equals \(a \cdot c\) and whose sum equals \(b\), then use grouping.

**Worked Example:** Factor \(2x^2 + 7x + 3\).

Step 1: Compute \(ac = 2 \cdot 3 = 6\). Find two numbers that multiply to 6 and add to 7: those are 6 and 1 (since \(6 \cdot 1 = 6\) and \(6 + 1 = 7\)).
Step 2: Rewrite the middle term using these numbers: \(2x^2 + 6x + x + 3\).
Step 3: Factor by grouping: \((2x^2 + 6x) + (x + 3) = 2x(x + 3) + 1(x + 3)\).
Step 4: Factor out the common binomial: \((x + 3)(2x + 1)\).

**Worked Example:** Factor \(3x^2 - 10x + 8\).

Step 1: Compute \(ac = 3 \cdot 8 = 24\). Find two numbers that multiply to 24 and add to −10: those are −6 and −4 (since \((-6)(-4) = 24\) and \(-6 + (-4) = -10\)).
Step 2: Rewrite: \(3x^2 - 6x - 4x + 8\).
Step 3: Group: \((3x^2 - 6x) + (-4x + 8) = 3x(x - 2) - 4(x - 2)\).
Step 4: Common binomial → \((x - 2)(3x - 4)\).

A critical check at the end is to multiply the factors back and confirm you recover the original expression. If any step introduces an error, it usually occurs in the sign during rewriting or grouping — double-check that both numbers from step 1 satisfy **both** the product and sum conditions simultaneously.

### Prime Polynomials

A **prime polynomial** (also called irreducible) is a polynomial that cannot be factored into simpler polynomials with integer coefficients. Not every polynomial can be factored, and recognizing when to stop is as important as knowing which method to use.

To determine if a trinomial \(ax^2 + bx + c\) is prime:
1. Check for GCF first — if all terms share a factor greater than 1, factor it out and try again on the remainder.
2. For quadratics (\(a \neq 0\)), compute \(ac\) and check whether any pair of integers multiplies to \(ac\) and adds to \(b\). If no such pair exists, the trinomial cannot be factored using integer coefficients.

**Example:** Factor (or determine prime) \(x^2 + 4x + 6\).
Product = \(1 \cdot 6 = 6\), need factors of 6 that add to 4. Pairs: (1,6) sum=7; (2,3) sum=5. No pair sums to 4, so \(x^2 + 4x + 6\) is prime over the integers.

Note that "prime over the integers" does not necessarily mean the polynomial has no real roots — it simply means no factorization with integer coefficients exists. The quadratic formula may still yield real solutions even for prime polynomials (when the discriminant is nonnegative but not a perfect square).

## Part C: Polynomial and Synthetic Division

When factoring does not apply or when you need to find possible factors of a polynomial, polynomial division provides the mechanism. Like arithmetic long division with numbers, polynomial division breaks down a complex expression into a quotient and remainder.

### Polynomial Division

**Polynomial division** (long division) divides one polynomial by another, yielding a quotient and a remainder. The process mirrors arithmetic long division: divide the leading term of the dividend by the leading term of the divisor, multiply the entire divisor by that result, subtract from the dividend, bring down the next term, and repeat until the degree of what remains is less than the degree of the divisor.

**Worked Example:** Divide \(x^3 + 2x^2 - 5x + 3\) by \(x - 1\).

```
                x^2 + 3x - 2   (quotient)
              ──────────────────
       x - 1 | x^3 + 2x^2 - 5x + 3
              -(x^3 - x^2)
               ────────
                      3x^2 - 5x
                    -(3x^2 - 3x)
                       ────────
                           -2x + 3
                         -(-2x + 2)
                            ──────
                                 1   (remainder)
```

Result: \(\frac{x^3 + 2x^2 - 5x + 3}{x - 1} = x^2 + 3x - 2 + \frac{1}{x-1}\).

The key insight is that the remainder \(r\) is a constant (degree 0) because its degree is less than the divisor's degree (1). If the remainder is 0, then the divisor divides the dividend evenly and is therefore a factor.

The division process always terminates because the degree of the partial dividend decreases with each subtraction step. When the degree drops below the degree of the divisor, no further division is possible.

### Synthetic Division

**Synthetic division** is a condensed version of polynomial long division that works only when dividing by a binomial of the form \(x - c\) (monic linear factor, i.e., the coefficient of \(x\) must be 1). Instead of writing variables and powers, synthetic division uses only the coefficients.

The procedure:
1. Write the value \(c\) (from \(x - c\)) on the left.
2. List the coefficients of the dividend in descending order of degree, inserting 0 for any missing terms.
3. Bring down the leading coefficient.
4. Multiply by \(c\), add to the next coefficient, and repeat across all coefficients.
5. The final row gives the quotient's coefficients (one degree less than the dividend) and the remainder.

**Worked Example:** Divide \(x^3 - 4x^2 + 2x - 8\) by \(x - 4\).

```
    4 |  1   -4    2   -8
      |       4    0    8
      ───────────────────
         1    0    2    0
```

The bottom row (1, 0, 2, 0) represents: quotient = \(x^2 + 0x + 2 = x^2 + 2\), remainder = 0. Since the remainder is 0, we know that \((x - 4)\) divides evenly into the polynomial.

Synthetic division fails when the divisor's leading coefficient is not 1 (e.g., \(2x - 3\)). In those cases, polynomial long division or synthetic division with a modified setup (dividing by \(2\) after synthetic division) is required.

### The Remainder and Factor Theorems

Two theorems connect division to factoring and roots:

The **Remainder Theorem** states that when a polynomial \(f(x)\) is divided by \(x - c\), the remainder equals \(f(c)\). This means you can evaluate a polynomial at any value without expanding — just perform synthetic or long division. If the remainder is 0, then \(c\) is a root (or zero) of the polynomial.

**Example:** To check whether \(x = 2\) is a root of \(f(x) = x^3 - 6x^2 + 11x - 6\), divide by \((x - 2)\):
Using synthetic division: coefficients (1, −6, 11, −6), c = 2.
```
    2 |  1   -6   11   -6
      |       2   -8    6
      ───────────────────
         1   -4    3    0
```
Remainder is 0, so \(f(2) = 0\) and \(x = 2\) is a root.

The **Factor Theorem** states that \(x - c\) is a factor of polynomial \(f(x)\) if and only if \(f(c) = 0\). This is essentially the contrapositive of the Remainder Theorem: zero remainder \(\iff\) divisibility \(\iff\) \(c\) is a root. The Factor Theorem is what allows you to build factors from roots — find a value \(c\) where \(f(c) = 0\), and you immediately know that \((x - c)\) is one factor of \(f(x)\).

**Worked Example:** Given that \(x = 3\) is a root of \(f(x) = x^3 - 7x^2 + 14x - 6\), find the remaining factors.

By the Factor Theorem, \((x - 3)\) is a factor. Divide \(f(x)\) by \((x - 3)\):
Using synthetic division: c = 3.
```
    3 |  1   -7   14   -6
      |       3  -12    6
      ───────────────────
         1   -4    2    0
```

The quotient is \(x^2 - 4x + 2\), so \(f(x) = (x-3)(x^2-4x+2)\). The quadratic \(x^2-4x+2\) does not factor nicely over integers (discriminant = \(16-8=8\), not a perfect square), so this is the complete factorization over the integers.

### Roots and Factors

**Roots and factors** are two sides of the same coin: a root (or zero) of a polynomial is a value \(x = r\) where \(f(r) = 0\); a factor is an expression \((x - r)\) that divides evenly into the polynomial. Every real root corresponds to a linear factor, and every linear factor reveals a root.

If you know all the roots of a polynomial, you can write it as a product of its factors (up to a constant multiplier):
\[f(x) = a(x - r_1)(x - r_2)\cdots(x - r_n)\]

where \(a\) is the leading coefficient and each \(r_i\) is a root. The number of roots (counting multiplicities) equals the degree of the polynomial, though some may be complex rather than real.

For integer-coefficient polynomials, the **Rational Root Theorem** provides a systematic way to find possible rational roots. If \(f(x) = a_n x^n + \ldots + a_1 x + a_0\) with integer coefficients, then any rational root \(p/q\) (in lowest terms) must satisfy: \(p\) divides the constant term \(a_0\) and \(q\) divides the leading coefficient \(a_n\). This gives a finite list of candidates to test using the Remainder Theorem.

### Multiplicity of Roots

The **multiplicity** of a root is the number of times its corresponding factor appears in the polynomial's factored form. A root with multiplicity 1 is called a **simple root**; higher multiplicities are labeled accordingly.

Consider \(f(x) = (x - 2)^3(x + 1)\). The roots and their multiplicities are:
- \(x = 2\) with multiplicity 3 (the factor \((x-2)\) appears three times)
- \(x = -1\) with multiplicity 1 (simple root)

The total number of roots counting multiplicities equals the degree of the polynomial: \(3 + 1 = 4\), which matches the degree of the expanded form (degree 4).

Graphically, a root's multiplicity determines how the graph behaves at that root:
- **Odd multiplicity (1, 3, 5, ...):** the graph crosses the x-axis at this root.
- **Even multiplicity (2, 4, 6, ...):** the graph touches the x-axis but does not cross it (the graph is tangent to the axis at that point).

For example, \((x-2)^3\) crosses the x-axis at \(x = 2\) (odd), and the shape near that root resembles a flattened cubic. Meanwhile, \((x+1)^2\) touches the axis at \(x = -1\) without crossing it (even multiplicity), creating a local minimum or maximum at that point.

A useful rule for counting roots: if a degree-\(n\) polynomial is factored into linear terms with integer coefficients, the sum of all multiplicities equals \(n\). For instance, \((x-2)^3(x+1)\) has degree 4 and three + one equals four total roots counting multiplicity. This bookkeeping rule helps verify that a factorization is complete: if the multiplicities do not sum to the degree, at least one factor may be missing or incorrectly expanded.

## Part D: Solving by Factoring

**Solving by factoring** is a method for finding the roots of a polynomial equation by rewriting the equation so that one side is zero and the other is a product of factors. Once in this form, you apply the **Zero Product Property**: if \(a \cdot b = 0\), then either \(a = 0\) or \(b = 0\) (or both).

The procedure:
1. Set the equation equal to zero.
2. Factor the nonzero side completely.
3. Set each factor equal to zero and solve.
4. Check solutions in the original equation (especially important when denominators are involved).

**Worked Example:** Solve \(x^3 - 6x^2 + 11x - 6 = 0\).

Step 1: Already set to zero.
Step 2: Factor — try possible roots using the Rational Root Theorem. Possible rational roots: \(\pm 1, \pm 2, \pm 3, \pm 6\) (factors of constant term 6 divided by factors of leading coefficient 1). Testing \(x = 1\): \(f(1) = 1 - 6 + 11 - 6 = 0\), so \(x = 1\) is a root and \((x-1)\) is a factor. Dividing gives: \(x^3 - 6x^2 + 11x - 6 = (x-1)(x^2 - 5x + 6)\). The quadratic factors further: \((x^2-5x+6) = (x-2)(x-3)\).

So the complete factorization is \(f(x) = (x-1)(x-2)(x-3)\).

Step 3: Set each factor to zero: \(x - 1 = 0 \Rightarrow x = 1\), \(x - 2 = 0 \Rightarrow x = 2\), \(x - 3 = 0 \Rightarrow x = 3\).

Step 4: Check — all three values produce \(f(x) = 0\) when substituted back. ✓

Solution set: \(\boxed{x = 1, \; x = 2, \; x = 3}\).

When solving equations by factoring, always verify that each solution does not make any denominator zero (for rational expressions) and that no extraneous solutions were introduced during the process. The Zero Product Property applies to multiplication over real numbers but has no direct analogue for addition or subtraction — \(a + b = 0\) does not imply that either term must be zero individually, so factorization remains essential before you can set any expression equal to zero and conclude anything about its parts.

**Worked Example (continued from the previous section):** Solve \(2x^3 - 8x^2 - x + 4 = 0\).

This polynomial does not have an obvious GCF across all four terms, but grouping works:
Step 1: Group → \((2x^3 - 8x^2) + (-x + 4)\).
Step 2: Factor each group → \(2x^2(x - 4) - 1(x - 4)\).
Step 3: Common binomial → \((x - 4)(2x^2 - 1)\).

Now apply the Zero Product Property:
\(x - 4 = 0 \Rightarrow x = 4\), and \(2x^2 - 1 = 0 \Rightarrow x^2 = \frac{1}{2} \Rightarrow x = \pm \frac{1}{\sqrt{2}} = \pm \frac{\sqrt{2}}{2}\).

Solution set: \(\boxed{x = 4, \; x = \frac{\sqrt{2}}{2}, \; x = -\frac{\sqrt{2}}{2}}\). Notice that this cubic equation (degree 3) has three real roots, matching its degree — a consequence of the Fundamental Theorem of Algebra, which states that a polynomial of degree \(n\) has exactly \(n\) roots counting multiplicity. In this case all three roots are real and distinct.

### Prime Polynomials

## Chapter Summary

This chapter covered three major themes in algebraic manipulation:

**Exponent laws and integer exponents** provide the foundation for simplifying expressions at every stage. The five laws — product of powers, quotient of powers, power of a power, power of a product, and power of a quotient — extend naturally to zero and negative exponents by requiring consistency across all cases. The key takeaway is that exponent rules are not memorized in isolation; each one follows from the definition of an exponent as repeated multiplication.

**Factoring techniques** — GCF, grouping, difference of squares, perfect square trinomials, and trinomial factoring — form a toolkit for decomposing polynomials into products of simpler factors. The critical skill is pattern recognition: before applying any method, ask what the polynomial's structure looks like (how many terms, are there perfect squares, is there a common factor?). A systematic approach that tries GCF first, then identifies the pattern in the remaining expression, prevents wasted effort on methods that do not apply.

**Polynomial and synthetic division**, together with the remainder and factor theorems, connect algebraic factoring to root-finding. When factoring by inspection fails or when you need to test whether a particular value is a root, division provides the answer directly: zero remainder means the divisor is a factor and the tested value is a root. The **Rational Root Theorem** narrows the search for rational roots to a finite candidate list, making it possible to exhaustively test all possibilities in polynomial time.

Together, these tools form the core of algebraic problem-solving — every subsequent topic in Algebra I (from solving quadratics by multiple methods to analyzing function behavior) relies on the ability to factor expressions and understand the relationship between roots, factors, and multiplicities.

---

## Key Takeaways

- Every exponent law can be justified from the definition of an exponent as repeated multiplication. The zero and negative exponent rules are forced by consistency, not chosen arbitrarily.
- GCF factoring is always the first step — if all terms share a common factor, pull it out before trying any other method.
- Recognize special patterns: two terms with subtraction that are both perfect squares → difference of squares; three terms where ends are perfect squares and middle equals \(2ab\) → perfect square trinomial.
- Polynomial division reduces to arithmetic on coefficients when dividing by \(x - c\) (synthetic division). The remainder from this process equals \(f(c)\) (Remainder Theorem).
- The Factor Theorem (\(x-c\) is a factor \(\iff f(c)=0\)) is the bridge between roots and factors, enabling systematic root-finding by testing candidates from the Rational Root Theorem.
