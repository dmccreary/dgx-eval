# Quiz: Selecting and Downloading an Open-Weight Model

Test your understanding of selection criteria, license review, publisher claims, safe downloading, and the documented shortlist with these review questions.

---

#### 1. What does a model repository on the Hugging Face Hub hold?

<div class="upper-alpha" markdown>
1. A ranked table of models scored on shared tests
2. A versioned folder of weights, config, model card, and license
3. A cache directory on your machine for downloaded files
4. A credential that identifies your account to the hub
</div>

??? question "Show Answer"
    The correct answer is **B**. The Hugging Face Hub is the main public site for sharing machine-learning models, and a model repository is one model's home on it: a versioned folder of files that holds the weights, the configuration, a README called the model card, and a license file. The repository page is a primary source, and reading it is the main selection skill. A ranked table of scores is a leaderboard, and a credential for the hub is an access token.

    **Concept Tested:** Model Repository

    **See:** [Hugging Face Hub and Model Repository](index.md#hugging-face-hub-and-model-repository)

---

#### 2. What does the Apache 2.0 license allow?

<div class="upper-alpha" markdown>
1. Use for research only, with commercial use forbidden
2. Use, modification, and redistribution, including commercial use
3. Use only by organizations below a revenue threshold
4. Use only after signing in and accepting the publisher's gating terms
</div>

??? question "Show Answer"
    The correct answer is **B**. The Apache 2.0 license is a permissive open-source license. It allows use, modification, and redistribution, including commercial use, and it includes an express grant of patent rights from the contributors. It requires you to keep the license and copyright notices and to state changes, and it provides no warranty. For this evaluation it is the easy case: it raises no question about using a model's output in a published book.

    **Concept Tested:** Apache 2.0 License

    **See:** [Apache 2.0 License](index.md#apache-20-license)

---

#### 3. Why should a leaderboard be used to build a long list and not to make the final decision?

<div class="upper-alpha" markdown>
1. Its tests rarely measure what your own workload demands
2. Its scores are computed only for closed models in the cloud
3. Its rankings change each time a listed model is downloaded
4. Its scores already include tool-calling reliability
</div>

??? question "Show Answer"
    The correct answer is **A**. A model leaderboard ranks models by their scores on shared tests. Those scores are cheap evidence, and they answer a question that is rarely yours: a leaderboard of general knowledge or coding says little about whether a model follows a thousand-line skill file or keeps a blank line before every list. Use leaderboards to build a long list, and treat each published score as one more claim to check against what you measure.

    **Concept Tested:** Model Leaderboard

    **See:** [Model Leaderboard and Public Benchmark Score](index.md#model-leaderboard-and-public-benchmark-score)

---

#### 4. Why does publisher provenance matter for an evaluation that will be published?

<div class="upper-alpha" markdown>
1. A repackaged file always takes more space on disk
2. Only the original publisher's files support tool calling
3. A recommendation is only as trustworthy as the file measured
4. A converted file cannot be verified with a checksum
</div>

??? question "Show Answer"
    The correct answer is **C**. Publisher provenance answers the question "where did these weights actually come from?" A file with a famous model's name can be a conversion by a third party, a fine-tune, or something else. For an evaluation that will be published, your recommendation is only as trustworthy as the file it was measured on. Prefer the original publisher's repository, and when you use a conversion, say who made it.

    **Concept Tested:** Publisher Provenance

    **See:** [Publisher Provenance](index.md#publisher-provenance)

---

#### 5. What does a matching SHA-256 checksum tell you about a downloaded model file?

<div class="upper-alpha" markdown>
1. The file is the one the publisher released, unaltered and complete
2. The file's license permits commercial use of everything it generates
3. The file will fit in memory with the default headroom
4. The file is in the format the inference server expects
</div>

??? question "Show Answer"
    The correct answer is **A**. A checksum is a fixed-length value computed from a file's bytes, and any change to the file changes the value. Checksum verification computes it for the file you received and compares it with the value the publisher states. A match means the file is the one the publisher released, unaltered and complete. A mismatch means a corrupt or substituted file, to be deleted and downloaded again. It says nothing about license terms or memory fit.

    **Concept Tested:** Checksum Verification

    **See:** [Checksum Verification](index.md#checksum-verification)

---

#### 6. A candidate supports tool calling, has a 48,000-token context window, needs 22 GB of memory, and carries Apache 2.0 from an identified publisher. What is the decision for this course's workload?

<div class="upper-alpha" markdown>
1. Shortlist it, because it passes all four selection criteria
2. Exclude it, because it does not fit with headroom
3. Exclude it, because its license terms cannot be checked
4. Exclude it, because its window is under 64,000 tokens
</div>

??? question "Show Answer"
    The correct answer is **D**. Model selection criteria come from the workload, not from a leaderboard. This course's workload needs tool calling, a context window of at least 64,000 tokens, a fit with headroom, and an identifiable publisher with checkable terms. This candidate passes three and fails the window test: 48,000 tokens is below the minimum, and the harness prompt alone takes about 19,000 tokens. A small memory footprint does not make up for a window that is too short.

    **Concept Tested:** Model Selection Criteria

    **See:** [Model Selection Criteria](index.md#model-selection-criteria)

---

#### 7. You are about to pull a 65 GB model, and `df -h` shows 60 GB free. What should you do?

<div class="upper-alpha" markdown>
1. Start the pull, since downloads are compressed on disk
2. Start the pull inside `tmux` so it can finish overnight
3. Free space first, for example with `ollama rm <model>`
4. Pull the model in a second file format to save space
</div>

??? question "Show Answer"
    The correct answer is **C**. Storage management is keeping the disk from filling. A download that runs out of space fails partway through and can leave a partial file behind, so a 65 GB model on a disk with 60 GB free fails after an hour. Check free space before a pull, and remove what you no longer need with the server's own command, such as `ollama rm <model>`. Running in `tmux` protects against a dropped session, not a full disk.

    **Concept Tested:** Storage Management

    **See:** [Storage Management](index.md#storage-management)

---

#### 8. A gated model needs an access token, and a script will run the download. Where should the token be kept?

<div class="upper-alpha" markdown>
1. In the script, as a variable near the top of the file
2. In the repository's README, so collaborators can reuse it
3. In the run log, so the download can be reproduced later
4. In an environment variable or the tool's credential store
</div>

??? question "Show Answer"
    The correct answer is **D**. A gated download needs an access token, a credential that identifies your account to the hub. Access token handling means treating it as a secret: keep it in an environment variable or the tool's credential store, not in a script. Never commit it, paste it into a chat, or let it appear in a log or a screenshot. Prefer a token limited to read access, and revoke it when the project ends.

    **Concept Tested:** Access Token Handling

    **See:** [Gated Model Access and Access Token Handling](index.md#gated-model-access-and-access-token-handling)

---

#### 9. One model was claimed to be fast, tested fastest, and still wrote a graph with 40 duplicate labels. Another claimed top tool-use scores and lost the task after a few steps. What do these results show about publisher claims?

<div class="upper-alpha" markdown>
1. Claims are false and should be ignored during selection
2. Claims are hypotheses to test against your own workload
3. Claims are reliable whenever they concern model speed
4. Claims remove the need for a model-only tool-calling test
</div>

??? question "Show Answer"
    The correct answer is **B**. Publisher claims are statements a publisher makes about its model, and they are useful as hypotheses because they name the property the publisher optimized for. They do not state the conditions under which that property fails, and your workload may be one of them. One model was as fast as claimed and still produced duplicate labels; another claimed strong tool use and lost the task. A comparison therefore marks claims as claims and records what testing found.

    **Concept Tested:** Publisher Claims

    **See:** [Publisher Claims and Model Comparison](index.md#publisher-claims-and-model-comparison)

---

#### 10. The evaluation set aside its fastest model partly for broken navigation files, and the fault was later traced to a faulty example in the skill. What was the flaw in that exclusion?

<div class="upper-alpha" markdown>
1. The model was too large to fit with headroom on a single unit
2. The model's license had not been reviewed beforehand
3. The symptom's cause was unconfirmed and no retest was run
4. The model's download had not been checksum-verified
</div>

??? question "Show Answer"
    The correct answer is **C**. An exclusion rationale is the reason a model was left off the shortlist. Here the navigation fault came from a faulty example in the skill, which the model had copied, and the model had not been retested. An exclusion based on a symptom needs the cause confirmed, and an exclusion that is not retested should say so in its rationale. Otherwise a model is dropped for a fault that was never its own.

    **Concept Tested:** Exclusion Rationale

    **See:** [Model Shortlist and Exclusion Rationale](index.md#model-shortlist-and-exclusion-rationale)
