---
title: "Systems of Linear Equations"
description: "Learn to solve systems of linear equations using substitution, elimination, and graphing."
generated_by: claude skill chapter-content-generator
date: "2026-10-11 12:00:00"
version: 1.11
---

# Systems of Linear Equations

## Summary

This chapter teaches students how to find the intersection of two or more linear equations using substitution, elimination, and graphing methods, and how to model real-world scenarios with systems.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| System of Equations | 14 |
| Solution to a System | 10 |
| Substitution Method | 1 |
| Elimination Method | 1 |
| Graphing Method | 1 |
| Consistent System | 3 |
| Inconsistent System | 1 |
| Dependent System | 1 |
| Independent System | 1 |
| Linear Modeling | 3 |

## Prerequisites

This chapter builds on concepts from:
- [Chapter 3: Linear Equations](../03-linear-equations/index.md)
- [Chapter 6: Linear Functions and Slope](../06-linear-functions-slope/index.md)


---

In the previous chapters, we focused on single linear equations—mathematical statements that describe a single relationship between variables. However, in the real world, we often need to satisfy multiple conditions at once. This is where the study of systems comes in.

## Understanding Systems of Equations

A **System of Equations** is a set of two or more equations that share the same variables. When we "solve" a system, we are looking for the values of the variables that make every equation in the set true at the same time.

For example, imagine you are comparing two different gym memberships. Plan A costs \$30 per month plus \$5 per visit, and Plan B costs \$10 per month plus \$10 per visit. If you want to know at what number of visits the cost of both plans is exactly the same, you are looking for the solution to a system of two linear equations.

### Worked Example: Identifying a System

Consider the following two mathematical statements:
1. \( 2x + 3y = 12 \)
2. \( x - y = 1 \)

**Question:** Do these two equations form a system? If so, what are the variables?

**Solution:**
Yes, these equations form a system because they both use the same variables, \( x \) and \( y \). In a real-world context, \( x \) and \( y \) might represent different quantities, such as the number of adult tickets and child tickets sold at a cinema.

The following table compares a single linear equation with a system of linear equations to highlight the difference in what we are seeking.

| Feature | Single Linear Equation | System of Linear Equations |
|-------|--------------------------|-------------------------------|
| **Number of Equations** | One | Two or more |
| **Goal** | Find all pairs \( (x, y) \) that satisfy the equation | Find the specific pair(s) that satisfy ALL equations |
| **Graphical Result** | A single line | The intersection of multiple lines |
| **Typical Solution** | Infinite solutions (every point on the line) | Often a single point, no points, or infinite points |

## The Solution to a System

A **Solution to a System** is an ordered pair \( (x, y) \) that is a solution to every equation in the system. Graphically, if each equation is represented by a line, the solution is the point where the lines intersect.

If a point lies on one line but not the other, it is a solution to that individual equation, but it is NOT a solution to the system.

### Worked Example: Verifying a Solution

Is the point \( (2, 3) \) a solution to the following system?
\[
\begin{cases} 
x + y = 5 \\
2x - y = 1 
\end{cases}
\]

**Solution:**
To verify, substitute \( x = 2 \) and \( y = 3 \) into both equations.

1. Check the first equation:
   \( 2 + 3 = 5 \)
   \( 5 = 5 \) (True)

2. Check the second equation:
   \( 2(2) - 3 = 1 \)
   \( 4 - 3 = 1 \)
   \( 1 = 1 \) (True)

Since the point \( (2, 3) \) satisfies both equations, it is a solution to the system.

#### Diagram: System Solution Explorer

<details markdown="1">
<summary>System Solution Explorer</summary>
Type: microsim
**sim-id:** system-solution-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** Analyze<br/>
**Learning Objective:** The learner will analyze how changing the constants in a system of two linear equations shifts the intersection point and affects the existence of a solution.

**Prerequisites:** System of Equations, Solution to a System, Coordinate Plane

**Evidence of Mastery:** The learner can adjust the coefficients to move the intersection point to a specific coordinate (e.g., 0,0) or create a state where no intersection exists.

**Misconceptions:** Students may think that any two lines must intersect at exactly one point, forgetting the case of parallel lines.

**Instructional Rationale:** By interacting with sliders for the coefficients, students see the immediate visual relationship between the algebraic constants and the geometric intersection.

**Content:**
- Equations: \( ax + by = c \) and \( dx + ey = f \)
- Sliders: a, b, c, d, e, f (Range: -10 to 10, Step: 0.5)
- Display: Current equations based on slider values.
- Visual: A coordinate plane rendering both lines.
- Solution: Calculated intersection point \( (x, y) \) displayed as text.

**Provenance:** Synthetic illustrative example

**Rules:**
- Intersection \( x = \frac{ce - bf}{ae - bd} \), \( y = \frac{af - cd}{ae - bd} \)
- If \( ae - bd = 0 \), the lines are parallel or coincident (No unique solution).

**Learner Activity:**
1. Adjust the sliders to see how the lines move.
2. Try to make the lines intersect exactly at the origin \( (0,0) \).
3. Try to make the lines parallel so that no solution exists.
4. Observe how changing the constant term (c or f) shifts the line without changing its slope.

**Feedback:**
- When intersection is found: "The lines intersect at [x, y]."
- When lines are parallel: "The lines are parallel; there is no solution."
- When lines are coincident: "The lines are the same; there are infinite solutions."

**Starting State:**
- Equation 1: \( x + y = 5 \)
- Equation 2: \( 2x - y = 1 \)
- Intersection point \( (2, 3) \) is visible.

**Chapter Anchors:** none
</details>

## Methods for Solving Systems

While graphing provides a great visual understanding, it can be imprecise. To find exact solutions, we use algebraic methods.

### The Graphing Method

The **Graphing Method** involves plotting each equation as a line on a coordinate plane and identifying the coordinates of the intersection point. This method is most useful for understanding the nature of the system (whether it is consistent or inconsistent) but can be difficult if the solution involves fractions or decimals.

**Example:** To solve a system using graphing, plot \( y = x + 1 \) and \( y = -x + 3 \). The lines will cross at \( (1, 2) \), which is the solution.

### The Substitution Method

The **Substitution Method** is a process of replacing one variable with an expression in terms of the other variable. This reduces the system to a single equation with one variable, which can then be solved easily.

**Step-by-Step Process:**
1. Solve one of the equations for one variable (e.g., isolate \( x \)).
2. Substitute this expression into the other equation.
3. Solve the resulting single-variable equation.
4. Substitute the found value back into the first equation to find the second variable.

**Example:**
Solve:
\[
\begin{cases} 
x = 2y \\
x + y = 6 
\end{cases}
\]
Since \( x \) is already isolated in the first equation, substitute \( 2y \) for \( x \) in the second:
\( 2y + y = 6 \implies 3y = 6 \implies y = 2 \).
Then, \( x = 2(2) = 4 \). The solution is \( (4, 2) \).

### The Elimination Method

The **Elimination Method** (also called Addition/Subtraction) involves adding or subtracting the equations to "eliminate" one of the variables, leaving an equation with only one variable.

**Step-by-Step Process:**
1. Align the equations so that variables are in the same order.
2. Multiply one or both equations by a constant so that the coefficients of one variable are opposites (e.g., 5 and -5).
3. Add the equations together to eliminate that variable.
4. Solve for the remaining variable and substitute back to find the first.

**Example:**
Solve:
\[
\begin{cases} 
x + y = 5 \\
x - y = 1 
\end{cases}
\]
Adding the equations directly eliminates \( y \):
\( (x + y) + (x - y) = 5 + 1 \implies 2x = 6 \implies x = 3 \).
Then, \( 3 + y = 5 \implies y = 2 \). The solution is \( (3, 2) \).

## Classifying Systems: Consistency and Dependence

Not every system of equations has a single, neat solution. We classify systems based on whether solutions exist and how many there are.

### Independent, Dependent, and Inconsistent Systems

- **Independent System:** A system with exactly one solution. The lines intersect at a single point.
- **Dependent System:** A system with infinitely many solutions. This happens when the two equations describe the same line (they are coincident).
- **Inconsistent System:** A system with no solution. The lines are parallel and will never intersect.

The following table summarizes these classifications:

| Type | Number of Solutions | Graphical Representation | Algebraic Result |
|------|-------------------|--------------------------|------------------|
| **Independent** | Exactly One | Intersecting Lines | \( x = a, y = b \) |
| **Dependent** | Infinite | Coincident Lines (Same Line) | \( 0 = 0 \) (Identity) |
| **Inconsistent** | None | Parallel Lines | \( 0 = 5 \) (Contradiction) |

### Consistent Systems

A **Consistent System** is any system that has **at least one** solution. Therefore, both Independent and Dependent systems are considered consistent. An Inconsistent system, by definition, is not consistent.

## Linear Modeling with Systems

**Linear Modeling** is the process of taking a real-world scenario and translating it into a system of equations. The key is to identify the unknown quantities (the variables) and the constraints (the equations).

**Example:**
"The sum of two numbers is 10, and their difference is 2. Find the numbers."

1. **Identify variables:** Let \( x \) be the first number and \( y \) be the second number.
2. **Translate constraints:**
   - "Sum is 10" $\to x + y = 10$
   - "Difference is 2" $\to x - y = 2$
3. **Solve the system:** Using elimination, \( 2x = 12 \implies x = 6 \). Then \( 6 + y = 10 \implies y = 4 \). The numbers are 6 and 4.

## Summary and Key Takeaways

- A **system of equations** is a group of equations with the same variables.
- A **solution** is an ordered pair that satisfies all equations in the system.
- **Graphing** is visual; **Substitution** is best when one variable is easy to isolate; **Elimination** is best when coefficients can be easily matched as opposites.
- Systems are **Consistent** (have solutions) or **Inconsistent** (no solutions).
- Consistent systems can be **Independent** (one solution) or **Dependent** (infinite solutions).
- **Linear Modeling** allows us to solve complex real-world problems by setting up and solving systems.
