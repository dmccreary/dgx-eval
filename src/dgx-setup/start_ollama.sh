#!/usr/bin/env bash
# Start or restart the user-space Ollama server inside a tmux session named
# "ollama". It listens on localhost only and serves one request at a time.
#
#   src/dgx-setup/start_ollama.sh [context-length]     (default 131072)
#
# A large context length costs memory before any work starts. Start
# mem_watchdog.sh before a run, and raise this value deliberately.
ctx=${1:-131072}
O=$HOME/opt/ollama
tmux kill-session -t ollama 2>/dev/null
pkill -u "$USER" -x ollama 2>/dev/null
sleep 2
tmux new-session -d -s ollama \
  "OLLAMA_HOST=127.0.0.1:11434 OLLAMA_CONTEXT_LENGTH=$ctx OLLAMA_MAX_LOADED_MODELS=1 OLLAMA_NUM_PARALLEL=1 OLLAMA_KEEP_ALIVE=30m $O/bin/ollama serve > $O/serve.log 2>&1"
for i in $(seq 1 15); do
  curl -s -m 2 http://127.0.0.1:11434/api/version && break
  sleep 1
done
echo
grep -oE "OLLAMA_CONTEXT_LENGTH:[0-9]+" "$O/serve.log" | head -1
grep -oE "Listening on [^ ]+" "$O/serve.log" | tail -1
