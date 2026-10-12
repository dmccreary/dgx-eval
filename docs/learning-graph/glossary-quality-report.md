---
title: Glossary Quality Report
description: Automated quality and compliance metrics for the book's glossary, checked against ISO 11179 rules for precise, concise, distinct, and non-circular definitions.
---

# Glossary Quality Report

This report covers [the glossary](../glossary.md), which defines all 506
concepts in the [concept list](concept-list.md). The checks below are
mechanical: a script measured length, structure, cross-references, and
content rules. Precision and distinctiveness cannot be scored by a script, so
those two criteria rest on a spot check of 20 entries, not on a full review.

## Input Quality

| Check | Result |
|---|---|
| Concepts in the list | 506 |
| Duplicate labels | 0 |
| Labels over 32 characters | 0 |
| Labels not in Title Case | 31, all literal tool, command, or model names such as `nvidia-smi`, `vLLM`, and `gemma4:31b`, kept as written |

## Coverage

| Check | Result |
|---|---|
| Concepts with an entry | 506 of 506 |
| Entry headers that match a concept label exactly | 506 of 506 |
| Entries not in the concept list | 0 |
| Alphabetical order (case-insensitive) | 100% |

## ISO 11179 Criteria

| Criterion | How it was checked | Result |
|---|---|---|
| Conciseness | Definition word count against the 20-50 word target | Average 28.8 words; shortest 20, longest 42; none outside the target |
| Non-circularity | Whether a multi-word term appears verbatim in its own definition | 0 entries |
| Free of business rules | Search for must, should, always, never, and similar words | 6 hits, each reviewed; all describe what a thing does (for example "the device has to sign in again") and none prescribes practice |
| Distinctiveness | Word-overlap comparison of every pair of definitions | No pair above 0.55 similarity |
| Precision | Spot check of 20 entries against the chapters, including every candidate-model entry | No factual conflict found; model entries state identity and publisher claims only, and carry no test outcomes or rankings |

## Examples and Cross-References

| Metric | Result |
|---|---|
| Entries with an example | 336 of 506 (66%) |
| "See also" references | 1,278 in total, 0 pointing at a term that is not in the glossary |
| "Contrast with" references | 10, covering pairs such as Cost and Price, and Tailnet Name and Hostname |

Example coverage by topic area:

| Topic area | With example | Share |
|---|---|---|
| Candidate Models Under Evaluation | 13 of 13 | 100% |
| Optimizing SLM Performance | 24 of 24 | 100% |
| Intelligent Textbooks and the Generation Pipeline | 30 of 34 | 88% |
| Testing Architecture and Containment | 16 of 19 | 84% |
| Python Hardware Probes | 23 of 29 | 79% |
| Sanitizing Evaluation Artifacts Before Publication | 19 of 25 | 76% |
| Running the Textbook Benchmark and Reporting | 37 of 50 | 74% |
| Model Sizing and Model Fit | 19 of 26 | 73% |
| Reproducible Python Environments with Conda | 15 of 21 | 71% |
| Objective Evaluation Methodology | 30 of 44 | 68% |
| Cost, Price, and Quality Tradeoffs | 20 of 30 | 66% |
| Inference Servers | 15 of 24 | 62% |
| Selecting and Installing an Open-Weight Model | 12 of 22 | 54% |
| Small Language Models | 14 of 28 | 50% |
| NVIDIA DGX Hardware Architecture | 14 of 28 | 50% |
| Secure Remote Access with Tailscale | 17 of 39 | 44% |
| Prerequisite Skills | 2 of 5 | 40% |
| Local SLMs Versus Cloud LLM Services | 8 of 21 | 38% |
| AI Agent Harnesses and Skills | 8 of 24 | 33% |

## Readability

| Metric | Result |
|---|---|
| Flesch-Kincaid grade level of the definitions | 10.5 |
| Average sentence length | 19.0 words |

A grade level near 10 suits the audience of technical professionals, who read
tool and command names fluently. The figure is a rough estimate from a
syllable-counting heuristic.

## Content Safety Checks

The book is public and the device under test is real, so the glossary was
scanned for the details listed in the repository's security rules.

| Check | Result |
|---|---|
| IPv4 or IPv6 addresses outside the documentation range | 0 |
| MAC-address-like strings, token-like strings, or tailnet names | 0 |
| Home-directory paths, `user@host` strings, or password assignments | 0 |
| Dollar signs (rendered as math by the site) | 0 |
| Placeholders used | `<dgx-host>`, `<user>`, `<tailnet-name>.ts.net`, `100.x.y.z`, `192.0.2.0/24` |

## Recommendations

- **Add examples where coverage is lowest.** Local SLMs Versus Cloud LLM
  Services, AI Agent Harnesses and Skills, and Prerequisite Skills sit below
  45%. These are mostly definitional terms, so the gap is acceptable, but an
  example would help a reader meeting an agent-harness term for the first time.
- **Re-read the book-coined terms after the chapters change.** Entries such as
  Standing Approval Answer, Text-Emitted Tool Call, and Data Egress Trace were
  written to match how the chapters use them. If a chapter redefines one of
  these, update the entry in the same change.
- **Keep model entries free of results.** Test outcomes are provisional, so the
  candidate-model entries describe identity and role only. A rewrite that adds
  speeds or rankings would put provisional numbers in a permanent reference.
- **Run a human review of precision.** The 20-entry spot check is not a
  substitute for the Primary Author reading the entries in their own topic
  areas.
