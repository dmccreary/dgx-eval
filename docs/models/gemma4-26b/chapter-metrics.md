---
title: 'Chapter Content Metrics: gemma4:26b'
description: 'Words, diagrams specified, and reading level for each chapter gemma4:26b wrote in the Algebra I benchmark.'
---

# Chapter Content Metrics: `gemma4:26b`

A program measured the chapters `gemma4:26b` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){ .md-button }

| | Result |
|---|---|
| Chapters written | 10 of 14 |
| Words in all chapters | 27,217 |
| Diagrams specified | 18 |
| Average reading grade of the written chapters | 11.5 |
| Average reading ease of the written chapters | 44.7 |
| Concepts from the learning graph assigned to a chapter | 151 of 200 |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | [Algebra Foundations and Basic Operations](chapters/01-algebra-foundations-and-basic-operations/index.md) | Yes | 2,976 | 3 | 11.1 | 45.7 | 16.9 | 9 | 0 |
| 2 | [Algebraic Expressions and Functions](chapters/02-algebraic-expressions-and-functions/index.md) | No | 161 | 0 | — | — | — | 0 | 0 |
| 3 | [Advanced Algebra and Relations](chapters/03-advanced-algebra-and-relations/index.md) | Yes | 2,550 | 1 | 10.6 | 50.4 | 17.5 | 4 | 0 |
| 4 | [Exponents and Mathematical Constants](chapters/04-exponents-and-mathematical-constants/index.md) | Yes | 2,521 | 3 | 10.6 | 46.5 | 15.6 | 11 | 0 |
| 5 | [Laws of Exponents and Modeling](chapters/05-laws-of-exponents-and-modeling/index.md) | Yes | 2,465 | 1 | 9.9 | 52.6 | 16.0 | 11 | 0 |
| 6 | [Radicals and Algebraic Properties](chapters/06-radicals-and-algebraic-properties/index.md) | No | 180 | 0 | — | — | — | 0 | 0 |
| 7 | [Rational Exponents and Logic](chapters/07-rational-exponents-and-logic/index.md) | Yes | 4,206 | 4 | 11.9 | 43.0 | 18.6 | 9 | 0 |
| 8 | [Equations and Inequalities Fundamentals](chapters/08-equations-and-inequalities-fundamentals/index.md) | Yes | 3,479 | 0 | 10.9 | 48.7 | 18.0 | 5 | 0 |
| 9 | [Polynomial Operations and Factoring](chapters/09-polynomial-operations-and-factoring/index.md) | No | 197 | 0 | — | — | — | 0 | 0 |
| 10 | [Functions, Modeling, and Logic](chapters/10-functions-modeling-and-logic/index.md) | No | 193 | 0 | — | — | — | 0 | 0 |
| 11 | [Linear and Exponential Properties](chapters/11-linear-and-exponential-properties/index.md) | Yes | 3,140 | 0 | 12.2 | 42.5 | 19.5 | 4 | 0 |
| 12 | [Advanced Polynomials and Function Behavior](chapters/12-advanced-polynomials-and-function-behavior/index.md) | Yes | 1,874 | 1 | 11.6 | 44.7 | 18.4 | 5 | 0 |
| 13 | [Linear Relationships and Systems](chapters/13-linear-relationships-and-systems/index.md) | Yes | 1,608 | 3 | 11.9 | 40.6 | 17.3 | 1 | 0 |
| 14 | [Advanced Modeling and Statistics](chapters/14-advanced-modeling-and-statistics/index.md) | Yes | 1,667 | 2 | 14.4 | 31.8 | 22.3 | 0 | 0 |
| | **Whole book** | 10 of 14 | 27,217 | 18 | 11.5 | 44.7 | 18.0 | 59 | 0 |

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
  this copy so that the site builds, and their text was kept. The chapter list page had 14 more.

The three reading measures come from `analyze-reading-levels.py` in the
`book-installer` skill, which uses the `textstat` package. It strips
formatting first, but tables and diagram specifications still count as prose,
so a chapter with many of them scores as harder than its sentences are. The
whole-book figure is the average of the written chapters. Chapters that were
not written have no reading measures.
