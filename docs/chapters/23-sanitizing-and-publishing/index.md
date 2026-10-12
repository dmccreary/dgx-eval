---
title: "Sanitizing Evaluation Artifacts and Publishing the Report"
description: "Making an evaluation safe to share: cataloging the details that make a device easier to find, reach, or log in to, redacting probe reports, logs, and screenshots with placeholders, scanning for secrets, and reviewing every artifact before publication."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:31:12"
version: 1.11
---

# Sanitizing Evaluation Artifacts and Publishing the Report

## Summary

This chapter makes the evaluation safe to share. Students catalog the details that make a device easier to find, reach, or log in to, redact probe reports, logs, and screenshots with placeholders, scan for secrets, and review every artifact before publication. They finish by publishing the capstone report with the sensitive details removed.

## Concepts Covered

This chapter covers the following 28 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Git History Persistence | 3 |
| Sanitization | 31 |
| Device-Identifying Details | 17 |
| Redaction | 8 |
| Raw Output Isolation | 2 |
| Public Repository Risk | 1 |
| Keys and Tokens | 6 |
| IP Address | 2 |
| Hostname | 2 |
| Hardware Identifiers | 2 |
| Placeholder Conventions | 2 |
| Redacted-by-Default Fields | 1 |
| Tailnet Name | 1 |
| Usernames and Passwords | 1 |
| Access Configuration | 1 |
| Screenshot Redaction | 1 |
| Sanitized Sample Output | 1 |
| Gitignore Rules | 1 |
| Secret Scanning | 5 |
| Documentation Address Ranges | 1 |
| Hosts via Environment Variable | 1 |
| Identifiers in System Files | 1 |
| Pre-Commit Scan | 3 |
| Results Publishing | 2 |
| gitleaks | 1 |
| Publication Safety Review | 2 |
| Home Directory Paths | 1 |
| Capstone Evaluation | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)
- [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../07-remote-access-ssh-mesh-vpn/index.md)
- [Chapter 9: Installing Tailscale and Taking a Read-Only Inventory](../09-tailscale-and-inventory/index.md)
- [Chapter 10: Python Hardware Probes](../10-hardware-probes/index.md)
- [Chapter 18: Containing the Harness: Containers and Network Boundaries](../18-containing-the-harness/index.md)
- [Chapter 19: Designing a Fair Evaluation](../19-fair-evaluation-design/index.md)
- [Chapter 21: Running the Textbook Benchmark](../21-running-the-benchmark/index.md)
- [Chapter 22: Diagnosing Failures, Reporting, and Cost per Textbook](../22-diagnosis-and-reporting/index.md)

---

!!! mascot-welcome "The Last Step Is the One You Cannot Undo"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Everything in this course produces output that describes a real machine, and publishing it is the one step you cannot take back. By the end of this chapter you will have a routine that keeps the device's details out of anything you share, and a review that catches the ones that slip through. Measure first, then decide!

## What This Chapter Covers

An evaluation report is meant to be shared, and the raw material behind it is not safe to share. Probe reports, command output, logs, and screenshots all carry addresses, names, and identifiers that make the tested machine easier to find and reach. In an evaluation of a machine that belongs to someone else, a leak is not an embarrassment. It is harm done to a third party.

The chapter has three parts. First, a catalog of what must never be published, so that you know what you are looking for. Second, the methods that keep it out: placeholders, redaction, isolation of raw output, and rules about what the repository may contain. Third, the checks that catch what the methods miss: scans, and a review before publication. It closes with the capstone, which brings the whole course together into one published evaluation.

This chapter practices what it teaches. Every address, name, and identifier in it is a placeholder or from a range reserved for documentation, and none belongs to any real machine.

## What Must Not Leave

### Sanitization

**Sanitization** is the process of removing or replacing the details in an artifact that could identify, locate, or give access to a device or a person, so that the artifact can be shared. It is a step in the pipeline, with its own checks, and not a final polish. The goal is stated in terms of the reader: after sanitization, someone who reads the artifact should learn how the evaluation was done and what it found, and nothing that makes the tested machine easier to find, reach, or log in to.

### Public Repository Risk

**Public repository risk** is the exposure that comes from publishing a repository and its site. A public repository is readable by anyone, indexed by search engines, and scanned continuously by automated tools that look for credentials and addresses. Secrets committed to a public repository are often found and tried within minutes. A deployed documentation site is a second copy that is indexed in its own right.

### Device-Identifying Details

**Device-identifying details** are the facts that help a stranger find or reach a specific machine. The list for this course is fixed, and it appears in the project's own instructions so that every contributor, human or automated, reads the same rules.

| Category | Examples | Why it matters |
|---|---|---|
| Network addresses | Tailnet addresses, public addresses, IPv6 addresses | Tells a scanner where to look |
| Names | Hostnames, MagicDNS names, the tailnet's name | Locates the machine and the network |
| Accounts | Usernames, passwords, passphrases | The login itself, or half of it |
| Keys and tokens | SSH keys, Tailscale auth keys, model-hub tokens | Access without a password |
| Hardware identifiers | Serial numbers, GPU unique identifiers, MAC addresses | Identifies the physical unit |
| Access configuration | The access control policy, open ports, firewall rules | Shows exactly how to get in |
| Raw logs | Unedited command output and run logs | Contains any of the above, unpredictably |

Each of the next sections takes one row that deserves a closer look.

### IP Address and Hostname

An **IP address** is the numeric network address of a machine, and a **hostname** is its name. Either one tells a stranger where to send a connection. A private address, such as one inside a home network, is less revealing than a public one and is still a detail of your network. A tailnet address, which begins `100.`, only works inside the tailnet, and it is still an identifier that should not be published, because it names a specific device in a specific network.

A hostname is often more informative than an address, since it can carry a purpose, a location, or an owner. The full name of a machine in a tailnet, `<dgx-host>.<tailnet-name>.ts.net`, combines the machine's name with the tailnet's, and so it names both.

### Tailnet Name

The **tailnet name** is the identifier of the whole private network, and it forms the suffix of every machine's full name. It is easy to forget, because it appears only in full names and in the sign-in page. Revealing it is revealing the network that holds every machine in it.

### Usernames and Passwords

**Usernames and passwords** are the account on the machine. Linux login names are case-sensitive and each one is a valid target. A password does not belong in any file, message, or screenshot at all. The same applies to a passphrase. The rule has no exception for "test" values that might be real.

### Keys and Tokens

**Keys and tokens** are credentials that grant access without a password. An SSH private key is a login. A Tailscale auth key joins a machine to a network. A model-hub access token authorizes downloads and can authorize more. They are long random strings, easy to paste by accident in a command or an environment listing, and each has a recognizable shape that a scanner can find.

### Hardware Identifiers

**Hardware identifiers** are values that identify a physical unit: serial numbers, GPU unique identifiers, and network card addresses. They are not secrets that give access, and they are identifying details that tie a document to one machine. A GPU's identifier is printed by a common `nvidia-smi` command, and a serial number is written in a system file on the machine.

### Access Configuration

**Access configuration** is the description of how a machine can be reached: the tailnet's access control policy, the ports that are open, the firewall rules, and the SSH server's settings. It is the most useful single document to someone planning an attack, because it lists what is allowed. It is therefore never published, in whole or in part, for a real device.

### Identifiers in System Files

**Identifiers in system files** are the places a machine records who it is. The serial number sits in `/etc/dgx-release`. A unique machine identifier sits in `/etc/machine-id`. The list of hosts you have connected to is in `~/.ssh/known_hosts`, and the commands you have run are in the shell history. A reader who copies any of these files, or a long command's output that includes them, copies the identifiers with it.

!!! mascot-warning "Read What You Captured Before You Keep It"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A command that looks harmless can print an identifier on a line you did not expect, such as a serial number in a release file or a unique identifier in a listing. Treat every captured output as unsafe until you have read each line of it. Filter the known sources at capture time, for example with `grep -v SERIAL`, and then read it anyway.

### Home Directory Paths

A **home directory path** is a file path that begins with a user's home directory, and it carries the username. A log of a run shows `/home/<user>/...` on every line that touches a file, so a single log excerpt can reveal an account name dozens of times. Replace the home directory with a placeholder, and prefer paths relative to the project root, which carry no account at all.

## Keeping It Out

### Placeholder Conventions and Documentation Address Ranges

**Placeholder conventions** are the agreed replacement values that stand in for real details, used the same way everywhere so that a reader can follow an example and a scan can recognize a placeholder. The conventions in this book are the ones the project's own instructions set.

| Real detail | Placeholder |
|---|---|
| A machine's name | `<dgx-host>` |
| A login name | `<user>` |
| An administrator's account | `<admin>` |
| The tailnet's name | `<tailnet-name>.ts.net` |
| A tailnet address | `100.x.y.z` |
| A home directory | `<home>` or a path relative to the project |

**Documentation address ranges** are blocks of addresses reserved so that examples never point at a real machine. When an example needs an address that looks concrete, use one of them: `192.0.2.0/24`, `198.51.100.0/24`, or `203.0.113.0/24` for IPv4, and `2001:db8::/32` for IPv6. A placeholder in angle brackets is clearer for a name, and a documentation range is clearer for an address that must still parse as one.

A rule of thumb for a placeholder is that it should be impossible to mistake for a real value. A fake value that looks real is worse than a placeholder, because someone will eventually try it, and because a scan cannot tell it from a leak.

### Redaction and Sanitized Sample Output

**Redaction** is replacing a detail in a specific artifact with a placeholder or removing it. It is what you do to a piece of captured output after the fact. **Sanitized sample output** is the result: an example of command output that shows the format and the meaning and none of the identifiers.

The example shows the transformation for a status listing. The raw version below is synthetic, with values from reserved ranges, and the sanitized version is what would go in the book.

```text
# raw (synthetic)
198.51.100.31  example-host-01.example-tailnet.ts.net  exampleuser@  linux  active; direct 203.0.113.9:41641

# sanitized
100.x.y.z      <dgx-host>                          <admin>@  linux  active; direct 198.51.100.7:41641
```

Three things changed. The address became the placeholder, the full name became the machine placeholder, and the account name became the administrator placeholder. The remote endpoint was replaced with an address from a documentation range, because the placeholder form would not read as an address.

### Redacted-by-Default Fields

**Redacted-by-default fields** are details a tool never collects unless explicitly asked, which is the strongest form of sanitization because nothing has to be removed afterward. The probe suite of Chapter 10 reads no hostname, no account name, no address, no serial number, and no GPU identifier, so its report cannot leak them. Where a tool must gather something sensitive, make the sensitive field opt-in and not opt-out.

### Screenshot Redaction

**Screenshot redaction** is removing identifying details from an image. A screenshot of a terminal or an admin console carries more than the lines you meant to show: window titles, tab names, the address bar of a browser, a prompt that includes the username and hostname, and a sidebar listing every other machine.

Three rules cover most of it. **Crop first**, to the smallest region that makes the point, so most of the window never enters the file. **Cover with a solid fill**, not a blur, because a blur can be partly reversed. And **check the result at full size**, including the edges, since a prompt line at the very bottom is easy to miss.

### Raw Output Isolation and Gitignore Rules

**Raw output isolation** is keeping unsanitized output in a place that is never published, so that nothing has to be removed from the repository because it never entered it. In this project, run output lives under a directory in the home folder, outside the repository, and model tests write to another. Only a script that copies selected, safe files can bring anything in.

**Gitignore rules** back that up. A `.gitignore` file lists patterns that git will refuse to add, so a careless `git add .` cannot pick up a log. The rules worth having for this kind of work are few.

```text
*.log
*.jsonl
.env
id_*
*.pem
dgx-eval-runs/
```

A gitignore is a safety net and not a control. It does nothing for a file that is already tracked, and it will not stop an explicit `git add -f`.

### Hosts via Environment Variable

**Hosts via environment variable** is passing real machine addresses to scripts through the environment and not writing them in the script. This project's orchestration scripts read `DGX_HOSTS`, a space-separated list of login targets, so the real values exist only in the shell of the person running them, and the script in the repository contains `<user>@<dgx-host>`.

```bash
export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
```

The same technique handles the other direction. The script that publishes results takes a blocklist of real host names and logins from an environment variable, as a pattern, at run time, and refuses to copy any file that matches it. The real names are never stored in a file.

## Catching What Slips Through

### Secret Scanning and gitleaks

**Secret scanning** is running a tool over files or history that looks for strings with the shape of a credential. **gitleaks** is an open-source scanner that does this for git repositories, with built-in rules for the common key and token formats. It can scan the working tree, the staged changes, or the whole history.

```bash
gitleaks detect --source . --redact
```

`detect` scans the repository, and `--redact` hides the matched secret in the report so that the report is not itself a leak. The subcommands have changed between versions, so check `gitleaks --help` for yours. A scanner finds credentials with a known shape. It does not find an IP address in a paragraph or a hostname in a caption, so it is one layer and not the whole defense.

### Pre-Commit Scan

A **pre-commit scan** checks the changes about to be committed and refuses the commit if it finds a detail that should not go in. It is the last cheap check before a mistake becomes history. The script below is a small, project-specific version. Each pattern is explained before it appears: the first matches an IPv4 address, the second a tailnet name, the third a private key header, the fourth a Tailscale auth key, the fifth a model-hub token, the sixth a home-directory path, and the last two a serial number line and a GPU identifier.

```bash
#!/usr/bin/env bash
patterns='([0-9]{1,3}\.){3}[0-9]{1,3}|[A-Za-z0-9-]+\.ts\.net|BEGIN [A-Z ]*PRIVATE KEY|tskey-[A-Za-z0-9-]+|hf_[A-Za-z0-9]{20,}|/home/[a-z_][a-z0-9_-]*|SERIAL=|GPU-[0-9a-f]{8}-'
allowed='192\.0\.2\.|198\.51\.100\.|203\.0\.113\.|100\.x\.y\.z|127\.0\.0\.1|0\.0\.0\.0'
hits=$(git diff --cached -U0 | grep -E '^\+' | grep -Ev '^\+\+\+' \
       | grep -E "$patterns" | grep -Ev "$allowed")
if [ -n "$hits" ]; then
  echo "Possible device details in staged changes:"; echo "$hits"; exit 1
fi
```

The script looks only at lines being added, and it allows the documentation ranges and the loopback address. A hit is a prompt to read the line, not proof of a leak: a version number can match the address pattern. It is placed in `.git/hooks/pre-commit`, or run by hand before every commit and before every publish.

!!! mascot-tip "Make the Scan Part of the Publish Command"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A check you must remember to run will be skipped on the tired evening that matters most. Put the scan in the same script as `git commit` and the site deploy, so that publishing without it is not something you can do by accident.

### Git History Persistence

**Git history persistence** is the fact that a commit stays in a repository's history after a later commit removes its content. Deleting a leaked file in the next commit changes the latest version and leaves the leak in every earlier one, which anyone can read with `git log -p`. Every clone and fork made before the deletion keeps its own copy, and a deployed site is a separate copy again, with search engines holding their own.

The consequences set the order of operations.

- **Prevent, do not repair.** The cheap time to catch a leak is before the commit.
- **If something sensitive has been committed, stop and tell the person responsible for the repository.** Do not try to hide it with a quick follow-up commit.
- **Treat any leaked credential as compromised.** Rotate it, because removing it from history does not un-expose it.
- **Rewriting history is a last resort.** It is disruptive, it needs a force-push, and it still does not reach the copies made earlier.

### Results Publishing

**Results publishing** is the controlled path by which evaluation results enter the book. In this project it is one script that rebuilds the results pages from fetched run output. It copies only three kinds of file: a model's learning graph, its chapter text, and the course description. It leaves out any file that holds an address, a host name, or a home-directory path, and it counts what it removed so the omission is visible.

The design is the one this chapter argues for. A narrow, automated path with a blocklist beats a broad copy followed by cleaning, because it fails closed: a file it does not recognize is left out.

### Publication Safety Review

A **publication safety review** is a final read of everything about to be published, by a person, against the catalog of what must not leave. It is the check that does not depend on a pattern. A reviewer reads for the things scanners miss: a hostname in a caption, a screenshot with a visible title bar, a number that is a serial number in disguise, and a description that, taken together, identifies the machine.

The review is a checklist, and the items are short.

1. The diff has been read line by line, and not skimmed.
2. Every address, name, and identifier is a placeholder or from a documentation range.
3. No file under a raw-output location has been added.
4. The scan and the secret scanner have both been run, and every hit has been explained.
5. Every screenshot has been cropped, covered, and checked at full size.
6. Nothing describes the access configuration of the real device.
7. A second person has read the changes, if there is one.

#### Diagram: Redaction Reviewer


<iframe src="../../sims/redaction-reviewer/main.html" width="100%" height="554px" scrolling="no"></iframe>
[Run Redaction Reviewer Fullscreen](../../sims/redaction-reviewer/main.html)

<details markdown="1">
<summary>Redaction Reviewer</summary>
Type: microsim
**sim-id:** redaction-reviewer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge each of 10 lines of captured output as safe to publish or in need of redaction, and name the category of any detail to redact, with at least 9 of 10 correct.

**Prerequisites:** device-identifying details, IP address, hostname, tailnet name, hardware identifiers, keys and tokens, home directory path, placeholder conventions, documentation address ranges (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 10 lines the learner commits "Safe to publish" or "Redact" and, for "Redact", one category from the five listed, before the sim reveals the answer. A line is correct when the decision equals the Correct decision column and, for "Redact", the category equals the Correct category column. Mastery is 9 of 10 correct on the first attempt. Reading the lines is exploration, not evidence.

**Misconceptions:** (1) A private address is not identifying. (2) A serial number or unique identifier is harmless because it grants no access. (3) A line already shown in a tutorial is safe. (4) Placeholders and documentation ranges still need redacting.

**Instructional Rationale:** Evaluate-level judging needs the learner to apply the catalog of details to each line and to leave alone what is safe, so the lines mix four kinds of identifier with six safe lines, and include a line that is already a placeholder.

**Content:**

The five categories the learner chooses from: "Network address", "Name or tailnet", "Hardware identifier", "Account or home path", and "Key or token".

| # | Line shown to the learner | Correct decision | Correct category | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | `Architecture:        aarch64` | Safe to publish | None | It describes the processor type and identifies no unit. |
| 2 | `inet 198.51.100.24/24 brd 198.51.100.255 scope global eth0` | Redact | Network address | An interface address places the machine on a network. |
| 3 | `Hostname: example-host-01.example-tailnet.ts.net` | Redact | Name or tailnet | The full name carries both the machine's and the tailnet's name. |
| 4 | `SERIAL=EXAMPLE-0000-0000` | Redact | Hardware identifier | A serial number ties the output to one physical unit. |
| 5 | `GPU 0: NVIDIA GB10 (UUID: GPU-00000000-0000-0000-0000-000000000000)` | Redact | Hardware identifier | The unique identifier of a GPU identifies that unit. |
| 6 | `Driver Version: 580.xx.xx    CUDA Version: 13.0` | Safe to publish | None | Version numbers describe the software, not a specific machine. |
| 7 | `/home/exampleuser/dgx-eval-runs/s1-model/run.jsonl` | Redact | Account or home path | The path contains an account name. |
| 8 | `export HF_TOKEN=hf_xxxxxxxxxxxxxxxx` | Redact | Key or token | A model-hub token authorizes access to an account. |
| 9 | `MemAvailable:   104857600 kB` | Safe to publish | None | It is a memory figure and identifies no unit. |
| 10 | `100.x.y.z   <dgx-host>   <admin>@   linux   active; direct` | Safe to publish | None | Every identifying value is already a placeholder. |

**Provenance:** The lines are synthetic, written for this exercise, with addresses from the documentation ranges and obviously inert names, and the sim labels them "synthetic example". The categories come from this chapter's catalog.

**Rules:** Lines are shown in the fixed order 1 to 10. A line is "Redact" if it contains any value from the five categories that is not already a placeholder or a documentation-range address presented as an example. Each line has exactly one category or none.

**Learner Activity:**

1. The learner reads line 1.
2. The learner chooses "Safe to publish" or "Redact", and for "Redact" one of the five categories, then confirms.
3. The sim shows the correct decision and category with the Why text, and marks the line correct or incorrect.
4. The learner repeats for lines 2 to 10. After line 10 the sim shows the score and the misconception behind each miss.

**Feedback:** Ten lines, fixed order, one confirmed decision each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct decision, category, and the Why text. The final score reads "n of 10 correct".

**Starting State:** Line 1 is shown with no decision made, and the question on screen is "Is this line safe to publish?"

**Chapter Anchors:** The chapter states the seven categories of detail that must not be published, that a serial number and a GPU identifier are hardware identifiers, that a home path carries an account name, and that a value already replaced by a placeholder is safe.
</details>

## The Capstone

### Capstone Evaluation

The **capstone evaluation** is the course's final project: a complete, objective evaluation of a DGX system, published. It uses every chapter, and it is the only way to know that the pieces fit together. It is also, by design, a project in which sanitization is a graded step and not an afterthought.

The steps follow the order of the book, and each names the chapter that taught it.

1. **Reach the machine.** Join the tailnet, prove the connection at three layers, and log in without a password (Chapters 7 and 9).
2. **Probe the hardware.** Run the probe suite and produce a report with identifying fields left out by default (Chapters 5 and 10).
3. **Choose and install a model.** Compute the fit, select and download a model, and put it behind a local endpoint that only you can reach (Chapters 11 to 13).
4. **Connect and contain the harness.** Install the skills, point a harness at the endpoint, run it in a container, and start the watchdog and the vitals log (Chapters 16 to 18).
5. **Design the experiment.** State the question, the variable, the controls, and the metrics before running anything (Chapter 19).
6. **Run and score.** Run each stage from a fixed template, apply the checks, and calibrate them (Chapters 20 and 21).
7. **Diagnose, cost, and decide.** Explain each failure, compute cost per textbook, compare with a baseline, and write the report (Chapter 22).
8. **Sanitize and publish.** Redact, scan, review, and publish only what passes (this chapter).

The capstone is finished when the report is public and the review has found nothing in it that makes the machine easier to find, reach, or log in to.

## Chapter Summary

Sanitization removes or replaces every detail that could identify, locate, or give access to a device: addresses, names, the tailnet's name, accounts, keys and tokens, hardware identifiers, and access configuration, along with the raw logs and system files that contain them. Placeholders and documentation address ranges replace them in examples, tools collect identifying fields only on request, screenshots are cropped and covered with solid fills, and raw output lives outside the repository. A gitignore, an environment variable for hosts, a narrow publishing script, a secret scanner such as gitleaks, and a pre-commit scan each catch a different kind of slip, and a person's review catches what patterns cannot. Because git history persists, prevention is the only real remedy, and a credential that has leaked is rotated and not merely deleted.

!!! mascot-celebration "A Report You Can Publish Without Looking Over Your Shoulder"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now catalog the details that make a machine easier to reach, keep them out with placeholders, redaction, isolation, and scans, and review an artifact before it goes public. That completes the course: you can probe a DGX, run a textbook benchmark on it, decide what the results mean, and share them safely. Measure first, then decide!

[See Annotated References](./references.md)
