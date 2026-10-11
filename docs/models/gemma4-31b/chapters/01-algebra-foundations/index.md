---
title: "Algebra Foundations"
description: "An introduction to variables, constants, and the basic properties of algebraic expressions."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 10:00:00"
version: 1.11
---

# Algebra Foundations

## Summary

This chapter introduces the basic building blocks of algebra, including variables, constants, and the fundamental properties of operations. Students will learn to translate verbal expressions into algebraic form and simplify expressions using the order of operations.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Variable | 4011 |
| Constant | 5858 |
| Coefficient | 872 |
| Algebraic Expression | 871 |
| Term | 1 |
| Order of Operations | 1779 |
| Commutative Property | 429 |
|  Associative Property | 429 |
| Distributive Property | 428 |
| Identity Property | 2 |
| Inverse Property | 1 |
| Evaluating Expressions | 2 |
| Substitution | 1 |
| Simplifying Expressions | 415 |
| Like Terms | 6 |
| Combining Like Terms | 3 |
| Absolute Value | 3 |
| Integer | 2332 |
| Rational Number | 2310 |
| Real Number System | 1128 |
| Algebraic Translation | 2 |
| Verbal Expression | 1 |
| Numerical Expression | 1 |
| Order of Operations (PEMDAS) | 1 |
| Grouping Symbols | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

## The Architecture of Numbers

Before we dive into algebra, we must understand the landscape of numbers we are working with. In mathematics, numbers are organized into a hierarchy called the **Real Number System**.

A **Real Number** is any value that can be represented on a continuous number line. This includes everything from the simple whole numbers we use for counting to the complex decimals found in scientific measurements.

To understand the structure of real numbers, we categorize them into nested sets. The largest set is the Real Numbers, which contains **Rational Numbers**. A rational number is any number that can be expressed as a fraction $p/q$, where $p$ and $q$ are integers and $q$ is not zero. Within rational numbers, we find **Integers**, which are whole numbers and their negative opposites (..., -2, -1, 0, 1, 2, ...).

Before we examine how these sets fit together, let's look at a diagram of the hierarchy.

#### Diagram: The Real Number System Hierarchy

<details markdown="1">
<summary>The Real Number System Hierarchy</summary>
Type: infographic
**sim-id:** real-number-hierarchy<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Classify<br/>
**Learning Objective:** The learner will classify a given number into its most specific subset of the real number system.

**Prerequisites:** Real Number, Rational Number, Integer

**Evidence of Mastery:** The learner drags a number (e.g., -5, 0.75, $\pi$) into the correct nested circle (Integer $\rightarrow$ Rational $\rightarrow$ Real).

**Misconceptions:** Thinking that integers are the only numbers with signs (+/-), or that decimals are not rational.

**Instructional Rationale:** Visualizing the "nested" nature of these sets prevents the common error of thinking a number is *either* an integer *or* a rational number.

**Content:**
- Set 1 (Outer): Real Numbers (Includes all others)
- Set 2 (Middle): Rational Numbers (Includes integers, fractions, terminating decimals)
- Set 3 (Inner): Integers (Includes whole numbers and negatives)
- Test Items: 
  - -7 (Integer)
  - 3/4 (Rational)
  - 0.5 (Rational)
  - 12 (Integer)
  - $\sqrt{2}$ (Real)

**Provenance:** synthetic

**Rules:** 
- Correct if placed in the smallest possible circle.
- $\sqrt{2}$ must be in Real but outside Rational.

**Learner Activity:** 
1. View the nested circles.
2. Drag the provided number to the smallest circle it fits into.
3. Receive feedback on whether the classification is correct.

**Feedback:**
- Correct: "Correct! This is a [Type] number."
- Incorrect: "Not quite. Remember that [Explanation]."

**Starting State:** The hierarchy displayed with 5 numbers listed below.

**Chapter Anchors:** none
</details>

**Worked Example: Classifying Numbers**
Suppose you are given the number $-4$. 
1. Is it a real number? Yes, it exists on the number line.
2. Is it rational? Yes, it can be written as $-4/1$.
3. Is it an integer? Yes, it is a whole number with a negative sign.
The most specific classification for $-4$ is an **Integer**.

---

## From Arithmetic to Algebra: The Language of Symbols

Arithmetic deals with concrete numbers (e.g., $5 + 3$). Algebra, however, introduces symbols to represent unknown or changing values. This transition allows us to describe general patterns rather than specific calculations.

A **Variable** is a symbol, usually a letter like $x$ or $y$, used to represent a value that can change or is currently unknown. In contrast, a **Constant** is a fixed value that does not change, such as the number $7$ or $\pi$.

When a variable is multiplied by a number, that number is called the **Coefficient**. For example, in the expression $5x$, $5$ is the coefficient and $x$ is the variable.

To see how these components interact, consider the following mapping.

#### Diagram: Components of an Algebraic Term

<details markdown="1">
<summary>Components of an Algebraic Term</summary>
Type: infographic
**sim-id:** term-anatomy<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** Identify<br/>
**Learning Objective:** The learner will identify the coefficient, variable, and constant in a given algebraic expression.

**Prerequisites:** Variable, Constant, Coefficient

**Evidence of Mastery:** The learner clicks on parts of an expression (e.g., $3x + 7$) and correctly labels them as "Coefficient", "Variable", or "Constant".

**Misconceptions:** Confusing the coefficient with the variable, or thinking the sign (+/-) is not part of the coefficient.

**Instructional Rationale:** Direct identification of components in a real expression bridges the gap between abstract definitions and symbolic manipulation.

**Content:**
- Expression: $4y - 12$
- Labels: 
  - 4: Coefficient
  - y: Variable
  - -12: Constant

**Provenance:** illustrative

**Rules:** 
- Correct if the correct label is applied to the correct part of the expression.

**Learner Activity:** 
1. View the expression $4y - 12$.
2. Click on a part of the expression.
3. Select the correct label from a dropdown.

**Feedback:**
- Correct: "Correct!"
- Incorrect: "Incorrect. This part is the [Label]."

**Starting State:** Expression $4y - 12$ displayed with interactive regions.

**Chapter Anchors:** none
</details>

**Worked Example: Identifying Parts**
Look at the expression: $7n - 3$.
- The **variable** is $n$.
- The **coefficient** is $7$.
- The **constant** is $-3$.

A combination of these elements forms an **Algebraic Expression**. An expression is a mathematical phrase that contains numbers, variables, and operators, but *no equals sign* (if it had an equals sign, it would be an equation). An expression is made up of one or more **Terms**. A term can be a single number, a single variable, or a product of numbers and variables (like $5x^2$). Terms are separated by addition or subtraction signs.

---

## Translating English to Algebra

Before we can solve problems, we must be able to translate "word problems" into mathematical symbols. This process is called **Algebraic Translation**.

We often work with **Verbal Expressions** (words) and **Numerical Expressions** (numbers only). The goal is to turn these into algebraic expressions.

Common translation keys include:
- "Sum" or "Increased by" $\rightarrow$ Addition ($+$)
- "Difference" or "Decreased by" $\rightarrow$ Subtraction ($-$)
- "Product" or "Times" $\rightarrow$ Multiplication ($\times$)
- "Quotient" or "Ratio" $\rightarrow$ Division ($\div$)

To practice this, use the interactive translator below.

#### Diagram: The Word-to-Math Translator

<details markdown="1">
<summary>The Word-to-Math Translator</summary>
Type: microsim
**sim-id:** algebra-translator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** Translate<br/>
**Learning Objective:** The learner will translate verbal phrases into algebraic expressions using correct operators and variables.

**Prerequisites:** Variable, Algebraic Expression, Verbal Expression

**Evidence of Mastery:** The learner correctly types the algebraic equivalent of a verbal phrase (e.g., "five less than x" $\rightarrow$ $x - 5$).

**Misconceptions:** Order of subtraction (translating "5 less than x" as $5 - x$ instead of $x - 5$).

**Instructional Rationale:** Translation is a critical "bridge" skill. Immediate feedback on the order of operations in subtraction/division is essential.

**Content:**
- Phrases:
  - "The sum of x and 10" $\rightarrow$ $x + 10$
  - "The product of 3 and y" $\rightarrow$ $3y$
  - "8 decreased by z" $\rightarrow$ $8 - z$
  - "Five less than w" $\rightarrow$ $w - 5$
  - "The quotient of m and 4" $\rightarrow$ $m/4$

**Provenance:** synthetic

**Rules:** 
- Correct if the expression is mathematically equivalent.
- "Less than" must trigger a reversal of terms.

**Learner Activity:** 
1. Read the verbal phrase.
2. Type the algebraic expression in the input box.
3. Press "Check" to verify.

**Feedback:**
- Correct: "Correct! You translated it perfectly."
- Incorrect: "Not quite. Be careful with the order of terms in subtraction."

**Starting State:** First phrase "The sum of x and 10" is displayed.

**Chapter Anchors:** none
</details>

---

## The Rules of the Game: Order of Operations

When an expression contains multiple operations, we need a consistent set of rules to decide which one to do first. These are the **Order of Operations**, often remembered by the acronym **PEMDAS**.

The order is as follows:
1. **P**arentheses (and other **Grouping Symbols** like brackets $[ ]$ or braces $\{ \}$)
2. **E**xponents
3. **M**ultiplication and **D**ivision (from left to right)
4. **A**ddition and **S**ubtraction (from left to right)

It is a common mistake to think multiplication *always* comes before division. In reality, they have equal priority and are handled in the order they appear from left to right.

The following table summarizes the PEMDAS priority.

| Priority | Operation | Example |
|-----------|-----------|---------|
| 1 | Parentheses/Grouping | $(5 + 2)$ |
| 2 | Exponents | $3^2$ |
| 3 | Multiplication & Division | $10 \div 2$ |
| 4 | Addition & Subtraction | $7 - 4$ |

To visualize how a complex expression is "unwrapped," look at the flowchart below.

#### Diagram: PEMDAS Execution Flow

<details markdown="1">
<summary>PEMDAS Execution Flow</summary>
Type: workflow
**sim-id:** pemdas-flow<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Deconstruct<br/>
**Learning Objective:** The learner will deconstruct a complex numerical expression into its correct sequence of operations.

**Prerequisites:** Order of Operations, Grouping Symbols

**Evidence of Mastery:** The learner correctly orders a set of operation steps for a given expression.

**Misconceptions:** Performing addition before subtraction even if subtraction is on the left.

**Instructional Rationale:** By forcing the learner to sequence the steps before calculating, we isolate the "order" logic from the "arithmetic" logic.

**Content:**
- Expression: $12 + (6 \times 2^2) \div 3$
- Correct Sequence:
  1. Exponent ($2^2 = 4$)
  2. Parentheses ($6 \times 4 = 24$)
  3. Division ($24 \div 3 = 8$)
  4. Addition ($12 + 8 = 20$)

**Provenance:** synthetic

**Rules:** 
- Correct if the steps are in the exact PEMDAS order.

**Learner Activity:** 
1. View the expression.
2. Drag the operation steps into the correct order.
3. Submit for verification.

**Feedback:**
- Correct: "Perfect! You followed the order of operations exactly."
- Incorrect: "Check your order. Remember that exponents happen before multiplication."

**Starting State:** The expression and a jumbled list of steps are displayed.

**Chapter Anchors:** none
</details>

**Worked Example: Applying PEMDAS**
Simplify: $10 + 2 \times (5 - 3)^2$
1. **Parentheses:** $(5 - 3) = 2$. Expression becomes $10 + 2 \times 2^2$.
2. **Exponents:** $2^2 = 4$. Expression becomes $10 + 2 \times 4$.
3. **Multiplication:** $2 \times 4 = 8$. Expression becomes $10 + 8$.
4. **Addition:** $10 + 8 = 18$.
Final Answer: $18$.

---

## Properties of Operations

Algebra relies on several fundamental properties that allow us to rewrite expressions in simpler forms without changing their value.

### 1. Commutative and Associative Properties
The **Commutative Property** states that the order of the numbers does not change the result for addition or multiplication. 
- Addition: $a + b = b + a$
- Multiplication: $a \times b = b \times a$

The **Associative Property** states that the way numbers are grouped does not change the result.
- Addition: $(a + b) + c = a + (b + c)$
- Multiplication: $(a \times b) \times c = a \times (b \times c)$

#### Diagram: Commutative vs Associative Visualization

<details markdown="1">
<summary>Commutative vs Associative Visualization</summary>
Type: infographic
**sim-id:** prop-viz<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Distinguish<br/>
**Learning Objective:** The learner will distinguish between the commutative property (swapping order) and the associative property (changing grouping).

**Prerequisites:** Commutative Property, Associative Property

**Evidence of Mastery:** The learner correctly identifies whether a pair of expressions demonstrates a commutative or associative shift.

**Misconceptions:** Confusing the two because both involve "rearranging" numbers.

**Instructional Rationale:** Visual animation of "swapping" (commutative) vs "regrouping" (associative) provides a concrete mental model.

**Content:**
- Case 1: $2 + 3 \rightarrow 3 + 2$ (Commutative)
- Case 2: $(2 + 3) + 4 \rightarrow 2 + (3 + 4)$ (Associative)
- Case 3: $5 \times 6 \rightarrow 6 \times 5$ (Commutative)
- Case 4: $(5 \times 6) \times 7 \rightarrow 5 \times (6 \times 7)$ (Associative)

**Provenance:** illustrative

**Rules:** 
- Correct if the property is identified correctly.

**Learner Activity:** 
1. Watch an animation of the numbers moving.
2. Select "Commutative" or "Associative".

**Feedback:**
- Correct: "Correct!"
- Incorrect: "Incorrect. Notice if the order changed or just the parentheses."

**Starting State:** First animation (Case 1) is shown.

**Chapter Anchors:** none
</details>

### 2. The Distributive Property
The **Distributive Property** is one of the most powerful tools in algebra. It allows us to multiply a single term by a group of terms inside parentheses.
Formula: $a(b + c) = ab + ac$

**Worked Example: Distributing a Variable**
Simplify: $3(x + 4)$
1. Multiply $3$ by the first term ($x$): $3 \times x = 3x$.
2. Multiply $3$ by the second term ($4$): $3 \times 4 = 12$.
3. Combine them: $3x + 12$.

### 3. Identity and Inverse Properties
The **Identity Property** describes numbers that, when used in an operation, leave the other number unchanged.
- Additive Identity: $a + 0 = a$ (Zero is the identity)
- Multiplicative Identity: $a \times 1 = a$ (One is the identity)

The **Inverse Property** describes how to "undo" a number to return to the identity.
- Additive Inverse: $a + (-a) = 0$
- Multiplicative Inverse: $a \times (1/a) = 1$

---

## Evaluating and Simplifying Expressions

Once we have a mathematical expression, we often need to find its numerical value or rewrite it in a simpler form.

### Evaluating Expressions
To evaluate an expression, we use **Substitution**. This is the process of replacing every variable in the expression with a specific number.

**Worked Example: Substitution**
Evaluate $5x - 2$ when $x = 4$.
1. Substitute $4$ for $x$: $5(4) - 2$.
2. Follow PEMDAS (Multiply first): $20 - 2$.
3. Subtract: $18$.

### Simplifying Expressions
Simplifying an expression means rewriting it so it has the fewest terms possible. To do this, we look for **Like Terms**. Like terms are terms that have the exact same variables raised to the exact same powers. Only the coefficients can be different.

For example:
- $3x$ and $5x$ are like terms.
- $4y^2$ and $2y^2$ are like terms.
- $3x$ and $3y$ are NOT like terms (different variables).
- $5x$ and $5x^2$ are NOT like terms (different powers).

The process of adding or subtracting these is called **Combining Like Terms**.

#### Diagram: The Like-Terms Sorter

<details markdown="1">
<summary>The Like-Terms Sorter</summary>
Type: infographic
**sim-id:** like-term-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Categorize<br/>
**Learning Objective:** The learner will categorize a list of algebraic terms into groups of like terms.

**Prerequisites:** Like Terms, Simplifying Expressions

**Evidence of Mastery:** The learner correctly groups terms (e.g., $2x, -5x, 7x$ together; $3y, 4y$ together).

**Misconceptions:** Thinking terms are "like" if they have the same coefficient (e.g., $3x$ and $3y$).

**Instructional Rationale:** Physical grouping reinforces the idea that coefficients are irrelevant to whether terms are "like."

**Content:**
- Terms to sort: $3x, 4y, -2x, 5, 7y, -1, 0.5x, -10$
- Expected Groups: 
  - x-group: $3x, -2x, 0.5x$
  - y-group: $4y, 7y$
  - constant-group: $5, -1, -10$

**Provenance:** synthetic

**Rules:** 
- Correct if all terms are in the correct group.

**Learner Activity:** 
1. Drag terms into "buckets" labeled by variable.
2. Submit for verification.

**Feedback:**
- Correct: "Correct! You've grouped all like terms."
- Incorrect: "Check your groups. Remember, like terms must have the same variable and power."

**Starting State:** Terms scattered on screen with three empty buckets.

**Chapter Anchors:** none
</details>

**Worked Example: Combining Like Terms**
Simplify: $4x + 7 - 2x + 3$
1. Identify like terms: $(4x, -2x)$ and $(7, 3)$.
2. Combine x-terms: $4x - 2x = 2x$.
3. Combine constants: $7 + 3 = 10$.
4. Result: $2x + 10$.

---

## Absolute Value

Finally, we introduce the concept of distance in algebra. The **Absolute Value** of a number is its distance from zero on the number line, regardless of direction. Because distance can never be negative, the absolute value is always positive or zero.

It is denoted by vertical bars: $|-5| = 5$ and $|5| = 5$.

**Example:**
If you move 5 steps to the left of zero, you are at $-5$. However, the *distance* you traveled is 5 units. Therefore, $|-5| = 5$.

## Chapter Summary

In this chapter, we transitioned from basic arithmetic to the symbolic language of algebra. We learned:
- The **Real Number System** hierarchy: Real $\rightarrow$ Rational $\rightarrow$ Integer.
- The anatomy of an expression: **Variables**, **Constants**, and **Coefficients**.
- How to **Translate** verbal phrases into algebraic symbols.
- The **PEMDAS** order of operations to ensure consistent calculations.
- The **Properties of Operations** (Commutative, Associative, and Distributive) that allow us to rewrite expressions.
- How to **Evaluate** expressions through substitution and **Simplify** them by combining like terms.
- The concept of **Absolute Value** as distance from zero.
