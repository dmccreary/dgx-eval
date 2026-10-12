---
title: Glossary of Terms
description: "Definitions of the 506 concepts in DGX Evaluation for Textbook Generation, in alphabetical order, each with an example and links to related terms."
---

# Glossary of Terms

#### 4-Bit Quantization

A level that stores each weight in about 4 bits, roughly a quarter of the 16-bit size, at a larger loss of accuracy than 8-bit.

**Example:** The same 30 billion parameters take about 15 GB.

**See also:** 8-Bit Quantization, Quantization Tradeoffs, Quantized File Overhead

#### 8-Bit Quantization

A level that stores each weight in 8 bits, one byte, which halves the memory of a 16-bit model with usually small loss of accuracy.

**Example:** A 30-billion-parameter model at 8 bits needs about 30 GB for weights.

**See also:** 4-Bit Quantization, Quantization Level

#### aarch64 Architecture

The 64-bit Arm instruction set, reported by Linux as `aarch64`. Some DGX systems use Arm processors, so downloads for them are the aarch64 builds.

**Example:** A DGX Spark reports `aarch64`, so a server release archive has to be the Arm build.

**See also:** x86_64 Architecture, DGX Spark, Architecture-Specific Wheels

#### Access Configuration

The description of how a machine can be reached: the access control policy, the open ports, the firewall rules, and the SSH server's settings. It shows an attacker what is allowed.

**Example:** A copy of the tailnet's policy file pasted into a chapter.

**See also:** Access Control List, Device-Identifying Details

#### Access Control List

A policy that states which users and devices may connect to which others, and on which ports. In Tailscale it is a policy file applied across the whole tailnet.

**See also:** Tailscale SSH, Access Configuration, Tailnet

#### Access Token Handling

The practice of keeping a hub access token, a credential that identifies an account, out of scripts, logs, and published files.

**Example:** Passing the token through an environment variable and showing `<token>` in every shared example.

**See also:** Keys and Tokens, Gated Model Access, Hosts via Environment Variable

#### Active Parameters

In a mixture-of-experts model, the number of parameters used to produce each token, which is smaller than the total held in memory.

**Example:** A model with 117 billion parameters in total and about 5 billion active needs memory for all of it but computes each token with only the small part.

**See also:** Mixture of Experts, Parameter Count

#### Administration Time

The hours a person spends setting up, maintaining, and troubleshooting a system, valued at a labor rate. It is a real part of owning a machine even though no invoice arrives for it.

**Example:** Forty hours spent connecting, inventorying, installing, and testing candidate models.

**See also:** Setup Labor, Operations Labor, Total Cost of Ownership

#### Administrator Privileges

The right to change system-wide settings: install software for all users, change the driver, open network ports, and manage accounts. On Linux this means `root` access, usually through `sudo`.

**Example:** Packet capture needs it because reading raw packets is a privileged operation.

**See also:** System Administrator, User-Space Installation, Docker Group Membership

#### Agent Loop

The repeating cycle in which a harness sends the conversation to the model, receives either a reply or a tool request, runs the tool, appends the result, and sends again until the task is done.

**See also:** Agent Turn, AI Agent Harness, Tool Calling

#### Agent Skill

A folder of instructions, and sometimes helper files, that teaches a harness how to carry out one kind of task: the steps, the order, the checks, and the formats of the files to produce. It adds no capability the model lacks.

**See also:** SKILL.md Format, Skill Loading, ibook-skills Skill Chain

#### Agent Turn

One pass of the agent loop: the harness sends the conversation, the model replies or requests a tool, and the harness runs the tool and records the result.

**Example:** A single chapter run is many turns of reading, writing, and checking.

**See also:** Agent Loop, Turn Overhead

#### Agentic Framework

A software system that wraps a language model in a loop of planning, tool use, and checking so it can carry out multi-step tasks with little supervision.

**See also:** AI Agent Harness, Agent Loop, Devin

#### AGENTS.md File

A plain Markdown file at a project's root that gives any coding agent the project's standing instructions: how to build, which rules apply, and where things live. It is the cross-harness counterpart of a harness-specific file.

**Example:** This book's `CLAUDE.md` contains only a pointer to `AGENTS.md`, so different agents read the same rules.

**See also:** Content Generation Guide, AI Agent Harness

#### AI Agent Harness

The program that turns a model's single replies into a working sequence: it sends the prompt, executes the tool calls the model requests, returns the results, and repeats until the task ends.

**See also:** Agent Loop, Tool Definition, Claude Code

#### Algebra I Benchmark

This evaluation's instance of the textbook benchmark: the input is a high school Algebra I course description, and the task is to produce its learning graph, chapter structure, and chapter content.

**Example:** Each model receives the same description and the same stage prompts.

**See also:** Textbook Benchmark, Reference Book for Scale

#### Anthropic Claude

A family of cloud language models from the company Anthropic, together with the coding agent built on them. The course uses it as a cloud comparison baseline.

**See also:** Cloud Baseline, Claude Code

#### Anthropic-Compatible API

An interface that copies the shape of Anthropic's messages API, which Ollama also offers and which Claude Code is built to speak.

**Example:** Pointing Claude Code at the local server uses this interface instead of the vendor's.

**See also:** OpenAI-Compatible API, Claude Code, Local Endpoint Connection

#### Anti-Padding Rules

Instructions that keep a generator from reaching a word target by inflating text. They address the tendency of models to repeat and pad, which yields prose that is repetitive and sometimes wrong.

**Example:** A rule telling the generator to stop at a concept's own content when the target is not met, instead of adding filler.

**See also:** Word-Count Targets, Content Generation Guide

#### Apache 2.0 License

A permissive open-source license that allows use, modification, redistribution, and commercial use, with an express patent grant from contributors. It requires keeping notices and stating changes.

**Example:** The Granite family is published under it, which makes the license check straightforward.

**See also:** Open-Source License, Commercial Use Terms, Granite Family

#### Architecture-Specific Wheels

Prebuilt Python packages compiled for one CPU instruction set and operating system, which `pip` selects by matching the machine's platform tags and falls back to building from source when none match.

**Example:** A package that ships only x86_64 wheels fails to install, or compiles from source, on an aarch64 DGX.

**See also:** CPU Architecture, aarch64 Architecture, pip

#### Automated Quality Score

A single number a program computes from the checks so outputs can be ranked at a glance. One number hides the profile, and a weighting that favors easy checks quietly defines quality.

**Example:** A weighted sum of structural check results.

**See also:** Human Quality Score, Structural Checks, Scoring Rubric

#### Background Service

A program managed by the operating system that starts at boot and is restarted if it fails, running without a logged-in terminal.

**See also:** tmux Session, Runtime Installation

#### Baseline Comparison

Judging a result against a reference produced under the same rules, since a number alone has no meaning without something to compare it with.

**Example:** A local learning graph with 200 concepts is judged against a cloud-generated graph for the same course.

**See also:** Cloud Baseline, Fair Comparison

#### Baseline Textbook

The cloud-generated version of the same book, made from the same inputs as the local runs and used as the reference against which local books are scored.

**Example:** Local chapters are scored with the same rubric as the cloud-generated Algebra I book.

**See also:** Cloud Baseline, Baseline Comparison, Reference Book for Scale

#### Batch Size

How many tokens, or requests, the server processes together in one step. A larger batch uses the GPU more fully because the same weights are read once and applied to many tokens.

**Example:** Processing 512 prompt tokens in one batch is faster than 512 separate steps.

**See also:** Batched Serving, Concurrency, Throughput

#### Batched Serving

A server design that combines concurrent requests into batches so that several users share one pass over the model's weights.

**See also:** Batch Size, Concurrency, vLLM

#### BatchMode

An SSH client option that tells it to refuse every prompt for a password or passphrase and to fail at once if a prompt would be required.

**Example:** `ssh -o BatchMode=yes <user>@<dgx-host> true` fails fast when key login is not set up.

**See also:** Unattended SSH Login, ssh-copy-id

#### Benchmark Runner

A Python program that executes the pipeline stages for a model, copies a fresh workspace, applies the stage prompts and time limits, and logs metrics for each stage.

**Example:** It starts stage 1 for a model and writes the event stream to a run directory.

**See also:** Pipeline Stage, Stage Chaining, Run Event Stream

#### Benchmark Workspace Template

The starting directory for stage 1: a minimal book project holding the unchanged course description and the site configuration, copied fresh for every run.

**Example:** No run sees another run's output.

**See also:** Fixed Inputs, Pipeline Stage

#### Bias in Evaluation

A systematic tilt in scoring that favors some results over others for reasons unrelated to quality. Unlike noise, it does not average out over many runs.

**Example:** A model judge that prefers longer answers rates a padded chapter above a tight one.

**See also:** LLM-as-Judge, Blind Human Review

#### Bits per Parameter

The count of bits used to store each model weight, such as 16, 8, or 4. Dividing it by 8 gives the bytes per weight that multiply the parameter count in a memory estimate.

**Example:** A file described as 4-bit uses about 4 bits for each parameter, though file overhead raises the average slightly.

**See also:** Numeric Precision, Bytes per Weight, Quantized File Overhead

#### Blackwell Architecture

NVIDIA's name for one generation of GPU design, the one used by the GB10's GPU. The generation determines which instructions and numeric precisions the GPU supports.

**See also:** NVIDIA GB10, Compute Capability

#### Blind Human Review

A person scoring output against a rubric without knowing which model produced it, with the order randomized. It is the most trustworthy test of quality and is slow and costly.

**Example:** A reviewer reads chapters labeled A through J with no model names attached.

**See also:** Human Review Cost, Scoring Rubric, Human Quality Score

#### Bloom's Taxonomy

A classification of learning objectives by the kind of thinking they require. The 2001 revision names six levels, from simplest to most demanding: remember, understand, apply, analyze, evaluate, and create.

**Example:** "List the DGX components that determine inference capacity" is a remember-level objective, while "Judge whether a configuration is sufficient" is evaluate-level.

**See also:** Learning Outcomes, Quiz

#### Books per Year

The number of complete textbooks a machine can produce in a year, found by dividing the generating hours available in a year by the hours one book takes.

**Example:** A machine generating for half of 8,760 hours and needing 28 hours per book yields about 156 books.

**See also:** Utilization Rate, Whole-Book Time Estimate, Break-Even Volume

#### Break-Even Volume

The amount of production at which two options cost the same. Below it the option with the lower fixed expense wins, and above it the option with the lower per-unit expense wins.

**Example:** Dividing a local machine's fixed expense by its saving on each book gives the number of books at which it pays for itself.

**See also:** Fixed Costs, Variable Costs, Cost per Textbook

#### Build Success

Whether a strict site build of the generated book finishes with exit code zero. Defining it in advance settles whether a build with warnings counts.

**Example:** `mkdocs build --strict` returning 0.

**See also:** Strict Site Build, Per-Stage Metrics

#### Bytes per Weight

The storage each model weight takes, equal to bits per parameter divided by 8. It is the figure that multiplies the parameter count in a memory estimate.

**Example:** A 4-bit weight takes half a byte, so 30 billion parameters need about 15 GB for weights.

**See also:** Bits per Parameter, Memory for Weights, Parameter Count

#### Capital Cost

The up-front outlay to buy hardware and its accessories, treated as a single amount that is then spread over the machine's useful life.

**See also:** Depreciation, Hardware Lifespan, Fixed Costs

#### Capstone Evaluation

The course's final project: a complete, objective evaluation of a DGX system, published, which uses every chapter and treats sanitization as a graded step.

**See also:** Evaluation Report, Sanitization

#### Chapter Completion Criterion

The rule that a chapter counts as written when its placeholder text is gone and it has at least 1,000 words, since a model's claim to be finished is not evidence.

**Example:** A chapter file that still contains its placeholder text fails the rule.

**See also:** Per-Chapter Generation Run, Premature Turn Termination

#### Chapter Content

The prose, tables, and worked examples written for each chapter of a textbook after the learning graph and chapter structure exist. It also includes a specification for every MicroSim.

**Example:** A chapter built from about 20 concepts has an explanation, an example, and a check for each concept.

**See also:** Elaboration Budget, MicroSim, Per-Chapter Generation Run

#### Chapter Dependency Check

A step in the chapter-content skill that verifies that each chapter's concepts depend only on concepts in earlier chapters, stopping and reporting if it finds a violation.

**Example:** A chapter that uses a concept first defined in a later chapter fails the check.

**See also:** Concept Dependency, Chapter Content

#### Chat Completions Endpoint

The main route of an OpenAI-compatible API, at `/v1/chat/completions`, which accepts a list of messages and returns the model's reply.

**See also:** OpenAI-Compatible API, curl Request

#### Checksum Verification

Comparing a downloaded file's computed hash with the hash the publisher lists, to confirm that the file is complete and unaltered.

**Example:** Running `sha256sum` on a GGUF file and comparing the result with the value on the model page.

**See also:** Model Download, Publisher Provenance

#### Claude Code

Anthropic's command-line coding agent, and the harness this evaluation uses. It was chosen because the comparison books were generated with it, so the model is the only thing that changes.

**Example:** It is pointed at the local server through the Anthropic-compatible interface.

**See also:** AI Agent Harness, Anthropic-Compatible API, Harness Prompt Overhead

#### Cloud Baseline

A reference result produced by a cloud model on the same inputs and under the same rules as a local run, used as the point of comparison. Without one, a local result has no yardstick.

**Example:** A cloud-generated Algebra I book scored with the same checks as each local model's book.

**See also:** Baseline Comparison, Baseline Textbook, Fair Comparison

#### Cloud LLM Service

A language model run by a provider and reached over the internet, with usage billed by the provider. The user rents the capability and does not hold the weights.

**See also:** Local Model Deployment, Per-Token Pricing, Anthropic Claude

#### Code Generation

A model's ability to write programs, scripts, and configuration in a programming language. The benchmark uses it for the shell and Python scripts an agent writes and for the JavaScript of MicroSims.

**Example:** A generated p5.js sketch either runs in a browser or throws an error on its first frame.

**See also:** MicroSim Code Correctness, p5.js

#### Codex CLI

OpenAI's command-line coding agent, an agent harness that implements the same skill format as the other harnesses, so a skill written for one can be tried in another.

**See also:** OpenCode, Goose, SKILL.md Format

#### Command Line Basics

The skills of navigating directories, running programs, and editing files by typing text commands into a shell instead of using a graphical interface. Every setup step in the course is issued this way.

**Example:** Running `cd docs` and `ls` to look around a book's folder, then `cat` to read one of its files.

**See also:** Python Scripting Basics, SSH, Git Version Control

#### Commercial Use Terms

The part of a model's license that states whether the model, or what it writes, may be used to make money, and under what conditions.

**See also:** Model License Terms, License Review

#### Compute Capability

A version number NVIDIA assigns to each GPU generation that indicates which CUDA features and instructions the hardware supports, and therefore which prebuilt libraries can run on it.

**See also:** CUDA, Blackwell Architecture, CUDA Version Probe

#### Concept Dependency

A statement that one concept is a prerequisite of another, meaning a learner who lacks the first will struggle with the second. It describes the subject itself, not the order of any particular chapter list.

**Example:** "Percent depends on decimals" becomes an edge from decimals to percent in an arithmetic course's graph.

**See also:** Learning Graph, Directed Acyclic Graph

#### Concept Impact Score

A number measuring how much of a learning graph rests on a concept, defined recursively as 1 for the concept itself plus the scores of every concept that depends on it directly.

**Example:** A concept with three direct dependents, none of which has dependents of its own, scores 1 plus 3, which is 4.

**See also:** Elaboration Budget, Concept Dependency, Word-Count Targets

#### Concept Taxonomy

A classification that assigns every concept in a learning graph to exactly one named category, each with a short identifier such as `FOUND` or `HW`. It lets an author see the graph by theme and spot neglected areas.

**Example:** Counting concepts per category reveals one category that holds only two concepts.

**See also:** Learning Graph, Foundational Concepts

#### Concurrency

The number of separate requests an inference server is handling at the same time, such as two harness sessions running together, which determines how much batching the server can apply.

**Example:** Two harness sessions running at once make a concurrency of two.

**See also:** Batched Serving, Throughput

#### Conda

A package and environment manager that installs software, including Python itself and non-Python libraries, into named, isolated environments that can be created, listed, exported, and deleted from the command line.

**See also:** pip, Conda Versus pip, Python Environment

#### Conda Activate Command

The subcommand `conda activate`, which makes a named environment the current one, so its Python and packages are used by the commands that follow in that shell.

**Example:** Running `conda activate mkdocs` before `mkdocs build --strict`.

**See also:** Conda Create Command, Conda List and Export

#### Conda Create Command

The subcommand `conda create`, which builds a new named environment, optionally with a pinned Python version and an initial set of packages.

**Example:** `conda create -n dgx python=3.11` builds an environment named `dgx`.

**See also:** Conda Activate Command, Python Version Pinning

#### Conda List and Export

Two subcommands for recording an environment: `conda list` prints the installed packages and their versions, and `conda env export` writes them to a specification file.

**Example:** Exporting to `environment.yml` captures exactly what was installed.

**See also:** environment.yml, Environment Rebuild, Reproducibility

#### Conda Remove Command

The subcommand `conda remove`, which uninstalls named packages from an environment and, when given the name of an environment and the `--all` flag, deletes that whole environment and everything installed in it.

**Example:** Deleting an environment and recreating it from its specification confirms that the specification works.

**See also:** Environment Rebuild, Conda Create Command

#### Conda Versus pip

The distinction between two installers: conda manages Python itself and non-Python dependencies across platforms, while pip installs Python packages only. Mixing them in one environment needs care.

**Example:** Install the GPU libraries with conda, add a pure-Python helper with pip, and record both in the specification.

**See also:** Conda, pip

#### Connectivity Test

A check that one machine can actually reach another over the network, confirming a path, a name, and a response before later steps depend on them.

**See also:** Tailscale Ping, Remote Access

#### Container Sandbox

The boundary a container creates: inside it the agent may run any command, and the only paths it can write to are the ones deliberately mounted in.

**Example:** An errant delete command inside the container cannot reach host files that were not mounted.

**See also:** Harness Container, Network Sandbox Gap, Network Boundary

#### Content Generation Guide

The file `CONTENT-GENERATION-GUIDE.md` at the repository root that gathers every writing rule in one place, including concept-depth targets, anti-padding rules, and MicroSim expectations, so an agent can be told to read it first.

**Example:** A task prompt tells the agent to read the guide before writing any chapter.

**See also:** AGENTS.md File, Anti-Padding Rules

#### Context Compaction

Asking the model to summarize the earlier conversation into a short note and replacing the old content with it. It keeps the thread and loses detail, and it costs a model call.

**See also:** Context Truncation, Context Management

#### Context Length Memory

The memory the KV cache needs at a given context length, which grows in proportion to it. It is reserved for the configured window whether or not a conversation fills it.

**Example:** Raising the setting from 32,000 to 64,000 tokens roughly doubles this part of the estimate.

**See also:** KV Cache, Context Length Setting, Memory Estimation Formula

#### Context Length Setting

The window size a server is configured with. It reserves memory for the KV cache and bounds how large a conversation can grow before the harness has to shrink it, and it can be set below the model's own maximum.

**Example:** A larger setting leaves room for long conversations but takes memory that could hold other things.

**See also:** Context Window, KV Cache, Context Length Memory

#### Context Management

How a harness keeps a growing conversation within the model's window by dropping or summarizing earlier content, since the window is a fixed limit and the conversation only gets longer.

**See also:** Context Compaction, Context Truncation, Peak Context Size

#### Context Overflow

The conversation exceeding the model's window, so earlier content is dropped or the request is rejected. Its signature is a run that does well for a while and then behaves as if it forgot the task.

**Example:** A peak context size close to the window size.

**See also:** Peak Context Size, Context Truncation, Context Window

#### Context Truncation

Dropping the oldest content to shrink a conversation that is approaching the window. It is crude because the start of the conversation holds the task.

**Example:** A run that loses track of its task after a long session may have had its first messages truncated.

**See also:** Context Compaction, Context Overflow

#### Context Window

The largest number of tokens a model can take into account at once, covering the prompt, earlier conversation, tool results, and the reply being generated. It is a property of the model, distinct from the length a server is configured to use.

**Example:** A harness that adds about 19,000 tokens of its own instructions leaves less of the window for the actual task.

**See also:** Context Length Setting, KV Cache, Context Overflow

#### Control Run

A repeat of a run that is expected to give the same answer, done to check the apparatus rather than the subject.

**See also:** Repeated Runs, Scoring Check Calibration

#### Controlled Variables

Everything else that could affect the result and that the design holds fixed on purpose, so a difference can be blamed on the independent variable.

**Example:** The same course description, prompts, harness, and time limit for every model.

**See also:** Independent Variable, Fixed Inputs, Uncontrolled Variable

#### Coordination Plane

The part of Tailscale that handles identity, key distribution, and policy through the vendor's servers. It exchanges metadata and does not carry the traffic between devices.

**See also:** Data Plane, Tailscale Authentication

#### Cost

What an owner pays to own and operate hardware: the purchase, the electricity, and the labor of setting it up and running it, as opposed to what a provider charges for a service.

**Example:** A DGX's yearly share of its purchase, plus its electricity and administrator hours, is its cost, while a cloud bill is a price.

**See also:** Total Cost of Ownership, Capital Cost

**Contrast with:** Price

#### Cost Model

A written set of assumptions and formulas that turns inputs, such as hours and power draw, into an expense figure. It makes the assumptions explicit so a reader can see which one to dispute.

**Example:** Changing the assumed share of hours the machine works from half to a quarter shows how the per-book figure moves.

**See also:** Sensitivity Analysis, Explicit Assumptions, Utilization Rate

#### Cost per Chapter

The expense of generating one textbook divided by the number of chapters it contains, giving a unit figure that can be compared with a provider's per-chapter or per-book charge.

**Example:** A 13-chapter book that costs 52 USD to generate works out to 4 USD per chapter.

**See also:** Cost per Textbook, Books per Year

#### Cost per Textbook

The expense of generating one complete book: the hours it takes multiplied by the expense of one generating hour. It is the local figure set against a provider's charge for the same book.

**Example:** A 28-hour run on a machine with a known hourly expense yields one number to set against a cloud service's charge.

**See also:** Cost per Chapter, Whole-Book Time Estimate, Service Price Calculation

#### Course Description

A short document, written by a person, that states a course's audience, prerequisites, topics, exclusions, and learning outcomes. Every downstream part of the textbook inherits its scope from this document.

**Example:** The Algebra I benchmark starts each run from a published course description copied unchanged into the workspace.

**See also:** Course Description Quality Score, Learning Graph, Learning Outcomes

#### Course Description Quality Score

A number from 0 to 100 that rates how completely a course description supplies the elements the generators need: a title, an audience, prerequisites, topics, and outcomes written at the Bloom levels.

**See also:** Course Description, Learning Outcomes

#### CPU Architecture

The instruction set a processor executes, which decides which compiled programs and package builds run on the machine. DGX systems in this course use either x86_64 or aarch64.

**Example:** `uname -m` prints the architecture, which decides which installer archive to download.

**See also:** x86_64 Architecture, aarch64 Architecture, Architecture-Specific Wheels

#### CPU Core Count

The number of processing cores a CPU provides, which bounds how many host tasks, such as builds and tool calls, can run in parallel.

**See also:** CPU Probe, CPU Architecture

#### CPU Probe

A probe that reports the processor's model name, its core count, and its instruction-set architecture, which together tell later steps which software builds apply and how much parallel work the host can take.

**Example:** On a DGX Spark it reports `aarch64` and the number of Arm cores.

**See also:** CPU Architecture, CPU Core Count, psutil

#### CSV-JSON Agreement

Whether the two files that hold the same learning graph, one as CSV and one as JSON, describe exactly the same concepts and the same dependencies.

**See also:** Required Output Files, Structural Validity

#### CUDA

NVIDIA's platform and programming interface for running general computation on its GPUs. Libraries such as PyTorch and inference servers use it to run models on the GPU.

**Example:** A CUDA-enabled PyTorch build can use the GPU, while a CPU-only build cannot.

**See also:** NVIDIA Driver, CUDA-Enabled PyTorch, Compute Capability

#### CUDA Cores

The small parallel arithmetic units inside an NVIDIA GPU that execute CUDA work. Their number describes parallel capacity but, taken alone, says little about generation speed.

**See also:** GPU, Memory Bandwidth

#### CUDA Version Probe

A probe that reports the CUDA version the driver supports or the toolkit provides. The two can differ, so the figure's meaning depends on where it was read.

**Example:** A PyTorch build for a newer CUDA than the driver supports fails when it tries to use the GPU.

**See also:** CUDA, Driver Version Probe, PyTorch CUDA Check

#### CUDA-Enabled PyTorch

A PyTorch build compiled with CUDA support so it can run on an NVIDIA GPU, in contrast to a CPU-only build that installs without error but cannot use the GPU.

**Example:** A default install can pull the CPU-only build, which is why the CUDA check exists.

**See also:** PyTorch CUDA Check, CUDA, Architecture-Specific Wheels

#### curl Request

A single `curl` command that sends one request to the endpoint. It removes every layer between the user and the server, so a failure points to the server or the model and not to a program.

**Example:** Posting a one-word prompt to the chat completions route and reading the JSON reply.

**See also:** Chat Completions Endpoint, Python Client, First-Prompt Smoke Test

#### Data Egress Trace

An accounting of every place a system's data goes when it leaves. It is built component by component, recording the destination, what is sent, and how often, so the result is a table that can be checked against reality.

**Example:** A table listing inference traffic to the local machine, Tailscale coordination metadata, package downloads, and the orchestrator's reads.

**See also:** Supervision Data Exposure, Packet Capture Verification, Network Boundary

#### Data Plane

The part of Tailscale that carries the actual traffic directly between devices over encrypted WireGuard tunnels, bypassing the coordination servers wherever a direct path exists.

**See also:** Coordination Plane, Peer-to-Peer Connection, DERP Relay

#### Data Sovereignty

The principle that data is subject to the laws and control of the country or organization where it is stored and processed. Local deployment keeps data in a place its owner chooses.

**See also:** Privacy, Local Model Deployment

#### Data-Driven MicroSim

A MicroSim that keeps its content in a separate data file, usually JSON, and reads it at load time instead of writing the facts into the program. This separates the logic from the facts.

**Example:** Correcting a model's listed download size means editing one row of the data file, not changing the JavaScript.

**See also:** MicroSim, Learning Graph Viewer

#### Decision Attribution

Recording who made each design decision, since a choice by a person with a goal and a choice by an assistant filling a gap deserve different scrutiny.

**See also:** Design Decision Record, Role Separation

#### Dedicated GPU Memory

Memory physically attached to the GPU and separate from system RAM. The model's weights and cache are held in it, so its size caps what can be loaded.

**Example:** A GPU with 24 GB of its own memory cannot load a 40 GB model, whatever the system RAM holds.

**See also:** Unified Memory, Memory for Weights, GPU Memory Total and Free

#### Dedicated Tool Environment

An environment that exists for one tool or job and holds nothing else. In this evaluation the tools for reaching the DGX live in one named `dgx`, separate from the environment that builds this book.

**Example:** A package conflict in the book-building environment cannot break the Tailscale client.

**See also:** Environment Isolation, Python Environment

#### Dense Model

A model in which every parameter takes part in producing each token, so both memory use and per-token computation scale with its full size.

**Example:** `gemma4:31b` is dense, so all 30.7 billion of its parameters work on every token.

**See also:** Mixture of Experts, Active Parameters

#### Dependency Cycle Check

A check that a graph is acyclic by repeatedly removing the concepts that have no remaining prerequisites; if all can be removed, there is no cycle.

**Example:** When A depends on B, B on C, and C on A, three concepts remain that cannot be removed.

**See also:** Directed Acyclic Graph, Concept Dependency

#### Dependency Reasoning

A rubric dimension asking whether a learning graph links each concept to the right prerequisites, so that its ordering teaches in a sensible sequence.

**Example:** A graph in which percent has no link to decimals fails this dimension even though it has no cycle.

**See also:** Concept Dependency, Learning Graph, Dependency Cycle Check

#### Depreciation

The spreading of a hardware purchase over its expected useful life so that each year or each hour carries a share. With no resale value, the yearly share is the purchase amount divided by the lifespan.

**Example:** A machine bought for 6,000 USD and used for three years carries 2,000 USD per year.

**See also:** Capital Cost, Hardware Lifespan

#### DERP Relay

A Tailscale relay server that forwards encrypted traffic when two devices cannot establish a direct path. The traffic stays encrypted, but the connection is slower than a direct one.

**See also:** Peer-to-Peer Connection, Tailscale Ping

#### Design Decision Record

A written account of each choice in the evaluation design: what was chosen, what else was considered, and why, kept so that a later reader can tell a deliberate choice from an accident.

**Example:** An entry explaining why a 64,000-token minimum context was set for every candidate.

**See also:** Decision Attribution, Explicit Assumptions

#### Device Key Expiry

The time limit after which a device's Tailscale key stops being valid and the device has to sign in again. It bounds how long a lost or forgotten device can stay connected.

**See also:** Tailscale Authentication, Host Hygiene

#### Device-Identifying Details

Facts that help a stranger find or reach a specific machine: IP addresses, hostnames, tailnet names, usernames and passwords, keys and tokens, hardware identifiers, and access configuration.

**Example:** A hostname in a screenshot caption.

**See also:** IP Address, Hostname, Hardware Identifiers

#### Devin

A cloud agentic framework that works through software engineering tasks with minimal supervision. The course uses it as one of four cloud comparison baselines.

**See also:** Agentic Framework, Per-Seat Pricing

#### devstral-small-2:24b

A model tag naming a 24-billion-parameter model from Mistral AI, built to drive software-engineering agents, with a 384,000-token context window in a 15 GB download.

**Example:** In the tag, `24b` gives the size and the leading name gives the line.

**See also:** Mistral Family, Tool Calling, Context Window

#### DGX OS

NVIDIA's Linux-based host operating system for DGX systems, bundling the GPU driver and compute libraries on which the evaluation depends.

**See also:** NVIDIA Driver, CUDA

#### DGX Product Family

The range of DGX systems, which differ in CPU architecture (x86_64 or aarch64), number of GPUs, and whether GPU memory is dedicated or unified. These differences change the setup steps that follow.

**See also:** Hardware Variation Branching, NVIDIA DGX, CPU Architecture

#### DGX Spark

The small desktop member of the DGX family and the machine this evaluation used. It is built around a single NVIDIA GB10 chip that combines an Arm processor and a GPU with one shared pool of memory.

**Example:** Because it has one pool, a model-fit check uses the system's available memory.

**See also:** NVIDIA GB10, Unified Memory, aarch64 Architecture

#### DGX Sufficiency Judgment

The answer to the evaluation's central question: whether this machine, with these models and this harness, is enough to generate the textbook. It is a judgment made against criteria written before the data arrived.

**Example:** Criteria such as all three stages completing within their time limits.

**See also:** Evaluation Question, Recommendation

#### Directed Acyclic Graph

A graph whose edges point in one direction and which contains no cycle, meaning no path of dependencies leads from a concept back to itself. Learning graphs take this form so that a teaching order exists.

**Example:** If concept A needs B, B needs C, and C needs A, the graph has a cycle and no valid study order exists.

**See also:** Dependency Cycle Check, Concept Dependency

#### Disk Read Benchmark

A short timed test that reads a large file from disk and reports megabytes per second. It estimates how quickly a model file will load.

**Example:** Reading a 4 GB test file and dividing by the elapsed time gives the drive's sustained read speed.

**See also:** Storage Read Speed, Model Load Time

#### Docker

A tool that runs programs in containers: isolated processes with their own view of the filesystem, built from an image of packaged files and settings. Containers share the host's kernel and are not full virtual machines.

**See also:** Harness Container, Container Sandbox, Docker Group Membership

#### Docker Group Membership

The permission that lets a Linux user run `docker` commands. Because the Docker service runs as `root`, a member can start a container that mounts any host directory, which makes membership equivalent to administrator access.

**Example:** Adding an evaluator to the group is a decision for whoever administers the machine.

**See also:** Administrator Privileges, Docker

#### Documentation Address Ranges

Blocks of network addresses reserved for examples and documentation, such as `192.0.2.0/24`, which are not assigned to any real machine.

**See also:** IP Address, Placeholder Conventions

#### Driver Version Probe

A probe that reads the installed NVIDIA driver's version number, which determines the highest CUDA version the machine supports and therefore which GPU-enabled library builds can be installed on it.

**Example:** Its output lets a later step choose a compatible PyTorch build.

**See also:** NVIDIA Driver, CUDA Version Probe

#### Duplicate Concept Labels

Concepts that share a label when compared without regard to case. Two nodes with one name cannot be told apart by a reader or a downstream tool.

**Example:** "Slope" and "slope" appearing as two separate nodes.

**See also:** Orphaned Concepts, Structural Checks, Label Length Limit

#### Ed25519 Key

An SSH key that uses a modern elliptic-curve signature scheme, producing short keys and fast operations. It is the usual recommendation for new keys, ahead of the older RSA type.

**See also:** SSH Key Pair, Passphrase-Free Key

#### Elaboration Budget

A table listing every concept in a chapter with its elaboration score, tier, and target words, together with their sum. It is computed before any prose is written, so the chapter's length follows from it.

**Example:** A chapter's table might total several thousand words, with the largest targets going to concepts that many others depend on.

**See also:** Concept Impact Score, Word-Count Targets, Anti-Padding Rules

#### Electricity Cost

The money spent on the electrical energy a machine consumes, equal to its power draw over time multiplied by the local rate per kilowatt-hour.

**Example:** A machine drawing 150 W for 28 hours uses 4.2 kWh, which at typical commercial rates is well under one dollar.

**See also:** Idle Power Draw, Power Draw, Energy per Textbook

#### Endpoint Sharing

Making a local endpoint reachable from other machines, for example so a harness on a laptop can use a model on a DGX or a colleague can try it. The methods differ in who ends up able to reach the server.

**Example:** An SSH port forward shares the endpoint with one person, while a tailnet service shares it with every permitted device.

**See also:** SSH Port Forward, Tailscale Serve, localhost Binding

#### Energy per Textbook

The electricity one book takes: the machine's average power while generating multiplied by the hours of generating time, usually expressed in kilowatt-hours so it can be turned into money at the local electricity rate.

**Example:** 150 W for 28 hours is 4.2 kWh, a small amount next to the labor involved.

**See also:** Power Draw, Electricity Cost, Cost per Textbook

#### Environment Isolation

Keeping each project's packages and interpreter separate from the others and from the operating system, so installing or upgrading in one place cannot break another.

**See also:** Python Environment, Dedicated Tool Environment

#### Environment Rebuild

Creating an environment again from its specification and confirming that it matches the original. A specification that has not yet been rebuilt from remains an unverified claim.

**Example:** Deleting an environment and recreating it from `environment.yml` in a clean directory.

**See also:** Reproducibility, environment.yml

#### environment.yml

A YAML file that specifies a conda environment: its name, package channels, and dependencies, so the environment can be recreated on another machine.

**Example:** Committing the file lets a fresh DGX rebuild the same software stack.

**See also:** Environment Rebuild, Package Channel, requirements.txt

#### Evaluation Question

The single, answerable question an experiment exists to answer, naming what is compared, on what task, and under what conditions.

**Example:** Can one DGX running an open-weight model generate an Algebra I textbook end to end?

**See also:** Independent Variable, Metric Selection

#### Evaluation Report

The document that carries an evaluation to a reader who was not there, giving the question, method, results, limitations, and recommendation.

**See also:** Report Structure, Recommendation, Limitations Statement

#### Evaluation Status Tracking

A single table showing, for each model, how far it has got: one row per model and one column per stage, with a check, a cross, a count, "Running", or a dash.

**Example:** A cell reading "10 of 14" for chapters written.

**See also:** Pipeline Stage, Provisional Results

#### Exclusion Rationale

The stated reason a model was left off the shortlist. It tells a reader that a well-known model's absence was a decision and not an oversight.

**Example:** Phi models were left out because the benchmark's long skills and 64,000-token minimum favored larger models.

**See also:** Model Shortlist, Phi Family

#### Experimental Design Critique

Applying the standards of fair design to one's own evaluation, in writing, before someone else does. The useful form pairs each flaw with its effect and its repair.

**Example:** A flaw of one run per model has the effect that results are provisional, and the repair is to repeat each run.

**See also:** Limitations Statement, Bias in Evaluation

#### Explicit Assumptions

Things an analysis takes as true without having tested them, written down and labeled as assumed so a reader can see what the conclusions rest on and challenge them.

**See also:** Measured Versus Assumed Values, Cost Model

#### Failed Tool Calls

The number of a run's tool calls that returned an error, taken from the event stream. A model can recover from some, such as a wrong argument, but a high count signals trouble.

**See also:** Tool Call Count, Malformed Tool Call, Tool-Call Success Rate

#### Failure Diagnosis

Working from the symptoms in the logs to the cause of a failed run by asking what the evidence rules out. Several causes produce runs that look alike from the outside.

**Example:** A run that ended early could be context overflow, a malformed tool call, or an out-of-memory error.

**See also:** Context Overflow, Malformed Tool Call, Harness Misconfiguration

#### Fair Comparison

A comparison in which the only meaningful difference between the two sides is the thing being compared, because inputs, settings, time limits, and scoring are the same for both.

**See also:** Baseline Comparison, Controlled Variables

#### Faithfulness to Description

A rubric dimension asking whether generated material matches the course description's audience, scope, and outcomes. A script can find missing keywords, and a person judges the rest.

**Example:** A graph that adds machine-learning topics to an Algebra I course drifts from its description.

**See also:** Scoring Rubric, Course Description, Dependency Reasoning

#### FAQ

A page of questions a reader is likely to ask about the course, each followed by a short, direct answer. It complements the glossary by answering questions instead of defining terms.

**Example:** "Why does a quantized model need less memory?" with a two-sentence answer.

**See also:** Glossary, Quiz

#### File Editing Tool

A harness tool that reads, creates, and changes files in the working directory. It is how a model writes a chapter or a learning graph to disk.

**See also:** Shell Execution Tool, Tool Definition

#### First-Prompt Smoke Test

A test that sends one tiny request and checks four things: the server answered, the reply is not empty, the speed is plausible, and the model runs on the GPU. It tests the server alone.

**Example:** A one-word reply in a second or two, with the GPU busy, passes.

**See also:** Harness Smoke Test, Skill Execution Verification, curl Request

#### Fit Verdict

The outcome of a model-fit calculation, drawn from three possible verdicts that each call for a different next action, so that the result of the arithmetic is turned into a decision.

**Example:** A verdict that a model does not fit leads to choosing a smaller model, a lower precision, or a shorter context.

**See also:** Model-Fit Calculation, Model-Fit Calculator, Safety Headroom

#### Fixed Costs

Expenses that stay the same however many books are produced, such as the yearly share of the hardware purchase and the setup labor.

**See also:** Variable Costs, Break-Even Volume

#### Fixed Inputs

The exact files and prompts every run starts from. They are the most concrete controlled variable and the cheapest to get right.

**See also:** Controlled Variables, Benchmark Workspace Template, Stage Prompt

#### Foundational Concepts

Concepts in a learning graph that have no prerequisites inside it, so learning can begin at any of them. They tend to be plain, introductory terms.

**Example:** In a fractions course, "counting" might have no prerequisite and so counts as foundational.

**See also:** Concept Dependency, Orphaned Concepts

#### FP16 and BF16

Two 16-bit floating-point formats for storing weights. FP16 uses a five-bit exponent and ten-bit fraction, and BF16 uses an eight-bit exponent and seven-bit fraction to keep the range of 32-bit numbers.

**Example:** A 30-billion-parameter model in either format needs about 60 GB for its weights alone.

**See also:** Numeric Precision, Quantization, Bytes per Weight

#### Frontier Model

A language model at the leading edge of capability, usually very large and offered as a cloud service by a major provider instead of as downloadable weights.

**See also:** Frontier Model Capability Gap, Cloud LLM Service, Small Language Model

#### Frontier Model Capability Gap

The difference in output quality between the best cloud models and the best model that runs locally on a given task. It varies by task: large for hard multi-step work and possibly negligible for narrow, well-specified work.

**Example:** The gap on a learning graph can differ from the gap on MicroSim code.

**See also:** Frontier Model, Cloud Baseline, Quality

#### Gated Model Access

A publisher's requirement that a user be signed in and accept its terms before model files can be downloaded, which records who agreed to the license.

**Example:** A download fails with an authorization error until the account has accepted the terms.

**See also:** Access Token Handling, Model License Terms, Hugging Face Hub

#### Gemma Family

Google's series of open-weight models, offered in sizes that fit a single machine and including both a dense and a mixture-of-experts member of similar total size in its Gemma 4 release.

**Example:** The pair `gemma4:31b` and `gemma4:26b` allows a clean comparison of the two designs.

**See also:** gemma4:31b, gemma4:26b, Mixture of Experts

#### gemma4:26b

A model tag naming a mixture-of-experts model in the Gemma family with 25.2 billion parameters in total and 3.8 billion active for each token, the sibling of `gemma4:31b`.

**Example:** Together with its dense sibling it lets the evaluation compare the two designs at similar total size.

**See also:** Gemma Family, gemma4:31b, Mixture of Experts

#### gemma4:31b

A model tag naming a dense model of 30.7 billion parameters in the Gemma family, one of the two Gemma 4 candidates.

**Example:** Its mixture-of-experts sibling, `gemma4:26b`, allows the two designs to be compared at similar total size.

**See also:** Gemma Family, gemma4:26b, Dense Model

#### Generative AI Assistant Use

Hands-on experience asking a chat or coding assistant to produce text or code and then judging whether the result is usable. The course assumes it so readers already know what a prompt, a reply, and a bad answer look like.

**See also:** Large Language Model, AI Agent Harness

#### Generative AI Model

A trained machine-learning model that produces new content, such as text, code, or images, in response to a prompt. In this course the term covers models that generate text and code.

**See also:** Large Language Model, Small Language Model

#### GGUF Format

A single-file model format used by llama.cpp and Ollama that holds quantized weights together with the metadata needed to load them.

**See also:** Safetensors Format, llama.cpp, Quantization

#### Git History Persistence

The fact that a commit stays in a repository's history after a later commit removes its content, so every clone and fork keeps the leak.

**Example:** Deleting a leaked file in the next commit leaves it readable with `git log -p`.

**See also:** Public Repository Risk, Pre-Commit Scan

#### Git Version Control

A system that records each saved version of a project's files as a commit, so changes can be compared, undone, and shared. It tracks the textbook's Markdown, scripts, and configuration.

**Example:** `git commit` records a newly written chapter, and `git log` later shows when it was added.

**See also:** GitHub Repository, Markdown Source Files

#### GitHub Repository

A project's git history hosted on the GitHub service, which gives it a shared copy, a web address, and a place to publish a site. This book's source and its published pages live in one.

**See also:** Git Version Control, Static Site Build

#### Gitignore Rules

Patterns in a `.gitignore` file that tell git which files to leave out of version control, such as logs and run output.

**See also:** Raw Output Isolation, Pre-Commit Scan

#### gitleaks

An open-source scanner for git repositories with built-in rules for common key and token formats, able to scan the working tree, staged changes, or the full history.

**See also:** Secret Scanning, Pre-Commit Scan

#### Glossary

An alphabetical list of a textbook's concepts, each defined in a sentence or two. In this pipeline the definitions follow ISO 11179 rules: precise, concise, distinct, and non-circular.

**Example:** A reader who meets "KV cache" in Chapter 11 looks it up here.

**See also:** FAQ, Quiz

#### Google Antigravity

A Google agentic framework offered as a cloud service. The course uses it as one of four cloud comparison baselines and does not teach it in depth.

**See also:** Agentic Framework, Cloud LLM Service

#### Goose

An open-source agent harness from a different publisher than the other harnesses, which implements the same skill format and can therefore run the same skills.

**See also:** OpenCode, Codex CLI

#### gpt-oss Family

OpenAI's open-weight release, a mixture-of-experts model offered with function calling, structured output, and adjustable reasoning effort. One candidate belongs to it.

**Example:** `gpt-oss:120b` is its entry on the candidate list.

**See also:** gpt-oss:120b, Model Family, Reasoning Mode

#### gpt-oss:120b

A model tag naming OpenAI's open-weight mixture-of-experts model, with 117 billion parameters in total and about 5 billion active per token, released with function calling, structured output, and adjustable reasoning effort.

**Example:** A model with this ratio needs memory for all 117 billion parameters while computing each token with only the active part.

**See also:** gpt-oss Family, Mixture of Experts, Active Parameters

#### GPU

A graphics processing unit: a chip with thousands of parallel cores that performs a model's matrix arithmetic far faster than a CPU. It is the hardware that generates tokens.

**See also:** GPU Configuration, CUDA Cores, Dedicated GPU Memory

#### GPU Configuration

The number and model of GPUs in a system and how their memory is arranged. It determines how much model can be held and whether a model is split across devices.

**See also:** Multi-GPU System, GPU Probe

#### GPU Memory Total and Free

Two figures from a GPU probe: the memory the GPU has in all, and the part not currently in use. The free figure is the one a model-fit check compares against.

**Example:** A GPU with 80 GiB in total and 6 GiB in use has 74 GiB free.

**See also:** Dedicated GPU Memory, Fit Verdict, GPU Probe

#### GPU Monitoring

Watching the GPU's utilization, temperature, power, and memory while a job runs, so that a slowdown, a thermal limit, or a memory shortage can be seen as it develops instead of afterward.

**Example:** Running `nvidia-smi` in a loop beside a generation run.

**See also:** GPU Utilization, Thermal Throttling, Vitals Logging

#### GPU Offload

Placing a model's layers on the GPU so that the GPU does the work. On a unified-memory machine every layer is offloaded because the memory is shared.

**See also:** Unified Memory, Model Loading, GPU Utilization

#### GPU Power Draw

The electrical power the GPU consumes at the moment of reading, in watts, reported together with the limit the driver enforces.

**See also:** Power Draw, Energy per Textbook

#### GPU Probe

A probe that reports the number of GPUs and, for each, its model name, memory total and free, temperature, and power.

**Example:** It queries the GPUs through NVML and records the result in the JSON report.

**See also:** NVML Python Bindings, nvidia-smi, GPU Configuration

#### GPU Temperature

The GPU's die temperature in degrees Celsius, read from the driver. As it rises toward its safe limit, the chip slows itself.

**See also:** Thermal Throttling, Thermals, Vitals Logging

#### GPU Utilization

The share of the last sampling period in which the GPU was running work, reported as a percentage, which shows whether the chip is busy or waiting on the prompt, a tool, or the CPU.

**Example:** Low utilization during generation means the GPU is waiting for the prompt, a tool, or the CPU.

**See also:** GPU Monitoring, nvidia-smi

#### Granite Family

IBM's series of models positioned for enterprise use, with a plain Apache 2.0 license, structured output, and documentation of its training data governance. One candidate belongs to it.

**Example:** `granite4.2:30b` is its entry on the candidate list.

**See also:** granite4.2:30b, Apache 2.0 License, Model Family

#### granite4.2:30b

A model tag naming IBM's dense model of about 30 billion parameters in the Granite family, published under the Apache 2.0 license with structured-output support.

**Example:** Its plain license makes it the conservative candidate on licensing grounds.

**See also:** Granite Family, Apache 2.0 License, Structured Output

#### Hardware Identifiers

Values that identify a physical unit: serial numbers, GPU unique identifiers, and network card addresses. They grant no access but tie a document to one machine.

**Example:** `nvidia-smi -L` prints each GPU's unique identifier, which has to be replaced before the output is published.

**See also:** Redacted-by-Default Fields, Identifiers in System Files

#### Hardware Lifespan

The length of time a machine is expected to stay useful, which decides how widely its purchase is spread. The course's analysis assumes three years and no resale value.

**See also:** Depreciation, Capital Cost

#### Hardware Probe

A small program that reads one fact about a machine, such as its CPU model, memory total, or GPU temperature, and reports it in a form other programs can use.

**See also:** Probe Script, Probe Suite, Machine-Readable Report

#### Hardware Variation Branching

Choosing the next setup step from a probe report instead of from assumption. A matcher reads the report and returns the branches that apply, such as the CPU architecture or the presence of unified memory.

**Example:** A report showing aarch64 and unified memory selects the Arm installer and the system-memory fit rule.

**See also:** Hardware Probe, DGX Product Family, Unified Memory Probe

#### Harness Compatibility Test

A short skill run against several combinations of harness and model, to find which pairs work at all before spending hours on any of them.

**Example:** Running a three-minute skill with each candidate model in each harness.

**See also:** Harness Smoke Test, OpenCode, Text-Emitted Tool Call

#### Harness Configuration

The environment variables and settings that determine which server and model a harness uses and how it behaves, such as base address, model name, credential, and disabled telemetry.

**See also:** Local Endpoint Connection, Telemetry Disabled

#### Harness Container

The container that holds the agent: the harness and its tools running from an image, with only deliberately mounted paths writable.

**See also:** Container Sandbox, Read-Only Skill Mount, Docker

#### Harness Misconfiguration

A failure caused by the harness's settings and not by the model: a wrong endpoint, a wrong model name, a missing credential, or a permission rule that blocks a tool.

**Example:** Every tool call fails with a permission error because the harness was given no standing approval.

**See also:** Harness Configuration, Failure Diagnosis, Permission Model

#### Harness on DGX

The arrangement in which the harness container runs on the DGX itself, beside the model server, so the two talk over the machine's own loopback interface.

**Example:** A long run keeps going when the laptop goes to sleep.

**See also:** Harness on Laptop, Harness Container, Host Network Mode

#### Harness on Laptop

The arrangement in which the harness runs on the machine the user sits at and reaches the model on the DGX through an SSH port forward. It was this evaluation's first arrangement and is the quickest way to try a model.

**Example:** Nothing is installed on the DGX except the model server.

**See also:** Harness on DGX, SSH Port Forward

#### Harness Prompt Overhead

The tokens a harness's own instructions and tool definitions take before the task begins. Every turn carries them, so a local model's window and speed pay for them.

**Example:** For Claude Code the overhead is about 19,000 tokens, and it was written for Claude models.

**See also:** System Prompt, Tool Definition, Context Window

#### Harness Smoke Test

A short skill run of about three minutes that checks the model, the harness, and a skill together, in contrast to the model-only test, which has no harness.

**Example:** Running a small skill and confirming the harness saw a real tool call.

**See also:** First-Prompt Smoke Test, Harness Compatibility Test

**Contrast with:** Model-Only Test

#### Home Directory Paths

A file path that begins with a user's home directory and therefore carries the username. A log may show it on every line that touches a file.

**Example:** `/home/<user>/runs/...` is the safe form to show, with the real name replaced.

**See also:** Usernames and Passwords, Redaction

#### Home Router

The device that connects a local network to the internet. It gives devices private addresses and performs network address translation, mapping many internal devices onto one public address.

**See also:** NAT Traversal

#### Host Hygiene

The set of habits that keep a remote-access setup from becoming a liability, such as expiring old keys, removing unused devices, and trimming the access policy.

**See also:** Device Key Expiry, Access Control List

#### Host Key Fingerprint

A short value derived from an SSH server's public key that identifies the server. The client shows it on first connection and stores the accepted key in `known_hosts` to detect later changes.

**Example:** A changed fingerprint on a later connection warns that the server's identity is not what was recorded.

**See also:** SSH, SSH Key Pair

#### Host Network Mode

The Docker setting `--network host`, which makes a container share the host's network instead of having its own. The harness container used it to reach a model server that listens only on the host's loopback address.

**Example:** The trade is that the container then has the host's network access, not a restricted one.

**See also:** Network Sandbox Gap, localhost Binding, Docker

#### Hostname

The name of one machine on a network, which tells a stranger where to send a connection much as an address does. It names a single device, whereas the tailnet name identifies the whole network.

**Example:** `<dgx-host>` stands in for the real name.

**See also:** IP Address, MagicDNS

**Contrast with:** Tailnet Name

#### Hosts via Environment Variable

Passing real machine addresses to scripts through the environment instead of writing them in the script, so the values exist only in the shell of the person running it.

**Example:** `DGX_HOSTS`, a space-separated list of login targets, is read by the orchestration scripts.

**See also:** Run Output Retrieval, Access Token Handling

#### Hugging Face Hub

A public website and file service where publishers host model weights, model cards, and datasets for download, with accounts, versioned repositories, and, for some models, terms to accept first.

**Example:** A gated model's files download only after the user signs in and accepts the publisher's terms.

**See also:** Model Repository, Gated Model Access, Model Card

#### Human Quality Score

A score a person assigns to generated output against a rubric, most trustworthy when the reviewer does not know which model produced it.

**See also:** Blind Human Review, Automated Quality Score

#### Human Review Cost

The expense of the person who judges the output, such as a subject expert reading generated chapters. It is separate from the generation expense and can be much larger.

**Example:** Ten hours of expert review at an assumed 90 USD per hour is 900 USD, far above the electricity for one book.

**See also:** Blind Human Review, Quality-Adjusted Cost

#### Hybrid Workflow

A workflow that uses a local model for some steps and a cloud service for others, split either by data sensitivity or by pipeline stage.

**Example:** A cheap local model produces first drafts and a frontier model reviews or refines them.

**See also:** Local Model Deployment, Cloud LLM Service, Local Cloud or Hybrid Decision

#### ibook-skills Skill Chain

The ordered set of ten skills that builds an intelligent textbook, in which each skill takes the previous skill's output as its input. It is the workload the benchmark asks a local model to run.

**Example:** The course-description skill validates the description, and the learning-graph skill then turns it into concepts and dependencies.

**See also:** Agent Skill, Pipeline Stage, Intelligent Textbook

#### Identifiers in System Files

The places a machine records who it is: a machine identifier file, the list of connected hosts in `known_hosts`, and the shell history of commands run.

**Example:** Copying `~/.ssh/known_hosts` into a bug report discloses every host the account has connected to.

**See also:** Hardware Identifiers, Home Directory Paths

#### Idle Power Draw

The electrical power a machine uses while it is on and doing no work. A machine that works half the time idles the other half, so its yearly energy has two terms.

**Example:** A unit that idles at about 40 W still consumes energy through every hour in which no book is generating.

**See also:** Power Draw, Utilization Rate, Electricity Cost

#### Iframe Embedding

Placing one web page inside another with the HTML `iframe` element, which takes the address of the page to show plus a width and height. It is how a MicroSim's `main.html` appears inside a chapter without being copied.

**Example:** A chapter embeds `../../sims/candidate-model-explorer/main.html` at full width and a fixed height.

**See also:** MicroSim, p5.js

#### Image Input

The ability of a multimodal model to accept an image as part of its prompt and answer questions about it. It is distinct from generating images, which is out of scope for this course.

**See also:** Multimodal Model

#### Independent Variable

The one factor an experiment deliberately changes so that its effect on the results can be observed, while everything else is held steady. It is what the comparison is about.

**Example:** In a ten-model comparison it is the model.

**See also:** Controlled Variables, Uncontrolled Variable

#### Inference

The use of a trained model to produce output from a prompt, as opposed to training it. This course evaluates only this activity.

**See also:** Inference Server, Tokens per Second

#### Inference Server

A program that loads a trained model into memory and answers requests to generate text from it. It places the weights on the GPU, manages the KV cache, schedules requests, and turns raw output into text.

**See also:** Ollama, llama.cpp, vLLM

#### Install Script

A program that takes a machine from its starting state to a working tool set with no manual steps. It is the written-down version of the setup and the strongest form of reproducibility because it runs.

**See also:** Environment Rebuild, Reproducibility

#### Instruction Following

A model's ability to do what a prompt or a document of instructions says, including its constraints, in the order given. A skill file of a thousand lines makes it a demanding property.

**Example:** A skill that says to pause for approval before step 3 tests whether the model actually pauses at step 3.

**See also:** Agent Skill, Structured Output

#### Intelligent Textbook

An interactive online textbook generated from a structured course description and a learning graph, made of chapters, MicroSims, a glossary, an FAQ, and quizzes, all stored as plain files and published as a static site.

**Example:** The benchmark asks a local model to generate a small Algebra I intelligent textbook from a course description.

**See also:** Levels of Intelligent Textbooks, Learning Graph, MicroSim

#### IP Address

The numeric network address of a machine, which tells a stranger where to send a connection. A private address is less revealing than a public one and is still a detail of the network.

**Example:** A tailnet address appears in published examples as `100.x.y.z`, and a concrete-looking one is taken from the `192.0.2.0/24` range.

**See also:** Hostname, Documentation Address Ranges, Placeholder Conventions

#### JSON Report

A machine-readable report written as nested key-value pairs in a plain text file, readable by every programming language and by people.

**See also:** Machine-Readable Report, Probe Suite

#### Keys and Tokens

Credentials that grant access without a password: an SSH private key, a Tailscale auth key, and a model-hub access token. They are long random strings that are easy to paste by accident.

**Example:** A token pasted into a command and then copied from the terminal into a log.

**See also:** Tailscale Auth Key, SSH Key Pair, Secret Scanning

#### KV Cache

Memory the server reserves to hold each token's intermediate key and value vectors for the conversation so far, so they need not be recomputed. It grows with the configured context length.

**Example:** Doubling the configured window roughly doubles the cache's reservation.

**See also:** Context Length Memory, Prompt Caching, Context Window

#### Label Length Limit

The cap on concept label size, 32 characters in this project, which exists because longer labels do not fit in the graph viewer.

**Example:** A 41-character label fails the check.

**See also:** Learning Graph Viewer, Structural Checks

#### Large Language Model

A neural network trained on very large amounts of text to predict the next token, which lets it write prose, code, and structured data from a prompt. It typically has billions of parameters.

**See also:** Small Language Model, Frontier Model, Parameter Count

#### Latency

The total time for one request, from sending it to receiving the last token, including any loading, prompt reading, and generation, which is what a person waiting for a reply experiences.

**Example:** A short reply to a very long prompt still has high latency because of the reading time.

**See also:** Throughput, Time to First Token

#### Learning Graph

The concepts of a course together with the prerequisite links between them, stored as data rather than prose. It fixes what is taught and which concepts depend on which.

**Example:** The Algebra I reference book has a graph of 200 concepts and 277 dependencies, kept as a CSV file and a JSON file.

**See also:** Concept Dependency, Directed Acyclic Graph, Concept Taxonomy

#### Learning Graph Viewer

A MicroSim that draws a learning graph with vis-network, colors nodes by category, searches for a concept, and shows a clicked node's prerequisites and dependents.

**Example:** Opening the viewer exposes a concept with no connections that a table of rows would easily hide.

**See also:** vis-network, Learning Graph, Orphaned Concepts

#### Learning Outcomes

Statements of what a learner will be able to do after finishing a course, written as observable actions that each begin with a verb from a Bloom's Taxonomy level.

**Example:** "Calculate whether a model fits in the available GPU memory" is an apply-level outcome that a learner can demonstrate.

**See also:** Bloom's Taxonomy, Course Description

#### Lesson Plan

A structured teaching outline for one session that lists objectives, activities, and the time each takes. It arranges a chapter and its MicroSims into a session a group of learners can follow.

**See also:** Chapter Content, MicroSim

#### Levels of Intelligent Textbooks

A five-step scale for how much intelligence a book has. Each level adds a capability the previous level lacks, and the higher levels are progressively more aspirational.

**See also:** Intelligent Textbook, MicroSim

#### License Review

Reading a model's license before relying on it and recording what it permits, especially commercial use and the use of outputs.

**Example:** Noting that a candidate carries the Apache 2.0 license before recommending it to readers.

**See also:** Model License Terms, Commercial Use Terms, Apache 2.0 License

#### Limitations Statement

A section of an evaluation report that says what the result does not show, telling a reader how far to trust the rest and which conclusions to hold loosely.

**See also:** Provisional Results, Uncontrolled Variable

#### Linux Inventory Commands

Standard commands that each print a few lines about the machine and write nothing, such as `lscpu` for the processor, `free` for memory, `df` for disk, and `uname` for the kernel and architecture.

**Example:** `uname -m` prints `aarch64` on an Arm machine.

**See also:** Read-Only Inventory, CPU Probe

#### Llama Family

Meta's long-running line of open-weight language models, and the one most tutorials were written for. None of the ten candidates in this evaluation carries the Llama name.

**See also:** Model Family, Phi Family

#### llama.cpp

A C++ engine for running quantized models, which Ollama wraps. It can be built and run directly when a setting is needed that Ollama does not expose, at the price of fetching GGUF files and passing flags by hand.

**Example:** Building it from source to test a setting that is not available through Ollama.

**See also:** Ollama, GGUF Format, vLLM

#### LLM-as-Judge

Using a language model to score another model's output. It is fast and cheap but a large source of bias, because a model tends to prefer text that resembles its own and favors longer answers.

**Example:** A cloud model scores ten local books in minutes, while a blind human review of the same books takes days.

**See also:** Bias in Evaluation, Blind Human Review

#### Local API Endpoint

The network address on the machine where the server accepts requests; for Ollama it is the loopback address on port `11434`. Programs call it as they would a web service and receive JSON.

**See also:** localhost Binding, OpenAI-Compatible API, Chat Completions Endpoint

#### Local Cloud or Hybrid Decision

The choice among generating textbooks on local hardware, with a cloud service, or with a split between them, made by weighing cost, price, and quality.

**See also:** Hybrid Workflow, Cost, Price

#### Local Endpoint Connection

Pointing a harness at the user's own server instead of the vendor's. It is done with environment variables that give a base address, a model name, and a credential.

**Example:** Setting the base address to the local server and the credential to a placeholder.

**See also:** Harness Configuration, Placeholder Credential, Anthropic-Compatible API

#### Local Model Deployment

Running a model on hardware the user owns or controls, so the weights, the server, and the prompts stay on that machine instead of being sent to a provider.

**See also:** Cloud LLM Service, Offline Operation, Privacy

#### localhost Binding

Configuring a server to accept connections only from its own machine by listening on the loopback address, so requests from any other machine are refused before they reach it.

**Example:** The model server on the DGX listens only on loopback, so a laptop reaches it through an SSH port forward.

**See also:** SSH Port Forward, Endpoint Sharing, Network Boundary

#### Logging

Recording what happened during a run in durable files, such as messages, tool calls, and measurements, so results can be checked and failures diagnosed afterward.

**See also:** Vitals Logging, Run Event Stream, Reproducible Experiment

#### Long-Context Recall Test

A check that a model can find a specific fact in a long prompt: a value is placed in a long block of text, and the model is asked to return it.

**Example:** A 30,000-token prompt with a code word placed near the middle.

**See also:** Context Window, Model-Only Test

#### Long-Form Writing

A model's ability to produce sustained, coherent prose across many paragraphs, with consistent terminology and a stable argument. It is a different skill from answering a question in a few lines.

**Example:** Writing a 3,000-word chapter without repeating itself or drifting off topic.

**See also:** Writing Quality, Structured Output, Instruction Following

#### Machine-Readable Report

Output in a form a program can parse without guessing, in contrast to text written for a person. It lets later steps consume results automatically.

**See also:** JSON Report, Probe Suite

#### MagicDNS

Tailscale's automatic naming feature, which gives each device on a tailnet a resolvable name so people connect by name instead of by address.

**Example:** `ssh <user>@<dgx-host>` resolves the name to the device's tailnet address.

**See also:** Tailnet, Hostname, Tailnet Name

#### Malformed Tool Call

A tool call with a wrong name, a missing argument, or an argument of the wrong type. The harness returns an error, and the model usually reads it and tries again.

**Example:** Calling a file tool without giving it a path.

**See also:** Failed Tool Calls, Text-Emitted Tool Call, Tool Calling

#### Margin Versus Markup

The distinction between profit measured against the price (margin) and profit measured against the expense (markup). The two sound interchangeable but give different prices for the same stated percentage.

**Example:** On a 100 USD expense, a 20 percent margin gives a price of 125 USD, while a 20 percent markup gives 120 USD.

**See also:** Profit Margin, Service Price Calculation

#### Markdown Source Files

Plain-text files, usually ending in `.md`, in which punctuation marks structure: a leading `#` makes a heading, a leading `-` makes a list item, and pipes make a table. They hold every page of the book.

**Example:** A chapter's `index.md` can be diffed, reviewed, and merged with the same tools used for code.

**See also:** MkDocs Material, Git Version Control

#### Markdown Validity

Whether generated Markdown is well formed: headings, lists, tables, and code fences are structured correctly so the site builds and renders them.

**Example:** A table missing its header separator line renders as plain text.

**See also:** Strict Site Build, Markdown Source Files

#### Mathematical Notation

A rubric dimension asking whether formulas in generated text are correct and rendered consistently. A script can find malformed delimiters, and only a person can say whether the formula is right.

**Example:** Inline math whose opening delimiter has no matching closer.

**See also:** Scoring Rubric, Markdown Validity

#### Measured Versus Assumed Values

The distinction applied to each number: a measured value came from an observation in this evaluation, and an assumed one came from a rule, a published figure, or a guess.

**Example:** Generation speed is measured, while the labor rate is assumed.

**See also:** Explicit Assumptions, Provisional Results

#### Memory Bandwidth

The rate at which data moves between memory and the processor, measured in gigabytes per second. Generating a token reads the model's weights, so bandwidth strongly influences generation speed.

**Example:** Two machines with the same amount of memory can generate at different speeds if their bandwidth differs.

**See also:** Tokens per Second, Unified Memory, Memory for Weights

#### Memory Estimation Formula

The sum of three parts: memory for the weights, the KV cache at the configured context length, and a small runtime overhead. Weights depend on model and precision, the cache on context, and the overhead is a constant.

**Example:** A 15 GB weight file plus a few GB of cache plus the overhead gives the total to compare with available memory.

**See also:** Memory for Weights, KV Cache, Runtime Overhead

#### Memory for Weights

The memory a model's weight file occupies once loaded, which is close to the file's size on disk and is usually the largest part of a model's memory estimate.

**Example:** A 17 GB file needs about 17 GB of memory for weights, before the cache and overhead.

**See also:** Size on Disk, Bytes per Weight, Memory Estimation Formula

#### Memory Pressure

The condition in which available memory is low enough that the system starts to struggle: swapping to disk, stalling, or killing a process.

**Example:** A run slows in its later part as the context grows, for no obvious reason.

**See also:** Out-of-Memory Error, System Freeze, KV Cache

#### Memory Watchdog

A small program that checks available memory and GPU temperature at intervals and acts before they reach a dangerous level, killing the harness when memory falls below a floor or the temperature passes a ceiling.

**Example:** This project's version checks every five seconds.

**See also:** System Freeze, Vitals Logging, Memory Pressure

#### Mesh VPN

A virtual private network in which devices connect directly to each other through encrypted tunnels, rather than all traffic passing through one central gateway.

**See also:** WireGuard, Tailscale, Peer-to-Peer Connection

#### Metric Selection

Choosing what to measure: a metric that answers the question, can be computed the same way for every run, and was decided before the data was seen.

**Example:** Fixing build success and tool-call success rate as metrics before any run starts.

**See also:** Evaluation Question, Per-Stage Metrics, Scoring Rubric

#### MicroSim

A small interactive simulation, usually a p5.js or similar JavaScript page, that teaches one concept. It lives in its own folder and is shown inside a chapter through an `iframe`.

**Example:** A bubble chart that plots ten candidate models by parameter count, speed, and download size.

**See also:** p5.js, Iframe Embedding, MicroSim Status Levels

#### MicroSim Code Correctness

Whether a generated MicroSim's JavaScript runs in a browser without errors, tested by loading the page. Code that looks right can still fail when run.

**Example:** A p5.js sketch that throws an error on its first frame.

**See also:** Code Generation, p5.js, MicroSim

#### MicroSim Status Levels

Markers of how far a MicroSim has progressed, stored in the frontmatter of its `index.md` page and shown as a colored dot in the sidebar: scaffold, built, and approved.

**Example:** A newly specified sim is `scaffold` (red), becomes `built` (orange) when implemented, and `approved` (green) only after the author tests it.

**See also:** MicroSim, MkDocs Navigation

#### Miniforge

A minimal installer for conda that uses the community conda-forge package channel by default and supports both x86_64 and aarch64 machines.

**Example:** Installing it into a home directory gives a DGX the `conda` command without administrator rights.

**See also:** Conda, Package Channel, aarch64 Architecture

#### Mistral Family

Open-weight models from the French company Mistral AI, including a large dense general model and a smaller one built for coding agents. Two candidates in this evaluation belong to it.

**See also:** mistral-medium-3.5:128b, devstral-small-2:24b, Model Family

#### mistral-medium-3.5:128b

A model tag naming a dense model of 128 billion parameters from Mistral AI, promoted for instruction and system-prompt adherence. It has the largest parameter count of the ten candidates.

**Example:** At 16 bits a model of this size needs about 256 GB for weights alone, which shows why a quantized download matters.

**See also:** Mistral Family, Dense Model, Quantization

#### Mixture of Experts

A model design that holds many specialist sub-networks but routes each token through only a few of them, so total parameters are large while the parameters used per token are small.

**Example:** `gemma4:26b` has 25.2 billion parameters in total and 3.8 billion active for each token.

**See also:** Active Parameters, Dense Model

#### MkDocs Material

A widely used theme for the MkDocs static site generator that adds search, navigation, callout boxes called admonitions, code highlighting, and a responsive layout. This book and the comparison books are built with it.

**Example:** `mkdocs build --strict` turns the Markdown files into the finished site.

**See also:** Static Site Build, MkDocs Navigation, Strict Site Build

#### MkDocs Navigation

The sidebar tree of a built site, defined by the `nav:` block in `mkdocs.yml`, where each entry pairs a label with the path of a Markdown file relative to `docs`. Entries can nest.

**Example:** A new chapter page that is missing from `nav:` is unreachable from the sidebar and can fail a strict build.

**See also:** MkDocs Material, Navigation Entries

#### Model Cache Directory

The folder where a tool stores downloaded models so it does not fetch them twice, such as `~/.ollama/models` for Ollama and `~/.cache/huggingface` for the hub client.

**See also:** Storage Management, Ollama, Hugging Face Hub

#### Model Card

A publisher's document on a model's page that describes its size, context window, license, training, intended uses, and reported evaluations. It is a source of claims to test, not a test result.

**Example:** A card may state a one-million-token window, which a long-context recall test then checks.

**See also:** Publisher Claims, License Review, Hugging Face Hub

#### Model Comparison

A side-by-side assessment of candidate models on the same tasks, inputs, and settings, so that differences can be attributed to the models themselves.

**See also:** Fair Comparison, Independent Variable, Publisher Claims

#### Model Deprecation

A provider's retirement of a model version, after which requests to it fail or are redirected to a newer one. Results recorded against a retired model can no longer be reproduced.

**See also:** Version Pinning, Cloud LLM Service

#### Model Download

Fetching a model's files from a hub or library to local storage so a server can load them. Large files can take a long time, and some are gated.

**See also:** Checksum Verification, Storage Management, Model Cache Directory

#### Model Family

A series of models from one publisher that share a design lineage and a naming scheme, usually differing in size or in whether they are specialized for code or general use.

**Example:** `gemma4:26b` and `gemma4:31b` are two sizes from one family.

**See also:** Qwen Family, Gemma Family, Model Card

#### Model Keep-Alive

A server setting that controls how long an idle model stays loaded in memory before it is unloaded. A longer time avoids reloading but holds memory.

**Example:** Raising it so the next stage's first request does not wait for a reload.

**See also:** Model Loading, Runtime Configuration, Model Load Time

#### Model Leaderboard

A ranking of models by their scores on shared tests. It is cheap evidence that often answers a question other than the evaluator's own.

**Example:** A coding leaderboard says little about whether a model follows a skill file of a thousand lines.

**See also:** Public Benchmark Score, Model Comparison

#### Model License Terms

The conditions under which a model's weights and outputs may be used, including limits on commercial use, redistribution, and field of use. The publisher sets them, and they can differ from standard open-source licenses.

**See also:** License Review, Commercial Use Terms, Gated Model Access

#### Model Load Time

The delay between asking for a model and being able to use it, set by the model's size and the drive's read speed.

**Example:** A 20 GB file on a drive that reads 2 GB per second loads in about ten seconds.

**See also:** Model Loading, Storage Read Speed, Model Keep-Alive

#### Model Loading

Reading a model's file from disk into memory and preparing it to run, which happens on the first request after the model has been unloaded. Its duration follows from the model's size and the drive's read speed.

**Example:** A first request after an idle period is slower while the model loads.

**See also:** Model Load Time, Model Keep-Alive, Storage Read Speed

#### Model Repository

The collection of files for one model on a hub, including weights, configuration, tokenizer files, and the model card, versioned much like a code repository.

**See also:** Hugging Face Hub, Model Download, Model Cache Directory

#### Model Selection Criteria

The properties used to choose which models to test: license, size and fit, context window, tool-calling reliability, writing quality, and provenance.

**Example:** A model that cannot fit a 64,000-token context is dropped before any download.

**See also:** Model Shortlist, License Review, Tool-Calling Reliability

#### Model Shortlist

The written list of candidate models chosen for testing, each with the reason it was chosen, so that every entry can be run and compared.

**See also:** Exclusion Rationale, Model Selection Criteria

#### Model Weights

The learned numeric values of a trained model, stored in a file and loaded into memory to run it. Their count and numeric precision set the file's size.

**See also:** Parameter Count, Bytes per Weight, Memory for Weights

#### Model-Fit Calculation

A comparison of the memory a model needs with the memory available after setting aside the safety headroom, which produces a fit verdict.

**Example:** A model needing 70 GiB against a 96 GiB budget passes the comparison.

**See also:** Fit Verdict, Model-Fit Calculator, Safety Headroom

#### Model-Fit Calculator

A program that takes parameter count, quantization, and context length and returns a fit verdict with headroom, so a model's suitability is known before it is downloaded.

**Example:** Given 30 billion parameters at 4 bits and a 64,000-token context, it returns the memory needed and a verdict.

**See also:** Model-Fit Calculation, Fit Verdict, Hardware Probe

#### Model-Only Test

A test that sends a model short, fixed tasks directly through the server, with no harness, and checks the output against rules. It isolates the model, unlike the harness smoke test, which adds the harness and a skill.

**Example:** Five tasks: Markdown writing, p5.js code, schema-constrained JSON, a tool call, and a 30,000-token prompt.

**See also:** Two-Layer Testing, Schema-Constrained JSON

**Contrast with:** Harness Smoke Test

#### Multi-GPU System

A machine with more than one GPU, which can hold a larger model by splitting it across devices or serve several requests at once.

**See also:** GPU Configuration, Dedicated GPU Memory

#### Multimodal Model

A model that accepts or produces more than one kind of content, such as text together with images. Most models in this course are used only as text generators.

**See also:** Image Input

#### muse-glimmer:30b

A model tag naming a 30-billion-parameter model from Meta, positioned around instruction following and recovery in unattended agent runs. Meta publishes it as a newer line separate from the Llama family.

**Example:** It is the one Meta model on the candidate list, and it does not carry the Llama name.

**See also:** Llama Family, Instruction Following, Model Family

#### NAT Traversal

The set of techniques for opening a direct path between two devices that each sit behind a router doing address translation, by exploiting the fact that the router accepts replies to conversations started from inside.

**Example:** Two devices on different home networks establish a direct Tailscale connection through it.

**See also:** Home Router, Peer-to-Peer Connection

#### Navigation Entries

The `nav:` lines that add generated pages to the book's sidebar. A skill is expected to add them, and a page without one is unreachable from the sidebar.

**See also:** MkDocs Navigation, Required Output Files

#### Negative Result Reporting

Stating what did not work, and why, with the same care as what did. A failure is data that tells later evaluators where a model, a harness, or a setup falls short.

**Example:** Reporting that a model wrote its first tool call as plain text, so its run ended after one turn.

**See also:** Provisional Results, Limitations Statement, Text-Emitted Tool Call

#### Nemotron Family

NVIDIA's series of open-weight models, positioned for agents and for efficient throughput, whose newer releases use mixture-of-experts designs with a very long context window. One candidate belongs to it.

**Example:** `nemotron-3.5-lightning:30b` is its entry on the candidate list.

**See also:** nemotron-3.5-lightning:30b, Model Family, Mixture of Experts

#### nemotron-3.5-lightning:30b

A model tag naming NVIDIA's model for continuously running agents: about 30 billion parameters, 3 billion active, and a one-million-token context window. It is the one candidate from the Nemotron family.

**Example:** A one-million-token window is a stated capacity, and a long-context recall test checks how much of it a model can actually use.

**See also:** Nemotron Family, Active Parameters, Long-Context Recall Test

#### Network Boundary

The limit on where an agent's traffic can go, the second of two boundaries alongside the file boundary. A container enforces it only if configured to do so.

**Example:** A firewall rule or an isolated network can restrict a harness to reaching only the model server.

**See also:** Container Sandbox, Network Sandbox Gap, Packet Capture Verification

#### Network Sandbox Gap

The shortfall in which a container that shares the host's network is isolated for files but not for traffic, so the agent's network access is not restricted by the container.

**Example:** A harness in host network mode could in principle open connections to anywhere the host itself can reach.

**See also:** Host Network Mode, Network Boundary, Container Sandbox

#### Node Sharing

An arrangement in which a tailnet owner shares one device with a user of a different tailnet, so that device appears there while the rest of the owner's network stays separate.

**Example:** The owner shares the DGX alone, and the evaluator's own tailnet shows it as one more device.

**See also:** Tailnet

**Contrast with:** Tailnet Invitation

#### Non-Root Container User

A user with ordinary permissions inside the container, created with the same numeric user and group identifiers as the account that started the run, so files written to the run directory belong to the evaluator and not to `root`.

**Example:** The evaluator can delete run output afterward without `sudo`.

**See also:** Harness Container, Read-Only Skill Mount

#### Numeric Precision

How many bits are used to store each number in a model, where more bits represent a value more finely and take more memory.

**See also:** Bits per Parameter, Quantization, FP16 and BF16

#### NVIDIA Container Toolkit

Software that lets a container use the host's GPU. The harness container in this evaluation does not need it, because the model runs in the host's server and the container only calls it over the network.

**See also:** Docker, Harness Container

#### NVIDIA DGX

NVIDIA's line of AI computing systems that pair GPUs with CPUs, memory, storage, and a software stack, sold from small desktop units to large data-center systems. The course treats the family model-agnostically.

**See also:** DGX Product Family, DGX Spark, DGX OS

#### NVIDIA Driver

The kernel-level software that lets the operating system and programs use an NVIDIA GPU. Its version decides which CUDA versions the machine supports.

**See also:** CUDA, Driver Version Probe, nvidia-smi

#### NVIDIA GB10

The single chip in the DGX Spark that places an Arm CPU and a Blackwell-architecture GPU in one package, connected to one pool of memory.

**Example:** Its single pool is why per-GPU memory totals are absent from `nvidia-smi` output on this machine.

**See also:** DGX Spark, Blackwell Architecture, Unified Memory

#### nvidia-smi

NVIDIA's command-line System Management Interface tool, which reports each GPU's model, driver version, memory, temperature, power, and utilization, and can print selected fields as CSV.

**Example:** `nvidia-smi --query-gpu=name,temperature.gpu --format=csv` prints two fields for each GPU.

**See also:** nvidia-smi Output, NVML, GPU Probe

#### nvidia-smi Output

The table of text this tool prints, listing the driver and CUDA versions and then, per GPU, its name, temperature, power use and limit, memory used over total, and utilization.

**Example:** On a unified-memory machine the per-GPU memory total can come back empty, which the unified memory probe detects.

**See also:** nvidia-smi, GPU Probe, Unified Memory Probe

#### NVMe Storage

Solid-state storage that connects over the PCIe bus using the NVM Express protocol, giving much higher read speeds than older disk interfaces.

**See also:** Storage Read Speed, Storage Capacity

#### NVML

The NVIDIA Management Library, a C library that reports GPU state such as memory, temperature, and power. The `nvidia-smi` tool is built on it, and programs can call it directly.

**Example:** A probe queries it for free memory without having to parse any text.

**See also:** NVML Python Bindings, nvidia-smi

#### NVML Python Bindings

A Python package that exposes NVML's functions as Python calls, so a script can read GPU memory, temperature, and power as numbers instead of parsing `nvidia-smi` text.

**Example:** A call returns the GPU temperature as an integer in degrees Celsius.

**See also:** NVML, GPU Probe

#### Offline Operation

Running a model with no network connection once it is installed. Local deployment allows it because the weights and server are on the machine, while a cloud service cannot work this way.

**See also:** Local Model Deployment, Service Availability

#### Ollama

The inference server this course uses. It runs as one background process, loads models on demand, and serves them over HTTP from a library of ready-to-pull models.

**Example:** `ollama pull gemma4:31b` downloads a model, and requests to port 11434 then use it.

**See also:** Ollama Model Library, llama.cpp, OpenAI-Compatible API

#### Ollama Model Library

Ollama's catalog of ready-to-pull models, each named in `family:tag` form, where the tag selects the size and the quantization, so that one command downloads a file ready for the server.

**See also:** Ollama, Model Family, Model Download

#### Open-Source License

A software license that grants the public the right to use, modify, and redistribute a work under stated conditions. Model weights can carry one, but many publishers use their own custom terms instead.

**See also:** Apache 2.0 License, Model License Terms, Open-Weight Model

#### Open-Weight Model

A model whose trained weights are published for download, so anyone with enough hardware can run it locally. Publication of the weights does not by itself grant every right to use the model.

**Example:** `gpt-oss:120b` can be pulled from a library and served on a DGX, which a cloud-only model cannot.

**See also:** Model License Terms, Hugging Face Hub

**Contrast with:** Open-Source License

#### OpenAI ChatGPT

A conversational assistant service, run by the company OpenAI on its language models. The course treats it as one of the cloud services used as a comparison baseline.

**See also:** Cloud LLM Service, gpt-oss Family

#### OpenAI-Compatible API

An interface that copies the request and response shapes of OpenAI's service, which became a de facto standard, so a client written for that service works with another server by changing only the base address.

**Example:** A Python client built for the cloud service calls the local Ollama server after the base address is changed.

**See also:** Chat Completions Endpoint, Anthropic-Compatible API, Vendor Lock-In

#### OpenCode

An open-source agent harness with a lighter prompt, useful as a second harness for telling a model failure from a harness mismatch.

**See also:** Claude Code, Codex CLI, Harness Compatibility Test

#### Operational Burden

The ongoing work of keeping a self-hosted system running: updates, monitoring, restarts, troubleshooting, and access management, which falls on the owner instead of a provider.

**See also:** Operations Labor, Administration Time

#### Operations Labor

The continuing effort after setup: updates, new models, and restarting runs that failed. It recurs monthly instead of arriving as a single amount.

**See also:** Setup Labor, Administration Time, Operational Burden

#### Orchestrator

An agent or a person that starts work and coordinates it without doing it. In this evaluation it launches runs and reads back results to monitor and score them.

**Example:** A cloud model starts a run on the DGX, waits, and reads the run report.

**See also:** Subagent, Role Separation, Supervision Data Exposure

#### Orphaned Concepts

Concepts with no prerequisite and no dependent, so they are connected to nothing and cannot be reached from the rest of the graph. They differ from foundational concepts, which have dependents.

**Example:** A concept that appears in the concept list but in no edge of the graph.

**See also:** Foundational Concepts, Duplicate Concept Labels

#### Out-of-Memory Error

The failure when a program asks for memory that is not there. On a machine with dedicated GPU memory it shows as an allocation failure in the server log and ends one request or one process.

**Example:** On a unified-memory machine, the same shortage can freeze the whole system.

**See also:** Memory Pressure, System Freeze, Server Logs

#### p5.js

A JavaScript library for drawing shapes and responding to the mouse and keyboard. A sketch defines `setup()`, which runs once to create the canvas and controls, and `draw()`, which runs repeatedly to redraw.

**Example:** Most MicroSims in this book are p5.js sketches that use built-in sliders and buttons.

**See also:** MicroSim, Iframe Embedding

#### Package Channel

A repository from which conda downloads packages, such as the default channel or the community `conda-forge` channel. The channel list decides which builds are available.

**See also:** Conda, environment.yml

#### Packet Capture Verification

Watching the network interface during a run and confirming that the only traffic is what the data egress trace predicts, which turns the table from a claim into a result.

**Example:** A capture that shows only local traffic and the expected package downloads.

**See also:** Data Egress Trace, Administrator Privileges

#### Parameter Count

The number of learned numeric values, called parameters or weights, in a model, usually given in billions. It is the main determinant of a model's memory footprint.

**Example:** A model whose tag ends in `27b` has about 27 billion parameters.

**See also:** Model Weights, Bytes per Weight, Active Parameters

#### Passphrase-Free Key

A private SSH key with no passphrase protecting its file, so the file alone is enough to log in. It makes unattended login possible, since a script cannot type a passphrase.

**Example:** A benchmark script's key has no passphrase, so the file's permissions are its only protection.

**See also:** Unattended SSH Login, SSH Key Pair

#### Peak Context Size

The largest size the conversation reached during a run, measured in tokens. It shows whether the window was big enough and how close the run came to losing earlier content.

**Example:** A peak close to the window size is a signature of context overflow.

**See also:** Context Window, Context Overflow, Context Management

#### Peer-to-Peer Connection

A direct network path between two devices with no intermediary relaying their traffic. It generally gives lower delay than a relayed path.

**See also:** NAT Traversal, DERP Relay

#### Per-Chapter Generation Run

A stage 3 run for a single chapter: the chapter-content skill is run once per chapter, in order, each starting from the book as it stands, so each chapter gets its own timing, token counts, and time limit.

**Example:** A failure on chapter 4 does not hide the results of chapters 1 to 3.

**See also:** Chapter Completion Criterion, Run Time Limit, Stage Chaining

#### Per-Seat Pricing

A pricing scheme that charges a fixed amount for each person who uses a service, regardless of how much each person generates.

**See also:** Subscription Pricing, Devin

#### Per-Stage Metrics

The measurements recorded for each stage of each run so stages can be compared across models, each defined in terms of something a program can compute.

**Example:** Skill completion, tool-call success, build success, structural validity, and time for stage 1.

**See also:** Metric Selection, Skill Completion Rate, Tool-Call Success Rate

#### Per-Token Pricing

A pricing scheme in which a provider charges for each token sent to and received from a model, usually at different rates for input and output.

**Example:** A book of about 73,000 output tokens is billed in proportion to its tokens, plus the prompts the service reads.

**See also:** Subscription Pricing, Per-Seat Pricing, Tokens per Word

#### Performance Optimization

Changing one setting at a time and measuring the result against a fixed baseline. A comparison between runs that differ in three settings attributes the change to none of them.

**Example:** Raising the batch size alone, measuring generation speed, then restoring the original value.

**See also:** Sensitivity Analysis, Tokens per Second, Controlled Variables

#### Permission Model

The set of rules in a harness that decide whether a tool call is allowed, forbidden, or held until a person approves it.

**See also:** Standing Approval Answer, Container Sandbox

#### Phi Family

Microsoft's line of small models, designed to give strong results at a size that fits modest hardware. None of the ten candidates is a Phi model.

**See also:** Model Family, Small Language Model, Llama Family

#### pip

Python's standard package installer, which fetches Python libraries from the Python Package Index and installs them into the active environment, resolving the other packages each one needs.

**See also:** Conda, Conda Versus pip, requirements.txt

#### Pipeline Stage

One skill run with defined inputs and outputs. The benchmark has three: the learning graph, the chapter structure, and the chapter content.

**Example:** Stage 2 starts from the directory that stage 1 produced.

**See also:** Stage Chaining, Stage Sensitivity, ibook-skills Skill Chain

#### Piping Scripts Over SSH

Running a local script on a remote machine by sending it through the SSH connection's standard input, so nothing is copied to or written on the remote disk.

**Example:** `ssh <user>@<dgx-host> python3 - < probe.py` runs the probe on the DGX.

**See also:** Read-Only Inventory, Standard-Library-Only Python

#### Placeholder Conventions

The agreed replacement values that stand in for real details, used the same way everywhere so a reader can follow an example and a scan can recognize a placeholder.

**Example:** `<dgx-host>`, `<user>`, `<tailnet-name>.ts.net`, and `100.x.y.z`.

**See also:** Documentation Address Ranges, Redaction

#### Placeholder Credential

A fake value in the place a real credential would go. The harness insists on a credential and the local server checks none, so a non-secret word fills the slot and fails harmlessly if ever sent to the vendor.

**Example:** Setting the API key variable to a harmless word.

**See also:** Harness Configuration, Keys and Tokens, Telemetry Disabled

#### Power Draw

The electrical power a machine consumes at a given moment, measured in watts. It rises when the GPU is generating and falls when the system idles.

**Example:** Sampling GPU power during a run gives the generating power used to estimate energy per book.

**See also:** Thermal Design Power, GPU Power Draw, Energy per Textbook

#### Pre-Commit Scan

A check of the changes about to be committed that refuses the commit if it finds a detail that does not belong. It is the last cheap check before a mistake becomes history.

**Example:** A small project-specific script with one pattern for tailnet-style addresses.

**See also:** Git History Persistence, gitleaks

#### Premature Turn Termination

The model ending its turn before the work is done, with no error. A model may announce that a skill is running, as if something else would do the work, and then stop.

**Example:** A chapter run ends with a status message and an unchanged placeholder file.

**See also:** Task Loss, Chapter Completion Criterion

#### Price

What a provider charges a customer for a service, such as per token, per month, or per seat, as opposed to what an owner spends to run its own hardware.

**Example:** A cloud service's per-token rate is a price, while the DGX's electricity bill is a cost.

**See also:** Per-Token Pricing, Subscription Pricing

**Contrast with:** Cost

#### Privacy

The condition in which a user's prompts, documents, and outputs stay inside systems the user controls and are not exposed to a third party. It is a main reason to choose local deployment.

**Example:** A confidential course description sent to a cloud service leaves the organization's network, while on a local DGX it does not.

**See also:** Data Sovereignty, Data Egress Trace, Local Model Deployment

#### Probe Script

A Python file that runs one or more hardware probes and prints or writes their results. It is kept small and uses only the standard library where possible so it runs on a fresh machine.

**Example:** A probe script sent over SSH reports the DGX's CPU and memory without installing anything.

**See also:** Hardware Probe, Standard-Library-Only Python, Piping Scripts Over SSH

#### Probe Suite

A set of probes run together to produce one report. It is kept thin so that one failing probe cannot take down the others and each probe can be tested alone.

**Example:** The suite calls the CPU, RAM, storage, and GPU probes and returns their answers in one dictionary.

**See also:** Hardware Probe, JSON Report, Probe Verification Test

#### Probe Verification Test

A test of a probe that feeds it input whose correct answer is known and compares the result. Making the probe take its input path as a parameter allows this.

**Example:** A fake memory file with a 120 GiB total confirms the RAM probe reports 120 GiB.

**See also:** RAM Probe, Scoring Check Calibration

#### Profit Margin

The share of a price that is profit: the price minus the expense, divided by the price. It is measured against what a provider charges, not against what it spent.

**Example:** A book that costs a provider 100 USD to produce and sells for 125 USD has a 20 percent margin.

**See also:** Margin Versus Markup, Service Price Calculation

#### Prompt Caching

A server's reuse of already-computed internal state for the unchanged start of a prompt, so each new turn only has to read what is new.

**Example:** With it working, the harness's long system prompt is read once and not on every turn.

**See also:** Prompt Re-Reading, System Prompt, Turn Overhead

#### Prompt Processing Speed

How fast the server reads the prompt, measured in input tokens per second. Reading is fast because the model can process all the prompt's tokens in parallel.

**Example:** A 20,000-token prompt at 2,000 input tokens per second takes ten seconds to read.

**See also:** Time to First Token, Tokens per Second, Turn Overhead

#### Prompt Re-Reading

A server processing the entire conversation again on every turn instead of reusing what it already computed. A harness resends the whole conversation each turn, so without reuse every turn pays to read it all.

**Example:** A run whose turns grow steadily slower as the conversation lengthens suggests the server is re-reading it.

**See also:** Prompt Caching, Agent Turn, Turn Overhead

#### Provisional Results

Results that are real observations but not yet established, because they rest on too few runs, an unvalidated check, or an incomplete review.

**See also:** Sample Size, Negative Result Reporting

#### psutil

A cross-platform Python library that reports CPU, memory, disk, network, and process information from the operating system through one consistent interface, which makes it a convenient base for hardware probes.

**Example:** `psutil.virtual_memory()` returns total and available RAM.

**See also:** CPU Probe, RAM Probe, Storage Probe

#### Public Benchmark Score

One model's result on one shared test, as reported on a leaderboard or a model card. It measures that test's task and says only indirectly how the model will do on a different workload.

**See also:** Model Leaderboard, Publisher Claims

#### Public Repository Risk

The exposure that comes from publishing a repository and its site: anyone can read it, search engines index it, and automated tools scan it for credentials and addresses.

**See also:** Git History Persistence, Secret Scanning

#### Publication Safety Review

A final read of everything about to be published, by a person, against the catalog of what may not leave. It checks what patterns miss, such as a hostname in a caption.

**Example:** A reviewer notices a tab name in a screenshot that a scanner could not read.

**See also:** Sanitization, Secret Scanning

#### Publisher Claims

Statements a model's publisher makes about it, such as being built for agents or leading a benchmark. They serve as hypotheses because they name what the publisher optimized for.

**See also:** Model Card, Public Benchmark Score, Model Comparison

#### Publisher Provenance

The origin of a set of weights: who actually produced them. A file with a famous model's name can be a third-party conversion or a fine-tune.

**See also:** Checksum Verification, Hugging Face Hub

#### Python Client

A program that sends the same kind of request as `curl` using Python, here with only the standard library: `urllib.request` builds the call, `json.dumps` makes the body, and `urlopen` sends it.

**Example:** A short script with no third-party packages runs on a fresh DGX.

**See also:** curl Request, Standard-Library-Only Python

#### Python Environment

A self-contained installation of Python with its own set of installed packages, so one project's dependencies do not interfere with another's or with the system.

**Example:** The probes run on the system Python, while the PyTorch check runs in a conda environment.

**See also:** Environment Isolation, Conda, Reproducibility

#### Python Scripting Basics

The ability to read a short Python script, run it from the command line, and install a package with `pip`. The course's probes, calculators, and benchmark runner are all scripts at this level.

**See also:** Probe Script, pip, Command Line Basics

#### Python Version Pinning

Fixing the exact Python version in an environment specification, such as `python=3.11`, so the same interpreter is used every time the environment is built.

**Example:** A library that needs a particular Python minor version installs cleanly because the version was pinned.

**See also:** environment.yml, Reproducibility, Version Pinning

#### PyTorch

An open-source machine-learning library for numerical computation on CPUs and GPUs, used in this course to check that the GPU is usable from Python.

**See also:** CUDA-Enabled PyTorch, PyTorch CUDA Check

#### PyTorch CUDA Check

A probe that asks PyTorch, rather than the driver, whether a GPU is usable from Python. It catches a CPU-only build that the other probes would not notice.

**Example:** The driver probe passes, but this check returns false because the installed build has no CUDA support.

**See also:** CUDA-Enabled PyTorch, PyTorch

#### Quality

How good the generated textbook is, judged against a rubric and a baseline, independent of what it took to make or what anyone charges for it.

**Example:** Two books produced at the same charge can differ in quality if one has duplicate concept labels.

**See also:** Scoring Rubric, Quality-Adjusted Cost

**Contrast with:** Cost

#### Quality-Adjusted Cost

An expense figure that adds the labor of reviewing and correcting output to the generation expense, so that cheap-but-poor and costly-but-good books are compared on the same footing.

**Example:** A local book that is cheap to generate but needs many extra reviewer hours may end up above the cloud book once review is counted.

**See also:** Human Review Cost, Quality, Cost per Textbook

#### Quantization

Storing a model's weights in fewer bits than the original, which shrinks the file and memory use at some loss of accuracy.

**Example:** Quantizing a 16-bit model to 4 bits cuts the weight memory to about a quarter.

**See also:** Quantization Level, Quantization Tradeoffs, GGUF Format

#### Quantization Level

The specific number of bits per weight, together with the scheme, that a quantized file uses, such as 8-bit or 4-bit.

**See also:** 8-Bit Quantization, 4-Bit Quantization, Quantization Tradeoffs

#### Quantization Tradeoffs

What is given up and gained by storing weights in fewer bits: a smaller file that loads faster and reads fewer bytes per token, at some loss of accuracy that is larger on hard tasks than on easy ones.

**Example:** A 4-bit file generates faster than the same model at 8 bits.

**See also:** Quantization, 4-Bit Quantization, 8-Bit Quantization

#### Quantized File Overhead

The extra size a quantized file carries beyond its parameter count times its bits, from scaling values stored alongside the weights and from keeping some precision-sensitive layers at higher precision.

**Example:** A file called 4-bit averages a little above 4 bits per weight.

**See also:** Bits per Parameter, Size on Disk

#### Quiz

A set of questions that test a chapter's content, usually multiple choice and written to cover several Bloom's Taxonomy levels.

**Example:** A chapter quiz asks the learner to choose which of four statements about the KV cache is correct.

**See also:** Bloom's Taxonomy, Glossary

#### Qwen Family

Alibaba's series of open-weight language models, spanning dense and mixture-of-experts designs and aimed at long agent tasks and tool use. Two candidates in this evaluation belong to it.

**See also:** qwen3.8:27b, qwen3.6:35b, Model Family

#### qwen3.6:35b

A model tag naming a 35-billion-parameter mixture-of-experts model in the Qwen family, the release before `qwen3.8:27b`, with about 3 billion parameters active for each token.

**Example:** Its tag pairs an earlier release number with a larger total size than the newer Qwen candidate.

**See also:** Qwen Family, Mixture of Experts, Active Parameters

#### qwen3.8:27b

A model tag naming a 27-billion-parameter member of the Qwen family, the newest Qwen release among the candidates and described by its publisher as improved for long-running agent tasks.

**Example:** In the tag, `qwen3.8` names the release and `27b` names the size.

**See also:** Qwen Family, qwen3.6:35b, Ollama Model Library

#### RAM Probe

A probe that reports total and available system memory, read from the operating system's memory file or a library. The available figure decides model fit on a unified-memory machine.

**Example:** A test feeds it a fake `meminfo` file with a total of 120 GiB and checks the answer.

**See also:** System RAM, Probe Verification Test, Unified Memory Fit

#### Rate Limits

Caps a cloud provider places on how many requests or tokens an account can use in a period, after which requests are slowed or refused.

**See also:** Service Availability, Cloud LLM Service

#### Raw Output Isolation

Keeping unsanitized output in a place outside anything that is published, so that nothing has to be removed from the repository afterward because it did not enter it in the first place.

**Example:** Run output lives in a directory in the home folder, outside the repository.

**See also:** Gitignore Rules, Results Publishing

#### Read-Only Inventory

A survey of a machine's configuration made with commands that print information and write nothing, so the machine is left unchanged and no administrator rights are needed.

**Example:** Running `lscpu`, `free -h`, and `df -h` over SSH.

**See also:** Linux Inventory Commands, Piping Scripts Over SSH

#### Read-Only Skill Mount

Mounting the skills directory into the container so the agent can read it but cannot change it, which keeps the benchmark's instructions identical from run to run.

**Example:** A model that tries to edit a skill file receives a permission error.

**See also:** Container Sandbox, Skill Installation, Fixed Inputs

#### Reading Level Measure

A formula that estimates the school grade needed to read a text from the lengths of its sentences and words. The Flesch-Kincaid grade is the common one.

**Example:** A script computes it for every generated chapter.

**See also:** Writing Quality, Structural Checks

#### Reasoning Mode

A setting or behavior in which a model produces intermediate working, extra tokens that think through a problem, before giving its final answer. It can help multi-step problems but takes more time and fills the window.

**Example:** The gpt-oss family exposes adjustable reasoning effort, trading speed for deliberation.

**See also:** Token, Context Window, gpt-oss Family

#### Recommendation

The evaluation's closing statement of what to adopt: which model, quantization, server, and harness, or whether to use a local, cloud, or hybrid workflow, supported by the results.

**See also:** Local Cloud or Hybrid Decision, DGX Sufficiency Judgment, Evaluation Report

#### Redacted-by-Default Fields

Identifying details that a probe does not collect unless asked, such as hostname, username, network address, serial number, and GPU unique identifier. Leaving them out at collection time makes a report safe to publish.

**Example:** A report built this way has no hostname field to remove afterward.

**See also:** Redaction, Hardware Identifiers, Device-Identifying Details

#### Redaction

Replacing a detail in a specific artifact with a placeholder, or removing it, done to captured output after the fact.

**See also:** Sanitized Sample Output, Placeholder Conventions, Screenshot Redaction

#### Reference Book for Scale

The published Algebra I book, used to say how big a finished textbook is: 200 concepts with 277 dependencies and 13 chapters of about 55,000 words. It is a size reference and not a baseline.

**Example:** A model's chapter of 3,000 words is read against the roughly 4,200 words of an average chapter in the reference.

**See also:** Baseline Textbook, Algebra I Benchmark

#### Release Archive

A compressed file published by a project that holds a ready-built program, which can be unpacked into a home directory without an installer or `sudo`.

**See also:** User-Space Installation, aarch64 Architecture

#### Remote Access

Working on a machine from a different location over a network, usually through a terminal session, instead of at its keyboard. A DGX is reached this way from a laptop.

**See also:** SSH, Tailscale, Mesh VPN

#### Repeated Runs

Running the same configuration more than once, with the same inputs and settings, to see how much the results differ and whether a success or a failure repeats.

**See also:** Run Variance, Sample Size

#### Report Structure

The order of an evaluation report's parts, usually question, method, results, limitations, and recommendation, arranged so that a reader can judge the conclusion for themselves.

**See also:** Evaluation Report, Limitations Statement

#### Reproducibility

The property that someone else, or the same person on another day, can repeat a procedure and obtain the same result. For an environment it means the same specification produces the same software.

**Example:** A benchmark result recorded with its environment file and model tag can be checked by another evaluator.

**See also:** Reproducible Experiment, Environment Rebuild, Version Pinning

#### Reproducible Experiment

An experiment that someone else can repeat from the record and obtain a comparable result: a stated question, a recorded configuration, fixed inputs under version control, pinned software, and logs.

**Example:** Another evaluator rebuilds the environment, copies the workspace template, and reruns a stage.

**See also:** Reproducibility, Fixed Inputs, Version Pinning

#### Required Output Files

The files a skill is supposed to produce, whose existence is the cheapest verification there is. The learning-graph stage has seven, including the concept list, the dependency graph as CSV and as JSON, and the taxonomy.

**Example:** A run that is missing the taxonomy file fails the check even though its graph is valid.

**See also:** Skill Execution Verification, Navigation Entries

#### requirements.txt

A plain text file that lists a project's Python package dependencies, one per line and usually with version constraints, for installation with `pip`.

**Example:** A line such as `psutil>=5.9` records a library and its minimum version.

**See also:** pip, environment.yml

#### Results Publishing

The controlled path by which evaluation results enter the book: one script that rebuilds the results pages from fetched run output, copying only a model's learning graph, its chapter text, and the course description.

**Example:** Event streams and logs are left out because the script does not copy them.

**See also:** Raw Output Isolation, Sanitization

#### Retest After Fix

Running the affected models again once a fault in the skill or the test has been corrected, so an early conclusion does not stand on a broken check.

**See also:** Skill Defect Correction, Provisional Results

#### Role Separation

Keeping the roles of the agents in an evaluation distinct and recording who did what, such as who coordinates, who generates, and who judges.

**Example:** The orchestrator starts and monitors runs, and only the model under test writes the book.

**See also:** Orchestrator, Decision Attribution

#### Run Event Stream

The log a harness writes as it works, one JSON object per line: each message, tool call, and result. It is the complete record of what the agent did.

**See also:** Run Report, Logging

#### Run Output Retrieval

Bringing run directories and event streams back from the DGX to the laptop for review and scoring. This project's script uses `rsync`, which transfers only new and changed files and deletes nothing.

**Example:** The hosts are read from an environment variable, not written in the script.

**See also:** Hosts via Environment Variable, Raw Output Isolation

#### Run Report

A summary of one run produced from its event stream: turns, tool calls, failed tool calls, tokens, and time. It works on a run still in progress.

**See also:** Run Event Stream, Tool Call Count

#### Run Time Limit

The maximum time a run is allowed before it is stopped, set so one slow model cannot occupy the machine indefinitely.

**See also:** Wall-Clock Time, Per-Chapter Generation Run

#### Run Variance

How much results differ among repeated runs of one configuration. A model samples its output, so even at low temperature a long agent session takes a path that depends on early details.

**Example:** Two runs of one model on the same stage produce graphs of different sizes.

**See also:** Repeated Runs, Sample Size, Temperature Setting

#### Runtime Configuration

The settings that shape how the inference server runs, which Ollama reads from environment variables, such as the context length and how long an idle model stays loaded.

**Example:** `OLLAMA_CONTEXT_LENGTH` sets the window in tokens, and `OLLAMA_KEEP_ALIVE` sets the idle time.

**See also:** Model Keep-Alive, Context Length Setting

#### Runtime Installation

Putting the inference server on a machine. The usual instructions run an installer script through `sudo`, which creates a system-wide service.

**Example:** On a machine that belongs to someone else, installing in user space avoids needing that approval.

**See also:** User-Space Installation, Administrator Privileges, Release Archive

#### Runtime Overhead

A small, roughly constant amount of memory the inference server and its libraries use beyond the weights and the cache, such as working buffers.

**See also:** Memory Estimation Formula, Safety Headroom

#### Safetensors Format

A file format for storing model weights safely and quickly, without running code on load, commonly used for full-precision models on the Hugging Face Hub.

**See also:** GGUF Format, Hugging Face Hub, vLLM

#### Safety Headroom

Memory deliberately left unused as a margin against what an estimate misses: the operating system, other processes, a cache that grows, and an estimate that is simply low. The course's default is 20 percent.

**Example:** A machine with 120 GiB available treats about 96 GiB as the budget.

**See also:** Model-Fit Calculation, Fit Verdict

#### Sample Size

The number of runs or observations behind a result. Too few leaves a result unable to separate a real difference from run variance.

**See also:** Repeated Runs, Provisional Results

#### Sampling Parameters

Settings that control how the next token is chosen from the model's probabilities, such as temperature, top-k, and top-p, and so how varied or repeatable the generated text is.

**Example:** A low temperature makes outputs more repeatable from run to run.

**See also:** Temperature Setting, Top-p and Top-k

#### Sanitization

Removing or replacing details in an artifact that could identify, locate, or give access to a device or a person, so that the artifact can be shared. It is a pipeline step with its own checks.

**Example:** Replacing a hostname in a log excerpt with `<dgx-host>` before it goes into a chapter.

**See also:** Redaction, Device-Identifying Details, Publication Safety Review

#### Sanitized Sample Output

An example of command output that shows the format and the meaning and none of the identifiers, produced by redacting a real capture.

**Example:** A `tailscale status` listing whose addresses read `100.x.y.z` and whose names read `<dgx-host>`.

**See also:** Redaction, Raw Output Isolation

#### Schema-Constrained JSON

JSON output required to match a stated schema of fields and types, used as one of the model-only tasks to test whether a model can feed a program that expects an exact shape.

**Example:** A reply that has to contain an id, a label, and a list of prerequisite ids for each concept.

**See also:** Structured Output, Model-Only Test

#### Scoring Check Calibration

Testing the checks themselves on inputs whose answers are known before trusting them on real output. A check can pass a bad result or fail a good one.

**Example:** Running the duplicate-label check on a graph known to contain two identical labels.

**See also:** Structural Checks, Probe Verification Test

#### Scoring Rubric

A written description of what a result needs in order to earn each score, which makes judgments repeatable between reviewers.

**Example:** A rubric for a chapter that describes each score for clarity, accuracy, and reading level.

**See also:** Blind Human Review, Human Quality Score, Automated Quality Score

#### Screenshot Redaction

Removing identifying details from an image of a terminal or console, which carries more than the lines meant to be shown: window titles, tab names, a browser address bar, prompts with usernames and hostnames, and sidebars.

**Example:** Cropping to the output lines and blanking the title bar.

**See also:** Redaction, Publication Safety Review

#### Secret Scanning

Running a tool over files, staged changes, or repository history that looks for strings shaped like credentials, such as keys and tokens, and reports each match for review.

**See also:** gitleaks, Pre-Commit Scan

#### Sensitivity Analysis

Changing one assumption at a time and recording how the result moves, to learn which assumptions the answer depends on. It replaces arguing about every guess with finding the few that matter.

**Example:** Varying the labor rate while holding everything else fixed shows whether labor or electricity dominates the per-book figure.

**See also:** Cost Model, Explicit Assumptions, Performance Optimization

#### Server Logs

The text the inference server writes about what it did: when a model loaded, how much memory it requested, which request arrived, and any error. They are often the only place some information exists.

**Example:** An out-of-memory message appears in the server log and not in the client's reply.

**See also:** Out-of-Memory Error, Failure Diagnosis

#### Service Availability

The share of time a cloud service is reachable and working, which is outside the user's control. A local machine's availability depends on its own power, network, and upkeep.

**See also:** Offline Operation, Rate Limits

#### Service Price Calculation

The computation of the price a book-generation service would have to charge to keep a stated margin: the expense divided by one minus the margin.

**Example:** At a 20 percent margin, an expense of 100 USD gives a price of 125 USD.

**See also:** Profit Margin, Margin Versus Markup, Cost per Textbook

#### Setup Labor

The one-time effort to get a system running: connecting it, taking an inventory, installing the server, building the container, and testing candidate models, counted in hours.

**See also:** Operations Labor, Administration Time

#### Shell Execution Tool

A harness tool that runs a command in a terminal and returns its output. It is how a model builds the site, runs a script, or checks a result.

**See also:** File Editing Tool, Permission Model

#### Size on Disk

The actual size of a model's file or files on storage. It is close to the memory the weights occupy once loaded.

**See also:** Memory for Weights, Storage Capacity, Quantized File Overhead

#### Skill Completion Rate

The proportion of attempted skill runs that reach their end and leave the required output files, regardless of whether those files are any good. It separates finishing from doing well.

**Example:** Eight of ten chapter runs finishing is a rate of 80 percent.

**See also:** Required Output Files, Per-Stage Metrics, Chapter Completion Criterion

#### Skill Defect Correction

Fixing a fault in the skill or in the test, instead of in the model that revealed it, so that a defect in the instructions is not recorded as a weakness of the model.

**Example:** A skill step that stalls waiting for approval is rewritten, and the models that failed on it are run again.

**See also:** Retest After Fix, Standing Approval Answer

#### Skill Execution Verification

Confirming that a skill ran to completion and produced its intended outputs. It tests the harness, the model, and the skill together, unlike the first-prompt smoke test, which tests only the server.

**Example:** Checking that all seven output files of the learning-graph skill exist.

**See also:** Required Output Files, First-Prompt Smoke Test, Harness Smoke Test

#### Skill Installation

Placing skill directories where the harness looks for them. For Claude Code that is a `skills` directory under its configuration folder in the home directory.

**See also:** Agent Skill, Skill Loading, Claude Code

#### Skill Loading

How a harness brings a skill into the conversation in stages: at startup only each skill's name and description go into the system prompt, and the full body is read when the skill applies.

**Example:** A harness with thirty installed skills spends only a short entry on each until one is used.

**See also:** SKILL.md Format, System Prompt, Skill Installation

#### SKILL.md Format

A Markdown file that opens with a block of YAML metadata between two lines of three dashes, giving the skill's name and description, followed by the procedure written in Markdown.

**Example:** A harness reads only the name and description at startup and reads the full body when the skill applies.

**See also:** Agent Skill, Skill Loading, Skill Installation

#### Small Language Model

A language model small enough to run on one local machine, in contrast to the largest cloud models, and usually distributed with open weights. This course tests whether one can produce a whole textbook.

**See also:** Large Language Model, Open-Weight Model, Local Model Deployment

#### SSH

Secure Shell, a protocol for logging in to a remote machine and running commands over an encrypted connection. It is the main channel for reaching a DGX.

**See also:** SSH Key Pair, Tailscale SSH, Remote Access

#### SSH Key Pair

A matched private key and public key used to log in without a password. The private key stays on the client and the public key is placed on the server.

**Example:** `ssh-keygen -t ed25519` creates the pair, and `ssh-copy-id` installs the public half.

**See also:** Ed25519 Key, ssh-copy-id, Passphrase-Free Key

#### SSH Port Forward

A mechanism that carries traffic for one network port through an SSH connection, so a service on the remote machine appears on a local port. It exposes a loopback-only service to a single client.

**Example:** Forwarding local port 11434 to the DGX lets a laptop harness reach a server that listens only on the DGX's loopback.

**See also:** localhost Binding, Harness on Laptop, Endpoint Sharing

#### ssh-copy-id

A utility that installs a user's public key into a server's `authorized_keys` file. It logs in once with a password, appends the key, and sets the correct file permissions.

**Example:** Running it once against the DGX replaces password logins with key logins.

**See also:** SSH Key Pair, Unattended SSH Login

#### Stage Chaining

Starting each pipeline stage from the previous stage's output directory so that the work accumulates, instead of starting every stage from a clean copy of the original inputs.

**See also:** Pipeline Stage, Per-Chapter Generation Run

#### Stage Prompt

The fixed text that starts a stage, giving what a person would type to begin the skill: the course description's location and the target.

**Example:** The stage 1 prompt names the description file and states the number of concepts to produce.

**See also:** Standing Approval Answer, Fixed Inputs

#### Stage Sensitivity

How strongly a pipeline stage's outcome depends on model capability: some stages tolerate a weaker model and others show large differences between models.

**Example:** A learning-graph stage and a MicroSim-code stage are compared by how much each changes when the model changes.

**See also:** Pipeline Stage, Per-Stage Metrics

#### Standard-Library-Only Python

A script that imports only modules shipped with Python itself, so it runs on a fresh machine with no package installation, no environment, and no administrator rights.

**Example:** Every script this project runs on the DGX is written this way.

**See also:** Probe Script, Python Client, Piping Scripts Over SSH

#### Standing Approval Answer

The paragraph in a stage prompt that tells the agent how to handle the skill's questions when no one is there, so that a skill that would pause for review does not stall an unattended run.

**Example:** A skill asks whether to continue, and the standing answer supplies the reply.

**See also:** Stage Prompt, Permission Model

#### Static Site Build

The step that converts Markdown files and configuration into a folder of finished HTML, CSS, and JavaScript. The result needs no database or server-side program, so any file host can serve it.

**Example:** Running `mkdocs build` writes a `site` folder that GitHub Pages can publish directly.

**See also:** MkDocs Material, Strict Site Build, Build Success

#### Storage Capacity

The total space on a machine's drives, which limits how many model files, environments, and run outputs it can hold.

**See also:** Storage Management, Size on Disk, Storage Probe

#### Storage Management

Tracking and clearing the space that models, caches, and run output consume. Model files are large enough that a handful of candidates can fill a drive.

**Example:** Removing a rejected candidate's files after its test to free tens of gigabytes.

**See also:** Storage Capacity, Model Cache Directory, Size on Disk

#### Storage Probe

A probe that reports total, used, and free disk space for the volume that will hold models and run output.

**See also:** Storage Capacity, Disk Read Benchmark

#### Storage Read Speed

How fast a drive delivers data when read, measured in megabytes or gigabytes per second. It sets how long a model takes to load into memory.

**Example:** A 20 GB model file on a drive that reads 2 GB per second loads in about ten seconds.

**See also:** Model Load Time, NVMe Storage, Disk Read Benchmark

#### Strict Site Build

A build that treats every warning as an error, run with `mkdocs build --strict`. An ordinary build prints a warning about a broken link and finishes, while a strict build stops.

**Example:** A broken link in a chapter makes the strict build exit with a non-zero code.

**See also:** Build Success, Static Site Build, MkDocs Material

#### Structural Checks

Automated checks on the form of an output rather than its meaning: files exist, JSON parses, labels are unique, and the graph has no cycles.

**Example:** A learning-graph validator that reports duplicates, orphans, and cycles.

**See also:** Duplicate Concept Labels, Dependency Cycle Check, Required Output Files

#### Structural Validity

Whether an output meets the form rules a program can check: required files exist, the JSON and CSV agree, labels are unique, and the graph is acyclic.

**Example:** A learning graph with no cycles, no duplicate labels, and all seven files present.

**See also:** Structural Checks, Required Output Files, CSV-JSON Agreement

#### Structured Output

Model output that conforms to a required format, such as a JSON object with named fields of given types, so that a downstream program can read it. One missing field or stray character can break the whole step.

**Example:** A learning graph has to arrive as valid JSON and as a matching CSV file.

**See also:** Schema-Constrained JSON, Tool Calling, JSON Report

#### Subagent

An agent started by another agent to handle one part of a task in its own conversation. It returns a summary, so its working detail does not enter the parent's context.

**See also:** Orchestrator, Role Separation, Context Management

#### Subscription Pricing

A pricing scheme in which a user pays a fixed periodic fee for access to a service, usually with a usage allowance.

**See also:** Per-Token Pricing, Per-Seat Pricing, Rate Limits

#### Supervision Data Exposure

Data that reaches a third party because something is watching a run, even though the run itself is local. Here the cloud orchestrator reads generated text and logs back to monitor and score runs.

**Example:** Pasting a local run's logs into a cloud assistant for diagnosis sends that content to the provider.

**See also:** Data Egress Trace, Orchestrator, Privacy

#### System Administrator

The person responsible for a machine's configuration, security, and availability, who decides who gets accounts, what is installed system-wide, and when the machine is updated.

**See also:** Administrator Privileges, Operational Burden

#### System Freeze

The machine ceasing to respond entirely, with no SSH, no network, and no output. It differs from a crashed program, and on a unified-memory machine it can follow exhaustion of the shared pool.

**Example:** A unit that stops answering during a long run and needs a physical restart.

**See also:** Memory Watchdog, Unified Memory, Memory Pressure

#### System Prompt

The standing instruction that opens every conversation, describing the task, style, rules, and tools. It is resent at the start of every turn and is identical each time, which makes it cacheable.

**See also:** Harness Prompt Overhead, Prompt Caching

#### System RAM

The main memory attached to the CPU, which holds the operating system, running programs, and open files. On a unified-memory machine it is also the pool the GPU uses.

**Example:** The RAM probe reads total and available memory from the operating system's memory file.

**See also:** Unified Memory, RAM Probe, Dedicated GPU Memory

#### Tailnet

The private network of devices and users that one Tailscale account forms. Each device on it has a stable address and can reach the others subject to the access policy.

**See also:** Tailscale, Tailnet Name, Access Control List

#### Tailnet Invitation

An invitation that makes a person a member of another person's tailnet, so they can see and reach the devices that network's policy permits.

**Example:** The DGX's owner invites the evaluator into the tailnet, and the evaluator's laptop then joins it.

**See also:** Access Control List

**Contrast with:** Node Sharing

#### Tailnet Name

The identifier of the whole private network, which forms the suffix of every machine's full name. It appears only in full names and on the sign-in page, so it is easy to forget.

**Example:** A full name is written `<dgx-host>.<tailnet-name>.ts.net` in published examples.

**See also:** Tailnet, MagicDNS

**Contrast with:** Hostname

#### Tailscale

A mesh VPN service built on WireGuard that connects a user's devices into one private network, with automatic key handling, name resolution, and access policy.

**Example:** Installing it on a laptop and a DGX lets them reach each other without opening any router port.

**See also:** Tailnet, MagicDNS, Coordination Plane

#### Tailscale Auth Key

A pre-generated credential that lets a machine join a tailnet without an interactive browser sign-in. It is a secret: anyone who holds it can add a device.

**Example:** A headless server joins with one, and it is replaced by a placeholder in any shared script.

**See also:** Keys and Tokens, Tailscale Authentication

#### Tailscale Authentication

Proving a device's or user's identity to the tailnet, typically by signing in through an identity provider in a browser, so the device receives keys and can join.

**See also:** Tailscale Up Command, Tailscale Auth Key, Device Key Expiry

#### Tailscale Daemon

The background process, `tailscaled`, that maintains the machine's connection to the tailnet and handles its encrypted traffic, while the command-line client talks to it.

**See also:** Tailscale Installation, Tailscale Up Command

#### Tailscale Installation

Putting the Tailscale client and its background daemon on a machine and starting it, which is done on both the laptop and the DGX before they can join a tailnet.

**See also:** Tailscale Daemon, Tailscale Up Command, Dedicated Tool Environment

#### Tailscale Ping

A subcommand of the Tailscale client that sends test packets to a device across the tailnet and reports the round-trip time and whether the path is direct or relayed.

**Example:** A first reply via a relay followed by direct replies shows NAT traversal completing.

**See also:** DERP Relay, Connectivity Test, Tailscale Status Command

#### Tailscale Serve

A Tailscale feature that publishes a local service, such as a web preview or a model endpoint, to other devices on the same tailnet without opening it to the public internet.

**See also:** Endpoint Sharing, localhost Binding

#### Tailscale SSH

A Tailscale feature that lets the tailnet authenticate SSH logins by device and user identity, so no separate SSH key is managed on each machine.

**See also:** SSH, Access Control List

#### Tailscale Status Command

The subcommand `tailscale status`, which lists the devices on the tailnet with their addresses, names, and connection state. It is the quickest check that a device has joined.

**Example:** Sanitized output replaces each address with `100.x.y.z` and each name with `<dgx-host>` before it appears in a chapter.

**See also:** Tailscale Ping, Connectivity Test, Sanitized Sample Output

#### Tailscale Up Command

The subcommand `tailscale up`, which connects a machine to its tailnet and starts the sign-in on first use. Flags passed to it change the machine's settings, such as enabling Tailscale SSH.

**See also:** Tailscale Authentication, Tailscale Daemon

#### Task Loss

A run in which the model stops pursuing its assigned task after a few steps, which can look like a context problem when the first prompt already takes up much of the window.

**Example:** A model that opens a skill correctly and then ceases to act on it.

**See also:** Context Overflow, Premature Turn Termination

#### Telemetry Disabled

A harness setting that turns off usage reporting and other non-essential calls to the vendor, so the only traffic a run produces is the traffic the evaluation intends.

**Example:** Turning it off removes one category of outbound traffic from the data egress trace.

**See also:** Data Egress Trace, Network Boundary, Placeholder Credential

#### Temperature Setting

A sampling parameter that scales how adventurous token choice is: 0 takes only the most likely token, and higher values spread the choice across less likely ones.

**Example:** A low value suits structured files, though even then two long runs can diverge.

**See also:** Sampling Parameters, Run Variance

#### Text-Emitted Tool Call

A tool call that a model writes as plain text in its reply instead of as a structured request, so the harness sees no tool call and does nothing.

**Example:** A model prints the JSON of a file-write call in its answer, and the run ends after one turn.

**See also:** Tool Calling, Tool-Calling Reliability, Malformed Tool Call

#### Textbook Benchmark

A fixed input and a fixed way of scoring that together test whether a system can generate a textbook. Its runs execute the pipeline and collect per-stage metrics and wall-clock time.

**See also:** Algebra I Benchmark, Benchmark Runner, Pipeline Stage

#### Textbook Preview

Building the generated book and reading it as a reader would, which shows the navigation, tables, and admonitions instead of raw Markdown.

**Example:** Running `mkdocs build --strict` on a model's output and opening the resulting site.

**See also:** Strict Site Build, Static Site Build

#### Thermal Design Power

The sustained power, in watts, that a chip's cooling system is designed to dissipate. It indicates how much heat the chip produces at full load.

**Example:** A probe that reports a GPU's power limit exposes the design ceiling for its sustained draw.

**See also:** Power Draw, Thermals

#### Thermal Throttling

A chip's reduction of its own speed to stay below a safe temperature. It shows up as speed falling over a long run with no change in the workload.

**Example:** Generation speed drifts down while the GPU temperature climbs across a long stage.

**See also:** GPU Temperature, Thermals

#### Thermals

The temperatures a system reaches under load and the cooling that keeps them in range. High temperatures make a chip lower its own speed.

**See also:** Thermal Throttling, GPU Temperature

#### Throughput

The total amount of work done per unit of time across all requests, usually tokens per second summed over everything in flight.

**Example:** A server running four sessions can have higher throughput while each session runs slower.

**See also:** Latency, Batched Serving, Tokens per Second

#### Time Breakdown

A split of a run's, or one turn's, wall-clock time into loading, reading, writing, and tool execution, which shows which cause dominates and so where a speedup would help.

**Example:** A turn of 3 seconds reading, 20 seconds writing, and 2 seconds in a tool.

**See also:** Wall-Clock Time, Prompt Processing Speed, Turn Overhead

#### Time to First Token

The delay between sending a request and receiving the first token of the reply, made up mostly of model loading, if needed, and prompt processing.

**Example:** A first request after an idle period takes longer because the model has to load.

**See also:** Prompt Processing Speed, Model Loading, Latency

#### tmux Session

A terminal that keeps running after the user disconnects, so a server, download, or long benchmark continues if the SSH connection drops and can be reattached later.

**See also:** Background Service, SSH

#### Token

The unit of text a language model reads and writes: usually a whole short word or a piece of a longer word or punctuation mark. Model limits, speeds, and provider charges are counted in these units.

**Example:** The phrase "gather like terms" splits into about four or five of them.

**See also:** Tokenizer, Context Window, Tokens per Word

#### Tokenizer

The component that converts text into tokens a model can read and converts the model's output back into text. Each model family ships its own, so the same text yields different counts for different models.

**See also:** Token, Tokens per Word

#### Tokens per Second

The rate at which a model produces output tokens each second, the standard measure of generation speed. It excludes the time spent reading the prompt and loading the model.

**Example:** A model at 30 tokens per second writes about 1,330 tokens, roughly 1,000 words, in under a minute.

**See also:** Time to First Token, Throughput, Memory Bandwidth

#### Tokens per Word

The average number of tokens a tokenizer produces for one word of ordinary English prose. A common planning figure is about 1.33, which equals about three-quarters of a word per token.

**Example:** At 1.33, a 55,000-word book is about 73,000 tokens.

**See also:** Token, Tokenizer, Cost Model

#### Tool Call Count

The number of tool calls a model made in a run, taken from the event stream, which indicates how much work the agent did and, with failed calls, how smoothly it went.

**See also:** Failed Tool Calls, Tool-Call Success Rate

#### Tool Calling

A model's ability to ask a program to do something on its behalf by emitting a structured request that names a tool and its arguments, and then to use the result. The harness runs the tool, not the model.

**Example:** The model asks to write a file by naming the file-editing tool with a path and the content.

**See also:** Tool Definition, AI Agent Harness, Text-Emitted Tool Call

#### Tool Definition

The description of one tool that a harness gives the model: its name, what it does, and the arguments it takes. The model reads these descriptions to write a valid request.

**See also:** Tool Calling, File Editing Tool, Harness Prompt Overhead

#### Tool-Call Success Rate

The share of a run's tool calls that returned without an error, computed from the event stream as successful calls divided by all calls made.

**Example:** A run with 100 calls and 5 errors has a rate of 95 percent.

**See also:** Tool Call Count, Failed Tool Calls, Malformed Tool Call

#### Tool-Calling Reliability

How often a model produces a well-formed tool call when one is needed. It decides whether a harness run works at all and is rarely published as a number.

**Example:** A model that writes its first tool call as plain text fails here regardless of its other strengths.

**See also:** Tool Calling, Text-Emitted Tool Call, Tool-Call Success Rate

#### Top-p and Top-k

Two sampling limits: top-k restricts the choice to the k most likely tokens, and top-p restricts it to the smallest group of tokens whose combined probability reaches p.

**Example:** A top-k of 40 considers only the 40 most likely next tokens.

**See also:** Sampling Parameters, Temperature Setting

#### Total Cost of Ownership

The sum of everything spent to buy, power, set up, and run a machine over its life, usually expressed per year or per unit produced.

**See also:** Capital Cost, Fixed Costs, Variable Costs

#### Turn Overhead

The time in a turn that is not spent generating the reply: reading the new part of the prompt, running the tool, and the harness's own bookkeeping.

**Example:** The cost analysis assumes 15 seconds per turn when caching works.

**See also:** Agent Turn, Prompt Caching, Time Breakdown

#### Two-Layer Testing

Testing a model alone first and then inside the harness, so a failure can be placed in the model or in the surrounding system.

**See also:** Model-Only Test, Harness Smoke Test

#### Unattended SSH Login

An SSH login that needs no person present: the client authenticates with a key and runs its command. Scripts use it to run inventories and retrieve results.

**Example:** A retrieval script copies run directories from each unit without prompting anyone.

**See also:** BatchMode, Passphrase-Free Key

#### Uncontrolled Variable

Something that could affect the result and that the design did not hold fixed, either because it could not be or because it was not noticed.

**Example:** Models running at different context lengths because each setting was chosen from a memory estimate.

**See also:** Controlled Variables, Limitations Statement

#### Unified Memory

A single pool of memory shared by the CPU and GPU, so no separate GPU memory total exists. Model fit is judged against the system's available memory.

**Example:** A DGX Spark's GB10 chip uses one pool, so the RAM probe's available figure decides whether a model fits.

**See also:** Dedicated GPU Memory, Unified Memory Fit, Unified Memory Probe

#### Unified Memory Fit

The same model-fit calculation with the right number for memory on a unified-memory machine: the system's available memory from the RAM probe instead of a GPU's free memory.

**Example:** On a DGX Spark, the RAM probe's available figure is the budget the estimate is compared against.

**See also:** Unified Memory, RAM Probe, Model-Fit Calculation

#### Unified Memory Probe

A check that detects a unified-memory machine by noticing that per-GPU memory totals are missing, then sets a flag so later steps use system memory for model fit.

**Example:** When every GPU's total comes back as `None`, the report marks `unified_memory` as true.

**See also:** Unified Memory, Unified Memory Fit, RAM Probe

#### User-Space Installation

Installing software under a user's own home directory with no administrator rights, as opposed to a system-wide install. The software runs as that user and changes nothing for others.

**See also:** Release Archive, Administrator Privileges, tmux Session

#### Usernames and Passwords

The account on the machine: a login name, which is a valid target because Linux names are case-sensitive, and a secret that belongs in no file, message, or screenshot.

**Example:** A terminal prompt in a screenshot that includes the account name.

**See also:** Keys and Tokens, Home Directory Paths

#### Utilization Rate

The share of available time a machine spends doing useful work. Because fixed expenses are spread over the work done, a higher rate lowers the expense of each book.

**Example:** A unit that generates for half the hours in a year has a 50 percent rate and idles the other half.

**See also:** Idle Power Draw, Fixed Costs, Cost Model

#### Variable Costs

Expenses that grow with the amount generated, such as the electricity used for each book or a per-token charge for each prompt.

**See also:** Fixed Costs, Energy per Textbook

#### Vendor Lock-In

Dependence on one provider's models, interfaces, or file formats that makes switching to another provider expensive or slow. Open interfaces and open weights reduce it.

**Example:** A skill chain written against a widely copied interface can point to a different server by changing only the base address.

**See also:** OpenAI-Compatible API, Open-Weight Model, Version Pinning

#### Version Pinning

Fixing the exact version of a model, library, or tool in use so that results are repeatable. Local weights can be pinned indefinitely, while a cloud model can be changed or retired by its provider.

**Example:** Recording a model's exact tag and file checksum in the run record.

**See also:** Model Deprecation, Reproducibility, Checksum Verification

#### vis-network

A JavaScript library that draws nodes and edges in a web page and lets the reader drag, zoom, and click them. It takes a list of nodes with ids and labels and a list of edges with `from` and `to` fields.

**Example:** The learning graph viewer feeds the JSON concept graph to this library.

**See also:** Learning Graph Viewer, Learning Graph

#### Vitals Logging

Recording a few measurements at a fixed interval while a long job runs, so that a machine that fails leaves its last readings behind.

**Example:** A loop writes one JSON line every 30 seconds with available memory, GPU temperature, and power.

**See also:** Memory Watchdog, System Freeze, GPU Monitoring

#### vLLM

An inference server built for throughput that batches many requests together on the GPU, producing more total tokens per second when several sessions are active.

**Example:** A benchmark that runs one session at a time gains little from its batching.

**See also:** Batched Serving, Throughput, Ollama

#### Wall-Clock Time

The elapsed real time of a run from start to finish, including loading, reading, writing, tools, and waiting. It is the figure a person waits for and the one the cost model uses.

**Example:** A stage that starts at 10:00 and ends at 11:30 took 90 minutes.

**See also:** Time Breakdown, Run Time Limit, Whole-Book Time Estimate

#### Whole-Book Time Estimate

An extrapolation of the time for a complete book from the stages and chapters actually measured. It is the number the cost model needs.

**See also:** Time Breakdown, Wall-Clock Time, Cost Model

#### WireGuard

A modern VPN protocol that creates encrypted tunnels between devices using public-key cryptography and a small codebase. Tailscale builds its data plane on it.

**See also:** Tailscale, Data Plane, Mesh VPN

#### Word-Count Targets

Per-concept guidelines for how many words a section of chapter content has, driven by the concept's impact score so that a concept many others rest on gets more careful explanation.

**See also:** Concept Impact Score, Elaboration Budget

#### Writing Quality

How good a model's prose is: clear, accurate, at the stated reading level, and sustained across thousands of words. A textbook is mostly prose.

**Example:** A reviewer scores chapters for clarity and accuracy without knowing which model wrote them.

**See also:** Long-Form Writing, Reading Level Measure, Blind Human Review

#### x86_64 Architecture

The 64-bit instruction set used by most Intel and AMD processors, reported by Linux as `x86_64`. Software built for it does not run on an aarch64 machine without being rebuilt.

**Example:** An `x86_64` package wheel will not install on an Arm-based DGX.

**See also:** aarch64 Architecture, CPU Architecture

