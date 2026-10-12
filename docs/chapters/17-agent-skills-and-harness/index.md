---
title: "Agent Skills and Connecting a Harness to a Local Model"
description: "The skill format and the ibook-skills chain, then connecting Claude Code or an alternative harness to a local endpoint and verifying that a skill executes from start to finish."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:20:36"
version: 1.11
---

# Agent Skills and Connecting a Harness to a Local Model

## Summary

This chapter connects the harness to the local model and the benchmark workload. Students learn the skill format, skill loading and installation, and the ibook-skills chain, then configure Claude Code or an alternative against the local endpoint and verify that a skill runs. They finish with a harness that executes skills end to end.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Agent Skill | 74 |
| Claude Code | 38 |
| AGENTS.md File | 1 |
| OpenCode | 1 |
| Codex CLI | 1 |
| Goose | 1 |
| ibook-skills Skill Chain | 51 |
| SKILL.md Format | 21 |
| Local Endpoint Connection | 21 |
| Harness Prompt Overhead | 1 |
| Harness Configuration | 17 |
| Skill Loading | 10 |
| Skill Installation | 10 |
| Harness on Laptop | 1 |
| Skill Execution Verification | 9 |
| Harness Compatibility Test | 3 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../07-remote-access-ssh-mesh-vpn/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)
- [Chapter 16: The Agent Loop, Tools, and Context](../16-agent-loop-and-tools/index.md)

---

!!! mascot-welcome "Giving the Harness Something to Do"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The harness is only a loop until you hand it a skill, and the skill is the benchmark. By the end of this chapter you will have a harness pointed at your local model, a skill installed where it can find it, and a three-minute test that proves the whole chain runs. Measure first, then decide!

## What This Chapter Covers

Chapter 16 explained the loop and Chapter 13 supplied the endpoint. This chapter joins them to the workload. A skill is a packaged set of instructions that a harness can load on demand, and the `ibook-skills` collection is the set of skills that turns a course description into a textbook. Running them against a local model is the whole benchmark.

The chapter defines the skill format, shows how a harness finds and loads one, and lays out the chain this book uses. It then configures Claude Code to talk to the local endpoint, names the alternatives, and ends with the verification step that you should never skip: a short skill run whose result you can check, before you commit hours to a long one.

## Skills

### Agent Skill

An **agent skill** is a folder of instructions, and sometimes helper files, that teaches a harness how to carry out one kind of task well. It is a procedure written down so that a model can follow it: the steps, the order, the checks, and the formats of the files to produce. A skill does not add a capability the harness lacks. It supplies knowledge of how to use the capabilities it has.

The reason skills exist is that a model's general ability is not a procedure. A person who asks a model to "generate a learning graph" gets something plausible and unrepeatable. A skill pins down what a good learning graph is, how to build one, and how to check it, so that the same request gives a comparable result each time. That repeatability is what makes a skill usable as a benchmark.

A skill is a directory, and the layout is a convention that several harnesses share.

```text
learning-graph-generator/
├── SKILL.md              the instructions, with a header the harness reads first
├── references/           longer documents, read only when a step needs them
│   ├── taxonomy.md
│   └── quality-checks.md
├── scripts/              helper programs the instructions tell the model to run
│   └── analyze-graph.py
└── assets/               templates and files copied into the project
```

The file names under `references/`, `scripts/`, and `assets/` are illustrative. The table gives each part its job, because the loading mechanism in the next section depends on keeping them separate.

| Part | What it holds | When the harness reads it |
|---|---|---|
| `SKILL.md` header | Name and a one-paragraph description | At startup, for every installed skill |
| `SKILL.md` body | The step-by-step instructions | When the skill is invoked |
| `references/` | Long documents, standards, examples | Only when a step names them |
| `scripts/` | Programs the steps call | When a step runs them |
| `assets/` | Templates and fixed inputs | When a step copies them |

### SKILL.md Format

The **`SKILL.md` format** is a Markdown file that opens with a block of YAML metadata between two lines of three dashes. The block carries the fields a harness needs to decide whether the skill applies, and the Markdown below it carries the procedure. The header of a real skill from this project's chain, abbreviated, looks like this.

```yaml
---
name: chapter-content-generator
description: Generates detailed chapter content for an intelligent textbook,
  with text, diagrams, MicroSims, and exercises at the appropriate Bloom's
  level. Use when a chapter's index.md exists with title, summary, and
  concept list.
license: Creative Commons Attribution-NonCommercial 4.0 International
metadata:
  ibook.version: "1.11"
---
```

Two fields do the work. The `name` is the identifier, and it matches the directory name. The `description` is the text the harness uses to decide when the skill is relevant, so it must say both what the skill does and when to use it. A description that says only what the skill does gives the harness no way to tell when it applies.

!!! mascot-thinking "The Description Is How a Skill Gets Chosen"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A harness with thirty skills installed cannot read thirty full procedures on every request. It reads thirty one-paragraph descriptions and loads the one that fits. A skill with an unclear description is invisible, however good its body is, so the description is the part to write most carefully.

### Skill Loading

**Skill loading** is how a harness brings a skill into the conversation. It works in stages so that the context is not spent on instructions that are not needed. At startup the harness reads only the name and description of each installed skill and places those short entries in the system prompt. When the model, or the user's request, selects a skill, the harness loads that skill's `SKILL.md` body. The reference documents load later still, one at a time, when a step names them.

The staging has a consequence for a local model. A skill whose body runs past a thousand lines, with reference documents beside it, asks the model to find the right file at the right step. A model that does not look when it should will proceed without the reference and produce something that ignores a rule the reference stated. That is a failure of skill following, and it is one of the two abilities this benchmark tests.

### Skill Installation

**Skill installation** is placing the skill directories where the harness looks for them. For Claude Code that is a `skills` directory under its configuration folder in the home directory. This evaluation's skills live in one repository and are linked there, so that updating the repository updates every harness.

Inside the benchmark container the skills are mounted read-only. The agent can read every skill and cannot change any of them, which matters for the comparison: a model that rewrote a skill to make its own task easier would be measuring itself against a different test.

```text
-v <skills-repo>/skills:/home/agent/.claude/skills:ro
```

The `:ro` suffix marks the mount read-only.

## The ibook-skills Chain

### ibook-skills Skill Chain

The **`ibook-skills` skill chain** is the ordered set of skills that builds an intelligent textbook. Each skill takes the previous one's output as its input, so the order is part of the design. The full chain has ten steps.

| Step | Skill | What it produces |
|---|---|---|
| 1 | `course-description-analyzer` | A validated course description, scored for completeness |
| 2 | `learning-graph-generator` | The concept list and dependency graph |
| 3 | `book-chapter-generator` | The chapter structure, one outline per chapter |
| 4 | `chapter-content-generator` | The text of each chapter |
| 5 | `microsim-generator` | The interactive simulations |
| 6 | `glossary-generator` | Definitions of the concepts |
| 7 | `faq-generator` | Frequently asked questions |
| 8 | `quiz-generator` | Chapter quizzes |
| 9 | `reference-generator` | Citations for each chapter |
| 10 | `book-installer` | Site features such as the mascot and graph viewer |

This benchmark runs three of the ten, steps 2 through 4, and uses step 1 as a short check that the wiring works. MicroSims, the glossary, the FAQ, and the quizzes are outside the benchmark. The worked example is the first stage's prompt, which is what a person would type to start the skill, plus a standing answer to its approval questions.

```text
Run the learning-graph-generator skill on this project. The course
description is at docs/course-description.md. Generate 200 concepts.

I am not available to answer questions or to review intermediate results.
Whenever the skill tells you to ask me something, or to wait for my review
or approval, treat it as approved and continue. Work through every step of
the skill, and stop when the skill is complete. Do not start the next skill.
```

The second paragraph is the standing approval answer that Chapter 16's permission section called for. Without it, a skill that stops to ask "does this look right?" would wait forever in an unattended run.

## Connecting the Harness

### Claude Code

**Claude Code** is Anthropic's command-line coding agent, and it is the harness this evaluation uses. It was chosen for a practical reason: the published comparison books were generated with it and the skills were written for it, so using it makes the model the only thing that changes. It runs interactively for a person and headlessly for a script, and the headless form is the one a benchmark needs.

It is worth being exact about what Claude Code is doing here. It is the agent loop and nothing more. Every token of the textbook comes from the local model behind the endpoint, and the harness is given a placeholder credential so that it cannot reach Anthropic's service even if it tried.

### Local Endpoint Connection and Harness Configuration

A **local endpoint connection** points the harness at your own server instead of the vendor's. It is done with environment variables, and the set below is the one this project's runner uses. Each variable is explained before the table puts them together.

`ANTHROPIC_BASE_URL` is the address the harness sends requests to, which here is the Ollama endpoint on the same machine. `ANTHROPIC_AUTH_TOKEN` is the credential the harness presents, and a placeholder word is enough because the local server does not check it. `ANTHROPIC_API_KEY` is left empty. The several `...MODEL` variables tell the harness which model to use in each role, and setting all of them to the same local model prevents it from asking for a name that does not exist.

| Variable | Value | Purpose |
|---|---|---|
| `ANTHROPIC_BASE_URL` | `http://127.0.0.1:11434` | Send requests to the local server |
| `ANTHROPIC_AUTH_TOKEN` | A placeholder word | Satisfy the harness without a real credential |
| `ANTHROPIC_API_KEY` | Empty | Make sure no real key is used |
| `ANTHROPIC_MODEL` and the `DEFAULT_*_MODEL` variables | The local model's tag | Use the same model in every role |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | `1` | Turn off the harness's optional network features |
| `API_TIMEOUT_MS` | A large value | Allow a slow model a long time per request |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | `32000` | Allow long replies without cutting them off |

**Harness configuration** is the whole of those choices plus the command-line flags. The command that runs one stage reads the prompt from a file and writes every event to a log. `-p` runs it non-interactively, and `--output-format stream-json --verbose` writes each message, tool call, and result as a line of JSON, which is the record the later chapters analyze. `--max-turns` caps the loop so a confused model cannot run forever.

```bash
claude -p --model <model> \
  --output-format stream-json --verbose \
  --max-turns 150 --dangerously-skip-permissions \
  < prompt.txt > run.jsonl
```

!!! mascot-warning "That Last Flag Is Safe Only Inside the Sandbox"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    `--dangerously-skip-permissions` lets the agent run any command without asking, which an unattended run requires. It is acceptable here only because the container limits what the agent can touch to its own run directory. Never use it on a machine where the agent can reach files you care about, and Chapter 18 builds the boundary.

### Harness Prompt Overhead

**Harness prompt overhead** is the number of tokens the harness's own instructions and tool definitions take before your task begins. For Claude Code it is about 19,000 tokens, and it was written for Claude models. Every turn carries it, and a local model's window and speed pay for it. In this evaluation the prompts of the models in the harness started at 17,000 to 21,000 tokens, and one model's started at 35,000, which was an early sign that it would run out of window.

### Harness on Laptop

**Harness on laptop** is the arrangement in which the harness runs on the machine you sit at and reaches the model on the DGX through an SSH port forward. It was this evaluation's first arrangement, and it is the quickest way to try a model, because nothing is installed on the DGX but the server. It has two drawbacks. Prompts and tokens cross the network on every turn, and the harness has no sandbox, so it was allowed no shell commands, which most skills need. The later runs moved the harness into a container on the DGX, so that a run kept going with the laptop disconnected.

### Alternatives: OpenCode, Codex CLI, and Goose

Claude Code is not the only harness, and the skill format is shared enough that others can run the same skills. **OpenCode** is an open-source harness with a lighter prompt, and it is a good second harness for telling a model failure from a harness mismatch. **Codex CLI** is OpenAI's command-line agent, and **Goose** is an open-source agent from a different publisher. Both implement the same skill format.

| Harness | Publisher | Why consider it | Why this evaluation did not use it |
|---|---|---|---|
| Claude Code | Anthropic | The comparison books and skills were made with it | Chosen |
| OpenCode | Open source | Lighter prompt | A good second pass, not yet run |
| Codex CLI | OpenAI | Implements the skill format | Did not match how the comparison books were made |
| Goose | Open source | Implements the skill format | Did not match how the comparison books were made |

### AGENTS.md File

An **`AGENTS.md` file** is a plain Markdown file at the root of a project that gives any coding agent the project's standing instructions: how to build, which rules to follow, where things live. It is the cross-harness counterpart of a harness-specific instruction file, and this book uses one. Its `CLAUDE.md` contains only a pointer to it, so that Claude Code, Codex, and any other agent that looks for `AGENTS.md` read the same rules.

## Verifying That It Works

### Skill Execution Verification

**Skill execution verification** is confirming that a skill ran to completion and produced what it should. It is a separate check from the first-prompt smoke test of Chapter 13, which tested only the server. This one tests the harness, the model, and the skill together.

The check this project uses is a short skill run of about three minutes, the course-description analyzer, whose output can be inspected quickly. It passes when four things are true.

- **The report was written.** The skill's output file exists.
- **A score was given.** The report contains the quality score the skill is meant to assign.
- **The project files were updated.** The frontmatter and the site navigation reflect the skill's work.
- **The site builds.** A strict `mkdocs build` finishes with no errors.

A script, `score_analyzer_runs.py`, applies exactly these checks, so the verdict does not depend on someone reading the output.

### Harness Compatibility Test

A **harness compatibility test** runs the same short skill against several harness and model combinations, to find which pairs work at all before spending hours on any of them. Failures at this stage are cheap and informative. In this evaluation it showed a model that wrote its first tool call as plain text, and a model that lost the task after a few turns, both within minutes, and neither would have been found by a first-prompt smoke test.

!!! mascot-tip "Run the Three-Minute Test Before the Three-Hour One"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A model that fails the short skill will fail the long one more slowly. Put the analyzer run, with its scripted checks, in front of every model you intend to benchmark, and discard the ones that fail for reasons you can name.

#### Diagram: SKILL.md Anatomy


<iframe src="../../sims/skill-md-anatomy/main.html" width="100%" height="730px" scrolling="no"></iframe>
[Run SKILL.md Anatomy Fullscreen](../../sims/skill-md-anatomy/main.html)

<details markdown="1">
<summary>SKILL.md Anatomy</summary>
Type: infographic
**sim-id:** skill-md-anatomy<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ibook-skills/tree/main/docs/sims/skill-file-anatomy-diagram<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify the part of a skill that answers each of 6 questions about how a harness uses it, with at least 5 of 6 correct.

**Prerequisites:** agent skill, SKILL.md format, skill loading, skill installation (all defined in the sections above this block).

**Evidence of Mastery:** The sim shows an annotated skill folder with six labeled regions. For each of 6 questions the learner selects one region before the sim reveals the answer. A selection is correct when it equals the Correct region column. Mastery is 5 of 6 correct on the first attempt. Hovering over a region to read its label is exploration, not evidence.

**Misconceptions:** (1) The harness reads every file in a skill at startup. (2) The body of `SKILL.md` is how a skill is chosen. (3) Reference documents are loaded with the instructions. (4) A skill's scripts run by themselves.

**Instructional Rationale:** Identifying a part at the Remember level needs a labeled structure and questions that name a function, so that the learner links each function to its place. The questions are phrased by what the harness does, which is the behavior the chapter taught.

**Content:**

The six regions of the annotated skill folder: "name field", "description field", "metadata field", "instruction body", "references folder", and "scripts folder".

| # | Question shown to the learner | Correct region | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which part is the skill's identifier, matching the directory name? | name field | The name identifies the skill to the harness. |
| 2 | Which part does the harness read at startup to decide whether the skill applies? | description field | Only the name and description of each skill are loaded at startup. |
| 3 | Which part holds the step-by-step procedure, loaded when the skill is invoked? | instruction body | The body is loaded on selection, not at startup. |
| 4 | Which part holds long documents that are read only when a step names them? | references folder | References are loaded last, one at a time. |
| 5 | Which part holds helper programs that a step tells the model to run? | scripts folder | Scripts are run by a step, and they do not run on their own. |
| 6 | Which part records the skill's version? | metadata field | The version is carried in the metadata block of the header. |

**Provenance:** The annotated folder and the questions are synthetic, written for this exercise, and the sim labels them "synthetic example". The meanings of the parts come from the sections of this chapter above.

**Rules:** Questions are shown in the fixed order 1 to 6. Each allows one final choice among the six regions, and exactly one region is correct for each question. A region may be the answer to only one question.

**Learner Activity:**

1. The learner hovers over the regions of the annotated folder to read their labels.
2. The learner reads question 1 and selects a region, then confirms.
3. The sim shows the correct region and the Why text, and marks the question correct or incorrect.
4. The learner repeats for questions 2 to 6. After question 6 the sim shows the score and the misconception behind each miss.

**Feedback:** Six questions, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct region and the Why text. The final score reads "n of 6 correct".

**Starting State:** The annotated folder is shown with no region selected, and the instruction on screen is "Hover over a region to read its label".

**Chapter Anchors:** The chapter states that a harness reads only each skill's name and description at startup, loads the body when the skill is selected, and loads references only when a step names them, and that scripts run only when a step runs them.
</details>

## Chapter Summary

A skill is a folder whose `SKILL.md` header lets a harness choose it and whose body, references, and scripts supply the procedure in stages. The `ibook-skills` chain has ten steps, and the benchmark runs three of them, with a fourth used as a short wiring check. Claude Code connects to the local endpoint through environment variables that set its address, a placeholder credential, and the model in every role, and its headless flags write a full event log. Alternative harnesses read the same skills, and an `AGENTS.md` file gives all of them the project's rules. Skill execution verification applies four scripted checks to a three-minute run, and a harness compatibility test applies it across combinations, so that a failure costs minutes and not hours.

!!! mascot-celebration "The Harness Runs a Skill End to End"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now install a skill, point a harness at your own endpoint with a placeholder credential, and prove with a scripted three-minute run that the chain works. Chapter 18 builds the container and the boundaries that keep that run from reaching anything it should not.

[See Annotated References](./references.md)
