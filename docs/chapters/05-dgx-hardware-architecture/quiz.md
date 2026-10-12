# Quiz: NVIDIA DGX Hardware Architecture

Test your understanding of the DGX family, memory arrangements, storage, power, and the software layers on the hardware with these review questions.

---

#### 1. What does a buyer of an NVIDIA DGX system receive?

<div class="upper-alpha" markdown>
1. A GPU card that the buyer installs in an existing server chassis
2. A cloud subscription that rents GPUs by the hour
3. A set of drivers to download for any Linux computer
4. A complete machine with hardware, OS, and GPU software matched
</div>

??? question "Show Answer"
    The correct answer is **D**. NVIDIA DGX is NVIDIA's line of systems built for AI work, sold as complete machines with the hardware, the operating system, and the GPU software already matched to each other. The driver, the compute libraries, and a container runtime arrive installed and known to work together, which removes the most common source of setup trouble on a self-assembled GPU server. The line ranges from a desktop box to an eight-GPU rack server.

    **Concept Tested:** NVIDIA DGX

    **See:** [NVIDIA DGX](index.md#nvidia-dgx)

---

#### 2. What is unified memory?

<div class="upper-alpha" markdown>
1. Memory mounted on the GPU's own board for its sole use
2. Disk space the system uses when its RAM runs out
3. A single memory pool shared by the CPU and the GPU
4. The combined memory of several GPUs in a single chassis
</div>

??? question "Show Answer"
    The correct answer is **C**. Unified memory is a single pool of memory shared by the CPU and the GPU, so both read and write the same physical chips. The GB10 uses it: its 128 GB is the whole of the machine's memory, and the GPU has no memory of its own. Memory mounted on the GPU's own board is dedicated GPU memory, the arrangement on a rack DGX, where each GPU's pool is a separate hard limit.

    **Concept Tested:** Unified Memory

    **See:** [Unified Memory](index.md#unified-memory)

---

#### 3. What is DGX OS?

<div class="upper-alpha" markdown>
1. An Ubuntu-based Linux with NVIDIA's components pre-installed
2. A firmware layer that runs beneath the Linux kernel
3. A container image that holds only an inference server
4. A Windows-based system tuned for GPU workstations
</div>

??? question "Show Answer"
    The correct answer is **A**. DGX OS is NVIDIA's operating system for DGX systems: a customized Linux distribution, based on Ubuntu, with the NVIDIA driver, CUDA, the container runtime, and system tuning installed and tested together. The unit in this evaluation runs DGX OS 7.4 on Ubuntu 24.04. The practical meaning is that ordinary Ubuntu instructions work, and that NVIDIA's own components are already present and compatible with each other.

    **Concept Tested:** DGX OS

    **See:** [DGX OS](index.md#dgx-os)

---

#### 4. Why does a GPU suit language-model inference?

<div class="upper-alpha" markdown>
1. It stores model weights far more compactly than system RAM is able to
2. It executes x86_64 and aarch64 programs equally well
3. It reads model files from disk faster than a CPU can
4. It runs many simple operations at once, suiting matrix arithmetic
</div>

??? question "Show Answer"
    The correct answer is **D**. A GPU is a processor built to run many simple operations at once. It began as hardware for drawing images, and its design turned out to suit the matrix arithmetic that neural networks consist of. A language model generating text is almost entirely matrix arithmetic, so a GPU does it far faster than a CPU can. Storage and compactness are not the reason. Without a GPU, the models in this course would take minutes per sentence.

    **Concept Tested:** GPU

    **See:** [GPU](index.md#gpu)

---

#### 5. Why does a single power-draw number mislead for a GPU-heavy machine?

<div class="upper-alpha" markdown>
1. Draw under load far exceeds draw at rest, so workload matters
2. Power draw is fixed by the chip's thermal design power
3. Electricity is the largest cost of owning the machine
4. The GPU reports power only when its memory is dedicated
</div>

??? question "Show Answer"
    The correct answer is **A**. Power draw is the electrical power the system consumes, in watts. A GPU-heavy machine draws far more under load than at rest, so a single number misleads, and a measurement needs the workload that produced it. Thermal design power is a cooling specification, not a measurement of draw. Electricity is also a small part of the cost of owning this machine: under $120 a year in the book's estimate.

    **Concept Tested:** Power Draw

    **See:** [Power Draw](index.md#power-draw)

---

#### 6. What does the `CUDA Version` shown in the first line of `nvidia-smi` output mean?

<div class="upper-alpha" markdown>
1. The version of the CUDA toolkit installed on the machine
2. The newest CUDA runtime the installed driver can support
3. The compute capability assigned to the GPU generation
4. The oldest CUDA runtime that programs are allowed to use
</div>

??? question "Show Answer"
    The correct answer is **B**. CUDA has two parts that are easy to confuse. The CUDA runtime is the set of libraries a program is built against, and it ships inside the programs that use it. The CUDA version in the `nvidia-smi` header is the newest runtime the installed driver can support, not the version of any toolkit on the machine. The driver therefore sets a ceiling: a framework built at or below that version runs, and one built above it does not.

    **Concept Tested:** CUDA

    **See:** [CUDA](index.md#cuda)

---

#### 7. You copy an install command from a tutorial. The download completes on your unit but the file fails when you run it, and `uname -m` prints `aarch64`. What should you do?

<div class="upper-alpha" markdown>
1. Find the build whose name says `arm64` or `aarch64`
2. Retry the same download until the file runs correctly
3. Update the NVIDIA driver to a newer release first
4. Free some disk space and run the downloaded file again
</div>

??? question "Show Answer"
    The correct answer is **A**. CPU architecture is the instruction set a processor executes, and x86_64 and aarch64 are not compatible: a program compiled for one cannot run on the other without translation. Many install pages offer an x86_64 file first, and a download that completes on an aarch64 machine still fails when you run it. The fix is to find the aarch64 build, whose name says `arm64` or `aarch64`, not to retry the same file.

    **Concept Tested:** CPU Architecture

    **See:** [CPU Architecture](index.md#cpu-architecture)

---

#### 8. A model's weights take 120 GB. A server has four GPUs with 80 GB of dedicated memory each and plenty of system RAM. How must the model be placed?

<div class="upper-alpha" markdown>
1. On one GPU, with the overflow held in system RAM
2. Split across at least two of the GPUs
3. In system RAM, with the GPUs doing the arithmetic
4. On one GPU, after the driver has been updated
</div>

??? question "Show Answer"
    The correct answer is **B**. Dedicated GPU memory belongs to one GPU alone, and a model placed on that GPU must fit entirely in it, because the GPU cannot use system RAM at full speed. Each 80 GB pool is a hard limit. A 120 GB model cannot go on one of these GPUs however much system RAM the server has, so it must be split across at least two, and the software that does the splitting is a setup step of its own.

    **Concept Tested:** Dedicated GPU Memory

    **See:** [Dedicated GPU Memory](index.md#dedicated-gpu-memory)

---

#### 9. A 30 GB model file is read from an NVMe drive at 2 GB per second. About how long does the model take to load?

<div class="upper-alpha" markdown>
1. About 2 seconds
2. About 7 seconds
3. About 10 seconds
4. About 15 seconds
</div>

??? question "Show Answer"
    The correct answer is **D**. Storage read speed is how many bytes per second the drive delivers, and for a model it sets the load time, the delay between asking for a model and being able to use it. The relation is simple division: 30 GB read at 2 GB per second takes 15 seconds. A server that unloads an idle model and reloads it on the next request pays this cost each time, which is why a fast drive matters.

    **Concept Tested:** Storage Read Speed

    **See:** [NVMe Storage and Storage Read Speed](index.md#nvme-storage-and-storage-read-speed)

---

#### 10. A program reports that it found no CUDA device, yet `nvidia-smi` lists the GPU and a driver version. Where does the problem most likely lie?

<div class="upper-alpha" markdown>
1. In the GPU hardware, which has failed and must be replaced
2. In the driver, which must be reinstalled before anything else can run
3. In a layer above the driver, such as the framework's CUDA build
4. In the storage layer, which cannot hold the model file
</div>

??? question "Show Answer"
    The correct answer is **C**. The NVIDIA driver is the software that lets the operating system and programs talk to the GPU. The first diagnostic step for a "no CUDA device" report is always to run `nvidia-smi`. If it lists the GPU and a driver version, the driver works, and the problem is in what is built on top of it, such as a framework built for a CUDA runtime above the driver's ceiling. Reinstalling the driver would repair a layer that is not broken.

    **Concept Tested:** NVIDIA Driver

    **See:** [NVIDIA Driver](index.md#nvidia-driver)
