---
title: "Reproducible Python Environments with Conda"
description: "How isolated, pinned conda environments make an evaluation reproducible: creating, activating, exporting, and rebuilding environments, conda versus pip, architecture-specific wheels, and CUDA-enabled PyTorch."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:06:30"
version: 1.11
---

# Reproducible Python Environments with Conda

## Summary

This chapter shows how an isolated conda environment makes an evaluation reproducible. Students create, activate, pin, export, and rebuild environments, handle architecture-specific wheels, and install CUDA-enabled PyTorch. They finish with an environment specification that can rebuild the full software stack on a fresh machine.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Python Environment | 52 |
| pip | 9 |
| Miniforge | 29 |
| Environment Isolation | 18 |
| requirements.txt | 3 |
| Architecture-Specific Wheels | 3 |
| PyTorch | 3 |
| Conda | 28 |
| Conda Create Command | 25 |
| Conda Versus pip | 1 |
| Package Channel | 1 |
| Dedicated Tool Environment | 15 |
| Conda Activate Command | 5 |
| Python Version Pinning | 3 |
| CUDA-Enabled PyTorch | 2 |
| Conda Remove Command | 1 |
| Conda List and Export | 4 |
| Reproducibility | 2 |
| environment.yml | 3 |
| Environment Rebuild | 2 |
| Install Script | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)

---

!!! mascot-welcome "Build the Toolbox Once, Rebuild It Anywhere"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    An evaluation whose software cannot be rebuilt is a story, not a measurement, because nobody can check it. By the end of this chapter you will have an environment specification that rebuilds your tools on a fresh machine, and a way to prove that it did. Measure first, then decide!

## What This Chapter Covers

Chapter 7 reached the machine. This chapter prepares the software that will run against it. The aim is narrow: every Python tool in this course should run from an environment you can delete, rebuild, and compare, so that a surprising result can be traced to a cause instead of to "something I installed last week".

The chapter covers what an environment is and why isolating it matters, the conda tool that manages environments, and the difference between conda and pip. It then handles the two traps that DGX machines add, which are architecture-specific packages and CUDA-enabled PyTorch, and it ends with the specification file and install script that make a rebuild a single command.

## What an Environment Is

### Python Environment

A **Python environment** is a self-contained directory that holds a Python interpreter and the packages installed for it, together with a script that points your shell at them. Activating an environment puts its interpreter and packages first on your path, so the `python` command runs that interpreter and `import` finds those packages and no others.

The need for one is easiest to see by what happens without it. Suppose two projects share one system Python. The first needs version 1 of a library and the second needs version 2, and a package can exist in only one version at a time in one place. Installing for the second project silently breaks the first. The break may not show up until a script that worked last month fails with an error about a function that no longer exists.

The table sets out what an environment contains, so that its parts are not mysterious later.

| Part | What it is | Where it lives |
|---|---|---|
| Interpreter | The `python` executable, of one version | Inside the environment directory |
| Packages | Libraries installed for that interpreter | A `site-packages` folder in the environment |
| Activation script | Changes the shell's path to use the environment | Run by the activate command |
| Metadata | A record of what was installed | A `conda-meta` folder, for conda environments |

!!! mascot-thinking "An Environment Is a Directory You Can Throw Away"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Once you see an environment as just a folder, the discipline follows. You never repair a broken one. You delete it and rebuild it from the specification, which is a faster and more trustworthy fix than finding the one package that drifted.

### Environment Isolation

**Environment isolation** is keeping each environment separate so that a change in one cannot affect another. It is what turns the list of packages from a shared, mutable pile into a record that belongs to one purpose.

A real instance from this course's tooling shows the stakes. Two documentation build tools each depend on the same markdown-extension package, and each pins a different version of it. Installed together in one environment, they cannot both be satisfied, and installing the second breaks the first. The fix was not a cleverer install. It was to give each tool its own environment, so that neither one had to agree with the other.

## Conda

### Conda and Miniforge

**Conda** is a package and environment manager. It creates environments, installs packages into them, and records what it installed. Unlike a tool that handles only Python libraries, conda also installs the non-Python programs a library depends on, and Python itself, so an environment can contain a whole stack.

**Miniforge** is a minimal installer for conda that is set up to use the community-maintained conda-forge channel by default. It is the installer this course uses. The alternative, a distribution from a commercial vendor, brings a default channel with licensing terms that can require a paid license for larger organizations, and a book whose readers are professionals in unknown organizations should not depend on that.

### Package Channel

A **package channel** is a server that hosts packages for conda to download. When you ask for a package, conda searches the channels in order. The channel you use decides which packages and versions exist for you, and it decides who built them.

The course uses `conda-forge`, which is large, community-maintained, and builds packages for both x86_64 and aarch64. A specification should always name its channel explicitly, because an unnamed channel falls back to whatever a particular machine has configured, and two machines can then resolve the same list differently.

### The Create, Activate, and Remove Commands

The **conda create command** makes a new environment. Its parts are worth reading before you run it. `-n dgx` names the environment. `-c conda-forge` names the channel to search. Everything after is the packages to install, and a version after an equals sign pins it.

```bash
conda create -n dgx -c conda-forge python=3.12 psutil
```

The **conda activate command** switches your shell into the environment, and the prompt shows its name.

```bash
conda activate dgx
```

The **conda remove command** deletes the environment. `conda env remove -n dgx` removes the directory and its record, and it is the first step of a rebuild.

!!! mascot-warning "Activation Belongs to Interactive Shells"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The `conda activate` function is defined by your shell's startup files, so a script or an agent running in a non-interactive shell may fail with a permission or "command not found" error. Call the environment's executables by their full path, or use `conda run -n dgx <command>`, and the failure goes away.

### Python Version Pinning

**Python version pinning** is fixing the interpreter's version in the environment's specification. Writing `python=3.12` fixes the major and minor version, and conda chooses the newest 3.12 patch release. Writing `python=3.12.4` fixes the patch release too.

Pinning matters because a minor release can change behavior, and a compiled package is built for one interpreter version. A machine that rebuilds your environment a year later without a pin gets a newer Python, which may not have wheels for every package you use.

### Dedicated Tool Environment

A **dedicated tool environment** is an environment that exists for one tool or one job and holds nothing else. In this evaluation the tools for reaching the DGX live in one, named `dgx`, which holds the Tailscale client and daemon and nothing else. The environment that builds this book is a different one.

The separation pays off three ways.

- **A break is contained.** Breaking the build tool's environment cannot take out remote access.
- **The record is meaningful.** The `dgx` environment's package list is exactly what reaching the DGX needs, with nothing accumulated from other work.
- **Removal is clean.** When the project ends, one command removes everything it installed.

### Conda List and Export

The **conda list** command prints the packages in the active environment with their versions. The **export** command writes the environment to a file. The two forms of export differ in a way that decides whether the file can be used on another machine.

| Export form | What it records | Portable across architectures? |
|---|---|---|
| `conda env export` | Every package, with exact builds | No: the builds are specific to one platform |
| `conda env export --from-history` | Only the packages you asked for | Yes: conda resolves the rest for the new platform |

The listing has four columns that are worth knowing by name. The sanitized example below shows the `dgx` tool environment, with the filesystem path and the last digits of each version replaced.

```text
# packages in environment at <conda-prefix>/envs/dgx:
#
# Name          Version    Build        Channel
python          3.12.4     h...         conda-forge
tailscale       1.xx.x     h...         conda-forge
tailscaled      1.xx.x     h...         conda-forge
```

`Name` and `Version` are what you pin. `Build` identifies the exact compiled variant, and it is the column that makes a full export platform-specific. `Channel` records where the package came from, which is how you notice a package that arrived from somewhere you did not intend. The environment holds only what the tool needs, which is the point of a dedicated environment.

A full export taken on a Mac with an Arm laptop chip lists builds that exist only for that platform. Rebuilding from it on a Linux aarch64 DGX fails with a list of packages that cannot be found. Exporting from history avoids this, at the price of letting each dependency resolve to whatever is current, unless you pin them in the file yourself.

## The Specification and the Rebuild

### environment.yml

An **`environment.yml`** file is the specification of a conda environment. It names the environment, lists the channels in order, and lists the packages, with pins where you want them. It is the file that goes into the repository, because it is small, readable, and enough to rebuild.

```yaml
name: dgx
channels:
  - conda-forge
dependencies:
  - python=3.12
  - tailscale
  - tailscaled
```

### requirements.txt and Conda Versus pip

A **`requirements.txt`** file is pip's equivalent: a list of Python packages, one per line, with optional version pins. It is created by `pip freeze` and installed with `pip install -r requirements.txt`.

**pip** installs Python packages from the Python Package Index. **Conda versus pip** is a question of scope: pip handles only Python packages, while conda handles Python, non-Python libraries, and tools. The rule that avoids most trouble is to install with conda first, and use pip only for what conda does not have, and to do the pip installs last. Going back and forth lets pip replace a package conda installed, and conda's record is then wrong about what is present.

| | conda | pip |
|---|---|---|
| Installs Python itself | Yes | No |
| Installs non-Python programs | Yes, such as Tailscale | No |
| Package source | Channels such as conda-forge | The Python Package Index |
| Records its work in | `conda-meta` and `environment.yml` | `requirements.txt` |
| Use it for | The base of the environment | Packages conda lacks, installed last |

### Architecture-Specific Wheels

A **wheel** is the file format for a built Python package, and an **architecture-specific wheel** is one built for a particular processor architecture. Its filename says which. Reading a filename, simplified here for clarity, shows what an installer checks:

```text
numpy-1.26.4-cp312-cp312-manylinux_2_17_aarch64.whl
        |       |      |        |             |
        |       |      |        |             processor architecture
        |       |      |        operating system and library version
        |       |      application binary interface
        |       Python version (3.12)
        package version
```

On an aarch64 machine, pip accepts only wheels whose last tag is `aarch64`. If a package publishes only x86_64 wheels, pip falls back to compiling it from source, which is slow, needs a compiler, and can fail. Chapter 5 introduced the two architectures, and this is where the difference becomes a failed install.

### PyTorch and CUDA-Enabled PyTorch

**PyTorch** is a widely used library for numeric computing and neural networks. This course uses it for one narrow purpose: to confirm that the GPU is visible to Python's machine-learning stack. **CUDA-enabled PyTorch** is the build of PyTorch compiled to use an NVIDIA GPU. The default install on some platforms is a CPU-only build, and it imports without any error, so a missing GPU shows up only when you ask.

Two lines establish which build you have. The first prints the CUDA version the build was compiled for, which is `None` for a CPU-only build. The second asks whether a GPU is usable right now.

```python
import torch
print(torch.version.cuda)          # for example '13.0'; None means a CPU-only build
print(torch.cuda.is_available())   # True only if the driver and a GPU are usable
```

!!! mascot-tip "Test the GPU, Not the Import"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    `import torch` succeeds on a CPU-only build, so it proves nothing about the GPU. Make `torch.cuda.is_available()` part of the rebuild check. A model that silently runs on the CPU looks like a performance problem when it is an install problem.

### Reproducibility

**Reproducibility** is the property that someone else, or you on another day, can repeat a procedure and get the same result. For an environment it means the same specification produces the same software. It is what makes a benchmark checkable: a result that cannot be reproduced cannot be disputed either, because nobody can tell what was measured.

An environment specification covers the interpreter version, the package versions, and the channel they came from. It does not cover the operating system, the GPU driver, the CUDA libraries installed by the system, or the model weights. Those are separate pieces of the stack, and Chapter 4's version pinning and Chapter 12's checksum verification handle them.

### Install Script

An **install script** is a program that takes a machine from its starting state to a working tool set with no manual steps. It is the written-down version of your setup, and it is the strongest form of reproducibility because it runs.

A good one pins what it installs and verifies what it downloads. The excerpt below is from this project's model-server installer. `V` pins the release version, and `F` is the archive for the machine's architecture. The script downloads a published list of checksums and the archive, computes the archive's SHA-256 value, and stops if the two differ.

```bash
V=v0.40.2
F=ollama-linux-arm64.tar.zst
expected=$(grep "$F\$" sha256sum.txt | awk '{print $1}')
actual=$(sha256sum "$F" | awk '{print $1}')
[ "$expected" = "$actual" ] || { echo "sha256 MISMATCH"; exit 1; }
```

Three habits make a script worth trusting: it stops at the first error, it pins every version it installs, and it prints the versions it ended up with, so a log shows what a run used.

### Environment Rebuild

An **environment rebuild** is creating an environment again from its specification and confirming that it matches the original. A specification you have never rebuilt from is an unverified claim. The rebuild is the test.

The sequence below creates a throwaway environment from the file, checks that it works, and compares its package list with the original's. Each command is explained before it runs: `conda env create -f` builds from the file, `-n dgx-test` gives it a different name so it does not overwrite the original, and `conda list --export` prints the packages in a comparable form.

```bash
conda env create -n dgx-test -f environment.yml
conda run -n dgx-test tailscale version
diff <(conda list -n dgx --export) <(conda list -n dgx-test --export)
conda env remove -n dgx-test
```

An empty `diff` means the rebuild matches. A few differing lines are the packages that were not pinned and resolved to a newer release, and they are exactly what to pin next.

#### Diagram: Environment Reproducibility Auditor


<iframe src="../../sims/environment-reproducibility-auditor/main.html" width="100%" height="544px" scrolling="no"></iframe>
[Run Environment Reproducibility Auditor Fullscreen](../../sims/environment-reproducibility-auditor/main.html)

<details markdown="1">
<summary>Environment Reproducibility Auditor</summary>
Type: microsim
**sim-id:** environment-reproducibility-auditor<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether each of 6 environment specifications rebuilds the same software on a second machine, and name the reason, with at least 5 of 6 correct.

**Prerequisites:** environment.yml, Python version pinning, package channel, architecture-specific wheels, conda export forms, CUDA-enabled PyTorch, environment rebuild (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 6 specifications the learner commits a verdict ("Reproducible" or "Not reproducible") and, for a "Not reproducible" verdict, one reason from the five listed in Content, before the sim reveals the answer. An item is correct when the verdict equals the Correct verdict column and, if the verdict is "Not reproducible", the reason equals the Correct reason column. Mastery is 5 of 6 correct on the first attempt. Reading the specifications is exploration, not evidence.

**Misconceptions:** (1) A file that lists packages is automatically reproducible. (2) A full export from one machine rebuilds on any machine. (3) A package that imports without error has the capabilities you need. (4) An unnamed channel is harmless.

**Instructional Rationale:** Evaluate-level judging needs criteria applied to a case, so each specification fails, if it fails, for exactly one reason named in the chapter. A mix of failing and passing items prevents the learner from assuming every file is flawed.

**Content:**

The five reasons the learner can choose from: "Unpinned versions", "Platform-specific builds", "No channel named", "May install a CPU-only build", and "None, it is reproducible" (the last is valid only with the verdict "Reproducible").

| # | Specification shown to the learner | Correct verdict | Correct reason | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Channels: `conda-forge`. Packages: `python`, `numpy`, `psutil`, no versions. | Not reproducible | Unpinned versions | A rebuild installs whatever is newest on that day, which can differ from the original. |
| 2 | Channels: `conda-forge`. Packages: `python=3.12.4`, `numpy=1.26.4`, `psutil=5.9.8`. | Reproducible | None, it is reproducible | The channel is named and every package is pinned. |
| 3 | A full `conda env export` taken on a Mac with an Arm laptop chip, used to rebuild on a Linux aarch64 machine. | Not reproducible | Platform-specific builds | The export lists builds that exist only for the Mac's platform, so they cannot be found on Linux. |
| 4 | `pip install torch` run on an aarch64 machine with no index named and no CUDA check afterward. | Not reproducible | May install a CPU-only build | The default build can lack CUDA, and the import succeeds anyway. |
| 5 | Packages: `python=3.12`, `psutil=5.9.8`, and no channel listed. | Not reproducible | No channel named | The rebuild uses whatever channels the second machine has configured, so it may resolve differently. |
| 6 | An `environment.yml` exported with `--from-history`, naming `conda-forge` and pinned versions, plus an install script that creates the environment and then runs `python -c "import psutil"`. | Reproducible | None, it is reproducible | It is pinned, names its channel, is portable, and verifies itself. |

**Provenance:** The specifications are synthetic, written for this exercise, and the sim labels them "synthetic example". The package versions are illustrative.

**Rules:** Specifications are shown in the fixed order 1 to 6. For each, the learner chooses a verdict, and a reason when the verdict is "Not reproducible". A verdict of "Reproducible" is correct only with the reason "None, it is reproducible". Choices are final once confirmed.

**Learner Activity:**

1. The learner reads specification 1.
2. The learner chooses "Reproducible" or "Not reproducible", and if the latter, one of the four failure reasons, then confirms.
3. The sim shows the correct verdict and reason with the Why text, and marks the item correct or incorrect.
4. The learner repeats for specifications 2 to 6. After specification 6 the sim shows the score and, for each miss, the misconception behind it.

**Feedback:** Six items, fixed order, one confirmed pair of choices each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct verdict, the correct reason, and the Why text. The final score reads "n of 6 correct".

**Starting State:** Specification 1 is shown with no verdict chosen, and the question on screen is "Would a second machine rebuild exactly this environment?"

**Chapter Anchors:** The chapter states that an unpinned package, a platform-specific export, an unnamed channel, and a possibly CPU-only build each defeat a rebuild, and that `--from-history` is the portable export.
</details>

## Chapter Summary

An environment is a directory holding an interpreter and packages, and isolating one per purpose keeps a change in one place from breaking another. Conda creates, activates, exports, and removes environments, and installs non-Python software that pip cannot. A specification is reproducible only when it names its channel, pins the interpreter and its packages, and is exported in a form that crosses platforms. On a DGX the two extra traps are wheels built for the wrong architecture and a PyTorch build with no CUDA, and both are caught by checking, not by importing. A rebuild from the specification is the test, and an install script is the specification that runs.

!!! mascot-celebration "You Can Rebuild Your Tools on Demand"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now write an `environment.yml` that names its channel and pins its versions, rebuild it into a throwaway environment, and diff the result against the original. Chapter 9 uses the `dgx` environment to install Tailscale and take a first inventory.

[See Annotated References](./references.md)
