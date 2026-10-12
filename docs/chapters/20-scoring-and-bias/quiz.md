# Quiz: Scoring, Bias, and Structural Checks

Test your understanding of rubrics, structural checks, calibration, bias in judging, and honest reporting with these review questions.

---

#### 1. What is a scoring rubric?

<div class="upper-alpha" markdown>
1. A script that checks whether an output file parses
2. A single number computed from all automated checks
3. A written description of what earns each score
4. A list of the models ranked by first-round results
</div>

??? question "Show Answer"
    The correct answer is **C**. A scoring rubric is a written description of what a result must have to earn each score. It makes a judgment repeatable: two reviewers using the same rubric on the same chapter should give scores that are close. A rubric needs dimensions, a scale, and a description of each level. Without one, "good" means whatever the reviewer felt that day. A single computed number is an automated quality score, which hides the per-dimension profile.

    **Concept Tested:** Scoring Rubric

    **See:** [Scoring Rubric](index.md#scoring-rubric)

---

#### 2. Why does passing every structural check not mean a learning graph is good?

<div class="upper-alpha" markdown>
1. Structural checks are too slow to run on a whole graph
2. The checks test form, so the concepts may still be wrong ones
3. Structural checks can be run only by a human reviewer
4. The checks pass any graph that has exactly 200 concepts
</div>

??? question "Show Answer"
    The correct answer is **B**. Structural checks are the checks a program can run on the form of the output without judging its meaning: does the file exist, does it parse, does it agree with its twin. They are cheap, repeatable, and fast. A structural pass does not mean the content is good: a learning graph can have no cycles and no duplicates and still be a graph of the wrong concepts. The checks are a gate, and the grade is a separate matter.

    **Concept Tested:** Structural Checks

    **See:** [Structural Checks](index.md#structural-checks)

---

#### 3. Why should a report state what did not work with the same care as what did?

<div class="upper-alpha" markdown>
1. Failures are rare, so listing them costs a report very little space
2. A failure is data that readers need and others would repeat
3. Negative results raise a report's automated quality score
4. Failures prove that local models cannot generate usable textbooks
</div>

??? question "Show Answer"
    The correct answer is **B**. Negative result reporting is stating what did not work, and why, with the same care as what did. A failure is data: a model that lost the task, one that wrote its tool call as plain text, and one that could not fit a usable context are all findings, and a reader choosing a model needs them. Omitting them makes a field look easier than it is and makes the next person repeat them.

    **Concept Tested:** Negative Result Reporting

    **See:** [Negative Result Reporting](index.md#negative-result-reporting)

---

#### 4. In a generated graph, concept X has no prerequisites, and three other concepts depend on it. Concept Y has no prerequisites and no dependents. How should each be classified?

<div class="upper-alpha" markdown>
1. Both are orphans, because neither has a prerequisite
2. X is an orphan, and Y is a foundational concept
3. X is foundational, and Y is an orphan
4. Both are foundational, because neither has a prerequisite
</div>

??? question "Show Answer"
    The correct answer is **C**. Orphaned concepts have no prerequisite and no dependent, so they are connected to nothing and cannot be reached from the rest of the graph. They are different from foundational concepts, which have no prerequisites and do have dependents. X has three dependents, so it is foundational and not a defect. Y is connected to nothing, so it is an orphan. Flagging every concept without a prerequisite would mark the graph's legitimate starting points as faults.

    **Concept Tested:** Orphaned Concepts

    **See:** [Duplicate Labels, Orphans, and Label Length](index.md#duplicate-labels-orphans-and-label-length)

---

#### 5. You have written a check for the 32-character label limit. Which calibration set should you run before trusting it on real output?

<div class="upper-alpha" markdown>
1. The ten candidate graphs, accepting whatever the check reports
2. A single 64-character label that is certain to fail
3. A good label, a bad label, and labels of 32 and 33 characters
4. The longest label found in the published reference book
</div>

??? question "Show Answer"
    The correct answer is **C**. Scoring check calibration tests the checks themselves on inputs whose answers you know, before you trust them on real output. A check can pass a bad result or fail a good one, and the second looks like a model failure. The calibration set is small: a known-good input that must pass, a known-bad input that must fail for the right reason, and an edge case at the threshold, such as a label of exactly 32 characters and one of 33.

    **Concept Tested:** Scoring Check Calibration

    **See:** [Scoring Check Calibration](index.md#scoring-check-calibration)

---

#### 6. In a graph, D needs E, A needs B, B needs C, C needs A, and E needs nothing. The cycle check repeatedly removes every concept with no remaining prerequisites. What is left when it stops?

<div class="upper-alpha" markdown>
1. Nothing remains, so the graph is acyclic
2. Only E remains, because it has no prerequisites
3. D and E remain, because they form a single chain
4. A, B, and C remain, so the graph has a cycle
</div>

??? question "Show Answer"
    The correct answer is **D**. The dependency cycle check repeatedly removes the concepts that have no remaining prerequisites. E needs nothing, so it goes first, and D then has no remaining prerequisite and goes next. A, B, and C each wait on another of the three, so none ever becomes ready. If everything can be removed the graph is acyclic. Here three concepts are left, and they form the cycle, so no order of study satisfies all of them.

    **Concept Tested:** Dependency Cycle Check

    **See:** [Dependency Cycle Check and CSV-JSON Agreement](index.md#dependency-cycle-check-and-csv-json-agreement)

---

#### 7. A team scores two models' chapters with an LLM judge and always shows model 1's chapter first. Model 1 wins nearly every comparison. Which weakness of the judge could produce this pattern regardless of quality?

<div class="upper-alpha" markdown>
1. Position bias: the judge tends to prefer the first candidate
2. Data exposure: the judge sends the text to a cloud service
3. Calibration: the judge's label limit is set too strictly
4. Run variance: the judge was given only one chapter to read
</div>

??? question "Show Answer"
    The correct answer is **A**. LLM-as-judge is using a language model to score another model's output. It is fast and cheap, and it is the largest source of bias in this kind of evaluation: a judge tends to prefer text like its own, favors longer answers, is sensitive to the order in which candidates are shown, and rewards confident prose that is wrong. A candidate always shown first can win on position alone. The mitigation is to randomize the order and score twice.

    **Concept Tested:** LLM-as-Judge

    **See:** [LLM-as-Judge](index.md#llm-as-judge)

---

#### 8. A reviewer who knows which model wrote each chapter scores the cloud model's chapters higher across many chapters, even when order and length are matched. What is this tilt, and what addresses it?

<div class="upper-alpha" markdown>
1. Bias from knowing the source; blind review removes the name
2. Noise from sampling; more chapters will average it out
3. A calibration fault; the check's threshold should be loosened
4. Run variance; each model should be run five more times
</div>

??? question "Show Answer"
    The correct answer is **A**. Bias in evaluation is a systematic tilt in scoring that favors some results for reasons unrelated to quality. Noise averages out over many runs; bias does not, and it points the same way every time. One named source is knowing the source: a reviewer who knows which model wrote a text, or that it came from a cloud service, is influenced by the name. Blind review, in which the reviewer does not know the model, removes that influence.

    **Concept Tested:** Bias in Evaluation

    **See:** [Bias in Evaluation](index.md#bias-in-evaluation)

---

#### 9. A team must judge the writing quality of locally generated chapters. The text must not leave the site, and the team wants the most trustworthy measure of quality. Which option best meets both criteria?

<div class="upper-alpha" markdown>
1. A cloud LLM judge, because it scales to thousands of outputs
2. A Flesch-Kincaid grade, because a script computes it cheaply
3. A single automated score, because it ranks outputs at a glance
4. Blind human review against the rubric, in randomized order
</div>

??? question "Show Answer"
    The correct answer is **D**. Blind human review is a person scoring output against the rubric without knowing which model produced it, with the order randomized. It is the right test of quality, though slow and costly. A cloud LLM judge sends the text to a service, which undoes the reason for generating locally, and it carries its own biases. A reading-level formula measures form only, and a single automated score hides the profile. Under these two criteria, only blind review qualifies.

    **Concept Tested:** Blind Human Review

    **See:** [Blind Human Review and the Human Quality Score](index.md#blind-human-review-and-the-human-quality-score)

---

#### 10. You are asked to design an automated quality score that ranks outputs without hiding where each one is weak, and without defining quality as whatever is easy to measure. Which design meets those requirements?

<div class="upper-alpha" markdown>
1. A weighted sum of the checks that are fastest to run
2. One number that replaces the per-dimension profile
3. A score assigned by the same model that wrote the chapters
4. A published rubric formula, reported beside the profile
</div>

??? question "Show Answer"
    The correct answer is **D**. An automated quality score is a single number a program computes from the checks. It is tempting and dangerous: one number hides the profile, and a weighting that favors the easy checks quietly defines quality as whatever is easy to measure. A sound design is a documented formula over the rubric dimensions, published with its weights, and reported beside the profile, not instead of it. A score from the generating model would add self-preference bias.

    **Concept Tested:** Automated Quality Score

    **See:** [Automated Quality Score](index.md#automated-quality-score)
