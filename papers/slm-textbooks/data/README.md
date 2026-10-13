# Data for the SLM Textbook-Generation Paper

Two generated files. Neither is edited by hand.

## `stage-metrics.csv`

One row per benchmark run, written by `src/reporting/aggregate_runs.py` from
the raw run output on the laptop. Only counts and durations are copied: no path,
host name, session identifier, or text from the event streams.

| Column | Meaning |
|---|---|
| `model` | Model tag |
| `stage` | `s1` learning graph, `s2` chapter structure, `s3` one chapter |
| `chapter` | Chapter number for `s3`, empty otherwise |
| `exit` | `0` ended on its own, `124` stopped at the time limit, other values are errors |
| `wall_s` | Wall-clock seconds, from the run's status file |
| `turns` | Assistant turns |
| `tool_calls`, `failed_tool_calls` | Tool calls requested, and the number that returned an error |
| `output_tokens`, `input_tokens`, `cache_read_tokens` | As reported by the server; empty when a run was stopped before it wrote a result record |
| `peak_context_tokens` | The largest task the server logged, which for stage 3 covers the server session so far |

To refresh it after a new run:

```bash
python3 src/reporting/aggregate_runs.py
```

## `paper-numbers.json`

Every derived number the paper's text and tables use: per-book level,
consistency, floor, and composite score; written words, prose words, diagram
specifications, reading grade, and equation counts; per-model time, tool calls,
and tokens; the score's rank correlations with size; the weight-sensitivity
trial; and the cost model's base case, measured-time costs, and scenarios.

It is written by `src/reporting/make_paper_figures.py`, which runs the scorer
itself so that the numbers always come from the same code.
