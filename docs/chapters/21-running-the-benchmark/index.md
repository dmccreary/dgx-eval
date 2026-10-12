---
title: "Running the Textbook Benchmark"
description: "Executing the textbook pipeline as a benchmark: the workspace template, fixed stage prompts, chained stages, per-chapter runs, time limits, retrieving outputs, and the per-stage metrics that make a run ready to diagnose and score."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:27:14"
version: 1.11
---

# Running the Textbook Benchmark

## Summary

This chapter executes the textbook pipeline as a benchmark. Students prepare the workspace, run each stage with fixed prompts, retrieve outputs, and collect per-stage metrics and wall-clock time. They finish with a complete, logged run that is ready to be diagnosed and scored.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Pipeline Stage | 28 |
| Textbook Benchmark | 22 |
| Per-Stage Metrics | 9 |
| Standing Approval Answer | 2 |
| Required Output Files | 2 |
| Stage Sensitivity | 1 |
| Textbook Preview | 1 |
| Benchmark Runner | 11 |
| Algebra I Benchmark | 7 |
| Wall-Clock Time | 4 |
| Evaluation Status Tracking | 1 |
| Skill Completion Rate | 1 |
| Build Success | 1 |
| Structural Validity | 1 |
| Stage Prompt | 1 |
| Navigation Entries | 1 |
| Run Event Stream | 7 |
| Benchmark Workspace Template | 5 |
| Run Output Retrieval | 3 |
| Run Time Limit | 1 |
| Reference Book for Scale | 1 |
| Stage Chaining | 4 |
| Per-Chapter Generation Run | 3 |
| Chapter Completion Criterion | 1 |
| Chapter Dependency Check | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 2: Learning Graphs, MicroSims, and Content Generation Rules](../02-learning-graphs-microsims-rules/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)
- [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../07-remote-access-ssh-mesh-vpn/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)
- [Chapter 15: Optimizing Small Language Model Performance](../15-optimizing-performance/index.md)
- [Chapter 16: The Agent Loop, Tools, and Context](../16-agent-loop-and-tools/index.md)
- [Chapter 17: Agent Skills and Connecting a Harness to a Local Model](../17-agent-skills-and-harness/index.md)
- [Chapter 18: Containing the Harness: Containers and Network Boundaries](../18-containing-the-harness/index.md)
- [Chapter 19: Designing a Fair Evaluation](../19-fair-evaluation-design/index.md)
- [Chapter 20: Scoring, Bias, and Structural Checks](../20-scoring-and-bias/index.md)

---

!!! mascot-welcome "From a Design to a Run You Can Check"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You have a question, a design, a harness, and a way to score. Now you run it, and the discipline is that every run leaves a record complete enough to diagnose later. By the end of this chapter you will have run each stage with fixed prompts and collected its metrics. Measure first, then decide!

## What This Chapter Covers

This is the execution chapter. It takes the pieces that the previous chapters built and runs them as a benchmark: a fixed starting workspace, one prompt for each stage, stages chained so that each starts from the last one's output, and a runner that records what happened. It then covers how a long stage that runs once per chapter is organized, what limits a run's time, and how the output gets back to the laptop.

Two ideas hold the chapter together. The first is that a run must not change its input, so that a run can be repeated and a failed one cannot corrupt the next. The second is that a stage is only finished when its output passes a stated criterion, and not when the model says it is done. A model that announces completion has told you what it believes, and the criteria tell you what happened.

## The Benchmark

### Textbook Benchmark and the Algebra I Benchmark

A **textbook benchmark** is a fixed task that asks a system to generate a textbook, with a fixed input and a fixed way of scoring what comes out. The **Algebra I benchmark** is this evaluation's instance: the input is the description of a high school Algebra I course, and the task is to produce its learning graph, its chapter structure, and the content of its chapters.

The course was chosen for a practical reason. A published Algebra I book already exists, so its size can serve as a reference for scale, and Algebra I is familiar enough that a reviewer can judge the output without special expertise. The scope was set deliberately narrow: three skills, and no MicroSims, glossary, FAQ, or quizzes. The benchmark tests whether a local harness can execute those skills correctly.

### Reference Book for Scale

The **reference book for scale** is the published Algebra I book, used to say how big a finished textbook is. The numbers that matter for the three stages are a learning graph of 200 concepts with 277 dependencies, and 13 chapters of about 55,000 words. It is a reference and not a baseline: it was generated with earlier skill versions, and no timings or token counts were kept.

### Pipeline Stage, Stage Chaining, and Stage Sensitivity

A **pipeline stage** is one skill run, with defined inputs and outputs. **Stage chaining** is the arrangement in which each stage starts from the previous stage's output directory, so that the work accumulates. The three stages, in order, and what each starts from and produces:

| Stage | Skill | Starts from | Produces |
|---|---|---|---|
| 1 | `learning-graph-generator` | The benchmark workspace template | 200 concepts, dependencies, taxonomy, `learning-graph.json` |
| 2 | `book-chapter-generator` | The stage 1 run directory | The chapter structure: a directory and outline per chapter |
| 3 | `chapter-content-generator` | The previous run's directory, once per chapter | The text of one chapter, added to the book so far |

**Stage sensitivity** is how much a stage's result depends on the capability of the model, and the stages differ. The learning graph asks for dependency reasoning across 200 concepts, which punishes a model that cannot hold a structure in mind. The chapter structure asks for assignment and ordering, which a small error in stage 1 turns into a failed dependency check. The chapter text asks for sustained, accurate prose at a stated level. A model that does one of these well can fail another, and the results of this evaluation say so.

### Benchmark Workspace Template

The **benchmark workspace template** is the starting directory for stage 1: a minimal book project holding the course description and the site configuration. The runner copies it fresh for every run, so no run sees another's output. The template contains an unchanged copy of the published course description, and that is the single input to the whole chain.

!!! mascot-thinking "The Template Is Never the Working Copy"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A run works on a copy, and the original stays byte for byte what it was. That is the whole mechanism by which a failed run, a killed run, or a run that wrote garbage cannot reach the next one. If a run changes its own starting point, you can never again say what it started from.

## Running a Stage

### Stage Prompt and Standing Approval Answer

A **stage prompt** is the text that starts a stage, and there is one per stage, fixed. It is what a person would type to begin the skill, with the course description's location and the target. A **standing approval answer** is the paragraph in the prompt that tells the agent how to handle the skill's questions when no one is there. Without it, a skill that pauses for review stalls an unattended run.

The three prompts differ only in which skill they name. The shared closing is the part that matters: it says nobody is available, that every approval request counts as approved, to work through every step of the skill, and to stop when the skill is complete without starting the next one. That last clause keeps each stage's metrics separate.

### Benchmark Runner

The **benchmark runner** is the script that executes one stage. It takes a model, a label for the run, a prompt file, and a starting directory, and it does five things in order.

- It copies the starting directory to a fresh run directory.
- It starts the harness container with that directory mounted and the model's tag set.
- It feeds the prompt file in and captures every event.
- It stops the run at its time limit if the limit is reached.
- It records the exit code and the wall-clock seconds.

```bash
src/harness/run_skill.sh <model> s1-<label> \
  benchmark/algebra-1/prompts/01-learning-graph-generator.txt \
  benchmark/algebra-1/template
```

The label, `s1-<label>`, names the run and every file it produces. The starting directory is the template for stage 1, and for each later stage it is the previous stage's run directory.

### Run Event Stream and Run Time Limit

The **run event stream** is the log the harness writes as it works, one JSON object per line: each message, each tool call, and each result. It is the complete record of what the agent did, and every later diagnosis reads it. It is kept outside the repository, because it holds local paths and has not been sanitized.

The **run time limit** is the longest a run may take before the runner stops it. A model that is stuck or merely very slow would otherwise occupy the machine for hours. A run stopped by the limit exits with code 124, and what it wrote so far is kept, so a timeout is a result and not a lost run. The limits in this evaluation were 150 minutes for stage 1, 2 hours for stage 2, and 90 minutes for each chapter in stage 3.

| Output file | What it holds |
|---|---|
| `<label>/` | The run directory after the run, with the generated files |
| `<label>.jsonl` | The event stream |
| `<label>.json` | The final result: turns, token counts, timings |
| `<label>.status` | The exit code and wall-clock seconds |
| `<label>.stderr` | Anything the harness wrote to its error stream |

### Wall-Clock Time

**Wall-clock time** is the elapsed real time of a run, from start to finish, as measured by a clock on the wall. It is the figure a person waits for and the one the cost model uses. It includes everything: loading, reading, writing, tools, and waiting. Chapter 15 splits it into those causes, and the runner records the total in the status file.

### Per-Chapter Generation Run

A **per-chapter generation run** is a stage 3 run for a single chapter. The chapter-content skill is run once for each chapter, in order, each starting from the book as it stands. The reason is isolation: each chapter gets its own timing, token counts, and time limit, and a failure on one chapter does not discard the others.

A model stops after two time-outs in a row, because a model that cannot finish two chapters in 90 minutes each will not finish twelve, and the remaining runs would only occupy the machine. The runs not made are recorded as not run, with the reason.

### Chapter Completion Criterion

The **chapter completion criterion** is the rule that says a chapter counts as written: its placeholder text is gone and it has at least 1,000 words. It exists because "the model said it finished" is not evidence. A model that announces it is running a skill and ends its turn without writing anything has not written a chapter, and the criterion catches it.

### Chapter Dependency Check

The **chapter dependency check** is a step in the chapter-content skill that verifies that each chapter's concepts depend only on concepts in earlier chapters. If the check finds a violation, the skill stops and says so. In three of one model's runs it did exactly that, because the model's own chapter structure from stage 2 had placed concepts out of order. The failure is real and the stage that caused it was the earlier one, which is why chained stages must be diagnosed from the start.

## What a Stage Must Leave Behind

### Required Output Files and Navigation Entries

**Required output files** are the files a skill is supposed to produce, and checking that they exist is the cheapest verification there is. The learning-graph stage has seven: the concept list, the dependency graph as CSV and as JSON, the concept taxonomy, a quality-metrics report, a taxonomy-distribution report, and an index page.

**Navigation entries** are the lines in the site configuration that make the new pages reachable. A page that exists on disk and is missing from the navigation is invisible to readers, and a strict build can fail on it. Several models left the entries out, even when they wrote the files, which is why this is a check of its own.

### Per-Stage Metrics

**Per-stage metrics** are the measurements recorded for each stage of each run, so that stages can be compared across models. They fall into the three groups of Chapter 19, and the table defines each metric in terms of something a program can compute.

| Metric | Definition | Group |
|---|---|---|
| Skill completion rate | Stages that ended on their own with every required file, divided by stages attempted | Completion |
| Build success | The strict site build exits with no errors | Completion |
| Structural validity | The structural checks of Chapter 20 pass | Completion |
| Wall-clock time | Real elapsed time of the run | Efficiency |
| Tool call count and failed tool calls | From the event stream | Efficiency |
| Tokens | Input and output, from the final result | Efficiency |
| Words and reading level | For chapters, from the chapter-metrics script | Quality |

A worked example uses one model's actual results, from this book's model results page. The model is `gemma4:26b`, run on one DGX unit at a 163,840-token context.

| Stage | Produced | Time |
|---|---|---|
| 1. Learning graph | 200 concepts, 483 dependencies, 40 duplicate labels | 6 minutes |
| 2. Book structure | 14 chapters, 160 of 200 concepts assigned | 4 minutes |
| 3. Chapter content | 10 of 14 chapters written, 27,217 words | 100 minutes in 14 runs |

Each row carries something a person would miss on a reading. The stage 1 row has a fault in it, 40 duplicate labels, that the structural check found. The stage 2 row says that 40 of the 200 concepts were not assigned to any chapter, which will limit what stage 3 can write. And the stage 3 row says four of 14 chapters were not written, for reasons the event streams explain. Chapter 22 reads them.

!!! mascot-tip "Write the Metric Definitions Down Before the First Run"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Ten minutes spent writing "build success means a strict build exits zero" saves the argument, later, about whether a run that built with warnings counts. Put the definitions in the same record as the prompts, and score every run with the same script.

### Run Output Retrieval

**Run output retrieval** is bringing the run directories and event streams back from the DGX to the laptop, where they are reviewed and scored. This project's script copies each unit's run directory with `rsync`, which transfers only new and changed files and never deletes. The hosts come from an environment variable, so no address is written into the script.

```bash
export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
src/orchestration/fetch_runs.sh --watch 300
```

With `--watch` it fetches again every 300 seconds, and stops when a book or a phase finishes, when a host that was answering fails twice in a row, or when no run is going. The last two conditions are the useful ones: a unit that has frozen announces itself by failing to answer.

The fetched output is not sanitized. It holds local paths and, in the event streams, whatever the commands printed. It stays outside the repository, and only the learning graph and the chapter text are published, through a script that leaves out any file with an address, a host name, or a home-directory path.

### Textbook Preview

A **textbook preview** is building the generated book and reading it as a reader would. It is the only way to see the rendered result, with its navigation, its tables, and its admonitions, and not the Markdown. The book is a project like any other, so `mkdocs build --strict` builds it, and a model's output can be previewed on the laptop after retrieval, with no need to reach the DGX at all.

### Evaluation Status Tracking

**Evaluation status tracking** is a single table that shows, for each model, how far it has got. This book's status page is the form: one row per model, one column per stage, with a check, a cross, a count such as "10 of 14", "Running", or a dash for not started. It is updated after each run, and it carries a "last updated" line. It records that a stage finished and nothing about how good the output is, and the page says so.

## A Queue of Runs

A benchmark of ten models is a queue, and a queue needs more than the runner. This project's batch script works through a list of models one at a time, in phases: download and model-only test, harness smoke test, then stages 1, 2, and 3. A run that already has a status file is skipped, so a stopped queue restarts where it left off. An empty file named `skip-<model>` in the runs directory makes a running queue pass over a model.

Three practices make a long queue survivable. The queue runs in a `tmux` session named `bench`, with the watchdog in a session named `watchdog`, so that a dropped connection stops neither. The script restarts the model server for each model with a context chosen from a memory estimate that keeps about 45 GiB free. And each model's results are fetched back as it finishes, so that a unit that freezes does not take unfetched results with it.

#### Diagram: Benchmark Stage Pipeline


<iframe src="../../sims/benchmark-stage-pipeline/main.html" width="100%" height="522px" scrolling="no"></iframe>
[Run Benchmark Stage Pipeline Fullscreen](../../sims/benchmark-stage-pipeline/main.html)

<details markdown="1">
<summary>Benchmark Stage Pipeline</summary>
Type: workflow
**sim-id:** benchmark-stage-pipeline<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/learning-graphs/tree/main/docs/sims/book-build-workflow-pipeline<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain how the three benchmark stages chain by opening each of 7 elements of the pipeline and then answering 4 questions about what starts from what, with at least 3 of 4 correct.

**Prerequisites:** pipeline stage, stage chaining, benchmark workspace template, per-chapter generation run, run time limit, run event stream (all defined in the sections above this block).

**Evidence of Mastery:** The learner opens all 7 elements to read their descriptions, then answers 4 questions, each by choosing one element, before any answer is revealed. A choice is correct when it equals the Correct element column. Mastery is 3 of 4 correct on the first attempt. Opening an element is exploration, not evidence.

**Misconceptions:** (1) Every stage starts from the template. (2) Stage 3 is one run for the whole book. (3) A run that hits its time limit loses what it wrote. (4) A run can change its starting directory.

**Instructional Rationale:** Understand-level explaining of a chained process needs the learner to place inputs and outputs, so each element's description names where it starts from and what it leaves, and the questions ask the learner to locate a fact in that structure.

**Content:**

The seven elements, in order, with the description shown when an element is opened:

| # | Element | Description shown |
|---|---|---|
| 1 | Template workspace | The fixed starting directory with the course description. It is copied for each run and never changed. |
| 2 | Stage 1 run | Runs the learning-graph skill on a copy of the template, with a 150-minute limit. |
| 3 | Stage 1 output | The run directory holding the seven required files of the learning graph. |
| 4 | Stage 2 run | Runs the chapter-structure skill on a copy of the stage 1 output, with a 2-hour limit. |
| 5 | Stage 2 output | The run directory holding one directory and outline per chapter. |
| 6 | Stage 3 runs | One run per chapter, each on a copy of the book so far, with a 90-minute limit each. |
| 7 | Finished book | The run directory after the last chapter, which is the book the model wrote. |

The four questions:

| # | Question shown to the learner | Correct element | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which element is the starting point of stage 2? | Stage 1 output | Each stage starts from a copy of the previous stage's output. |
| 2 | Which element runs once for each chapter? | Stage 3 runs | The chapter skill is run once per chapter so each gets its own timing and limit. |
| 3 | Which element must never be changed by a run? | Template workspace | It is copied for each run, so every run starts from the same input. |
| 4 | Which element holds the seven required files of the learning graph? | Stage 1 output | The seven files are the required output of stage 1. |

**Provenance:** The elements and limits come from the benchmark's runner and prompts and from the sections of this chapter above. The questions are synthetic, written for this exercise, and the sim labels them "synthetic example".

**Rules:** Elements may be opened in any order. The questions are asked in the fixed order 1 to 4, each allows one final choice among the seven elements, and exactly one element is correct for each question.

**Learner Activity:**

1. The learner opens each of the 7 elements of the pipeline and reads its description. The questions unlock after all seven have been opened.
2. The learner reads question 1 and chooses an element, then confirms.
3. The sim shows the correct element and the Why text, and marks the question correct or incorrect.
4. The learner repeats for questions 2 to 4. After question 4 the sim shows the score and the misconception behind each miss.

**Feedback:** Four questions, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct element and the Why text. The final score reads "n of 4 correct".

**Starting State:** The pipeline is shown with no element opened, and the instruction on screen is "Open each element to see what it does".

**Chapter Anchors:** The chapter states that each stage starts from a copy of the previous stage's output, that the template is never changed, that stage 3 runs once per chapter, and that the limits are 150 minutes, 2 hours, and 90 minutes per chapter.
</details>

## Chapter Summary

The benchmark runs three chained stages from a fixed template with one prompt each, and a runner that copies the starting directory so no run changes its input. Each run leaves an event stream, a result, and a status file, and a time limit turns a stuck run into a recorded result. Stage 3 runs once per chapter, with a completion criterion in place of the model's own claim. A stage must leave its required files and navigation entries, and its metrics are defined before the first run and computed by the same script every time. Outputs come back to the laptop by a script that never deletes, a status table tracks progress, and a queue is made survivable by tmux, a watchdog, per-model context choice, and fetching as it goes.

!!! mascot-celebration "You Have a Complete, Logged Run"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now run the three stages from a fixed template, bound each by a time limit, retrieve the outputs, and record per-stage metrics against definitions you wrote first. Chapter 22 turns those raw records into a diagnosis and a decision.

[See Annotated References](./references.md)
