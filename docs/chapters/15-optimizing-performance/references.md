# References: Optimizing Small Language Model Performance

1. [Latency (engineering)](https://en.wikipedia.org/wiki/Latency_%28engineering%29) - Wikipedia - Defines latency as the delay between a cause and its observed effect in networks, audio, and computing, including a section on tail latency. It supports the chapter's split between latency per request and throughput overall.

2. [Out of memory](https://en.wikipedia.org/wiki/Out_of_memory) - Wikipedia - Describes the state in which a computer cannot allocate more memory because RAM and swap are exhausted, with its history, recovery behavior, and per-process limits. It grounds the chapter's out-of-memory error and memory pressure sections.

3. [Voltage and frequency scaling](https://en.wikipedia.org/wiki/Voltage_and_frequency_scaling) - Wikipedia - Explains how processors lower their frequency and voltage to manage power and heat, also called CPU throttling, and how temperature and stability interact. It explains the mechanism behind thermal throttling, which makes speed decay on long runs.

4. Computer Architecture: A Quantitative Approach (6th Edition) - John L. Hennessy and David A. Patterson - Morgan Kaufmann - Presents the Roofline model, introduced by Williams, Waterman, and Patterson, which plots attainable performance against arithmetic intensity under memory-bandwidth and compute ceilings. That lens shows why token generation is bound by memory bandwidth and why batching raises throughput.

5. Systems Performance (2nd Edition) - Brendan Gregg - Addison-Wesley Professional - Gregg developed the USE Method, which checks every resource for utilization, saturation, and errors. Applied to a GPU, memory, and CPU, it turns this chapter's utilization, memory pressure, and out-of-memory symptoms into a repeatable checklist.

6. [LLM Inference Benchmarking: Fundamental Concepts](https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts/) - NVIDIA Technical Blog - Defines time to first token, end-to-end latency, intertoken latency, tokens per second, and requests per second, and shows how concurrency saturates throughput and raises TTFT. It supplies the metric vocabulary used throughout the chapter.

7. [How to generate text: using different decoding methods for language generation with Transformers](https://huggingface.co/blog/how-to-generate) - Hugging Face Blog - Explains greedy search, beam search, and sampling, then temperature, top-k, and top-p (nucleus) sampling with worked examples. It is a hands-on walk-through of the sampling parameters this chapter lists, which change output, not speed.

8. [Automatic Prefix Caching](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/) - vLLM Documentation - Describes how vLLM keeps the KV cache of earlier queries and reuses it when a request shares a prefix, helping multi-turn chats, though it speeds only prefill. It shows prompt caching, and the re-reading it prevents, in practice.

9. [How continuous batching enables 23x throughput in LLM inference while reducing p50 latency](https://www.anyscale.com/blog/continuous-batching-llm-inference) - Anyscale Blog - Compares static batching with continuous batching on a single A100, reporting throughput gains of up to 23 times, and argues that LLM inference is memory-IO bound so batch size sets throughput. It explains the chapter's batching and concurrency levers.

10. [NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html) - NVIDIA Documentation - Documents querying GPU utilization, memory, temperature, slowdown thresholds, and power draw, and repeating a query on an interval with the loop option. It is the reference for the chapter's GPU monitoring command.
