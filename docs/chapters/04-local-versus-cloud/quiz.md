# Quiz: Local SLMs Versus Cloud LLM Services

Test your understanding of the case for and against local deployment, cloud services, baselines, and hybrid workflows with these review questions.

---

#### 1. What is a cloud LLM service?

<div class="upper-alpha" markdown>
1. A model whose weights you download and then run on your own GPU
2. A model registry from which open-weight files are downloaded
3. A local server that forwards requests when demand peaks
4. A model a provider runs on its servers and you reach online
</div>

??? question "Show Answer"
    The correct answer is **D**. A cloud LLM service is a language model that a provider runs on its own servers and that you reach over the internet. You send a prompt, the provider's hardware runs inference, and the reply comes back. You never hold the model's weights and you do not operate the machine that runs it. Downloading weights and running them on your own GPU is the opposite arrangement, a local model deployment.

    **Concept Tested:** Cloud LLM Service

    **See:** [Cloud LLM Service](index.md#cloud-llm-service)

---

#### 2. Which four parts make up a local model deployment?

<div class="upper-alpha" markdown>
1. Prompt, tokenizer, context window, and reply
2. API, chat subscription, agentic tool, and billing
3. Hardware, model weights, inference server, and harness
4. Privacy, sovereignty, offline operation, and pinning
</div>

??? question "Show Answer"
    The correct answer is **C**. A local model deployment is a model you run on hardware you control, and it has four parts that stack: the hardware that holds and runs the model, the downloaded open-weight model weights, the inference server that loads the weights and exposes a local endpoint, and the harness that runs the agent loop against that endpoint. You gain control over the model, the version, and where every token goes, and you take on maintaining all four parts.

    **Concept Tested:** Local Model Deployment

    **See:** [Local Model Deployment](index.md#local-model-deployment)

---

#### 3. Why is a local deployment not the same as "nothing ever crosses a network"?

<div class="upper-alpha" markdown>
1. A provider still records the token counts for each local request
2. Weights and software are still downloaded from an outside host
3. The inference server checks its license online at every single start
4. Prompts are copied to a registry whenever a model is loaded
</div>

??? question "Show Answer"
    The correct answer is **B**. Privacy here is control over who can see the data you send to and receive from a model. In a local deployment the prompt and the reply stay on your network, but the weights and software are downloaded once from a model registry, and that request is visible to whoever hosts them. What changes is that your content, the sensitive part, no longer has to leave. No provider records usage metadata for local requests.

    **Concept Tested:** Privacy

    **See:** [Privacy](index.md#privacy)

---

#### 4. Why is version pinning a precondition of a fair benchmark?

<div class="upper-alpha" markdown>
1. A pinned model generates its tokens faster than an unpinned one does
2. A pinned model is exempt from a provider's rate limits
3. Pinning removes the need to keep the weights file on disk
4. A result is meaningful only for the version that produced it
</div>

??? question "Show Answer"
    The correct answer is **D**. Version pinning fixes the exact model version and software used so that results can be reproduced. Locally you pin by keeping the weights file and recording its name and checksum, so the model cannot change unless you change it. A cloud version can be requested only while it is offered. Pinning is a precondition of a fair benchmark because a result is only meaningful for the version that produced it. It has nothing to do with speed.

    **Concept Tested:** Version Pinning

    **See:** [Version Pinning](index.md#version-pinning)

---

#### 5. How does service availability differ between a cloud service and a local deployment?

<div class="upper-alpha" markdown>
1. Both fail at times; locally you can see and repair the fault
2. Only a cloud service has outages and degraded periods
3. A local deployment never stops once its model is loaded
4. Cloud outages are shorter because all usage is billed per token
</div>

??? question "Show Answer"
    The correct answer is **A**. Service availability is the fraction of time a service is up and responsive. A cloud service has outages and degraded periods that you cannot fix and often cannot predict. A local deployment has outages too, but you can see and repair them. The difference is who holds the controls, not whether failures happen. Claiming that local systems never fail ignores the operational burden, which in this evaluation included a unit that froze during long runs.

    **Concept Tested:** Service Availability

    **See:** [Service Availability](index.md#service-availability)

---

#### 6. A school district drafts material from student records that must stay on its own machines, then wants frontier-quality polish on a final summary that contains no student data. Which arrangement fits?

<div class="upper-alpha" markdown>
1. Cloud for both steps, under a contract covering the records
2. Hybrid: the records step local, the polish step in the cloud
3. Local for both steps, because one step uses sensitive data
4. Hybrid: the records step in the cloud, the polish step local
</div>

??? question "Show Answer"
    The correct answer is **B**. A hybrid workflow uses a local model for some steps and a cloud service for others, and one way to split is by data sensitivity: confidential content stays local and non-sensitive work goes to the cloud. Here the records step must stay on the district's machines, while the polish step carries no student data and benefits from a frontier model. A hybrid is routing, not compromise: each step goes where its own requirements are best met.

    **Concept Tested:** Hybrid Workflow

    **See:** [Hybrid Workflow](index.md#hybrid-workflow)

---

#### 7. You want to use a cloud-made book as the baseline for a local run. Which check helps establish that it is a control and not merely a reference?

<div class="upper-alpha" markdown>
1. That it used the same course description and the same skills
2. That it was generated more recently than the local run
3. That it contains more concepts than the local run produced
4. That it was produced on the provider's most expensive plan
</div>

??? question "Show Answer"
    The correct answer is **A**. A cloud baseline is a reference result produced by a cloud model on the same inputs and under the same rules as the local run. Three questions test whether it is fair: did it use the same course description and the same skills, is its model version recorded, and did it get a human-reviewed process the local run did not? A baseline that fails any of these is a reference, not a control, and the comparison should say so.

    **Concept Tested:** Cloud Baseline

    **See:** [Cloud Baseline](index.md#cloud-baseline)

---

#### 8. A team plans to run a model at a site with no network connection and assumes no network is needed at any point. Which correction applies to the plan?

<div class="upper-alpha" markdown>
1. A cloud service can also run offline once a session is open
2. The model must reconnect each day to refresh its weights
3. Offline operation is impossible for a model that uses a GPU
4. Setup still needs a network to download the model and tools
</div>

??? question "Show Answer"
    The correct answer is **D**. Offline operation is running a model with no network connection once it is installed. A local deployment can do this because the weights and the server are on the machine; a cloud service cannot. The setup still needs a network to download the model and tools, so offline operation describes the steady state, not the installation. The team must plan how the weights and software reach the machine before it goes offline.

    **Concept Tested:** Offline Operation

    **See:** [Offline Operation](index.md#offline-operation)

---

#### 9. A benchmark result recorded against a specific cloud model can no longer be reproduced, and requests to that model are now answered by a newer one. What is the cause?

<div class="upper-alpha" markdown>
1. The account reached a rate limit that capped its tokens for the day
2. The provider deprecated that model version on its schedule
3. The service had an outage during the original benchmark run
4. The workflow became locked in to the provider's formats
</div>

??? question "Show Answer"
    The correct answer is **B**. Model deprecation is a provider's retirement of a model version, after which requests to it fail or are redirected to a newer one. A workflow built on that model changes behavior or breaks on the provider's schedule, not yours, and a benchmark result recorded against it can no longer be reproduced. A rate limit or an outage would stall or interrupt a run, but neither one replaces the model that answers.

    **Concept Tested:** Model Deprecation

    **See:** [Model Deprecation](index.md#model-deprecation)

---

#### 10. A team runs a task through a cloud provider's agentic framework and credits the result entirely to the provider's model. What does that attribution overlook?

<div class="upper-alpha" markdown>
1. A framework's output cannot be scored against a rubric
2. A framework always lowers the quality of its model
3. The observed quality reflects the model and framework together
4. A local model cannot be wrapped with tools, memory, or a planning loop
</div>

??? question "Show Answer"
    The correct answer is **C**. An agentic framework wraps a language model with tools, memory, and a planning loop so it can carry out multi-step tasks. The model supplies the language ability, and the framework supplies the structure that lets it act. Many frameworks are tied to a provider's models and sold with them, so the quality you observe is the quality of the model and the framework together. Crediting everything to the model ignores half of what produced the result.

    **Concept Tested:** Agentic Framework

    **See:** [Agentic Framework](index.md#agentic-framework)
