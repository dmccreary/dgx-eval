---
title: Testing Architecture
description: Step through how a laptop, two home networks, the internet, Tailscale, and two DGX systems fit together when a local model generates textbook content.
image: /sims/testing-architecture/testing-architecture.png
og:image: /sims/testing-architecture/testing-architecture.png
twitter:image: /sims/testing-architecture/testing-architecture.png
social:
   cards: false
quality_score: 100
status: built
---

# Testing Architecture

<iframe src="main.html" height="714px" width="100%" scrolling="no"></iframe>

[Run the Testing Architecture MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This diagram shows every machine and network involved when a laptop directs
two DGX systems to generate textbook content with a local model. Three
containers hold the parts: the author's home network, the internet, and the
Administrator's home network. Each DGX shows its CPU, GPU, unified
memory, disk, and the software that runs on it.

The diagram contains no addresses, hostnames, or logins. The machines are
labeled "DGX unit A" and "DGX unit B" on purpose.

## How to Use

- Press **Next** to follow eight flows one at a time. The parts a flow uses stay
  bright, and the rest fade.
- Press **Previous** to go back, or **Overview** to see everything at once.
- Point at any component to read what it is and what it does.

The eight flows are: joining the tailnet, building the encrypted tunnel,
orchestrating over SSH, the one-time downloads, loading a model into memory,
the generation loop that stays on the DGX, collecting results, and the earlier
arrangement in which the harness ran on the laptop.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/testing-architecture/main.html"
        height="714px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Explain which machine does each job in a local-model evaluation, and which
data crosses each network boundary.

### Grade Level

Professional development and adult continuing education

### Duration

10-15 minutes

### Prerequisites

- What SSH is and what a home router does
- The difference between a model and the program that runs it

### Activities

1. **Exploration** (5 min): Step through all eight flows. For each one, name
   the machines that take part before reading the explanation.
2. **Guided Practice** (5 min): Answer from the diagram alone. Which components
   could read a generation prompt? Which see only encrypted packets? What does
   the coordination server learn?
3. **Assessment** (5 min): Without the diagram, sketch the generation loop and
   mark the one boundary it never crosses.

### Assessment

A learner who understands the architecture can:

- State that the GPU has no memory of its own and shares 128 GB with the CPU
- Separate Tailscale's coordination server from the tunnel that carries data
- Explain why the orchestrator's cloud model is not part of the generation loop
- Say what changed when the harness moved from the laptop to the DGX

## References

1. [How Tailscale Works](https://tailscale.com/blog/how-tailscale-works) - Tailscale. Explains the coordination server, WireGuard tunnels, NAT traversal, and relays.
2. [DERP Servers](https://tailscale.com/kb/1232/derp-servers) - Tailscale. Describes the relays used when two machines cannot connect directly.
3. [DGX Spark Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - NVIDIA. Source for the GPU core count and the unified memory design.
4. [Anthropic Compatibility](https://docs.ollama.com/api/anthropic-compatibility) - Ollama. Describes the endpoint that lets Claude Code use a local model.
5. [Agent Skills](https://agentskills.io/home) - The open standard for the skills the harness executes.
