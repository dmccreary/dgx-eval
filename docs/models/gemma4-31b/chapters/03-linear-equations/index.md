---
title: "Linear Equations"
description: "Solving one-step, two-step, and multi-step equations, and literal equations."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 00:51:09"
version: 1.11
---

# Linear Equations

## Summary

Focusing on the core of algebraic problem solving, this chapter guides students through solving one-step and multi-step equations. Emphasis is placed on the properties of equality and solving literal equations.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Equation | 54 |
| Inequality | 15 |
| Solution Set | 1 |
| One-Step Equation | 27 |
| Two-Step Equation | 13 |
| Multi-Step Equation | 12 |
| Variable on Both Sides | 3 |
| No Solution | 1 |
| Infinite Solutions | 1 |
| Literal Equation | 4 |
| Solving for a Variable | 3 |
| Formula | 1 |
| Addition Property of Equality | 1 |
| Subtraction Property of Equality | 1 |
| Multiplication Property of Equality | 2 |
| Division Property of Equality | 2 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Algebra Foundations](../01-algebra-foundations/index.md)


---

In previous chapters, we learned how to write algebraic expressions—mathematical phrases that describe a value. Now, we move from *describing* values to *finding* them. This is the essence of solving equations.

### What is an Equation?

At its simplest, an Equation is a mathematical statement that two expressions are equal. It is characterized by the presence of an equals sign (`=`). While an expression is like a phrase (e.g., "three more than x"), an equation is like a complete sentence (e.g., "three more than x is ten").

The goal of solving an equation is to find the specific value for the variable that makes the statement true. This value, or set of values, is known as the **Solution Set**. For a simple linear equation, the solution set usually contains a single number.

#### Worked Example: Identifying Equations
Consider these three statements:
1. \( 5x + 2 \)
2. \( 5x + 2 = 12 \)
3. \( 5x + 2 > 12 \)

Statement 1 is an *expression* because there is no equality. Statement 3 is an *inequality* because it describes a range of values rather than an exact equality. Statement 2 is an *equation*. To solve it, we ask: "What value of \( x \) makes \( 5x + 2 \) equal to 12?" (The answer is \( x = 2 \)).

#### Diagram: The Balance Scale
Before we look at the math, imagine a physical balance scale. If the scale is balanced, the left side weighs exactly the same as the right side. If you add two pounds to the left side, the scale tips. To bring it back to balance, you *must* add exactly two pounds to the right side. This is the fundamental logic of algebra.

<details markdown="1">
<summary>The Equation Balance (MicroSim)</summary>
Type: microsim
**sim-id:** equation-balance-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Explain<br/>
**Learning Objective:** The learner will explain how performing the same operation on both sides of an equation maintains equality.

**Prerequisites:** Equation, Solution Set

**Evidence of Mastery:** The learner successfully balances the scale by applying a matching operation to both sides to isolate the variable.

**Misconceptions:** Students often think they can change one side of the equation without affecting the other.

**Instructional Rationale:** Visualizing the "balance" provides a concrete mental model for the abstract properties of equality.

**Content:**
- Variable weight: \( x \) (represented by a mystery box)
- Fixed weights: 1kg, 2kg, 5kg blocks.
- Operations: "Add block to Left", "Add block to Right", "Remove block from Left", "Remove block from Right".
- Target: Balance the scale to find the value of \( x \).
- Scenario: Scale starts with \( x + 2 \) on left and \( 7 \) on right.

**Provenance:** Illustrative

**Rules:**
- Equality is maintained if `Left_Weight == Right_Weight`.
- The sim tracks the total weight on each side.

**Learner Activity:**
1. Observe the unbalanced scale (\( x+2 \) vs \( 7 \)).
2. Remove a 2kg block from the left side.
3. Notice the scale tips further.
4. Remove a 2kg block from the right side.
5. Notice the scale returns to balance, leaving \( x \) on the left and \( 5 \) on the right.

**Feedback:**
- Correct: "Perfect! By removing 2kg from both sides, you kept the balance and discovered that \( x = 5 \)."
- Incorrect: "The scale is tipping! Remember, whatever you do to one side, you must do to the other to keep it equal."

**Starting State:** A balance scale with a mystery box (\( x \)) and two 1kg blocks on the left; seven 1kg blocks on the right.

**Chapter Anchors:** None
</details>

### The Properties of Equality

To solve for a variable, we need to "isolate" it—meaning we want the variable to be the only thing left on one side of the equals sign. We achieve this using the **Properties of Equality**. These properties are the legal "moves" of algebra.

1. **Addition Property of Equality:** Adding the same number to both sides of an equation keeps the equation equal.
2. **Subtraction Property of Equality:** Subtracting the same number from both sides keeps the equation equal.
3. **Multiplication Property of Equality:** Multiplying both sides by the same non-zero number keeps the equation equal.
4. **Division Property of Equality:** Dividing both sides by the same non-zero number keeps the equation equal.

#### Diagram: Property Cheat Sheet
The following interactive guide summarizes these tools.

<details markdown="1">
<summary>Properties of Equality Guide (Infographic)</summary>
Type: infographic
**sim-id:** equality-properties-guide<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** Identify<br/>
**Learning Objective:** The learner will identify the correct property of equality to use based on the operation present in the equation.

**Prerequisites:** Equation, Addition/Subtraction/Multiplication/Division Properties of Equality

**Evidence of Mastery:** The learner matches a given equation (e.g., \( x - 5 = 10 \)) to the correct property (Addition Property).

**Misconceptions:** Confusing the operation *in the equation* with the operation *needed to solve it*.

**Instructional Rationale:** Reinforces the "inverse operation" concept.

**Content:**
- Item 1: \( x + 3 = 10 \) $\rightarrow$ Subtraction Property (Inverse of +)
- Item 2: \( x - 7 = 2 \) $\rightarrow$ Addition Property (Inverse of -)
- Item 3: \( 4x = 20 \) $\rightarrow$ Division Property (Inverse of $\times$)
- Item 4: \( \frac{x}{2} = 5 \) $\rightarrow$ Multiplication Property (Inverse of $\div$)

**Provenance:** Synthetic

**Rules:** Correct match based on the inverse operation.

**Learner Activity:**
1. View an equation.
2. Select the property from a list of four.
3. Receive instant feedback on the choice.

**Feedback:**
- Correct: "Correct! To undo addition, you use subtraction."
- Incorrect: "Not quite. Look at the operation currently acting on \( x \). What is the opposite of that operation?"

**Starting State:** A card showing \( x + 3 = 10 \).

**Chapter Anchors:** None
</details>

### Solving One-Step Equations

A **One-Step Equation** is an equation that requires only one application of a property of equality to isolate the variable.

The secret to one-step equations is using the **inverse operation**. If the variable is being added to, you subtract. If it is being divided, you multiply.

#### Worked Example: One-Step Equation
Solve: \( \frac{x}{4} = 3 \)

1. **Identify the operation:** The variable \( x \) is being divided by 4.
2. **Determine the inverse:** The inverse of division is multiplication.
3. **Apply the property:** Multiply both sides by 4 (Division Property of Equality).
   \[ \frac{x}{4} \cdot 4 = 3 \cdot 4 \]
4. **Simplify:**
   \[ x = 12 \]
The solution set is \( \{12\} \).

### Solving Two-Step Equations

A **Two-Step Equation** requires two different properties of equality to isolate the variable. Usually, this involves undoing addition or subtraction first, and then undoing multiplication or division.

**The General Rule:** Work backward through the order of operations (PEMDAS). Undo addition/subtraction before undoing multiplication/division.

#### Worked Example: Two-Step Equation
Solve: \( 3x - 5 = 10 \)

1. **Undo Subtraction:** Add 5 to both sides (Addition Property).
   \[ 3x - 5 + 5 = 10 + 5 \]
   \[ 3x = 15 \]
2. **Undo Multiplication:** Divide both sides by 3 (Division Property).
   \[ \frac{3x}{3} = \frac{15}{3} \]
   \[ x = 5 \]
The solution set is \( \{5\} \).

### Solving Multi-Step Equations

A **Multi-Step Equation** is one that requires more than two steps. This often happens when you have parentheses (requiring the Distributive Property) or variables on both sides.

#### Variable on Both Sides
When a variable appears on both sides, your first goal is to move all variable terms to one side and all constant terms to the other.

#### Worked Example: Variables on Both Sides
Solve: \( 5x + 2 = 2x + 14 \)

1. **Move variables to one side:** Subtract \( 2x \) from both sides.
   \[ 5x - 2x + 2 = 2x - 2x + 14 \]
   \[ 3x + 2 = 14 \]
2. **Undo Addition:** Subtract 2 from both sides.
   \[ 3x + 2 - 2 = 14 - 2 \]
   \[ 3x = 12 \]
3. **Undo Multiplication:** Divide by 3.
   \[ x = 4 \]

#### Diagram: Multi-Step Solver
Let's practice the sequence of steps.

<details markdown="1">
<summary>Multi-Step Equation Challenge (MicroSim)</summary>
Type: microsim
**sim-id:** multistep-solver-challenge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** Solve<br/>
**Learning Objective:** The learner will solve a multi-step equation by sequencing the correct algebraic operations.

**Prerequisites:** One-Step, Two-Step, and Multi-Step Equations

**Evidence of Mastery:** The learner reaches the correct solution by choosing the correct sequence of properties to apply.

**Misconceptions:** Attempting to divide by the coefficient before undoing addition/subtraction.

**Instructional Rationale:** Procedural fluency is built by identifying the correct "next move" in a complex problem.

**Content:**
- Equation: \( 2(x + 4) = 3x - 1 \)
- Step options:
  - "Distribute the 2"
  - "Subtract 3x from both sides"
  - "Subtract 8 from both sides"
  - "Divide by 2"
- Correct Sequence:
  1. Distribute: \( 2x + 8 = 3x - 1 \)
  2. Subtract 2x: \( 8 = x - 1 \)
  3. Add 1: \( 9 = x \)

**Provenance:** Synthetic

**Rules:**
- Each choice updates the equation displayed on screen.
- Invalid moves (e.g., dividing before distributing) result in a "Complexity Warning" and a prompt to try again.

**Learner Activity:**
1. Read the equation.
2. Select the first logical step (Distribute).
3. Observe the equation change.
4. Continue selecting steps until \( x \) is isolated.

**Feedback:**
- Correct: "Correct! You've successfully isolated the variable."
- Incorrect: "Wait! If you divide now, you'll have to deal with fractions. Try simplifying the expressions first."

**Starting State:** The equation \( 2(x + 4) = 3x - 1 \) is displayed with four possible action buttons.

**Chapter Anchors:** None
</details>

### Special Cases: No Solution and Infinite Solutions

Not every equation has a single number as a solution.

1. **No Solution:** Occurs when the variable terms cancel out, leaving a false statement (e.g., \( 5 = 10 \)). This means no matter what value you pick for \( x \), the equation will never be true.
2. **Infinite Solutions (Identities):** Occurs when the variable terms cancel out, leaving a true statement (e.g., \( 10 = 10 \)). This means *any* real number is a solution.

### Literal Equations and Formulas

A **Literal Equation** is an equation where variables are used to represent constants. You aren't looking for a number, but rather a new expression. **Solving for a variable** in a literal equation means rearranging it to isolate a specific letter.

A **Formula** is a specialized literal equation that expresses a relationship between physical quantities (e.g., \( A = lw \) for the area of a rectangle).

#### Worked Example: Solving a Formula
The formula for the perimeter of a rectangle is \( P = 2l + 2w \). Solve for \( w \) (the width).

1. **Isolate the term with \( w \):** Subtract \( 2l \) from both sides.
   \[ P - 2l = 2w \]
2. **Isolate \( w \):** Divide both sides by 2.
   \[ \frac{P - 2l}{2} = w \]
The width can be found using the formula \( w = \frac{P - 2l}{2} \).

#### Diagram: Formula Transformer
How does rearranging a formula change its meaning?

<details markdown="1">
<summary>Literal Equation Transformer (Infographic)</summary>
Type: infographic
**sim-id:** literal-eq-transformer<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Rearrange<br/>
**Learning Objective:** The learner will rearrange a literal equation to express one variable in terms of the others.

**Prerequisites:** Literal Equation, Solving for a Variable

**Evidence of Mastery:** The learner successfully transforms a starting formula into a target rearranged form.

**Misconceptions:** Thinking that the a formula's "truth" changes when it is rearranged.

**Instructional Rationale:** Demonstrates that different forms of the same equation are useful for different purposes (e.g., calculating area vs calculating length).

**Content:**
- Starting Formula: \( d = rt \) (Distance = Rate $\times$ Time)
- Target 1: Solve for \( r \) (Rate) $\rightarrow$ \( r = \frac{d}{t} \)
- Target 2: Solve for \( t \) (Time) $\rightarrow$ \( t = \frac{d}{r} \)
- Interaction: A slider that "moves" terms across the equals sign.

**Provenance:** Synthetic

**Rules:**
- Moving a term via addition/subtraction changes its sign.
- Moving a term via multiplication/division puts it in the denominator/numerator.

**Learner Activity:**
1. Select a target variable (e.g., \( r \)).
2. Drag the \( t \) variable across the equals sign.
3. Observe it change from multiplication to division.
4. Compare the final result to the target formula.

**Feedback:**
- Correct: "Correct! You've transformed the formula to solve for rate."
- Incorrect: "Check your signs! When you move a term across the equals sign, the operation must invert."

**Starting State:** The equation \( d = rt \) is displayed.

**Chapter Anchors:** None
</details>

### Linear Inequalities

Finally, we look at **Inequalities**. While an equation is a balance, an inequality describes a relationship of "greater than" or "less than."

The primary difference in solving them is the **Flip Rule**: When you multiply or divide both sides of an inequality by a **negative number**, you must flip the direction of the inequality symbol.

#### Worked Example: Linear Inequality
Solve: \( -3x + 4 < 10 \)

1. **Undo Addition:** Subtract 4 from both sides.
   \[ -3x < 6 \]
2. **Undo Multiplication:** Divide both sides by -3. **FLIP the symbol!**
   \[ x > -2 \]
The solution set is all numbers greater than -2.

#### Diagram: Inequality vs Equation
What is the difference between a point and a region?

<details markdown="1">
<summary>Inequality vs Equation (MicroSim)</summary>
Type: microsim
**sim-id:** ineq-vs-eq-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Compare<br/>
**Learning Objective:** The learner will compare the solution sets of an equation and an inequality.

**Prerequisites:** Equation, Linear Inequality

**Evidence of Mastery:** The learner correctly identifies that an equation results in a point on a number line, while an inequality results in a shaded region.

**Misconceptions:** Thinking that an inequality is just an "approximate" equation.

**Instructional Rationale:** Visualizing the number line prevents the common error of treating inequalities as single-value solutions.

**Content:**
- Equation side: \( x + 2 = 5 \). Result: Point at 3.
- Inequality side: \( x + 2 > 5 \). Result: Shaded region from 3 to $\infty$.
- Toggle: Change the constant (5) to see both results shift together.

**Provenance:** Synthetic

**Rules:**
- Equation solution: \( x = C - 2 \)
- Inequality solution: \( x > C - 2 \)

**Learner Activity:**
1. Solve the equation \( x + 2 = 5 \) and mark the point on the number line.
2. Solve the inequality \( x + 2 > 5 \) and shade the region.
3. Change the constant 5 to 10 and observe both the point and the region shift to 8.

**Feedback:**
- Correct: "Exactly! An equation finds the exact boundary, while the inequality finds everything on one side of that boundary."
- Incorrect: "Check your shading. The symbol \( > \) means we want the values larger than the boundary."

**Starting State:** A split screen with two number lines and the equations \( x+2=5 \) and \( x+2>5 \).

**Chapter Anchors:** None
</details>

### Summary and Key Takeaways

- **Equations** are statements of equality; solving them means finding the **solution set**.
- Use **Inverse Operations** (the Properties of Equality) to isolate the variable.
- **Multi-step equations** are solved by undoing addition/subtraction first, then multiplication/division.
- **Literal Equations** are rearranged to isolate a specific variable, creating a new formula.
- **Inequalities** are solved like equations, but the symbol **flips** when multiplying or dividing by a negative number.

