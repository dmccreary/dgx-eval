---
title: 'Learning Graph Quality Report: qwen3.6:35b'
description: 'Automated checks on the learning graph qwen3.6:35b generated for the Algebra I benchmark.'
---

# Learning Graph Quality Report: `qwen3.6:35b`

A program wrote this report from the files `qwen3.6:35b` produced in stage 1. It
checks structure. It does not judge whether these are the right concepts for
Algebra I or whether the dependencies make sense.

[View the learning graph](learning-graph-viewer.md){ .md-button }

## Structural Checks

From `src/scoring/score_learning_graph.py` in this repository.

| Check | Result |
|---|---|
| Concepts | 200 of 200 asked for |
| Dependencies | 273, an average of 1.36 per concept |
| Concepts on a cycle | 0 |
| Concepts with no prerequisite | 19 |
| Concepts connected to nothing | 0 |
| Duplicate concept labels | 1 |
| Labels longer than 32 characters | 5 |
| Concepts with a taxonomy category | 200 |
| Errors in the CSV file | 0 |
| JSON file agrees with the CSV file | Yes |
| Taxonomy groups in the JSON file | 13 |
| Expected files missing | None |
| Navigation mentions the learning graph | Yes |

## Graph Analysis

From `analyze-graph.py`, the analysis script of the `learning-graph-generator`
skill, run on the model's CSV file when this page was built. It is not the
report the model wrote about its own graph.

### Overview

- **Total Concepts**: 200
- **Foundational Concepts** (no prerequisites, other concepts depend on them): 19
- **Terminal Nodes** (nothing depends on them, but have prerequisites): 79
- **Orphaned Nodes** (completely disconnected, no edges): 0
- **Concepts with Dependencies**: 181
- **Average Dependencies per Concept**: 1.51

### Graph Structure Validation

- **Valid DAG Structure**: ✅ Yes
- **Self-Dependencies**: None detected ✅
- **Cycles Detected**: 0

### Foundational Concepts

These concepts have no prerequisites:

- **1**: Real Numbers
- **14**: Addition Property of Equality
- **15**: Multiplication Property of Equality
- **26**: Variables
- **58**: Radical Notation
- **85**: Slope
- **89**: Coordinate Plane Basics
- **103**: Piecewise Functions
- **104**: Quadratic Expressions
- **115**: Discriminant
- **126**: Polynomial Division
- **135**: Relations
- **146**: Inverse Relations
- **150**: Transformations
- **155**: Exponential Functions
- **167**: Arithmetic Sequences
- **168**: Geometric Sequences
- **187**: Correlation
- **195**: Mathematical Models

### Dependency Chain Analysis

- **Maximum Dependency Chain Length**: 16

#### Longest Learning Path:

1. **Real Numbers** (ID: 1)
2. **Rational Numbers** (ID: 2)
3. **Integers** (ID: 4)
4. **Whole Numbers** (ID: 5)
5. **Natural Numbers** (ID: 6)
6. **Arithmetic Operations** (ID: 18)
7. **Order of Operations** (ID: 19)
8. **Exponentiation** (ID: 21)
9. **Integer Exponents** (ID: 47)
10. **Negative Exponents** (ID: 49)
11. **Rational Exponents** (ID: 57)
12. **Radical Expressions** (ID: 61)
13. **Square Roots** (ID: 62)
14. **Nth Roots** (ID: 64)
15. **Simplifying Radicals** (ID: 65)
16. **Adding Radicals** (ID: 66)

### Terminal Nodes Analysis

Terminal nodes are concepts that nothing else depends on but have prerequisites. They represent natural endpoints of learning paths — culminating or specialized concepts.

- **Total Terminal Nodes**: 79 (39.5% of all concepts)
- **Healthy Range**: 5-40% of total concepts

Concepts at the end of learning paths:

- **8**: Opposite Numbers
- **13**: Inverse Element
- **16**: Substitution Property
- **17**: Real Number Line
- **20**: Parentheses and Grouping
- **23**: Significant Figures
- **31**: Unlike Terms
- **33**: Writing Algebraic Expressions
- **40**: Polynomial Classification
- **42**: Subtracting Polynomials
- **44**: Distributing Monomials
- **48**: Zero Exponent Rule
- **51**: Product of Powers Property
- **52**: Quotient of Powers Property
- **53**: Power of a Power Property
- **54**: Power of a Product Property
- **55**: Power of a Quotient Property
- **56**: Rationalizing Radicals
- **59**: Converting Radicals to Exponent Form
- **60**: Equivalent Radical and Exponent Forms

*...and 59 more*

### Orphaned Nodes Analysis

Orphaned nodes are completely disconnected concepts with no inbound AND no outbound edges. These indicate a quality problem — every concept should connect to the graph.

- **Total Orphaned Nodes**: 0

✅ No orphaned nodes detected. All concepts are connected to the graph.

### Connected Components

- **Number of Connected Components**: 5

⚠️ Multiple disconnected subgraphs detected:

#### Component 1 (173 concepts)

- Real Numbers
- Rational Numbers
- Irrational Numbers
- Integers
- Whole Numbers
- Natural Numbers
- Absolute Value
- Opposite Numbers
- Commutative Property
- Associative Property
- *...and 163 more*

#### Component 2 (3 concepts)

- Piecewise Functions
- Piecewise Defined Functions
- Step Functions

#### Component 3 (2 concepts)

- Discriminant
- Nature of Solutions

#### Component 4 (13 concepts)

- Relations
- Functions
- Function Definition
- Vertical Line Test
- Domain
- Range
- Independent Variable
- Dependent Variable
- Function Evaluation
- Inverse Relations
- *...and 3 more*

#### Component 5 (9 concepts)

- Arithmetic Sequences
- Geometric Sequences
- Sequence Terms
- Recursive Formulas
- Explicit Formulas
- Common Difference
- Common Ratio
- Sum of Arithmetic Series
- Sum of Geometric Series

### Indegree Analysis

Top 10 concepts that are prerequisites for the most other concepts:

| Rank | Concept ID | Concept Label | Indegree |
|------|-----------|---------------|----------|
| 1 | 1 | Real Numbers | 10 |
| 2 | 32 | Algebraic Expressions | 9 |
| 3 | 85 | Slope | 8 |
| 4 | 95 | Slope-Intercept Form | 8 |
| 5 | 50 | Laws of Exponents | 6 |
| 6 | 72 | Multi-Step Equations | 6 |
| 7 | 11 | Distributive Property | 5 |
| 8 | 19 | Order of Operations | 5 |
| 9 | 35 | Factoring Expressions | 5 |
| 10 | 150 | Transformations | 5 |

### Outdegree Distribution

| Dependencies | Number of Concepts |
|--------------|--------------------|
| 0 | 19 |
| 1 | 116 |
| 2 | 45 |
| 3 | 15 |
| 4 | 4 |
| 6 | 1 |

### Recommendations

- ⚠️ **Connect disconnected components**: Add dependencies to link separate subgraphs
- ✅ **Terminal node percentage** (39.5%): Within healthy range (5-40%)
- ✅ **DAG structure verified**: Graph supports valid learning progressions
- ℹ️ **Long dependency chains** (16): Ensure students can follow extended learning paths

---

*Report generated by learning-graph-reports/analyze_graph.py*
