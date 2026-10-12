---
title: "Exponential Functions"
description: "An introduction to exponential growth, decay, and modeling."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 14:30:00"
version: 1.11
---

# Exponential Functions

Up until now, we have focused on relationships where the rate of change is constant (linear functions) or where the rate of change changes linearly (quadratic functions). However, many of the most interesting phenomena in the real world—from the way a virus spreads through a population to the way a radioactive element decays—do not follow these patterns. Instead, they grow or shrink by a *constant percentage* rather than a constant amount. These are known as **Exponential Functions**.

## The Nature of Exponential Growth

In a linear function, we add a constant value every time $x$ increases by 1. In an exponential function, we *multiply* by a constant value. This shift from addition to multiplication creates a dramatically different trajectory.

### Exponential Function

An **Exponential Function** is a mathematical function of the form:
\[ f(x) = a \cdot b^x \]
where:
- \( a \) is the **initial value** (the value of the function when \( x = 0 \)).
- \( b \) is the **base** (the constant multiplier), and it must be a positive number other than 1 (\( b > 0, b \neq 1 \)).
- \( x \) is the exponent, which represents the number of times the base is multiplied.

Unlike polynomials, where the variable is the base (e.g., \( x^2 \)), in an exponential function, the variable is in the exponent. This means the output grows faster and faster as \( x \) increases.

**Worked Example: Evaluating an Exponential Function**
Suppose we have the function \( f(x) = 3 \cdot 2^x \). Let's find the values for \( x = 0, 1, 2, 3 \).
1. For \( x = 0 \): \( f(0) = 3 \cdot 2^0 = 3 \cdot 1 = 3 \)
2. For \( x = 1 \): \( f(1) = 3 \cdot 2^1 = 3 \cdot 2 = 6 \)
3. For \( x = 2 \): \( f(2) = 3 \cdot 2^2 = 3 \cdot 4 = 12 \)
4. For \( x = 3 \): \( f(3) = 3 \cdot 2^3 = 3 \cdot 8 = 24 \)
Notice that every time \( x \) increases by 1, the output doubles. The multiplier 2 is our base.

#### Diagram: Exponential Growth Explorer

<details markdown="1">
<summary>Exponential Growth Explorer</summary>
Type: microsim
**sim-id:** exponential-function-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** describe<br/>
**Learning Objective:** The learner will describe how changing the base \( b \) and initial value \( a \) affects the curvature and starting point of the exponential graph.

**Prerequisites:** Exponential Function, Base, Initial Value

**Evidence of Mastery:** The learner adjusts sliders for \( a \) and \( b \) and correctly identifies whether the function is growing or decaying based on the resulting graph.

**Misconceptions:** Thinking that a base of \( b=1 \) creates a growth curve (it creates a flat line).

**Instructional Rationale:** Visualizing the immediate impact of the base on the "steepness" of the curve helps solidify the concept of the multiplier.

**Content:**
- Sliders: \( a \) (range 0.1 to 10, step 0.1, default 1), \( b \) (range 0.1 to 5, step 0.1, default 2).
- Display: The equation \( f(x) = a \cdot b^x \) updating in real-time.
- Graph: X-axis (-10 to 10), Y-axis (0 to 20).
- Point Tracker: A dot that follows the cursor and displays the coordinate \( (x, f(x)) \).

**Provenance:** Illustrative

**Rules:**
- Growth occurs when \( b > 1 \).
- Decay occurs when \( 0 < b < 1 \).
- The y-intercept is always \( (0, a) \).

**Learner Activity:**
1. Set \( a=1, b=2 \) and observe the doubling effect.
2. Change \( b \) to 1.1 and notice the growth is much slower.
3. Change \( b \) to 0.5 and observe the curve flip from growth to decay.
4. Adjust \( a \) to 5 and notice the entire graph shifts up to start at \( y=5 \).

**Feedback:**
- If \( b=1 \), a message appears: "When \( b=1 \), the function is constant, not exponential!"
- If \( b \le 0 \), the sim prevents the slider from moving.

**Starting State:** \( a=1, b=2 \). The graph shows a standard growth curve.

**Chapter Anchors:** none
</details>

### Base of an Exponential

The **Base** (\( b \)) is the engine of the exponential function. It determines the percentage of growth or decay. 

If we think of the base as a multiplier, we can find the percentage rate \( r \) using the formula:
\[ b = 1 + r \]
For example, a growth rate of 5% means \( r = 0.05 \), so the base \( b = 1.05 \). A decay rate of 5% means \( r = -0.05 \), so the base \( b = 0.95 \).

**Worked Example: Finding the Base from a Percentage**
A city's population is growing at a rate of 3% per year. What is the base for the exponential function modeling this growth?
1. Identify the rate: \( r = 0.03 \).
2. Apply the formula: \( b = 1 + 0.03 = 1.03 \).
The population is multiplied by 1.03 each year.

### Growth and Decay Factors

Whether a function represents growth or decay depends entirely on the value of the base \( b \).

- **Growth Factor:** When \( b > 1 \), the function represents **Exponential Growth**. As \( x \) increases, \( f(x) \) increases at an accelerating rate.
- **Decay Factor:** When \( 0 < b < 1 \), the function represents **Exponential Decay**. As \( x \) increases, \( f(x) \) decreases, approaching zero but never quite reaching it.

| Feature | Exponential Growth | Exponential Decay |
|---------|-------------------|-------------------|
| Base Value | \( b > 1 \) | \( 0 < b < 1 \) |
| Graph Trend | Rises from left to right | Falls from left to right |
| Real-world Example | Compound Interest | Radioactive Decay |
| Multiplier Effect | Value increases | Value decreases |

#### Exponential Growth

**Exponential Growth** occurs when the quantity increases by a consistent relative rate. A classic example is compound interest. If you invest \$1,000 at a 5% annual interest rate, you aren't just adding \$50 every year; you are multiplying your total by 1.05. The interest you earn this year earns its own interest next year.

#### Exponential Decay

**Exponential Decay** occurs when a quantity decreases by a consistent relative rate. This is seen in "half-life" scenarios. For instance, if a medicine has a half-life of 4 hours, it means every 4 hours, the amount in your system is multiplied by 0.5.

### The Asymptote

One of the most striking features of an exponential function is its **Asymptote**. An asymptote is a line that the graph of a function approaches closer and closer but never actually touches or crosses.

For the basic function \( f(x) = a \cdot b^x \), the x-axis (\( y = 0 \)) is a **horizontal asymptote**. 

Regardless of how small the base \( b \) is (in decay) or how negative the exponent \( x \) becomes (in growth), the result of \( b^x \) will always be a positive number. It can be 0.0000001, but it can never be 0 or negative. This is why the graph "flattens out" as it nears the x-axis.

### Modeling with Exponential Functions

To model a real-world scenario, we need to determine the values of \( a \) and \( b \).

1. **Find \( a \)**: This is the value at \( x = 0 \). In a word problem, this is usually the "initial amount" or "starting population."
2. **Find \( b \)**: If given a growth rate \( r \), use \( b = 1 + r \). If given two points \( (0, a) \) and \( (x, y) \), solve for \( b \) using \( y = a \cdot b^x \).

**Worked Example: Modeling a Population**
A bacteria culture starts with 100 cells and doubles every hour. Write the function.
1. Initial value \( a = 100 \).
2. The "doubling" means the base \( b = 2 \).
3. Function: \( f(x) = 100 \cdot 2^x \).

### Comparing Quadratic and Exponential Functions

It is common to confuse quadratic growth (\( x^2 \)) and exponential growth (\( 2^x \)) because both "curve upward." However, they are fundamentally different.

A quadratic function grows based on the square of the input. An exponential function grows based on a repeated multiplier. While a quadratic might start faster, an exponential function will *always* eventually overtake any polynomial function, no matter how large the polynomial's coefficient is.

| Function Type | Growth Rate | Long-term Behavior |
|-----------|-------------|-------------------|
| Linear | Constant | Steady increase |
| Quadratic | Increasing | Accelerating increase |
| Exponential | Proportional to current value | Explosive increase |

#### The Vertex Formula and Exponentiality

In Chapter 9, we learned about the **Vertex Formula** \( x = -b/2a \), which helps us find the peak or valley of a parabola. Exponential functions do not have a vertex. They do not change direction. A growth function only goes up; a decay function only goes down. This lack of a "turning point" is a key way to distinguish them from quadratics.

## Summary and Key Takeaways

- **Exponential functions** follow the form \( f(x) = a \cdot b^x \), where \( a \) is the starting value and \( b \) is the multiplier.
- **Growth** occurs when \( b > 1 \); **Decay** occurs when \( 0 < b < 1 \).
- The **horizontal asymptote** at \( y = 0 \) means the function approaches but never reaches zero.
- Exponential growth eventually outpaces any linear or quadratic growth.
- Modeling involves identifying the initial amount (\( a \)) and the growth/decay factor (\( b \)).
