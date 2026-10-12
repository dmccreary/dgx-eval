---
title: "Installing Tailscale and Taking a Read-Only Inventory"
description: "Installing the Tailscale client and daemon in a dedicated environment, authenticating, testing the connection, and taking a first read-only inventory of the DGX over SSH."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:07:46"
version: 1.11
---

# Installing Tailscale and Taking a Read-Only Inventory

## Summary

This chapter puts the mesh VPN concepts to work. Students install Tailscale in a dedicated environment, authenticate the DGX, configure names and access controls, and test connectivity, then run read-only inventory commands over SSH. They finish with a verified, encrypted path to the machine and a first look at what it contains.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Linux Inventory Commands | 7 |
| Standard-Library-Only Python | 2 |
| Read-Only Inventory | 5 |
| Piping Scripts Over SSH | 1 |
| Tailscale Installation | 14 |
| MagicDNS | 3 |
| Access Control List | 3 |
| Tailscale Ping | 2 |
| Tailnet Invitation | 1 |
| Node Sharing | 1 |
| Tailscale Daemon | 13 |
| Tailscale SSH | 1 |
| Tailscale Authentication | 9 |
| Tailscale Up Command | 3 |
| Tailscale Auth Key | 7 |
| Tailscale Status Command | 2 |
| Device Key Expiry | 1 |
| Connectivity Test | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)
- [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../07-remote-access-ssh-mesh-vpn/index.md)
- [Chapter 8: Reproducible Python Environments with Conda](../08-conda-environments/index.md)

---

!!! mascot-welcome "From Concept to a Working Connection"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Chapter 7 explained the path, and now you build it, one step at a time with a test after each. By the end you will have a verified, encrypted route to the DGX and a first look at what is inside it, without having changed anything on the machine. Measure first, then decide!

## What This Chapter Covers

This is the first hands-on chapter. It follows the order the evaluation itself used, and each step ends with a test, so that a failure appears at the step that caused it instead of three layers later. A step that "seems to work" without a test is the most common source of confusion later in a setup.

The chapter has two halves. The first half installs Tailscale in the `dgx` conda environment from Chapter 8, signs in, and proves the connection with three increasingly strong tests. The second half uses that connection to take a read-only inventory, which answers the hardware questions of Chapter 5 for the real machine without installing or changing anything on it.

!!! warning "Placeholders, not real values"

    This site is public, so every address, hostname, and login in this chapter is a placeholder: `100.x.y.z`, `<dgx-host>`, `<user>`, and `<tailnet-name>`. Substitute the values your administrator gives you, and never copy your real ones into a file you plan to publish.

## Installing Tailscale

### Tailscale Installation

**Tailscale installation** here means installing the open-source command-line client and its daemon into a dedicated conda environment, so that the tooling for reaching the DGX is isolated and removable. The alternative is the graphical application for your operating system, which is simpler to run and sits outside the environment. This course uses the environment because Chapter 8's discipline of one environment per tool applies to the tool that every other step depends on.

The two conda-forge packages are named `tailscale`, the client, and `tailscaled`, the daemon. The client does nothing without the daemon, so install both, at the same version.

```bash
conda create -n dgx -c conda-forge tailscale tailscaled
conda activate dgx
```

The test is that both commands print the same version number.

```bash
tailscale version
tailscaled --version
```

### Tailscale Daemon

The **Tailscale daemon**, `tailscaled`, is the background process that creates the network interface, holds the encryption keys, and maintains the connections. The client program you type commands into only talks to the daemon.

Creating a network interface requires administrator rights on the laptop, so the daemon is started with `sudo`. A detail catches people here: `sudo` discards the conda `PATH`, so give it the full path to the binary. Run it in its own terminal tab and leave it running.

```bash
sudo "$CONDA_PREFIX/bin/tailscaled"
```

!!! mascot-warning "A Daemon That Is Not Running Looks Like a Broken Network"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If `tailscale status` says it cannot connect to the daemon, the cause is almost always that `tailscaled` is not running, for example because it does not survive a reboot or a closed tab. Restart it in its own tab before suspecting the DGX, the router, or your account.

### Tailscale Up Command

The **`tailscale up` command** brings the device onto the tailnet. Run in a second tab, with `dgx` activated, it asks the daemon to connect and sign in.

```bash
tailscale up
```

On the first run the command prints a sign-in address. It is the next concept.

## Signing In

### Tailscale Authentication

**Tailscale authentication** is proving who you are to the coordination service, so that your device is added to the right tailnet. The usual way is to open the sign-in address that `tailscale up` printed and log in with an identity account, in a browser. The device is then bound to that identity.

A mistake costs time and is easy to make. Signing in with a different account than the one the administrator invited creates or joins a different tailnet, and the DGX will not appear in your device list. If the listing shows only your own laptop, compare the account on the sign-in page with the one the invitation was sent to.

### Tailnet Invitation and Node Sharing

There are two ways to get a DGX that belongs to someone else onto your device list, and they are different arrangements.

A **tailnet invitation** adds you to the administrator's tailnet as a member. You then see every device the access rules allow, and you are subject to that tailnet's policy. This is how the evaluation was set up: the Administrator invited the Primary Author, and both units were already members.

**Node sharing** shares one specific device into your own tailnet, without making you a member of theirs. You see only the shared machine, and the owner keeps control of it. It suits a case where you have your own tailnet and need access to one machine for a limited time.

| | Tailnet invitation | Node sharing |
|---|---|---|
| You become | A member of their tailnet | A guest with access to one device |
| You can see | Whatever the access rules allow | Only the shared device |
| Whose policy applies | Theirs | Theirs, for that device |
| Good for | A team working on shared machines | Giving one outsider temporary access |

### Tailscale Auth Key

A **Tailscale auth key** is a pre-generated credential that lets a device join a tailnet without a person signing in through a browser. It exists for machines that nobody sits at, such as a server brought up by a script. Keys can be limited to one use, can expire, and can mark the device as temporary.

An auth key is equivalent to a password for joining the network. Treat it exactly that way: never put one in a repository, a chat, a screenshot, or a log, and prefer a key that expires soon and works once. The key is created by the tailnet's administrator, and an evaluator who is a guest of that tailnet usually does not need one.

### Device Key Expiry

**Device key expiry** is the limit on how long a device's credentials stay valid before it must sign in again. It is 180 days by default, and the tailnet's administrator can change it. A machine that is not used for months can have silently dropped off the network when its key expired, and the first sign is a device that shows as offline with no other explanation.

The fix is to sign in again from the device. For a machine you do not sit at, it is a reason to put a note on the calendar and a reason to tell the administrator who needs to know.

## Names and Rules

### MagicDNS

**MagicDNS** is Tailscale's feature that gives every device in a tailnet a name that resolves to its private address, so you type `<dgx-host>` and not `100.x.y.z`. Names are stable even if the address changes, and a script written against the name keeps working.

A short name resolves from inside the tailnet, and the full name carries the tailnet's own name, in the form `<dgx-host>.<tailnet-name>.ts.net`. Both are identifying details, and in anything you publish, they are placeholders.

### Access Control List

An **access control list**, or ACL, is the tailnet's policy for who may reach what. It is a document kept by the tailnet's administrator, and it lists which users and devices may open connections to which machines and on which ports. A device that is in the tailnet but not permitted by the list simply cannot connect, and it shows no error beyond a timeout.

A minimal rule has three parts. Its `action` is `accept`. Its `src` lists who may connect, and its `dst` lists what they may reach, with a port after the colon.

```json
{
  "acls": [
    { "action": "accept", "src": ["<tailnet-user>"], "dst": ["<dgx-host>:22"] }
  ]
}
```

That rule lets one user reach one machine on the SSH port and nothing else. A real policy file reveals which machines exist and which ports are open, so it is on the list of things that are never published.

### Tailscale SSH

**Tailscale SSH** is a feature in which Tailscale itself handles SSH authentication, using the tailnet identity in place of keys. It runs on the machine you are logging in to, and it needs to be turned on there with `tailscale set --ssh`. That change belongs to the administrator of the DGX.

This evaluation did not use it. The DGX accepted ordinary OpenSSH logins over the tailnet, so the key-based login of Chapter 7 was enough, and nothing had to change on the machine. Tailscale SSH is worth knowing about because it removes the private key as an asset to protect.

## Proving the Connection Works

### Tailscale Status Command

The **`tailscale status` command** lists every device in your tailnet that you can see, with its private address, name, owner, operating system, and connection state. It is the first test after sign-in, and its output is the evidence that the DGX is reachable at all.

A sanitized listing looks like this. Each row has the address, the device name, the owner, the operating system, and the state.

```text
100.x.y.z   <laptop-name>   <you>@    macOS   -
100.x.y.z   <dgx-host-a>    <admin>@  linux   active; direct 198.51.100.7:41641
100.x.y.z   <dgx-host-b>    <admin>@  linux   idle
```

The last column is the one to learn to read. A dash marks this device. `active; direct` means the two devices are exchanging data over a direct path, and an address after it shows where. `active; relay` means the traffic is going through a relay. `idle` means connected with nothing in flight, and `offline` with a time means the device has not been reachable.

### Tailscale Ping and the Connectivity Test

**Tailscale ping** tests the connection at the tailnet layer, below SSH. It sends a probe to the device and reports the path it used and the time it took. It is stronger than status, because status says a device is listed and ping shows that packets actually reach it.

```text
pong from <dgx-host> (100.x.y.z) via DERP(<region>) in 38ms
pong from <dgx-host> (100.x.y.z) via 198.51.100.7:41641 in 12ms
```

The pair above shows a common sequence. The first reply went through a relay. A moment later the devices found a direct path and the following replies took it, which is NAT traversal from Chapter 7 happening in front of you.

A **connectivity test** is the complete check, and it has three steps in order, each one proving something the previous did not.

| Step | Command | What it proves |
|---|---|---|
| 1 | `tailscale status` | The device is listed and its state is not offline |
| 2 | `tailscale ping <dgx-host>` | Packets reach the device, and which path they take |
| 3 | `ssh -o BatchMode=yes <user>@<dgx-host> hostname` | The login works with a key, with no prompt |

A failure at a step tells you which layer to look at. Step 1 failing points to your daemon or your account, step 2 to the network path or the access rules, and step 3 to the SSH server or your key.

#### Diagram: Tailscale Status Reader


<iframe src="../../sims/tailscale-status-reader/main.html" width="100%" height="534px" scrolling="no"></iframe>
[Run Tailscale Status Reader Fullscreen](../../sims/tailscale-status-reader/main.html)

<details markdown="1">
<summary>Tailscale Status Reader</summary>
Type: microsim
**sim-id:** tailscale-status-reader<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** interpret<br/>
**Learning Objective:** The learner will interpret 6 sanitized lines of Tailscale output by choosing the meaning of each, with at least 5 of 6 correct.

**Prerequisites:** tailscale status command, tailscale ping, device key expiry, DERP relay, peer-to-peer connection (all defined in the sections above this block and in Chapter 7).

**Evidence of Mastery:** For each of the 6 lines the learner commits one meaning from the six listed in Content before the sim reveals the answer. A choice is correct when it equals the Correct meaning column. Mastery is 5 of 6 correct on the first attempt. Reading the line is exploration, not evidence.

**Misconceptions:** (1) `idle` means the device is down. (2) A relay connection is a failure. (3) A listed device is reachable. (4) A dash in the last column means something is wrong.

**Instructional Rationale:** Interpreting needs the learner to turn a terse string into a statement about the system, so each line is a realistic fragment with exactly one correct reading. Committing before the reveal separates reading from guessing.

**Content:**

The six meanings the learner chooses from: "This device", "Connected directly", "Connected through a relay", "Connected but idle", "Offline, not reachable", and "This device has not signed in".

| # | Line shown to the learner | Correct meaning | Why (shown as feedback) |
|---|---|---|---|
| 1 | `100.x.y.z   <laptop-name>   <you>@   macOS   -` | This device | A dash in the state column marks the device running the command. |
| 2 | `100.x.y.z   <dgx-host>   <admin>@   linux   active; direct 198.51.100.7:41641` | Connected directly | `direct` followed by an address means a peer-to-peer path is in use. |
| 3 | `100.x.y.z   <dgx-host>   <admin>@   linux   active; relay "<region>"` | Connected through a relay | `relay` means the encrypted traffic goes through a relay server. |
| 4 | `100.x.y.z   <dgx-host>   <admin>@   linux   idle` | Connected but idle | `idle` means connected with no traffic in flight at the moment. |
| 5 | `100.x.y.z   <dgx-host>   <admin>@   linux   offline, last seen 13h ago` | Offline, not reachable | `offline` with a time means the device has not been reachable for that long. |
| 6 | `Logged out.` | This device has not signed in | The daemon is running but this device has no identity on the tailnet. |

**Provenance:** The lines are synthetic, modeled on the output format of the command, and the sim labels them "synthetic example". Addresses use placeholders and a documentation address range.

**Rules:** Lines are shown in the fixed order 1 to 6. Each line allows one final choice, and exactly one of the six meanings is correct for each line.

**Learner Activity:**

1. The learner reads line 1.
2. The learner chooses one of the six meanings and confirms.
3. The sim shows the correct meaning and the Why text, and marks the line correct or incorrect.
4. The learner repeats for lines 2 to 6. After line 6 the sim shows the score and the misconception behind each miss.

**Feedback:** Six lines, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct meaning and the Why text. The final score reads "n of 6 correct".

**Starting State:** Line 1 is shown with no meaning chosen, and the question on screen is "What is this line telling you?"

**Chapter Anchors:** The chapter states that a dash marks this device, that `active; direct` means a peer-to-peer path, that `relay` means traffic goes through a relay server, that `idle` means no traffic at the moment, and that `offline` with a time means the device was not reachable for that long.
</details>

## The Read-Only Inventory

### Read-Only Inventory

A **read-only inventory** is a survey of a machine's hardware and software made with commands that change nothing and need no administrator rights. It is the first thing to do on any machine you do not know, and it is the right first thing to do on one that belongs to someone else, because it answers the hardware questions of Chapter 5 without asking permission to install anything.

### Linux Inventory Commands

A small set of standard commands covers the questions. Each prints a few lines and writes nothing.

| Question | Command | What to read |
|---|---|---|
| Which operating system? | `grep PRETTY_NAME /etc/os-release` | Name and release |
| Which kernel and architecture? | `uname -srm` | `aarch64` or `x86_64` |
| Which processor? | `lscpu` | Core count, model name |
| How much memory? | `free -h` | Total and available |
| How much disk? | `df -h /` | Size and free space |
| Which GPU and driver? | `nvidia-smi` | Name, driver, CUDA version |
| Are containers available? | `docker --version` | Present or not |
| Which groups am I in? | `id -nG` | Whether `docker` is listed |

!!! mascot-tip "Run the Inventory Before You Install Anything"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A five-minute read-only look tells you whether a plan is possible: the architecture, the free space, whether Docker answers. Finding out after a two-hour download that the disk is full is a much worse way to learn it.

### Piping Scripts Over SSH

**Piping a script over SSH** runs a local file on a remote machine without copying it there first. The shell on the DGX reads the script from its standard input, so nothing is written to the machine's disk. It is the right method for an inventory, because it leaves no trace and needs no permission to write anywhere.

The command below sends the local file `inventory.sh` to the remote `bash`, where `-s` tells it to read the commands from standard input, and saves the output on your own machine.

```bash
ssh <user>@<dgx-host> 'bash -s' < src/dgx-setup/inventory.sh > inventory.txt
```

### Standard-Library-Only Python

**Standard-library-only Python** is a script that imports only modules that ship with Python itself. It runs on a fresh machine with no `pip install`, no environment, and no administrator rights. Every script this project runs on the DGX is written this way, for exactly that reason: the machine needs nothing added before the first measurement.

The cost is real and accepted. Without the `psutil` package, memory and CPU figures are read from files such as `/proc/meminfo`, and GPU readings are parsed from the text of `nvidia-smi`. Chapter 10 builds probes that way and shows where the optional packages are worth adding.

!!! warning "Some system files contain identifiers"

    On DGX OS, `/etc/dgx-release` includes the unit's serial number. Read it with `grep -v SERIAL /etc/dgx-release`, and read any captured inventory before you save or share it. An inventory is a description of a specific machine, and Chapter 23 builds the review that makes it safe to publish.

## Chapter Summary

You installed the Tailscale client and daemon in a dedicated environment, brought the device onto the tailnet with `tailscale up`, and signed in with the account the administrator invited. Names come from MagicDNS, and an access control list decides who may reach what. The connectivity test proves the path in three steps: status lists the device, ping shows packets arriving and by which path, and a BatchMode login proves the key works. With that, a read-only inventory answers the hardware questions of Chapter 5, using standard commands and a standard-library-only script piped over SSH.

!!! mascot-celebration "You Have a Verified Path and a First Look Inside"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now bring a machine onto a tailnet, prove the connection at three layers, and take an inventory that changes nothing. Chapter 10 turns the inventory into repeatable Python probes.

[See Annotated References](./references.md)
