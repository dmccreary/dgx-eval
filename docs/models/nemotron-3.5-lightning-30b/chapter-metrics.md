---
title: 'Chapter Content Metrics: nemotron-3.5-lightning:30b'
description: 'Words, diagrams specified, and reading level for each chapter nemotron-3.5-lightning:30b wrote in the Algebra I benchmark.'
---

# Chapter Content Metrics: `nemotron-3.5-lightning:30b`

A program measured the chapters `nemotron-3.5-lightning:30b` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){ .md-button }

| | Result |
|---|---|
| Chapters written | 12 of 12 |
| Words in all chapters | 81,739 |
| Diagrams specified | 51 |
| Average reading grade of the written chapters | 12.0 |
| Average reading ease of the written chapters | 41.7 |
| Concepts from the learning graph assigned to a chapter | 199 of 199 |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | [Foundations](chapters/01-foundations/index.md) | Yes | 8,979 | 4 | 12.0 | 42.0 | 18.5 | 0 | 0 |
| 2 | [Linear Equations](chapters/02-linear-equations/index.md) | Yes | 9,191 | 0 | 9.7 | 55.6 | 16.8 | 1 | 0 |
| 3 | [Functions and Notation](chapters/03-functions-and-notation/index.md) | Yes | 5,100 | 0 | 11.1 | 50.6 | 19.6 | 11 | 0 |
| 4 | [Graphing and Coordinates](chapters/04-graphing-and-coordinates/index.md) | Yes | 3,967 | 1 | 12.4 | 38.7 | 18.2 | 9 | 0 |
| 5 | [Polynomials and Factoring](chapters/05-polynomials-and-factoring/index.md) | Yes | 3,790 | 0 | 10.7 | 44.6 | 14.8 | 1 | 0 |
| 6 | [Quadratic Functions](chapters/06-quadratic-functions/index.md) | Yes | 11,000 | 21 | 11.3 | 41.9 | 15.8 | 8 | 0 |
| 7 | [Exponents and Radicals](chapters/07-exponents-and-radicals/index.md) | Yes | 7,547 | 2 | 11.6 | 45.0 | 18.7 | 4 | 0 |
| 8 | [Systems of Equations](chapters/08-systems-of-equations/index.md) | Yes | 3,739 | 2 | 11.3 | 47.2 | 18.6 | 6 | 0 |
| 9 | [Statistics and Data Analysis](chapters/09-statistics-and-data-analysis/index.md) | Yes | 12,042 | 7 | 11.9 | 43.7 | 18.9 | 92 | 0 |
| 10 | [Sequences and Series](chapters/10-sequences-and-series/index.md) | Yes | 5,389 | 0 | 16.7 | 17.9 | 23.9 | 0 | 0 |
| 11 | [Mathematical Modeling](chapters/11-mathematical-modeling/index.md) | Yes | 2,828 | 1 | 12.9 | 33.5 | 17.3 | 8 | 0 |
| 12 | [Advanced Topics and Review](chapters/12-advanced-topics-and-review/index.md) | Yes | 8,167 | 13 | 12.0 | 40.1 | 17.6 | 1 | 0 |
| | **Whole book** | 12 of 12 | 81,739 | 51 | 12.0 | 41.7 | 18.2 | 141 | 0 |

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
