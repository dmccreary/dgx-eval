---
title: "Prerequisites and the Intelligent Textbook"
description: "The working skills this course assumes, the intelligent-textbook model, the MkDocs toolchain, and the documents that describe a course, ending with what the benchmark workload produces and why it is hard for a small model."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 21:04:10"
version: 1.11
---

# Prerequisites and the Intelligent Textbook

## Summary

This chapter sets up everything the rest of the book builds on. It reviews the command-line, Python, Git, and generative-AI skills the course assumes, then introduces the intelligent-textbook model, its five levels, MkDocs Material, and the course description that seeds every later step. After completing it, students can explain what the benchmark workload produces and why it is a demanding test for a local model.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Generative AI Assistant Use | 2518 |
| Command Line Basics | 375 |
| Python Scripting Basics | 162 |
| Markdown Source Files | 38 |
| Git Version Control | 18 |
| Bloom's Taxonomy | 5 |
| Intelligent Textbook | 153 |
| MkDocs Material | 12 |
| GitHub Repository | 5 |
| Learning Outcomes | 3 |
| Course Description | 53 |
| MicroSim | 10 |
| Static Site Build | 5 |
| MkDocs Navigation | 4 |
| Levels of Intelligent Textbooks | 1 |
| Iframe Embedding | 2 |
| Strict Site Build | 2 |
| Course Description Quality Score | 1 |
| Lesson Plan | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Meet Tera, Your Guide Through the Measurements"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hello, I'm Tera, a robot with a tool belt full of benchmarking instruments, and I would rather measure something than argue about it. By the end of this chapter you will be able to explain what the benchmark workload produces and why it is a hard test for a small model. You will see me in six roles across this book:

    1. **Welcome:** I open each chapter and tell you what you will be able to do by the end.
    2. **Think:** I flag a mental model worth slowing down for.
    3. **Tip:** I hand you a shortcut you can use immediately.
    4. **Warn:** I mark a known trap and show you how to avoid it.
    5. **Encourage:** I show up where the material is notoriously hard.
    6. **Celebrate:** I close a chapter by naming what you just accomplished.

    If I'm not doing one of those six things, I'm not in the chapter. Measure first, then decide!

## What This Chapter Sets Up

This course asks an empirical question: can a single NVIDIA DGX system running an open-weight small language model generate an entire intelligent textbook without sending a token to the cloud? Answering it requires two kinds of groundwork. The first is a handful of working skills, because every later chapter asks you to type commands, read scripts, and commit files. The second is a shared vocabulary for the thing being generated, because you cannot judge a textbook until you know what makes one intelligent.

The chapter therefore moves through four groups of ideas. It starts with the five skills the course assumes, then defines the intelligent textbook and its interactive parts. It continues with the toolchain that turns Markdown files into a website, and it closes with the documents that describe what a course must teach. A final section connects those ideas to the benchmark workload that the rest of the book measures.

## Five Working Skills

You do not need prior GPU or model-serving experience, but you do need these five skills. Each one is used in a specific later chapter, and the closing table of this section lists where.

### Generative AI Assistant Use

A **generative AI assistant** is a program that produces text, code, or commands in response to a natural-language request. Chat assistants and coding assistants are the common forms. Using one well means more than typing a question: you supply enough context for a useful answer, you ask for the reasoning, and you check the result before you rely on it.

This skill matters more here than in most courses. The entire benchmark is one long exercise in generation, so you need a calibrated sense of how an assistant fails. The typical failure is not nonsense. It is an answer that is plausible, fluent, and slightly wrong, which makes it easy to accept without checking.

Consider a worked example. You are in a directory holding about forty files and you want the five largest. A prompt that states the situation and asks for an explanation produces an answer you can evaluate:

```text
Prompt:
  I am in a directory that holds about forty files. Write one shell command
  that lists the five largest files, largest first, and explain each part.

Assistant reply (illustrative):
  ls -lS | head -6

  "ls -lS" lists entries with their sizes, largest first. "head -6" keeps the
  first six lines: one summary line that starts with "total", then five entries.
```

The command is a good answer, and it still deserves a check. `ls` does not distinguish files from directories, so a large subdirectory would appear in the list and take one of the five slots. Running the command in a scratch directory whose contents you know exposes this in seconds. Whether the behavior matters depends on your question, but you only get to decide if you looked.

The habits that separate productive assistant use from lucky guessing are small and concrete. The table summarizes the three that this course relies on.

| Habit | Weak version | Strong version |
|---|---|---|
| State the context | "List big files." | "I am in a directory with about forty files. List the five largest." |
| Ask for the reason | "Fix this." | "Explain what each part of the command does." |
| Verify before trusting | Run it on real data | Run it on a scratch copy where you know the right answer |

!!! mascot-tip "Tera's Tip"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you run a command an assistant gives you, ask it to explain every flag, then run the command in an empty scratch directory first. A wrong answer there costs nothing, and the same habit will keep a local model's mistakes cheap later in the book.

In Chapter 16 the assistant stops being something you talk to and becomes an agent that runs tools on its own. The verification habit transfers directly, because an agent's output is also plausible and sometimes wrong.

### Command Line Basics

The **command line** is a text interface to a computer. You type a command, press Return, and read the output. A **shell** is the program that interprets what you type, and a **terminal** is the window that hosts it. Every machine in this course, including the DGX itself, is reached and administered this way.

Three ideas carry most of the weight. The **working directory** is the folder the shell currently treats as "here". A **path** is a location written as folder names separated by slashes; an absolute path starts at the root of the filesystem, and a relative path starts at the working directory. A **command** takes arguments that say what to act on, so `ls docs` lists the folder named `docs`.

The following session shows five commands against a small practice project. Read it line by line; the lines that start with `$` are what you type, and the lines below each are what the shell prints.

```text
$ pwd
/home/<user>/books/practice-book
$ ls
docs  mkdocs.yml
$ cd docs
$ ls
chapters  index.md
$ cat index.md
# Practice Book

Welcome to the practice book.
$ grep -n "Welcome" index.md
3:Welcome to the practice book.
```

Notice what the session does not print. The `cd docs` command succeeded and produced no output at all; the only evidence is that the next `ls` lists a different folder. Silence from a shell command usually means success. Notice also that `<user>` is a placeholder. Throughout this book, any account name, machine name, or address in an example is replaced with a placeholder like this one, for reasons Chapter 23 explains in full.

The commands you need for the next few chapters are few. This table organizes the ones from the session, plus the one that opens a shell on another machine.

| Command | What it does | Example |
|---|---|---|
| `pwd` | Prints the absolute path of the working directory | `pwd` |
| `ls` | Lists the files and folders in the working directory | `ls docs` |
| `cd` | Changes the working directory; prints nothing on success | `cd docs` |
| `cat` | Prints the contents of a file | `cat index.md` |
| `grep` | Prints the lines of a file that match a pattern | `grep -n "Welcome" index.md` |
| `ssh` | Opens a shell on another machine (Chapter 7) | `ssh <user>@<dgx-host>` |

Reading about commands is not the same as predicting what they do. The interactive exercise below makes you commit to an output before the answer appears, which is the quickest way to find out which of these ideas you only half hold.

#### Diagram: Command Output Predictor


<iframe src="../../sims/command-output-predictor/main.html" width="100%" height="714px" scrolling="no"></iframe>
[Run Command Output Predictor Fullscreen](../../sims/command-output-predictor/main.html)

<details markdown="1">
<summary>Command Output Predictor</summary>
Type: microsim
**sim-id:** command-output-predictor<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/learning-linux/tree/main/docs/sims/command-syntax<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** execute<br/>
**Learning Objective:** The learner will execute five shell commands against a given directory tree by predicting the output and the resulting working directory after each, with at least 4 of 5 correct.

**Prerequisites:** terminal, shell, working directory, path, absolute path, relative path, command, argument (all defined in the section "Command Line Basics" above this block).

**Evidence of Mastery:** The learner selects one predicted output per command before the sim shows the real output. A selection is correct when it equals the option marked correct in Content. Mastery is 4 of 5 correct. Reading the directory tree and reading the feedback are exploration, not evidence.

**Misconceptions:** (1) `ls` lists everything below the working directory, including the contents of subfolders. (2) `cd` prints the new path. (3) `..` names the current folder rather than the parent folder. (4) Each command starts fresh instead of continuing from the working directory the previous command left.

**Instructional Rationale:** Apply-level execution needs the learner to carry state from one command to the next, so the five commands run in a fixed order and each prediction depends on the working directory the earlier commands produced. Committing to an answer before it is revealed turns watching a terminal into producing a result.

**Content:**

The sim shows this practice directory, labeled "synthetic example". The shell starts in `/home/student/lab`.

| Path | Kind | Contents |
|---|---|---|
| `/home/student/lab/notes.txt` | file | Three lines: `model: unset`, `context: 4096`, `status: draft` |
| `/home/student/lab/readme.md` | file | One line: `Probe results go in results.` |
| `/home/student/lab/probes` | folder | Contains `cpu.py` and `gpu.py` |
| `/home/student/lab/results` | folder | Empty |

The five commands, in this order, each with exactly four options shown in the order listed:

| # | Command typed | Option A | Option B | Option C | Option D | Correct | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|
| 1 | `pwd` | `/home/student` | `/home/student/lab` | `lab` | `notes.txt  probes  readme.md  results` | B | `pwd` prints the full absolute path of the working directory, not just its last folder name. |
| 2 | `ls` | `probes  results` | `notes.txt  readme.md` | `notes.txt  probes  readme.md  results` | `cpu.py  gpu.py` | C | `ls` lists both files and folders in the working directory, and does not list what is inside the folders. |
| 3 | `cd probes` | Prints `cpu.py  gpu.py` | Prints `/home/student/lab/probes` | Prints nothing; the working directory becomes `/home/student/lab/probes` | Prints `probes: Is a directory` | C | `cd` changes state silently. Its only evidence is the working directory that later commands see. |
| 4 | `ls` | `notes.txt  probes  readme.md  results` | `cpu.py  gpu.py` | `cpu.py  gpu.py  notes.txt` | Prints nothing | B | After `cd probes` the working directory is `probes`, so `ls` lists that folder's two files. |
| 5 | `cat ../notes.txt` | `cat: ../notes.txt: No such file or directory` | `notes.txt` | `cpu.py  gpu.py` | The three lines `model: unset`, `context: 4096`, `status: draft` | D | `..` names the parent folder, so the path reaches `/home/student/lab/notes.txt`, and `cat` prints the file's contents. |

**Provenance:** The directory and its file contents are synthetic and invented for this exercise; the sim labels them "synthetic example". The behavior of `pwd`, `ls`, `cd`, `cat` and `..` is the behavior stated in the chapter section "Command Line Basics".

**Rules:** The commands run in the fixed order 1 to 5 and state carries over: the working directory after command 3 is `/home/student/lab/probes` and stays so through commands 4 and 5. Option order is fixed as listed. There is no randomness and no numeric tolerance. Each command allows exactly one selection, and it is final.

**Learner Activity:**

1. The learner sees the directory table and the first command, `pwd`, with its four options.
2. The learner selects one option. The sim immediately shows the real output, marks the selection correct or incorrect, shows the correct option, and shows the Why text.
3. The learner moves to the next command. The sim shows the working directory that the earlier commands left, so the learner can see the state change after command 3.
4. After command 5 the sim shows the score and lists the Misconceptions that correspond to any commands answered incorrectly.

**Feedback:** Five commands, fixed order, one selection each, and the selection is final. The real output, the correct option, and the Why text are shown immediately after the selection. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the Why text. The final score reads "n of 5 correct".

**Starting State:** Command 1 is shown with no option selected, the working directory is `/home/student/lab`, and the question on screen is "What does the shell print?"

**Chapter Anchors:** The chapter states that `pwd` prints the absolute path, `ls` lists files and folders without descending into folders, `cd` prints nothing on success, `cat` prints a file's contents, and `..` names the parent folder.
</details>

### Python Scripting Basics

A **Python script** is a text file of Python statements that the Python interpreter runs from top to bottom. Python is the language of the hardware probes, the model-fit calculator, and the benchmark runner in this course, so you will read far more scripts than you write. The **standard library** is the set of modules that ship with Python itself. A script that uses only the standard library runs on any machine with Python and needs nothing installed.

Before the example, here is what its parts do. The `import` statement makes a module available. The `platform` module reports facts about the machine and the interpreter, and the `os` module reports facts about the operating system, including the number of CPU cores. The `print` function writes a line to the terminal.

```python
import platform
import os

print("system:", platform.system())
print("machine:", platform.machine())
print("python:", platform.python_version())
print("cpu cores:", os.cpu_count())
```

Saved as `machine_report.py` and run with `python3 machine_report.py`, the script prints four lines. The values below are illustrative; yours depend on the machine.

```text
system: Linux
machine: aarch64
python: 3.11.9
cpu cores: 20
```

The `machine` line is the one to watch in this course. DGX systems are built on either x86_64 or aarch64 processors, and that difference decides which software packages install. This six-line script is the seed of the hardware probes in Chapter 10, which grow it into a full report.

A second script shows the other half of the skill, which is reading data. The `json` module turns a JSON file into Python lists and dictionaries, `open` gives access to the file, and `len` counts the items in a list. The script below counts the concepts and dependencies in this book's own learning graph.

```python
import json

with open("docs/learning-graph/learning-graph.json") as f:
    graph = json.load(f)

print("concepts:", len(graph["nodes"]))
print("dependencies:", len(graph["edges"]))
```

Run from the root of this book's repository, it prints `concepts: 506` and `dependencies: 824`. Reading structured data and checking it with a few lines of Python is exactly what the benchmark's structural checks do, so this is the pattern to recognize.

| To do this | Run this |
|---|---|
| Run a script | `python3 machine_report.py` |
| Check the interpreter version | `python3 --version` |
| Run one statement without a file | `python3 -c "print(2 + 2)"` |

### Git Version Control

**Git** is a version control system: it records the history of a folder of files as a series of snapshots called **commits**, each with a message that says why the files changed. You can compare any two snapshots, return to an earlier one, and see who changed what. For a project made of text files, which includes every textbook in this course, Git is how work stays recoverable.

The daily cycle has three steps. You inspect what changed, you stage the files you want recorded, and you commit them with a message. A fourth step, `git push`, sends the commits to a remote copy.

```text
$ git status
On branch main
Changes not staged for commit:
        modified:   docs/index.md
$ git add docs/index.md
$ git commit -m "Reword the home page summary"
$ git push
```

The `git add` step exists because a commit is a deliberate selection. You may have edited five files and want only one recorded, and `git add` is how you say which. Writing the message in terms of why the change was made, not what file it touched, pays off months later when you read the history.

### GitHub Repository

A **GitHub repository** is a remote, hosted copy of a Git project, along with the pages and tools GitHub builds around it. Pushing to it gives you a backup, a shared copy collaborators can pull, and, for this book, a place that can publish the finished site. This book's source lives in a repository, and its site is served from the same one.

Two properties of a repository matter for this course. A repository can be public or private, and a public one can be read by anyone on the internet. Git also keeps the complete history, so a file that was committed once remains reachable in older commits even after a later commit deletes it.

!!! mascot-warning "A Public Repository Remembers Everything"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    This book's repository is public, and Git history is permanent, so a login, address, or token committed even once is exposed for good. Look at `git diff` before every commit, never commit raw command output, and if something sensitive does get committed, stop and fix it using the history steps in Chapter 23 instead of simply deleting it in the next commit.

### Markdown Source Files

**Markdown** is a plain-text format in which a few punctuation conventions mark structure: a leading `#` makes a heading, a leading `-` makes a list item, and pipes make a table. A **Markdown source file** is a text file in that format, usually with the extension `.md`. Because it is plain text, Git can diff it, a model can generate it, and a build tool can turn it into a web page.

Many Markdown files in this course also begin with a short block of settings between two `---` lines. That block is called **frontmatter**, and it carries metadata such as the page title. The file below shows the whole set of pieces you will meet most often.

````text
---
title: "Practice Chapter"
---

# Practice Chapter

A paragraph of ordinary prose.

- first list item
- second list item

| Term | Meaning |
|---|---|
| shell | The program that interprets typed commands |
````

The table shows what each piece becomes on the rendered page.

| Source | Rendered result |
|---|---|
| `# Practice Chapter` | A top-level page heading |
| A line of plain text | A paragraph |
| Lines starting with `- ` | A bulleted list |
| Rows of text between pipes | A table |
| Text between two `---` lines at the top | Page metadata; not displayed as text |

!!! mascot-warning "Blank Line Before Every List"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    MkDocs does not start a list unless a blank line comes before it, so a list typed straight after a sentence collapses into one run-on paragraph. The page still builds with no error, which is why it goes unnoticed. Always leave one empty line before the first bullet or number, and the same goes for tables.

## The Intelligent Textbook

### What Makes a Textbook Intelligent

An **intelligent textbook** is a textbook whose content is structured so that software can read it, check it, and respond to the reader. Two properties define it. The first is explicit structure: the concepts, their dependencies, and the learning outcomes are stored as data, not only implied by the prose. The second is interactivity: the book contains elements the reader operates and that report back what the reader did.

Explicit structure is easier to grasp from a small example. The fragment below stores two concepts and one dependency between them, in the JSON format this book's learning graph uses. The edge points from the dependent concept to the concept it depends on, so it reads "a MicroSim depends on the intelligent-textbook idea".

```json
{
  "nodes": [
    {"id": 6, "label": "Intelligent Textbook"},
    {"id": 14, "label": "MicroSim"}
  ],
  "edges": [
    {"from": 14, "to": 6}
  ]
}
```

A worked comparison shows the difference. Suppose the concept is "quantization", which a later chapter covers. In a static textbook the treatment is a paragraph and a table of numbers. In an intelligent textbook the same concept has a stated place in a dependency graph, so the book knows which concepts must come first. It also carries an interactive simulation in which the reader moves a precision control and watches the memory estimate change, and a short quiz that records which options the reader chose.

| Aspect | Static textbook | Intelligent textbook |
|---|---|---|
| Concept order | Implied by chapter order | Stored as dependencies between concepts |
| Explanation | Prose and fixed figures | Prose plus interactive elements |
| Reader feedback | None | Quizzes and simulations that respond |
| Revision | Edit the page by hand | Regenerate or revise from the same structured sources |

!!! mascot-thinking "Why This Book Can Be Generated"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    An intelligent textbook is a set of plain text files plus a build, so a model can write it and a program can check it. That is the property that makes textbook generation a benchmark you can measure at all: the output is machine-readable, so "did it work?" has an answer other than a reader's opinion.

### Levels of Intelligent Textbooks

The **levels of intelligent textbooks** are a five-step scale for how much intelligence a book has. Each level adds a capability the previous one lacks, and the higher levels are progressively more aspirational.

| Level | Name | What the reader gets |
|---|---|---|
| 1 | Static content | Fixed text and images; no navigation aids or interactivity |
| 2 | Interactive content | Hyperlinks, quizzes, MicroSims, and a searchable glossary |
| 3 | Adaptive content | Material that changes with the reader's demonstrated progress |
| 4 | Chatbot integration | A conversational tutor that answers the reader's questions in real time |
| 5 | Autonomous AI | Fully customized lessons generated in real time for each reader |

This book targets Level 2 and above, so it contains MicroSims and quizzes. The books the benchmark generates are Level 2 books as well: Markdown prose, interactive elements, quizzes, and a glossary. The Book Levels MicroSim below lets you compare the five levels directly.

#### Diagram: Book Levels MicroSim

<iframe src="https://dmccreary.github.io/ibook-skills/sims/book-levels/main.html" width="100%" height="502px" scrolling="no"></iframe>

[Run the Book Levels MicroSim fullscreen](https://dmccreary.github.io/ibook-skills/sims/book-levels/main.html){ .md-button }

<details markdown="1">
<summary>Book Levels MicroSim (reused MicroSim)</summary>
Type: microsim
**sim-id:** book-levels<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/ibook-skills/sims/book-levels/<br/>
**Source Repo:** https://github.com/dmccreary/ibook-skills/tree/main/docs/sims/book-levels<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the five levels of intelligent textbooks by the capability each level adds over the one below it.

Reused from the MicroSim catalog (WHAT match score 0.7579).
</details>

### MicroSim

A **MicroSim** is a small, self-contained interactive simulation, embedded in a textbook page, that demonstrates exactly one idea. The scope is the point: a MicroSim has one learning objective, a few controls, and a result the reader can see change. A slider that redraws a chart as the reader changes a value is the typical shape.

Each MicroSim in this book lives in its own folder under `docs/sims/`, named by a short lowercase identifier. The folder holds a `main.html` page that runs the simulation and an `index.md` lesson page that describes it. That layout lets the same simulation be embedded in a chapter, opened fullscreen, or reused in another book.

Two examples already exist in this repository. The Parameters That Fit in Memory MicroSim lets you move a memory slider and see the largest model whose weights fit, and the Testing Architecture MicroSim lets you step through how the evaluation machines connect. Both follow the folder layout above.

Because a MicroSim is a small program, it has a build status as it moves from a plan to a finished sim. This book marks each MicroSim as `scaffold` (a specification exists, but no implementation), `built` (implemented and awaiting the Primary Author's review), or `approved` (tested and cleared for learners).

### Iframe Embedding

**Iframe embedding** places one web page inside another by using the HTML `iframe` element. It is how a MicroSim's `main.html` appears inside a chapter page without being copied into it. The `iframe` element takes the address of the page to show, plus a height and width.

```html
<iframe src="../../sims/example-sim/main.html" width="100%" height="500px" scrolling="no"></iframe>
```

The address in `src` is relative to the page that contains the iframe. A chapter's `index.md` renders two folders deep, so it reaches the `sims` folder with `../../`. A wrong relative path produces a blank box, with no build error to point at it.

## The Build Toolchain

### MkDocs Material

**MkDocs** is a static site generator: it reads a folder of Markdown files and a configuration file and produces a website. **MkDocs Material** is a widely used theme for it that adds search, navigation, callout boxes called admonitions, code highlighting, and a responsive layout. This book is built with it, and so are the books the benchmark generates.

The configuration file is `mkdocs.yml`. It names the site, selects the theme, and lists the pages. A minimal one is only a few lines.

```yaml
site_name: Practice Book
theme:
  name: material
nav:
  - Home: index.md
  - Chapters:
      - Introduction: chapters/01-introduction/index.md
```

Each page you write is a Markdown file under the `docs` folder. The configuration decides which of them appears on the site and in what order.

One extension you will see in every chapter is the **admonition**, a callout box that sets a note apart from the body text. It is written as `!!!`, a type, an optional title in quotes, and a body indented by four spaces. The mascot's messages in this book are admonitions with a custom type.

```text
!!! note "A Short Title"
    The body of the callout is indented four spaces.
```

### MkDocs Navigation

**MkDocs navigation** is the sidebar tree, and it is defined by the `nav:` block in `mkdocs.yml`. Each entry is a label followed by the path of a Markdown file relative to `docs`. Entries can nest, which is how a chapter's sub-pages sit under the chapter.

A page that exists on disk but is missing from `nav:` is built, yet no reader can find it from the sidebar. Adding a page is therefore always two steps: create the file, then list it. In the example above, adding `chapters/02-setup/index.md` means adding one line under `Chapters:`, at the same indentation as the entry above it.

```yaml
nav:
  - Home: index.md
  - Chapters:
      - Introduction: chapters/01-introduction/index.md
      - Setup: chapters/02-setup/index.md
```

### Static Site Build

A **static site build** is the step that converts the Markdown files and configuration into finished web files. Running `mkdocs build` writes a `site` folder of plain HTML, CSS, and JavaScript. Nothing in that folder needs a database or a server-side program, so any file host can serve it, and GitHub Pages is the usual choice here.

For the practice project above, the `site` folder holds one HTML file per page, plus shared assets.

```text
site/
  index.html
  chapters/01-introduction/index.html
  assets/
```

Static output has a useful consequence for this course. A built site can be inspected and checked as a set of files, with no running service to configure. It also means a local model never has to operate a server to produce a textbook; it only has to write files that build.

### Strict Site Build

A **strict site build** is a build that treats every warning as an error. You run it with `mkdocs build --strict`. An ordinary build prints a warning about a broken link and then finishes anyway; a strict build stops.

```text
$ mkdocs build --strict
WARNING -  Doc file 'index.md' contains a link 'chapters/02-setup/index.md',
           but the target is not found among documentation files.
Aborted with 1 warnings in strict mode!
```

The wording above is abbreviated and illustrative. The behavior is the point: a defect that would have shipped as a dead link becomes a failed build you must fix.

!!! mascot-tip "Run Strict Before You Commit"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Run `mkdocs build --strict` before every commit. It catches broken links and unlisted files while the change is still small, and later in the book the same check becomes one of the objective measurements of whether a model's output is any good.

## Describing What a Course Must Teach

### Bloom's Taxonomy

**Bloom's Taxonomy** is a classification of learning objectives by the kind of thinking they require. The 2001 revision names six levels, from simplest to most demanding: remember, understand, apply, analyze, evaluate, and create. Each level has characteristic verbs, and the verb in an objective tells you what the learner must do to show it.

The value for this course is that the verb makes an objective checkable. "Understand Tailscale" cannot be tested, because there is no action to observe. "Describe how Tailscale builds an encrypted mesh between devices" can be tested, since you can read the description and judge it. The table shows each level with a real outcome from this course's description.

| Level | Typical verbs | Outcome from this course |
|---|---|---|
| Remember | list, define, recall | List common quantization levels and model file formats |
| Understand | explain, summarize, interpret | Explain why an isolated conda environment makes an evaluation reproducible |
| Apply | use, execute, calculate | Create a conda environment with a pinned Python version |
| Analyze | compare, distinguish, deconstruct | Compare candidate open-weight models by license, size, and context window |
| Evaluate | judge, critique, justify | Judge whether a DGX configuration is sufficient for end-to-end generation |
| Create | design, construct, compose | Build a model-fit calculator that returns a fit verdict with headroom |

!!! mascot-thinking "A Verb Is a Measurement"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Swapping a vague word like "understand" for an observable verb turns a hope into something you can measure. The evaluation in this book runs on the same instinct: a claim about a model counts only when it comes with a number you can check.

### Learning Outcomes

**Learning outcomes** are statements of what a learner will be able to do after finishing a course, written as observable actions. Each begins with a verb from the Bloom's Taxonomy list, so each can be checked by watching the learner do it. A good set of outcomes does double duty: it tells the learner what to aim for and tells the author what to teach and what to test.

### Course Description

A **course description** is a structured document that states what a course covers, who it is for, what it excludes, and what learners can do afterward. In this workflow it is the seed document. Every later artifact inherits its scope from it, so a gap or a vague statement in the course description becomes a gap or an invented topic everywhere downstream.

This book's own course description, [the one you can read in full](../../course-description.md), is a good worked example. The table shows each part, what it tells a generator, and what this book put there.

| Section | What it tells the generators | In this book |
|---|---|---|
| Target audience | The reading level and tone | Professional development and adult continuing education: AI engineers, instructional technologists, technical authors, IT leads |
| Prerequisites | What may be assumed, and so not explained | Command line, basic Python, Git and GitHub, and experience with an AI assistant |
| Course overview | The question the course answers | Can one DGX running a small model generate a textbook with no cloud tokens? |
| Main topics covered | The concepts to enumerate | Sixteen numbered topics, from intelligent textbooks to sanitizing artifacts |
| Topics not covered | The boundary that stops invented content | Ten exclusions, such as training, fine-tuning, and cluster-scale infrastructure |
| Learning outcomes | What each concept must support | Outcomes at all six Bloom levels, ending in a capstone evaluation |

Specificity in the topics section also drives how many concepts a generator can extract. The pair below describes the same topic at two levels of detail.

| Version | Statement | What a generator can do with it |
|---|---|---|
| Vague | "Covers AI hardware." | Invent a generic list of components |
| Specific | "CPU architecture (x86_64 and aarch64), system RAM, GPU configuration, dedicated versus unified memory, storage, power, and thermals." | Enumerate each named concept and relate them |

The "Topics not covered" section deserves attention because it is the one authors skip. A model asked to write about a DGX will happily write about training and fine-tuning unless the course description rules it out. An explicit exclusion costs one line and prevents a chapter nobody wanted.

The course description is also the first of a chain of artifacts. Before looking at the chain, four terms need a definition. A **learning graph** is a graph of the course's concepts in which each connection records that one concept depends on another; Chapter 2 builds one. A **skill** is a packaged set of instructions that an AI agent follows to do one job, covered in Chapter 17. A **glossary** defines each concept in a sentence, and an **FAQ** answers questions a reader is likely to ask. A **quiz** is a set of questions that test a chapter's content.

With those terms in hand, the pipeline has eight artifacts: the course description and seven that the skills generate from it. The diagram below lets you explore what each one contains and then test whether you can say what each one is built from.

#### Diagram: Textbook Generation Pipeline Explorer


<iframe src="../../sims/textbook-pipeline-explorer/main.html" width="100%" height="594px" scrolling="no"></iframe>
[Run Textbook Generation Pipeline Explorer Fullscreen](../../sims/textbook-pipeline-explorer/main.html)

<details markdown="1">
<summary>Textbook Generation Pipeline Explorer</summary>
Type: microsim
**sim-id:** textbook-pipeline-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/signal-processing/tree/main/docs/sims/book-gen-workflow<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify, for each of the seven generated artifacts of the textbook pipeline, which of the other seven artifacts it is built from, with at least 6 of 7 exactly correct.

**Prerequisites:** course description, learning graph, skill, glossary, FAQ, quiz, MicroSim (all defined in the sections "Course Description" and "MicroSim" above this block).

**Evidence of Mastery:** For each generated artifact, the learner checks every other artifact it is built from, then submits. A submission is correct only when the checked set equals the set in the "Built from" column of Content exactly. Mastery is 6 of 7 correct. Reading the "Contains" and "Location" text is exploration, not evidence.

**Misconceptions:** (1) The chapters are written directly from the course description without a learning graph. (2) The glossary is written from the chapters rather than from the concept list. (3) A MicroSim is built from the course description rather than from a specification inside a chapter.

**Instructional Rationale:** Remember-level mastery of a chain is the ability to say what comes from what, so the check asks for the set of inputs of each artifact. Letting the learner read each artifact's contents first makes the dependencies something they have seen before they are asked to recall them.

**Content:**

Eight artifacts. The learner can open any of them and read its row. The sim labels the "Built from" column as the answer key and hides it until the learner has submitted.

| # | Artifact | Built from | Contains | Location |
|---|---|---|---|---|
| 1 | Course Description | none (written by the author) | audience, prerequisites, overview, topics, exclusions, outcomes | `docs/course-description.md` |
| 2 | Learning Graph | Course Description | concepts and dependency edges, as a CSV file and a JSON file | `docs/learning-graph/learning-graph.json` |
| 3 | Chapter Structure | Course Description, Learning Graph | chapter folders with titles, summaries, and assigned concept lists | `docs/chapters/NN-slug/index.md` |
| 4 | Chapter Content | Course Description, Learning Graph, Chapter Structure | prose, tables, and specifications for interactive elements | `docs/chapters/NN-slug/index.md` |
| 5 | MicroSims | Chapter Content | one `main.html` and one `index.md` per simulation | `docs/sims/<sim-id>/` |
| 6 | Glossary | Learning Graph | one definition for each concept in the concept list | `docs/glossary.md` |
| 7 | FAQ | Chapter Content, Learning Graph, Glossary | questions and answers drawn from the book | `docs/faq.md` |
| 8 | Quizzes | Chapter Content, Learning Graph | questions for each chapter | `docs/chapters/NN-slug/quiz.md` |

Why each answer is correct, shown as feedback after the learner submits:

| Artifact | Why (shown as feedback) |
|---|---|
| Learning Graph | The concepts are enumerated from the topics and outcomes the course description states. |
| Chapter Structure | Chapters group the graph's concepts under the course description's scope, with prerequisites in the same or an earlier chapter. |
| Chapter Content | Each chapter is written from its outline and concept list, within the course description's audience and scope, and the graph's impact scores set how much space each concept gets. |
| MicroSims | A MicroSim is built from the specification block written inside a chapter. |
| Glossary | One definition is written for each concept in the graph's concept list. |
| FAQ | Questions come from what the chapters teach, the concepts in the graph, and the terms the glossary defines. |
| Quizzes | Questions test what a chapter teaches and are aligned to the graph's concepts. |

**Provenance:** The artifact names, inputs, and locations come from this chapter's section "Course Description" and from the skill descriptions in the ibook-skills library (learning-graph-generator, book-chapter-generator, chapter-content-generator, glossary-generator, faq-generator, quiz-generator, microsim-generator). No value is synthetic.

**Rules:** The seven check items run in the fixed order 2 to 8. Each item offers all seven other artifacts as checkboxes, including artifacts that come later in the pipeline. An item is correct only when the checked set equals the "Built from" set exactly: a missing artifact and an extra artifact are both incorrect. The Course Description has no inputs, so it is never a check item.

**Learner Activity:**

1. The learner opens each of the eight artifacts in any order and reads its Contains and Location text. The learner should notice that Chapter Structure and Chapter Content share a file.
2. The learner starts the check. The sim shows artifact 2, Learning Graph, with seven checkboxes for the other artifacts.
3. The learner checks every artifact they think it is built from and submits. The sim shows the correct set, marks the item correct or incorrect, and shows the Why text.
4. The learner repeats for artifacts 3 to 8 in order. The sim then shows the first-attempt score and, for each missed item, the misconception it corresponds to.

**Feedback:** Seven items, fixed order, one submission per item, and the submission is final. Correct: "Correct" followed by the Why text. Incorrect: "Not quite. It is built from: <correct set>" followed by the Why text. The correct set is revealed immediately after each submission. The final score reads "n of 7 correct".

**Starting State:** All eight artifacts are shown in pipeline order with the course description first, nothing selected, and the question on screen is "What is each artifact built from?"

**Chapter Anchors:** The chapter states that the pipeline has eight artifacts: the course description and seven generated ones. It states that the course description is the seed document and that the learning graph is generated from it.
</details>

### Course Description Quality Score

The **course description quality score** is a number, from 0 to 100, that rates how completely a course description supplies the elements the generators need: a title, an audience, prerequisites, topics, and learning outcomes written at the Bloom levels. A low score points at a specific missing element. This book's course description carries a score of 100 in its frontmatter, which is why the rest of the pipeline could start from it without guesswork.

### Lesson Plan

A **lesson plan** is a structured teaching outline for one session. It lists the objectives, the activities, and the time each takes. A chapter plus its MicroSims is the raw material, and a lesson plan arranges it into an hour a group of learners can follow. The sketch below is illustrative, for a 60-minute session on this chapter.

| Minutes | Activity | Material |
|---|---|---|
| 10 | Predict command output, then compare answers | Command Output Predictor |
| 15 | Check an assistant's command in a scratch directory | The ls and head example |
| 10 | Break a link, then run a strict build | The strict build example |
| 15 | Read this book's course description and find the exclusions | Course Description table |
| 10 | Discuss: which pipeline step is hardest for a small model? | Pipeline Explorer |

## What the Benchmark Workload Produces

Everything above exists to make the benchmark workload legible, so it is time to state it. The workload is the `ibook-skills` skill chain, run by a local model on the DGX against the course description for Algebra I. This evaluation deliberately runs three of the pipeline's stages and no more.

1. **Learning graph.** The model runs the learning-graph skill on the Algebra I course description. The stage is done when the run ends on its own and leaves the graph as both a CSV file and a JSON file.
2. **Book structure.** The model runs the chapter-design skill to organize its own learning graph into chapters.
3. **Chapters generated.** The model runs the chapter-content skill once per chapter. A chapter counts as written when its placeholder is gone and it has at least 1,000 words.

The scale comes from a reference book. The published Algebra I book, made with cloud models, has 200 concepts, 13 chapters, and about 55,000 words of chapter text. A local model that finishes the three stages has therefore produced a structured data file with hundreds of connections, a chapter outline, and tens of thousands of words of Markdown.

## Why It Is a Demanding Test for a Local Model

The workload is hard in a specific way: it is not one hard task but a sequence of different ones, and a failure in any link breaks the next. Each demand below uses something this chapter introduced.

| Demand | What the model must do | Concept from this chapter |
|---|---|---|
| Structured output | Write a learning graph as CSV and JSON that agree, with no cycles and no duplicate labels | Course Description, Markdown Source Files |
| Long-form writing | Produce about 55,000 words of chapter prose that stays on topic and at the right level | Learning Outcomes, Bloom's Taxonomy |
| Command-line tool use | Run shell commands, edit files, and run scripts through an agent harness | Command Line Basics, Python Scripting Basics |
| Format precision | Follow Markdown rules such as the blank line before a list, and keep navigation entries valid | Markdown Source Files, MkDocs Navigation |
| A build that must pass | Leave a site that survives a strict build | Strict Site Build, Static Site Build |
| Many turns of focus | Stay on task across roughly 280 model turns, by this book's cost model | Generative AI Assistant Use |

A model that writes beautiful prose but breaks the JSON fails the first stage. A model that writes valid files but loses the thread after the fortieth tool call fails the third. That is why this benchmark reports per-stage results instead of one score, and why the course spends its early chapters on measuring the machine before it measures the model.

## Chapter Summary

You started from a list of skills and ended with a description of a benchmark. The skills were a way of working with a generative AI assistant, the command line, Python scripts, Git and GitHub, and Markdown. The vocabulary was the intelligent textbook, its five levels, and the MicroSims inside it. The toolchain was MkDocs Material with its navigation and its static and strict builds, and the planning documents were Bloom's Taxonomy, learning outcomes, the course description and its quality score, and the lesson plan.

!!! mascot-celebration "Groundwork Laid"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now predict what a shell command will print, read a Python script, trace a change through Git and GitHub, read an `mkdocs.yml`, and say what the benchmark produces and why it is hard for a small model. That is the whole prerequisite stack, and Chapter 2 builds the learning graph on top of it.
