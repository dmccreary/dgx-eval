---
title: 'Appendices: Reference Material for the DGX Evaluation'
description: 'The reference pages behind the evaluation: the setup steps, the testing architecture, the design choices, the model candidates, the cost analysis, the status of each model, and the algorithm that scores generated chapters.'
---

# Appendices

The chapters teach how to run the evaluation. These pages hold the record of
the evaluation itself: what was done to the DGX and how it was wired, which
models were chosen, why the tests were built as they were, what a generated
textbook costs, how far each model has got, and how the generated chapters are
scored.

Several of these pages describe one specific run and will go out of date as more
models finish. Where a page rests on a single measurement or an estimate, it
says so at the top.

## List of Appendices

- **[Getting Started](getting-started.md).** The setup steps this evaluation
  performed, in the order they were done: a conda environment for the tools,
  joining the private network, key-based SSH, and a read-only hardware inventory.
  Every step ends with a test, and every address is a placeholder.
- **[Testing Architecture](testing-architecture.md).** An interactive diagram of
  how the evaluation was wired: one laptop, two home networks, and two DGX
  systems. It separates the orchestrator, the harness, and the model, shows what
  runs inside each DGX, and shows what data crosses each boundary. It leaves out
  every address and login.
- **[Design Choices](design-choices.md).** Each decision behind the testing
  configuration: the choice, the options weighed against it, the reason, and who
  decided. It ends with the choices that did not hold up.
- **[Model Candidates](model-candidates.md).** The ten open-weight models chosen
  for testing on one DGX with 128 GB of unified memory: the parameter count and
  main strength of each, why it was chosen, the first-round results, and the
  models left off the list.
- **[Cost Analysis](cost-analysis.md).** An estimate of what it costs to buy, set
  up, and run one DGX, what one textbook costs with each candidate model, and the
  price a generation service would need for a 20% margin. Every assumption is
  listed.
- **[Evaluation Status](evaluation-status.md).** A table of the ten candidate
  models: parameter count, disk space, which benchmark stages each has finished,
  and which quality scores exist so far.
- **[Chapter Quality Score](chapter-quality-score.md).** The algorithm that gives
  each generated chapter a score from 0 to 100 and each book a consistency score:
  what it measures, why it was built that way, what it trades away, and a link to
  the source code.
