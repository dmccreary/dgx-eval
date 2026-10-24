# SLM Textbook-Generation Paper — Status Report

Version 0.01, 2026-10-12.

## Completed

- Complete first draft of all ten sections, abstract, and acknowledgments
- 32 pages, 6 figures, 17 tables, 1 algorithm, 45 references
- Compiles clean with Tectonic: no undefined references, no overfull boxes
- Every number regenerated from the repository by program
  (`data/paper-numbers.json`)
- Figures and per-run data reproducible from `src/reporting/`
- Reference list verified entry by entry on 2026-10-13; the scorer is committed

## What the Paper Claims

Supported by the data:

- Six of ten open-weight models produced a learning graph on one 128 GB unit,
  in 6 to 102 minutes, and ran all three stages.
- Two of those six wrote every chapter they designed, in 2.2 and 2.7 machine
  hours for all three stages.
- The failures that stopped the others were of protocol and persistence:
  tool calls written as text, work announced and not done, a lost task, a time
  limit, or a context that did not fit.
- The conformance score separates even from uneven books; its top two books
  swap places in 39% of reweighted trials.
- The cost model's predicted three-stage time was within a factor of 1.7 of the
  measurement, partly by cancelling errors.

Not claimed, and stated as limits in the paper:

- That any chapter is correct (no human review)
- That a model would complete a second time (one run per cell)
- That a local model matches a cloud model (no cloud baseline)
- That the score's weights are right (no human calibration)

## Open Items

| Item | Who | Why it matters |
|---|---|---|
| Review every claim | Author | The draft was written by an AI assistant from the book's pages and run records |
| Re-read the Brusilovsky, Sosnovsky, and Thaker article | Author | The publisher blocked automated access; Section 2.1 now states only what the abstract supports, and the full text may support more |
| Confirm the wording about the second unit | Administrator | Section 4.8 relays a third party's findings |
| Explain the `gemma4:31b` speed | Author | 19 GB of weights at 273 GB/s caps a plain decode near 14 tokens per second; 28 to 40 was measured. See README note 4 |
| Update `docs/appendices/cost-analysis.md` with measured times | Author | The page still says one stage was measured |
| Repeated runs, human blind review, cloud baseline | Author | Future work in Section 10; they would change the findings |

## Quality Checklist

- [x] All sections have content
- [x] Abstract under 250 words
- [x] All figures created and referenced
- [x] All citations resolve (every key is defined and every entry is cited)
- [x] All 45 references verified against a source on 2026-10-13 (`src/reporting/verify_references.py` and by hand)
- [x] Paper numbers and figures regenerate byte-identical from the committed scorer
- [x] Compiles without errors
- [x] No device details in any file
- [ ] PDF reviewed by the author
- [x] References verified
- [x] arXiv package built and scanned (`python3 src/reporting/make_arxiv_package.py`)
- [ ] Administrator confirms the Section 4.8 wording
- [ ] License chosen
- [ ] arXiv endorsement in hand for the chosen category
