---
title: "Algebra Foundations and Basic Operations"
description: "An introduction to the fundamental building blocks of algebra, including variables, expressions, and the order of operations."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 10:00:00"
version: 1.11
---
# Algebra Foundations and Basic Operations

## Summary

This chapter introduces key algebraic concepts, building on foundational knowledge to develop new skills in modeling and problem-solving.

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Algebra Foundations | 3897 |
| Order of Operations | 17 |
| Exponents | 1112 |
| Linear Inequalities | 6 |
| Absolute Value Equations | 3 |
| Function Concept | 345 |
| Piecewise Functions | 4 |
| Systems of Linear Equations | 8 |
| Linear Inequalities Systems | 2 |
| Factoring Quadratic Equations | 1 |
| Solving by Square Roots | 1 |
| Comparing Function Models | 1 |
| Arithmetic Sequences | 6 |
| Arithmetic Means | 4 |
| Algebraic Reasoning | 19 |

## Algebra Foundations

To begin our journey into algebra, we must first understand the language used to describe mathematical relationships. In arithmetic, we work with concrete numbers: \( 5 + 3 = 8 \). However, real-world situations are often more complex. We might know that a taxi charges a flat fee plus a rate per mile, but we don't know exactly how many miles a passenger will travel. Algebra allows us to use symbols to represent these unknown quantities, creating a mathematical "template" that can be applied to any specific case.

### Variables, Constants, and Coefficients

In algebra, we use symbols to represent numbers that can change or are not yet known. These symbols are called **variables**. For example, in the expression \( 3x + 5 \), the letter \( x \) is a variable. It acts as a placeholder for any value we choose to plug into the expression.

A **constant** is a value that does not change. In the same expression, the number \( 5 \) is a constant because its value remains fixed regardless of what \( x \) is. Constants provide the fixed points or starting values in our mathematical models.

When a number is multiplied by a variable, it is called a **coefficient**. In the term \( 3x \), the number \( 3 \) is the coefficient of \( x \). It tells us how many "copies" of the variable we have. For instance, if \( x \) represents the number of apples, \( 3x \) represents three times that number of apples.

#### Diagram: Anatomy of an Algebraic Expression

<details markdown="1">
<summary>Anatomy of an Expression</summary>
Type: diagram
**sim-id:** algebraic-expression-anatomy<br/>
**Library:** mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** describe<br/>
**Learning Objective:** The learner will describe the role of variables, constants, and coefficients in a given algebraic expression.

**Prerequisites:** None

**Evidence of Mastery:** The learner can correctly label the variable, constant, and coefficient in a new expression like \( -7y + 12 \).

**Misconceptions:** Confusing a coefficient with a constant, or thinking a variable must always be \( x \).

**Instructional Rationale:** Visualizing the components of an expression helps anchor the abstract terminology to a concrete structure.

**Content:**
- Expression: \( 3x + 5 \)
- Coefficient: \( 3 \)
- Variable: \( x \)
- Constant: \( 5 \)
- Term: \( 3x \) and \( 5 \)

**Provenance:** Illustrative

**Rules:** A term is separated from others by addition or subtraction.

**Learner Activity:**
1. Observe the diagram of \( 3x + 5 \).
2. Identify the parts.
3. Apply the identification to a new expression.

**Feedback:** If the learner identifies \( 5 \) as a coefficient, explain that \( 5 \) is not attached to a variable.

**Starting State:** An image showing \( 3x + 5 \) with arrows pointing to its parts.

**Chapter Anchors:** variables, constants, coefficients, terms, expressions
</details>

### Terms and Expressions

An **expression** is a mathematical phrase that combines numbers, variables, and operation symbols (like \( +, -, \times, \div \)). For example, \( 4y - 7 \) is an expression. It represents a value, but it does not state an equality or inequality.

Within an expression, individual parts separated by addition or subtraction are called **terms**. For example, in the expression \( 2x + 9y - 4 \), there are three terms: \( 2x \), \( 9y \), and \( -4 \). Terms can be single numbers, single variables, or a combination of both.

### Evaluating Expressions

**Evaluating an expression** means finding its numerical value by replacing the variables with specific numbers. This is a fundamental skill in algebra, allowing us to move from a general rule to a specific result.

**Worked Example: Evaluating an Expression**

Let's evaluate the expression \( 5x - 3 \) for \( x = 4 \).

1. **Substitute** the value of the variable: Replace \( x \) with \( 4 \).
   \[ 5(4) - 3 \]
2. **Simplify** using the order of operations:
   \[ 20 - 3 \]
   \[ 17 \]

So, when \( x = 4 \), the value of the expression is \( 17 \).

## Order of Operations

When an expression contains multiple operations, we must follow a specific order to ensure everyone reaches the same result. Without a standardized order, an expression like \( 2 + 3 \times 4 \) could be interpreted as \( 20 \) (if adding first) or \( 14 \) (if multiplying first). To prevent this ambiguity, we use the **order of operations**, often remembered by the mnemonic **PEMDAS**.

1. **P**arentheses: Perform operations inside parentheses or brackets first.
2. **E**xponents: Calculate powers and roots.
3. **M**ultiplication and **D**ivision: Perform these from left to right.
4. **A**ddition and **S**ubtraction: Perform these from left to right.

### Worked Example: Applying PEMDAS

Evaluate the expression: \( 10 + (6 - 2)^2 \div 2 \)

1. **Parentheses**: Solve inside the parentheses first.
   \[ (6 - 2) = 4 \]
   The expression becomes: \( 10 + 4^2 \div 2 \)
2. **Exponents**: Calculate the power.
   \[ 4^2 = 16 \]
   The expression becomes: \( 10 + 16 \div 2 \)
3. **Division**: Perform the division.
   \[ 16 \div 2 = 8 \]
   The expression becomes: \( 10 + 8 \)
4. **Addition**: Final step.
   \[ 10 + 8 = 18 \]

The final result is \( 18 \).

## Algebraic Reasoning

Algebraic reasoning involves using mathematical properties to manipulate and simplify expressions. These properties are the rules of the "game," allowing us to rewrite expressions in more useful forms without changing their underlying value.

### The Distributive Property

One of the most important tools in algebra is the **distributive property**. It states that multiplying a sum by a number is the same as multiplying each addend by that number and then adding the products. This property is essential for expanding expressions and solving equations.

Formally: \( a(b + c) = ab + ac \)

**Worked Example: Using the Distributive Property**

Simplify the expression: \( 3(2x + 5) \)

1. **Distribute** the \( 3 \) to the first term: \( 3 \times 2x = 6x \).
2. **Distribute** the \( 3 \) to the second term: \( 3 \times 5 = 15 \).
3. **Combine** the results: \( 6x + 15 \).

The simplified expression is \( 6x + 15 \).

## Exponents

An **exponent** represents how many times a number, called the **base**, is used as a factor in a multiplication. Exponents provide a powerful way to express very large or very small numbers concisely.

For example, in \( 5^3 \):
- \( 5 \) is the **base**.
- \( 3 \) is the **exponent** (or power).

This is shorthand for \( 5 \times 5 \times 5 \), which equals \( 125 \). If the exponent were 1, it would just be \( 5 \). If it were 0, it would be 1 (for any non-zero base).

### Rules of Exponents

Exponents follow specific laws that allow us to simplify complex expressions involving powers. These laws are foundational for higher-level math like calculus.

#### Diagram: Visualizing Exponents

<details markdown="1">
<summary>Visualizing Exponents</summary>
Type: diagram
**sim-id:** exponent-visual-growth<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** describe<br/>
**Learning Objective:** The learner will describe the relationship between the base and the exponent through a visual growth model.

**Prerequisites:** Algebra Foundations

**Evidence of Mastery:** The learner correctly predicts whether changing the exponent from 2 to 3 will increase or decrease the growth rate in a multiple-choice question.

**Misconceptions:** Thinking \( 5^3 \) means \( 5 \times 3 \).

**Instructional Rationale:** A visual representation of repeated multiplication helps differentiate between linear and exponential scaling.

**Content:**
- Base: 2
- Exponent: 1, 2, 3, 4, 5
- Visual: A growing area or number of dots.

**Provenance:** Synthetic

**Rules:**
- Base \( b > 0 \)
- Exponent \( n \) increases by 1 each step.

**Learner Activity:**
1. Observe the growth of the visual element.
2. Change the base from 2 to 3.
3. Notice the difference in speed of growth.

**Feedback:** If the learner expects linear growth, show the mathematical difference between \( 2n \) and \( 2^n \).

**Starting State:** A small square representing \( 2^1 \).

**Chapter Anchors:** base, exponent, power
</details>

### Worked Example: Simplifying with Exponent Laws

Simplify: \( (x^3)(x^4) \)

According to the **Product Rule of Exponents**, when multiplying terms with the same base, you add the exponents: \( x^a \cdot x^b = x^{a+b} \).

1. **Identify** the base: The base is \( x \).
2. **Add** the exponents: \( 3 + 4 = 7 \).
3. **Result**: \( x^7 \).

## Linear Inequalities

An **inequality** is a mathematical statement that compares two values, indicating if one is greater than, less than, or equal to another. Unlike equations, which describe a specific point of balance, inequalities describe a range of possibilities. We use symbols like \( < \) (less than), \( > \) (greater than), \( \leq \) (less than or equal to), and \( \geq \) (greater than or equal to).

### Solving Inequalities

Solving an inequality is very similar to solving an equation, with one critical difference: when you multiply or divide both sides by a **negative number**, you must **reverse the inequality sign**. This is because multiplying by a negative number flips the order of numbers on the number line.

**Worked Example: Solving a Two-Step Inequality**

Solve: \( 2x - 4 > 6 \)

1. **Add 4** to both sides to isolate the term with \( x \):
   \[ 2x > 10 \]
2. **Divide by 2** on both sides:
   \[ x > 5 \]

The solution is all numbers greater than 5.

## Absolute Value Equations

The **absolute value** of a number, denoted by \( |x| \), is its distance from zero on a number line. Because distance is never negative, the absolute value is always zero or positive. For example, \( |-5| = 5 \) and \( |5| = 5 \).

An **absolute value equation** asks us to find the values that satisfy a certain distance. Because a distance can be in either direction, these equations often have two solutions.

**Example:**
To solve \( |x| = 3 \), we look for numbers that are exactly 3 units away from zero. Those numbers are \( 3 \) and \( -3 \).

## Function Concept

A **function** is a special relationship where each **input** (often called \( x \)) is associated with exactly one **output** (often called \( f(x) \) or \( y \)). 

Think of a function like a machine: you put something in, the machine performs a specific rule, and it spits out exactly one result. If you put in the same input twice, you must get the same output both times.

### Domain and Range

To fully describe a function, we need to know what numbers it can accept and what numbers it can produce.

- The **domain** is the set of all possible input values. It's like the "menu" of things you can feed the function.
- The **range** is the set of all possible output values. It's the collection of all results the function can produce.

#### Diagram: The Function Machine

<details markdown="1">
<summary>Function Machine Mapping</summary>
Type: diagram
**sim-id:** function-mapping-diagram<br/>
**Library:** mermaid<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** describe<br/>
**Learning Objective:** The learner will describe the relationship between input, output, domain, and range using a mapping diagram.

**Prerequisites:** Algebra Foundations

**Evidence of Mastery:** The learner can identify the domain and range from a provided mapping diagram.

**Misconceptions:** Thinking an input can have two different outputs.

**Instructional Rationale:** Mapping diagrams are the standard way to visualize the one-to-one or many-to-one nature of functions.

**Content:**
- Set A (Domain/Input)
- Set B (Range/Output)
- Mapping arrows

**Provenance:** Illustrative

**Rules:** Each element in Set A must have exactly one arrow pointing to an element in Set B.

**Learner Activity:**
1. Observe the arrows connecting inputs to outputs.
2. Identify which elements belong to the domain.
3. Identify which elements belong to the range.

**Feedback:** If the learner identifies an input with two outputs, explain that this violates the definition of a function.

**Starting State:** A mapping diagram with 3 inputs and 2 outputs.

**Chapter Anchors:** function, input, output, domain, range
</details>

### Worked Example: Evaluating a Function

Given the function \( f(x) = 2x + 1 \), find \( f(3) \).

1. **Substitute** \( 3 \) for \( x \):
   \[ f(3) = 2(3) + 1 \]
2. **Simplify**:
   \[ f(3) = 6 + 1 = 7 \]

So, \( f(3) = 7 \).

## Piecewise Functions

A **piecewise function** is a function that is defined by different rules for different parts of its domain. Instead of one single formula, it uses a collection of formulas, each applied only to a certain interval of \( x \). 

For example, a function might use one formula if \( x \) is negative and a different formula if \( x \) is positive. This allows us to model more complex, real-world behaviors that change abruptly.

## Systems of Linear Equations

A **system of linear equations** consists of two or more equations with the same set of variables. The **solution** to the system is the set of values that makes all equations in the system true at the same time. 

Graphically, if you draw the lines for both equations, the solution is the point where the lines intersect.

### Worked Example: Solving by Substitution

Solve the system:
1) \( y = 2x \)
2) \( x + y = 9 \)

1. **Substitute** the first equation into the second:
   Since \( y = 2x \), replace \( y \) in the second equation with \( 2x \).
   \[ x + (2x) = 9 \]
2. **Solve** for \( x \):
   \[ 3x = 9 \]
   \[ x = 3 \]
3. **Find \( y \)** by substituting \( x = 3 \) back into the first equation:
   \[ y = 2(3) = 6 \]

The solution is \( (3, 6) \).

## Linear Inequalities Systems

A **system of linear inequalities** is a set of two or more inequalities. Unlike a system of equations, which usually has a single point as a solution, a system of inequalities has an entire region of solutions. This region is the area on a graph where the shaded areas of all inequalities overlap.

## Factoring Quadratic Equations

**Factoring** is the process of breaking down an expression into a product of simpler expressions. For a quadratic equation like \( x^2 - 5x + 6 = 0 \), factoring means finding two expressions that multiply to give the quadratic.

In this case, \( (x - 2)(x - 3) = 0 \). This tells us that the original equation is true if either \( x - 2 = 0 \) or \( x - 3 = 0 \), which leads to the solutions \( x = 2 \) or \( x = 3 \).

## Solving by Square Roots

If an equation is in the form \( x^2 = a \), we can solve it by taking the **square root** of both sides. Because squaring a negative number also results in a positive number, we must account for both possibilities.

**Example:**
To solve \( x^2 = 16 \), take the square root of both sides:
\[ x = \pm \sqrt{16} \]
\[ x = 4 \text{ or } x = -4 \]

## Comparing Function Models

As we progress, we will learn to compare different types of mathematical models. For instance, a **linear model** grows at a constant rate, resulting in a straight line on a graph. In contrast, an **exponential model** grows by a constant percentage, creating a curve that becomes progressively steeper. Being able to distinguish between these models is crucial for making accurate predictions in science and economics.

## Arithmetic Sequences

An **arithmetic sequence** is a list of numbers where the difference between any two consecutive terms is constant. This constant difference is called the **common difference**.

Example: \( 2, 5, 8, 11, \dots \)
Here, the common difference is \( 3 \).

### Worked Example: Finding a Term

Find the 10th term of the sequence \( 5, 9, 13, 17, \dots \)

1. **Identify the first term (\( a_1 \))**: \( a_1 = 5 \)
2. **Identify the common difference (\( d \))**: \( d = 4 \)
3. **Use the formula** \( a_n = a_1 + (n-1)d \):
   \[ a_{10} = 5 + (10-1)4 \]
   \[ a_{10} = 5 + 9(4) \]
   \[ a_{10} = 5 + 36 = 41 \]

The 10th term is \( 41 \).

## Arithmetic Means

**Arithmetic means** are the terms that sit between two given numbers in an arithmetic sequence. For example, in the sequence \( 2, 4, 6, 8 \), the numbers \( 4 \) and \( 6 \) are the arithmetic means between \( 2 \) and \( 8 \).
