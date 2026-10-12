---
title: "Polynomials and Factoring"
description: "An introduction to polynomial operations and the art of factoring algebraic expressions."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 10:00:00"
version: 1.11
---

# Polynomials and Factoring

## Summary

Students will learn to perform operations on polynomials and master various factoring techniques, such as GCF and trinomial factoring, which are essential for solving higher-degree equations.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Monomial | 331 |
| Binomial | 140 |
| Trinomial | 101 |
| Polynomial | 44 |
| Degree of a Polynomial | 2 |
| Leading Coefficient | 1 |
| Adding Polynomials | 2 |
| Subtracting Polynomials | 1 |
| Multiplying Monomials | 39 |
| Multiplying Polynomials | 38 |
| FOIL Method | 19 |
| Special Product: Square of a Binomial | 9 |
| Special Product: Difference of Squares | 9 |
| Greatest Common Factor (GCF) | 50 |
| Factoring GCF | 49 |
| Factoring Trinomials (a=1) | 17 |
| Factoring Trinomials (a!=1) | 9 |
| Factoring by Grouping | 8 |
| Difference of Two Squares | 8 |
| Perfect Square Trinomial | 8 |
| Completely Factoring | 7 |
| Factoring to Solve Equations | 4 |
| Zero Product Property | 2 |
| Quadratic Form | 1 |
| Factoring as a Tool | 1 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Algebra Foundations](../01-algebra-foundations/index.md)
- [Chapter 2: Exponents and Radicals](../02-exponents-radicals/index.md)
- [Chapter 3: Linear Equations](../03-linear-equations/index.md)

---

## The Building Blocks of Polynomials

Before we can add or multiply complex algebraic expressions, we need to understand the "anatomy" of the expressions we are working with. In the previous chapters, we worked with simple terms like \( 3x \) or \( 5y^2 \). When we combine these into larger structures, we enter the world of polynomials.

### Monomials: The Single-Term Expression

A **monomial** is the simplest form of an algebraic expression. It consists of a single term that is either a number, a variable, or a product of numbers and variables with non-negative integer exponents. For example, \( 7 \), \( x \), and \( -4.5x^2y \) are all monomials. Crucially, a monomial cannot have a variable in the denominator or a negative exponent, as that would move the expression out of the realm of polynomials.

To understand how a monomial works, we look at its components: the **coefficient** (the number multiplying the variable) and the **variable part**. In the monomial \( -5x^3 \), the coefficient is \( -5 \) and the variable part is \( x^3 \).

#### Diagram: Monomial Anatomy

<details markdown="1">
<summary>Monomial Anatomy</summary>
Type: infographic
**sim-id:** monomial-anatomy
**Library:** html
**Status:** Specified
**Bloom Level:** Remember
**Bloom Verb:** Identify
**Learning Objective:** The learner will identify the coefficient and variable part of a monomial.

**Prerequisites:** Coefficient, Variable, Exponent

**Evidence of Mastery:** The learner correctly labels the coefficient and variable part for three different monomials.

**Misconceptions:** Thinking the exponent is part of the coefficient; thinking a term with a variable in the denominator is a monomial.

**Instructional Rationale:** Visual decomposition of the term helps students separate the scaling factor (coefficient) from the growth factor (variable part).

**Content:**
1. Monomial: \( 12x^5 \). Label: 12 $\rightarrow$ Coefficient, \( x^5 \) $\rightarrow$ Variable Part.
2. Monomial: \( - \frac{1}{2}y^2 \). Label: \( - \frac{1}{2} \) $\rightarrow$ Coefficient, \( y^2 \) $\rightarrow$ Variable Part.
3. Monomial: \( 7 \). Label: 7 $\rightarrow$ Coefficient, \( 1 \) (implicit) $\rightarrow$ Variable Part.
4. Non-Monomial: \( \frac{5}{x} \). Label: Not a monomial (variable in denominator).

**Provenance:** Synthetic, illustrative.

**Rules:**- Click on a part of the expression to see its name.
- Correct labels based on the Content list.

**Learner Activity:**
1. The learner is presented with a monomial.
2. The learner clicks on the numeric part; the system highlights it and says "Coefficient".
3. The learner clicks on the variable and exponent; the system highlights it and says "Variable Part".

**Feedback:**
- Correct: "Correct! This is the [name]."
- Incorrect: "Not quite. Try clicking the other part of the expression."

**Starting State:** Shows the expression \( 12x^5 \) with a prompt: "Click the parts of this monomial to identify them."

**Chapter Anchors:** none
</details>

**Worked Example: Identifying Monomials**
*Problem:* Which of the following are monomials?
A) \( 3x^2 \)
B) \( 5x^{-2} \)
C) \( \frac{2}{x+1} \)
D) \( -10 \pi r^2 \)

*Solution:*
- A) \( 3x^2 \) is a product of a number and a variable with a positive integer exponent. **Yes.**
- B) \( 5x^{-2} \) has a negative exponent. **No.**
- C) \( \frac{2}{x+1} \) has variables in the denominator. **No.**
- D) \( -10 \pi r^2 \) is a product of constants (\( -10\pi \)) and a variable with a positive exponent. **Yes.**

### Binomials and Trinomials

When we add or subtract two or more monomials, we create a **polynomial**. Depending on how many non-zero terms are combined, we give them specific names:

1. **Binomial:** A polynomial with exactly two terms.
   *Example:* \( 2x + 5 \) or \( x^2 - 9 \).
2. **Trinomial:** A polynomial with exactly three terms.
   *Example:* \( x^2 + 5x + 6 \) or \( 3y^2 - 2y + 1 \).

It is important to remember that we only count "like terms." If you have \( 2x + 3x + 5 \), this is not a trinomial; it simplifies to \( 5x + 5 \), which is a binomial.

#### Diagram: Polynomial Classification

<details markdown="1">
<summary>Polynomial Classification</summary>
Type: infographic
**sim-id:** poly-classification
**Library:** html
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Classify
**Learning Objective:** The learner will classify expressions as monomials, binomials, or trinomials after simplifying like terms.

**Prerequisites:** Monomial, Binomial, Trinomial, Like Terms

**Evidence of Mastery:** The learner correctly classifies 5 expressions, including at least 2 that require prior simplification.

**Misconceptions:** Classifying by the number of terms *before* simplifying.

**Instructional Rationale:** Force simplification before classification to reinforce the definition of a term.

**Content:**
1. \( 4x + 7 \) $\rightarrow$ Binomial
2. \( 3x^2 - 2x + 5 \) $\rightarrow$ Trinomial
3. \( 8y^3 \) $\rightarrow$ Monomial
4. \( 2x + 3x + 4 \) $\rightarrow$ (Simplifies to \( 5x + 4 \)) $\rightarrow$ Binomial
5. \( x^2 + 2x + x + 1 \) $\rightarrow$ (Simplifies to \( x^2 + 3x + 1 \)) $\rightarrow$ Trinomial

**Provenance:** Synthetic.

**Rules:**
- User must select "Monomial", "Binomial", or "Trinomial".
- If the expression is not simplified, a "Simplify First" warning appears if they guess wrong.

**Learner Activity:**
1. Expression is shown.
2. Learner selects a classification.
3. System provides immediate feedback and shows the simplified form if necessary.

**Feedback:**
- Correct: "Correct! This has [N] terms."
- Incorrect: "Check if any terms can be combined first!"

**Starting State:** Shows \( 4x + 7 \) with options: [Monomial, Binomial, Trinomial].

**Chapter Anchors:** none
</details>

**Worked Example: Classifying Polynomials**
*Problem:* Classify the following expression: \( 5x^2 + 3x - 2x + 7 \).
*Solution:*
1. Identify like terms: \( 3x \) and \( -2x \).
2. Combine them: \( 3x - 2x = 1x \).
3. The simplified expression is \( 5x^2 + x + 7 \).
4. Since there are three non-zero terms, this is a **trinomial**.

### The General Polynomial

A **polynomial** is the general term for an expression consisting of one or more terms. Formally, it is a sum of monomials. While we have special names for 1, 2, and 3 terms, any expression with more than three terms is simply called a polynomial.

#### Diagram: Polynomial Hierarchy

<details markdown="1">
<summary>Polynomial Hierarchy</summary>
Type: infographic
**sim-id:** poly-hierarchy
**Library:** html
**Status:** Specified
**Bloom Level:** Understand
**Bloom Verb:** Recognize
**Learning Objective:** The learner will recognize the nested relationship between monomials, binomials, trinomials, and polynomials.

**Prerequisites:** Monomial, Binomial, Trinomial, Polynomial

**Evidence of Mastery:** The learner correctly places the terms in a Venn diagram.

**Misconceptions:** Thinking that a binomial is not also a polynomial.

**Instructional Rationale:** Use a Venn diagram to show that monomials, binomials, and trinomials are all subsets of the larger category "Polynomials".

**Content:**
- Outer Circle: Polynomials
- Inner Circles: Monomials, Binomials, Trinomials

**Provenance:** Synthetic.

**Rules:**
- Drag and drop labels into the correct circles.

**Learner Activity:**
1. Learner drags " \( 3x \) " into Monomials $\rightarrow$ correctly placed inside Polynomials.
2. Learner drags " \( x + 2 \) " into Binomials $\rightarrow$ correctly placed inside Polynomials.
3. Learner drags " \( x^2 + 2x + 1 \) " into Trinomials $\rightarrow$ correctly placed inside Polynomials.

**Feedback:**
- Correct: "Yes, a [type] is a specific kind of polynomial."
- Incorrect: "Try again. Is this a single term or a combination?"

**Starting State:** An empty Venn diagram with labels at the bottom.

**Chapter Anchors:** none
</details>

**Worked Example: Identifying General Polynomials**
*Problem:* Is \( 4x^3 - 2x^2 + x - 7 \) a polynomial?
*Solution:*
1. Check each term: \( 4x^3 \), \( -2x^2 \), \( x \), and \( -7 \) are all monomials (no negative exponents, no variables in denominators).
2. Since it is a sum of monomials, it is a **polynomial**. Specifically, it has 4 terms, so it doesn't have a special name like "binomial".

### Degree and Leading Coefficients

To describe the "size" and "behavior" of a polynomial, we use two key measurements: the degree and the leading coefficient.

**Degree of a Polynomial:**
The degree is the highest exponent of the variable in the polynomial. If the polynomial is a monomial, the degree is simply the exponent of that variable. For polynomials with multiple terms, the degree is the degree of the term with the highest exponent.

*Example:* In \( 7x^4 - 3x^2 + 2 \), the terms have exponents 4, 2, and 0. The highest is 4, so the **degree is 4**.

**Leading Coefficient:**
The leading coefficient is the coefficient of the term with the highest degree. To find it, you must first write the polynomial in **standard form** (terms ordered from highest degree to lowest degree).

*Example:* In \( 2 + 5x^3 - 4x \), the standard form is \( 5x^3 - 4x + 2 \). The term with the highest degree is \( 5x^3 \), so the **leading coefficient is 5**.

#### Diagram: Degree and Leading Coefficient Finder

<details markdown="1">
<summary>Degree and Leading Coefficient Finder</summary>
Type: infographic
**sim-id:** degree-coeff-finder
**Library:** html
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** Calculate
**Learning Objective:** The learner will determine the degree and leading coefficient of a given polynomial.

**Prerequisites:** Polynomial, Degree, Leading Coefficient

**Evidence of Mastery:** The learner correctly identifies the degree and leading coefficient for 5 polynomials, including those not in standard form.

**Misconceptions:** Thinking the leading coefficient is the first number they see in a non-standard form expression; thinking the degree is the sum of all exponents.

**Instructional Rationale:** Practice moving from an unordered expression to a standard form and extracting the key metrics.

**Content:**
1. \( 3x^2 + 5 \) $\rightarrow$ Deg: 2, LC: 3
2. \( 7 - 2x^3 + 4x \) $\rightarrow$ (Standard: \( -2x^3 + 4x + 7 \)) $\rightarrow$ Deg: 3, LC: -2
3. \( x^5 - 10x^2 + 8x^7 \) $\rightarrow$ (Standard: \( 8x^7 + x^5 - 10x^2 \)) $\rightarrow$ Deg: 7, LC: 8
4. \( 12 \) $\rightarrow$ Deg: 0, LC: 12
5. \( 5x^2 - 5x^2 + 3x \) $\rightarrow$ (Simplifies to \( 3x \)) $\rightarrow$ Deg: 1, LC: 3

**Provenance:** Synthetic.

**Rules:**
- User enters numeric value for Degree and Leading Coefficient.
- System validates against content.

**Learner Activity:**
1. Polynomial is displayed.
2. Learner types degree and leading coefficient.
3. System provides feedback.

**Feedback:**
- Correct: "Correct!"
- Incorrect: "Check the highest exponent first, then find its coefficient."

**Starting State:** Shows \( 3x^2 + 5 \) with input boxes for Degree and Leading Coefficient.

**Chapter Anchors:** none
</details>

**Worked Example: Finding Degree and Leading Coefficient**
*Problem:* Find the degree and leading coefficient of \( f(x) = 4x - 8x^3 + 12 \).
*Solution:*
1. Rewrite in standard form: \( f(x) = -8x^3 + 4x + 12 \).
2. Identify the term with the highest exponent: \( -8x^3 \).
3. The exponent is 3, so the **degree is 3**.
4. The coefficient of that term is -8, so the **leading coefficient is -8**.

## Adding and Subtracting Polynomials

Adding and subtracting polynomials is essentially an exercise in organizing and combining like terms. We treat the polynomial as a collection of terms and group those that have the exact same variable part.

### Adding Polynomials

To add two polynomials, you simply remove the parentheses and combine like terms. Because we are adding, the signs of the terms in the second polynomial remain unchanged.

**The process is:**
1. Identify like terms (terms with the same variable and exponent).
2. Sum their coefficients.
3. Write the final result in standard form.

**Worked Example: Addition**
*Problem:* Add \( (3x^2 - 5x + 8) \) and \( (2x^2 + 7x - 10) \).
*Solution:*
1. Group like terms: \( (3x^2 + 2x^2) + (-5x + 7x) + (8 - 10) \).
2. Combine: \( 5x^2 + 2x - 2 \).
3. The result is already in standard form: \( 5x^2 + 2x - 2 \).

### Subtracting Polynomials

Subtracting polynomials requires one extra, critical step: **distributing the negative sign**. Subtracting a polynomial is the same as adding its opposite.

**The process is:**
1. Distribute the minus sign to every term inside the second polynomial (flip all the signs).
2. Combine like terms as you would in addition.
3. Write the result in standard form.

**Worked Example: Subtraction**
*Problem:* Subtract \( (x^2 - 4x + 2) \) from \( (3x^2 + 2x - 5) \).
*Solution:*
1. Set up the expression: \( (3x^2 + 2x - 5) - (x^2 - 4x + 2) \).
2. Distribute the negative: \( 3x^2 + 2x - 5 - x^2 + 4x - 2 \).
3. Group like terms: \( (3x^2 - x^2) + (2x + 4x) + (-5 - 2) \).
4. Combine: \( 2x^2 + 6x - 7 \).

#### Diagram: Polynomial Addition and Subtraction

<details markdown="1">
<summary>Polynomial Addition and Subtraction</summary>
Type: infographic
**sim-id:** poly-add-sub
**Library:** html
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** Calculate
**Learning Objective:** The learner will correctly add and subtract polynomials, specifically managing the sign flip in subtraction.

**Prerequisites:** Combining Like Terms, Monomial

**Evidence of Mastery:** The learner correctly solves 4 problems (2 addition, 2 subtraction), with the subtraction problems requiring a sign flip on at least 3 terms.

**Misconceptions:** Forgetting to distribute the negative to *all* terms in the second polynomial; combining terms with different exponents (e.g., \( x^2 + x \)).

**Instructional Rationale:** provide a workspace where the "sign flip" is visually highlighted before the combining step.

**Content:**
1. Addition: \( (2x^2 + 3x) + (x^2 - x) \) $\rightarrow$ \( 3x^2 + 2x \)
2. Addition: \( (5x - 2) + (3x + 8) \) $\rightarrow$ \( 8x + 6 \)
3. Subtraction: \( (4x^2 + 2x) - (x^2 + 5x) \) $\rightarrow$ \( 3x^2 - 3x \)
4. Subtraction: \( (x^2 - 3x + 4) - (2x^2 - 5x - 1) \) $\rightarrow$ \( -x^2 + 2x + 5 \)

**Provenance:** Synthetic.

**Rules:**
- User must first click a "Distribute" button for subtraction to see signs change.
- User then drags like terms together to sum them.

**Learner Activity:**
1. Expression is shown.
2. For subtraction, the user clicks "Flip Signs". The signs of the second polynomial change color and value.
3. The user drags like terms into a "combination zone" to see the result.

**Feedback:**
- Correct: "Correct! The like terms combined to [result]."
- Incorrect: "Check the signs! Did you remember to distribute the negative?"

**Starting State:** Shows \( (2x^2 + 3x) + (x^2 - x) \).

**Chapter Anchors:** none
</details>

## Multiplying Polynomials

While adding and subtracting only involve combining like terms, multiplication requires a different approach. Every term in the first polynomial must be multiplied by every term in the second polynomial.

### Multiplying Monomials

Multiplying a monomial by another monomial is the most basic form. We use the **Product Rule for Exponents** (from Chapter 2) and multiply the coefficients.

**The process is:**
1. Multiply the coefficients.
2. Add the exponents of the same variables.

**Worked Example: Monomial Multiplication**
*Problem:* Multiply \( (4x^2y) \) by \( (-3xy^3) \).
*Solution:*
1. Coefficients: \( 4 \cdot (-3) = -12 \).
2. x-variables: \( x^2 \cdot x^1 = x^{2+1} = x^3 \).
3. y-variables: \( y^1 \cdot y^3 = y^{1+3} = y^4 \).
4. Result: \( -12x^3y^4 \).

### Multiplying a Monomial by a Polynomial

To multiply a single term by a polynomial, we use the **Distributive Property**.

**Worked Example: Distribution**
*Problem:* Multiply \( 3x^2 \) by \( (2x^2 - 5x + 4) \).
*Solution:*
1. Distribute to 1st term: \( 3x^2 \cdot 2x^2 = 6x^4 \).
2. Distribute to 2nd term: \( 3x^2 \cdot (-5x) = -15x^3 \).
3. Distribute to 3rd term: \( 3x^2 \cdot 4 = 12x^2 \).
4. Final result: \( 6x^4 - 15x^3 + 12x^2 \).

### Multiplying Two Binomials: The FOIL Method

When multiplying two binomials, the distributive property can feel tedious. Instead, we use the **FOIL** mnemonic to ensure we don't miss any pairs.

**FOIL** stands for:
- **F**irst: Multiply the first terms in each binomial.
- **O**uter: Multiply the outermost terms.
- **I**nner: Multiply the innermost terms.
- **L**ast: Multiply the last terms in each binomial.

**Worked Example: FOIL**
*Problem:* Multiply \( (x + 3)(x - 5) \).
*Solution:*
- **F**irst: \( x \cdot x = x^2 \)
- **O**uter: \( x \cdot (-5) = -5x \)
- **I**nner: \( 3 \cdot x = 3x \)
- **L**ast: \( 3 \cdot (-5) = -15 \)
- Combine all: \( x^2 - 5x + 3x - 15 \).
- Simplify like terms: \( x^2 - 2x - 15 \).

#### Diagram: The FOIL Visualizer

<details markdown="1">
<summary>The FOIL Visualizer</summary>
Type: infographic
**sim-id:** foil-visualizer
**Library:** html
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** Calculate
**Learning Objective:** The learner will use the FOIL method to multiply two binomials and simplify the result.

**Prerequisites:** Distributive Property, Combining Like Terms

**Evidence of Mastery:** The learner correctly identifies the four FOIL products and the final simplified expression for 5 pairs of binomials.

**Misconceptions:** Forgetting to combine the Outer and Inner terms; sign errors when multiplying negative terms.

**Instructional Rationale:** Visually connect the terms with lines to show the multiplication paths.

**Content:**
1. \( (x + 2)(x + 3) \) $\rightarrow$ \( x^2, 3x, 2x, 6 \rightarrow x^2 + 5x + 6 \)
2. \( (x - 4)(x + 1) \) $\rightarrow$ \( x^2, x, -4x, -4 \rightarrow x^2 - 3x - 4 \)
3. \( (2x - 3)(x - 5) \) $\rightarrow$ \( 2x^2, -10x, -3x, 15 \rightarrow 2x^2 - 13x + 15 \)
4. \( (3x + 2)(2x - 1) \) $\rightarrow$ \( 6x^2, -3x, 4x, -2 \rightarrow 6x^2 + x - 2 \)
5. \( (x - 6)(x - 6) \) $\rightarrow$ \( x^2, -6x, -6x, 36 \rightarrow x^2 - 12x + 36 \)

**Provenance:** Synthetic.

**Rules:**
- User clicks on terms in order (F $\rightarrow$ O $\rightarrow$ I $\rightarrow$ L).
- System calculates the product and displays it.
- User then combines the resulting terms.

**Learner Activity:**
1. User clicks first terms $\rightarrow$ system shows "First: [prod]".
2. User clicks outer terms $\rightarrow$ system shows "Outer: [prod]".
3. ... repeat for I and L.
4. User types the final simplified expression.

**Feedback:**
- Correct: "Correct! You've mastered FOIL."
- Incorrect: "Check your signs or the addition of the middle terms."

**Starting State:** Shows \( (x + 2)(x + 3) \) with a prompt: "Click the terms in FOIL order."

**Chapter Anchors:** none
</details>

### General Polynomial Multiplication

To multiply a polynomial by another polynomial (beyond binomials), the FOIL method is no longer sufficient. Instead, we use the general distributive property: **multiply every term in the first polynomial by every term in the second polynomial**, then combine like terms.

**Worked Example: Polynomial Multiplication**
*Problem:* Multiply \( (x^2 - 2x + 3)(x - 4) \).
*Solution:*
1. Multiply \( x \) by every term in the first: \( x(x^2) + x(-2x) + x(3) = x^3 - 2x^2 + 3x \).
2. Multiply \( -4 \) by every term in the first: \( -4(x^2) + -4(-2x) + -4(3) = -4x^2 + 8x - 12 \).
3. Combine the results: \( x^3 - 2x^2 - 4x^2 + 3x + 8x - 12 \).
4. Simplify like terms: \( x^3 - 6x^2 + 11x - 12 \).

## The Art of Factoring

If multiplying polynomials is like expanding a building, **factoring** is like taking it apart to see the original blueprints. Factoring is the process of breaking down a polynomial into a product of simpler polynomials. This is a critical skill because it allows us to solve complex equations by finding the "roots" or "zeros" of the expression.

### The Greatest Common Factor (GCF)

The first step in any factoring problem is always to look for the **Greatest Common Factor (GCF)**. The GCF is the largest expression that divides evenly into every term of the polynomial.

To find the GCF:
1. Find the largest number that divides all coefficients.
2. Identify the variables that appear in *every* term and take the one with the smallest exponent.
3. Combine these to create the GCF.

**Worked Example: Finding the GCF**
*Problem:* Find the GCF of \( 12x^4y^2 \), \( -18x^3y^3 \), and \( 6x^2y^5 \).
*Solution:*
1. Coefficients: The GCF of 12, 18, and 6 is **6**.
2. Variable x: The lowest power is \( x^2 \).
3. Variable y: The lowest power is \( y^2 \).
4. The GCF is \( 6x^2y^2 \).

### Factoring Out the GCF

Once the GCF is identified, we "factor it out" by dividing every term in the polynomial by the GCF and placing the GCF outside a set of parentheses.

**Worked Example: Factoring GCF**
*Problem:* Factor \( 6x^3 + 12x^2 - 18x \).
*Solution:*
1. Find the GCF: The GCF of 6, 12, and -18 is 6. The lowest power of x is \( x^1 \). So, GCF = \( 6x \).
2. Divide each term:
   - \( 6x^3 \div 6x = x^2 \)
   - \( 12x^2 \div 6x = 2x \)
   - \( -18x \div 6x = -3 \)
3. Write as a product: \( 6x(x^2 + 2x - 3) \).

#### Diagram: The GCF Extraction Machine

<details markdown="1">
<summary>The GCF Extraction Machine</summary>
Type: infographic
**sim-id:** gcf-extraction
**Library:** html
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** Calculate
**Learning Objective:** The learner will identify the GCF and rewrite a polynomial as a product of the GCF and a simpler polynomial.

**Prerequisites:** GCF, Monomial, Division of Polynomials

**Evidence of Mastery:** The learner correctly factors 5 polynomials by GCF, including those with multiple variables and coefficients.

**Misconceptions:** Only factoring out the number and forgetting the variable; failing to divide all terms by the GCF.

**Instructional Rationale:** visually represent the "division" process where the GCF is pulled out of each term.

**Content:**
1. \( 4x^2 + 8x \) $\rightarrow$ GCF: \( 4x \), Result: \( 4x(x + 2) \)
2. \( 5y^3 - 10y^2 + 15y \) $\rightarrow$ GCF: \( 5y \), Result: \( 5y(y^2 - 2y + 3) \)
3. \( 12a^2b - 18ab^2 \) $\rightarrow$ GCF: \( 6ab \), Result: \( 6ab(2a - 3b) \)
4. \( -3x^4 + 9x^3 - 12x^2 \) $\rightarrow$ GCF: \( -3x^2 \), Result: \( -3x^2(x^2 - 3x + 4) \)
5. \( 7x^2 + 7 \) $\rightarrow$ GCF: 7, Result: \( 7(x^2 + 1) \)

**Provenance:** Synthetic.

**Rules:**
- User must first enter the GCF.
- If correct, the user then fills in the blanks for the remaining polynomial.

**Learner Activity:**
1. Polynomial is shown.
2. User types the GCF.
3. User fills in the terms inside the parentheses.

**Feedback:**
- Correct: "Correct! You've successfully extracted the GCF."
- Incorrect: "Check your GCF first. Does it divide into every term evenly?"

**Starting State:** Shows \( 4x^2 + 8x \).

**Chapter Anchors:** none
</details>

### Factoring Trinomials (Quadratic Expressions)

A trinomial of the form \( ax^2 + bx + c \) is a quadratic expression. Factoring these is essentially the reverse of the FOIL method.

#### Case 1: Simple Trinomials (\( a = 1 \))

When the leading coefficient is 1, we look for two numbers that **multiply to \( c \)** and **add to \( b \)**.

**Worked Example: Factoring \( a=1 \)**
*Problem:* Factor \( x^2 + 7x + 10 \).
*Solution:*
1. Find factors of 10 that add to 7.
   - 1 and 10 (add to 11) - No
   - 2 and 5 (add to 7) - **Yes!**
2. Write as binomials: \( (x + 2)(x + 5) \).

#### Case 2: Complex Trinomials (\( a \neq 1 \))

When \( a \) is not 1, we often use the **AC Method** (or grouping method).

**The AC Method process:**
1. Multiply \( a \) and \( c \) (the "AC" product).
2. Find two numbers that multiply to \( AC \) and add to \( b \).
3. Split the middle term \( bx \) using these two numbers.
4. Factor by grouping.

**Worked Example: Factoring \( a \neq 1 \)**
*Problem:* Factor \( 2x^2 + 7x + 3 \).
*Solution:*
1. AC product: \( 2 \cdot 3 = 6 \).
2. Factors of 6 that add to 7: 6 and 1.
3. Split the middle term: \( 2x^2 + 6x + 1x + 3 \).
4. Factor by grouping:
   - Group 1: \( 2x^2 + 6x = 2x(x + 3) \)
   - Group 2: \( 1x + 3 = 1(x + 3) \)
5. Result: \( (2x + 1)(x + 3) \).

#### Diagram: Trinomial Factoring Guide

<details markdown="1">
<summary>Trinomial Factoring Guide</summary>
Type: infographic
**sim-id:** trinomial-factoring-guide
**Library:** html
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** Calculate
**Learning Objective:** The learner will choose the correct factoring method (simple vs. AC) and factor trinomials.

**Prerequisites:** GCF, Factoring GCF, FOIL

**Evidence of Mastery:** The learner correctly factors 6 trinomials, 3 with \( a=1 \) and 3 with \( a \neq 1 \).

**Misconceptions:** Using the simple method for \( a \neq 1 \); sign errors when \( c \) is negative.

**Instructional Rationale:** Use a decision tree to help students decide which method to use based on the value of \( a \).

**Content:**
1. \( x^2 + 5x + 6 \) $\rightarrow$ \( a=1 \), factors: 2,3 $\rightarrow$ \( (x+2)(x+3) \)
2. \( x^2 - x - 12 \) $\rightarrow$ \( a=1 \), factors: -4,3 $\rightarrow$ \( (x-4)(x+3) \)
3. \( x^2 - 8x + 15 \) $\rightarrow$ \( a=1 \), factors: -3,-5 $\rightarrow$ \( (x-3)(x-5) \)
4. \( 2x^2 + 5x + 3 \) $\rightarrow$ \( a \neq 1 \), AC=6, factors: 2,3 $\rightarrow$ \( (2x+3)(x+1) \)
5. \( 3x^2 - 2x - 5 \) $\rightarrow$ \( a \neq 1 \), AC=-15, factors: -5,3 $\rightarrow$ \( (3x-5)(x+1) \)
6. \( 6x^2 + 7x - 3 \) $\rightarrow$ \( a \neq 1 \), AC=-18, factors: -2,9 $\rightarrow$ \( (3x-1)(2x+3) \)

**Provenance:** Synthetic.

**Rules:**
- User must first identify if \( a=1 \) or \( a \neq 1 \).
- User then finds the "magic numbers" (factors of AC that add to b).
- User writes the final binomials.

**Learner Activity:**
1. Expression is shown.
2. User selects "Simple Method" or "AC Method".
3. User enters the two factors.
4. User writes the final product.

**Feedback:**
- Correct: "Correct! You found the factors."
- Incorrect: "Check your factors. They must multiply to [C/AC] and add to [B]."

**Starting State:** Shows \( x^2 + 5x + 6 \).

**Chapter Anchors:** none
</details>



### Factoring by Grouping

When a polynomial has four terms, it often cannot be factored using the GCF or the AC method alone. Instead, we use **factoring by grouping**. This involves splitting the polynomial into two pairs, factoring each pair separately, and then identifying a common binomial factor.

**The process is:**
1. Group the first two terms and the last two terms.
2. Factor out the GCF from the first pair.
3. Factor out the GCF from the second pair.
4. If the remaining binomials are identical, factor that binomial out.

**Worked Example: Factoring by Grouping**
*Problem:* Factor \( x^3 + 3x^2 + 4x + 12 \).
*Solution:*
1. Group: \( (x^3 + 3x^2) + (4x + 12) \).
2. Factor first pair: \( x^2(x + 3) \).
3. Factor second pair: \( 4(x + 3) \).
4. Final Result: \( (x^2 + 4)(x + 3) \).

### Special Factoring Patterns

Some polynomials follow specific mathematical patterns that allow us to factor them instantly without using the GCF or grouping methods.

#### 1. Difference of Two Squares

A **Difference of Two Squares** is a binomial where both terms are perfect squares and they are subtracted. It always factors into the product of a sum and a difference of the square roots.
**Formula:** \( a^2 - b^2 = (a - b)(a + b) \)

**Worked Example:**
*Problem:* Factor \( x^2 - 49 \).
*Solution:*
1. Identify square roots: \( \sqrt{x^2} = x \), \( \sqrt{49} = 7 \).
2. Apply formula: \( (x - 7)(x + 7) \).

#### 2. Perfect Square Trinomials

A **Perfect Square Trinomial** is the result of squaring a binomial. It has the form \( a^2 + 2ab + b^2 \) or \( a^2 - 2ab + b^2 \).
**Formula:** \( a^2 \pm 2ab + b^2 = (a \pm b)^2 \)

**Worked Example:**
*Problem:* Factor \( x^2 + 10x + 25 \).
*Solution:*
1. Check if first and last terms are squares: \( \sqrt{x^2} = x \), \( \sqrt{25} = 5 \).
2. Check if middle term is \( 2 \cdot x \cdot 5 = 10x \). Yes.
3. Result: \( (x + 5)^2 \).

#### Diagram: Special Patterns Identifier

<details markdown="1">
<summary>Special Patterns Identifier</summary>
Type: infographic
**sim-id:** special-patterns-id
**Library:** html
**Status:** Specified
**Bloom Level:** Analyze
**Bloom Verb:** Distinguish
**Learning Objective:** The learner will distinguish between a difference of squares, a perfect square trinomial, and a non-factorable expression.

**Prerequisites:** Perfect Square, GCF

**Evidence of Mastery:** The learner correctly identifies the pattern for 8 expressions.

**Misconceptions:** Trying to factor a "Sum of Squares" (e.g., \( x^2 + 9 \)), which is not factorable over real numbers.

**Instructional Rationale:** contrasting a factorable pattern with a "trap" (non-factorable) expression to build critical thinking.

**Content:**
1. \( x^2 - 16 \) $\rightarrow$ Difference of Squares
2. \( x^2 + 6x + 9 \) $\rightarrow$ Perfect Square Trinomial
3. \( x^2 + 25 \) $\rightarrow$ Not Factorable (Sum of Squares)
4. \( 4x^2 - 12x + 9 \) $\rightarrow$ Perfect Square Trinomial
5. \( 9x^2 - 1 \) $\rightarrow$ Difference of Squares
6. \( x^2 - 10x + 20 \) $\rightarrow$ Not a Special Pattern (use AC method)
7. \( 25x^2 - 49y^2 \) $\rightarrow$ Difference of Squares
8. \( x^2 + 4x + 5 \) $\rightarrow$ Not Factorable

**Provenance:** Synthetic.

**Rules:**
- User drags the expression to the correct pattern label.
- "Not Factorable" is a valid option.

**Learner Activity:**
1. Expression is shown.
2. User drags it to "Diff of Squares", "Perf Sq Trinomial", or "Not Factorable".

**Feedback:**
- Correct: "Correct! This matches the [pattern] pattern."
- Incorrect: "Not quite. Check if it's a difference of squares or a perfect square."

**Starting State:** Shows \( x^2 - 16 \).

**Chapter Anchors:** none
</details>

### Completely Factoring

In many cases, a polynomial requires multiple steps to be **completely factored**. The golden rule is: **Always factor out the GCF first**, then check for special patterns or trinomial factoring.

**Worked Example: Complete Factoring**
*Problem:* Factor completely \( 2x^3 - 8x \).
*Solution:*
1. Factor GCF: GCF is \( 2x \). Result: \( 2x(x^2 - 4) \).
2. Check remaining binomial: \( x^2 - 4 \) is a Difference of Two Squares.
3. Factor the binomial: \( (x - 2)(x + 2) \).
4. Final Result: \( 2x(x - 2)(x + 2) \).

### Factoring to Solve Equations

The ultimate purpose of factoring in Algebra I is to solve equations. This is made possible by the **Zero Product Property**.

**Zero Product Property:** If the product of two or more factors is zero, then at least one of the factors must be zero.
If \( A \cdot B = 0 \), then \( A = 0 \) or \( B = 0 \).

**The process for solving equations by factoring:**
1. Set the equation to zero (all terms on one side).
2. Factor the polynomial completely.
3. Set each factor equal to zero.
4. Solve the resulting simple equations.

**Worked Example: Solving by Factoring**
*Problem:* Solve \( x^2 - 5x + 6 = 0 \).
*Solution:*
1. Factor the trinomial: \( (x - 2)(x - 3) = 0 \).
2. Apply Zero Product Property:
   - \( x - 2 = 0 \rightarrow x = 2 \)
   - \( x - 3 = 0 \rightarrow x = 3 \)
3. Solutions: \( x = \{2, 3\} \).

#### Diagram: Factor-to-Solve Flowchart

<details markdown="1">
<summary>Factor-to-Solve Flowchart</summary>
Type: infographic
**sim-id:** factor-solve-flow
**Library:** html
**Status:** Specified
**Bloom Level:** Apply
**Bloom Verb:** Solve
**Learning Objective:** The learner will solve quadratic equations by following the factoring-to-solution workflow.

**Prerequisites:** Completely Factoring, Zero Product Property

**Evidence of Mastery:** The learner correctly solves 5 quadratic equations by identifying the correct sequence of steps.

**Misconceptions:** Solving before setting to zero; forgetting the second root.

**Instructional Rationale:** provide a step-by-step interactive guide that requires the user to complete one step before moving to the next.

**Content:**
1. \( x^2 + 3x - 10 = 0 \) $\rightarrow$ Factors: \( (x+5)(x-2) \) $\rightarrow$ Roots: -5, 2
2. \( 2x^2 - 8 = 0 \) $\rightarrow$ GCF: \( 2(x^2-4) \) $\rightarrow$ Factors: \( 2(x-2)(x+2) \) $\rightarrow$ Roots: 2, -2
3. \( x^2 - 6x + 9 = 0 \) $\rightarrow$ Factor: \( (x-3)^2 \) $\rightarrow$ Root: 3
4. \( x^2 + x - 12 = 0 \) $\rightarrow$ Factors: \( (x+4)(x-3) \) $\rightarrow$ Roots: -4, 3
5. \( 3x^2 + 10x + 3 = 0 \) $\rightarrow$ Factors: \( (3x+1)(x+3) \) $\rightarrow$ Roots: -1/3, -3

**Provenance:** Synthetic.

**Rules:**
- User must enter the factored form before the roots are revealed.
- User must set the equation to 0 first.

**Learner Activity:**
1. Equation is shown.
2. User checks "Set to Zero".
3. User enters factored form.
4. User enters the roots.

**Feedback:**
- Correct: "Perfect! The roots are [roots]."
- Incorrect: "Check your factoring first."

**Starting State:** Shows \( x^2 + 3x - 10 = 0 \).

**Chapter Anchors:** none
</details>

## Summary and Key Takeaways

Factoring is the essential process of decomposing complex polynomials into simpler products. By mastering the GCF, trinomial patterns, and special identities, we can simplify expressions and solve quadratic equations efficiently.

**Key Checklist for Factoring:**
- [ ] Did I factor out the GCF first?
- [ ] If there are 2 terms, is it a Difference of Two Squares?
- [ ] If there are 3 terms, is it a Perfect Square Trinomial or a standard trinomial?
- [ ] If there are 4 terms, can I use grouping?
- [ ] Did I factor *completely* (check if the results can be factored further)?
- [ ] When solving, did I set the equation to 0 before factoring?

