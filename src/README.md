# Source Code

The Python and shell code behind the evaluation. The folders follow the order
of the work: prepare a DGX, test a model directly, run skills through the
harness, then score what the runs produced.

## Layout

| Folder | What it does | Runs on |
|---|---|---|
| `dgx-setup/` | Inspect a DGX and install a model server without administrator rights | The DGX |
| `model-tests/` | Test a model directly through Ollama, with no agent harness | The DGX |
| `harness/` | Run Agent Skills through Claude Code against a local model | The DGX, in a container |
| `scoring/` | Check what a run produced | Wherever the run output is |
| `orchestration/` | Copy code to the DGX units and wait on them | The laptop |
| `reporting/` | Turn fetched run output into the Model Results pages of this book | The laptop |
| `microsim-review/` | Capture a MicroSim at each step for layout review | The laptop |

The benchmark's fixed input is not code and lives in `benchmark/`: the
[workspace template and prompts](../benchmark/algebra-1/README.md), and
`models.txt`, the list of models to test.

## dgx-setup

| File | Purpose |
|---|---|
| `inventory.sh` | Read-only report of the OS, CPU, memory, disk, GPU, CUDA, containers, Python, and model runtimes |
| `check_tools.sh` | Read-only check for build tools, Python virtual environments, existing model servers, and internet access |
| `install_ollama.sh` | Install a pinned Ollama release under `~/opt/ollama`, verifying its SHA-256 |
| `start_ollama.sh` | Start or restart the server in tmux, on localhost only, with a given context length |
| `pull_models.sh` | Download models and mark when every download has finished |
| `mem_watchdog.sh` | Stop runs and unload models before the machine runs out of memory or the GPU overheats |
| `log_vitals.sh` | Record memory, GPU temperature, GPU power, and load every 30 seconds, so a machine that freezes leaves its last readings behind |

The two read-only scripts can be piped over SSH without copying anything to
the DGX first:

```bash
ssh <user>@<dgx-host> 'bash -s' < src/dgx-setup/inventory.sh > inventory.txt
```

## model-tests

| File | Purpose |
|---|---|
| `ollama_smoke.py` | Five short tasks for one model: Markdown writing, p5.js code, schema-constrained JSON, a tool call, and a 30,000-token prompt. Reports speed, memory, GPU power, and which format rules the output broke |
| `smoke_round.sh` | Run the smoke test on two models as their downloads finish, then repeat the first as a control |

These measure the model alone. A model that passes here can still fail in the
harness, where it also has to follow a long system prompt and call tools over
many turns.

## harness

| File | Purpose |
|---|---|
| `Dockerfile` | The container the harness runs in: Claude Code at a pinned version, Python, and MkDocs |
| `run_skill.sh` | Run one skill in the container against a model on the same DGX. This is the benchmark runner |
| `run_skill_from_laptop.sh` | The earlier arrangement: the harness on the laptop, reaching the model through an SSH port forward. It has no sandbox, so it allows no shell access |
| `run_report.py` | Summarize runs from their event streams: turns, tool calls, failed tool calls, tokens, and time. Works on a run that is still going |
| `test_models.sh` | Work through a list of models one at a time. Its phases cover the download and model-only test, the harness smoke test, and benchmark stages 1, 2, and 3, each with a time limit. Stage 3 runs once per chapter and keeps the book so far in `book-<model>` |

In both runners Claude Code is only the agent loop. It is given a placeholder
credential and its endpoint is Ollama, so every token comes from the local
model.

## scoring

| File | Purpose |
|---|---|
| `score_learning_graph.py` | Structural checks on stage 1 output: file presence, concept count, valid dependencies, no cycles, and a JSON file that agrees with the CSV |
| `score_analyzer_runs.py` | Checks on the analyzer smoke test: report written, score given, frontmatter and nav updated, strict site build |
| `score_chapters.py` | Structural checks on stage 2 and stage 3 output: chapter files, concepts assigned to chapters, words per chapter, and how many chapters have been written |
| `chapter_quality.py` | A 0-100 score for each written chapter, and a consistency score for the book: how closely it follows the content guide and the diagram-specification rules. Reports words, diagrams, reading grade, the number of well-formed and malformed equations, and the sub-scores behind each number |
| `test_equations.py` | Regression cases for the equation check in `chapter_quality.py`. Run it after changing the command lists or the delimiter rules |
| `summarize_tests.py` | One block per model for everything `test_models.sh` has produced so far |

The first scripts check structure, which a program can verify.
`chapter_quality.py` goes one step further and scores conformance to the
written rules, using only counts a program can reproduce: the same files always
give the same score. Neither judges whether the mathematics is correct or the
explanation is good. That remains a human review.

```bash
python3 src/scoring/chapter_quality.py docs/models/<model> ~/dgx-eval-runs/unit-1/book-<model> --raw
```

Give it several books and it ends with a comparison table. The score is built
so that every sub-score is measured against the chapter's own concept budget,
and the composite score is the book's mean score multiplied by how little the
chapters differ from one another. A book of uniformly decent chapters beats a
book with a few excellent ones and several stubs. The weights and thresholds
are constants at the top of the file. It uses `textstat` for reading level when
it is installed and a built-in estimate otherwise, and records which.

The equation counts are reported but not scored. A malformed equation is one the
site would draw as red source text instead of math: a delimiter that never
closes, TeX that KaTeX cannot parse, or TeX commands left in the prose with no
delimiters. `--json` lists each one under `math_issues`, and the chapter's flags
carry `MALFORMED_MATH:n`. It is a syntax check written from the KaTeX function
list, not a KaTeX run, so a valid command it does not know is reported as
malformed with its name.

```bash
python3 src/scoring/test_equations.py
```

## orchestration

| File | Purpose |
|---|---|
| `sync_to_dgx.sh` | Copy `src/` and `benchmark/`, and optionally the skills, to each DGX. Adds and overwrites, never deletes |
| `wait_for_runs.sh` | Wait until a log file on every DGX shows a marker, a failure, or a time limit |
| `fetch_runs.sh` | Copy run output from each DGX back to the laptop, so the generated chapters can be read there. With `--watch` it keeps fetching until a book or a phase finishes, or a DGX stops answering |

All three read the SSH targets from an environment variable, so real hosts
never appear in this repository:

```bash
export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
```

## reporting

| File | Purpose |
|---|---|
| `publish_results.py` | Rebuild `docs/models/` from fetched run output: for each model, its learning graph for the viewer, a graph quality report, its chapters, and a page of chapter metrics. It also rewrites the Model Results block of the navigation in `mkdocs.yml` |
| `aggregate_runs.py` | Reduce fetched run output to one sanitized CSV of per-run counts and times, `papers/slm-textbooks/data/stage-metrics.csv`. It copies no path, host name, or text |
| `make_paper_figures.py` | Make the figures and `data/paper-numbers.json` for the paper in `papers/slm-textbooks`. It runs `scoring/chapter_quality.py` itself and needs matplotlib, so use the `mkdocs` conda environment |

It reuses two scripts from the skills instead of repeating them: the graph
analysis from `learning-graph-generator` and the reading-level measure from
`book-installer`. The second needs the `textstat` package, so run the script
with a Python that has it:

```bash
python3 src/reporting/publish_results.py
```

The paper is rebuilt from two further scripts. `aggregate_runs.py` is standard
library only and reads the same fetched run output; `make_paper_figures.py`
reads its CSV, the published model books, and the book's own chapters:

```bash
python3 src/reporting/aggregate_runs.py
/usr/local/Caskroom/miniforge/base/envs/mkdocs/bin/python src/reporting/make_paper_figures.py
```

## microsim-review

| File | Purpose |
|---|---|
| `capture_steps.py` | Save an image of the testing-architecture MicroSim at every step |
| `capture_hover.py` | Save the testing-architecture info panel at four widths, to confirm long text still fits |
| `capture_model_fit.py` | Save the model-fit-by-memory MicroSim at several memory settings, hovered rows, and widths |

Each is tied to one MicroSim's layout constants. They need Playwright.

## A Typical Sequence

1. On the laptop, copy the code to the DGX: `orchestration/sync_to_dgx.sh --with-skills`.
2. On the DGX, look before installing: `dgx-setup/inventory.sh` and `dgx-setup/check_tools.sh`.
3. Install and start the model server: `dgx-setup/install_ollama.sh`, then `dgx-setup/start_ollama.sh`.
4. Start `dgx-setup/mem_watchdog.sh` and `dgx-setup/log_vitals.sh`, and leave both running through every later step.
5. Download models with `dgx-setup/pull_models.sh`, and test each one alone with `model-tests/ollama_smoke.py`.
6. Build the container from `harness/Dockerfile`, then run each benchmark stage with `harness/run_skill.sh`.
7. Watch progress with `harness/run_report.py`, and score finished stages with the scripts in `scoring/`.
8. On the laptop, bring the output back with `orchestration/fetch_runs.sh`. Each model's chapters are in `~/dgx-eval-runs/unit-<n>/book-<model>/docs/chapters/`.
9. Put the results in the book with `reporting/publish_results.py`, then check the site with `mkdocs build --strict`.

## Conventions

- **No device details in code.** No address, hostname, or login is written
  into any file here. Hosts are passed in `DGX_HOSTS`, and examples use
  `<user>@<dgx-host>`.
- **Raw output stays out of the repository.** Runs write to
  `~/dgx-eval-runs/` and model tests to `~/bench/`. Raw output is not
  sanitized, so review it before copying any of it into the book. The one
  automated path in is `reporting/publish_results.py`, which copies only the
  learning graph, the chapter text, and the course description, and leaves
  out any file that holds an address, a host name, or a home-directory path.
- **Standard library only on the DGX.** Every Python script that runs there
  uses nothing beyond the standard library, so it works on a fresh machine.
- **Pinned versions.** The Ollama release and the Claude Code version are
  pinned in `install_ollama.sh` and `Dockerfile`. Change them deliberately,
  and rerun the tests when you do.
- **Each script explains itself.** The comment at the top of every file gives
  its usage, its inputs, and where its output goes.
