# Quiz: Containing the Harness: Containers and Network Boundaries

Test your understanding of the container sandbox, the network boundary, the data egress trace, and safeguards against a frozen host with these review questions.

---

#### 1. What is a Docker container?

<div class="upper-alpha" markdown>
1. An isolated process with its own view of the filesystem
2. A full virtual machine with its own operating system kernel
3. A background service that starts the model server at boot
4. A firewall rule that limits where a process can connect
</div>

??? question "Show Answer"
    The correct answer is **A**. Docker runs programs in containers. A container is an isolated process with its own view of the filesystem, built from an image, a packaged set of files and settings. It shares the host's operating system kernel and is not a full virtual machine, so it starts in a second and costs little. The isolation is real and it is partial, and what it covers depends on how the container is started.

    **Concept Tested:** Docker

    **See:** [Docker](index.md#docker)

---

#### 2. Inside the harness container, what may the agent do, and where can it write?

<div class="upper-alpha" markdown>
1. Run only pre-approved commands, and write anywhere on the host
2. Run no shell commands, and write only to the skills folder
3. Run any command as root, and write to the host's home directory
4. Run any command, and write only to deliberately mounted paths
</div>

??? question "Show Answer"
    The correct answer is **D**. The harness container holds the agent, and the container sandbox is the boundary it creates: inside it the agent may run any command, and the only paths it can write to are the ones deliberately mounted in. The run directory is mounted writable, the harness's own state folder is separate, and the skills are read-only. The image also uses a non-root user, so the agent cannot do what only root can do, even inside its own container.

    **Concept Tested:** Harness Container

    **See:** [Harness Container, Container Sandbox, and Harness on DGX](index.md#harness-container-container-sandbox-and-harness-on-dgx)

---

#### 3. Why was adding the benchmark account to the `docker` group a decision for the Administrator?

<div class="upper-alpha" markdown>
1. Group members can change the tailnet's access control list directly
2. The group gives a user ownership of the model files
3. A member can mount any host directory, like an administrator
4. The group is required before a user can log in over SSH
</div>

??? question "Show Answer"
    The correct answer is **C**. Docker group membership is the permission that lets a user run `docker` commands. Because the Docker service runs as `root`, a member of the group can start a container that mounts any directory of the host, which makes membership equivalent to administrator access. That is why the Administrator, and not the evaluator, decided it. Until the account was added, every Docker command failed with `permission denied`.

    **Concept Tested:** Docker Group Membership

    **See:** [Docker Group Membership](index.md#docker-group-membership)

---

#### 4. Why was the harness container started with `--network host`?

<div class="upper-alpha" markdown>
1. So the agent could download packages while it runs
2. So it could reach the server on the host's loopback address
3. So the container would be isolated from the tailnet
4. So the GPU would be visible inside the container
</div>

??? question "Show Answer"
    The correct answer is **B**. Host network mode, set with `--network host`, makes a container share the host's network instead of having its own. The harness container was started this way so it could reach the model server, which listens only on the host's loopback address; a container on its own network cannot see the host's loopback. The harness container does not need the GPU at all, because the model runs in the server on the host.

    **Concept Tested:** Host Network Mode

    **See:** [Host Network Mode and the Network Sandbox Gap](index.md#host-network-mode-and-the-network-sandbox-gap)

---

#### 5. Why would a claim that "everything stayed local" be false for this evaluation?

<div class="upper-alpha" markdown>
1. The harness sent every prompt to the vendor's service
2. The cloud orchestrator read output to monitor and score runs
3. The model server uploaded its weights after each stage
4. The coordination service stored a copy of each generated chapter
</div>

??? question "Show Answer"
    The correct answer is **B**. Supervision data exposure is the data that reaches a third party because something is watching the run, even though the run itself is local. Here the orchestrator is a cloud model, and everything it reads back to monitor or score a run, including generated text and log excerpts, goes to its service. The generation loop kept its tokens local, and the supervision of it did not. That is not a flaw in the setup, but it has to be stated.

    **Concept Tested:** Supervision Data Exposure

    **See:** [Supervision Data Exposure](index.md#supervision-data-exposure)

---

#### 6. After a run, the files in the run directory are owned by a different user, and you need elevated rights to delete them. What should you change?

<div class="upper-alpha" markdown>
1. Start the container without the `--network host` option
2. Mount the skills folder without the `:ro` suffix
3. Build the image with your own `UID` and `GID` arguments
4. Add `--rm` so the container is deleted when it ends
</div>

??? question "Show Answer"
    The correct answer is **C**. A non-root container user has ordinary permissions inside the container and is created in the image with the same numeric user and group identifiers as the account that started the run. Files the agent writes then belong to the evaluator and not to `root`, so they can be read and deleted without special rights. Build the image with your own identifiers, using the `UID` and `GID` build arguments, or cleanup needs elevated rights.

    **Concept Tested:** Non-Root Container User

    **See:** [Non-Root Container User and Read-Only Skill Mount](index.md#non-root-container-user-and-read-only-skill-mount)

---

#### 7. You have no administrator rights but want a basic check of where a running harness connects. What can you do?

<div class="upper-alpha" markdown>
1. Run a full packet capture on the network interface
2. List established connections with `ss` and check each peer
3. Read the model card for a list of contacted hosts
4. Set a placeholder credential and assume nothing leaves
</div>

??? question "Show Answer"
    The correct answer is **B**. Packet capture verification watches the network interface during a run and confirms that the only traffic is what the trace says, but reading raw packets needs administrator rights. A lighter check needs none and catches the gross cases: while a run is going, list the established connections with `ss -tnH state established` and look for any peer that is not the loopback address. A placeholder credential is configuration, not verification, and an unverified boundary is a hypothesis.

    **Concept Tested:** Packet Capture Verification

    **See:** [Packet Capture Verification](index.md#packet-capture-verification)

---

#### 8. You are writing the egress trace for a local-generation setup in which a script uploads each generated chapter to a cloud scoring service. Where does this flow belong?

<div class="upper-alpha" markdown>
1. Nowhere, because the model itself runs locally
2. Under loopback traffic, because the script itself runs on the DGX
3. In the trace, as a third-party destination with what is sent
4. Under one-time downloads, because uploads are counted only once
</div>

??? question "Show Answer"
    The correct answer is **C**. A data egress trace is an accounting of every place a system's data goes when it leaves, built component by component with the destination, what is sent, and how often. Whatever reads the output, whether a reviewer, a scoring script that uploads, or a supervising assistant, can send it away. The upload therefore gets its own row as a third-party destination. "The model runs locally" is not the same claim as "nothing leaves".

    **Concept Tested:** Data Egress Trace

    **See:** [Data Egress Trace](index.md#data-egress-trace)

---

#### 9. The harness container limits the agent's writes to the run directory, yet it is described as not being a network sandbox. What explains the difference?

<div class="upper-alpha" markdown>
1. Mounts bound the filesystem; host networking shares the host's reach
2. The non-root user is allowed to change the host's firewall rules
3. The read-only skills mount exposes the tailnet to the agent
4. The placeholder credential opens the vendor's service to the agent's calls
</div>

??? question "Show Answer"
    The correct answer is **A**. The mounts decide what files the agent can reach, so the container is a real filesystem sandbox. Host network mode is a separate setting: a container that shares the host's network can reach anything the host can, including the internet, other machines on the tailnet, and every service on the host's loopback. That is the network sandbox gap. The agent can be told not to reach out, and a model that has been told is not a boundary.

    **Concept Tested:** Network Sandbox Gap

    **See:** [Host Network Mode and the Network Sandbox Gap](index.md#host-network-mode-and-the-network-sandbox-gap)

---

#### 10. One unit stopped responding twice. The second time, a watchdog was running at a smaller context and logged no action. What does this evidence support?

<div class="upper-alpha" markdown>
1. The freeze was caused by the 256,000-token context setting
2. The watchdog itself caused the machine to stop responding
3. The model's weights were corrupted during the download
4. Memory exhaustion as the sole cause is not confirmed
</div>

??? question "Show Answer"
    The correct answer is **D**. A system freeze is the machine ceasing to respond entirely, which needs the Administrator to restart it. The first freeze was at a 256,000-token context. The second was at a smaller context with a watchdog running, and the watchdog logged no action, so memory exhaustion as the only cause is not confirmed. Heat, power, and the memory hardware itself were not ruled out. A watchdog guards against the failure you expect; it is not a diagnosis of the one you get.

    **Concept Tested:** System Freeze

    **See:** [System Freeze](index.md#system-freeze)
