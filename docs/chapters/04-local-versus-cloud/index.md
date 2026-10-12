---
title: "Local SLMs Versus Cloud LLM Services"
description: "The case for and against running a model locally compared with cloud LLM services and agentic frameworks, covering privacy, version pinning, operational burden, quality gaps, and hybrid workflows."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 21:22:23"
version: 1.11
---

# Local SLMs Versus Cloud LLM Services

## Summary

This chapter makes the case for and against running a model locally. It compares a local deployment with cloud LLM services and agentic frameworks on privacy, data sovereignty, rate limits, availability, lock-in, and operational burden. Students finish able to list the reasons to prefer each option and describe a hybrid workflow.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Privacy | 66 |
| Cloud LLM Service | 226 |
| Local Model Deployment | 384 |
| Cloud Baseline | 17 |
| Anthropic Claude | 2 |
| Model Deprecation | 2 |
| OpenAI ChatGPT | 1 |
| Data Sovereignty | 1 |
| Rate Limits | 1 |
| Service Availability | 1 |
| Vendor Lock-In | 1 |
| Frontier Model Capability Gap | 1 |
| Agentic Framework | 3 |
| Hybrid Workflow | 2 |
| Version Pinning | 1 |
| Operational Burden | 1 |
| Offline Operation | 1 |
| Google Antigravity | 1 |
| Devin | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Small Language Models](../03-small-language-models/index.md)

---

!!! mascot-welcome "Two Ways to Get the Same Tokens"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model can sit on a server you rent or on a machine you own, and the choice changes what you pay, what you control, and what can go wrong. By the end of this chapter you will be able to list the reasons for each side and recommend a local, cloud, or hybrid workflow for a stated situation. Measure first, then decide!

## What This Chapter Covers

The whole course asks whether a local model can do what a cloud model does. Before measuring that, you need the strongest honest case for each side, because an evaluation that starts from a conclusion measures nothing. This chapter lays out what a cloud service offers and costs you, what a local deployment offers and costs you, how the quality difference between them is framed, and how agentic frameworks and hybrid workflows blur the line.

The chapter keeps three terms apart, a habit that Chapter 6 formalizes. **Cost** is what you pay to own and operate hardware. **Price** is what a provider charges for a service. **Quality** is how good the output is. A statement that mixes them, such as "the cloud is cheaper", is usually unanswerable until you say which of the three you mean.

## Cloud LLM Services

### Cloud LLM Service

A **cloud LLM service** is a language model that a provider runs on its own servers and that you reach over the internet. You send a prompt, the provider's hardware runs inference, and the reply comes back. You never hold the model's weights and you do not operate the machine that runs it.

Providers offer access in a few forms, and the form decides how you are billed.

| Form of access | How you use it | Typical billing |
|---|---|---|
| API | Your program sends requests to an endpoint | Per token, input and output |
| Chat subscription | You type into the provider's application | A fixed amount per month |
| Agentic or coding tool | A tool runs multi-step tasks with the model behind it | Subscription or per-seat, often with usage limits |

Following one request shows where the boundary sits. The steps below are the same whichever form of access you use.

| Step | What happens | Where it happens |
|---|---|---|
| 1 | Your text, and any files you attached, are sent over the network | Your machine, then the network |
| 2 | The provider authenticates you and applies your plan's limits | Provider |
| 3 | The model reads the prompt and generates the reply | Provider hardware |
| 4 | The reply is returned and the usage is recorded for billing | Network, then your machine |

The convenience is real. You need no hardware, no installation, and no model management, and you get access to the strongest models available, which are often not released any other way. The costs are the subjects of the next five concepts.

### Anthropic Claude

**Anthropic Claude** is a family of language models and assistants from Anthropic, available through an API, through chat applications, and through coding tools. In this evaluation it appears twice: the orchestrating session that starts and scores runs uses a Claude cloud model, and the harness that runs the skills is Claude Code, pointed at a local endpoint. Chapter 18 returns to the first use.

### OpenAI ChatGPT

**OpenAI ChatGPT** is OpenAI's assistant product, built on its family of language models, and available as a chat application and, through the company's API, as a service for programs. It is the best-known example of a chat subscription and is used here as a representative cloud comparison point.

### Rate Limits

**Rate limits** are caps a provider places on how many requests or tokens you may use in a period. They exist to protect shared capacity, and they vary with the plan. A job that must generate dozens of chapters in sequence can hit a limit and stall, or be slowed to the pace the provider allows, regardless of how much you are willing to pay.

### Service Availability

**Service availability** is the fraction of time a provider's service is up and responsive. A cloud service has outages and degraded periods that you cannot fix and often cannot predict. A local deployment has outages too, but you can see and repair them. The difference is who holds the controls, not whether failures happen.

### Model Deprecation

**Model deprecation** is a provider's retirement of a model version, after which requests to it fail or are redirected to a newer one. A workflow built on a specific model can change behavior or break on the provider's schedule, not yours. A benchmark result recorded against a deprecated model can no longer be reproduced.

### Vendor Lock-In

**Vendor lock-in** is the cost of switching away from a provider once your workflow depends on its specific models, formats, or features. The more your prompts, tooling, and evaluation habits are tuned to one provider's behavior, the more a move costs. Lock-in is not automatically bad, but it should be a conscious trade-off and not a surprise.

!!! mascot-thinking "A Cloud Service Is a Dependency You Do Not Control"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Rate limits, outages, deprecations, and lock-in are four views of one fact: the model lives on someone else's schedule. None of them is a reason to avoid a cloud service, only a reason to know which of them your workflow can tolerate.

## Local Deployment

### Local Model Deployment

A **local model deployment** is a language model that you run on hardware you control, serving requests from software on that machine. The weights are on your disk, inference runs on your GPU, and the requests are handled by a server on your own network. In this evaluation the hardware is an NVIDIA DGX system.

A deployment has four parts, and each one is a chapter of this course. The table shows how they stack.

| Part | What it does | Chapter |
|---|---|---|
| Hardware | The CPU, memory, GPU, and storage that hold and run the model | 5 and 10 |
| Model weights | The downloaded, open-weight model | 11 and 12 |
| Inference server | Loads the weights and exposes a local endpoint | 13 |
| Harness | Runs the agent loop and executes skills against the endpoint | 16 to 18 |

This evaluation's own deployment is the worked example. A DGX unit holds an open-weight model on its disk, an inference server loads it into memory and answers on the machine's own loopback interface, and the harness runs in a container on the same machine and talks to that server. In the later runs a generation job kept going with the laptop disconnected, because nothing in the loop depended on a connection to anywhere else.

The trade is the mirror of the cloud's. You gain control, because you choose the model, the version, and where every token goes. You take on the work of acquiring, configuring, and maintaining all four parts, and you are limited to models that are open-weight and that fit your hardware.

### Privacy

**Privacy**, in this context, is control over who can see the data you send to and receive from a model. A prompt can carry anything: unpublished drafts, internal documents, names, credentials pasted by mistake. When the model runs elsewhere, that text leaves your machine.

A worked comparison shows exactly what moves in each arrangement. The data items are the ones a textbook-generation run produces.

| Data | Cloud service | Local deployment |
|---|---|---|
| Your prompt, including attached files | Sent to the provider | Stays on your network |
| The generated reply | Returned from the provider | Produced on your hardware |
| Usage metadata (account, token counts) | Recorded by the provider | None |
| The model's weights | Never sent to you | Downloaded once from a model registry |

The last row shows that "local" is not "nothing ever crosses a network". Weights and software are downloaded, and the request for them is visible to whoever hosts them. What changes is that your content, which is the sensitive part, no longer has to leave.

!!! mascot-warning "Local Generation Is Not Local Everything"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Running the model on your own machine keeps its prompts and tokens there, but anything else that reads the output, such as a supervising cloud assistant or a log uploaded for review, can still send it away. Trace every place the generated text goes, not just where the model runs, and Chapter 18 shows how.

### Data Sovereignty

**Data sovereignty** is the principle that data is subject to the laws of the country or jurisdiction where it is stored or processed. If a provider processes your prompts in another country, that country's rules may apply to them. A local deployment lets you choose and know the jurisdiction, because the data never leaves your site. For regulated or contractual data this can decide the question before cost enters at all.

### Offline Operation

**Offline operation** is running a model with no network connection once it is installed. A local deployment can do this, because the weights and the server are on your machine; a cloud service cannot. It matters for air-gapped sites and for work in places without reliable connectivity. The setup still needs a network to download the model and tools, so offline operation describes the steady state, not the installation.

### Version Pinning

**Version pinning** is fixing the exact model version and software used, so that results can be reproduced. With a local deployment you pin by keeping the weights file and recording its name and checksum; the model cannot change unless you change it. With a cloud service you can request a specific version while it is offered, but you cannot keep it past its deprecation. Pinning is a precondition of a fair benchmark, because a result is only meaningful for the version that produced it.

!!! mascot-tip "Write the Pin Down on Day One"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Record the exact model tag, its file checksum, the server version, and the date next to every result you keep. A table of scores with no version beside each one cannot be reproduced and cannot be fairly compared.

### Operational Burden

**Operational burden** is the work you take on by running your own deployment: installing and updating the driver and server, watching memory and temperature, handling failures, and managing storage. It is staff time, and it is a cost even when no money changes hands. In this evaluation, a unit froze during long runs, and a memory watchdog now runs before any model does. A cloud service has none of that work for you, and most of its price pays for the people who do it.

## Comparing Quality

### Frontier Model Capability Gap

The **frontier model capability gap** is the difference in quality between the best cloud models and the best model you can run locally on a given task. It is not one number. On a hard multi-step task the gap may be large, and on a narrow, well-specified one it may be negligible. Chapter 3 defined the two kinds of model; the gap is what you measure between them.

The gap is also what this whole evaluation exists to measure for one task, textbook generation. It cannot be settled by reputation or by a publisher's benchmark chart. It has to be measured on the same inputs, against a reference, which is the next concept.

### Cloud Baseline

A **cloud baseline** is a reference result produced by a cloud model on the same inputs and under the same rules as a local run, used as the point of comparison. Without one, a local result has no yardstick: a learning graph with 200 concepts is either good or poor only relative to something.

Here is a real instance from this evaluation. The benchmark course is Algebra I, and a published Algebra I book was made with cloud models. It has 200 concepts, 13 chapters, and about 55,000 words of chapter text. That book is the baseline for scale, and every local run is compared against it.

A baseline is only fair if it was produced under comparable conditions. Three questions test it. Did it use the same course description and the same skills? Is its model version recorded? Was it produced by a human-reviewed process the local run did not get? A baseline that fails any of these is a reference, not a control, and the comparison should say so.

## Agents and Hybrid Workflows

### Agentic Framework

An **agentic framework** is software that wraps a language model with tools, memory, and a planning loop so it can carry out multi-step tasks, such as reading files, running commands, and revising its own work. The model supplies the language ability, and the framework supplies the structure that lets it act. Chapter 3's tool calling is the mechanism, and Chapter 16 builds the loop.

Frameworks matter to this comparison because many are tied to a particular provider's models and are sold with them. When a task is run through such a framework, the quality you observe is the quality of the model and the framework together. Two of the best known are covered next.

### Google Antigravity

**Google Antigravity** is an agent-oriented development environment from Google in which AI agents plan and carry out coding tasks. It is an example of an agentic framework from a cloud provider, where the model work happens on the provider's servers and you interact with the results.

### Devin

**Devin** is an AI software-engineering agent from Cognition, offered as a cloud service that takes a task, works through it in its own environment, and returns code. Like Antigravity, it is a self-contained agentic framework: you buy the outcome of a whole loop, and you generally do not choose its underlying model.

### Hybrid Workflow

A **hybrid workflow** uses a local model for some steps and a cloud service for others. The split can follow data sensitivity, where confidential content stays local and non-sensitive drafting goes to the cloud. It can follow stage, where a cheap local model produces first drafts and a frontier model polishes the result. It can also follow volume, where steady high-volume work runs locally and rare peak demand overflows to the cloud.

A hybrid is routing, not compromise. Each step goes where its own requirements are best met, which means you have to know each step's requirements, and that is the skill the exercise below builds.

!!! mascot-thinking "Decide Per Step, Not Per Project"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The question "local or cloud?" usually has no single answer for a whole project, because the steps differ in sensitivity, volume, and quality demands. Break the work into steps first, and the answer often becomes obvious, and often becomes different for different steps.

#### Diagram: Local, Cloud, or Hybrid Chooser


<iframe src="../../sims/local-cloud-hybrid-chooser/main.html" width="100%" height="594px" scrolling="no"></iframe>
[Run Local, Cloud, or Hybrid Chooser Fullscreen](../../sims/local-cloud-hybrid-chooser/main.html)

<details markdown="1">
<summary>Local, Cloud, or Hybrid Chooser</summary>
Type: microsim
**sim-id:** local-cloud-hybrid-chooser<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend local, cloud, or hybrid deployment for each of 6 scenarios and identify the constraint that decides it, with at least 5 of 6 correct.

**Prerequisites:** cloud LLM service, local model deployment, privacy, data sovereignty, offline operation, rate limits, operational burden, hybrid workflow (all defined in the sections above this block).

**Evidence of Mastery:** For each scenario the learner chooses one deployment ("Local", "Cloud", or "Hybrid") and one deciding constraint from the five listed in Content, before the sim reveals the answer. A scenario is correct when both choices equal the Answer and Deciding constraint columns. Mastery is 5 of 6 correct. Reading the scenario text is exploration, not evidence.

**Misconceptions:** (1) Local is always cheaper. (2) Cloud always gives the best result for the task. (3) Hybrid is always the safest answer. (4) A privacy requirement can always be met by a cloud provider's contract.

**Instructional Rationale:** Evaluate-level recommending needs the learner to apply criteria to a case and justify the result, so each scenario states its constraints plainly and is built so that exactly one deployment is best given them. Asking for the deciding constraint, not only the choice, separates a reasoned recommendation from a guess.

**Content:**

The five deciding constraints the learner can choose from are: "Data must not leave the site", "No outbound network", "High steady volume on owned hardware", "No hardware or staff to operate", and "Sensitive and non-sensitive steps mixed".

| # | Scenario shown to the learner | Answer | Deciding constraint | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | A clinic must generate summaries of patient intake transcripts. The transcripts may not leave the building under any circumstance. Volume is 50 documents a week and modest quality is acceptable. | Local | Data must not leave the site | An absolute rule that data may not leave the site rules out any service that receives the prompt. |
| 2 | A research lab works in a secure room with no outbound network connection. It needs a model to draft internal reports from local notes. | Local | No outbound network | A cloud service cannot be reached from the room, so only a model installed on site can run. |
| 3 | A publisher generates 300 chapters a month from public-domain source material. It owns GPU servers, has tested a model that meets its rubric, and wants a predictable monthly cost. | Local | High steady volume on owned hardware | Steady high volume on hardware it already owns, with a model already shown to be good enough, makes a fixed local cost more predictable than per-token billing. |
| 4 | A small team has a two-week project, no GPU hardware, no one to administer a server, and non-confidential material under an acceptable provider contract. | Cloud | No hardware or staff to operate | Buying and operating hardware would cost more in time than the project lasts, so a service is the practical choice. |
| 5 | A consultancy drafts client proposals. Client names and figures must stay on its own machines, but it wants frontier-quality polish on the final wording, which contains no client data. | Hybrid | Sensitive and non-sensitive steps mixed | The sensitive step must stay local and the polish step benefits from a frontier model, so each step is routed to the place that suits it. |
| 6 | A newsroom drafts articles from public wire stories, has no GPU hardware, and no one to run a server. It wants the strongest writing quality available for each piece and has no confidentiality concerns. | Cloud | No hardware or staff to operate | With no sensitive data and no capacity to operate hardware, a cloud service gives the best quality for the least effort. |

**Provenance:** The scenarios are synthetic, written for this exercise, and the sim labels them "synthetic example". The meanings of the three deployments and the five constraints come from the sections of this chapter above.

**Rules:** Scenarios are shown in the fixed order 1 to 6. A scenario allows exactly one deployment choice and one constraint choice, both final. A scenario is correct only when both match. The answer for each scenario follows from the constraint named in its Deciding constraint column; if two constraints appear to apply, the one that makes a deployment impossible decides over the ones that only make it costly.

**Learner Activity:**

1. The learner reads scenario 1.
2. The learner chooses "Local", "Cloud", or "Hybrid", then chooses the one constraint that decides it, then confirms.
3. The sim shows the correct deployment, the deciding constraint, and the Why text, and marks the scenario correct or incorrect.
4. The learner repeats for scenarios 2 to 6. After scenario 6 the sim shows the score and the misconception behind each missed scenario.

**Feedback:** Six scenarios, fixed order, one confirmed pair of choices each, and the choices are final. A scenario is correct only when both choices are correct. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct deployment, the deciding constraint, and the Why text. The final score reads "n of 6 correct".

**Starting State:** Scenario 1 is shown with no choice made, and the question on screen is "Where should this work run, and what decides it?"

**Chapter Anchors:** The chapter states that cost, price, and quality are three different things, that a local deployment keeps prompts on the owner's network, that a cloud service can be limited by rate limits and outages, and that a hybrid workflow routes each step to the place that best meets its requirements.
</details>

## Chapter Summary

You started with a question that sounds like a single choice and ended with the observation that it is usually several. A cloud LLM service offers the strongest models and no operational work, at the price of rate limits, availability you do not control, deprecations, and lock-in. A local deployment offers privacy, data sovereignty, offline operation, and version pinning, at the cost of the operational burden of running four layers yourself. The frontier model capability gap is what a cloud baseline lets you measure, and agentic frameworks such as Claude Code, Antigravity, and Devin, plus hybrid workflows, let you mix the two.

!!! mascot-celebration "Both Cases Made Honestly"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now state the reasons for and against a local model, keep cost, price, and quality separate, and recommend local, cloud, or hybrid for a stated situation. Chapter 5 starts building the local side, with the hardware a deployment stands on.
