---
title: 'Chapter Content Metrics: gemma4:31b'
description: 'Words, diagrams specified, and reading level for each chapter gemma4:31b wrote in the Algebra I benchmark.'
---

# Chapter Content Metrics: `gemma4:31b`

A program measured the chapters `gemma4:31b` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){ .md-button }

| | Result |
|---|---|
| Chapters written | 10 of 12 |
| Words in all chapters | 26,841 |
| Diagrams specified | 36 |
| Average reading grade of the written chapters | 10.5 |
| Average reading ease of the written chapters | 46.8 |
| Concepts from the learning graph assigned to a chapter | 173 of 200 |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | [Algebra Foundations](chapters/01-algebra-foundations/index.md) | Yes | 2,918 | 6 | 11.0 | 40.3 | 13.7 | 38 | 0 |
| 2 | [Exponents and Radicals](chapters/02-exponents-radicals/index.md) | Yes | 2,543 | 2 | 10.2 | 48.7 | 15.1 | 18 | 0 |
| 3 | [Linear Equations](chapters/03-linear-equations/index.md) | Yes | 2,775 | 5 | 10.7 | 42.6 | 13.8 | 21 | 0 |
| 4 | [Linear Inequalities and Absolute Value](chapters/04-linear-inequalities-abs-value/index.md) | Yes | 2,055 | 4 | 11.7 | 39.8 | 16.1 | 15 | 0 |
| 5 | [Introduction to Functions](chapters/05-intro-to-functions/index.md) | No | 153 | 0 | — | — | — | 1 | 0 |
| 6 | [Linear Functions and Slope](chapters/06-linear-functions-slope/index.md) | Yes | 2,707 | 3 | 9.3 | 54.7 | 14.6 | 31 | 0 |
| 7 | [Systems of Linear Equations](chapters/07-systems-linear-equations/index.md) | Yes | 1,880 | 1 | 11.7 | 42.5 | 17.7 | 9 | 0 |
| 8 | [Polynomials and Factoring](chapters/08-polynomials-factoring/index.md) | Yes | 5,884 | 10 | 9.9 | 48.0 | 13.4 | 69 | 0 |
| 9 | [Quadratic Functions](chapters/09-quadratic-functions/index.md) | No | 187 | 0 | — | — | — | 1 | 0 |
| 10 | [Exponential Functions](chapters/10-exponential-functions/index.md) | Yes | 1,659 | 1 | 8.7 | 57.4 | 13.9 | 8 | 0 |
| 11 | [Data Analysis and Statistics](chapters/11-data-analysis-stats/index.md) | Yes | 2,357 | 2 | 10.2 | 50.7 | 16.1 | 11 | 0 |
| 12 | [Sequences and Series](chapters/12-sequences-series/index.md) | Yes | 1,723 | 2 | 11.6 | 43.5 | 17.9 | 7 | 0 |
| | **Whole book** | 10 of 12 | 26,841 | 36 | 10.5 | 46.8 | 15.2 | 229 | 0 |

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
