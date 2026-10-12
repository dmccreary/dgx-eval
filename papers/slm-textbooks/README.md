# SLM Textbook-Generation Paper

## Overview

This directory holds the LaTeX source for the paper "Small Language Models as
Textbook Generators: A Local-Hardware Benchmark on the NVIDIA DGX Spark and the
Intelligent Textbook That Teaches It". It is a publication-style paper about
this book, *DGX Evaluation for Textbook Generation*, and follows the process and
format of the MicroSims paper (`microsims/paper`): a `main.tex` that inputs one
file per section from `sections/`, a BibTeX file, PNG figures with their
generator, a Tectonic `build.sh`, a plain-text `abstract.txt`, and a versioned
PDF.

The paper reports the book's evaluation honestly: single runs, no human review,
and no cloud baseline. It supports a statement about feasibility, not about
equivalence with cloud generation.

## Paper Status

**Current state**: Complete first draft, version 0.01, 32 pages, compiles clean
with no undefined references and no overfull boxes. Not yet reviewed by the
author.

| Section | File | Status |
|---|---|---|
| Abstract (249 words) | `01-abstract.tex` | Complete |
| 1 Introduction | `02-introduction.tex` | Complete |
| 2 Background and Related Work | `03-related-work.tex` | Complete |
| 3 The Book | `04-the-book.tex` | Complete |
| 4 Benchmark Design | `05-benchmark-design.tex` | Complete |
| 5 Measuring What Was Produced | `06-measurement.tex` | Complete |
| 6 Results | `07-results.tex` | Complete |
| 7 Cost | `08-cost.tex` | Complete |
| 8 Publishing Evidence from a Private Machine | `09-publishing.tex` | Complete |
| 9 Discussion | `10-discussion.tex` | Complete |
| 10 Conclusion | `11-conclusion.tex` | Complete |
| Acknowledgments | `12-acknowledgments.tex` | Complete; AI-use statement needs the author's confirmation |
| References | `references.bib` | 44 entries; see "Reference Verification" |

## Directory Structure

```
papers/slm-textbooks/
├── main.tex                  # Main LaTeX document (same preamble as the MicroSims paper)
├── build.sh                  # Tectonic build; ./build.sh numbers also regenerates figures
├── abstract.txt              # Plain-text abstract for arXiv metadata
├── main.pdf                  # Latest build
├── slm-textbooks-v0.01.pdf   # Versioned copy of the build
├── sections/
│   ├── 01-abstract.tex … 12-acknowledgments.tex
│   └── references.bib
├── figures/                  # PNG figures, 300 dpi (see figures/README.md)
├── data/
│   ├── stage-metrics.csv     # Per-run counts and times; no paths, hosts, or text
│   ├── paper-numbers.json    # Every derived number the paper uses
│   └── README.md
├── README.md                 # This file
└── STATUS.md                 # Short status report and open items
```

The code that makes the figures and numbers is not in this directory. The
repository rule is that all Python and shell code for the evaluation lives in
`src/`, so it is in `src/reporting/` and documented in `src/README.md`:

| Script | What it does |
|---|---|
| `src/reporting/aggregate_runs.py` | Reads the fetched run output and writes `data/stage-metrics.csv` |
| `src/reporting/make_paper_figures.py` | Runs `src/scoring/chapter_quality.py`, then writes `data/paper-numbers.json` and every figure |

## Compilation

Requirements: Tectonic (`brew install tectonic`).

```bash
cd papers/slm-textbooks
./build.sh            # build main.pdf
./build.sh numbers    # regenerate figures and numbers first, then build
./build.sh clean      # remove build artifacts
```

Regenerating the figures needs matplotlib and numpy, which the `mkdocs` conda
environment has. To refresh the per-run data from the raw run output on the
laptop:

```bash
python3 src/reporting/aggregate_runs.py            # reads ~/dgx-eval-runs/unit-1
```

## Where Each Section's Content Comes From

| Paper section | Book pages |
|---|---|
| 3 The Book | `docs/index.md`, `docs/course-description.md`, `docs/chapters/index.md`, `docs/learning-graph/quality-metrics.md`, chapter 1 |
| 4 Benchmark Design | `benchmark/algebra-1/README.md`, `docs/appendices/design-choices.md`, `docs/appendices/testing-architecture.md`, `docs/appendices/model-candidates.md`, `src/harness/` |
| 5 Measuring | `docs/appendices/chapter-quality-score.md`, `src/scoring/chapter_quality.py` |
| 6 Results | `docs/appendices/evaluation-status.md`, `docs/models/`, `data/stage-metrics.csv`, scorer output |
| 7 Cost | `docs/appendices/cost-analysis.md`, `data/stage-metrics.csv` |
| 8 Publishing | `docs/chapters/23-sanitizing-and-publishing/index.md`, `AGENTS.md`, `src/README.md` |

## Reference Verification

Ten entries were checked against the source's own page or a search result
during drafting (title, authors, venue, identifier). They are marked
`% VERIFIED` in `sections/references.bib`:

`brusilovsky2022return` (the DOI is 10.1002/aaai.12061), `belcak2025slm`,
`lu2024slm`, `wang2024slmsurvey`, `nvidia2025dgxspark`, `openai2025gptoss`,
`patil2025bfcl`, `liu2023agentbench`, `biderman2024lessons`,
`anthropic2025skills`.

The remaining entries are well-known works entered from memory without a DOI.
**Verify them before submission**, in the same way as the TODO in the MicroSims
paper's `references.bib`. `liu2023agentbench` is cited as an arXiv preprint
because its venue was not confirmed.

## Compilation Checklist

- [x] Compiles without errors
- [x] No undefined citations or references
- [x] No overfull boxes
- [x] Abstract under 250 words (249)
- [x] All figures PNG, 300 dpi, each referenced in the text
- [x] Every number in the text regenerated from the repository (see `data/paper-numbers.json`)
- [x] No address, host name, login, or path in the paper, figures, or data
- [ ] Author review of every claim, especially Sections 6 and 9
- [ ] Verify the unverified references and add DOIs
- [ ] Author confirms the AI-use statement in the acknowledgments
- [ ] Administrator confirms the sentences about the second unit (Section 4.8)
- [ ] Commit the scorer (`src/scoring/chapter_quality.py`) before citing its numbers
- [ ] License chosen (the course description is CC BY-NC-SA 4.0; CC BY 4.0 is the usual arXiv choice)

## arXiv Submission

Suggested categories: primary **cs.CL** (the work is an evaluation of language
models on a generation workflow) or **cs.AI**, with **cs.CY** (Computers and
Society) as secondary for the educational framing. The MicroSims paper used
cs.CY first; the author should choose.

To package, follow the MicroSims paper: flatten `main.tex` and the section
files into one `arxiv-submission.tex`, include `main.bbl`, and zip the figures.
This has not been done.

## Notes for the Author

1. **The scorer has uncommitted changes.** The numbers come from
   `src/scoring/chapter_quality.py` as it stood in the working tree on
   2026-10-12 (git status showed it modified). They match the published
   Chapter Quality Score page. Commit the scorer before citing them.
2. **Definitions differ from some book pages.** The paper reports the scorer's
   prose-only reading grade (9.4 to 11.5) and its count of diagram
   specifications, defined in Section 5. The Model Results pages use a
   whole-file reading grade (10.5 to 12.5) and a header-based diagram count, so
   the numbers differ.
3. **The cost-analysis page is stale.** It says only one stage had been
   measured. All six models have now run all three stages, and the paper uses
   the measured times. The page's totals were not changed.
4. **A speed in the book may not fit the hardware.** `gemma4:31b` is listed as
   dense at 20 GB and measured at 28 to 40 tokens per second. At the
   273 GB/s the vendor publishes for this machine, reading 20 GB of weights per
   token caps decode near 14 tokens per second. Either the dense label, the
   speed, or the bandwidth is off. The paper does not use a bandwidth bound for
   this reason; check it before submission.
5. **Third-party statements.** Section 4.8 relays the administrator's finding
   that no OOM kill, GPU error, kernel panic, or thermal shutdown was recorded
   on the unit that froze, and that power to it had been intermittent. Confirm
   the wording with the administrator, who is not named anywhere in the paper.
6. **Byline.** The author line and LinkedIn URL are copied from the MicroSims
   paper. Add co-authors or affiliations if wanted.
