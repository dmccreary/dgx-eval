# References: Designing a Fair Evaluation

1. [Design of experiments](https://en.wikipedia.org/wiki/Design_of_experiments) - Wikipedia - Covers Fisher's principles of randomization, replication, and blocking, how independent variables and controls are set, and statistical control of spurious variables. It frames this chapter's independent variable, controlled variables, and repeated runs.

2. [Scientific control](https://en.wikipedia.org/wiki/Scientific_control) - Wikipedia - Explains controlled experiments, confounding, and positive and negative controls, which check that an experiment can detect an effect and is not producing a false one. It supports this chapter's control run and its warning about uncontrolled variables.

3. [Reproducibility](https://en.wikipedia.org/wiki/Reproducibility) - Wikipedia - Distinguishes reproducibility from replicability and repeatability, covers measures of each, and describes reproducible research practices such as documenting code and using version control. It supports this chapter's point that reproducibility is a property of the record.

4. The Design of Experiments (1st Edition, 1935) - Ronald A. Fisher - Oliver and Boyd - Introduced the "lady tasting tea" experiment, eight cups in random order with a 1-in-70 chance of guessing all correctly, to show why randomization makes a comparison fair. It is the original worked example for this chapter's fair comparison.

5. Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing - Ron Kohavi, Diane Tang, and Ya Xu - Cambridge University Press - Widely praised for explaining A/B testing through its pitfalls, with Twyman's law (a surprising result is usually wrong) and the A/A test, which runs identical variants to validate the apparatus. The A/A test clarifies this chapter's control run.

6. [What is experimental design?](https://www.itl.nist.gov/div898/handbook/pri/section1/pri11.htm) - NIST/SEMATECH e-Handbook of Statistical Methods - Defines experimental design as a plan written before the experiment, and distinguishes controllable factors the experimenter varies from uncontrolled factors and the measured responses. It supports this chapter's independent, controlled, and uncontrolled variables.

7. [A statistical approach to model evaluations](https://www.anthropic.com/research/statistical-approach-to-model-evals) - Anthropic Research - Recommends treating eval scores as estimates with standard errors and confidence intervals, comparing models with paired differences, and using power analysis to choose how many questions are needed. It supports this chapter's run variance and sample size discussion.

8. [Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110) - arXiv - Liang et al. evaluate 30 language models across 42 scenarios on seven metrics, including accuracy, robustness, and efficiency, under standardized conditions, and release raw prompts and completions. It models this chapter's metric selection and fixed inputs.

9. [Improving Reproducibility in Machine Learning Research](https://jmlr.org/papers/v22/20-303.html) - Journal of Machine Learning Research - Pineau et al. report the NeurIPS 2019 reproducibility program: a code submission policy, a reproducibility challenge, and a checklist for papers. It supports this chapter's reproducible experiment, which depends on a recorded configuration and logs.

10. [Deep Reinforcement Learning that Matters](https://arxiv.org/abs/1709.06560) - arXiv - Henderson et al. show that non-determinism and variance can obscure whether a reported improvement is real, and propose significance metrics and standardized reporting. It illustrates this chapter's run variance and why one run cannot rank candidates.
