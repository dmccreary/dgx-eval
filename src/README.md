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
| `test_models.sh` | Work through a list of models one at a time: download, model-only test, choose a context that leaves memory free, harness smoke test, then benchmark stage 1 with a time limit |

In both runners Claude Code is only the agent loop. It is given a placeholder
credential and its endpoint is Ollama, so every token comes from the local
model.

## scoring

| File | Purpose |
|---|---|
| `score_learning_graph.py` | Structural checks on stage 1 output: file presence, concept count, valid dependencies, no cycles, and a JSON file that agrees with the CSV |
| `score_analyzer_runs.py` | Checks on the analyzer smoke test: report written, score given, frontmatter and nav updated, strict site build |
| `summarize_tests.py` | One block per model for everything `test_models.sh` has produced so far |

These scripts check structure, which a program can verify. Whether the
concepts or the prose are good is a separate judgment that they do not make.

## orchestration

| File | Purpose |
|---|---|
| `sync_to_dgx.sh` | Copy `src/` and `benchmark/`, and optionally the skills, to each DGX. Adds and overwrites, never deletes |
| `wait_for_runs.sh` | Wait until a log file on every DGX shows a marker, a failure, or a time limit |

Both read the SSH targets from an environment variable, so real hosts never
appear in this repository:

```bash
export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
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
4. Start `dgx-setup/mem_watchdog.sh`, and leave it running through every later step.
5. Download models with `dgx-setup/pull_models.sh`, and test each one alone with `model-tests/ollama_smoke.py`.
6. Build the container from `harness/Dockerfile`, then run each benchmark stage with `harness/run_skill.sh`.
7. Watch progress with `harness/run_report.py`, and score finished stages with the scripts in `scoring/`.

## Conventions

- **No device details in code.** No address, hostname, or login is written
  into any file here. Hosts are passed in `DGX_HOSTS`, and examples use
  `<user>@<dgx-host>`.
- **Output stays out of the repository.** Runs write to `~/dgx-eval-runs/` and
  model tests to `~/bench/`. Raw output is not sanitized, so review it before
  copying any of it into the book.
- **Standard library only on the DGX.** Every Python script that runs there
  uses nothing beyond the standard library, so it works on a fresh machine.
- **Pinned versions.** The Ollama release and the Claude Code version are
  pinned in `install_ollama.sh` and `Dockerfile`. Change them deliberately,
  and rerun the tests when you do.
- **Each script explains itself.** The comment at the top of every file gives
  its usage, its inputs, and where its output goes.
