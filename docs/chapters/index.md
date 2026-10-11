# Chapters

This textbook is organized into 23 chapters covering 506 concepts.

## Chapter Overview

1. [Prerequisites and the Intelligent Textbook](01-intro-intelligent-textbooks/index.md) - Establishes the command-line, Python, Git, and generative-AI skills the course assumes, then introduces intelligent textbooks, their levels, MkDocs Material, and the course description that seeds a book.
2. [Learning Graphs, MicroSims, and Content Generation Rules](02-learning-graphs-microsims-rules/index.md) - Explains concept dependencies, the learning graph and its taxonomy, MicroSims, and the content rules that govern every generated chapter, glossary, FAQ, and quiz.
3. [Small Language Models](03-small-language-models/index.md) - Defines generative models, tokens, parameters, context windows, and open weights, separates small from frontier models, and lists the capabilities textbook generation demands.
4. [Local SLMs Versus Cloud LLM Services](04-local-versus-cloud/index.md) - Weighs running a model on owned hardware against Claude, ChatGPT, Antigravity, and Devin, covering privacy, data sovereignty, rate limits, lock-in, version pinning, and hybrid workflows.
5. [NVIDIA DGX Hardware Architecture](05-dgx-hardware-architecture/index.md) - Surveys the DGX family model-agnostically: CPU architecture, system RAM, GPU configuration, dedicated versus unified memory, storage, power, thermals, DGX OS, driver, and CUDA.
6. [Cost, Price, and Quality](06-cost-price-quality/index.md) - Separates the cost of owning hardware, the price of a service, and the quality of output, then builds fixed and variable costs, depreciation, total cost of ownership, and break-even volume.
7. [Remote Access, SSH, and Mesh VPN Concepts](07-remote-access-ssh-mesh-vpn/index.md) - Covers SSH keys and unattended logins, then explains how a WireGuard-based mesh VPN, Tailscale, and the tailnet separate a coordination plane from a data plane.
8. [Reproducible Python Environments with Conda](08-conda-environments/index.md) - Teaches Miniforge, conda create, activate, and export, Python version pinning, architecture-specific wheels, CUDA-enabled PyTorch, and rebuilding an environment from its specification.
9. [Installing Tailscale and Taking a Read-Only Inventory](09-tailscale-and-inventory/index.md) - Installs the Tailscale daemon in a dedicated environment, authenticates the device, configures MagicDNS and access controls, tests connectivity, and takes a read-only inventory over SSH.
10. [Python Hardware Probes](10-hardware-probes/index.md) - Builds Python probes for CPU, RAM, storage, GPU, driver, CUDA, temperature, and power, writing a machine-readable report that tells later steps which hardware branch applies.
11. [Model Sizing and Fit](11-model-sizing-and-fit/index.md) - Derives a model's memory footprint from parameters, precision, quantization, and KV cache, and assembles a fit calculator that returns a verdict with safety headroom before download.
12. [Selecting and Downloading an Open-Weight Model](12-selecting-downloading-models/index.md) - Applies selection criteria, license review, and tool-calling reliability, then downloads models from the Hugging Face Hub with checksum verification and storage management to form a shortlist.
13. [Inference Servers and Local API Endpoints](13-inference-servers/index.md) - Installs and configures Ollama, llama.cpp, and vLLM, serves an OpenAI-compatible endpoint bound to localhost, shares it across the tailnet, and verifies it with a first-prompt smoke test.
14. [Open-Weight Model Families and Candidate Models](14-candidate-models/index.md) - Surveys eight open-weight model families and profiles the ten candidate models under evaluation, with the rationale for including or excluding each.
15. [Optimizing Small Language Model Performance](15-optimizing-performance/index.md) - Measures tokens per second, time to first token, and latency, then tunes quantization, context length, batching, caching, and sampling while monitoring GPU, memory, and thermal limits.
16. [The Agent Loop, Tools, and Context](16-agent-loop-and-tools/index.md) - Explains the agent loop, tool definitions, file-editing and shell tools, permissions, context management, compaction and truncation, and how orchestrators and subagents divide work.
17. [Agent Skills and Connecting a Harness to a Local Model](17-agent-skills-and-harness/index.md) - Covers the Agent Skills format, skill loading and installation, the ibook-skills chain, and how harnesses such as Claude Code connect to and are verified against a local endpoint.
18. [Containing the Harness: Containers and Network Boundaries](18-containing-the-harness/index.md) - Places the harness in a Docker sandbox with a non-root user, read-only skills, and a network boundary, then verifies egress and prevents system freezes with a memory watchdog.
19. [Designing a Fair Evaluation](19-fair-evaluation-design/index.md) - Frames the evaluation question and controls variables, fixed inputs, repeated runs, and baselines so that a comparison between a local model and a cloud baseline is fair.
20. [Scoring, Bias, and Structural Checks](20-scoring-and-bias/index.md) - Applies scoring rubrics, automated and human quality scores, and structural checks to generated books, while guarding against bias and honestly reporting provisional and negative results.
21. [Running the Textbook Benchmark](21-running-the-benchmark/index.md) - Runs the textbook benchmark stage by stage, covering pipeline stages, the benchmark runner, the Algebra I workload, per-stage metrics, wall-clock time, and output retrieval.
22. [Diagnosing Failures, Reporting, and Cost per Textbook](22-diagnosis-and-reporting/index.md) - Diagnoses failed runs by separating malformed tool calls, context overflow, and harness faults, then composes the evaluation report, recommendation, and cost per textbook.
23. [Sanitizing Evaluation Artifacts and Publishing the Report](23-sanitizing-and-publishing/index.md) - Identifies the device details that must never be published, applies redaction and placeholder conventions, scans for secrets, reviews artifacts for safety, and publishes the capstone report.

## How to Use This Textbook

The chapters follow the order of a real DGX evaluation: understand the question, learn the hardware and the connection, build the software stack one verified layer at a time, then run the benchmark, interpret the results, and sanitize everything before it is shared. Each chapter lists the earlier chapters it builds on, and no concept appears before its prerequisites.

---

**Note:** Each chapter includes a list of concepts covered. Make sure to complete prerequisites before moving to advanced chapters.
