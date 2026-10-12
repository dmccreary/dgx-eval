---
title: "Tailscale Connection Path"
description: "Step through how two devices behind home routers build an encrypted connection, then predict paths and sort messages by plane."
image: /sims/tailscale-connection-path/tailscale-connection-path.png
og:image: /sims/tailscale-connection-path/tailscale-connection-path.png
twitter:image: /sims/tailscale-connection-path/tailscale-connection-path.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Understand
---

# Tailscale Connection Path

<iframe src="main.html" height="604px" width="100%" scrolling="no"></iframe>

[Run the Tailscale Connection Path MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Two devices behind home routers cannot simply call each other, because each router drops connections it did not start. A coordination service exchanges their keys and addresses, both devices then send at the same moment to open a direct path, and a relay carries the encrypted packets when that fails.

This MicroSim walks through those five steps on a diagram, then asks six items. The diagram shows no addresses, names, or keys, and the items are synthetic examples.

## How to Use

- Press **Next** to move through the five steps, and **Previous** to go back. Then press **Start the items**.
- For items 1 to 3, choose **Direct** or **Relay**. For items 4 to 6, choose **Coordination plane** or **Data plane**.
- Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt. The reveal marks the answer on the diagram. After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/tailscale-connection-path/main.html"
        height="604px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will explain how two devices behind NAT build an encrypted connection by predicting the path for 3 scenarios and assigning 3 messages to the coordination plane or the data plane, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Home router
- NAT traversal
- Peer-to-peer connection
- DERP relay
- Coordination plane
- Data plane

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): A relay forwards every packet of a relayed connection. Explain why it still cannot read them.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- The coordination service carries or can read the traffic.
- A relay can read the traffic it forwards.
- Two devices behind routers can never connect directly.
- A relayed connection is not encrypted.

## References

1. [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../../chapters/07-remote-access-ssh-mesh-vpn/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [How Tailscale Works](https://tailscale.com/blog/how-tailscale-works) - Tailscale. The coordination server, WireGuard tunnels, and relays.
3. [How NAT Traversal Works](https://tailscale.com/blog/how-nat-traversal-works) - Tailscale. A detailed account of opening a direct path between two devices behind routers.
4. [UDP Hole Punching](https://en.wikipedia.org/wiki/UDP_hole_punching) - Wikipedia. The simultaneous-send technique that opens a path through two routers.
