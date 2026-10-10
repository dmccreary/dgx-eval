#!/usr/bin/env bash
# Run one Agent Skills task with Claude Code inside the harness container,
# against a model served by Ollama on the same machine. Run this on the DGX.
#
#   src/harness/run_skill.sh <model> <label> <prompt-file> <start-dir>
#
# <start-dir> is copied to a fresh run directory, so a run never changes its
# input. Pass the benchmark template for the first stage and the previous
# stage's run directory for each later stage.
#
# Claude Code is only the agent loop here. Every token comes from <model>:
# the harness is given a dummy credential and its endpoint is Ollama on
# localhost. Inside the container the agent may run any command, because the
# only writable paths are the run directory and its own transcript folder.
# The container shares the host network so it can reach Ollama; it is a
# filesystem sandbox, not a network sandbox.
#
# Set MAX_SECONDS to stop a run that takes too long. A run stopped this way
# reports exit code 124, and what it wrote so far is kept.
#
# Outputs, all under RUNS_DIR (kept outside the repository on purpose):
#   <label>/          the run directory after the run
#   <label>.jsonl     every harness event: messages, tool calls, results
#   <label>.json      the final result: turns, token counts, timings
#   <label>.claude/   the harness's own transcript files
#   <label>.status    exit code and wall-clock seconds
set -uo pipefail

model=$1; label=$2; prompt_file=$3; start_dir=$4
runs=${RUNS_DIR:-$HOME/dgx-eval-runs}
skills_repo=${BK_HOME:-$HOME/Documents/ws/ibook-skills}
image=${HARNESS_IMAGE:-dgx-eval-harness}
port=${OLLAMA_PORT:-11434}

run=$runs/$label
state=$runs/$label.claude
rm -rf "$run" "$state"
mkdir -p "$runs" "$state/skills"
cp -R "$start_dir" "$run"

started=$(date +%s)
timeout --signal=TERM --kill-after=30 "${MAX_SECONDS:-0}" \
docker run --rm -i --network host --name "harness-$label" \
  -v "$run":/work -w /work \
  -v "$state":/home/agent/.claude \
  -v "$skills_repo/skills":/home/agent/.claude/skills:ro \
  -v "$skills_repo":/opt/ibook-skills:ro \
  -e BK_HOME=/opt/ibook-skills \
  -e ANTHROPIC_BASE_URL="http://127.0.0.1:$port" \
  -e ANTHROPIC_AUTH_TOKEN=ollama -e ANTHROPIC_API_KEY= \
  -e ANTHROPIC_MODEL="$model" -e ANTHROPIC_SMALL_FAST_MODEL="$model" \
  -e ANTHROPIC_DEFAULT_OPUS_MODEL="$model" -e ANTHROPIC_DEFAULT_SONNET_MODEL="$model" \
  -e ANTHROPIC_DEFAULT_HAIKU_MODEL="$model" -e CLAUDE_CODE_SUBAGENT_MODEL="$model" \
  -e CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 -e DISABLE_AUTOUPDATER=1 \
  -e API_TIMEOUT_MS=3600000 -e CLAUDE_CODE_MAX_OUTPUT_TOKENS=32000 \
  "$image" claude -p --model "$model" \
    --output-format stream-json --verbose \
    --max-turns "${MAX_TURNS:-150}" --dangerously-skip-permissions \
  < "$prompt_file" > "$runs/$label.jsonl" 2> "$runs/$label.stderr"
code=$?
# a timed-out client leaves its container running, so stop that too
if [ "$code" -eq 124 ] || [ "$code" -eq 137 ]; then
  docker kill "harness-$label" > /dev/null 2>&1
fi

grep '"type":"result"' "$runs/$label.jsonl" | tail -1 > "$runs/$label.json"
echo "exit=$code wall_s=$(( $(date +%s) - started ))" | tee "$runs/$label.status"
