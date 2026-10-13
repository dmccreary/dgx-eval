# Paper Generation Session Log

- **Task:** generate a publication-style paper about this book
- **Date:** 2026-10-12
- **Assistant:** Claude (Sonnet 5.5), in the Claude Code desktop app
- **Requested by:** the Primary Author
- **Output:** `papers/slm-textbooks/` (32 pages, version 0.01)
- **Commit:** `bd4e8bb`, pushed to `main`
- **Result:** complete first draft that compiles clean; open items listed at the end

## Original Prompt

The request that started the session, verbatim except for one path:

```text
Please generate a publication-style paper on this book.  Put the paper into @papers/slm-textbooks.  Use the same process and format at the paper at <ws>/microsims/paper
```

`<ws>` stands for the Primary Author's projects directory. The original prompt
spelled out the absolute path on the laptop. It is shortened here because the
repository's rule is to keep home-directory paths out of published files.

Later requests in the same session:

1. `commit the paper and push it`
2. A request for this log, including the original prompt.
3. `commit and push it`, for the log.
4. A request to add the five-levels paper to the references.
5. A question whether "composite score" describes the book-level number better
   than "headline", followed by `Rename it everywhere, including the scorer and
   its page ... Update the log also so it is consistent`.
6. `create a @docs/glossary.md and put a precise definition for "Composite
   Score" in there for now - we will generate a full glossary of terms later`.

Requests 4 to 6 are described under "Later Changes in the Same Session".

## Starting State

| Item | State |
|---|---|
| Branch | `main`, level with `origin/main` |
| Uncommitted work | The Primary Author's edits to `docs/about.md`, the chapter quality score page, chapter 1, `src/README.md`, and `src/scoring/chapter_quality.py`; untracked `src/scoring/test_equations.py` and a headshot image |
| `papers/` | Existed and was empty |
| Reference paper | `microsims/paper`: LaTeX, 42 pages, about 16,500 words |
| LaTeX tool | Tectonic 0.17.0 installed; no `pdflatex` or `bibtex` |
| Plotting | matplotlib 3.10.7 in the `mkdocs` conda environment |

Instructions in force, from the global rules and the project's `AGENTS.md`:

- Never expose the device under test: no addresses, host names, logins, keys,
  logs, or hardware identifiers in any committed file.
- All Python and shell code for the evaluation goes in `src/`, and
  `src/README.md` is updated in the same change.
- Never start or kill `mkdocs serve`; never use worktrees; never add
  `navigation.tabs`.
- Report honestly: if a check fails or a step is skipped, say so.
- Commit or push only when asked.

Project memory was consulted for the role names (the Primary Author, the
Administrator), the harness decisions, where results live, the unit freezes,
and the scoring design. No contact details or names from it appear in the paper
or in this log.

## What the Reference Paper Showed About Process

The reference was read first, because the request was to match its process and
format.

| Aspect | Reference practice | Followed here |
|---|---|---|
| Source layout | `main.tex` inputs one file per section from `sections/` | Yes, 12 section files |
| Preamble | `article`, 11 pt, 1 in margins, hyperref, booktabs, listings, algorithm, subcaption | Same, plus `tabularx` |
| Bibliography | `ieeetr`, `sections/references.bib` | Yes |
| Build | `build.sh` wrapping Tectonic, with a `clean` option | Yes, plus a `numbers` option |
| Figures | PNG only, 300 dpi, with a Python generator | Yes; generator placed in `src/reporting/` |
| Project files | `README.md` with a checklist, `STATUS.md`, `abstract.txt`, figure status notes | Yes |
| Versioning | A dated PDF per version | `slm-textbooks-v0.01.pdf` |
| Not done | A flattened `arxiv-submission.tex` and zip | Left as a listed next step |

## Phases of Work

### 1. Learning the Book

No subagents and no skills were used. The assistant read the book's own pages
directly.

- **Scope pages:** `docs/index.md`, `docs/course-description.md`,
  `docs/chapters/index.md`, the learning-graph quality metrics.
- **Method pages:** evaluation status, model candidates, design choices,
  chapter quality score, cost analysis, testing architecture.
- **Results pages:** the Model Results index and each model's chapter metrics
  and graph quality report.
- **Chapters:** the small-language-models definition (3), fair evaluation
  design (19), sanitizing and publishing (23), the levels of intelligent
  textbooks (1), and the reference lists of chapters 1, 2, 3, 4, 6, 13, 16, 19,
  20, and 21.
- **Code:** `src/README.md`, the harness runner and queue script, the
  model-only smoke test, and `benchmark/algebra-1/README.md`.

Facts established, and used later:

- The book has 23 chapters, 506 concepts, 824 dependencies, 36 MicroSims (all
  at status `built`, none `approved`), 230 quiz questions, and 230 references.
- The benchmark is Algebra I in three stages, with fixed prompts, a pinned
  harness and server, and limits of 150, 120, and 90 minutes.
- Ten models were chosen; six produced a learning graph; two wrote every
  chapter they designed.
- The book states plainly that no person has judged the output, every test ran
  once, and no cloud baseline exists.

### 2. Deciding What the Paper Is

The paper is about the book in both of its roles: as the documentation of an
evaluation, and as a second deliverable that teaches the method. It reports the
evaluation with the book's own limits stated first. It claims feasibility and
withholds any claim of equivalence with cloud generation.

The title is "Small Language Models as Textbook Generators: A Local-Hardware
Benchmark on the NVIDIA DGX Spark and the Intelligent Textbook That Teaches It".
The planned structure was introduction, related work, the book, benchmark
design, measurement, results, cost, publishing from a private machine,
discussion, and conclusion.

### 3. Regenerating the Numbers

The assistant did not copy numbers from the book's pages. It recomputed them.

| Computation | Method | Outcome |
|---|---|---|
| Chapter and book scores | Ran `src/scoring/chapter_quality.py` on the six books under `docs/models/` | Matched the published table exactly; 8,880 well-formed equations and 1 malformed |
| Per-run counts and times | Wrote `src/reporting/aggregate_runs.py`, which reads each run's status file and event stream | 76 runs from 9 models; counts and durations only |
| Size correlation | Spearman rank correlation of chapter score with size over 49 written chapters | Words -0.10, diagram specifications 0.15, equations 0.15 |
| Weight sensitivity | Each of the six dimension weights times a uniform draw from 0.6 to 1.4, 500 trials | Same order in 61%; only two pairs ever swap |
| Cost model | Restated the page's formulas in code | Reproduced $8,275 a year, $1.89 per generating hour, $53 for the reference case |
| Measured against predicted time | Compared measured wall-clock with the model's predictions | All six within a factor of 1.7 |
| Back-solved per-turn overhead | Measured tokens and turns through the model's formula | 7 to 9 s for three fast models against 15 s assumed |

Differences between the paper's numbers and the book's pages, found while
recomputing:

- **Diagram correlation:** 0.15 here against 0.13 on the page, from a
  different diagram count.
- **Weight sensitivity:** 61% and 4.5% of pairs here against 59% and 3.3% on the
  page. The page does not say exactly which weights it perturbed.
- **Reading grade:** the scorer's prose-only grade is 9.4 to 11.5, and the Model
  Results pages use a whole-file grade of 10.5 to 12.5.
- **Diagram counts:** the scorer counts specification blocks and the Model
  Results pages count headers, so the totals differ.
- **Cost analysis page:** it still says one stage had been measured, which is
  out of date.

### 4. Verifying Citations

Ten references were checked with web searches and one fetch of the vendor's
hardware page. The rest were entered from memory and marked as unverified.

| Entry | Result |
|---|---|
| Brusilovsky, Sosnovsky, Thaker, AI Magazine 43(3) | Verified. The assistant's recalled DOI ended in `12060`; the correct one is `10.1002/aaai.12061` |
| Belcak et al., small language models and agentic AI | Verified; also supplied the functional definition of an SLM the paper adopts |
| Lu et al. and Wang et al., SLM surveys | Verified; the first surveys 100 million to 5 billion parameters, which is why the paper defines SLM operationally |
| Patil et al., BFCL, ICML 2025 | Verified, including volume and pages |
| gpt-oss model card | Verified, arXiv 2508.10925 |
| AgentBench | Verified as arXiv 2308.03688; venue not confirmed, so cited as a preprint |
| Biderman et al., reproducible evaluation | Verified |
| Agent Skills post, Anthropic Engineering | Verified, with authors and date |
| NVIDIA DGX Spark user guide | Verified: 20-core Arm CPU, 128 GB unified memory, 273 GB/s |

### 5. Building the Pipeline and Figures

Two scripts were written in `src/reporting/`, because the repository keeps
evaluation code in `src/`:

- `aggregate_runs.py` reads fetched run output and writes a sanitized CSV.
- `make_paper_figures.py` runs the scorer, computes every derived number, writes
  `data/paper-numbers.json`, and draws six figures.

The figures were viewed after each render. Problems found and fixed:

| Figure | Problem | Fix |
|---|---|---|
| Architecture | Text overflowed several boxes and one label overlapped an arrow | Redrew on a wider canvas with shorter labels |
| Completion | A 32-second run was labeled "1 min" | Labeled "under 1 min", matching the book |
| Time | Legend sat on top of the bars and labels | Moved below the axis and widened the axis |
| Quality | An iso-curve label fell on the axis label; two x labels read "gemma4"; a heading label hid a tick | Dropped one curve, used full model tags, moved the note to the caption |
| Book structure | Legend overlapped the tallest bar | Raised the axis limit and centered the legend |
| Cost sensitivity | Dollar signs were parsed as math and rendered as italics | Escaped the dollar signs |

### 6. Writing and Compiling

Sections were drafted from the verified facts. After the first compile the PDF
was 33 pages with several layout defects, and the visual review of the pages
drove these changes:

| Defect | Cause | Fix |
|---|---|---|
| 10 BibTeX errors, silently ignored by the build | `% VERIFIED` comments placed after an entry's opening line | Moved each marker to the line above its entry |
| Stage 1 and failure tables unreadable | Wide monospace model names starved the text column | Explicit column widths |
| Cost assumptions table unreadable | A right-aligned value column took all the width | Explicit column widths |
| Overfull table and paragraph boxes | Long model names, tables slightly wider than the text | Narrower headers, tighter column spacing, emergency stretch |
| Abstract over 250 words | 262 words | Trimmed to 249 |
| An in-place `sed -i` edit failed | macOS `sed` needs an argument to `-i` | Switched to a short Python edit |
| Wrong entry type for the readability reference | Entered as `inproceedings` | Changed to `techreport` |
| Two bibliography entries uncited | Drafted before the text cited them | Added a citation for each in context |

### 7. Auditing the Claims

Every factual sentence was checked against its source. Corrections made:

| Original wording | Problem | Correction |
|---|---|---|
| Speed spans "a factor of 17" | 102 over 5.7 minutes is about 18 | "about 18" |
| "A word count would have scored that chapter as complete" | Not verified for that chapter | "A word-count threshold alone cannot see that" |
| The prose words of one model were "body text, because 108 specifications carry the rest" | Prose excludes specifications, code, and concept tables | Named all three |
| Time predictions held because errors "offset" | Unsupported when written | Back-solved per-turn overhead from measurements and rewrote the paragraph |
| Bugs "found after the first scores were published to the author" | Not what the book says | "passed the checks above and were found later" |
| Chapters "each end with an explicit test" | The book says each setup step does | Reworded |
| One model's active parameters "about 3 billion" | Its page says 3.8 billion | Added the figure |
| Two models "filled" their configured window | They reached 163,832 and 163,082 of 163,840 | "within about a thousand tokens" |
| One model's defects omitted "navigation not updated" | The first-round table lists it | Added |
| Table of licenses | One license was reported by secondary sources only | Caption says so |

### 8. Project Files and the Commit

The README, STATUS, abstract, figure notes, and data notes were written, and
`src/README.md` gained rows for the two scripts. The final checks were a
rebuild, a scan of the paper, scripts, and data for device details, and a copy
of the PDF to a versioned name.

When asked to commit and push, the assistant found that `src/README.md` held the
Primary Author's uncommitted notes about `test_equations.py` alongside its own
two hunks. It staged only its own hunks, so the commit does not mention a file
that is not in the repository.

## Final Verification

| Check | Result |
|---|---|
| Build | Tectonic exits clean; 32 pages |
| Undefined references or citations | None |
| Overfull boxes | None |
| Bibliography | 44 entries, all cited; 10 marked verified (45 and 11 after the later addition below) |
| Abstract | 249 words |
| Figures | 6, all PNG at 300 dpi, all cited in the text |
| Tables and algorithms | 17 tables, 1 algorithm |
| Scan for addresses, host names, tokens, keys, home paths, hardware identifiers | Clean, on the working tree and again on the staged diff |
| PDF and PNG metadata | No identifying fields |
| `mkdocs build --strict` | Not run; no file under `docs/` or `mkdocs.yml` was changed |
| Compile of the staged commit from a clean clone | Not run |

## Results the Paper Reports

| Model | Stage 1 | Chapters written | Three-stage time | Composite score |
|---|---|---|---|---|
| `qwen3.6:35b` | 22 min | 11 of 11 | 2.2 h | 64.3 |
| `gemma4:31b` | 21 min | 10 of 12 | 4.8 h | 63.6 |
| `nemotron-3.5-lightning:30b` | 18 min | 12 of 12 | 2.7 h | 52.5 |
| `gemma4:26b` | 6 min | 10 of 14 | 1.8 h | 42.3 |
| `gpt-oss:120b` | 17 min | 6 of 10 | 1.9 h | 39.0 |
| `qwen3.8:27b` | 102 min | 0 of 14 | 5.6 h | none |

Four models produced no learning graph: `muse-glimmer:30b` lost the task,
`devstral-small-2:24b` wrote its tool call as text, `granite4.2:30b` hit the
150-minute limit, and `mistral-medium-3.5:128b` was not run because no usable
context fits beside its weights.

## Decisions Recorded

| Decision | Alternatives | Reason |
|---|---|---|
| Single-author byline, as in the reference; AI assistance disclosed in the acknowledgments | List the assistant as an author | The reference lists human authors only, and the assistant cannot be accountable for the content |
| Refer to the units' administrator without a name | Name them | The repository's rule for documents |
| Use the book's functional definition of a small language model | A parameter threshold | The candidates run from 24 to 128 billion parameters; the surveys use 100 million to 5 billion |
| Put the two scripts in `src/reporting/` | Keep them beside the figures, as the reference does | `AGENTS.md` requires evaluation code in `src/` |
| Keep `build.sh` in the paper directory | Move it to `src/` | It is a paper wrapper around Tectonic, and the reference keeps it there |
| Commit the aggregated per-run CSV, not the raw run output | Commit nothing; commit raw output | Counts and durations are safe; raw output is unsanitized |
| Use the scorer's prose-only reading grade | The Model Results pages' whole-file grade | It is the quantity the score uses, and it is defined in the paper |
| Leave out a memory-bandwidth bound on decode speed | Use it to explain the dense 128B model's 3 tokens per second | It fails for another dense model in the same data (see below) |
| Present whole-book cost as conditional on the 10% assumption | State a book cost outright | That share has never been measured |
| Relay the Administrator's findings on the second unit, flagged for confirmation | Omit them | They bear on a threat to validity, but they are a third party's statements |
| Commit directly to `main` and push | A branch and a pull request | The Primary Author's documented workflow commits and pushes to `main` |
| Commit both `main.pdf` and the versioned PDF | One copy | The reference keeps both; identical files are stored once by git |
| Stage only the assistant's hunks of `src/README.md` | Stage the whole file | The rest describes uncommitted files |
| Call the book-level number "composite score" | "Headline", "book score", "consistency-adjusted score" | It is built from two components, it is numeric in tone, and it does not claim quality; "book score" does not say how it is built and the other is long for a table header |
| Define the composite as a product, in one line | Leave it implied | "Composite" often suggests a weighted average, and this one is multiplicative |
| Add "Composite Score" to the existing glossary, in place | Create `docs/glossary.md` as asked | The file already existed with 506 committed entries; creating it would have overwritten them |
| Cite only the GitHub URL for the five-levels paper | Also cite its EdArXiv preprint | The source README holds unresolved merge-conflict markers, so the preprint link is unconfirmed |

## Findings Raised for the Primary Author

1. **The scorer is uncommitted.** The paper's numbers come from the working-tree
   `src/scoring/chapter_quality.py`. At `HEAD` it predates the equation counts,
   so the figure script will not reproduce the paper from a fresh clone until
   that file and `src/scoring/test_equations.py` are committed.
2. **A speed in the book may not fit the hardware.** `gemma4:31b` is listed as
   dense at 20 GB and measured at 28 to 40 tokens per second. At the published
   273 GB/s, reading 20 GB of weights per token caps decode near 14 tokens per
   second. Either the dense label, the speed, or the bandwidth is off.
3. **The cost analysis page is out of date.** It says one stage had been
   measured. The paper uses the measured times.
4. **Uncommitted chapter 1 edits.** The chapter-size figure in Section 3 includes
   them.
5. **Third-party wording.** Section 4.8 relays findings about the second unit
   and should be confirmed with the Administrator.
6. **References.** Thirty-four of the 44 are unverified and have no DOI.
7. **The AI-use statement.** The acknowledgments need the Primary Author's
   confirmation.
8. **New files not from this session.** `docs/learning-graph/book-metrics.*`
   and related files appeared untracked while the session ran and were left
   alone.

## Later Changes in the Same Session

### This log

Committed and pushed as `5a15248`, after the staged diff passed the same scan
as the paper. It was the only file in that commit.

### A reference added

The Primary Author asked for the five-levels paper in the `intelligent-textbooks`
repository to be added to the references.

- **Details.** Title, author, and "Version 0.04" were taken from that paper's own
  `main.tex`, because the repository page's rendered title had a stray fragment
  from a link.
- **Year.** 2025, the date `main.tex` last changed. The paper states no date.
- **Citation.** Section 2.1, where the five-level scale is introduced, as earlier
  work by the author that draws lessons from autonomous-vehicle standards. The
  sentence says no more than that paper's title and README support.
- **Not cited.** The EdArXiv preprint link in that repository's README, because
  the README holds unresolved merge-conflict markers.
- **Counts.** 45 entries, 11 marked verified, 34 unverified. The paper's README
  and STATUS were updated and the PDF rebuilt: 32 pages, no new warnings.

### "Headline" renamed to "composite score"

The Primary Author found "headline" awkward for a number, since it suggests
newspaper text, and asked whether "composite score" would be more descriptive.
The assistant agreed, gave the caveats and the alternatives (see Decisions
Recorded), counted 12 files that used the word, and noted that two of them held
the Primary Author's uncommitted edits. The Primary Author then approved
renaming it everywhere, including those two, and asked for this log to match.

| Area | Change |
|---|---|
| The scorer | The `headline` field of its `--json` output is now `composite`; the per-book line and the comparison table header say Composite; its header comment and sort key follow |
| The scorer's page | Prose, formula, worked example, and results table header |
| Other book pages | Two sentences in the design-choices page; one in `src/README.md` |
| The paper | Sections 5, 6, and 9, Table 13, the Figure 5 caption and labels, and the data README |
| Scripts and data | The figure script's variable names and labels; `paper-numbers.json` and `fig-quality.png` regenerated |
| This log | The results table header, and this section |
| Left alone | `docs/appendices/model-candidates.md`, where "headline strengths" is the ordinary word for a publisher's claims |

Verification:

- The scorer, rerun on the six books, gives identical scores: 64.3, 63.6, 52.5,
  42.3, 39.0, and none for the book that wrote no chapter.
- All 61 equation regression cases pass.
- The paper rebuilds at 32 pages with no overfull boxes and no undefined
  references. The word "headline" no longer appears in the PDF text or the data.
- Anything outside the repository that reads the `headline` key from the
  scorer's `--json` output needs the new key. The word remains only in git
  history.

The assistant's persistent project note about the score was updated to the new
name as well.

### A glossary entry

The Primary Author asked for a `docs/glossary.md` to be created with a precise
definition of "Composite Score", to be replaced later by a full glossary.

- **The file already existed.** `docs/glossary.md` is tracked, unmodified, and
  holds 506 generated entries from commit `b078f31`. Creating it would have
  overwritten them, so the assistant added the entry in place instead.
- **The entry.** It sits between "Commercial Use Terms" and "Compute Capability"
  and follows the file's format: a definition, an example, and links to related
  terms. The definition states the formula, the upper bound, when it is
  undefined, and that it measures conformance and not correctness. The example
  is the worked one from the scorer's page (level 69.8, consistency 91.1,
  composite 63.6).
- **Checks.** The glossary still has every heading in alphabetical order, now
  507, and the three "See also" terms exist.
- **A mismatch to resolve.** The glossary's front matter and the book's home
  page say 506 terms, one per concept in the learning graph. "Composite Score"
  is not in the concept list, so the count is now one short of the entries, and
  a regeneration from the concept list would drop the entry. The same is true
  of "level" and "consistency", which have no entries.
- **Site build.** `mkdocs build --strict`, run after this and the rename, exits
  clean.

All of these changes are uncommitted at the time of writing: the renamed scorer
and its page, the design-choices page, the glossary, `src/README.md`, the
paper's sources, figures, data, and both PDFs.

## Files

Created, all committed in `bd4e8bb`:

| Path | Purpose |
|---|---|
| `papers/slm-textbooks/main.tex`, `build.sh` | Document and build script |
| `papers/slm-textbooks/sections/01-abstract.tex` to `12-acknowledgments.tex` | The paper |
| `papers/slm-textbooks/sections/references.bib` | 44 references (45 after the later addition) |
| `papers/slm-textbooks/figures/` | Six PNG figures and a README |
| `papers/slm-textbooks/data/` | `stage-metrics.csv`, `paper-numbers.json`, and a README |
| `papers/slm-textbooks/README.md`, `STATUS.md`, `abstract.txt` | Project files |
| `papers/slm-textbooks/main.pdf`, `slm-textbooks-v0.01.pdf` | Identical builds |
| `src/reporting/aggregate_runs.py` | Run output to sanitized CSV |
| `src/reporting/make_paper_figures.py` | Figures and derived numbers |

Modified: `src/README.md` (two rows and one paragraph, committed).

Created after that commit: this log, `logs/paper-generation.md`, committed in
`5a15248`.

Changed afterwards and not yet committed: the files listed under "Later
Changes in the Same Session".

## Tools Used

| Tool | Use |
|---|---|
| File read, write, edit | The paper, scripts, and notes |
| Shell | Compiling, regenerating numbers, scanning, git |
| Web search (10 queries), web fetch (4), public repository API lookups (2) | Citation and hardware verification, and the details of the added reference |
| Image read | Viewing figures and rendered PDF pages |
| Subagents, skills, questions to the user | None |

## Open Items

- Review of every claim by the Primary Author.
- Verify the 34 remaining references and add DOIs.
- Commit the scorer and its test file, then re-check the paper's numbers. The
  scorer now also carries the rename.
- Commit the later changes: the added reference, the rename, the glossary
  entry, and the rebuilt paper.
- Add "Composite Score", "Level", and "Consistency" to the learning graph's
  concept list, so that a regenerated glossary keeps them and the 506 count
  stays true.
- Confirm the second-unit wording with the Administrator.
- Resolve the `gemma4:31b` speed question.
- Update the cost analysis page with the measured times.
- Choose a license and arXiv categories, and build the flattened submission.
- The research that would change the findings: repeated runs, blind human
  review of a sample of chapters, a cloud baseline, and a second harness.
