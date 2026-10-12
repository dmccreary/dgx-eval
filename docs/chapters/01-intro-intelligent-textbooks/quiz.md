# Quiz: Prerequisites and the Intelligent Textbook

Test your understanding of the working skills, the intelligent-textbook model, the MkDocs toolchain, and the course description with these review questions.

---

#### 1. Which two properties define an intelligent textbook?

<div class="upper-alpha" markdown>
1. Cloud hosting and a conversational tutor on every page
2. Explicit structure stored as data, and interactive elements
3. A searchable glossary and a strict build that passes
4. Adaptive lessons and chapters generated for each reader
</div>

??? question "Show Answer"
    The correct answer is **B**. An intelligent textbook is defined by explicit structure and interactivity. Its concepts, dependencies, and learning outcomes are stored as data that software can read and check, and it contains elements the reader operates and that report back what the reader did. A conversational tutor and per-reader lessons belong to Levels 4 and 5 of the five-level scale; they are higher levels, not the defining properties.

    **Concept Tested:** Intelligent Textbook

    **See:** [What Makes a Textbook Intelligent](index.md#what-makes-a-textbook-intelligent)

---

#### 2. What is a MicroSim?

<div class="upper-alpha" markdown>
1. A static figure that summarizes one chapter's main ideas
2. A full-chapter simulation covering several related topics
3. A build script that checks a chapter for broken links
4. A small interactive simulation that demonstrates one idea
</div>

??? question "Show Answer"
    The correct answer is **D**. A MicroSim is a small, self-contained interactive simulation, embedded in a textbook page, that demonstrates exactly one idea. The narrow scope is the point: it has one learning objective, a few controls, and a result the reader can see change, such as a slider that redraws a chart. A simulation spanning several topics breaks that rule, and a static figure gives the reader nothing to operate.

    **Concept Tested:** MicroSim

    **See:** [MicroSim](index.md#microsim)

---

#### 3. What does `mkdocs build --strict` do that an ordinary build does not?

<div class="upper-alpha" markdown>
1. It treats every warning as an error and stops the build
2. It publishes the finished site straight to GitHub Pages
3. It adds every page on disk to the navigation sidebar
4. It rewrites broken links so the build can still finish
</div>

??? question "Show Answer"
    The correct answer is **A**. A strict site build treats every warning as an error. An ordinary build prints a warning about a broken link and finishes anyway, so the defect ships as a dead link. With `--strict` the build aborts, and the defect becomes a failed build you must fix. It does not repair links or edit the navigation for you; it only refuses to finish while warnings remain.

    **Concept Tested:** Strict Site Build

    **See:** [Strict Site Build](index.md#strict-site-build)

---

#### 4. What is true of a Python script that uses only the standard library?

<div class="upper-alpha" markdown>
1. It must be compiled to a binary before the interpreter can run it
2. It runs on any machine with Python, with nothing installed
3. It can run only on the aarch64 processor architecture
4. It needs a conda environment to locate its modules
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard library is the set of modules that ship with Python itself, such as `platform`, `os`, and `json`. A script that imports only those modules needs no extra packages, so it runs on any machine that has Python. That portability is why the chapter's short machine report works unchanged on different systems. The interpreter runs a script from top to bottom; there is no separate compile step to perform first.

    **Concept Tested:** Python Scripting Basics

    **See:** [Python Scripting Basics](index.md#python-scripting-basics)

---

#### 5. Why does the typical failure of a generative AI assistant call for a habit of verification?

<div class="upper-alpha" markdown>
1. The answer is plausible and fluent but slightly wrong
2. The answer is usually nonsense that will not run at all
3. The assistant refuses requests that lack enough context
4. The assistant returns a different command on every request
</div>

??? question "Show Answer"
    The correct answer is **A**. The typical failure is not nonsense. It is an answer that is plausible, fluent, and slightly wrong, which makes it easy to accept without checking. The chapter's example command for listing the five largest files is a good answer, yet it would still list a large subdirectory among the files. Obvious nonsense is easy to catch; a nearly right answer is the dangerous one, so you run it on a scratch copy where you know the right result.

    **Concept Tested:** Generative AI Assistant Use

    **See:** [Generative AI Assistant Use](index.md#generative-ai-assistant-use)

---

#### 6. Why does an explicit "Topics not covered" section matter in a course description?

<div class="upper-alpha" markdown>
1. It raises the quality score above its 100-point maximum value
2. It lists the prerequisites the generators may assume
3. It sets the boundary that stops a model inventing content
4. It tells the generators which reading level and tone to write at
</div>

??? question "Show Answer"
    The correct answer is **C**. The course description is the seed document, and every later artifact inherits its scope from it. A model asked to write about a DGX will happily write about training and fine-tuning unless the description rules those topics out, so an exclusion costs one line and prevents a chapter nobody wanted. Prerequisites and reading level are set by other sections: the prerequisites list and the target audience.

    **Concept Tested:** Course Description

    **See:** [Course Description](index.md#course-description)

---

#### 7. Why can "Describe how Tailscale builds an encrypted mesh" be tested when "Understand Tailscale" cannot?

<div class="upper-alpha" markdown>
1. The verb names an action that an observer can check
2. The longer wording covers more of the course content
3. The first objective sits at a higher Bloom level
4. The second objective lacks a clearly named learning outcome
</div>

??? question "Show Answer"
    The correct answer is **A**. Bloom's Taxonomy classifies objectives by the kind of thinking they require, and each level has characteristic verbs. The verb tells you what the learner must do to show the objective was met. "Understand" gives no action to observe, while "describe" produces a description you can read and judge. The gain comes from observability, not from the length of the statement or from moving to a higher level of the taxonomy.

    **Concept Tested:** Bloom's Taxonomy

    **See:** [Bloom's Taxonomy](index.md#blooms-taxonomy)

---

#### 8. Why is plain text a useful property of a Markdown source file in this workflow?

<div class="upper-alpha" markdown>
1. It lets a browser display the file directly without any build step
2. It keeps a chapter's metadata hidden from the site's build tool
3. It prevents formatting mistakes such as a collapsed list
4. It lets Git diff it, a model write it, and a tool build it
</div>

??? question "Show Answer"
    The correct answer is **D**. Markdown marks structure with a few punctuation conventions in an ordinary text file. Because the file is plain text, Git can diff it, a model can generate it, and a build tool can turn it into a web page. That combination is what lets a model write a textbook and a program check it. Plain text does not prevent mistakes: a list with no blank line before it still collapses into one paragraph.

    **Concept Tested:** Markdown Source Files

    **See:** [Markdown Source Files](index.md#markdown-source-files)

---

#### 9. You type `cd docs` and the shell prints nothing. Which command confirms where you are now?

<div class="upper-alpha" markdown>
1. `cat docs`, which prints the folder's contents as text
2. `pwd`, which prints the working directory's absolute path
3. `grep -n docs`, which prints the matching folder name
4. `cd docs` again, which prints the new path on the second attempt
</div>

??? question "Show Answer"
    The correct answer is **B**. Silence from a shell command usually means success, and `cd` prints nothing when it works. The only evidence is the state that later commands see. `pwd` prints the absolute path of the working directory, so it shows directly that you are now inside `docs`; a different listing from `ls` would show it as well. `cat` prints the contents of a file, not a folder, and `grep` searches a file for a pattern.

    **Concept Tested:** Command Line Basics

    **See:** [Command Line Basics](index.md#command-line-basics)

---

#### 10. A new chapter file exists under `docs` and the site builds, yet no reader can find the page in the sidebar. What is the most likely cause?

<div class="upper-alpha" markdown>
1. The file's frontmatter block has no `title` entry
2. The iframe `src` in the page uses a wrong relative path
3. The page was never listed in `nav:` in `mkdocs.yml`
4. The site was built on a machine without GitHub Pages
</div>

??? question "Show Answer"
    The correct answer is **C**. MkDocs navigation is the sidebar tree defined by the `nav:` block in `mkdocs.yml`. A page that exists on disk but is missing from `nav:` is still built, yet no reader can reach it from the sidebar. Adding a page is therefore two steps: create the file, then list it. A wrong iframe path causes a different symptom, a blank box inside a page that readers can already open.

    **Concept Tested:** MkDocs Navigation

    **See:** [MkDocs Navigation](index.md#mkdocs-navigation)
