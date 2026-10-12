---
title: "Open-Weight Model Families and Candidate Models"
description: "The open-weight model families a DGX evaluator will meet and the ten candidates this evaluation tested, with where each came from, why it was included, and what its first round showed."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:16:28"
version: 1.11
---

# Open-Weight Model Families and Candidate Models

## Summary

This chapter introduces the model families and the ten candidates under evaluation. It records what each family offers, where each candidate comes from, and why each was included or excluded. Students finish able to justify the candidate list with evidence rather than reputation.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Qwen Family | 3 |
| Gemma Family | 3 |
| Mistral Family | 3 |
| Nemotron Family | 2 |
| gpt-oss Family | 2 |
| Granite Family | 2 |
| Llama Family | 1 |
| Phi Family | 1 |
| devstral-small-2:24b | 1 |
| qwen3.6:35b | 1 |
| gemma4:26b | 1 |
| nemotron-3.5-lightning:30b | 1 |
| mistral-medium-3.5:128b | 1 |
| gpt-oss:120b | 1 |
| granite4.2:30b | 1 |
| qwen3.8:27b | 1 |
| gemma4:31b | 1 |
| muse-glimmer:30b | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 11: Model Sizing and Fit](../11-model-sizing-and-fit/index.md)
- [Chapter 12: Selecting and Downloading an Open-Weight Model](../12-selecting-downloading-models/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)

---

!!! mascot-welcome "Ten Candidates, Each With a Reason"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A list of model names tells you nothing until each one has a reason attached. By the end of this chapter you will be able to say, for every candidate in this evaluation, where it came from, why it was chosen, and what the first round of testing showed. Measure first, then decide!

## What This Chapter Covers

Chapter 12 gave you the criteria for choosing a model, and this chapter shows the criteria applied. It introduces the model families that publish open-weight models, then the ten candidates this evaluation tested, with the reason for each and the first-round result.

Two cautions apply to everything here. The first is that these are measurements from one set of runs, on one kind of machine, with one run of each test, and they are provisional. The second is that the model landscape changes within months, so the specific names will date. The reasoning the chapter models, which is a claim, a test, and a result for each candidate, is the part meant to last.

## The Families

A **model family** is a series of models from one publisher that share a design lineage and a naming scheme. Members of a family usually differ in size and in whether they are specialized for code or for general use. Knowing the family tells you what to expect about licensing, tool-calling support, and how sizes relate to each other.

### Qwen, Gemma, and Mistral

The **Qwen family** comes from Alibaba. Its recent releases are aimed at long agent tasks and tool use, and a mid-2026 survey reported Qwen models holding most of the top places on a public function-calling leaderboard. It spans dense models and mixture-of-experts models. Two candidates are here: `qwen3.8:27b` and `qwen3.6:35b`.

The **Gemma family** comes from Google. It is offered in sizes that fit a single machine, with both a dense model and a mixture-of-experts model at similar total size in the Gemma 4 release, which makes a clean comparison of the two designs. Two candidates are here: `gemma4:26b` and `gemma4:31b`.

The **Mistral family** comes from Mistral AI, a French company. It includes a large dense general model and a smaller one built for coding agents. Two candidates are here: `mistral-medium-3.5:128b` and `devstral-small-2:24b`.

### Nemotron, gpt-oss, and Granite

The **Nemotron family** comes from NVIDIA, which also makes the hardware. Its models are positioned for agents and for efficient throughput, and its newer releases use mixture-of-experts designs with a very long context window. One candidate is here: `nemotron-3.5-lightning:30b`.

The **gpt-oss family** comes from OpenAI, and it is the company's open-weight release. It is a mixture-of-experts model released with function calling, structured output, and adjustable reasoning effort. One candidate is here: `gpt-oss:120b`.

The **Granite family** comes from IBM. It is positioned for enterprise use, with a plain Apache 2.0 license, structured output, and documentation of its training data governance. One candidate is here: `granite4.2:30b`.

### Llama and Phi

The **Llama family** is Meta's long-running open-weight line, and the one most tutorials were written for. None of the ten candidates carries the Llama name. The one Meta model on the list, `muse-glimmer:30b`, is a newer line that its publisher describes as built for local agents.

The **Phi family** is Microsoft's line of small models, designed to give strong results at a size that fits modest hardware. None of the ten candidates is a Phi model, because the benchmark's long skills and 64,000-token minimum favored larger models. A reader with less memory would start here.

| Family | Publisher | Candidates in this evaluation |
|---|---|---|
| Qwen | Alibaba | `qwen3.8:27b`, `qwen3.6:35b` |
| Gemma | Google | `gemma4:26b`, `gemma4:31b` |
| Mistral | Mistral AI | `mistral-medium-3.5:128b`, `devstral-small-2:24b` |
| Nemotron | NVIDIA | `nemotron-3.5-lightning:30b` |
| gpt-oss | OpenAI | `gpt-oss:120b` |
| Granite | IBM | `granite4.2:30b` |
| Llama | Meta | None |
| Phi | Microsoft | None |

The one remaining candidate, `muse-glimmer:30b`, is from Meta and is listed with the candidates below.

## The Ten Candidates

Each entry gives the claim that put the model on the list and what the first round of testing found. The first round was one run of each test, so a result is a first observation, not a verdict.

### The Qwen Candidates

**`qwen3.8:27b`** is the newest Qwen release and is described by its publisher as improved for long-running agent tasks. It produced the cleanest learning graph of the first stage, with exactly 200 concepts, no cycles, and no duplicate labels. It took 102 minutes where the five others that finished took 6 to 22, because the server re-read almost the whole conversation on every turn. In the later chapter-writing stage it was too slow to finish a chapter inside 90 minutes.

**`qwen3.6:35b`** is the release before it, in a larger mixture-of-experts form with about 3 billion parameters active for each token. It was the best combination of speed and correctness in the first round: 83 to 105 tokens per second and a learning graph in 22 minutes with every file present. The graph is looser than the Qwen 3.8 one, with 19 concepts that have no prerequisite.

### The Gemma Candidates

**`gemma4:31b`** is a dense model of 30.7 billion parameters and the most consistent rule-follower in the tests. It passed every model-only rule twice and ended every smoke run with a site that builds. It ran at 28 to 40 tokens per second. Its first learning-graph attempt was lost when a machine froze at a context setting that is now treated as unsafe, and its second finished in 21 minutes without the taxonomy page or the navigation entries.

**`gemma4:26b`** is the mixture-of-experts sibling, with 25.2 billion parameters and 3.8 billion active. It was the fastest model tested at 86 to 130 tokens per second, and it finished the learning graph in under six minutes. That graph has 40 duplicate concept labels out of 200, which is a serious flaw. A model this fast can afford a second attempt, but something has to notice that one is needed.

### The Mistral Candidates

**`mistral-medium-3.5:128b`** is a dense model of 128 billion parameters, promoted for instruction and system-prompt adherence. It loaded and ran, at 3 tokens per second, and used 88 GiB at a 32,000-token context, so no context of 64,000 tokens or more would fit. On one unit of this hardware it is not usable.

**`devstral-small-2:24b`** is built to drive software-engineering agents and has a 384,000-token window in a 15 GB download. It did no work in either harness test: both times it wrote its first tool call as plain text, the harness saw no tool call, and the run ended after one turn.

### The Remaining Candidates

**`nemotron-3.5-lightning:30b`** is NVIDIA's model for always-on agents, with 3 billion active parameters and a one-million-token context window. It was as fast as claimed, at 84 to 105 tokens per second, and finished the learning graph in 18 minutes with 199 concepts, one short of the 200 asked for. It made 140 tool calls, nearly three times as many as any other model.

**`gpt-oss:120b`** is the largest model that still ran at a usable speed, at 38 to 44 tokens per second, because only about 5 billion of its 117 billion parameters are active. It finished the learning graph in 17 minutes with every tool call succeeding, and the graph is thin: 19 concepts connected to nothing. In one run it printed a tool call as plain text.

**`granite4.2:30b`** is the conservative choice, with a plain Apache 2.0 license and structured-output support. It was too slow to finish: 12 tokens per second, and it was stopped at the 150-minute limit having produced only the concept list.

**`muse-glimmer:30b`** is Meta's model, positioned around instruction following and recovery in unattended agent runs. It lost the task after a few steps in the harness, which looks like a context problem: its first prompt took 35,000 tokens where the others took 17,000 to 21,000.

## The First Round at a Glance

The table gathers the first-round measurements. It is the answer to the question this chapter began with, and it is also a reminder of how much of the ordering a single stage could not have predicted.

| Model | Parameters | Download | Speed (tokens/s) | First-stage result |
|---|---|---|---|---|
| `qwen3.8:27b` | 27 billion | 17 GB | 26 | 200 concepts in 102 minutes, no structural fault |
| `gemma4:31b` | 30.7 billion, dense | 20 GB | 28–40 | 200 concepts in 21 minutes, two files missing |
| `muse-glimmer:30b` | 30 billion | 18 GB | 13 | No graph; lost the task |
| `qwen3.6:35b` | 35 billion, about 3 active | 22 GB | 83–105 | 200 concepts in 22 minutes, 19 without prerequisites |
| `gemma4:26b` | 25.2 billion, 3.8 active | 18 GB | 86–130 | 200 concepts in under 6 minutes, 40 duplicate labels |
| `nemotron-3.5-lightning:30b` | 30 billion, 3 active | 25 GB | 84–105 | 199 concepts in 18 minutes |
| `mistral-medium-3.5:128b` | 128 billion, dense | 80 GB | 3 | Not run; no usable context fits |
| `gpt-oss:120b` | 117 billion, 5.1 active | 65 GB | 38–44 | 200 concepts in 17 minutes, 19 unconnected |
| `devstral-small-2:24b` | 24 billion | 15 GB | 15 | No graph; tool call written as text |
| `granite4.2:30b` | about 30 billion, dense | 17 GB | 12 | Stopped at 150 minutes; concept list only |

The speed for `qwen3.8:27b` was measured on one long turn and is not a range, and the speeds of the three models with a failed first stage come from the model-only test.

!!! mascot-warning "One Run Is an Observation, Not a Ranking"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Every figure in this table comes from a single attempt, and a model that failed once may succeed on a second try, as one candidate did after its skill was corrected. Treat the first round as a way to decide what to test further, and repeat a run before you write a sentence that begins "model X cannot".

#### Diagram: Candidate Model Explorer


<iframe src="../../sims/candidate-model-explorer/main.html" width="100%" height="752px" scrolling="no"></iframe>
[Run Candidate Model Explorer Fullscreen](../../sims/candidate-model-explorer/main.html)

<details markdown="1">
<summary>Candidate Model Explorer</summary>
Type: chart
**sim-id:** candidate-model-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/tracking-ai-course/tree/main/docs/sims/lm-arena-timeline<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the ten candidate models on parameter count, generation speed, and download size by answering 5 questions from a bubble chart, with at least 4 of 5 correct.

**Prerequisites:** dense model, mixture of experts, active parameters, tokens per second, model download (all defined in Chapters 11 and 12 and in this chapter).

**Evidence of Mastery:** For each of the 5 questions the learner selects one model from the ten before the sim reveals the answer. A selection is correct when it equals the Correct model column. Mastery is 4 of 5 correct on the first attempt. Hovering over a bubble to read its values is exploration, not evidence.

**Misconceptions:** (1) A bigger model is a faster model. (2) A bigger download means more parameters. (3) A mixture-of-experts model needs less memory. (4) The model with the most parameters is the best choice.

**Instructional Rationale:** Analyze-level comparing needs the learner to hold several dimensions at once, so a bubble chart places parameters, speed, and download size together, and questions that need two dimensions at a time prevent a single-dimension answer.

**Content:**

The chart plots each of ten models as a bubble. The horizontal position is the parameter count in billions, the vertical position is the generation speed in tokens per second, and the bubble's size is the download size in gigabytes.

| Model | Parameters (billions) | Speed (tokens/s) | Download (GB) |
|---|---|---|---|
| `qwen3.8:27b` | 27 | 26 | 17 |
| `gemma4:31b` | 30.7 | 34 | 20 |
| `muse-glimmer:30b` | 30 | 13 | 18 |
| `qwen3.6:35b` | 35 | 94 | 22 |
| `gemma4:26b` | 25.2 | 108 | 18 |
| `nemotron-3.5-lightning:30b` | 30 | 95 | 25 |
| `mistral-medium-3.5:128b` | 128 | 3 | 80 |
| `gpt-oss:120b` | 117 | 41 | 65 |
| `devstral-small-2:24b` | 24 | 15 | 15 |
| `granite4.2:30b` | 30 | 12 | 17 |

The five questions:

| # | Question shown to the learner | Correct model | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which model has the highest generation speed? | `gemma4:26b` | At 108 tokens per second it is the highest point on the chart. |
| 2 | Which model has the largest download? | `mistral-medium-3.5:128b` | At 80 GB it is the largest bubble. |
| 3 | Among models faster than 80 tokens per second, which has the largest download? | `nemotron-3.5-lightning:30b` | The three above 80 are 18, 22, and 25 GB, and 25 GB is the largest. |
| 4 | Which model has more than 100 billion parameters and runs faster than 30 tokens per second? | `gpt-oss:120b` | It has 117 billion parameters at 41 tokens per second, and the other model above 100 billion runs at 3. |
| 5 | Which model has the fewest parameters? | `devstral-small-2:24b` | At 24 billion it is the leftmost bubble. |

**Provenance:** The values are the midpoints of the measured ranges in this chapter's table, rounded to whole tokens per second, and the sim labels them "measured, one run each, provisional". The speed for `qwen3.8:27b` was measured on one long turn. The speeds for `muse-glimmer:30b`, `devstral-small-2:24b`, `granite4.2:30b`, and `mistral-medium-3.5:128b` come from the model-only test.

**Rules:** Questions are shown in the fixed order 1 to 5. Each allows one final choice among the ten models. Exactly one model is correct for each question under the data in Content.

**Learner Activity:**

1. The learner hovers over bubbles to read each model's three values.
2. The learner reads question 1 and clicks the bubble for the model they choose, then confirms.
3. The sim shows the correct model and the Why text, and marks the question correct or incorrect.
4. The learner repeats for questions 2 to 5. After question 5 the sim shows the score and the misconception behind each miss.

**Feedback:** Five questions, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct model and the Why text. The final score reads "n of 5 correct".

**Starting State:** The chart is shown with all ten bubbles, no question answered, and the instruction on screen is "Hover over a bubble to read its values".

**Chapter Anchors:** The chapter states a fastest speed of 108 tokens per second for `gemma4:26b`, an 80 GB download for `mistral-medium-3.5:128b`, 117 billion parameters at about 41 tokens per second for `gpt-oss:120b`, and 3 tokens per second for the 128-billion-parameter model.
</details>

## Chapter Summary

Eight families publish the open-weight models a DGX evaluator is likely to meet, and ten candidates from six of them were tested. Each had a claim that put it on the list and a first-round result that qualified the claim: the model built for agents was the cleanest and the slowest, the fastest model wrote a graph with duplicate labels, the largest dense model did not fit with a usable context, and two models wrote their tool calls as text and did no work at all. None of that could have been read from a name, a size, or a leaderboard.

!!! mascot-celebration "Every Name Now Has a Reason"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now say where each of the ten candidates came from, why it was tested, and what the first round showed, and you know that each number is one observation and not a ranking. Chapter 15 measures why the same model can be fast in one test and slow in another.

[See Annotated References](./references.md)
