# Quiz: Inference Servers and Local API Endpoints

Test your understanding of inference servers, user-space installation, local endpoints, the first-prompt smoke test, and endpoint exposure with these review questions.

---

#### 1. What is an inference server?

<div class="upper-alpha" markdown>
1. A program that trains a model's parameters from data
2. A program that loads a model and answers generation requests
3. A public hub that hosts model repositories for download
4. A harness that runs an agent loop and executes its tools
</div>

??? question "Show Answer"
    The correct answer is **B**. An inference server is a program that loads a trained model into memory and answers requests to generate text from it. It owns the hard parts of running a model: placing the weights on the GPU, managing the KV cache, scheduling requests, and turning raw output into text. Everything else in the stack talks to the server and never to the model directly. It does not train models, and the harness is a separate layer that calls it.

    **Concept Tested:** Inference Server

    **See:** [Inference Server](index.md#inference-server)

---

#### 2. What does an OpenAI-compatible API let you do with a local server?

<div class="upper-alpha" markdown>
1. Send requests to the server without naming a model
2. Reach a localhost-bound server from any other machine you own
3. Download models from the server's library by their tags
4. Reuse OpenAI clients by changing only the base address
</div>

??? question "Show Answer"
    The correct answer is **D**. The OpenAI-compatible API copies the request and response shapes of OpenAI's service, which became a de facto standard. A server that offers it can be called by any client written for that service, by changing only the base address. Its main route is the chat completions endpoint at `/v1/chat/completions`, which accepts a model name and a list of messages and returns the reply. Compatibility concerns the request format, not who can reach the server.

    **Concept Tested:** OpenAI-Compatible API

    **See:** [OpenAI-Compatible API and Chat Completions Endpoint](index.md#openai-compatible-api-and-chat-completions-endpoint)

---

#### 3. What happens by default to a loaded model after about five minutes without a request?

<div class="upper-alpha" markdown>
1. It is unloaded, and the next request pays the load time again
2. It is deleted from disk and must be pulled a second time before use
3. It moves from the GPU to the CPU in order to save power
4. It stays loaded until someone restarts the server
</div>

??? question "Show Answer"
    The correct answer is **A**. Model keep-alive is how long an idle model stays loaded, set with `OLLAMA_KEEP_ALIVE`. By default a model is unloaded after about five minutes without a request, which frees memory and means the next request pays the load time again. A benchmark that sends prompts minutes apart wants a longer keep-alive, and a machine that shares memory with other work may want a shorter one. Unloading removes the model from memory, not from disk.

    **Concept Tested:** Model Keep-Alive

    **See:** [Runtime Configuration and Model Keep-Alive](index.md#runtime-configuration-and-model-keep-alive)

---

#### 4. What is the cost of a user-space installation of the server, compared with the usual system-wide installer?

<div class="upper-alpha" markdown>
1. The server cannot use the GPU without root access
2. The server is not a system service and will not start on its own
3. The server can load only models smaller than system RAM
4. The server must be reinstalled after each dropped SSH session ends
</div>

??? question "Show Answer"
    The correct answer is **B**. A user-space installation unpacks a release archive into your own home directory, with no administrator rights and no system changes. The cost is that the server is not a system service and does not start on its own. The benefit is that removing it is deleting one directory. On a machine that belongs to someone else, a system-wide installer run with `sudo` is not a step to take on your own, so the trade is worth making.

    **Concept Tested:** User-Space Installation

    **See:** [Runtime Installation, Release Archive, and User-Space Installation](index.md#runtime-installation-release-archive-and-user-space-installation)

---

#### 5. Why is binding the server to `0.0.0.0` a security decision?

<div class="upper-alpha" markdown>
1. The endpoint has no login, so anyone who reaches it can use it
2. The setting disables the encryption on the tailnet's whole data plane
3. The setting sends each prompt to the model's publisher
4. The endpoint then demands administrator rights per request
</div>

??? question "Show Answer"
    The correct answer is **A**. Localhost binding makes the server listen only on the loopback address `127.0.0.1`, so a request from any other machine is refused before it reaches the server. Binding to `0.0.0.0` accepts connections from any machine that can reach the port. That is a security decision because an inference endpoint has no login of its own: anyone who can send it a request can use the machine's GPU and read whatever the model is allowed to read.

    **Concept Tested:** localhost Binding

    **See:** [localhost Binding](index.md#localhost-binding)

---

#### 6. What does running the server in a tmux session protect against, and what does it not?

<div class="upper-alpha" markdown>
1. It survives a dropped SSH connection but not a reboot
2. It survives a reboot but not a dropped SSH connection
3. It restarts the server automatically whenever it fails
4. It keeps other tailnet members from reaching the server
</div>

??? question "Show Answer"
    The correct answer is **A**. A tmux session is a terminal that keeps running after you disconnect, so a server, a download, or a long benchmark continues when your SSH connection drops, and you can reattach later. It does not survive a reboot: after a restart the server is not running until someone starts it. Starting at boot and restarting after a failure are what a background service managed by the operating system provides.

    **Concept Tested:** tmux Session

    **See:** [tmux Session and Background Service](index.md#tmux-session-and-background-service)

---

#### 7. Your first smoke-test request after a model was unloaded reports a very low tokens-per-second figure. What should you do before judging the model's speed?

<div class="upper-alpha" markdown>
1. Lower the context length and restart the server
2. Switch to a smaller quantization of the same model
3. Send the request again and read the second result
4. Rebind the server to all interfaces and then try again
</div>

??? question "Show Answer"
    The correct answer is **C**. A first-prompt smoke test sends one tiny request and checks that the server answered, the reply is not empty, the speed is plausible, and the model is on the GPU. The first prompt after a model is unloaded pays for reading the file from disk, so its tokens per second looks terrible and is not the model's speed. Send it twice and read the speed from the second. If the second is also slow, look at the model, the context, or the memory.

    **Concept Tested:** First-Prompt Smoke Test

    **See:** [First-Prompt Smoke Test](index.md#first-prompt-smoke-test)

---

#### 8. On a unified-memory machine, `ollama ps` shows a loaded model at less than 100% on the GPU. What is the usual cause to check?

<div class="upper-alpha" markdown>
1. A keep-alive period that has been set too short
2. A context setting too large for weights and cache to fit
3. A server that is bound to the loopback address only
4. A model that was pulled from the Ollama model library
</div>

??? question "Show Answer"
    The correct answer is **B**. GPU offload is placing the model's layers on the GPU, and on a unified-memory machine every layer is offloaded because the memory is shared. `ollama ps` shows what is loaded, how much memory it holds, and the share running on the GPU. A model below 100% is partly on the CPU and will be much slower. On a unified-memory machine that usually points to a context setting so large that the cache and weights no longer fit together.

    **Concept Tested:** GPU Offload

    **See:** [GPU Offload and Model Loading](index.md#gpu-offload-and-model-loading)

---

#### 9. A permitted member of the tailnet needs to reach a local endpoint, and the server must stay bound to the loopback address. Which method fits?

<div class="upper-alpha" markdown>
1. Bind the server to `0.0.0.0` so every interface listens
2. Forward a public port on the home router to the server
3. Hand the member your private SSH key for a port forward
4. Publish the port to the tailnet with Tailscale Serve
</div>

??? question "Show Answer"
    The correct answer is **D**. Endpoint sharing makes a local endpoint reachable from other machines. Tailscale Serve publishes the loopback port to the tailnet over HTTPS while the server itself stays bound to the loopback address, and access is limited to tailnet members the access rules allow. Binding to `0.0.0.0` opens the port to anyone who can reach it, and a private key is never handed to another person. An SSH port forward reaches only the person who runs it.

    **Concept Tested:** Tailscale Serve

    **See:** [Endpoint Sharing and Tailscale Serve](index.md#endpoint-sharing-and-tailscale-serve)

---

#### 10. A Python program on the DGX gets no usable reply from the endpoint, but the same request sent with `curl` from the same machine succeeds. What does this tell you?

<div class="upper-alpha" markdown>
1. The model is not loaded on the GPU
2. The server is bound to the wrong interface
3. The server and model work; the fault is in the client
4. The model's context window is too small for the prompt
</div>

??? question "Show Answer"
    The correct answer is **C**. A `curl` request is the simplest way to call the endpoint: one command and no code. It removes every layer between you and the server, so a failure there is a failure of the server or the model and not of your program. Here `curl` succeeds from the same machine, so the server is running, the model answers, and the binding allows the request. What remains is the client program, such as its request body or how it reads the reply.

    **Concept Tested:** curl Request

    **See:** [curl Request](index.md#curl-request)
