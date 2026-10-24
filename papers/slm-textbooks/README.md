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
| References | `references.bib` | 45 entries, all verified 2026-10-13; see "Reference Verification" |

## Directory Structure

```
papers/slm-textbooks/
├── main.tex                  # Main LaTeX document (same preamble as the MicroSims paper)
├── build.sh                  # Tectonic build; ./build.sh numbers also regenerates figures
├── abstract.txt              # Plain-text abstract for arXiv metadata
├── main.pdf                  # Latest build
├── slm-textbooks-v0.01.pdf   # Versioned copy, made by hand when the version changes
├── arxiv-submission/         # Generated: flattened source and figures for arXiv
├── arxiv-submission.zip      # Generated: the same, zipped for upload
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
| `src/reporting/verify_references.py` | Checks every `references.bib` entry against arXiv, Crossref, Open Library, or the page it cites |
| `src/reporting/make_arxiv_package.py` | Flattens the paper, strips comments, inlines the bibliography, test-compiles it, scans it for device details, and zips it |

## Compilation

Requirements: Tectonic (`brew install tectonic`).

```bash
cd papers/slm-textbooks
./build.sh            # build main.pdf
./build.sh numbers    # regenerate figures and numbers first, then build
./build.sh arxiv      # build and scan the arXiv package
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

All 45 entries were checked on 2026-10-13. Each entry in
`sections/references.bib` carries a `% VERIFIED` line that names the source.

```bash
python3 src/reporting/verify_references.py     # needs network access
```

The script asks the source that fits each entry (the arXiv API for an eprint,
Crossref for a DOI, Open Library for a book, an HTTP request for a web page)
and prints the entry beside what the source says. It marks a line `REVIEW`
when the title similarity is under 0.90, the first author differs, or the year
is more than one apart. Web pages and books always need a person to read the
line, because a page's `<title>` is not a citation title, and a conference or
journal paper with no arXiv identifier or DOI (BFCL, Pineau et al.) is found by
a title search that can return the wrong paper. A re-run therefore still marks
about seventeen entries `REVIEW`; each was settled by hand, and its `% VERIFIED`
line says against what.

What the check found, so a later reader knows what the `% VERIFIED` marks cost:

- **No entry was fabricated or unfindable.** All 45 exist and match their
  title, first author, and year.
- **Fixed:** a missing "Jr." on one author; an incomplete author list on one
  book; three web-page titles that had changed (Ollama, Gitleaks, ibook-skills);
  one first-author surname the page abbreviates; a publication year that was
  the access year, not the first-commit year.
- **Venue upgrades:** `liu2023agentbench` is now cited at ICLR 2024 and
  `liang2022helm` at TMLR 2023, each confirmed on the venue's own record.
- **The style does not print identifiers.** `ieeetr` ignores `eprint`,
  `archivePrefix`, and `doi`, so each arXiv-sourced entry also carries
  `note = {arXiv:...}`. Before this change those entries printed with no way
  to find them.
- **Two sentences changed because the source did not say what they claimed.**
  Section 2.1 now states only what the Brusilovsky article's abstract supports
  (the publisher blocked the full text), and Section 2.4 now describes the
  Dodge et al. paper as being about reporting score distributions, which is
  what its abstract says, and not "variance across runs".
- **Facts the paper takes from sources were confirmed in the sources:** the
  DGX Spark figures (128 GB, 273 GB/s, 20 Arm cores, 6,144 CUDA cores), the
  gpt-oss parameter counts (116.8 B total, 5.1 B active), the SLM definition
  quoted from Belcak et al., and the 100 M to 5 B range of the Lu et al. survey.

Checked and not changed: the author's own two preprints match their local
sources. Whether each cited work supports the sentence that cites it was
checked only for the facts listed above; the rest is for the author's read.

## Compilation Checklist

- [x] Compiles without errors
- [x] No undefined citations or references
- [x] No overfull boxes
- [x] Abstract under 250 words (249)
- [x] All figures PNG, 300 dpi, each referenced in the text
- [x] Every number in the text regenerated from the repository (see `data/paper-numbers.json`)
- [x] No address, host name, login, or path in the paper, figures, or data
- [ ] Author review of every claim, especially Sections 6 and 9
- [x] Verify every reference (2026-10-13); DOIs added where a source supplied one
- [ ] Author confirms the AI-use statement in the acknowledgments
- [ ] Administrator confirms the sentences about the second unit (Section 4.8)
- [x] Scorer committed (9fa28d4); regenerating the numbers from it changes nothing
- [x] arXiv package built, test-compiled alone, and scanned
- [ ] License chosen (the course description is CC BY-NC-SA 4.0; CC BY 4.0 is the usual arXiv choice)

## arXiv Submission

Suggested categories: primary **cs.CL** (the work is an evaluation of language
models on a generation workflow) or **cs.AI**, with **cs.CY** (Computers and
Society) as secondary for the educational framing. The MicroSims paper used
cs.CY first; the author should choose. Moderators may reclassify.

arXiv requires prior peer review for *review and position papers* in computer
science (announced 2025-10-31). This paper is an empirical benchmark with its
own measurements, so that rule should not apply, and the paper says so by
reporting data and limits and not by arguing a position. arXiv requires
disclosure of significant generative-AI use and puts full responsibility on the
signing author; `12-acknowledgments.tex` carries the disclosure and needs the
author's confirmation.

To build the package:

```bash
./build.sh arxiv
```

The package is `arxiv-submission/` and `arxiv-submission.zip`: one flattened
`arxiv-submission.tex` with the bibliography inlined, and the six figures.
arXiv publishes the TeX source, so the packager removes every comment, ships no
`.bib`, and scans the source and the PNG metadata for addresses, hostnames,
tailnet names, keys, tokens, home-directory paths, and hardware identifiers,
and for any names you list in `DGX_EVAL_SCAN_TERMS` (comma-separated: the
administrator's name, the units' labels), which are kept out of this repository
for the same reason they are checked. It writes no zip if anything matches. The
scan finds shapes; read the package once before upload.

Before uploading, still open: the author's read of every claim, the license,
an endorsement for the chosen category, and the Administrator's confirmation of
Section 4.8.

## Notes for the Author

1. **The scorer is committed.** An earlier note here said the numbers came
   from an uncommitted working tree. The scorer was committed in `9fa28d4`,
   and regenerating `data/paper-numbers.json` and every figure from it on
   2026-10-13 produced byte-identical files.
2. **Definitions differ from some book pages.** The paper reports the scorer's
   prose-only reading grade (9.4 to 11.5) and its count of diagram
   specifications, defined in Section 5. The Model Results pages use a
   whole-file reading grade (10.5 to 12.5) and a header-based diagram count, so
   the numbers differ.
3. **The cost-analysis page is stale.** It says only one stage had been
   measured. All six models have now run all three stages, and the paper uses
   the measured times. The page's totals were not changed.
4. **A speed in the book does not fit a plain dense decode.** `gemma4:31b`
   is listed as dense at 20 GB (the Ollama library page says 19 GB) and
   measured at 28 to 40 tokens per second. At the 273 GB/s the vendor publishes,
   reading 19 GB of weights per token caps a plain decode near 14 tokens per
   second. One candidate explanation is in the library listing: the tag ships a
   second, smaller model (its config names `Gemma4AssistantForCausalLM`), which
   would be a draft model for speculative decoding, and that reads the weights
   once for several tokens. This is a reading of a file listing, not a finding;
   the server's own log on the unit would settle it. The paper does not use a
   bandwidth bound, so no claim depends on the answer, but the book's
   model-candidates page says "dense, and it still generated 28 to 40 tokens
   per second" without explaining it.
5. **Third-party statements.** Section 4.8 relays the administrator's finding
   that no OOM kill, GPU error, kernel panic, or thermal shutdown was recorded
   on the unit that froze, and that power to it had been intermittent. Confirm
   the wording with the administrator, who is not named anywhere in the paper.
6. **Byline.** The author line and LinkedIn URL are copied from the MicroSims
   paper. Add co-authors or affiliations if wanted.
