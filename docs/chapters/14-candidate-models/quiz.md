# Quiz: Open-Weight Model Families and Candidate Models

Test your understanding of the open-weight model families, the ten candidates, and what the first round of testing showed with these review questions.

---

#### 1. What does the Gemma 4 release offer that makes a clean comparison of two model designs?

<div class="upper-alpha" markdown>
1. A coding model and a general model released under the same license
2. Two dense models that differ only in context window
3. A cloud model and a local model with identical weights
4. A dense model and a mixture-of-experts model of similar size
</div>

??? question "Show Answer"
    The correct answer is **D**. The Gemma family comes from Google and is offered in sizes that fit a single machine. Its Gemma 4 release includes both a dense model and a mixture-of-experts model at similar total size, which makes a clean comparison of the two designs. The two candidates here are `gemma4:31b`, the dense one, and `gemma4:26b`, the mixture-of-experts sibling. A general model alongside a coding model describes the Mistral family's pair instead.

    **Concept Tested:** Gemma Family

    **See:** [Qwen, Gemma, and Mistral](index.md#qwen-gemma-and-mistral)

---

#### 2. How is IBM's Granite family positioned?

<div class="upper-alpha" markdown>
1. For always-on agents, with a one-million-token context window
2. For enterprise use, with a plain Apache 2.0 license
3. For coding agents, with a 384,000-token context window
4. For modest hardware, with strong results at a small size
</div>

??? question "Show Answer"
    The correct answer is **B**. The Granite family comes from IBM. It is positioned for enterprise use, with a plain Apache 2.0 license, structured output, and documentation of its training data governance. Its one candidate here is `granite4.2:30b`, the conservative choice. Always-on agents and a one-million-token window describe NVIDIA's Nemotron candidate, and strong results at a size that fits modest hardware describe Microsoft's Phi family.

    **Concept Tested:** Granite Family

    **See:** [Nemotron, gpt-oss, and Granite](index.md#nemotron-gpt-oss-and-granite)

---

#### 3. Why is none of the ten candidates a Phi model?

<div class="upper-alpha" markdown>
1. Phi models carry a license that forbids published use
2. The long skills and 64,000-token minimum favored larger models
3. Phi models cannot be served through the Ollama library
4. The Phi family has no model that supports tool calling
</div>

??? question "Show Answer"
    The correct answer is **B**. The Phi family is Microsoft's line of small models, designed to give strong results at a size that fits modest hardware. None of the ten candidates is a Phi model because the benchmark's long skills and its 64,000-token minimum context favored larger models. That is a statement about this workload, not about the family's quality: a reader with less memory than this evaluation's unit would start with Phi.

    **Concept Tested:** Phi Family

    **See:** [Llama and Phi](index.md#llama-and-phi)

---

#### 4. Why could `gpt-oss:120b` run at a usable speed despite having 117 billion parameters?

<div class="upper-alpha" markdown>
1. Only about 5 billion of its parameters are active per token
2. Its weights are stored at 16 bits instead of 4 bits
3. It ran on both DGX units at once to share the load
4. Its context window was limited to 32,000 tokens
</div>

??? question "Show Answer"
    The correct answer is **A**. `gpt-oss:120b` is a mixture-of-experts model. Only about 5 billion of its 117 billion parameters are active for each token, so it ran at 38 to 44 tokens per second and was the largest model that still ran at a usable speed. The dense `mistral-medium-3.5:128b`, which uses all of its parameters for every token, ran at 3 tokens per second. Storing weights at 16 bits would add memory and no speed.

    **Concept Tested:** gpt-oss:120b

    **See:** [The Remaining Candidates](index.md#the-remaining-candidates)

---

#### 5. Why did `qwen3.8:27b` take 102 minutes for the first stage when the five other models that finished took 6 to 22?

<div class="upper-alpha" markdown>
1. Its graph had 40 duplicate labels that had to be repaired by hand
2. It was stopped and restarted at the 150-minute limit
3. The server re-read almost the whole conversation each turn
4. Its download was the largest of the ten candidates
</div>

??? question "Show Answer"
    The correct answer is **C**. `qwen3.8:27b` produced the cleanest learning graph of the first stage: exactly 200 concepts, no cycles, and no duplicate labels. It took 102 minutes where the five others that finished took 6 to 22, because the server re-read almost the whole conversation on every turn. The delay came from that repeated reading, not from a faulty graph, and in the later chapter-writing stage the model was too slow to finish a chapter inside 90 minutes.

    **Concept Tested:** qwen3.8:27b

    **See:** [The Qwen Candidates](index.md#the-qwen-candidates)

---

#### 6. You want a first-stage model that combines speed with a complete, correct result, judging only by the first round. Which candidate fits best?

<div class="upper-alpha" markdown>
1. `gemma4:26b`: under 6 minutes, with 40 duplicate labels
2. `qwen3.8:27b`: no structural fault, in 102 minutes
3. `granite4.2:30b`: stopped at the 150-minute limit
4. `qwen3.6:35b`: 22 minutes, with every file present
</div>

??? question "Show Answer"
    The correct answer is **D**. `qwen3.6:35b` was the best combination of speed and correctness in the first round: 83 to 105 tokens per second and a learning graph in 22 minutes with every file present. Its graph is looser than the Qwen 3.8 one, with 19 concepts that have no prerequisite, but the faster `gemma4:26b` wrote 40 duplicate labels and the cleaner `qwen3.8:27b` needed 102 minutes. Each figure is a single run, so the choice is provisional.

    **Concept Tested:** qwen3.6:35b

    **See:** [The Qwen Candidates](index.md#the-qwen-candidates)

---

#### 7. You plan to use `gemma4:26b` for the learning-graph stage because it finishes in under six minutes. Given its first-round result, what should your pipeline add?

<div class="upper-alpha" markdown>
1. A longer time limit, since it ran out of time in that round
2. A larger context window, since its first prompt was too long
3. A check for duplicate labels that triggers a second attempt
4. A second unit, since the model does not fit on one machine
</div>

??? question "Show Answer"
    The correct answer is **C**. `gemma4:26b` was the fastest model tested and finished the learning graph in under six minutes, but that graph has 40 duplicate concept labels out of 200, which is a serious flaw. A model this fast can afford a second attempt, but something has to notice that one is needed. A structural check for duplicate labels is that something. Time limits and memory were not its problem in the first round.

    **Concept Tested:** gemma4:26b

    **See:** [The Gemma Candidates](index.md#the-gemma-candidates)

---

#### 8. `granite4.2:30b` was stopped at the 150-minute limit in its single first-round run. Which statement may a report make?

<div class="upper-alpha" markdown>
1. In one run it reached the time limit with only a concept list
2. The model cannot produce a learning graph on this kind of hardware
3. The model is ranked last among the ten candidates tested
4. The Granite family is unsuitable for textbook generation
</div>

??? question "Show Answer"
    The correct answer is **A**. Every first-round figure comes from a single attempt, so a result is a first observation, not a verdict. `granite4.2:30b` ran at 12 tokens per second and was stopped at the 150-minute limit having produced only the concept list, and a report may say exactly that. A model that failed once may succeed on a second try, so repeat a run before writing a sentence that begins "model X cannot". One run is not a ranking.

    **Concept Tested:** granite4.2:30b

    **See:** [The First Round at a Glance](index.md#the-first-round-at-a-glance)

---

#### 9. `muse-glimmer:30b` lost the task after a few steps in the harness. Which observation points to the likely cause?

<div class="upper-alpha" markdown>
1. It ran at only 3 tokens per second in the model-only smoke test
2. Its download was the largest of the ten candidates
3. Its first prompt took 35,000 tokens, far more than the others
4. It wrote 40 duplicate concept labels into its own learning graph
</div>

??? question "Show Answer"
    The correct answer is **C**. `muse-glimmer:30b` lost the task after a few steps in the harness, which looks like a context problem: its first prompt took 35,000 tokens where the others took 17,000 to 21,000. That is a reading of the evidence, not a confirmed diagnosis. The other observations belong to different candidates: 3 tokens per second and the largest download were `mistral-medium-3.5:128b`, and the 40 duplicate labels were `gemma4:26b`.

    **Concept Tested:** muse-glimmer:30b

    **See:** [The Remaining Candidates](index.md#the-remaining-candidates)

---

#### 10. What trade-off does the first round show between the dense `gemma4:31b` and its mixture-of-experts sibling `gemma4:26b`?

<div class="upper-alpha" markdown>
1. The dense model was faster, and the sibling followed rules better
2. The dense model needed far more memory for the same speed
3. Both ran at the same speed, and only their licenses differed
4. The dense model was slower but the more consistent rule-follower
</div>

??? question "Show Answer"
    The correct answer is **D**. `gemma4:31b` is a dense model and was the most consistent rule-follower in the tests: it passed every model-only rule twice and ended every smoke run with a site that builds, at 28 to 40 tokens per second. Its mixture-of-experts sibling `gemma4:26b` was the fastest model tested, at 86 to 130 tokens per second, and wrote a graph with 40 duplicate labels. The pair trades speed against rule-following at a similar total size.

    **Concept Tested:** gemma4:31b

    **See:** [The Gemma Candidates](index.md#the-gemma-candidates)
