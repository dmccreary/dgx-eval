---
title: 'Testing Architecture: How the Evaluation Was Wired'
description: 'An interactive diagram of the machines, networks, and software used to test whether a local model on a DGX can generate textbook content, and what data crosses each boundary.'
---

# Testing Architecture

This page shows how the evaluation was wired: one laptop, two home networks,
the internet between them, and two DGX systems. Step through the diagram to
see which machine does each job.

<iframe src="../sims/testing-architecture/main.html" height="714px" width="100%" scrolling="no"></iframe>

[Run the Testing Architecture MicroSim Fullscreen](sims/testing-architecture/main.html){ .md-button .md-button--primary }

!!! warning "Placeholders, not real values"

    The diagram leaves out every address, hostname, and login, and it calls
    the machines "DGX unit A" and "DGX unit B". A published architecture
    diagram should show how the parts connect, never how to reach them.

## Three Roles, Three Places

The evaluation separates three jobs that are easy to confuse.

| Role | What fills it | Where it runs |
|---|---|---|
| Orchestrator | A Claude Code session using a cloud model | The laptop |
| Harness | Claude Code as the agent loop, in a Docker container | Each DGX |
| Model | An open-weight model served by Ollama | Each DGX GPU |

The orchestrator starts runs, watches them, and scores the output. The harness
loads a skill, sends prompts to the model, and runs the tools the model asks
for. The model generates every token of the textbook.

## Inside Each DGX

Both units have the same hardware. The disks hold different models.

| Component | DGX unit A | DGX unit B |
|---|---|---|
| CPU | 20 Arm cores | 20 Arm cores |
| GPU | NVIDIA GB10, 6,144 CUDA cores | NVIDIA GB10, 6,144 CUDA cores |
| Memory | 128 GB unified, shared by CPU and GPU | 128 GB unified, shared by CPU and GPU |
| Disk | 1 TB NVMe | 1 TB NVMe |
| Models on disk | `qwen3.8:27b` (17 GB), `gpt-oss:120b` (65 GB) | `gemma4:26b` (18 GB), `gemma4:31b` (20 GB) |

The GPU has no memory of its own. Ollama loads a model from disk into unified
memory, and the GPU works on it there. Model weights and the conversation
context compete for the same 128 GB that the CPU and every other program use.

A 200 Gb/s link joins the two units. The evaluation did not combine them: each
unit ran its own model independently.

## What Crosses Each Boundary

The reason to run a model locally is to control where data goes. This table
lists what each outside party could see.

| Party | What it sees | When |
|---|---|---|
| Tailscale coordination server | Machine identities, public keys, and addresses | When a machine joins or reconnects |
| Home routers and Tailscale relay | Encrypted WireGuard packets | Whenever the laptop talks to a DGX |
| Model registry | Requests for model files | Once, at download |
| Software sources | Requests for the container image and installer | Once, when the container was built |
| Claude API | The orchestrator's commands and everything it reads back | Throughout |
| Nobody outside the DGX | Generation prompts and generated tokens | During the generation loop, once the harness ran on the DGX |

Two rows need care. First, the orchestrator is a cloud model. Whatever it
reads to monitor or score a run, including generated text, goes to the Claude
API. The generation loop is local; the supervision of it was not.

Second, the harness was configured to send its model requests only to Ollama
on the same machine, with a placeholder credential and its optional network
features turned off. That configuration was not confirmed with a packet
capture.

## Two Arrangements of the Harness

The harness ran in two places during the evaluation. The last step of the
diagram shows the earlier one.

- **First runs: harness on the laptop.** Claude Code ran on the laptop and
  reached Ollama through an SSH port forward inside the tunnel. Prompts and
  tokens crossed the tailnet, encrypted, on every turn.
- **Later runs: harness on the DGX.** Claude Code moved into a Docker container
  on each DGX. The harness and the model then talked over the machine's own
  loopback interface, and a run kept going with the laptop disconnected.

The container also limits what the agent can change. Inside it the agent may
run any command, and the only places it can write are its own run directory
and its transcript folder.
