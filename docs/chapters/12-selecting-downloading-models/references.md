# References: Selecting and Downloading an Open-Weight Model

1. [Hugging Face](https://en.wikipedia.org/wiki/Hugging_Face) - Wikipedia - Covers the company's history, its platform for sharing models and datasets, and the software ecosystem around its Hub. It gives background on the main public repository that this chapter's selection and download steps depend on.

2. [Apache License](https://en.wikipedia.org/wiki/Apache_License) - Wikipedia - Describes the permissive Apache License 2.0, including its patent grant and conditions, and its compatibility with other licenses. It explains why a model released under Apache 2.0 is the easy case in a license review.

3. [Cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) - Wikipedia - Explains how a hash function maps any input to a fixed-size digest, the properties that make digests suitable for security, and their use in verifying file integrity. It underpins the chapter's SHA-256 checksum verification of downloaded model files.

4. AI Engineering: Building Applications with Foundation Models (1st Edition) - Chip Huyen - O'Reilly Media - Huyen lays out a four-step model selection workflow: filter by hard attributes such as license and privacy, narrow with public benchmarks, test with your own evaluation, then monitor. It frames this chapter's criteria-first, claims-as-hypotheses approach.

5. Natural Language Processing with Transformers (Revised Edition) - Lewis Tunstall, Leandro von Werra, and Thomas Wolf - O'Reilly Media - Widely praised as the practical reference for working with the Hub, written by Hugging Face engineers including co-founder Thomas Wolf. Its code-first chapters show how pretrained checkpoints are loaded from and shared to the Hub, the workflow behind this chapter.

6. [Model Cards](https://huggingface.co/docs/hub/model-cards) - Hugging Face Hub Documentation - Describes the README that accompanies each model, its YAML metadata for license, datasets, base model, and evaluation results, and how custom licenses are declared. It is the primary source this chapter has you read for provenance, terms, and claims.

7. [Safetensors](https://huggingface.co/docs/safetensors/index) - Hugging Face Safetensors Documentation - Introduces a tensor file format that is safe, unlike pickle, and fast through zero-copy loading, with partial loading of individual tensors. It supports the chapter's comparison of safetensors and GGUF, including why a format that stores nothing executable matters.

8. [GGUF](https://huggingface.co/docs/hub/gguf) - Hugging Face Hub Documentation - Explains GGUF as a binary format holding both tensors and metadata for llama.cpp-style engines, with a Hub viewer and a table of quantization types and their bits per weight. It covers the format Ollama and llama.cpp load.

9. [Understand caching](https://huggingface.co/docs/huggingface_hub/guides/manage-cache) - Hugging Face Hub Python Library Documentation - Documents the default cache folder under .cache/huggingface in the home directory, how HF_HOME relocates it, and commands to list, verify checksums, and delete cached models. It matches the chapter's model cache directory and storage management sections.

10. [User access tokens](https://huggingface.co/docs/hub/security-tokens) - Hugging Face Hub Documentation - Defines read, write, and fine-grained token roles and recommends one token per use, fine-grained tokens for production, and revoking a leaked token. It supports the chapter's guidance to treat a hub token as a secret, preferably read-only.
