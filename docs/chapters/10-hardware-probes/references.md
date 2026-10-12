# References: Python Hardware Probes

1. [Procfs](https://en.wikipedia.org/wiki/Procfs) - Wikipedia - Describes the /proc pseudo-filesystem that presents kernel and process information as files in Unix-like systems. It explains where the RAM probe's reading of /proc/meminfo comes from.

2. [CUDA](https://en.wikipedia.org/wiki/CUDA) - Wikipedia - Covers NVIDIA's parallel computing platform and API, its history, supported GPUs, and version features. It gives context for the CUDA version that nvidia-smi reports and for the chapter's PyTorch CUDA check.

3. [JSON](https://en.wikipedia.org/wiki/JSON) - Wikipedia - Explains the language-independent text format of name-value pairs and arrays, with its syntax and interoperability. It is the format of the chapter's machine-readable probe report.

4. Systems Performance: Enterprise and the Cloud (2nd Edition) - Brendan Gregg - Addison-Wesley - Gregg developed the USE Method, which checks utilization, saturation, and errors for every resource. That checklist maps directly onto the CPU, memory, storage, and GPU probes the chapter builds.

5. Release It!: Design and Deploy Production-Ready Software (2nd Edition) - Michael T. Nygard - Pragmatic Bookshelf - Martin Fowler credits Nygard with popularizing the Circuit Breaker pattern, and the book's stability chapters argue for timeouts on every outside call. That is the reasoning behind the probe helper's bounded run time.

6. [nvidia-smi: NVIDIA System Management Interface](https://docs.nvidia.com/deploy/nvidia-smi/index.html) - NVIDIA - Official manual documenting --query-gpu and --format=csv,noheader,nounits, and noting that NVML is the better choice for tools needing stable output. It is the source for the chapter's GPU probe query.

7. [NVML API Reference Guide](https://docs.nvidia.com/deploy/nvml-api/index.html) - NVIDIA - Reference for the C library behind nvidia-smi, used to query GPU temperature, power, memory, and clocks, and wrapped by the nvidia-ml-py Python bindings. It supports the chapter's NVML section.

8. [psutil: Process and System Utilities for Python](https://psutil.io/) - psutil project - Home page of the cross-platform library that reports CPU, memory, disk, network, and sensor data through functions such as virtual_memory() and disk_usage(). It is the optional package that the chapter's standard-library probes replace.

9. [The /proc Filesystem](https://www.kernel.org/doc/html/latest/filesystems/proc.html) - Linux kernel documentation - Documents the /proc files, including the meminfo fields MemTotal, MemFree, and MemAvailable, an estimate of memory available for new applications without swapping. It is the source for the chapter's RAM probe.

10. [subprocess: Subprocess management](https://docs.python.org/3/library/subprocess.html) - Python documentation - Documents subprocess.run with capture_output, text mode, return codes, and the timeout parameter that raises TimeoutExpired. It is the reference for the run() helper beneath every probe.
