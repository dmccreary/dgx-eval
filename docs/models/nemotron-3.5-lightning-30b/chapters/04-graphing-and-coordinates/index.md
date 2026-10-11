---
title: "Graphing and Coordinates"
description: "This chapter covers the key concepts for graphing and coordinates. Students will develop fluency in the core algebraic skills and topics presented in this chapter, building on foundational knowledge and preparing for more advanced topics."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 16:53:00"
version: 1.11
---

# Graphing and Coordinates

## Summary
This chapter covers the key concepts for graphing and coordinates. Students will develop fluency in the core algebraic skills and topics presented in this chapter, building on foundational knowledge and preparing for more advanced topics.

## Concepts Covered
| Concept | Concept Impact Score |
|---------|----------------------|
| Create Scatterplot | 277 |
| Interpret Scatterplot | 115 |
| Correlation Coefficient | 42 |
| Line of Best Fit | 32 |
| Compare Linear Model | 1 |
| Compare Exponential Model | 3 |
| Arithmetic Sequence | 3 |
| Geometric Sequence | 3 |
| Sequence Term | 26 |
| Sequence Recursive Rule | 10 |
| Sequence Explicit Rule | 4 |
| Evaluate Algebraic Expression | 1 |
| Distributive Property | 7 |
| Commutative Property | 1 |
| Associative Property | 5 |
| Expand Binomial | 4 |
| Factor By Grouping | 2 |

## Prerequisites
[Prerequisites from prior chapters or course description]

## Elaboration Budget (CIS-Driven)

| Concept | CIS | E(c) | Tier | Target Words | Required Elements |
|---------|-----|------|------|---------------|--------------------|
| Create Scatterplot | 277 | 0.558 | A | 500-750 | worked example + diagram/chart |
| Interpret Scatterplot | 115 | 0.471 | B | 250-400 | worked example |
| Correlation Coefficient | 42 | 0.373 | B | 250-400 | worked example |
| Line of Best Fit | 32 | 0.346 | B | 250-400 | worked example |
| Compare Linear Model | 1 | 0.069 | C | 120-200 | definition |
| Compare Exponential Model | 3 | 0.137 | C | 120-200 | definition |
| Arithmetic Sequence | 3 | 0.137 | C | 120-200 | definition |
| Geometric Sequence | 3 | 0.137 | C | 120-200 | definition |
| Sequence Term | 26 | 0.327 | B | 250-400 | worked example |
| Sequence Recursive Rule | 10 | 0.238 | B | 250-400 | worked example |
| Sequence Explicit Rule | 4 | 0.159 | C | 120-200 | definition |
| Evaluate Algebraic Expression | 1 | 0.069 | C | 120-200 | definition |
| Distributive Property | 7 | 0.206 | B | 250-400 | worked example |
| Commutative Property | 1 | 0.069 | C | 120-200 | definition |
| Associative Property | 5 | 0.178 | C | 120-200 | definition |
| Expand Binomial | 4 | 0.159 | C | 120-200 | definition |
| Factor By Grouping | 2 | 0.109 | C | 120-200 | definition |

**Chapter total target words:** ~3,590-5,150 (sum of per-concept targets)

## Content

Before we begin graphing, let's define two foundational terms that will appear throughout this chapter: **coordinate** an ordered pair `(x, y)` that specifies a location on a plane, and **scatterplot** a graph that displays the relationship between two quantitative variables by plotting ordered pairs as points. Understanding these basics will help us make sense of the more complex ideas ahead.

### 1. Create Scatterplot {#create-scatterplot}

[Tier A: E(c) = 0.558, Target: 500-750 words, Required: worked example + diagram/chart]

Imagine you have collected data on students' study hours and their quiz scores. You suspect there might be a relationship — perhaps more study leads to higher scores. To visualize this, you would plot each student's `(study_hours, quiz_score)` as a point on a coordinate plane. The collection of all such points forms a scatterplot.

**Worked Example:** Suppose we have the following data for 5 students:

| Student | Study Hours (x) | Quiz Score (y) |
|---------|-----------------|----------------|
| Alice   | 2               | 65             |
| Bob     | 4               | 75             |
| Carol   | 6               | 85             |
| Dave    | 8               | 90             |
| Eve     | 10              | 95             |

To create a scatterplot, we plot each `(x, y)` pair: Alice at `(2, 65)`, Bob at `(4, 75)`, and so on. Using graph paper or software, we mark each point. Looking at the pattern, we see that as study hours increase, quiz scores tend to increase as well — this suggests a positive association.

**Before we examine the scatterplot diagram below, let's recall:** a scatterplot displays the relationship between two quantitative variables. Each point represents one observation's values on both variables. The overall pattern (form, direction, strength) helps us understand whether and how the variables are related.

#### Diagram: Scatterplot of Study Hours vs. Quiz Scores

<details markdown="1">
<summary>Scatterplot: Study Hours vs. Quiz Scores</summary>

![Scatterplot showing positive association between study hours and quiz scores]{ class="mascot-admonition-img" }

The scatterplot above displays 5 data points: `(2, 65)`, `(4, 75)`, `(6, 85)`, `(8, 90)`, and `(10, 95)`. We can see a clear upward trend — as study hours increase, quiz scores tend to increase. This positive association suggests that more study time is related to higher quiz scores.

**Key observation:** The points roughly follow a linear pattern, indicating a linear relationship between study hours and quiz scores. The strength appears moderate to strong, as the points are fairly close to an imaginary straight line through them.

</details>

**MicroSim Specification:**

<details markdown="1">
<summary>Create Scatterplot Interactive Simulation</summary>

Type: microsim<br/>
Library: p5.js<br/>
Status: Specified<br/>
Bloom Level: Create<br/>
Bloom Verb: create<br/>
Learning Objective: The learner will create a scatterplot given a set of bivariate data, plotting each `(x, y)` point accurately on a coordinate plane.

**Prerequisites:** Coordinate pairs `(x, y)`, horizontal axis (x-axis), vertical axis (y-axis), scale and units

**Evidence of Mastery:** The learner accurately plots at least 8 out of 10 given `(x, y)` points on a coordinate plane, with each point positioned at the correct horizontal and vertical position.

**Misconceptions:** Confusing the x- and y-coordinates; plotting points by counting total distance from origin rather than horizontal then vertical distance; assuming any pattern in a scatterplot implies causation.

**Instructional Rationale:** Creating scatterplots requires the learner to transform tabular data into a visual representation, integrating knowledge of coordinate systems with the ability to recognize patterns in bivariate data. This hands-on construction builds deeper understanding than simply viewing a pre-made graph.

**Content:** The learner is given a table of 10 `(x, y)` values ranging from `(1, 2)` to `(10, 18)`. They must plot each point on a blank coordinate grid with axes labeled and scaled from 0 to 11. After plotting, they verify their work by checking that each point's horizontal position matches its x-value and vertical position matches its y-value.

**Provenance:** Example adapted from Illustrative Mathematics, Algebra I, Unit 1, Lesson 1; synthetic data with seed `2026-AlgebraI-CH4`.

**Rules:** 
- Each point's x-coordinate determines horizontal position: `position_x = x * step_size + origin_x`
- Each point's y-coordinate determines vertical position: `position_y = -y * step_size + origin_y` (negative because screen y increases downward)
- Default step size: 40 pixels per unit; origin at center (200, 200)
- Adjustable parameters: `num_points` (2-20, step 2), `x_range` (2-20, step 2), `y_range` (2-20, step 2)
- Default values: `num_points = 5`, `x_range = 10`, `y_range = 18`
- Tie-break: If two points have the same coordinates, display them slightly offset with a small gap

**Learner Activity:** 
1. Enter 10 `(x, y)` points from a given table into the simulation
2. Click "Plot Points" to display each point on the coordinate grid
3. Use the "Check Answers" button to see which points are correct and which need adjustment
4. Notice the overall pattern/cluster/direction of the plotted points
5. Adjust the point positions until all 10 are in the correct locations

**Feedback:** 
- After each attempt, the learner receives immediate feedback: "Correct!" if all points are within ±1 pixel of the target position, or "Check the position of point #3 — it's too far left/right/up/down." if any point is incorrect. Correct answers are revealed after 3 attempts.

**Starting State:** The learner sees a blank coordinate grid with axes labeled "Study Hours" (x) and "Quiz Score" (y), ranging from 0 to 11 and 0 to 20 respectively. A table of 5 `(x, y)` values is shown, with the first value `(1, 2)` highlighted. The question posed: "Plot the first point `(1, 2)` on the grid."

**Chapter Anchors:** 
- The chapter states that "scatterplots display the relationship between two quantitative variables"
- "A positive association means both variables tend to increase together"
- "Looking at the overall pattern (form, direction, strength) helps us understand the relationship"
- The scatterplot MicroSim will demonstrate these properties with the study hours/quiz scores data

</details>

Now let's look at the scatterplot diagram more closely. The diagram above shows the 5 points from our worked example. Notice how they form an upward-left-to-downward-right pattern, indicating a positive association. The x-axis represents study hours (2, 4, 6, 8, 10) and the y-axis represents quiz scores (65, 75, 85, 90, 95).

#### Comparing Linear and Exponential Models for Scatterplot Data {#compare-models}

When a scatterplot shows a linear pattern, we often want to fit a line through the points to make predictions. This is called the **line of best fit** (or trend line). For the study hours/quiz scores data, the line of best fit might have equation `ŷ = 5x + 55`, where `ŷ` is the predicted quiz score and `x` is study hours.

If the data shows a curve rather than a straight line, we might use an **exponential model** instead, such as `y = a ⋅ bˣ`. For example, population growth or compound interest often follows an exponential pattern.

**Before we examine the comparison table below, let's recall:** a linear model has constant rate of change (same increase in y for each unit increase in x), while an exponential model has constant percent rate of change (y multiplies by same factor for each unit increase in x).

| Model Type | Equation Form | Rate of Change | When It's Used |
|------------|---------------|----------------|----------------|
| Linear | `y = mx + b` | Constant: `m` units of y per 1 unit of x | Relationship appears as straight line in scatterplot |
| Exponential | `y = a ⋅ bˣ` | Constant factor: `b` multiplier per 1 unit of x | Relationship appears as curve in scatterplot; y changes by constant percentage |

**Bridge sentence:** Now let's look at the sequences concepts, which deal with ordered lists of numbers following specific patterns.

### 2. Interpret Scatterplot {#interpret-scatterplot}

[Tier B: E(c) = 0.471, Target: 250-400 words, Required: worked example]

A scatterplot helps us see patterns in bivariate data. When we look at a scatterplot, we ask three main questions:

1. **Form:** Is the pattern linear (straight), curved, circular, or something else?
2. **Direction:** Does y tend to increase (positive association), decrease (negative association), or show no clear pattern as x increases?
3. **Strength:** Do the points cluster closely around a pattern (strong), or are they widely scattered (weak)?

**Worked Example:** Consider this scatterplot description: "The points form a rough upward-slanting cloud, with higher y-values tend accompanying higher x-values. The points are somewhat close to an imaginary straight line through them."

**Interpretation:** This scatterplot shows a **positive association** with **linear form** and **moderate strength**. As the x-variable increases, the y-variable tends to increase as well. The moderate strength means the points follow the general trend but with some variation.

**Bridge sentence:** Let's now look at correlation coefficient, which quantifies the strength and direction of a linear association.

### 3. Correlation Coefficient {#correlation-coefficient}

[Tier B: E(c) = 0.373, Target: 250-400 words, Required: worked example]

The **correlation coefficient** (denoted `r`) is a number between -1 and 1 that measures the strength and direction of a linear association between two quantitative variables. The value of `r` tells us:

- `r > 0`: Positive association — as x increases, y tends to increase
- `r < 0`: Negative association — as x increases, y tends to decrease
- `r close to 1`: Strong positive linear relationship
- `r close to -1`: Strong negative linear relationship
- `r close to 0`: Little or no linear relationship

**Worked Example:** Suppose we compute the correlation coefficient for the study hours/quiz scores data and get `r = 0.88`. This means:

- There is a strong positive linear association between study hours and quiz scores
- About 77% of the variation in quiz scores (`r² = 0.88² ≈ 0.77`) can be attributed to variation in study hours (this quantity `r²` is called the coefficient of determination)
- The remaining 23% of the variation is due to other factors not captured by study hours alone

**Bridge sentence:** Now let's examine the line of best fit, which gives us a specific equation for making predictions from scatterplot data.

### 4. Line of Best Fit {#line-of-best-fit}

[Tier B: E(c) = 0.346, Target: 250-400 words, Required: worked example]

The **line of best fit** (also called the **trend line** or **regression line**) is a straight line that best represents the pattern in a scatterplot. One common method for finding it is **least squares**, which minimizes the sum of the squared vertical distances between the data points and the line.

**Worked Example:** For our study hours/quiz scores data, the line of best fit might be computed as `ŷ = 5x + 55`. This means:

- The slope `m = 5` tells us that for each additional hour of study, the predicted quiz score increases by 5 points
- The y-intercept `b = 55` tells us the predicted quiz score when study hours = 0
- To predict quiz score for a student who studies 6 hours: `ŷ = 5(6) + 55 = 85`

**Bridge sentence:** Now let's move to sequences, which deal with ordered lists of numbers following specific patterns.

### 5. Compare Linear Model {#compare-linear-model}

[Tier C: E(c) = 0.069, Target: 120-200 words, Required: definition]

A **linear model** describes a relationship between two variables where the rate of change is constant. In a scatterplot, a linear model appears as a straight-line pattern. The general equation is `y = mx + b`, where `m` is the slope (rate of change) and `b` is the y-intercept.

**Key point:** In a linear model, increasing x by 1 unit always changes y by exactly `m` units, regardless of the starting value of x.

**Bridge sentence:** Now let's look at exponential models, where the rate of change is not constant but depends on the current value.

### 6. Compare Exponential Model {#compare-exponential-model}

[Tier C: E(c) = 0.137, Target: 120-200 words, Required: definition]

An **exponential model** describes a relationship where the rate of change is proportional to the current value. In a scatterplot, an exponential model appears as a curved pattern. The general equation is `y = a ⋅ bˣ`, where `a` is the initial value (when x = 0) and `b` is the growth/decay factor.

- If `b > 1`: Exponential growth — y multiplies by `b` for each unit increase in x
- If `0 < b < 1`: Exponential decay — y multiplies by `b` (a fraction) for each unit increase in x

**Key point:** In an exponential model, the change in y for each unit increase in x depends on the current value of y. The larger y gets, the larger the absolute change becomes, even though the relative change (factor `b`) stays the same.

**Bridge sentence:** Now let's look at arithmetic sequences, which are lists of numbers with a constant difference between consecutive terms.

### 7. Arithmetic Sequence {#arithmetic-sequence}

[Tier C: E(c) = 0.137, Target: 120-200 words, Required: definition]

An **arithmetic sequence** is an ordered list of numbers where the difference between consecutive terms is constant. This constant difference is called the **common difference**, denoted `d`.

**Example:** The sequence `3, 7, 11, 15, 19, …` is arithmetic with common difference `d = 4`, because each term is 4 more than the previous term.

**Formula:** The `n`th term of an arithmetic sequence can be found using `a_n = a_1 + (n-1)d`, where `a_1` is the first term and `n` is the term number.

**Bridge sentence:** Now let's look at geometric sequences, where each term is obtained by multiplying by a constant factor.

### 8. Geometric Sequence {#geometric-sequence}

[Tier C: E(c) = 0.137, Target: 120-200 words, Required: definition]

A **geometric sequence** is an ordered list of numbers where each term after the first is found by multiplying the previous term by a constant called the **common ratio**, denoted `r`.

**Example:** The sequence `2, 6, 18, 54, 162, …` is geometric with common ratio `r = 3`, because each term is 3 times the previous term.

**Formula:** The `n`th term of a geometric sequence is `a_n = a_1 ⋅ r^(n-1)`, where `a_1` is the first term and `n` is the term number.

**Bridge sentence:** Now let's look at how to find specific terms in sequences without listing all the previous terms.

### 9. Sequence Term {#sequence-term}

[Tier B: E(c) = 0.327, Target: 250-400 words, Required: worked example]

A **sequence term** is a specific element in a sequence, identified by its position number. The first term is `a_1`, the second is `a_2`, and so on. The `n`th term is denoted `a_n`.

**Worked Example:** Find the 7th term of the arithmetic sequence `5, 9, 13, 17, …`.

**Solution:** This sequence has first term `a_1 = 5` and common difference `d = 4` (because `9 - 5 = 4`, `13 - 9 = 4`, etc.). Using the formula `a_n = a_1 + (n-1)d`:

`a_7 = 5 + (7-1) · 4 = 5 + 6 · 4 = 5 + 24 = 29`

So the 7th term is 29.

**Bridge sentence:** Now let's look at recursive rules, which define each term based on the previous term(s).

### 10. Sequence Recursive Rule {#sequence-recursive-rule}

[Tier B: E(c) = 0.238, Target: 250-400 words, Required: worked example]

A **recursive rule** defines each term of a sequence using one or more of the preceding terms. Two pieces are needed: (1) the starting term(s), and (2) a rule for finding the next term from the previous term(s).

**Arithmetic recursive rule:**
- `a_1 =` (starting term)
- `a_n = a_(n-1) + d` for `n > 1`

**Geometric recursive rule:**
- `a_1 =` (starting term)
- `a_n = a_(n-1) · r` for `n > 1`

**Worked Example:** Write a recursive rule for the geometric sequence `3, 12, 48, 192, …`.

**Solution:** The first term is `a_1 = 3`. To find the common ratio, divide any term by the previous term: `12 ÷ 3 = 4`, `48 ÷ 12 = 4`, `192 ÷ 48 = 4`. So `r = 4`. The recursive rule is:
- `a_1 = 3`
- `a_n = a_(n-1) · 4` for `n > 1`

**Bridge sentence:** Now let's look at explicit rules, which let us find any term directly without needing the previous terms.

### 11. Sequence Explicit Rule {#sequence-explicit-rule}

[Tier C: E(c) = 0.159, Target: 120-200 words, Required: definition]

An **explicit rule** (also called an explicit formula) gives us a direct way to find the `n`th term of a sequence without needing to know the previous terms. This is in contrast to a recursive rule, which defines each term based on the one before it.

**Arithmetic explicit rule:** `a_n = a_1 + (n-1) · d`

**Geometric explicit rule:** `a_n = a_1 · r^(n-1)`

**Bridge sentence:** Now let's look at evaluating algebraic expressions, which involves substituting values and simplifying.

### 12. Evaluate Algebraic Expression {#evaluate-algebraic-expression}

[Tier C: E(c) = 0.069, Target: 120-200 words, Required: definition]

To **evaluate an algebraic expression** means to substitute given values for the variables and simplify using the order of operations. The process has two steps:

1. **Substitute:** Replace each variable with its given value.
2. **Simplify:** Use the order of operations (PEMDAS: Parentheses, Exponents, Multiplication and Division from left to right, Addition and Subtraction from left to right) to compute the final value.

**Worked Example:** Evaluate `3x + 2` when `x = 4`.

**Solution:** Substitute `4` for `x`: `3(4) + 2`. Then multiply: `12 + 2`. Then add: `14`. So `3x + 2 = 14` when `x = 4`.

**Bridge sentence:** Now let's look at fundamental algebraic properties that govern how we manipulate expressions.

### 13. Distributive Property {#distributive-property}

[Tier B: E(c) = 0.206, Target: 250-400 words, Required: worked example]

The **distributive property** states that multiplying a sum by a number gives the same result as multiplying each term by the number and then adding the products. In symbols: `a(b + c) = ab + ac`.

**Worked Example:** Simplify `3(x + 4)` using the distributive property.

**Solution:** `3(x + 4) = 3 · x + 3 · 4 = 3x + 12`.

**Bridge sentence:** Now let's look at the commutative property, which tells us we can rearrange terms in addition and multiplication.

### 14. Commutative Property {#commutative-property}

[Tier C: E(c) = 0.069, Target: 120-200 words, Required: definition]

The **commutative property** states that the order of addition or multiplication does not change the result.

- For addition: `a + b = b + a`
- For multiplication: `a · b = b · a`

**Example:** `3 + 5 = 5 + 3` (both equal 8), and `2 · 6 = 6 · 2` (both equal 12).

**Important:** The commutative property applies to addition and multiplication, but NOT to subtraction or division. For example, `5 - 3 ≠ 3 - 5` and `10 ÷ 2 ≠ 2 ÷ 10`.

**Bridge sentence:** Now let's look at the associative property, which tells us about grouping terms.

### 15. Associative Property {#associative-property}

[Tier C: E(c) = 0.178, Target: 120-200 words, Required: definition]

The **associative property** states that the way terms are grouped in addition or multiplication does not change the result.

- For addition: `(a + b) + c = a + (b + c)`
- For multiplication: `(a · b) · c = a · (b · c)`

**Example:** `(2 + 3) + 4 = 2 + (3 + 4)` (both equal 9), and `(2 · 3) · 4 = 2 · (3 · 4)` (both equal 24).

**Important:** The associative property applies to addition and multiplication, but NOT to subtraction or division. For example, `(8 - 3) - 2 ≠ 8 - (3 - 2)` and `(24 ÷ 4) ÷ 2 ≠ 24 ÷ (4 ÷ 2)`.

**Bridge sentence:** Now let's look at expanding binomials, which involves multiplying two binomial expressions.

### 16. Expand Binomial {#expand-binomial}

[Tier C: E(c) = 0.159, Target: 120-200 words, Required: definition]

To **expand a binomial** means to multiply two binomial expressions and rewrite as a sum of terms. The most common method is using the **FOIL** method, which stands for **First, Outer, Inner, Last**, referring to the pairs of terms to multiply.

**Worked Example:** Expand `(x + 3)(x + 2)` using FOIL.

**Solution:** 
- **First:** `x · x = x²`
- **Outer:** `x · 2 = 2x`
- **Inner:** `3 · x = 3x`
- **Last:** `3 · 2 = 6`

Combine like terms: `x² + 2x + 3x + 6 = x² + 5x + 6`.

**Bridge sentence:** Now let's look at factoring by grouping, which is the reverse process of expanding.

### 17. Factor By Grouping {#factor-by-grouping}

[Tier C: E(c) = 0.109, Target: 120-200 words, Required: definition]

**Factoring by grouping** is a method for factoring polynomials with four or more terms. The strategy is to group terms with common factors, factor out the common factor from each group, and then factor out the common binomial remaining.

**Worked Example:** Factor `x³ + 3x² + 2x + 6` by grouping.

**Solution:** 
1. Group the first two terms and the last two terms: `(x³ + 3x²) + (2x + 6)`
2. Factor out the greatest common factor from each group: `x²(x + 3) + 2(x + 3)`
3. Factor out the common binomial `(x + 3)`: `(x + 3)(x² + 2)`

**Bridge sentence:** Having covered all 17 concepts, let's now look at a summary of the key ideas from this chapter.

## Footnotes

{% include "chapter-4-footnotes.md" %}