# References: Inference Servers and Local API Endpoints

1. [llama.cpp](https://en.wikipedia.org/wiki/Llama.cpp) - Wikipedia - Describes the C++ library for running quantized language models locally, its architecture, and the GGUF file format it uses. It supports the chapter's account of llama.cpp as the engine that Ollama is built on.

2. [Ollama](https://en.wikipedia.org/wiki/Ollama) - Wikipedia - Covers the platform for running language models locally, its llama.cpp backend, model library, and REST API on port 11434, and reports of servers exposed by binding to 0.0.0.0. It backs the chapter's warning about opening an endpoint.

3. [Localhost](https://en.wikipedia.org/wiki/Localhost) - Wikipedia - Defines localhost as the hostname for the local computer, mapped to loopback addresses 127.0.0.1 and ::1, and covers name resolution and packet handling. It grounds the chapter's localhost binding and why other machines are refused.

4. Computer Networking: A Top-Down Approach (9th Edition) - James F. Kurose and Keith W. Ross - Pearson - Kurose and Ross are known for teaching networking top-down, beginning with application-layer protocols such as HTTP and Python socket programming. That order mirrors this chapter's path from an API call to ports, binding, and reachability.

5. TCP/IP Illustrated, Volume 1: The Protocols (2nd Edition) - Kevin R. Fall and W. Richard Stevens - Addison-Wesley Professional - Stevens taught protocols through captured packet traces from real systems, so each exchange can be read line by line. That method shows what a connection to a listening port, or a refused one, looks like on the wire.

6. [OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility) - Ollama Documentation - Lists the /v1/chat/completions features Ollama supports, the local base URL, and runnable curl, Python, and JavaScript examples. It is the reference for the chapter's first-prompt requests and for pointing existing clients at a local model.

7. [Ollama FAQ](https://docs.ollama.com/faq) - Ollama Documentation - Answers configuration questions: the default 127.0.0.1:11434 binding and OLLAMA_HOST, keep-alive, context length, reading ollama ps output, model storage paths, and running as a Linux service. It backs this chapter's runtime configuration and localhost binding sections.

8. [llama.cpp HTTP Server](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) - llama.cpp Project on GitHub - Documents llama-server, which serves GGUF models through OpenAI-compatible and Anthropic-compatible routes with parallel decoding, continuous batching, prompt caching, and a default 127.0.0.1 binding. It shows the build-it-yourself alternative to Ollama.

9. [vLLM Documentation](https://docs.vllm.ai/en/latest/) - vLLM Project - Introduces vLLM as a high-throughput serving library with PagedAttention, continuous batching, and an OpenAI-compatible API server. It supports the chapter's comparison of vLLM as the batching server for a second-pass evaluation.

10. [Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) - Tailscale Documentation - Explains how tailscale serve shares a local service only within a tailnet, with HTTPS proxying and background mode, and how it differs from public Funnel. It is the reference for sharing an endpoint while the server stays on loopback.
