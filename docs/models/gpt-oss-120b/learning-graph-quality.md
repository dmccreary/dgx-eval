---
title: 'Learning Graph Quality Report: gpt-oss:120b'
description: 'Automated checks on the learning graph gpt-oss:120b generated for the Algebra I benchmark.'
---

# Learning Graph Quality Report: `gpt-oss:120b`

A program wrote this report from the files `gpt-oss:120b` produced in stage 1. It
checks structure. It does not judge whether these are the right concepts for
Algebra I or whether the dependencies make sense.

[View the learning graph](learning-graph-viewer.md){ .md-button }

## Structural Checks

From `src/scoring/score_learning_graph.py` in this repository.

| Check | Result |
|---|---|
| Concepts | 200 of 200 asked for |
| Dependencies | 180, an average of 0.9 per concept |
| Concepts on a cycle | 0 |
| Concepts with no prerequisite | 20 |
| Concepts connected to nothing | 19 |
| Duplicate concept labels | 0 |
| Labels longer than 32 characters | 2 |
| Concepts with a taxonomy category | 200 |
| Errors in the CSV file | 0 |
| JSON file agrees with the CSV file | Yes |
| Taxonomy groups in the JSON file | 6 |
| Expected files missing | None |
| Navigation mentions the learning graph | Yes |

## Graph Analysis

From `analyze-graph.py`, the analysis script of the `learning-graph-generator`
skill, run on the model's CSV file when this page was built. It is not the
report the model wrote about its own graph.

### Overview

- **Total Concepts**: 200
- **Foundational Concepts** (no prerequisites, other concepts depend on them): 1
- **Terminal Nodes** (nothing depends on them, but have prerequisites): 1
- **Orphaned Nodes** (completely disconnected, no edges): 19
- **Concepts with Dependencies**: 180
- **Average Dependencies per Concept**: 1.00

### Graph Structure Validation

- **Valid DAG Structure**: ✅ Yes
- **Self-Dependencies**: None detected ✅
- **Cycles Detected**: 0

### Foundational Concepts

These concepts have no prerequisites:

- **20**: Quadratic Formula

### Dependency Chain Analysis

- **Maximum Dependency Chain Length**: 181

#### Longest Learning Path:

1. **Quadratic Formula** (ID: 20)
2. **Completing the Square** (ID: 21)
3. **Linear Equations** (ID: 22)
4. **One‑Step Equations** (ID: 23)
5. **Two‑Step Equations** (ID: 24)
6. **Multi‑Step Equations** (ID: 25)
7. **Literal Equations** (ID: 26)
8. **Solving for Variables** (ID: 27)
9. **Inequalities** (ID: 28)
10. **Linear Inequalities** (ID: 29)
11. **Absolute Value Equations** (ID: 30)
12. **Absolute Value Inequalities** (ID: 31)
13. **Graphing Lines** (ID: 32)
14. **Slope** (ID: 33)
15. **Y‑Intercept** (ID: 34)
16. **X‑Intercept** (ID: 35)
17. **Slope‑Intercept Form** (ID: 36)
18. **Point‑Slope Form** (ID: 37)
19. **Standard Form (Lines)** (ID: 38)
20. **Parallel Lines** (ID: 39)
21. **Perpendicular Lines** (ID: 40)
22. **Systems of Linear Equations** (ID: 41)
23. **Substitution Method** (ID: 42)
24. **Elimination Method** (ID: 43)
25. **Graphical Solutions of Systems** (ID: 44)
26. **Functions** (ID: 45)
27. **Function Notation** (ID: 46)
28. **Domain** (ID: 47)
29. **Range** (ID: 48)
30. **Evaluating Functions** (ID: 49)
31. **Linear Functions** (ID: 50)
32. **Quadratic Functions** (ID: 51)
33. **Vertex** (ID: 52)
34. **Axis of Symmetry** (ID: 53)
35. **Parabola** (ID: 54)
36. **Factoring Quadratics** (ID: 55)
37. **Graphing Quadratics** (ID: 56)
38. **Exponential Functions** (ID: 57)
39. **Growth and Decay** (ID: 58)
40. **Logarithms** (ID: 59)
41. **Sequences** (ID: 60)
42. **Arithmetic Sequence** (ID: 61)
43. **Geometric Sequence** (ID: 62)
44. **Recursive Definition** (ID: 63)
45. **Explicit Formula** (ID: 64)
46. **Data Analysis** (ID: 65)
47. **Scatterplots** (ID: 66)
48. **Correlation** (ID: 67)
49. **Line of Best Fit** (ID: 68)
50. **Regression** (ID: 69)
51. **Mean** (ID: 70)
52. **Median** (ID: 71)
53. **Mode** (ID: 72)
54. **Standard Deviation** (ID: 73)
55. **Probability** (ID: 74)
56. **Data Displays** (ID: 75)
57. **Bar Graphs** (ID: 76)
58. **Histograms** (ID: 77)
59. **Box Plots** (ID: 78)
60. **Outliers** (ID: 79)
61. **Modeling Real‑World Problems** (ID: 80)
62. **Word Problems** (ID: 81)
63. **Translating Situations to Equations** (ID: 82)
64. **Verifying Solutions** (ID: 83)
65. **Proof Techniques** (ID: 84)
66. **Mathematical Reasoning** (ID: 85)
67. **Critical Thinking** (ID: 86)
68. **Problem Solving Strategies** (ID: 87)
69. **Technology in Algebra** (ID: 88)
70. **Graphing Calculator** (ID: 89)
71. **Algebraic Software** (ID: 90)
72. **Common Core Standards** (ID: 91)
73. **NCTM Recommendations** (ID: 92)
74. **Algebraic Thinking** (ID: 93)
75. **Mathematical Communication** (ID: 94)
76. **Mathematical Modeling** (ID: 95)
77. **Linear Models** (ID: 96)
78. **Quadratic Models** (ID: 97)
79. **Exponential Models** (ID: 98)
80. **Systems Modeling** (ID: 99)
81. **Proportional Reasoning** (ID: 100)
82. **Ratios** (ID: 101)
83. **Proportions** (ID: 102)
84. **Percentages** (ID: 103)
85. **Scientific Notation** (ID: 104)
86. **Variable Substitution** (ID: 105)
87. **Pattern Recognition** (ID: 106)
88. **Recursive Patterns** (ID: 107)
89. **Direct Variation** (ID: 108)
90. **Inverse Variation** (ID: 109)
91. **Coordinate Plane** (ID: 110)
92. **Cartesian Coordinates** (ID: 111)
93. **Plotting Points** (ID: 112)
94. **Ordered Pairs** (ID: 113)
95. **Function Transformations** (ID: 114)
96. **Shifts** (ID: 115)
97. **Stretches** (ID: 116)
98. **Reflections** (ID: 117)
99. **Symmetry** (ID: 118)
100. **Number Line** (ID: 119)
101. **Real Numbers** (ID: 120)
102. **Integers** (ID: 121)
103. **Rational Numbers** (ID: 122)
104. **Irrational Numbers** (ID: 123)
105. **Complex Numbers (Intro)** (ID: 124)
106. **Polynomials** (ID: 125)
107. **Degree of Polynomial** (ID: 126)
108. **Leading Coefficient** (ID: 127)
109. **End Behavior** (ID: 128)
110. **Rational Expressions** (ID: 129)
111. **Simplifying Rational Expressions** (ID: 130)
112. **Multiplying Rational Expressions** (ID: 131)
113. **Dividing Rational Expressions** (ID: 132)
114. **Adding Rational Expressions** (ID: 133)
115. **Subtracting Rational Expressions** (ID: 134)
116. **Common Denominator** (ID: 135)
117. **Function Composition** (ID: 136)
118. **Inverse Functions** (ID: 137)
119. **Graphing Rational Functions** (ID: 138)
120. **Asymptotes** (ID: 139)
121. **Vertical Asymptote** (ID: 140)
122. **Horizontal Asymptote** (ID: 141)
123. **Oblique Asymptote** (ID: 142)
124. **Systems with Three Variables** (ID: 143)
125. **Matrices (Intro)** (ID: 144)
126. **Determinants** (ID: 145)
127. **Solving Linear Systems with Matrices** (ID: 146)
128. **Applications of Linear Systems** (ID: 147)
129. **Optimization Problems** (ID: 148)
130. **Linear Programming (Intro)** (ID: 149)
131. **Quadratic Inequalities** (ID: 150)
132. **Graphing Quadratic Inequalities** (ID: 151)
133. **Sign Diagrams** (ID: 152)
134. **Number Line Diagrams** (ID: 153)
135. **Absolute Value Graphs** (ID: 154)
136. **Piecewise Functions** (ID: 155)
137. **Step Functions** (ID: 156)
138. **Floor Function** (ID: 157)
139. **Ceiling Function** (ID: 158)
140. **Graphing Piecewise Functions** (ID: 159)
141. **Function Domain Restrictions** (ID: 160)
142. **Modeling Population Growth** (ID: 161)
143. **Compound Interest** (ID: 162)
144. **Depreciation** (ID: 163)
145. **Newton’s Method (Intro)** (ID: 164)
146. **Root Finding** (ID: 165)
147. **Iterative Methods** (ID: 166)
148. **Mathematical Proofs** (ID: 167)
149. **Inductive Reasoning** (ID: 168)
150. **Deductive Reasoning** (ID: 169)
151. **Logical Statements** (ID: 170)
152. **Conditional Statements** (ID: 171)
153. **If‑Then Statements** (ID: 172)
154. **Biconditional Statements** (ID: 173)
155. **Negation** (ID: 174)
156. **Quantifiers** (ID: 175)
157. **Mathematical Vocabulary** (ID: 176)
158. **Symbols and Notation** (ID: 177)
159. **Units of Measurement** (ID: 178)
160. **Dimensional Analysis** (ID: 179)
161. **Error Analysis** (ID: 180)
162. **Estimation** (ID: 181)
163. **Rounding** (ID: 182)
164. **Significant Figures** (ID: 183)
165. **Data Collection Methods** (ID: 184)
166. **Survey Design** (ID: 185)
167. **Sampling Techniques** (ID: 186)
168. **Probability Distributions** (ID: 187)
169. **Discrete Probability** (ID: 188)
170. **Continuous Probability** (ID: 189)
171. **Expected Value** (ID: 190)
172. **Variance** (ID: 191)
173. **Normal Distribution (Intro)** (ID: 192)
174. **Z‑Scores** (ID: 193)
175. **Confidence Intervals** (ID: 194)
176. **Hypothesis Testing (Intro)** (ID: 195)
177. **Linear Regression (Intro)** (ID: 196)
178. **Correlation Coefficient** (ID: 197)
179. **Data Interpretation** (ID: 198)
180. **Algorithmic Thinking** (ID: 199)
181. **Pseudo‑Code** (ID: 200)

### Terminal Nodes Analysis

Terminal nodes are concepts that nothing else depends on but have prerequisites. They represent natural endpoints of learning paths — culminating or specialized concepts.

- **Total Terminal Nodes**: 1 (0.5% of all concepts)
- **Healthy Range**: 5-40% of total concepts

Concepts at the end of learning paths:

- **200**: Pseudo‑Code

### Orphaned Nodes Analysis

Orphaned nodes are completely disconnected concepts with no inbound AND no outbound edges. These indicate a quality problem — every concept should connect to the graph.

- **Total Orphaned Nodes**: 19

⚠️ Completely disconnected concepts:

- **1**: Algebraic Variables
- **2**: Constants
- **3**: Coefficients
- **4**: Exponents
- **5**: Radicals
- **6**: Square Roots
- **7**: Rational Exponents
- **8**: Properties of Operations
- **9**: Commutative Property
- **10**: Associative Property
- **11**: Distributive Property
- **12**: Order of Operations
- **13**: Simplifying Expressions
- **14**: Evaluating Expressions
- **15**: Expanding Expressions
- **16**: Factoring Expressions
- **17**: Greatest Common Factor
- **18**: Factoring Trinomials
- **19**: Difference of Squares

### Connected Components

- **Number of Connected Components**: 20

⚠️ Multiple disconnected subgraphs detected:

#### Component 1 (1 concepts)

- Algebraic Variables

#### Component 2 (1 concepts)

- Constants

#### Component 3 (1 concepts)

- Coefficients

#### Component 4 (1 concepts)

- Exponents

#### Component 5 (1 concepts)

- Radicals

#### Component 6 (1 concepts)

- Square Roots

#### Component 7 (1 concepts)

- Rational Exponents

#### Component 8 (1 concepts)

- Properties of Operations

#### Component 9 (1 concepts)

- Commutative Property

#### Component 10 (1 concepts)

- Associative Property

#### Component 11 (1 concepts)

- Distributive Property

#### Component 12 (1 concepts)

- Order of Operations

#### Component 13 (1 concepts)

- Simplifying Expressions

#### Component 14 (1 concepts)

- Evaluating Expressions

#### Component 15 (1 concepts)

- Expanding Expressions

#### Component 16 (1 concepts)

- Factoring Expressions

#### Component 17 (1 concepts)

- Greatest Common Factor

#### Component 18 (1 concepts)

- Factoring Trinomials

#### Component 19 (1 concepts)

- Difference of Squares

#### Component 20 (181 concepts)

- Quadratic Formula
- Completing the Square
- Linear Equations
- One‑Step Equations
- Two‑Step Equations
- Multi‑Step Equations
- Literal Equations
- Solving for Variables
- Inequalities
- Linear Inequalities
- *...and 171 more*

### Indegree Analysis

Top 10 concepts that are prerequisites for the most other concepts:

| Rank | Concept ID | Concept Label | Indegree |
|------|-----------|---------------|----------|
| 1 | 20 | Quadratic Formula | 1 |
| 2 | 21 | Completing the Square | 1 |
| 3 | 22 | Linear Equations | 1 |
| 4 | 23 | One‑Step Equations | 1 |
| 5 | 24 | Two‑Step Equations | 1 |
| 6 | 25 | Multi‑Step Equations | 1 |
| 7 | 26 | Literal Equations | 1 |
| 8 | 27 | Solving for Variables | 1 |
| 9 | 28 | Inequalities | 1 |
| 10 | 29 | Linear Inequalities | 1 |

### Outdegree Distribution

| Dependencies | Number of Concepts |
|--------------|--------------------|
| 0 | 20 |
| 1 | 180 |

### Recommendations

- ⚠️ **Connect disconnected components**: Add dependencies to link separate subgraphs
- ⚠️ **Orphaned nodes detected** (19): These concepts are completely disconnected and must be linked to the graph
- ℹ️ **Low terminal node percentage** (0.5%): Graph may lack endpoint specialization
- ✅ **DAG structure verified**: Graph supports valid learning progressions
- ℹ️ **Long dependency chains** (181): Ensure students can follow extended learning paths
- ℹ️ **Consider adding cross-dependencies**: More connections could create richer learning pathways

---

*Report generated by learning-graph-reports/analyze_graph.py*
