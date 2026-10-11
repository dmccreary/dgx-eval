---
title: 'Chapter Content Metrics: qwen3.8:27b'
description: 'Words, diagrams specified, and reading level for each chapter qwen3.8:27b wrote in the Algebra I benchmark.'
---

# Chapter Content Metrics: `qwen3.8:27b`

A program measured the chapters `qwen3.8:27b` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){ .md-button }

| | Result |
|---|---|
| Chapters written | 0 of 14 |
| Words in all chapters | 2,919 |
| Diagrams specified | 0 |
| Average reading grade of the written chapters | — |
| Average reading ease of the written chapters | — |
| Concepts from the learning graph assigned to a chapter | 200 of 200 |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | [Number System Foundations](chapters/01-number-system-foundations/index.md) | No | 213 | 0 | — | — | — | 0 | 0 |
| 2 | [Algebraic Expressions and Variables](chapters/02-algebraic-expressions/index.md) | No | 210 | 0 | — | — | — | 0 | 0 |
| 3 | [Exponents and Radicals](chapters/03-exponents-radicals/index.md) | No | 220 | 0 | — | — | — | 0 | 0 |
| 4 | [Linear Equations and Inequalities](chapters/04-linear-equations-inequalities/index.md) | No | 257 | 0 | — | — | — | 0 | 0 |
| 5 | [Functions and Relations](chapters/05-functions-relations/index.md) | No | 246 | 0 | — | — | — | 0 | 0 |
| 6 | [Linear Relationships and Slope](chapters/06-linear-relationships-slope/index.md) | No | 228 | 0 | — | — | — | 0 | 0 |
| 7 | [Systems of Linear Equations](chapters/07-systems-linear-equations/index.md) | No | 195 | 0 | — | — | — | 0 | 0 |
| 8 | [Polynomials and Polynomial Operations](chapters/08-polynomials-operations/index.md) | No | 166 | 0 | — | — | — | 0 | 0 |
| 9 | [Factoring Polynomials](chapters/09-factoring-polynomials/index.md) | No | 197 | 0 | — | — | — | 0 | 0 |
| 10 | [Quadratic Functions and Equations](chapters/10-quadratic-functions-equations/index.md) | No | 253 | 0 | — | — | — | 0 | 0 |
| 11 | [Exponential Functions and Models](chapters/11-exponential-functions-models/index.md) | No | 183 | 0 | — | — | — | 0 | 0 |
| 12 | [Sequences and Patterns](chapters/12-sequences-patterns/index.md) | No | 173 | 0 | — | — | — | 0 | 0 |
| 13 | [Statistics and Data Analysis](chapters/13-statistics-data-analysis/index.md) | No | 175 | 0 | — | — | — | 0 | 0 |
| 14 | [Applied Modeling and Capstone](chapters/14-applied-modeling-capstone/index.md) | No | 203 | 0 | — | — | — | 0 | 0 |
| | **Whole book** | 0 of 14 | 2,919 | 0 | — | — | — | 0 | 0 |

## What the Columns Mean

- **Written.** The chapter's placeholder is gone and it has at least 1,000
  words. A chapter marked No is still the outline from stage 2.
- **Words.** Every word in the chapter file after its frontmatter, including
  tables and diagram specifications.
- **Diagrams.** The number of `#### Diagram` headings. Each one is a
  specification for a diagram or MicroSim to be built later.
- **Reading grade.** The Flesch-Kincaid grade level: the United States school
  grade at which a reader should follow the text. Algebra I is usually taught
  in grade 9.
- **Reading ease.** The Flesch reading-ease score. Higher is easier; 60 to 70
  is plain English.
- **Words per sentence.** The average sentence length.
- **Lists that will not render.** Lists with no blank line before them, which
  the site shows as a run-on paragraph.
- **Links removed.** Links to pages that do not exist. They were removed from
  this copy so that the site builds, and their text was kept.

The three reading measures come from `analyze-reading-levels.py` in the
`book-installer` skill, which uses the `textstat` package. It strips
formatting first, but tables and diagram specifications still count as prose,
so a chapter with many of them scores as harder than its sentences are. The
whole-book figure is the average of the written chapters. Chapters that were
not written have no reading measures.
