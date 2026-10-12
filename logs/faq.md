# FAQ Generator Session Log

**Skill:** faq-generator, version 1.0
**Date:** 2026-10-11
**Execution Mode:** One authoring session, plus four read-only fact-check agents run in parallel at the end

## Timing and Tokens

Not measured. The session did not record start and end times or a token total.

## Results

- Questions: 139, in six categories (skill range: 70 to 110, see Decisions)
- Answers: 100 to 300 words each, average 217, longest 295
- Every answer links to at least one chapter page, 0 anchor links, 0 broken links
- Concept coverage: 381 of 506 concepts (75.3%), and every concept with a Concept Impact Score of 5 or more is covered
- Answers with an example: 59 of 139 (42%), by an objective rule: a code block, an explicit example marker, or a table of concrete numbers
- Bloom's levels: Remember 16%, Understand 30%, Apply 30%, Analyze 17%, Evaluate 6%, Create 1%, total deviation from the weighted target 11 points
- Mechanical quality score: 90/100 (coverage 25, Bloom's 20, answer quality 25, organization 20)
- Average Flesch-Kincaid grade of the prose: 7.4
- `mkdocs build --strict`: passes, built to a scratch directory so the author's `site/` was not touched
- Rendered HTML checked for the failures a strict build misses: no stray math from dollar amounts, no collapsed lists, placeholders such as `<dgx-host>` preserved

| Category | Questions | Skill range |
|---|---:|---|
| Getting Started | 12 | 10 to 15 |
| Core Concepts | 44 | 20 to 30 |
| Technical Detail | 30 | 15 to 25 |
| Common Challenges | 21 | 10 to 15 |
| Best Practice | 25 | 10 to 15 |
| Advanced Topics | 7 | 5 to 10 |

## Decisions

- **No glossary at the start, one by the end.** `docs/glossary.md` did not exist when the session began, and the quiz run had gone ahead without one, so generation went ahead without asking. Another session finished a 506-term glossary while this one ran. Thirty-six key terms were then compared with its definitions. The one real difference was Quality-Adjusted Cost, which the glossary defines to include review labor and Chapter 22 defines as cost per usable chapter with review as a separate line. The FAQ answer states both. The reading-guide answer now links the glossary. The glossary was not used to write term-comparison questions.
- **More questions than the skill's ranges.** The ranges assume a book of roughly 200 concepts, and the skill's own example has 87 questions for 198. This book has 506 concepts and 23 chapters, so 139 is 0.27 questions per concept, lower than the example's 0.44. Six overlapping entries were cut and their key facts folded into neighbors. Core Concepts (44) and Best Practice (25) remain the furthest above range.
- **Fact-check fixes were applied by editing the answers, not by changing any chapter.** Where the chapters disagree with each other, the FAQ takes the wording that holds under both and the disagreement is listed below for the Primary Author.
- **No mascot admonitions.** The quiz run made the same choice. The FAQ is a lookup page and the placement rules say a mascot must never be decorative.
- **Links go to chapter index pages, never to a heading.** The book's quizzes link to headings with anchors, and the skill forbids that in the FAQ.
- **Concept tags are checked, not trusted.** The first draft tagged 5 to 9 concepts per answer by hand, and 276 of those tags named a concept the final answers do not discuss. They were dropped, and 221 concepts that an answer names verbatim or defines in bold were added. A concept counts only when its name appears in the answer, or it is defined in bold there. Where an answer discussed a concept under a paraphrase, the answer was edited to use the book's term, which also keeps the FAQ consistent with the glossary.
- **Model results are described as a first-round snapshot.** Answers that cite what a model did point to the Evaluation Status page, which carries a "last updated" line, because those figures will go out of date.
- **Quality and Bloom's scores are mechanical.** They count structure. They do not show that an answer is correct, which is what the accuracy review below is for.
- **Device details.** Every example uses a placeholder or a documentation address range. A scan of the answers found no address, hostname, tailnet name, account name, key, token, serial number, or personal name. The only URLs are the loopback endpoint the book itself documents.

## Accuracy Review

- **Mechanical.** Every number in every answer was checked as a whole number against the chapters, appendices, and course description. All were found. The only misses were fragments of documentation-range addresses.
- **Independent.** Four read-only agents each checked a share of the answers (49, 33, 24, and 33, so all 139) against the book's chapters, appendices, and course description, without being given my conclusions. 120 answers had no finding. The other 19 had a finding or a note, and 17 answers were revised:
  - **Wrong or unsupported, fixed:** a probability sum that should have been 0.08, sampling parameters called a Chapter 19 controlled variable, "most models are not open-source" with no basis in the book, "malformed tool call" defined as invalid JSON, a score of 7.1 attributed to one sentence instead of the two-sentence passage, quality-adjusted cost said to feed the service price, a "most to least common" ranking of causes the book does not rank, a ping step assigned to key expiry, and a stale "had not been retested" for a model that was retested afterward.
  - **Advice that was mine and not the book's, removed or labeled:** a preference for text listings over screenshots, a phone-call suggestion for comparing a host key fingerprint, an emphasis ranking among the five host-hygiene habits, and the `Exec format error` and `file` check, which are standard Linux practice and are now labeled as such.
  - **Reworded because the book disagrees with itself:** the Level 2 sentence, the "first hands-on chapter" sentence, and the single-DGX-unit sentence (see below).
  - The revised answers were not sent back to the agents. Each fix was made against the source quote the agent supplied, and the mechanical checks were re-run on the final files.

## Source Text Issues Noticed During Generation

These are in the book's chapters, not in the FAQ. None was changed. Where the FAQ touches one, it follows the chapter's table or measured data.

- **Course Description overview vs Chapters 1 and 21.** The overview describes the benchmark workload as turning a course description into a learning graph, chapters, MicroSims, a glossary, an FAQ, and quizzes. Chapters 1, 17, and 21 say the benchmark runs three of the ten skills and leaves out MicroSims, the glossary, the FAQ, and the quizzes. The FAQ follows the chapters.
- **Chapter 14, Chapter Summary.** "Two models wrote their tool calls as text and did no work at all" overstates the body. `devstral-small-2:24b` did no work in either harness test, and `gpt-oss:120b` printed a tool call as text in one run and still finished a graph.
- **Chapter 20, Automated Quality Score.** "This evaluation has not defined one" is stale now that the Chapter Quality Score appendix exists.
- **Chapter 22, Quality-Adjusted Cost.** The prose says "10 of 14 chapters" and "6 of 10 chapters" while the table beside it uses a 13-chapter book.
- **Chapter 14, first-round table.** `mistral-medium-3.5:128b` is listed as "Not run", while the text and Chapter 3 say it loaded and ran at 3 tokens per second with no usable context. The Evaluation Status page says it was not run.
- **About page.** The Audience section is still the template stub, so the Getting Started answers draw on the Course Description instead.
- **Chapter 12 and the Design Choices appendix** say the fastest model "had not been retested". Chapters 14, 19, and 20 and the Model Candidates appendix say it was retested afterward and passed the short skill test. The FAQ follows the later account and says the order was the mistake.
- **Chapter 19's controlled-variables table** says "One DGX unit for all ten candidates". The Testing Architecture appendix has each unit run its own models independently, and the appendix puts `gemma4:26b` on unit B while that model's results page says unit A. The FAQ says "DGX units of one configuration".
- **Chapter 1, Level 2 books.** It says the books the benchmark generates are Level 2 books with quizzes and a glossary, and in the same chapter says the benchmark excludes MicroSims, the glossary, the FAQ, and the quizzes. The FAQ attributes the Level 2 description to the full skill chain.
- **Chapters 6 and 8 vs Chapter 9.** Chapter 6's closing says Chapter 7 starts the hands-on work, and Chapter 9 says it is the first hands-on chapter. The FAQ describes Chapters 7 and 8 as preparing the connection and tools, and Chapter 9 as the start of the step-by-step setup.
- **Chapter 12, largest download.** It calls the 81 GB `qwen3.5:122b` the largest download, while the Model Candidates appendix lists a model with 75 GB and 96 GB downloads. The FAQ says "a very large download".

## Files Created

- `docs/faq.md`
- `docs/learning-graph/faq-chatbot-training.json`
- `docs/learning-graph/faq-quality-report.md`
- `docs/learning-graph/faq-coverage-gaps.md`
- `logs/faq.md`

## Files Updated

- `mkdocs.yml`: added `FAQ: faq.md` beside Glossary, and `FAQ Quality Report` and `FAQ Coverage Gaps` under Learning Graph. Another session had edited the same file for the glossary during the run, so only these three lines were added.

## Not Done

- **The authoring script is not in the repository.** The 139 answers were written as source blocks and turned into the four output files, the reports, and the checks by a throwaway script kept outside the repo. AGENTS.md puts code for the evaluation under `src/`, and this is book-authoring tooling, so it was left out rather than guessed at. To regenerate, edit `docs/faq.md` and rebuild the JSON from it.
- **125 low-priority concepts are not covered.** They are leaf-level detail, listed in the coverage gaps report.
- **Nothing was committed or deployed.**
