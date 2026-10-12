# Quiz: Running the Textbook Benchmark

Test your understanding of the benchmark stages, the runner, time limits, completion criteria, per-stage metrics, and output retrieval with these review questions.

---

#### 1. What does the benchmark runner do first when it executes a stage?

<div class="upper-alpha" markdown>
1. Copies the starting directory to a fresh run directory
2. Deletes the previous stage's run directory to save space
3. Scores the generated files against the written scoring rubric
4. Uploads the event stream to the public repository
</div>

??? question "Show Answer"
    The correct answer is **A**. The benchmark runner is the script that executes one stage. It takes a model, a label, a prompt file, and a starting directory, and its first act is to copy the starting directory to a fresh run directory. It then starts the harness container, feeds in the prompt and captures every event, stops the run at its time limit if needed, and records the exit code and wall-clock seconds. Because it works on a copy, a run never changes its input.

    **Concept Tested:** Benchmark Runner

    **See:** [Benchmark Runner](index.md#benchmark-runner)

---

#### 2. What happens to a run that reaches its time limit?

<div class="upper-alpha" markdown>
1. It is restarted from the template with a longer limit
2. It continues, and the overrun is recorded only as a warning
3. It exits with code 124, and what it wrote so far is kept
4. It is deleted, and the model is then removed from the queue
</div>

??? question "Show Answer"
    The correct answer is **C**. The run time limit is the longest a run may take before the runner stops it, so a stuck or very slow model cannot occupy the machine for hours. A run stopped by the limit exits with code 124, and what it wrote so far is kept, so a timeout is a result and not a lost run. The limits were 150 minutes for stage 1, 2 hours for stage 2, and 90 minutes for each chapter in stage 3.

    **Concept Tested:** Run Time Limit

    **See:** [Run Event Stream and Run Time Limit](index.md#run-event-stream-and-run-time-limit)

---

#### 3. Why was Algebra I chosen as the benchmark course?

<div class="upper-alpha" markdown>
1. It needs MicroSims, a glossary, and quizzes to be complete
2. It is the shortest course the skills are able to generate
3. A published book gives a scale reference, and reviewers know it
4. Its concepts have no dependencies, so stage 1 is simple
</div>

??? question "Show Answer"
    The correct answer is **C**. The Algebra I benchmark is this evaluation's instance of a textbook benchmark: the input is a high school Algebra I course description, and the task is its learning graph, chapter structure, and chapter content. The course was chosen for a practical reason. A published Algebra I book already exists, so its size is a reference for scale, and the subject is familiar enough that a reviewer can judge the output without special expertise.

    **Concept Tested:** Algebra I Benchmark

    **See:** [Textbook Benchmark and the Algebra I Benchmark](index.md#textbook-benchmark-and-the-algebra-i-benchmark)

---

#### 4. Why does the benchmark use a chapter completion criterion instead of the model's own statement that it finished?

<div class="upper-alpha" markdown>
1. The model's final message is not saved in the event stream
2. A model's claim shows its belief, not what was actually written
3. The criterion gives slower models some extra time for each chapter
4. The harness cannot detect when the model ends its turn
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter completion criterion says a chapter counts as written when its placeholder text is gone and it has at least 1,000 words. It exists because "the model said it finished" is not evidence. A model that announces completion has told you what it believes, and the criterion tells you what happened. It catches a model that announces it is running a skill and then ends its turn without writing anything.

    **Concept Tested:** Chapter Completion Criterion

    **See:** [Chapter Completion Criterion](index.md#chapter-completion-criterion)

---

#### 5. You are starting stage 2 for a model whose stage 1 run is labeled `s1-<label>`. Which starting directory do you pass to the runner?

<div class="upper-alpha" markdown>
1. The stage 1 run directory for that model
2. The benchmark workspace template
3. An empty directory created for stage 2
4. The published reference book's repository
</div>

??? question "Show Answer"
    The correct answer is **A**. Stage chaining is the arrangement in which each stage starts from the previous stage's output directory, so the work accumulates. The starting directory is the template for stage 1 only; for each later stage it is the previous stage's run directory. The runner copies whatever directory it is given, so the stage 1 output itself is left unchanged. Starting stage 2 from the template would give the chapter-structure skill no learning graph to organize.

    **Concept Tested:** Stage Chaining

    **See:** [Pipeline Stage, Stage Chaining, and Stage Sensitivity](index.md#pipeline-stage-stage-chaining-and-stage-sensitivity)

---

#### 6. A model attempted three stages. Stage 1 ended on its own with all seven required files. Stage 2 ended on its own but left out one required file. Stage 3 was stopped at its time limit. What is its skill completion rate?

<div class="upper-alpha" markdown>
1. 0 of 3
2. 1 of 3
3. 2 of 3
4. 3 of 3
</div>

??? question "Show Answer"
    The correct answer is **B**. Per-stage metrics are defined so that a program can compute them. Skill completion rate is the number of stages that ended on their own with every required file, divided by the stages attempted. Only stage 1 meets both conditions. Stage 2 ended on its own but is missing a required file, and stage 3 did not end on its own because the limit stopped it. The rate is therefore 1 of 3.

    **Concept Tested:** Skill Completion Rate

    **See:** [Per-Stage Metrics](index.md#per-stage-metrics)

---

#### 7. In stage 3, the chapter-content skill stops and reports that a chapter's concepts depend on concepts placed in later chapters. Which stage caused the failure?

<div class="upper-alpha" markdown>
1. Stage 3, because the chapter text was written incorrectly
2. Stage 1, because the template was changed during the run
3. The runner, because it copied the wrong prompt file
4. Stage 2, because its chapter structure ordered concepts wrongly
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter dependency check is a step in the chapter-content skill that verifies each chapter's concepts depend only on concepts in earlier chapters, and it stops the skill when it finds a violation. In three of one model's runs it did so because the model's own chapter structure from stage 2 had placed concepts out of order. The failure appears in stage 3, and the stage that caused it was earlier, which is why chained stages must be diagnosed from the start.

    **Concept Tested:** Chapter Dependency Check

    **See:** [Chapter Dependency Check](index.md#chapter-dependency-check)

---

#### 8. In the worked example, a model's stage 2 produced 14 chapters with 160 of the 200 concepts assigned. What does this imply for stage 3?

<div class="upper-alpha" markdown>
1. Stage 3 will run faster, because it has fewer chapters
2. Stage 3 will fail its strict build on the very first chapter
3. Stage 3 cannot cover the 40 concepts no chapter contains
4. Stage 3 will reassign the concepts as it writes each chapter
</div>

??? question "Show Answer"
    The correct answer is **C**. Each stage starts from the previous stage's output, so a gap carries forward. In the worked example, stage 2 produced 14 chapters with 160 of the 200 concepts assigned, which means 40 concepts were not assigned to any chapter. That limits what stage 3 can write. A per-stage record makes the gap visible at the stage where it arose, before anyone reads the chapter text, which is the reason metrics are kept per stage.

    **Concept Tested:** Per-Stage Metrics

    **See:** [Per-Stage Metrics](index.md#per-stage-metrics)

---

#### 9. During a queue of runs, the fetch script running with `--watch` stops because a host that had been answering failed twice in a row. What does this most likely indicate?

<div class="upper-alpha" markdown>
1. The unit has stopped responding and may be frozen
2. The book on that unit has finished generating
3. The queue reached a model marked with a skip file
4. The script deleted the run directory on that unit
</div>

??? question "Show Answer"
    The correct answer is **A**. Run output retrieval brings run directories and event streams back to the laptop with `rsync`, which copies new and changed files and never deletes. With `--watch` the script fetches repeatedly and stops when a book or phase finishes, when a host that was answering fails twice in a row, or when no run is going. A unit that has frozen announces itself by failing to answer, so that stop condition is the signal to check on the machine.

    **Concept Tested:** Run Output Retrieval

    **See:** [Run Output Retrieval](index.md#run-output-retrieval)

---

#### 10. A model has timed out on two chapters in a row at 90 minutes each, and twelve chapters remain. Which course of action is best justified?

<div class="upper-alpha" markdown>
1. Run all twelve, since each chapter is an independent run
2. Double the time limit for that model's remaining chapters
3. Delete the model's earlier results, since the book is incomplete
4. Stop the model and record the remaining runs as not run
</div>

??? question "Show Answer"
    The correct answer is **D**. A per-chapter generation run gives each chapter its own timing and limit, and a failure on one chapter does not discard the others. The rule is that a model stops after two time-outs in a row: a model that cannot finish two chapters in 90 minutes each will not finish twelve, and the remaining runs would only occupy the machine. The runs not made are recorded as not run, with the reason. Changing the limit for one model would break a controlled variable.

    **Concept Tested:** Per-Chapter Generation Run

    **See:** [Per-Chapter Generation Run](index.md#per-chapter-generation-run)
