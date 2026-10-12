# References: The Agent Loop, Tools, and Context

1. [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Defines an agent as an entity that perceives its environment through sensors and acts on it through actuators, and classifies agents from simple reflex to learning. It supplies the general vocabulary behind this chapter's agent loop.

2. [Large language model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Surveys how language models are built, run, and extended, including the context window, prompt engineering, tool use, and agency. It supplies the background on the model that this chapter's harness wraps and calls repeatedly.

3. [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - Wikipedia - States that each module should access only the information and resources necessary for its legitimate purpose, and covers implementation. It underlies this chapter's permission model, which allows, forbids, or requires approval for each tool call.

4. Artificial Intelligence: A Modern Approach (4th Edition) - Stuart Russell and Peter Norvig - Pearson - Frames all of AI around the rational agent and describes each agent by its PEAS task environment (performance measure, environment, actuators, sensors) and its agent program. That framing underlies this chapter's loop of percept, decision, and action.

5. Reinforcement Learning: An Introduction (2nd Edition) - Richard S. Sutton and Andrew G. Barto - MIT Press - Presents the agent-environment interface as a loop diagram in which the agent chooses an action and the environment returns a reward and next state at each step. It is the standard picture behind this chapter's turn-by-turn loop.

6. [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) - Claude Code Documentation - Explains the agentic loop of gathering context, taking action, and verifying results, the built-in tool categories, context-window compaction, and subagents. It is a concrete harness that this chapter's abstract loop, tools, and context management can be mapped onto.

7. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic Engineering - Distinguishes workflows from agents and describes patterns such as prompt chaining, routing, orchestrator-workers, and evaluator-optimizer, with advice on tool design and stopping conditions. It supports this chapter's orchestrator and role-separation material.

8. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) - Anthropic Engineering - Treats context as a finite resource, explains context rot, and describes compaction, structured note-taking, and sub-agent architectures for long tasks. It supports this chapter's account of context management, compaction, and why subagents return summaries.

9. [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) - Claude Platform Documentation - Shows how a tool is defined with a name, description, and input schema, how the model returns a structured tool_use request, and how the application returns a tool_result. It is the formal version of this chapter's tool definition.

10. [Configure permissions](https://code.claude.com/docs/en/permissions) - Claude Code Documentation - Describes the tiered permission system, with deny, ask, and allow rules evaluated in that order, permission modes, tool-specific rules, and how permissions interact with sandboxing. It shows this chapter's permission model written as real harness settings.
