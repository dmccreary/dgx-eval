---
title: "Inference Request Path"
description: "Open the six stages of a chat completion request, then find the stage responsible for each of four described events."
image: /sims/inference-request-path/inference-request-path.png
og:image: /sims/inference-request-path/inference-request-path.png
twitter:image: /sims/inference-request-path/inference-request-path.png
social:
   cards: false
quality_score: 100
status: built
library: Mermaid
bloom_level: Understand
---

# Inference Request Path

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Inference Request Path MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A request to a local model passes through a client, an endpoint, a request handler, a model loader, generation, and a response. A slow first request, a rejected model name, and a refused connection each belong to a different stage.

Opening a stage shows what it does. Once all six are open, four questions describe an event and ask which stage accounts for it. The stages and questions are synthetic examples.

## How to Use

- Click each stage in the diagram, or its button below the diagram, to read its description.
- When all six are open, press **Start the questions**. Choose one stage for each question, then press **Confirm**.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/inference-request-path/main.html"
        height="522px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will explain what each of 6 stages of a chat completion request does by opening each stage and then locating the stage responsible for each of 4 described events, with at least 3 of 4 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Inference server
- Local API endpoint
- Chat completions endpoint
- Model loading
- GPU offload
- Localhost binding
- Curl request

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): A request returns "model not found" in a few milliseconds. Explain why the speed of that failure is itself evidence about the stage.

### Assessment

Mastery is 3 of 4 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- The first request is slow because the GPU is slow.
- A wrong model name is rejected by the model.
- A refused connection is a model problem.
- Token counts are computed by the client.

## References

1. [Chapter 13: Inference Servers and Local API Endpoints](../../chapters/13-inference-servers/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Anthropic Compatibility](https://docs.ollama.com/api/anthropic-compatibility) - Ollama. The local endpoint that a harness sends requests to.
3. [Localhost](https://en.wikipedia.org/wiki/Localhost) - Wikipedia. The loopback address and why only the same machine can reach it.
4. [Flowcharts Syntax](https://mermaid.js.org/syntax/flowchart.html) - Mermaid. The diagram language used to draw this MicroSim.
