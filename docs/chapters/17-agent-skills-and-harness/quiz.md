# Quiz: Agent Skills and Connecting a Harness to a Local Model

Test your understanding of the skill format, the ibook-skills chain, connecting a harness to a local endpoint, and verifying that a skill runs with these review questions.

---

#### 1. What is an agent skill?

<div class="upper-alpha" markdown>
1. A folder of instructions that teaches a harness one kind of task
2. A new tool that adds a capability the harness lacked
3. A fine-tuned model that replaces the default model inside the harness
4. A log of the tool calls made during a finished run
</div>

??? question "Show Answer"
    The correct answer is **A**. An agent skill is a folder of instructions, and sometimes helper files, that teaches a harness how to carry out one kind of task well. It is a procedure written down so a model can follow it: the steps, the order, the checks, and the formats of the files to produce. A skill does not add a capability the harness lacks. It supplies knowledge of how to use the capabilities it has, which makes results repeatable.

    **Concept Tested:** Agent Skill

    **See:** [Agent Skill](index.md#agent-skill)

---

#### 2. Which steps of the ten-step `ibook-skills` chain does the benchmark run as its stages?

<div class="upper-alpha" markdown>
1. All ten, from the course description to the installer
2. Three: the learning graph, chapter structure, and chapter content
3. Two: the glossary and the chapter quizzes
4. Five: every step up to and including the MicroSims
</div>

??? question "Show Answer"
    The correct answer is **B**. The `ibook-skills` skill chain is the ordered set of ten skills that builds an intelligent textbook, each taking the previous one's output as its input. This benchmark runs three of the ten, steps 2 through 4: the learning graph, the chapter structure, and the chapter content. Step 1, the course-description analyzer, serves as a short check that the wiring works. MicroSims, the glossary, the FAQ, and the quizzes are outside the benchmark.

    **Concept Tested:** ibook-skills Skill Chain

    **See:** [ibook-skills Skill Chain](index.md#ibook-skills-skill-chain)

---

#### 3. Which two header fields of a `SKILL.md` file identify a skill and let a harness decide when it applies?

<div class="upper-alpha" markdown>
1. `name` and `description`
2. `license` and `metadata`
3. `scripts` and `assets`
4. `title` and `summary`
</div>

??? question "Show Answer"
    The correct answer is **A**. The `SKILL.md` format is a Markdown file that opens with a block of YAML metadata, followed by the procedure. Two fields do the work. The `name` is the identifier and matches the directory name. The `description` is the text the harness uses to decide when the skill is relevant, so it must say both what the skill does and when to use it. A skill with an unclear description is invisible, however good its body is.

    **Concept Tested:** SKILL.md Format

    **See:** [SKILL.md Format](index.md#skillmd-format)

---

#### 4. Why does a harness load skills in stages?

<div class="upper-alpha" markdown>
1. So each skill can be edited by the model between its loading stages
2. So the model can run scripts before reading the header
3. So skills from different harnesses do not overwrite each other
4. So context is not spent on instructions that are not needed
</div>

??? question "Show Answer"
    The correct answer is **D**. Skill loading works in stages so that context is not spent on instructions that are not needed. At startup the harness reads only each installed skill's name and description and places those short entries in the system prompt. It loads a skill's `SKILL.md` body when that skill is selected, and reference documents later still, one at a time, when a step names them. A harness with thirty skills cannot read thirty full procedures on every request.

    **Concept Tested:** Skill Loading

    **See:** [Skill Loading](index.md#skill-loading)

---

#### 5. Why are the skills mounted read-only inside the benchmark container?

<div class="upper-alpha" markdown>
1. So the skills load faster at the start of every turn
2. So a model cannot alter the test it is being measured against
3. So the container can start up without any access to the network
4. So the harness skips the skill descriptions at startup
</div>

??? question "Show Answer"
    The correct answer is **B**. Skill installation places the skill directories where the harness looks for them. Inside the benchmark container the skills are mounted read-only, marked by the `:ro` suffix, so the agent can read every skill and cannot change any of them. That matters for the comparison: a model that rewrote a skill to make its own task easier would be measuring itself against a different test than the other models faced.

    **Concept Tested:** Skill Installation

    **See:** [Skill Installation](index.md#skill-installation)

---

#### 6. Why was Claude Code chosen as the harness for this evaluation?

<div class="upper-alpha" markdown>
1. It has the lightest system prompt of the harnesses compared
2. It is the only harness that implements the skill format
3. It can reach Anthropic's service when a local model fails
4. The comparison books and the skills were made with it
</div>

??? question "Show Answer"
    The correct answer is **D**. Claude Code is Anthropic's command-line coding agent and the harness this evaluation uses. It was chosen for a practical reason: the published comparison books were generated with it and the skills were written for it, so using it makes the model the only thing that changes. Its prompt is not the lightest; OpenCode's is lighter. It is also given a placeholder credential, so it cannot reach Anthropic's service even if it tried.

    **Concept Tested:** Claude Code

    **See:** [Claude Code](index.md#claude-code)

---

#### 7. You are configuring Claude Code to use a model served by a local endpoint. Which settings point it at the local server without a real credential?

<div class="upper-alpha" markdown>
1. `ANTHROPIC_BASE_URL` to the local endpoint, with a placeholder token
2. `ANTHROPIC_API_KEY` to a real key, with the vendor's default base address
3. `API_TIMEOUT_MS` to zero, with the vendor's address unchanged
4. `ANTHROPIC_MODEL` to a cloud model name, with no base address
</div>

??? question "Show Answer"
    The correct answer is **A**. A local endpoint connection points the harness at your own server through environment variables. `ANTHROPIC_BASE_URL` is the address requests go to, here the local endpoint. `ANTHROPIC_AUTH_TOKEN` is a placeholder word, which is enough because the local server does not check it, and `ANTHROPIC_API_KEY` is left empty so no real key is used. The model variables are all set to the same local model's tag, so the harness never asks for a name that does not exist.

    **Concept Tested:** Local Endpoint Connection

    **See:** [Local Endpoint Connection and Harness Configuration](index.md#local-endpoint-connection-and-harness-configuration)

---

#### 8. A three-minute run of the course-description analyzer has finished. Which set of checks tells you the skill executed correctly?

<div class="upper-alpha" markdown>
1. The server answered, and the reply was not empty
2. The run log exists, and the run used fewer than 150 turns
3. Report written, score given, files updated, strict build passes
4. The model loaded on the GPU, and its speed was plausible
</div>

??? question "Show Answer"
    The correct answer is **C**. Skill execution verification confirms that a skill ran to completion and produced what it should. It tests the harness, the model, and the skill together. The short analyzer run passes when four things are true: the report was written, a quality score was given, the frontmatter and navigation were updated, and a strict `mkdocs build` finishes with no errors. An answering server and a plausible speed belong to the first-prompt smoke test, which tests only the server.

    **Concept Tested:** Skill Execution Verification

    **See:** [Skill Execution Verification](index.md#skill-execution-verification)

---

#### 9. You want a headless stage run that records every message, tool call, and result as a line of JSON. Which flags of the `claude` command do that?

<div class="upper-alpha" markdown>
1. `--max-turns 150` with `--model <model>`
2. `--dangerously-skip-permissions` by itself
3. `-p` with `--output-format stream-json --verbose`
4. `--verbose` with the prompt typed into an interactive session
</div>

??? question "Show Answer"
    The correct answer is **C**. Harness configuration is the environment variables plus the command-line flags. `-p` runs Claude Code non-interactively, and `--output-format stream-json --verbose` writes each message, tool call, and result as a line of JSON, which is the record later chapters analyze. `--max-turns` only caps the loop so a confused model cannot run forever, and `--dangerously-skip-permissions` removes approval prompts, which is acceptable only inside the sandbox.

    **Concept Tested:** Harness Configuration

    **See:** [Local Endpoint Connection and Harness Configuration](index.md#local-endpoint-connection-and-harness-configuration)

---

#### 10. A model passes the first-prompt smoke test and then fails the three-minute skill run by writing its tool call as plain text. What does this pattern show?

<div class="upper-alpha" markdown>
1. The smoke test was run with the wrong context length on the server
2. The skill's description did not say when to use it
3. The server lost the model between the two tests
4. The smoke test covers only the server, not harness tool use
</div>

??? question "Show Answer"
    The correct answer is **D**. A harness compatibility test runs the same short skill against several harness and model combinations to find which pairs work at all. The first-prompt smoke test checks only the server: that it answers and how fast. It does not exercise tool calls through the harness. In this evaluation the short skill run exposed a model that wrote its first tool call as plain text within minutes, a failure that a first-prompt smoke test would not have found.

    **Concept Tested:** Harness Compatibility Test

    **See:** [Harness Compatibility Test](index.md#harness-compatibility-test)
