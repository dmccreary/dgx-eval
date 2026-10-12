---
title: "Selecting and Downloading an Open-Weight Model"
description: "Choosing and downloading an open-weight model: selection criteria, license review, publisher claims versus measured behavior, the Hugging Face Hub, checksum verification, and a documented shortlist."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:13:22"
version: 1.11
---

# Selecting and Downloading an Open-Weight Model

## Summary

This chapter moves from the question of fit to the choice of model. Students apply selection criteria, review licenses, compare publisher claims with measured behavior, and download models from the Hugging Face Hub with checksum verification. They finish with a documented shortlist of models that fit and are legal to use.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Apache 2.0 License | 2 |
| Hugging Face Hub | 31 |
| Model Repository | 27 |
| Safetensors Format | 3 |
| License Review | 3 |
| Model Leaderboard | 3 |
| Writing Quality | 2 |
| Gated Model Access | 2 |
| Publisher Provenance | 2 |
| Commercial Use Terms | 1 |
| Model Download | 26 |
| Model Selection Criteria | 4 |
| Tool-Calling Reliability | 2 |
| Public Benchmark Score | 2 |
| Access Token Handling | 1 |
| Checksum Verification | 3 |
| GGUF Format | 2 |
| Model Cache Directory | 1 |
| Publisher Claims | 1 |
| Exclusion Rationale | 1 |
| Storage Management | 1 |
| Model Shortlist | 2 |
| Model Comparison | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)
- [Chapter 11: Model Sizing and Fit](../11-model-sizing-and-fit/index.md)

---

!!! mascot-welcome "A Shortlist You Can Defend"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    There are thousands of open-weight models and you have room for a handful. By the end of this chapter you will have a shortlist that fits your machine, that you are allowed to use, and whose exclusions you can explain in one sentence each. Measure first, then decide!

## What This Chapter Covers

Chapter 11 told you which models fit. This chapter decides which of those are worth the disk space and the testing time. The two questions are different: a model can fit and still be the wrong choice because its license forbids your use, its publisher cannot be identified, or its claims describe a task you are not doing.

The chapter follows a choice from criteria to files on disk. It sets the criteria the benchmark needs, shows where models are published and how to read a model page, reviews licenses and the claims a publisher makes, and ends with downloading safely, verifying that the file is the one intended, and recording why each candidate was included or left out.

## Choosing

### Model Selection Criteria

**Model selection criteria** are the requirements a model must meet to be worth testing. They come from the workload, not from a leaderboard. For this course's workload, which is running a long skill through an agent harness, the criteria were four, and each can be checked before downloading.

| Criterion | Why the workload needs it | Where to check it |
|---|---|---|
| Supports tool calling | A harness acts only through tool calls | The model page, then a test |
| Context window of at least 64,000 tokens | The harness prompt alone takes about 19,000 tokens | The model page |
| Fits with headroom | A model that fits tightly can freeze a unified-memory machine | Chapter 11's calculation |
| Identifiable publisher and checkable terms | A result cannot be recommended if readers cannot check the license | The repository and its license file |

### Tool-Calling Reliability and Writing Quality

**Tool-calling reliability** is how often a model produces a well-formed tool call when one is needed. It is the property that decides whether a harness run works at all, and it is rarely stated on a model page as a number. **Writing quality** is how good the prose is: clear, accurate, at the stated reading level, and sustained across thousands of words. A textbook is mostly prose.

Neither can be read from a model's name. Both are measured, in different places in this course. Chapter 19 builds a model-only test that exposes tool-calling failures in seconds, and Chapter 20 builds the scoring for prose. At selection time the right move is to prefer candidates whose publishers state tool-calling support, and to expect to discard some of them after testing.

## Where Models Come From

### Hugging Face Hub and Model Repository

The **Hugging Face Hub** is the main public site for sharing machine-learning models, datasets, and demonstration apps. A **model repository** is one model's home on it: a versioned folder of files that holds the weights, the configuration, a README called the model card, and a license file.

A model repository page is a primary source, and reading it is the main selection skill. Five things are worth finding before you consider a download.

- **Who published it.** An organization's verified account, or an individual who repackaged someone else's work.
- **The license**, as a file and in the page's metadata, which can disagree.
- **The model card.** Intended use, training notes, and the publisher's own benchmark claims.
- **The file list.** Which formats exist and how large each is.
- **The history.** When it was last updated and whether the files changed after publication.

### Publisher Provenance

**Publisher provenance** is the answer to "where did these weights actually come from?" A file with a famous model's name can be a conversion by a third party, a fine-tune, or something else. For an evaluation that will be published, provenance matters because your recommendation is only as trustworthy as the file it was measured on. Prefer the original publisher's repository, and when you use a conversion, say who made it.

### Model Leaderboard and Public Benchmark Score

A **model leaderboard** ranks models by their scores on shared tests, and a **public benchmark score** is one model's result on one such test. They are cheap evidence and they answer a question that is rarely yours. A leaderboard of general knowledge or coding says little about whether a model follows a thousand-line skill file or keeps a blank line before every list.

Use them to build a long list, not to make the final decision. A published score is one more claim to be checked against what you measure, as the next concept describes.

### Publisher Claims and Model Comparison

**Publisher claims** are the statements a model's publisher makes about it: that it is built for agents, that it leads a benchmark, that it follows instructions better than its size suggests. They are useful as hypotheses, because they name the property the publisher optimized for.

A **model comparison** sets candidates side by side on the criteria that matter to you, with measured values where you have them and claims marked as claims where you do not. This evaluation's candidate page is one, and its habit is the one to copy: each section states the claim, then states what testing found.

| Model | Publisher's claim | What testing found |
|---|---|---|
| `qwen3.8:27b` | Built for long agent tasks | The cleanest learning graph, and by far the slowest |
| `gemma4:26b` | A fast mixture-of-experts model | The fastest, with a graph that had 40 duplicate labels |
| `gpt-oss:120b` | Function calling and structured output | Mixed: a tool call printed as plain text in one of two runs |
| `muse-glimmer:30b` | Top tool-use scores in its own comparison | Lost the task after a few steps |

!!! mascot-thinking "A Claim Tells You What to Test, Not What You Will Get"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A publisher states the property it optimized for, and that is useful. It does not state the conditions under which the property fails, and your workload may be one of them. Read each claim as the first line of a test plan.

## Licenses and Access

### License Review and Commercial Use Terms

A **license review** is reading a model's license before relying on it, and recording what it permits. It is not optional for work you will publish, because a recommendation is only useful to readers who are allowed to follow it. **Commercial use terms** are the part of a license that says whether you may use the model, or what it writes, to make money, and under what conditions.

Three questions cover most reviews. May you use the model for your purpose? May you redistribute what it generates? And are there conditions, such as a revenue threshold above which different terms apply, a required notice, or a prohibited use list? A page's metadata may say one thing and the license file another, so read the file.

### Apache 2.0 License

The **Apache 2.0 license** is a permissive open-source license. It allows use, modification, and redistribution, including commercial use, and it includes an express grant of patent rights from the contributors. It requires you to keep the license and copyright notices and to state changes, and it provides no warranty.

For this evaluation it is the easy case: a model under Apache 2.0 raises no question about using its output in a published book. Several of the candidates carry it, and the candidate page records for each whether the license was checked against the file or reported only by secondary sources.

### Gated Model Access and Access Token Handling

Some publishers **gate** a model: you must be signed in and must accept their terms before the files can be downloaded. Gating is the publisher's way of recording who agreed to its license. A gated download needs an **access token**, a credential that identifies your account to the hub.

**Access token handling** is the discipline of treating that token as a secret. Keep it in an environment variable or the tool's credential store, not in a script. Never commit it, paste it into a chat, or let it appear in a log or a screenshot. Prefer a token limited to read access, and revoke it when the project ends. Chapter 23 returns to tokens as one of the categories that must never be published.

## File Formats and Downloading

### Safetensors Format and GGUF Format

Two file formats cover almost every model you will download here.

| | Safetensors | GGUF |
|---|---|---|
| What it is | A format that stores tensors and nothing executable | A single file holding weights, tokenizer, and metadata |
| Typical precision | 16-bit, sometimes quantized | Quantized, often 4-bit or 8-bit |
| Used by | Python frameworks and servers such as vLLM | llama.cpp and Ollama |
| Why you would pick it | You will serve with a Python framework | You will serve with Ollama or llama.cpp |

The format has a cost that is easy to overlook. Two models in this evaluation were on disk in two formats, the standard one and one in the llama.cpp format, so each took twice its download size. The ten models together took about 397 GB, a good part of a 1 TB disk.

### Model Download

A **model download** is fetching a model's files to the machine. There are two routes in this course. The first is the model library of the inference server: for Ollama a single command pulls a named model and its quantization, and this project wraps that in a script that records when every download has finished. The second is the hub's own client, which fetches a repository's files into a cache directory.

```bash
ollama pull gemma4:31b
```

A download is large and takes a long time on a home connection, and it should run inside `tmux` so that a dropped SSH session does not stop it. Pull deliberately, and say what was pulled, because on a machine you do not administer the disk and the bandwidth are the Administrator's.

### Model Cache Directory

The **model cache directory** is where a tool keeps downloaded models so that it does not fetch them twice. Ollama keeps its models under `~/.ollama/models` by default, and the hub client keeps files under `~/.cache/huggingface`. Both locations can be changed with an environment variable. Knowing the directory matters for two reasons: it is where the disk space went, and it is the folder to inspect when you ask whether a model is already present.

### Checksum Verification

A **checksum** is a fixed-length value computed from a file's bytes, such that any change to the file changes the value. **Checksum verification** is computing it for the file you received and comparing it with the value the publisher states. A match means the file is the one the publisher released, unaltered and complete.

```bash
sha256sum model.safetensors
```

The command prints a 64-character SHA-256 value. Compare it with the one on the publisher's file page, or in the checksum list beside the release. A mismatch means a corrupt or substituted file, and the right response is to delete it and download again. Ollama checks each layer's digest as it pulls, so for models fetched through it the verification is built in. For a file you fetch directly, you do it yourself. The install script of Chapter 8 shows the same check applied to a program.

### Storage Management

**Storage management** is keeping the disk from filling. A model download that runs out of space fails partway through and can leave a partial file. Check free space before a pull, list what is present with `du -sh` on the cache directory, and remove what you no longer need with the server's own command, such as `ollama rm <model>`.

!!! mascot-tip "Check Free Space Against the Largest File, Not the Average"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before a pull, run `df -h` and compare the free space with the model's download size plus a margin for a second format. A 65 GB model on a disk with 60 GB free fails after an hour, and the partial file stays behind.

## The Shortlist

### Model Shortlist and Exclusion Rationale

A **model shortlist** is the written list of candidates you will test, each with its reasons. An **exclusion rationale** is the reason a model was left off. The second is as important as the first, because a reader who sees a famous model missing will wonder whether you missed it. One line each, tied to a criterion, answers them.

The shortlist for this evaluation, and some of its exclusions, show the form.

| Model | Decision | Rationale |
|---|---|---|
| `gpt-oss:120b` | Included | The largest model that still runs at a usable speed on one unit |
| `qwen3.5:122b` | Left out | At 81 GB it was the largest download, and `gpt-oss:120b` already covered the large tier |
| `qwen3-coder:30b` | Left out | About a year old, replaced by newer releases from the same family |
| `nemotron3:33b` | Left out | Aimed at understanding video, audio, and documents, which this benchmark does not use |
| A model needing both units | Left out | The course does not cover multi-machine serving |

!!! mascot-warning "Do Not Drop a Model for a Fault You Did Not Check"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    This evaluation set aside its fastest model partly for broken navigation files, and the fault turned out to be a faulty example in the skill that the model had copied. The model had not been retested. An exclusion based on a symptom needs the cause confirmed, and an exclusion that is not retested should say so in its rationale.

#### Diagram: Model Shortlist Filter


<iframe src="../../sims/model-shortlist-filter/main.html" width="100%" height="636px" scrolling="no"></iframe>
[Run Model Shortlist Filter Fullscreen](../../sims/model-shortlist-filter/main.html)

<details markdown="1">
<summary>Model Shortlist Filter</summary>
Type: microsim
**sim-id:** model-shortlist-filter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/dgx-eval/tree/main/docs/sims/model-fit-by-memory<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply four selection criteria to 8 candidate models for a 128 GB unified-memory machine, deciding shortlist or exclude and naming the first failed criterion, with at least 7 of 8 correct.

**Prerequisites:** model selection criteria, tool-calling reliability, context window, safety headroom, publisher provenance, license review, exclusion rationale (all defined in the sections above this block and in Chapter 11).

**Evidence of Mastery:** For each of the 8 candidates the learner commits "Shortlist" or "Exclude" and, for "Exclude", the first failed criterion from the four listed, before the sim reveals the answer. A candidate is correct when the decision equals the Correct decision column and, for an exclusion, the criterion equals the Correct failed criterion column. Mastery is 7 of 8 correct on the first attempt. Reading the candidate cards is exploration, not evidence.

**Misconceptions:** (1) A model that fits in raw memory is acceptable. (2) A large context window makes up for a missing tool-calling feature. (3) A missing license statement is as good as a permissive one. (4) A popular name is proof of provenance.

**Instructional Rationale:** Apply-level work needs the learner to use criteria on new cases, so each candidate fails at most one criterion, and the check order is fixed so that exactly one answer is correct. Mixed shortlist and exclude cases prevent a habit of excluding everything.

**Content:**

The machine has 128 GB of unified memory, with a 20% headroom, so the usable memory is 102.4 GB. The memory figure on each card is the estimate at a 32,768-token context.

The four criteria, checked in this order: "Tool calling", "Context window", "Fit with headroom", "Publisher and terms". A model passes "Tool calling" when it supports tool calling, passes "Context window" when its window is at least 64,000 tokens, passes "Fit with headroom" when its memory is at most 102.4 GB, and passes "Publisher and terms" when its publisher is identified and its license can be read.

| # | Card shown to the learner | Correct decision | Correct failed criterion | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Model A: tool calling yes; window 256,000; memory 29 GB; Apache 2.0; publisher identified | Shortlist | None | It passes all four criteria. |
| 2 | Model B: tool calling no; window 128,000; memory 20 GB; Apache 2.0; publisher identified | Exclude | Tool calling | A harness acts through tool calls, so a model without them cannot run a skill. |
| 3 | Model C: tool calling yes; window 32,000; memory 18 GB; Apache 2.0; publisher identified | Exclude | Context window | 32,000 tokens is below the 64,000 minimum, and the harness prompt alone takes about 19,000. |
| 4 | Model D: tool calling yes; window 128,000; memory 118 GB; Apache 2.0; publisher identified | Exclude | Fit with headroom | 118 GB is above the usable 102.4 GB, so it would run with no margin on a unified-memory machine. |
| 5 | Model E: tool calling yes; window 256,000; memory 40 GB; license not stated; publisher identified | Exclude | Publisher and terms | Without a license the terms cannot be checked, so a result could not be recommended. |
| 6 | Model F: tool calling yes; window 128,000; memory 69 GB; Apache 2.0; publisher identified | Shortlist | None | It passes all four criteria, and 69 GB is under 102.4 GB. |
| 7 | Model G: tool calling yes; window 256,000; memory 24 GB; Apache 2.0; publisher an unknown repackager | Exclude | Publisher and terms | The weights cannot be traced to the original publisher, so the measurement would be of an unknown file. |
| 8 | Model H: tool calling yes; window 1,000,000; memory 25 GB; custom license published in the repository's license file; publisher identified | Shortlist | None | The terms are readable, so they can be checked, and every other criterion passes. |

**Provenance:** The candidates are synthetic, written for this exercise, and the sim labels them "synthetic example". The criteria come from the "Model Selection Criteria" section of this chapter and the headroom from Chapter 11.

**Rules:** Candidates are shown in the fixed order 1 to 8. A candidate is excluded for the first criterion it fails in the listed order. A "Shortlist" decision is correct only when it passes all four. Each decision is final once confirmed.

**Learner Activity:**

1. The learner reads card 1.
2. The learner chooses "Shortlist" or "Exclude", and for "Exclude" the first failed criterion, then confirms.
3. The sim shows the correct decision and criterion with the Why text, and marks the card correct or incorrect.
4. The learner repeats for cards 2 to 8. After card 8 the sim shows the score and the misconception behind each miss.

**Feedback:** Eight cards, fixed order, one confirmed decision each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct decision, the failed criterion, and the Why text. The final score reads "n of 8 correct".

**Starting State:** Card 1 is shown with no decision made, and the question on screen is "Does this model go on the shortlist, and if not, which criterion fails first?"

**Chapter Anchors:** The chapter states that tool calling, a window of at least 64,000 tokens, a fit with headroom, and an identifiable publisher with readable terms are the four criteria, and that the usable memory of a 128 GB machine at 20% headroom is 102.4 GB.
</details>

## Chapter Summary

Selection starts from the workload: tool calling, a context window of at least 64,000 tokens, a fit with headroom, and a publisher and license you can check. A model repository is the primary source, and provenance, license, and the model card are read there. Leaderboards and publisher claims are hypotheses to test, not results. Apache 2.0 is the easy license case, a gated model needs a token that is handled as a secret, and the file format decides which server can load it. A download goes into the cache directory, its checksum is compared with the publisher's, and the disk is watched. The shortlist records each decision and, for each exclusion, the criterion that caused it.

!!! mascot-celebration "A Shortlist That Fits, Is Legal, and Is Explained"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now turn a long list into a shortlist with a stated reason for every name left off, and download and verify a file safely. Chapter 13 puts a model behind a local endpoint you can send a first prompt to.
