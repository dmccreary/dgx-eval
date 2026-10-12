---
title: "NVIDIA DGX Hardware Architecture"
description: "The DGX family and the hardware that decides what a local model can do: CPU architecture, system RAM, GPU, dedicated versus unified memory, storage, power, thermals, DGX OS, the driver, and CUDA."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 22:59:52"
version: 1.11
---

# NVIDIA DGX Hardware Architecture

## Summary

This chapter introduces the NVIDIA DGX family without assuming a specific model. It covers CPU architecture, system RAM, GPU configuration, dedicated versus unified memory, storage, power, thermals, DGX OS, the driver, and CUDA. Students finish able to explain how each hardware variation changes the setup steps that follow.

## Concepts Covered

This chapter covers the following 27 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| GPU | 226 |
| Storage Capacity | 46 |
| System RAM | 40 |
| CPU Architecture | 19 |
| NVIDIA DGX | 74 |
| Power Draw | 24 |
| Unified Memory | 13 |
| Storage Read Speed | 10 |
| CPU Core Count | 8 |
| aarch64 Architecture | 5 |
| Dedicated GPU Memory | 4 |
| x86_64 Architecture | 2 |
| GPU Configuration | 2 |
| Memory Bandwidth | 1 |
| NVMe Storage | 1 |
| DGX OS | 41 |
| Thermals | 7 |
| DGX Product Family | 4 |
| Multi-GPU System | 1 |
| Thermal Design Power | 1 |
| NVIDIA Driver | 40 |
| DGX Spark | 3 |
| CUDA | 6 |
| NVIDIA GB10 | 2 |
| Compute Capability | 1 |
| Blackwell Architecture | 1 |
| CUDA Cores | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Know the Machine Before You Ask It for Anything"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Every later chapter branches on what this hardware actually has, so a few minutes spent here saves hours of confusing failures. By the end you will be able to read a machine's specification and say which setup steps it changes. Measure first, then decide!

## What This Chapter Covers

A DGX is not one machine. The name covers a desktop box that holds one chip and a rack-mounted server that holds eight GPUs, and the two need different setup steps, different packages, and different ways of asking whether a model fits. This course therefore treats the hardware as a set of questions to answer before anything is installed.

The chapter takes the questions in the order a setup follows. It starts with the product family, then the processor, memory, GPU, storage, power and cooling, and finally the three software layers that sit directly on the hardware: the operating system, the driver, and CUDA. Every section ends on the same point, which setup step changes depending on the answer.

One machine runs through the chapter as the worked example. It is the DGX Spark-class unit used in this evaluation, and its measured values appear next to the general rule each time. Chapter 10 turns every question here into a Python probe that measures it.

## The DGX Family

### NVIDIA DGX

**NVIDIA DGX** is NVIDIA's line of systems built for AI work, sold as complete machines with the hardware, the operating system, and the GPU software already matched to each other. A buyer receives a computer on which the driver, the compute libraries, and a container runtime are installed and known to work together, which removes the most common source of setup trouble on a self-assembled GPU server.

The line spans a wide range, and the range is the reason this course does not assume one model.

| Kind of system | Typical shape | CPU architecture | GPU memory arrangement |
|---|---|---|---|
| Desktop personal system | Small box on a desk | aarch64 | One chip, memory shared with the CPU |
| Desktop workstation | Tower with a large coherent memory pool | aarch64 | Memory shared with the CPU |
| Rack server | Eight GPUs in one chassis | x86_64 | Each GPU has its own dedicated memory |

The MicroSim below draws the same three kinds of system side by side, with each device in the first row. Select a column to read what that kind of system changes in a setup, then choose Quiz Me to check that you can tell the three apart.

#### Diagram: Three Kinds of DGX System

<iframe src="../../sims/dgx-system-comparison/main.html" width="100%" height="717px" scrolling="no"></iframe>
[Run Three Kinds of DGX System Fullscreen](../../sims/dgx-system-comparison/main.html)

<details markdown="1">
<summary>Three Kinds of DGX System</summary>
Type: infographic
**sim-id:** dgx-system-comparison<br/>
**Library:** Infographic overlay (grid-diagram.js)<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the three kinds of DGX system by shape, CPU architecture, and GPU memory arrangement, and select the kind that matches each of 6 descriptions, with at least 5 of 6 correct.

**Prerequisites:** The table of three kinds of system above this block. CPU architecture, unified memory, and dedicated GPU memory are defined later in this chapter, and the sim uses them only as labels.

**Evidence of Mastery:** In Quiz Me mode the learner selects the column that matches each of the 6 descriptions listed in Content. Mastery is 5 of 6 selected correctly on the first attempt. Opening a column in Explore mode is exploration, not evidence.

**Misconceptions:** (1) Every DGX is a rack server. (2) Every DGX has the same processor architecture. (3) Every DGX GPU has its own memory.

**Instructional Rationale:** A comparison at the Understand level needs the three systems visible at once, with the same attribute in the same row, so the learner reads across a row to see what differs. The drawing in the first row ties each column to a physical shape. The image stays still and the overlay adds detail only when the learner asks for it, which suits a comparison better than animation does.

**Content:**

The image is a grid of three columns and four rows. The first row is a drawing of the device, and the other three rows repeat the table above.

| Row | Desktop personal system | Desktop workstation | Rack server |
|---|---|---|---|
| Device | A small box on a desk, next to a mug | A tower standing on the floor | A rack chassis with eight GPU modules showing |
| Typical shape | Small box on a desk | Tower with a large coherent memory pool | Eight GPUs in one chassis |
| CPU architecture | aarch64 | aarch64 | x86_64 |
| GPU memory | One chip, memory shared with the CPU | Memory shared with the CPU | Each GPU has its own dedicated memory |

Each column is one overlay zone. Selecting a zone in Explore mode shows an example product and what that kind of system changes in a setup: which package build to download and what a model is sized against.

The six descriptions in Quiz Me mode are these.

| # | Description shown to the learner | Correct column |
|---|---|---|
| 1 | `uname -m` prints `x86_64`. Which kind of system are you logged in to? | Rack server |
| 2 | Which kind of system is the DGX Spark, the machine this evaluation used? | Desktop personal system |
| 3 | A model's weights take 100 GB. On which kind of system must the model be split across GPUs before it can load? | Rack server |
| 4 | Which kind of system puts the CPU and the GPU on one chip? | Desktop personal system |
| 5 | Which kind of system is a tower whose CPU and GPU use one large coherent memory pool? | Desktop workstation |
| 6 | Which of the two desktop systems has the larger memory pool? | Desktop workstation |

**Provenance:** The shape, architecture, and memory rows repeat the table above. The 128 GB figure comes from the Unified Memory section, and the DGX H100 figures come from the Dedicated GPU Memory section. The drawings are schematic and are not to scale.

**Learner Activity:**

1. The learner reads across each row to find what differs between the three kinds.
2. The learner selects each column in turn and reads its example and its setup consequences.
3. The learner chooses Quiz Me and selects the column that matches each description.

**Feedback:** A correct selection shows "Correct!" and moves to the next description after the learner confirms. An incorrect selection names the column that was selected and lets the learner try again. The final line reads "You correctly identified n of 6".

**Starting State:** Explore mode, with no column selected and the prompt "Click on any column to learn about it."
</details>

A **DGX product family** is the set of DGX models that share a design generation and a purpose. Models within a family differ in memory size and price, and families differ in nearly everything else. The practical lesson is that "I have a DGX" does not tell you how much memory a model may use, which processor architecture your downloads must match, or whether the GPUs can be treated as one device.

### DGX Spark, NVIDIA GB10, and the Blackwell Architecture

**DGX Spark** is the small desktop member of the family and the machine this evaluation used. It is built around a single chip, the **NVIDIA GB10**, which combines an Arm processor and a GPU in one package and connects them to one pool of memory. The GB10's GPU belongs to the **Blackwell architecture**, which is NVIDIA's name for one generation of GPU design. A generation name matters because software is compiled for a generation, and a library built for an older one may not run, or may run slowly, on a newer one.

Following one real inventory shows what these names turn into. The two units in this evaluation reported the same configuration.

| Component | Reported value |
|---|---|
| System | DGX Spark-class desktop, aarch64 |
| CPU | 20 Arm cores, 10 Cortex-X925 and 10 Cortex-A725 |
| Memory | 128 GB unified, shared by the CPU and the GPU |
| Storage | 1 TB NVMe SSD |
| GPU | NVIDIA GB10, Blackwell architecture, 6,144 CUDA cores |
| Operating system | DGX OS 7.4 on Ubuntu 24.04 |
| Driver and compute | NVIDIA driver 580, CUDA 13.0 |

Each row of this table is one of the sections below. The first thing to notice is that the table contains no mention of a separate GPU memory figure. That absence is the most important fact about this machine, and the memory section explains why.

## The Processor

### CPU Architecture

**CPU architecture** is the instruction set a processor executes. Two matter here. **x86_64** is the architecture of nearly all desktop, laptop, and server processors from Intel and AMD, and it is what most downloadable software is built for. **aarch64** is the 64-bit Arm architecture, used in phones, in recent laptops, and in the GB10 chip. The two are not compatible: a program compiled for one cannot run on the other without translation.

The reason this affects your work is packaging. Compiled Python packages are distributed as **wheels** built for one architecture and one operating system, and a download site chooses the right wheel by asking the machine what it is. On an aarch64 system a package without an aarch64 build either fails to install or compiles from source, which is slow and sometimes impossible. Chapter 8 covers wheels in detail.

The check takes one command, and its answer is the first branch of every setup.

```bash
uname -m
```

On the unit in this evaluation it prints `aarch64`. The same command on a typical rack DGX prints `x86_64`. A reader who copies an install command from a tutorial written for x86_64 will hit an architecture mismatch here, and the fix is to find the aarch64 build, not to retry.

!!! mascot-warning "The Download Page Assumes Your Architecture"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Many install pages offer an x86_64 file first, and a download that completes on an aarch64 machine will still fail when you run it. Run `uname -m` before downloading, and pick the file whose name says `arm64` or `aarch64`.

### CPU Core Count

**CPU core count** is the number of independent processing units on the processor, and it sets how many tasks the CPU can run truly at once. The unit in this evaluation has 20 cores. For model inference the GPU does most of the arithmetic, so the core count matters less than for other workloads. It still decides how fast the CPU-side work runs: tokenizing a prompt, running the harness, executing the tools a model calls, and building the site with MkDocs.

A worked example makes the point. A book build that runs on one core takes the same time on 4 cores or 20, so a build is bounded by single-core speed. A benchmark that runs two model servers and two harness containers at once has four busy processes, and 20 cores keep them from competing. Read the count with `nproc`, and treat anything above 8 as comfortable for this workload.

## Memory and the GPU

### System RAM

**System RAM** is the main memory of the computer, the fast storage where running programs keep their data. Everything the machine does at once shares it: the operating system, the model server, the harness, and any other process. A program that needs more than is free either slows down by swapping to disk or is stopped by the operating system.

On a conventional server, system RAM and GPU memory are separate pools. The model weights live in GPU memory, and system RAM holds everything else. Whether that separation exists on your machine is the single largest fact about it, and it is defined by the next two concepts.

### Dedicated GPU Memory

**Dedicated GPU memory** is memory that belongs to the GPU alone, mounted on the GPU's own board and connected to it by a very fast link. A model loaded onto such a GPU must fit entirely in that memory, because the GPU cannot use the system's RAM at full speed. A rack DGX with eight GPUs has eight separate pools, each of a fixed size, and each pool is a hard limit for the part of the model placed on it.

A worked example from a published configuration: a DGX H100 holds eight H100 GPUs with 80 GB each, 640 GB in total. A model whose weights take 100 GB cannot be placed on one of these GPUs, however much system RAM the server has. It must be split across at least two GPUs, and the software that does the splitting is a setup step of its own.

### Unified Memory

**Unified memory** is a single pool of memory shared by the CPU and the GPU, so that both read and write the same physical chips. The GB10 uses it, and its 128 GB is the whole of the machine's memory, with nothing set aside for the GPU. The GPU has no memory of its own.

The consequences run in both directions, and they are the reason the model-fit chapters in this course exist.

- **A larger model can fit.** The limit is the whole pool, not a slice of it. A 65 GB model that would not fit on a single 24 GB gaming GPU loads on this machine.
- **Everything competes.** The weights, the conversation context, the operating system, and every other program take memory from the same 128 GB. A model that fits on paper can still starve the system.
- **A memory exhaustion can freeze the whole machine.** On a discrete-GPU system, running out of GPU memory stops one process. On unified memory, the pool is also what the operating system runs on, and this evaluation had a unit stop responding during a long run. The cause was not confirmed, and memory exhaustion is the leading suspect.

!!! mascot-thinking "The GPU Does Not Have Its Own Memory Here"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    On a unified-memory machine, "GPU memory" and "system memory" are two names for one pool. Every calculation you learned for a discrete GPU changes: the weights, the context, and the operating system all draw on the same number, and the headroom you leave is the only thing between a slow run and a frozen machine.

The tools reflect this. On the unit in this evaluation, `nvidia-smi` reports the GPU's memory as `Not Supported`, because there is no separate figure to report. Memory use has to be read from the system side, with `free -h`. Chapter 10 builds that fallback into the memory probe.

### Memory Bandwidth

**Memory bandwidth** is how many bytes per second the memory can deliver to the processor. Generating one token requires reading the model's active weights from memory, so bandwidth, not arithmetic, usually limits how fast a model generates. This is why two models of different size run at very different speeds on the same machine.

This evaluation measured the effect directly. A mixture-of-experts model that reads about 4 billion parameters for each token ran at 86 to 130 tokens per second. A dense model of about 31 billion parameters on the same unit ran at 28 to 40. The dense model reads roughly eight times as many weights per token and runs about three times slower, so the speed does not fall in strict proportion. Bandwidth sets the ceiling, and other costs fill in the rest. Chapter 11 defines dense and mixture-of-experts models.

### GPU

A **GPU**, or graphics processing unit, is a processor built to run many simple operations at once. It started as hardware for drawing images, and its design turned out to suit the matrix arithmetic that neural networks consist of. A language model generating text is almost entirely matrix arithmetic, and a GPU does it far faster than a CPU can. Without one, the models in this course would take minutes per sentence.

Two properties of a GPU matter for choosing and running a model: how much memory it can use, and which software it supports. The memory property was the previous section. The software property is its **compute capability**, a version number NVIDIA assigns to each GPU generation that tells the software which GPU features exist. A library compiled with support for compute capability 8.0 will run on an A100, whose capability is 8.0, and may refuse to run on a GPU with a capability it was not built for. The H100's capability is 9.0, and the GB10's is published as 12.1.

A **CUDA core** is one of the small arithmetic units inside an NVIDIA GPU. The GB10 has 6,144 of them. The count is a rough indicator of raw arithmetic capacity and a poor indicator of model speed, because speed depends as much on memory bandwidth and on how well the software uses the cores. Compare machines on memory and measured tokens per second, not on core count.

A **GPU configuration** is how many GPUs a system has and how they are connected, and a **multi-GPU system** is one that has more than one. Two or more GPUs let a model larger than any single GPU's memory run, by splitting its layers or its experts across them, at the price of splitting software and a loss of speed to the traffic between GPUs. The unit in this evaluation has one GPU, so none of this applies to it, and the course notes only where a multi-GPU system would change a step.

The next table gathers the three memory arrangements and what each one changes, now that each is defined.

| Arrangement | Where weights live | What limits model size | Example |
|---|---|---|---|
| Unified memory | The one shared pool | The whole pool, minus the system's own use | DGX Spark |
| One GPU, dedicated memory | That GPU's memory | One GPU's capacity | A workstation with one discrete GPU |
| Several GPUs, dedicated memory | Split across the GPUs | The sum of the GPUs, minus splitting overhead | DGX H100, eight GPUs of 80 GB |

## Storage

### Storage Capacity

**Storage capacity** is the amount of data the disk can hold. A model is a file, often many gigabytes, and a benchmark of several models stores all of them on disk at once, plus their downloads in different formats. Capacity is the first limit you meet, ahead of memory, when you collect candidates.

A worked example uses this evaluation's own numbers. The unit has a 1 TB drive with about 780 GB free after the operating system. The ten candidate models took about 397 GB together, because two of them were on disk in two formats, which doubled their size. That leaves roughly 380 GB, enough for the book output and the container image, and not enough for a second large model family. Check free space with `df -h /` before starting a pull, because a download that fills the disk fails partway through.

### NVMe Storage and Storage Read Speed

**NVMe storage** is solid-state storage that connects directly to the processor over a fast bus, instead of through the older interface used by hard drives. It is the storage type in current DGX systems. **Storage read speed** is how many bytes per second the drive delivers when you read from it, and for a model it sets the **model load time**, the delay between asking for a model and being able to use it.

The relation is simple division, and it is worth doing once. A 20 GB model file read at 2 GB per second takes 10 seconds to load. The same file from a hard drive at 0.15 GB per second takes over two minutes. A server that unloads an idle model and reloads it on the next request pays this cost each time, so a fast drive makes a differently configured server practical. Chapter 10 measures read speed with a simple timed read.

## Power and Thermals

### Power Draw

**Power draw** is the electrical power the system consumes, measured in watts. It matters for three reasons: it sets the running cost, it sets the heat that has to leave the box, and it bounds what circuit and uninterruptible power supply the machine needs. A GPU-heavy machine draws far more under load than at rest, so a single number misleads, and a measurement needs the workload that produced it.

One worked example ties this chapter to the cost chapter. A published review measured 60 to 90 W for many model workloads on this class of machine, and just under 200 W at the most. This evaluation's own logging read 69 W from the GPU, with the GPU at 92% utilization, during one run. The cost analysis uses a deliberately high 150 W while generating and 40 W idle, which comes to about 832 kWh a year at 50% utilization and under $120 in electricity. Chapter 6 builds that calculation, and the point to carry from here is that electricity is a small part of the cost of owning this machine.

### Thermal Design Power and Thermals

The **thermal design power**, or TDP, is the amount of heat a cooling system is designed to remove from a chip under sustained load. It is a cooling specification, not a measurement of draw: a chip can draw less than its TDP most of the time, and brief bursts can exceed it. It is useful for one purpose, which is judging whether the machine's cooling is sized for the load you plan to put on it.

**Thermals** is the general term for the temperatures a system reaches and how it manages them. As a chip heats up, it reduces its own speed to stay within safe limits, which is called thermal throttling and which Chapter 15 measures. A long benchmark is the situation where this shows, because short tests finish before the chassis reaches its steady temperature.

In this evaluation the memory-and-temperature watchdog used a ceiling of 95 degrees Celsius for the GPU, and logged the temperature every 30 seconds. One reading, taken 43 seconds into a heavy run, was 72 degrees. A single early reading proves little. A reading that climbs steadily over an hour and approaches the ceiling is the sign to improve airflow or to shorten runs.

!!! mascot-tip "Log Temperature Before You Need It"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A machine that overheats or freezes cannot tell you what happened afterward. Start a script that writes temperature, power, and memory to a file every 30 seconds before any long run, and the last line it wrote becomes your evidence.

## The Software Directly on the Hardware

### DGX OS

**DGX OS** is NVIDIA's operating system for DGX systems: a customized Linux distribution, based on Ubuntu, with the NVIDIA driver, CUDA, the container runtime, and system tuning installed and tested together. The unit in this evaluation runs DGX OS 7.4 on Ubuntu 24.04. The practical meaning is that ordinary Ubuntu instructions work, and that NVIDIA's own components are already present and compatible.

Two commands identify the system, and both are safe to run. The first prints the Ubuntu release, and the second prints the kernel and architecture.

```bash
grep -E '^(NAME|VERSION)=' /etc/os-release
uname -srm
```

!!! warning "Some system files contain identifiers"

    On DGX OS, `/etc/dgx-release` includes the unit's serial number. Read it with `grep -v SERIAL /etc/dgx-release`, and never paste its raw contents into a file you plan to publish. Chapter 23 treats this class of file as a source of leaks.

DGX OS also determines who may do what. The account used in this evaluation belongs to a user the machine's administrator created, with no administrator rights, so installing system packages is not possible and everything was installed into the home directory. Chapter 6 treats administrator privileges as a cost and a dependency.

### NVIDIA Driver

The **NVIDIA driver** is the software that lets the operating system and programs talk to the GPU. Nothing uses a GPU without it, and every GPU program is limited by what the installed driver supports. The version is a single number, and it decides which CUDA versions can run. The unit in this evaluation has driver 580.

The first line of `nvidia-smi` output holds both versions that matter. The block below is sanitized and abbreviated: the serial number, the GPU's unique identifier, and the bus address that a full listing carries have been removed, and the version numbers are shown with their last digits replaced.

```text
+-----------------------------------------------------------------+
| NVIDIA-SMI 580.xx.xx    Driver Version: 580.xx.xx   CUDA Version: 13.0 |
|-----------------------------+------------------+----------------|
| GPU  Name        Persistence-M | Temp  Perf  Pwr:Usage/Cap | Memory-Usage |
|   0  NVIDIA GB10          On  | 44C   P8    4W / N/A      | Not Supported |
+-----------------------------------------------------------------+
```

Reading it from left to right, `580.xx.xx` is the driver release. `CUDA Version: 13.0` is the highest CUDA runtime that driver can support, not the version of any toolkit installed on the machine. The GPU is idle in this listing, which is why the performance state is P8 and the power is a few watts. `Not Supported` in the memory column is the unified-memory signature described above.

Driver trouble has a recognizable shape. A program reports that it found no CUDA device, or that the driver is too old for the CUDA runtime it was built with. The first diagnostic step is always the same: run `nvidia-smi`. If it lists the GPU and a driver version, the driver works, and the problem is in what is built on top of it.

### CUDA

**CUDA** is NVIDIA's platform for running general computation on its GPUs, and it is the layer that frameworks and inference servers use to reach the GPU. It has two parts that are easy to confuse. The **CUDA runtime** is the set of libraries a program is built against, and it ships inside the programs that use it. The **CUDA version** the driver reports is the newest runtime the driver can support.

The rule that follows from this is that the driver sets a ceiling and a program must be at or below it. This machine's driver supports CUDA 13.0, so a framework built for CUDA 12.8 runs and one built for CUDA 13.2 does not. Updating a driver needs administrator rights, so on a machine you do not administer the practical fix is to pick a framework build at or below the driver's version.

Putting the stack in order shows why a failure in one layer looks like a failure in all of them.

| Layer | What it is | How to check it | The failure it causes |
|---|---|---|---|
| Hardware | GPU, memory, storage | `nvidia-smi`, `free -h`, `df -h` | No device, or not enough memory |
| DGX OS | Linux with NVIDIA components | `cat /etc/os-release` | Wrong package source |
| NVIDIA driver | Lets software use the GPU | `nvidia-smi` | "No CUDA device" or "driver too old" |
| CUDA | The compute platform | `nvidia-smi`, framework check | A library built for a newer CUDA fails |
| Inference server | Loads and runs the model | Its own log | Model does not load or fit |

#### Diagram: Hardware Finding to Setup Branch Matcher


<iframe src="../../sims/hardware-branch-matcher/main.html" width="100%" height="534px" scrolling="no"></iframe>
[Run Hardware Finding to Setup Branch Matcher Fullscreen](../../sims/hardware-branch-matcher/main.html)

<details markdown="1">
<summary>Hardware Finding to Setup Branch Matcher</summary>
Type: microsim
**sim-id:** hardware-branch-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply the hardware-to-setup rules of this chapter to 6 findings by choosing the setup branch each finding triggers, with at least 5 of 6 correct.

**Prerequisites:** CPU architecture, x86_64, aarch64, dedicated GPU memory, unified memory, multi-GPU system, NVIDIA driver, CUDA (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 6 findings the learner commits one branch from the six listed in Content before the sim reveals the answer. A choice is correct when it equals the Correct branch column. Mastery is 5 of 6 correct on the first attempt. Reading the finding text is exploration, not evidence.

**Misconceptions:** (1) Every DGX has dedicated GPU memory. (2) A download that completes will run on any DGX. (3) `nvidia-smi` always reports how much GPU memory there is. (4) A newer CUDA build is always better.

**Instructional Rationale:** Apply-level work needs the learner to use a rule on a new case, so each finding is a realistic probe result that triggers exactly one branch. Committing before the reveal separates a reasoned choice from recognition.

**Content:**

The six setup branches the learner chooses from are: "Use aarch64 packages", "Use x86_64 packages", "Size models against one shared memory pool", "Size models against one GPU's dedicated memory", "Plan to split the model across several GPUs", and "Choose a CUDA build at or below the driver's version".

| # | Finding shown to the learner | Correct branch | Why (shown as feedback) |
|---|---|---|---|
| 1 | `uname -m` prints `aarch64`. | Use aarch64 packages | The processor is Arm, so only builds for aarch64 will run. |
| 2 | `uname -m` prints `x86_64`. | Use x86_64 packages | The processor is Intel or AMD, so builds for x86_64 are the ones that run. |
| 3 | `nvidia-smi` lists one GPU with memory reported as `Not Supported`; `free -h` shows about 120 GiB of memory. | Size models against one shared memory pool | The GPU has no memory of its own, so the system's memory is the limit. |
| 4 | `nvidia-smi` lists one GPU with 80 GB of memory; `free -h` shows 512 GiB. | Size models against one GPU's dedicated memory | The weights must fit in the GPU's own 80 GB, however much system RAM there is. |
| 5 | `nvidia-smi` lists eight GPUs of 80 GB each. | Plan to split the model across several GPUs | A model larger than 80 GB can run only if it is divided across the GPUs. |
| 6 | The driver reports CUDA 13.0; the framework build you downloaded needs CUDA 13.2. | Choose a CUDA build at or below the driver's version | The driver sets a ceiling, and a runtime above it will not start. |

**Provenance:** The findings are synthetic examples written for this exercise, and the sim labels them "synthetic example". The meanings of the branches come from the sections of this chapter above.

**Rules:** Findings are shown in the fixed order 1 to 6. Each finding allows exactly one branch choice, and the choice is final. A finding is correct only when the chosen branch equals the Correct branch. Each finding triggers exactly one branch of the six.

**Learner Activity:**

1. The learner reads finding 1.
2. The learner chooses one of the six branches and confirms.
3. The sim shows the correct branch and the Why text, and marks the finding correct or incorrect.
4. The learner repeats for findings 2 to 6. After finding 6 the sim shows the score and, for each miss, the misconception behind it.

**Feedback:** Six findings, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct branch and the Why text. The final score reads "n of 6 correct".

**Starting State:** Finding 1 is shown with no branch chosen, and the question on screen is "Which setup branch does this finding trigger?"

**Chapter Anchors:** The chapter states that aarch64 and x86_64 builds are not interchangeable, that on unified memory the GPU has no memory of its own and `nvidia-smi` reports it as `Not Supported`, that a model larger than one GPU's dedicated memory must be split across GPUs, and that the driver sets a ceiling on the CUDA version.
</details>

## Chapter Summary

The hardware answers six questions before any software is installed. The processor's architecture, x86_64 or aarch64, decides which downloads run. The memory arrangement, unified or dedicated, decides how a model's size is judged and what a memory shortage does to the machine. The GPU's compute capability and the driver's CUDA ceiling decide which libraries start. Storage capacity and read speed decide how many models you can keep and how long a load takes, and power draw and thermals decide the running cost and whether a long run is safe.

The DGX Spark-class unit in this evaluation answers them as follows: aarch64, 20 cores, one GPU with no memory of its own, 128 GB of unified memory, 1 TB of NVMe storage, a draw well under 200 W, DGX OS 7.4, driver 580, and CUDA 13.0.

!!! mascot-celebration "The Machine Is No Longer a Black Box"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now read a DGX's specification and say which packages it needs, how a model's size is judged on it, and which layer to check when something fails. Chapter 6 puts a price on all of it.

[See Annotated References](./references.md)
