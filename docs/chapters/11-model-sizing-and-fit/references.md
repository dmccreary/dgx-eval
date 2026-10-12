# References: Model Sizing and Fit

1. [Mixture of experts](https://en.wikipedia.org/wiki/Mixture_of_experts) - Wikipedia - Explains how a gating function routes each input to a few expert networks, with examples such as Mixtral. It supports the chapter's point that such models need memory for all parameters but compute with only the active ones.

2. [bfloat16 floating-point format](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format) - Wikipedia - Describes the 16-bit format that keeps the exponent range of 32-bit floats while cutting the significand, covering bit layout and conversion rules. It shows the trade the chapter describes: two bytes per weight, with range kept and precision reduced.

3. [Quantization (signal processing)](https://en.wikipedia.org/wiki/Quantization_%28signal_processing%29) - Wikipedia - Defines quantization as mapping a large set of values onto a smaller set and relates bit depth to error and noise. It supplies the general theory behind trading fewer bits per weight for smaller size and some lost accuracy.

4. Hands-On Large Language Models (1st Edition) - Jay Alammar and Maarten Grootendorst - O'Reilly Media - Alammar is known for The Illustrated Transformer, and this book carries that visual style to the whole model; Chapter 3 shows how caching keys and values speeds generation, the cache whose growth this chapter sizes.

5. Computer Systems: A Programmer's Perspective (3rd Edition) - Randal E. Bryant and David R. O'Hallaron - Pearson - Builds IEEE 754 floating point from a tiny 8-bit format with 4 exponent bits and 3 fraction bits, so every value can be listed by hand. That makes the exponent-versus-fraction trade behind FP16 and BF16 concrete.

6. [Model memory estimator](https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator) - Hugging Face Accelerate Documentation - Shows how accelerate estimate-memory reports load size per dtype from float32 down to int4 without downloading weights, and warns to add up to 20 percent for inference. It is a ready-made version of this chapter's fit calculation.

7. [Mastering LLM Techniques: Inference Optimization](https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/) - NVIDIA Technical Blog - Gives the per-token KV cache size formula from layers, heads, head dimension, and precision, with a Llama 2 7B example of about 2 GB at 4,096 tokens. It matches the chapter's cache arithmetic.

8. [A Visual Guide to Quantization](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization) - Maarten Grootendorst, Exploring Language Models - Diagrams the FP32, FP16, and BF16 bit layouts, works a 70-billion-parameter memory example, and walks from 8-bit to 4-bit methods including GGUF. It supports the chapter's precision and quantization sections.

9. [llama-quantize README](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md) - llama.cpp Project on GitHub - Tabulates quantization types such as Q4_K_M and Q8_0 with bits per weight, file size, and speed for an 8-billion-parameter model. Its figures, about 4.9 bits for Q4_K_M, show why a 4-bit file is not 4 bits per parameter.

10. [Mixture of Experts Explained](https://huggingface.co/blog/moe) - Hugging Face Blog - Explains routers and experts in sparse transformer layers and states that all parameters must be loaded in memory even though only some are used per token. It states the dense-versus-sparse memory trade-off this chapter works through.
