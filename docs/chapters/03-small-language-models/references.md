# References: Small Language Models

1. [Large language model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Surveys how LLMs are trained, how they generate text one token at a time, and their architecture, inference, evaluation, and limitations. Supplies background for this chapter's definitions of parameter count, context window, and inference.

2. [Open weights](https://en.wikipedia.org/wiki/Open_weights) - Wikipedia - Distinguishes open-weight releases from open-source AI, comparing what each publishes, and covers model cards and benefits and concerns. Clarifies the chapter's open-weight model, model card, and license distinctions.

3. [Byte-pair encoding](https://en.wikipedia.org/wiki/Byte-pair_encoding) - Wikipedia - Explains how repeatedly merging the most frequent pair of symbols builds a subword vocabulary, with worked examples and a byte-level variant. Shows where a tokenizer's pieces, and so a model's token counts, come from.

4. Hands-On Large Language Models (1st Edition) - Jay Alammar and Maarten Grootendorst - O'Reilly Media - Carries Alammar's illustrated style, known from his Illustrated Transformer blog post, into a book of diagrams showing how text becomes tokens and flows through a model. It makes tokens and context windows visible.

5. Build a Large Language Model (From Scratch) - Sebastian Raschka - Manning Publications - Widely praised for building a GPT-style model in code step by step, from tokenizing text through pretraining to instruction fine-tuning. Seeing the pieces assembled makes parameter count, tokens, and context length concrete.

6. [Tokenization algorithms](https://huggingface.co/docs/transformers/tokenizer_summary) - Hugging Face Transformers Documentation - Compares word, character, and subword tokenization, working BPE, Unigram, WordPiece, and SentencePiece through small examples. Explains why a tokenizer fixes a model's vocabulary and why token counts differ between models.

7. [The Open Source AI Definition 1.0](https://opensource.org/ai/open-source-ai-definition) - Open Source Initiative - States four freedoms and requires data information, code, and parameters to be available under OSI-approved terms. Gives the standard against which this chapter judges open-weight releases and model license terms.

8. [Context length](https://docs.ollama.com/context-length) - Ollama Documentation - Explains that context length is the maximum number of tokens a model holds in memory, how defaults scale with available VRAM, and how to change it. Ties the context window concept to the memory cost examined later.

9. [Structured outputs](https://docs.ollama.com/capabilities/structured-outputs) - Ollama Documentation - Shows how to constrain a model's reply to a JSON schema, using Pydantic or Zod to generate and validate it. Demonstrates the structured output ability this chapter says textbook generation requires.

10. [Tool calling](https://docs.ollama.com/capabilities/tool-calling) - Ollama Documentation - Covers single, parallel, and multi-turn tool calls, in which the model requests a function and the calling program returns the result. Illustrates the chapter's model-asks, harness-acts loop in a local runtime.
