# References: Scoring, Bias, and Structural Checks

1. [Rubric (academic)](https://en.wikipedia.org/wiki/Rubric_(academic)) - Wikipedia - Defines a scoring rubric and distinguishes holistic, analytic, and developmental types, with steps for building one. It supports this chapter's rubric dimensions, scale, and level descriptions that make two reviewers' scores comparable.

2. [Flesch–Kincaid readability tests](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests) - Wikipedia - Gives the Flesch Reading-Ease score and grade-level formulas built from words per sentence and syllables per word, and their limitations. It grounds this chapter's reading level measure as a cheap flag for form, not a verdict on quality.

3. [Blinded experiment](https://en.wikipedia.org/wiki/Blinded_experiment) - Wikipedia - Explains single and double blinding, the sources of bias they control, and unblinding. It supports this chapter's blind human review, where reviewers score output without knowing the producing model and with the order randomized.

4. Introduction to Rubrics (2nd Edition) - Dannelle D. Stevens and Antonia J. Levi - Stylus Publishing - Presents a rubric as a four-part grid of task description, scale, dimensions, and descriptions of the dimensions, with worked examples. This structure clarifies how this chapter's rubric defines each dimension and level.

5. Noise: A Flaw in Human Judgment - Daniel Kahneman, Olivier Sibony, and Cass R. Sunstein - Little, Brown Spark - Separates judgment error into bias, a systematic offset, and noise, scatter, using shots at a target, and proposes decision hygiene such as structured processes and aggregated judgments. It frames this chapter's point that bias does not average out.

6. [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) - arXiv - Zheng et al. examine using strong language models to score other models' answers and measure position, verbosity, and self-enhancement biases against human preferences. It is a widely cited reference for this chapter's LLM-as-judge weaknesses and mitigations.

7. [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076) - arXiv - Panickssery, Bowman, and Feng show that language models can recognize their own outputs and rate them higher, a bias called self-preference. It supports this chapter's advice to use a judge from a different model family.

8. [graphlib: Functionality to operate with graph-like structures](https://docs.python.org/3/library/graphlib.html) - Python Documentation - Documents TopologicalSorter, which orders nodes by their dependencies and raises CycleError, reporting the cycle, when no valid order exists. It is a ready-made form of this chapter's dependency cycle check for learning graphs.

9. [Creating and Using Rubrics](https://www.cmu.edu/teaching/assessment/assesslearning/rubrics.html) - Carnegie Mellon University Eberly Center - Explains rubric components (criteria, descriptors, and performance levels), their benefits for consistent grading across reviewers, and sample rubrics for papers, projects, and presentations. It shows how this chapter's writing quality and faithfulness dimensions can be written down.

10. [Model Cards for Model Reporting](https://arxiv.org/abs/1810.03993) - arXiv - Mitchell et al. propose short documents that accompany a model and state its intended use, evaluation procedure, and performance limits. It is a template for this chapter's limitations statement and honest reporting of provisional results.
