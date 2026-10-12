---
title: "Designing a Fair Evaluation"
description: "Turning an evaluation question into an experiment that can be defended: the question, the independent variable, the controlled and uncontrolled variables, fixed inputs, metrics, repeated runs, baselines, and two layers of testing."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:24:09"
version: 1.11
---

# Designing a Fair Evaluation

## Summary

This chapter turns the evaluation question into an experiment that can be defended. Students define the question and independent variable, control and record the other variables, fix inputs, repeat runs, and compare against a cloud baseline. They finish able to critique a design for uncontrolled variables and unfair comparisons.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Evaluation Question | 183 |
| Independent Variable | 76 |
| Metric Selection | 72 |
| Design Decision Record | 3 |
| Controlled Variables | 75 |
| Logging | 19 |
| Baseline Comparison | 14 |
| Decision Attribution | 1 |
| Fixed Inputs | 38 |
| Repeated Runs | 20 |
| Explicit Assumptions | 9 |
| Uncontrolled Variable | 8 |
| Fair Comparison | 8 |
| Run Variance | 9 |
| Measured Versus Assumed Values | 8 |
| Retest After Fix | 2 |
| Reproducible Experiment | 1 |
| Sample Size | 8 |
| Skill Defect Correction | 1 |
| Model-Only Test | 4 |
| Harness Smoke Test | 2 |
| Two-Layer Testing | 1 |
| Control Run | 1 |
| Long-Context Recall Test | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)
- [Chapter 8: Reproducible Python Environments with Conda](../08-conda-environments/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)
- [Chapter 17: Agent Skills and Connecting a Harness to a Local Model](../17-agent-skills-and-harness/index.md)

---

!!! mascot-welcome "A Result Is Only as Good as Its Design"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Two people can run the same models on the same machine and reach opposite conclusions, and the difference is almost never the models. By the end of this chapter you will be able to design a comparison that holds up, and critique one that does not. Measure first, then decide!

## What This Chapter Covers

Everything so far built capability: a reachable machine, a measured one, a model that fits, a server that answers, and a harness that runs a skill. This chapter decides what to do with it. The step from "it runs" to "it is better" is where evaluations most often go wrong, and it goes wrong in the design, long before any number is produced.

The chapter works through the parts of a design in the order a person makes them: the question, the one thing you vary, the things you hold fixed, the things you could not control and must record, and the measurements. It then covers how to know whether a result is repeatable, what to compare it against, and how to test in two layers so that failures are found cheaply. This evaluation's own choices appear throughout, including the ones that did not hold up.

## The Question and the Variables

### Evaluation Question

An **evaluation question** is the single, answerable question the experiment exists to answer. Everything else in the design follows from it, so a vague question produces a design that measures everything and decides nothing. A good one names what is being compared, on what task, under what conditions, and what would count as an answer.

This evaluation's question, in the Primary Author's words, is whether a local harness can execute the skills correctly. Stated as a full question, it is: can a DGX running an open-weight model, driven by a local harness, run the `ibook-skills` chain to produce an intelligent textbook without sending a token to the cloud, and how good is the result?

The difference between a good question and a poor one is easiest to see side by side.

| Poor question | Why it fails | Better question |
|---|---|---|
| Which model is best? | Best at what, for whom? | Which candidate completes stages 1 to 3 on Algebra I with the fewest structural faults on one DGX unit? |
| Is local cheaper than cloud? | Mixes cost and price, and ignores quality | What is the cost per textbook of local generation at the measured speed, and what would a service charge at a 20% margin? |
| Does the DGX work? | Nothing could ever answer "no" | Does a local model produce a learning graph that passes structural checks within a 150-minute limit? |

The test of a question is whether you can imagine two different outcomes. If you cannot, it is not a question for an experiment.

### Independent Variable

The **independent variable** is the one thing the experiment deliberately changes, so that its effect can be observed. A comparison of ten models has a single independent variable, which is the model, and that single choice is what lets a difference in the results be attributed to it.

The discipline is to change one thing. A design that varies the model and the harness and the context length at once can report that the runs differ, and cannot say why. This is the same one-change-at-a-time rule that Chapters 6 and 15 applied to cost and speed, now applied to the whole experiment.

A worked example compares three designs for the same ten-model question. The first changes the model and nothing else. The second lets each model run at its own best context length and its own reasoning setting. The third runs half of the models on one DGX unit and half on the other.

| Design | What varies | What a difference in results can be blamed on |
|---|---|---|
| Model only | The model | The model |
| Model, context, and reasoning | Three things together | Any of the three, or their combination, and you cannot say which |
| Model, split across two units | The model and the machine | The model or the unit, and you cannot say which |

Only the first can answer the question as asked. The second may still be worth running, as a second experiment about tuning, but its results must not be presented as a comparison of models.

### Controlled Variables

**Controlled variables** are everything else that could affect the result, which the design holds fixed on purpose. They are the reason a difference can be blamed on the independent variable. Each one is a decision, written down, and for this evaluation the list is long.

| Variable | How it was controlled |
|---|---|
| Course | One fixed course, Algebra I, an unchanged copy of its description |
| Workload | Three skills, with one fixed prompt per stage |
| Harness | Claude Code, pinned to one version |
| Server | Ollama, pinned to one release |
| Skills | One checkout, mounted read-only |
| Hardware | One DGX unit for all ten candidates |
| Quantization | Each model's default 4-bit file |
| Starting state | A fresh copy of the template workspace for every run |
| Time limits | 150 minutes for stage 1, a fixed limit per chapter |

A controlled variable is a promise, and some promises were not kept. The next two sections name the ones that were not.

!!! mascot-thinking "Every Fixed Thing Is a Claim You Must Be Able to Defend"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Writing "same harness" in a design is a statement that you checked. Each controlled variable should have a line in the record that says what the value was and how you know. The ones you cannot back with a record are the ones a critic will find.

### Uncontrolled Variable

An **uncontrolled variable** is something that could affect the result and that the design did not hold fixed. Some cannot be controlled, and others were not noticed. The honest response is not to pretend they were controlled, but to record them and say which direction they might push.

This evaluation had at least three. **Reasoning mode**: the model-only tests ran with reasoning turned off to bound their time, and the harness runs used each model's own default, so one model spent nineteen minutes on a single turn and predictions from the model-only test did not match. **Context length**: it was chosen for each model from a memory estimate, so the models did not all run at the same setting. **Server behavior**: one model's server re-read the conversation on every turn, and the cause was not identified, so a speed difference could belong to the server and not to the model.

### Fixed Inputs

**Fixed inputs** are the exact files and prompts every run starts from. They are the most concrete controlled variable, and the cheapest to get right. In this evaluation the course description is an unchanged copy of a published description, the starting workspace is copied fresh for every run, and each stage has one prompt file, numbered in stage order.

Two habits make fixed inputs trustworthy. Keep them in version control so a change is visible. And copy them into each run instead of pointing to them, so that no run can alter the input of the next. The runner's header says it plainly: the start directory is copied to a fresh run directory, so a run never changes its input.

### Metric Selection

**Metric selection** is choosing what to measure, and it is as much a decision as choosing the question. A metric is only useful if it answers the question, if it can be computed the same way for every run, and if you decided it before you saw the data.

The metrics this evaluation collects fall into three groups, and the table gives each group's role.

| Group | Examples | What it answers |
|---|---|---|
| Completion | Stage finished, files present, build succeeds | Did the run do the task at all? |
| Efficiency | Wall-clock time, tool calls, failed tool calls, tokens, peak memory | What did it cost to do it? |
| Quality | Structural checks, reading level, human review | Is what it produced any good? |

The groups differ in how much they can be trusted. Completion and efficiency are computed by a program and are repeatable. Quality is the one that matters most and the hardest to measure, which is the subject of Chapter 20. A design that reports only completion and efficiency has measured the cheapest things.

!!! mascot-warning "Do Not Pick the Metric After You See the Result"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If you look at the data and then choose the measure that makes your favorite model look best, you have not run an experiment. Write the metrics and how each is computed into the record before the first run, and add new ones afterward only as clearly labeled extras.

## Is the Result Repeatable?

### Repeated Runs, Run Variance, and Sample Size

A **repeated run** is running the same configuration more than once. **Run variance** is how much the results differ among them. A language model samples its output, and even at a low temperature a long agent session takes a path that depends on small differences early on, so two runs of the same configuration are not the same run.

**Sample size** is the number of runs behind a conclusion. A single run is a sample of one, and it supports a statement about that run only. Nearly every result in this evaluation so far is one run: each model attempted each stage once. That is enough to find what fails, and not enough to rank.

A worked illustration shows why. Suppose a model finishes a stage in 20 minutes on one run and 45 on another, because in the second it made a wrong turn and recovered. A second model finishes in 30 minutes on its one run. Ranking the second ahead of the first from those numbers is a coin flip. With five runs of each, the spread of each is visible and the comparison can be stated with its uncertainty.

| Runs per configuration | What you can say |
|---|---|
| 1 | What happened; which things failed outright |
| 3 | Whether the result is stable, roughly |
| 5 or more | A typical value and a range, with caution |

### Control Run

A **control run** is a repeat of a run that should give the same answer, done to check the apparatus and not the subject. This project's model-test script ends with one: it runs its smoke test on two models as their downloads finish, then repeats the first as a control. If the control differs from the original by more than the expected variation, something in the setup changed in between, such as memory pressure, a thermal state, or a different server setting.

A control is cheap, and it is the first thing to do when a surprising number appears. It separates "this model really behaves this way" from "this machine behaved differently this afternoon".

### Reproducible Experiment

A **reproducible experiment** is one that someone else can repeat from the record and obtain a comparable result. It is the combination of this chapter's parts: a stated question, a recorded configuration, fixed inputs under version control, pinned software, and logs that show what happened. Reproducibility is not a property of the result. It is a property of the record.

## What to Compare Against

### Baseline Comparison and Fair Comparison

A **baseline comparison** judges a result against a reference produced under the same rules. Without one, "the local model's learning graph has 200 concepts" has no meaning, because nobody knows whether a cloud model's would too. A **fair comparison** is one in which the only meaningful difference between the two sides is the thing being compared.

This evaluation has a reference for scale, and not yet a baseline. A published Algebra I book was generated with cloud models, and it has 200 concepts and 13 chapters of about 55,000 words. It was made with earlier versions of the skills, and no timings or token counts were kept. It shows how large a finished book is. It cannot say how long a cloud model takes or how good its output is under these exact conditions. The cloud baseline remains to be run.

| Requirement for a fair comparison | Satisfied by the published book? |
|---|---|
| Same course description | Yes |
| Same skill versions | No, earlier versions |
| Same prompts | Not recorded |
| Timings and token counts recorded | No |
| Same scoring applied | Not yet |

!!! mascot-tip "Ask Three Questions of Any Baseline"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Did it use the same inputs? Is its configuration recorded? Was it scored by the same method as the thing you are comparing it to? A baseline that fails any of the three is a reference point, and the comparison should call it that.

## Writing It Down

### Logging

**Logging** is recording what happened during a run, in enough detail to reconstruct it. The log is what lets a surprising result be investigated later, and it is the difference between a measurement and a memory.

The records this evaluation keeps for each run are worth listing, because each answers a specific later question.

| Record | What it holds | Answers |
|---|---|---|
| The event stream | Every message, tool call, and result | What did the agent actually do? |
| The final result | Turns, token counts, timings | How much did it use? |
| The status file | Exit code and wall-clock seconds | Did it finish, and how long did it take? |
| The server log | Loads, memory, request timings | Why was it slow? |
| The vitals log | Memory, temperature, power every 30 seconds | What did the machine look like? |
| The configuration | Versions, settings, dates | Can this be repeated? |

### Explicit Assumptions and Measured Versus Assumed Values

**Explicit assumptions** are the things the analysis takes as true without having tested them, stated as such. **Measured versus assumed values** is the distinction applied to each number: a measured value came from an observation in this evaluation, and an assumed one came from a rule, a published figure, or a guess.

The cost analysis is the model for this. Its tables label every speed as measured, or as assumed equal to a measured model. Six of the ten speeds are assumed. It also tests its own rule against the one case it can check: the rule predicted 34 tokens a second for one model, and the measured figure was 26. Reporting the miss is what makes the other assumptions credible.

### Design Decision Record and Decision Attribution

A **design decision record** is a written account of each choice in the design: what was chosen, what else was considered, and why. **Decision attribution** is recording who made each decision, because a choice made by a person with a goal and a choice made by an assistant filling a gap deserve different scrutiny.

This book's design-choices page is such a record, and it has a table of who decided what. Three parties appear in it: the Primary Author, the Administrator, and the AI assistant that built and ran the tests under the Primary Author's direction. It also has a section on the choices that did not hold up, which is the part that earns the reader's trust.

## Testing in Layers

### Two-Layer Testing, Model-Only Test, and Harness Smoke Test

**Two-layer testing** is testing a model alone first, and then inside the harness. The **model-only test** sends a model short, fixed tasks directly through the server, with no harness, and checks the output against rules. The **harness smoke test** is the three-minute skill run of Chapter 17, which checks the model, the harness, and a skill together.

The layers differ in what a failure costs and what it can tell you.

| Layer | Time per model | What a failure means |
|---|---|---|
| Model-only test | Minutes | The model cannot follow a rule on its own, such as a blank line before a list |
| Harness smoke test | About three minutes | The model cannot work through a skill with tools |
| Full stage | Tens of minutes to hours | The model fails at scale, or is too slow |

The benefit is isolation. A model that fails the first layer fails in seconds and for a reason you can name, and a model that passes it and fails the second fails for a reason that involves the harness. Going straight to the full pipeline makes every failure slow and mixes the causes. The model-only test in this project has five tasks: Markdown writing, p5.js code, schema-constrained JSON, a tool call, and a 30,000-token prompt.

### Long-Context Recall Test

A **long-context recall test** checks that a model can find a specific fact in a long prompt. A value is placed in a long block of text, and the model is asked to return it. It is the model-only test's way of asking whether a model that advertises a large window can use it.

It found something the other tasks did not. One model returned the wrong value from a long prompt in two of its model-only runs and again in a third. A model that misreads a long prompt is a poor fit for long skills, and that is a hypothesis to test in the harness, not a conclusion.

### Skill Defect Correction and Retest After Fix

A **skill defect correction** is fixing a fault in the skill or in the test, and not in the model that revealed it. A **retest after fix** is running the affected models again once the fault is corrected, so that an early conclusion does not stand on a broken check.

Two cases in this evaluation show the need. A faulty example in a skill produced navigation files that would not build, and a fast model that copied it was set aside. The skill was corrected. The model was retested afterward, passed the short skill test, and finished the learning graph in under six minutes, and it was the graph itself, with 40 duplicate labels, that remained a serious fault. Separately, the first versions of three model-only checks were too strict and failed correct output. Each was fixed and the saved output was scored again.

!!! mascot-encourage "Finding Your Own Bug Is Part of the Method"
    ![Tera encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If a result turns out to come from a faulty check or a broken example, that is the evaluation working. Record the defect, fix it, rerun what it touched, and note which conclusions changed. The report that says so is more trustworthy than one that never found a mistake.

#### Diagram: Experiment Variable Role Sorter


<iframe src="../../sims/variable-role-sorter/main.html" width="100%" height="522px" scrolling="no"></iframe>
[Run Experiment Variable Role Sorter Fullscreen](../../sims/variable-role-sorter/main.html)

<details markdown="1">
<summary>Experiment Variable Role Sorter</summary>
Type: microsim
**sim-id:** variable-role-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate the role of each of 10 items in a model-comparison experiment as independent variable, controlled variable, measured result, or uncontrolled variable, with at least 9 of 10 correct.

**Prerequisites:** independent variable, controlled variables, uncontrolled variable, metric selection, fixed inputs (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 10 items the learner commits one of four roles before the sim reveals the answer. A choice is correct when it equals the Correct role column. Mastery is 9 of 10 correct on the first attempt. Reading the items is exploration, not evidence.

**Misconceptions:** (1) Anything that is the same in every run is controlled, whether or not it was decided. (2) A measured result can also be the independent variable. (3) A variable that cannot be controlled can be ignored. (4) The model's default setting counts as controlled.

**Instructional Rationale:** Differentiating roles needs the learner to ask two questions of each item, who set it and whether it was held the same, so the items cover all four roles and include two that look controlled and are not.

**Content:**

The four roles the learner chooses from: "Independent variable", "Controlled variable", "Measured result", and "Uncontrolled variable".

The experiment: ten candidate models each run the same three skills on one DGX unit, and the question is how well each completes them.

| # | Item shown to the learner | Correct role | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which model is loaded for the run | Independent variable | It is the one thing the experiment deliberately changes. |
| 2 | The course description, an unchanged copy for every run | Controlled variable | It was held fixed on purpose. |
| 3 | The harness version, pinned to one release | Controlled variable | It was held fixed on purpose. |
| 4 | Wall-clock time of the stage | Measured result | It is an outcome recorded for every run. |
| 5 | Which DGX unit a run happened on, when runs were spread across both with no plan | Uncontrolled variable | It varied without being decided, so a difference could belong to the unit. |
| 6 | The prompt text for each stage | Controlled variable | It was held fixed on purpose. |
| 7 | Number of tool calls that failed | Measured result | It is an outcome recorded for every run. |
| 8 | Other work running on the machine during the run | Uncontrolled variable | It varied without being managed. |
| 9 | Quantization, each model's default 4-bit file | Controlled variable | The same level was chosen for every model. |
| 10 | Whether a model's reasoning mode is on, when each model uses its own default | Uncontrolled variable | It differs by model without being decided, so it is mixed with the independent variable. |

**Provenance:** The items are synthetic but drawn from this evaluation's design, and the sim labels them "synthetic example". The roles come from the sections of this chapter above.

**Rules:** Items are shown in the fixed order 1 to 10. Each allows one final choice, and exactly one role is correct for each. A variable is "Controlled" only if the design held it fixed on purpose, and "Uncontrolled" if it varied without being decided.

**Learner Activity:**

1. The learner reads item 1.
2. The learner chooses one of the four roles and confirms.
3. The sim shows the correct role and the Why text, and marks the item correct or incorrect.
4. The learner repeats for items 2 to 10. After item 10 the sim shows the score and the misconception behind each miss.

**Feedback:** Ten items, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct role and the Why text. The final score reads "n of 10 correct".

**Starting State:** Item 1 is shown with no role chosen, and the question on screen is "What role does this play in the experiment?"

**Chapter Anchors:** The chapter states that the model is the single independent variable, that the course description, harness version, prompts, and quantization are controlled, and that reasoning mode, context length, and server behavior were uncontrolled.
</details>

#### Diagram: Evaluation Design Flaw Finder


<iframe src="../../sims/design-flaw-finder/main.html" width="100%" height="602px" scrolling="no"></iframe>
[Run Evaluation Design Flaw Finder Fullscreen](../../sims/design-flaw-finder/main.html)

<details markdown="1">
<summary>Evaluation Design Flaw Finder</summary>
Type: microsim
**sim-id:** design-flaw-finder<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/statistics-course/tree/main/docs/sims/experimental-designs-compare<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** critique<br/>
**Learning Objective:** The learner will critique a described evaluation by judging each of 8 statements about it as a flaw or not a flaw, with at least 7 of 8 correct.

**Prerequisites:** evaluation question, controlled variables, fixed inputs, repeated runs, sample size, fair comparison, bias, limitations statement (all defined in this chapter and in Chapter 20).

**Evidence of Mastery:** The learner reads the described evaluation, then judges each of 8 statements as "Flaw" or "Not a flaw" before the sim reveals the answer. A judgment is correct when it equals the Correct judgment column. Mastery is 7 of 8 correct on the first attempt. Re-reading the description is exploration, not evidence.

**Misconceptions:** (1) A comparison of two systems needs no controls if one is clearly stronger. (2) A single run is enough to rank. (3) A result scored by the system that produced it is neutral. (4) Having a method is the same as having a fair method.

**Instructional Rationale:** Evaluating a design needs criteria applied to a case, so the description contains five real flaws and three sound practices, which prevents answering "flaw" to everything.

**Content:**

The described evaluation, shown in full to the learner:

"A team compares a local model and a cloud model on textbook generation. They run the local model once on Monday on a machine that is also running a database backup, using the Algebra I course description, with the same harness and the same skills as the cloud run. They run the cloud model once on Friday using a rewritten course description that adds a glossary requirement. They score both outputs with the cloud model that wrote the cloud result. The team recorded the model names, versions, and dates of both runs, and stated its evaluation question before running anything. They report that the cloud model is better, without further comment."

| # | Statement shown to the learner | Correct judgment | Why (shown as feedback) |
|---|---|---|---|
| 1 | Each model was run once. | Flaw | One run gives no estimate of run variance, so a difference may be noise. |
| 2 | The two runs used different course descriptions. | Flaw | The inputs were not fixed, so a difference could come from the description and not the model. |
| 3 | The local model ran while a backup ran on the same machine. | Flaw | Competing load is an uncontrolled variable that can slow or starve the run. |
| 4 | Both runs used the same harness and the same skills. | Not a flaw | Holding these fixed is exactly what a fair comparison requires. |
| 5 | The cloud model's output was scored by the cloud model that wrote it. | Flaw | A model judging its own work is a source of bias, so the score is not neutral. |
| 6 | The team recorded the model names, versions, and dates of both runs. | Not a flaw | A record of the configuration is what makes an experiment reproducible. |
| 7 | The team stated its evaluation question before running anything. | Not a flaw | Fixing the question first prevents choosing a measure after seeing the data. |
| 8 | The result was reported as "the cloud model is better" with no limitations. | Flaw | A claim from one run per side needs a limitations statement that says so. |

**Provenance:** The described evaluation and statements are synthetic, written for this exercise, and the sim labels them "synthetic example". The criteria come from the sections of this chapter above.

**Rules:** Statements are shown in the fixed order 1 to 8. Each allows one final judgment, and exactly one of "Flaw" or "Not a flaw" is correct for each. The description contains five flaws and three sound practices.

**Learner Activity:**

1. The learner reads the described evaluation.
2. The learner reads statement 1 and chooses "Flaw" or "Not a flaw", then confirms.
3. The sim shows the correct judgment and the Why text, and marks the statement correct or incorrect.
4. The learner repeats for statements 2 to 8. After statement 8 the sim shows the score and the misconception behind each miss.

**Feedback:** Eight statements, fixed order, one confirmed judgment each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct judgment and the Why text. The final score reads "n of 8 correct".

**Starting State:** The described evaluation is shown with statement 1 beneath it and no judgment made, and the question on screen is "Is this a flaw in the design?"

**Chapter Anchors:** The chapter states that one run per side gives no run variance, that inputs must be fixed, that uncontrolled load is a variable, that a model should not score its own output, and that a result needs a limitations statement.
</details>

## Chapter Summary

A defensible evaluation starts from a question that could have different answers, and changes one thing. It holds everything else fixed on purpose, records the variables it could not hold, and chooses its metrics before it sees data. A result from one run is an observation. Repeated runs, control runs, and a stated sample size are what turn it into evidence, and a baseline is only a baseline if it was produced under the same rules. A record of the configuration, the assumptions, and the decisions, with who made each, is what makes the experiment reproducible. Testing in layers finds cheap failures first, and a defect found in the checks, once corrected, means a retest and a note of what changed.

!!! mascot-celebration "You Can Defend a Design and Attack One"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now turn a question into a design with named variables, say which were controlled and which were not, and critique a comparison that skipped the steps. Chapter 20 turns to the hardest measurement in the design, which is how good the output is.
