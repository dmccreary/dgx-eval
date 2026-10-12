# Quiz: Python Hardware Probes

Test your understanding of read-only probes, the `nvidia-smi` query, machine-readable reports, and vitals logging with these review questions.

---

#### 1. What is a hardware probe?

<div class="upper-alpha" markdown>
1. A specification sheet that the hardware's vendor has published
2. A small, read-only measurement of one fact about a machine
3. A stress test that loads the GPU until it throttles
4. A background service that restarts a frozen machine
</div>

??? question "Show Answer"
    The correct answer is **B**. A hardware probe is a small, read-only measurement of one fact about a machine: how many cores it has, how much memory is free, which GPU is installed. The word "measurement" matters. A probe reads the value from the machine, so it reports what is true now, whatever the specification sheet or the last person's notes say. It has three parts: the question, the source it reads, and the form of the answer.

    **Concept Tested:** Hardware Probe

    **See:** [Hardware Probe](index.md#hardware-probe)

---

#### 2. What does the absence of the `nvidia-smi` command on a machine usually mean?

<div class="upper-alpha" markdown>
1. The GPU has overheated and shut itself down
2. The machine uses unified memory for its GPU
3. The NVIDIA driver is not installed on the machine
4. The account lacks administrator privileges
</div>

??? question "Show Answer"
    The correct answer is **C**. `nvidia-smi`, the NVIDIA System Management Interface, is the command-line tool that reports a GPU's state. It is installed with the driver, so its presence on a machine is itself a probe: no `nvidia-smi` usually means no driver. Unified memory shows up differently, as GPU memory fields that come back as `Not Supported` or `[N/A]` from a tool that is present and working.

    **Concept Tested:** nvidia-smi

    **See:** [nvidia-smi and Its Output](index.md#nvidia-smi-and-its-output)

---

#### 3. Why is `MemAvailable` the number to watch in the RAM probe, and not `MemTotal`?

<div class="upper-alpha" markdown>
1. It is what a new program could use without pushing others out
2. It is the only figure the kernel reports in gibibytes
3. It includes the dedicated memory of every GPU on every kind of system
4. It stays constant while a model server is running
</div>

??? question "Show Answer"
    The correct answer is **A**. The RAM probe reads `/proc/meminfo`. `MemTotal` is all the memory the system can use, and `MemAvailable` is what a new program could use without pushing others out. Available is the number to watch, because a large total with little available is a machine about to struggle. On a unified-memory machine it is also the figure that model fit is judged against, since the GPU has no memory of its own.

    **Concept Tested:** RAM Probe

    **See:** [RAM Probe](index.md#ram-probe)

---

#### 4. Why should a script avoid parsing the table that `nvidia-smi` prints when run with no arguments?

<div class="upper-alpha" markdown>
1. The table leaves out the GPU's temperature and power
2. The table is printed only when the driver is missing
3. The table can be read only with administrator rights
4. The table's layout changes between versions
</div>

??? question "Show Answer"
    The correct answer is **D**. Run with no arguments, `nvidia-smi` prints a table meant for people. A script should not parse it, because its layout changes between versions. The GPU probe instead asks for exactly the fields it wants with `--query-gpu` and `--format=csv,noheader,nounits`, which returns one comma-separated line per GPU. The table does show temperature and power, and it needs no administrator rights, so neither of those is the reason.

    **Concept Tested:** nvidia-smi Output

    **See:** [nvidia-smi and Its Output](index.md#nvidia-smi-and-its-output)

---

#### 5. Why does the probe suite write a machine-readable report?

<div class="upper-alpha" markdown>
1. Later programs consume it, such as a model-fit calculator
2. It is shorter than the table that `nvidia-smi` prints
3. It can hold hostnames and serial numbers in a safely encoded form
4. It lets a probe change the settings of the machine that it reads
</div>

??? question "Show Answer"
    The correct answer is **A**. A machine-readable report is output a program can parse without guessing, in contrast to text written for a person. The reason to produce one is that later steps consume it: a model-fit calculator reads `available_gib`, and a benchmark runner records the whole report beside each result so a number is never separated from the machine that produced it. The report deliberately contains no hostname, address, or account name.

    **Concept Tested:** Machine-Readable Report

    **See:** [Machine-Readable Report and JSON Report](index.md#machine-readable-report-and-json-report)

---

#### 6. A probe report shows `memory_total_mib: null` for the only GPU and `unified_memory: true`. Which figure should you use to judge whether a model fits?

<div class="upper-alpha" markdown>
1. The GPU's `power_w` reading from the same report
2. The storage probe's `free_gb` for the root filesystem
3. The RAM probe's `total_gib`, with nothing subtracted
4. The RAM probe's `available_gib`, less some headroom
</div>

??? question "Show Answer"
    The correct answer is **D**. The unified memory probe is the check that the GPU's own memory fields are missing. When every GPU's total comes back as `None`, the probe sets `unified_memory` to true, and the figure to use is the system RAM probe's `available_gib`, minus the headroom Chapter 11 introduces. The `null` values are not an error; they are the unified-memory signature. Using `total_gib` would ignore what the operating system and other programs already hold.

    **Concept Tested:** Unified Memory Probe

    **See:** [GPU Memory Total and Free, and the Unified Memory Probe](index.md#gpu-memory-total-and-free-and-the-unified-memory-probe)

---

#### 7. You time a read of a model file that you loaded five minutes ago, and the measured speed is far higher than expected. What should you do?

<div class="upper-alpha" markdown>
1. Record the figure as the true read speed of the drive
2. Rerun on a file that has not been read since boot
3. Divide the result by the number of CPU cores
4. Rerun the same file with the GPU sitting idle
</div>

??? question "Show Answer"
    The correct answer is **B**. A disk read benchmark reads an existing large file and divides the bytes by the seconds. The one trap is the operating system's page cache: a file read recently comes from memory, not the disk, so the number is far too high. The fix is to read a file that has not been touched since boot, such as a model file you have not loaded, and to say so in the report.

    **Concept Tested:** Disk Read Benchmark

    **See:** [Disk Read Benchmark](index.md#disk-read-benchmark)

---

#### 8. You are about to start a run that will last several hours on a unit that has stopped responding before. What should you start first?

<div class="upper-alpha" markdown>
1. A disk read benchmark on the largest model file
2. A vitals log that writes and syncs a line every 30 seconds
3. A probe verification test against a fake `meminfo` file
4. A full `nvidia-smi` table, saved once before the run
</div>

??? question "Show Answer"
    The correct answer is **B**. Vitals logging records a few measurements at a fixed interval while a long job runs, so a machine that fails leaves its last readings behind. The loop writes one line every 30 seconds with available memory, GPU temperature, and power draw, and `flush` and `fsync` put each line on the disk at once, because a machine that freezes does not get to finish its buffers. A single snapshot taken before the run records nothing about the failure.

    **Concept Tested:** Vitals Logging

    **See:** [Vitals Logging](index.md#vitals-logging)

---

#### 9. A probe returns 0 whenever it cannot read a value, and a report from a healthy machine shows `available_gib: 0`. What is wrong with this design?

<div class="upper-alpha" markdown>
1. Zero is not valid JSON, so the report cannot be parsed
2. The probe should keep retrying until the value becomes nonzero
3. A failed reading cannot be told apart from a measured zero
4. The probe should have read the value with `psutil`
</div>

??? question "Show Answer"
    The correct answer is **C**. A probe script should report an unknown value as `null` and never guess. If a probe returns zero when it cannot read a value, a failed measurement looks like a machine with no memory, and the report appears complete while hiding the failure. Returning `null` lets a reader tell a missing measurement from a measured zero. Retrying without limit is no fix, because a probe must also have a bounded run time.

    **Concept Tested:** Probe Script

    **See:** [Probe Script](index.md#probe-script)

---

#### 10. The suite runs on a machine with no GPU, where `nvidia-smi` is missing, yet the report still contains CPU, RAM, and storage results. Which design choices explain this?

<div class="upper-alpha" markdown>
1. The suite retries `nvidia-smi` until the GPU driver finally responds
2. The suite copies GPU values from the last saved report
3. The suite stops at the first error and prints whatever it has so far
4. Separate probes and a helper that returns `None` on failure
</div>

??? question "Show Answer"
    The correct answer is **D**. A probe suite runs a set of probes together to produce one report. Every probe goes through a helper that returns `None` when a command is missing, fails, or times out, so a missing `nvidia-smi` gives an empty GPU answer instead of a crash. Keeping the probes separate and the suite thin means a single failing probe cannot take the others with it, and each probe can be tested alone.

    **Concept Tested:** Probe Suite

    **See:** [Probe Suite](index.md#probe-suite)
