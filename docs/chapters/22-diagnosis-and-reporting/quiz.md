# Quiz: Diagnosing Failures, Reporting, and Cost per Textbook

Test your understanding of failure diagnosis, the cost of a textbook, sufficiency judgments, and evidence-based recommendations with these review questions.

---

#### 1. What is a text-emitted tool call?

<div class="upper-alpha" markdown>
1. A call with a wrong name or a missing argument
2. A call the harness refuses under a permission rule
3. A call written as ordinary text, which the harness does not see
4. A call that returns more output than the window can hold
</div>

??? question "Show Answer"
    The correct answer is **C**. A text-emitted tool call is a tool call that the model writes out as ordinary text in its reply, in the shape of a call but not as a call. The harness sees no tool call and treats the reply as a final answer, so the run ends. Its signature is a run of one turn whose last message contains something that looks like a call. A call with a wrong name or a missing argument is a malformed tool call, which is usually recoverable.

    **Concept Tested:** Text-Emitted Tool Call

    **See:** [Malformed Tool Call and Text-Emitted Tool Call](index.md#malformed-tool-call-and-text-emitted-tool-call)

---

#### 2. Why is a 100% tool-call success rate on 28 calls not necessarily better than 84% on 50 calls?

<div class="upper-alpha" markdown>
1. A success rate is meaningful only above 100 tool calls per run
2. Failed tool calls are never recorded in the run's event stream
3. A higher call count always means a more careful model
4. The 28 calls may never have reached the file-writing step
</div>

??? question "Show Answer"
    The correct answer is **D**. The tool call count, the failed tool calls, and the success rate all come straight from the event stream, and a number alone does not diagnose. 100% success on 28 calls is not better than 84% on 50 if the 28 calls never reached the step that writes the file. The count is the prompt for a question, and the event stream holds the answer: what the calls did, and whether the work was finished.

    **Concept Tested:** Tool-Call Success Rate

    **See:** [Tool Call Count, Failed Tool Calls, and Tool-Call Success Rate](index.md#tool-call-count-failed-tool-calls-and-tool-call-success-rate)

---

#### 3. Why does an evaluation report put the method before the recommendation?

<div class="upper-alpha" markdown>
1. A reader needs the method in order to judge the recommendation
2. The method is the shortest part and is the quickest to read
3. The recommendation cannot be drafted until the report is printed
4. The method lists the limitations, which must always come first
</div>

??? question "Show Answer"
    The correct answer is **A**. A report structure is the order of an evaluation report's parts: question, method, results, limitations, recommendation. The order matters because each part answers a reader's question in turn. A reader who meets the recommendation before the method has nothing to judge it with, and a report that puts limitations after a confident recommendation has buried the part that tempers it. Limitations are their own part, placed before the recommendation, not inside the method.

    **Concept Tested:** Report Structure

    **See:** [Evaluation Report and Report Structure](index.md#evaluation-report-and-report-structure)

---

#### 4. A model's three benchmark stages take 4 hours. With the three stages set at 10% of the work of a whole book, what is the whole-book time estimate?

<div class="upper-alpha" markdown>
1. 4.4 hours
2. 40 hours
3. 14 hours
4. 400 hours
</div>

??? question "Show Answer"
    The correct answer is **B**. A whole-book time estimate extrapolates from the measured stages. The three benchmark stages were set at 10% of the work of a whole book, so the estimate is the three-stage time divided by 0.10: 4 hours ÷ 0.10 is 40 hours of machine time. The figure rests on an assumption about stages that have not been run, so treat it as a model to adjust. If the three stages were 5% of the book, the estimate would double.

    **Concept Tested:** Whole-Book Time Estimate

    **See:** [Time Breakdown and Whole-Book Time Estimate](index.md#time-breakdown-and-whole-book-time-estimate)

---

#### 5. A 13-chapter book costs $52.92 to generate, and 8 of its chapters meet the completion criterion. What is the cost per usable chapter?

<div class="upper-alpha" markdown>
1. $4.07
2. $6.62
3. $10.58
4. $52.92
</div>

??? question "Show Answer"
    The correct answer is **B**. Quality-adjusted cost corrects the cost for how much of the output is usable. One way to express it is the cost per usable chapter: the generation cost divided by the chapters that met the completion criterion. Here $52.92 ÷ 8 is about $6.62. Dividing by all 13 chapters gives $4.07, which prices chapters that were never written. A cheap model that leaves chapters unwritten is more expensive per chapter than its speed suggests.

    **Concept Tested:** Quality-Adjusted Cost

    **See:** [Service Price Calculation and Quality-Adjusted Cost](index.md#service-price-calculation-and-quality-adjusted-cost)

---

#### 6. Every model you try fails at the first turn with the same "model not found" error. What should you do before concluding anything about the models?

<div class="upper-alpha" markdown>
1. Record that none of the models can run the skill
2. Raise the time limit and rerun every model once more
3. Compare each model's peak context with its window
4. Check the base address, model name, and mounts first
</div>

??? question "Show Answer"
    The correct answer is **D**. Harness misconfiguration is a fault in how the harness was set up and not in the model: a wrong address, a model name the server does not have, a skill folder that was not mounted, or a permission rule that stalls. Its signature is a failure at the very first turn, for every model, with an error that names the configuration. A failure identical across all models is a configuration fault until shown otherwise, so check the setup before blaming any model.

    **Concept Tested:** Harness Misconfiguration

    **See:** [Context Overflow and Harness Misconfiguration](index.md#context-overflow-and-harness-misconfiguration)

---

#### 7. A run's final message says the chapter skill is now running. No tool call follows, and no chapter file exists in the run directory. Which cause does this evidence point to?

<div class="upper-alpha" markdown>
1. Premature turn termination: work described but not done
2. Malformed tool call: an argument had the wrong type
3. Context overflow: the conversation exceeded the model's window
4. Harness misconfiguration: the skill folder was not mounted
</div>

??? question "Show Answer"
    The correct answer is **A**. Premature turn termination is the model ending its turn before the work is done, with no error. Its signature is a final message that describes work and no file that contains it. Here the model announced the skill, made no tool call, and wrote nothing. A malformed call would show an error and usually a retry, context overflow shows late forgetting with a peak near the window, and a misconfiguration fails at turn one for every model.

    **Concept Tested:** Premature Turn Termination

    **See:** [Premature Turn Termination and Task Loss](index.md#premature-turn-termination-and-task-loss)

---

#### 8. The cost model assumes the three benchmark stages are 10% of a whole book. If they are really 5%, how does the cost per textbook change, and why?

<div class="upper-alpha" markdown>
1. It halves, because fewer stages remain to be run
2. It doubles, because the whole-book hours double
3. It is unchanged, because the yearly cost is fixed
4. It rises by 5%, matching the change in the share
</div>

??? question "Show Answer"
    The correct answer is **B**. The cost per textbook is the whole-book hours times the cost of a generating hour. The whole-book hours come from dividing the measured three-stage time by the share of the book those stages represent. Halving that share from 10% to 5% doubles the whole-book hours, so the cost per book doubles, from about $53 to about $106 in the reference case. The yearly cost is fixed, but it is spread over half as many books.

    **Concept Tested:** Cost per Textbook

    **See:** [Cost per Textbook, Cost per Chapter, and Books per Year](index.md#cost-per-textbook-cost-per-chapter-and-books-per-year)

---

#### 9. One model completes all three stages, the cost is estimated at $53 per book, and no human review has been finished. Which sufficiency statement is best supported by this evidence?

<div class="upper-alpha" markdown>
1. The DGX is sufficient, because one model finished every single stage
2. The DGX is insufficient, because no human review has been completed
3. The DGX is sufficient, because $53 is below any service price
4. Completion is established, cost is estimated, quality is unknown
</div>

??? question "Show Answer"
    The correct answer is **D**. A DGX sufficiency judgment answers whether this machine, with these models and this harness, is enough to generate the textbook. It is a judgment made against criteria written down beforehand: completion without an unusable fault, acceptable time and cost, and reviewed quality that meets the standard. The honest answer can be that the first is established, the second is estimated, and the third is not yet known. Declaring the machine sufficient or insufficient outright claims more than this evidence shows.

    **Concept Tested:** DGX Sufficiency Judgment

    **See:** [DGX Sufficiency Judgment](index.md#dgx-sufficiency-judgment)

---

#### 10. Local models complete the learning-graph and chapter-structure stages, the chapter-text stage exposes capability differences, and every result is one run with no finished human review. Which recommendation design fits this evidence?

<div class="upper-alpha" markdown>
1. Local for every stage, stated as a final verdict
2. Cloud for every stage, since one stage showed weakness
3. A provisional hybrid routed by stage, with its conditions stated
4. No recommendation until each model has been run five times
</div>

??? question "Show Answer"
    The correct answer is **C**. A recommendation is the action the evidence supports, stated with its conditions. When local models complete the structural stages and a hard stage exposes differences, the rules lean toward a hybrid routed by stage: structural stages local, a stronger model for the prose. Because every result is one run and no human review is finished, the recommendation must be labeled provisional and say what would change it. A flat verdict or a refusal to recommend both serve the reader worse.

    **Concept Tested:** Recommendation

    **See:** [Recommendation and the Local, Cloud, or Hybrid Decision](index.md#recommendation-and-the-local-cloud-or-hybrid-decision)
