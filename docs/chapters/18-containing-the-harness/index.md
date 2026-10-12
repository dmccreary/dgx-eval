---
title: "Containing the Harness: Containers and Network Boundaries"
description: "Bounding what an agent harness can reach: running it in a Docker container with a non-root user and read-only skills, understanding the network boundary, tracing what data leaves the machine, and guarding against a frozen host."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:22:05"
version: 1.11
---

# Containing the Harness: Containers and Network Boundaries

## Summary

This chapter bounds what a harness running a model can reach. Students run the harness in a Docker sandbox with a non-root user, read-only skills, and a defined network boundary, then trace and verify what data leaves the machine. They finish with a contained run that does not freeze the host.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Docker | 22 |
| Docker Group Membership | 1 |
| NVIDIA Container Toolkit | 1 |
| Network Boundary | 35 |
| Data Egress Trace | 33 |
| Harness Container | 19 |
| Container Sandbox | 2 |
| Host Network Mode | 2 |
| Supervision Data Exposure | 1 |
| Harness on DGX | 1 |
| Non-Root Container User | 1 |
| Read-Only Skill Mount | 1 |
| Placeholder Credential | 1 |
| System Freeze | 1 |
| Telemetry Disabled | 2 |
| Network Sandbox Gap | 1 |
| Memory Watchdog | 1 |
| Packet Capture Verification | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)
- [Chapter 6: Cost, Price, and Quality](../06-cost-price-quality/index.md)
- [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../07-remote-access-ssh-mesh-vpn/index.md)
- [Chapter 10: Python Hardware Probes](../10-hardware-probes/index.md)
- [Chapter 13: Inference Servers and Local API Endpoints](../13-inference-servers/index.md)
- [Chapter 15: Optimizing Small Language Model Performance](../15-optimizing-performance/index.md)
- [Chapter 16: The Agent Loop, Tools, and Context](../16-agent-loop-and-tools/index.md)
- [Chapter 17: Agent Skills and Connecting a Harness to a Local Model](../17-agent-skills-and-harness/index.md)

---

!!! mascot-welcome "Let the Agent Work, and Fence the Yard"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    An agent that can run any command is exactly as useful as it is dangerous, and the container is how you keep the first and limit the second. By the end of this chapter you will know what a contained run can and cannot touch, and how to check where its data goes. Measure first, then decide!

## What This Chapter Covers

Chapter 17 ended with a harness that runs a skill, and with a flag that lets the agent run any command without asking. That is only reasonable inside a boundary. This chapter builds the boundary and, just as important, states honestly where it has gaps.

There are two boundaries to keep apart. The first is the **filesystem boundary**: what files the agent can read and change. A container handles it well. The second is the **network boundary**: where the agent's traffic can go. A container handles it only if it is configured to, and the arrangement this evaluation used did not. The chapter closes with a third concern that has nothing to do with security, which is a run that exhausts the machine's memory and freezes it.

## The Container

### Docker

**Docker** is a tool that runs programs in containers. A container is an isolated process with its own view of the filesystem, built from an **image**, a packaged set of files and settings. It shares the host's operating system kernel and is not a full virtual machine, so it starts in a second and costs little. The isolation is real and it is partial, and what it covers depends on how the container is started.

For this evaluation Docker does three jobs. It gives every run the same software, because the image is built once with pinned versions. It limits what the agent can write to, by mounting only specified folders. And it can be killed cleanly, with every process the agent started, by killing the container.

### Docker Group Membership

**Docker group membership** is the permission that lets a user run `docker` commands on a Linux machine. Because the Docker service runs as `root`, a member of the group can start a container that mounts any directory of the host, which makes membership equivalent to administrator access.

That is the reason the Administrator, and not the evaluator, decided it. The benchmark account was at first in no group but its own, and every Docker command failed with `permission denied`. After the Administrator added the account to the `docker` group, new logins could run containers.

### NVIDIA Container Toolkit

The **NVIDIA Container Toolkit** is the software that lets a container use the host's GPU. The harness container in this evaluation does not need the GPU, because the model runs in the server on the host and the container only calls it over the network. The toolkit was present on the units, and it matters for a reader who wants to run the model server itself in a container, as vLLM usually is.

### Harness Container, Container Sandbox, and Harness on DGX

The **harness container** is the container that holds the agent. The **container sandbox** is the boundary it creates: inside it the agent may run any command, and the only paths it can write to are the ones deliberately mounted in. **Harness on DGX** is the arrangement in which that container runs on the DGX itself, beside the model server, so that the harness and the model talk over the machine's own loopback interface.

The excerpt from this project's runner shows the boundary as code. Before the lines are read, three Docker options need defining. `-v host:container` mounts a host folder into the container, and a `:ro` suffix makes it read-only. `-w` sets the working directory. `-e` sets an environment variable inside.

```bash
docker run --rm -i --network host --name "harness-$label" \
  -v "$run":/work -w /work \
  -v "$state":/home/agent/.claude \
  -v "$skills_repo/skills":/home/agent/.claude/skills:ro \
  -e ANTHROPIC_BASE_URL="http://127.0.0.1:$port" \
  -e ANTHROPIC_AUTH_TOKEN=ollama \
  "$image" claude -p ...
```

Reading the excerpt as a list of what the agent can and cannot reach gives the table below.

| Mount or setting | What it grants | What it prevents |
|---|---|---|
| `-v "$run":/work` | Read and write in this run's directory | Touching any other directory on the host |
| `-v "$state":/home/agent/.claude` | Write the harness's own transcript | Nothing else; it is a separate folder |
| `...skills:ro` | Read the skills | Changing a skill |
| Non-root user in the image | Ordinary file permissions | Acting as root inside the container |
| `--rm` | The container is deleted when it ends | Leaving a stopped container behind |

### Non-Root Container User and Read-Only Skill Mount

A **non-root container user** is a user with ordinary permissions inside the container, created in the image with the same numeric user and group identifiers as the account that started the run. Two things follow. Files the agent writes into the run directory belong to the evaluator and not to `root`, so they can be read and deleted without special rights. And the agent cannot do the things only root can do, even inside its own container.

A **read-only skill mount** is the `:ro` on the skills folder. The agent can follow a skill and cannot alter it. Chapter 17 gave the reason: a model that could edit the skill would be measuring itself against a different test.

!!! mascot-tip "Make the Container's User Match Yours"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Build the image with your own user and group identifiers, using the `UID` and `GID` build arguments. Otherwise every file the agent writes is owned by a different user, and you will need elevated rights to clean up a run.

### Placeholder Credential and Telemetry Disabled

A **placeholder credential** is a fake value in the place a real one would go. The harness insists on having a credential, and the local server does not check one, so the evaluation gave it a word that is not a secret. If the harness ever tried to reach the vendor's service, the request would fail for want of a real credential.

**Telemetry disabled** means turning off the harness's optional reporting and update checks, with the settings `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` and `DISABLE_AUTOUPDATER=1`. They remove two sources of network traffic that a local-only evaluation does not want. They are configuration, not a guarantee, which is what the next section addresses.

## The Network Boundary

### Network Boundary

A **network boundary** is the line between traffic that stays on a machine, or on a network you control, and traffic that leaves it. The reason to run a model locally is to control that line, so the line has to be drawn and checked, not assumed.

Chapter 4 listed what data crosses it in each arrangement, and the testing-architecture diagram of this evaluation shows its own. The sim below is the existing diagram, embedded: step through it to see which machine does each job and what each outside party can see.

#### Diagram: Testing Architecture

<iframe src="../../sims/testing-architecture/main.html" width="100%" height="714px" scrolling="no"></iframe>

[Run the Testing Architecture MicroSim fullscreen](../../sims/testing-architecture/main.html){ .md-button }

<details markdown="1">
<summary>Testing Architecture (reused MicroSim)</summary>
Type: microsim
**sim-id:** testing-architecture<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** sims/testing-architecture/index.md in this book<br/>
**Source Repo:** https://github.com/dmccreary/dgx-eval/tree/main/docs/sims/testing-architecture<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain which machine performs each role in this evaluation and which outside parties can see which data.

Reused from this book's own MicroSims, which already exists locally, so no new specification is needed.
</details>

### Data Egress Trace

A **data egress trace** is an accounting of every place a system's data goes when it leaves. It is built component by component, and for each one it records the destination, what is sent, and how often. The result is a table that can be checked against what actually happened.

The trace for this evaluation, for the generation loop itself, is short, and it is worth reading as a model of the form.

| Component | Sends to | What | When |
|---|---|---|---|
| Harness | The model server on the same machine | Prompts and tool results | Every turn, over loopback |
| Model server | A model registry | A request for a file | Once, at download |
| Container build | A package index and the vendor's installer host | Requests for packages | Once, at build |
| Harness optional features | The vendor's service | Update checks and reports | Disabled by configuration |
| Laptop and DGX | Each other, over the tailnet | SSH sessions and fetched output | Throughout, encrypted |
| Orchestrator | A cloud model's API | Whatever it reads to monitor and score | Throughout |

### Supervision Data Exposure

**Supervision data exposure** is the data that reaches a third party because something is watching the run, even though the run itself is local. It is the row at the bottom of the table. The orchestrator is a cloud model, and everything it reads back to monitor or score a run, including generated text and log excerpts, goes to its service.

The generation loop kept its tokens local, and the supervision of it did not. Nothing about this is a flaw in the setup. It is a fact that has to be stated, because a claim of "everything stayed local" would have been false. A reader with strict data-sovereignty needs replaces the cloud orchestrator with a script or a local one, and Chapter 4's privacy table is the checklist for which parts to bring in.

!!! mascot-warning "'The Model Runs Locally' Is Not 'Nothing Leaves'"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Whatever reads the output, whether a reviewer, a scoring script that uploads, or a supervising assistant, can send it away. Trace where the generated text travels after the model writes it, and put every destination in the trace table before you claim a boundary.

### Host Network Mode and the Network Sandbox Gap

**Host network mode** is the Docker setting, `--network host`, that makes a container share the host's network instead of having its own. The harness container was started this way so that it could reach the model server, which listens only on the host's loopback address. A container on its own network cannot see the host's loopback.

The cost is the **network sandbox gap**. A container in host network mode can reach anything the host can: the internet, other machines on the tailnet, and every service on the host's loopback. The container is a filesystem sandbox, not a network sandbox, and the project's runner says so in its own header. The agent can be told not to reach out, and a model that has been told is not a boundary.

| Option | What it does | What it costs |
|---|---|---|
| Host network mode, as used | Container reaches the loopback server | No network isolation |
| A private network with no outside route, and the server on it too | Container can reach only the server | The server has to run in a container too |
| A firewall rule limiting the container's traffic | Container reaches only listed destinations | Needs administrator rights on the host |
| No network at all | Nothing leaves | The container cannot reach the model |

### Packet Capture Verification

**Packet capture verification** is watching the network interface during a run and confirming that the only traffic is the traffic the trace says. It turns the table above from a claim into a result. It needs administrator rights, because reading raw packets is a privileged operation.

This evaluation did not do it. The configuration, which is a placeholder credential and the optional features turned off, is stated, and it was not confirmed with a capture. The book says so for the same reason it names the supervision exposure: a boundary that has not been verified is a hypothesis.

A lighter check needs no special rights and catches the gross cases. While a run is going, list the established connections on the machine and look for any peer that is not the loopback address.

```bash
ss -tnH state established | awk '{print $4}' | sort | uniq -c
```

`ss` lists the machine's sockets. `-t` selects TCP, `-n` prints addresses numerically, `-H` drops the header line, and `state established` keeps only live connections. The fourth column is the peer. Any address you cannot account for is a line to add to the trace, and an address you capture is one to redact before it goes in a published document.

#### Diagram: Data Egress Trace Classifier


<iframe src="../../sims/egress-trace-classifier/main.html" width="100%" height="534px" scrolling="no"></iframe>
[Run Data Egress Trace Classifier Fullscreen](../../sims/egress-trace-classifier/main.html)

<details markdown="1">
<summary>Data Egress Trace Classifier</summary>
Type: microsim
**sim-id:** egress-trace-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish, for 8 data flows in a local-generation setup, whether each stays on the DGX, goes to the evaluator's own machine, or goes to a third party, with at least 7 of 8 correct.

**Prerequisites:** network boundary, data egress trace, supervision data exposure, host network mode, telemetry disabled (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 8 flows the learner commits one of three destinations before the sim reveals the answer. A choice is correct when it equals the Correct destination column. Mastery is 7 of 8 correct on the first attempt. Reading the flows is exploration, not evidence.

**Misconceptions:** (1) A locally hosted model means no data leaves. (2) Traffic to the evaluator's own laptop is traffic to a third party. (3) A one-time download is not egress. (4) The supervising assistant's reads are local.

**Instructional Rationale:** Analyzing a boundary needs the learner to separate flows by where they end, so the three destinations are exclusive and each flow ends in exactly one. Mixed flows prevent the habit of answering "stays" or "leaves" for everything.

**Content:**

The three destinations the learner chooses from: "Stays on the DGX", "Goes to the evaluator's own machine", and "Goes to a third party".

| # | Flow shown to the learner | Correct destination | Why (shown as feedback) |
|---|---|---|---|
| 1 | The harness in the container sends a prompt to the model server at the loopback address. | Stays on the DGX | Both ends are on the same machine and the traffic never leaves its loopback interface. |
| 2 | The model server reads a model file from the DGX's disk. | Stays on the DGX | A disk read is internal to the machine. |
| 3 | The model server downloads a model file from the public model library. | Goes to a third party | The request and the file travel to and from the library's host. |
| 4 | The container build downloads a base image and the harness installer. | Goes to a third party | The requests go to the hosts that serve those files. |
| 5 | The orchestrator on the laptop reads a generated chapter and sends it to a cloud model to be scored. | Goes to a third party | The generated text ends at the cloud model's service. |
| 6 | The laptop fetches the finished book from the DGX over SSH on the tailnet. | Goes to the evaluator's own machine | The destination is the evaluator's laptop, and the connection is encrypted. |
| 7 | The harness's optional update check runs, with its optional features left on. | Goes to a third party | The check contacts the vendor's service. |
| 8 | The watchdog appends a line to its log file on the DGX. | Stays on the DGX | It is a local file write. |

**Provenance:** The flows are synthetic, written for this exercise, and the sim labels them "synthetic example". They follow the egress table in this chapter.

**Rules:** Flows are shown in the fixed order 1 to 8. Each allows one final choice, and exactly one destination is correct for each. A flow's destination is where its data ends, not the first hop.

**Learner Activity:**

1. The learner reads flow 1.
2. The learner chooses one of the three destinations and confirms.
3. The sim shows the correct destination and the Why text, and marks the flow correct or incorrect.
4. The learner repeats for flows 2 to 8. After flow 8 the sim shows the score and the misconception behind each miss.

**Feedback:** Eight flows, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct destination and the Why text. The final score reads "n of 8 correct".

**Starting State:** Flow 1 is shown with no destination chosen, and the question on screen is "Where does this data end up?"

**Chapter Anchors:** The chapter states that the harness-to-server traffic stays on loopback, that downloads and container builds go to third parties, that the cloud orchestrator's reads reach its API, and that the fetch of the finished book goes to the evaluator's own laptop.
</details>

## When the Machine Stops

### System Freeze

A **system freeze** is the machine ceasing to respond entirely: no SSH, no network, no output. It is different from a crashed program. On a unified-memory machine it is a recognizable consequence of exhausting the shared pool, and it needs the Administrator to restart it, because nothing remote can reach a machine that is not answering.

This evaluation had one unit stop responding twice, each time a few minutes into a long run with the same model. The first was at a 256,000-token context. The second was at a smaller context with a watchdog running, and the watchdog logged no action, so memory exhaustion as the only cause is not confirmed. Heat, power, and the memory hardware itself were not ruled out.

### Memory Watchdog

A **memory watchdog** is a small program that watches memory and temperature and acts before they reach a dangerous level. This project's version checks available memory and GPU temperature every five seconds. When memory falls below a floor, or the temperature passes a ceiling, it kills the harness containers and unloads every model from the server, then keeps watching.

It takes two arguments: the floor in gibibytes and the ceiling in degrees Celsius, with defaults of 16 and 95. This evaluation ran it with a 20 GiB floor, which, on a 128 GB machine, leaves about 15% for the system.

```bash
src/dgx-setup/mem_watchdog.sh 20 95 &
```

A watchdog is a safeguard against the failure you expect, and it is not a diagnosis of the one you get. It does not replace the vitals log of Chapter 10, which records the readings that a frozen machine would otherwise take with it. Run both before any long run, and treat the pair as a precondition.

## Chapter Summary

A container gives an agent a filesystem sandbox: a pinned image, a non-root user whose files belong to the evaluator, a writable run directory, and read-only skills. It does not give a network sandbox when started in host network mode, which this evaluation used so the harness could reach a loopback-bound server, and the gap is stated. A data egress trace lists every destination, and it must include the supervision that reads the output, which in this evaluation was a cloud model. A packet capture would verify the trace, and a lighter `ss` check catches gross cases. A memory watchdog and a vitals log are preconditions for a long run on a unified-memory machine, and neither explains a freeze.

!!! mascot-celebration "You Can Fence the Run and Say Where It Leaks"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now run a harness in a sandbox that limits what it can write, draw the network boundary honestly, and put a watchdog under a long run. Chapter 19 designs the evaluation those runs will serve.
