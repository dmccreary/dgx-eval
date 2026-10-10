#!/usr/bin/env bash
# Install Ollama for one user, with no administrator rights. Everything lands
# under ~/opt/ollama, and the download is checked against the release's
# published SHA-256 before it is unpacked.
#
#   ssh <user>@<dgx-host> 'bash -s' < src/dgx-setup/install_ollama.sh
#
# The version is pinned below. Change it deliberately, and rerun the model
# tests when you do.
set -euo pipefail
V=v0.40.2
F=ollama-linux-arm64.tar.zst
D=$HOME/opt/ollama
base=https://github.com/ollama/ollama/releases/download/$V

mkdir -p "$D/dl" && cd "$D/dl"
curl -fsSL -o sha256sum.txt "$base/sha256sum.txt"
t0=$(date +%s)
curl -fL --no-progress-meter -o "$F" "$base/$F"
t1=$(date +%s)
bytes=$(stat -c %s "$F")
echo "downloaded $((bytes/1048576)) MB in $((t1-t0)) s  (~$(( bytes/1048576/(t1-t0+1) )) MB/s)"

expected=$(grep "$F\$" sha256sum.txt | awk '{print $1}')
actual=$(sha256sum "$F" | awk '{print $1}')
if [ -n "$expected" ] && [ "$expected" = "$actual" ]; then
  echo "sha256 OK"
else
  echo "sha256 MISMATCH or missing (expected='$expected')"; exit 1
fi

zstd -dc "$F" | tar -x -C "$D"
rm "$F"
"$D/bin/ollama" --version 2>&1 | tail -1
echo "installed tree:"; ls "$D"; ls "$D/lib/ollama" | head -20
du -sh "$D" | awk '{print "install size:", $1}'
