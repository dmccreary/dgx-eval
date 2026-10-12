# References: Local SLMs Versus Cloud LLM Services

1. [Cloud computing](https://en.wikipedia.org/wiki/Cloud_computing) - Wikipedia - Covers cloud computing's characteristics, service and deployment models, value proposition, and challenges and limitations. Places a cloud LLM service among the service models and frames the trade-offs this chapter weighs against local deployment.

2. [Vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in) - Wikipedia - Explains how switching costs trap customers in one provider's technology, with types of lock-in and examples that include cloud computing. Frames this chapter's concern that prompts and tooling become tuned to a single provider.

3. [Data sovereignty](https://en.wikipedia.org/wiki/Data_sovereignty) - Wikipedia - Describes the principle that data falls under the laws of the jurisdiction where it is stored, including national measures and extraterritorial data access laws. Underpins the argument that local deployment lets you know the jurisdiction.

4. Privacy in Context: Technology, Policy, and the Integrity of Social Life - Helen Nissenbaum - Stanford University Press - Introduces contextual integrity, which judges a privacy violation by whether information flows match the norms of the context where it was shared, not by a public-private split. It offers a sharper test for which prompts may leave your machine.

5. Information Rules: A Strategic Guide to the Network Economy - Carl Shapiro and Hal R. Varian - Harvard Business School Press - Devotes separate chapters to recognizing and managing lock-in, classifying the sources of switching costs and how to weigh them. It gives vocabulary for judging how costly leaving a cloud provider would be.

6. [The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final) - NIST - Mell and Grance define cloud computing by five essential characteristics, three service models (SaaS, PaaS, IaaS), and four deployment models. Supplies standard terms for what a cloud LLM service is and who operates what.

7. [Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations) - Anthropic Documentation - Defines the model lifecycle states active, legacy, deprecated, and retired, and lists retirement dates, replacements, and the minimum notice given. A concrete case of this chapter's model deprecation risk and the case for version pinning.

8. [Rate limits](https://developers.openai.com/api/docs/guides/rate-limits) - OpenAI API Documentation - Explains limits in requests and tokens per minute, usage tiers, 429 errors, and retrying with exponential backoff and jitter. Shows how a long generation job can be throttled however much you are willing to pay.

9. [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic - Distinguishes workflows from agents and describes patterns such as prompt chaining, routing, and orchestrator-workers. Clarifies what an agentic framework adds around a model, which this chapter weighs when comparing providers.

10. [Ollama FAQ](https://docs.ollama.com/faq) - Ollama Documentation - Covers data privacy, network exposure, model storage, and context size for a local server, and states that Ollama does not see your prompts or data on local runs. Evidence for this chapter's privacy and operational burden points.
