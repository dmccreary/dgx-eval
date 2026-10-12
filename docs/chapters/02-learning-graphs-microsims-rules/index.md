---
title: "Learning Graphs, MicroSims, and Content Generation Rules"
description: "How a learning graph stores concept dependencies, how concept impact scores size each section, and the content rules, glossary, FAQ, and quizzes that follow from it."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 21:15:57"
version: 1.11
---

# Learning Graphs, MicroSims, and Content Generation Rules

## Summary

This chapter covers the data structures and rules behind generated content. Students learn how concept dependencies form a learning graph, how taxonomies and impact scores organize it, and how MicroSims, glossaries, FAQs, and quizzes are produced from it. They finish able to read the content-generation guide and predict what each pipeline stage asks of a model.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Concept Dependency | 36 |
| Directed Acyclic Graph | 32 |
| p5.js | 2 |
| vis-network | 2 |
| Foundational Concepts | 1 |
| MicroSim Status Levels | 1 |
| Learning Graph | 30 |
| Data-Driven MicroSim | 1 |
| Chapter Content | 20 |
| Concept Impact Score | 2 |
| Concept Taxonomy | 1 |
| Glossary | 1 |
| Learning Graph Viewer | 1 |
| Word-Count Targets | 4 |
| FAQ | 1 |
| Quiz | 1 |
| Content Generation Guide | 1 |
| Elaboration Budget | 1 |
| Anti-Padding Rules | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)

---

!!! mascot-welcome "Where the Book's Structure Comes From"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter shows you the data structure behind every intelligent textbook, and the rules that decide how much each concept gets written about. When you finish, you will be able to read a learning graph, compute how important a concept is, and tell a padded chapter from a dense one. Measure first, then decide!

## What This Chapter Covers

Chapter 1 defined the intelligent textbook and the MicroSim. This chapter looks underneath them. It first explains the **learning graph**, the structured list of concepts and dependencies from which every chapter, glossary entry, and quiz is derived. It then explains the **content generation rules**, the budget and style constraints that tell an author, human or model, how much to write about each concept. A short closing section returns to MicroSims to cover the libraries and conventions you will meet when you read one.

The ideas in the first half feed directly into the second. The rules for how long a concept's section should be depend on a score computed from the learning graph, so the graph has to come first.

## Concepts and Their Dependencies

### Concept Dependency

A **concept dependency** is a statement that one concept must be understood before another. "Percent depends on decimals" means a learner who does not know decimals will struggle with percent. Dependencies are a property of the subject, not of a chapter order: they say what a learner needs, whatever order a book happens to present things in.

The direction matters, and this book fixes a convention. A dependency is written as an edge that points **from the dependent concept to its prerequisite**. The edge `Percent → Decimals` reads "Percent needs Decimals". The table below shows three real dependencies from this book's own learning graph, so you can see the convention at work.

| Dependent concept | Prerequisite it needs | Why |
|---|---|---|
| Intelligent Textbook | Generative AI Assistant Use | The idea of generated, structured content builds on having used a generative assistant |
| MicroSim | Intelligent Textbook | A MicroSim is a part of an intelligent textbook |
| Concept Dependency | Intelligent Textbook | Dependencies are stored as structure in an intelligent textbook |

!!! mascot-warning "Check the Edge Direction"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If you read an edge backwards, every prerequisite becomes a follow-on topic and the whole ordering silently inverts. Before you trust any graph, list the concepts with no prerequisites: they should be simple, introductory terms. If an advanced term shows up there, the direction is wrong.

### Foundational Concepts

A **foundational concept** is a concept with no prerequisites inside the graph. Learning can start at any of them. This book's graph has twelve of them, and they are all plain, introductory terms:

- Command Line Basics
- Python Scripting Basics
- Git Version Control
- Generative AI Assistant Use
- Markdown Source Files
- Bloom's Taxonomy
- Open-Source License
- Privacy
- CPU Architecture
- System RAM
- GPU
- Storage Capacity

The check from the warning above is exactly this list. A graph built with reversed edges would put terms like "Evaluation Report" here, and the mismatch is easy to spot once you know to look.

### Directed Acyclic Graph

A **directed acyclic graph**, abbreviated DAG, is a graph whose edges have a direction and which contains no cycle. A **cycle** is a path that starts at a concept and, by following dependencies, returns to it. Learning graphs must be DAGs, because a cycle would make teaching order impossible: if A needs B, B needs C, and C needs A, there is no concept you can learn first.

A valid graph always has at least one valid teaching order, called a **topological order**, in which every concept comes after all of its prerequisites. To find one, repeatedly take a concept whose prerequisites have all been taken already. Here is a small example with four concepts, written one dependency per line.

```text
Percent    needs  Decimals
Decimals   needs  Fractions
Ratios     needs  Fractions
```

Start with the concept that needs nothing: Fractions. Then both Decimals and Ratios are available, so either can come next. Percent comes after Decimals. One valid order is Fractions, Decimals, Ratios, Percent, and another is Fractions, Ratios, Decimals, Percent. Having more than one valid order is normal.

Now add a single line, `Fractions needs Percent`. Fractions can no longer be learned first, because it needs Percent, which needs Decimals, which needs Fractions. The graph has a cycle and no valid order exists. The exercise below gives you six small graphs to judge.

#### Diagram: DAG Cycle Spotter


<iframe src="../../sims/dag-cycle-spotter/main.html" width="100%" height="602px" scrolling="no"></iframe>
[Run DAG Cycle Spotter Fullscreen](../../sims/dag-cycle-spotter/main.html)

<details markdown="1">
<summary>DAG Cycle Spotter</summary>
Type: microsim
**sim-id:** dag-cycle-spotter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/graph-algorithms/tree/main/docs/sims/dag-viewer<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish prerequisite graphs that contain a cycle from graphs that do not, in 6 small graphs, with at least 5 of 6 classified correctly.

**Prerequisites:** concept dependency, edge direction, directed acyclic graph, cycle, topological order (all defined in the sections "Concept Dependency" and "Directed Acyclic Graph" above this block).

**Evidence of Mastery:** For each graph the learner commits to one label, "Valid (no cycle)" or "Has a cycle", before the sim reveals the answer. For a graph labeled "Has a cycle", the learner also selects the concepts that lie on the cycle. A graph is correct when the label matches the answer column and, for cycle graphs, the selected set equals the cycle set exactly. Mastery is 5 of 6 correct. Looking at the graph is exploration, not evidence.

**Misconceptions:** (1) Two concepts that share a prerequisite form a cycle. (2) A graph with two disconnected parts is invalid. (3) A concept that depends on itself is not a cycle. (4) A longer chain of dependencies is more likely to contain a cycle.

**Instructional Rationale:** Analyze-level distinguishing needs the learner to inspect structure and decide, so each graph is small enough to trace by eye but constructed so that surface features (a shared prerequisite, a long chain, two components) do not predict the answer. Committing a label before reveal turns tracing into evidence.

**Content:**

Each graph is a list of dependencies in the form "dependent needs prerequisite". Concepts are Fractions, Decimals, Percent, Ratios, Proportions, and Equations. The sim labels all graphs "synthetic example".

| # | Dependencies | Answer | Cycle set | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Percent needs Decimals; Decimals needs Fractions; Ratios needs Fractions; Proportions needs Ratios | Valid (no cycle) | none | Every path ends at Fractions, which needs nothing, so a teaching order exists. |
| 2 | Percent needs Decimals; Decimals needs Fractions; Fractions needs Percent | Has a cycle | Percent, Decimals, Fractions | Starting at Percent and following needs returns to Percent, so none of the three can be learned first. |
| 3 | Equations needs Proportions; Equations needs Percent; Proportions needs Fractions; Percent needs Fractions | Valid (no cycle) | none | Two concepts sharing one prerequisite is normal; there is no path that returns to its start. |
| 4 | Equations needs Proportions; Proportions needs Ratios; Ratios needs Equations; Ratios needs Fractions | Has a cycle | Equations, Proportions, Ratios | Equations, Proportions, and Ratios each need the next; the dependency on Fractions is fine but does not break the cycle. |
| 5 | Decimals needs Fractions; Percent needs Ratios | Valid (no cycle) | none | Two separate chains are allowed; a graph does not have to be connected. |
| 6 | Percent needs Percent; Percent needs Fractions | Has a cycle | Percent | A concept that needs itself is a cycle of length one, so it can never be learned first. |

**Provenance:** The graphs are synthetic, constructed for this exercise, and the sim labels them "synthetic example". The definition of a cycle and a valid graph is the one stated in the chapter section "Directed Acyclic Graph".

**Rules:** Graphs are shown in the fixed order 1 to 6, and each is a list of edges plus the set of concept names. A graph is "Has a cycle" if and only if some concept can reach itself by following needs, including by a single edge to itself. Disconnected graphs are valid. Each graph allows exactly one label commitment, and for cycle graphs one selection of cycle members, and both are final.

**Learner Activity:**

1. The learner sees graph 1 as a list of dependencies and its concept names.
2. The learner chooses "Valid (no cycle)" or "Has a cycle".
3. If the learner chose "Has a cycle", the sim asks them to select the concepts on the cycle, then the learner confirms.
4. The sim shows the correct label, the cycle set if there is one, and the Why text, and marks the graph correct or incorrect.
5. The learner repeats for graphs 2 to 6. The sim then shows the score and the misconception behind each missed graph.

**Feedback:** Six graphs, fixed order, one committed answer each, and the answer is final. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct label, the cycle set, and the Why text. The correct answer is revealed immediately after the learner confirms. The final score reads "n of 6 correct".

**Starting State:** Graph 1 is shown with no label chosen, and the question on screen is "Can these concepts be taught in some order?"

**Chapter Anchors:** The chapter states that a learning graph must be a DAG, that a cycle makes teaching order impossible, that having several valid orders is normal, and that a graph may have shared prerequisites and disconnected parts.
</details>

## The Learning Graph

A **learning graph** is a directed acyclic graph of a course's concepts in which each edge is a concept dependency. In practice it is two things stored together: a list of concepts, each with an identifier, a label, and a category, and a list of dependency edges that connect them. This book keeps the graph in both a CSV file and a JSON file, and the two must agree.

The graph is the source of truth for the book's structure. The chapters of this book are a partition of its concepts, no concept appears before its prerequisites, and every glossary entry and quiz traces back to a node. The table below summarizes this book's graph. These are real values from its quality report.

| Measure | Value |
|---|---|
| Concepts | 506 |
| Dependency edges | 824 |
| Foundational concepts (no prerequisites) | 12 |
| Terminal concepts (nothing depends on them) | 193 |
| Orphans (no edges at all) | 0 |
| Average dependencies per concept | 1.67 |
| Longest dependency chain | 16 concepts |
| Cycles | 0 |

!!! mascot-thinking "An Order Is Derived, Not Authored"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A learning graph does not store a chapter order; it stores what depends on what, and any order that respects it is valid. That is why the same graph can be regrouped into a different number of chapters without breaking a single prerequisite.

### Concept Taxonomy

A **concept taxonomy** assigns every concept to exactly one named category. Categories give the author a way to see the whole graph by theme and to check that no area is neglected. In this book each category has a short identifier, such as `FOUND` or `HW`, and that identifier is stored on every concept.

The graph holds 14 categories. The counts are real, and the largest two have 50 concepts each.

| Category | ID | Concepts |
|---|---|---|
| Environments and Hardware Probes | ENV | 50 |
| Benchmark and Reporting | BENCH | 50 |
| Inference Servers and Performance | INFER | 48 |
| Evaluation Methodology | EVAL | 44 |
| Agent Harnesses and Containment | AGENT | 43 |
| Foundations and Intelligent Textbooks | FOUND | 39 |
| Secure Remote Access | NET | 39 |
| Model Selection and Candidates | MSEL | 35 |
| Cost, Price, and Quality | COST | 30 |
| Small Language Models | SLM | 28 |
| DGX Hardware Architecture | HW | 28 |
| Model Sizing and Fit | FIT | 26 |
| Sanitization and Publication Safety | SAN | 25 |
| Local Versus Cloud Services | LVC | 21 |

A category is a grouping for the author, not a teaching order. This book's chapters deliberately cut across categories when a dependency demands it, as Chapter 6 does when it reaches into the secure-access category for two concepts about administration.

### Concept Impact Score

The **concept impact score**, abbreviated CIS, measures how much of a graph rests on a concept. It is defined recursively. A concept's score is 1, counting itself, plus the scores of all concepts that depend on it directly:

\[ \mathrm{CIS}(x) = 1 + \sum_{d \in \mathrm{dependents}(x)} \mathrm{CIS}(d) \]

!!! mascot-encourage "Recursion Is Easier Backwards"
    ![Tera encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    A formula defined in terms of itself looks circular, and most people need two passes at it. Start at the concepts nothing depends on, which score exactly 1, and work backwards toward the foundations; every score you need is already computed.

A concept that nothing depends on scores 1. A concept with dependents scores more, and the score accumulates through chains, so a concept deep in the foundations can score very high even if only one or two concepts depend on it directly. Consider a six-concept graph with these dependencies, where "B needs A" means B depends on A.

```text
B needs A
C needs A
D needs B
D needs C
E needs D
F needs C
```

Work from the end of the graph. E and F have no dependents, so each scores 1. D has one dependent, E, so D scores 1 + 1 = 2. C has dependents D and F, so C scores 1 + 2 + 1 = 4. B has dependent D, so B scores 1 + 2 = 3. A has dependents B and C, so A scores 1 + 3 + 4 = 8.

| Concept | Direct dependents | Calculation | CIS |
|---|---|---|---|
| E | none | 1 | 1 |
| F | none | 1 | 1 |
| D | E | 1 + 1 | 2 |
| C | D, F | 1 + 2 + 1 | 4 |
| B | D | 1 + 2 | 3 |
| A | B, C | 1 + 3 + 4 | 8 |

The result is intuitive: A is the most foundational concept and scores highest. The formula adds a shared descendant once for every route that reaches it, which is how the scores grow quickly in a large graph. In this book, Generative AI Assistant Use scores 2,518 and Generative AI Model scores 2,364, while 193 of the 506 concepts score 1. Most of the book is narrow detail resting on a small foundation.

#### Diagram: CIS Calculator


<iframe src="../../sims/cis-calculator/main.html" width="100%" height="534px" scrolling="no"></iframe>
[Run CIS Calculator Fullscreen](../../sims/cis-calculator/main.html)

<details markdown="1">
<summary>CIS Calculator</summary>
Type: microsim
**sim-id:** cis-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/automating-instructional-design/tree/main/docs/sims/concept-dependencies<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the concept impact score of each of 6 concepts in a small dependency graph, working from the concepts nothing depends on, with at least 5 of 6 correct.

**Prerequisites:** concept dependency, dependents, concept impact score and its formula (all defined in the section "Concept Impact Score" above this block).

**Evidence of Mastery:** The learner enters one whole number for each concept, in the order the sim presents them, before the sim reveals the correct value. An entry is correct when it equals the CIS column in Content exactly. Mastery is 5 of 6 correct. Inspecting the graph before answering is exploration, not evidence.

**Misconceptions:** (1) A concept's score counts only its direct dependents' count, not their scores. (2) A concept's score excludes itself. (3) The concept with the most direct dependents always has the highest score.

**Instructional Rationale:** Apply-level calculation requires the learner to carry a procedure through a structure, and CIS can only be computed in an order where each dependent's score is already known. Presenting concepts in that order makes the order itself visible, and revealing a value after each entry corrects a misconception before it propagates.

**Content:**

The graph is shown with six concepts, A to F, and these six dependencies in the form "dependent needs prerequisite". The sim labels the graph "synthetic example".

| Dependent | Needs |
|---|---|
| B | A |
| C | A |
| D | B |
| D | C |
| E | D |
| F | C |

Concepts are presented in this order, which is a valid order for computing the scores. The learner enters a whole number from 1 to 20.

| Step | Concept | Direct dependents | CIS | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | E | none | 1 | Nothing depends on E, so only E itself counts: 1. |
| 2 | F | none | 1 | Nothing depends on F, so only F itself counts: 1. |
| 3 | D | E | 2 | D counts itself plus E's score: 1 + 1 = 2. |
| 4 | C | D, F | 4 | C counts itself plus D's score and F's score: 1 + 2 + 1 = 4. |
| 5 | B | D | 3 | B counts itself plus D's score: 1 + 2 = 3. |
| 6 | A | B, C | 8 | A counts itself plus B's score and C's score: 1 + 3 + 4 = 8. |

**Provenance:** The graph is synthetic, constructed for this exercise, and the sim labels it "synthetic example". The formula is the one stated in the chapter section "Concept Impact Score".

**Rules:** CIS(x) = 1 + the sum of CIS(d) for every concept d that needs x directly. A concept with no dependents scores 1. The accepted entry is a whole number from 1 to 20 with step 1, and the default entry is empty. The expected values are in the CIS column, and correctness is an exact match.

**Learner Activity:**

1. The learner sees the graph and the first concept, E, with an empty entry.
2. The learner enters a whole number and confirms.
3. The sim shows the correct value, marks the entry correct or incorrect, and shows the Why text, then adds the confirmed value beside that concept in the graph.
4. The learner continues through steps 2 to 6. Each Why text uses the values already shown for the concepts that depend on it.
5. After step 6 the sim shows the score and, for any missed step, the misconception it corresponds to.

**Feedback:** Six steps, fixed order, one entry each, and the entry is final. The correct value and the Why text are shown immediately after the learner confirms. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct value and the Why text. The final score reads "n of 6 correct".

**Starting State:** The graph is shown with no values, E is the first concept, and the question on screen is "How much of this graph rests on E?"

**Chapter Anchors:** The chapter states the formula CIS(x) = 1 + the sum of the scores of x's direct dependents, that a concept with no dependents scores 1, and that in the worked example A scores 8, C scores 4, B scores 3, D scores 2, and E and F each score 1.
</details>

### vis-network

**vis-network** is a JavaScript library that draws nodes and edges in a web page and lets the reader drag, zoom, and click them. It expects data in a simple shape: a list of nodes, each with an `id` and a `label`, and a list of edges, each with a `from` and a `to`. This book's learning graph is stored in exactly that shape, which is why the same file can both describe the course and be drawn directly.

### Learning Graph Viewer

The **learning graph viewer** is a MicroSim that draws a learning graph with vis-network. It colors nodes by category, lets you search for a concept, and lets you click a node to see its prerequisites and dependents. Viewing the whole graph is the fastest way to find a surprising dependency or a neglected area. The viewer below opens this book's own graph.

#### Diagram: Learning Graph Viewer

<iframe src="../../sims/graph-viewer/main.html" width="100%" height="700px" scrolling="no"></iframe>

[Run the Learning Graph Viewer fullscreen](../../sims/graph-viewer/main.html){ .md-button }

<details markdown="1">
<summary>Learning Graph Viewer (reused MicroSim)</summary>
Type: graph-model
**sim-id:** graph-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** sims/graph-viewer/index.md in this book<br/>
**Source Repo:** https://github.com/dmccreary/dgx-eval/tree/main/docs/sims/graph-viewer<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine this book's learning graph to find the concepts a chosen concept depends on and the concepts that depend on it.

Reused from this book's own MicroSims, which already exists locally, so no new specification is needed.
</details>

!!! mascot-tip "Search for the Hub First"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Search the viewer for "Generative AI Model" and follow its edges outward. A concept with a CIS in the thousands touches a big share of the graph, which makes it the quickest way to see how the book hangs together.

## Rules for Generated Chapter Content

### Chapter Content

**Chapter content** is the body of a chapter: the prose, tables, worked examples, and specifications for interactive elements that teach the chapter's concepts. It is written into the chapter's `index.md` file, below a fixed header that already lists the title, summary, concepts, and prerequisites.

The chapter file you are reading has this anatomy, abbreviated.

````text
---
title: "..."
description: "..."
---

# Chapter Title
## Summary
## Concepts Covered      <- table of concept and impact score
## Prerequisites
---
(chapter content: prose, tables, worked examples, MicroSim specifications)
````

A generator is given the header and asked to fill in everything below the final rule. The header is also the checklist the output is judged against: every concept in the table should be taught, so a missing concept is a defect that a program can find.

### Word-Count Targets

**Word-count targets** are guidelines for how many words a section of chapter content should have. This book does not use a single number per chapter. Instead each concept gets its own target, driven by its impact score, because a concept many others rest on deserves more careful explanation than a leaf.

The calculation has two steps. First normalize the concept's CIS against the largest CIS in the whole book, using a logarithm, because CIS is heavy-tailed and a straight proportion would crush the large majority of concepts to nearly zero. Call the result the **elaboration score**, E:

\[ E(c) = \frac{\ln(\mathrm{CIS}(c) + 1)}{\ln(\mathrm{CIS}_{\max} + 1)} \]

Second, map E to a tier. In this book \( \mathrm{CIS}_{\max} \) is 2,518.

| Tier | E range | Target words | Required elements |
|---|---|---|---|
| A | 0.5 or more | 500 to 750 | A worked example and a diagram, chart, table, or MicroSim |
| B | 0.2 up to 0.5 | 250 to 400 | A worked example |
| C | under 0.2 | 120 to 200 | A clear definition |

Here are three real concepts worked through. Generative AI Assistant Use has CIS 2,518, so E is \( \ln 2519 / \ln 2519 = 1.00 \), which is tier A. Concept Dependency has CIS 36, so E is \( \ln 37 / \ln 2519 \approx 0.46 \), which is tier B and just below the tier A line. Anti-Padding Rules has CIS 1, so E is \( \ln 2 / \ln 2519 \approx 0.09 \), which is tier C.

### Elaboration Budget

An **elaboration budget** is the table of every concept in a chapter with its elaboration score, tier, and target words, together with their sum. It is computed before any prose is written, and the chapter's length follows from it instead of being chosen separately.

This chapter's budget is a worked example. It has 5 tier B concepts, at 250 to 400 words each, and 14 tier C concepts, at 120 to 200 words each. The sum is 2,930 to 4,800 words. A chapter with several tier A concepts, such as Chapter 3, runs longer for the same reason, and that variation is intentional.

### Anti-Padding Rules

**Anti-padding rules** are the instructions that stop a generator from reaching a word target by inflating text. Models are prone to this, and padded text is repetitive and sometimes wrong. This book gives four.

1. **Quality over quantity.** A target is a guideline; a dense, correct section beats a padded one that reaches the number.
2. **Expand by showing, not telling.** If a section is thin, add a worked example, another simulation, or more technical detail, and never restate earlier paragraphs.
3. **No formulaic templates.** Avoid boilerplate like "Let's talk about X" and weave concepts into flowing narrative.
4. **Examples over prose.** Prefer a short commented example or a MicroSim to a long description of abstract logic.

!!! mascot-warning "A Target Is Not a Quota"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A model that sees "500 words" will often manufacture 500 words, restating itself to get there. The remedy is to read a short section against its target and ask what is missing; if the answer is "nothing", the section is finished, and adding words only lowers the quality.

### Content Generation Guide

The **content generation guide** is the file, `CONTENT-GENERATION-GUIDE.md` at the root of this repository, that gathers every writing rule in one place so that an agent can be told to read it first. It holds the concept-depth and word-count targets, the anti-padding rules, the MicroSim expectations, the Markdown formatting rules, and the learning mascot's identity and placement rules. The repository's agent instructions require it to be read before any student-facing content is written.

Putting the rules in a file matters for small models in particular. A rule that lives only in a prompt is lost when the context fills up; a rule in a file can be re-read. The same file is also what makes two runs comparable, because both started from the same instructions.

### Glossary

A **glossary** defines each concept in the course in one precise, concise, non-circular sentence, usually followed by a short example. It is generated from the learning graph's concept list, so every concept in the graph gets exactly one entry and the book uses the same wording everywhere. A good definition names the category of the thing and what distinguishes it, without using the term itself.

### FAQ

An **FAQ** is a set of questions readers are likely to ask, each with a short answer drawn from the book. It is generated from the chapter content, the learning graph, and the glossary, typically at least thirty questions, so it is written after those exist. Its value is that it answers in the reader's own words what the chapters answer in the author's.

### Quiz

A **quiz** is a set of questions, one set per chapter, that tests what the chapter taught. Questions are multiple choice and are spread across the Bloom's Taxonomy levels from Chapter 1, so a quiz tests more than recall. Each question is tied to a concept in the learning graph, which lets a reader's wrong answers point back to the exact concept to review.

!!! mascot-thinking "The Graph Drives Everything Downstream"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The graph does not only order the chapters. Its scores size every section, its concept list generates the glossary, and its edges let a quiz point a wrong answer at a prerequisite. One careful structure feeds five outputs, which is exactly why a flaw in it is so costly.

## MicroSims in Practice

### p5.js

**p5.js** is a JavaScript library for drawing shapes and responding to the mouse and keyboard. Most MicroSims in this book are p5.js programs. A p5.js sketch has two main functions: `setup()` runs once at the start and creates the canvas and any controls, and `draw()` runs repeatedly and redraws the picture.

This book requires that controls be p5.js's own built-in ones, such as `createSlider` and `createButton`, never hand-drawn shapes made to look like controls. Built-in controls get keyboard support and consistent behavior for free.

```javascript
let slider;

function setup() {
  createCanvas(300, 100);
  slider = createSlider(10, 90, 40);
}

function draw() {
  background(255);
  circle(150, 50, slider.value());
}
```

In this sketch `setup()` creates a canvas 300 pixels wide and 100 tall and one slider that ranges from 10 to 90, starting at 40. Each time `draw()` runs it clears the canvas and draws a circle whose diameter is the slider's current value, so dragging the slider changes the circle immediately.

### Data-Driven MicroSim

A **data-driven MicroSim** keeps its content in a separate data file, usually JSON, instead of writing it into the program. The program reads the file and draws what it finds. This separates the logic from the facts, so correcting a number or adding a model means editing a data file, not the code.

This book's Parameters That Fit in Memory MicroSim works this way: its ten candidate models live in a `model-data.json` file next to its `main.html`. The program is the same whatever the file holds.

### MicroSim Status Levels

**MicroSim status levels** record how far a MicroSim has progressed. The status is stored in the frontmatter of its `index.md` page and shown as a colored dot in the navigation sidebar.

| Status | Dot | Meaning |
|---|---|---|
| `scaffold` | Red | A specification exists, but there is no implementation yet |
| `built` | Orange | Implemented, awaiting the Primary Author's review |
| `approved` | Green | Tested by the Primary Author and approved for learners |

The site configuration also recognizes `implemented` and `instrumented`, used by other books in this series. Only a human reviewer moves a MicroSim to `approved`; a generator may reach `built`, and no further.

## Chapter Summary

You started with the dependency between two concepts and ended with the rules that size a chapter. A concept dependency is an edge from a dependent to its prerequisite. A learning graph is a DAG of concepts and their dependencies, grouped by a taxonomy and scored by CIS. Those scores set a word-count target per concept, summed into an elaboration budget and constrained by anti-padding rules written in the content generation guide. The glossary, FAQ, and quizzes follow from the same graph, and MicroSims built with p5.js or vis-network make it interactive.

!!! mascot-celebration "The Structure Is Yours Now"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now check a graph's edge direction, compute a concept impact score by hand, and read an elaboration tier off it. That is the machinery that decides how every later chapter is shaped, and Chapter 3 turns to the models whose output it will judge.

[See Annotated References](./references.md)
