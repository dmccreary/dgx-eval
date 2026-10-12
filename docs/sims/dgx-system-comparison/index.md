---
title: "Three Kinds of DGX System"
description: "Compare three kinds of DGX system in columns, with a drawing of each device in the first row, then select the kind that matches each of six descriptions."
image: /sims/dgx-system-comparison/dgx-system-comparison.png
og:image: /sims/dgx-system-comparison/dgx-system-comparison.png
twitter:image: /sims/dgx-system-comparison/dgx-system-comparison.png
social:
   cards: false
quality_score: 100
status: built
library: Infographic overlay (grid-diagram.js)
bloom_level: Understand
---

# Three Kinds of DGX System

<iframe src="main.html" height="717px" width="100%" scrolling="no"></iframe>

[Run the Three Kinds of DGX System MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The name DGX covers machines that differ in shape, in processor architecture, and in where a model's weights live. This MicroSim puts three kinds of DGX system in three columns. The first row is a drawing of the device, and the rows below it give the typical shape, the CPU architecture, and the GPU memory arrangement.

The drawings are schematic and are not to scale. The mug beside the desktop personal system is there to show that the box is small.

## How to Use

- Read across a row to see what differs between the three kinds of system.
- In Explore mode, select a column to read an example product and what that kind of system changes in a setup.
- Choose Quiz Me, then select the column that matches each of the six descriptions. The score is shown beside the buttons.

## The Three Columns

1. **Desktop personal system** - A small box that holds one chip, with one pool of memory shared by the CPU and the GPU. The example is DGX Spark.
2. **Desktop workstation** - A tower with a large coherent memory pool that the CPU and the GPU both use. The example is DGX Station.
3. **Rack server** - Eight GPUs in one chassis, each with its own dedicated memory. The example is DGX H100.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/dgx-system-comparison/main.html"
        height="717px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will compare the three kinds of DGX system by shape, CPU architecture, and GPU memory arrangement, and select the kind that matches each of 6 descriptions, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- The table of three kinds of system in the NVIDIA DGX section of Chapter 5
- No prior knowledge of CPU architecture or unified memory is needed, because the chapter defines both after this MicroSim

### Activities

1. **Explore** (4 min): Read across each row, then select each column and read its example and its setup consequences.
2. **Predict** (2 min): Before choosing Quiz Me, say which kind of system needs a model split across GPUs, and why.
3. **Quiz** (4 min): Choose Quiz Me and select the column that matches each of the six descriptions.

### Assessment

A learner who has understood the comparison selects at least 5 of the 6 columns correctly on the first attempt, and can say which package build and which memory limit apply to each kind of system.

## Editing the Zones

The image holds the drawings and the row text. The column zones, the facts, and the quiz questions are in `data.json`. To move a zone, open `main.html?edit=true`, drag the corner handles, and copy the new coordinates into `data.json`.

## References

1. [Chapter 5: NVIDIA DGX Hardware Architecture](../../chapters/05-dgx-hardware-architecture/index.md) - The chapter of this book that teaches the concepts this MicroSim compares.
2. [NVIDIA DGX Platform](https://www.nvidia.com/en-us/data-center/dgx-platform/) - NVIDIA. The DGX product line, from desktop systems to rack servers.
3. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. The unified memory design of the system evaluated in this book.
4. [NVIDIA DGX Station](https://www.nvidia.com/en-us/products/workstations/dgx-station/) - NVIDIA. The desktop workstation and its coherent memory pool.
5. [Introduction to NVIDIA DGX H100](https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html) - NVIDIA. The rack server with eight GPUs of 80 GB each.
