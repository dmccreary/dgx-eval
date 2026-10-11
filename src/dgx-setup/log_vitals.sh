#!/usr/bin/env bash
# Record memory, GPU temperature, GPU power, and load at a steady interval.
# Run on the DGX, in its own tmux session.
#
#   src/dgx-setup/log_vitals.sh [seconds]        (default 30)
#
# Appends one line per reading to RUNS_DIR/vitals.txt (default
# ~/dgx-eval-runs). The watchdog writes only when it acts, so a machine that
# freezes leaves nothing behind to explain it. This log travels to the laptop
# with the run output, so the last reading before a freeze survives there.
every=${1:-30}
log=${RUNS_DIR:-$HOME/dgx-eval-runs}/vitals.txt
mkdir -p "$(dirname "$log")"
while :; do
  avail=$(awk '/^MemAvailable:/ {printf "%d", $2 / 1048576}' /proc/meminfo)
  swap=$(awk '/^SwapTotal:/ {t=$2} /^SwapFree:/ {f=$2} END {printf "%d", (t - f) / 1024}' /proc/meminfo)
  gpu=$(nvidia-smi --query-gpu=temperature.gpu,power.draw,utilization.gpu \
          --format=csv,noheader,nounits 2>/dev/null | head -1 | tr -d ' ')
  run=$(docker ps --format '{{.Names}}' --filter name=harness- 2>/dev/null | head -1)
  echo "$(date '+%F %T') avail_gib=$avail swap_used_mib=$swap gpu_c,w,util=${gpu:-?}" \
       "load=$(cut -d' ' -f1 /proc/loadavg) run=${run:--}" >> "$log"
  sleep "$every"
done
