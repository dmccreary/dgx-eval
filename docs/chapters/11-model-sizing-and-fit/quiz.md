# Quiz: Model Sizing and Fit

Test your understanding of weights, quantization, the KV cache, headroom, and the model-fit calculation with these review questions.

---

#### 1. How is the memory for a model's weights calculated?

<div class="upper-alpha" markdown>
1. Parameter count times bytes per weight
2. Context length times KV bytes per token
3. Download size times the number of layers
4. Active parameters times bits per token
</div>

??? question "Show Answer"
    The correct answer is **A**. Model weights are the learned numbers that make up a model, and loading a model means placing every one of them in memory. The memory they take is the parameter count times the size of one number, the bytes per weight. A 27-billion-parameter model needs 54 GB at 16-bit, 27 GB at 8-bit, and 13.5 GB at 4-bit. Context length times KV bytes per token gives the cache, a separate term in the estimate.

    **Concept Tested:** Model Weights

    **See:** [Model Weights](index.md#model-weights)

---

#### 2. What is the KV cache?

<div class="upper-alpha" markdown>
1. A disk folder where downloaded model files are stored
2. Memory holding key and value vectors for tokens in the context
3. The compute buffers and CUDA context the server allocates
4. A table of scaling factors stored inside a quantized file
</div>

??? question "Show Answer"
    The correct answer is **B**. The KV cache is the memory a model uses to remember the conversation so far. For every token already in the context, the model keeps two vectors at every layer, the key and the value, so it does not recompute them for each new token. The cache grows by a fixed amount per token. Compute buffers and the CUDA context are runtime overhead, and scaling factors are part of a quantized file's overhead.

    **Concept Tested:** KV Cache

    **See:** [KV Cache and Context Length Memory](index.md#kv-cache-and-context-length-memory)

---

#### 3. What is safety headroom in a fit calculation, and what default does this course use?

<div class="upper-alpha" markdown>
1. Memory the server uses for compute buffers; 3 GB
2. Extra bits a quantized file stores per parameter; 5 bits
3. Memory reserved for the KV cache; 192 KiB per token
4. Memory deliberately left unused as a margin; 20%
</div>

??? question "Show Answer"
    The correct answer is **D**. Safety headroom is memory deliberately left unused as a margin against what an estimate misses: the operating system, other processes, a cache that grows during a run, and an estimate that is simply low. It is expressed as a share of memory, and this course uses 20% as the default. On a unified-memory machine it is not a nicety, because exhausting a pool the operating system also runs on can freeze the whole machine.

    **Concept Tested:** Safety Headroom

    **See:** [Safety Headroom](index.md#safety-headroom)

---

#### 4. Why does a mixture-of-experts model not save memory compared with a dense model of similar total size?

<div class="upper-alpha" markdown>
1. Its experts are stored at a higher numeric precision
2. Its router keeps a second full copy of every expert's weights
3. Any expert may be chosen next, so all must stay in memory
4. Its KV cache grows with the number of experts that it holds
</div>

??? question "Show Answer"
    The correct answer is **C**. A dense model uses all of its parameters for every token. A mixture-of-experts model routes each token to a small number of expert groups, so only its active parameters do the work. Memory is another matter: any expert may be chosen on the next token, so all parameters must be resident. The two Gemma models show it: similar total size and memory, and a threefold difference in speed. The design saves time per token, not memory.

    **Concept Tested:** Mixture of Experts

    **See:** [Dense Model, Mixture of Experts, and Active Parameters](index.md#dense-model-mixture-of-experts-and-active-parameters)

---

#### 5. Why does a file labeled 4-bit measure nearer 5 bits per parameter?

<div class="upper-alpha" markdown>
1. It stores scaling factors and keeps some layers at higher precision
2. It bundles the whole KV cache needed for the model's full context length
3. It includes a second copy of the weights for error checking
4. It counts the tokenizer and license files as parameters
</div>

??? question "Show Answer"
    The correct answer is **A**. A quantized file stores the scaling factors that let its small numbers be turned back into real ones, and it keeps some layers, often the most precision-sensitive, at higher precision. That extra is the quantized file overhead. The four "4-bit" files measured in this evaluation worked out to between 4.4 and 5.7 bits per parameter, so a planner using 4.0 would underestimate the weights by 10 to 30 percent and make the machine look roomier than it is.

    **Concept Tested:** Quantized File Overhead

    **See:** [Quantized File Overhead, Size on Disk, and Memory for Weights](index.md#quantized-file-overhead-size-on-disk-and-memory-for-weights)

---

#### 6. Why is a context-length setting described as a memory reservation?

<div class="upper-alpha" markdown>
1. The setting limits how many models the server can load
2. The cache is written to disk and then read back for each new token
3. The memory is claimed only once a conversation gets long
4. The cache is allocated at the full setting before any prompt
</div>

??? question "Show Answer"
    The correct answer is **D**. Context length memory is the per-token KV cache amount times the number of tokens you allow. The cache is allocated for the context length the server is configured with, so it is reserved before the first prompt and cannot be ignored until a conversation gets long. This evaluation measured it: a 20 GB model took 29 GB at a 32,000-token setting and 66 to 71 GB at 256,000 tokens while idle. Choose the smallest context the job needs.

    **Concept Tested:** Context Length Memory

    **See:** [KV Cache and Context Length Memory](index.md#kv-cache-and-context-length-memory)

---

#### 7. A 48-billion-parameter model comes as a file labeled 4-bit. At the planned context its KV cache is 6.4 GB, and runtime overhead is 3 GB. Using 5.0 effective bits for the 4-bit file, how much memory does the model need?

<div class="upper-alpha" markdown>
1. 33.4 GB
2. 39.4 GB
3. 30.0 GB
4. 57.4 GB
</div>

??? question "Show Answer"
    The correct answer is **B**. The memory estimation formula adds weights, KV cache, and overhead. Weights are parameters in billions times effective bits divided by 8, and a file labeled 4-bit uses 5.0 effective bits: 48 × 5.0 ÷ 8 = 30 GB. Adding the 6.4 GB cache and 3 GB of overhead gives 39.4 GB. Using exactly 4 bits gives 33.4 GB, which underestimates the weights, and 30 GB counts the weights alone.

    **Concept Tested:** Memory Estimation Formula

    **See:** [Memory Estimation Formula](index.md#memory-estimation-formula)

---

#### 8. A model needs 110 GB on a 128 GB unified-memory machine, and the headroom is 20%. What is the verdict, and what should you do?

<div class="upper-alpha" markdown>
1. Fits; proceed with the run as planned
2. Does not fit; choose a smaller model or lower precision
3. Fits; raise the context length to use the spare memory
4. Fits without headroom; reduce context or use a smaller file
</div>

??? question "Show Answer"
    The correct answer is **D**. A model-fit calculation compares memory needed with memory available after setting aside headroom. Usable memory is 128 × (1 − 0.20) = 102.4 GB. A need of 110 GB is above that and below 128 GB, which is the middle verdict, "Fits without headroom". The action is to reduce context or choose a smaller file, and not to run unattended. Such a model loads and then runs until something else asks for memory, which can be the operating system itself.

    **Concept Tested:** Fit Verdict

    **See:** [Model-Fit Calculation and Fit Verdict](index.md#model-fit-calculation-and-fit-verdict)

---

#### 9. A model needs 60 GB. Machine X has a 24 GB discrete GPU and 512 GB of system RAM. Machine Y has 128 GB of unified memory. On which machine does the model fit?

<div class="upper-alpha" markdown>
1. Only Y: the limit there is the shared pool, not a 24 GB GPU
2. Only X: its 512 GB of system RAM exceeds what is needed
3. Both: each machine has more than 60 GB of memory in total to draw on
4. Neither: 60 GB exceeds a 20% headroom on both machines
</div>

??? question "Show Answer"
    The correct answer is **A**. Unified memory fit is the same calculation with the right number for memory. With dedicated GPU memory, the available memory is the GPU's free memory, so machine X's limit is 24 GB whatever its system RAM. On a unified-memory machine it is the system's available memory minus headroom: 128 GB × 0.80 is 102.4 GB, which holds a 60 GB need. The same model can fit on Y and not fit on X.

    **Concept Tested:** Unified Memory Fit

    **See:** [Unified Memory Fit](index.md#unified-memory-fit)

---

#### 10. The calculator returned "Fits" at 73.7 GB against a 102.4 GB limit, yet a unit stopped responding a few minutes into a long run at that setting. What does this show about the verdict?

<div class="upper-alpha" markdown>
1. The formula's arithmetic is wrong for large context settings
2. The 20% headroom should always be replaced by a 50% headroom
3. The estimate is a floor for the idle state, not a peak
4. The model's weights were really stored at 16 bits
</div>

??? question "Show Answer"
    The correct answer is **C**. A fit verdict predicts the starting footprint. The 73.7 GB estimate matched the 71 GB measured with the model idle, so the arithmetic held. An estimate of the idle footprint is a floor, not a peak: the server's per-conversation state grows as a run proceeds. The cause of that freeze was not confirmed, so the lesson is limited: "Fits" means the idle state fits, not that a long run is safe, which is why a watchdog is added.

    **Concept Tested:** Model-Fit Calculation

    **See:** [Model-Fit Calculator](index.md#model-fit-calculator)
