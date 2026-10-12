# Quiz Generation Quality Report

- **Generated:** 2026-10-11
- **Skill:** quiz-generator v0.5
- **Execution mode:** Serial (1 agent)
- **Wall-clock time:** 40 minutes 18 seconds (2026-10-11 19:06:45 to 2026-10-11 19:47:03)

## Overall Statistics

- **Total chapters:** 23
- **Total questions:** 230
- **Average questions per chapter:** 10.0
- **Overall quality score:** 91/100
- **Format errors remaining:** 0
- **Explanations inside the 50-100 word target:** 230 of 230

## How the Quality Score Is Computed

The score is mechanical. It checks structure and balance, and it does not judge whether a question is a good question. That judgment needs a human reviewer.

| Component | Points | Full marks when |
|---|---|---|
| Format | 20 | The validator reports no errors for the quiz file |
| Bloom's distribution | 25 | The level mix matches the target for the chapter type |
| Answer balance | 15 | Each of A, B, C, and D is correct on 20-30% of questions |
| Explanation length | 15 | Every explanation is 50-100 words |
| Concept coverage | 15 | 75% or more of the chapter's concepts are tested |
| Option length | 10 | The correct option is never the single longest option |

## Per-Chapter Summary

| Chapter | Type | Questions | Quality | Bloom's | Concepts tested | Top-8 CIS tested |
|---|---|---|---|---|---|---|
| 1. Prerequisites and the Intelligent Textbook | Introductory | 10 | 93/100 | 23.8/25 | 10 of 19 (53%) | 75% |
| 2. Learning Graphs, MicroSims, and Content Generation Rules | Introductory | 10 | 93/100 | 23.8/25 | 10 of 19 (53%) | 75% |
| 3. Small Language Models | Introductory | 10 | 92/100 | 23.8/25 | 10 of 23 (43%) | 100% |
| 4. Local SLMs Versus Cloud LLM Services | Intermediate | 10 | 92/100 | 23.8/25 | 10 of 19 (53%) | 88% |
| 5. NVIDIA DGX Hardware Architecture | Intermediate | 10 | 89/100 | 23.8/25 | 10 of 27 (37%) | 75% |
| 6. Cost, Price, and Quality | Intermediate | 10 | 90/100 | 23.8/25 | 10 of 25 (40%) | 50% |
| 7. Remote Access, SSH, and Mesh VPN Concepts | Intermediate | 10 | 91/100 | 23.8/25 | 10 of 21 (48%) | 75% |
| 8. Reproducible Python Environments with Conda | Intermediate | 10 | 91/100 | 23.8/25 | 10 of 21 (48%) | 62% |
| 9. Installing Tailscale and Taking a Read-Only Inventory | Intermediate | 10 | 93/100 | 23.8/25 | 10 of 18 (56%) | 88% |
| 10. Python Hardware Probes | Intermediate | 10 | 90/100 | 23.8/25 | 10 of 25 (40%) | 75% |
| 11. Model Sizing and Fit | Intermediate | 10 | 90/100 | 23.8/25 | 10 of 24 (42%) | 62% |
| 12. Selecting and Downloading an Open-Weight Model | Intermediate | 10 | 90/100 | 23.8/25 | 10 of 23 (43%) | 50% |
| 13. Inference Servers and Local API Endpoints | Intermediate | 10 | 90/100 | 23.8/25 | 10 of 25 (40%) | 50% |
| 14. Open-Weight Model Families and Candidate Models | Intermediate | 10 | 93/100 | 23.8/25 | 10 of 18 (56%) | 38% |
| 15. Optimizing Small Language Model Performance | Intermediate | 10 | 91/100 | 23.8/25 | 10 of 22 (45%) | 88% |
| 16. The Agent Loop, Tools, and Context | Intermediate | 10 | 94/100 | 23.8/25 | 10 of 16 (62%) | 50% |
| 17. Agent Skills and Connecting a Harness to a Local Model | Intermediate | 10 | 94/100 | 23.8/25 | 10 of 16 (62%) | 100% |
| 18. Containing the Harness: Containers and Network Boundaries | Intermediate | 10 | 93/100 | 23.8/25 | 10 of 18 (56%) | 62% |
| 19. Designing a Fair Evaluation | Advanced | 10 | 89/100 | 22.5/25 | 10 of 24 (42%) | 75% |
| 20. Scoring, Bias, and Structural Checks | Advanced | 10 | 89/100 | 22.5/25 | 10 of 24 (42%) | 50% |
| 21. Running the Textbook Benchmark | Advanced | 10 | 88/100 | 22.5/25 | 10 of 25 (40%) | 38% |
| 22. Diagnosing Failures, Reporting, and Cost per Textbook | Advanced | 10 | 88/100 | 22.5/25 | 10 of 26 (38%) | 50% |
| 23. Sanitizing Evaluation Artifacts and Publishing the Report | Advanced | 10 | 88/100 | 22.5/25 | 10 of 28 (36%) | 62% |

"Concepts tested" counts distinct learning-graph concepts named in a **Concept Tested** line. "Top-8 CIS tested" is the share of the chapter's eight highest Concept Impact Score concepts that have a question.

## Bloom's Taxonomy Distribution (Overall)

The target is the average of the per-chapter targets: 3 introductory, 15 intermediate, and 5 advanced chapters.

| Level | Questions | Actual | Target | Deviation |
|---|---|---|---|---|
| Remember | 57 | 24.8% | 24.8% | +0.0% |
| Understand | 67 | 29.1% | 29.1% | +0.0% |
| Apply | 60 | 26.1% | 27.0% | -0.9% |
| Analyze | 39 | 17.0% | 15.9% | +1.1% |
| Evaluate | 5 | 2.2% | 2.2% | +0.0% |
| Create | 2 | 0.9% | 1.1% | -0.2% |

### Bloom's Levels by Chapter

| Chapter | Remember | Understand | Apply | Analyze | Evaluate | Create |
|---|---|---|---|---|---|---|
| 1 | 4 | 4 | 1 | 1 | 0 | 0 |
| 2 | 4 | 4 | 1 | 1 | 0 | 0 |
| 3 | 4 | 4 | 1 | 1 | 0 | 0 |
| 4 | 2 | 3 | 3 | 2 | 0 | 0 |
| 5 | 3 | 3 | 3 | 1 | 0 | 0 |
| 6 | 2 | 3 | 3 | 2 | 0 | 0 |
| 7 | 3 | 3 | 3 | 1 | 0 | 0 |
| 8 | 2 | 3 | 3 | 2 | 0 | 0 |
| 9 | 3 | 3 | 3 | 1 | 0 | 0 |
| 10 | 2 | 3 | 3 | 2 | 0 | 0 |
| 11 | 3 | 3 | 3 | 1 | 0 | 0 |
| 12 | 2 | 3 | 3 | 2 | 0 | 0 |
| 13 | 3 | 3 | 3 | 1 | 0 | 0 |
| 14 | 2 | 3 | 3 | 2 | 0 | 0 |
| 15 | 3 | 3 | 3 | 1 | 0 | 0 |
| 16 | 2 | 3 | 3 | 2 | 0 | 0 |
| 17 | 3 | 3 | 3 | 1 | 0 | 0 |
| 18 | 2 | 3 | 3 | 2 | 0 | 0 |
| 19 | 2 | 2 | 2 | 3 | 1 | 0 |
| 20 | 1 | 2 | 3 | 2 | 1 | 1 |
| 21 | 2 | 2 | 2 | 3 | 1 | 0 |
| 22 | 1 | 2 | 3 | 2 | 1 | 1 |
| 23 | 2 | 2 | 2 | 3 | 1 | 0 |

## Answer Balance (Overall)

Answer keys were drawn at random before the questions were written, with each letter correct two or three times per quiz.

| Answer | Questions | Share |
|---|---|---|
| A | 58 | 25.2% |
| B | 57 | 24.8% |
| C | 57 | 24.8% |
| D | 58 | 25.2% |

## Content Readiness

Three readiness checks can be measured from the files. Example coverage and concept clarity were not scored.

- **Word count:** every chapter is over 2,000 words (range 2,881 to 7,725).
- **Learning graph alignment:** 23 of 23 chapters have every concept in their Concepts Covered table present in the learning graph.
- **Glossary coverage:** the book has no glossary yet, so no question could be checked against a glossary definition.

| Chapter | Words | Concepts in chapter |
|---|---|---|
| 1. Prerequisites and the Intelligent Textbook | 7,725 | 19 |
| 2. Learning Graphs, MicroSims, and Content Generation Rules | 5,447 | 19 |
| 3. Small Language Models | 5,910 | 23 |
| 4. Local SLMs Versus Cloud LLM Services | 3,880 | 19 |
| 5. NVIDIA DGX Hardware Architecture | 5,826 | 27 |
| 6. Cost, Price, and Quality | 5,479 | 25 |
| 7. Remote Access, SSH, and Mesh VPN Concepts | 5,042 | 21 |
| 8. Reproducible Python Environments with Conda | 3,657 | 21 |
| 9. Installing Tailscale and Taking a Read-Only Inventory | 3,419 | 18 |
| 10. Python Hardware Probes | 4,287 | 25 |
| 11. Model Sizing and Fit | 4,230 | 24 |
| 12. Selecting and Downloading an Open-Weight Model | 3,732 | 23 |
| 13. Inference Servers and Local API Endpoints | 4,885 | 25 |
| 14. Open-Weight Model Families and Candidate Models | 2,881 | 18 |
| 15. Optimizing Small Language Model Performance | 3,851 | 22 |
| 16. The Agent Loop, Tools, and Context | 3,290 | 16 |
| 17. Agent Skills and Connecting a Harness to a Local Model | 3,765 | 16 |
| 18. Containing the Harness: Containers and Network Boundaries | 3,643 | 18 |
| 19. Designing a Fair Evaluation | 5,326 | 24 |
| 20. Scoring, Bias, and Structural Checks | 4,171 | 24 |
| 21. Running the Textbook Benchmark | 3,981 | 25 |
| 22. Diagnosing Failures, Reporting, and Cost per Textbook | 4,862 | 26 |
| 23. Sanitizing Evaluation Artifacts and Publishing the Report | 4,590 | 28 |

## Recommendations

1. **Have a person review the questions.** The 91/100 score is mechanical. After generation, 48 of the 230 questions were read against the chapter text: all of chapters 11, 14, 22, and 23, and the numeric questions in chapters 6, 15, and 21. Every figure in them matched its chapter. The other 182 questions passed the format checks and were not read a second time.
2. **Concept coverage is below the 75% target.** Ten questions cover 36% to 62% of a chapter's concepts, and 230 of the book's 506 concepts (45%) have a question. An average chapter has 22 concepts, so reaching 75% would take about 17 questions per chapter. A second question set per chapter is the direct fix.
3. **Start a second set with the untested high-impact concepts.** In the eight chapters below, four or more of the eight highest-CIS concepts have no question yet.

    | Chapter | Untested concepts (CIS) |
    |---|---|
    | 6 | System Administrator (14), Variable Costs (13), Capital Cost (11), Administration Time (10) |
    | 12 | Hugging Face Hub (31), Model Download (26), Safetensors Format (3), License Review (3) |
    | 13 | Local API Endpoint (44), Model Loading (20), Ollama (13), Chat Completions Endpoint (13) |
    | 14 | Qwen Family (3), Mistral Family (3), Nemotron Family (2), gpt-oss Family (2), Llama Family (1) |
    | 16 | Turn Overhead (7), File Editing Tool (6), Shell Execution Tool (6), Context Management (6) |
    | 20 | Provisional Results (7), Experimental Design Critique (7), Limitations Statement (6), Human Quality Score (2) |
    | 21 | Pipeline Stage (28), Textbook Benchmark (22), Run Event Stream (7), Benchmark Workspace Template (5), Wall-Clock Time (4) |
    | 22 | Tool Call Count (5), Evaluation Report (5), Malformed Tool Call (3), Context Overflow (2) |

4. **Re-check the definition questions when a glossary exists.** The 57 Remember-level questions take their definitions from the chapter text. Once the glossary is generated, compare the two wordings and correct whichever is wrong.
5. **Regenerate a quiz when its chapter's numbers change.** Many questions quote measured results, such as speeds, run times, and costs. The evaluation is still running, so a chapter edit that updates a figure must be followed by an edit to the question that quotes it.
