---
title: 'Getting Started: Reaching the DGX from Your Laptop'
description: 'The setup steps this evaluation used to reach a DGX over Tailscale from a laptop: a conda environment for the tools, key-based SSH, and a read-only hardware inventory.'
---

# Getting Started

This page records the setup steps this evaluation actually performed, in the
order they were done. By the end, a laptop can open a shell on the DGX with no
password prompt, and you know what hardware and software the DGX has.

Every step ends with a test. Run the test before moving on, so a failure shows
up at the step that caused it.

!!! warning "Placeholders, not real values"

    This site is public, so every address, hostname, and login on this page is
    a placeholder: `100.x.y.z`, `<dgx-host>`, and `<user>`. Substitute the
    values your administrator gives you, and never copy your real ones into a
    file you plan to publish.

## What You Need

- A laptop with [Miniforge](https://conda-forge.org/download/) installed. These
  steps were run on macOS, and they are the same on Linux.
- A user account on the DGX, created by its administrator.
- An invitation to the administrator's tailnet, or a share of the DGX into
  your own tailnet.

## Step 1: Create the `dgx` Conda Environment

The tools for reaching the DGX live in their own conda environment named
`dgx`. Keeping them separate from the environment that builds this book means
neither one can break the other.

Tailscale comes from conda-forge as two packages. `tailscale` is the
command-line client, and `tailscaled` is the daemon the client talks to. The
client does nothing without the daemon, so install both, at the same version.

```bash
conda create -n dgx -c conda-forge tailscale tailscaled
conda activate dgx
```

Activate the environment in every new terminal before you use these tools.

**Test:** both commands print the same version number.

```bash
tailscale version
tailscaled --version
```

## Step 2: Start the Daemon and Join the Tailnet

The daemon creates a network interface, which requires administrator rights on
the laptop. `sudo` discards the conda `PATH`, so give it the full path to the
binary. Run this in its own terminal tab and leave it running.

```bash
sudo "$CONDA_PREFIX/bin/tailscaled"
```

In a second tab, with `dgx` activated, join the tailnet.

```bash
tailscale up
```

The command prints a login URL. Open it and sign in with the account the
administrator invited. Signing in with a different account joins a different
tailnet, and the DGX will not appear.

**Test:** the DGX is listed next to your laptop.

```bash
tailscale status
```

```text
100.x.y.z   <laptop-name>   <you>@     macOS   -
100.x.y.z   <dgx-host>      <admin>@   linux   -
```

## Step 3: Log In Once with Your Password

Connect with ordinary SSH, using the DGX's tailnet address. Linux login names
are case-sensitive, so type yours exactly as the administrator created it.

```bash
ssh <user>@100.x.y.z
```

The first connection asks you to accept the DGX's host key. Compare the
fingerprint it shows with the one your administrator reports before you answer
`yes`. Then enter your password.

**Test:** you see the DGX login banner and a shell prompt on the DGX. Type
`exit` to return to the laptop.

!!! note "You do not need `tailscale set --ssh` on the laptop"

    That command turns on the Tailscale SSH *server* on the machine where it
    runs. It belongs on the DGX, and only if the administrator chooses
    Tailscale SSH. A DGX that accepts ordinary OpenSSH logins over the tailnet,
    as this one does, needs nothing extra on either side.

## Step 4: Switch to Key-Based Login

Scripts, benchmark runners, and AI agents cannot type a password. An SSH key
lets them log in unattended. Create one on the laptop, then install its public
half on the DGX.

```bash
ssh-keygen -t ed25519
```

```bash
ssh-copy-id <user>@100.x.y.z
```

`ssh-copy-id` asks for your password one last time. If you are evaluating more
than one DGX, repeat it for each address.

**Test:** the command below prints the DGX's hostname without prompting.
`BatchMode` makes SSH fail instead of asking for a password, which is exactly
what an unattended script needs.

```bash
ssh -o BatchMode=yes <user>@100.x.y.z hostname
```

!!! warning "A key with no passphrase is a password in a file"

    Leaving the passphrase empty is what allows unattended logins, and it also
    means the private key file alone is enough to reach the DGX. Keep
    `~/.ssh/id_ed25519` on the laptop, never commit it, and tell the
    administrator that you installed a key on their machine.

## Step 5: Take a Read-Only Inventory

Before installing anything, find out what the DGX already has. These commands
change nothing and need no administrator rights.

```bash
ssh <user>@100.x.y.z '
  grep -E "^(NAME|VERSION)=" /etc/os-release
  uname -srm
  lscpu | grep -E "^(Architecture|CPU\(s\)|Model name)"
  free -h
  df -h /
  nvidia-smi
  docker --version
  python3 --version
  id -nG
'
```

!!! warning "Some system files contain identifiers"

    On DGX OS, `/etc/dgx-release` includes the unit's serial number. Filter it
    out with `grep -v SERIAL /etc/dgx-release`, and read any captured output
    before you save or share it.

The two units in this evaluation reported identical configurations:

| Component | Result |
|---|---|
| System | DGX Spark-class desktop, aarch64 |
| Operating system | DGX OS 7.4 on Ubuntu 24.04, Linux kernel 6.17 |
| CPU | 20 Arm cores: 10 Cortex-X925 and 10 Cortex-A725 |
| Memory | 128 GB unified memory, shared by the CPU and the GPU |
| Storage | 1 TB NVMe SSD, about 780 GB free |
| GPU | NVIDIA GB10, Blackwell architecture, 6,144 CUDA cores |
| GPU software | NVIDIA driver 580, CUDA 13.0 |
| Containers | Docker 29.1 with NVIDIA Container Toolkit 1.18 |
| Python | 3.12, with `pip` and `venv` |
| Build tools | `gcc`, `cmake`, `git`, `curl` |
| Model runtimes | None installed |

The inventory commands do not report the GPU's core count. The 6,144 figure
comes from NVIDIA's published
[DGX Spark hardware overview](https://docs.nvidia.com/dgx/dgx-spark/hardware.html),
and it is the one row in this table that was looked up, not measured.

On this system `nvidia-smi` reports GPU memory as `Not Supported`. The GPU has
no memory of its own: it shares the system's unified memory with the CPU. Read
memory use from `free -h` on a unified-memory system, not from `nvidia-smi`.

**Test:** `nvidia-smi` lists a GPU, and you can state the memory, free disk
space, and CUDA version without guessing.

## Step 6: Ask for Docker Access

The inventory's last line, `id -nG`, lists the groups your account belongs to.
At first this account was in no group but its own, so every Docker command
failed with `permission denied`. Only the administrator can change that, with
one command on each DGX:

```bash
sudo usermod -aG docker <user>
```

Membership in the `docker` group is equivalent to administrator access on that
machine, so this is the administrator's decision to make. The change applies
to new logins.

**Test:** `docker` appears in your groups, and Docker answers without an error.

```bash
ssh <user>@100.x.y.z 'id -nG; docker ps'
```

## Where This Leaves You

The laptop reaches the DGX over an encrypted tailnet, logs in without a
password, and can run containers. The DGX has a GPU, CUDA, and plenty of free
disk, and no model or inference server yet. Choosing and installing those is
the next step of the evaluation.
