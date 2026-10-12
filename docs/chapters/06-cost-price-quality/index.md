---
title: "Cost, Price, and Quality"
description: "Cost, price, and quality kept apart: fixed and variable costs, capital cost, depreciation, labor, electricity, utilization, total cost of ownership, break-even volume, margin versus markup, and sensitivity analysis."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 23:02:20"
version: 1.11
---

# Cost, Price, and Quality

## Summary

This chapter keeps three terms separate: cost is what owning hardware takes, price is what a provider charges, and quality is how good the output is. It builds fixed and variable costs, depreciation, total cost of ownership, utilization, and break-even volume into a cost model. Students finish able to frame a local-versus-cloud comparison without mixing the three terms.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Administrator Privileges | 29 |
| System Administrator | 14 |
| Idle Power Draw | 1 |
| Price | 8 |
| Cost | 66 |
| Per-Token Pricing | 2 |
| Subscription Pricing | 1 |
| Per-Seat Pricing | 1 |
| Fixed Costs | 19 |
| Variable Costs | 13 |
| Capital Cost | 11 |
| Administration Time | 10 |
| Electricity Cost | 8 |
| Quality | 7 |
| Profit Margin | 3 |
| Cost Model | 11 |
| Total Cost of Ownership | 7 |
| Utilization Rate | 6 |
| Depreciation | 2 |
| Break-Even Volume | 1 |
| Setup Labor | 1 |
| Operations Labor | 1 |
| Margin Versus Markup | 1 |
| Hardware Lifespan | 1 |
| Sensitivity Analysis | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Prerequisites and the Intelligent Textbook](../01-intro-intelligent-textbooks/index.md)
- [Chapter 2: Learning Graphs, MicroSims, and Content Generation Rules](../02-learning-graphs-microsims-rules/index.md)
- [Chapter 3: Small Language Models](../03-small-language-models/index.md)
- [Chapter 4: Local SLMs Versus Cloud LLM Services](../04-local-versus-cloud/index.md)
- [Chapter 5: NVIDIA DGX Hardware Architecture](../05-dgx-hardware-architecture/index.md)

---

!!! mascot-welcome "Three Words That Get Mixed Up"
    ![Tera waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    "Is the local machine cheaper?" sounds like one question, and it is at least three. By the end of this chapter you will be able to build a cost model for a DGX and say what it does and does not tell you. Measure first, then decide!

## What This Chapter Covers

Chapter 4 introduced a rule that the rest of the course depends on: **cost**, **price**, and **quality** are three different things, and a sentence that blurs them cannot be answered. This chapter turns the rule into a calculation. It defines each term, lists what goes into a cost, and builds a model that turns a purchase price and a list of assumptions into a number per textbook.

The numbers come from the project's own [cost analysis](../../appendices/cost-analysis.md), and each calculation here uses the same figures so that the two pages agree. They are estimates built on assumptions, and the chapter says which is which. Chapter 22 reuses the model to produce a cost per textbook from measured run times.

## The Three Terms

### Cost

**Cost** is what you pay to own and operate something: the money, time, and effort that go out of your organization to produce a result. It belongs to whoever bears it. When you generate a book on your own hardware, the cost is the share of the hardware, setup labor, electricity, and administration that the book uses up.

Cost is built by adding parts, so the first step in any cost question is to list the parts. The reference case from the cost analysis shows what the parts are for one DGX Spark-class unit used for textbook generation over a year.

| Part | Calculation | Per year |
|---|---|---|
| Hardware | ($6,950 + $250) spread over 3 years | $2,400 |
| Setup labor | 40 hours × $90, spread over 3 years | $1,200 |
| Electricity | 832 kWh × $0.1385 | $115 |
| Operations labor | 4 hours a month × 12 months × $90 | $4,320 |
| Network and space | $20 × 12 months | $240 |
| **Total** | | **$8,275** |

Two things are worth noticing before the next definitions. First, the largest items are people's time, which together are two thirds of the total, and the smallest is electricity, at about one percent. Second, every row is an assumption except the date of the hardware's list price, so the total is a model's output, not a measurement.

### Price

**Price** is what a provider charges you for a service. It is set by the provider, and it covers the provider's own costs and a profit. You pay a price whether or not you ever learn what it cost the provider to deliver, and a price can rise or fall for reasons unrelated to cost, such as competition or demand.

A cloud model's price is the number you compare against your own cost. The comparison is fair only when both sides cover the same work, which is why Chapter 4's cloud baseline exists. A cost of $53 per book on your own machine and a price of $20 per book from a service are not directly comparable unless the service produces the same book to the same standard.

### Quality

**Quality** is how good the output is. It is neither a cost nor a price, and it is the term most often left out of a comparison. A local model that costs half as much and writes a learning graph with 40 duplicate labels has not saved half. It has produced something that must be redone or reviewed at further cost.

This course measures quality directly. Chapter 20 builds the scoring methods, and Chapter 22 combines quality with cost into a quality-adjusted figure. In this chapter the point is only that a cost model without a quality statement is incomplete.

!!! mascot-thinking "Ask Which of the Three It Is"
    ![Tera thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    When a claim says something is cheap, expensive, or good, put it through one test: is this what someone pays to own it, what someone charges for it, or how well it works? Most comparisons that look contradictory are two people answering different questions.

#### Diagram: Cost, Price, and Quality Sorter


<iframe src="../../sims/cost-price-quality-sorter/main.html" width="100%" height="424px" scrolling="no"></iframe>
[Run Cost, Price, and Quality Sorter Fullscreen](../../sims/cost-price-quality-sorter/main.html)

<details markdown="1">
<summary>Cost, Price, and Quality Sorter</summary>
Type: microsim
**sim-id:** cost-price-quality-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/cost-quality-pareto-frontier<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of 10 statements about generating a textbook as describing a cost, a price, or a quality, with at least 9 of 10 correct.

**Prerequisites:** cost, price, quality (defined in the section above this block).

**Evidence of Mastery:** For each of the 10 statements the learner commits one label, "Cost", "Price", or "Quality", before the sim reveals the answer. A label is correct when it equals the Correct label column. Mastery is 9 of 10 correct on the first attempt. Reading a statement is exploration, not evidence.

**Misconceptions:** (1) A number in dollars must be a price. (2) A service's charge tells you what delivering the service costs it. (3) A generated text that builds without errors is good.

**Instructional Rationale:** Classifying a statement shows the learner has constructed the distinction, and mixed items in dollars and in non-money terms prevent a shortcut based on the unit of the number. Committing before the reveal separates understanding from recognition.

**Content:**

| # | Statement shown to the learner | Correct label | Why (shown as feedback) |
|---|---|---|---|
| 1 | The unit used about 832 kWh of electricity in a year. | Cost | It is what the owner spends to operate the machine. |
| 2 | A provider charges a fixed fee for each million tokens generated. | Price | It is what a provider asks of a customer for a service. |
| 3 | The generated learning graph has 200 concepts and no dependency cycles. | Quality | It describes how good the output is. |
| 4 | Setting up the machine took 40 hours of labor at $90 an hour. | Cost | It is effort the owner spends to put the machine into use. |
| 5 | A subscription lets one user generate chapters for a flat monthly amount. | Price | It is the provider's charge for access to a service. |
| 6 | A reviewer found every worked example in the chapter correct. | Quality | It describes how good the output is. |
| 7 | The hardware loses its value evenly over three years. | Cost | Depreciation is what owning the asset uses up. |
| 8 | A service adds a 20% margin to what it costs the service to generate a book. | Price | The margin is part of what the provider charges. |
| 9 | Chapter prose stays at the stated reading level across 10,000 words. | Quality | It describes how good the output is. |
| 10 | An uninterruptible power supply and cabling add $250 to the purchase. | Cost | It is spent by the owner to run the machine. |

**Provenance:** The statements are synthetic, written for this exercise, and the sim labels them "synthetic example". Numeric values match the cost analysis page and the sections of this chapter.

**Rules:** Statements are shown in the fixed order 1 to 10. Each statement allows exactly one label, and the label is final. A statement is correct when its label equals the Correct label column.

**Learner Activity:**

1. The learner reads statement 1.
2. The learner chooses "Cost", "Price", or "Quality" and confirms.
3. The sim shows the correct label and the Why text, and marks the statement correct or incorrect.
4. The learner repeats for statements 2 to 10. After statement 10 the sim shows the score and, for each miss, the misconception behind it.

**Feedback:** Ten statements, fixed order, one confirmed label each, no second attempt. Correct: "Correct" followed by the Why text. Incorrect: "Not quite" followed by the correct label and the Why text. The final score reads "n of 10 correct".

**Starting State:** Statement 1 is shown with no label chosen, and the question on screen is "Is this a cost, a price, or a quality?"

**Chapter Anchors:** The chapter states that cost is what you pay to own and operate, price is what a provider charges, and quality is how good the output is, and that these are three different things.
</details>

## How Providers Charge

### Per-Token Pricing

**Per-token pricing** charges for each unit of text the model reads or writes, usually quoted per million tokens, with separate rates for input and output. It makes the price proportional to use, so a small job costs little and a large one costs a lot. For textbook generation the bill follows the length of the conversation, because a harness resends a growing context on every turn.

### Subscription Pricing

**Subscription pricing** charges a flat amount for each period, usually a month, for access up to a usage limit. The user pays the same whether the month was busy or quiet, and the provider decides what happens at the limit. It suits steady individual use, and it makes a heavy job depend on the plan's cap.

### Per-Seat Pricing

**Per-seat pricing** charges for each person who has access, commonly for a team or an organization. The price grows with the number of users and not with the amount of text. It suits tools used by many people lightly, and it is a poor match for one automated pipeline that does a great deal of work through a single seat.

The table below sets the three side by side, using the question that matters most for a planner: what makes the bill rise?

| Model | The bill rises with | Predictable? | Fits best |
|---|---|---|---|
| Per-token | Tokens read and written | Only if you can estimate tokens | Variable, automated work |
| Subscription | Time | Yes, up to the cap | One user, steady use |
| Per-seat | People with access | Yes | Many users, light use each |

## What Goes Into a Cost

### Capital Cost and Hardware Lifespan

**Capital cost** is the one-time money spent to acquire an asset that lasts, as opposed to money spent on running it. For this evaluation it is the hardware plus its accessories: $6,950 for the unit and $250 for a power supply and cabling, or $7,200. **Hardware lifespan** is how long you expect the asset to be useful, and it decides how widely the capital cost is spread. The cost analysis assumes three years and no resale value.

### Depreciation

**Depreciation** is the allocation of an asset's capital cost across the years of its useful life. The simplest method divides evenly, which is what the cost analysis does: $7,200 over 3 years is $2,400 a year. The method is a convention and not a measurement, because a machine does not actually lose a third of its value each year. It is useful because it lets an annual cost model include the purchase without a lump of $7,200 in year one.

The lifespan assumption moves the answer. Stretching the same unit's life to five years drops the depreciation of the hardware and setup together, and the cost per book falls from $53 to $44 in the cost analysis. A shorter life, because a newer model makes the unit obsolete sooner, raises it.

### Setup Labor and Operations Labor

**Setup labor** is the effort to get the system running: connecting it, taking the inventory, installing the server, building the container, and testing candidate models. The cost analysis assumes 40 hours. **Operations labor** is the continuing effort afterward: updates, new models, restarting runs that failed. It assumes 4 hours a month. The labor rate is $90 an hour, assumed as a full cost for a technical employee.

Setup labor is a one-time cost, so it joins the capital cost and is spread over the lifespan. Operations labor recurs, so it is an annual cost on its own. The distinction matters because the two respond to different decisions: a better install script reduces setup labor, and a more stable server reduces operations labor.

### Administration Time

**Administration time** is the labor of someone who keeps the system running for others, such as granting access, applying updates, and restarting a machine that stopped responding. In this evaluation that person was not the person doing the benchmark. It is a cost to whoever bears it, even when no invoice is sent. A unit that freezes and needs a restart by its administrator has a real cost that appears in nobody's budget, and a cost model should name it.

### Electricity Cost

**Electricity cost** is the energy the system consumes times the price of that energy. The cost analysis uses 150 W while generating, 40 W while idle, and $0.1385 per kWh, the U.S. commercial average for the year to July 2026. **Idle power draw** is the electricity used while the machine is on and doing no work. It matters because a machine used half the time idles the other half, so its yearly energy has two terms.

The arithmetic is short enough to do by hand, and doing it once is worthwhile.

```text
generating hours per year = 8,760 × 0.50 = 4,380
idle hours per year       = 4,380

energy = (4,380 h × 150 W + 4,380 h × 40 W) ÷ 1,000
       = (657,000 + 175,200) ÷ 1,000
       = 832 kWh

cost   = 832 kWh × $0.1385 per kWh = $115
```

!!! mascot-tip "Do the Electricity Sum Early"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Teams often worry about the power bill of a GPU machine and then find it is about a hundred dollars a year. Work it out before the meeting. The real cost drivers are almost always the labor and the hours the machine sits unused.

## Who Keeps the Machine Running

### System Administrator

A **system administrator** is the person responsible for a machine's configuration, security, and availability. They decide who gets an account, which software is installed system-wide, when the machine is updated, and what happens when it stops responding. On a machine that is not yours, that person is a dependency of your project, and their time is a cost.

The two DGX units in this evaluation belong to the Administrator, who created the account that the Primary Author uses and who restarted a unit each time it stopped responding. A cost model for this project that counts only the Primary Author's hours understates the work. This is why the administration time above is listed as its own row, even when the person doing it sends no invoice.

### Administrator Privileges

**Administrator privileges** are the right to change system-wide settings: installing software for all users, changing the driver, opening network ports, and managing accounts. On Linux this means `root` access, usually through the `sudo` command. A standard account has none of it.

The effect on the evaluation was large and specific. The benchmark account had no administrator privileges, so every tool was installed into a home directory from a release archive, and nothing was changed system-wide. When the account needed to run containers, it required membership in the `docker` group, which is equivalent to administrator access on that machine and therefore a decision only the Administrator could make. Each such step is a request, and each request has a delay.

| Action | Needs administrator privileges? | What this evaluation did |
|---|---|---|
| Install a model server for one user | No | Unpacked a release archive into the home directory |
| Install a system package | Yes | Avoided it, or asked the Administrator |
| Use Docker | Yes, via group membership | The Administrator added the account to the group |
| Change the NVIDIA driver | Yes | Never attempted |
| Restart a frozen machine | Yes, or physical access | The Administrator did it |

## Fixed and Variable Costs

### Fixed Costs

**Fixed costs** are costs that stay the same regardless of how much you produce. The unit's depreciation, the setup labor, and the monthly operations labor are the same in a year with 10 books and a year with 150. A machine that sits idle costs what a busy machine costs.

In the reference case, the fixed costs are nearly the whole bill: about $8,160 of the $8,275 a year. This is the single most important structural fact about local generation. The cost of one more book is close to zero, and the cost of owning the machine is large and unavoidable.

### Variable Costs

**Variable costs** change in proportion to how much you produce. For local generation the one variable cost is the electricity used while generating. A whole book takes about 28 hours of generation in the reference case, which at 150 W is 4.2 kWh, or about $0.58 at $0.1385 per kWh. A cloud service has the opposite structure: its price is almost entirely variable, because you pay per token or per seat and nothing when you do not use it.

The contrast gives the two options their different risks, and it is worth setting out side by side.

| | Local generation | Per-token cloud service |
|---|---|---|
| Fixed cost per year | High, about $8,275 | None |
| Variable cost per book | Very low, about $0.58 | The price per book |
| Cost if you make no books | Still $8,275 | $0 |
| Cost per book as volume rises | Falls | Stays constant |

### Utilization Rate

**Utilization rate** is the share of available time that the machine spends doing useful work. It is the lever that fixed costs ride on: the same $8,275 spread over more books gives a lower cost per book. The cost analysis assumes the unit generates 50% of the hours in a year, which allows for waiting for orders, failed and repeated runs, and maintenance.

The figures from the analysis show how strongly utilization moves the result.

| Utilization | Books per year | Cost per book |
|---|---|---|
| 75% | 235 | $35 |
| 50% (reference) | 156 | $53 |
| 25% | 78 | $105 |
| 10% | 31 | $263 |

At 10%, the machine is a bad purchase for this job. The cost does not rise because the machine got worse. It rises because the same fixed cost is shared among a fifth as many books.

## Putting the Parts Together

### Cost Model

A **cost model** is a written set of assumptions and formulas that turns inputs into a cost figure. Its value is that the assumptions are explicit, so a reader can see which one to dispute. A model is not a measurement, and the right response to a surprising output is to inspect an assumption, not to trust the number more.

The function below is the reference case as a program. The parameters are, in order: the hardware price, the accessories, the hours of setup labor, the hourly labor rate, the lifespan in years, the hours of operations labor each month, the monthly network and space cost, the energy used in a year, and the electricity price.

```python
def annual_cost(hardware, accessories, setup_hours, rate, life_years,
                ops_hours_per_month, network_per_month, kwh, price_per_kwh):
    depreciation = (hardware + accessories) / life_years
    setup = setup_hours * rate / life_years
    operations = ops_hours_per_month * 12 * rate
    network = network_per_month * 12
    electricity = kwh * price_per_kwh
    return depreciation + setup + operations + network + electricity

print(round(annual_cost(6950, 250, 40, 90, 3, 4, 20, 832, 0.1385)))   # 8275
```

A worked per-book figure follows from it. At 50% utilization the unit generates for 4,380 hours a year, so each generating hour costs $8,275 ÷ 4,380, or $1.89. A whole book that takes 28 hours of generation then costs 28 × $1.89, or about $53.

### Total Cost of Ownership

**Total cost of ownership**, or TCO, is every cost of acquiring and running an asset over its whole life. It differs from the yearly cost in that it includes the one-time costs at full size, so it answers "what do I commit to?" and not "what does a year cost?". For the reference case over three years:

```text
purchase and accessories      $7,200
setup labor (40 h × $90)      $3,600
3 years of running            3 × $4,675  = $14,025
                              -----------
total cost of ownership       about $24,825
```

The three-year TCO equals three times the annual figure of $8,275, which is what spreading the one-time costs over the lifespan means.

### Break-Even Volume

**Break-even volume** is the amount of production at which two options cost the same. Below it the option with the lower fixed cost wins, and above it the option with the lower variable cost wins. For a local machine against a per-book price, it is the fixed cost divided by the saving on each book:

\[ N^* = \frac{F}{P - v} \]

where \( N^* \) is the break-even number of books a year, \( F \) is the local fixed cost for the year, \( P \) is the price per book of the alternative, and \( v \) is the local variable cost per book. The formula has no answer when \( P \le v \), because the alternative is then cheaper at every volume.

A worked example uses illustrative prices, not quotes from any provider. With \( F = \$8{,}275 \) and \( v = \$0.58 \):

| Alternative price per book | Break-even books per year | Reachable by one unit at 156 books a year? |
|---|---|---|
| $100 | 83 | Yes |
| $50 | 167 | No |
| $20 | 426 | No |

The last column is the point most often missed. A break-even volume above what the machine can produce is not a target to grow into. It means that against that alternative, one unit does not break even at any volume it can reach.

!!! mascot-warning "Break-Even Has a Ceiling Too"
    ![Tera warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A break-even formula can return a volume the hardware cannot produce, and the spreadsheet will not warn you. Always compare the result with the machine's capacity in books per year, which is the generating hours divided by the hours per book.

#### Diagram: Local Versus Cloud Break-Even Explorer


<iframe src="../../sims/local-break-even-explorer/main.html" width="100%" height="706px" scrolling="no"></iframe>
[Run Local Versus Cloud Break-Even Explorer Fullscreen](../../sims/local-break-even-explorer/main.html)

<details markdown="1">
<summary>Local Versus Cloud Break-Even Explorer</summary>
Type: microsim
**sim-id:** local-break-even-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the break-even volume of a local machine against a per-book price to within 1 book for 3 challenges, and state whether one unit can reach it.

**Prerequisites:** fixed costs, variable costs, break-even volume, utilization rate (all defined in the sections above this block).

**Evidence of Mastery:** For each of the 3 challenges the learner types a break-even volume in books per year and chooses "Reachable" or "Not reachable" before the sim reveals the answer. A challenge is correct when the typed value is within 1 of the model value and the reachability choice matches. Mastery is 3 of 3. Changing the sliders in exploration is not evidence.

**Misconceptions:** (1) Local generation is always cheaper than a service. (2) A break-even volume can always be reached by producing more. (3) A machine that is idle costs nothing.

**Instructional Rationale:** Apply-level calculation needs the learner to commit a number from a stated formula before seeing the answer, and the reachability question confronts the misconception that a computed volume is always attainable. Free exploration after the challenges lets the learner see how each input moves the result.

**Content:**

The learner can change four quantities:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Yearly fixed cost F | 2,000 | 20,000 | 25 | 8,275 | dollars a year |
| Price per book of the alternative P | 5 | 300 | 5 | 100 | dollars per book |
| Local variable cost per book v | 0 | 5 | 0.01 | 0.58 | dollars per book |
| Local capacity | 20 | 400 | 1 | 156 | books a year |

The three challenges, in this order:

| # | F | P | v | Capacity | Model break-even | Reachable | Feedback when wrong |
|---|---|---|---|---|---|---|---|
| 1 | 8,275 | 100 | 0.58 | 156 | 83.2 | Yes | N = 8,275 ÷ (100 − 0.58) = 83.2, which is below the capacity of 156. |
| 2 | 8,275 | 50 | 0.58 | 156 | 167.4 | No | N = 8,275 ÷ (50 − 0.58) = 167.4, which is above the capacity of 156, so one unit cannot reach it. |
| 3 | 4,000 | 40 | 0.58 | 156 | 101.5 | Yes | N = 4,000 ÷ (40 − 0.58) = 101.5, which is below the capacity of 156. |

**Provenance:** F, v, and capacity in challenges 1 and 2 are the reference-case values from the cost analysis page. The prices P are illustrative, and the sim labels them "illustrative, not a provider quote". Challenge 3 uses an illustrative F, labeled the same way.

**Rules:** Break-even N = F ÷ (P − v) when P > v, shown to one decimal. When P ≤ v, the sim shows "no break-even: the alternative is cheaper at every volume". Reachable when N ≤ capacity. The annual local cost at volume V is F + v × V, and the annual alternative cost is P × V. For V above capacity the sim shows "needs another unit" in place of a local cost.

**Learner Activity:**

1. The learner reads challenge 1 (F, P, v, and capacity are shown) and types a break-even volume.
2. The learner chooses "Reachable" or "Not reachable" and presses Check.
3. The sim reveals the model value and the Feedback text, and marks the challenge correct or missed.
4. After all three challenges the free-exploration mode unlocks, where the learner changes each of the four quantities and watches the break-even and the two annual cost lines update.
5. In exploration the learner should notice that lowering F moves break-even down, and that lowering capacity can turn "Reachable" into "Not reachable" without changing the break-even.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: break-even is <model value> books a year." Incorrect: the "Feedback when wrong" text for that challenge. After the second wrong attempt the model value and the worked calculation are shown, and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** Challenge 1 is shown with an empty answer box and the four values at their defaults. The question on screen is "At what volume does the local machine cost the same as the alternative?"

**Chapter Anchors:** The chapter's worked example uses F = $8,275, v = $0.58, and capacity 156 books a year, and states break-evens of 83, 167, and 426 books a year at prices of $100, $50, and $20.
</details>

## Setting a Price

### Profit Margin

**Profit margin** is the share of a price that is profit: the price minus the cost, divided by the price. A provider that wants a 20% margin on a book that costs it $53 must charge enough that 20% of the price is profit, so the price is the cost divided by 0.80, which is $66.

### Margin Versus Markup

**Markup** is the same gap measured against the cost instead of the price: the price minus the cost, divided by the cost. The two sound interchangeable and give different prices, and the difference is large enough to matter in a business case.

| Method | Calculation | Price | Resulting margin |
|---|---|---|---|
| 20% margin | $52.92 ÷ (1 − 0.20) | $66.15 | 20% |
| 20% markup | $52.92 × 1.20 | $63.50 | 16.7% |

A seller who intends a 20% margin and applies a 20% markup earns 16.7%. On a thousand books that is a difference of about $2,650.

### Sensitivity Analysis

**Sensitivity analysis** is changing one assumption at a time and recording how the output moves, so you learn which assumptions the answer depends on. It is the right response to an estimate built on guesses: instead of arguing about each guess, find the ones that matter.

The cost analysis page ran it on the reference case. Each row changes one assumption and holds the others.

| Change | Cost per book | Price at 20% margin |
|---|---|---|
| Reference case | $53 | $66 |
| Operations labor of 8 hours a month | $81 | $101 |
| No operations labor | $25 | $32 |
| Hardware at $9,000 | $57 | $72 |
| Hardware at the launch price of $3,999 | $47 | $58 |
| The three stages are 5% of the book | $106 | $132 |

The result is a ranking of what to worry about. Labor and the share of the book that the benchmark's three stages represent move the answer by as much as a factor of two. The hardware's price moves it by about ten percent. A planner who spent a week negotiating hardware price and an hour on the labor estimate had their effort the wrong way round.

!!! mascot-tip "Change One Thing at a Time"
    ![Tera giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you vary two assumptions together, you cannot say which one moved the answer. Vary one, record the result, restore it, then vary the next, and the table you end with tells you where to spend your attention.

## Chapter Summary

Cost is what owning and operating costs you, price is what a provider charges, and quality is how good the output is, and a comparison needs all three stated. A cost model adds capital cost spread by depreciation, setup and operations labor, administration time, and electricity, and it separates fixed costs, which are nearly the whole bill for a local machine, from variable costs, which are nearly the whole bill for a per-token service. Utilization decides how far the fixed cost is spread. Break-even volume compares the two structures, and it must be checked against what one machine can produce. Margin and markup give different prices, and sensitivity analysis shows which assumptions deserve your attention.

!!! mascot-celebration "You Can Price the Machine Honestly"
    ![Tera celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now separate cost from price from quality, build an annual cost model from a purchase price, and find where a local unit breaks even against a service. Chapter 7 starts the hands-on work by reaching the machine securely.
