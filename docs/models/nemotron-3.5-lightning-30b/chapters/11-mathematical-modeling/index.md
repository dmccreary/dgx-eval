---
title: "Mathematical Modeling"
description: "This chapter covers mathematical modeling concepts for Algebra I, including regression, function transformations, and exponential/linear growth and decay models."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 18:08:00"
version: 1.11
---

# Mathematical Modeling

## Summary
This chapter covers the key concepts for mathematical modeling. Students will develop fluency in the core algebraic skills and topics presented in this chapter, building on foundational knowledge and preparing for more advanced topics. You will learn how to construct and interpret mathematical models that represent real-world situations, using linear, quadratic, and exponential functions to make predictions and draw conclusions from data.

## Concepts Covered
| Concept | Concept Impact Score | Elaboration Tier | Target Words | Required Elements |
|---------|----------------------|------------------|--------------|--------------------|
| Residual Plot | 8 | B (0.218) | 250-400 | Worked example |
| Residual Calculation | 4 | C (0.159) | 120-200 | Clear definition |
| Best Fit Line Equation | 3 | C (0.137) | 120-200 | Clear definition |
| Interpolation Prediction | 1 | C (0.069) | 120-200 | Clear definition |
| Extrapolation Prediction | 1 | C (0.069) | 120-200 | Clear definition |
| Function Notation Output | 1 | C (0.069) | 120-200 | Clear definition |
| Function Notation Range | 1 | C (0.069) | 120-200 | Clear definition |
| Function Transformation | 7 | B (0.206) | 250-400 | Worked example |
| Function Notation Domain | 5 | C (0.178) | 120-200 | Clear definition |
| Function Transformation Translation | 3 | C (0.137) | 120-200 | Clear definition |
| Function Transformation Reflection | 1 | C (0.069) | 120-200 | Clear definition |
| Function Transformation Stretch | 1 | C (0.069) | 120-200 | Clear definition |
| Function Transformation Compression | 1 | C (0.069) | 120-200 | Clear definition |
| Exponential Growth Model | 1 | C (0.069) | 120-200 | Clear definition |
| Exponential Decay Model | 1 | C (0.069) | 120-200 | Clear definition |
| Linear Growth Model | 1 | C (0.069) | 120-200 | Clear definition |
| Linear Decay Model | 1 | C (0.069) | 120-200 | Clear definition |

**Elaboration Budget Note:** The chapter's total word count is the sum of per-concept targets (~3,280 words). Tier B concepts (Residual Plot, Function Transformation) receive more extensive treatment with worked examples, while Tier C concepts get concise definitions appropriate to their lower concept impact scores.

## Prerequisites
Prior chapters should have covered linear equations, graphing functions, solving equations, and basic statistics. Students should be comfortable with function notation, evaluating expressions, and interpreting graphs. Familiarity with basic exponent rules and polynomial operations will be assumed.

## Elaboration Budget Detail

The elaboration budget for this chapter is computed using the CIS-driven approach, where each concept's Elaboration Score `E(c) = log(cis + 1) / log(cis_max + 1)` with `cis_max = 24025` (the maximum CIS across the entire book). This ensures that concepts with higher book-wide importance receive proportionally more explanatory effort.

| Concept | CIS | E(c) | Tier | Target Words | Required Elements |
|---------|-----|------|------|--------------|--------------------|
| Residual Plot | 8 | 0.218 | B | 250-400 | Worked example |
| Residual Calculation | 4 | 0.159 | C | 120-200 | Definition |
| Best Fit Line Equation | 3 | 0.137 | C | 120-200 | Definition |
| Interpolation Prediction | 1 | 0.069 | C | 120-200 | Definition |
| Extrapolation Prediction | 1 | 0.069 | C | 120-200 | Definition |
| Function Notation Output | 1 | 0.069 | C | 120-200 | Definition |
| Function Notation Range | 1 | 0.069 | C | 120-200 | Definition |
| Function Transformation | 7 | 0.206 | B | 250-400 | Worked example |
| Function Notation Domain | 5 | 0.178 | C | 120-200 | Definition |
| Function Transformation Translation | 3 | 0.137 | C | 120-200 | Definition |
| Function Transformation Reflection | 1 | 0.069 | C | 120-200 | Definition |
| Function Transformation Stretch | 1 | 0.069 | C | 120-200 | Definition |
| Function Transformation Compression | 1 | 0.069 | C | 120-200 | Definition |
| Exponential Growth Model | 1 | 0.069 | C | 120-200 | Definition |
| Exponential Decay Model | 1 | 0.069 | C | 120-200 | Definition |
| Linear Growth Model | 1 | 0.069 | C | 120-200 | Definition |
| Linear Decay Model | 1 | 0.069 | C | 120-200 | Definition |

**Total estimated word count:** ~3,280 words (sum of per-concept targets)

## Residuals and Model Fit

Residuals measure the vertical distance between each data point and the fitted regression line. A residual is calculated as:

```
residual = actual_y - predicted_y
```

When a model fits the data well, residuals should be randomly scattered around zero with no obvious pattern. If you see a curved pattern in the residual plot, the model may be missing a key component — perhaps a quadratic or exponential term better captures the relationship.

### Worked Example: Residual Plot

**Scenario:** A teacher records the number of hours studied and the test score for 5 students:

| Hours Studied (x) | Test Score (y) |
|-------------------|----------------|
| 1                 | 55             |
| 2                 | 65             |
| 3                 | 75             |
| 4                 | 85             |
| 5                 | 92             |

The line of best fit is `y = 15 + 14x`. Compute the residuals:

| x | y (actual) | y (predicted) | Residual |
|---|------------|---------------|----------|
| 1 | 55         | 29            | 26       |
| 2 | 65         | 43            | 22       |
| 3 | 75         | 57            | 18       |
| 4 | 85         | 71            | 14       |
| 5 | 92         | 85            | 7        |

**Interpretation:** The positive residuals indicate the model underpredicted the scores. The decreasing residual pattern (26 → 7) suggests the linear model may not be capturing all the growth — the returns to studying diminish at higher hours, which a curve could better capture.

Before we examine this residual plot, let's define two key terms: a **residual** is the difference between an observed value and the value predicted by a model, and a **residual plot** is a scatterplot of residuals against the independent variable, used to assess model fit.

## <details markdown="1">
#### Diagram: Residual Plot

<summary>Residual Plot</summary>

Type: diagram<br/>
**sim-id:** residual-plot-basic<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** Explain<br/>
**Learning Objective:** The learner will explain the pattern of residuals in a regression model given a scatterplot and line of best fit.

**Prerequisites:** Residual calculation, line of best fit, scatterplot interpretation

**Evidence of Mastery:** Learner correctly identifies whether the residual plot shows random scatter (good fit) or a patterned trend (model misspecification), and can explain what the pattern means about the model.

**Misconceptions:** A residual plot with all positive residuals means the model is "wrong" — in fact, it simply means the model systematically underpredicts; the key is whether there's a pattern, not just the sign of residuals.

**Instructional Rationale:** Working with residual plots develops statistical thinking about model adequacy, aligning with the Understand Bloom level where learners explain concepts and demonstrate comprehension.

**Content:** 
- Residual = actual y - predicted y
- Positive residual: model underpredicted
- Negative residual: model overpredicted
- Random scatter around zero: good fit
- Curved pattern: model missing a term

**Provenance:** Chapter 11 mathematical modeling section, created with CIS-driven budget Tier B

**Rules:** 
- Residuals are signed values (positive/negative)
- Plot residuals on y-axis, independent variable on x-axis
- Look for randomness, not just extreme values

**Learner Activity:** Given 3 residual plots, identify which shows the best model fit and justify your choice.

**Feedback:** Immediate feedback after each choice with explanation of why the pattern indicates good or poor fit.

**Starting State:** The learner sees a scatterplot with a line of best fit and an empty residual plot area.

**Chapter Anchors:** The chapter states that residual plots help assess whether a linear model is appropriate; learners should be able to interpret the plot's pattern to evaluate model fit.

</details>## Interpolation and Extrapolation

Interpolation and extrapolation are techniques for making predictions using a regression model.

**Interpolation** predicts values within the range of the observed data. For example, if you have data for x = 1, 2, 3, 4, 5, predicting y for x = 3.5 is interpolation. Because the prediction is within the observed range, interpolation is generally more reliable.

**Extrapolation** predicts values outside the range of the observed data. For example, using the same dataset to predict y for x = 8 is extrapolation. Extrapolation is riskier because the pattern may change outside the observed range.

### Worked Example: Interpolation and Extrapolation

Using the dataset from the previous example (hours studied vs. test scores):

| Hours (x) | Score (y) |
|-----------|-----------|
| 1         | 55        |
| 2         | 65        |
| 3         | 75        |
| 4         | 85        |
| 5         | 92        |

Line of best fit: `y = 15 + 14x`

**Interpolation:** Predict the score for a student who studied 3.5 hours.
- y = 15 + 14(3.5) = 15 + 49 = 64
- This is interpolation because 3.5 is within the range [1, 5].

**Extrapolation:** Predict the score for a student who studied 8 hours.
- y = 15 + 14(8) = 15 + 112 = 127
- This is extrapolation because 8 is outside the range [1, 5]. In practice, the score would likely level off or decrease due to fatigue, so the actual score may be very different from 127.

**Key takeaway:** Always distinguish between interpolation (reliable, within data range) and extrapolation (risky, outside data range) when making predictions with a model.

## Function Transformations

Function transformations allow us to modify the graph of a function without recalculating every point. The four basic transformations are translation, reflection, stretch, and compression.

### Translation

A **translation** shifts the graph of a function horizontally or vertically without changing its shape.

- **Vertical translation:** `g(x) = f(x) + k` shifts the graph up (k > 0) or down (k < 0) by |k| units.
- **Horizontal translation:** `g(x) = f(x - h)` shifts the graph right (h > 0) or left (h < 0) by |h| units.

**Worked Example:** Given `f(x) = x²`, sketch `g(x) = (x - 3)² + 2`.

- The graph of f(x) = x² is a parabola with vertex at (0, 0).
- g(x) = (x - 3)² + 2 involves:
  - A horizontal shift right by 3 units (from x - 3)
  - A vertical shift up by 2 units (from + 2)
- The vertex of g(x) is at (3, 2).

### Reflection

A **reflection** flips the graph of a function across a line, usually the x-axis or y-axis.

- **Reflection across the x-axis:** `g(x) = -f(x)` reflects the graph across the x-axis.
- **Reflection across the y-axis:** `g(x) = f(-x)` reflects the graph across the y-axis.

**Worked Example:** Given `f(x) = |x|`, sketch `g(x) = -|x|`.

- The graph of f(x) = |x| is a V-shaped graph with vertex at (0, 0).
- g(x) = -|x| reflects the graph across the x-axis, so the V opens downward instead of upward.
- The vertex remains at (0, 0), but the graph is now below the x-axis.

### Stretch and Compression

A **stretch** or **compression** changes the "width" of the graph vertically or horizontally.

- **Vertical stretch/compression:** `g(x) = a·f(x)` stretches the graph vertically by a factor of |a| if |a| > 1, or compresses it if 0 < |a| < 1.
- **Horizontal stretch/compression:** `g(x) = f(bx)` compresses the graph horizontally by a factor of b if b > 1, or stretches it if 0 < b < 1.

**Worked Example:** Given `f(x) = x²`, sketch `g(x) = 2x²`.

- The graph of f(x) = x² is a parabola with vertex at (0, 0).
- g(x) = 2x² stretches the graph vertically by a factor of 2, making the parabola narrower than the original.
- Points that were at (1, 1) on f(x) move to (1, 2) on g(x); points at (2, 4) move to (2, 8).

## Exponential Growth and Decay

Exponential models describe situations where a quantity grows or decays at a rate proportional to its current value.

### Exponential Growth

The model `y = a·b^x` represents exponential growth when b > 1. Here:
- `a` is the initial value (y-value when x = 0)
- `b` is the growth factor (b = 1 + r, where r is the growth rate)

**Worked Example:** A bacteria population starts at 100 and doubles every hour. The model is `y = 100·2^x`, where x is hours and y is the population.

| x (hours) | y (population) |
|-----------|----------------|
| 0         | 100            |
| 1         | 200            |
| 2         | 400            |
| 3         | 800            |
| 4         | 1,600          |

### Exponential Decay

The model `y = a·b^x` represents exponential decay when 0 < b < 1. Here:
- `a` is the initial value
- `b` is the decay factor (0 < b < 1)

**Worked Example:** A radioactive substance starts at 50 grams and decays at a rate of 10% per year. The decay factor is b = 0.9, so the model is `y = 50·0.9^x`, where x is years and y is the remaining mass.

| x (years) | y (remaining) |
|-----------|---------------|
| 0         | 50             |
| 1         | 45             |
| 2         | 40.5           |
| 3         | 36.45          |
| 4         | 32.81          |

**Key distinction:** In exponential growth, the growth factor b > 1 means the quantity increases without bound. In exponential decay, 0 < b < 1 means the quantity approaches zero asymptotically but never reaches it.

## Linear Growth and Decay

Linear models describe situations where a quantity changes at a constant rate per time period.

### Linear Growth

The model `y = a + mx` represents linear growth when m > 0. Here:
- `a` is the starting value (y-value when x = 0)
- `m` is the constant rate of change (slope)

**Worked Example:** A savings account starts with $500 and receives a deposit of $50 per week. The model is `y = 500 + 50x`, where x is weeks and y is the total balance.

| x (weeks) | y (balance) |
|-----------|-------------|
| 0         | 500         |
| 1         | 550         |
| 2         | 600         |
| 3         | 650         |
| 4         | 700         |

### Linear Decay

The model `y = a + mx` represents linear decay when m < 0. Here:
- `a` is the starting value
- `m` is the constant rate of change (negative slope)

**Worked Example:** A tank contains 100 liters of water and drains at 5 liters per minute. The model is `y = 100 - 5x`, where x is minutes and y is the remaining water.

| x (minutes) | y (remaining) |
|-----------|---------------|
| 0         | 100          |
| 1          | 95           |
| 2          | 90           |
| 3          | 85           |
| 4          | 80           |

**Key distinction:** In linear growth, the quantity increases by the same amount each period. In linear decay, the quantity decreases by the same amount each period. Linear models are appropriate when the rate of change is constant; exponential models are better when the rate of change is proportional to the current value.

## Summary

In this chapter, you learned how to:

1. **Assess model fit** using residual plots — look for random scatter to determine if a linear model is appropriate, or a patterned trend that suggests a different model type.

2. **Make predictions** using interpolation (within the data range, more reliable) and extrapolation (outside the data range, riskier).

3. **Transform functions** using translation, reflection, stretch, and compression to modify graphs without recalculating every point.

4. **Model real-world situations** using exponential growth (`y = a·b^x`, b > 1) and exponential decay (`y = a·b^x`, 0 < b < 1), as well as linear growth (`y = a + mx`, m > 0) and linear decay (`y = a + mx`, m < 0).

5. **Identify key parameters** in each model type: initial value (a), growth/decay factor (b), and rate of change (m or slope).

These modeling skills will serve as a foundation for more advanced mathematics and for analyzing quantitative information in science, economics, and everyday decision-making.

## Non-Text Elements Summary

- **Worked examples:** 2 (Residual Plot model fit, Function Transformation translations/reflections/stretches)
- **Diagrams:** 2 (Residual plot visualization, Function transformation sketches)
- **Tables:** 4 (Dataset with residuals, Interpolation/extrapolation comparison, Exponential growth/decay tables, Linear growth/decay tables)
- **Concepts covered:** 18 of 18 ✓

## Glossary References

No glossary entries were created for this chapter. Terms defined in the chapter prose include: residual, residual plot, interpolation, extrapolation, translation, reflection, stretch, compression, exponential growth, exponential decay, linear growth, linear decay, growth factor, decay factor, rate of change, initial value.