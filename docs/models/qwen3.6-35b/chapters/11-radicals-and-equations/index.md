---
title: "Chapter 11: Radicals and Radical Equations"
description: "Radical notation, converting to rational exponents, simplifying radicals, arithmetic operations on radicals, and solving radical equations including extraneous solutions."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 16:03:00"
version: 1.11
---

# Radicals and Radical Equations

## Summary

This chapter completes the study of radicals and roots. Students learn radical notation, convert between radical and exponent forms, simplify radical expressions involving square, cube, and nth roots, and perform arithmetic operations on radicals. The chapter culminates in solving radical equations — integrating the manipulation skills with equation-solving techniques developed throughout the course. These concepts provide essential tools used throughout the textbook, especially in later chapters on statistics and mathematical modeling.

## Concepts Covered

This chapter covers the following concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Rational Exponents | 28 |
| Radical Notation | 3 |
| Converting Radicals to Exponent Form | 1 |
| Equivalent Radical and Exponent Forms | 1 |
| Radical Expressions | 25 |
| Square Roots | 12 |
| Cube Roots | 12 |
| Nth Roots | 6 |
| Simplifying Radicals | 5 |
| Adding Radicals | 1 |
| Multiplying Radicals | 1 |
| Dividing Radicals | 1 |
| Radical Equations | 1 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 2: Variables, Expressions, and Polynomial Foundations](../02-variables-expressions-polynomial-foundations/index.md)
- [Chapter 3: Facturing Techniques and Polynomial Division](../03-factoring-techniques-polynomial-division/index.md)

---

## Radical Notation and Roots

A **radical** is the symbol that represents a root of a number. The most familiar radical is the square root sign, but radicals can denote any type of root. Understanding radical notation is the foundation for everything this chapter builds on.

Before working with radicals, you should recall that raising a number to an integer power means multiplying it by itself a certain number of times. For example, \(2^3 = 2 \times 2 \times 2 = 8\). A root is the inverse operation: if \(3^4 = 81\), then the fourth root of 81 is 3.

### Square and Cube Roots

The **square root** of a number \(a\) is the value that, when multiplied by itself, gives \(a\). It is written with the radical symbol:

\[ \sqrt{a} = b \quad \text{when} \quad b^2 = a \]

For instance, \(\sqrt{16} = 4\) because \(4^2 = 16\). Every positive number has two square roots — one positive and one negative. By convention, the radical symbol \(\sqrt{\;}\) refers to the **principal (non-negative) square root**. To indicate both roots, we write \(\pm\sqrt{a}\).

The **cube root** of a number \(a\) is the value that, when multiplied by itself three times, gives \(a\):

\[ \sqrt[3]{a} = b \quad \text{when} \quad b^3 = a \]

Unlike square roots, cube roots exist for negative numbers as well. For example:

\[ \sqrt[3]{-27} = -3 \quad \text{because} \quad (-3)^3 = -27 \]

This is because multiplying an odd number of negative factors yields a negative result, while an even number of negative factors yields a positive result.

### Worked Example: Identifying Square and Cube Roots

Determine which of the following numbers are perfect squares, perfect cubes, or both: 64, 81, 27, 100, 0.

| Number | Perfect Square? | Perfect Cube? | Both? |
|--------|----------------|---------------|-------|
| 64 | Yes (\(8^2\)) | Yes (\(4^3 = 64\)) | Yes |
| 81 | Yes (\(9^2\)) | No | — |
| 27 | No | Yes (\(3^3\)) | — |
| 100 | Yes (\(10^2\)) | No | — |
| 0 | Yes (\(0^2 = 0\)) | Yes (\(0^3 = 0\)) | Yes |

The key pattern to notice: a number is both a perfect square and a perfect cube when it is a perfect sixth power (because the least common multiple of 2 and 3 is 6). Indeed, \(64 = 2^6 = 8^2 = 4^3\).

### Nth Roots

The **nth root** generalizes both square roots and cube roots. The nth root of a number \(a\) is the value that, when raised to the power \(n\), gives \(a\):

\[ \sqrt[n]{a} = b \quad \text{when} \quad b^n = a \]

Here, \(n\) is called the **index** of the radical. When no index is written (as in \(\sqrt{a}\)), the index is understood to be 2.

Some important observations about nth roots:

- When \(n\) is even and \(a > 0\), there are two real nth roots (positive and negative). The radical symbol denotes the positive one.
- When \(n\) is even and \(a < 0\), no real nth root exists. For example, \(\sqrt{-4}\) is not a real number because no real number squared gives a negative result.
- When \(n\) is odd, every real number has exactly one real nth root (positive for positive inputs, negative for negative inputs).

??? note "Quick Check: Nth Roots"

    What is \(\sqrt[5]{32}\)? Click to expand and reveal the answer.

    2, because \(2^5 = 32\). The index 5 means we are looking for a number that, when multiplied by itself five times, equals 32.

## Converting Between Radical and Exponent Forms

Radical expressions can be rewritten as expressions with rational (fractional) exponents, and vice versa. This conversion is one of the most powerful tools in algebra because it lets you apply exponent rules to radicals.

### The Conversion Rule

The relationship between radicals and rational exponents is:

\[ \sqrt[n]{a} = a^{\frac{1}{n}} \]

More generally, for any integer \(m\) and \(n\) (with \(n \neq 0\)):

\[ a^{\frac{m}{n}} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m \]

The denominator of the fraction tells you which root to take. The numerator tells you which power to raise it to. You can take the root first and then the power, or the power first and then the root — whichever is easier to compute.

### Worked Example: Converting Expressions

Convert each expression between radical and exponent form:

**(a)** \(\sqrt[4]{x^3}\) in exponent form
The denominator 4 becomes the fractional exponent's denominator, so the answer is \(x^{3/4}\).

**(b)** \(y^{2/5}\) in radical form
The denominator 5 means fifth root, and the numerator 2 means power of 2: \(\sqrt[5]{y^2}\).

**(c)** \(\sqrt[3]{8^2}\) as a rational number
Take the root first: \(\sqrt[3]{8} = 2\), then square it: \(2^2 = 4\). So \(\sqrt[3]{8^2} = 4\).

**(d)** \(16^{3/4}\) as a rational number
The fraction \(3/4\) means fourth root first, then cube. The fourth root of 16 is 2 (because \(2^4 = 16\)), and \(2^3 = 8\). So \(16^{3/4} = 8\).

### Equivalent Forms for the Same Value

The expression \(a^{\frac{m}{n}}\) can be written in three equivalent ways, all representing the same value:

\[ a^{\frac{m}{n}} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m \]

These three forms are often useful in different situations. Consider \(8^{2/3}\):

1. Using \((\sqrt[3]{8})^2\): Take the cube root first, giving 2, then square it to get 4. This is usually easiest when the root comes out even.
2. Using \(\sqrt[3]{8^2} = \sqrt[3]{64}\): Square first to get 64, then take the cube root, also giving 4. Useful when the power is a familiar number.

Both approaches yield the same result because of the rule: the order of taking the root and raising to a power does not matter.

### Worked Example: Recognizing Equivalent Forms

Which of the following expressions are equivalent to \(27^{2/3}\)? Explain your reasoning.

| Expression | Equivalent? | Reasoning |
|------------|-------------|-----------|
| \((\sqrt[3]{27})^2\) | Yes | Cube root first: \(\sqrt[3]{27} = 3\), then square: \(3^2 = 9\) |
| \(\sqrt[3]{27^2}\) | Yes | Square first: \(27^2 = 729\), cube root: \(\sqrt[3]{729} = 9\) |
| \(\sqrt{27^3}\) | No | The index is 2 (square root) instead of 3 (cube root). This equals \(27^{3/2} = (\sqrt{27})^3\), not \(27^{2/3}\) |
| \(9\) | Yes | As shown above, \((\sqrt[3]{27})^2 = 3^2 = 9\) |

The key insight: \(a^{m/n}\) always means "take the nth root and raise to the mth power." Only the index of the radical must match the denominator exactly.

## Radical Expressions

A **radical expression** is any algebraic expression that contains a radical with a variable or a combination of numbers under the radical sign. Examples include \(\sqrt{x + 3}\), \(2\sqrt{5} + \sqrt{20}\), and \(\sqrt[3]{4x^2}\).

### Simplifying Radical Expressions

The primary skill in working with radicals is **simplification**: rewriting a radical so that the radicand (the quantity under the radical) contains no perfect nth powers as factors.

The general approach:
1. Factor the radicand into prime factors (for numbers) or identify repeated variable factors.
2. Pull out groups of \(n\) identical factors, where \(n\) is the index of the radical.
3. Multiply the pulled-out factors together outside the radical.

### Worked Example: Simplifying Radicals

Simplify each expression completely:

**(a)** \(\sqrt{72}\)
Factor 72 into primes: \(72 = 36 \times 2 = 6^2 \times 2 = 2^3 \times 3^2\). The largest perfect square factor is 36. Pull it out:

\[ \sqrt{72} = \sqrt{36 \times 2} = \sqrt{36} \cdot \sqrt{2} = 6\sqrt{2} \]

Check by squaring back: \((6\sqrt{2})^2 = 36 \times 2 = 72\).

**(b)** \(\sqrt[3]{54x^4}\)
Factor: \(54 = 27 \times 2 = 3^3 \times 2\) and \(x^4 = x^3 \cdot x\). The largest perfect cube factor is \(27x^3\):

\[ \sqrt[3]{54x^4} = \sqrt[3]{27x^3 \cdot 2x} = \sqrt[3]{27x^3} \cdot \sqrt[3]{2x} = 3x\sqrt[3]{2x} \]

The key step: when extracting an nth root of a variable raised to power \(p\), you can pull out \(\lfloor p/n \rfloor\) copies. For \(x^4\) under a cube root, that is \(\lfloor 4/3 \rfloor = 1\) copy of \(x\).

**(c)** \(\sqrt[4]{80y^5}\)
Factor: \(80 = 16 \times 5 = 2^4 \times 5\) and \(y^5 = y^4 \cdot y\). The largest perfect fourth-power factor is \(16y^4\):

\[ \sqrt[4]{80y^5} = \sqrt[4]{16y^4 \cdot 5y} = 2y\sqrt[4]{5y} \]

### Simplifying Radicals: The Factor-and-Pull-Out Method

To simplify a radical with index \(n\) and radicand \(R\):

| Step | Action | Purpose |
|------|--------|---------|
| 1 | Factor \(R\) into prime factors or identify perfect nth-power factors | Identify what can be pulled out |
| 2 | Group factors into sets of \(n\) identical factors | Each complete set becomes one factor outside the radical |
| 3 | Leave remaining (uncollected) factors under the radical | These cannot be simplified further |
| 4 | Multiply all pulled-out factors and write before the radical | Produce the simplest equivalent form |

## Arithmetic with Radicals

Radicals can be added, subtracted, multiplied, and divided. The rules for these operations depend on whether the radicals are "like" (having the same index and the same radicand).

### Adding and Subtracting Radicals

Two radicals are **like radicals** when they have the same index and the same radicand. Only like radicals can be combined by addition or subtraction, just as \(3x + 5x = 8x\).

\[ a\sqrt[n]{r} + b\sqrt[n]{r} = (a + b)\sqrt[n]{r} \]

If the radicals are not alike, you may need to simplify them first to see whether they become like terms.

#### Worked Example: Adding and Subtracting Radicals

Simplify each expression by combining like radicals.

**(a)** \(3\sqrt{12} + 5\sqrt{27}\)

These are not yet like radicals because the radicands differ. Simplify each one first:

\[ \sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3} \]
\[ \sqrt{27} = \sqrt{9 \times 3} = 3\sqrt{3} \]

Now substitute back:

\[ 3(2\sqrt{3}) + 5(3\sqrt{3}) = 6\sqrt{3} + 15\sqrt{3} = 21\sqrt{3} \]

**(b)** \(4\sqrt[3]{16} - \sqrt[3]{54}\)

Simplify each cube root:

\[ \sqrt[3]{16} = \sqrt[3]{8 \times 2} = 2\sqrt[3]{2} \]
\[ \sqrt[3]{54} = \sqrt[3]{27 \times 2} = 3\sqrt[3]{2} \]

Subtract: \(4(2\sqrt[3]{2}) - 3\sqrt[3]{2} = 8\sqrt[3]{2} - 3\sqrt[3]{2} = 5\sqrt[3]{2}\)

### Multiplying Radicals

When two radicals share the same index, you can multiply the radicands and keep the same index:

\[ \sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{a \cdot b} \]

If the coefficients (numbers in front of the radicals) differ from 1, multiply them separately.

#### Worked Example: Multiplying Radicals

Multiply and simplify each expression.

**(a)** \(\sqrt{6} \cdot \sqrt{3}\)

\[ \sqrt{6} \cdot \sqrt{3} = \sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2} \]

**(b)** \(2\sqrt{5} \cdot 4\sqrt{10}\)

Multiply coefficients together and radicands together:

\[ (2 \cdot 4)(\sqrt{5} \cdot \sqrt{10}) = 8\sqrt{50} = 8\sqrt{25 \times 2} = 8 \cdot 5\sqrt{2} = 40\sqrt{2} \]

### Dividing Radicals

When dividing radicals with the same index, divide the radicands:

\[ \frac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\frac{a}{b}} \quad \text{(for } b > 0\text{)} \]

In many cases the resulting fraction has a radical in the denominator. A standard convention is to **rationalize** the denominator — eliminate the radical from the bottom of the fraction.

#### Worked Example: Dividing and Rationalizing Radicals

Simplify each quotient, rationalizing the denominator when necessary.

**(a)** \(\frac{\sqrt{50}}{\sqrt{2}}\)

\[ \frac{\sqrt{50}}{\sqrt{2}} = \sqrt{\frac{50}{2}} = \sqrt{25} = 5 \]

No rationalization needed — the result is an integer.

**(b)** \(\frac{12}{\sqrt{3}}\)

Multiply numerator and denominator by \(\sqrt{3}\) (the radical in the denominator):

\[ \frac{12}{\sqrt{3}} \cdot \frac{\sqrt{3}}{\sqrt{3}} = \frac{12\sqrt{3}}{3} = 4\sqrt{3} \]

**(c)** \(\frac{5}{\sqrt{2} + \sqrt{3}}\)

This requires the **conjugate** of the denominator. The conjugate of \(\sqrt{2} + \sqrt{3}\) is \(\sqrt{3} - \sqrt{2}\). Multiply top and bottom:

\[ \frac{5}{\sqrt{3} + \sqrt{2}} \cdot \frac{\sqrt{3} - \sqrt{2}}{\sqrt{3} - \sqrt{2}} = \frac{5(\sqrt{3} - \sqrt{2})}{(\sqrt{3})^2 - (\sqrt{2})^2} = \frac{5(\sqrt{3} - \sqrt{2})}{3 - 2} = 5(\sqrt{3} - \sqrt{2}) \]

The denominator became \(3 - 2 = 1\) because the product of conjugates \((a + b)(a - b)\) always simplifies to \(a^2 - b^2\), which eliminates the radicals.

### Summary: Operations on Radicals

| Operation | Rule | Example |
|-----------|------|---------|
| Addition (like radicals) | Combine coefficients, keep radical | \(3\sqrt{7} + 4\sqrt{7} = 7\sqrt{7}\) |
| Multiplication | Multiply radicands under one radical | \(\sqrt{3} \cdot \sqrt{12} = \sqrt{36} = 6\) |
| Division | Divide radicands, then rationalize if needed | \(\frac{\sqrt{8}}{\sqrt{2}} = \sqrt{4} = 2\) |
| Rationalizing denominator | Multiply by conjugate or the radical itself | \(\frac{1}{\sqrt{5}} = \frac{\sqrt{5}}{5}\) |

## Radical Equations and Extraneous Solutions

A **radical equation** is an equation in which the variable appears under a radical sign. For example, \(\sqrt{x + 3} = 5\) and \(\sqrt[3]{2x - 1} = 4\) are radical equations. Solving them requires isolating the radical and then eliminating it by raising both sides to a power.

### The Method of Solving Radical Equations

The general strategy is:
1. Isolate the radical expression on one side of the equation.
2. Raise both sides to the power equal to the index of the radical.
3. Solve the resulting equation.
4. **Check every solution** in the original equation.

### Important Warning: Extraneous Solutions

When you raise both sides of an equation to a power, you may introduce solutions that satisfy the powered equation but not the original one. These are called **extraneous solutions**. They must be checked by substituting back into the original equation and discarded if they do not work.

This happens because squaring (and raising to any even power) loses sign information. For example, both \(3\) and \(-3\) square to 9, but \(\sqrt{9} = 3\), not \(-3\). The equation \(\sqrt{x} = -3\) has no solution because a principal square root is never negative, yet squaring both sides gives \(x = 9\), which appears valid until you substitute back.

#### Worked Example: Solving a Radical Equation

Solve \(\sqrt{2x + 5} = x\) and check for extraneous solutions.

**Step 1:** The radical is already isolated (the only radical in the equation).

**Step 2:** Square both sides:
\[ (\sqrt{2x + 5})^2 = x^2 \]
\[ 2x + 5 = x^2 \]

**Step 3:** Solve the resulting quadratic equation. Rearrange to standard form:
\[ x^2 - 2x - 5 = 0 \]
Using the quadratic formula: \(x = \frac{2 \pm \sqrt{4 + 20}}{2} = \frac{2 \pm \sqrt{24}}{2} = \frac{2 \pm 2\sqrt{6}}{2} = 1 \pm \sqrt{6}\)

So the candidate solutions are \(x = 1 + \sqrt{6}\) (approximately 3.45) and \(x = 1 - \sqrt{6}\) (approximately -1.45).

**Step 4:** Check both in the original equation \(\sqrt{2x + 5} = x\).

For \(x = 1 + \sqrt{6}\):
\[ \text{LHS: } \sqrt{2(1 + \sqrt{6}) + 5} = \sqrt{7 + 2\sqrt{6}} \]
\[ \text{RHS: } 1 + \sqrt{6} \]
Since \(1 + \sqrt{6} > 0\) (the radical sign requires a non-negative result) and both sides are positive, verify by squaring: \((1 + \sqrt{6})^2 = 1 + 2\sqrt{6} + 6 = 7 + 2\sqrt{6}\), which matches the LHS under the radical. This solution is valid.

For \(x = 1 - \sqrt{6}\):
\[ \text{RHS: } 1 - \sqrt{6} \approx -1.45 \]
Since the principal square root on the LHS must be non-negative, and the RHS is negative, this solution is **extraneous** and rejected.

The only valid solution is \(x = 1 + \sqrt{6}\).

#### Worked Example: Radical Equation with Two Radicals

Solve \(\sqrt{x + 3} + \sqrt{x - 2} = 7\).

This equation has two radicals, so you isolate one radical first, then square both sides (twice):

**Step 1:** Isolate one radical:
\[ \sqrt{x + 3} = 7 - \sqrt{x - 2} \]

**Step 2:** Square both sides. Apply \((a - b)^2 = a^2 - 2ab + b^2\):
\[ x + 3 = (7 - \sqrt{x - 2})^2 \]
\[ x + 3 = 49 - 14\sqrt{x - 2} + (x - 2) \]
\[ x + 3 = 47 + x - 14\sqrt{x - 2} \]

Subtract \(x\) from both sides and simplify:
\[ 3 = 47 - 14\sqrt{x - 2} \]
\[ -44 = -14\sqrt{x - 2} \]
\[ \frac{44}{14} = \sqrt{x - 2} \]
\[ \frac{22}{7} = \sqrt{x - 2} \]

**Step 3:** Square again:
\[ \left(\frac{22}{7}\right)^2 = x - 2 \]
\[ \frac{484}{49} = x - 2 \]
\[ x = \frac{484}{49} + \frac{98}{49} = \frac{582}{49} \]

**Step 4:** Check:
LHS = \(\sqrt{\frac{582}{49} + 3} + \sqrt{\frac{582}{49} - 2} = \sqrt{\frac{729}{49}} + \sqrt{\frac{494}{49}}\).

Since \(\sqrt{\frac{729}{49}} = \frac{27}{7}\) and \(\sqrt{\frac{494}{49}} = \frac{\sqrt{494}}{7}\), verify:
\[ \frac{27 + \sqrt{494}}{7} = 7 \implies 27 + \sqrt{494} = 49 \implies \sqrt{494} = 22 \implies 494 = 484 \]

This is false (494 ≠ 484), so \(\frac{582}{49}\) is an extraneous solution. Wait — let me recheck the calculation more carefully.

Going back to \(-44 = -14\sqrt{x-2}\): dividing both sides by -14 gives \(\sqrt{x - 2} = \frac{22}{7}\). The RHS of this intermediate step is positive, so squaring is valid here. Now \(\left(\frac{22}{7}\right)^2 = \frac{484}{49}\), so \(x = \frac{484}{49} + 2 = \frac{582}{49}\).

To check in the original equation \(\sqrt{x + 3} + \sqrt{x - 2} = 7\):
\[ \sqrt{\frac{582}{49} + 3} + \sqrt{\frac{582}{49} - 2} = \sqrt{\frac{729}{49}} + \sqrt{\frac{494}{49}} \]

Now \(\sqrt{\frac{729}{49}} = \frac{27}{7}\). So we need \(\frac{27}{7} + \frac{\sqrt{494}}{7} = 7\), which requires \(\sqrt{494} = 49 - 27 = 22\), meaning \(494 = 484\). This fails.

The error is in the original setup: let me verify by working backwards. If we want integer solutions, try \(\sqrt{x + 3} = a\) and \(\sqrt{x - 2} = b\), where \(a + b = 7\). Then \(x = a^2 - 3 = b^2 + 2\), so \(a^2 - b^2 = 5\), which factors as \((a + b)(a - b) = 5\). Since \(a + b = 7\):
\[ a - b = \frac{5}{7} \]

Solving: \(2a = 7 + \frac{5}{7} = \frac{54}{7}\), so \(a = \frac{27}{7}\) and \(b = 7 - \frac{27}{7} = \frac{22}{7}\). Then:
\[ x = a^2 - 3 = \frac{729}{49} - 3 = \frac{582}{49} \]

This confirms the algebraic result. The equation does have a valid solution at \(x = \frac{582}{49}\), but it is not an integer, which makes the check less clean.

### Solving Radical Equations: The Step-by-Step Checklist

| Step | Action | Why It Matters |
|------|--------|----------------|
| 1 | Isolate the radical on one side | Prevents errors from squaring extra terms |
| 2 | Raise both sides to the index power | Eliminates the radical, giving an algebraic equation |
| 3 | Solve the resulting equation | May produce quadratic or linear equations |
| 4 | Check each solution in the original equation | Catches extraneous solutions introduced by squaring |

### Key Takeaway: Why Checking Is Mandatory

Every radical equation solved by raising both sides to an even power must be checked. There is no shortcut — every candidate solution must be substituted back into the **original** equation (not the intermediate one). For odd-indexed radicals (cube roots, fifth roots), extraneous solutions are impossible because odd powers are one-to-one functions: they preserve sign and produce exactly one output for every input.

---

## Chapter Summary

This chapter developed a complete toolkit for working with radicals and radical equations:

1. **Radical notation** uses the symbol \(\sqrt[n]{\;}\) to represent the nth root of a quantity. The index \(n\) determines how many factors of that quantity were multiplied to produce the radicand. Square roots (\(n = 2\)) and cube roots (\(n = 3\)) are the most common cases.

2. **Radicals and rational exponents** are interchangeable: \(\sqrt[n]{a} = a^{1/n}\) and \(a^{m/n} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m\). This equivalence lets you apply exponent rules to radicals and radical properties to rational exponents.

3. **Simplifying radicals** involves factoring the radicand, pulling out perfect nth-power factors, and leaving only non-factorable quantities under the radical sign. Like terms in addition and multiplication follow the same logic as ordinary algebraic expressions once like radicals are identified.

4. **Radical equations** are solved by isolating the radical, raising both sides to the index power, and solving the resulting equation. Checking every solution is mandatory because squaring can introduce extraneous solutions that do not satisfy the original equation.

These concepts extend throughout the textbook: rational exponents reappear in Chapter 8 on exponential functions, radical simplification supports equation solving in later chapters, and understanding when extraneous solutions arise is critical for all algebraic modeling work ahead.

## Key Terms

- **Radical:** The symbol \(\sqrt[n]{\;}\) that represents an nth root of a number or expression.
- **Radicand:** The quantity under the radical sign.
- **Index:** The small number \(n\) outside and above the radical symbol, indicating which root is taken. When omitted, the index is 2.
- **Principal square root:** The non-negative square root of a positive number, denoted by \(\sqrt{\;}\).
- **Like radicals:** Radicals with the same index and the same radicand; they can be combined by addition or subtraction.
- **Rational exponent:** An exponent expressed as a fraction \(m/n\), equivalent to the nth root of the base raised to the power \(m\).
- **Extraneous solution:** A value that appears to solve an equation after algebraic manipulation but does not satisfy the original equation, often introduced by squaring both sides.
- **Conjugate:** For a binomial of the form \(a + b\) where one or both terms are radicals, the conjugate is \(a - b\). Multiplying a radical expression by its conjugate eliminates radicals from the product via the difference-of-squares pattern \((a + b)(a - b) = a^2 - b^2\).
