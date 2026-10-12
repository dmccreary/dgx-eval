---
title: "The Agent Loop, Tools, and Context"
description: "What an agent harness does between a prompt and a result: the agent loop, tool definitions, file and shell tools, permissions, context management, compaction and truncation, and how orchestrators and subagents divide work."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:19:05"
version: 1.11
---

# The Agent Loop, Tools, and Context

## Summary

This chapter explains what an agent harness does between a prompt and a result. It covers the agent loop, tool definitions, file and shell tools, permissions, context management, compaction, truncation, and how orchestrators and subagents divide work. Students finish able to trace one agent turn and say where its time and context go.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| AI Agent Harness | 173 |
| Tool Definition | 14 |
| Agent Loop | 29 |
| File Editing Tool | 6 |
| Shell Execution Tool | 6 |
| Orchestrator | 3 |
| System Prompt | 2 |
| Agent Turn | 11 |
| Context Management | 6 |
| Permission Model | 5 |
| Subagent | 1 |
| Role Separation | 1 |
| Turn Overhead | 7 |
| Context Truncation | 3 |
| Peak Context Size | 2 |
| Context Compaction | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)
- [Chapter 15: Optimizing Small Language Model Performance](../15-optimizing-performance/index.md)

---

!!! mascot-welcome "Follow One Turn All the Way Through"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model by itself only produces text, and an agent is the machinery that turns that text into actions. By the end of this chapter you will be able to trace one agent turn and say where its time and its context go. Measure first, then decide!

## What This Chapter Covers

Chapter 13 gave you an endpoint that answers a prompt. A textbook, though, is not one answer. It is hundreds of steps: read a file, plan a chapter, write it, build the site, notice an error, fix it. Something has to turn a model's single reply into that sequence, and that something is the **AI agent harness**.

This chapter takes the harness apart. It defines the loop at its center, the tools the model can call, and the permission rules that decide which calls are allowed. It then covers the part that most often limits a long session, which is the context, and what a harness does when the context grows too large. It ends with two ways of dividing work among several agents, which this evaluation used and which affect how its results should be read.

## The Harness and the Loop

### AI Agent Harness

An **AI agent harness** is the program that wraps a language model so that it can act in the world. The model supplies language: given a conversation, it produces the next message. The harness supplies everything else: the system prompt that sets the task, the list of tools the model may call, the code that carries out those calls, the rules that allow or refuse them, and the bookkeeping that keeps the conversation going.

Claude Code is a harness. So are OpenCode, Codex CLI, and Goose, which Chapter 17 compares. They differ in their prompts and their tool sets, and they share one structure, which is the loop.

The harness is a separate piece of software from the model, and the distinction is the reason this evaluation can swap the model underneath. The harness stays the same, a different model answers its requests, and any difference in the result belongs to the model.

### Agent Loop and Agent Turn

The **agent loop** is the cycle at the harness's center. It sends the conversation to the model. If the reply contains a request to call a tool, the harness runs the tool, appends the result to the conversation, and sends the conversation to the model again. If the reply contains no tool call, the loop ends and the reply is the final answer.

An **agent turn** is one trip around that loop: one request to the model and one response, plus the tool call and result if there was one. A task that takes 55 tool calls takes at least 55 turns, and each is a full request to the model with everything so far.

```text
conversation = [system prompt, user request]
repeat:
    reply = model(conversation)
    if reply has no tool call:
        stop, the reply is the answer
    result = run the tool the reply names
    conversation += [reply, result]
```

Four things follow directly from that sketch, and each has a chapter behind it.

- **The conversation only grows.** Each turn appends a reply and a result, so the prompt of turn 40 contains everything in turns 1 to 39. This is why Chapter 15's prompt re-reading matters.
- **Every turn pays the model's latency.** Reading the prompt, writing the reply, and running the tool happen in sequence, once per turn.
- **A single bad reply can end the run.** If the model writes a tool call as plain text, the harness sees no tool call and the loop stops. Two of this evaluation's candidates failed exactly this way.
- **The model chooses the path.** The harness never says which tool comes next. A model that picks poorly wastes turns, and one that loses the task stops making progress.

!!! mascot-thinking "The Loop Is the Whole Idea"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    An agent is not a smarter model. It is an ordinary model inside a loop that feeds it the results of its own actions. The model's only job on each turn is to say what to do next, and the harness's job is to do it and report back, so most agent failures are failures to say it in the form the harness can run.

## Tools and Permissions

### System Prompt

The **system prompt** is the standing instruction that opens every conversation. In a harness it is long: it describes the task, the style, the rules, and the tools. It is resent at the start of every turn, and it is the same every time, which is what makes it cacheable.

Its size is a real cost for a local model. Claude Code's own instructions and tool definitions run to about 19,000 tokens, and they were written for Claude models. A local model that struggles in the harness may be struggling with that prompt and not with the task, which is one reason a model is tested alone first.

### Tool Definition

A **tool definition** is the description of one tool that the harness gives the model: its name, what it does, and the arguments it takes. The model never runs a tool. It writes a structured request that names a tool and supplies arguments, and the harness runs it.

The shape is the same across harnesses. This example defines a tool that reads a file. `name` is how the model refers to it. `description` tells the model when to use it. `input_schema` lists the arguments and their types, so that the harness can check a request before running it.

```json
{
  "name": "read_file",
  "description": "Read a text file and return its contents.",
  "input_schema": {
    "type": "object",
    "properties": { "path": { "type": "string" } },
    "required": ["path"]
  }
}
```

A model's tool-calling reliability, from Chapter 12, is how often it writes a request that matches a definition like this one. A request with a missing argument or a wrong name is a malformed tool call, and Chapter 22 diagnoses them.

### File Editing Tool and Shell Execution Tool

Two kinds of tool do most of the work in a skill. A **file editing tool** reads, creates, and changes files in the working directory, and it is how a model writes a chapter or a learning graph to disk. A **shell execution tool** runs a command in a terminal and returns its output, and it is how a model builds the site, runs a script, or checks a result.

Between them they let a model do nearly everything a person at a keyboard can. That power is the reason the next two concepts exist.

### Permission Model

The **permission model** is the set of rules that decide whether a tool call is allowed. A rule can allow a call, forbid it, or require a person to approve it first. A harness that runs interactively asks, and a person answers. A harness that runs unattended has nobody to ask, so an approval rule stalls the run.

This evaluation met that directly. The benchmark prompts carry a standing answer to the skill's approval questions, because no one is present during a run, and a paused run measures nothing. The harness also ran inside a container, so that the agent could run any command and could write only to its run directory. Chapter 18 builds that boundary. The first runs, with the harness on a laptop and no sandbox, allowed the agent no shell commands at all, and most skills need them.

!!! mascot-warning "An Unattended Run Cannot Answer a Question"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If a permission rule asks for approval and nobody is there, the run waits forever and produces nothing. Decide every approval in advance, either by allowing the call or by putting a standing answer in the prompt, and confirm with a short test run that nothing pauses.

## The Context

### Context Management and Peak Context Size

**Context management** is how a harness keeps the conversation within the model's window. The window is a fixed limit, and the conversation only grows, so sooner or later it has to be reduced. **Peak context size** is the largest the conversation reached in a run, and it is the figure that tells you whether a window was big enough.

Measurements in this evaluation show the range. One model's first prompt took 35,000 tokens where the others took 17,000 to 21,000, and within eight turns it was at 120,000, the edge of its window. Two others peaked at 135,000 and 147,000 tokens in a single stage. A window of 128,000 would have cut both off.

| Run | Peak context | Notes |
|---|---|---|
| `muse-glimmer:30b`, harness test | About 120,000 within eight turns | Its first prompt was already 35,000 tokens |
| `qwen3.6:35b`, stage 1 | 135,000 tokens | Second largest of any run |
| `nemotron-3.5-lightning:30b`, stage 1 | 147,000 tokens | 140 tool calls, nearly three times any other |

### Context Truncation and Context Compaction

When the conversation approaches the window, a harness has two ways to shrink it. **Context truncation** drops the oldest content, and it is crude: the beginning of the conversation, which holds the task, is exactly what disappears. **Context compaction** asks the model to summarize the earlier conversation into a short note and replaces the old content with it. Compaction keeps the thread and loses detail, and it costs a model call.

The two have a dangerous interaction with the server's window. Claude Code assumes a window of about 200,000 tokens. If the server was configured with a smaller one, the server truncates silently before the harness knows to compact, and the model loses the start of its own task without any message. This is why this evaluation raised the server's context setting to a large value, and why Chapter 11 warned that raising it has a memory cost.

### Turn Overhead

**Turn overhead** is the time in a turn that is not generating the reply: reading the new part of the prompt, running the tool, and the harness's own bookkeeping. Chapter 15 measured it. The cost analysis assumes 15 seconds per turn when caching works, and the one model whose server re-read the conversation each turn showed 90.

Overhead is easy to overlook because no single request looks slow. It is spread across hundreds of turns, and for the fast models in this evaluation it was longer than the generation itself.

## Dividing the Work

### Orchestrator, Subagent, and Role Separation

An **orchestrator** is an agent, or a person, that starts work and coordinates it without doing it. A **subagent** is an agent started by another to handle one part of a task in its own conversation, and it returns a summary, so its working detail never enters the parent's context. **Role separation** is keeping the roles of those agents distinct and recording who did what.

This evaluation has two roles that must not be confused. The orchestrator is a Claude Code session using a cloud model, running on the laptop, and its job is to start runs, watch them, and score the results. The harness is Claude Code inside a container with a local model, and its job is to generate. The rule that holds the evaluation together is that the orchestrator never writes benchmark content, because the question is whether a local model can.

The skills themselves can use subagents. The chapter-content skill has a parallel mode that starts one agent per group of chapters, at a stated token cost. The benchmark does not use it: each chapter is a separate harness run, so that each has its own timing and token counts.

| Role | Fills it | Where it runs | May write benchmark content? |
|---|---|---|---|
| Orchestrator | A Claude Code session on a cloud model | The laptop | No |
| Harness | Claude Code in a container | The DGX | Only by calling the local model |
| Model | An open-weight model behind the endpoint | The DGX GPU | Yes, all of it |

#### Diagram: Agent Loop Stepper


<iframe src="../../sims/agent-loop-stepper/main.html" width="100%" height="634px" scrolling="no"></iframe>
[Run Agent Loop Stepper Fullscreen](../../sims/agent-loop-stepper/main.html)

<details markdown="1">
<summary>Agent Loop Stepper</summary>
Type: microsim
**sim-id:** agent-loop-stepper<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ai-strategy-for-education/tree/main/docs/sims/ai-agent-anatomy<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain what the harness does after each of 6 model replies or tool results by choosing the outcome of each, with at least 5 of 6 correct.

**Prerequisites:** AI agent harness, agent loop, agent turn, tool definition, permission model, context compaction, context truncation (all defined in the sections above this block).

**Evidence of Mastery:** The learner first steps once through the five phases of one turn. The learner then answers 6 situations by choosing one of the six outcomes before any answer is revealed. A choice is correct when it equals the Correct outcome column. Mastery is 5 of 6 correct on the first attempt. Stepping through is exploration, not evidence.

**Misconceptions:** (1) The model runs its own tools. (2) A tool call written as text still runs. (3) The conversation is reset each turn. (4) A permission question is answered automatically.

**Instructional Rationale:** Explaining a mechanism needs the learner to predict its behavior in cases that differ in one detail, so each situation changes a single fact about the reply or the result, and the outcomes are the possible next states of the loop.

**Content:**

The five phases of one turn, shown as the learner steps through them:

1. The harness sends the whole conversation to the model.
2. The model writes a reply.
3. The harness checks the reply for a tool call.
4. If there is one, the harness checks the permission rules and runs the tool.
5. The harness appends the reply and the result to the conversation, and the loop starts again.

The six outcomes the learner chooses from: "The harness runs the tool, appends the result, and calls the model again", "The loop ends and the reply is returned", "The harness sees no tool call and the loop ends early", "The conversation grows by the size of the result", "The harness compacts or truncates earlier content", and "The run stalls waiting for an approval".

| # | Situation shown to the learner | Correct outcome | Why (shown as feedback) |
|---|---|---|---|
| 1 | The reply contains a well-formed request to read a file. | The harness runs the tool, appends the result, and calls the model again | A tool call is exactly what the loop acts on. |
| 2 | The reply is a finished answer with no tool call. | The loop ends and the reply is returned | With no tool call the loop has nothing to run. |
| 3 | The reply writes the tool call out as plain text inside its answer. | The harness sees no tool call and the loop ends early | Only a structured request is a tool call, so the text is treated as a final reply. |
| 4 | A shell command returns 8,000 tokens of output. | The conversation grows by the size of the result | The result is appended, so every later turn reads it. |
| 5 | The conversation is about to exceed the model's window. | The harness compacts or truncates earlier content | The conversation has to shrink to fit, by summary or by dropping the oldest content. |
| 6 | A permission rule requires approval for the tool and nobody is present. | The run stalls waiting for an approval | An unattended run cannot answer, so it waits. |

**Provenance:** The situations are synthetic, written for this exercise, and the sim labels them "synthetic example". The mechanism comes from the sections of this chapter above.

**Rules:** Situations are shown in the fixed order 1 to 6. Each allows one final choice, and exactly one outcome is correct for each situation.

**Learner Activity:**

1. The learner presses Next to move through the five phases of one turn, with the conversation shown growing at phase 5.
2. After phase 5 the learner begins the six situations and reads situation 1.
3. The learner chooses one of the six outcomes and confirms.
4. The sim shows the correct outcome and the Why text, and marks the situation correct or incorrect.
5. After situation 6 the sim shows the score and the misconception behind each miss.

**Feedback:** Six situations, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct outcome and the Why text. The final score reads "n of 6 correct".

**Starting State:** The loop is shown at phase 1 with a short conversation, and the question on screen is "What does the harness do with the model's reply?"

**Chapter Anchors:** The chapter states that a tool call written as plain text ends the loop, that a tool result is appended and read by every later turn, that an approval rule stalls an unattended run, and that a conversation near the window is compacted or truncated.
</details>

## Chapter Summary

A harness is a loop around a model: it sends the conversation, runs the tool the reply asks for, appends the result, and repeats until a reply has no tool call. Tool definitions tell the model what it may ask for, file and shell tools give it reach, and the permission model decides what is allowed, which for an unattended run must be settled in advance. The conversation only grows, so the harness must truncate or compact it, and a server window smaller than the harness assumes cuts it off silently. The orchestrator, the harness, and the model are three roles, and the evaluation depends on the first never doing the work of the third.

!!! mascot-celebration "You Can Trace One Turn"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now follow a turn through the loop, say which tool and permission rule applied, and find where its context and its time went. Chapter 17 loads the benchmark workload, the skills, into a harness connected to your local model.

[See Annotated References](./references.md)
