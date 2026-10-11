# AI Agent Instructions — DGX Evaluation for Textbook Generation

Welcome, Agent. You have been asked to generate, edit, or validate content for
the **DGX Evaluation for Textbook Generation** intelligent textbook.

This file is the entry point for *every* coding agent working in this repo.
`CLAUDE.md` contains only `@AGENTS.md`, so Claude Code, Codex, Cursor, and any
other agent that looks for `AGENTS.md` all read the same instructions. Keep the
rules here — never fork them into `CLAUDE.md`.

These rules ride **on top of** the author's global agent rules
(`~/.claude/CLAUDE.md` for Claude Code). Where the two disagree, the global
rules win.

## Read this before generating content

Before you write or edit any student-facing markdown — chapters, quizzes, FAQ
entries, glossary prose, lesson plans — you **MUST** read and follow:

```
CONTENT-GENERATION-GUIDE.md
```

It defines the concept-depth and word-count targets, the anti-padding and
writing-style rules, the MicroSim expectations, and the Markdown formatting
rules for this book. Content that ignores it produces broken layouts and an
inconsistent student experience.

## Security: never expose the device under test

This repository and its published site are **public**. The DGX being evaluated
is a real machine reached over a private Tailscale network. Nothing in this
repo may make that machine easier to find, reach, or log in to. This rule
outranks realism and completeness: a sanitized example that looks less
authentic is always the right trade.

Never commit or publish:

- **IP addresses** of the DGX, the tailnet, or the author's network, including
  Tailscale `100.x.y.z` addresses and IPv6 addresses
- **Hostnames**, MagicDNS names, and the tailnet name
- **Logins and passwords**: usernames, passwords, and passphrases
- **Keys and tokens**: SSH keys, Tailscale auth keys, API tokens, and model-hub
  access tokens
- **Log files** and unedited command output captured from the device
- **Hardware identifiers**: serial numbers, GPU UUIDs, and MAC addresses
- **Access configuration** of the real device: its Tailscale ACL policy, open
  ports, and firewall rules

How to apply this:

- Use placeholders in every example: `<dgx-host>`, `<user>`,
  `<tailnet-name>.ts.net`, and `100.x.y.z`. If an example needs a
  concrete-looking IP address, use a documentation range such as
  `192.0.2.0/24`.
- Sanitize sample output by hand before it goes into a chapter. This includes
  probe reports, `nvidia-smi` output, `tailscale status` output, and
  screenshots of terminals or admin consoles.
- Keep raw logs out of the repo. `*.log` is gitignored. Quote only the
  sanitized lines a chapter needs.
- Before any commit or publish, scan the diff for IP addresses, hostnames,
  usernames, and tokens.
- If sensitive data has already been committed, stop and tell the author.
  Deleting it in a later commit does not remove it from git history or from
  the deployed site.

## Project facts

| | |
|---|---|
| Book title | DGX Evaluation for Textbook Generation |
| Published site | https://dmccreary.github.io/dgx-eval/ |
| Repository | https://github.com/dmccreary/dgx-eval |
| Site generator | MkDocs Material |

Where things live:

```
mkdocs.yml                  site config and nav (the single source of nav truth)
CONTENT-GENERATION-GUIDE.md content rules — read before generating
plugins/social_override.py  og:/twitter: meta-tag hook
docs/chapters/              chapter content, one directory per chapter
docs/learning-graph/        concept list, taxonomy, dependency graph, metrics
docs/sims/                  MicroSims, one directory per sim
docs/models/                generated: what each model produced, one directory per
                            model. Rebuilt by src/reporting/publish_results.py;
                            never edit it by hand
docs/css/extra.css          custom CSS (status indicators, iframe styles)
docs/img/                   cover image, license badge, mascot poses
src/                        test and benchmark code — see src/README.md
benchmark/                  fixed benchmark input: workspace template and prompts
```

All Python and shell code for the evaluation goes in `src/`, in the folder
that matches its job, and `src/README.md` is updated in the same change. Do
not create a `scripts/` directory or leave code in a scratch location.

## Build and serve rules

- **Never start or kill `mkdocs serve`.** The author runs it in their own
  terminal so they can watch the console for rebuild errors. Starting a second
  server silently binds a different port and produces confusing results.
- To check your work, use `mkdocs build --strict`. Strict mode turns broken
  nav links and missing files into errors instead of warnings.
- Every new page must be added to the `nav:` block in `mkdocs.yml`. A page that
  exists on disk but not in `nav:` is invisible to readers and trips
  `--strict`.
- **Never add `navigation.tabs`** (or `navigation.tabs.sticky`) to
  `mkdocs.yml`. This book uses side navigation optimized for wide landscape
  screens; top tabs waste vertical space. If you find that line, remove it and
  tell the author.

## MicroSim rules

MicroSims are the interactive core of an intelligent textbook. If a concept is
complex, it needs a MicroSim — do not settle for a wall of text.

- Each MicroSim lives in its own directory under `docs/sims/<sim-id>/` with a
  kebab-case id, a `main.html` that can be embedded via `iframe`, and an
  `index.md` lesson page.
- The published lesson URL is
  `https://dmccreary.github.io/dgx-eval/sims/<sim-id>/`. Always
  include the repo name in the path when you reference a sim.
- Every `docs/sims/<sim-id>/index.md` needs a `status:` value in its
  frontmatter, which paints a colored dot in the left nav:

  | Status | Color | Meaning |
  |---|---|---|
  | `scaffold` | red | Spec exists; no implementation yet. |
  | `built` | orange | Implemented; awaiting author review. |
  | `approved` | green | Author tested it and approved it for learners. |

  New sims are born `scaffold`. Bump to `built` when you write a real
  implementation. **Never auto-advance a sim to `approved`** — only the human
  author does that, after exercising the controls.

### p5.js specifics

- Call `updateCanvasSize()` as the **first** statement in `setup()` so the
  sketch picks up the container width before the canvas is created.
- Parent the canvas with `canvas.parent(document.querySelector('main'));`.
  The deployed HTML uses the p5.js-editor-standard bare `<main></main>` so
  teachers can paste the JavaScript straight into the p5.js editor. **Never add
  `id="main"`** to the `<main>` tag.
- Use p5.js **built-in** controls — `createButton`, `createSlider`,
  `createCheckbox`, `createSelect`, `createInput`. Never hand-draw a control.
- Create all controls in `setup()` *before* calling any function that positions
  them; positioning an undefined control throws and leaves a blank canvas.

## Quality assurance

Do not assume your first draft is correctly formatted. After generating a
chapter or a sim, verify it rather than declaring success:

1. Run `mkdocs build --strict` and confirm it exits clean.
2. Check that every file you created is reachable from `nav:`.
3. Run any validation scripts the book provides under `src/`.
4. Report honestly. If a check fails or you skipped a step, say so plainly.

## Content pipeline

This book is built by the intelligent-textbook skill chain, roughly in order:

```
course-description-analyzer   validate docs/course-description.md
learning-graph-generator      enumerate concepts + dependency DAG
book-chapter-generator        design the chapter structure
chapter-content-generator     write the chapters
microsim-generator            build the interactive sims
glossary-generator            ISO 11179 glossary
faq-generator                 FAQ
quiz-generator                per-chapter quizzes
reference-generator           per-chapter references
book-installer                site features (mascot, graph viewer, analytics)
```

`docs/course-description.md` is the seed for everything downstream. If it is
still the scaffold template, fill it in before running the generators.
