# Concept Taxonomy

The concepts of *DGX Evaluation for Textbook Generation* fall into 14 categories. Each category has a short TaxonomyID that appears in
`learning-graph.csv` and as the group key in `learning-graph.json`.

| Category | TaxonomyID | Concepts | Description |
|---|---|---:|---|
| Foundations and Intelligent Textbooks | `FOUND` | 39 | Prerequisite skills, the intelligent-textbook model, learning graphs, MicroSims, and the ibook-skills pipeline that is the benchmark workload. |
| Small Language Models | `SLM` | 28 | What a small language model is, how it differs from a frontier model, and the capabilities textbook generation demands. |
| Local Versus Cloud Services | `LVC` | 21 | The case for and against running a model on owned hardware compared with cloud LLM services and agentic frameworks. |
| Cost, Price, and Quality | `COST` | 30 | Cost of owning hardware, price of services, quality of output, and the cost models that connect them. |
| DGX Hardware Architecture | `HW` | 28 | CPU, memory, GPU, storage, power, DGX OS, driver, and CUDA, treated model-agnostically with both hardware branches. |
| Secure Remote Access | `NET` | 39 | Tailscale, WireGuard, SSH, keys, access control, and sharing endpoints across a tailnet. |
| Environments and Hardware Probes | `ENV` | 50 | Reproducible conda environments and the Python probes that report what the machine really has. |
| Model Sizing and Fit | `FIT` | 26 | Parameters, precision, quantization, file formats, KV cache, and calculating whether a model fits before it is downloaded. |
| Model Selection and Candidates | `MSEL` | 35 | Selection criteria, licenses, the model hub, downloading, and the ten candidate models under evaluation. |
| Inference Servers and Performance | `INFER` | 48 | Local runtimes, OpenAI-compatible endpoints, smoke tests, and the metrics and settings that govern speed. |
| Agent Harnesses and Containment | `AGENT` | 43 | The agent loop, tools, skills, harness configuration, and the container and network boundaries around a run. |
| Evaluation Methodology | `EVAL` | 44 | Controlled variables, baselines, scoring, bias, repeatability, and how to report provisional and negative results. |
| Benchmark and Reporting | `BENCH` | 50 | Running the textbook benchmark stage by stage, structural checks, failure diagnosis, and the evaluation report. |
| Sanitization and Publication Safety | `SAN` | 25 | The device details that must never be published, and redaction, scanning, and review before anything is shared. |

## Category Details

### Foundations and Intelligent Textbooks (`FOUND`)

Prerequisite skills, the intelligent-textbook model, learning graphs, MicroSims, and the ibook-skills pipeline that is the benchmark workload.

### Small Language Models (`SLM`)

What a small language model is, how it differs from a frontier model, and the capabilities textbook generation demands.

### Local Versus Cloud Services (`LVC`)

The case for and against running a model on owned hardware compared with cloud LLM services and agentic frameworks.

### Cost, Price, and Quality (`COST`)

Cost of owning hardware, price of services, quality of output, and the cost models that connect them.

### DGX Hardware Architecture (`HW`)

CPU, memory, GPU, storage, power, DGX OS, driver, and CUDA, treated model-agnostically with both hardware branches.

### Secure Remote Access (`NET`)

Tailscale, WireGuard, SSH, keys, access control, and sharing endpoints across a tailnet.

### Environments and Hardware Probes (`ENV`)

Reproducible conda environments and the Python probes that report what the machine really has.

### Model Sizing and Fit (`FIT`)

Parameters, precision, quantization, file formats, KV cache, and calculating whether a model fits before it is downloaded.

### Model Selection and Candidates (`MSEL`)

Selection criteria, licenses, the model hub, downloading, and the ten candidate models under evaluation.

### Inference Servers and Performance (`INFER`)

Local runtimes, OpenAI-compatible endpoints, smoke tests, and the metrics and settings that govern speed.

### Agent Harnesses and Containment (`AGENT`)

The agent loop, tools, skills, harness configuration, and the container and network boundaries around a run.

### Evaluation Methodology (`EVAL`)

Controlled variables, baselines, scoring, bias, repeatability, and how to report provisional and negative results.

### Benchmark and Reporting (`BENCH`)

Running the textbook benchmark stage by stage, structural checks, failure diagnosis, and the evaluation report.

### Sanitization and Publication Safety (`SAN`)

The device details that must never be published, and redaction, scanning, and review before anything is shared.
