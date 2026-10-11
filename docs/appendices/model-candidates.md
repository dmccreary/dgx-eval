---
title: 'Model Candidates: Ten Models to Test for Textbook Generation'
description: 'The ten open-weight language models worth testing for generating intelligent textbooks on a 128 GB DGX, with the parameter count and main strength of each, and the reasons to evaluate it.'
---

# Model Candidates

These are the ten open-weight models most worth testing for textbook
generation on this hardware: one DGX unit with 128 GB of unified memory. They
are listed in the order they were chosen for evaluation, before any results.

| Model | Parameters | Main strength |
|---|---|---|
| `qwen3.8:27b` | 27 billion | Built for long agent tasks; produced the cleanest learning graph, and took the longest |
| `gemma4:31b` | 30.7 billion, dense | The most consistent rule-follower in the tests run so far |
| `muse-glimmer:30b` | 30 billion | Top instruction-following and tool-use scores in its publisher's own comparison |
| `qwen3.6:35b` | 35 billion, about 3 billion active | Agentic coding at mixture-of-experts speed, with reasoning carried across turns |
| `gemma4:26b` | 25.2 billion, 3.8 billion active | The fastest model tested, three times quicker than its dense sibling |
| `nemotron-3.5-lightning:30b` | 30 billion, 3 billion active | Designed for always-on agents, with a one-million-token context window |
| `mistral-medium-3.5:128b` | 128 billion, dense | The largest dense model that fits, promoted for instruction and system-prompt adherence |
| `gpt-oss:120b` | 117 billion, 5.1 billion active | The largest model that still runs fast on one unit |
| `devstral-small-2:24b` | 24 billion | A coding-agent model with a 384,000-token window in the smallest download |
| `granite4.2:30b` | about 30 billion, dense | Structured output and tool calling under a plain Apache 2.0 license |

The benchmark tests two abilities above all others. The first is following a
detailed skill: a `SKILL.md` file that can run past a thousand lines, with
reference documents, templates, and scripts beside it that the model must find
and use at the right step. The second is tool calling: reading files, writing
files, and running commands through the harness, correctly, dozens of times in
one session.

The order was set before testing: the four models with early results first,
then the models whose publishers make claims closest to those two abilities.
All ten have since been through a first round on one unit, and each section
ends with what happened. A first round is one run of each test, so every
result here is provisional. Claims attributed to a publisher come from that
publisher's own page as of October 2026 and have not been checked.

## 1. `qwen3.8:27b`

This model produced the cleanest result of the first benchmark stage, the
learning graph for Algebra I. Its graph had exactly 200 concepts and 299
dependencies with no cycles and no duplicate labels, every expected file was
present, the JSON matched the CSV, and the resulting site passed a strict
build. It made 55 tool calls and one failed.

Its publisher describes it as improved for long-running agent work, planning,
and handling feedback from tools, which is a description of running a skill.
In the model-only tests it followed every formatting rule.

The reason to keep evaluating it is its cost in time. That stage took 102
minutes, where the five other models that finished took between 6 and 22. The server re-read almost the whole conversation on every turn, and
one turn ran for nineteen minutes, nearly all of it reasoning. Both need
investigating before the longer stages.

**Download:** 17 GB. **Context window:** 256,000 tokens. **License:** reported
as Apache 2.0, not yet verified. **Status:** tested through stage 1.

## 2. `gemma4:31b`

No other model has been as consistent. It passed every rule in the model-only
tests, twice, and every one of its four analyzer smoke runs ended with a
correct result and a site that builds. It is a dense model, so every parameter takes
part in every token, and it still generated 28 to 40 tokens per second.

Its publisher gives it built-in function calling and a 256,000-token window.
In one published comparison it scored within a point of the leader on an
instruction-following benchmark.

Its first attempt at the learning graph was lost when a machine froze, at a
context setting that is now treated as unsafe. The second attempt, at a
smaller context, finished in 21 minutes with a 200-concept graph, no cycles,
and no duplicate labels. It left out two things the skill asks for: the
concept taxonomy page and the navigation entries. Eight of its 50 tool calls
failed.

**Download:** 20 GB. **Context window:** 256,000 tokens. **License:** Apache
2.0. **Status:** tested through stage 1.

## 3. `muse-glimmer:30b`

This model is aimed at exactly what the benchmark measures. Its publisher,
Meta, describes it as built for local agents that run unattended, and stresses
recovery: a model that diagnoses a failed step and retries instead of
stopping. A long skill run with nobody watching needs that.

Meta's published comparison puts it first among three similar-sized models on
an instruction-following benchmark and on a tool-use benchmark, and first on a
long-context test at 128,000 tokens. The same table shows it behind
`qwen3.6:27b` on several coding benchmarks, so the claim is specific to
following instructions and using tools.

It also accepts images, which matters for reviewing MicroSim screenshots.

**First-round result.** It did not complete either harness test. After a few
steps it lost the task and answered with a greeting. The cause looks like
context: its first prompt took 35,000 tokens where the other models took
17,000 to 21,000, and within eight turns it was at 120,000, the edge of its
window. In the model-only test it ran at 13 tokens per second and returned
invalid JSON on the structured-output task.

**Download:** 18 GB. **Context window:** 128,000 tokens. **License:** Apache
2.0. **Status:** tested; failed in the harness.

## 4. `qwen3.6:35b`

This is the release before `qwen3.8`, in a larger mixture-of-experts form. A
mixture-of-experts model uses only a few billion parameters for each token, and
on this hardware that was worth a threefold speed gain in the one direct
comparison made so far.

Its publisher highlights agentic coding and a new option to keep reasoning
from earlier turns, which should help on a skill with many steps. If
`qwen3.8:27b` stays slow, this model is the natural test of whether the same
family can do the work faster.

The parameter split is taken from a chart name on its page and is not stated
in the text.

**First-round result.** It was the best combination of speed and correctness.
It ran at 83 to 105 tokens per second, passed the analyzer smoke test in 65
seconds, and finished the learning graph in 22 minutes with every file
present, the navigation updated, and a site that builds. The graph is looser
than the one from `qwen3.8:27b`: 19 concepts have no prerequisite, where that
model had 2, and five labels run past the length limit. Its conversation
peaked at 135,000 tokens, the second largest of any run.

**Download:** 22 GB. **Context window:** 256,000 tokens. **License:** not
stated on its page. **Status:** tested through stage 1.

## 5. `gemma4:26b`

This is the fastest model tested: 86 to 130 tokens per second, and it read a
30,000-token prompt in ten seconds. It finished the skill smoke test in about a
minute, where others took three to eleven.

It was set aside for two reasons, and one of them no longer holds. Its skill
runs produced a navigation file that would not build, but that error was
copied from a faulty example in the skill, which has since been corrected.
The other reason stands: in the model-only tests it twice broke two rules,
omitting the blank line before a list and writing a p5.js call that fails when
run.

Retested against the corrected skill, it passed the analyzer smoke test in 57
seconds, and it finished the learning graph in under six minutes. That graph
has a serious flaw: 40 of its 200 concept labels are duplicates. It also left
out the index page and the navigation entries. A model this fast can afford a
second attempt at a step, but something has to notice that one is needed.

**Download:** 18 GB. **Context window:** 256,000 tokens. **License:** Apache
2.0. **Status:** tested through stage 1.

## 6. `nemotron-3.5-lightning:30b`

This model comes from NVIDIA, which also makes the hardware. Its publisher
describes it as the execution layer for always-on agents and claims four times
the throughput of comparable open models. With 3 billion active parameters,
high speed on this machine is plausible.

Its context window is one million tokens on the main download. A skill with
many reference files can use a long window, though on unified memory a long
context competes directly with everything else.

It accepts text only, so it cannot review screenshots. Its page states no
license.

**First-round result.** It was as fast as claimed, at 84 to 105 tokens per
second, and it finished the learning graph in 18 minutes. It got there the
long way: 140 tool calls, nearly three times as many as any other model, and
a conversation that peaked at 147,000 tokens. The graph has 199 concepts, one
short of the 200 asked for, and the navigation was not updated. In the
model-only test it broke four formatting rules, and its analyzer report left
out the score in the frontmatter.

**Download:** 25 GB. **Context window:** 1,000,000 tokens. **License:** not
stated on its page. **Status:** tested through stage 1.

## 7. `mistral-medium-3.5:128b`

This is the test of whether size helps. It is a dense model more than four
times larger than `gemma4:31b`, and its publisher names instruction following
and system-prompt adherence as headline strengths. A harness works by giving
the model a long system prompt, so that claim bears directly on the benchmark.
It also supports function calling, JSON output, and image input.

Expect it to be slow. A dense model reads all of its weights for every token,
and this one is 80 GB. It also leaves little room: after the weights, less
than 50 GB remain for the context and the system, which probably rules out
the largest context settings.

Its license allows commercial use with exceptions for companies with large
revenue, which should be read before relying on it.

**First-round result.** It loaded and ran, at 3 tokens per second. It used
88 GiB of memory at a 32,000-token context, so no context of 64,000 tokens or
more would fit, and the harness tests were not run. On one unit of this
hardware it is not a usable choice.

**Download:** 80 GB. **Context window:** 256,000 tokens. **License:** modified
MIT. **Status:** tested; not usable on one unit.

## 8. `gpt-oss:120b`

This is the largest model that still ran at a usable speed: 38 to 44 tokens
per second from 117 billion parameters, because only about 5 billion are
active for each token. Its publisher released it with function calling,
structured output, and adjustable reasoning effort.

Its results here were mixed, and that is the reason to test it further. In
one of two skill runs it printed a tool call as plain text and stopped after a
single turn. In the model-only tests it twice returned the wrong value from a
24,000-token prompt. A model that misreads a long prompt is a poor fit for
long skills, but two runs are not enough to settle it.

It used 69 GB of memory at a modest context, which leaves less room than the
smaller models have.

**First-round result.** It finished the learning graph in 17 minutes, and all
28 of its tool calls succeeded. Every file was present and the navigation was
updated. The graph itself is thin: 180 dependencies for 200 concepts, with 19
concepts connected to nothing. In the analyzer smoke test it wrote its
navigation entries into the wrong part of the site configuration, and the
site no longer built. It also returned the wrong value from the long prompt
for a third time.

**Download:** 65 GB. **Context window:** 128,000 tokens. **License:** Apache
2.0. **Status:** tested through stage 1.

## 9. `devstral-small-2:24b`

This model was built to drive software-engineering agents: exploring a set of
files, editing several of them, and calling tools along the way. A skill run
is the same kind of work, with Markdown where the code would be.

It has a 384,000-token context window, the second largest on the list, in the
smallest download. Its publisher reports 65.8% on a widely used
software-engineering benchmark.

The open question is prose. Nothing on its page speaks to long-form writing,
and a textbook is mostly prose. It is most likely to earn a place on the code
that MicroSims need.

**First-round result.** It did no work in either harness test. Both times it
wrote its first tool call as plain text, the harness saw no tool call, and
the run ended after one turn. In the model-only test it ran at 15 tokens per
second and worked the example at the wrong precision.

**Download:** 15 GB. **Context window:** 384,000 tokens. **License:** Apache
2.0. **Status:** tested; failed in the harness.

## 10. `granite4.2:30b`

This model is the conservative choice. Its publisher, IBM, lists tool calling,
general instruction following, structured JSON output, and reasoning that can
be switched on or off for each request. The learning-graph stage depends on
exact structured output, and the benchmark has already shown how much time
uncontrolled reasoning can cost.

Its license is Apache 2.0 with no added conditions, and its page describes
governance and compliance checks on its training data. For a reader who must
justify a model choice to an employer, those points can matter more than a
benchmark score.

Its page gives no benchmark results, and its context window is among the
smallest here.

**First-round result.** It was too slow to finish. It ran at 12 tokens per
second, took eleven minutes over the analyzer smoke test, and was stopped at
the 150-minute limit on the learning graph, having reached only the concept
list. Its analyzer report was written, but the navigation was not updated.

**Download:** 17 GB. **Context window:** 128,000 tokens. **License:** Apache
2.0. **Status:** tested; too slow to finish.

## First-Round Results

Each model attempted the first benchmark stage once: generating the Algebra I
learning graph, with a 150-minute limit.

| Model | Time | Concepts | Dependencies | What was wrong |
|---|---|---|---|---|
| `qwen3.8:27b` | 102 min | 200 | 299 | Nothing structural |
| `qwen3.6:35b` | 22 min | 200 | 273 | 19 concepts with no prerequisite, 1 duplicate label |
| `gemma4:31b` | 21 min | 200 | 348 | Taxonomy page missing, navigation not updated |
| `nemotron-3.5-lightning:30b` | 18 min | 199 | 494 | One concept short, navigation not updated |
| `gemma4:26b` | 6 min | 200 | 483 | 40 duplicate labels, index page missing, navigation not updated |
| `gpt-oss:120b` | 17 min | 200 | 180 | 19 concepts connected to nothing |
| `granite4.2:30b` | Stopped at 150 min | none | none | Reached only the concept list |
| `muse-glimmer:30b` | 6 min | none | none | Lost the task after a few steps |
| `devstral-small-2:24b` | Under 1 min | none | none | Tool call written as text |
| `mistral-medium-3.5:128b` | Not run | none | none | No usable context fits in memory |

Every graph that was produced had no cycles, and its JSON file matched its
CSV. These checks cover structure only. Whether the concepts are the right
ones for Algebra I, and whether the dependencies make sense, has not been
judged.

## Other Qualities That Matter for a Textbook

Following a skill and calling tools decide whether a run finishes. These
qualities decide whether the result is worth reading.

- **Long-form writing at a set reading level.** A course description names its
  audience. Chapters for grade 9 and chapters for engineers need different
  sentences, and a model has to hold that level across tens of thousands of
  words.
- **Faithfulness to the course description.** The description lists what the
  course covers and what it excludes. A model that drifts outside those limits
  produces a different book.
- **Dependency reasoning.** A learning graph orders 200 concepts so that each
  comes after the ones it depends on. That is a reasoning task, and an error
  in it carries into every chapter.
- **Exact structured output.** The pipeline passes CSV, JSON, and YAML between
  stages. One malformed file stops the next stage.
- **Markdown that builds.** A missing blank line before a list, or a wrong
  indent in a navigation file, breaks the site. Most of the failed skill runs
  in this evaluation failed this way.
- **Code that runs.** MicroSims are JavaScript programs. Code that looks right
  and fails in the browser is worse than no simulation.
- **Mathematical notation.** A mathematics or science book needs correct
  formulas in the notation the site renders.
- **Vision.** Checking a MicroSim's layout means looking at a screenshot. Only
  models that accept images can do that step.
- **Speed in a long session.** Generation speed is half the story. A harness
  resends a growing conversation on every turn, so the speed of reading a
  prompt, and whether the server reuses what it has already read, can dominate.
- **Memory left for context.** On unified memory, a long context takes memory
  from the same pool as the weights. A smaller model with a long context can
  need more memory than a larger model with a short one.
- **Control over reasoning.** Reasoning can improve a hard step and waste
  minutes on an easy one. A model whose reasoning can be limited is easier to
  budget.
- **Repeatability.** Two runs of the same stage should give comparable
  results. Scores that differ from run to run make a model hard to depend on.
- **License.** A recommendation is only useful if readers are allowed to
  follow it, and if they can publish what the model writes.

## Models Left Off the List

- **`laguna-s-2.1`** has 118 billion parameters and a strong published score
  on a terminal-agent benchmark. Its page gives two different download sizes,
  75 GB and 96 GB, and at the larger one there is too little memory left for a
  long context.
- **`qwen3.5:122b`** is the largest Qwen model that fits. It is older than
  `qwen3.8`, and `gpt-oss:120b` already covers the large mixture-of-experts
  tier.
- **`qwen3-coder:30b`** was a strong coding-agent model with a 256,000-token
  window. It is about a year old, and newer Qwen releases have replaced it.
- **`nemotron3:33b`** is aimed at understanding video, audio, and documents,
  which this benchmark does not use.
- **Models that need more than one unit**, and models offered only as a cloud
  service, are outside what this evaluation tests.

## Sources

The claims about untested models come from these pages, read in October 2026.

- [qwen3.8](https://ollama.com/library/qwen3.8), [qwen3.6](https://ollama.com/library/qwen3.6), [qwen3.5](https://ollama.com/library/qwen3.5), and [qwen3-coder](https://ollama.com/library/qwen3-coder) in the Ollama library
- [gemma4](https://ollama.com/library/gemma4) in the Ollama library
- [muse-glimmer](https://ollama.com/library/muse-glimmer) in the Ollama library, including its publisher's benchmark comparison
- [nemotron-3.5-lightning](https://ollama.com/library/nemotron-3.5-lightning) and [nemotron3](https://ollama.com/library/nemotron3) in the Ollama library
- [mistral-medium-3.5](https://ollama.com/library/mistral-medium-3.5) in the Ollama library
- [gpt-oss](https://ollama.com/library/gpt-oss) in the Ollama library, and the [gpt-oss-120b model card](https://huggingface.co/openai/gpt-oss-120b)
- [devstral-small-2](https://ollama.com/library/devstral-small-2) in the Ollama library
- [granite4.2](https://ollama.com/library/granite4.2) in the Ollama library
- [laguna-s-2.1](https://ollama.com/library/laguna-s-2.1) in the Ollama library
