---
title: 'Learning Graph Quality Report: nemotron-3.5-lightning:30b'
description: 'Automated checks on the learning graph nemotron-3.5-lightning:30b generated for the Algebra I benchmark.'
---

# Learning Graph Quality Report: `nemotron-3.5-lightning:30b`

A program wrote this report from the files `nemotron-3.5-lightning:30b` produced in stage 1. It
checks structure. It does not judge whether these are the right concepts for
Algebra I or whether the dependencies make sense.

[View the learning graph](learning-graph-viewer.md){ .md-button }

## Structural Checks

From `src/scoring/score_learning_graph.py` in this repository.

| Check | Result |
|---|---|
| Concepts | 199 of 200 asked for |
| Dependencies | 494, an average of 2.48 per concept |
| Concepts on a cycle | 0 |
| Concepts with no prerequisite | 6 |
| Concepts connected to nothing | 0 |
| Duplicate concept labels | 0 |
| Labels longer than 32 characters | 4 |
| Concepts with a taxonomy category | 199 |
| Errors in the CSV file | 0 |
| JSON file agrees with the CSV file | Yes |
| Taxonomy groups in the JSON file | 11 |
| Expected files missing | None |
| Navigation mentions the learning graph | No |

## Graph Analysis

From `analyze-graph.py`, the analysis script of the `learning-graph-generator`
skill, run on the model's CSV file when this page was built. It is not the
report the model wrote about its own graph.

### Overview

- **Total Concepts**: 199
- **Foundational Concepts** (no prerequisites, other concepts depend on them): 6
- **Terminal Nodes** (nothing depends on them, but have prerequisites): 73
- **Orphaned Nodes** (completely disconnected, no edges): 0
- **Concepts with Dependencies**: 193
- **Average Dependencies per Concept**: 2.56

### Graph Structure Validation

- **Valid DAG Structure**: ❌ No
- **Self-Dependencies**: None detected ✅
- **Cycles Detected**: 0

### Foundational Concepts

These concepts have no prerequisites:

- **1**: Algebraic Expression
- **2**: Order of Operations
- **3**: Variable Identification
- **4**: Coefficient Recognition
- **5**: Constant Term
- **22**: Function Concept

### Dependency Chain Analysis

- **Maximum Dependency Chain Length**: 18

#### Longest Learning Path:

1. **Algebraic Expression** (ID: 1)
2. **Greatest Common Factor** (ID: 41)
3. **Factor Trinomial** (ID: 42)
4. **Solve Quadratic By Factoring** (ID: 44)
5. **Solve Quadratic Square Root** (ID: 45)
6. **Complete Square Quadratic** (ID: 46)
7. **Quadratic Formula** (ID: 47)
8. **Quadratic Axis of Symmetry** (ID: 49)
9. **Model Quadratic Data** (ID: 50)
10. **Create Scatterplot** (ID: 52)
11. **Interpret Scatterplot** (ID: 53)
12. **Line of Best Fit** (ID: 55)
13. **Bivariate Data** (ID: 158)
14. **Nonlinear Association** (ID: 166)
15. **Residual Plot** (ID: 171)
16. **Residual Calculation** (ID: 172)
17. **Best Fit Line Equation** (ID: 173)
18. **Interpolation Prediction** (ID: 174)

### Terminal Nodes Analysis

Terminal nodes are concepts that nothing else depends on but have prerequisites. They represent natural endpoints of learning paths — culminating or specialized concepts.

- **Total Terminal Nodes**: 73 (36.7% of all concepts)
- **Healthy Range**: 5-40% of total concepts

Concepts at the end of learning paths:

- **11**: Rational Exponent
- **16**: Literal Equation
- **17**: Formula Rearrangement
- **19**: Graph Linear Inequality
- **37**: System of Linear Inequalities
- **56**: Compare Linear Model
- **63**: Evaluate Algebraic Expression
- **65**: Commutative Property
- **69**: Special Product
- **74**: Leading Coefficient
- **75**: Constant Term Polynomial
- **78**: Quadratic Maximum
- **79**: Quadratic Minimum
- **89**: Zero Exponent
- **94**: Radicand
- **98**: Rationalize Denominator
- **106**: Linear Function
- **107**: Constant Function
- **108**: Identity Function
- **109**: Absolute Value Function

*...and 53 more*

### Orphaned Nodes Analysis

Orphaned nodes are completely disconnected concepts with no inbound AND no outbound edges. These indicate a quality problem — every concept should connect to the graph.

- **Total Orphaned Nodes**: 0

✅ No orphaned nodes detected. All concepts are connected to the graph.

### Connected Components

- **Number of Connected Components**: 1

✅ All concepts are connected in a single graph.

### Indegree Analysis

Top 10 concepts that are prerequisites for the most other concepts:

| Rank | Concept ID | Concept Label | Indegree |
|------|-----------|---------------|----------|
| 1 | 3 | Variable Identification | 21 |
| 2 | 34 | Graph Linear Equation | 19 |
| 3 | 47 | Quadratic Formula | 18 |
| 4 | 4 | Coefficient Recognition | 17 |
| 5 | 52 | Create Scatterplot | 17 |
| 6 | 1 | Algebraic Expression | 16 |
| 7 | 35 | Model Linear Relationship | 16 |
| 8 | 30 | Slope Rate of Change | 12 |
| 9 | 23 | Function Notation | 11 |
| 10 | 36 | System of Linear Equations | 11 |

### Outdegree Distribution

| Dependencies | Number of Concepts |
|--------------|--------------------|
| 0 | 6 |
| 1 | 35 |
| 2 | 56 |
| 3 | 73 |
| 4 | 25 |
| 5 | 2 |
| 6 | 1 |
| 12 | 1 |

### Recommendations

- ✅ **Terminal node percentage** (36.7%): Within healthy range (5-40%)
- ℹ️ **Long dependency chains** (18): Ensure students can follow extended learning paths

---

*Report generated by learning-graph-reports/analyze_graph.py*
