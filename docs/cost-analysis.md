---
title: 'Cost Analysis: What a Locally Generated Textbook Costs'
description: 'An estimate of the cost to buy, set up, and run one DGX system for textbook generation, the cost per textbook for each candidate model, and the price a generation service would need for a 20% profit margin, with every assumption listed.'
---

# Cost Analysis

This page estimates what a textbook costs when one DGX system generates it. It
adds up the cost to buy the system, set it up, and run it, and spreads that
cost over the books the system can produce. It then works out what a
book-generation service would have to charge to keep a 20% profit margin.

Under the assumptions below, one unit costs about $8,300 a year to own and
run. With the reference model, a whole textbook takes about 28 hours of
machine time and costs about $53, so the service would have to charge about
$66. Across the ten candidate models the price runs from about $40 to about
$216.

!!! warning "An estimate built on one measured run"

    Only one model has finished one benchmark stage, and no model has
    generated a whole book on this hardware. Nobody has judged the quality of
    any output. Every time on this page except that one stage is calculated
    from assumptions. Treat the dollar figures as a model to adjust, not as a
    result.

## Assumptions

Dan, the author, set two of these assumptions: the three benchmark stages are
10% of the cost of a whole book, and the service keeps a 20% profit margin.
Claude, the AI assistant that wrote this page, chose the others.

### Purchase and Setup

| Assumption | Value | Basis |
|---|---|---|
| Hardware price | $6,950 | NVIDIA's list price for a 128 GB DGX Spark in October 2026. It was $3,999 at launch in October 2025 and $4,699 from February 2026. Partner systems sold for $7,000 to $9,000 |
| Accessories | $250 | An uninterruptible power supply and network cabling. Assumed |
| Service life | 3 years, no resale value | Assumed. The cost is spread evenly over the three years |
| Setup labor | 40 hours | Assumed: 16 hours to connect, take the inventory, install the model server, and build the harness container, then 24 hours to test candidate models and choose one |
| Labor rate | $90 an hour | Assumed, as a full cost with benefits for a technical employee |

### Running

| Assumption | Value | Basis |
|---|---|---|
| Share of hours spent generating | 50% | Assumed. The other half covers waiting for orders, failed and repeated runs, and maintenance |
| Books in progress at once | One per unit | The evaluation ran one model and one session per unit |
| Power while generating | 150 W | A published review measured 60 to 90 W in many model workloads and just under 200 W at most. 150 W is deliberately high. It was not measured at the wall on these units |
| Power while idle | 40 W | The same review measured 40 to 45 W |
| Electricity price | $0.1385 per kWh | The U.S. average commercial price for the 12 months ending July 2026 |
| Operations labor | 4 hours a month | Assumed: updates, new models, and restarting runs that fail |
| Network and space | $20 a month | Assumed share of an existing office's internet and floor space |

### Workload

| Assumption | Value | Basis |
|---|---|---|
| Book size | 200 concepts, 13 chapters, 55,000 words of chapter text | The published Algebra I book that the benchmark uses as its reference for scale |
| Tokens generated in the three stages | 200,000 | The chapter text is about 73,000 tokens at 1.33 tokens per word. The rest is an allowance for the learning graph, the chapter outlines, reasoning, tool calls, and rewrites |
| Turns in the three stages | 280 | 55 measured in stage 1, 30 assumed for stage 2, and 15 assumed for each of 13 chapters in stage 3 |
| Overhead per turn | 15 seconds | Assumed, for reading the new part of the prompt and running the tool. `gemma4:26b` read 3,000 prompt tokens a second |
| Overhead per turn, `qwen3.8:27b` | 90 seconds | Measured: the server re-read the conversation on every turn, which added one to two minutes |
| Share of the book in the three stages | 10% | Dan's assumption. The learning graph, chapter design, and chapter content are one tenth of the cost. MicroSims, the glossary, the FAQ, quizzes, and references are the rest |
| Profit margin | 20% of the price | Dan's assumption |

## Purchase, Setup, and Running Costs

Buying and setting up one unit takes $10,800 before the first book: $7,200 for
the hardware and accessories, and $3,600 for 40 hours of setup labor.

Spread over three years and added to the running costs, one unit costs $8,275
a year.

| Cost | Calculation | Per year | Share |
|---|---|---|---|
| Hardware | ($6,950 + $250) ÷ 3 years | $2,400 | 29% |
| Setup | 40 hours × $90 ÷ 3 years | $1,200 | 15% |
| Electricity | 832 kWh × $0.1385 | $115 | 1% |
| Operations labor | 4 hours × 12 months × $90 | $4,320 | 52% |
| Network and space | $20 × 12 months | $240 | 3% |
| **Total** | | **$8,275** | 100% |

The electricity figure is 4,380 hours at 150 W plus 4,380 hours at 40 W, which
is 832 kWh a year.

At 50% of the 8,760 hours in a year, the unit generates for 4,380 hours. Each
generating hour therefore costs $8,275 ÷ 4,380, or $1.89.

People are the largest cost. Labor for setup and operations is two thirds of
the total, and electricity is about one percent.

## Models, Sizes, and Speeds

The table lists the ten [model candidates](model-candidates.md) from the
smallest download to the largest. Four speeds were measured in this
evaluation. The other six models have not been run, so each takes the speed of
the tested model it most resembles.

| Model | Parameters | Download | Generation speed | Basis for the speed |
|---|---|---|---|---|
| `devstral-small-2:24b` | 24 billion | 15 GB | 34 tokens/s | Assumed equal to `gemma4:31b` |
| `qwen3.8:27b` | 27 billion | 17 GB | 26 tokens/s | Measured on the longest turn of its stage 1 run |
| `gemma4:26b` | 25.2 billion, 3.8 billion active | 18 GB | 108 tokens/s | Measured: the midpoint of 86 to 130 |
| `muse-glimmer:30b` | 30 billion | 18 GB | 34 tokens/s | Assumed equal to `gemma4:31b` |
| `granite4.2:30b` | about 30 billion, dense | 18 GB | 34 tokens/s | Assumed equal to `gemma4:31b` |
| `gemma4:31b` | 30.7 billion, dense | 20 GB | 34 tokens/s | Measured: the midpoint of 28 to 40 |
| `qwen3.6:35b` | 35 billion, about 3 billion active | 24 GB | 108 tokens/s | Assumed equal to `gemma4:26b` |
| `nemotron-3.5-lightning:30b` | 30 billion, 3 billion active | 25 GB | 108 tokens/s | Assumed equal to `gemma4:26b` |
| `gpt-oss:120b` | 117 billion, 5.1 billion active | 65 GB | 41 tokens/s | Measured: the midpoint of 38 to 44 |
| `mistral-medium-3.5:128b` | 128 billion, dense | 80 GB | 8.5 tokens/s | Assumed: one quarter of `gemma4:31b`, because it has four times the weights to read for each token |

Three rules stand behind the assumed speeds.

- A mixture-of-experts model of about 30 billion parameters, with 3 to 4
  billion active, runs like `gemma4:26b`.
- A model of 24 to 31 billion parameters with no published active count is
  treated as dense and runs like `gemma4:31b`.
- A dense model's speed falls in proportion to the size of its weights.

These rules are rough. The second one predicts 34 tokens a second for
`qwen3.8:27b`, and the measured figure was 26.

Download size has almost no effect on cost. Every model fits in 128 GB, and
memory is paid for whether a model uses it or not. What a larger model costs
is time.

## Time to Generate a Textbook

The time for the three benchmark stages has two parts: the time to generate
the tokens, and the overhead of each turn.

```text
three-stage time = 200,000 tokens ÷ generation speed
                 + 280 turns × overhead per turn

whole-book time  = three-stage time ÷ 10%
```

The unit costs the same for every hour it generates, so a tenth of the cost is
a tenth of the machine time. A whole book takes ten times as long as the three
stages.

The one measured stage checks the overhead figure. Stage 1 for `qwen3.8:27b`
made 55 tool calls. At 90 seconds each that is 83 minutes, and one turn of
reasoning took another 19 minutes. The sum is 102 minutes, which is the time
the stage took.

Many of the models share a speed, so the ten models reduce to six cases.

| Case | Generating | Turn overhead | Three stages | Whole book |
|---|---|---|---|---|
| `gemma4:26b`, and by assumption `qwen3.6:35b` and `nemotron-3.5-lightning:30b` | 31 minutes | 70 minutes | 1.7 hours | 17 hours |
| `gpt-oss:120b` | 81 minutes | 70 minutes | 2.5 hours | 25 hours |
| `gemma4:31b`, and by assumption `devstral-small-2:24b`, `muse-glimmer:30b`, and `granite4.2:30b` | 98 minutes | 70 minutes | 2.8 hours | 28 hours |
| `qwen3.8:27b`, if the re-reading is fixed | 128 minutes | 70 minutes | 3.3 hours | 33 hours |
| `mistral-medium-3.5:128b` | 392 minutes | 70 minutes | 7.7 hours | 77 hours |
| `qwen3.8:27b`, as measured | 128 minutes | 420 minutes | 9.1 hours | 91 hours |

Two things stand out. For the fastest models, turn overhead is longer than
generation, so a faster model saves less than its speed suggests. And the
slowest case is not the largest model. It is a 27-billion-parameter model on a
server that re-reads the conversation on every turn.

## Cost per Textbook and the Price at a 20% Margin

A book's cost is its machine time at $1.89 an hour. The price that leaves a
20% margin is the cost divided by 0.80, because the margin is a share of the
price, not of the cost.

```text
cost per book  = whole-book hours × $1.89
price per book = cost per book ÷ (1 − 0.20)
```

| Case | Whole book | Books per year | Cost per book | Price at a 20% margin |
|---|---|---|---|---|
| `gemma4:26b`, `qwen3.6:35b`, `nemotron-3.5-lightning:30b` | 17 hours | 260 | $32 | $40 |
| `gpt-oss:120b` | 25 hours | 174 | $48 | $60 |
| `gemma4:31b`, `devstral-small-2:24b`, `muse-glimmer:30b`, `granite4.2:30b` | 28 hours | 156 | $53 | $66 |
| `qwen3.8:27b`, if the re-reading is fixed | 33 hours | 133 | $62 | $78 |
| `mistral-medium-3.5:128b` | 77 hours | 57 | $146 | $182 |
| `qwen3.8:27b`, as measured | 91 hours | 48 | $173 | $216 |

Books per year is 4,380 generating hours divided by the hours for one book.

The reference case on this page is `gemma4:31b`. Its speed was measured, it
is near the middle of the four measured speeds, and it is the only model whose
skill runs all ended with a site that builds. It has not finished a benchmark
stage.

In the reference case one unit produces 156 books a year. At $66 each that is
about $10,300 in revenue against $8,275 in cost, which leaves about $2,100 in
profit. A 20% markup on cost is a different and lower number: it gives a price
of $63 and a margin of 16.7%.

Of the $53, electricity is 58 cents.

## What Moves the Answer

Each row changes one assumption in the reference case and leaves the others
alone.

| Change | Cost per book | Price at a 20% margin |
|---|---|---|
| Reference case | $53 | $66 |
| Generating 75% of the time: 235 books a year | $35 | $44 |
| Generating 25% of the time: 78 books a year | $105 | $132 |
| Generating 10% of the time: 31 books a year | $263 | $329 |
| No operations labor | $25 | $32 |
| Operations labor of 8 hours a month | $81 | $101 |
| Hardware at the launch price of $3,999 | $47 | $58 |
| Hardware at $9,000 | $57 | $72 |
| A five-year life for the hardware and setup | $44 | $55 |
| The three stages are 20% of the book | $26 | $33 |
| The three stages are 5% of the book | $106 | $132 |

Nearly all of the cost is fixed, so the cost of a book is close to the yearly
cost divided by the number of books sold. A unit that sells 31 books a year
has to charge five times what a unit that sells 156 does. Demand, labor, and
the 10% share move the price far more than the hardware price does, and the
electricity price hardly moves it at all.

Throughput is the other lever. This analysis has each unit generate one book
at a time. A server that batches several sessions together could produce more
books from the same hardware. vLLM is the candidate named in
[Design Choices](design-choices.md), and it has not been tested.

## What the Price Leaves Out

- **Human review.** The price covers generation only. Ten hours of review by a
  subject expert at the same $90 an hour would add $900, seventeen times the
  cost of generating the book.
- **Stages that have not been run.** The 10% share is an assumption about work
  no local model has attempted here. If a model cannot build working MicroSims,
  the other 90% of the book has no price at all.
- **The cost of selling.** Marketing, customer support, payment fees, and taxes
  are not included.
- **Financing and sales tax** on the hardware.
- **License terms.** A service sells what the model writes. Several candidates
  state no license or attach conditions to commercial use, and the harness's
  terms for this use were not reviewed.
- **Supervision by a cloud model.** In this evaluation a cloud assistant
  started and watched the runs. A service would replace it with scripts, and
  its cost is not counted.

This page does not compare the result with generating the same book in the
cloud. The published Algebra I book was made with cloud models, and no token
counts or timings were kept for it.

## Sources

- Hardware prices: [Nvidia adds 64GB DGX Spark at $4,999 as 128GB model climbs to $6,950](https://www.implicator.ai/nvidia-adds-64gb-dgx-spark-at-4-999-as-128gb-model-climbs-to-6-950/), Implicator, October 4, 2026
- Power draw: [NVIDIA DGX Spark review](https://servethehome.com/nvidia-dgx-spark-review-the-gb10-machine-is-so-freaking-cool/4), ServeTheHome, power consumption page
- Electricity price: a [summary of U.S. Energy Information Administration retail data](https://startbusinessbystate.com/?p=16487), updated September 28, 2026. The official series is in the EIA's [Electric Power Monthly](https://www.eia.gov/electricity/monthly/)
- Model sizes and measured speeds: [Model Candidates](model-candidates.md)
- Reference book size: the [Algebra I benchmark](https://github.com/dmccreary/dgx-eval/blob/main/benchmark/algebra-1/README.md)
