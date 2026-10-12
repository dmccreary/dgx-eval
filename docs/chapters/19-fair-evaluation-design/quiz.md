# Quiz: Designing a Fair Evaluation

Test your understanding of evaluation questions, variables, fixed inputs, repeated runs, baselines, and layered testing with these review questions.

---

#### 1. What are controlled variables?

<div class="upper-alpha" markdown>
1. The outcomes that are recorded in the same way for each and every run
2. The factors that changed without anyone deciding they should
3. The factors that could affect the result, held fixed on purpose
4. The single factor that the experiment deliberately changes
</div>

??? question "Show Answer"
    The correct answer is **C**. Controlled variables are everything other than the independent variable that could affect the result, which the design holds fixed on purpose. They are the reason a difference can be blamed on the independent variable. In this evaluation they include the course, the prompts, the harness and server versions, the skills, the hardware, and the quantization. Each one is a written decision, and a factor that varied without being decided is an uncontrolled variable.

    **Concept Tested:** Controlled Variables

    **See:** [Controlled Variables](index.md#controlled-variables)

---

#### 2. What are fixed inputs?

<div class="upper-alpha" markdown>
1. The exact files and prompts that every run starts from
2. The metrics chosen after the first results are seen
3. The hardware settings that differ from one model to the next
4. The logs that each run writes while it is still in progress
</div>

??? question "Show Answer"
    The correct answer is **A**. Fixed inputs are the exact files and prompts every run starts from. They are the most concrete controlled variable and the cheapest to get right. Here the course description is an unchanged copy, the starting workspace is copied fresh for every run, and each stage has one prompt file. Keep them in version control so a change is visible, and copy them into each run so that no run can alter the input of the next.

    **Concept Tested:** Fixed Inputs

    **See:** [Fixed Inputs](index.md#fixed-inputs)

---

#### 3. Why must metrics be chosen before the data is seen?

<div class="upper-alpha" markdown>
1. Metrics chosen later cannot be computed by a program
2. Completion metrics are available only before a run starts
3. The server discards token counts once a run has ended
4. Choosing afterward lets you pick what flatters a favorite
</div>

??? question "Show Answer"
    The correct answer is **D**. Metric selection is choosing what to measure, and a metric is useful only if it answers the question, can be computed the same way for every run, and was decided before you saw the data. If you look at the data and then choose the measure that makes your favorite model look best, you have not run an experiment. Write the metrics into the record before the first run, and add new ones later only as clearly labeled extras.

    **Concept Tested:** Metric Selection

    **See:** [Metric Selection](index.md#metric-selection)

---

#### 4. What is the purpose of a control run?

<div class="upper-alpha" markdown>
1. To give a slow model a second chance to finish its stage in time
2. To check the apparatus by repeating a run that should match
3. To compare a local model's output with a cloud model's
4. To measure how a model behaves with its reasoning mode turned off
</div>

??? question "Show Answer"
    The correct answer is **B**. A control run is a repeat of a run that should give the same answer, done to check the apparatus and not the subject. If the control differs from the original by more than the expected variation, something in the setup changed in between, such as memory pressure, a thermal state, or a server setting. It is cheap, and it separates "this model really behaves this way" from "this machine behaved differently this afternoon".

    **Concept Tested:** Control Run

    **See:** [Control Run](index.md#control-run)

---

#### 5. A team proposes the evaluation question "Is our new model good?" Which revision makes it a question an experiment can answer?

<div class="upper-alpha" markdown>
1. "Is our new model really good across the tasks that matter to us?"
2. "Does it finish stage 1 with no structural faults within 150 minutes?"
3. "Is our new model better than most people would expect it to be?"
4. "Does our new model work well on the machine we already own?"
</div>

??? question "Show Answer"
    The correct answer is **B**. An evaluation question is the single, answerable question the experiment exists to answer. A good one names what is being compared, on what task, under what conditions, and what would count as an answer. The test is whether you can imagine two different outcomes. Only the revision with a named stage, a structural-fault criterion, and a time limit can come out "yes" or "no". The others still leave "good", "better", and "well" undefined.

    **Concept Tested:** Evaluation Question

    **See:** [Evaluation Question](index.md#evaluation-question)

---

#### 6. You have ten new candidate models and limited time. Following two-layer testing, what do you run first?

<div class="upper-alpha" markdown>
1. Short fixed tasks sent to the server, with no harness
2. The full three-stage pipeline, run for each model in turn
3. The three-minute skill run through the harness
4. A cloud baseline run of all three benchmark stages
</div>

??? question "Show Answer"
    The correct answer is **A**. Two-layer testing tests a model alone first and then inside the harness. The model-only test sends short, fixed tasks directly through the server, with no harness, and checks the output against rules. It takes minutes, and a failure there has a cause you can name. Going straight to the full pipeline makes every failure slow and mixes the causes. The three-minute harness smoke test is the second layer, for the models that pass the first.

    **Concept Tested:** Model-Only Test

    **See:** [Two-Layer Testing, Model-Only Test, and Harness Smoke Test](index.md#two-layer-testing-model-only-test-and-harness-smoke-test)

---

#### 7. The model-only tests ran with reasoning turned off, and the harness runs used each model's own default. One model then spent nineteen minutes on a single turn. What role does reasoning mode play in this design?

<div class="upper-alpha" markdown>
1. An uncontrolled variable that is mixed with the model itself
2. The independent variable that the design deliberately set out to change
3. A controlled variable, since each model used its default
4. A measured result that is recorded for every run
</div>

??? question "Show Answer"
    The correct answer is **A**. An uncontrolled variable is something that could affect the result and that the design did not hold fixed. Reasoning mode was off in the model-only tests and left at each model's own default in the harness runs, so it differed by model without being decided. It is therefore mixed with the independent variable, and predictions from the model-only test did not match the harness runs. Using each model's default is not control; control is a deliberate, recorded choice.

    **Concept Tested:** Uncontrolled Variable

    **See:** [Uncontrolled Variable](index.md#uncontrolled-variable)

---

#### 8. Model X finishes a stage in 20 minutes on one run and 45 on another. Model Y finishes in 30 minutes on its only run. What can be concluded about which model is faster?

<div class="upper-alpha" markdown>
1. X is faster, because its best run beat Y's run
2. Y is faster, because it beat X's average of 32.5 minutes
3. They are equal, because the three run times average out evenly
4. Neither claim holds; X's spread spans Y's single result
</div>

??? question "Show Answer"
    The correct answer is **D**. Run variance is how much results differ among repeated runs of the same configuration. A single run is a sample of one and supports a statement about that run only. X's two runs span 20 to 45 minutes, and Y's single 30-minute run falls inside that spread, so ranking either ahead of the other is a coin flip. With five runs of each, the spread is visible and the comparison can be stated with its uncertainty.

    **Concept Tested:** Run Variance

    **See:** [Repeated Runs, Run Variance, and Sample Size](index.md#repeated-runs-run-variance-and-sample-size)

---

#### 9. Why is the published Algebra I book a reference for scale and not yet a baseline for the local runs?

<div class="upper-alpha" markdown>
1. It used a different course description from the local runs
2. It used earlier skill versions and kept no timings or token counts
3. It was written by a local model on a different DGX unit
4. It has fewer concepts and chapters than the local runs produced
</div>

??? question "Show Answer"
    The correct answer is **B**. A baseline comparison judges a result against a reference produced under the same rules. The published Algebra I book used the same course description, but it was made with earlier versions of the skills, its prompts were not recorded, and no timings or token counts were kept. It shows how large a finished book is. It cannot say how long a cloud model takes or how good its output is under these conditions, so the cloud baseline remains to be run.

    **Concept Tested:** Baseline Comparison

    **See:** [Baseline Comparison and Fair Comparison](index.md#baseline-comparison-and-fair-comparison)

---

#### 10. Three designs are proposed for comparing ten models. Design 1 changes only the model. Design 2 also lets each model use its own best context length and reasoning setting. Design 3 splits the models across two DGX units. Which design best answers "which model performs best on this task", and why?

<div class="upper-alpha" markdown>
1. Design 2, because each model is shown at its tuned best
2. Design 3, because two units finish the runs in half the time
3. Design 1, because any difference can be blamed on the model
4. Design 2, because more settings give more data per run
</div>

??? question "Show Answer"
    The correct answer is **C**. The independent variable is the one thing the experiment deliberately changes, and the discipline is to change one thing. Design 1 varies only the model, so a difference in results can be attributed to it. Design 2 varies three things together, and design 3 mixes the model with the machine, so neither can say why runs differ. Design 2 may be worth running as a separate experiment about tuning, but not presented as a comparison of models.

    **Concept Tested:** Independent Variable

    **See:** [Independent Variable](index.md#independent-variable)
