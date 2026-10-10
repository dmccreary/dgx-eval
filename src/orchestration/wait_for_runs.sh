#!/usr/bin/env bash
# Wait, from the laptop, until a log file on every DGX shows a marker.
#
#   export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
#   src/orchestration/wait_for_runs.sh <remote-file> <pattern> <min-count> <max-seconds>
#
# Example: wait up to an hour for a smoke round to finish on every unit.
#   src/orchestration/wait_for_runs.sh '~/bench/run.txt' 'ROUND1_DONE' 1 3600
#
# Exits when <remote-file> on every host has at least <min-count> lines that
# match <pattern>, when any host's file shows FAILED or Traceback, or when the
# time limit passes. It then prints each file. Hosts are numbered in the
# output, never named, so the output is safer to paste elsewhere.
#
# The real hosts stay out of this repository: pass them in DGX_HOSTS. SSH must
# work without a password, because the script uses BatchMode.
file=$1; pattern=$2; need=$3; limit=$4
: "${DGX_HOSTS:?set DGX_HOSTS to a space-separated list of SSH targets}"

count() {  # count <host> <pattern>
  ssh -o BatchMode=yes -o ConnectTimeout=8 "$1" \
    "grep -cE '$2' $file 2>/dev/null; true" 2>/dev/null | head -1
}

started=$(date +%s)
while :; do
  ready=1; failed=0; summary=""
  for host in $DGX_HOSTS; do
    n=$(count "$host" "$pattern"); n=${n:-0}
    f=$(count "$host" 'FAILED|Traceback'); f=${f:-0}
    summary="$summary $n"
    [ "$n" -ge "$need" ] || ready=0
    [ "$f" -gt 0 ] && failed=1
  done
  if [ "$ready" -eq 1 ]; then echo "READY: matches per host:$summary"; break; fi
  if [ "$failed" -eq 1 ]; then echo "FAILURE reported: matches per host:$summary"; break; fi
  if [ $(( $(date +%s) - started )) -ge "$limit" ]; then echo "TIMEOUT: matches per host:$summary"; break; fi
  sleep 20
done

i=0
for host in $DGX_HOSTS; do
  i=$((i + 1))
  echo "=================== host $i"
  ssh -o BatchMode=yes -o ConnectTimeout=8 "$host" "cat $file"
done
