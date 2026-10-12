---
title: "Tailscale Status Reader"
description: "Read six sanitized lines of Tailscale status output and choose what each one means."
image: /sims/tailscale-status-reader/tailscale-status-reader.png
og:image: /sims/tailscale-status-reader/tailscale-status-reader.png
twitter:image: /sims/tailscale-status-reader/tailscale-status-reader.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Understand
---

# Tailscale Status Reader

<iframe src="main.html" height="534px" width="100%" scrolling="no"></iframe>

[Run the Tailscale Status Reader MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

One line of tailscale status says whether a device is this one, connected directly, connected through a relay, idle, offline, or not signed in. The words are terse, and several are easy to misread, such as taking idle for down.

This MicroSim shows six lines, one at a time. Every address and name is a placeholder or comes from a documentation address range.

## How to Use

- Read the line under the command. The last column carries the state.
- Select one meaning from the list. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/tailscale-status-reader/main.html"
        height="534px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will interpret 6 sanitized lines of Tailscale output by choosing the meaning of each, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- Tailscale status command
- Tailscale ping
- Device key expiry
- DERP relay
- Peer-to-peer connection

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Lines 3 and 5 both mean you are not connected directly. Explain which of the two still lets you log in.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- `idle` means the device is down.
- A relay connection is a failure.
- A listed device is reachable.
- A dash in the last column means something is wrong.

## References

1. [Chapter 9: Installing Tailscale and Taking a Read-Only Inventory](../../chapters/09-tailscale-and-inventory/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Tailscale CLI](https://tailscale.com/kb/1080/cli) - Tailscale. The status and ping commands and the fields they print.
3. [DERP Servers](https://tailscale.com/kb/1232/derp-servers) - Tailscale. The relays used when two machines cannot connect directly.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
