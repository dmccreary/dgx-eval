# References: Diagnosing Failures, Reporting, and Cost per Textbook

1. [Root-cause analysis](https://en.wikipedia.org/wiki/Root-cause_analysis) - Wikipedia - Defines root-cause analysis as finding the fundamental cause of a fault, with methods such as the five whys and fault trees and the difference between causes and causal factors. It underpins this chapter's failure diagnosis from run evidence.

2. [Total cost of ownership](https://en.wikipedia.org/wiki/Total_cost_of_ownership) - Wikipedia - Explains total cost of ownership as an estimate of direct and indirect costs beyond purchase price, including hardware and staffing in IT, and its limitations. It supports this chapter's cost per textbook and the separate human review cost.

3. [Sensitivity analysis](https://en.wikipedia.org/wiki/Sensitivity_analysis) - Wikipedia - Describes how uncertainty in a model's output is divided among its inputs, including one-at-a-time variation. It applies to this chapter's whole-book time estimate, which doubles if the three stages are 5% of the book, not 10%.

4. Debugging: The 9 Indispensable Rules for Finding Even the Most Elusive Software and Hardware Problems - David J. Agans - AMACOM - Organizes troubleshooting into nine rules, including Make It Fail, Divide and Conquer, and Check the Plug. It clarifies this chapter's habit of checking whether every model failed the same way before blaming a model.

5. How to Measure Anything: Finding the Value of Intangibles in Business (3rd Edition) - Douglas W. Hubbard - Wiley - Shows how to turn an unmeasured quantity into a calibrated range, using 90% confidence intervals and the Rule of Five for small samples. It clarifies this chapter's separation of measured values from assumed ones in cost estimates.

6. [Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) - Google SRE Book - Presents a hypothesis-driven troubleshooting method: report the problem, triage, examine logs and metrics, diagnose by simplifying and bisecting, then test and treat. It matches this chapter's evidence-first reading of event streams and server logs.

7. [Tool calling](https://docs.ollama.com/capabilities/tool-calling) - Ollama Documentation - Shows how a model returns tool_calls that the client executes and answers with tool messages in a multi-turn loop. It shows the structured call that a text-emitted tool call fails to produce and a malformed one gets wrong.

8. [Context length](https://docs.ollama.com/context-length) - Ollama Documentation - Explains context length as the tokens a model can hold in memory, the VRAM-based defaults, the OLLAMA_CONTEXT_LENGTH setting, and checking allocation with ollama ps. It supports diagnosing this chapter's context overflow and task loss.

9. [Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110) - arXiv - Liang et al. evaluate 30 models across scenarios on seven metrics, including accuracy, robustness, and efficiency, and release raw prompts and completions. It models this chapter's reporting of several measurements side by side instead of one score.

10. [Prices and factors affecting prices](https://www.eia.gov/energyexplained/electricity/prices-and-factors-affecting-prices.php) - U.S. Energy Information Administration - Reports average U.S. retail electricity prices in cents per kilowatthour by sector and state, and the factors that drive them. It is a source for the electricity price used in this chapter's energy-per-textbook calculation.
