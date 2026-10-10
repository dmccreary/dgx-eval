---
title: 'Model Candidates: Ten Models to Test for Textbook Generation'
description: 'The ten open-weight language models worth testing for generating intelligent textbooks on a 128 GB DGX, with the parameter count and main strength of each, and the reasons to evaluate it.'
---

# Model Candidates

These are the ten open-weight models most worth testing for textbook
generation on this hardware: one DGX unit with 128 GB of unified memory. They
are listed in the order they should be evaluated.

| Model | Parameters | Main strength |
|---|---|---|
| `qwen3.8:27b` | 27 billion | Built for long agent tasks; the only model so far to finish a full benchmark stage |
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

The order puts evidence first: the models already tested here, then the models
whose publishers make claims closest to those two abilities. Four have been
tested. For the other six, the claims below come from each publisher's own
page as of October 2026 and have not been checked.

## 1. `qwen3.8:27b`

This is the model with the most evidence behind it. It is the only one to
complete a benchmark stage: the learning graph for Algebra I. Its graph had
exactly 200 concepts and 299 dependencies with no cycles, the JSON matched the
CSV, and the resulting site passed a strict build. It made 55 tool calls and
one failed.

Its publisher describes it as improved for long-running agent work, planning,
and handling feedback from tools, which is a description of running a skill.
In the model-only tests it followed every formatting rule.

The reason to keep evaluating it is its cost in time. That stage took 102
minutes. The server re-read almost the whole conversation on every turn, and
one turn ran for nineteen minutes, nearly all of it reasoning. Both need
investigating before the longer stages.

**Download:** 17 GB. **Context window:** 256,000 tokens. **License:** reported
as Apache 2.0, not yet verified. **Status:** tested.

## 2. `gemma4:31b`

No other model has been as consistent. It passed every rule in the model-only
tests, and it is the only model whose skill runs all ended with a site that
builds: three runs out of three. It is a dense model, so every parameter takes
part in every token, and it still generated 28 to 40 tokens per second.

Its publisher gives it built-in function calling and a 256,000-token window.
In one published comparison it scored within a point of the leader on an
instruction-following benchmark.

It has not completed a benchmark stage. Its learning-graph run was lost when
the machine froze, at a context setting that is now treated as unsafe. Running
that stage again at a smaller context is the most informative next test on
this list.

**Download:** 20 GB. **Context window:** 256,000 tokens. **License:** Apache
2.0. **Status:** tested, benchmark stage incomplete.

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

**Download:** 18 GB. **Context window:** 128,000 tokens. **License:** Apache
2.0. **Status:** not tested.

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

**Download:** about 24 GB. **Context window:** 256,000 tokens. **License:**
not stated on its page. **Status:** not tested.

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

It deserves a retest against the corrected skill. A model this fast can afford
a second attempt at a step and still finish first.

**Download:** 18 GB. **Context window:** 256,000 tokens. **License:** Apache
2.0. **Status:** tested, retest needed.

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

**Download:** 25 GB. **Context window:** 1,000,000 tokens. **License:** not
stated on its page. **Status:** not tested.

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

**Download:** 80 GB. **Context window:** 256,000 tokens. **License:** modified
MIT. **Status:** not tested.

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

**Download:** 65 GB. **Context window:** 128,000 tokens. **License:** Apache
2.0. **Status:** tested.

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

**Download:** 15 GB. **Context window:** 384,000 tokens. **License:** Apache
2.0. **Status:** not tested.

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

**Download:** 18 GB. **Context window:** 128,000 tokens. **License:** Apache
2.0. **Status:** not tested.

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
