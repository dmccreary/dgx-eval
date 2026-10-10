#!/usr/bin/env bash
# Stop benchmark work before the machine runs out of memory or overheats.
#
#   src/dgx-setup/mem_watchdog.sh [min-available-GiB] [max-gpu-celsius]
#                                       (defaults: 16 and 95)
#
# On a unified-memory system the GPU's allocations come out of system RAM, and
# running out can freeze the whole machine instead of killing one process.
# This loop checks MemAvailable and the GPU temperature every five seconds.
# When memory falls below the floor, or the GPU passes the ceiling, it kills
# the harness containers and unloads every Ollama model. It then keeps
# watching, so a queue of runs stays protected after the first stop.
floor_gib=${1:-16}
max_celsius=${2:-95}
log=${RUNS_DIR:-$HOME/dgx-eval-runs}/watchdog.txt
mkdir -p "$(dirname "$log")"
echo "$(date '+%F %T') watchdog started, floor ${floor_gib} GiB, ceiling ${max_celsius} C" >> "$log"

stop_runs() {
  docker ps -q --filter name=harness- | xargs -r docker kill >> "$log" 2>&1
  curl -s -m 5 http://127.0.0.1:11434/api/ps \
    | python3 -c 'import json,sys; [print(m["name"]) for m in json.load(sys.stdin).get("models", [])]' \
    | while read -r model; do
        curl -s -m 20 http://127.0.0.1:11434/api/generate \
          -d "{\"model\": \"$model\", \"keep_alive\": 0}" > /dev/null
        echo "$(date '+%F %T') unloaded $model" >> "$log"
      done
}

while sleep 5; do
  avail_gib=$(awk '/^MemAvailable:/ {printf "%d", $2 / 1048576}' /proc/meminfo)
  celsius=$(nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits 2>/dev/null | head -1)
  celsius=${celsius:-0}
  if [ "$avail_gib" -lt "$floor_gib" ]; then
    echo "$(date '+%F %T') MemAvailable ${avail_gib} GiB is below ${floor_gib} GiB: stopping runs" >> "$log"
  elif [ "$celsius" -ge "$max_celsius" ] 2>/dev/null; then
    echo "$(date '+%F %T') GPU at ${celsius} C has reached ${max_celsius} C: stopping runs" >> "$log"
  else
    continue
  fi
  stop_runs
  sleep 60   # let memory and temperature recover before watching again
done
