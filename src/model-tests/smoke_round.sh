#!/usr/bin/env bash
# Smoke-test two models on one DGX while their downloads finish.
#
#   src/model-tests/smoke_round.sh "<model> <think>" "<model> <think>"
#
# Tests the first model as soon as it is pulled and the second after every
# pull has finished. It then tests the first model again with no download
# running, as a control for how much the download disturbed the first
# measurement. <think> is the value passed to ollama_smoke.py --think.
#
# Start dgx-setup/pull_models.sh first: this script waits for its PULLS_DONE
# marker. Reports go under BENCH_DIR (default ~/bench).
here=$(cd "$(dirname "$0")" && pwd)
O=$HOME/opt/ollama
B=${BENCH_DIR:-$HOME/bench}
log() { echo "[$(date +%H:%M:%S)] $*"; }
have_model() { "$O/bin/ollama" list 2>/dev/null | awk '{print $1}' | grep -qx "$1"; }
run() { python3 "$here/ollama_smoke.py" "$1" --think "$2" --out "$3" 2>&1 || log "FAILED: $1"; }

read -r m1 t1 <<<"$1"
read -r m2 t2 <<<"$2"

until have_model "$m1"; do sleep 10; done
log "start $m1 (download of next model still running)"
run "$m1" "$t1" "$B/during-download"

until grep -q PULLS_DONE "$O/pull.log"; do sleep 10; done
log "all pulls done"
"$O/bin/ollama" list
log "start $m2"
run "$m2" "$t2" "$B/round1"
log "start $m1 again (control, no download running)"
run "$m1" "$t1" "$B/round1"
log "ROUND1_DONE"
