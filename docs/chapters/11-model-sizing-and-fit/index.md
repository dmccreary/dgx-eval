---
title: "Model Sizing and Fit"
description: "Predicting whether a model fits before downloading it: parameters, numeric precision, quantization, KV cache, runtime overhead, and safety headroom, combined into a model-fit calculation with a verdict for unified memory."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:12:05"
version: 1.11
---

# Model Sizing and Fit

## Summary

This chapter predicts whether a model will fit before it is downloaded. It derives memory from parameter count, numeric precision, quantization, and KV cache, and adds runtime overhead and safety headroom. Students finish by building a model-fit calculator that returns a verdict for both dedicated and unified memory.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Model Weights | 184 |
| KV Cache | 39 |
| Numeric Precision | 27 |
| Mixture of Experts | 6 |
| Dense Model | 4 |
| Context Length Memory | 17 |
| Bytes per Weight | 13 |
| Runtime Overhead | 12 |
| Quantization | 9 |
| Bits per Parameter | 3 |
| Active Parameters | 1 |
| FP16 and BF16 | 1 |
| Safety Headroom | 11 |
| Quantization Level | 5 |
| Size on Disk | 2 |
| Memory for Weights | 1 |
| Quantized File Overhead | 1 |
| Memory Estimation Formula | 10 |
| 8-Bit Quantization | 2 |
| 4-Bit Quantization | 2 |
| Model-Fit Calculation | 9 |
| Fit Verdict | 4 |
| Model-Fit Calculator | 1 |
| Unified Memory Fit | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)

---

!!! mascot-welcome "Do the Arithmetic Before the Download"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model that does not fit costs you a long download and a confusing failure, and a model that barely fits can freeze the whole machine. By the end of this chapter you will predict, to within a few gigabytes, whether a model will fit before you pull a single file. Measure first, then decide!

## What This Chapter Covers

Chapter 5 established that on a unified-memory machine everything shares one pool, and Chapter 10 built the probe that reports how much of it is free. This chapter supplies the other side of the comparison: how much memory a given model needs. With both numbers in hand, a fit decision becomes subtraction.

The estimate has three parts that behave differently. The **weights** are fixed by the model and its precision. The **KV cache** grows with the context you ask for. The **runtime overhead** is a small amount that the server adds on its own. The chapter builds each one, adds a safety margin, and ends with a calculator that returns a verdict. Measurements from this evaluation's own units appear alongside each formula, so you can see how close the estimate comes.

## The Weights

### Model Weights

**Model weights** are the learned numbers that make up a model. A language model is, concretely, a very large collection of them, and loading a model means placing every one of them in memory where the processor can read it. The count of weights is the model's **parameter count**, written in billions: a "27B" model has about 27 billion.

Weights dominate the memory budget, because every one must be resident for the model to run at full speed. The memory they take is the parameter count times the size of one number:

\[ \text{memory for weights} = \text{parameters} \times \text{bytes per weight} \]

A worked example makes the scale concrete. A 27-billion-parameter model stored at three precisions, which the next sections define, needs:

| Precision | Bytes per weight | Memory for weights |
|---|---|---|
| 16-bit | 2 | 54 GB |
| 8-bit | 1 | 27 GB |
| 4-bit | 0.5 | 13.5 GB |

The same model is a 54 GB problem or a 13.5 GB one, and which it is depends on a choice made when the file was produced. This is why the precision is part of a model's name in a library and why two files with the same parameter count can differ by a factor of four.

#### Diagram: Parameters That Fit in Memory

<iframe src="../../sims/model-fit-by-memory/main.html" width="100%" height="682px" scrolling="no"></iframe>

[Run the Parameters That Fit in Memory MicroSim fullscreen](../../sims/model-fit-by-memory/main.html){ .md-button }

<details markdown="1">
<summary>Parameters That Fit in Memory (reused MicroSim)</summary>
Type: microsim
**sim-id:** model-fit-by-memory<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** sims/model-fit-by-memory/index.md in this book<br/>
**Source Repo:** https://github.com/dmccreary/dgx-eval/tree/main/docs/sims/model-fit-by-memory<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the largest model, by parameter count, whose weights fit in a given amount of memory at 4-bit precision.

Reused from this book's own MicroSims, which already exists locally, so no new specification is needed.
</details>

The sim shows only the weights, at one precision, with a fixed 20% kept free. The rest of this chapter adds the pieces it leaves out.

### Dense Model, Mixture of Experts, and Active Parameters

A **dense model** uses all of its parameters to produce every token. A **mixture-of-experts** model splits much of its parameters into many groups called experts, and for each token a routing step selects a small number of them. The parameters actually used for a token are its **active parameters**.

The distinction changes two things in opposite directions, and confusing them is a common mistake.

| | Dense model | Mixture-of-experts model |
|---|---|---|
| Memory needed | All parameters | All parameters, since any expert may be chosen |
| Work per token | All parameters | Only the active parameters |
| Speed | Falls as the model grows | Close to a much smaller dense model |
| Example from this evaluation | `gemma4:31b`, 30.7 billion | `gemma4:26b`, 25.2 billion total, 3.8 billion active |

The two Gemma models are a clean comparison: similar total size, similar memory, and a threefold difference in speed. A mixture-of-experts model does not save memory. It saves time per token.

!!! mascot-thinking "Memory Pays for the Whole Model, Speed Pays for the Active Part"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A 26-billion-parameter mixture-of-experts model still needs room for all 26 billion, because the router might pick any expert on the next token. What it saves is the work of reading them. Keep the two questions apart: does it fit, and how fast will it run.

## Numeric Precision and Quantization

### Numeric Precision, Bits per Parameter, and Bytes per Weight

**Numeric precision** is how many bits are used to store each number. More bits represent a number more finely and take more memory. **Bits per parameter** counts them, and **bytes per weight** is the same figure divided by 8, which is the one that multiplies the parameter count.

The common formats are few, and the table gives each a name and a size.

| Format | Bits | Bytes per weight | Used for |
|---|---|---|---|
| FP32 | 32 | 4 | Training and some calculations |
| FP16, BF16 | 16 | 2 | The usual full-precision release of a model |
| 8-bit | 8 | 1 | A quantized file that keeps most quality |
| 4-bit | 4 | 0.5 | The common local-inference choice |

### FP16 and BF16

**FP16** and **BF16** are the two 16-bit floating-point formats. Both take two bytes, so they cost the same memory. They differ in how they spend their 16 bits. FP16 keeps more digits of precision and a narrower range of values. BF16 keeps the wide range of the 32-bit format and fewer digits, which makes it more forgiving in training. A model released in BF16 is the reference that quantized versions are made from.

### Quantization, Quantization Level, 8-Bit and 4-Bit

**Quantization** is storing a model's weights with fewer bits than the original, trading a small loss of accuracy for a large saving in memory and a gain in speed. A **quantization level** names how aggressively: 8-bit keeps nearly all of the original's quality at half the 16-bit size, and 4-bit cuts it to a quarter with a loss that is small for most tasks and larger for hard reasoning.

File names for the common format carry the level in a code such as `Q4_K_M` or `Q8_0`, and the model library's default tag for a model is usually 4-bit. This evaluation's design choices page records the decision: every candidate ran at its default 4-bit, with an 8-bit retest left for the winner, since memory is not the constraint on this machine.

The effect on quality is not uniform, and it is an evaluation question, not a calculation. Chapter 15 returns to it with measurements.

### Quantized File Overhead, Size on Disk, and Memory for Weights

A "4-bit" file is not exactly 4 bits per parameter. A quantized file stores the scaling factors that let the small numbers be turned back into real ones, and it keeps some layers, often the ones most sensitive to precision, at a higher precision. **Quantized file overhead** is the extra that results. **Size on disk** is the file's actual size, and **memory for weights** is what that file takes once loaded, which is close to the same number.

This evaluation measured the overhead, and the measurements are the reason the calculator below does not use 4.0.

| Model | Parameters | Formula at 4-bit | Actual download | Effective bits per parameter |
|---|---|---|---|---|
| `gemma4:26b` | 25.2 billion | 13 GB | 18 GB | 5.7 |
| `qwen3.8:27b` | 27 billion | 14 GB | 17 GB | 5.0 |
| `gemma4:31b` | 30.7 billion | 15 GB | 20 GB | 5.2 |
| `gpt-oss:120b` | 117 billion | 59 GB | 65 GB | 4.4 |

The last column is the download size times 8 divided by the parameter count. The four "4-bit" files work out to between 4.4 and 5.7 bits per parameter. A planner who used 4.0 would have underestimated the weights by 10 to 30 percent, in the direction that makes a machine look roomier than it is.

!!! mascot-tip "Use the File Size When You Can, 5 Bits When You Cannot"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The download size on the library page is the best predictor of memory for weights, since it is what will load. When you only have a parameter count, multiply by about 5 bits and not 4, and your estimate will err on the safe side.

## Context, Overhead, and Headroom

### KV Cache and Context Length Memory

The **KV cache** is the memory a model uses to remember the conversation so far. For every token already in the context, the model keeps two vectors at every layer, called the key and the value, so that it does not recompute them for each new token. The cache grows by a fixed amount per token, and **context length memory** is that amount times the number of tokens you allow.

The per-token amount comes from the model's shape. Each token stores a key and a value (2 vectors), at every layer, for each of the model's key-value heads, each of a fixed dimension, at the cache's precision:

\[ \text{KV bytes per token} = 2 \times \text{layers} \times \text{KV heads} \times \text{head dimension} \times \text{bytes per value} \]

A worked example uses an illustrative shape, not the published architecture of any candidate: 48 layers, 8 key-value heads, a head dimension of 128, and 2 bytes per value. That gives 2 × 48 × 8 × 128 × 2 = 196,608 bytes, or 192 KiB, for each token.

| Context length | KV cache | Calculation |
|---|---|---|
| 32,768 tokens | 6.4 GB | 32,768 × 196,608 bytes |
| 131,072 tokens | 25.8 GB | 131,072 × 196,608 bytes |
| 262,144 tokens | 51.5 GB | 262,144 × 196,608 bytes |

The cache is allocated for the context length the server is configured with. It is not something you can ignore until the conversation gets long. This evaluation measured it: with a 20 GB model loaded and idle, one unit showed 66 to 71 GB in use at a 256,000-token setting, where the same model at 32,000 tokens took 29 GB. The difference is mostly the cache, and it is about twice the size of the model.

!!! mascot-warning "A Context Setting Is a Memory Reservation"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Raising the context length does not make a model slower to load a little. It reserves tens of gigabytes before the first prompt, on the same pool the operating system lives in. Choose the smallest context the job needs, and raise it deliberately while watching available memory.

### Runtime Overhead

**Runtime overhead** is the memory the inference server and the GPU stack use beyond the weights and the cache: the compute buffers, the CUDA context, and bookkeeping. It is small compared with the other two, and it is not zero. From the four measurements at a 32,000-token context, the weights plus the cache plus the overhead came to 24 to 69 GB where the weights alone were 17 to 65 GB, so the cache and overhead together were 4 to 9 GB. The calculator uses 3 GB for the overhead alone, which with a 6.4 GB cache gives 9.4 GB, at the top of that range and so on the cautious side.

### Safety Headroom

**Safety headroom** is memory deliberately left unused, as a margin against the things an estimate misses: the operating system, other processes, a cache that grows during a run, and an estimate that is simply low. It is expressed as a share of the memory, and this course uses 20% as the default.

On a unified-memory machine the headroom is not a nicety. Exhausting a pool that the operating system also runs on can freeze the whole machine instead of stopping one program, as Chapter 5 described. The memory watchdog of Chapter 18 enforces a floor in gigabytes for the same reason, and headroom is the planning-time version of that floor.

## The Fit Calculation

### Memory Estimation Formula

The **memory estimation formula** adds the three parts defined above. Weights depend on the model and its precision, the cache depends on the context you configure, and the overhead is a small constant:

\[ \text{memory needed} = \underbrace{\text{parameters} \times \tfrac{\text{bits}}{8}}_{\text{weights}} + \underbrace{\text{context} \times \text{KV bytes per token}}_{\text{KV cache}} + \text{overhead} \]

Each symbol has a unit. Parameters are in billions, so weights come out in gigabytes. Bits is the effective bits per parameter, 5.0 for a file labeled 4-bit, from the measurements above. Context is in tokens. KV bytes per token comes from the model's shape, or from the 192 KiB of the worked example if you do not know it. Overhead is in gigabytes.

### Model-Fit Calculation and Fit Verdict

A **model-fit calculation** compares the memory needed with the memory available, after setting aside the safety headroom. The comparison produces a **fit verdict**, and three verdicts are enough because each one calls for a different action.

| Verdict | Condition | What to do |
|---|---|---|
| Fits | Needed ≤ memory × (1 − headroom) | Proceed |
| Fits without headroom | memory × (1 − headroom) < needed ≤ memory | Reduce context or choose a smaller file; do not run unattended |
| Does not fit | Needed > memory | Choose a smaller model or lower precision |

The middle verdict is the one that earns its place. A model in that zone loads, and then runs until something else asks for memory, which on a unified-memory machine can be the operating system itself. A calculation that returned only "fits" or "does not fit" would call it a success.

### Unified Memory Fit

**Unified memory fit** is the same calculation with the right number for memory. On a machine with dedicated GPU memory, the available memory is the GPU's free memory, per GPU. On a unified-memory machine it is the system's available memory from the RAM probe of Chapter 10, since that pool is the only one, minus the headroom.

This is why the report's `unified_memory` field mattered: it decides which number goes into the comparison. The same model can fit on a 128 GB unified-memory machine and not fit on a 24 GB discrete GPU with 512 GB of system RAM beside it.

### Model-Fit Calculator

A **model-fit calculator** is the formula and the verdict as a program. The function below takes the model and the machine and returns the memory needed, the usable limit, and the verdict. Its parameters, in order, are the parameter count in billions, the effective bits per parameter, the context in tokens, the KV cache bytes per token in KiB, the runtime overhead in gigabytes, the memory in gigabytes, and the headroom as a fraction.

```python
def fit_verdict(params_b, bits, context, kv_kib_per_token,
                overhead_gb, memory_gb, headroom=0.20):
    weights = params_b * bits / 8                        # GB
    kv = context * kv_kib_per_token * 1024 / 1e9         # GB
    total = weights + kv + overhead_gb
    limit = memory_gb * (1 - headroom)
    if total <= limit:
        verdict = "Fits"
    elif total <= memory_gb:
        verdict = "Fits without headroom"
    else:
        verdict = "Does not fit"
    return round(total, 1), round(limit, 1), verdict
```

Two runs on this evaluation's machine, a 128 GB unified-memory unit, show it against the measurements. The model is `gemma4:31b`, with 30.7 billion parameters at 5.0 effective bits.

```python
fit_verdict(30.7, 5.0, 32768, 192, 3, 128)    # (28.6, 102.4, 'Fits')
fit_verdict(30.7, 5.0, 262144, 192, 3, 128)   # (73.7, 102.4, 'Fits')
```

The first estimate, 28.6 GB, compares with the 29 GB measured at that context. The second, 73.7 GB, compares with the 71 GB measured with the model idle at 256,000 tokens. The estimates are within a few percent of the measurements, and both say "Fits".

The second result deserves a second look, because that configuration is the one where a unit stopped responding a few minutes into a long run. An estimate of the idle footprint is a floor, not a peak: the server's per-conversation state grows as a run proceeds, and the cause of the freeze was not confirmed. A "Fits" verdict at 73.7 GB with 102 GB of limit means the idle state fits, and it does not mean a long run is safe. This is why Chapter 18 adds a watchdog on top of the calculation.

!!! mascot-encourage "The Formula Is Simple and the Judgment Is Not"
    ![Tera encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If you got the arithmetic right and the machine still struggled, you have not made a mistake. An estimate predicts the starting footprint, and a long run adds to it. Treat the verdict as a gate on what to try, then measure what actually happens with the vitals log.

#### Diagram: Model-Fit Calculator


<iframe src="../../sims/model-fit-calculator/main.html" width="100%" height="732px" scrolling="no"></iframe>
[Run Model-Fit Calculator Fullscreen](../../sims/model-fit-calculator/main.html)

<details markdown="1">
<summary>Model-Fit Calculator</summary>
Type: microsim
**sim-id:** model-fit-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/dgx-eval/tree/main/docs/sims/model-fit-by-memory<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the memory a model needs from its parameter count, precision, and context length, to within 1 GB, and state the fit verdict, for 3 challenges.

**Prerequisites:** model weights, numeric precision, quantization, KV cache, runtime overhead, safety headroom, fit verdict, unified memory fit (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 3 challenges the learner types the memory needed in gigabytes and chooses one of the three verdicts before the sim reveals the answer. A challenge is correct when the typed value is within 1 GB of the model value and the verdict matches. Mastery is 3 of 3. Changing the inputs in exploration is not evidence.

**Misconceptions:** (1) A 4-bit file uses exactly 4 bits per parameter. (2) The context length does not change memory until the conversation is long. (3) A model that loads has therefore fit. (4) A larger memory always means a bigger model can be run.

**Instructional Rationale:** Apply-level calculation needs the learner to combine three terms, so each challenge changes one input that moves a different term: context for the cache, memory for the verdict, and precision for the weights. The middle verdict is included so that the learner meets the zone where a model loads and is still unsafe.

**Content:**

The learner can change seven quantities:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Parameters | 1 | 200 | 0.1 | 30.5 | billions |
| Precision | 16, 8, or 4-bit file | | | 4-bit | |
| Context length | 4,096 | 262,144 | 4,096 | 32,768 | tokens |
| KV cache per token | 32 | 512 | 32 | 192 | KiB |
| Runtime overhead | 0 | 10 | 0.5 | 3 | GB |
| Memory | 16 | 512 | 16 | 128 | GB |
| Headroom | 0.05 | 0.40 | 0.05 | 0.20 | share of memory |

The effective bits per parameter for each precision are 16 for the 16-bit file, 8.5 for the 8-bit file, and 5.0 for the 4-bit file.

The three challenges, in this order:

| # | Parameters | Precision | Context | Memory | Model memory needed | Verdict | Feedback when wrong |
|---|---|---|---|---|---|---|---|
| 1 | 30.7 | 4-bit | 32,768 | 128 | 28.6 GB | Fits | Weights 30.7 × 5.0 ÷ 8 = 19.2 GB, cache 32,768 × 192 KiB = 6.4 GB, overhead 3 GB, total 28.6 GB, which is under the usable 102.4 GB. |
| 2 | 30.7 | 4-bit | 262,144 | 64 | 73.7 GB | Does not fit | Weights 19.2 GB, cache 262,144 × 192 KiB = 51.5 GB, overhead 3 GB, total 73.7 GB, which is above all 64 GB of memory. |
| 3 | 110 | 8-bit | 32,768 | 128 | 126.3 GB | Fits without headroom | Weights 110 × 8.5 ÷ 8 = 116.9 GB, cache 6.4 GB, overhead 3 GB, total 126.3 GB, which is under 128 GB and above the usable 102.4 GB. |

**Provenance:** The effective bits for the 4-bit file are rounded from the measured range of 4.4 to 5.7 in this chapter's table. The 8-bit value of 8.5 and the cache shape of 192 KiB per token are illustrative, and the sim labels them "illustrative, not a published figure". Challenge 1 compares with the measured 29 GB in this chapter.

**Rules:** Weights in GB = parameters × effective bits ÷ 8. Cache in GB = context × KV per token in KiB × 1,024 ÷ 10^9. Needed = weights + cache + overhead. Usable = memory × (1 − headroom). Verdict "Fits" when needed <= usable, "Fits without headroom" when usable < needed <= memory, and "Does not fit" when needed > memory. Values are shown to one decimal.

**Learner Activity:**

1. The learner reads challenge 1, whose inputs are shown, and types the memory needed in GB.
2. The learner chooses a verdict and presses Check.
3. The sim reveals the model value, the verdict, and the Feedback text, and marks the challenge correct or missed.
4. After all three challenges the exploration mode unlocks and the learner changes any of the seven quantities, watching a bar split into weights, cache, and overhead, with the usable limit and the memory marked.
5. In exploration the learner should notice that raising the context moves the cache term far more than changing the precision of a small model.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <model value> GB, <verdict>." Incorrect: the "Feedback when wrong" text for that challenge. After the second wrong attempt the model value and the worked calculation are shown, and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** Challenge 1 is shown with an empty answer box and its inputs displayed. The question on screen is "How much memory does this model need, and does it fit?"

**Chapter Anchors:** The chapter states 5.0 effective bits for a 4-bit file, 192 KiB of cache per token in the worked example, 3 GB of runtime overhead, a 20% headroom default, and the three verdicts; its worked results are 28.6 GB and 73.7 GB for the 30.7-billion-parameter model.
</details>

## Chapter Summary

A model's memory is its weights plus its KV cache plus a small runtime overhead. The weights are the parameter count times the bytes per weight, and a "4-bit" file measures nearer 5 bits per parameter once its scaling factors and higher-precision layers are counted. The cache grows with the context you configure, and it is reserved at the full setting. A mixture-of-experts model needs memory for all of its parameters while doing the work of only its active ones. A safety headroom turns the comparison into three verdicts, and on unified memory the memory to compare against is the system's available memory. The result is a prediction of the starting footprint, which a long run can exceed.

!!! mascot-celebration "You Can Predict a Fit Before You Download"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now estimate a model's weights, cache, and overhead, apply a headroom, and reach one of three verdicts that matches what this evaluation measured to within a few percent. Chapter 12 uses the calculation to choose which models are worth downloading at all.
