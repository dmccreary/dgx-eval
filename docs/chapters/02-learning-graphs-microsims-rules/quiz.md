# Quiz: Learning Graphs, MicroSims, and Content Generation Rules

Test your understanding of learning graphs, concept impact scores, and the rules for generated content with these review questions.

---

#### 1. In this book's convention, which way does a concept dependency edge point?

<div class="upper-alpha" markdown>
1. From the prerequisite to the concept that depends on it
2. From the dependent concept to its prerequisite
3. From an earlier chapter to a later chapter
4. From a taxonomy category to each concept inside it
</div>

??? question "Show Answer"
    The correct answer is **B**. A concept dependency states that one concept must be understood before another, and this book writes it as an edge from the dependent concept to its prerequisite. The edge `Percent → Decimals` reads "Percent needs Decimals". Reading an edge the other way turns every prerequisite into a follow-on topic and silently inverts the whole ordering. Dependencies are a property of the subject, so they do not point from chapter to chapter.

    **Concept Tested:** Concept Dependency

    **See:** [Concept Dependency](index.md#concept-dependency)

---

#### 2. What is a directed acyclic graph?

<div class="upper-alpha" markdown>
1. A graph in which every concept has exactly one prerequisite
2. A graph whose concepts are all connected in a single chain
3. A graph with undirected edges and at most one cycle
4. A graph whose edges have a direction and form no cycle
</div>

??? question "Show Answer"
    The correct answer is **D**. A directed acyclic graph, or DAG, has edges with a direction and contains no cycle, where a cycle is a path that follows dependencies back to its starting concept. A learning graph must be a DAG because a cycle leaves no concept that can be learned first. A DAG does not have to be a single chain, and a concept in it may have several prerequisites or share one with another concept.

    **Concept Tested:** Directed Acyclic Graph

    **See:** [Directed Acyclic Graph](index.md#directed-acyclic-graph)

---

#### 3. What serves as the checklist that generated chapter content is judged against?

<div class="upper-alpha" markdown>
1. The word count of the previous chapter in the book
2. The chapter header, whose concept table must all be taught
3. The FAQ entries that were generated for the chapter
4. The navigation sidebar entry that points to the chapter
</div>

??? question "Show Answer"
    The correct answer is **B**. Chapter content is written into the chapter's `index.md` below a fixed header that lists the title, summary, concepts, and prerequisites. A generator is given that header and asked to fill in everything below the final rule. The header doubles as the checklist: every concept in its table should be taught, so a missing concept is a defect a program can find. The FAQ is generated afterward from the chapters, so it cannot be the standard.

    **Concept Tested:** Chapter Content

    **See:** [Chapter Content](index.md#chapter-content)

---

#### 4. Who may move a MicroSim from `built` to `approved`?

<div class="upper-alpha" markdown>
1. The generator, once the site passes a strict build
2. Any agent that has read the content generation guide
3. Only a human reviewer who has tested the MicroSim
4. The site build, when the sidebar dot turns green
</div>

??? question "Show Answer"
    The correct answer is **C**. MicroSim status levels record how far a sim has progressed: `scaffold` means only a specification exists, `built` means it is implemented and awaiting review, and `approved` means it was tested and approved for learners. Only a human reviewer moves a MicroSim to `approved`; a generator may reach `built` and no further. The colored dot in the sidebar displays the status stored in the page's frontmatter. It does not set it.

    **Concept Tested:** MicroSim Status Levels

    **See:** [MicroSim Status Levels](index.md#microsim-status-levels)

---

#### 5. Why can the same learning graph be regrouped into a different number of chapters without breaking a prerequisite?

<div class="upper-alpha" markdown>
1. Each taxonomy category maps to exactly one chapter
2. The graph stores a fixed chapter number on every concept
3. It stores dependencies, not an authored chapter order
4. Orphan concepts can be moved freely between any two chapters
</div>

??? question "Show Answer"
    The correct answer is **C**. A learning graph is a DAG of concepts whose edges are dependencies. It does not store a chapter order; it stores what depends on what, and any order that respects those dependencies is valid. Chapters are a partition of the concepts in which no concept appears before its prerequisites. Taxonomy categories are a grouping for the author, not a teaching order, and this book's chapters deliberately cut across them.

    **Concept Tested:** Learning Graph

    **See:** [The Learning Graph](index.md#the-learning-graph)

---

#### 6. Why does the elaboration score normalize CIS with a logarithm instead of a straight proportion?

<div class="upper-alpha" markdown>
1. Impact scores can be negative for the graph's terminal concepts
2. A logarithm places every concept in the top tier
3. Word counts must stay under a fixed chapter limit
4. CIS is heavy-tailed, so a plain ratio crushes most scores
</div>

??? question "Show Answer"
    The correct answer is **D**. A concept's word-count target comes from its elaboration score, which divides the logarithm of its CIS plus one by the logarithm of the largest CIS plus one. The logarithm is needed because CIS is heavy-tailed: a few foundational concepts score in the thousands while 193 of the 506 concepts score 1. A straight proportion would crush the large majority to nearly zero. With the logarithm, a concept with a CIS of 36 scores about 0.46 and lands in tier B.

    **Concept Tested:** Word-Count Targets

    **See:** [Word-Count Targets](index.md#word-count-targets)

---

#### 7. Why does keeping the writing rules in a file matter for small models in particular?

<div class="upper-alpha" markdown>
1. A rule in a file can be re-read after the context fills up
2. A rule in a file is enforced automatically by the build
3. A file lets the model skip any rules that it finds irrelevant
4. A file is always shorter than the same rules written in a prompt
</div>

??? question "Show Answer"
    The correct answer is **A**. The content generation guide gathers every writing rule in one file so an agent can be told to read it first. That matters for small models because a rule that lives only in a prompt is lost when the context fills up, while a rule in a file can be re-read. The same file also makes two runs comparable, since both started from the same instructions. The build does not enforce the writing rules for the model.

    **Concept Tested:** Content Generation Guide

    **See:** [Content Generation Guide](index.md#content-generation-guide)

---

#### 8. Why does the book treat a word-count target as a guideline and not a quota?

<div class="upper-alpha" markdown>
1. The tier boundaries change from one chapter to the next
2. Short sections always score higher when they are reviewed
3. Padding to reach a number adds repetition and errors
4. A generator has no means of counting the words it wrote
</div>

??? question "Show Answer"
    The correct answer is **C**. Anti-padding rules stop a generator from reaching a word target by inflating text. A model that sees "500 words" will often manufacture 500 words by restating itself, and padded text is repetitive and sometimes wrong. A target is therefore a guideline: a dense, correct section beats a padded one that reaches the number. If a section is thin, the remedy is a worked example or more technical detail, never a restatement of earlier paragraphs.

    **Concept Tested:** Anti-Padding Rules

    **See:** [Anti-Padding Rules](index.md#anti-padding-rules)

---

#### 9. In a small graph, Q needs P, R needs P, and S needs R. Nothing depends on Q or S. What is the concept impact score of P?

<div class="upper-alpha" markdown>
1. 1
2. 2
3. 3
4. 4
</div>

??? question "Show Answer"
    The correct answer is **D**. A concept's impact score is 1 for itself plus the scores of every concept that depends on it directly. Work from the ends: Q and S have no dependents, so each scores 1. R has one dependent, S, so R scores 1 + 1 = 2. P has dependents Q and R, so P scores 1 + 1 + 2 = 4. An answer of 2 counts only the number of direct dependents, and an answer of 3 leaves out P itself.

    **Concept Tested:** Concept Impact Score

    **See:** [Concept Impact Score](index.md#concept-impact-score)

---

#### 10. In a generated learning graph, the concepts with no prerequisites are advanced terms such as "Evaluation Report", and no introductory term appears among them. What does this pattern indicate?

<div class="upper-alpha" markdown>
1. The dependency edges were written in the reversed direction
2. The graph contains a cycle among its advanced concepts
3. The advanced concepts were put in the wrong taxonomy category
4. The impact scores were normalized without a logarithm
</div>

??? question "Show Answer"
    The correct answer is **A**. A foundational concept has no prerequisites inside the graph, so learning can start there. In a correct graph these are plain, introductory terms such as Command Line Basics. If advanced terms such as "Evaluation Report" show up there instead, the edges were written backwards, which turns every prerequisite into a follow-on topic. Listing the concepts with no prerequisites is the check to run before trusting any graph. A cycle gives a different symptom: no valid teaching order exists at all.

    **Concept Tested:** Foundational Concepts

    **See:** [Foundational Concepts](index.md#foundational-concepts)
