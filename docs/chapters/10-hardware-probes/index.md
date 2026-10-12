---
title: "Python Hardware Probes"
description: "Turning hardware questions into Python measurements: probes for CPU, RAM, storage, GPU, driver, CUDA, temperature, and power, combined into a suite that writes a machine-readable report with identifying fields left out."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:09:49"
version: 1.11
---

# Python Hardware Probes

## Summary

This chapter turns hardware questions into measurements. Students write Python probes for CPU, RAM, storage, GPU, driver, CUDA, temperature, and power and combine them into a suite that emits a machine-readable report. They finish able to say what the machine really has and which setup branch applies.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Hardware Probe | 61 |
| Probe Script | 58 |
| Hardware Variation Branching | 1 |
| RAM Probe | 10 |
| Storage Probe | 8 |
| Machine-Readable Report | 8 |
| CPU Probe | 7 |
| psutil | 1 |
| nvidia-smi | 31 |
| JSON Report | 7 |
| Disk Read Benchmark | 1 |
| nvidia-smi Output | 25 |
| NVML | 2 |
| GPU Probe | 23 |
| NVML Python Bindings | 1 |
| GPU Power Draw | 6 |
| Probe Suite | 6 |
| GPU Temperature | 5 |
| GPU Memory Total and Free | 2 |
| Driver Version Probe | 1 |
| CUDA Version Probe | 1 |
| PyTorch CUDA Check | 1 |
| Vitals Logging | 2 |
| Probe Verification Test | 1 |
| Unified Memory Probe | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)
- [Chapter 8: Reproducible Python Environments with Conda](../08-conda-environments/index.md)

---

!!! mascot-welcome "Let the Machine Answer for Itself"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A specification sheet tells you what a machine was built to be, and a probe tells you what it is right now. By the end of this chapter you will have a script that reports your DGX's hardware as data, with nothing in it that you would be afraid to publish. Measure first, then decide!

## What This Chapter Covers

Chapter 5 listed the hardware questions, and Chapter 9 answered them by reading command output. That works once. This chapter makes the answers repeatable: a small Python program asks each question, records the answer in a file a machine can read, and can be run again after a driver update, a reboot, or a move to a different DGX.

The chapter builds the probes one at a time and then combines them. It ends with the habits that make a probe trustworthy, which are a test that the probe reads correctly, a report that leaves identifying details out by default, and a log that survives a machine that freezes.

## Probes

### Hardware Probe

A **hardware probe** is a small, read-only measurement of one fact about a machine: how many cores it has, how much memory is free, which GPU is installed. The word "measurement" matters. A probe reads the value from the machine, so it reports what is true now, whatever the specification sheet or the last person's notes say.

A probe has three parts: the question, the source it reads, and the form of the answer. The table lists the probes this chapter builds, with the source of each.

| Probe | Question it answers | Source it reads | Answer |
|---|---|---|---|
| CPU | Which architecture, and how many cores? | `platform`, `os`, `lscpu` | Text and an integer |
| RAM | How much memory is total, and how much is available? | `/proc/meminfo` | Gibibytes |
| Storage | How big is the disk, and how much is free? | `shutil.disk_usage` | Gigabytes |
| GPU | Which GPU, driver, temperature, and power? | `nvidia-smi` | Fields per GPU |
| CUDA | Which CUDA version does the driver support? | `nvidia-smi` header | A version string |
| Unified memory | Does the GPU have its own memory? | The GPU memory field | True or false |

### Probe Script

A **probe script** is a program that runs one or more probes and prints the results. A good one follows four rules, and each rule prevents a particular failure.

| Rule | Failure it prevents |
|---|---|
| Read only, never write | A probe that changes the machine it is measuring |
| Standard library only | A probe that cannot run on a fresh machine without an install |
| Bounded run time | A probe that hangs forever when a tool misbehaves |
| Report unknown as `null`, never guess | A report that looks complete and hides a failed measurement |

The helper below is the base of every probe in this chapter. It runs a command and returns its text, or `None` if the command is missing, fails, or takes longer than `timeout` seconds. Every later probe goes through it, so a missing `nvidia-smi` on a machine without a GPU produces an empty answer instead of a crash.

```python
import subprocess

def run(cmd, timeout=10):
    """Run a command and return its text output, or None if it fails."""
    try:
        out = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        return out.stdout if out.returncode == 0 else None
    except (OSError, subprocess.TimeoutExpired):
        return None
```

!!! mascot-thinking "A Probe That Cannot Say 'I Don't Know' Will Lie"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    If a probe returns zero when it cannot read the value, a failed measurement looks like a machine with no memory. Return `null` for anything you could not read, and a reader can tell a missing measurement from a measured zero.

## The Processor, Memory, and Storage Probes

### CPU Probe

The **CPU probe** reports the architecture and the core count. Both come from the standard library: `platform.machine()` returns `aarch64` or `x86_64`, and `os.cpu_count()` returns the number of logical cores. The model name comes from the `lscpu` command, which on a machine with two kinds of core prints one `Model name` line for each.

```python
import os, platform

def probe_cpu():
    models = []
    text = run(["lscpu"])
    if text:
        models = [l.split(":", 1)[1].strip() for l in text.splitlines()
                  if l.startswith("Model name")]
    return {"architecture": platform.machine(),
            "cores": os.cpu_count(),
            "model_names": models or None}
```

The answer drives the first branch of every setup: `aarch64` selects aarch64 packages, as Chapter 5 and Chapter 8 explained.

### RAM Probe

The **RAM probe** reports the system memory. The kernel publishes it in the file `/proc/meminfo`, one `Name: value kB` line per figure, where `kB` is really kibibytes. Two names matter: `MemTotal` is all the memory the system can use, and `MemAvailable` is what a new program could use without pushing others out. Available is the number to watch, because a large total with little available is a machine about to struggle.

```python
def probe_ram(meminfo_path="/proc/meminfo"):
    try:
        with open(meminfo_path) as f:
            kib = {}
            for line in f:
                key, rest = line.split(":", 1)
                kib[key] = int(rest.split()[0])
    except (OSError, ValueError):
        return {"total_gib": None, "available_gib": None}
    gib = lambda k: round(k / 1024 / 1024, 1)
    return {"total_gib": gib(kib["MemTotal"]),
            "available_gib": gib(kib["MemAvailable"])}
```

The path is a parameter on purpose. It lets a test hand the function a fake file, which the verification test below does.

### psutil

**psutil** is a third-party Python package that reports CPU, memory, disk, and process information through one portable interface. It replaces the file parsing above with calls such as `psutil.virtual_memory()`. It is worth installing in an environment you control, and this course does not depend on it, because the probes must run on a machine with nothing installed.

### Storage Probe

The **storage probe** reports the size and free space of a filesystem. The standard library has `shutil.disk_usage(path)`, which returns total, used, and free bytes for the disk that holds `path`. Disks are sold in decimal gigabytes, so the probe reports decimal values and says so.

```python
import shutil

def probe_storage(path="/"):
    usage = shutil.disk_usage(path)
    gb = lambda b: round(b / 1e9, 1)
    return {"total_gb": gb(usage.total), "free_gb": gb(usage.free)}
```

### Disk Read Benchmark

A **disk read benchmark** measures how fast the disk delivers data, which sets model load time as Chapter 5 described. It reads an existing large file for a fixed amount and divides the bytes by the seconds. The one trap is the operating system's page cache: a file read recently comes from memory, not the disk, and the number is far too high. Read a file that has not been touched since boot, such as a model file you have not loaded, and say so in the report.

## The GPU Probes

### nvidia-smi and Its Output

**`nvidia-smi`**, the NVIDIA System Management Interface, is the command-line tool that reports a GPU's state. It is installed with the driver, so its presence on a machine is itself a probe: no `nvidia-smi` usually means no driver.

Run with no arguments it prints a table meant for people. Before reading the table you need names for its fields, and each is defined here. The **driver version** is the release of the NVIDIA driver. The **CUDA version** is the newest CUDA runtime the driver supports. **Temperature** is the GPU's reading in degrees Celsius. **Power usage and cap** is the power the board is drawing now and the limit it enforces, in watts. **Memory usage** is memory in use over total, in mebibytes. **GPU utilization** is the share of the last sampling period in which the GPU was running work.

The listing below is illustrative, for a machine with one discrete GPU, and it has had the serial number, unique identifier, and bus address removed.

```text
+-----------------------------------------------------------------------+
| NVIDIA-SMI 580.xx.xx      Driver Version: 580.xx.xx    CUDA Version: 13.0 |
|-------------------------------+----------------------+----------------|
| GPU  Name                     | Temp  Perf  Pwr:Usage/Cap | Memory-Usage | GPU-Util |
|   0  NVIDIA H100 80GB HBM3    | 41C   P0    70W / 700W    | 0MiB / 81559MiB | 0%   |
+-----------------------------------------------------------------------+
```

A person reads that table at a glance. A script should not parse it, because its layout changes between versions. Which leads to the query form in the next concept.

### GPU Probe

The **GPU probe** asks `nvidia-smi` for exactly the fields it wants, in a form that is easy to parse. `--query-gpu` names the fields, and `--format=csv,noheader,nounits` asks for one comma-separated line per GPU with no header and no unit suffixes. A field the GPU cannot report comes back as `[N/A]` or `Not Supported`, and the `number` helper turns anything that is not a number into `None`.

```python
import re

def number(text):
    """Turn '45', '45.2', '[N/A]' or 'Not Supported' into a float or None."""
    try:
        return float(text)
    except (TypeError, ValueError):
        return None

def probe_gpu():
    query = ("name,driver_version,temperature.gpu,power.draw,"
             "utilization.gpu,memory.total,memory.used")
    text = run(["nvidia-smi", "--query-gpu=" + query,
                "--format=csv,noheader,nounits"])
    if not text:
        return {"gpus": [], "cuda_version": None, "unified_memory": None}
    gpus = []
    for line in text.strip().splitlines():
        f = [x.strip() for x in line.split(",")]
        gpus.append({"name": f[0], "driver": f[1],
                     "temperature_c": number(f[2]), "power_w": number(f[3]),
                     "utilization_pct": number(f[4]),
                     "memory_total_mib": number(f[5]),
                     "memory_used_mib": number(f[6])})
    header = run(["nvidia-smi"]) or ""
    m = re.search(r"CUDA Version:\s*([\d.]+)", header)
    unified = all(g["memory_total_mib"] is None for g in gpus)
    return {"gpus": gpus, "cuda_version": m.group(1) if m else None,
            "unified_memory": unified}
```

Five of the concepts in the chapter's list are read from this one function, and each is a field of the answer.

| Concept | Field in the answer | Notes |
|---|---|---|
| Driver version probe | `driver` | One string per GPU |
| CUDA version probe | `cuda_version` | Parsed from the plain header, because the query form lacks it |
| GPU temperature | `temperature_c` | Compare with the watchdog ceiling of Chapter 5 |
| GPU power draw | `power_w` | The GPU's draw, not the whole machine's |
| GPU memory total and free | `memory_total_mib`, `memory_used_mib` | `None` on unified memory |

### GPU Memory Total and Free, and the Unified Memory Probe

**GPU memory total and free** is the memory the GPU reports for itself, and it is the figure that decides model fit on a machine with dedicated GPU memory. The **unified memory probe** is the check that those fields are missing. When every GPU's total comes back as `None`, the probe sets `unified_memory` to true, and the reader knows that the figure to use is the system RAM probe's `available_gib`.

This is a branch in the report, and the worked example is the whole reason the probe exists. On a discrete-GPU server, the usable model size is the GPU's free memory. On the unit in this evaluation, it is the system's available memory minus the headroom Chapter 11 introduces.

### NVML and the Python Bindings

**NVML**, the NVIDIA Management Library, is the C library that `nvidia-smi` itself is built on. It exposes the same readings through function calls. The **NVML Python bindings**, installed as the `nvidia-ml-py` package, let a Python program call it directly, which is faster than starting a new `nvidia-smi` process for every reading and gives access to fields the command does not print.

The cost is a dependency. This course uses the `nvidia-smi` query for the same reason it avoids `psutil`: it has to run on a fresh machine. In a long-running monitor, where a process starts every few seconds, the bindings are the better tool.

### PyTorch CUDA Check

The **PyTorch CUDA check** asks the machine-learning stack, not the driver, whether a GPU is usable. It is the probe that catches a CPU-only PyTorch build, which Chapter 8 warned about. It needs PyTorch installed, so it is the one probe here that belongs in a conda environment.

```python
import torch
print(torch.cuda.is_available())            # True only if a GPU is usable
print(torch.cuda.get_device_name(0))        # for example 'NVIDIA GB10'
```

If `nvidia-smi` lists a GPU and this prints `False`, the driver is fine and the problem is the PyTorch build or its CUDA version.

## Putting the Probes Together

### Probe Suite

A **probe suite** is a set of probes run together to produce one report. The suite below calls the four probes and returns their answers in one dictionary. Keeping the probes separate and the suite thin means a single failing probe cannot take the others with it, and each probe can be tested alone.

```python
import json

def probe_suite():
    return {"cpu": probe_cpu(), "ram": probe_ram(),
            "storage": probe_storage(), "gpu": probe_gpu()}

if __name__ == "__main__":
    print(json.dumps(probe_suite(), indent=2))
```

Saved as `probe_suite.py` together with the functions above, the program runs on any machine with Python 3 and writes its report to standard output. It can be sent to a remote machine without being copied, with the pipe from Chapter 9.

```bash
ssh <user>@<dgx-host> 'python3 -' < probe_suite.py > report.json
```

### Machine-Readable Report and JSON Report

A **machine-readable report** is output in a form that a program can parse without guessing, in contrast to text written for a person. A **JSON report** is the form this course uses: nested key-value pairs in a plain text file, readable by every language and by people. The reason to produce one is that later steps consume it. A model-fit calculator reads `available_gib`, and a benchmark runner records the whole report beside each result so that a number is never separated from the machine that produced it.

The report below is illustrative. The values are plausible for a unified-memory machine and were not taken from a specific unit.

```json
{
  "cpu":     { "architecture": "aarch64", "cores": 20,
               "model_names": ["Cortex-X925", "Cortex-A725"] },
  "ram":     { "total_gib": 119.0, "available_gib": 100.0 },
  "storage": { "total_gb": 1000.0, "free_gb": 780.0 },
  "gpu":     { "gpus": [ { "name": "NVIDIA GB10", "driver": "580.xx.xx",
                           "temperature_c": 44.0, "power_w": 4.0,
                           "utilization_pct": 0.0,
                           "memory_total_mib": null, "memory_used_mib": null } ],
               "cuda_version": "13.0", "unified_memory": true }
}
```

Two things in the report are worth noticing. The two `null` values in the GPU's memory fields are not an error: they are the unified-memory signature, and `unified_memory` is true because of them. And the report contains no hostname, no address, and no account name, which is deliberate.

### Hardware Variation Branching

**Hardware variation branching** is choosing the next setup step from the report instead of from assumption. The function below reads a report and returns the branches that apply. It is the Chapter 5 matcher as code, and the branches it names are the ones used throughout the later chapters.

```python
def setup_branch(report):
    branches = []
    arch = report["cpu"]["architecture"]
    branches.append("aarch64 packages" if arch == "aarch64" else "x86_64 packages")
    gpu = report["gpu"]
    if not gpu["gpus"]:
        branches.append("no GPU: CPU only")
    elif gpu["unified_memory"]:
        branches.append("size models against system RAM")
    elif len(gpu["gpus"]) > 1:
        branches.append("plan to split across GPUs")
    else:
        branches.append("size models against one GPU's memory")
    return branches
```

### Redacted by Default

A report that is safe to publish is built from fields that are safe, not cleaned afterward. **Redacted-by-default fields** are the identifying details a probe never collects unless asked. The suite above reads no hostname, no username, no network address, no serial number, and no GPU unique identifier, so none can reach the file. A probe that never reads an identifier cannot leak it.

| Collected by default | Left out unless explicitly requested |
|---|---|
| Architecture, core count, CPU model | Hostname and domain name |
| Total and available memory | Account name and home directory |
| Disk size and free space | Network addresses and MAC addresses |
| GPU name, driver, CUDA version | Serial number, GPU unique identifier |
| Temperature, power, utilization | Tailnet name and access rules |

!!! mascot-warning "Leaving a Field Out Beats Cleaning It Later"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A report captured with every field and then edited by hand relies on you not missing one in four hundred lines. Decide the fields at the source: never read the identifier, and the review in Chapter 23 only has to confirm that you did not.

## Trusting a Probe

### Probe Verification Test

A **probe verification test** checks that a probe reads correctly by giving it input whose right answer is known. The RAM probe takes its file path as a parameter for exactly this reason: a test writes a small fake `meminfo` file with a total of 125,829,120 kB, which is 120 GiB, and an available figure of 104,857,600 kB, which is 100 GiB, and asserts what the probe returns.

```python
import tempfile, os

d = tempfile.mkdtemp()
path = os.path.join(d, "meminfo")
with open(path, "w") as f:
    f.write("MemTotal:       125829120 kB\n"
            "MemFree:             1000 kB\n"
            "MemAvailable:   104857600 kB\n")

assert probe_ram(path) == {"total_gib": 120.0, "available_gib": 100.0}
assert number("[N/A]") is None and number("45.2") == 45.2
print("probes read correctly")
```

The test also confirms the two behaviors that protect you from a silent wrong answer: a value that is not a number becomes `None`, and a missing file produces `None` fields, not an exception that stops the suite.

!!! mascot-tip "Test the Parser With Output That Lies"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Feed each probe a deliberately awkward input: `[N/A]`, an empty string, a missing file. The inputs a real machine produces on its worst day are the ones that break a parser, and you can write them down before that day.

### Vitals Logging

**Vitals logging** is recording a few measurements at a fixed interval while a long job runs, so that a machine that fails leaves its last readings behind. It uses the same probes in a loop. The loop below writes one JSON line every 30 seconds with the available memory, the GPU temperature, and the power draw. `flush` and `fsync` ask the operating system to put the line on the disk now, since a machine that freezes does not get to finish its buffers.

```python
import json, os, time

with open("vitals.txt", "a") as out:
    while True:
        gpu = probe_gpu()["gpus"]
        row = {"t": int(time.time()),
               "mem_available_gib": probe_ram()["available_gib"],
               "gpu_temp_c": gpu[0]["temperature_c"] if gpu else None,
               "gpu_power_w": gpu[0]["power_w"] if gpu else None}
        out.write(json.dumps(row) + "\n")
        out.flush()
        os.fsync(out.fileno())
        time.sleep(30)
```

This is the same idea as the `log_vitals.sh` script in this project, which writes memory, GPU temperature, power, and load every 30 seconds. It was added after a unit stopped responding and left no record of why. Start it before any long run, and the last line it wrote becomes the evidence. Chapter 18 pairs it with a watchdog that acts on the same readings.

#### Diagram: nvidia-smi Output Reader


<iframe src="../../sims/nvidia-smi-reader/main.html" width="100%" height="584px" scrolling="no"></iframe>
[Run nvidia-smi Output Reader Fullscreen](../../sims/nvidia-smi-reader/main.html)

<details markdown="1">
<summary>nvidia-smi Output Reader</summary>
Type: microsim
**sim-id:** nvidia-smi-reader<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret 6 highlighted fields of an `nvidia-smi` listing by choosing what each one reports, with at least 5 of 6 correct.

**Prerequisites:** nvidia-smi, driver version, CUDA version, GPU temperature, GPU power draw, GPU memory total and free, GPU utilization (all defined in the sections above this block).

**Evidence of Mastery:** The sim shows the illustrative listing from Content with one field highlighted at a time. For each of the 6 highlighted fields the learner commits one meaning from the six listed before the sim reveals the answer. A choice is correct when it equals the Correct meaning column. Mastery is 5 of 6 correct on the first attempt. Reading the listing is exploration, not evidence.

**Misconceptions:** (1) The CUDA version is the toolkit installed on the machine. (2) The power figure is the whole machine's draw. (3) A figure in MiB is the same as one in MB. (4) A GPU at 0% utilization is not working correctly.

**Instructional Rationale:** Interpreting a terse field needs the learner to attach a meaning and a unit to it, so each highlighted field is a case where a plausible wrong meaning exists in the choices. Committing before the reveal separates reading from guessing.

**Content:**

The illustrative listing, a machine with one discrete GPU, shown with the serial number, unique identifier, and bus address removed:

```text
NVIDIA-SMI 580.xx.xx    Driver Version: 580.xx.xx    CUDA Version: 13.0
GPU  Name                  Temp  Perf  Pwr:Usage/Cap   Memory-Usage       GPU-Util
  0  NVIDIA H100 80GB HBM3  41C   P0   70W / 700W      0MiB / 81559MiB    0%
```

The six meanings the learner chooses from: "The release of the NVIDIA driver", "The newest CUDA runtime the driver supports", "GPU temperature in degrees Celsius", "Power the board draws now over its power limit", "GPU memory in use over total memory", and "Share of the last sampling period the GPU was running work".

| # | Highlighted field | Correct meaning | Why (shown as feedback) |
|---|---|---|---|
| 1 | `Driver Version: 580.xx.xx` | The release of the NVIDIA driver | It names the installed driver, which is what the operating system uses to reach the GPU. |
| 2 | `CUDA Version: 13.0` | The newest CUDA runtime the driver supports | It is a ceiling set by the driver, not the version of any toolkit installed on the machine. |
| 3 | `41C` | GPU temperature in degrees Celsius | The unit C marks Celsius, and it is the reading of the GPU, not the room. |
| 4 | `70W / 700W` | Power the board draws now over its power limit | The first value is current draw and the second is the cap, and neither is the whole machine's draw. |
| 5 | `0MiB / 81559MiB` | GPU memory in use over total memory | MiB are mebibytes, so the total is about 80 GiB, shown as in use over total. |
| 6 | `0%` | Share of the last sampling period the GPU was running work | A GPU with no running work reads 0%, which is normal for an idle machine. |

**Provenance:** The listing is illustrative, written for this exercise, and the sim labels it "illustrative". Field meanings come from the "nvidia-smi and Its Output" section of this chapter.

**Rules:** Fields are highlighted in the fixed order 1 to 6, and each allows one final choice. Exactly one of the six meanings is correct for each field. A meaning may be used for only one field.

**Learner Activity:**

1. The learner sees the listing with field 1 highlighted.
2. The learner chooses one of the six meanings and confirms.
3. The sim shows the correct meaning and the Why text, and marks the field correct or incorrect.
4. The learner repeats for fields 2 to 6. After field 6 the sim shows the score and the misconception behind each miss.

**Feedback:** Six fields, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct meaning and the Why text. The final score reads "n of 6 correct".

**Starting State:** The listing is shown with the driver version highlighted, and the question on screen is "What does this field report?"

**Chapter Anchors:** The chapter states that the CUDA version is the newest runtime the driver supports, that power usage and cap are in watts, that memory is in mebibytes, and that a field the GPU cannot report appears as `[N/A]` or `Not Supported`.
</details>

## Chapter Summary

A hardware probe is a read-only measurement, and a probe script gathers several under four rules: read only, standard library only, bounded time, and `null` for anything it could not read. The CPU, RAM, storage, and GPU probes answer the questions of Chapter 5, with `nvidia-smi` queried in its machine-readable form, and the missing GPU memory fields give the unified-memory probe. The suite writes a JSON report that omits identifying fields by default, and the setup branch is chosen from the report. A verification test feeds each probe known input, and a vitals log records the last readings before a machine fails.

!!! mascot-celebration "The Machine Now Reports in Data"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now write read-only probes, combine them into a suite that produces a JSON report without identifying fields, and branch your setup on what it says. Chapter 11 uses that report to predict whether a model will fit before you download it.
