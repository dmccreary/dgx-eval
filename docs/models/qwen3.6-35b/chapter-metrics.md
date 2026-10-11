---
title: 'Chapter Content Metrics: qwen3.6:35b'
description: 'Words, diagrams specified, and reading level for each chapter qwen3.6:35b wrote in the Algebra I benchmark.'
---

# Chapter Content Metrics: `qwen3.6:35b`

A program measured the chapters `qwen3.6:35b` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){ .md-button }

| | Result |
|---|---|
| Chapters written | 11 of 11 |
| Words in all chapters | 75,425 |
| Diagrams specified | 33 |
| Average reading grade of the written chapters | 11.3 |
| Average reading ease of the written chapters | 46.9 |
| Concepts from the learning graph assigned to a chapter | 154 of 200 |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | [Foundational Number Concepts and Properties](chapters/01-foundational-concepts-and-properties/index.md) | Yes | 5,596 | 0 | 13.7 | 35.8 | 21.8 | 0 | 0 |
| 2 | [Variables, Expressions, and Polynomial Foundations](chapters/02-variables-expressions-polynomial-foundations/index.md) | Yes | 5,737 | 1 | 10.5 | 50.2 | 17.2 | 10 | 0 |
| 3 | [Factoring Techniques and Polynomial Division](chapters/03-factoring-techniques-polynomial-division/index.md) | Yes | 7,286 | 2 | 11.1 | 48.6 | 18.5 | 9 | 0 |
| 4 | [Linear Equations and Inequalities](chapters/04-linear-equations-inequalities/index.md) | Yes | 7,874 | 0 | 10.0 | 47.6 | 13.4 | 8 | 0 |
| 5 | [Linear Relationships and Coordinate Graphing](chapters/05-linear-relationships-coordinate-graphing/index.md) | Yes | 9,683 | 9 | 9.7 | 55.6 | 17.1 | 18 | 0 |
| 6 | [Quadratic Functions](chapters/06-quadratic-functions/index.md) | Yes | 10,541 | 8 | 11.2 | 51.2 | 20.5 | 12 | 0 |
| 7 | [Functions and Relations](chapters/07-functions-relations/index.md) | Yes | 8,941 | 7 | 11.0 | 46.1 | 16.6 | 23 | 0 |
| 8 | [Exponential Functions and Sequences](chapters/08-exponential-functions-sequences/index.md) | Yes | 6,669 | 3 | 10.6 | 47.9 | 16.2 | 17 | 2 |
| 9 | [Sequences and Statistics](chapters/09-sequences-and-statistics/index.md) | Yes | 6,297 | 2 | 12.9 | 44.7 | 23.5 | 9 | 0 |
| 10 | [Mathematical Modeling and Applications](chapters/10-mathematical-modeling-applications/index.md) | Yes | 3,102 | 1 | 11.3 | 42.6 | 16.0 | 1 | 0 |
| 11 | [Radicals and Radical Equations](chapters/11-radicals-and-equations/index.md) | Yes | 3,699 | 0 | 12.0 | 45.7 | 20.7 | 3 | 0 |
| | **Whole book** | 11 of 11 | 75,425 | 33 | 11.3 | 46.9 | 18.3 | 110 | 2 |

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
