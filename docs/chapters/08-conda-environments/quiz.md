# Quiz: Reproducible Python Environments with Conda

Test your understanding of isolated environments, conda commands, portable specifications, and rebuild checks with these review questions.

---

#### 1. What is a Python environment?

<div class="upper-alpha" markdown>
1. A server that hosts packages for conda to download
2. A file that lists packages with optional version pins
3. A system-wide Python shared by every project on a machine
4. A self-contained directory with an interpreter and its packages
</div>

??? question "Show Answer"
    The correct answer is **D**. A Python environment is a self-contained directory that holds a Python interpreter and the packages installed for it, together with a script that points your shell at them. Activating it puts its interpreter and packages first on your path, so `python` runs that interpreter and `import` finds those packages and no others. Because it is only a directory, you never repair a broken one: you delete it and rebuild it from the specification.

    **Concept Tested:** Python Environment

    **See:** [Python Environment](index.md#python-environment)

---

#### 2. What is Miniforge?

<div class="upper-alpha" markdown>
1. A commercial Python distribution that requires a paid license
2. A pip replacement that installs only Python packages
3. A minimal conda installer that defaults to the conda-forge channel
4. A build tool that compiles wheels for aarch64 machines
</div>

??? question "Show Answer"
    The correct answer is **C**. Miniforge is a minimal installer for conda that is set up to use the community-maintained conda-forge channel by default, and it is the installer this course uses. The alternative, a distribution from a commercial vendor, brings a default channel whose licensing terms can require a paid license for larger organizations. A book whose readers work in unknown organizations should not depend on that, which is why Miniforge was chosen.

    **Concept Tested:** Miniforge

    **See:** [Conda and Miniforge](index.md#conda-and-miniforge)

---

#### 3. Two documentation tools each pin a different version of the same package. Why does giving each tool its own environment fix the conflict?

<div class="upper-alpha" markdown>
1. Each environment downloads packages from a different channel
2. Conda merges the two versions into one compatible build
3. pip is allowed to override conda inside a shared environment
4. Neither tool then has to agree with the other on one version
</div>

??? question "Show Answer"
    The correct answer is **D**. Environment isolation keeps each environment separate so that a change in one cannot affect another. A package can exist in only one version at a time in one place, so two tools that pin different versions cannot both be satisfied in a shared environment: installing the second breaks the first. The fix was not a cleverer install. With one environment per tool, neither has to agree with the other.

    **Concept Tested:** Environment Isolation

    **See:** [Environment Isolation](index.md#environment-isolation)

---

#### 4. Why does the book advise installing with conda first and doing any pip installs last?

<div class="upper-alpha" markdown>
1. pip cannot run until conda has been removed from the path
2. pip can replace a conda package, leaving conda's record wrong
3. conda refuses to activate an environment that pip has touched
4. pip installs Python itself, which must follow the packages
</div>

??? question "Show Answer"
    The correct answer is **B**. Conda versus pip is a question of scope: pip handles only Python packages, while conda handles Python itself, non-Python libraries, and tools. The rule is to install with conda first, use pip only for what conda does not have, and do the pip installs last. Going back and forth lets pip replace a package that conda installed, and conda's record is then wrong about what is present in the environment.

    **Concept Tested:** Conda Versus pip

    **See:** [requirements.txt and Conda Versus pip](index.md#requirementstxt-and-conda-versus-pip)

---

#### 5. Why is `conda env export --from-history` portable across architectures when a full export is not?

<div class="upper-alpha" markdown>
1. It records exact builds, which are identical on every platform
2. It records only requested packages, so conda resolves the rest
3. It converts each build string to the target architecture
4. It leaves out the channel, so any server can supply packages
</div>

??? question "Show Answer"
    The correct answer is **B**. The two export forms record different things. A full `conda env export` lists every package with its exact build, and builds are specific to one platform, so rebuilding on another platform fails with packages that cannot be found. Exporting with `--from-history` records only the packages you asked for, and conda resolves the rest for the new platform. The price is that each dependency resolves to whatever is current unless you pin it yourself.

    **Concept Tested:** Conda List and Export

    **See:** [Conda List and Export](index.md#conda-list-and-export)

---

#### 6. You need a new environment named `probe`, built from conda-forge, with Python pinned to 3.12 and `psutil` installed. Which command does this?

<div class="upper-alpha" markdown>
1. `conda activate probe -c conda-forge python=3.12 psutil`
2. `conda env remove -n probe -c conda-forge python=3.12`
3. `conda create -c probe -n conda-forge python psutil=3.12`
4. `conda create -n probe -c conda-forge python=3.12 psutil`
</div>

??? question "Show Answer"
    The correct answer is **D**. The conda create command makes a new environment. `-n probe` names it, `-c conda-forge` names the channel to search, and everything after is the packages to install, with a version after an equals sign as a pin. Writing `python=3.12` fixes the major and minor version, and `psutil` is left unpinned. `conda activate` only switches the shell into an existing environment, and `conda env remove` deletes one.

    **Concept Tested:** Conda Create Command

    **See:** [The Create, Activate, and Remove Commands](index.md#the-create-activate-and-remove-commands)

---

#### 7. A script running in a non-interactive shell fails at the line `conda activate dgx` with a "command not found" error. What should the script do instead?

<div class="upper-alpha" markdown>
1. Use `conda run -n dgx <command>` or the full executable path
2. Put `sudo` in front of the `conda activate dgx` line
3. Reinstall Miniforge so that the activate function exists
4. Run `conda env remove -n dgx` and create the environment again
</div>

??? question "Show Answer"
    The correct answer is **A**. The `conda activate` function is defined by your shell's startup files, so a script or an agent running in a non-interactive shell may fail with a permission or "command not found" error. The fix is to call the environment's executables by their full path, or to use `conda run -n dgx <command>`. Nothing is wrong with the environment or the installer, so removing or reinstalling either one does not address the cause.

    **Concept Tested:** Conda Activate Command

    **See:** [The Create, Activate, and Remove Commands](index.md#the-create-activate-and-remove-commands)

---

#### 8. After you install PyTorch on the DGX, `import torch` succeeds. How do you confirm that this build can use the GPU?

<div class="upper-alpha" markdown>
1. Check that `torch.cuda.is_available()` returns `True`
2. Check that `import torch` finishes without any error
3. Check that `conda list` shows a `torch` package entry
4. Check that `uname -m` prints `aarch64` on the machine
</div>

??? question "Show Answer"
    The correct answer is **A**. CUDA-enabled PyTorch is the build compiled to use an NVIDIA GPU. The default install on some platforms is a CPU-only build, and it imports without any error, so a successful `import torch` proves nothing about the GPU. `torch.cuda.is_available()` returns `True` only if the driver and a GPU are usable, and `torch.version.cuda` is `None` for a CPU-only build. A model that silently runs on the CPU looks like a performance problem when it is an install problem.

    **Concept Tested:** CUDA-Enabled PyTorch

    **See:** [PyTorch and CUDA-Enabled PyTorch](index.md#pytorch-and-cuda-enabled-pytorch)

---

#### 9. On an aarch64 DGX, a `pip install` of one package runs for a long time, asks for a compiler, and then fails. What is the most likely cause?

<div class="upper-alpha" markdown>
1. The environment's Python version was pinned to 3.12
2. The package was requested from the conda-forge channel
3. The package has no aarch64 wheel, so pip built from source
4. The NVIDIA driver is older than the package's CUDA build requires
</div>

??? question "Show Answer"
    The correct answer is **C**. A wheel is a built Python package, and an architecture-specific wheel is built for one processor architecture, named in its filename. On an aarch64 machine pip accepts only wheels whose last tag is `aarch64`. If a package publishes only x86_64 wheels, pip falls back to compiling it from source, which is slow, needs a compiler, and can fail. That pattern points to a missing wheel, not to the Python pin or the GPU driver.

    **Concept Tested:** Architecture-Specific Wheels

    **See:** [Architecture-Specific Wheels](index.md#architecture-specific-wheels)

---

#### 10. After you rebuild `environment.yml` into a throwaway environment, the `diff` of the two package lists shows three differing lines. What do those lines indicate?

<div class="upper-alpha" markdown>
1. The rebuild ran on a different processor architecture
2. The original environment is corrupted and must be removed at once
3. Unpinned packages resolved to newer releases; pin them next
4. The specification named a package channel that no longer exists
</div>

??? question "Show Answer"
    The correct answer is **C**. An environment rebuild creates the environment again from its specification and compares it with the original. A specification you have never rebuilt from is an unverified claim, and the rebuild is the test. An empty `diff` means the rebuild matches. A few differing lines are the packages that were not pinned and resolved to a newer release, and they are exactly what to pin next. They do not mean the original environment is damaged.

    **Concept Tested:** Environment Rebuild

    **See:** [Environment Rebuild](index.md#environment-rebuild)
