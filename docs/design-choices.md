---
title: 'Design Choices: Why the Evaluation Was Built This Way'
description: 'The design decisions behind the DGX testing configuration: what was chosen, what else was considered, why, who decided, and which choices did not hold up.'
---

# Design Choices

This page records the design decisions behind the testing configuration. For
each one it gives the choice, the options weighed against it, and the reason.

Three parties made these decisions: the Primary Author; the Administrator, who
runs the DGX systems; and Claude, the AI assistant that built and ran the tests
under the Primary Author's direction. The page says who decided each one, because a choice made by
a person with a goal and a choice made by an assistant filling a gap deserve
different scrutiny.

Some of these choices did not hold up. They are marked where they appear and
collected in the last section.

## Who Decided What

| Decision | Decided by |
|---|---|
| Tailscale for remote access | The Administrator, who delegated the choice to their own Claude assistant |
| Python and Unix shell scripts for automation | The Primary Author |
| A dedicated `dgx` conda environment on the laptop | The Primary Author |
| Start testing before Docker access existed | The Primary Author |
| Algebra I as the benchmark course | The Primary Author |
| Three pipeline stages in the benchmark, and no more | The Primary Author |
| Fix the skill's faulty example before the comparison runs | The Primary Author |
| Run the harness in a Docker container on the DGX | The Primary Author, on Claude's recommendation |
| Only a local model may generate benchmark content | The Primary Author |
| Everything else on this page | Claude |

## Remote Access: Tailscale

**Decided by:** The Administrator, through their own Claude assistant.

This evaluation did not weigh the alternatives and does not know the reasoning
behind the choice. What the choice gave the evaluation is clear: the laptop
reaches both DGX systems across two home routers, and the evaluation never had
to ask for a change to either router.

The choices Claude made inside that decision were about the laptop.

| Option | Assessment |
|---|---|
| **conda-forge `tailscale` and `tailscaled` packages** | Chosen. The Primary Author asked for the tools in a conda environment, and these are the open-source client and daemon |
| The Tailscale macOS application | Simpler to run, but it lives outside the conda environment the Primary Author asked for |
| Homebrew | Same software, but again outside the conda environment |

The cost is that the daemon must be started by hand, with `sudo`, in every
session.

## Automation: Python and Unix Shell

**Decided by:** The Primary Author.

Every test, probe, and runner is a Python or shell script. Claude made three
choices inside that decision.

| Choice | Alternative considered | Why |
|---|---|---|
| Standard library only for Python that runs on the DGX | Packages such as `requests`, `psutil`, and NVML bindings | The scripts run on a fresh machine with no installs and no administrator rights. The cost is parsing `nvidia-smi` text for GPU readings |
| Pipe read-only scripts over SSH | Copy files to the DGX first | An inventory can run before anything is installed or written there |
| Run long jobs inside `tmux` | `nohup`, or a user-level system service | A dropped SSH session does not stop a download or a run. The cost is that nothing restarts after a reboot |

## Login: SSH Keys

**Decided by:** Claude proposed it, and the Primary Author created and installed the key.

| Option | Assessment |
|---|---|
| **An Ed25519 key with no passphrase** | Chosen. Scripts and the assistant can log in unattended |
| Password login | Cannot be automated, and the assistant does not enter passwords |
| A key with a passphrase, held by an agent | Safer if the laptop is stolen, at the price of more setup |
| Tailscale SSH | Needs a configuration change on the DGX, which is the Administrator's to make |

The cost is that the private key file alone is enough to reach the DGX.

## Model Server: Ollama

**Decided by:** Claude.

| Option | Assessment |
|---|---|
| **Ollama** | Chosen. It installs from one archive into a home directory, has the widest ready-made model library, and offers an API that Claude Code can use directly |
| llama.cpp built from source | The compiler and CMake were present, so it was possible. It would have meant a build step and manual model downloads before the first measurement |
| vLLM | Better throughput under concurrent load. The usual route on this hardware is a container, and the account had no Docker access when the choice was made |

vLLM remains the candidate for a second pass on whichever model wins.

Ollama had a cost that appeared later. With one model, the server re-read
almost the whole conversation on every turn, which added one to two minutes
per turn. The cause was not identified.

## Installing Without Administrator Rights

**Decided by:** The Primary Author directed that testing start before Docker access existed.
Claude chose the method.

| Option | Assessment |
|---|---|
| **Official release archive, unpacked into the home directory** | Chosen. No privileges, a checksum to verify, a pinned version, and one directory to delete to undo it |
| Ollama's install script | Needs `sudo` and creates a system service on a machine that belongs to someone else |
| Ask the Administrator to install it | Correct for a permanent setup, and it would have blocked the first measurements |

The server listens on the DGX's own loopback interface only. Exposing it on
the tailnet would have been convenient, and it would have changed which
services the Administrator's machine offers. The laptop reaches it through
SSH instead.

## Candidate Models

**Decided by:** Claude.

The criteria came from the workload. A model had to support tool calling,
offer a context window of at least 64,000 tokens, fit in memory with room for
that context, and come from a publisher that could be identified, under terms
that could be checked.

| Model | Size on disk | Why it was included |
|---|---|---|
| `qwen3.8:27b` | 17 GB | The newest Qwen release, built for agent work |
| `gemma4:26b` | 18 GB | A mixture-of-experts model with about 4 billion active parameters, expected to be fast |
| `gemma4:31b` | 20 GB | The dense counterpart from the same family, for a direct comparison |
| `gpt-oss:120b` | 65 GB | The largest model that still runs at a usable speed on one unit |

### Why `qwen3.8:27b`

Four things put it on the list.

- **It is aimed at this workload.** Its publisher describes it as improved for
  long-running agent tasks, for planning, for handling feedback from tools,
  and for compatibility with agent harnesses. That is a description of running
  a skill.
- **Its family has the tool-calling record.** A mid-2026 survey reported Qwen
  models holding most of the top places on a public function-calling
  leaderboard. A harness is useless with a model that writes malformed tool
  calls.
- **It fits with room to spare.** At 17 GB it leaves most of the 128 GB free
  for a long context, and it declares a 256,000-token window. An 8-bit version
  at 30 GB exists for a later quality comparison.
- **It is current and widely used.** It was the newest Qwen release in the
  model library, with several million downloads, so the server's support for
  it was likely to be well exercised.

Two things were not known when it was chosen. Its library page did not say
whether it is a dense or a mixture-of-experts model. Its license was reported
as Apache 2.0 by secondary sources only, and that still needs checking against
the license file.

It then followed every formatting rule in the model tests, wrote the most
careful reports in the harness, and was by far the slowest model there.

### Models Left Out

| Option | Why not, for now |
|---|---|
| `qwen3.5:122b` | At 81 GB it was the largest download, and `gpt-oss:120b` already covered the large tier |
| Models whose publisher or license could not be identified | A result cannot be recommended to readers who cannot check the terms |
| Models that need both units combined | The course does not cover multi-machine serving |

### Quantization and Reasoning

Each model ran at its default 4-bit quantization. That keeps downloads small
and speed high, and it leaves an 8-bit retest for the winner, since memory is
not the constraint. The model tests ran with reasoning turned off to bound
their run time. The harness runs used each model's default, and that
difference mattered: see the last section.

## Two Layers of Testing

**Decided by:** Claude.

A model is tested alone first, on five short tasks, and only then inside the
harness.

| Option | Assessment |
|---|---|
| **Model alone, then harness** | Chosen. A model that cannot keep a blank line before a list fails in seconds, not after an hour |
| Go straight to the pipeline | Every failure would be slow, and would mix model faults with harness faults |
| Rely on published leaderboards | They do not test this book's rules, such as how a MicroSim attaches its canvas |

The first versions of three checks were too strict and failed correct output.
Each was fixed and the saved output was scored again.

## Harness: Claude Code

**Decided by:** Claude chose it over the alternatives. The Primary Author then confirmed it,
with the condition that only a local model generates.

| Option | Assessment |
|---|---|
| **Claude Code** | Chosen. The published books were generated with it and the skills were written for it, so the model becomes the only thing that changes |
| OpenCode | Open source with a lighter prompt. A good second harness for telling a model failure from a harness mismatch |
| Codex CLI, Goose | Both implement Agent Skills. Neither matched the way the comparison books were made |
| A cloud model plans and the local model writes | Offered to the Primary Author as a hybrid. He chose the local harness, because the benchmark tests whether a local harness can execute the skills |

The cost is that Claude Code's own instructions and tool definitions run to
about 19,000 tokens and were written for Claude models. A local model that
struggles may be struggling with the harness.

## Where the Harness Runs

**Decided by:** The Primary Author chose the container, on Claude's recommendation.

| Option | Assessment |
|---|---|
| **A Docker container on the DGX** | Chosen. The agent can run any command and can write only to its run directory |
| On the laptop, through an SSH port forward | Used for the first runs. It has no sandbox, so the agent was allowed no shell commands, and most skills need them |
| Directly on the DGX | No isolation from the Administrator's system. The assistant's own permission checks also refused to run an installer there |

Claude made the choices inside the container: a pinned harness version, a
non-root user whose files belong to the account that started the run, the
skills mounted read-only, a placeholder credential, and the harness's optional
network features turned off.

One of those choices is a known weakness. The container shares the host's
network so that it can reach the model server. It is a filesystem sandbox, not
a network sandbox.

## Context Length

**Decided by:** Claude. **This choice did not hold up.**

| Option | Assessment |
|---|---|
| 64,000 tokens | The minimum the model server's own guidance recommends for this harness |
| 128,000 tokens | Used for the first harness runs, without incident |
| **256,000 tokens** | Chosen for the container runs. The harness assumes a window near 200,000 tokens, and a smaller one is silently truncated |

With one model loaded and idle at this setting, its machine showed 66 GiB in
use. A few minutes into that model's first long run, the machine stopped
responding entirely and needed the Administrator. Memory exhaustion is the
leading suspect and was not confirmed.

## Benchmark Definition

**Decided by:** The Primary Author chose the course and the scope. Claude chose the mechanics.

The Primary Author set the benchmark as Algebra I, limited to three skills: the learning
graph, the chapter structure, and the chapter content.

| Choice | Alternative considered | Why |
|---|---|---|
| A fixed template and one fixed prompt per stage | Interactive runs | Every model must start from identical input |
| Prompts carry a standing answer to approval questions | Answering by hand | Nobody is present during a run, and a paused run measures nothing |
| Each stage starts from a copy of the previous stage's output | One long session for all stages | Each stage gets its own timing and token counts, and its input is preserved |
| Run output is kept outside the repository | Committing results as they arrive | Raw output holds local paths and has not been sanitized |
| The published book is a reference for scale only | Treating it as the baseline | It was made with earlier skills, and no timings or token counts were kept |

## Scoring

**Decided by:** Claude.

| Option | Assessment |
|---|---|
| **Structural checks by script** | Chosen for now. A program can verify that a graph has 200 concepts and no cycles |
| A language model as judge | It brings its own biases, and it would send the generated text to a cloud service |
| Human review against a rubric | The right test of quality. It has not been done yet |

A structural pass does not mean the content is good. No quality judgment has
been made.

## Choices That Did Not Hold Up

- **The 256,000-token context.** It is the suspected cause of a machine
  freezing. A memory watchdog now runs before any model does.
- **Long runs on both units at once.** When one unit froze, there was no idle
  machine to observe from, so the cause could not be seen as it happened.
- **Testing with reasoning off, then running with it on.** The model tests
  predicted speeds that the harness runs did not match. One model spent
  nineteen minutes on a single turn, nearly all of it reasoning.
- **Dropping a model before the skill was fixed.** The fastest model was set
  aside partly for broken navigation files. Those came from a faulty example
  in the skill, which has since been corrected. That model has not been
  retested.
