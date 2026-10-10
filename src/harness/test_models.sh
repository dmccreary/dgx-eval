#!/usr/bin/env bash
# Run the standard tests on a list of models, one model at a time. Run on the DGX.
#
#   src/harness/test_models.sh short  benchmark/models.txt
#   src/harness/test_models.sh stage1 benchmark/models.txt
#
# short   For each model: download it if needed, run the model-only smoke
#         test, choose a context length that leaves memory free, and run the
#         analyzer smoke test through the harness.
# stage1  For each model that got a context length: run benchmark stage 1, the
#         learning graph, with a time limit. Then score it and try a strict
#         site build. A model whose stage 1 already has a status file is skipped.
#
# Each line of the model list is "<model> <reasoning>". Lines that start with
# "#" are skipped.
#
# Start dgx-setup/mem_watchdog.sh first. Run this inside tmux, in a session
# that is NOT named "ollama": the script restarts the Ollama server for each
# model, and that replaces the "ollama" session.
#
# Everything is written under RUNS_DIR (default ~/dgx-eval-runs) and
# BENCH_DIR (default ~/bench). Summarize with scoring/summarize_tests.py.
set -uo pipefail

phase=$1
list=$2
here=$(cd "$(dirname "$0")" && pwd)
repo=$(cd "$here/../.." && pwd)
runs=${RUNS_DIR:-$HOME/dgx-eval-runs}
bench=${BENCH_DIR:-$HOME/bench}
image=${HARNESS_IMAGE:-dgx-eval-harness}
ollama=$HOME/opt/ollama/bin/ollama
api=http://127.0.0.1:11434
short_limit=${SHORT_SECONDS:-1800}     # analyzer smoke test, per model
stage1_limit=${STAGE1_SECONDS:-9000}   # learning graph, per model
mkdir -p "$runs" "$bench"

log() { echo "[$(date '+%F %T')] $*"; }
slug() { printf '%s' "$1" | tr ':/' '--'; }
have_model() { "$ollama" list 2>/dev/null | awk '{print $1}' | grep -qx "$1"; }

# Choose the largest context that should still leave 45 GiB of memory free.
# The estimate is linear: the weights, plus the memory the model used beyond
# its weights at a 32,768-token context, scaled up to the candidate context.
choose_context() {  # choose_context <model> <report.json>
  python3 - "$1" "$2" "$api" <<'PY'
import json, sys, urllib.request
model, report_path, api = sys.argv[1:4]
try:
    at_32k = json.load(open(report_path)).get("memory_used_by_model_gib") or 0
    tags = json.load(urllib.request.urlopen(api + "/api/tags", timeout=10))
    weights = next(m["size"] for m in tags["models"] if m["name"] == model) / 2**30
    total = next(int(l.split()[1]) for l in open("/proc/meminfo") if l.startswith("MemTotal:")) / 2**20
except Exception:
    print(0); sys.exit()
beyond_weights = at_32k - weights
if beyond_weights < 0.5:        # a reading that makes no sense: assume a costly context
    beyond_weights = 8.0
for context in (163840, 131072, 98304, 65536):
    if weights + beyond_weights * context / 32768 <= total - 45:
        print(context); break
else:
    print(0)
PY
}

# after a harness run: strict build, peak context, and a copy of the server log
after_run() {  # after_run <label>
  local label=$1
  if [ -d "$runs/$label" ]; then
    docker run --rm -e NO_MKDOCS_2_WARNING=1 -v "$runs/$label":/work -w /work "$image" \
      mkdocs build --strict -q -d /tmp/site > "$runs/$label.build.txt" 2>&1
    echo "exit=$?" >> "$runs/$label.build.txt"
  fi
  grep -oE "task.n_tokens = [0-9]+" "$HOME/opt/ollama/serve.log" | awk '{print $3}' | sort -n | tail -1 \
    > "$runs/$label.peak"
  cp "$HOME/opt/ollama/serve.log" "$runs/$label.server.txt"
}

short_phase() {  # short_phase <model> <reasoning>
  local model=$1 think=$2 name; name=$(slug "$1")
  log "=== short: $model"
  if ! have_model "$model"; then
    log "downloading $model"
    "$ollama" pull "$model" > "$runs/pull-$name.txt" 2>&1 || { log "DOWNLOAD FAILED: $model"; return; }
  fi

  # model-only smoke test; retry without a reasoning setting if the model rejects it
  curl -s -m 3 "$api/api/version" > /dev/null || "$repo/src/dgx-setup/start_ollama.sh" 65536 > /dev/null
  log "model-only smoke test"
  if ! python3 "$repo/src/model-tests/ollama_smoke.py" "$model" --think "$think" --out "$bench/short" \
        > "$runs/smoke-$name.txt" 2>&1; then
    log "smoke test failed with reasoning=$think; retrying with default"
    python3 "$repo/src/model-tests/ollama_smoke.py" "$model" --think default --out "$bench/short" \
        > "$runs/smoke-$name.txt" 2>&1 || { log "SMOKE TEST FAILED: $model"; echo 0 > "$runs/context-$name"; return; }
  fi
  tail -7 "$runs/smoke-$name.txt"

  local context; context=$(choose_context "$model" "$bench/short/$(printf '%s' "$model" | sed 's/[^A-Za-z0-9_.-]/_/g')/report.json")
  context=${context:-0}
  echo "$context" > "$runs/context-$name"
  if [ "$context" -eq 0 ]; then
    log "no context of 65,536 tokens or more leaves enough memory: harness tests skipped for $model"
    return
  fi

  log "harness smoke test at a context of $context tokens"
  "$repo/src/dgx-setup/start_ollama.sh" "$context" > /dev/null
  MAX_SECONDS=$short_limit "$repo/src/harness/run_skill.sh" "$model" "short-$name" \
    "$repo/benchmark/algebra-1/prompts/smoke-course-description-analyzer.txt" \
    "$repo/benchmark/algebra-1/template"
  after_run "short-$name"
}

stage1_phase() {  # stage1_phase <model>
  local model=$1 name; name=$(slug "$1")
  local context; context=$(cat "$runs/context-$name" 2>/dev/null || echo 0)
  if [ -f "$runs/s1-$name.status" ]; then log "=== stage 1: $model already has a result, skipped"; return; fi
  if [ "${context:-0}" -eq 0 ]; then log "=== stage 1: $model has no usable context, skipped"; return; fi
  log "=== stage 1: $model at a context of $context tokens, limit $stage1_limit s"
  "$repo/src/dgx-setup/start_ollama.sh" "$context" > /dev/null
  MAX_SECONDS=$stage1_limit "$repo/src/harness/run_skill.sh" "$model" "s1-$name" \
    "$repo/benchmark/algebra-1/prompts/01-learning-graph-generator.txt" \
    "$repo/benchmark/algebra-1/template"
  after_run "s1-$name"
  python3 "$repo/src/scoring/score_learning_graph.py" "$runs/s1-$name" > "$runs/s1-$name.score.json" 2>&1
}

log "phase $phase started with $list"
grep -vE '^\s*(#|$)' "$list" | while read -r model think; do
  case $phase in
    # stdin is the model list, so keep the tests from reading it
    short)  short_phase "$model" "${think:-off}" < /dev/null ;;
    stage1) stage1_phase "$model" < /dev/null ;;
    *)      log "unknown phase: $phase"; exit 2 ;;
  esac
done
# leave nothing loaded
"$ollama" ps 2>/dev/null | awk 'NR>1 {print $1}' | xargs -r -n1 "$ollama" stop > /dev/null 2>&1
log "phase $phase finished"
