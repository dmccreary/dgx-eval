#!/usr/bin/env bash
# Download one or more models with the user-space Ollama install.
#
#   src/dgx-setup/pull_models.sh <model> [<model> ...]
#
# Progress goes to ~/opt/ollama/pull.log. The last line written is PULLS_DONE,
# which model-tests/smoke_round.sh waits for. Run this inside tmux so a dropped
# SSH session does not stop the download. Models are tens of gigabytes each:
# check free disk space and whose connection you are using before you start.
O=$HOME/opt/ollama
for model in "$@"; do
  "$O/bin/ollama" pull "$model"
done > "$O/pull.log" 2>&1
echo PULLS_DONE >> "$O/pull.log"
