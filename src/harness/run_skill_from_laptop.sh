#!/usr/bin/env bash
# Run one Agent Skills task with Claude Code on the laptop, against a model
# served by Ollama on the DGX. This is the earlier arrangement, kept for quick
# checks. The benchmark uses run_skill.sh, which runs the harness in a
# container on the DGX.
#
#   src/harness/run_skill_from_laptop.sh <model> <label> <prompt-file> <start-dir>
#
# First open an SSH port forward to Ollama on the DGX, and close it when done:
#   ssh -f -N -L 11435:127.0.0.1:11434 <user>@<dgx-host>
#   export OLLAMA_PORT=11435
#
# Each run gets a fresh copy of <start-dir> as its working directory and a
# clean harness configuration that holds only the skills in SKILLS_DIR: no
# account credentials, no personal settings, and no memory. That keeps runs
# comparable and keeps every model request on the forwarded port.
#
# There is no sandbox on the laptop, so the default tool list has no shell
# access beyond mkdir. Skills that need to run scripts belong in the container.
#
# Outputs, all under RUNS_DIR (kept outside the repository on purpose):
#   <label>/          the working directory after the run
#   <label>.json      Claude Code's result: turns, token counts, timings
#   <label>.status    exit code and wall-clock seconds
set -uo pipefail

model=$1; label=$2; prompt_file=$3; start_dir=$4
port=${OLLAMA_PORT:-11434}
runs=${RUNS_DIR:-$HOME/dgx-eval-runs}
skills=${SKILLS_DIR:-$HOME/Documents/ws/ibook-skills/skills}
# Tools the model may use without asking. Anything else is refused, because a
# headless run has nobody to approve it.
tools=${ALLOWED_TOOLS:-Read Write Edit Glob Grep Skill Bash(mkdir:*)}

config=$runs/.harness-config
mkdir -p "$config/skills"
for dir in "$skills"/*/; do
  [ -f "$dir/SKILL.md" ] && ln -sfn "${dir%/}" "$config/skills/$(basename "$dir")"
done

run=$runs/$label
rm -rf "$run" && cp -R "$start_dir" "$run"
cd "$run" || exit 1

IFS=' ' read -r -a tool_list <<<"$tools"
started=$(date +%s)
env -i HOME="$HOME" PATH="/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin" TERM=dumb \
  CLAUDE_CONFIG_DIR="$config" \
  ANTHROPIC_BASE_URL="http://127.0.0.1:$port" \
  ANTHROPIC_AUTH_TOKEN=ollama ANTHROPIC_API_KEY= \
  ANTHROPIC_MODEL="$model" ANTHROPIC_SMALL_FAST_MODEL="$model" \
  ANTHROPIC_DEFAULT_OPUS_MODEL="$model" ANTHROPIC_DEFAULT_SONNET_MODEL="$model" \
  ANTHROPIC_DEFAULT_HAIKU_MODEL="$model" CLAUDE_CODE_SUBAGENT_MODEL="$model" \
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 DISABLE_AUTOUPDATER=1 \
  claude -p "$(cat "$prompt_file")" --model "$model" \
    --output-format json --max-turns "${MAX_TURNS:-40}" \
    --allowedTools "${tool_list[@]}" \
    < /dev/null > "$runs/$label.json" 2> "$runs/$label.stderr"
code=$?
echo "exit=$code wall_s=$(( $(date +%s) - started ))" | tee "$runs/$label.status"
