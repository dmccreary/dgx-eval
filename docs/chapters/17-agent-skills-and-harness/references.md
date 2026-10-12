# References: Agent Skills and Connecting a Harness to a Local Model

1. [YAML](https://en.wikipedia.org/wiki/YAML) - Wikipedia - Covers the YAML data format, its indentation-based syntax, features, and comparison with JSON and TOML. It explains the syntax of the metadata block that opens every SKILL.md file and carries a skill's name and description.

2. [Environment variable](https://en.wikipedia.org/wiki/Environment_variable) - Wikipedia - Explains named values that a running program reads for configuration, how child processes inherit them, and how Unix shells assign and export them. It is the mechanism this chapter uses to point Claude Code at a local endpoint.

3. [Smoke testing (software)](https://en.wikipedia.org/wiki/Smoke_testing_(software)) - Wikipedia - Defines smoke tests as quick, preliminary checks of a system's most important functions that decide whether a build merits deeper testing, and gives the term's etymology. It matches this chapter's three-minute analyzer run before any long skill.

4. The Pragmatic Programmer: Your Journey to Mastery (20th Anniversary Edition) - David Thomas and Andrew Hunt - Addison-Wesley Professional - Popularized the "tracer bullets" metaphor: a thin, working end-to-end slice built first so feedback arrives early. That idea clarifies why this chapter runs a three-minute skill through the whole chain before committing to a long one.

5. The Checklist Manifesto: How to Get Things Right - Atul Gawande - Metropolitan Books - Argues that short written checklists make expert work reliable, using the WHO surgical safety checklist and its pause points, and separates read-do lists from do-confirm lists. A skill is a read-do checklist for a model.

6. [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) - Claude Platform Documentation - Defines a skill as a directory with a SKILL.md file and YAML frontmatter, and explains progressive loading: metadata at startup, instructions when triggered, resources as needed. It is the reference for this chapter's skill loading and installation.

7. [Agent Skills Specification](https://agentskills.io/specification) - agentskills.io - Specifies the SKILL.md frontmatter fields (name, description, license, compatibility, metadata), the optional scripts, references, and assets folders, and the recommended progressive-disclosure limits. It is the open format behind this chapter's SKILL.md header and folder layout.

8. [Anthropic compatibility](https://docs.ollama.com/api/anthropic-compatibility) - Ollama Documentation - Explains how Ollama serves a subset of the Anthropic Messages API: set ANTHROPIC_BASE_URL to the local server, use any placeholder key, and get streaming and tool calling. It is the endpoint side of this chapter's configuration.

9. [CLI reference](https://code.claude.com/docs/en/cli-reference) - Claude Code Documentation - Lists command-line flags, including -p for non-interactive runs, --output-format stream-json, --max-turns, --model, and --dangerously-skip-permissions. It documents the headless flags in this chapter's run command and what each one does.

10. [AGENTS.md](https://agents.md/) - AGENTS.md Project - Describes AGENTS.md, a plain Markdown file of project instructions for coding agents, with example sections for setup, code style, and testing, and a list of agents that read it. It is the cross-harness instruction file this chapter describes.
