#!/usr/bin/env bash
# Read-only inventory of a DGX: OS, CPU, memory, disk, GPU, CUDA, containers,
# Python, model runtimes, and network link speeds.
#
#   ssh <user>@<dgx-host> 'bash -s' < src/dgx-setup/inventory.sh > inventory.txt
#
# No sudo, no writes, and no network identifiers: it queries no IP addresses,
# MAC addresses, serial numbers, or GPU UUIDs. The first line of output is the
# hostname, so the output still needs sanitizing before it is published.
sec()  { printf '\n##### %s\n' "$1"; }
have() { command -v "$1" >/dev/null 2>&1; }

sec "unit";    hostname
sec "os";      grep -E '^(NAME|VERSION|VERSION_CODENAME)=' /etc/os-release
               grep -v SERIAL /etc/dgx-release 2>/dev/null
sec "kernel";  uname -srm
sec "uptime";  uptime
sec "cpu";     lscpu | grep -E '^(Architecture|CPU\(s\)|Vendor ID|Model name|Thread|Core|Socket|CPU max MHz)'
sec "memory";  free -h
               grep -E '^(MemTotal|MemAvailable|SwapTotal|HugePages_Total)' /proc/meminfo
sec "disk";    df -hT / 2>/dev/null
               lsblk -d -o NAME,SIZE,TYPE,ROTA,TRAN,MODEL 2>/dev/null

sec "gpu nvidia-smi"; nvidia-smi 2>&1
sec "gpu query"
nvidia-smi --query-gpu=name,driver_version,memory.total,memory.used,utilization.gpu,temperature.gpu,power.draw --format=csv 2>&1
sec "gpu processes"
nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv 2>&1

sec "cuda"
ls -d /usr/local/cuda* 2>/dev/null
have nvcc && nvcc --version | tail -2
[ -x /usr/local/cuda/bin/nvcc ] && /usr/local/cuda/bin/nvcc --version | tail -2

sec "nvidia packages"
dpkg-query -W -f='${Package} ${Version}\n' 2>/dev/null \
  | grep -E '^(cuda-toolkit|cuda-runtime|cuda-compat|libcudnn|libnvinfer[0-9]+ |tensorrt |nvidia-container-toolkit |nvidia-driver|libnvidia-compute|nvidia-dgx|dgx-|nvidia-spark|nvidia-l4t-core)' \
  | head -60

sec "containers"
have docker && docker --version
have nvidia-ctk && nvidia-ctk --version 2>&1 | head -1
echo "groups: $(id -nG)"
echo "-- running"; docker ps --format '{{.Image}}  {{.Status}}' 2>&1 | head -20
echo "-- images";  docker images --format '{{.Repository}}:{{.Tag}}  {{.Size}}' 2>&1 | head -40

sec "python"
python3 --version 2>&1
for t in pip3 uv conda mamba pipx; do
  have "$t" && echo "$t: $("$t" --version 2>&1 | head -1)"
done

sec "llm runtimes"
for t in ollama vllm llama-server llama-cli lms tritonserver jupyter open-webui; do
  have "$t" && echo "$t: $(command -v "$t")"
done
have ollama && { ollama --version 2>&1; echo "-- ollama models"; ollama list 2>&1; }

sec "model caches"
for d in "$HOME/.cache/huggingface/hub" "$HOME/.ollama/models" /usr/share/ollama/.ollama/models "$HOME/models"; do
  [ -d "$d" ] && echo "$d: $(ls "$d" 2>/dev/null | wc -l) entries"
done
echo "(end of list)"

sec "network links"
for i in /sys/class/net/*; do
  n=$(basename "$i"); [ "$n" = lo ] && continue
  echo "$n state=$(cat "$i/operstate" 2>/dev/null) speed=$(cat "$i/speed" 2>/dev/null)"
done
lspci 2>/dev/null | grep -iE 'ethernet|mellanox|network|infiniband' | sed -E 's/^[0-9a-f:.]+ //'
