# References: Containing the Harness: Containers and Network Boundaries

1. [Docker (software)](https://en.wikipedia.org/wiki/Docker_(software)) - Wikipedia - Describes Docker's history, design, and components, including images as read-only templates and containers that share one operating system kernel. It supports this chapter's explanation of why a container is isolated but not a virtual machine.

2. [Sandbox (computer security)](https://en.wikipedia.org/wiki/Sandbox_(computer_security)) - Wikipedia - Surveys sandbox implementations, including Linux namespaces and seccomp, virtual machines, jails, and language runtimes, each limiting what untrusted code can reach. It frames this chapter's filesystem sandbox and why it differs from a network sandbox.

3. [Packet analyzer](https://en.wikipedia.org/wiki/Packet_analyzer) - Wikipedia - Defines packet analyzers as tools that intercept and log network traffic, covering their capabilities, uses, and notable examples such as Wireshark and tcpdump. It underlies this chapter's packet capture verification of what actually leaves the machine.

4. Container Security: Fundamental Technology Concepts that Protect Containerized Applications (1st Edition) - Liz Rice - O'Reilly Media - Explains containers through Linux namespaces, control groups, and capabilities, with runnable examples, an approach she also showed in her live-coded "Containers from Scratch" talk. It clarifies why a container limits files but not, in host mode, the network.

5. Computer Networking: A Top-Down Approach (8th Edition) - James F. Kurose and Keith W. Ross - Pearson - Teaches networking from the application layer downward and pairs chapters with Wireshark labs in which students capture and read real packets. That hands-on capture method clarifies this chapter's packet capture verification.

6. [Docker Engine security](https://docs.docker.com/engine/security/) - Docker Documentation - Explains kernel namespaces, control groups, the root-privileged daemon and its attack surface, restricted Linux capabilities, and running processes as non-root users. It supports this chapter's Docker group, non-root user, and sandbox sections.

7. [Host network driver](https://docs.docker.com/engine/network/drivers/host/) - Docker Documentation - Explains that --network host makes a container share the host's network stack, so no network isolation or port mapping applies. It documents the network sandbox gap this chapter names for its harness container.

8. [Development containers](https://code.claude.com/docs/en/devcontainer) - Claude Code Documentation - Covers running Claude Code in a Docker dev container as a non-root user, restricting network egress with a firewall, disabling non-essential traffic, and the exfiltration limits of --dangerously-skip-permissions. It mirrors this chapter's sandbox and its stated gaps.

9. [NVIDIA Container Toolkit Overview](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html) - NVIDIA Documentation - Introduces the libraries and utilities for building and running GPU-accelerated containers, including the container runtime and the nvidia-ctk command-line tool. It documents the toolkit this chapter says a containerized model server needs and the harness container does not.

10. [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) - Wireshark Documentation - Documents capturing live network data, choosing capture interfaces, capture filters, and display filters for reading traffic. It shows how to carry out the privileged packet capture this chapter describes but did not run.
