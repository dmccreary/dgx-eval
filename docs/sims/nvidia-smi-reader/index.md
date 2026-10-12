---
title: "nvidia-smi Output Reader"
description: "Read six outlined fields of an nvidia-smi listing and choose what each one reports."
image: /sims/nvidia-smi-reader/nvidia-smi-reader.png
og:image: /sims/nvidia-smi-reader/nvidia-smi-reader.png
twitter:image: /sims/nvidia-smi-reader/nvidia-smi-reader.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Understand
---

# nvidia-smi Output Reader

<iframe src="main.html" height="584px" width="100%" scrolling="no"></iframe>

[Run the nvidia-smi Output Reader MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An nvidia-smi listing packs the driver release, a CUDA version, temperature, power, memory, and utilization into three lines. Several fields have a plausible wrong reading, such as taking the CUDA version for an installed toolkit.

This MicroSim outlines one field at a time. The listing is illustrative and shows a machine with one discrete GPU. It carries no serial number, unique identifier, or bus address.

## How to Use

- Find the outlined field in the listing. It is repeated in words under the listing.
- Select one meaning from the list. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/nvidia-smi-reader/main.html"
        height="584px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will interpret 6 highlighted fields of an `nvidia-smi` listing by choosing what each one reports, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Nvidia-smi
- Driver version
- CUDA version
- GPU temperature
- GPU power draw
- GPU memory total and free
- GPU utilization

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): The memory field ends in MiB. Work out the total in GiB and explain why it is not the same number in GB.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- The CUDA version is the toolkit installed on the machine.
- The power figure is the whole machine's draw.
- A figure in MiB is the same as one in MB.
- A GPU at 0% utilization is not working correctly.

## References

1. [Chapter 10: Python Hardware Probes](../../chapters/10-hardware-probes/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [NVIDIA System Management Interface](https://docs.nvidia.com/deploy/nvidia-smi/index.html) - NVIDIA. The reference for every field that nvidia-smi prints.
3. [CUDA](https://en.wikipedia.org/wiki/CUDA) - Wikipedia. The NVIDIA computing platform whose version the driver limits.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
