---
title: "Small Language Models"
description: "What a language model is, how tokens, parameters, and context windows work, how a small model differs from a frontier model, and the abilities textbook generation demands."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 21:19:43"
version: 1.11
---

# Small Language Models

## Summary

This chapter defines small language models and what separates them from frontier models. It explains tokens, parameters, context windows, open weights, and licenses, and names the capabilities that textbook generation demands: long-form writing, structured output, tool calling, and code generation. Students finish able to state precisely what a small language model is and what it must do to be a viable generator.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Open-Source License | 12 |
| Generative AI Model | 2364 |
| Large Language Model | 1035 |
| Parameter Count | 591 |
| Inference | 556 |
| Token | 101 |
| Open-Weight Model | 62 |
| Model Family | 18 |
| Small Language Model | 386 |
| Structured Output | 214 |
| Context Window | 68 |
| Frontier Model | 19 |
| Model Card | 10 |
| Model License Terms | 9 |
| Long-Form Writing | 3 |
| Code Generation | 3 |
| Tokenizer | 2 |
| Instruction Following | 2 |
| Multimodal Model | 2 |
| Reasoning Mode | 1 |
| Tool Calling | 205 |
| Image Input | 1 |
| Tokens per Word | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)

---

!!! mascot-welcome "Meet the Thing Being Measured"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Everything in this course is measured against a language model, so this chapter makes sure you know exactly what one is. By the end you will be able to define a small language model, estimate whether a document fits in its memory of a conversation, and name the five abilities that textbook generation demands. Measure first, then decide!

## What This Chapter Covers

Chapter 1 gave you the textbook and Chapter 2 gave you its data structure. This chapter turns to the machine that has to write it. It begins with the vocabulary of language models: what they are, how they read text in tokens, and what the numbers attached to them, such as parameter count and context window, actually mean. It then separates a small language model from a frontier model, explains what open weights and licenses allow, and ends with the capabilities that the benchmark workload exercises.

Several of these ideas are quantitative, and they come back repeatedly. Parameter count reappears in Chapter 11 when it is converted into gigabytes, and the context window decides what a harness can load in Chapter 16. Learning them precisely here costs less than re-deriving them later.

## Language Models From the Ground Up

### Generative AI Model

A **generative AI model** is a trained program that produces new content, such as text, images, code, or audio, in response to an input. It learned statistical patterns from a large body of training data, and it generates by applying those patterns to produce output that is plausible given the input. This course concerns only models that generate text.

The contrast with a classifier makes the definition concrete. A **classifier** maps an input to one label from a fixed set. A generative model produces open-ended output, so there is no fixed list of possible answers. Consider the same email handled both ways.

| | Classifier | Generative model |
|---|---|---|
| Input | The text of an email | The text of an email and an instruction |
| Output | One label: `spam` or `not spam` | Any text: a summary, a reply, a rewrite |
| Possible outputs | Two | Effectively unlimited |
| Failure mode | Wrong label | Fluent text that is wrong or off-task |

The last row is the important one for this course. A classifier's mistakes are bounded: there are only two labels to get wrong. A generative model's mistakes are not, which is why measuring one needs the careful design that Chapters 19 and 20 teach.

### Large Language Model

A **large language model**, abbreviated LLM, is a generative AI model trained on very large amounts of text to predict what text comes next. It is a neural network, a program built from many layers of simple numeric operations, whose behavior is determined by a very large set of learned numbers. The word "large" refers to the number of those numbers and the amount of text used in training.

The core mechanism is one repeated step. Given the text so far, the model assigns a probability to every possible next piece of text. A piece is chosen, appended to the text, and the process repeats until a stop condition is met. The table shows one step of that process for the input "The capital of France is". The probabilities are illustrative.

| Candidate next piece | Illustrative probability |
|---|---|
| ` Paris` | 0.92 |
| ` a` | 0.02 |
| ` the` | 0.01 |
| ` located` | 0.01 |
| all other candidates combined | 0.04 |

If the model always takes the highest-probability piece, its output is repeatable; if it samples in proportion to the probabilities, the output varies from run to run. Chapter 15 covers the settings that control this. What matters here is the mechanism: a language model writes one piece at a time, and every piece depends on everything before it.

One consequence is easy to miss. Everything a model knows was fixed when training ended, and during use it sees only the text it is given. It cannot look at your files, your machine, or yesterday's news unless that text is placed in its input. This is why the tools and harnesses of Chapters 16 and 17 exist: they are how a model gets to see, and act on, anything outside its prompt.

!!! mascot-thinking "Everything Else Is Built on This Loop"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A language model that writes a chapter, fills a JSON file, or calls a tool is doing the same thing at each step: choosing the next piece of text. That explains both its fluency and its failures, because a mistake early in the output is never revisited, only built upon.

### Token

A **token** is the unit of text a language model reads and writes. A token is usually a whole common word, a piece of a longer or rarer word, a number, or a punctuation mark. Models do not see letters or whole sentences; they see a sequence of tokens, each identified by a number.

Rare words split into several tokens, so a sentence's token count is not its word count. The split below is illustrative, because the exact pieces depend on the model.

```text
Sentence:  Quantization shrinks models.
Tokens:    Quant | ization |  shr | inks |  models | .
Count:     6 tokens for 3 words
```

The same text can have a different token count under a different model, because each model has its own vocabulary of pieces. Counting tokens is therefore always relative to a particular model. That component is the next concept.

### Tokenizer

A **tokenizer** is the component that converts text into tokens before the model reads it, and converts tokens back into text afterwards. It uses a fixed vocabulary learned alongside the model, and it is not interchangeable between models: text tokenized for one model must be decoded with the same tokenizer. The tokenizer also decides how efficiently a model handles different kinds of text.

!!! mascot-tip "Count With the Model's Own Tokenizer"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A words-to-tokens ratio is a good planning estimate, but the budget that matters is the one the model's own tokenizer reports. Run the real text through it before you commit to a context size; the gap grows for code, numbers, and non-English text.

### Tokens per Word

**Tokens per word** is the average number of tokens produced per word of ordinary English prose. A common planning figure is about 1.33 tokens per word, which is the same as saying about three-quarters of a word per token. This book's cost model uses 1.33, so a 55,000-word book is about 73,000 tokens.

The figure is an estimate with a known direction of error. Text full of code, identifiers, numbers, or technical terms produces more tokens per word, so the 1.33 figure understates it. Use it for planning, and use the real tokenizer for decisions.

### Context Window

The **context window** is the maximum number of tokens a model can consider at one time, counting both the text it is given and the text it generates. When a conversation grows past the window, something has to be dropped or the request fails. The window is a hard limit, and it is measured in tokens, not words. In a multi-turn session it is also a running total: each new turn adds the earlier conversation, every file the model has read, and every result a tool returned, so a long agent session fills the window faster than a single prompt would suggest.

A worked example shows the arithmetic. Suppose a model has an 8,000-token window and you give it a 5,000-word document to summarize and expect a reply of up to 2,000 tokens. The document is about 5,000 × 1.33 = 6,650 tokens. Add the reply's room and you need about 8,650 tokens, which is more than 8,000. The document fits by itself, and the task does not.

The following table lists the context windows of five of this evaluation's candidate models, as their publishers report them. They span nearly an order of magnitude.

| Model | Context window (tokens) |
|---|---|
| `devstral-small-2:24b` | 384,000 |
| `nemotron-3.5-lightning:30b` | 1,000,000 |
| `qwen3.8:27b` | 256,000 |
| `gemma4:26b` | 128,000 |
| `gpt-oss:120b` | 128,000 |

A larger window is not free. Chapter 11 shows that a longer context takes memory from the same pool as the model's weights, so the largest advertised window is often not the largest usable one. The exercise below drills the arithmetic you just saw.

#### Diagram: Words to Tokens Estimator


<iframe src="../../sims/words-to-tokens-estimator/main.html" width="100%" height="588px" scrolling="no"></iframe>
[Run Words to Tokens Estimator Fullscreen](../../sims/words-to-tokens-estimator/main.html)

<details markdown="1">
<summary>Words to Tokens Estimator</summary>
Type: microsim
**sim-id:** words-to-tokens-estimator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/Digital-Transformation-with-AI-Spring-2026/tree/main/docs/sims/tokenization-process<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the estimated token count of a document from its word count and decide whether the document and a 2,000-token reply fit in a given context window, correct on at least 5 of 6 items.

**Prerequisites:** token, tokens per word, context window (all defined in the sections "Token", "Tokens per Word", and "Context Window" above this block).

**Evidence of Mastery:** For each item the learner enters an estimated token count and then chooses "Fits" or "Does not fit" before the sim reveals the answer. An item is correct when the entry is within 1% of the value in the Estimated tokens column and the choice equals the Answer column. Mastery is 5 of 6 correct. Reading the reference formula is exploration, not evidence.

**Misconceptions:** (1) A token is a word, so the token count equals the word count. (2) The context window holds only the document, and the reply does not count against it. (3) A document that fits by itself also fits with the reply. (4) A model with a larger window can always use all of it.

**Instructional Rationale:** Apply-level calculation needs a procedure carried to a decision, so the learner converts words to tokens and then compares to a limit. Items are ordered so that item 2 fits before the reply is added and does not fit after, which makes the second misconception visible.

**Content:**

The formula shown to the learner is: estimated tokens = words × 1.33. The reserved reply is always 2,000 tokens. An item fits when estimated tokens + 2,000 is less than or equal to the window. The sim labels all numbers "illustrative".

| # | Document (words) | Window (tokens) | Estimated tokens | Estimated tokens + 2,000 | Answer | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 1 | 1,000 | 8,000 | 1,330 | 3,330 | Fits | 3,330 is below 8,000, so there is room to spare. |
| 2 | 5,000 | 8,000 | 6,650 | 8,650 | Does not fit | The document alone is 6,650 tokens, but with the 2,000-token reply the total is 8,650, which is over 8,000. |
| 3 | 4,000 | 8,000 | 5,320 | 7,320 | Fits | 7,320 is below 8,000, so the reply also fits. |
| 4 | 55,000 | 128,000 | 73,150 | 75,150 | Fits | 75,150 is below 128,000, so a whole book of this size fits. |
| 5 | 95,000 | 128,000 | 126,350 | 128,350 | Does not fit | The document alone is under the window, but 128,350 is over 128,000 by 350 tokens. |
| 6 | 95,000 | 256,000 | 126,350 | 128,350 | Fits | The same document fits easily in a 256,000-token window. |

**Provenance:** The tokens-per-word figure of 1.33 and the 55,000-word book size are the values used in this book's cost model (cost analysis page). The documents, windows, and reply size are illustrative and invented for this exercise.

**Rules:** Estimated tokens = words × 1.33, so 1,000 words is 1,330 tokens. The word count entry is fixed per item and not adjustable. The learner's token entry is a whole number from 0 to 300,000 with step 1, and the default is empty. The entry is correct when it is within 1% of the Estimated tokens value. Fit rule: Estimated tokens + 2,000 <= window.

**Learner Activity:**

1. The learner sees item 1: a document's word count and a window size.
2. The learner enters an estimated token count and chooses "Fits" or "Does not fit", then confirms.
3. The sim reveals the model value, the total with the reply, the correct choice, and the Why text, and marks the item correct or incorrect.
4. The learner repeats for items 2 to 6. After item 6 the sim shows the score and the misconception behind each missed item.

**Feedback:** Six items, fixed order, one confirmed answer each, and the answer is final. An item is correct only when both the entry and the choice are correct. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the model value, the correct choice, and the Why text. The final score reads "n of 6 correct".

**Starting State:** Item 1 is shown with an empty entry and no choice, and the question on screen is "How many tokens is this, and does it fit?"

**Chapter Anchors:** The chapter states that tokens per word is about 1.33, that the context window counts both the text given and the text generated, that a 5,000-word document in an 8,000-token window with a 2,000-token reply needs about 8,650 tokens and does not fit, and that a 55,000-word book is about 73,000 tokens.
</details>

### Parameter Count

A **parameter** is one of the learned numbers inside a model, and the **parameter count** is how many there are. It is the usual measure of a model's size. A model described as 27B has 27 billion parameters, which is 27,000,000,000 separate numbers that were adjusted during training and are fixed at the time you use it.

Parameter count is the main driver of two practical quantities. The first is memory: every parameter must be held in memory to run the model, so more parameters means more memory, a conversion Chapter 11 performs exactly. The second is the work per token: a model with more parameters generally does more arithmetic for each token it produces and so, other things equal, generates more slowly.

The five models below show the range this evaluation covers. Parameter counts are as the publishers report them.

| Model | Parameters | Relative to the smallest |
|---|---|---|
| `devstral-small-2:24b` | 24 billion | 1.0 times |
| `qwen3.8:27b` | 27 billion | 1.1 times |
| `gemma4:31b` | 30.7 billion | 1.3 times |
| `gpt-oss:120b` | 117 billion | 4.9 times |
| `mistral-medium-3.5:128b` | 128 billion | 5.3 times |

!!! mascot-warning "Size Is a Cost, Not a Score"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Parameter count tells you what a model costs to hold and run. It does not tell you how well it writes or follows a skill, and a smaller model can outperform a larger one on a given task. Treat the number as an input to the memory calculation and let a measurement decide quality.

Some models report two counts, a total and a smaller number that is active for each token. The distinction between dense and mixture-of-experts models is part of Chapter 11, and it explains why `gpt-oss:120b` in the table can run fast despite its size.

### Inference

**Inference** is the act of running a trained model to produce output. It is distinct from **training**, which is the process that created the model's parameters from data. A model is trained once, at great expense, and then used for inference many times. This course evaluates inference only; training and fine-tuning are out of scope.

Inference happens in two phases. First the model reads the whole prompt, which can be processed in parallel. Then it generates the reply one token at a time, and each new token requires another pass through the network. Output length therefore dominates the time a long generation takes. As an illustration, generating 1,000 tokens at 20 tokens per second takes 50 seconds, and a 10,000-token chapter takes 500 seconds at the same rate. The rate here is invented to show the arithmetic; Chapter 15 measures real ones.

| | Training | Inference |
|---|---|---|
| What it does | Creates the parameters from data | Uses fixed parameters to produce output |
| How often | Once per model version | Every time the model is used |
| Hardware demand | Very large clusters | One machine can be enough |
| In this course | Out of scope | The whole subject |

## Small Models and Open Weights

### Small Language Model

A **small language model**, abbreviated SLM, is a language model small enough to run on a single machine you control. There is no universal parameter threshold, and the boundary moves as hardware improves. This course uses a working definition tied to the machine under test: a model that fits in the memory of one DGX system and can be served from it.

Under that definition the candidates in this evaluation range from 24 billion to 128 billion parameters, large by the standard of older "small" models and small next to the largest frontier systems. What makes a model an SLM in this course is not an absolute size but a circumstance: you can download it, run it on hardware you own, and keep every token on that machine.

The working definition has two parts, and a model can pass one and fail the other. Consider two candidates from this evaluation's first round on one DGX unit with 128 GB of memory. Each can be downloaded and loaded, so each meets the first test of being open-weight and local.

| Model | Download | Result on one unit | Usable as an SLM here? |
|---|---|---|---|
| `qwen3.8:27b` | 17 GB | Completed the first benchmark stage | Yes |
| `mistral-medium-3.5:128b` | 80 GB | Loaded and ran at 3 tokens per second; no context of 64,000 tokens or more fit | No |

The second model is a language model you can own, and on this machine it is not a small one in the sense that matters. The definition is relative to the hardware, so the answer for the same model could change on a larger system.

### Frontier Model

A **frontier model** is one of the most capable models available at a given time, typically operated by a leading AI lab and offered as a cloud service. Its weights are usually not released and its size is often not disclosed. "Frontier" is a moving target: a model leaves the frontier when a newer one surpasses it.

The comparison below is the one this course returns to throughout. It is a summary of definitions already given, not a verdict on quality.

| | Small language model | Frontier model |
|---|---|---|
| Where it runs | On hardware you own | On the provider's servers |
| Weights available | Yes, downloadable | Typically no |
| Size | Known | Often undisclosed |
| Typical access | Local endpoint | Cloud API or subscription |
| Who controls the version | You | The provider |

Chapter 4 treats the practical consequences of each row, including the capability gap that the table does not state.

### Open-Weight Model

An **open-weight model** is a model whose trained parameters are published for anyone to download and run. Having the weights lets you run the model locally and inspect or fine-tune it. It does not necessarily mean that the training data, the training code, or the right to do anything you like with the weights are also public.

A typical open-weight release is a folder of files rather than a service. It holds the weights, usually as one or more large files; the tokenizer files; a small configuration file that describes the model's shape; and a model card with the license, which a later section covers. The weights dominate the size, so a 27-billion-parameter model is a download of tens of gigabytes.

The term is often confused with "open source", so the distinction deserves its own comparison.

| | Closed model | Open-weight model | Open-source model |
|---|---|---|---|
| Weights downloadable | No | Yes | Yes |
| Training data and code published | No | Usually not | Yes |
| Runs on your hardware | No | Yes | Yes |
| Use is governed by | Provider terms of service | A model license | An open-source license |

!!! mascot-warning "Open Weights Are Not a Blank Check"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Being able to download a model does not mean you may use it for any purpose. Each model ships with a license that can limit commercial use, and a model's own page sometimes states none at all. Read the license before you build a workflow on a model, and record what it says.

### Open-Source License

An **open-source license** is a license that grants anyone the right to use, modify, and redistribute software, subject to stated conditions. Permissive licenses, such as Apache 2.0 and MIT, impose few conditions; others require that changes be shared. The defining feature is that the rights granted are broad and the conditions are published and uniform.

### Model License Terms

**Model license terms** are the conditions attached to a specific model's weights. They may be a standard open-source license, or they may be a custom or modified one that restricts use. One candidate in this evaluation is released under a modified MIT license that allows commercial use but carves out an exception for companies with large revenue. Another candidate's page does not state a license at all.

Three questions apply to every model. Is commercial use allowed? Are there size or revenue exceptions? And is the license actually stated by the publisher or only reported by a third party? In this evaluation, a license that a publisher's page reports without independent verification is recorded as "reported", not as confirmed.

### Model Family

A **model family** is a group of related models from one publisher that share a design and training lineage and differ in size or specialization. The two `gemma4` models in this evaluation, `gemma4:26b` and `gemma4:31b`, belong to one family. Families matter because the behavior you measured in one member is a reasonable, though not certain, guide to the others. Chapter 14 surveys the families behind this evaluation's candidates.

### Model Card

A **model card** is the document a publisher releases with a model, describing what it is for, how it was trained, how it performed on benchmarks, and what its limits and license are. It is the primary source for the facts in this section, and also the source of claims the publisher makes about its own model.

!!! mascot-tip "Read the Card Like a Marketing Page With Facts In It"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A model card is the fastest way to learn size, window, and license, so read those fields first and trust them. Treat the benchmark scores and strength claims as the publisher's own, to be tested, and never carry them into your report as measured results.

## What Textbook Generation Demands

The benchmark workload exercises a short list of abilities. Each is defined here, because Chapters 12 through 22 ask a model to demonstrate them and score the result.

### Instruction Following

**Instruction following** is a model's ability to do what a prompt or a document of instructions says, including the constraints, in the order given. A skill file that runs past a thousand lines is a long instruction, and a model that drifts from it produces a book that violates the rules it was handed.

### Long-Form Writing

**Long-form writing** is sustained, coherent prose across many paragraphs, with consistent terminology and a stable argument. A chapter of several thousand words tests whether a model stays on topic and avoids repeating itself, which is a different skill from answering a question.

### Structured Output

**Structured output** is output that conforms to a required format, such as a JSON object with named fields of given types. A downstream program reads it, so a single missing field or stray character can break the whole step. A learning graph in this workload must be a valid JSON file and a CSV file that agree, with no duplicate labels.

A short example shows what "valid" means. The required format is a JSON object with an integer `id`, a string `label`, a string `group`, and an array of integers `depends_on`. This reply is valid:

```json
{"id": 7, "label": "Token", "group": "SLM", "depends_on": [40]}
```

This one is not, because `id` is a string instead of an integer:

```json
{"id": "7", "label": "Token", "group": "SLM", "depends_on": [40]}
```

Both look right at a glance, which is the problem. Judging output against a schema takes a precise eye, so the exercise below trains it.

#### Diagram: Structured Output Judge


<iframe src="../../sims/structured-output-judge/main.html" width="100%" height="626px" scrolling="no"></iframe>
[Run Structured Output Judge Fullscreen](../../sims/structured-output-judge/main.html)

<details markdown="1">
<summary>Structured Output Judge</summary>
Type: microsim
**sim-id:** structured-output-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of 6 model replies is valid JSON that matches a given required format, naming the defect in each invalid reply, with at least 5 of 6 judged correctly.

**Prerequisites:** structured output, JSON object, field, integer, string, array (the format is defined in the section "Structured Output" above this block).

**Evidence of Mastery:** For each reply the learner chooses "Valid" or "Invalid" and, when "Invalid", chooses the defect from the four defect types listed in Content. A judgment is correct when the choice equals the Answer column and, for invalid replies, the defect equals the Defect column. Mastery is 5 of 6 correct. Reading the required format is exploration, not evidence.

**Misconceptions:** (1) A reply that looks right is valid. (2) A reply containing valid JSON inside explanatory text is valid. (3) A trailing comma is harmless. (4) An empty array is a missing field.

**Instructional Rationale:** Evaluate-level judging needs criteria applied to evidence, so the required format is fixed and visible and the replies differ from it in one precise way each. Requiring the learner to name the defect shows whether they can justify the judgment, not only guess it.

**Content:**

The required format, shown on screen for every reply: a JSON object with exactly these four fields. `id` is an integer. `label` is a string. `group` is a string. `depends_on` is an array of integers, and it may be empty. The only text in the reply must be the JSON object itself. The four defect types the learner can choose from are: "Wrong type", "Missing field", "Extra text around the JSON", and "Invalid JSON syntax".

| # | Reply shown to the learner | Answer | Defect | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | `{"id": 7, "label": "Token", "group": "SLM", "depends_on": [40]}` | Valid | none | All four fields are present with the right types and there is no other text. |
| 2 | `{"id": "7", "label": "Token", "group": "SLM", "depends_on": [40]}` | Invalid | Wrong type | `id` is the string "7", but the format requires an integer. |
| 3 | `{"id": 7, "label": "Token", "group": "SLM"}` | Invalid | Missing field | `depends_on` is required and is absent. |
| 4 | `Here is the record: {"id": 7, "label": "Token", "group": "SLM", "depends_on": [40]}` | Invalid | Extra text around the JSON | The JSON is correct, but the sentence before it means a program cannot parse the reply as JSON. |
| 5 | `{"id": 7, "label": "Token", "group": "SLM", "depends_on": [40],}` | Invalid | Invalid JSON syntax | JSON does not allow a trailing comma after the last field. |
| 6 | `{"id": 7, "label": "Token", "group": "SLM", "depends_on": []}` | Valid | none | An empty array is valid; it means the concept has no prerequisites. |

**Provenance:** The required format and the six replies are synthetic, written for this exercise, and the sim labels them "synthetic example". The meaning of valid follows the chapter section "Structured Output" and the JSON syntax rules.

**Rules:** Replies are shown in the fixed order 1 to 6, with the required format visible throughout. A reply is Invalid if any field is missing, any field has the wrong type, any text appears outside the JSON object, or the JSON syntax is invalid. Each reply allows one Valid or Invalid choice and, when Invalid, one defect choice, and both are final.

**Learner Activity:**

1. The learner reads the required format and reply 1.
2. The learner chooses "Valid" or "Invalid". If "Invalid", the learner chooses one of the four defect types, then confirms.
3. The sim shows the correct judgment, the defect if any, and the Why text, and marks the reply correct or incorrect.
4. The learner repeats for replies 2 to 6. After reply 6 the sim shows the score and the misconception behind each missed reply.

**Feedback:** Six replies, fixed order, one confirmed judgment each, and the judgment is final. A reply is correct only when both the validity choice and, where needed, the defect choice are correct. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct judgment, the defect, and the Why text. The final score reads "n of 6 correct".

**Starting State:** The required format and reply 1 are shown with no choice made, and the question on screen is "Would a program accept this reply?"

**Chapter Anchors:** The chapter states the required format as an integer `id`, a string `label`, a string `group`, and an array of integers `depends_on`, and that `{"id": "7", ...}` is invalid because `id` is a string.
</details>

### Tool Calling

**Tool calling** is a model's ability to ask a program to do something on its behalf by emitting a structured request, and then to use the result. The model does not run commands itself. It writes a request naming a tool and its arguments, a surrounding program called the harness executes it, and the result is returned to the model as new text. Tool calling is what turns a text generator into something that can read files and run scripts.

Here is one round of that exchange, with the user's question and a tool for running shell commands. The tool name and fields are illustrative.

| Step | Who | What happens |
|---|---|---|
| 1 | User | Asks "How many lines are in `notes.txt`?" |
| 2 | Model | Emits a tool call: `{"name": "run_shell", "arguments": {"command": "wc -l notes.txt"}}` |
| 3 | Harness | Runs `wc -l notes.txt` and returns the output `3 notes.txt` |
| 4 | Model | Reads the result and answers "It has 3 lines." |

Tool calling depends directly on structured output, because step 2 must be valid JSON for the harness to execute it. A malformed call is one of the failure types Chapter 22 teaches you to diagnose, and a call that the model writes as ordinary prose instead of as a structured request is another.

!!! mascot-thinking "The Model Asks, the Harness Acts"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A language model never touches your machine. It only produces text, and one kind of text is a request that a separate program chooses to carry out. Keeping that boundary in mind explains both what agents can do and where the safety limits sit.

### Code Generation

**Code generation** is a model's ability to write programs, scripts, and configuration in a programming language. The benchmark uses it in two places: shell and Python scripts that an agent writes to do its work, and the JavaScript for MicroSims. Code has a property prose lacks, which is that it can be run, so a model's code can be checked by executing it.

### Reasoning Mode

**Reasoning mode** is a setting or behavior in which a model produces intermediate reasoning, extra tokens that work through a problem, before it gives its final answer. It can improve results on multi-step problems. It also uses more tokens, which costs time and fills the context window, so it is a trade-off to measure, not to assume.

### Multimodal Model

A **multimodal model** is a model that accepts or produces more than one kind of content, such as text together with images. Most language models in this course are text-only for generation. The multimodal capability exists on some candidates, and the benchmark does not use it.

### Image Input

**Image input** is the ability of a multimodal model to accept an image as part of its prompt and answer questions about it. It is a distinct capability from generating images, which is out of scope for this course.

## Chapter Summary

You started with a definition of a generative model and ended with the abilities a benchmark exercises. A language model predicts the next token, one at a time, using parameters it learned in training, and it works within a context window measured in tokens. Inference runs it. A small language model is one you can run on your own hardware, in contrast with a frontier model, and an open-weight model's license decides what you may do with it. Instruction following, long-form writing, structured output, tool calling, and code generation are what textbook generation asks of it.

!!! mascot-celebration "Vocabulary Locked In"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now convert words to tokens, test whether a document fits a context window, tell an open-weight model from an open-source one, and name the five abilities this benchmark scores. Chapter 4 puts those terms to work in the case for and against running them locally.
