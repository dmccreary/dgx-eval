#!/usr/bin/env bash
# Read-only check before installing anything without administrator rights:
# which build tools exist, whether Python can make a virtual environment,
# whether a model server is already answering on this machine, and whether
# the internet is reachable.
#
#   ssh <user>@<dgx-host> 'bash -s' < src/dgx-setup/check_tools.sh
have() { command -v "$1" >/dev/null 2>&1; }
echo "## build tools"
for t in gcc g++ make cmake ninja git curl wget tar zstd unzip tmux screen jq; do
  have $t && echo "$t: yes" || echo "$t: NO"
done
echo "## python venv"
python3 -c "import venv, ensurepip; print('venv+ensurepip ok')" 2>&1 | tail -1
echo "## home"
df -h "$HOME" | tail -1 | awk '{print "home fs avail:", $4}'
ls -A "$HOME" | head -30
echo "## existing ollama api on localhost"
curl -s -m 3 http://127.0.0.1:11434/api/version || echo "nothing on 11434"
echo
echo "## other common llm ports"
for p in 8000 8080 1234; do
  curl -s -m 2 -o /dev/null -w "port $p: http %{http_code}\n" http://127.0.0.1:$p/v1/models || true
done
echo "## cuda libs visible"
ls /usr/local/cuda/lib64 2>/dev/null | grep -E 'libcublas.so|libcudart.so' | head -4
echo "## glibc"
ldd --version | head -1
echo "## internet"
curl -sI -m 8 https://github.com | head -1
curl -sI -m 8 https://registry.ollama.ai | head -1
echo "## sessions / gpu busy"
who | wc -l
nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader
