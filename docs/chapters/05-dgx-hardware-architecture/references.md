# References: NVIDIA DGX Hardware Architecture

1. [Nvidia DGX](https://en.wikipedia.org/wiki/Nvidia_DGX) - Wikipedia - Surveys the DGX line by GPU generation, from DGX-1 through Blackwell-era systems such as DGX Spark, with specification tables for accelerators, memory, and power. Maps the family variation that this chapter says changes setup steps.

2. [CUDA](https://en.wikipedia.org/wiki/CUDA) - Wikipedia - Covers NVIDIA's parallel computing platform, its programming model, supported GPUs, and the features of each compute capability version. Explains the CUDA layer and the compute capability that decides which software runs on a given GPU.

3. [ARM architecture family](https://en.wikipedia.org/wiki/ARM_architecture_family) - Wikipedia - Details the Arm instruction set family, including its 64-bit architecture, cores, licensing, and operating system support. Explains the aarch64 side of this chapter's aarch64 versus x86_64 split that changes package choices.

4. Programming Massively Parallel Processors: A Hands-on Approach (4th Edition) - Wen-mei W. Hwu, David B. Kirk, and Izzat El Hajj - Morgan Kaufmann - Widely used GPU programming text that teaches CUDA through a running matrix multiplication example, optimized with tiling to cut global memory traffic. It shows why memory, not arithmetic, often limits GPU performance.

5. Computer Organization and Design ARM Edition: The Hardware Software Interface - David A. Patterson and John L. Hennessy - Morgan Kaufmann - Organizes the field around Eight Great Ideas, including hierarchy of memories and performance via parallelism, and teaches with the 64-bit ARMv8-A instruction set. It frames why memory placement and Arm CPUs matter on DGX Spark.

6. [Hardware Overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html) - DGX Spark User Guide - Lists the GB10 system's 20 Arm cores, 128 GB of unified LPDDR5x memory, 273 GB/s bandwidth, NVMe storage options, and power budget. Provides the authoritative figures behind this chapter's worked example hardware.

7. [NVIDIA DGX OS 7 User Guide](https://docs.nvidia.com/dgx/dgx-os-7-user-guide/) - NVIDIA Documentation - Documents DGX OS 7 as a customized Ubuntu 24.04 with kernels for x86_64 and ARM64 systems, GPU driver branches, and CUDA toolkits. Explains the operating system layer this chapter places directly on the hardware.

8. [CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/) - NVIDIA Documentation - Official guide to the CUDA programming model, with sections on unified and system memory, Unified Memory, and a compute capabilities appendix. Clarifies the compute capability and unified memory concepts used in this chapter.

9. [NVIDIA Driver Installation Guide](https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/) - NVIDIA Documentation - Gives instructions and best practices for installing GPU drivers on Linux, including verifying module loading and aligning driver versions with CUDA releases. Backs this chapter's rule that the driver sets the ceiling for CUDA versions.

10. [nvidia-smi: NVIDIA System Management Interface](https://docs.nvidia.com/deploy/nvidia-smi/index.html) - NVIDIA Documentation - Documents the command-line tool that reports GPU temperature, power draw, memory use, and utilization as text, CSV, or XML. This is the tool the chapter uses to read the driver version, CUDA version, power, and thermals.
