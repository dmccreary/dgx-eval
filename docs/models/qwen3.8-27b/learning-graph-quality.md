---
title: 'Learning Graph Quality Report: qwen3.8:27b'
description: 'Automated checks on the learning graph qwen3.8:27b generated for the Algebra I benchmark.'
---

# Learning Graph Quality Report: `qwen3.8:27b`

A program wrote this report from the files `qwen3.8:27b` produced in stage 1. It
checks structure. It does not judge whether these are the right concepts for
Algebra I or whether the dependencies make sense.

[View the learning graph](learning-graph-viewer.md){ .md-button }

## Structural Checks

From `src/scoring/score_learning_graph.py` in this repository.

| Check | Result |
|---|---|
| Concepts | 200 of 200 asked for |
| Dependencies | 299, an average of 1.5 per concept |
| Concepts on a cycle | 0 |
| Concepts with no prerequisite | 2 |
| Concepts connected to nothing | 0 |
| Duplicate concept labels | 0 |
| Labels longer than 32 characters | 0 |
| Concepts with a taxonomy category | 200 |
| Errors in the CSV file | 0 |
| JSON file agrees with the CSV file | Yes |
| Taxonomy groups in the JSON file | 14 |
| Expected files missing | None |
| Navigation mentions the learning graph | Yes |

## Graph Analysis

From `analyze-graph.py`, the analysis script of the `learning-graph-generator`
skill, run on the model's CSV file when this page was built. It is not the
report the model wrote about its own graph.

### Overview

- **Total Concepts**: 200
- **Foundational Concepts** (no prerequisites, other concepts depend on them): 2
- **Terminal Nodes** (nothing depends on them, but have prerequisites): 49
- **Orphaned Nodes** (completely disconnected, no edges): 0
- **Concepts with Dependencies**: 198
- **Average Dependencies per Concept**: 1.51

### Graph Structure Validation

- **Valid DAG Structure**: ✅ Yes
- **Self-Dependencies**: None detected ✅
- **Cycles Detected**: 0

### Foundational Concepts

These concepts have no prerequisites:

- **1**: Arithmetic Operations
- **16**: Variable

### Dependency Chain Analysis

- **Maximum Dependency Chain Length**: 19

#### Longest Learning Path:

1. **Variable** (ID: 16)
2. **Constant** (ID: 17)
3. **Coefficient** (ID: 18)
4. **Term** (ID: 19)
5. **Algebraic Expression** (ID: 20)
6. **Equation** (ID: 49)
7. **Properties of Equality** (ID: 50)
8. **One-Step Equations** (ID: 52)
9. **Two-Step Equations** (ID: 53)
10. **Multi-Step Equations** (ID: 54)
11. **Equations with Distribution** (ID: 55)
12. **Variables on Both Sides** (ID: 56)
13. **Linear Equation** (ID: 59)
14. **Equation Word Problems** (ID: 69)
15. **Building Equation Models** (ID: 191)
16. **Verifying Model Solutions** (ID: 195)
17. **Multi-Step Problems** (ID: 196)
18. **Mathematical Communication** (ID: 197)
19. **Algebra Capstone** (ID: 200)

### Terminal Nodes Analysis

Terminal nodes are concepts that nothing else depends on but have prerequisites. They represent natural endpoints of learning paths — culminating or specialized concepts.

- **Total Terminal Nodes**: 49 (24.5% of all concepts)
- **Healthy Range**: 5-40% of total concepts

Concepts at the end of learning paths:

- **6**: Real Number System
- **13**: Commutative Property
- **14**: Associative Property
- **21**: Numerical Expression
- **43**: Rational Exponents
- **46**: Properties of Radicals
- **47**: Rationalizing the Denominator
- **48**: Scientific Notation
- **57**: Equations with Fractions
- **58**: Literal Equations
- **61**: Infinitely Many Solutions
- **65**: Compound Inequalities
- **66**: Graphing Inequalities
- **68**: Absolute Value Inequalities
- **79**: Vertical Line Test
- **84**: Nonlinear Functions
- **85**: Continuous and Discrete
- **87**: Step Functions
- **97**: Zero and Undefined Slope
- **99**: Point-Slope Form

*...and 29 more*

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
| 1 | 72 | Function | 7 |
| 2 | 16 | Variable | 6 |
| 3 | 98 | Slope-Intercept Form | 6 |
| 4 | 33 | Exponent | 5 |
| 5 | 71 | Ordered Pairs | 5 |
| 6 | 9 | Order of Operations | 4 |
| 7 | 11 | Percent Change | 4 |
| 8 | 12 | Properties of Operations | 4 |
| 9 | 35 | Laws of Exponents | 4 |
| 10 | 49 | Equation | 4 |

### Outdegree Distribution

| Dependencies | Number of Concepts |
|--------------|--------------------|
| 0 | 2 |
| 1 | 101 |
| 2 | 93 |
| 3 | 4 |

### Recommendations

- ✅ **Terminal node percentage** (24.5%): Within healthy range (5-40%)
- ✅ **DAG structure verified**: Graph supports valid learning progressions
- ℹ️ **Long dependency chains** (19): Ensure students can follow extended learning paths

---

*Report generated by learning-graph-reports/analyze_graph.py*
