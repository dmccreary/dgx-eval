---
title: "Endpoint Exposure Classifier"
description: "Decide, for six configurations of a local model endpoint, whether a stated party can reach it."
image: /sims/endpoint-exposure-classifier/endpoint-exposure-classifier.png
og:image: /sims/endpoint-exposure-classifier/endpoint-exposure-classifier.png
twitter:image: /sims/endpoint-exposure-classifier/endpoint-exposure-classifier.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Analyze
---

# Endpoint Exposure Classifier

<iframe src="main.html" height="512px" width="100%" scrolling="no"></iframe>

[Run the Endpoint Exposure Classifier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Whether a party can reach an endpoint depends on three things: the address the server is bound to, the path the connection takes, and where the party sits. Each case here changes one of them.

This MicroSim splits each case into the binding and the request so that the two can be read apart. The cases are synthetic examples, and the addresses shown are the loopback address and the every-interface address.

## How to Use

- Read how the server is bound, then who sends a request and by which path.
- Choose **Can reach** or **Cannot reach**. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/endpoint-exposure-classifier/main.html"
        height="512px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will distinguish, for 6 configurations of a local endpoint, whether a stated party can reach it, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Localhost binding
- Endpoint sharing
- SSH port forward
- Tailscale Serve
- Home router
- Access control list

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Cases 2 and 3 have the same binding and the same laptop, and opposite answers. State what differs.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- Any machine on the same network can reach a localhost-bound server.
- A port forward needs the server to listen on a network address.
- Binding to every interface exposes the server to the whole internet regardless of the router.
- Tailscale Serve opens the server to everyone.

## References

1. [Chapter 13: Inference Servers and Local API Endpoints](../../chapters/13-inference-servers/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Localhost](https://en.wikipedia.org/wiki/Localhost) - Wikipedia. The loopback address and why only the same machine can reach it.
3. [Network Address Translation](https://en.wikipedia.org/wiki/Network_address_translation) - Wikipedia. How a home router maps private addresses and why it drops unsolicited connections.
4. [How Tailscale Works](https://tailscale.com/blog/how-tailscale-works) - Tailscale. The coordination server, WireGuard tunnels, and relays.
