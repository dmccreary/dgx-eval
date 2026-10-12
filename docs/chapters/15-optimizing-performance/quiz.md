# Quiz: Optimizing Small Language Model Performance

Test your understanding of the kinds of time in a run, prompt caching, the settings that move speed, and the limits that cut a run short with these review questions.

---

#### 1. What does tokens per second measure?

<div class="upper-alpha" markdown>
1. How fast the server reads the tokens of the prompt
2. How long the server takes to load a model from disk
3. How many requests the server completes each second
4. How many output tokens the model produces each second
</div>

??? question "Show Answer"
    The correct answer is **D**. Tokens per second is the generation speed: how many output tokens the model produces each second once it has started. Generation is slower than reading because each token depends on the one before it, so tokens are produced in sequence and each requires reading the model's active weights from memory. Reading the prompt has its own, much higher figure, the prompt processing speed. The measured generation speeds in this evaluation ranged from 3 to 130 tokens a second.

    **Concept Tested:** Tokens per Second

    **See:** [Tokens per Second](index.md#tokens-per-second)

---

#### 2. What is time to first token mostly made up of?

<div class="upper-alpha" markdown>
1. Model loading, if needed, and prompt processing
2. Generating the reply and running the requested tool
3. Sampling the next token at a high temperature
4. Writing the vitals log and checking the watchdog
</div>

??? question "Show Answer"
    The correct answer is **A**. Time to first token is the delay between sending a request and receiving the first token of the reply. It is made up mostly of loading the model, if it is not already loaded, and prompt processing. One model in this evaluation read a 30,000-token prompt at about 3,000 tokens a second, so its time to first token was about ten seconds. Generating the rest of the reply and running tools come after the first token.

    **Concept Tested:** Time to First Token

    **See:** [Prompt Processing Speed and Time to First Token](index.md#prompt-processing-speed-and-time-to-first-token)

---

#### 3. What does a temperature setting of 0 do?

<div class="upper-alpha" markdown>
1. It limits the choice to the k most likely tokens
2. It spreads the choice across less likely tokens
3. It always takes the most likely next token
4. It stops generation after the first token
</div>

??? question "Show Answer"
    The correct answer is **C**. Sampling parameters control how the next token is chosen from the model's probabilities. Temperature scales how adventurous the choice is: 0 always takes the most likely token, and higher values spread the choice. Limiting the choice to the k most likely tokens is top-k, a different parameter. These settings change the output, so a benchmark must fix and record them, and they have little effect on speed.

    **Concept Tested:** Temperature Setting

    **See:** [Sampling Parameters, Temperature, Top-p, and Top-k](index.md#sampling-parameters-temperature-top-p-and-top-k)

---

#### 4. How does prompt caching shorten an agent turn?

<div class="upper-alpha" markdown>
1. The server reuses saved state and reads only the new tokens
2. The harness stops resending the conversation after the first turn
3. The model writes several tokens of the reply in parallel
4. The server stores finished replies and returns them on later turns
</div>

??? question "Show Answer"
    The correct answer is **A**. An agent harness resends the whole conversation on every turn. Prompt caching is the server's remedy: it keeps the already-computed internal state for the part of the prompt that has not changed, so each new turn only has to read what is new. With caching working, a turn that adds 2,000 tokens to a 50,000-token conversation reads 2,000. The harness still resends everything, and replies are still written one token at a time.

    **Concept Tested:** Prompt Caching

    **See:** [Prompt Caching and Prompt Re-Reading](index.md#prompt-caching-and-prompt-re-reading)

---

#### 5. Why is latency, and not throughput, the figure that matters for a single benchmark session?

<div class="upper-alpha" markdown>
1. Throughput can be measured only on dedicated GPU memory
2. Throughput and latency are two names for the same figure
3. Only one request is in flight at a time, so latency governs
4. A benchmark session never generates more than one reply
</div>

??? question "Show Answer"
    The correct answer is **C**. Latency is the total time for one request, from sending it to receiving the last token. Throughput is the total work done per unit of time across all requests in flight. For a single benchmark session only one request is in flight at a time, so latency is what you feel and throughput is irrelevant. For a service that generates many books at once, throughput is the number that sets the cost per book.

    **Concept Tested:** Latency

    **See:** [Latency and Throughput](index.md#latency-and-throughput)

---

#### 6. Why is thermal throttling invisible in a short speed test?

<div class="upper-alpha" markdown>
1. Throttling occurs only while the GPU is idle
2. Throttling is reported only in the model card
3. A short test reads the prompt but never writes a reply
4. A short test ends before the chassis has warmed up
</div>

??? question "Show Answer"
    The correct answer is **D**. Thermal throttling is the chip reducing its own speed to stay below a safe temperature. It shows up as a speed that falls over a long run with no change in the workload. A thirty-second test finishes before the chassis has warmed, so the only way to find throttling is to run long and read temperature and tokens per second together. A speed that decays while the temperature climbs is the pattern to look for.

    **Concept Tested:** Thermal Throttling

    **See:** [Thermal Throttling](index.md#thermal-throttling)

---

#### 7. A server processes prompts at 500 tokens per second. Because of re-reading, each agent turn reads 55,000 tokens. How long does the reading take on each turn, before any reply token is written?

<div class="upper-alpha" markdown>
1. 11 seconds
2. 55 seconds
3. 110 seconds
4. 275 seconds
</div>

??? question "Show Answer"
    The correct answer is **C**. Prompt processing speed is how fast the server reads the prompt, in input tokens per second. Reading time is the tokens read divided by that speed: 55,000 ÷ 500 is 110 seconds, before a single reply token is written. That is why a turn that re-reads most of a conversation is dominated by reading. With caching working, the same turn would read only the new tokens, perhaps 2,000, in about four seconds at this speed.

    **Concept Tested:** Prompt Processing Speed

    **See:** [Time Breakdown for an Agent Turn](index.md#time-breakdown-for-an-agent-turn)

---

#### 8. Two runs differ in quantization, context length, and keep-alive, and the second is faster. What should you do to learn which setting mattered?

<div class="upper-alpha" markdown>
1. Average the two runs and report the mean speed
2. Change one setting at a time against a fixed baseline
3. Keep all three changes, since the second run was faster
4. Raise the temperature and see whether the speed changes
</div>

??? question "Show Answer"
    The correct answer is **B**. Performance optimization is changing one setting at a time and measuring the result against a fixed baseline: one change, one measurement, then restore. A comparison between two runs that differ in three settings tells you nothing about which one mattered. Each setting moves a different part of the time, so the single-change discipline is also how you confirm that the setting aimed at your bottleneck is the one that helped.

    **Concept Tested:** Performance Optimization

    **See:** [Performance Optimization](index.md#performance-optimization)

---

#### 9. A vitals log shows available memory falling from 72 GiB at the start of a run to 18 GiB near the end, and the job has slowed. What is the condition, and which figure does a watchdog act on?

<div class="upper-alpha" markdown>
1. Memory pressure; the watchdog acts on the low, later figure
2. Thermal throttling; the watchdog acts on the starting figure
3. Prompt re-reading; the watchdog acts on tokens read per turn
4. A model reload; the watchdog acts on the keep-alive period
</div>

??? question "Show Answer"
    The correct answer is **A**. Memory pressure is the condition in which available memory is low enough that the system starts to struggle: it swaps, stalls, or kills a process. It builds gradually as the context grows, and the symptom is a job that slows for no obvious reason late in a run. The vitals log records available memory every 30 seconds, so the slope is visible. A fall from 72 GiB to 18 GiB is growing pressure, and the second number is the one a watchdog acts on.

    **Concept Tested:** Memory Pressure

    **See:** [Memory Pressure](index.md#memory-pressure)

---

#### 10. In a turn with prompt re-reading, reading takes 110 of the 138 seconds. What would tripling the generation speed do to that turn?

<div class="upper-alpha" markdown>
1. The turn would take about a third as long
2. The turn would barely change, since reading dominates
3. The turn would get slower, since the tool would then wait
4. The turn would fail, since the KV cache would overflow
</div>

??? question "Show Answer"
    The correct answer is **B**. A turn's time is reading plus writing plus tool time. With prompt re-reading, the server recomputes most of the conversation on each turn, so the first term dominates: 55,000 tokens at 500 per second is 110 of the 138 seconds. Tripling the generation speed would shorten only the 23 seconds of writing, so the turn would barely change. The setting to fix first is the one aimed at the bottleneck, which here is caching.

    **Concept Tested:** Prompt Re-Reading

    **See:** [Time Breakdown for an Agent Turn](index.md#time-breakdown-for-an-agent-turn)
