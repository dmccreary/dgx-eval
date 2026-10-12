---
title: "Agent Loop Stepper"
description: "Step through the five phases of one agent turn, then choose what the harness does next in six situations."
image: /sims/agent-loop-stepper/agent-loop-stepper.png
og:image: /sims/agent-loop-stepper/agent-loop-stepper.png
twitter:image: /sims/agent-loop-stepper/agent-loop-stepper.png
social:
   cards: false
quality_score: 100
status: built
library: p5.js
bloom_level: Understand
---

# Agent Loop Stepper

<iframe src="main.html" height="634px" width="100%" scrolling="no"></iframe>

[Run the Agent Loop Stepper MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An agent harness runs a loop: it sends the conversation to the model, reads the reply, runs any tool the reply asks for, and appends the result. This MicroSim first walks through one turn of that loop, phase by phase, with the conversation growing at the last phase.

Six situations follow. Each one changes a single fact about the reply or the tool result, and you choose which of six outcomes the harness produces. The situations are synthetic examples.

## How to Use

- Press **Next** to move through the five phases, and **Previous** to go back. Then press **Start the situations**.
- Read the situation and select one outcome from the list. Press **Confirm** to lock in the answer. The correct answer and the reason appear, and there is no second attempt.
- After the last one, read the score and the misconception named beside each miss, then press **Start over** to try again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/dgx-eval/sims/agent-loop-stepper/main.html"
        height="634px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will explain what the harness does after each of 6 model replies or tool results by choosing the outcome of each, with at least 5 of 6 correct.

### Grade Level

Professional development and adult continuing education

### Duration

10 minutes

### Prerequisites

- AI agent harness
- Agent loop
- Agent turn
- Tool definition
- Permission model
- Context compaction
- Context truncation

### Activities

1. **Work alone** (5 min): Answer every item without notes, committing each answer before the reveal.
2. **Review the misses** (3 min): For each miss, read the reason and the misconception on the final screen, then find the passage in the chapter that corrects it.
3. **Discuss** (2 min): Situation 3 and situation 1 both contain a tool call. State the one difference that makes the harness act on one and not the other.

### Assessment

Mastery is 5 of 6 correct on the first attempt. Exploring before answering is practice and does not count as evidence.

### Misconceptions Addressed

- The model runs its own tools.
- A tool call written as text still runs.
- The conversation is reset each turn.
- A permission question is answered automatically.

## References

1. [Chapter 16: The Agent Loop, Tools, and Context](../../chapters/16-agent-loop-and-tools/index.md) - The chapter of this book that teaches the concepts this MicroSim practices.
2. [Intelligent Agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia. The perceive, decide, and act loop that an agent harness implements.
3. [Agent Skills](https://agentskills.io/home) - The open standard for the skill format this MicroSim annotates.
4. [p5.js Reference](https://p5js.org/reference/) - p5.js. The drawing and control functions this MicroSim is built from.
