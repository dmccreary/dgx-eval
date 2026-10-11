---
title: Parameters That Fit in Memory
description: Move a memory slider to see the largest model whose weights fit in memory, marked by one dashed line on a fixed chart of ten candidate models placed by parameter count.
image: /sims/model-fit-by-memory/model-fit-by-memory.png
og:image: /sims/model-fit-by-memory/model-fit-by-memory.png
twitter:image: /sims/model-fit-by-memory/model-fit-by-memory.png
social:
   cards: false
quality_score: 100
status: built
---

# Parameters That Fit in Memory

<iframe src="main.html" height="682px" width="100%" scrolling="no"></iframe>

[Run the Parameters That Fit in Memory MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A model's weights have to fit in memory before the model can run at full
speed. This MicroSim turns an amount of memory into a parameter count.

The chart itself never changes. The ten points are the
[model candidates](../../appendices/model-candidates.md), one per row, placed by parameter
count and ordered from the smallest to the largest. A solid point is a model
tested in this evaluation, and a ring is one not yet tested. All ten have now
been tested, so a ring appears only if you add a model of your own. A second scale
under the axis shows the memory those parameters need at 4-bit precision.

The slider moves one thing: a dashed line at the largest model whose weights
fit. A model to the left of the line fits. A model to the right does not, and
it would slow badly or fail to load. The slider starts at 128 GB, the unified
memory in each DGX unit used in this evaluation.

## How to Use

- Drag the **Memory** slider. Only the dashed line moves. The box under the
  chart shows the arithmetic and names any model that no longer fits.
- Point at a model's row to see how much memory its weights need, the size of
  its real download, and whether it fits at the current setting. For a
  mixture-of-experts model it also shows how few parameters are active for
  each token.
- Press **Reset** to return to 128 GB.

Try three settings: 128 GB, where every model fits; 64 GB, where the two
largest fall to the right of the line; and 16 GB, where only the two smallest
fit.

## Changing the Models

The models and the assumptions are not written into the program. They are read
from `model-data.json`, a file in the same folder as the MicroSim. Edit that
file and reload the page.

| Field | Meaning |
|---|---|
| `defaultMemoryGB` | Where the slider starts, and where Reset returns it |
| `keptFreeFraction` | Share of memory kept free for the system and the context |
| `bitsPerParameter` | Precision of the weights that the dashed line is drawn for |
| `axisMaxBillions` | Parameter count at the right end of the axis |
| `models` | The list of models, in any order |

Each entry in `models` has a `name`, its `parametersBillions`, the `downloadGB`
of its 4-bit file, and `tested` as `true` or `false`. A mixture-of-experts
model can also give `activeBillions`. The rows share a fixed height, so a
longer list makes each row thinner.

The MicroSim must be opened through a web server, because a browser will not
read a data file for a page opened from a local folder. To use the program in
the p5.js editor, upload `model-data.json` to the sketch as well.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/model-fit-by-memory/main.html"
        height="682px"
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

At 128 GB, that leaves 102 GB for weights. At 4 bits, one billion parameters
take half a gigabyte, so the dashed line sits at 205 billion parameters.

Precision changes the answer in proportion. Set `bitsPerParameter` to 8 in the
data file and the line moves to 102 billion. Set it to 16 and it moves to 51
billion.

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

Each memory figure is a single measurement. The parameter counts for the
Qwen models are taken from their names. Every download size in the data file
is the size reported after the model was downloaded for testing.

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
   memory at which each of the two largest models first fits.
2. **Guided Practice** (5 min): Without the MicroSim, work out the largest
   model that fits in a 48 GB system at 4-bit. Check the answer with the
   slider.
3. **Assessment** (5 min): A 70-billion-parameter model is to run on a 64 GB
   system at 4-bit. State whether it fits, then explain why the real answer
   may be worse than the formula says.

### Assessment

A learner who can apply the formula can:

- Convert a parameter count and a precision into gigabytes of weights
- Find the largest model that fits in a given memory at a given precision
- Name two things the formula leaves out and say which direction each one pushes

## References

1. [gpt-oss-120b Model Card](https://huggingface.co/openai/gpt-oss-120b) - OpenAI. States 117 billion parameters and describes the 4-bit format of the released weights.
2. [Gemma 4 in the Ollama Library](https://ollama.com/library/gemma4) - Ollama. Lists the parameter counts and download sizes of the Gemma 4 models.
3. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. Source for the 128 GB of unified memory shared by the CPU and the GPU.
