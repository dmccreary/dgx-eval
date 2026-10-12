# Quiz: The Agent Loop, Tools, and Context

Test your understanding of the agent harness, the loop, tool definitions, permissions, context management, and role separation with these review questions.

---

#### 1. What does an AI agent harness supply that the model does not?

<div class="upper-alpha" markdown>
1. The language ability that produces each next message in turn
2. The trained weights that are loaded onto the GPU
3. The GPU memory that holds the conversation's cache
4. The tools, permission rules, and loop around the model
</div>

??? question "Show Answer"
    The correct answer is **D**. An AI agent harness is the program that wraps a language model so it can act in the world. The model supplies language: given a conversation, it produces the next message. The harness supplies everything else: the system prompt that sets the task, the list of tools, the code that carries out tool calls, the rules that allow or refuse them, and the bookkeeping that keeps the conversation going. Because it is separate software, the model underneath can be swapped.

    **Concept Tested:** AI Agent Harness

    **See:** [AI Agent Harness](index.md#ai-agent-harness)

---

#### 2. When does the agent loop end?

<div class="upper-alpha" markdown>
1. When the context window is completely full
2. When the harness has run a fixed number of turns
3. When a tool returns a result that has no errors
4. When the model's reply contains no tool call
</div>

??? question "Show Answer"
    The correct answer is **D**. The agent loop sends the conversation to the model. If the reply contains a request to call a tool, the harness runs the tool, appends the result, and sends the conversation again. If the reply contains no tool call, the loop ends and the reply is the final answer. That rule has a sharp edge: a model that writes a tool call as plain text ends the run early, because the harness sees no tool call.

    **Concept Tested:** Agent Loop

    **See:** [Agent Loop and Agent Turn](index.md#agent-loop-and-agent-turn)

---

#### 3. Why does the prompt for turn 40 of an agent session contain everything from turns 1 to 39?

<div class="upper-alpha" markdown>
1. Each turn appends its reply and tool result to the conversation
2. The model stores earlier turns in its parameters between requests
3. The server merges all open sessions into a single prompt
4. The harness resends only the system prompt on each turn
</div>

??? question "Show Answer"
    The correct answer is **A**. An agent turn is one trip around the loop: one request to the model and one response, plus the tool call and result if there was one. Each turn appends a reply and a result, so the conversation only grows, and the prompt of turn 40 contains everything in turns 1 to 39. The model keeps nothing between requests. Every turn is a full request with everything so far, which is why prompt caching matters so much.

    **Concept Tested:** Agent Turn

    **See:** [Agent Loop and Agent Turn](index.md#agent-loop-and-agent-turn)

---

#### 4. Why might a local model that struggles in the harness be struggling with the system prompt and not with the task?

<div class="upper-alpha" markdown>
1. The system prompt changes on every turn of the loop
2. It runs to about 19,000 tokens and was written for Claude models
3. The system prompt is sent only once, on the first turn
4. It is truncated by the harness before the model reads it
</div>

??? question "Show Answer"
    The correct answer is **B**. The system prompt is the standing instruction that opens every conversation. In a harness it is long, and it is resent at the start of every turn unchanged, which is what makes it cacheable. Claude Code's own instructions and tool definitions run to about 19,000 tokens, and they were written for Claude models. A local model may be struggling with that prompt and not with the task, which is one reason a model is tested alone first.

    **Concept Tested:** System Prompt

    **See:** [System Prompt](index.md#system-prompt)

---

#### 5. How does context compaction differ from context truncation?

<div class="upper-alpha" markdown>
1. Compaction drops the oldest content; truncation summarizes it
2. Compaction raises the server's window; truncation lowers it
3. Compaction summarizes earlier content; truncation drops the oldest
4. Compaction removes the tool definitions; truncation removes the replies
</div>

??? question "Show Answer"
    The correct answer is **C**. When a conversation approaches the window, a harness can shrink it in two ways. Context truncation drops the oldest content, which is crude: the beginning of the conversation, which holds the task, is exactly what disappears. Context compaction asks the model to summarize the earlier conversation into a short note and replaces the old content with it. Compaction keeps the thread and loses detail, and it costs a model call.

    **Concept Tested:** Context Compaction

    **See:** [Context Truncation and Context Compaction](index.md#context-truncation-and-context-compaction)

---

#### 6. You are preparing an unattended overnight run of a skill that asks approval questions. What must you do beforehand?

<div class="upper-alpha" markdown>
1. Leave the approval rules on and check how the run went in the morning
2. Settle every approval in advance and confirm with a short test
3. Remove the shell execution tool so nothing needs approval
4. Raise the context window so the questions fit in the prompt
</div>

??? question "Show Answer"
    The correct answer is **B**. The permission model is the set of rules that allow a tool call, forbid it, or require a person to approve it first. An unattended run has nobody to ask, so an approval rule stalls it and it produces nothing. Decide every approval in advance, either by allowing the call or by putting a standing answer in the prompt, and confirm with a short test run that nothing pauses. Removing the shell tool is no answer, because most skills need it.

    **Concept Tested:** Permission Model

    **See:** [Permission Model](index.md#permission-model)

---

#### 7. A tool definition for `read_file` lists `path` under `required` in its `input_schema`. A model emits a structured request to `read_file` with no `path`. What is this request?

<div class="upper-alpha" markdown>
1. A valid call, because the tool name matches the definition
2. A malformed call, because a required argument is missing
3. A final answer, because it contains no structured request
4. A permission error, because reading files needs approval
</div>

??? question "Show Answer"
    The correct answer is **B**. A tool definition gives the model a tool's name, a description of when to use it, and an `input_schema` listing the arguments and their types, so the harness can check a request before running it. The `read_file` definition marks `path` as required. A request with a missing argument or a wrong name is a malformed tool call. A matching name is not enough, and a structured request is not a final answer.

    **Concept Tested:** Tool Definition

    **See:** [Tool Definition](index.md#tool-definition)

---

#### 8. Two models peaked at 135,000 and 147,000 tokens of context in one stage. You plan to rerun that stage with a 128,000-token window. What should you expect?

<div class="upper-alpha" markdown>
1. Both runs would be cut off, since their peaks exceed the window
2. Both runs would fit, since peak context is measured in words
3. Both runs would fit, since only the first prompt must fit
4. The harness would enlarge the server's window as needed
</div>

??? question "Show Answer"
    The correct answer is **A**. Peak context size is the largest the conversation reached in a run, and it tells you whether a window was big enough. Context management must keep the conversation within the window, which is a fixed limit measured in tokens. Peaks of 135,000 and 147,000 tokens both exceed 128,000, so a window of that size would have cut both runs off. The harness cannot enlarge the server's window; that is a server setting with a memory cost.

    **Concept Tested:** Peak Context Size

    **See:** [Context Management and Peak Context Size](index.md#context-management-and-peak-context-size)

---

#### 9. Claude Code assumes a window of about 200,000 tokens, but the server is configured with a smaller one. What goes wrong?

<div class="upper-alpha" markdown>
1. The harness compacts too early and wastes model calls
2. The server rejects every request with an explicit error message
3. The model's tool definitions are dropped from each of its replies
4. The server truncates silently before the harness compacts
</div>

??? question "Show Answer"
    The correct answer is **D**. Truncation and compaction interact dangerously with the server's window. Claude Code assumes a window of about 200,000 tokens, so it does not compact until the conversation nears that size. If the server was configured with a smaller window, the server truncates silently before the harness knows to compact, and the model loses the start of its own task without any message. This is why the evaluation raised the server's context setting, at a memory cost.

    **Concept Tested:** Context Truncation

    **See:** [Context Truncation and Context Compaction](index.md#context-truncation-and-context-compaction)

---

#### 10. Why must the orchestrator in this evaluation never write benchmark content?

<div class="upper-alpha" markdown>
1. The orchestrator has no file editing tool available to it
2. The orchestrator runs inside the container on the DGX
3. It uses a cloud model, and the test is of a local one
4. It lacks the context window needed to hold a full chapter
</div>

??? question "Show Answer"
    The correct answer is **C**. An orchestrator starts work and coordinates it without doing it. In this evaluation it is a Claude Code session using a cloud model on the laptop, which starts runs, watches them, and scores results. The harness on the DGX generates, by calling the local model. Role separation keeps these distinct: the orchestrator never writes benchmark content, because the question is whether a local model can. Content written by the cloud model would answer a different question.

    **Concept Tested:** Orchestrator

    **See:** [Orchestrator, Subagent, and Role Separation](index.md#orchestrator-subagent-and-role-separation)
