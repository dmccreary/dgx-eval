# Quiz Generator Session Log

**Skill Version:** 0.5
**Date:** 2026-10-11
**Execution Mode:** Serial (1 agent)

## Timing

| Metric | Value |
|--------|-------|
| Start Time | 2026-10-11 19:06:45 |
| End Time | 2026-10-11 19:47:03 |
| Elapsed Time | 40 minutes 18 seconds |
| Serial agent run time | 32 minutes 51 seconds |

## Token Usage

| Phase | Tokens |
|-------|--------|
| Serial agent (all 23 chapters, 83 tool calls) | 598,957 (reported by the harness) |
| Setup, validation, aggregation, and nav update | not measured |

The agent's total is about twice the skill's estimate for a book this size. It
includes a second pass over the option lines: after the first pass the correct
option was the single longest option in 130 of 230 questions, and the agent
reworded 133 option lines to bring that down to 43.

## Results

- Total chapters: 23
- Total questions: 230 (10 per chapter)
- Quality score: 91/100 (mechanical; see the report for the rubric)
- All quizzes written successfully: Yes
- Validator: 0 errors and 0 warnings in all 23 files
- `mkdocs build --strict`: passed before and after the change
- `See:` links: all 230 resolve to a heading id in the built chapter page
- Answer keys: A 58, B 57, C 57, D 58, drawn at random before the questions were written
- Bloom's levels: Remember 57, Understand 67, Apply 60, Analyze 39, Evaluate 5, Create 2
- Concept coverage: 230 of 506 concepts (45%), below the skill's 75% target
- Manual check after generation: 48 questions read against the chapter text
  (all of chapters 11, 14, 22, and 23; the numeric questions in 6, 15, and 21).
  No wrong answer found. The other 182 questions were not read a second time.

## Decisions

- No glossary exists yet. Generation went ahead without one; questions take
  their definitions from the chapter text.
- No mascot admonitions in quiz files.
- Chapter types: 1-3 introductory, 4-18 intermediate, 19-23 advanced.
- Per-chapter metadata JSON files (optional in the skill) were not generated.
  The quiz bank carries the same fields.
- Chapter 7, question 8 quotes the chapter's own SSH port-forward example,
  which contains the inference server's published default port. It is the only
  port number in the quizzes.

## Chapter Text Issues Noticed During Generation

These were found while reading the chapters. None was changed, and no question
depends on them.

- **Chapter 14, Chapter Summary:** "ten candidates from six of them" does not
  match the body, where the six families account for nine candidates and the
  tenth is described as not belonging to its publisher's named family.
- **Chapter 14, Chapter Summary:** "two models wrote their tool calls as text
  and did no work at all" overstates the body. One of the two finished its
  learning graph.
- **Chapter 20, Automated Quality Score:** "This evaluation has not defined
  one" looks stale now that the Chapter Quality Score appendix exists.
- **Chapter 20, Dependency Cycle Check:** "Whatever is left sits on a cycle" is
  imprecise. Concepts that only depend on a cycle are also left.
- **Chapter 22, Quality-Adjusted Cost:** the prose says "10 of 14 chapters" and
  "6 of 10 chapters"; the table beside it uses a 13-chapter book.
- **Chapters 21 and 22:** one says the dependency check stopped "three of one
  model's runs"; the other says a model ended early "in four of its ten chapter
  runs". These may describe different models. The text does not say.
- **Chapter 1, Command Output Predictor specification:** it relies on `..`
  naming the parent folder, which the Command Line Basics prose does not define.

## Files Created

- `docs/chapters/*/quiz.md` (23 files)
- `docs/learning-graph/quiz-generation-report.md`
- `docs/learning-graph/quiz-bank.json`
- `logs/quiz-generator-2026-10-11.md`

## Files Updated

- `mkdocs.yml`: each chapter entry now nests `Content:` and `Quiz:`, and
  `Quiz Generation Report` is listed under Learning Graph.
