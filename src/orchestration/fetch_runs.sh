#!/usr/bin/env bash
# Copy run output from each DGX back to the laptop, so the generated text can
# be read here.
#
#   export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
#   src/orchestration/fetch_runs.sh [--watch <seconds>]
#
# Copies the run directory on each host (DGX_RUNS, default dgx-eval-runs,
# relative to the remote home directory) into LOCAL_RUNS/unit-<n> (default
# ~/dgx-eval-runs), where <n> is the host's position in DGX_HOSTS. Only new
# and changed files travel. Nothing is deleted on either side. The harness's
# own transcript folders and the download logs are left behind.
#
# The book each model has written so far is in unit-<n>/book-<model>/, and
# its chapters are in docs/chapters/ under that.
#
# With --watch it fetches again every <seconds> and stops when one of these
# happens: a queue log gains a line that matches WATCH_PATTERN (default: a
# book or a phase finished); a host that was answering fails two fetches in a
# row; a host that was not answering comes back; or no host has a tmux
# session named QUEUE_SESSION (default bench) any more.
#
# LOCAL_RUNS is outside the repository on purpose: run output is not
# sanitized. The real hosts stay out of the repository too: pass them in
# DGX_HOSTS. SSH must work without a password, because the script uses
# BatchMode. Hosts are numbered in the output, never named.
set -uo pipefail

: "${DGX_HOSTS:?set DGX_HOSTS to a space-separated list of SSH targets}"
remote=${DGX_RUNS:-dgx-eval-runs}
local_runs=${LOCAL_RUNS:-$HOME/dgx-eval-runs}
session=${QUEUE_SESSION:-bench}
pattern=${WATCH_PATTERN:-book finished|phase [a-z0-9]+ finished}
ssh_cmd="ssh -o BatchMode=yes -o ConnectTimeout=8"

# misses[n] counts host n's failed fetches in a row; down[n] is 1 once host n
# is known to be unreachable. host_event is set when either one changes.
misses=(); down=(); host_event=""
fetch() {
  local i=0 host
  for host in $DGX_HOSTS; do
    i=$((i + 1))
    mkdir -p "$local_runs/unit-$i"
    if rsync -az --exclude '*.claude' --exclude 'pull-*.txt' -e "$ssh_cmd" \
         "$host:$remote/" "$local_runs/unit-$i/" > /dev/null 2>&1; then
      [ "${down[$i]:-0}" -eq 1 ] && host_event="host $i is answering again"
      misses[$i]=0; down[$i]=0
    else
      misses[$i]=$(( ${misses[$i]:-0} + 1 ))
      if [ "${misses[$i]}" -ge 2 ] && [ "${down[$i]:-0}" -eq 0 ]; then
        down[$i]=1; host_event="host $i has stopped answering"
      fi
    fi
  done
}

matches() { grep -hE "$pattern" "$local_runs"/unit-*/queue-*.txt 2>/dev/null | sort; }
events() { matches | wc -l | tr -d ' '; }

queue_running() {
  local host
  for host in $DGX_HOSTS; do
    $ssh_cmd "$host" "tmux has-session -t $session" > /dev/null 2>&1 && return 0
  done
  return 1
}

books() {
  local score
  for score in "$local_runs"/unit-*/book-*.score.json; do
    [ -f "$score" ] || continue
    python3 - "$score" <<'PY'
import json, sys
try:
    s = json.load(open(sys.argv[1]))
    print(f"  {sys.argv[1][:-len('.score.json')]}: {s['chapters_written']} of {s['chapter_count']} chapters written, {s['total_words']} words")
except (OSError, ValueError, KeyError):
    print(f"  {sys.argv[1]}: no score yet")
PY
  done
}

# Two tries, so a host that does not answer at the start is known to be down
# and is not reported again as a new event.
fetch; fetch; host_event=""
i=0
for host in $DGX_HOSTS; do
  i=$((i + 1))
  [ "${down[$i]:-0}" -eq 1 ] && echo "host $i did not answer"
done
if [ "${1:-}" != "--watch" ]; then
  echo "fetched into $local_runs"; books; exit 0
fi

every=${2:?give the number of seconds between fetches}
seen=$(events)
while :; do
  sleep "$every"
  queue_running && alive=1 || alive=0
  fetch
  now=$(events)
  if [ "$now" -gt "$seen" ]; then
    echo "[$(date '+%F %T')] EVENT:"; matches | tail -n $((now - seen)); break
  fi
  if [ -n "$host_event" ]; then echo "[$(date '+%F %T')] EVENT: $host_event"; break; fi
  if [ "$alive" -eq 0 ]; then echo "[$(date '+%F %T')] QUEUE STOPPED: no '$session' session on any host"; break; fi
done
echo "books on this computer:"; books
