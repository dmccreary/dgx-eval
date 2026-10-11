---
title: "Advanced Topics and Review"
description: "Advanced topics and review for Algebra I - key concepts for concluding the course"
generated_by: claude skill chapter-content-generator
date: "2026-10-10 18:22:08"
version: 1.11
---

# Advanced Topics and Review

## Summary

This chapter covers the key advanced concepts and review topics for Algebra I. Students will consolidate their understanding of functions, sequences, and data analysis, building on foundational knowledge and preparing for more advanced mathematics courses. The chapter emphasizes connecting previously learned concepts and applying them to solve multi-step problems and model real-world situations.

## Concepts Covered

| Concept | Concept Impact Score |
|---------|----------------------|
| Constant Rate Change | 1 |
| Constant Percent Change | 1 |
| Arithmetic Difference | 1 |
| Geometric Ratio | 1 |
| Sequence Term nth | 1 |
| Sequence Position | 1 |
| Sequence Value | 1 |
| Mathematical Model | 1 |
| Data Display Scatterplot | 1 |
| Data Display Line Graph | 1 |
| Data Display Bar Graph | 1 |
| Data Display Circle Graph | 1 |
| Statistical Question | 1 |

## 1. Constant Rate Change

A **constant rate of change** means that a quantity changes by the same amount in each time period or between each pair of consecutive x-values. When a relationship has a constant rate of change, it can be represented by a linear function.

The rate of change is calculated as the ratio of the change in the dependent variable to the change in the independent variable:

$$m = \frac{y_2 - y_1}{x_2 - x_1}$$

This is the same as the **slope** of the line that passes through the two points $(x_1, y_1)$ and $(x_2, y_2)$.

### Worked Example 1: Finding the Rate of Change

Find the rate of change for the points $(2, 3)$ and $(5, 12)$.

**Solution:**

1. Identify the coordinates: $(x_1, y_1) = (2, 3)$ and $(x_2, y_2) = (5, 12)$
2. Apply the rate of change formula:
   $$m = \frac{12 - 3}{5 - 2} = \frac{9}{3} = 3$$
3. The rate of change is $3$, meaning the y-value increases by 3 for every increase of 1 in the x-value.

**Answer:** The rate of change is $3$.

### Key Takeaway

When the rate of change is constant, the relationship is linear and can be modeled with a linear equation. The rate of change tells us how steep the line is and in which direction it goes.

<details markdown="1">
#### Diagram: Rate of Change Explorer

<summary>Rate of Change Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: identify<br/>
Learning Objective: The learner will identify the rate of change (slope) between two points on a line and explain its meaning in context.

Prerequisites: Slope Rate of Change, Graph Linear Equation, Coordinate Plane

Evidence of Mastery: The learner correctly calculates the rate of change between two points and explains whether the relationship is increasing, decreasing, or constant.

Misconceptions: The learner may confuse rate of change with percent change, or believe that a larger slope always means a "steeper" line regardless of direction.

Instructional Rationale: Understanding rate of change as slope is fundamental to linear functions. Learners must distinguish between the mathematical computation and its real-world interpretation.

Content: The sim presents 5 line segments with different slopes. The learner calculates the rate of change for each and matches it to a description: positive, negative, zero, or undefined. Defaults: slopes of -2, -1, 0, 1, 2 with integer coordinate points.

Learner Activity: The learner is given 5 line segments and must calculate the rate of change for each. Feedback is provided after each response.

Feedback: Correct responses receive positive feedback with a brief explanation. Incorrect responses receive corrective feedback that identifies the error and shows the correct calculation step-by-step.

Starting State: The learner sees the title "Rate of Change Explorer" and a prompt to begin calculating slopes.

Chapter Anchors: The chapter prose states that "Rate of change is calculated as the ratio of the change in the dependent variable to the change in the independent variable, $m = \frac{y_2 - y_1}{x_2 - x_1}$. A positive rate indicates an increasing relationship, a negative rate indicates a decreasing relationship, and zero rate indicates a constant relationship."

</details>

## 2. Constant Percent Change

A **constant percent change** means that a quantity changes by the same percentage in each time period or between each pair of consecutive x-values. When a relationship has a constant percent change, it can be represented by an exponential function.

The percent change is calculated as:

$$\text{Percent Change} = \frac{\text{New Value} - \text{Old Value}}{\text{Old Value}} \times 100\%$$

If the percent change is constant and positive, the function represents **exponential growth**. If the percent change is constant and negative, the function represents **exponential decay**.

### Worked Example 2: Finding the Percent Change

Find the percent change from 80 to 100.

**Solution:**

1. Identify the old value and new value: Old = 80, New = 100
2. Apply the percent change formula:
   $$\text{Percent Change} = \frac{100 - 80}{80} \times 100\% = \frac{20}{80} \times 100\% = 0.25 \times 100\% = 25\%$$
3. The percent change is $25\%$, which represents exponential growth.

**Answer:** The percent change is $25\%$.

### Worked Example 3: Exponential Decay

A population of 500 bacteria decreases by 10% each hour. What is the population after 1 hour? After 2 hours?

**Solution:**

After 1 hour:
$$\text{Population} = 500 \times (1 - 0.10) = 500 \times 0.90 = 450$$

After 2 hours:
$$\text{Population} = 450 \times 0.90 = 500 \times 0.90 \times 0.90 = 500 \times 0.90^2 = 405$$

**Answer:** After 1 hour: 450 bacteria. After 2 hours: 405 bacteria.

### Key Takeaway

Constant percent change leads to exponential functions, which model growth and decay situations. The base of the exponential function is $1 + r$ for growth or $1 - r$ for decay, where $r$ is the decimal form of the percent rate.

<details markdown="1">
#### Diagram: Percent Change Explorer

<summary>Percent Change Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: calculate<br/>
Learning Objective: The learner will calculate percent change and determine whether a situation represents exponential growth or decay.

Prerequisites: Exponential Growth, Exponential Decay, Mathematical Model

Evidence of Mastery: The learner correctly computes percent change and classifies the function as growth or decay based on the sign of the rate.

Misconceptions: The learner may forget to divide by the old value, or confuse growth and decay based on the direction of change rather than the sign.

Instructional Rationale: Percent change is the bridge between arithmetic operations and exponential functions. Learners must understand the formula structure before applying it to real-world contexts.

Content: The sim presents 5 real-world scenarios (population growth, depreciation, interest accrual). The learner computes percent change and identifies growth vs. decay. Defaults: 5 scenarios with integer percentages between 5% and 25%.

Learner Activity: The learner is given 5 scenarios and must compute percent change and identify growth vs. decay. Feedback provided after each response.

Feedback: Correct responses receive positive feedback with the correct classification. Incorrect responses show the correct calculation and classification.

Starting State: The learner sees the title "Percent Change Explorer" and a prompt to begin computing.

Chapter Anchors: The chapter prose states that "Percent change is calculated as $\frac{\text{New} - \text{Old}}{\text{Old}} \times 100\%$. A positive percent change indicates exponential growth; a negative percent change indicates exponential decay. The base of the exponential function is $1 + r$ for growth or $1 - r$ for decay."

</details>

## 3. Arithmetic Difference

An **arithmetic difference** is the constant amount added to each term to get the next term in an arithmetic sequence. If a sequence has a constant arithmetic difference, then the difference between any two consecutive terms is always the same.

The arithmetic difference is denoted by $d$ and is calculated as:

$$d = a_{n} - a_{n-1}$$

where $a_n$ is the nth term and $a_{n-1}$ is the previous term.

### Worked Example 4: Finding the Arithmetic Difference

Find the arithmetic difference in the sequence $4, 9, 14, 19, 24, \ldots$

**Solution:**

1. Calculate the difference between consecutive terms:
   $$d = 9 - 4 = 5$$
   $$d = 14 - 9 = 5$$
   $$d = 19 - 14 = 5$$
   $$d = 24 - 19 = 5$$
2. The arithmetic difference is consistently $5$.

**Answer:** The arithmetic difference is $d = 5$.

### Key Takeaway

In an arithmetic sequence, the arithmetic difference $d$ is the constant value added to each term to produce the next term. If the difference varies, the sequence is not arithmetic.

<details markdown="1">
#### Diagram: Arithmetic Sequence Explorer

<summary>Arithmetic Sequence Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: determine<br/>
Learning Objective: The learner will determine the arithmetic difference in a given sequence and use it to find the next term.

Prerequisites: Sequence Position, Sequence Term nth, Sequence Value

Evidence of Mastery: The learner correctly identifies the arithmetic difference and uses it to extend the sequence or find a specific term.

Misconceptions: The learner may confuse arithmetic difference with geometric ratio, or add instead of subtract when finding the difference.

Instructional Rationale: Distinguishing additive (arithmetic) from multiplicative (geometric) patterns is essential for sequence fluency. Learners must recognize the structural difference between the two sequence types.

Content: The sim presents 10 sequences, some arithmetic and some geometric. The learner identifies the arithmetic difference for each arithmetic sequence. Defaults: arithmetic sequences use a common difference of 2 or 3 with positive integer terms.

Learner Activity: The learner is given 10 sequences and must state the arithmetic difference for those that are arithmetic. Feedback indicates whether each classification is correct.

Feedback: Correct responses receive positive feedback with the correct difference. Incorrect responses show the step-by-step determination of the difference.

Starting State: The learner sees the title "Arithmetic Sequence Explorer" and a prompt to begin identifying differences.

Chapter Anchors: The chapter prose states that "An arithmetic sequence adds a constant value (arithmetic difference) to each term. The nth term formula is $a_n = a_1 + (n-1)d$ for arithmetic sequences."

</details>

## 4. Geometric Ratio

A **geometric ratio** (also called the common ratio) is the constant factor multiplied by each term to get the next term in a geometric sequence. If a sequence has a constant geometric ratio, then the ratio of any term to the previous term is always the same.

The geometric ratio is denoted by $r$ and is calculated as:

$$r = \frac{a_{n}}{a_{n-1}}$$

where $a_n$ is the nth term and $a_{n-1}$ is the previous term.

### Worked Example 5: Finding the Geometric Ratio

Find the geometric ratio in the sequence $2, 6, 18, 54, 162, \ldots$

**Solution:**

1. Calculate the ratio of consecutive terms:
   $$r = \frac{6}{2} = 3$$
   $$r = \frac{18}{6} = 3$$
   $$r = \frac{54}{18} = 3$$
   $$r = \frac{162}{54} = 3$$
2. The geometric ratio is consistently $3$.

**Answer:** The geometric ratio is $r = 3$.

### Key Takeaway

In a geometric sequence, the geometric ratio $r$ is the constant factor multiplied by each term to produce the next term. If the ratio varies, the sequence is not geometric.

<details markdown="1">
#### Diagram: Geometric Sequence Explorer

<summary>Geometric Sequence Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: compute<br/>
Learning Objective: The learner will compute the geometric ratio in a given sequence and use it to find the next term.

Prerequisites: Sequence Position, Sequence Term nth, Sequence Value

Evidence of Mastery: The learner correctly identifies the geometric ratio and uses it to extend the sequence or find a specific term.

Misconceptions: The learner may confuse geometric ratio with arithmetic difference, or multiply instead of divide when finding the ratio.

Instructional Rationale: Distinguishing additive (arithmetic) from multiplicative (geometric) patterns is essential for sequence fluency. Learners must recognize the structural difference between the two sequence types.

Content: The sim presents 10 sequences, some arithmetic and some geometric. The learner identifies the geometric ratio for each geometric sequence. Defaults: geometric sequences use a common ratio of 2 or 3 with positive integer terms.

Learner Activity: The learner is given 10 sequences and must state the geometric ratio for those that are geometric. Feedback indicates whether each classification is correct.

Feedback: Correct responses receive positive feedback with the correct ratio. Incorrect responses show the step-by-step determination of the ratio.

Starting State: The learner sees the title "Geometric Sequence Explorer" and a prompt to begin identifying ratios.

Chapter Anchors: The chapter prose states that "A geometric sequence multiplies by a constant factor (geometric ratio). The nth term formula is $a_n = a_1 \cdot r^{(n-1)}$ for geometric sequences."

</details>

## 5. Sequence Term nth

The **nth term** of a sequence is the value at position $n$ in the sequence. For arithmetic and geometric sequences, there are explicit formulas to find the nth term without computing all the previous terms.

### Arithmetic Sequence nth Term Formula

The nth term of an arithmetic sequence is given by:

$$a_n = a_1 + (n - 1)d$$

where $a_1$ is the first term, $n$ is the term position, and $d$ is the arithmetic difference.

### Geometric Sequence nth Term Formula

The nth term of a geometric sequence is given by:

$$a_n = a_1 \cdot r^{(n - 1)}$$

where $a_1$ is the first term, $n$ is the term position, and $r$ is the geometric ratio.

### Worked Example 6: Finding the nth Term of an Arithmetic Sequence

Find the 10th term of the arithmetic sequence $3, 7, 11, 15, \ldots$

**Solution:**

1. Identify the first term and arithmetic difference:
   $$a_1 = 3$$
   $$d = 7 - 3 = 4$$
2. Apply the nth term formula with $n = 10$:
   $$a_{10} = 3 + (10 - 1) \cdot 4 = 3 + 9 \cdot 4 = 3 + 36 = 39$$
3. The 10th term is 39.

**Answer:** The 10th term is $a_{10} = 39$.

### Worked Example 7: Finding the nth Term of a Geometric Sequence

Find the 6th term of the geometric sequence $3, 6, 12, 24, \ldots$

**Solution:**

1. Identify the first term and geometric ratio:
   $$a_1 = 3$$
   $$r = \frac{6}{3} = 2$$
2. Apply the nth term formula with $n = 6$:
   $$a_6 = 3 \cdot 2^{(6 - 1)} = 3 \cdot 2^5 = 3 \cdot 32 = 96$$
3. The 6th term is 96.

**Answer:** The 6th term is $a_6 = 96$.

### Key Takeaway

The explicit formulas for the nth term allow us to find any term in an arithmetic or geometric sequence directly, without computing all the previous terms. This is especially useful for finding terms far into the sequence.

<details markdown="1">
#### Diagram: Sequence Term Explorer

<summary>Sequence Term Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Apply<br/>
Bloom Verb: calculate<br/>
Learning Objective: The learner will calculate the nth term of an arithmetic or geometric sequence given the first term and common difference/ratio.

Prerequisites: Sequence Position, Arithmetic Difference, Geometric Ratio

Evidence of Mastery: The learner correctly applies the nth term formula to find a specific term far into the sequence without computing all intermediate terms.

Misconceptions: The learner may use $n$ instead of $n-1$ in the formula, or forget to multiply by the first term.

Instructional Rationale: The explicit formula is a powerful tool that saves computation time. Learners must understand the structure of the formula and the meaning of each component before applying it.

Content: The sim presents 5 sequences (arithmetic and geometric) and asks the learner to find the 8th, 10th, or 12th term. Defaults: sequences with integer first terms and differences/ratios of 1-3.

Learner Activity: The learner is given 5 sequences and must state the indicated term. Feedback shows the correct answer with step-by-step derivation.

Feedback: Correct responses receive positive feedback with the correct term. Incorrect responses show the partial calculation and identify the error.

Starting State: The learner sees the title "Sequence Term Explorer" and a prompt to begin computing terms.

Chapter Anchors: The chapter prose states that "The nth term formulas are $a_n = a_1 + (n-1)d$ for arithmetic and $a_n = a_1 \cdot r^{(n-1)}$ for geometric sequences. These formulas allow us to find any term directly."

</details>

## 6. Sequence Position

The **sequence position** refers to the index or rank of a term within a sequence. In most sequences, the position $n$ starts at $n = 1$ for the first term, $n = 2$ for the second term, and so on. The position $n$ is used in the explicit formulas for the nth term.

### Worked Example 8: Using Sequence Position

Given the arithmetic sequence $5, 9, 13, 17, \ldots$, find the term at position $n = 7$.

**Solution:**

1. Identify the first term and arithmetic difference:
   $$a_1 = 5$$
   $$d = 9 - 5 = 4$$
2. Apply the nth term formula with $n = 7$:
   $$a_7 = 5 + (7 - 1) \cdot 4 = 5 + 6 \cdot 4 = 5 + 24 = 29$$
3. The term at position 7 is 29.

**Answer:** The term at position $n = 7$ is $a_7 = 29$.

### Key Takeaway

The sequence position $n$ is the index of the term we want to find, and it is a crucial variable in the nth term formulas for both arithmetic and geometric sequences.

<details markdown="1">
#### Diagram: Sequence Position Explorer

<summary>Sequence Position Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: identify<br/>
Learning Objective: The learner will identify the position $n$ of a given term in a sequence and use position in the nth term formula.

Prerequisites: Sequence Term nth, Sequence Value

Evidence of Mastery: The learner correctly maps a term's position to its index and applies the nth term formula with the correct value of $n$.

Misconceptions: The learner may start counting from $n = 0$ instead of $n = 1$, or use $n$ directly without subtracting 1 in the formula.

Instructional Rationale: Sequence position is the bridge between the intuitive notion of "which term" and the formal nth term formula. Learners must master this connection before using the formula independently.

Content: The sim presents 5 sequences and asks the learner to state the position $n$ of a given term, or the term at a given position $n$. Defaults: simple arithmetic sequences with $a_1 = 1-5$ and $d = 1-3$.

Learner Activity: The learner is given 5 sequences and must state the position of a specified term, or the term at a specified position. Feedback confirms the correct position or term.

Feedback: Correct responses receive positive feedback. Incorrect responses show the correct position with explanatory notes.

Starting State: The learner sees the title "Sequence Position Explorer" and a prompt to begin working with positions.

Chapter Anchors: The chapter prose states that "Sequence position ($n$) is the index used in nth term formulas. For arithmetic sequences, $a_n = a_1 + (n-1)d$, and for geometric sequences, $a_n = a_1 \cdot r^{(n-1)}$."

</details>

## 7. Sequence Value

The **sequence value** is the actual numerical amount at a given position in a sequence. Each sequence has its own set of values determined by its starting term and the rule that generates the sequence (arithmetic difference or geometric ratio).

### Worked Example 9: Listing Sequence Values

List the first 5 values of the arithmetic sequence with $a_1 = 2$ and $d = 3$.

**Solution:**

- Position 1 ($n = 1$): $a_1 = 2$
- Position 2 ($n = 2$): $a_2 = 2 + 3 = 5$
- Position 3 ($n = 3$): $a_3 = 2 + 2 \cdot 3 = 8$
- Position 4 ($n = 4$): $a_4 = 2 + 3 \cdot 3 = 11$
- Position 5 ($n = 5$): $a_5 = 2 + 4 \cdot 3 = 14$

**Answer:** The first 5 values are: 2, 5, 8, 11, 14.

### Worked Example 10: Listing Sequence Values (Geometric)

List the first 5 values of the geometric sequence with $a_1 = 3$ and $r = 2$.

**Solution:**

- Position 1 ($n = 1$): $a_1 = 3$
- Position 2 ($n = 2$): $a_2 = 3 \cdot 2 = 6$
- Position 3 ($n = 3$): $a_3 = 3 \cdot 2^2 = 12$
- Position 4 ($n = 4$): $a_4 = 3 \cdot 2^3 = 24$
- Position 5 ($n = 5$): $a_5 = 3 \cdot 2^4 = 48$

**Answer:** The first 5 values are: 3, 6, 12, 24, 48.

### Key Takeaway

The sequence values are determined by the starting term and the generating rule (arithmetic difference or geometric ratio). Understanding the values helps us recognize patterns and make predictions about the sequence.

<details markdown="1">
#### Diagram: Sequence Value Explorer

<summary>Sequence Value Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Remember<br/>
Bloom Verb: list<br/>
Learning Objective: The learner will list the first $n$ values of a sequence given the starting term and generating rule.

Prerequisites: Sequence Position, Arithmetic Difference, Geometric Ratio

Evidence of Mastery: The learner correctly computes the first $n$ values of a sequence using the generating rule, starting from the first term.

Misconceptions: The learner may forget to start at the first term, or apply the difference/ratio the wrong number of times.

Instructional Rationale: Listing sequence values builds fluency with the generating rule and prepares learners for using the explicit nth term formula. Learners must understand that values are generated iteratively.

Content: The sim presents 5 sequences (arithmetic and geometric) and asks the learner to list the first 5 values. Defaults: sequences with $a_1 = 1-5$ and $d$ or $r = 1-3$.

Learner Activity: The learner is given 5 sequences and must list the first 5 values. Feedback shows the correct list with any errors highlighted.

Feedback: Correct responses receive positive feedback with the complete list. Incorrect responses show the partial list and identify which value(s) are wrong.

Starting State: The learner sees the title "Sequence Value Explorer" and a prompt to begin listing values.

Chapter Anchors: The chapter prose states that "Sequence values are determined by the starting term and the generating rule (arithmetic difference or geometric ratio). The first 5 values of an arithmetic sequence with $a_1 = 2$ and $d = 3$ are 2, 5, 8, 11, 14."

</details>

## 8. Mathematical Model

A **mathematical model** is a representation of a real-world situation using mathematical concepts and language. Mathematical models can be used to describe, explain, and predict phenomena in science, engineering, business, and many other fields.

### Types of Mathematical Models

- **Linear models:** Represent situations with a constant rate of change. Equation form: $y = mx + b$
- **Exponential models:** Represent situations with a constant percent change. Equation form: $y = a \cdot b^x$
- **Quadratic models:** Represent situations where the rate of change itself changes at a constant rate. Equation form: $y = ax^2 + bx + c$
- **Polynomial models:** Represent more complex relationships with multiple turning points.
- **Logarithmic models:** Represent situations where rapid initial change levels off over time.

### Worked Example 11: Creating a Mathematical Model

A taxi company charges a flat fee of $3 plus $2 per mile traveled. Write a mathematical model for the total cost $C$ in terms of miles $m$ driven.

**Solution:**

1. Identify the fixed (starting) value and the rate of change:
   - Flat fee (y-intercept): $b = 3$
   - Rate per mile (slope): $m = 2$
2. Write the linear equation using slope-intercept form:
   $$C = 2m + 3$$
3. The model predicts that for 0 miles, the cost is $3, and for each additional mile, the cost increases by $2$.

**Answer:** The mathematical model is $C = 2m + 3$.

### Worked Example 12: Exponential Model for Population Growth

A bacterial culture starts with 100 bacteria and doubles every hour. Write an exponential model for the population $P$ after $t$ hours.

**Solution:**

1. Identify the initial value and growth factor:
   - Initial population: $a = 100$
   - Doubling means the growth factor is $b = 2$
2. Write the exponential equation:
   $$P = 100 \cdot 2^t$$
3. The model predicts that after 3 hours, the population will be $P = 100 \cdot 2^3 = 800$ bacteria.

**Answer:** The exponential model is $P = 100 \cdot 2^t$.

### Key Takeaway

Mathematical models translate real-world situations into mathematical language, allowing us to analyze patterns, make predictions, and solve problems. The choice of model type (linear, exponential, quadratic) depends on the nature of the relationship between the variables.

<details markdown="1">
#### Diagram: Mathematical Model Explorer

<summary>Mathematical Model Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Apply<br/>
Bloom Verb: construct<br/>
Learning Objective: The learner will construct a mathematical model (linear or exponential) for a given real-world situation involving constant rate or percent change.

Prerequisites: Constant Rate Change, Constant Percent Change, Linear Model, Exponential Model

Evidence of Mastery: The learner correctly identifies the model type (linear vs. exponential) and writes the equation with the correct initial value and rate of change/percent change.

Misconceptions: The learner may choose a linear model for a percent-change situation, or misidentify the initial value or growth factor.

Instructional Rationale: Model selection is a critical skill that requires analyzing the type of change (constant amount vs. constant percent) in the situation. Learners must distinguish between additive and multiplicative relationships.

Content: The sim presents 5 real-world scenarios. The learner selects the model type (linear/exponential) and writes the equation. Defaults: 3 linear scenarios with integer rate of change; 2 exponential scenarios with integer percent change and initial value.

Learner Activity: The learner is given 5 scenarios and must select the model type and write the equation. Feedback shows the correct model or corrective guidance.

Feedback: Correct responses receive positive feedback with the correct model. Incorrect responses show the common error and guide the learner to re-examine the change type.

Starting State: The learner sees the title "Mathematical Model Explorer" and a prompt to begin modeling.

Chapter Anchors: The chapter prose states that "Linear models have equation form $y = mx + b$; exponential models have equation form $y = a \cdot b^x$. The choice of model depends on whether the situation involves a constant rate or constant percent change."

</details>

## 9. Data Display Scatterplot

A **scatterplot** is a graph that plots pairs of data points on a coordinate plane to show the relationship between two variables. Each point $(x, y)$ represents one observation or data entry.

### Creating a Scatterplot

1. Draw a coordinate plane with an x-axis (independent variable) and y-axis (dependent variable).
2. Label each axis with the variable name and appropriate scale.
3. For each data pair $(x, y)$, plot a point at the corresponding location on the graph.

### Interpreting a Scatterplot

- **Positive association:** As x increases, y tends to increase (points slope upward).
- **Negative association:** As x increases, y tends to decrease (points slope downward).
- **No association:** Points appear randomly scattered with no clear pattern.
- **Strength:** How closely the points follow a clear form (strong, moderate, weak).

### Worked Example 13: Interpreting a Scatterplot

The scatterplot below shows the relationship between hours studied and exam score for 10 students. Describe the association.

**Solution:**

Looking at the plotted points, we can see that as the number of hours studied increases, the exam scores tend to increase as well. The points generally follow an upward trend, indicating a **positive association**. The relationship appears to be moderately strong, as most points are clustered near an imaginary line through the center of the points.

**Answer:** There is a positive, moderate association between hours studied and exam score.

### Key Takeaway

Scatterplots are a fundamental tool for bivariate data analysis. They reveal patterns, trends, and potential relationships between two quantitative variables that might not be apparent from looking at the data in a table.

<details markdown="1">
#### Diagram: Scatterplot Explorer

<summary>Scatterplot Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: interpret<br/>
Learning Objective: The learner will interpret a scatterplot to determine the direction, form, and strength of the association between two quantitative variables.

Prerequisites: Bivariate Data, Coordinate Plane, Plot Points

Evidence of Mastery: The learner correctly identifies the direction (positive/negative), form (linear/nonlinear), and strength (strong/moderate/weak) of the association in a scatterplot.

Misconceptions: The learner may confuse strength with the steepness of the trend, or interpret any upward trend as "strong" regardless of point clustering.

Instructional Rationale: Scatterplot interpretation is a foundational skill for bivariate data analysis. Learners must develop the ability to look beyond individual points and discern the overall pattern.

Content: The sim presents 5 scatterplots with different associations (positive, negative, none, varying strengths). The learner describes the association for each. Defaults: 2 positive, 2 negative, 1 no association, with point clusters that clearly show the difference between strong and moderate.

Learner Activity: The learner is given 5 scatterplots and must describe the association (direction, form, strength). Feedback shows the correct description with explanation.

Feedback: Correct responses receive positive feedback with the correct classification. Incorrect responses show the correct interpretation with explanation of why the original was wrong.

Starting State: The learner sees the title "Scatterplot Explorer" and a prompt to begin interpreting.

Chapter Anchors: The chapter prose states that "Scatterplots reveal patterns, trends, and potential relationships between two quantitative variables. Positive association means y increases with x; negative means y decreases with x. Strength reflects how closely points follow a clear form."

</details>

## 10. Data Display Line Graph

A **line graph** (or line chart) displays data points connected by straight line segments. It is particularly useful for showing trends over time or ordered categories.

### Creating a Line Graph

1. Draw a coordinate plane with an x-axis (category or time period) and y-axis (value or frequency).
2. Plot data points at the appropriate x- and y-coordinates.
3. Connect the points in order with straight line segments.
4. Title the graph and label both axes.

### Interpreting a Line Graph

- **Trends:** The direction of the line (upward = increase, downward = decrease, horizontal = no change).
- **Peaks and valleys:** The highest and lowest points show maximum and minimum values.
- **Patterns:** Repeated patterns may indicate cyclical or seasonal behavior.

### Worked Example 14: Interpreting a Line Graph

The line graph shows the average daily temperature over a 7-day week. Describe the temperature trend.

**Solution:**

The line starts low on Monday, rises through Wednesday to a peak on Thursday, then gradually declines through Friday and Saturday, reaching the lowest point on Sunday. This pattern suggests a typical weekly temperature cycle, warmest mid-week and coolest on the weekend.

**Answer:** The temperature peaks mid-week (Thursday) and is lowest on Sunday, showing a typical weekly pattern.

### Key Takeaway

Line graphs are ideal for displaying data collected over time or across ordered categories. They make it easy to see trends, fluctuations, and comparisons between different data series.

<details markdown="1">
#### Diagram: Line Graph Explorer

<summary>Line Graph Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: interpret<br/>
Learning Objective: The learner will interpret a line graph to identify trends, peaks, valleys, and patterns in data collected over time or across ordered categories.

Prerequisites: Coordinate Plane, Ordered Pairs, Axis Labels

Evidence of Mastery: The learner correctly identifies the direction of trends (increasing/decreasing/horizontal), locates peaks and valleys, and recognizes repeated patterns in the graphed data.

Misconceptions: The learner may confuse the overall trend with local fluctuations, or identify a peak that is not the global maximum.

Instructional Rationale: Line graph interpretation helps learners extract meaningful patterns from time-ordered data. Understanding trends, peaks, and valleys is essential for data literacy.

Content: The sim presents 5 line graphs showing weekly data (temperature, sales, etc.). The learner describes the trend, identifies peaks/valleys, and notes any patterns. Defaults: 5 different weekly scenarios with varied patterns (single peak, multiple peaks, cyclical, declining, flat).

Learner Activity: The learner is given 5 line graphs and must describe the trend, identify peaks/valleys, and note patterns. Feedback confirms correct interpretations.

Feedback: Correct responses receive positive feedback with the correct description. Incorrect responses show the correct interpretation with guidance.

Starting State: The learner sees the title "Line Graph Explorer" and a prompt to begin interpreting.

Chapter Anchors: The chapter prose states that "Line graphs display data over time or across ordered categories. The direction of the line shows increase, decrease, or no change. Peaks and valleys represent maximum and minimum values."

</details>

## 11. Data Display Bar Graph

A **bar graph** (or bar chart) uses rectangular bars to represent the frequency or value of categories. The length of each bar is proportional to the value it represents. Bar graphs are useful for comparing quantities across different categories.

### Creating a Bar Graph

1. List the categories along the x-axis (horizontal axis).
2. Draw a y-axis (vertical axis) with a scale that covers the range of values.
3. For each category, draw a bar whose height corresponds to the value or frequency.
4. Label both axes and give the graph a title.

### Interpreting a Bar Graph

- **Bar height:** The taller the bar, the greater the value or frequency.
- **Category comparison:** The relative heights of bars show how categories compare.
- **Grouped or stacked bars:** Can show sub-categories within each main category.

### Worked Example 15: Interpreting a Bar Graph

The bar graph shows the number of students enrolled in each math course at a high school. Which course has the most enrollment?

**Solution:**

The bars have the following heights (enrollment counts):
- Algebra I: 120 students
- Geometry: 105 students
- Algebra II: 85 students
- Pre-Calculus: 60 students
- AP Calculus: 25 students

The tallest bar is for Algebra I with 120 students.

**Answer:** Algebra I has the most enrollment with 120 students.

### Key Takeaway

Bar graphs are excellent for comparing discrete categories. The visual length of the bars makes it easy to see which categories have the highest and lowest values at a glance.

<details markdown="1">
#### Diagram: Bar Graph Explorer

<summary>Bar Graph Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Understand<br/>
Bloom Verb: compare<br/>
Learning Objective: The learner will interpret a bar graph to compare quantities across discrete categories and identify the category with the greatest or least value.

Prerequisites: Categorical Data, Bar Graph Construction, Axis Labels

Evidence of Mastery: The learner correctly identifies the category with the greatest or least value based on bar height, and can order categories by frequency or value.

Misconceptions: The learner may confuse bar height with bar width, or compare categories that are not adjacent on the x-axis.

Instructional Rationale: Bar graphs are often the first introduction to comparative data visualization. Learners must understand that bar length (not position or color) encodes the value.

Content: The sim presents 5 bar graphs comparing categories (students in courses, budget items, survey responses). The learner identifies the category with the highest or lowest value. Defaults: 5 scenarios with 4-6 categories and integer values.

Learner Activity: The learner is given 5 bar graphs and must identify the category with the highest or lowest value, or rank categories by value. Feedback shows the correct identification with bar heights.

Feedback: Correct responses receive positive feedback with the correct identification. Incorrect responses show the correct bar heights and identify the error.

Starting State: The learner sees the title "Bar Graph Explorer" and a prompt to begin comparing.

Chapter Anchors: The chapter prose states that "Bar graph bar height represents the value or frequency of each category. The tallest bar has the greatest value, the shortest has the least. Bars allow easy comparison across categories."

</details>

## 12. Data Display Circle Graph

A **circle graph** (also called a **pie chart**) is a circular statistical graphic divided into slices to illustrate numerical proportions. Each slice represents a category's contribution to the whole.

### Creating a Circle Graph

1. Calculate the total of all values.
2. For each category, compute the angle of its slice:
   $$\text{Angle} = \frac{\text{Category Value}}{\text{Total}} \times 360^\circ$$
3. Draw a circle and use a protractor to mark each slice's angle from the center.
4. Label each slice with the category name and percentage or count.

### Interpreting a Circle Graph

- **Slice size:** Larger slices represent larger proportions of the whole.
- **Percentage:** Each slice is typically labeled with the percent it represents.
- **Comparison:** Slices can be compared to see which categories are larger or smaller.

### Worked Example 16: Creating a Circle Graph

The following data shows the favorite sports of 20 students: Soccer (8), Basketball (6), Baseball (4), Tennis (2). Create a circle graph.

**Solution:**

1. Total students: $8 + 6 + 4 + 2 = 20$
2. Compute each slice's angle:
   - Soccer: $\frac{8}{20} \times 360^\circ = 0.4 \times 360^\circ = 144^\circ$
   - Basketball: $\frac{6}{20} \times 360^\circ = 0.3 \times 360^\circ = 108^\circ$
   - Baseball: $\frac{4}{20} \times 360^\circ = 0.2 \times 360^\circ = 72^\circ$
   - Tennis: $\frac{2}{20} \times 360^\circ = 0.1 \times 360^\circ = 36^\circ$
3. Draw the circle graph with these four slices.

**Answer:** The circle graph has slices of 144° (Soccer), 108° (Basketball), 72° (Baseball), and 36° (Tennis), totaling 360°.

### Key Takeaway

Circle graphs show how a whole is divided into parts. They are most effective when there are a few categories (5 or fewer) and when the goal is to show the relative size of each part compared to the whole.

<details markdown="1">
#### Diagram: Circle Graph Explorer

<summary>Circle Graph Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Apply<br/>
Bloom Verb: calculate<br/>
Learning Objective: The learner will calculate slice angles for a circle graph and interpret the relative sizes of slices to compare category proportions.

Prerequisites: Fraction to Percentage, Percentages, Circle Graph Angles

Evidence of Mastery: The learner correctly computes the angle for each slice using $\frac{\text{Category Value}}{\text{Total}} \times 360^\circ$ and can order slices by size to compare proportions.

Misconceptions: The learner may forget to multiply by 360°, or compute the angle for one slice but not verify that all slices sum to 360°.

Instructional Rationale: Circle graph construction reinforces fraction-to-percent conversion and the concept of parts of a whole. Learners must understand the proportional relationship between category value and slice angle.

Content: The sim presents 5 circle graphs with different data sets (4-6 categories). The learner computes slice angles and identifies the largest/smallest slice. Defaults: 5 scenarios with 4 categories and integer values that sum to 20 or 30.

Learner Activity: The learner is given 5 circle graph data sets and must compute each slice's angle. Feedback shows the correct angle with any calculation errors highlighted.

Feedback: Correct responses receive positive feedback with the correct angle. Incorrect responses show the correct calculation and identify the error.

Starting State: The learner sees the title "Circle Graph Explorer" and a prompt to begin computing angles.

Chapter Anchors: The chapter prose states that "Circle graph slice angle is $\frac{\text{Category Value}}{\text{Total}} \times 360^\circ$. Larger slices represent larger proportions. All slices sum to 360°."

</details>

## 13. Statistical Question

A **statistical question** is a question that can be answered by collecting data, and where the answer involves variability. Unlike a deterministic question, a statistical question expects different answers each time it is asked because of natural variability in the data.

### Characteristics of Statistical Questions

- **Data-driven:** The question expects an answer based on data collection.
- **Variability:** The anticipated answers will vary because of differences in the population or measurements.
- **Anticipated:** The variability is expected before data is collected.

### Non-Examples (Not Statistical Questions)

- "What is the capital of France?" $\rightarrow$ Has one factual answer, no variability.
- "How many days are in February 2024?" $\rightarrow$ Has one factual answer (29 days, leap year), no variability.
- "What is $5 + 3$?" $\rightarrow$ Has one exact answer (8), no variability.

### Examples (Statistical Questions)

- "What is the average height of students in this class?" $\rightarrow$ Expects variability in heights; answer involves collecting data.
- "What is the most common pet type among students in this school?" $\rightarrow$ Expects variability in pet preferences; answer involves collecting and analyzing data.
- "Do students who eat breakfast tend to have higher grades?" $\rightarrow$ Expects variability in both breakfast habits and grades; answer involves comparing two data sets.

### Worked Example 17: Identifying Statistical Questions

Which of the following are statistical questions?

a) "What is the height of the tallest student in the class?"
b) "What are the heights of all students in the class?"
c) "How much do the heights of students in the class vary?"
d) "Is the average height of students in this class greater than 5 feet?"

**Solution:**

a) This is a statistical question because it requires collecting height data from all students, and the answer involves identifying the maximum value, which will vary between classes.

b) This is a statistical question because it involves collecting height data from all students, and the individual heights will vary.

c) This is a statistical question because it requires collecting height data and analyzing the variability (spread) of the data.

d) This is a statistical question because it requires collecting height data to compute an average, and the answer will depend on the specific class's students, which varies.

**Answer:** All of (a), (b), (c), and (d) are statistical questions.

### Key Takeaway

Statistical questions are the foundation of statistics. They differ from mathematical questions in that they expect variability in the data and require data collection to answer. Recognizing statistical questions is the first step in the statistical problem-solving process.

<details markdown="1">
#### Diagram: Statistical Question Explorer

<summary>Statistical Question Explorer</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Remember<br/>
Bloom Verb: identify<br/>
Learning Objective: The learner will identify whether a given question is a statistical question based on whether it expects variability in data and requires data collection to answer.

Prerequisites: Data Collection, Variability, Question Types

Evidence of Mastery: The learner correctly classifies questions as statistical or non-statistical, explaining the reason based on variability and data collection requirements.

Misconceptions: The learner may classify any question involving numbers as statistical, or fail to recognize that questions about specific individuals without variability are not statistical.

Instructional Rationale: Distinguishing statistical from non-statistical questions is the first step in the statistical problem-solving process. Learners must understand the defining characteristic: anticipated variability requiring data collection.

Content: The sim presents 10 questions of varying types. The learner identifies each as statistical or non-statistical and explains the reason. Defaults: 5 statistical questions and 5 non-statistical questions covering common question types (measurement, comparison, prediction, description).

Learner Activity: The learner is given 10 questions and must classify each as statistical or non-statistical and explains the reason. Feedback confirms the correct classification with explanation.

Feedback: Correct responses receive positive feedback with the correct classification and justification. Incorrect responses show the correct classification and explain why the original was classified incorrectly.

Starting State: The learner sees the title "Statistical Question Explorer" and a prompt to begin classifying.

Chapter Anchors: The chapter prose states that "A statistical question expects variability in the data and requires data collection to answer. Non-statistical questions have one factual answer without variability."

</details>

## Chapter Review and Key Takeaways

In this chapter, we have covered the advanced concepts and review topics for Algebra I. The key ideas include:

1. **Constant rate of change** represents linear relationships with a constant slope.
2. **Constant percent change** represents exponential growth and decay situations.
3. **Arithmetic difference** is the constant value added to each term in an arithmetic sequence.
4. **Geometric ratio** is the constant factor multiplied by each term in a geometric sequence.
5. **nth term formulas** allow us to find any term in a sequence directly.
6. **Sequence position** ($n$) is the index used in nth term formulas.
7. **Sequence values** are determined by the starting term and generating rule.
8. **Mathematical models** translate real-world situations into mathematical language using linear, exponential, quadratic, and other function types.
9. **Scatterplots**, **line graphs**, **bar graphs**, and **circle graphs** are essential tools for displaying and interpreting data.
10. **Statistical questions** expect variability in data and require data collection to answer.

### Key Formulas Summary

- Rate of change (slope): $m = \frac{y_2 - y_1}{x_2 - x_1}$
- Arithmetic sequence nth term: $a_n = a_1 + (n - 1)d$
- Geometric sequence nth term: $a_n = a_1 \cdot r^{(n - 1)}$
- Percent change: $\frac{\text{New} - \text{Old}}{\text{Old}} \times 100\%$
- Linear model: $y = mx + b$
- Exponential model: $y = a \cdot b^x$

## Chapter Practice and Exercises

#### Exercise Set 1: Constant Rate of Change

For each set of points, find the rate of change (slope):

1. $(1, 2)$ and $(3, 8)$
2. $(2, 5)$ and $(4, 11)$
3. $(0, 3)$ and $(5, 15)$
4. $(-1, 4)$ and $(2, 1)$
5. $(3, 7)$ and $(3, 7)$ (vertical line, undefined slope)

#### Exercise Set 2: Constant Percent Change

Identify whether each situation involves exponential growth or decay, and find the percent change:

1. A population of 100 increases by 5% each year.
2. A car's value decreases by 15% each year.
3. A bacteria culture doubles every hour.
4. A radioactive substance loses 10% of its mass every month.

#### Exercise Set 3: Arithmetic Difference

Find the arithmetic difference $d$ in each sequence:

1. $3, 7, 11, 15, 19, \ldots$
2. $20, 15, 10, 5, 0, \ldots$
3. $x, x+4, x+8, x+12, \ldots$ (in terms of $x$)
4. $1, 4, 9, 16, 25, \ldots$ (note: this is NOT an arithmetic sequence)

#### Exercise Set 4: Geometric Ratio

Find the geometric ratio $r$ in each sequence:

1. $2, 6, 18, 54, 162, \ldots$
2. $80, 40, 20, 10, 5, \ldots$
3. $3, 6, 12, 24, 48, \ldots$
4. $1, 1, 1, 1, 1, \ldots$ (ratio is 1)

#### Exercise Set 5: nth Term of Arithmetic Sequences

Find the indicated term of each arithmetic sequence:

1. 10th term of $4, 9, 14, 19, \ldots$
2. 5th term of $10, 6, 2, -2, \ldots$
3. 15th term of the sequence with $a_1 = 7$ and $d = 3$

#### Exercise Set 6: nth Term of Geometric Sequences

Find the indicated term of each geometric sequence:

1. 8th term of $3, 6, 12, 24, \ldots$
2. 6th term of $5, 10, 20, 40, \ldots$
3. 7th term of the sequence with $a_1 = 2$ and $r = 3$

#### Exercise Set 7: Sequence Position

Given the arithmetic sequence $5, 9, 13, 17, \ldots$, find the term at each position:

1. Position $n = 3$
2. Position $n = 8$
3. Position $n = 12$

#### Exercise Set 8: Sequence Values

List the first 5 values of each sequence:

1. Arithmetic sequence with $a_1 = 1$ and $d = 4$
2. Geometric sequence with $a_1 = 2$ and $r = 3$
3. Arithmetic sequence with $a_1 = 10$ and $d = -2$

#### Exercise Set 9: Mathematical Models

Write a mathematical model (equation) for each situation:

1. A phone plan costs $20 per month plus $0.05 per text message.
2. A savings account starts with $500 and earns 2% interest per year, compounded annually.
3. A ball is thrown upward, and its height $h$ in feet after $t$ seconds is modeled by $h = -16t^2 + 32t + 5$.

#### Exercise Set 10: Data Displays

Choose the appropriate data display for each situation and explain why:

1. Showing the favorite sports of students in a class (choose between scatterplot, line graph, bar graph, circle graph).
2. Showing the change in temperature over a 24-hour period.
3. Comparing the number of students in each grade level (9th, 10th, 11th, 12th).
4. Showing the proportion of a budget spent on different categories (rent, food, entertainment, savings).

#### Exercise Set 11: Statistical Questions

Determine whether each question is a statistical question. Explain your reasoning:

1. "What is the median height of students in my grade?"
2. "How many hours did I study yesterday?"
3. "What is the most common eye color among students in my school?"
4. "Did it rain more yesterday than the day before?"

#### Exercise Set 12: Review Problems

Solve each problem:

1. Find the rate of change between $(1, 3)$ and $(4, 12)$.
2. Find the 6th term of the arithmetic sequence $2, 5, 8, 11, \ldots$
3. Find the 5th term of the geometric sequence $3, 9, 27, 81, \ldots$
4. Write a mathematical model for a taxi that charges $4$ initial fee plus $2$ per mile.
5. Identify whether the question "What is the average score on the math test?" is a statistical question and explain why.

### Chapter Summary

In this chapter, we have reviewed and extended the advanced concepts of Algebra I that will support success in subsequent mathematics courses. Students should now be able:

- Identify and interpret constant rate of change and constant percent change relationships
- Distinguish between arithmetic and geometric sequences and use the appropriate formulas
- Find the nth term of arithmetic and geometric sequences given the first term and common difference/ratio
- Create and interpret mathematical models using linear, exponential, and quadratic functions
- Choose and create appropriate data displays (scatterplots, line graphs, bar graphs, circle graphs) to visualize data
- Formulate and recognize statistical questions that anticipate variability in data

Students who master these concepts are prepared for success in subsequent courses covering functions, calculus, statistics, and discrete mathematics. Continued practice with sequence patterns, mathematical modeling, and data analysis will build fluency and confidence for applying these skills to complex, real-world problems.

---