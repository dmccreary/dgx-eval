# Algebra I Benchmark

The fixed input for the textbook-generation benchmark: a high school Algebra I
course. The benchmark tests whether a local harness, driving a local model,
can execute the `ibook-skills` skills correctly. Every model under test starts
from the same files and the same prompts.

## Stages

The benchmark covers three skills, run in this order. Each stage starts from
the previous stage's output.

| Stage | Skill | Produces |
|---|---|---|
| 1 | `learning-graph-generator` | 200 concepts, their dependencies, a taxonomy, and `learning-graph.json` |
| 2 | `book-chapter-generator` | The chapter structure: one directory and outline per chapter |
| 3 | `chapter-content-generator` | The content of each chapter, one run per chapter |

MicroSims, the glossary, the FAQ, and quizzes are outside this benchmark.

## Contents

- `template/` is the starting workspace for stage 1. The runner copies it fresh
  for every run, so no run sees another run's output.
- `template/docs/course-description.md` is the seed for the whole pipeline. It
  is an unchanged copy of `docs/course-description.md` from
  [dmccreary/algebra-1](https://github.com/dmccreary/algebra-1), last modified
  there in commit `0bf70cc` (2025-11-10), licensed CC BY-NC-SA 4.0.
- `prompts/` holds one prompt per stage, numbered in stage order. Each prompt
  is what a person would type to start that skill, plus a standing answer to
  the skill's approval questions, because nobody is present during a run. In
  the stage 3 prompt, replace `{chapter}` with the chapter number.
- `prompts/smoke-course-description-analyzer.txt` is a three-minute check that
  the harness, the model, and the skills are wired together. It is not a
  benchmark stage.
- The code that runs and scores the benchmark is in `src/`; see `src/README.md`.

## Running a Stage

Run these on the DGX, from a copy of this repository, with Ollama serving the
model on localhost and a copy of `ibook-skills` at
`~/Documents/ws/ibook-skills`.

Build the container once:

```bash
docker build -t dgx-eval-harness \
  --build-arg UID=$(id -u) --build-arg GID=$(id -g) src/harness
```

Run stage 1 from the template:

```bash
src/harness/run_skill.sh <model> s1-<model-label> \
  benchmark/algebra-1/prompts/01-learning-graph-generator.txt \
  benchmark/algebra-1/template
```

Run each later stage from the previous stage's run directory:

```bash
src/harness/run_skill.sh <model> s2-<model-label> \
  benchmark/algebra-1/prompts/02-book-chapter-generator.txt \
  ~/dgx-eval-runs/s1-<model-label>
```

Summarize runs, including one that is still going:

```bash
python3 src/harness/run_report.py
```

Results land in `~/dgx-eval-runs/`, outside this repository. Raw run output is
not sanitized, so review it before copying any of it into the book.

## Context Length and Memory

Claude Code assumes a context window of about 200,000 tokens. If Ollama serves
a smaller one, long sessions are silently truncated before the harness knows
to compact them. Serving a large one (`OLLAMA_CONTEXT_LENGTH=262144`) avoids
that and costs memory: with one 31B model loaded and idle at that setting, its
machine showed 66 GiB in use.

Treat that setting as unproven. During the first stage 1 run with it, one of
the two machines stopped responding entirely. The cause was not confirmed at
the time of writing; running out of unified memory is the leading suspect.

Always start the watchdog before a run. It stops the harness and unloads the
model if available memory falls below a floor, because a unified-memory
machine can freeze instead of failing one process:

```bash
src/dgx-setup/mem_watchdog.sh 20 &
```

## Reference Size

The published Algebra I book shows how large a finished textbook for this
course is. It was generated with cloud models in November 2025. The rows the
benchmark produces are the learning graph and the chapters.

| Artifact | Published Algebra I book |
|---|---|
| Learning graph | 200 concepts, 277 dependencies |
| Chapters | 13 chapters, about 55,000 words |
| Quizzes | 13 quizzes, 130 questions |
| MicroSims | 48 built, about 10,600 lines of HTML and JavaScript |
| Glossary | 197 terms, about 7,000 words |
| FAQ | 82 questions, about 11,700 words |
| All Markdown | about 133,000 words |

The published book is a reference for scale, not a controlled baseline. It was
generated with earlier versions of the skills, and no token counts or timings
were recorded.
