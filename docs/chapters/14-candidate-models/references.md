# References: Open-Weight Model Families and Candidate Models

1. [Gemma (language model)](https://en.wikipedia.org/wiki/Gemma_%28language_model%29) - Wikipedia - Covers Google DeepMind's Gemma family, from its February 2024 debut through its architecture and variants. It gives background on the family behind two of the ten candidates.

2. [Mistral AI](https://en.wikipedia.org/wiki/Mistral_AI) - Wikipedia - Profiles the French company, its funding, and its models, including the Apache 2.0 Mistral 7B and Mixtral 8x7B and the Devstral coding models. It supplies context for the Mistral family and the two candidates drawn from it.

3. [Llama (language model)](https://en.wikipedia.org/wiki/Llama_%28language_model%29) - Wikipedia - Traces Meta's Llama releases from 2023 through Llama 4, covering architecture, training data, and the licensing disputes over calling it open source. It backs the chapter's Llama entry and Chapter 12's license review.

4. Build a Large Language Model (From Scratch) - Sebastian Raschka - Manning - Widely praised for building a GPT-style model line by line; its companion repository extends the approach to Llama 3.2, Qwen3 dense and mixture-of-experts, and Gemma 3. That shows how the families differ from one baseline.

5. AI Engineering: Building Applications with Foundation Models (1st Edition) - Chip Huyen - O'Reilly Media - Widely praised for treating model choice as an engineering trade-off; Chapter 2 covers model architecture and size, and Chapter 4 weighs building against buying. That frames why each family and size became a candidate.

6. [The Big LLM Architecture Comparison](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison) - Sebastian Raschka, Ahead of AI - Compares the architectures of recent open-weight models, including Qwen3, Gemma, Mistral Small, Llama 4, and gpt-oss, covering mixture-of-experts routing and attention variants that cut KV cache memory. It shows what separates the families the chapter lists.

7. [Ollama Model Library](https://ollama.com/library) - Ollama - Catalogs ready-to-pull models by family and size, with capability tags such as tools, thinking, and vision and pull counts. It is where this chapter's family:tag names come from and where tool-calling support is checked before a download.

8. [Berkeley Function Calling Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html) - UC Berkeley Gorilla Project - Ranks models on how accurately they call functions, across versions that add multi-turn and agentic evaluation, and reports estimated cost and latency. It is the kind of public function-calling leaderboard the chapter treats as a hypothesis, not a result.

9. [openai/gpt-oss](https://github.com/openai/gpt-oss) - OpenAI on GitHub - Documents the gpt-oss-120b and gpt-oss-20b mixture-of-experts models, with 117 and 21 billion parameters, 5.1 and 3.6 billion active, an Apache 2.0 license, and Ollama and vLLM usage. It is the primary source for the chapter's gpt-oss candidate.

10. [Qwen3](https://github.com/QwenLM/Qwen3) - QwenLM on GitHub - Presents the Qwen3 dense models and mixture-of-experts models such as 30B-A3B, whose name marks 3 billion active parameters, all under Apache 2.0, with thinking mode and local-serving instructions. It shows how the Qwen family names its sizes.
