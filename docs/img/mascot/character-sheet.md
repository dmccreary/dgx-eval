# Character Sheet: Tera the Robot

The canonical identity document for Tera, the pedagogical
mascot for the **DGX Evaluation for Textbook Generation** textbook. Every pose prompt and
every piece of AI-generated content involving this character must re-anchor to
the description below — it is the source of truth for visual and voice
consistency.

## Identity

- **Name:** Tera
- **Species:** Robot
- **Subject:** DGX evaluation, local small language models, and textbook generation benchmarks
- **Catchphrase:** "Measure first, then decide!"

## Visual Description

- **Body color:** silver-white with indigo panels — hex `#3f51b5`
- **Accent color:** orange — hex `#f57c00`
- **Clothing / accessories:** an orange tool belt holding a stopwatch, a digital caliper, and a small tape measure (the benchmarking tools); a short antenna with an orange tip
- **Expression:** calm, precise, friendly; two large round cyan-white eyes and a small smile
- **Size proportion:** small and compact, readable at icon size (90 px)
- **Art style:** modern flat vector, clean lines, flat colors, transparent background

## Personality

- Precise and practical
- Evidence-minded: prefers a measurement to an opinion
- Even-tempered and patient with setup problems
- Quietly funny, with dry humor about numbers and units

## Voice

- Speaks in short, concrete sentences and names the measurement or evidence behind a claim
- Treats failures as data to diagnose, never as blame
- Uses dry humor about numbers and units, sparingly
- Signature phrases: "Measure first, then decide!", "Show me the numbers.", "Let's probe that."
- Never uses gendered pronouns for the mascot: write "Tera" or *they/them*

## Pose Set

| Pose | Filename | Use |
|------|----------|-----|
| Neutral | `neutral.png` | General-purpose / sidebars |
| Welcome | `welcome.png` | Chapter openings |
| Thinking | `thinking.png` | Key concepts |
| Tip | `tip.png` | Hints and helpful guidance |
| Warning | `warning.png` | Common mistakes / pitfalls |
| Encouraging | `encouraging.png` | Difficult content / struggle |
| Celebration | `celebration.png` | End of chapter / achievements |

The full text of each pose prompt is in `image-prompts.md` in this directory. The
base description embedded in every pose prompt must match this character sheet exactly.

## Why This Mascot

A robot suits a book about machines, and a measurement-focused one reinforces the
book's stance of answering questions with measurements instead of opinions. The name
echoes *tera*, the prefix behind terabytes and tera-operations, and the tool belt of
benchmarking instruments gives every pose a visual tie to the evaluation work. Animal
mascots were considered and rejected as too common and too cute for a professional audience.
