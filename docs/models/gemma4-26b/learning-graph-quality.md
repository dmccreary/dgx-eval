---
title: 'Learning Graph Quality Report: gemma4:26b'
description: 'Automated checks on the learning graph gemma4:26b generated for the Algebra I benchmark.'
---

# Learning Graph Quality Report: `gemma4:26b`

A program wrote this report from the files `gemma4:26b` produced in stage 1. It
checks structure. It does not judge whether these are the right concepts for
Algebra I or whether the dependencies make sense.

[View the learning graph](learning-graph-viewer.md){ .md-button }

## Structural Checks

From `src/scoring/score_learning_graph.py` in this repository.

| Check | Result |
|---|---|
| Concepts | 200 of 200 asked for |
| Dependencies | 483, an average of 2.42 per concept |
| Concepts on a cycle | 0 |
| Concepts with no prerequisite | 1 |
| Concepts connected to nothing | 0 |
| Duplicate concept labels | 40 |
| Labels longer than 32 characters | 0 |
| Concepts with a taxonomy category | 200 |
| Errors in the CSV file | 0 |
| JSON file agrees with the CSV file | Yes |
| Taxonomy groups in the JSON file | 12 |
| Expected files missing | `index.md` |
| Navigation mentions the learning graph | No |

## Graph Analysis

From `analyze-graph.py`, the analysis script of the `learning-graph-generator`
skill, run on the model's CSV file when this page was built. It is not the
report the model wrote about its own graph.

### Overview

- **Total Concepts**: 200
- **Foundational Concepts** (no prerequisites, other concepts depend on them): 1
- **Terminal Nodes** (nothing depends on them, but have prerequisites): 23
- **Orphaned Nodes** (completely disconnected, no edges): 0
- **Concepts with Dependencies**: 199
- **Average Dependencies per Concept**: 2.43

### Graph Structure Validation

- **Valid DAG Structure**: ✅ Yes
- **Self-Dependencies**: None detected ✅
- **Cycles Detected**: 0

### Foundational Concepts

These concepts have no prerequisites:

- **1**: Algebra Foundations

### Dependency Chain Analysis

- **Maximum Dependency Chain Length**: 23

#### Longest Learning Path:

1. **Algebra Foundations** (ID: 1)
2. **Exponents** (ID: 10)
3. **One-Step Equations** (ID: 29)
4. **Two-Step Equations** (ID: 30)
5. **Multi-Step Equations** (ID: 31)
6. **Polynomials** (ID: 70)
7. **Factoring by GCF** (ID: 81)
8. **Quadratic Functions** (ID: 86)
9. **Vertex of a Parabola** (ID: 87)
10. **Axis of Symmetry** (ID: 88)
11. **Graphing Quadratics** (ID: 89)
12. **Standard Form of Quadratics** (ID: 90)
13. **Vertex Form of Quadratics** (ID: 91)
14. **Completing the Square** (ID: 92)
15. **Quadratic Formula** (ID: 93)
16. **Quadratic Equations** (ID: 157)
17. **Solving by Factoring** (ID: 158)
18. **Completing the Square** (ID: 159)
19. **Quadratic Formula** (ID: 160)
20. **Quadratic Functions** (ID: 161)
21. **Vertex of a Parabola** (ID: 162)
22. **Axis of Symmetry** (ID: 163)
23. **Graphing Quadratics** (ID: 164)

### Terminal Nodes Analysis

Terminal nodes are concepts that nothing else depends on but have prerequisites. They represent natural endpoints of learning paths — culminating or specialized concepts.

- **Total Terminal Nodes**: 23 (11.5% of all concepts)
- **Healthy Range**: 5-40% of total concepts

Concepts at the end of learning paths:

- **85**: Factoring Quadratic Equations
- **94**: Solving by Square Roots
- **101**: Comparing Function Models
- **124**: Factoring Expressions
- **125**: Rational Exponents
- **126**: Laws of Radicals
- **131**: Solving for a Variable
- **133**: Graphing Inequalities
- **134**: Absolute Value Equations
- **137**: Function Notation
- **139**: Step Functions
- **145**: Graphing Linear Equations
- **149**: Graphing Systems
- **150**: Linear Inequalities Systems
- **153**: Multiplying Polynomials
- **156**: Difference of Squares
- **164**: Graphing Quadratics
- **167**: Exponential Decay
- **171**: Line of Best Fit
- **173**: Geometric Sequences

*...and 3 more*

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
| 1 | 1 | Algebra Foundations | 183 |
| 2 | 10 | Exponents | 45 |
| 3 | 43 | Function Concept | 23 |
| 4 | 56 | Slope | 21 |
| 5 | 81 | Factoring by GCF | 17 |
| 6 | 31 | Multi-Step Equations | 15 |
| 7 | 70 | Polynomials | 8 |
| 8 | 64 | Linear Modeling | 2 |
| 9 | 2 | Order of Operations | 1 |
| 10 | 3 | Algebraic Expressions | 1 |

### Outdegree Distribution

| Dependencies | Number of Concepts |
|--------------|--------------------|
| 0 | 1 |
| 1 | 30 |
| 2 | 77 |
| 3 | 69 |
| 4 | 23 |

### Recommendations

- ✅ **Terminal node percentage** (11.5%): Within healthy range (5-40%)
- ✅ **DAG structure verified**: Graph supports valid learning progressions
- ℹ️ **Long dependency chains** (23): Ensure students can follow extended learning paths

---

*Report generated by learning-graph-reports/analyze_graph.py*
