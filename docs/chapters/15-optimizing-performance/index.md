---
title: "Optimizing Small Language Model Performance"
description: "Measuring and tuning inference speed: prompt processing versus generation, tokens per second, time to first token, caching, batching, context length, sampling, and the memory and thermal limits that decide a run's wall-clock time."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:17:57"
version: 1.11
---

# Optimizing Small Language Model Performance

## Summary

This chapter measures and tunes inference speed. Students collect tokens per second, time to first token, and latency, then adjust quantization, context length, batch size, concurrency, prompt caching, and sampling while watching GPU use, memory pressure, and thermal throttling. They finish able to break a run's wall-clock time into its causes.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Sampling Parameters | 3 |
| Temperature Setting | 1 |
| Top-p and Top-k | 1 |
| GPU Utilization | 3 |
| Prompt Processing Speed | 15 |
| Tokens per Second | 11 |
| Prompt Caching | 9 |
| Batch Size | 4 |
| Context Length Setting | 1 |
| Prompt Re-Reading | 8 |
| Model Load Time | 8 |
| Memory Pressure | 5 |
| Concurrency | 3 |
| Performance Optimization | 1 |
| Time to First Token | 6 |
| GPU Monitoring | 2 |
| Out-of-Memory Error | 2 |
| Batched Serving | 1 |
| Quantization Tradeoffs | 1 |
| Throughput | 1 |
| Latency | 5 |
| Thermal Throttling | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)
- [Chapter 10: Python Hardware Probes](../10-hardware-probes/index.md)
- [Chapter 11: Model Sizing and Fit](../11-model-sizing-and-fit/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)

---

!!! mascot-welcome "Find Out Where the Minutes Go"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model that benchmarks as fast can still take ninety minutes to do a job a slower model finishes in twenty. By the end of this chapter you will be able to split a run's wall-clock time into its causes and say which setting to change first. Measure first, then decide!

## What This Chapter Covers

Speed is the property most people ask about first and measure worst. A single "tokens per second" figure hides the fact that a run has several kinds of time in it, and which kind dominates depends on the workload. A chat answer is dominated by generating the reply. An agent session, which resends a growing conversation on every turn, is dominated by something else entirely.

The chapter defines each kind of time and the settings that move it. It follows the order a request meets them: loading the model, reading the prompt, generating the reply, and running the tool the reply asks for. Then it covers the limits that cut a run short, which are memory pressure, the out-of-memory error, and heat. The worked examples use this evaluation's own measurements, including the one case where re-reading a conversation cost more than everything else combined.

## The Kinds of Time

### Model Load Time

**Model load time** is how long the server takes to read a model from disk into memory and get it ready, and it is paid whenever a model is not already loaded. It is the storage read speed of Chapter 5 applied to the model's size, plus the setup of the GPU. A 20 GB model at 2 GB per second is about ten seconds of reading, and a larger one proportionally more.

It matters when it is paid repeatedly. A server that unloads an idle model and reloads it for the next request spends that time again, which is why the keep-alive setting of Chapter 13 exists. For a benchmark that runs for hours, one load is a rounding error, and a load before every request is not.

### Prompt Processing Speed and Time to First Token

**Prompt processing speed** is how fast the server reads the prompt, measured in input tokens per second. Reading is fast because the model can process all the prompt's tokens in parallel. **Time to first token** is the delay between sending a request and receiving the first token of the reply, and it is made up mostly of loading, if needed, and prompt processing.

A worked example from this evaluation: one model read a 30,000-token prompt in ten seconds, which is about 3,000 tokens a second, so its time to first token for that prompt was about ten seconds. The same prompt on a model that processes 500 tokens a second would take a full minute before a single word appeared.

### Tokens per Second

**Tokens per second** is the generation speed: how many output tokens the model produces each second once it has started. Generation is slower than reading because each token depends on the one before it, so the tokens are produced in sequence and each requires reading the model's active weights from memory.

The measured speeds in this evaluation spanned a factor of forty, from 3 tokens a second for the largest dense model to 130 for the fastest mixture-of-experts model. They are the figure behind every estimate of how long a chapter takes.

!!! mascot-thinking "Reading Is Parallel and Writing Is Sequential"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The model can look at an entire prompt at once, but it can only write one token at a time, because each depends on the last. That is why a prompt of 30,000 tokens is read in seconds and a reply of 600 tokens takes tens of seconds. Two different speeds govern two different halves of every request.

### Latency and Throughput

**Latency** is the total time for one request, from sending it to receiving the last token. **Throughput** is the total amount of work done per unit of time across all requests, usually tokens per second summed over everything in flight. They are different goals and often pull against each other. A setting that lowers one request's latency can lower the machine's total throughput, and the reverse.

For a single benchmark session, latency is what you feel and throughput is irrelevant, because only one request is in flight at a time. For a service that generates many books, throughput is the number that sets the cost per book.

## Why an Agent Turn Is Slow

### Prompt Caching and Prompt Re-Reading

An agent harness resends the whole conversation on every turn: the system prompt, the skill, every earlier message, and every tool result. **Prompt caching** is the server's remedy: it keeps the already-computed internal state for the part of the prompt that has not changed, so each new turn only has to read what is new. With caching working, a turn that adds 2,000 tokens to a 50,000-token conversation reads 2,000.

**Prompt re-reading** is the failure of that remedy, where the server recomputes most of the conversation on each turn. This evaluation observed it. With one model under the Ollama version used, on every agent turn the server restored a saved state just past the 19,000-token system prompt and then re-read the rest of the conversation, which was 46,000 to 65,000 tokens, taking one and a half to two minutes per turn. A different model, on the same server, did not show it. The cause was not identified.

The effect on the cost of a run was larger than anything else. The first stage of one model took 102 minutes where the others took 6 to 22. Its 55 tool calls at 90 seconds each of re-reading account for about 83 of those minutes, and a single turn of reasoning accounts for another 19.

| Quantity | Value | Source |
|---|---|---|
| Tokens re-read per turn | 46,000 to 65,000 | Measured from the server log |
| Time per turn spent re-reading | 1.5 to 2 minutes | Measured |
| Tool calls in the stage | 55 | Measured |
| Time from re-reading | about 83 minutes | 55 × 90 seconds |
| One reasoning turn | about 19 minutes | Measured |
| Stage total | 102 minutes | Measured |

The sum of the two causes, 83 plus 19, is the 102 minutes. Neither cause was the model's speed.

!!! mascot-tip "Look for the Restore Line in the Server Log"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    If one model is slow and another on the same server is not, search the server log for lines that say a context checkpoint was restored, and compare how many tokens each turn then processed. A turn that re-reads most of the conversation is the signature, and it is a different problem from slow generation.

## The Settings

### Context Length Setting

The **context length setting** is the window size the server is configured with, and Chapter 11 showed that it reserves memory for the cache. It also bounds how large a conversation can get before the harness must shrink it. The setting is a trade between room for long conversations and memory for everything else.

This project's batch runner chooses it for each model from a memory estimate that keeps about 45 GiB free, and not a single value for all models. That is the Chapter 11 calculation applied as a setting.

### Batch Size, Batched Serving, and Concurrency

**Batch size** is how many tokens, or requests, the server processes together in one step. A larger batch uses the GPU more fully, because the same weights are read once and applied to many tokens. **Batched serving** is a server design that combines concurrent requests into batches so that several users share one pass over the weights. **Concurrency** is the number of requests being handled at once.

The three are one idea at three levels. Raising concurrency, in a server that batches, raises throughput, and it can raise each request's latency. For a benchmark that deliberately runs one session at a time, this is a lever left unused, which is why vLLM, Chapter 13's batching server, is the candidate for a second pass.

### Sampling Parameters, Temperature, Top-p, and Top-k

**Sampling parameters** are the settings that control how the next token is chosen from the model's probabilities. **Temperature** scales how adventurous the choice is: 0 always takes the most likely token, and higher values spread the choice. **Top-k** limits the choice to the k most likely tokens, and **top-p** limits it to the smallest set of tokens whose probabilities add up to p.

They matter for two reasons. They change the output, so a benchmark must fix and record them or its runs are not comparable. And they interact with reasoning models, where a high temperature can lengthen a chain of thought. They have little effect on speed, and a reader looking for speed will not find it here.

### Quantization Tradeoffs

**Quantization tradeoffs** are what you give and get by storing weights in fewer bits. A 4-bit file is smaller, loads faster, and reads fewer bytes per token, so it generates faster than the same model at 8 bits. It also loses some accuracy, more on hard tasks than easy ones. This evaluation ran every candidate at its default 4-bit and left an 8-bit retest for the winner. Whether the quality loss matters is a measurement, and it is the one dial in this chapter that changes the output and not only the speed.

## The Limits

### Memory Pressure

**Memory pressure** is the condition in which available memory is low enough that the system starts to struggle: it swaps data to disk, stalls, or kills a process. It builds gradually as the context grows, and the symptom is that the same job slows down for no obvious reason in the later part of a run.

The probe of Chapter 10 reports available memory directly, and the vitals log of the same chapter records it every 30 seconds, so the slope is visible. Take an illustrative run that begins with 72 GiB available and ends with 18. It has been under growing pressure, and the second number is the one a watchdog acts on.

### Out-of-Memory Error

An **out-of-memory error** is the failure when a program asks for memory that is not there. On a machine with dedicated GPU memory it shows up as a message in the server log, such as a CUDA allocation failure, and it ends one request or one process. On a unified-memory machine, the same shortage is shared with the operating system, and it can end in a frozen machine instead of a clean error. The practical rule is the one of Chapter 11: leave headroom, and watch the available figure so that you act before the error arrives.

### GPU Utilization and GPU Monitoring

**GPU utilization** is the share of the time the GPU is busy. **GPU monitoring** is watching it, and the temperature, power, and memory, while a job runs. A low utilization during generation means the GPU is waiting: for the prompt to be read, for a tool to run, or for the CPU to hand it work. A high utilization during a long reply is normal and healthy.

A single command shows it, refreshed every five seconds. The query asks for utilization, temperature, and power, and `-l 5` repeats it.

```bash
nvidia-smi --query-gpu=utilization.gpu,temperature.gpu,power.draw \
           --format=csv -l 5
```

During this evaluation a reading at about 43 seconds into a heavy run was 92% utilization, 72 degrees, and 69 W. Those numbers describe a GPU working hard on a single request, not a ceiling.

### Thermal Throttling

**Thermal throttling** is the chip reducing its own speed to stay below a safe temperature. It shows up as a speed that falls over a long run with no change in the workload, and it is invisible in a short test. The only way to find it is to run long and read the temperature and tokens per second together. The watchdog ceiling in this project was 95 degrees Celsius, chosen to stop a run before the chip had to protect itself, and a speed that decays while the temperature climbs is the pattern to look for.

!!! mascot-warning "A Fast Short Test Can Hide a Slow Long Run"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A thirty-second speed test finishes before the chassis has warmed and before the cache has grown. Measure speed again at the end of a long run, with the same prompt, and compare. If the two numbers differ, the difference is memory pressure or heat, and the first number was never the machine's real speed.

## Turning Measurements Into Changes

### Performance Optimization

**Performance optimization** is changing one setting at a time and measuring the result against a fixed baseline. The discipline is the same as the sensitivity analysis of Chapter 6: one change, one measurement, then restore. A comparison between two runs that differ in three settings tells you nothing about which one mattered.

Each setting in this chapter moves a different part of the time, and the table matches them so that you change the one aimed at your bottleneck.

| Setting | What it moves | What it costs |
|---|---|---|
| Quantization to fewer bits | Generation speed up, memory down | Some quality |
| Context length down | Memory down, room for the system up | Smaller conversations |
| Keep-alive up | Fewer reloads | Memory held while idle |
| Prompt caching working | Prompt processing time down per turn | Nothing, when it works |
| Batching and concurrency up | Throughput up | Latency per request |
| Sampling parameters | The output, not the speed | Different results |

### Time Breakdown for an Agent Turn

A **time breakdown** splits one turn into the parts above. For a turn that begins with a prompt, produces a reply, and runs one tool, the time is the sum of reading, writing, and tool execution:

\[ T_{\text{turn}} = \frac{\text{prompt tokens}}{\text{prompt processing speed}} + \frac{\text{output tokens}}{\text{tokens per second}} + T_{\text{tool}} \]

With caching working, the prompt tokens are only the new ones. With re-reading, they are most of the conversation, and the first term dominates.

The three cases below use measured speeds from this evaluation. In each, the tool takes 5 seconds.

| Case | Prompt tokens read | Reading speed | Reply tokens | Writing speed | Turn time |
|---|---|---|---|---|---|
| Caching works, dense model | 2,000 | 3,000 per second | 600 | 34 per second | 23.3 s |
| Re-reading, a slower model | 55,000 | 500 per second | 600 | 26 per second | 138.1 s |
| Caching works, fast mixture-of-experts model | 2,000 | 3,000 per second | 600 | 108 per second | 11.2 s |

In the second case the reading takes 110 of the 138 seconds, and tripling the generation speed would barely change the turn. In the first, writing takes 17.6 of 23.3 seconds, and faster generation is the lever. The same model can be on either row depending on whether the server is caching.

#### Diagram: Agent Turn Time Breakdown


<iframe src="../../sims/turn-time-breakdown/main.html" width="100%" height="592px" scrolling="no"></iframe>
[Run Agent Turn Time Breakdown Fullscreen](../../sims/turn-time-breakdown/main.html)

<details markdown="1">
<summary>Agent Turn Time Breakdown</summary>
Type: microsim
**sim-id:** turn-time-breakdown<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the time of an agent turn from its prompt tokens, reply tokens, speeds, and tool time to within 1 second, and name the component that dominates it, for 3 challenges.

**Prerequisites:** prompt processing speed, tokens per second, prompt caching, prompt re-reading, latency, time breakdown (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 3 challenges the learner types the turn time in seconds and chooses the dominant component from "Reading the prompt", "Writing the reply", and "Running the tool" before the sim reveals the answer. A challenge is correct when the typed value is within 1 second of the model value and the dominant component matches. Mastery is 3 of 3. Changing sliders in exploration is not evidence.

**Misconceptions:** (1) Faster generation always makes a turn faster. (2) Prompt reading is negligible. (3) A model's speed is one number for every workload. (4) Re-reading happens only when the context is full.

**Instructional Rationale:** Apply-level calculation needs a stated formula and committed numbers, and the dominant-component question turns the arithmetic into a diagnosis. The three cases are chosen so that each has a different dominant component or a different cause for the same one.

**Content:**

The learner can change five quantities:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Prompt tokens read this turn | 0 | 100,000 | 500 | 2,000 | tokens |
| Prompt processing speed | 100 | 5,000 | 100 | 3,000 | tokens per second |
| Reply tokens | 50 | 5,000 | 50 | 600 | tokens |
| Generation speed | 5 | 150 | 1 | 34 | tokens per second |
| Tool time | 0 | 60 | 1 | 5 | seconds |

The three challenges, in this order:

| # | Prompt tokens | Reading speed | Reply tokens | Writing speed | Tool time | Model turn time | Dominant component | Feedback when wrong |
|---|---|---|---|---|---|---|---|---|
| 1 | 2,000 | 3,000 | 600 | 34 | 5 | 23.3 s | Writing the reply | 2,000 ÷ 3,000 = 0.7 s, 600 ÷ 34 = 17.6 s, tool 5 s, total 23.3 s, and writing is the largest. |
| 2 | 55,000 | 500 | 600 | 26 | 5 | 138.1 s | Reading the prompt | 55,000 ÷ 500 = 110 s, 600 ÷ 26 = 23.1 s, tool 5 s, total 138.1 s, and reading is the largest. |
| 3 | 2,000 | 3,000 | 600 | 108 | 8 | 14.2 s | Running the tool | 0.7 s reading, 600 ÷ 108 = 5.6 s writing, tool 8 s, total 14.2 s, and the tool is the largest. |

**Provenance:** The speeds and token counts are drawn from the measurements in this chapter and the cost analysis page: 3,000 tokens per second reading and 108 writing for the mixture-of-experts model, 34 writing for the dense model, 26 writing and about 500 reading with 55,000 tokens re-read for the slow case. Tool times are illustrative, and the sim labels them "illustrative".

**Rules:** Turn time = prompt tokens ÷ reading speed + reply tokens ÷ writing speed + tool time, in seconds, shown to one decimal. The dominant component is the largest of the three terms; a tie is shown as "tie". Model load time is not included.

**Learner Activity:**

1. The learner reads challenge 1, whose inputs are shown, and types the turn time in seconds.
2. The learner chooses the dominant component and presses Check.
3. The sim reveals the model value, the dominant component, and the Feedback text, and marks the challenge correct or missed.
4. After the three challenges the exploration mode unlocks, with a stacked bar of the three components, and the learner changes any of the five quantities.
5. In exploration the learner should notice that changing generation speed barely moves the bar when reading dominates.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <model value> s, <component> dominates." Incorrect: the "Feedback when wrong" text for that challenge. After the second wrong attempt the model value and the worked calculation are shown, and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** Challenge 1 is shown with an empty answer box and its inputs displayed. The question on screen is "How long does this turn take, and where does the time go?"

**Chapter Anchors:** The chapter states a 23.3-second turn with caching on a dense model, a 138.1-second turn with 55,000 tokens re-read, and 110 of those seconds spent reading, and that the stage total of 102 minutes was about 83 minutes of re-reading plus a 19-minute reasoning turn.
</details>

## Chapter Summary

A run's wall-clock time is made of loading the model, reading the prompt, writing the reply, and running tools, and each has its own speed and its own setting. Reading is parallel and fast, and writing is sequential and slow, so a turn that resends a long conversation can spend most of its time reading unless prompt caching holds. The server's caching can silently fail, as it did for one model in this evaluation, and the cost was larger than any difference in generation speed. The settings move different parts of the time and some move the output, and a measurement with one change at a time is the only way to know which. Memory pressure, out-of-memory errors, and heat set the limits, and a long run is the only test that finds them.

!!! mascot-celebration "You Can Split a Run Into Its Causes"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now take a slow run, separate loading, reading, writing, and tool time, and say which setting to change first. Chapter 16 opens up the harness itself to see where an agent turn spends its time and its context.

[See Annotated References](./references.md)
