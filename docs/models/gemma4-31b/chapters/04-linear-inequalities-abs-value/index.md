---
title: "Linear Inequalities and Absolute Value"
description: "Solving linear inequalities, graphing solutions, and working with absolute value equations and inequalities."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 15:10:00"
version: 1.11
---

# Linear Inequalities and Absolute Value

## Summary

Students will expand their solving skills to include linear inequalities and absolute value equations. This chapter covers graphing solutions on a number line and understanding compound inequalities.

## Concepts Covered

This chapter covers the following 9 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Linear Inequality | 6 |
| Inequality Symbols | 3 |
| Graphing Inequalities | 2 |
| Interval Notation | 1 |
| Absolute Value Equation | 1 |
| Absolute Value Inequality | 1 |
| Compound Inequality | 3 |
| AND Inequality | 1 |
| OR Inequality | 1 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 1: Algebra Foundations](../01-algebra-foundations/index.md)
- [Chapter 3: Linear Equations](../03-linear-equations/index.md)


---

In Chapter 3, we focused on equations—statements where two expressions are exactly equal. However, in the real world, we often deal with constraints rather than exact values. For example, you might need *at least* \$20 to buy a movie ticket and snacks, or a car must travel *under* the speed limit. To model these situations, we use inequalities.

## Linear Inequalities

A **Linear Inequality** is a mathematical statement that compares two linear expressions using an inequality symbol rather than an equals sign. Unlike an equation, which typically has one solution, an inequality usually describes a whole region of values that make the statement true.

### Understanding Inequality Symbols

To read an inequality, we must first understand the **Inequality Symbols**. These symbols indicate the relationship between two quantities:

- **Less than ($\lt$):** The value on the left is smaller than the value on the right.
- **Greater than ($\gt$):** The value on the left is larger than the value on the right.
- **Less than or equal to ($\le$):** The left value is either smaller than or exactly equal to the right value.
- **Greater than or equal to ($\ge$):** The left value is either larger than or exactly equal to the right value.

A helpful way to remember these is that the "open" end of the symbol always points toward the larger value, while the "pointy" end points toward the smaller value.

#### Diagram: The Inequality Comparison Tool

<details markdown="1">
<summary>The Inequality Comparison Tool</summary>
Type: infographic
**sim-id:** ineq-symbol-tool<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Distinguish<br/>
**Learning Objective:** The learner will distinguish between the four primary inequality symbols and identify which one correctly represents a given real-world constraint.

**Prerequisites:** Inequality Symbols

**Evidence of Mastery:** The learner correctly selects the symbol ($\lt, \gt, \le, \ge$) to match phrases like "no more than" or "at least".

**Misconceptions:** Confusing "at most" ($\le$) with "less than" ($\lt$).

**Instructional Rationale:** Direct mapping of linguistic constraints to symbolic representation prevents the common error of using strict inequalities when inclusive ones are required.

**Content:**
- Phrase: "At least 18 years old" $\rightarrow$ $\ge 18$
- Phrase: "Less than 50 units" $\rightarrow$ $\lt 50$
- Phrase: "No more than 10 guests" $\rightarrow$ $\le 10$
- Phrase: "More than 5 miles" $\rightarrow$ $\gt 5$

**Provenance:** synthetic

**Rules:** Correct if the symbol matches the logical constraint of the phrase.

**Learner Activity:**
1. Read a real-world constraint phrase.
2. Select the correct inequality symbol from a list.
3. Receive feedback on the choice.

**Feedback:**
- Correct: "Correct! 'At least' means the value can be that number or higher."
- Incorrect: "Not quite. Remember that 'at most' includes the number itself, so you need the 'equal to' line."

**Starting State:** Phrase "At least 18 years old" is displayed.

**Chapter Anchors:** none
</details>

### Solving Linear Inequalities

Solving a linear inequality is almost identical to solving a linear equation: we use inverse operations to isolate the variable. However, there is one critical difference known as the **Flip Rule**.

**The Flip Rule:** Whenever you multiply or divide both sides of an inequality by a **negative number**, you must flip the direction of the inequality symbol. For example, if you have $\lt$, it becomes $\gt$.

This happens because multiplying by a negative number reverses the relative order of values on the number line. If $2 \lt 5$, then $-2 \gt -5$.

**Worked Example: Solving and Flipping**
Solve: $-3x + 7 \le 22$

1. **Undo Addition:** Subtract 7 from both sides.
   $-3x \le 15$
2. **Undo Multiplication:** Divide both sides by $-3$. **Since we are dividing by a negative, we must flip the symbol!**
   $x \ge -5$

The solution set consists of all real numbers greater than or equal to $-5$.

### Graphing Inequalities and Interval Notation

Because the solution to an inequality is a set of values, we represent it visually on a number line through **Graphing Inequalities**.

- **Open Circle ($\circ$):** Used for $\lt$ or $\gt$. It indicates that the boundary number is *not* part of the solution.
- **Closed Circle ($\bullet$):** Used for $\le$ or $\ge$. It indicates that the boundary number *is* part of the solution.
- **Shading:** We shade the side of the line that contains the values that make the inequality true.

Once a solution is graphed, we can write it more concisely using **Interval Notation**. This is a way of describing the solution set using brackets and parentheses:
- **Parentheses $( )$:** Used for open circles (exclusive boundaries) and always used for infinity ($\infty$).
- **Brackets $[ ]$:** Used for closed circles (inclusive boundaries).

For example, the solution $x \ge -5$ is written in interval notation as $[-5, \infty)$.

#### Diagram: The Inequality Grapher

<details markdown="1">
<summary>The Inequality Grapher</summary>
Type: microsim
**sim-id:** ineq-grapher-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** Graph<br/>
**Learning Objective:** The learner will graph a linear inequality solution on a number line and convert it to interval notation.

**Prerequisites:** Graphing Inequalities, Interval Notation

**Evidence of Mastery:** The learner correctly places the circle (open/closed) and shades the correct direction to match a given inequality.

**Misconceptions:** Shading the wrong side because they confuse the symbol direction with the shading direction.

**Instructional Rationale:** Interactive graphing provides immediate visual confirmation of what "solution set" actually means.

**Content:**
- Inequality: $x \lt 4$ $\rightarrow$ Open circle at 4, shade left. Interval: $(-\infty, 4)$
- Inequality: $x \ge -2$ $\rightarrow$ Closed circle at -2, shade right. Interval: $[-2, \infty)$
- Inequality: $-1 \le x \lt 3$ $\rightarrow$ Closed at -1, open at 3, shade between. Interval: $[-1, 3)$

**Provenance:** synthetic

**Rules:** Correct if circle type, position, and shading direction match the inequality.

**Learner Activity:**
1. View a solved inequality (e.g., $x \lt 4$).
2. Click on the number line to place the circle.
3. Select the circle type (open/closed).
4. Drag a slider to shade the region.
5. Type the corresponding interval notation.

**Feedback:**
- Correct: "Perfect! The open circle and left-shading correctly represent $x \lt 4$."
- Incorrect: "Check your circle. Since the symbol is $\lt$, the boundary is not included."

**Starting State:** An empty number line and the inequality $x \lt 4$.

**Chapter Anchors:** none
</details>

## Absolute Value Equations and Inequalities

The **Absolute Value** of a number is its distance from zero on a number line. Since distance cannot be negative, absolute value results are always non-negative.

### Absolute Value Equations

An **Absolute Value Equation** is an equation where the variable is inside absolute value bars. Because there are usually two numbers that are the same distance from zero (e.g., both 5 and -5 are 5 units from zero), these equations typically have two solutions.

To solve them, you must split the equation into two separate linear equations: one for the positive case and one for the negative case.

**Worked Example: Solving Absolute Value**
Solve: $|2x - 3| = 7$

1. **Split into two cases:**
   - Case 1: $2x - 3 = 7$
   - Case 2: $2x - 3 = -7$
2. **Solve Case 1:**
   $2x = 10 \rightarrow x = 5$
3. **Solve Case 2:**
   $2x = -4 \rightarrow x = -2$

The solution set is $\{5, -2\}$.

### Absolute Value Inequalities

An **Absolute Value Inequality** follows a similar logic but results in a range of values.

- **"Less than" ($\lt, \le$):** If $|expression| \lt k$, the distance is *small*. This creates a "sandwich" (a conjunction).
  Example: $|x| \lt 3$ becomes $-3 \lt x \lt 3$.
- **"Greater than" ($\gt, \ge$):** If $|expression| \gt k$, the distance is *large*. This creates two separate rays (a disjunction).
  Example: $|x| \gt 3$ becomes $x \gt 3$ or $x \lt -3$.

#### Diagram: The Distance-to-Zero Visualizer

<details markdown="1">
<summary>The Distance-to-Zero Visualizer</summary>
Type: microsim
**sim-id:** abs-value-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Illustrate<br/>
**Learning Objective:** The learner will illustrate how absolute value inequalities create either a single bounded interval or two divergent rays on a number line.

**Prerequisites:** Absolute Value, Absolute Value Inequality

**Evidence of Mastery:** The learner correctly identifies whether a given absolute value inequality results in a "sandwich" (conjunction) or "wings" (disjunction) pattern.

**Misconceptions:** Thinking that absolute value inequalities always result in a single interval.

**Instructional Rationale:** Visualizing the "distance" helps students understand why "less than" means "close to zero" and "greater than" means "far from zero."

**Content:**
- Scenario A: $|x| \le 4$ $\rightarrow$ Shaded region between -4 and 4.
- Scenario B: $|x| \ge 4$ $\rightarrow$ Shaded regions from 4 to $\infty$ and -4 to $-\infty$.

**Provenance:** illustrative

**Rules:** Correct if the shading matches the distance logic.

**Learner Activity:**
1. Adjust a slider to change the value of $k$ in $|x| \lt k$.
2. Observe the shaded region on the number line contract and expand.
3. Toggle between $\lt$ and $\gt$ to see the region flip from a center-block to two outside-rays.

**Feedback:**
- Correct: "Notice how the $\gt$ symbol pushes the solutions away from zero!"
- Incorrect: "Remember: 'less than' means the distance is small, so the solutions stay close to the center."

**Starting State:** Number line with $|x| \lt 5$ shaded between -5 and 5.

**Chapter Anchors:** none
</details>

## Compound Inequalities

A **Compound Inequality** is a statement that combines two inequalities into one using the words "and" or "or".

### AND Inequalities (Conjunctions)
An **AND Inequality** requires *both* conditions to be true. This typically results in a single, overlapping region on the number line (a "sandwich").
Example: $x > 2$ AND $x \le 7$ is written as $2 \lt x \le 7$.

### OR Inequalities (Disjunctions)
An **OR Inequality** requires *at least one* of the conditions to be true. This typically results in two separate regions pointing in opposite directions (the "wings").
Example: $x \lt -1$ OR $x \gt 4$.

#### Diagram: Compound Region Selector

<details markdown="1">
<summary>Compound Region Selector</summary>
Type: infographic
**sim-id:** compound-region-selector<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Categorize<br/>
**Learning Objective:** The learner will categorize a given solution set as either an AND (conjunction) or an OR (disjunction) compound inequality.

**Prerequisites:** Compound Inequality, AND Inequality, OR Inequality

**Evidence of Mastery:** The learner correctly identifies the logical operator (AND/OR) based on the visual overlap of the shaded regions.

**Misconceptions:** Thinking that any inequality with two symbols is automatically an "AND" inequality.

**Instructional Rationale:** Visualizing the "intersection" (AND) vs "union" (OR) is the foundation for later work in set theory and advanced algebra.

**Content:**
- Image 1: Overlapping region between 2 and 5 $\rightarrow$ AND
- Image 2: Two rays pointing away from each other $\rightarrow$ OR
- Image 3: A single ray $\rightarrow$ Simple Inequality (not compound)

**Provenance:** synthetic

**Rules:** Correct if the logical operator matches the visual overlap.

**Learner Activity:**
1. View a number line with shaded regions.
2. Select "AND", "OR", or "Simple".
3. Receive feedback.

**Feedback:**
- Correct: "Correct! The overlap shows that both conditions must be met."
- Incorrect: "Check the gap. If the regions are separated, it's an 'OR' inequality."

**Starting State:** Image of two rays pointing away from each other.

**Chapter Anchors:** none
</details>

## Chapter Summary

In this chapter, we expanded our solving toolkit from equations to inequalities. Key takeaways include:
- **Linear Inequalities** are solved like equations, but we must **flip the symbol** when multiplying or dividing by a negative number.
- Solutions are represented by **open circles** (exclusive) or **closed circles** (inclusive) on a number line and can be written in **interval notation**.
- **Absolute Value Equations** usually have two solutions, while **Absolute Value Inequalities** create either a bounded interval ($\lt$) or two divergent rays ($\gt$).
- **Compound Inequalities** combine two constraints using **AND** (intersection/sandwich) or **OR** (union/wings).
