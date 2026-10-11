---
title: 'Chapter Content Metrics: gpt-oss:120b'
description: 'Words, diagrams specified, and reading level for each chapter gpt-oss:120b wrote in the Algebra I benchmark.'
---

# Chapter Content Metrics: `gpt-oss:120b`

A program measured the chapters `gpt-oss:120b` wrote in stage 3. These numbers
describe the text. They do not say whether it is correct.

[View the chapters](chapters/index.md){ .md-button }

| | Result |
|---|---|
| Chapters written | 6 of 10 |
| Words in all chapters | 18,624 |
| Diagrams specified | 88 |
| Average reading grade of the written chapters | 12.5 |
| Average reading ease of the written chapters | 24.0 |
| Concepts from the learning graph assigned to a chapter | 200 of 200 |

## Each Chapter

| # | Chapter | Written | Words | Diagrams | Reading grade | Reading ease | Words per sentence | Lists that will not render | Links removed |
|---:|---|:---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | [Foundations of Algebra](chapters/01-foundations-of-algebra/index.md) | No | 180 | 0 | — | — | — | 0 | 0 |
| 2 | [Algebraic Operations – Part I](chapters/02-algebraic-operations-part-i/index.md) | Yes | 3,273 | 20 | 11.9 | 26.3 | 9.4 | 16 | 0 |
| 3 | [Algebraic Operations – Part II](chapters/03-algebraic-operations-part-ii/index.md) | No | 182 | 0 | — | — | — | 1 | 0 |
| 4 | [Algebraic Operations – Part III](chapters/04-algebraic-operations-part-iii/index.md) | Yes | 3,085 | 20 | 11.4 | 29.7 | 9.3 | 1 | 0 |
| 5 | [Functions – Foundations](chapters/05-functions-foundations/index.md) | No | 183 | 0 | — | — | — | 1 | 0 |
| 6 | [Functions – Advanced Topics](chapters/06-functions-advanced-topics/index.md) | Yes | 2,715 | 20 | 12.0 | 24.3 | 8.5 | 0 | 0 |
| 7 | [Data Analysis – Core Concepts](chapters/07-data-analysis-core-concepts/index.md) | No | 189 | 0 | — | — | — | 1 | 0 |
| 8 | [Data Analysis and Statistics – Part I](chapters/08-data-analysis-and-statistics-part-i/index.md) | Yes | 2,703 | 20 | 15.2 | 4.6 | 10.3 | 0 | 0 |
| 9 | [Statistics – Core Concepts](chapters/09-statistics-core-concepts/index.md) | Yes | 4,030 | 0 | 11.0 | 35.6 | 10.8 | 1 | 0 |
| 10 | [Miscellaneous Topics](chapters/10-miscellaneous-topics/index.md) | Yes | 2,084 | 8 | 13.2 | 23.4 | 13.1 | 1 | 0 |
| | **Whole book** | 6 of 10 | 18,624 | 88 | 12.5 | 24.0 | 10.2 | 22 | 0 |

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
