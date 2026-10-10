---
title: Parameters That Fit in Memory
description: Move a memory slider to see how many model parameters fit at 16-bit, 8-bit, and 4-bit precision, and which candidate models fall inside each limit.
image: /sims/model-fit-by-memory/model-fit-by-memory.png
og:image: /sims/model-fit-by-memory/model-fit-by-memory.png
twitter:image: /sims/model-fit-by-memory/model-fit-by-memory.png
social:
   cards: false
quality_score: 100
status: built
---

# Parameters That Fit in Memory

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Parameters That Fit in Memory MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A model's weights have to fit in memory before the model can run. This
MicroSim turns an amount of memory into a parameter count. The slider sets the
memory, and the three vertical lines show the most parameters that fit at
16-bit, 8-bit, and 4-bit precision.

The slider starts at 128 GB, the unified memory in each DGX unit used in this
evaluation. The five points are the models the evaluation considered. Four were
tested. The fifth, drawn as a ring, was considered and not downloaded.

## How to Use

- Drag the **Memory** slider. The limits move, and each model's point changes
  color to show the highest precision at which it still fits.
- Point at a model's row to see how much memory its weights need at each
  precision, next to the size of its real download.
- Press **Reset** to return to 128 GB.

Try three settings: 128 GB, where every model fits at 4-bit; 64 GB, where the
two largest stop fitting; and 32 GB, where even a 27-billion-parameter model
needs 4-bit.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/model-fit-by-memory/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## The Formula

The MicroSim uses two lines of arithmetic. First it keeps 20% of memory free
for the operating system and the conversation context. Then it divides what is
left by the size of one parameter:

```text
memory for weights  = memory × 0.80
parameters that fit = memory for weights × 8 ÷ bits per parameter
```

At 128 GB, that leaves 102 GB for weights. One billion parameters at 8 bits
take 1 GB, so the limits are 51 billion at 16-bit, 102 billion at 8-bit, and
205 billion at 4-bit.

## What the Formula Leaves Out

The formula is a first estimate. Measurements from this evaluation show two
ways it runs low.

| Model | Parameters | Formula at 4-bit | Actual download | In memory, 32,000-token context |
|---|---|---|---|---|
| `gemma4:26b` | 25.2 billion | 13 GB | 18 GB | 24 GB |
| `qwen3.8:27b` | 27 billion | 14 GB | 17 GB | 24 GB |
| `gemma4:31b` | 30.7 billion | 15 GB | 20 GB | 29 GB |
| `gpt-oss:120b` | 117 billion | 59 GB | 65 GB | 69 GB |

- **A 4-bit file is larger than 4 bits per parameter.** These four downloads
  work out to between about 4.4 and 5.7 bits per parameter, because a
  quantized file keeps some layers at higher precision.
- **The context takes memory too.** Each model used several gigabytes beyond
  its download at a 32,000-token context. At a 256,000-token context, the
  machine holding `gemma4:31b` showed 71 GB in use with the model idle. Its
  download is 20 GB, so the rest is far more than the 20% this MicroSim sets
  aside.

Each memory figure is a single measurement. The parameter counts for the two
Qwen models are taken from their names.

## Lesson Plan

### Learning Objective

Calculate whether a model with a given parameter count fits in a given amount
of memory at a given precision.

### Grade Level

Professional development and adult continuing education

### Duration

10-15 minutes

### Prerequisites

- A bit, a byte, and a gigabyte
- That a language model is a large set of numeric parameters

### Activities

1. **Exploration** (5 min): Move the slider from 8 GB to 256 GB. Note the
   memory at which each model first fits at 4-bit, then at 8-bit.
2. **Guided Practice** (5 min): Without the MicroSim, work out the limits for
   a 48 GB system. Check the answers with the slider.
3. **Assessment** (5 min): A 70-billion-parameter model is to run on a 64 GB
   system. State the precision it needs, then explain why the real answer may
   be worse than the formula says.

### Assessment

A learner who can apply the formula can:

- Convert a parameter count and a precision into gigabytes of weights
- Find the largest model that fits in a given memory at each precision
- Name two things the formula leaves out and say which direction each one pushes

## References

1. [gpt-oss-120b Model Card](https://huggingface.co/openai/gpt-oss-120b) - OpenAI. States 117 billion parameters and describes the 4-bit format of the released weights.
2. [Gemma 4 in the Ollama Library](https://ollama.com/library/gemma4) - Ollama. Lists the parameter counts and download sizes of the Gemma 4 models.
3. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. Source for the 128 GB of unified memory shared by the CPU and the GPU.
