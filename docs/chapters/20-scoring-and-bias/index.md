---
title: "Scoring, Bias, and Structural Checks"
description: "How generated output is scored and how scores mislead: rubrics, structural checks on learning graphs, calibration, bias such as LLM-as-judge, blind human review, and reporting provisional and negative results honestly."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:32:31"
version: 1.11
---

# Scoring, Bias, and Structural Checks

## Summary

This chapter covers how generated output is scored and how the scores can mislead. Students apply rubrics, automated checks, and blind human review, account for bias such as LLM-as-judge scoring, and apply structural checks to generated learning graphs. They finish able to report provisional and negative results honestly.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Dependency Reasoning | 1 |
| Markdown Validity | 1 |
| Schema-Constrained JSON | 1 |
| MicroSim Code Correctness | 1 |
| Scoring Rubric | 27 |
| Reading Level Measure | 1 |
| Faithfulness to Description | 1 |
| Mathematical Notation | 1 |
| Bias in Evaluation | 12 |
| Structural Checks | 11 |
| Blind Human Review | 3 |
| LLM-as-Judge | 1 |
| Scoring Check Calibration | 1 |
| Automated Quality Score | 1 |
| Duplicate Concept Labels | 1 |
| Orphaned Concepts | 1 |
| Dependency Cycle Check | 1 |
| CSV-JSON Agreement | 1 |
| Label Length Limit | 1 |
| Provisional Results | 7 |
| Human Quality Score | 2 |
| Experimental Design Critique | 7 |
| Negative Result Reporting | 1 |
| Limitations Statement | 6 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 2: Learning Graphs, MicroSims, and Content Generation Rules](../02-learning-graphs-microsims-rules/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)
- [Chapter 19: Designing a Fair Evaluation](../19-fair-evaluation-design/index.md)

---

!!! mascot-welcome "A Score Is a Claim About Quality"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A program can tell you quickly whether a learning graph has a cycle, and it cannot tell you whether the concepts are the right ones. By the end of this chapter you will know which questions a script can answer, which need a person, and how to report a result without claiming more than it shows. Measure first, then decide!

## What This Chapter Covers

Chapter 19 listed quality as one of three groups of metrics and called it the hardest. This chapter takes it on. It starts with the scoring rubric, the written definition of what good means. It then covers structural checks, the part of quality a program can verify, with the learning graph as the worked example. It moves on to the harder part, which is the judgment of whether prose is good, and the ways that judgment is biased. It ends with how to report a result that is provisional, or negative, or limited.

One distinction runs through all of it. A **check** answers a question that has a right answer, such as whether two concepts have the same label. A **judgment** answers a question that does not, such as whether an explanation is clear. A pipeline of checks can be automated and is fast. A judgment needs a person, or a model whose own bias you have accounted for.

## Rubrics and Checks

### Scoring Rubric

A **scoring rubric** is a written description of what a result must have to earn each score. It makes a judgment repeatable: two reviewers using the same rubric on the same chapter should give scores that are close. Without one, "good" means whatever the reviewer felt that day.

A rubric needs dimensions, a scale, and a description of each level. The table gives the dimensions this evaluation cares about for a generated chapter, with the way each is measured. They come from the qualities that matter for a textbook, as this book's [model candidates](../../appendices/model-candidates.md) page lists them.

| Dimension | What it asks | Measured by |
|---|---|---|
| Faithfulness to the description | Does it cover what the course says, and stay within its limits? | Human review |
| Dependency reasoning | Does each concept come after the ones it depends on? | Structural check, then human |
| Writing quality | Is the prose clear, accurate, and at the stated reading level? | Reading-level measure, then human |
| Schema-constrained output | Are CSV, JSON, and YAML valid and consistent? | Structural check |
| Markdown validity | Does the file render and the site build? | Build and a script |
| Mathematical notation | Are formulas correct in the notation the site renders? | Script for form, human for correctness |
| MicroSim code correctness | Does the code run in the browser? | Run it |

A worked use shows the mechanics. Suppose each dimension is scored 0, 1, or 2, where 0 means absent or broken, 1 means present with problems, and 2 means correct. A chapter that builds, has valid files, and covers its concepts, but whose notation has two errors and whose prose runs two grade levels above the target, might score 2, 2, 2, 1, 1 on five of the dimensions. The total of 8 out of 10 is less useful than the profile, which says where to fix it.

### Structural Checks

**Structural checks** are the checks a program can run on the form of the output, without judging its meaning. They answer questions with right answers: does the file exist, does it parse, does it agree with its twin. They are cheap, repeatable, and fast, and they find the failures that would otherwise waste a reviewer's time.

They are also limited in a way that is easy to forget. A structural pass does not mean the content is good. A learning graph can have no cycles and no duplicates and still be a graph of the wrong concepts. The checks are a gate, and the grade is a separate matter.

The learning-graph checks this project applies show what a structural check looks like. Each is a short test of one property.

| Check | What it tests | A failure looks like |
|---|---|---|
| Concept count | The number of concepts equals the target | 199 concepts when 200 were asked for |
| Duplicate concept labels | No two concepts share a label, ignoring case | 40 of 200 labels duplicated |
| Orphaned concepts | Every concept has a prerequisite or a dependent | 19 concepts connected to nothing |
| Dependency cycle check | No chain of dependencies loops back | Three concepts each depending on the next |
| CSV-JSON agreement | The two files describe the same graph | A concept in one and not the other |
| Label length limit | Labels are at most 32 characters | A 64-character label that breaks the viewer |

### Duplicate Labels, Orphans, and Label Length

**Duplicate concept labels** are concepts that share a label, compared without regard to case. They matter because the label is how a reader and a downstream tool refer to the concept, and two nodes with one name cannot be told apart. **Orphaned concepts** are concepts with no prerequisite and no dependent, so they are connected to nothing and cannot be reached from the rest of the graph. They are different from foundational concepts, which have no prerequisites and do have dependents.

The **label length limit** is the cap on label size, 32 characters in this project, which exists because longer labels do not fit in the graph viewer. It is a pragmatic limit and not a deep one, and it is a good example of a check whose threshold is a decision.

### Dependency Cycle Check and CSV-JSON Agreement

The **dependency cycle check** confirms that the graph is acyclic. A cycle means concept A depends on B, B on C, and C on A, so no order of study satisfies all three. The check repeatedly removes the concepts that have no remaining prerequisites. If everything can be removed, the graph is acyclic. Whatever is left sits on a cycle.

The excerpt from this project's scorer does exactly that. `remaining` maps each concept to the set of prerequisites not yet satisfied. Each pass takes the concepts whose set is empty, removes them, and deletes them from every other concept's set.

```python
remaining = {c: set(ds) for c, ds in deps.items()}
while True:
    ready = [c for c, ds in remaining.items() if not ds]
    if not ready:
        break
    for c in ready:
        del remaining[c]
    for ds in remaining.values():
        ds.difference_update(ready)

is_dag = not remaining        # anything left is on a cycle
```

**CSV-JSON agreement** checks that the two files a skill writes, one for people and tools and one for the viewer, describe the same graph. Disagreement is a symptom of a model that updated one file and not the other, and it silently breaks whichever tool reads the stale one.

!!! mascot-thinking "A Check Tests a Property, Not a Value"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    "No cycles" is a property of a whole graph, and it holds or it does not. A graph can satisfy every property you check and still be the wrong graph. Read a column of green checks as "nothing obviously broken", which is worth knowing and is not the same as "good".

### Scoring Check Calibration

**Scoring check calibration** is testing the checks themselves, on inputs whose answers you know, before you trust them on real output. A check can be wrong in two directions: it can pass a bad result, or it can fail a good one. Both are expensive, and the second is easy to miss because it looks like a model failure.

This evaluation met the second kind. The first versions of three model-only checks were too strict and failed output that was correct. Each was fixed, and the saved output was scored again. Without that step, a model would have been marked down for a defect in the test. Chapter 19's retest after fix is the same idea at the level of the experiment.

The calibration for a check is a small set: a known-good input that must pass, a known-bad input that must fail for the reason it should, and an edge case at the threshold, such as a label of exactly 32 characters and one of 33.

## Judging Quality

### Reading Level Measure

A **reading level measure** is a formula that estimates the school grade needed to read a text, from the lengths of its sentences and words. The common one, the Flesch-Kincaid grade, is computed by a script, so it is cheap and repeatable. This project's chapter-metrics pages report it for every generated chapter, using a shared function from the book-installer skill.

It is a measure of form and nothing more. A passage can score at grade 10 and be nonsense, and a clear explanation can score high because it uses necessary technical terms. Its right use is as a flag: a chapter written for adults that scores at grade 4 is probably padded with short sentences, and one that scores at grade 20 is probably unreadable.

### Faithfulness to Description, Mathematical Notation, and MicroSim Code

Three rubric dimensions cannot be fully automated, and each has a partial script and a human remainder.

**Faithfulness to the description** is whether the output covers what the course description lists and respects what it excludes. A script can check that each listed topic is mentioned. Whether the treatment matches the description's intent needs a reader. **Mathematical notation** is whether formulas are written in the notation the site renders, with the right delimiters, and are correct. A script can find malformed delimiters, and only a person can say whether the formula is right. **MicroSim code correctness** is whether the JavaScript runs in a browser without errors. It can be tested by loading the page, and it is the dimension where code that looks right and fails when run is worse than no simulation at all.

### Bias in Evaluation

**Bias in evaluation** is a systematic tilt in the scoring that favors some results over others for reasons unrelated to quality. It is distinct from noise. Noise averages out over many runs and bias does not, and it points the same way every time.

Four sources are worth naming. **The scorer's own preferences**: whoever scores brings habits, and a reviewer who expects a certain structure will prefer it. **Order and position**: the first of two answers read tends to be preferred. **Length**: longer answers look more thorough. **Knowing the source**: a reviewer who knows which model wrote a text, or that it came from a cloud service, is influenced by the name.

### LLM-as-Judge

**LLM-as-judge** is using a language model to score another model's output. It is attractive because it is fast, cheap, and scales to thousands of outputs. It is also the largest source of bias in this kind of evaluation. A model tends to prefer text that resembles its own, it favors longer answers, it is sensitive to the order in which candidates are shown, and it can be impressed by confident prose that is wrong.

There is also a cost that has nothing to do with accuracy. Sending a local model's output to a cloud model to be scored sends the text to the cloud, which undoes the reason for generating it locally. The design choices page records this as the reason this evaluation did not use it as its scoring method.

| Weakness | What it does to a score | Mitigation |
|---|---|---|
| Self-preference | Rates output like its own higher | Use a different model family as judge |
| Verbosity | Rewards length | Control for length, or score against a rubric |
| Position | Prefers the first candidate | Randomize order and score twice |
| Confidence | Rewards fluent errors | Require evidence for each rubric score |
| Data exposure | Sends generated text to a service | Use a local judge, or do not use one |

!!! mascot-warning "A Judge Model Is Another Model Under Test"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Treat an LLM judge as an instrument that has to be calibrated against human scores on a sample before you trust it on the rest. If its scores disagree with the people's on the cases you checked, it has told you something about itself, and not about the outputs.

### Blind Human Review and the Human Quality Score

**Blind human review** is a person scoring output against the rubric without knowing which model produced it, with the order randomized. It is the right test of quality, and it is slow and costs money: the cost analysis prices ten hours of subject-expert review at $900, seventeen times the cost of generating the book.

The **human quality score** is the result: a set of rubric scores for each output from each reviewer. Two reviewers on a sample, with their disagreement recorded, is better than one reviewer on everything, because the disagreement is itself a measurement of how much the rubric leaves to taste.

At the time of writing, this evaluation had no completed human review. The Primary Author reads the generated chapters on their own machine, and the status page says "not yet" where a human score belongs.

### Automated Quality Score

An **automated quality score** is a single number a program computes from the checks, so that outputs can be ranked at a glance. It is tempting and dangerous for the reasons above: one number hides the profile, and a weighting that favors the checks that are easy to run will quietly define quality as whatever is easy to measure.

This evaluation has not defined one. Each model has a learning-graph quality report and a page of chapter metrics, and they have not been combined into a number. When one is defined, it should be a documented formula over the rubric dimensions, published with its weights, and reported beside the profile, not instead of it.

## Reporting Honestly

### Provisional Results

**Provisional results** are results that are real observations and not yet established, because they rest on too few runs, an unvalidated check, or an incomplete review. The honest label is the one in this book's candidate page: a first round is one run of each test, so every result is provisional. A provisional result is useful for deciding what to test next, and not for writing a recommendation.

### Negative Result Reporting

**Negative result reporting** is stating what did not work, and why, with the same care as what did. A failure is data. A model that lost the task after a few steps, another that wrote its first tool call as plain text so the run ended after one turn, and a third that could not fit a usable context are all findings, and a reader choosing a model for their own machine needs them more than they need the successes.

Omitting negative results makes a field look easier than it is, and it makes the next person repeat them. The guide is to report the failure, the evidence, and your best account of the cause, with its confidence stated, since several causes in this evaluation were never identified.

### Limitations Statement

A **limitations statement** says what the result does not show. It is the section that tells a reader how far to trust the rest. The one this evaluation needs to carry is concrete.

- **Each model was run once.** Run variance is unknown, so rankings are not supported.
- **One course, one machine type, one harness, one skills version.** Nothing generalizes beyond them without more runs.
- **Structural checks only.** No quality judgment from a person has been completed.
- **No cloud baseline.** The published book is a reference for scale, not a controlled comparison.
- **Six of ten speeds in the cost analysis are assumed.**
- **Reasoning mode was not held constant** between the model-only tests and the harness runs.

### Experimental Design Critique

An **experimental design critique** is applying the standards of Chapter 19 to your own evaluation, in writing, before someone else does. The useful form pairs each flaw with its effect and its repair.

| Flaw | Effect on the results | What would repair it |
|---|---|---|
| One run per model | Rankings could be noise | Three to five runs each |
| Reasoning mode differed between layers | Model-only speeds did not predict harness speeds | Fix the mode, or test with each model's default in both |
| Context length chosen per model | Models were not compared at one setting | Add a run at a common context |
| A cloud model supervised the runs | Generated text reached a cloud service | Use a local or scripted supervisor |
| A model set aside for a skill defect | Its result may have been wrong | Retest it, which was done for one model |

#### Diagram: Learning Graph Defect Finder


<iframe src="../../sims/learning-graph-defect-finder/main.html" width="100%" height="838px" scrolling="no"></iframe>
[Run Learning Graph Defect Finder Fullscreen](../../sims/learning-graph-defect-finder/main.html)

<details markdown="1">
<summary>Learning Graph Defect Finder</summary>
Type: graph-model
**sim-id:** learning-graph-defect-finder<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/microsims/tree/main/docs/sims/graph-viewer<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine a 16-concept dependency graph and mark the concepts that have one of four structural defects, finding all 4 defects with no more than 1 false flag.

**Prerequisites:** duplicate concept labels, orphaned concepts, dependency cycle check, label length limit, structural checks (all defined in the sections above this block).

**Evidence of Mastery:** The learner flags concepts and assigns each flag a defect type from "Duplicate label", "Orphan", "Cycle", and "Label too long", then submits. A defect is found when every concept in the answer key for that defect is flagged with that type. Mastery is all 4 defects found, with no more than 1 flag on a concept that is not in the answer key. Exploring the graph, without flagging, is not evidence.

**Misconceptions:** (1) A concept with no prerequisites is always a defect. (2) A label at the limit is over it. (3) Two concepts whose labels differ only in case are different. (4) A cycle is visible only as one edge.

**Instructional Rationale:** Examining a structure for faults needs the learner to apply each check to the whole graph, so each of the four defects is seeded once and two legitimate look-alikes are included to prevent flagging everything unusual.

**Content:**

The graph has 16 concepts. Each row lists its identifier, its label, and the identifiers of the concepts it depends on. The Note column is the answer key and is never shown to the learner. Label lengths are in characters.

| ID | Label | Depends on | Note |
|---|---|---|---|
| 1 | Numbers | none | A foundational concept with dependents. Not a defect. |
| 2 | Variables | 1 | |
| 3 | Expressions | 2 | |
| 4 | Equations | 3 | |
| 5 | Linear Equations | 4 | |
| 6 | Slope | 5 | Duplicate label with concept 7, ignoring case. |
| 7 | slope | 5 | Duplicate label with concept 6, ignoring case. |
| 8 | Graphing Lines | 6 | |
| 9 | Systems of Equations | 5, 8 | |
| 10 | Inequalities | 4 | |
| 11 | Factoring | 13 | On the cycle 11, 12, 13. |
| 12 | Quadratic Expressions | 11 | On the cycle 11, 12, 13. |
| 13 | Polynomials | 12 | On the cycle 11, 12, 13. |
| 14 | Scientific Notation | none | Orphan: nothing depends on it and it depends on nothing. |
| 15 | Representing Linear Relationships in Tables Graphs and Equations | 5 | 64 characters, over the 32-character limit. |
| 16 | Absolute Value Function Examples | 4 | Exactly 32 characters. Not a defect. |

The answer key: "Duplicate label" is concepts 6 and 7; "Cycle" is concepts 11, 12, and 13; "Orphan" is concept 14; and "Label too long" is concept 15. Concepts 1 and 16 are legitimate look-alikes.

**Provenance:** The graph is synthetic, written for this exercise, and the sim labels it "synthetic example". The defect definitions and the 32-character limit come from this chapter.

**Rules:** A duplicate is two labels equal when compared without regard to case. An orphan has no prerequisites and no dependents. A cycle is a set of concepts that cannot be ordered so that every concept follows its prerequisites. A label is too long when it has more than 32 characters. A flag has one concept and one type, and a concept in a cycle or duplicate pair is flagged individually.

**Learner Activity:**

1. The learner views the graph, with each concept's label and its edges shown, and may click a concept to read its label length and its prerequisites and dependents.
2. The learner selects a concept and chooses a defect type, which places a flag. The learner may remove a flag.
3. When satisfied, the learner submits.
4. The sim marks each defect found or missed, lists any false flags, and shows the one-sentence reason for each defect.

**Feedback:** One submission, with unlimited flag changes before it. After submission: for each of the four defects, "Found" or "Missed" with its reason; for each false flag, the reason that concept is not a defect (concept 1 is foundational and has dependents, concept 16 is exactly at the limit, and so on). The score reads "n of 4 defects found, m false flags".

**Starting State:** The graph is shown with no flags and the instruction "Find the four structural defects in this learning graph".

**Chapter Anchors:** The chapter states a 32-character label limit, that duplicates are compared without regard to case, that an orphan is connected to nothing while a foundational concept has dependents, and that a cycle makes no study order possible.
</details>

## Chapter Summary

A rubric defines quality dimension by dimension, and structural checks cover the part a program can verify: the count, duplicate labels, orphans, cycles, file agreement, and label length. They calibrate on known inputs, because a check can fail a good result as easily as pass a bad one. The rest of quality needs judgment, which has biases: a model judging its own family, preferring length, favoring the first answer, and sending the text to a cloud service. Blind human review is the right test and the expensive one, and an automated quality score hides the profile behind one number. Results are labeled provisional until repeated, negative results are reported with the same care, and a limitations statement and a design critique tell the reader how far to trust the rest.

!!! mascot-celebration "You Can Say What a Score Does and Does Not Show"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now separate checks from judgments, calibrate a check before trusting it, name the biases in a judge, and write a limitations statement. Chapter 21 uses all of it to run the benchmark.
