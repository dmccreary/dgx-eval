---
title: 'Chapter Quality Score: How the Automated Score Works'
description: 'The algorithm that scores each generated chapter from 0 to 100 against the book''s content rules, and each book for how consistent its chapters are: what it measures, why each choice was made, what each choice costs, and where the source code is.'
---

# Chapter Quality Score

Last updated October 11, 2026.

This page describes the program that gives each generated chapter a score from
0 to 100, and gives each book a score for how consistent its chapters are. The
program is one Python file,
[`chapter_quality.py`](https://github.com/dmccreary/dgx-eval/blob/main/src/scoring/chapter_quality.py),
and it is meant to fill the Automated Quality Score column of
[Evaluation Status](evaluation-status.md), which is empty so far.

!!! warning "A conformance score, not a quality verdict"

    The score measures how closely a chapter follows the book's written content
    rules, using counts a program can reproduce. It does not check that the
    mathematics is correct or that the explanation is any good. No person has
    yet compared its output with their own judgment of the chapters, so read it
    as a screen that points to chapters worth reading, not as a ranking of how
    well the models teach.

## What the Score Has to Do

The Primary Author set four requirements:

- Use objective measurements.
- Include adherence to the rules in `CONTENT-GENERATION-GUIDE.md`, and include
  the precise placement of diagrams and the quality of their specifications.
- Report word count, diagram count, and reading level for each chapter.
- Favor consistent quality over high absolute quality.

Three more constraints follow from how the benchmark runs. The same files must
always give the same score, so a change in the score means a change in the
chapter. The program must run on a DGX with nothing installed beyond the Python
standard library. And every number must be explainable: a chapter that scores
badly has to show which rule it broke.

## The Algorithm in One Page

1. **Read the chapter.** Split it into blocks: headings, paragraphs, lists,
   tables, code, admonitions, and `<details>` diagram specifications.
2. **Decide whether it is written.** A chapter that still holds the placeholder
   text, or has fewer than 1,000 words, is a stub and scores 0.
3. **Compute its word budget** from the Concept Impact Scores in its own
   Concepts Covered table.
4. **Score six dimensions**, each from 0 to 1, each built from a handful of
   sub-scores.
5. **Combine them** with fixed weights into the chapter score.
6. **Score the book.** Multiply the book's mean chapter score by how little its
   written chapters differ from one another.

| Dimension | Weight | The question it asks |
|---|---:|---|
| Budget | 20 | Does the chapter hold the words, worked examples, and non-text elements that its own concepts call for? |
| Diagram placement | 20 | Is each diagram introduced, defined before it appears, near the text it illustrates, and spread through the chapter? |
| Diagram specification | 20 | Does each specification carry the fields, and the precision, that the specification rules ask for? |
| Format | 15 | Does the Markdown render, and are the headings, admonitions, and mascot used as the guide says? |
| Padding | 10 | Does the chapter repeat itself or pad with filler? |
| Reader fit | 15 | Is the reading level right for the audience, with equations and worked examples present? |

## Step 1: Reading a Chapter

The program does not render Markdown. It walks the file line by line and cuts
it into top-level blocks: headings, paragraphs, lists, tables, fenced code,
display math, HTML comments, raw HTML, admonitions, and `<details>` blocks.
Frontmatter is split off first and read for `title` and `description`.

### Finding the diagram specifications

A `<details>` block is a diagram specification when any one of these holds:

- A `#### Diagram:` heading owns it.
- It has at least three of the eighteen specification field labels.
- Its summary starts with the word Diagram.
- It is a reused MicroSim: its summary says so, or it contains an `<iframe>`.

Other `<details>` blocks, such as a hidden answer, are ignored. The third test
exists because one model wrote `<summary>#### Diagram: Title</summary>` with a
prose paragraph and no fields inside. That is a diagram in name only, and it
should score as a bad specification, not disappear.

A heading owns a block by the same rule the skill's own batch tool uses.
`create-microsim-todo-json-files.py` splits a chapter on `#### Diagram:`
headers and takes the first `<details>` block after each. Prose, an iframe, or a
fullscreen button may sit between the two. The score follows that rule and adds
one limit: the search for a header stops at another `<details>` block or at a
heading of level 1, 2, or 3, because a diagram under a new section is not placed
by the previous section's header.

### Counting words

Two word counts are kept, both split on whitespace as the guide counts them.

- **Total words** is the whole file after the frontmatter. It matches the
  Words column of the chapter metrics pages.
- **Body words** is what a student reads: everything except the specification
  blocks, fenced code, and the Concepts Covered table. The budget uses this one.

### The stub gate

A chapter is a stub when the placeholder text `TODO: Generate Chapter Content`
is present or the file has fewer than 1,000 words. The rule is imported from
`score_chapters.py`, so there is one definition of "written" in the project. A
stub scores 0 and none of the other checks run. Its raw counts are still
recorded.

## Step 2: The Word Budget

The guide sizes a chapter from its concepts, not from a flat number. Each
concept has a Concept Impact Score (CIS): one plus the sum of the CIS of every
concept that depends on it. A concept many others build on needs more careful
explanation, so its importance is normalized against the book's largest CIS:

\[ E(c) = \frac{\ln(\mathrm{CIS}(c) + 1)}{\ln(\mathrm{CIS}_{\max} + 1)} \]

The program reads `CIS_max` from the book's `learning-graph.json`. If that file
is missing it falls back to the largest CIS in the chapters' own tables and says
so in its output. `E(c)` then sets a tier:

| Tier | `E(c)` | Target words | Required elements |
|---|---|---:|---|
| A | 0.5 or more | 500–750 | worked example, plus a diagram, chart, table, or MicroSim |
| B | 0.2 to 0.5 | 250–400 | worked example |
| C | under 0.2 | 120–200 | a clear definition |

A chapter's budget is the sum of its concepts' targets, not a number of its
own. A chapter of mostly Tier A concepts is expected to run several times longer
than one of mostly Tier C. That variation is intended and the score does not
normalize it away.

### A plateau, not a target

The guide calls the budget "guidelines, not requirements" and says a dense
chapter beats a padded one at the target length. So the word-fit score does not
peak at the target. Full credit is a wide plateau:

```
score
1.0 |         ______________________
    |        /                      \
    |       /                        \
0.0 |______/                          \_________
         0.2L   0.6L          1.25H   2.5H      body words
         L = sum of the low targets, H = sum of the high targets
```

A chapter below 20% of the low target scores 0. It reaches full credit at 60%
of the low target, keeps it up to 125% of the high target, and falls to 0 at
250% of the high target. A chapter is never rewarded for exceeding its budget.

If a chapter has no Concepts Covered table, its budget cannot be computed. The
whole dimension scores 0 and the chapter is flagged `NO_CONCEPT_TABLE`.

## Step 3: The Six Dimensions

Each dimension is a weighted mean of sub-scores between 0 and 1. A sub-score
that does not apply to a chapter is left out and the remaining weights are
rescaled, so a chapter with no admonitions is not penalized for their absence.

### Budget (weight 20)

| Sub-score | Weight | How it is measured |
|---|---:|---|
| Words fit | 0.35 | Body words against the plateau above |
| Worked examples | 0.20 | Lines that start with Worked Example or Example, against 60% of the Tier A plus Tier B concept count |
| Non-text elements | 0.15 | Diagram specs, embedded sims, and tables, against 60% of the Tier A concept count. Skipped when there are no Tier A concepts |
| Concept coverage | 0.20 | The share of listed concepts whose label appears in the prose, after lower-casing and light stemming |
| Title alignment | 0.10 | 1 if any non-generic word of the title appears in the concept labels or headings |

The last two checks catch a failure that word counts cannot. One model's
chapter titled Exponents and Radicals held a concept list about function
notation. Words such as foundations, introduction, and advanced are ignored in
titles, because they match nothing.

### Diagram placement (weight 20)

Four of these are scored per diagram and averaged over the chapter. The other
three describe the chapter as a whole. A chapter with no diagram specification
scores 0 on all seven and is flagged `NO_DIAGRAMS`.

| Sub-score | Weight | How it is measured |
|---|---:|---|
| Header | 0.25 | 1 for an exact `#### Diagram: Title` heading, 0.5 for a Diagram heading at another level or format, 0 for none |
| Bridge | 0.15 | A paragraph of 8 or more words right before the header, or between header and block. 1 if its last two sentences signpost the diagram, 0.5 if not |
| Terms defined | 0.20 | Each term in the block's Prerequisites field is found in the teaching text above the block. 1 for the whole phrase, 0.5 if every word appears, 0 otherwise |
| Relevance | 0.15 | The content words of the title and Learning Objective appear in the 300 words before the block. Full credit at 50% |
| Spacing | 0.10 | Paragraphs beyond four in a row with no non-text element between them, as a share of all paragraphs. Full credit at none, zero at half |
| Evenness | 0.10 | The ideal gap, one over the number of diagrams plus one, divided by the largest gap between diagrams, measured in body words |
| Density | 0.05 | Diagrams per 1,000 body words: full credit from 0.8 to 4.0, zero at 0 and at 8 |

Terms defined and Relevance are the two checks that test whether a diagram sits
in the right place. Both read the teaching text only. The Summary, Concepts
Covered, and Prerequisites sections are excluded, because the concept table
would otherwise "define" every term in the chapter.

### Diagram specification (weight 20)

Each specification block is scored on 22 checks drawn from the rules R1 to R14
in the skill's
[microsim-specification-rules.md](https://github.com/dmccreary/ibook-skills/blob/main/skills/chapter-content-generator/references/microsim-specification-rules.md).
The chapter's score is the mean over its blocks. A reused MicroSim, which has
no fields of its own, receives full marks.

| Checks | Weight | What they test | Rule |
|---|---:|---|---|
| Fields present, content specific | 3 each | All 18 fields exist. The Content field has no "for example", "such as", or "etc." and holds a table, a list, or at least 40 words | R4 |
| Bloom, evidence rule, rules model, feedback | 2 each | Level is one of the six names and the verb is in that level's list. Evidence names a criterion. Rules hold a formula, comparator, or number. Feedback covers correct, incorrect, and attempts | R1, R2, R6, R8 |
| Enums, activity steps, interactive, no build details | 1.5 each | Type and Library come from the permitted lists. Activity is a numbered list. It contains an interaction verb. No pixel sizes, colors, canvas, or library calls | R7, R12, R14 |
| Label format, type and library pair, objective form, provenance, starting state, anchors, no placeholder, sim-id, depth | 1 each | Bold labels and `<br/>` endings. Library suits Type. Objective begins "The learner will" with no banned verb. Provenance states a source. Anchors' numbers appear in the chapter. No TODO or unfilled template. sim-id is kebab-case and unique. Spec length is 150 to 1,200 words | R1, R5, R10, R14 |
| Impossible features, summary matches, status | 0.5 each | No mouse-wheel zoom or clickable Mermaid edges. The summary matches the heading. Status is Specified or Reused | R13 |

The Type and Library checks compare exactly against the lists in rule R14, so
`mermaid` fails where `Mermaid` passes. R14 says a value outside the list
"silently falls back to p5.js". Whether the downstream generator also ignores
case has not been tested. If it does, this check is stricter than it needs to
be.

### Format (weight 15)

| Sub-score | Weight | How it is measured |
|---|---:|---|
| Lists render | 0.25 | One minus the share of lists with no blank line before them, which the site shows as a run-on paragraph |
| No leaked scaffolding | 0.15 | Text the model wrote for itself, such as `(Tier C: 120-200 words)` or an Elaboration Budget table. Full credit at none, zero at three |
| Headings | 0.15 | One H1, no skipped levels, and the Summary, Concepts Covered, and Prerequisites sections present |
| Admonition bodies | 0.10 | Indented four spaces |
| Images and embeds | 0.10 | Markdown image targets exist. An iframe pointing at a placeholder host, such as `example.com`, fails |
| Details blocks | 0.10 | Each carries `markdown="1"`, without which its contents are not rendered |
| Well formed | 0.10 | Fences and `<details>` tags are balanced and the file does not end mid-sentence |
| Frontmatter | 0.05 | `title` and `description` are present |
| Mascot | 0.20 | The placement rules in the guide, checked only where the book defines a mascot |

The mascot check covers the guide's pose counts, no two admonitions
back-to-back, the image in every admonition body, 1 to 3 sentences of text,
opening with a welcome, and closing with a celebration. A book defines a mascot
when `docs/img/mascot/` exists. In a book that defines none, a chapter that
uses a `mascot-` admonition anyway scores 0 on this sub-score and is flagged.

Math delimiters are not scored. `$…$`, `\(…\)`, `$$…$$`, and `\[…\]` are all
accepted, because `mkdocs.yml` renders each of them.

### Padding (weight 10)

| Sub-score | Weight | How it is measured |
|---|---:|---|
| Duplicate sentences | 0.25 | Sentences of six or more words that repeat another. Full credit at 2% or less, zero at 15% |
| Near-duplicate paragraphs | 0.15 | Paragraphs sharing 70% of their four-word phrases with another. Full credit at none, zero at 25% |
| Compression | 0.20 | zlib ratio averaged over 600-word windows. Full credit at 0.30 or more, zero at 0.18 |
| Filler phrases | 0.20 | A list of stock phrases such as "it is important to note" and "delve", per 1,000 words. Full credit at 1, zero at 6 |
| Templated specs | 0.20 | The share of specs that are not copies of a sibling: two or more identical fields, or the same title |

The compression ratio is taken over fixed windows because a whole-chapter ratio
falls as a chapter grows. An 8,000-word chapter compresses to about 0.27 and a
1,000-word one to about 0.38, so a whole-chapter ratio would punish length
itself.

### Reader fit (weight 15)

| Sub-score | Weight | How it is measured |
|---|---:|---|
| Reading grade | 0.40 | Flesch-Kincaid grade of the prose with math, code, tables, and specs removed. Full credit from two grades below the target to one and a half above, zero five away. The target is 9.0 for Algebra I |
| Sentence length | 0.15 | Full credit from 10 to 20 words per sentence, zero at 6 and at 32 |
| Math present | 0.20 | Equations per 1,000 words: full credit from 3 to 80, zero at 0 and at 250 |
| Worked-example density | 0.15 | Worked examples per 1,000 words, full credit at 1 |
| Variety | 0.10 | Distinct kinds of element used: list, table, diagram, admonition, code, display math, image. Full credit at four |

The reading grade uses the `textstat` package when it is installed and a
built-in syllable estimate when it is not, and the output says which. On the 49
written chapters the two differ by 0.47 grade levels on average, which moves the
chapter score by 0.22 points on average and by 2.5 points at most.

## Step 4: From Sub-Scores to One Number

Every sub-score is one of three shapes: a plateau with sloping sides, a
threshold that rises to full credit, or a threshold that falls from it. All are
linear and clamped between 0 and 1, so they can be read by eye and changed by
editing one constant.

The chapter score is the weighted mean of its six dimension scores:

\[ Q = 100 \times \frac{\sum_d w_d \, s_d}{\sum_d w_d} \]

with the weights in the first table of this page.

## Step 5: The Book Score

A book gets a level, a consistency, and a headline that combines the two.

\[ \mathrm{level} = \frac{1}{N} \sum_{i=1}^{N} Q_i \qquad
\mathrm{consistency} = 100 \left(1 - \frac{\sigma_W}{\mu_W}\right) \qquad
\mathrm{headline} = \frac{\mathrm{level} \times \mathrm{consistency}}{100} \]

Here `N` is every chapter in the book, with stubs counted as 0, and `μ_W` and
`σ_W` are the mean and population standard deviation of the written chapters
only. Consistency needs at least two written chapters; with one it is undefined
and so is the headline.

The program also reports the floor, the lowest written chapter, and a robust
z-score for each written chapter: its distance from the median divided by 1.4826
times the median absolute deviation, with the divisor never below 2 points. With
at least four written chapters, a z-score of 2 or more in either direction is
flagged `OUTLIER_LOW` or `OUTLIER_HIGH`. Finally it reports each dimension's
mean and coefficient of variation, which show which kind of failure a book is
inconsistent about.

## A Worked Example

Chapter 3, Linear Equations, from `gemma4:31b`. It has 16 concepts: none in Tier
A, 5 in Tier B, 11 in Tier C. So its budget is 5 × 250 + 11 × 120 = 2,570 words
at the low end and 5 × 400 + 11 × 200 = 4,200 at the high end.

| Dimension | How the number arises | Score |
|---|---|---:|
| Budget | 1,296 body words. Full credit starts at 0.6 × 2,570 = 1,542 and zero is at 514, so words fit is (1,296 − 514) ÷ (1,542 − 514) = 0.76. Worked examples, concept coverage, and title all score 1. Non-text is skipped because there is no Tier A concept | 90.1 |
| Placement | Header 1.0, bridge 0.3, terms 0.95, relevance 1.0, spacing 1.0, evenness 0.56, density 1.0. Weighted: 0.84 | 84.1 |
| Specification | Five blocks, mean 0.909. Each loses a little on a few checks, such as no stated rule in the evidence of mastery | 90.9 |
| Format | 21 of 35 lists lack a blank line, so lists score 0.4. Admonitions and images do not apply and are skipped | 81.2 |
| Padding | No repetition, compression 0.41, no filler | 100.0 |
| Reader fit | Grade 9.5, 12.4 words per sentence, 69 equations per 1,000 words. Variety 0.67 | 96.7 |

\[ Q = \frac{20(90.1) + 20(84.1) + 20(90.9) + 15(81.2) + 10(100) + 15(96.7)}{100} = 89.7 \]

For the book, `gemma4:31b` has 12 chapters. Ten are written, with scores from
68.7 to 90.8 and a mean of 83.8, and two are stubs. Level is the sum of those ten
scores over all twelve, 69.8. The coefficient of variation of the written
chapters is 0.09, so consistency is 91.1 and the headline is 69.8 × 0.911 =
63.6.

## Why It Is Built This Way

### Counts, not a language model

A model asked to rate a chapter would be quicker to build and would notice
things a regular expression cannot, such as an explanation that is wrong. It
would also give a different answer on each run, bring its own biases toward text
that sounds like itself, and, if it ran in the cloud, send the generated books
to a third party. The rules to be checked are written, specific, and mostly
countable. A program can check those, repeat itself exactly, and run on the DGX.

The cost is real. A counting score can be satisfied by text that has the right
fields and nothing in them. Section "What It Cannot Tell You" returns to this.

### Measure against the chapter's own expectation

A raw count rewards whoever writes the most. A chapter on a foundational topic
should be long and full of diagrams, and a chapter on a narrow topic should not.
So every sub-score compares the chapter to a number derived from its own concept
table, and every sub-score saturates. Adding another diagram, or another thousand words, earns nothing once the
chapter is on the plateau.

The check that this worked: across the 49 written chapters, the Spearman
correlation of the score with body words is −0.10, with diagram count 0.13, and
with equation count 0.15. The score does not track size.

The cost is that the plateau's edges are judgments. The 60% and 125% limits
come from the guide's own wording, not from data, and a different reading of
"guidelines, not requirements" would move them.

### Multiply level by consistency

The Primary Author asked to favor consistency over absolute quality. Several
ways of doing that were weighed.

| Option | What it does | Why it was not chosen |
|---|---|---|
| Mean chapter score | Ignores spread | A book of 10 excellent chapters and 10 stubs ties a book of 20 middling ones |
| Mean plus a variance penalty | Subtracts a term for spread | The penalty trades points for spread at an invented exchange rate, in the same units as the score |
| Lowest chapter only | Very strict | One bad chapter in twenty decides the whole book |
| Geometric mean of level and consistency | Rewards both | Too generous to a uniformly poor book: level 20 with consistency 95 scores 44, where level × consistency gives 19 |
| **Level × consistency** | Chosen | A uniformly poor book stays poor, and a lopsided book is cut by its spread |

Stubs enter the level as 0 but are left out of the consistency. A stub is
already punished by the level, and counting it again as variance would charge a
book twice for one fact.

The cost is that consistency rewards a book that wrote fewer chapters
uniformly. `gpt-oss:120b` has the highest consistency of any book, 95.3, because
it wrote only 6 of 10 chapters and those six resemble one another. The level
holds it back. That is why the results table below shows both numbers, and why
the written count is always printed beside them.

### Follow the skill's own parser

The first version required a diagram's header to sit directly above its
`<details>` block. The skill's own batch tool accepts prose between them, and
`gemma4:31b` used that layout throughout chapter 3. Together with the
second bug described below, the stricter rule gave the chapter 15 out of 100 on
placement against over 80 for its neighbors, and cost it 14 points overall: 75
against 89.

A score should agree with the toolchain that consumes the output, not with a
stricter idea of what the toolchain ought to accept. A diagram that the batch
tool will find and build is correctly placed. The score now mirrors the tool and
documents the one place where it is stricter.

### Other decisions

| Decision | Alternatives | Reason | Cost |
|---|---|---|---|
| Weights set by hand: 20, 20, 20, 15, 10, 15 | Fit to human ratings | No human ratings exist yet | The weights are opinions. A ±40% change in every weight flips the order of two pairs, named under How It Was Checked |
| Padding weight lowered from 15 to 10 | Keep 15 | Every book averages above 90 on it, so it adds points without separating anyone | It would catch a model that did start to pad, but it is now worth less |
| Thresholds read off the six existing books | Derive from theory | Compression, density, and sentence length have no authoritative limit | The limits fit this corpus. Revisit them when new models or a second course are added |
| Plain regular expressions and stemming | An NLP library | Every rule can be read and audited in a few lines, and the file has no dependencies | It misses paraphrase. "Linear function" and "a function that is linear" do not match |
| One file, standard library only | Several modules, packages | It copies to a fresh DGX and runs | It is long, about 1,300 lines, and regex-heavy |
| A sub-score that does not apply is dropped | Score it 0 or 1 | A chapter with no images should not gain or lose points for them | A chapter can avoid a check by not having the thing |
| Mascot rules only where a mascot is defined | Always score them | The Algebra I books have no mascot, and no chapter could pass | The rule is silent in a book that forgot its mascot |
| Math delimiters unscored | Penalize `$…$` | The Primary Author chose `$…$` for the algebra books and the site renders it | A model that writes `\(…\)` is not distinguished from one that writes `$…$` |

## What It Cannot Tell You

- **Correctness.** A chapter can follow every rule and teach a wrong
  procedure. Nothing here evaluates the mathematics.
- **Gaming.** A model could fill every specification field with plausible
  keywords and score well. The checks for templated specs, repeated sentences,
  and thin fields narrow the gap, and nothing closes it. In one gpt-oss chapter
  the Misconceptions field of all twenty specifications reads "(common
  misconceptions)". The duplicate check caught that. No check reads the words.
- **Absence of a human baseline.** The score is built on the written rules, not
  on what a teacher would call good. Until someone rates a sample of chapters
  and the two are compared, the weights are untested opinions.
- **Drift in the rules.** The specification checks encode version 1.11 of the
  skill. A new version of the skill can make a check wrong without any change in
  the chapters.
- **A thin sample.** Six models, 49 written chapters, and one course. The
  thresholds were not tested on anything else.

## How It Was Checked

| Check | Result |
|---|---|
| The same input scored twice | Identical output |
| `textstat` against the built-in reading estimate | 0.22 points of chapter score on average, 2.5 at most |
| Correlation of score with size | −0.10 with words, 0.13 with diagrams, 0.15 with equations |
| Every weight multiplied by a random 0.6 to 1.4, 500 times | Same order in 59% of trials. 3.3% of model pairs flip |

The flips come from two pairs: `qwen3.6:35b` against `gemma4:31b`, in 41% of the
trials, and `gemma4:26b` against `gpt-oss:120b`, in 8%. The first pair is within a
point of each other on the headline and should be treated as a tie.

Three bugs got past all four checks.

- **The header rule**, described above, was stricter than the toolchain.
- **The teaching-text boundary.** In a chapter that puts its prose straight
  after the Prerequisites list, with no new `##` heading, the function that finds
  where the teaching text begins decided the whole chapter was Prerequisites.
  Three placement sub-scores then came out as exactly 0 for that chapter.
- **The unfilled-slot pattern.** The check for template slots such as
  `<Title Case Name>` ran case-insensitively and so matched the HTML tag
  `<summary>`. It failed 278 of 282 specification blocks, and took about three
  points off every specification score.

None of these showed in the totals. The first two were found by reading one
chapter whose sub-scores looked wrong. The third was found because a check that
fails 99% of the time is a defect, which became visible only when the failure
rate of every check was tabulated. That is the argument for the comparison with
human judgment that is still owed.

## First Results

These are the six books of the Algebra I benchmark as scored on October 11,
2026, by the version of the program in the repository that day.

| Model | Written | Level | Consistency | Floor | Headline |
|---|---|---:|---:|---:|---:|
| qwen3.6:35b | 11 of 11 | 76.4 | 84.1 | 55.9 | **64.3** |
| gemma4:31b | 10 of 12 | 69.8 | 91.1 | 68.7 | **63.6** |
| nemotron-3.5-lightning:30b | 12 of 12 | 66.1 | 79.3 | 35.2 | **52.5** |
| gemma4:26b | 10 of 14 | 53.4 | 79.1 | 54.5 | **42.3** |
| gpt-oss:120b | 6 of 10 | 40.9 | 95.3 | 63.5 | **39.0** |
| qwen3.8:27b | 0 of 14 | 0 | — | 0 | — |

Beyond the totals, the program found defects that were each confirmed by
reading the chapter:

- Chapter titles that do not match their concept lists, in nemotron.
- The model's own working, such as `(Tier C: 120-200 words)`, printed in
  headings.
- Concepts Covered tables that were dropped from several chapters.
- An `<iframe>` pointing at `microsims.example.com`, an invented host.
- Twenty specifications in a single gpt-oss chapter that share identical text in
  six fields.

## Running It and Changing It

```bash
python3 src/scoring/chapter_quality.py docs/models/<model> --raw
```

Give it several books and it ends with a comparison table. `--json` writes
every raw count and sub-score, `--csv` writes one row per chapter, and
`--target-grade` sets the reading grade for a course other than Algebra I. The
weights, tier table, and every threshold are constants at the top of the file.

Each chapter's flags say which rule it broke:

| Flag | Meaning |
|---|---|
| `STUB` | Placeholder text, or under 1,000 words. The chapter scores 0 |
| `UNDER_BUDGET`, `OVER_BUDGET` | Body words below half the low target, or above twice the high target |
| `NO_CONCEPT_TABLE` | No Concepts Covered table, so no budget can be computed |
| `TITLE_MISMATCH` | No word of the title appears in the concepts or headings |
| `NO_DIAGRAMS` | No diagram specification in the chapter |
| `NO_HEADER:n` | `n` specifications with no `#### Diagram:` header |
| `BARE_DIAGRAM_HEADER:n` | `n` Diagram headers with no specification below them |
| `THIN_SPEC` | The mean specification score is under 0.5 |
| `TEMPLATED:n` | `n` specifications that copy a sibling |
| `SCAFFOLD_LEAK:n` | `n` pieces of the model's working left in the text |
| `LISTS:n` | `n` lists with no blank line before them |
| `IMG_BROKEN:n` | `n` image targets that do not exist |
| `IFRAME_FAKE_HOST:n` | `n` embeds pointing at a placeholder host |
| `TRUNCATED` | The file ends mid-sentence |
| `MASCOT_UNDEFINED` | A mascot admonition in a book that defines no mascot |
| `OUTLIER_LOW`, `OUTLIER_HIGH` | The score is two or more robust deviations from the book's median |

## Source Code

- [`src/scoring/chapter_quality.py`](https://github.com/dmccreary/dgx-eval/blob/main/src/scoring/chapter_quality.py)
  is the scorer.
- [`src/README.md`](https://github.com/dmccreary/dgx-eval/blob/main/src/README.md)
  describes it with the other scoring scripts.
- [`CONTENT-GENERATION-GUIDE.md`](https://github.com/dmccreary/dgx-eval/blob/main/CONTENT-GENERATION-GUIDE.md)
  holds the budget, anti-padding, and mascot rules it checks.
- [`microsim-specification-rules.md`](https://github.com/dmccreary/ibook-skills/blob/main/skills/chapter-content-generator/references/microsim-specification-rules.md)
  holds the specification rules R1 to R14.
