---
title: "Inference Servers and Local API Endpoints"
description: "Installing the software that loads a model and exposes it through a local API: Ollama, llama.cpp, and vLLM compared, a localhost-bound OpenAI-compatible endpoint, sharing across the tailnet, and a first-prompt smoke test from curl and Python."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:15:17"
version: 1.11
---

# Inference Servers and Local API Endpoints

## Summary

This chapter installs the software that loads a model and exposes it through an API. Students configure Ollama, llama.cpp, or vLLM, bind an OpenAI-compatible endpoint to localhost, share it across the tailnet, and run a first-prompt smoke test from curl and Python. They finish with a working local endpoint.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| tmux Session | 1 |
| Inference Server | 129 |
| Local API Endpoint | 44 |
| Model Loading | 20 |
| Ollama | 13 |
| Runtime Installation | 4 |
| vLLM | 2 |
| Server Logs | 2 |
| GPU Offload | 1 |
| OpenAI-Compatible API | 14 |
| localhost Binding | 6 |
| Ollama Model Library | 4 |
| Runtime Configuration | 2 |
| Release Archive | 2 |
| llama.cpp | 1 |
| Model Keep-Alive | 1 |
| Anthropic-Compatible API | 1 |
| Chat Completions Endpoint | 13 |
| Tailscale Serve | 3 |
| Background Service | 1 |
| User-Space Installation | 1 |
| curl Request | 6 |
| Python Client | 6 |
| Endpoint Sharing | 1 |
| First-Prompt Smoke Test | 5 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)
- [Chapter 7: Remote Access, SSH, and Mesh VPN Concepts](../07-remote-access-ssh-mesh-vpn/index.md)
- [Chapter 9: Installing Tailscale and Taking a Read-Only Inventory](../09-tailscale-and-inventory/index.md)
- [Chapter 11: Model Sizing and Fit](../11-model-sizing-and-fit/index.md)
- [Chapter 12: Selecting and Downloading an Open-Weight Model](../12-selecting-downloading-models/index.md)

---

!!! mascot-welcome "From Files on Disk to an Answer on the Wire"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model file does nothing until a server loads it and listens for requests. By the end of this chapter you will have a local endpoint that answers a prompt, bound so that only the right machines can reach it, and a smoke test that tells you in minutes whether it works. Measure first, then decide!

## What This Chapter Covers

You have a machine that is reachable, probed, and sized for a model, and a shortlist of models. This chapter connects them with the software in the middle. An inference server loads a model's weights into memory and exposes an interface that other programs call, which is how the harness of Chapters 16 and 17 will eventually reach the model.

The chapter compares the three servers a DGX evaluator is likely to meet, installs one without administrator rights, and keeps it running in a way that survives a dropped connection. It then covers the interface it exposes, decides who may reach it, and ends with a first prompt sent from `curl` and from Python, and a smoke test that makes that first prompt a repeatable check.

## The Server

### Inference Server

An **inference server** is a program that loads a trained model into memory and answers requests to generate text from it. It owns the hard parts of running a model, which are placing the weights on the GPU, managing the KV cache, scheduling requests, and turning the model's raw output into text, and it hides them behind a simple interface. Everything else in the stack talks to the server and never to the model directly.

Three servers matter for this course, and they differ in what they optimize.

| Server | What it is | Strength | Cost |
|---|---|---|---|
| Ollama | A server with a model library and one-command downloads | The quickest path from nothing to an answer | Less control over scheduling than the others |
| llama.cpp | A C++ inference engine for quantized models in the GGUF format | Runs almost anywhere, and is what Ollama is built on | You build it and fetch models by hand |
| vLLM | A high-throughput server for Python and GPU deployments | Many concurrent requests served efficiently | The usual route on this hardware is a container |

This evaluation chose Ollama. It installs from one archive into a home directory, has the widest ready-made library, and offers an interface the harness can use directly. vLLM remains the candidate for a second pass on whichever model wins, because its strength, serving several sessions at once, is the lever for lowering cost per book.

!!! mascot-thinking "The Server Is a Loader Plus an API"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Hold two jobs in mind. One is the loader, which puts the weights and cache into memory and runs them on the GPU. The other is the interface, which accepts a request and returns text. Almost every problem in this chapter is a problem in one or the other, and knowing which halves your search.

### Ollama and the Ollama Model Library

**Ollama** is the server this course uses. It runs as one background process, loads models on demand, and serves them over HTTP. The **Ollama model library** is its catalog of ready-to-pull models, named `family:tag` such as `gemma4:31b`, where the tag selects the size and the quantization. Pulling from the library gives you a file in the right format with its digests verified, which removes Chapter 12's download and verification steps for the common case.

### llama.cpp and vLLM

**llama.cpp** is the C++ engine for running quantized models that Ollama wraps. It can be built and run directly when you need control over a setting that Ollama does not expose, at the price of fetching GGUF files and passing flags by hand. **vLLM** is a server built for throughput: it batches many requests together on the GPU, so it produces more total tokens per second when several sessions are active. For one benchmark session at a time the gain is small, and for a service that generates many books at once it is the main lever. Chapter 15 explains batching.

## Installing and Running It

### Runtime Installation, Release Archive, and User-Space Installation

**Runtime installation** is putting the server on the machine. The usual instructions run an installer script with `sudo`, which creates a system-wide service. On a machine that belongs to someone else, that is a step you should not take on your own.

A **release archive** is the alternative: a compressed file of the program, published with a checksum. A **user-space installation** unpacks it into your own home directory, with no administrator rights and no system changes. This evaluation did exactly that: the pinned Ollama release was downloaded as an archive for the machine's architecture, its SHA-256 was compared with the published value, and it was unpacked under the home directory. The cost is that the server is not a system service and does not start on its own. The benefit is that removing it is deleting one directory.

```bash
ssh <user>@<dgx-host> 'bash -s' < src/dgx-setup/install_ollama.sh
```

### tmux Session and Background Service

A **tmux session** is a terminal that keeps running after you disconnect. It lets a server, a download, or a long benchmark continue when your SSH connection drops, and you can reattach later to see what it printed. A **background service** is the system-level equivalent, managed by the operating system, started at boot, and restarted if it fails.

This evaluation ran the server in a tmux session named `ollama`, bound to the loopback address, writing its output to a log file.

```bash
tmux new-session -d -s ollama \
  "$HOME/opt/ollama/bin/ollama serve > $HOME/opt/ollama/serve.log 2>&1"
```

The command creates a detached session, `-d`, named `ollama`, `-s`, which runs the server and sends its output to `serve.log`. Check it with `tmux has-session -t ollama`, and stop it with `tmux kill-session -t ollama`. The trade-off is the one that makes a service worth having: a tmux session does not survive a reboot, so after a restart the server is simply not running until someone starts it.

### Runtime Configuration and Model Keep-Alive

**Runtime configuration** is the settings that shape how the server runs, which Ollama reads from environment variables. Two matter most here. `OLLAMA_CONTEXT_LENGTH` sets the context window in tokens, which Chapter 11 showed is a memory reservation. `OLLAMA_KEEP_ALIVE` sets how long an idle model stays loaded.

**Model keep-alive** is that idle period. By default a model is unloaded after about five minutes without a request, which frees memory and means the next request pays the load time again. A benchmark that sends prompts minutes apart wants a longer keep-alive, and a machine that shares memory with other work may want a shorter one.

This project's `start_ollama.sh` takes the context length as an argument and restarts the server with it, so that the setting is chosen on purpose for each model and not inherited.

### GPU Offload and Model Loading

**Model loading** is reading a model's file from disk into memory and preparing it to run. It happens on the first request after a model is unloaded, and its duration is the storage read speed of Chapter 5 applied to the model's size. **GPU offload** is placing the model's layers on the GPU so that the GPU does the work. On a unified-memory machine every layer is offloaded, because the memory is shared.

The command `ollama ps` shows what is loaded, how much memory it holds, and the share running on the GPU.

```bash
ollama ps
```

A model that shows less than 100% on the GPU is partly running on the CPU, and will be much slower than the figures in this book. On a unified-memory machine that usually points to a context setting so large that the cache and weights no longer fit together.

### Server Logs

**Server logs** are the text the server writes about what it did: when a model loaded, how much memory it requested, which request arrived, and any error. They are the first place to look when something fails, and the only place some information exists. The log in this project is `serve.log` beside the install. Two lines to learn to find are the one that reports a model finishing its load and the one that reports a request's timing. This evaluation relied on them to see that, with one model, the server re-read the conversation on every turn.

## The Interface

### Local API Endpoint

A **local API endpoint** is the network address on the machine where the server accepts requests. Ollama's is `127.0.0.1` on port `11434`, so the base address is `http://127.0.0.1:11434`. Programs on the machine call it as they would a web service, and the server answers with JSON.

### OpenAI-Compatible API and Chat Completions Endpoint

The **OpenAI-compatible API** is an interface that copies the request and response shapes of OpenAI's service, which became a de facto standard. A server that offers it can be called by any client written for that service, by changing only the base address. The **chat completions endpoint** is its main route, at `/v1/chat/completions`, and it accepts a list of messages and returns the model's reply.

A request has a model name and a list of messages, each with a role and content. The roles are `system` for standing instructions, `user` for the person's request, and `assistant` for the model's earlier replies.

### Anthropic-Compatible API

The **Anthropic-compatible API** is the same idea with a different shape, copying Anthropic's messages interface. Ollama offers it too, and it is the interface that Claude Code uses, because Claude Code is built to talk to that shape. Chapter 17 points Claude Code at the local endpoint through this route. The model behind it is whichever local model you name, and no request leaves the machine.

## Sending a First Prompt

### curl Request

A **`curl` request** is the simplest way to call the endpoint: one command, no code. It also removes every layer between you and the server, so a failure here is a failure of the server or the model and not of your program.

Before reading the command, three of its pieces need naming. `-H` adds a header, and `Content-Type: application/json` tells the server the body is JSON. `-d` supplies the body. In the body, `model` names the model, `messages` is the conversation, and `"stream": false` asks for the whole reply in one piece and not token by token.

```bash
curl http://127.0.0.1:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "gemma4:31b", "stream": false,
       "messages": [{"role": "user", "content": "Reply with the single word: ready"}]}'
```

The reply is a JSON object. The text is at `choices[0].message.content`, and a `usage` block reports `prompt_tokens` and `completion_tokens`, which are the two numbers every later performance measurement uses.

### Python Client

A **Python client** is a program that makes the same request. The version below uses only the standard library, so it runs on a fresh machine with no `pip install`. `urllib.request.Request` builds the call, `json.dumps` turns the dictionary into the body, and `urlopen` sends it.

```python
import json, urllib.request

body = {"model": "gemma4:31b", "stream": False,
        "messages": [{"role": "user", "content": "Reply with the single word: ready"}]}
req = urllib.request.Request("http://127.0.0.1:11434/v1/chat/completions",
                             data=json.dumps(body).encode(),
                             headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req, timeout=300) as r:
    reply = json.load(r)

print(reply["choices"][0]["message"]["content"])
print(reply["usage"])
```

### First-Prompt Smoke Test

A **smoke test** is a quick check that a system is alive at all, named for the old practice of powering a circuit on and watching for smoke. A **first-prompt smoke test** sends one tiny request and checks four things: the server answered, the reply is not empty, the speed is plausible, and the model is running on the GPU.

The function below extends the client with timing. `max_tokens` caps the reply length so the test stays short. The speed is the output tokens divided by the elapsed seconds.

```python
import json, time, urllib.request

def smoke(model, base="http://127.0.0.1:11434"):
    body = {"model": model, "stream": False, "max_tokens": 64,
            "messages": [{"role": "user",
                          "content": "Reply with the single word: ready"}]}
    req = urllib.request.Request(base + "/v1/chat/completions",
                                 data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        reply = json.load(r)
    seconds = time.time() - t0
    tokens = reply["usage"]["completion_tokens"]
    return {"reply": reply["choices"][0]["message"]["content"].strip(),
            "seconds": round(seconds, 1),
            "output_tokens": tokens,
            "tokens_per_second": round(tokens / seconds, 1) if seconds else None}
```

!!! mascot-warning "The First Request Includes the Model Load"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The first prompt after a model is unloaded pays for reading the file from disk, so its tokens per second looks terrible and is not the model's speed. Send it twice and read the speed from the second. If the second is also slow, the cause is the model, the context, or the memory.

This project's own smoke test, `ollama_smoke.py`, goes further than one word. It runs five short tasks: Markdown writing, p5.js code, schema-constrained JSON, a tool call, and a 30,000-token prompt. It reports speed, memory, GPU power, and which format rules the output broke. Chapter 19 explains why a model gets tested alone, with a script like this, before it is tested in the harness.

## Who Can Reach It

### localhost Binding

**localhost binding** is configuring the server to accept connections only from the machine it runs on, by listening on the loopback address `127.0.0.1`. A request from any other machine, including one on the same network, is refused before it reaches the server. This is the default and the setting this evaluation used.

The alternative is to bind to all interfaces, written `0.0.0.0`, which accepts connections from any machine that can reach the port. That is sometimes what you want, and it is a security decision, because an inference endpoint has no login of its own. Anyone who can send it a request can use the machine's GPU and read whatever the model is allowed to read.

!!! mascot-tip "Start Closed and Open Deliberately"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Leave the server on the loopback address, confirm that everything works there, and then decide who else needs access and how to give it to exactly them. Binding to every interface to make a tutorial command work is a decision you cannot easily see later.

### Endpoint Sharing and Tailscale Serve

**Endpoint sharing** is making a local endpoint reachable from other machines. A harness on a laptop that needs the model on a DGX is the common reason, and so is a colleague who wants to try the model. There are three ways to do it, and they differ in who ends up able to reach the server.

| Method | How it works | Who can reach the endpoint | Changes on the DGX |
|---|---|---|---|
| SSH port forward | The laptop forwards a local port through an SSH login | Only you, for as long as the forward runs | None |
| Tailscale Serve | The Tailscale client publishes the local port to the tailnet | Tailnet members the access rules allow | Needs the client and a command on the DGX |
| Bind to all interfaces | The server listens on `0.0.0.0` | Anyone who can reach the port | A server setting |

**Tailscale Serve** is the second route. A single command makes the loopback endpoint available to the tailnet over HTTPS under the machine's tailnet name, while the server itself stays bound to the loopback address. Access is limited to tailnet members, and the access control list of Chapter 9 still applies.

```bash
tailscale serve --bg 11434
```

The flags have changed across Tailscale versions, so check `tailscale serve --help` for yours.

This evaluation used the first method. A forward costs nothing on the DGX and exposes nothing, and the alternatives would have changed which services the Administrator's machine offers, which was the Administrator's decision to make. The first harness runs reached the model this way, and later runs moved the harness onto the DGX, so the port never needed to leave it.

!!! mascot-warning "An Open Inference Endpoint Is an Open GPU"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The endpoint has no login. If you bind it to every interface on a network you share, anyone on that network can run prompts on your machine and tie up its memory. Prefer a forward or Tailscale Serve, and test from a second machine that the endpoint is refused where you expect it to be.

#### Diagram: Inference Request Path


<iframe src="../../sims/inference-request-path/main.html" width="100%" height="522px" scrolling="no"></iframe>
[Run Inference Request Path Fullscreen](../../sims/inference-request-path/main.html)

<details markdown="1">
<summary>Inference Request Path</summary>
Type: workflow
**sim-id:** inference-request-path<br/>
**Library:** Mermaid<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/conversational-ai/tree/main/docs/sims/user-query-components<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain what each of 6 stages of a chat completion request does by opening each stage and then locating the stage responsible for each of 4 described events, with at least 3 of 4 correct.

**Prerequisites:** inference server, local API endpoint, chat completions endpoint, model loading, GPU offload, localhost binding, curl request (all defined in the sections above this block).

**Evidence of Mastery:** The learner opens all 6 stages to read their descriptions, then answers 4 questions, each by choosing one of the 6 stages, before any answer is revealed. A choice is correct when it equals the Correct stage column. Mastery is 3 of 4 correct on the first attempt. Opening a stage is exploration, not evidence.

**Misconceptions:** (1) The first request is slow because the GPU is slow. (2) A wrong model name is rejected by the model. (3) A refused connection is a model problem. (4) Token counts are computed by the client.

**Instructional Rationale:** Understand-level explaining needs the learner to attribute an observed event to a part of the mechanism. Reading each stage first gives the vocabulary, and the questions then require the learner to place events in that structure.

**Content:**

The six stages, in order, with the description shown when a stage is opened:

| # | Stage | Description shown |
|---|---|---|
| 1 | Client | A program such as `curl` or a Python script builds a JSON body with a model name and messages, and sends it to the endpoint's address. |
| 2 | Endpoint | The address `127.0.0.1` on port 11434, where the server listens. If nothing is listening, the client's connection is refused. |
| 3 | Request handler | The server reads the body, checks that the named model exists, and counts the tokens in the prompt. An unknown model is rejected here. |
| 4 | Model loader | If the model is not in memory, the server reads its file from disk and places it on the GPU. This is the slow part of a first request. |
| 5 | Generation | The model produces the reply one token at a time on the GPU, reading the weights and the KV cache for each token. |
| 6 | Response | The server returns JSON with the reply text and a usage block holding the prompt and completion token counts. |

The four questions:

| # | Question shown to the learner | Correct stage | Why (shown as feedback) |
|---|---|---|---|
| 1 | The first request after the model was unloaded takes 40 seconds, and the second takes 2. Which stage accounts for the difference? | Model loader | The first request pays to read the model from disk into memory, which later requests skip. |
| 2 | A request names a model that was never pulled and returns "model not found". Which stage rejected it? | Request handler | The handler checks the model name before any loading or generation. |
| 3 | A request fails at once with "connection refused". Which stage is at fault? | Endpoint | Nothing is listening at the address, usually because the server is not running. |
| 4 | Which stage reports how many tokens the prompt and the reply used? | Response | The server returns the counts in the usage block of its reply. |

**Provenance:** The stages and the questions are synthetic, written for this exercise, and the sim labels them "synthetic example". The stage roles come from the "The Server" and "The Interface" sections of this chapter.

**Rules:** Stages may be opened in any order. The questions are asked in the fixed order 1 to 4, each allows one final choice from the six stages, and exactly one stage is correct for each question.

**Learner Activity:**

1. The learner opens each of the 6 stages in the flow diagram and reads its description. The questions unlock after all six have been opened.
2. The learner reads question 1 and chooses the responsible stage, then confirms.
3. The sim shows the correct stage and the Why text, and marks the question correct or incorrect.
4. The learner repeats for questions 2 to 4. After question 4 the sim shows the score and the misconception behind each miss.

**Feedback:** Four questions, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct stage and the Why text. The final score reads "n of 4 correct".

**Starting State:** The six-stage flow is shown with no stage opened, and the instruction on screen is "Open each stage to see what it does".

**Chapter Anchors:** The chapter states that the endpoint is `127.0.0.1` on port 11434, that the first request pays for model loading, that the usage block reports prompt and completion tokens, and that a connection is refused when no server is listening.
</details>

#### Diagram: Endpoint Exposure Classifier


<iframe src="../../sims/endpoint-exposure-classifier/main.html" width="100%" height="512px" scrolling="no"></iframe>
[Run Endpoint Exposure Classifier Fullscreen](../../sims/endpoint-exposure-classifier/main.html)

<details markdown="1">
<summary>Endpoint Exposure Classifier</summary>
Type: microsim
**sim-id:** endpoint-exposure-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish, for 6 configurations of a local endpoint, whether a stated party can reach it, with at least 5 of 6 correct.

**Prerequisites:** localhost binding, endpoint sharing, SSH port forward, Tailscale Serve, home router, access control list (all defined in this chapter and in Chapters 7 and 9).

**Evidence of Mastery:** For each of the 6 cases the learner commits "Can reach" or "Cannot reach" before the sim reveals the answer. A choice is correct when it equals the Correct answer column. Mastery is 5 of 6 correct on the first attempt. Reading the cases is exploration, not evidence.

**Misconceptions:** (1) Any machine on the same network can reach a localhost-bound server. (2) A port forward needs the server to listen on a network address. (3) Binding to every interface exposes the server to the whole internet regardless of the router. (4) Tailscale Serve opens the server to everyone.

**Instructional Rationale:** Analyzing exposure requires separating the server's binding, the path a connection takes, and the party's position, so each case varies one of them while the others are fixed. Committing before the reveal separates reasoning from pattern matching.

**Content:**

| # | Configuration and party shown to the learner | Correct answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | The server is bound to `127.0.0.1`. A process running on the DGX itself sends a request to port 11434. | Can reach | The request comes from the same machine's loopback address, which is exactly what the binding allows. |
| 2 | The server is bound to `127.0.0.1`. The laptop, on the same tailnet, sends a request to the DGX's tailnet address on port 11434. | Cannot reach | The server accepts connections only from the loopback address, and this one arrives on the network. |
| 3 | The server is bound to `127.0.0.1`. The laptop runs an SSH port forward to the DGX and sends a request to its own local port. | Can reach | The SSH server on the DGX opens the connection from the DGX itself, so it arrives on the loopback address. |
| 4 | The server is bound to `0.0.0.0`. A tailnet member whom the access rules permit sends a request to the DGX's tailnet address on port 11434. | Can reach | The server listens on every interface, including the tailnet's, and the rules allow the connection. |
| 5 | The server is bound to `0.0.0.0`. The DGX is behind a home router with no forwarded port. A stranger on the internet sends a request to the router's public address. | Cannot reach | The router drops a connection that nobody inside started, so the request never arrives. |
| 6 | The server is bound to `127.0.0.1`, and Tailscale Serve publishes port 11434 to the tailnet. A tailnet member whom the access rules permit sends a request to the DGX's tailnet name. | Can reach | Tailscale Serve relays permitted tailnet requests to the loopback address on the DGX's behalf. |

**Provenance:** The cases are synthetic, written for this exercise, and the sim labels them "synthetic example". The reasoning comes from Chapters 7 and 9 and the sections of this chapter above.

**Rules:** Cases are shown in the fixed order 1 to 6. Each allows one final choice. Two parties are never combined, and each case states the binding, the path, and the party in full.

**Learner Activity:**

1. The learner reads case 1.
2. The learner chooses "Can reach" or "Cannot reach" and confirms.
3. The sim shows the correct answer and the Why text, and marks the case correct or incorrect.
4. The learner repeats for cases 2 to 6. After case 6 the sim shows the score and the misconception behind each miss.

**Feedback:** Six cases, fixed order, one confirmed choice each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct answer and the Why text. The final score reads "n of 6 correct".

**Starting State:** Case 1 is shown with no answer chosen, and the question on screen is "Can this party reach the endpoint?"

**Chapter Anchors:** The chapter states that a loopback binding accepts connections only from the same machine, that an SSH forward arrives from the DGX's own loopback address, that binding to every interface needs a decision about who can reach the port, and that Tailscale Serve limits access to permitted tailnet members.
</details>

## Chapter Summary

An inference server loads a model and exposes it behind an API, and the stack above it talks only to the server. Ollama installs without administrator rights from a release archive, runs in a tmux session on the loopback address, and is configured through environment variables for context length and keep-alive. Its OpenAI-compatible endpoint takes a model name and messages and returns the reply with token counts, and its Anthropic-compatible endpoint is the one Claude Code uses. A first-prompt smoke test checks that the server answers, that the reply is not empty, that the speed is plausible, and that the model is on the GPU. Binding to the loopback address keeps the endpoint private, and an SSH forward or Tailscale Serve shares it with only the machines that should have it.

!!! mascot-celebration "A Local Endpoint That Answers and Stays Private"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now install a model server without administrator rights, send it a first prompt from `curl` and Python, and say exactly who can reach it. Chapter 14 turns to the ten models this evaluation puts behind such an endpoint.

[See Annotated References](./references.md)
