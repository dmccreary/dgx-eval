#!/usr/bin/env bash
# Stop benchmark work before the machine runs out of memory.
#
#   src/dgx-setup/mem_watchdog.sh [min-available-GiB]     (default 16)
#
# On a unified-memory system the GPU's allocations come out of system RAM, and
# running out can freeze the whole machine instead of killing one process.
# This loop checks MemAvailable every five seconds. Below the floor it kills
# the harness containers and unloads every Ollama model, then exits.
floor_gib=${1:-16}
log=${RUNS_DIR:-$HOME/dgx-eval-runs}/watchdog.txt
mkdir -p "$(dirname "$log")"
echo "$(date '+%F %T') watchdog started, floor ${floor_gib} GiB" >> "$log"

while sleep 5; do
  avail_gib=$(awk '/^MemAvailable:/ {printf "%d", $2 / 1048576}' /proc/meminfo)
  [ "$avail_gib" -ge "$floor_gib" ] && continue
  echo "$(date '+%F %T') MemAvailable ${avail_gib} GiB is below ${floor_gib} GiB: stopping runs" >> "$log"
  docker ps -q --filter name=harness- | xargs -r docker kill >> "$log" 2>&1
  curl -s -m 5 http://127.0.0.1:11434/api/ps \
    | python3 -c 'import json,sys; [print(m["name"]) for m in json.load(sys.stdin).get("models", [])]' \
    | while read -r model; do
        curl -s -m 20 http://127.0.0.1:11434/api/generate \
          -d "{\"model\": \"$model\", \"keep_alive\": 0}" > /dev/null
        echo "$(date '+%F %T') unloaded $model" >> "$log"
      done
  break
done
