---
title: "Diagnosing Failures, Reporting, and Cost per Textbook"
description: "Turning run data into a decision: diagnosing failures from logs, computing success rates, time, energy, and cost per textbook, comparing against a baseline, and writing an evidence-based recommendation for a local, cloud, or hybrid workflow."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:29:03"
version: 1.11
---

# Diagnosing Failures, Reporting, and Cost per Textbook

## Summary

This chapter turns raw run data into a decision. Students diagnose failures from logs, compute throughput, tool-call success, and energy, compare against the cloud baseline, and estimate cost per textbook. They finish able to write an evidence-based recommendation for a local, cloud, or hybrid workflow.

## Concepts Covered

This chapter covers the following 26 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Malformed Tool Call | 3 |
| Text-Emitted Tool Call | 1 |
| Whole-Book Time Estimate | 6 |
| Context Overflow | 2 |
| Harness Misconfiguration | 2 |
| Task Loss | 1 |
| Cost per Textbook | 4 |
| DGX Sufficiency Judgment | 3 |
| Baseline Textbook | 2 |
| Books per Year | 1 |
| Failure Diagnosis | 1 |
| Premature Turn Termination | 1 |
| Cost per Chapter | 1 |
| Quality-Adjusted Cost | 1 |
| Service Price Calculation | 1 |
| Human Review Cost | 1 |
| Time Breakdown | 1 |
| Energy per Textbook | 1 |
| Tool Call Count | 5 |
| Evaluation Report | 5 |
| Failed Tool Calls | 2 |
| Run Report | 1 |
| Recommendation | 2 |
| Tool-Call Success Rate | 1 |
| Report Structure | 1 |
| Local Cloud or Hybrid Decision | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Learning Graphs, MicroSims, and Content Generation Rules](../02-learning-graphs-microsims-rules/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)
- [Chapter 10: Python Hardware Probes](../10-hardware-probes/index.md)
- [Chapter 11: Model Sizing and Fit](../11-model-sizing-and-fit/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)
- [Chapter 15: Optimizing Small Language Model Performance](../15-optimizing-performance/index.md)
- [Chapter 16: The Agent Loop, Tools, and Context](../16-agent-loop-and-tools/index.md)
- [Chapter 17: Agent Skills and Connecting a Harness to a Local Model](../17-agent-skills-and-harness/index.md)
- [Chapter 19: Designing a Fair Evaluation](../19-fair-evaluation-design/index.md)
- [Chapter 20: Scoring, Bias, and Structural Checks](../20-scoring-and-bias/index.md)
- [Chapter 21: Running the Textbook Benchmark](../21-running-the-benchmark/index.md)

---

!!! mascot-welcome "Raw Logs In, A Decision Out"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A folder of event streams is not an answer. By the end of this chapter you will turn one into a diagnosis of why a run failed, a cost per textbook, and a recommendation you can defend. Measure first, then decide!

## What This Chapter Covers

Chapter 21 ended with complete, logged runs. This chapter is what you do with them. It has three parts, in the order the work goes. First, diagnose: for each run that failed, work out why from the evidence, because a failed run is a result and the cause decides what to do next. Second, compute: from the measured times and speeds, work out the time, the energy, and the cost of a textbook. Third, decide: assemble the evidence into a report with a recommendation.

The discipline that runs through all three is to keep what was measured separate from what was assumed. Where this evaluation could only assume, such as the time for stages it had not yet run, the chapter says so, and the recommendation carries the same caveat.

## Diagnosing Failures

### Failure Diagnosis

**Failure diagnosis** is working from the symptoms in the logs to the cause of a failed run. The skill is to ask what the evidence rules out and not what the failure feels like, because several different causes produce runs that look similar from the outside: a run that ended early, a stage with nothing written, a model that seems to have given up.

The evidence is the run event stream, the final result, and the server log, and the questions are the same in every case. How many turns were taken? How many tool calls, and how many failed? What was the last thing the model said? What was the peak context size, against the window? Did the run end on its own, or was it stopped?

### Tool Call Count, Failed Tool Calls, and Tool-Call Success Rate

The **tool call count** is the number of tool calls a model made in a run, and **failed tool calls** is how many of them returned an error. The **tool-call success rate** is the successful share. All three come straight from the event stream, and the run-report script prints them.

The measured values in this evaluation's first stage show how different runs can look.

| Model | Tool calls | Failed | Success rate | Reading |
|---|---|---|---|---|
| `gpt-oss:120b` | 28 | 0 | 100% | Few calls, none failed |
| `qwen3.8:27b` | 55 | 1 | 98% | Careful and slow |
| `gemma4:31b` | 50 | 8 | 84% | Eight failures in fifty calls |
| `nemotron-3.5-lightning:30b` | 140 | not recorded here | n/a | Nearly three times as many calls as any other model |

A number alone does not diagnose. 100% success on 28 calls is not better than 84% on 50 if the 28 calls never reached the step that writes the file. The count is the prompt for a question, and the event stream holds the answer.

### Malformed Tool Call and Text-Emitted Tool Call

A **malformed tool call** is a tool call with a wrong name, a missing argument, or an argument of the wrong type. The harness returns an error, the model usually reads it and tries again, and it counts as a failed tool call. It is a nuisance, and a run can recover from it.

A **text-emitted tool call** is a tool call that the model writes out as ordinary text in its reply, in the shape of a call but not as a call. The harness sees no tool call and treats the reply as a final answer, so the run ends. Two of this evaluation's candidates failed this way: one wrote its first tool call as text in both harness tests and did no work, and another did so in one of two runs and stopped after a single turn. The signature is a run of one turn whose last message contains something that looks like a call.

### Premature Turn Termination and Task Loss

**Premature turn termination** is the model ending its turn before the work is done, with no error. In this evaluation one model, in four of its ten chapter runs, announced that the skill was running, as if something else would do the work, and ended its turn without writing the chapter. The signature is a final message that describes work and no file that contains it.

**Task loss** is the model abandoning the task and answering something unrelated. One candidate, after a few steps, answered with a greeting as if the conversation had just begun. It is usually a context problem: that model's first prompt took 35,000 tokens where the others took 17,000 to 21,000, and within eight turns it was at 120,000, the edge of its window.

### Context Overflow and Harness Misconfiguration

**Context overflow** is the conversation exceeding the model's window, so that earlier content is dropped or the request is rejected. Its signature is a run that does well for a while and then behaves as if it had forgotten the task, with a peak context size close to the window.

**Harness misconfiguration** is a fault in how the harness was set up and not in the model: a wrong address, a model name that the server does not have, a skill folder that was not mounted, or a permission rule that stalls. The signature is a failure at the very first turn, for every model, with an error message that names the configuration. A failure that is identical across all models is a configuration fault until shown otherwise.

| Symptom | Likely cause | First thing to check |
|---|---|---|
| One turn, last message looks like a call | Text-emitted tool call | The final message in the event stream |
| An error, then a correct retry | Malformed tool call | The failed call's arguments |
| Ends after announcing, no file written | Premature turn termination | The last message and the run directory |
| Answers a greeting after several turns | Task loss | Peak context size against the window |
| Forgets the task late in the run | Context overflow | Peak context size against the window |
| Same error at turn one for every model | Harness misconfiguration | The base address, model name, and mounts |

!!! mascot-warning "Check Whether Every Model Failed the Same Way"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A failure that appears for every model at the same place is almost never the models. Before you write that a model "cannot" do something, run the failing step with a model that is known to work. If it fails there too, you have found a configuration or skill fault, and the models were innocent.

#### Diagram: Failure Diagnosis Chooser


<iframe src="../../sims/failure-diagnosis-chooser/main.html" width="100%" height="574px" scrolling="no"></iframe>
[Run Failure Diagnosis Chooser Fullscreen](../../sims/failure-diagnosis-chooser/main.html)

<details markdown="1">
<summary>Failure Diagnosis Chooser</summary>
Type: microsim
**sim-id:** failure-diagnosis-chooser<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** attribute<br/>
**Learning Objective:** The learner will attribute each of 8 failed-run symptoms to its most likely cause from a list of 8, with at least 7 of 8 correct.

**Prerequisites:** malformed tool call, text-emitted tool call, premature turn termination, task loss, context overflow, harness misconfiguration, prompt re-reading, chapter dependency check (all defined in this chapter and in Chapters 15, 16, and 21).

**Evidence of Mastery:** For each of the 8 symptoms the learner commits one cause from the eight listed before the sim reveals the answer. A choice is correct when it equals the Correct cause column. Mastery is 7 of 8 correct on the first attempt. Reading the symptoms is exploration, not evidence.

**Misconceptions:** (1) A failure that ends a run is always a model failure. (2) A tool error means the run cannot recover. (3) A slow run is a failed run. (4) A model that says it is doing the work has done it.

**Instructional Rationale:** Attributing a symptom to a cause needs the learner to use the discriminating detail in each case, so each symptom has exactly one cause and the eight causes are different enough to confuse only if the detail is missed.

**Content:**

The eight causes the learner chooses from: "Text-emitted tool call", "Malformed tool call", "Task loss", "Context overflow", "Harness misconfiguration", "Premature turn termination", "Slow turns from prompt re-reading", and "Upstream stage fault".

| # | Symptom shown to the learner | Correct cause | Why (shown as feedback) |
|---|---|---|---|
| 1 | The run ended after one turn. Its last message contains text shaped like a tool call, written as ordinary prose. | Text-emitted tool call | The harness saw no real tool call, so it treated the reply as the final answer. |
| 2 | The harness reported invalid arguments for a file write. On the next turn the model sent a correct call and the run went on. | Malformed tool call | The call was ill-formed and the model recovered after the error. |
| 3 | After about eight turns the model answers "Hello, how can I help?" and ignores the skill. | Task loss | The model has dropped the task, which is usually a sign of a context that was too large for it. |
| 4 | The conversation reached 127,000 tokens in a 128,000-token window, and the model began to contradict its own earlier instructions. | Context overflow | The window was close to full, so earlier content was lost. |
| 5 | Every request returns "model not found" at turn one, for every model tried. | Harness misconfiguration | The same failure at the first turn for every model points at the setup, not a model. |
| 6 | The final message says "I will now run the chapter skill", with no tool call made and no file written. | Premature turn termination | The model described the work and ended its turn without doing it. |
| 7 | Four of 14 chapters were not written. The skill's own dependency check reported that each chapter needed concepts placed in later chapters, and stopped. | Upstream stage fault | The chapter structure from stage 2 was the cause, so the stage 3 failure is a symptom of it. |
| 8 | The stage hit its 90-minute limit after about twenty tool calls. Each turn took close to two minutes, and the server log shows most of that reading the prompt. | Slow turns from prompt re-reading | The time went to the server recomputing the conversation, not to the model's generating. |

**Provenance:** The symptoms are synthetic but follow failures observed in this evaluation, and the sim labels them "synthetic example". The causes come from this chapter and Chapters 15, 16, and 21.

**Rules:** Symptoms are shown in the fixed order 1 to 8. Each allows one final choice, and exactly one cause is correct for each. A cause is the correct answer for exactly one symptom.

**Learner Activity:**

1. The learner reads symptom 1.
2. The learner chooses one of the eight causes and confirms.
3. The sim shows the correct cause and the Why text, and marks the symptom correct or incorrect.
4. The learner repeats for symptoms 2 to 8. After symptom 8 the sim shows the score and the misconception behind each miss.

**Feedback:** Eight symptoms, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct cause and the Why text. The final score reads "n of 8 correct".

**Starting State:** Symptom 1 is shown with no cause chosen, and the question on screen is "What most likely caused this?"

**Chapter Anchors:** The chapter states that a text-emitted tool call ends a run after one turn, that a malformed call is recoverable, that a failure identical for every model at turn one is a configuration fault, and that a dependency-check stop in stage 3 traces back to stage 2.
</details>

## Computing the Cost of a Book

### Time Breakdown and Whole-Book Time Estimate

A **time breakdown** splits a run's wall-clock time into loading, reading, writing, and tools, as Chapter 15 did for one turn. A **whole-book time estimate** extrapolates the time for the whole book from the stages that were measured, and it is the number the cost model needs.

The benchmark covers three stages, which the Primary Author set at 10% of the cost of a whole book, because the learning graph, the chapter design, and the chapter content are one tenth of the work; the MicroSims, glossary, FAQ, quizzes, and references are the rest. The estimate follows:

\[ T_{\text{book}} = \frac{T_{\text{three stages}}}{0.10} \]

For the reference model, the three stages take 2.8 hours, so a whole book is about 28 hours of machine time. The estimate rests on an assumption about stages that have not been run, and a reader should treat it as a model to adjust. If the three stages were 5% of the book, the estimate doubles.

### Energy per Textbook

**Energy per textbook** is the electricity a book takes. It is the generating power times the generating time. At 150 W for 28 hours it is 4.2 kWh, which at $0.1385 per kWh is about 58 cents. It is the smallest cost in the model, and the reason to compute it is to be able to say so with a number.

### Cost per Textbook, Cost per Chapter, and Books per Year

The **cost per textbook** is the machine's yearly cost spread over the books it makes, which comes down to the book's hours times the cost of a generating hour. The **cost per chapter** divides it by the number of chapters, and **books per year** is the generating hours in a year divided by the hours for one book.

```text
generating hours per year  = 8,760 × utilization
cost per generating hour   = yearly cost ÷ generating hours per year
cost per book              = whole-book hours × cost per generating hour
cost per chapter           = cost per book ÷ chapters
books per year             = generating hours per year ÷ whole-book hours
```

The reference case gives each. At 50% utilization there are 4,380 generating hours, and with a yearly cost of $8,275 each is $1.89. A 28-hour book costs $52.92, a 13-chapter book is $4.07 a chapter, and the unit makes 156 books a year.

### Service Price Calculation and Quality-Adjusted Cost

The **service price calculation** is the price a book-generation service would have to charge to keep a stated margin: the cost divided by one minus the margin. At a 20% margin, $52.92 becomes $66.15.

**Quality-adjusted cost** corrects the cost for how much of the output is usable. A book generated for $53 of which only 10 of 14 chapters are written has not cost $53 for a book. One way to express it is the cost per usable chapter, which is the cost divided by the chapters that met the completion criterion. A cheap model that writes 6 of 10 chapters is more expensive per chapter than the arithmetic of its speed suggests.

| Case | Cost to generate | Usable chapters | Cost per usable chapter |
|---|---|---|---|
| All 13 chapters complete | $52.92 | 13 | $4.07 |
| 10 of 13 complete | $52.92 | 10 | $5.29 |
| 6 of 13 complete | $52.92 | 6 | $8.82 |

### Human Review Cost

**Human review cost** is the price of the person who judges quality. It is not in the generation cost and it can be much larger. Ten hours of subject-expert review at $90 an hour is $900, seventeen times the $53 generation cost. A quality-adjusted comparison that leaves it out has priced the book as though nobody had to read it.

#### Diagram: Cost per Textbook Calculator


<iframe src="../../sims/cost-per-textbook-calculator/main.html" width="100%" height="622px" scrolling="no"></iframe>
[Run Cost per Textbook Calculator Fullscreen](../../sims/cost-per-textbook-calculator/main.html)

<details markdown="1">
<summary>Cost per Textbook Calculator</summary>
Type: microsim
**sim-id:** cost-per-textbook-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/economics-course/tree/main/docs/sims/opportunity-cost-calculator<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the cost per textbook and the price at a stated margin to within 1 dollar for 3 scenarios.

**Prerequisites:** utilization rate, whole-book time estimate, cost per textbook, service price calculation, margin versus markup (all defined in this chapter and in Chapter 6).

**Evidence of Mastery:** For each of the 3 scenarios the learner types the cost per textbook and the price at the stated margin, in dollars, before the sim reveals the answers. A scenario is correct when both typed values are within $1 of the model values. Mastery is 3 of 3. Changing sliders in exploration is not evidence.

**Misconceptions:** (1) A faster model always lowers the cost per book. (2) The cost is set by the electricity. (3) A 20% margin means a 20% markup. (4) A machine's cost per book does not depend on how often it is used.

**Instructional Rationale:** Apply-level calculation needs a formula the learner commits to, and the three scenarios isolate the two inputs that move the answer most, utilization and the hours per book, so exploration can then confirm that hardware price moves it far less.

**Content:**

The learner can change five quantities:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Yearly cost | 2,000 | 20,000 | 25 | 8,275 | dollars a year |
| Utilization | 0.05 | 0.95 | 0.05 | 0.50 | share of 8,760 hours |
| Whole-book hours | 5 | 100 | 1 | 28 | hours |
| Margin | 0 | 0.50 | 0.05 | 0.20 | share of price |
| Chapters | 5 | 30 | 1 | 13 | chapters |

The three scenarios, in this order:

| # | Yearly cost | Utilization | Whole-book hours | Margin | Model cost per book | Model price | Feedback when wrong |
|---|---|---|---|---|---|---|---|
| 1 | 8,275 | 0.50 | 28 | 0.20 | $52.9 | $66.1 | 8,760 × 0.50 = 4,380 hours, $8,275 ÷ 4,380 = $1.89 an hour, × 28 = $52.9, ÷ 0.80 = $66.1. |
| 2 | 8,275 | 0.25 | 28 | 0.20 | $105.8 | $132.2 | 8,760 × 0.25 = 2,190 hours, $8,275 ÷ 2,190 = $3.78 an hour, × 28 = $105.8, ÷ 0.80 = $132.2. |
| 3 | 8,275 | 0.50 | 17 | 0.20 | $32.1 | $40.1 | $1.89 an hour × 17 = $32.1, ÷ 0.80 = $40.1. |

**Provenance:** The yearly cost, utilization, and whole-book hours are the reference and sensitivity values of the cost analysis page. The scenario 3 hours of 17 are the whole-book estimate for a mixture-of-experts model in that analysis. The sim labels them "estimate, not a measurement".

**Rules:** Generating hours = 8,760 × utilization. Cost per generating hour = yearly cost ÷ generating hours. Cost per book = whole-book hours × cost per generating hour. Price = cost per book ÷ (1 − margin). Cost per chapter = cost per book ÷ chapters. Books per year = generating hours ÷ whole-book hours, rounded down. Dollars are shown to one decimal.

**Learner Activity:**

1. The learner reads scenario 1, whose inputs are shown, and types the cost per book and the price.
2. The learner presses Check.
3. The sim reveals the model values and the Feedback text, and marks the scenario correct or missed.
4. After all three scenarios the exploration mode unlocks, with a readout of cost per chapter and books per year, and the learner changes any of the five quantities.
5. In exploration the learner should notice that halving utilization doubles the cost per book, and that a 10% change in yearly cost moves it by 10%.

**Feedback:** Three scenarios, fixed order, two attempts each. Correct: "Correct: cost $<value>, price $<value>." Incorrect: the "Feedback when wrong" text for that scenario. After the second wrong attempt the model values and the worked calculation are shown, and the scenario counts as missed. A running count "Scenarios correct: n of 3" is shown.

**Starting State:** Scenario 1 is shown with empty answer boxes and its inputs displayed, and the question on screen is "What does one textbook cost, and what must it sell for?"

**Chapter Anchors:** The chapter states $1.89 per generating hour, $52.92 per 28-hour book, $66.15 at a 20% margin, 156 books a year at 50% utilization, and that halving utilization doubles the cost per book.
</details>

## Deciding

### Run Report and Baseline Textbook

A **run report** is the summary of one run produced from its event stream: turns, tool calls, failed tool calls, tokens, and time. This project's `run_report.py` produces it, and it works on a run that is still going, which makes it the tool for deciding whether to wait or to stop one.

A **baseline textbook** is the comparison book generated by a cloud model under the same rules, and it is what lets a local result be judged against something. This evaluation has a reference book for scale and has not yet generated a baseline. Until it does, the report can state costs and structural results and cannot state a quality gap, and it says so.

### DGX Sufficiency Judgment

A **DGX sufficiency judgment** is the answer to the question the evaluation was set up to ask: is this machine, with these models and this harness, enough to generate the textbook? It is a judgment and not a calculation, and it should be made against criteria written down before the data arrived.

The criteria this evaluation can state are concrete. Does at least one model complete all three stages without a fault that makes the output unusable? Does it do so within a time and cost the user can accept? Does the quality, once reviewed, meet the standard the course sets? The honest answer at any given moment can be that the first is established, the second is estimated, and the third is not yet known, and a report says which.

!!! mascot-thinking "Sufficient Is a Threshold You Set, Not a Number You Find"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A machine is sufficient for a purpose, and the purpose has to say how fast, how good, and at what cost. Write the thresholds down first. If you decide what counts as enough after seeing what the machine can do, the answer is always yes.

### Evaluation Report and Report Structure

An **evaluation report** is the document that carries the evaluation to a reader who was not there. A **report structure** is the order of its parts, and the five parts below are the ones that let a reader judge the conclusion for themselves.

| Part | What it states | The question a reader asks of it |
|---|---|---|
| Question | What was being evaluated, for whom | Is this my question? |
| Method | The design: variables, inputs, runs, metrics | Could I repeat it, and was it fair? |
| Results | What was measured, with the assumed marked | What actually happened? |
| Limitations | What the results do not show | How far can I trust this? |
| Recommendation | Local, cloud, or hybrid, and the conditions | What should I do? |

The order matters. A reader who meets the recommendation before the method has nothing to judge it with, and a report that puts limitations at the end after a confident recommendation has buried the part that tempers it.

### Recommendation and the Local, Cloud, or Hybrid Decision

A **recommendation** is the action the evidence supports, stated with its conditions. The **local, cloud, or hybrid decision** is its most common form for this course: which of the three workflows to adopt for textbook generation, or which parts of the workflow go where.

The decision follows from the evidence in a way that can be written as rules, and the rules are better than the verdict, because a reader can apply them to their own circumstances. The table gives the structure, with the evidence it needs, and an illustrative reading from this evaluation's provisional results.

| If the evidence shows | Then the recommendation leans |
|---|---|
| A local model completes every stage, at a cost per book below the service price, and review finds the quality acceptable | Local |
| No local model completes a stage that the skills need | Cloud for that stage |
| Local completes the high-volume or sensitive stages and fails a hard one | Hybrid, routed by stage |
| Quality is acceptable and the cost depends on utilization the user cannot reach | Cloud, or a shared unit |

An illustrative reading, and not a conclusion, uses the first round's pattern. Several models completed the learning-graph and chapter-structure stages, and the stage that exposed capability differences was the chapter text. That pattern would point to a hybrid workflow: the structural stages local, with a stronger model for the hard prose, until a local model's prose is reviewed and shown to be acceptable. It is provisional, because every result is one run and no human review has been finished.

!!! mascot-encourage "Writing the Recommendation Is the Hard Part, and That Is Normal"
    ![Tera encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    After all the measuring, a recommendation can feel like a leap, and it is meant to. If the evidence is mixed, say so and state the conditions under which each answer holds. A recommendation that says "local for this, cloud for that, and here is what would change my mind" is a good one.

## Chapter Summary

Failure diagnosis starts from the event stream and asks what the evidence rules out. A text-emitted tool call ends a run after one turn, a malformed one is recoverable, premature termination and task loss leave no work behind, context overflow shows as forgetting late in a run, and a failure identical for every model at the first turn is a configuration fault. A failure in stage 3 can be a symptom of stage 2. The cost of a book comes from the whole-book time estimate, itself an assumption about the unrun stages, times the cost of a generating hour, and quality adjusts it for how much was usable, while human review is a separate and larger cost. The report states the question, method, results, limitations, and recommendation in that order, and the recommendation is a set of conditions and not a verdict.

!!! mascot-celebration "From Run Logs to a Defensible Recommendation"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now diagnose a failed run from its evidence, compute cost and energy per book, adjust for quality, and structure a report whose recommendation states its conditions. Chapter 23 makes that report safe to publish.

[See Annotated References](./references.md)
