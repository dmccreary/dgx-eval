# Quiz: Cost, Price, and Quality

Test your understanding of cost, price, and quality, the parts of a cost model, break-even volume, and sensitivity analysis with these review questions.

---

#### 1. In this book's terms, what is cost?

<div class="upper-alpha" markdown>
1. What a provider charges a customer for a service
2. What you pay to own and operate something
3. How good the output of a model turns out to be
4. What a seller adds to a book's price as profit
</div>

??? question "Show Answer"
    The correct answer is **B**. Cost is what you pay to own and operate something: the money, time, and effort that go out of your organization to produce a result. It belongs to whoever bears it. For a book generated on your own hardware, it is the share of hardware, setup labor, electricity, and administration that the book uses up. What a provider charges is a price, and how good the output is is quality. A comparison needs all three kept apart.

    **Concept Tested:** Cost

    **See:** [Cost](index.md#cost)

---

#### 2. Which statement describes fixed costs?

<div class="upper-alpha" markdown>
1. They rise in proportion to the number of books produced
2. They are charged by a provider for each million tokens
3. They stay the same regardless of how much you produce
4. They are incurred only in the year hardware is purchased
</div>

??? question "Show Answer"
    The correct answer is **C**. Fixed costs stay the same regardless of how much you produce. The unit's depreciation, the setup labor, and the monthly operations labor are the same in a year with 10 books and a year with 150, so a machine that sits idle costs what a busy machine costs. In the reference case they are about $8,160 of the $8,275 a year. Costs that rise with production, such as electricity used while generating, are variable costs.

    **Concept Tested:** Fixed Costs

    **See:** [Fixed Costs](index.md#fixed-costs)

---

#### 3. Why is a cost model without a quality statement incomplete?

<div class="upper-alpha" markdown>
1. Quality determines the electricity that a run consumes
2. Quality sets the price a provider charges per token
3. Poor output must be redone or reviewed at further cost
4. Quality is fixed by the purchase price of the hardware
</div>

??? question "Show Answer"
    The correct answer is **C**. Quality is how good the output is. It is neither a cost nor a price, and it is the term most often left out of a comparison. A local model that costs half as much and writes a learning graph with 40 duplicate labels has not saved half. It has produced something that must be redone or reviewed at further cost. That is why a cost figure needs a quality statement beside it before it supports a decision.

    **Concept Tested:** Quality

    **See:** [Quality](index.md#quality)

---

#### 4. Why does the cost per book rise from $53 to $263 when utilization falls from 50% to 10%?

<div class="upper-alpha" markdown>
1. The machine draws more idle power at low utilization
2. The hardware depreciates faster when it sits unused
3. Operations labor grows as fewer books are generated
4. The same fixed cost is shared among far fewer books
</div>

??? question "Show Answer"
    The correct answer is **D**. Utilization rate is the share of available time the machine spends doing useful work, and it is the lever that fixed costs ride on. At 50% the unit produces 156 books a year at $53 each; at 10% it produces 31 at $263 each. The cost does not rise because the machine got worse. It rises because the same fixed cost, about $8,275 a year, is shared among a fifth as many books.

    **Concept Tested:** Utilization Rate

    **See:** [Utilization Rate](index.md#utilization-rate)

---

#### 5. Why was every tool in this evaluation installed into a home directory from a release archive?

<div class="upper-alpha" markdown>
1. The account had no administrator privileges for system installs
2. Release archives run faster than system-wide packages do
3. DGX OS forbids installing software outside home directories
4. The Administrator required all tools to run inside Docker
</div>

??? question "Show Answer"
    The correct answer is **A**. Administrator privileges are the right to change system-wide settings: installing software for all users, changing the driver, opening network ports, and managing accounts. The benchmark account had none, so every tool was installed into a home directory from a release archive and nothing was changed system-wide. Steps that did need those rights, such as joining the `docker` group, were requests to the Administrator, and each request has a delay.

    **Concept Tested:** Administrator Privileges

    **See:** [Administrator Privileges](index.md#administrator-privileges)

---

#### 6. A unit's annual cost is $8,275 and it generates for 4,380 hours a year, so each generating hour costs about $1.89. What does a book that needs 40 hours of generation cost?

<div class="upper-alpha" markdown>
1. About $47
2. About $53
3. About $76
4. About $207
</div>

??? question "Show Answer"
    The correct answer is **C**. A cost model is a written set of assumptions and formulas that turns inputs into a cost figure. Here the annual cost of $8,275 divided by 4,380 generating hours gives $1.89 per generating hour, and 40 hours × $1.89 is about $76. The $53 figure belongs to the reference book, which takes 28 hours. Dividing the annual cost by 40 confuses hours per book with books per year and gives a meaningless $207.

    **Concept Tested:** Cost Model

    **See:** [Cost Model](index.md#cost-model)

---

#### 7. A book costs $40 to produce. Which price gives the seller a 20% profit margin?

<div class="upper-alpha" markdown>
1. $48
2. $50
3. $44
4. $60
</div>

??? question "Show Answer"
    The correct answer is **B**. Profit margin is the share of a price that is profit: price minus cost, divided by price. For a 20% margin the price is the cost divided by 0.80, so $40 ÷ 0.80 is $50, and the $10 profit is 20% of that price. Multiplying the cost by 1.20 gives $48, which is a 20% markup, measured against cost. That price yields a margin of only 16.7%, less than the seller intended.

    **Concept Tested:** Profit Margin

    **See:** [Profit Margin](index.md#profit-margin)

---

#### 8. A unit generates for 2,000 hours a year at 150 W and idles for the other 6,760 hours at 40 W. About how much energy does it use in a year?

<div class="upper-alpha" markdown>
1. About 570 kWh
2. About 300 kWh
3. About 832 kWh
4. About 1,314 kWh
</div>

??? question "Show Answer"
    The correct answer is **A**. Electricity cost is energy consumed times the price of energy, and a machine that is on but not generating still draws idle power, so yearly energy has two terms. Generating: 2,000 h × 150 W = 300,000 Wh. Idle: 6,760 h × 40 W = 270,400 Wh. Together that is 570,400 Wh, or about 570 kWh. Counting only the generating hours gives 300 kWh and leaves out nearly half of the energy.

    **Concept Tested:** Electricity Cost

    **See:** [Electricity Cost](index.md#electricity-cost)

---

#### 9. In the reference case, changing the hardware price moves the cost per book by about ten percent, while changing operations labor moves it by up to a factor of two. What does this pattern tell a planner?

<div class="upper-alpha" markdown>
1. The hardware price should be negotiated before anything else
2. The labor estimate deserves more scrutiny than the hardware price
3. Both assumptions should be varied together to save time
4. The cost model is too unreliable to support any decision
</div>

??? question "Show Answer"
    The correct answer is **B**. Sensitivity analysis changes one assumption at a time and records how the output moves, so you learn which assumptions the answer depends on. Doubling operations labor raises the cost per book from $53 to $81 and removing it drops it to $25, while hardware price moves it by about ten percent. The ranking shows where attention belongs: on the labor estimate. Varying two assumptions together would hide which one moved the answer.

    **Concept Tested:** Sensitivity Analysis

    **See:** [Sensitivity Analysis](index.md#sensitivity-analysis)

---

#### 10. A break-even calculation returns 426 books a year against a $20 alternative, but one unit can produce only 156 books a year. What does this result mean?

<div class="upper-alpha" markdown>
1. The unit breaks even once demand grows to 426 books
2. The formula is invalid whenever the price is below $50
3. The unit's variable cost per book has been overstated
4. One unit cannot break even at any volume it can reach
</div>

??? question "Show Answer"
    The correct answer is **D**. Break-even volume is the production level at which two options cost the same: the fixed cost divided by the saving on each book. A result above what the machine can produce is not a target to grow into. It means that against that alternative, one unit does not break even at any volume it can reach. The formula gives no warning, so always compare the result with capacity: generating hours divided by hours per book.

    **Concept Tested:** Break-Even Volume

    **See:** [Break-Even Volume](index.md#break-even-volume)
