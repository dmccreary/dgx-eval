# Quiz: Small Language Models

Test your understanding of tokens, parameters, context windows, open weights, and the abilities textbook generation demands with these review questions.

---

#### 1. What is a token?

<div class="upper-alpha" markdown>
1. One of the learned numbers stored inside a model
2. A single letter or character in the model's input
3. A complete sentence that the model handles as one unit
4. The unit of text that a model reads and writes
</div>

??? question "Show Answer"
    The correct answer is **D**. A token is the unit of text a language model reads and writes: usually a whole common word, a piece of a longer or rarer word, a number, or a punctuation mark. Models do not see letters or whole sentences; they see a sequence of tokens, each identified by a number. Because rare words split into several tokens, a sentence's token count is not its word count. The learned numbers inside a model are parameters, a different idea.

    **Concept Tested:** Token

    **See:** [Token](index.md#token)

---

#### 2. What does it mean when a model is described as 27B?

<div class="upper-alpha" markdown>
1. Its weights take 27 gigabytes of memory to hold
2. Its context window holds 27 billion tokens
3. It has 27 billion learned numbers, called parameters
4. It was trained on 27 billion words of text
</div>

??? question "Show Answer"
    The correct answer is **C**. A parameter is one of the learned numbers inside a model, and the parameter count is how many there are. A 27B model has 27 billion parameters that were adjusted during training and are fixed when you use it. The count is the main driver of memory and of the work per token, but it is not a size in gigabytes, and it does not tell you how well the model writes or follows a skill.

    **Concept Tested:** Parameter Count

    **See:** [Parameter Count](index.md#parameter-count)

---

#### 3. What is inference?

<div class="upper-alpha" markdown>
1. Creating a model's parameters from training data
2. Running a trained model to produce output
3. Converting text into tokens before the model reads it
4. Adjusting a released model's weights for a new task
</div>

??? question "Show Answer"
    The correct answer is **B**. Inference is the act of running a trained model to produce output. It is distinct from training, which creates the parameters from data once, at great expense. Inference then happens every time the model is used, and one machine can be enough for it. This course evaluates inference only; training and fine-tuning are out of scope. Converting text into tokens is the tokenizer's job, a step that comes before the model reads anything.

    **Concept Tested:** Inference

    **See:** [Inference](index.md#inference)

---

#### 4. What is structured output?

<div class="upper-alpha" markdown>
1. Prose that is organized into headings, lists, and tables
2. Reasoning tokens produced before a final answer
3. Output that conforms to a required format such as JSON
4. A reply that combines text with an attached image
</div>

??? question "Show Answer"
    The correct answer is **C**. Structured output is output that conforms to a required format, such as a JSON object with named fields of given types. A downstream program reads it, so a single missing field or stray character can break the whole step. In this workload the learning graph must be a valid JSON file and a CSV file that agree, with no duplicate labels. Intermediate reasoning tokens belong to reasoning mode, and image handling belongs to multimodal models.

    **Concept Tested:** Structured Output

    **See:** [Structured Output](index.md#structured-output)

---

#### 5. Why is a mistake early in a large language model's output never revisited?

<div class="upper-alpha" markdown>
1. It writes one piece at a time, each built on all text before it
2. It drafts the whole reply first and then is unable to edit the draft
3. Its tokenizer discards earlier tokens to save context space
4. Its parameters are updated after every token it generates
</div>

??? question "Show Answer"
    The correct answer is **A**. A large language model repeats one step: given the text so far, it assigns a probability to every possible next piece, one piece is chosen and appended, and the process repeats. Every piece depends on everything before it, so an early mistake is never revisited, only built upon. That mechanism explains both the fluency and the failures. The parameters do not change during use; they were fixed when training ended.

    **Concept Tested:** Large Language Model

    **See:** [Large Language Model](index.md#large-language-model)

---

#### 6. How does an open-weight model differ from an open-source model?

<div class="upper-alpha" markdown>
1. An open-weight model cannot be run on hardware you own
2. An open-weight model is always free for commercial use
3. Its weights are public, but its training data and code usually are not
4. Its weights stay private while its training code and data are published
</div>

??? question "Show Answer"
    The correct answer is **C**. An open-weight model publishes its trained parameters so anyone can download and run them. That does not mean the training data, the training code, or unrestricted rights are also public. In an open-source model the data and code are published and use is governed by an open-source license. An open-weight model's use is governed by a model license that can limit commercial use, so being able to download a model is not permission to use it for any purpose.

    **Concept Tested:** Open-Weight Model

    **See:** [Open-Weight Model](index.md#open-weight-model)

---

#### 7. In tool calling, what does the model itself do?

<div class="upper-alpha" markdown>
1. It emits a structured request that the harness then executes
2. It runs the shell command and returns the output as text
3. It edits files on the machine through its tokenizer
4. It asks the user to run the command and then paste the result back
</div>

??? question "Show Answer"
    The correct answer is **A**. Tool calling is a model's ability to ask a program to act on its behalf. The model does not run commands itself. It writes a structured request naming a tool and its arguments, a surrounding program called the harness executes it, and the result returns to the model as new text. A language model only ever produces text, and that boundary explains both what agents can do and where the safety limits sit.

    **Concept Tested:** Tool Calling

    **See:** [Tool Calling](index.md#tool-calling)

---

#### 8. Why are a generative AI model's mistakes harder to bound than a classifier's?

<div class="upper-alpha" markdown>
1. A generative model is trained on far less data
2. A classifier checks every label it assigns against a JSON schema
3. A generative model cannot be given instructions
4. A generative model's output has no fixed set of answers
</div>

??? question "Show Answer"
    The correct answer is **D**. A generative AI model produces open-ended output, so there is no fixed list of possible answers. A classifier maps an input to one label from a fixed set, which bounds its mistakes: with two labels there are only two ways to be wrong. A generative model can instead fail by producing fluent text that is wrong or off-task. That unbounded failure mode is why measuring one needs the careful evaluation design taught later in the book.

    **Concept Tested:** Generative AI Model

    **See:** [Generative AI Model](index.md#generative-ai-model)

---

#### 9. A model has a 16,000-token context window. You give it a 10,000-word document and expect a reply of up to 3,000 tokens. Using 1.33 tokens per word, does the task fit?

<div class="upper-alpha" markdown>
1. Yes, because 10,000 words is well under the 16,000-token window
2. No, because about 13,300 plus 3,000 tokens exceeds 16,000
3. Yes, because the reply does not count against the context window
4. No, because the document alone is about 16,300 tokens
</div>

??? question "Show Answer"
    The correct answer is **B**. The context window counts both the text a model is given and the text it generates, and it is measured in tokens, not words. The document is about 10,000 × 1.33 = 13,300 tokens, which fits alone. Adding room for a 3,000-token reply brings the need to about 16,300 tokens, which is over 16,000. The document fits by itself and the task does not. Comparing words to tokens directly, or ignoring the reply, gives the wrong answer.

    **Concept Tested:** Context Window

    **See:** [Context Window](index.md#context-window)

---

#### 10. On one DGX unit with 128 GB of memory, `mistral-medium-3.5:128b` downloaded and loaded, yet it was not counted as a usable small language model there. Why?

<div class="upper-alpha" markdown>
1. It ran at 3 tokens per second and no large context fit
2. Its weights could not be downloaded to the unit at all
3. Its license did not permit running it on local hardware
4. Its parameter count exceeded a fixed limit for small models
</div>

??? question "Show Answer"
    The correct answer is **A**. The course's working definition has two parts, and a model can pass one and fail the other. This model is open-weight and could be downloaded and loaded, so it met the first test. On that unit it ran at 3 tokens per second and no context of 64,000 tokens or more fit, so it could not be served usefully. The definition is relative to the hardware, not to a parameter threshold, so the answer could change on a larger system.

    **Concept Tested:** Small Language Model

    **See:** [Small Language Model](index.md#small-language-model)
