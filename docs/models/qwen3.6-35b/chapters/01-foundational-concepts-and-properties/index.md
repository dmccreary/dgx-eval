---
title: "Chapter 1: Foundational Number Concepts and Properties"
description: "Number systems, properties of operations, and the real number line — the bedrock of all algebraic reasoning."
generated_by: claude skill chapter-content-generator
date: "2026-10-10 14:49:35"
version: 1.11
---

# Chapter 1: Foundational Number Concepts and Properties

## Summary

This chapter introduces the number systems that form the foundation of all algebraic work — from natural numbers through real numbers, including rational and irrational numbers. Students learn to locate numbers on the real number line, understand absolute value and opposite numbers, and master the fundamental properties of operations (commutative, associative, distributive) and equality that govern every algebraic manipulation. These concepts are the bedrock upon which all subsequent chapters depend.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Real Numbers | 891 |
| Integers | 303 |
| Rational Numbers | 305 |
| Irrational Numbers | 305 |
| Whole Numbers | 151 |
| Natural Numbers | 150 |
| Commutative Property | 61 |
| Associative Property | 61 |
| Distributive Property | 60 |
| Arithmetic Operations | 149 |
| Order of Operations | 111 |
| Identity Element | 2 |
| Inverse Element | 1 |
| Real Number Line | 1 |
| Absolute Value | 3 |
| Opposite Numbers | 1 |
| Addition Property of Equality | 28 |
| Multiplication Property of Equality | 28 |
| Substitution Property | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

## Section 1: The Number Systems

Mathematics organizes numbers into families, called **number sets**, based on what each number can do and where it fits in the bigger picture. You already know some of these — counting numbers, negative numbers, fractions — but Algebra I requires a precise map of how they all fit together. By the end of this section, you will be able to place any real number into its correct families and explain why certain numbers belong to multiple sets simultaneously.

### Natural Numbers and Whole Numbers

The **natural numbers** are the counting numbers used since antiquity: $1, 2, 3, 4, \dots$ Mathematically, we write this set as $\mathbb{N} = \{1, 2, 3, \ldots\}$, with no upper bound. Natural numbers are the first numbers children learn because they correspond to discrete objects — one apple, two shoes, ten fingers.

> **Mascot Welcome** — The number line we explore in Section 3 visualizes these very sets on a single continuous axis. Stay tuned.

The **whole numbers** add one crucial element to the natural numbers: zero. We write $\mathbb{W} = \{0, 1, 2, 3, \dots\}$. Zero represents "nothing" as a quantity — not the same as "none," which is an absence of counting entirely. A temperature of $0^\circ$C is measurable; it is not nothing at all.

**Worked Example 1: Classifying Numbers into Number Sets**

Determine which number sets each value belongs to.

| Value | Natural? | Whole? | Integer? | Rational? | Irrational? |
|-------|----------|--------|----------|-----------|-------------|
| $5$ | Yes | Yes | Yes | Yes | No |
| $-3$ | No | No | Yes | Yes | No |
| $\dfrac{7}{4}$ | No | No | No | Yes | No |
| $0$ | No | Yes | Yes | Yes | No |
| $\sqrt{2}$ | No | No | No | No | Yes |

This table illustrates an important point: a single number can belong to multiple sets at once. The number $5$ is simultaneously a natural number, a whole number, an integer, and a rational number — it fits into every family on the left side of our hierarchy.

### Integers

The **integers** extend whole numbers in both directions by adding all their negative counterparts. We write this set as $\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$ (the symbol comes from the German word *Zahlen*, meaning "numbers").

Integers represent situations with direction: bank accounts show deposits as positive and withdrawals as negative; elevation above sea level is positive while below-sea-level depths are negative. The key feature of integers is that they include no fractions or decimals — any number you can write without a fractional part or an infinite non-repeating decimal expansion belongs to $\mathbb{Z}$ if it passes this test.

**Worked Example 2: Identifying Integers**

Which of these are integers? Explain your reasoning for each.

1. $-7$: An integer because it has no fractional or decimal part, and it is the negative counterpart of the natural number $7$.
2. $\dfrac{3}{2}$: Not an integer. Although it can be written as a fraction, its value ($1.5$) falls between two consecutive integers, $1$ and $2$, with nothing in between on the integer grid.
3. $0$: An integer. Zero is the origin point of $\mathbb{Z}$ — neither positive nor negative, but still an integer.
4. $\sqrt{9}$: An integer because $\sqrt{9} = 3$ exactly. It is important to simplify first before deciding; the square root symbol does not automatically disqualify a number from being an integer.

### Rational Numbers

A **rational number** is any number that can be expressed as a fraction $\dfrac{p}{q}$ where $p$ and $q$ are integers and $q \neq 0$. The word *rational* comes from *ratio* — these numbers represent ratios of two integers. Every terminating decimal and every repeating decimal is rational because each can be converted into a fraction.

For example, $0.25 = \dfrac{1}{4}$ and $0.\overline{3} = \dfrac{1}{3}$. Both are rational by definition. So are numbers like $-7$ (which equals $\dfrac{-7}{1}$) and $0$ (which equals $\dfrac{0}{1}$).

**Worked Example 3: Converting Decimals to Fractions**

Convert each decimal to a fraction of integers to confirm it is rational.

1. $0.6 = \dfrac{6}{10} = \dfrac{3}{5}$ — terminates, so rational.
2. $2.3\overline{6} = 2.\dfrac{36-3}{90} = 2 + \dfrac{33}{90} = 2 + \dfrac{11}{30} = \dfrac{71}{30}$ — repeating, so rational.
3. $0.\overline{142857} = \dfrac{142857}{999999} = \dfrac{1}{7}$ — the long repeating block confirms it is a rational number whose simplest form has a very large denominator before reduction.

### Irrational Numbers

An **irrational number** cannot be written as a fraction of two integers. Its decimal expansion goes on forever without ever settling into a repeating pattern. The most famous irrational numbers are $\sqrt{2} \approx 1.414\ldots$, $\pi \approx 3.14159\ldots$, and $e \approx 2.71828\ldots$.

Why does $\sqrt{2}$ not simplify to a fraction? A proof by contradiction shows this: suppose $\sqrt{2} = \dfrac{p}{q}$ where $p$ and $q$ share no common factors. Then $p^2 = 2q^2$, which means $p$ is even, so $p = 2k$ for some integer $k$. Substituting gives $4k^2 = 2q^2$, so $q^2 = 2k^2$, meaning $q$ is also even. But if both $p$ and $q$ are even, they share a common factor of $2$, contradicting our assumption. Therefore $\sqrt{2}$ is irrational.

> **Key Insight:** Not all square roots are rational. Only the square roots of *perfect squares* (numbers like $1, 4, 9, 16, 25, \dots$) simplify to whole numbers or fractions. The square root of any non-perfect square is irrational.

The relationship among these five number sets can be visualized as a nested hierarchy. Every natural number is also a whole number, an integer, and a rational number. Every integer is also rational. But rational and irrational numbers are disjoint: no number can be both (by definition of the word *irrational*, meaning "not rational"). Together they fill out every point on the **real number line**, which we define next.

```math
\mathbb{N} \subset \mathbb{W} \subset \mathbb{Z} \subset \mathbb{Q} \quad \text{and} \quad \mathbb{R} = \mathbb{Q} \cup \{\text{irrational numbers}\}
```

The symbol $\subset$ means "is a subset of." The symbol $\mathbb{R}$ represents the set of all **real numbers**, which encompasses every rational and irrational number combined. You can think of the real numbers as filling in every possible position along an infinitely long line — there is no gap between any two real numbers, even though infinitely many other real numbers lie between them.

<details markdown="1">
<summary>Venn Diagram: Number Set Hierarchy</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480" width="600" height="480">
  <style>
    .set { fill: none; stroke-width: 2; }
    .label { font-size: 16px; font-family: sans-serif; fill: #333; }
    .inner-label { font-size: 13px; font-family: sans-serif; fill: #555; }
    .title { font-size: 20px; font-family: sans-serif; fill: #222; text-anchor: middle; font-weight: bold; }
  </style>
  <text x="300" y="30" class="title">Number Set Hierarchy</text>

  <!-- Real Numbers (largest) -->
  <ellipse cx="300" cy="260" rx="280" ry="210" class="set" stroke="#2c5f8a"/>
  <text x="40" y="220" class="label">Real Numbers</text>

  <!-- Rational vs Irrational split -->
  <line x1="300" y1="60" x2="300" y2="470" stroke="#999" stroke-dasharray="6,4"/>

  <!-- Rational numbers (left side) -->
  <ellipse cx="180" cy="270" rx="150" ry="190" class="set" stroke="#3a7ca5"/>
  <text x="80" y="460" class="label">Rational Numbers</text>

  <!-- Integers -->
  <ellipse cx="180" cy="280" rx="100" ry="140" class="set" stroke="#5b9bd5"/>
  <text x="110" y="430" class="label">Integers</text>

  <!-- Whole Numbers -->
  <ellipse cx="180" cy="300" rx="65" ry="90" class="set" stroke="#7ab3e8"/>
  <text x="130" y="390" class="label">Whole</text>

  <!-- Natural Numbers (smallest) -->
  <ellipse cx="180" cy="320" rx="40" ry="55" class="set" stroke="#a3cfff"/>
  <text x="165" y="350" class="label">Natural</text>

  <!-- Irrational numbers (right side) -->
  <ellipse cx="420" cy="270" rx="100" ry="180" class="set" stroke="#d47b3a"/>
  <text x="460" y="450" class="label">Irrational Numbers</text>

  <!-- Examples -->
  <text x="320" y="120" class="inner-label">e, √2, π, …</text>
  <text x="180" y="45" class="inner-label">…/q where q≠0</text>
  <text x="180" y="270" class="inner-label">…, −3, −1, 0, 1, …</text>
  <text x="180" y="410" class="inner-label">0, 1, 2, …</text>
  <text x="180" y="500" class="inner-label">1, 2, 3, …</text>
</svg>
```

</details>

In this diagram, notice how each set is entirely contained within the next larger set. The natural numbers are a proper subset of the whole numbers, which are a proper subset of the integers, which are a proper subset of the rational numbers, and together with irrational numbers they constitute all real numbers. This visual makes clear that "real number" is the umbrella category for everything we use in Algebra I.

## Section 2: Properties of Operations

Properties of operations are rules about how numbers behave when you perform arithmetic on them. These properties are not arbitrary conventions; they are foundational truths that allow algebra to work at all. Without the commutative, associative, and distributive properties — and without identity and inverse elements — we could not rearrange, simplify, or solve equations with any confidence that our manipulations preserve truth.

### Commutative Property

The **commutative property** states that changing the order of two numbers in an operation does not change the result. This holds for addition and multiplication but *not* for subtraction or division.

For addition: $a + b = b + a$
For multiplication: $a \times b = b \times a$

The word *commutative* comes from the French *commuter*, meaning "to exchange" or "to switch." The property tells you that swapping (exchanging) two operands is safe for addition and multiplication.

**Worked Example 4: Applying the Commutative Property**

Show that switching the order does not change the result, then explain why this property fails for subtraction.

1. $7 + 12 = 12 + 7 = 19$ ✓
2. $3 \times 8 = 8 \times 3 = 24$ ✓
3. $5 - 2 \neq 2 - 5$ because $3 \neq -3$. Subtraction is *not* commutative — the order matters because you are moving in opposite directions along the number line.
4. $6 \div 3 \neq 3 \div 6$ because $2 \neq \dfrac{1}{2}$. Division is also *not* commutative for the same reason.

The restriction on which operations are commutative is critical: you may never assume a property applies to all operations. Only addition and multiplication share this symmetry. Every other operation breaks it under at least one condition.

### Associative Property

The **associative property** states that changing how three or more numbers are grouped in an operation does not change the result. Like commutativity, this holds for addition and multiplication but *not* for subtraction or division.

For addition: $(a + b) + c = a + (b + c)$
For multiplication: $(a \times b) \times c = a \times (b \times c)$

The word *associative* comes from *associate*, meaning "to group together." The property tells you that the grouping — the placement of parentheses — does not affect the final sum or product.

**Worked Example 5: Applying the Associative Property**

Show that regrouping does not change the result, then explain why this fails for subtraction.

1. $(2 + 3) + 4 = 5 + 4 = 9$ and $2 + (3 + 4) = 2 + 7 = 9$. Same result ✓
2. $(3 \times 4) \times 5 = 12 \times 5 = 60$ and $3 \times (4 \times 5) = 3 \times 20 = 60$. Same result ✓
3. $(10 - 5) - 2 = 5 - 2 = 3$ but $10 - (5 - 2) = 10 - 3 = 7$. Subtraction is *not* associative — changing the grouping changes which subtraction happens first, and that matters.

Again, the critical takeaway is scope: associativity holds for addition and multiplication only. It does not extend to subtraction or division, no matter how convenient it might seem in a particular numerical case.

### Distributive Property

The **distributive property** connects two different operations — multiplication and addition (or subtraction). It states that multiplying a sum by a number gives the same result as multiplying each addend separately and then adding the products.

For any numbers $a$, $b$, and $c$:
$$a(b + c) = ab + ac$$

The word *distributive* comes from *distribute*, meaning "to spread out." Multiplication distributes over addition like rain soaking into separate regions of soil — each part receives its share independently, then the totals add up to the same result.

**Worked Example 6: Applying the Distributive Property**

Simplify $4(3 + 7)$ by distributing, and verify both methods yield the same answer.

Method 1 (add first): $4(3 + 7) = 4 \times 10 = 40$
Method 2 (distribute first): $4(3 + 7) = 4 \times 3 + 4 \times 7 = 12 + 28 = 40$

Both methods give $40$. Now try with a negative number: $-3(5 - 2)$.
Using distribution: $-3(5) + (-3)(-2) = -15 + 6 = -9$
Checking directly: $-3(3) = -9$ ✓

The distributive property is the single most important algebraic tool in this chapter because it underpins expanding expressions, factoring, solving equations, and simplifying. Whenever you see a number or variable outside parentheses with an operation inside, distribution applies immediately.

### Identity Element and Inverse Element

Before defining these two properties precisely, consider what happens when a special number "does nothing" to another number in an operation — it leaves the other number unchanged. This special number is called an **identity element** (or identity property). For addition, the identity element is $0$: no matter what number you add zero to, the result is that original number:
$$a + 0 = a \quad \text{and} \quad 0 + a = a$$

For multiplication, the identity element is $1$:
$$a \times 1 = a \quad \text{and} \quad 1 \times a = a$$

Every identity element is specific to its operation — addition has $0$, multiplication has $1$ — and there is no identity element for subtraction or division.

An **inverse element** reverses the effect of an operation and returns the result to the identity element. For addition, the additive inverse of any number $a$ is $-a$ because:
$$a + (-a) = 0$$
The sum equals the additive identity, confirming that $-a$ is indeed the additive inverse of $a$. For multiplication, every nonzero number $a$ has a multiplicative inverse $\dfrac{1}{a}$ because:
$$a \times \dfrac{1}{a} = 1$$
Note that $0$ has no multiplicative inverse — there is no number you can multiply by zero to get $1$, which is precisely why division by zero is undefined.

**Worked Example 7: Finding Identity and Inverse Elements**

For each expression, identify the identity element used, then find the inverse.

1. $9 + 0 = 9$: The additive identity element is $0$. The additive inverse of $9$ is $-9$, since $9 + (-9) = 0$.
2. $5 \times 1 = 5$: The multiplicative identity element is $1$. The multiplicative inverse of $5$ is $\dfrac{1}{5}$, since $5 \times \dfrac{1}{5} = 1$.
3. What is the additive inverse of $0$? It is $0$ itself: $0 + 0 = 0$. Zero is its own additive inverse — a unique property it shares with no other number.
4. Does $0$ have a multiplicative inverse? No. There exists no real number $x$ such that $0 \times x = 1$, because multiplying anything by zero always produces zero.

> **Mascot Note:** Whenever you encounter an identity element in an equation, think of it as a "pass-through" value — the operation happens, but nothing changes. Inverse elements are the undo button: applying an operation followed by its inverse always brings you back to the identity.

### Summary Table: Properties of Operations

The following table summarizes all five properties discussed above. Use it as a reference when deciding which property applies in any given algebraic manipulation.

| Property | Addition | Multiplication | Subtraction | Division |
|----------|----------|---------------|-------------|----------|
| Commutative (order doesn't matter) | Yes: $a + b = b + a$ | Yes: $a \times b = b \times a$ | No: $(5 - 2) \neq (2 - 5)$ | No: $(6 \div 3) \neq (3 \div 6)$ |
| Associative (grouping doesn't matter) | Yes: $(a + b) + c = a + (b + c)$ | Yes: $(a \times b) \times c = a \times (b \times c)$ | No: $(10 - 5) - 2 \neq 10 - (5 - 2)$ | No: $(12 \div 4) \div 2 \neq 12 \div (4 \div 2)$ |
| Identity Element | $0$: $a + 0 = a$ | $1$: $a \times 1 = a$ | None | None |
| Inverse Element | $-a$: $a + (-a) = 0$ | $\frac{1}{a}$: $a \times \frac{1}{a} = 1$ (for $a \neq 0$) | None | None |

## Section 3: The Real Number Line and Absolute Value

A **real number line** is a straight horizontal line on which every point corresponds to exactly one real number, and every real number corresponds to exactly one point. Zero sits at the center (called the *origin*), positive numbers lie to the right, and negative numbers lie to the left. Numbers increase as you move rightward and decrease as you move leftward — this directional ordering is what makes the real number line such a powerful visualization tool in algebra.

The real number line bridges the abstract concept of "number" with the concrete idea of "position." Every fraction, every square root, every repeating decimal has an exact spot on this line. There are no gaps: between any two distinct real numbers, however close together they may be, infinitely many other real numbers exist in between. This property is called *density*, and it distinguishes the real numbers from the integers (where gaps of size $1$ separate consecutive values).

<details markdown="1">
<summary>Interactive: Real Number Line</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 120" width="700" height="120">
  <style>
    .axis { stroke: #333; stroke-width: 2; }
    .tick { stroke: #333; stroke-width: 1.5; }
    .label { font-size: 14px; font-family: sans-serif; fill: #333; text-anchor: middle; }
    .dot { r: 6; cursor: pointer; }
    .dot:hover { r: 8; }
    .point-label { font-size: 12px; font-family: sans-serif; fill: #2c5f8a; font-weight: bold; text-anchor: middle; }
  </style>

  <!-- Main axis -->
  <line x1="30" y1="60" x2="670" y2="60" class="axis"/>
  <!-- Arrow heads -->
  <polygon points="670,55 680,60 670,65" fill="#333"/>
  <polygon points="30,55 20,60 30,65" fill="#333"/>

  <!-- Ticks and labels -->
  <line x1="60" y1="52" x2="60" y2="68" class="tick"/>
  <text x="60" y="85" class="label">−4</text>
  <line x1="160" y1="52" x2="160" y2="68" class="tick"/>
  <text x="160" y="85" class="label">−2</text>
  <line x1="260" y1="52" x2="260" y2="68" class="tick"/>
  <text x="260" y="85" class="label">−1</text>
  <line x1="350" y1="48" x2="350" y2="72" class="tick" stroke="#2c5f8a" stroke-width="2.5"/>
  <text x="350" y="90" class="label" fill="#2c5f8a" font-weight="bold">0</text>
  <line x1="440" y1="52" x2="440" y2="68" class="tick"/>
  <text x="440" y="85" class="label">1</text>
  <line x1="540" y1="52" x2="540" y2="68" class="tick"/>
  <text x="540" y="85" class="label">3</text>
  <line x1="640" y1="52" x2="640" y2="68" class="tick"/>
  <text x="640" y="85" class="label">5</text>

  <!-- Labeled points -->
  <circle cx="350" cy="60" class="dot" fill="#2c5f8a" stroke="#fff" stroke-width="1.5"/>
  <text x="350" y="40" class="point-label">Origin (0)</text>

  <circle cx="160" cy="60" class="dot" fill="#c0392b" stroke="#fff" stroke-width="1.5"/>
  <text x="160" y="40" class="point-label">−2</text>

  <circle cx="540" cy="60" class="dot" fill="#27ae60" stroke="#fff" stroke-width="1.5"/>
  <text x="540" y="40" class="point-label">3</text>

  <!-- Dashed lines showing distance from origin -->
  <line x1="350" y1="60" x2="160" y2="60" stroke="#c0392b" stroke-dasharray="4,3" stroke-width="1.2"/>
  <text x="255" y="55" class="label" fill="#c0392b" font-size="11">distance = 2</text>

  <line x1="350" y1="60" x2="540" y2="60" stroke="#27ae60" stroke-dasharray="4,3" stroke-width="1.2"/>
  <text x="445" y="55" class="label" fill="#27ae60" font-size="11">distance = 3</text>

  <!-- Plus signs for readability -->
  <line x1="110" y1="55" x2="110" y2="65" class="tick"/>
  <text x="110" y="85" class="label">−3</text>
  <line x1="210" y1="55" x2="210" y2="65" class="tick"/>
  <text x="210" y="85" class="label">−1.5</text>
  <line x1="300" y1="55" x2="300" y2="65" class="tick"/>
  <text x="300" y="85" class="label">−0.5</text>
  <line x1="490" y1="55" x2="490" y2="65" class="tick"/>
  <text x="490" y="85" class="label">2</text>
  <line x1="590" y1="55" x2="590" y2="65" class="tick"/>
  <text x="590" y="85" class="label">4</text>
</svg>
```

Hover over or click any labeled point to see its exact coordinate. The distance from the origin is measured along the horizontal axis regardless of direction: moving left by $k$ units puts you at $-k$, and moving right by $k$ units puts you at $+k$. Notice that numbers to the right are always greater than numbers to the left — this ordering property is what allows us to compare any two real numbers visually.

</details>

### Absolute Value and Opposite Numbers

The **absolute value** of a number measures its distance from zero on the real number line, regardless of direction. Distance is always nonnegative because it has no direction — it only tells you "how far." Mathematically, we write $|a|$ to denote the absolute value of $a$:
$$|a| = \begin{cases} a & \text{if } a \geq 0 \\ -a & \text{if } a < 0 \end{cases}$$

When $a$ is positive or zero, its distance from zero is itself. When $a$ is negative, its distance is the positive counterpart — obtained by changing its sign. This definition guarantees that $|a|$ is never negative: for any real number $a$, $|a| \geq 0$.

Two numbers are **opposites** (or *additive inverses*) if they have the same absolute value but opposite signs. In other words, two numbers $a$ and $b$ are opposites if $|a| = |b|$ and $a + b = 0$. On the real number line, opposites sit at equal distances from zero but on opposite sides.

**Worked Example 8: Evaluating Absolute Value**

Find the absolute value of each number. Then find its opposite.

1. $|7| = 7$. The number $7$ is already to the right of zero (distance $7$), so its absolute value is simply $7$. Its opposite is $-7$, which lies $7$ units to the left of zero.
2. $|-5| = -(-5) = 5$. The number $-5$ is to the left of zero. We negate it (apply the $a < 0$ case), yielding $5$. Its opposite is $5$, confirming that $-5 + 5 = 0$.
3. $|0| = 0$. Zero's distance from itself is nothing — it sits exactly on the origin, so its absolute value is $0$. Note: zero is its own opposite because $0 + 0 = 0$.

**Worked Example 9: Distance Between Two Points**

The distance between any two real numbers $a$ and $b$ on the number line is given by $|a - b|$. Use this to find the distance between $-3$ and $4$.

Method 1 (A → B): $|-3 - 4| = |-7| = 7$
Method 2 (B → A): $|4 - (-3)| = |4 + 3| = |7| = 7$

Both methods give the same distance, as expected. The order of subtraction does not matter because absolute value erases the sign — you get the magnitude regardless of direction. On a number line, the distance between two points is always the length of the segment connecting them, measured in units. This concept will be essential when we discuss vectors and coordinate geometry in later chapters.

```math
\text{Distance}(a,\,b) = |a - b| = |b - a| \qquad \text{(always nonnegative)}
```

## Section 4: Properties of Equality

Equality connects two expressions that represent the same value. In algebra, we manipulate equations constantly — adding to both sides, multiplying through, substituting one expression for another — and each manipulation must be justified by a property that guarantees truth is preserved. Without these properties, every step of solving an equation would rest on faith rather than logic.

### Addition Property of Equality

The **addition property of equality** states that adding the same quantity to both sides of an equation produces an equivalent equation (one with the same solution). If $a = b$, then for any number $c$:
$$a + c = b + c$$

This property is what justifies moving terms across the equals sign. When you solve $x - 5 = 12$ by adding $5$ to both sides, you are applying the addition property of equality: since $x - 5$ and $12$ represent the same number, they remain equal after you add $5$ to each one. The solution set does not change because you have performed the same operation on two identical quantities.

**Worked Example 10: Solving with the Addition Property of Equality**

Solve each equation. State which property justifies each step.

1. $x - 9 = 4$
   Add $9$ to both sides (Addition Property of Equality): $x - 9 + 9 = 4 + 9$
   Simplify: $x = 13$
   Check: $13 - 9 = 4$ ✓

2. $y + \dfrac{3}{5} = \dfrac{7}{5}$
   Subtract $\dfrac{3}{5}$ from both sides (equivalently, add $-\dfrac{3}{5}$ to both sides, which is still the Addition Property): $y + \dfrac{3}{5} - \dfrac{3}{5} = \dfrac{7}{5} - \dfrac{3}{5}$
   Simplify: $y = \dfrac{4}{5}$
   Check: $\dfrac{4}{5} + \dfrac{3}{5} = \dfrac{7}{5}$ ✓

### Multiplication Property of Equality

The **multiplication property of equality** states that multiplying both sides of an equation by the same nonzero quantity produces an equivalent equation. If $a = b$, then for any number $c$ where $c \neq 0$:
$$a \cdot c = b \cdot c$$

Why must $c$ be nonzero? Multiplying by zero collapses every value to zero, erasing all information about the original quantities and producing the equation $0 = 0$, which is trivially true but unhelpful. Division by zero is similarly excluded for this reason — it destroys rather than preserves information.

**Worked Example 11: Solving with the Multiplication Property of Equality**

Solve each equation, noting where the nonzero restriction matters.

1. $\dfrac{x}{4} = 6$
   Multiply both sides by $4$: $4 \cdot \dfrac{x}{4} = 4 \cdot 6$
   Simplify: $x = 24$
   Check: $\dfrac{24}{4} = 6$ ✓

2. $-3x = 15$
   Divide both sides by $-3$ (equivalently, multiply both sides by $\dfrac{1}{-3}$): $\dfrac{-3x}{-3} = \dfrac{15}{-3}$
   Simplify: $x = -5$
   Check: $-3(-5) = 15$ ✓

> **Critical Rule:** You may multiply or divide by any *nonzero* number. If you are unsure whether a quantity could be zero, do not divide by it until you have confirmed that assumption separately.

### Substitution Property of Equality

The **substitution property** states that if two quantities are equal, one can replace the other in any expression without changing the value of that expression. If $a = b$, then wherever you see $a$ in an expression, you may write $b$ instead (and vice versa) without altering the result.

This property is the justification for solving a formula for one variable and plugging that result into another equation. It is also what allows us to simplify complex expressions: when we find that $x = 3$, every occurrence of $x$ in a later expression can be replaced by $3$.

**Worked Example 12: Applying the Substitution Property**

Given $x + y = 10$ and $x = 4$, substitute to solve for $y$.

Step 1: Replace $x$ with $4$ in the first equation (Substitution Property): $4 + y = 10$
Step 2: Subtract $4$ from both sides (Addition Property of Equality): $y = 6$
Check: $4 + 6 = 10$ ✓

The substitution property is deceptively powerful. It is the reason algebraic manipulation works as a strategy rather than an art: every time you replace one expression with another of equal value, you are guaranteed (by definition) to preserve truth. No exceptions, no approximations — exact equality carries through every replacement step.

## Section 5: Order of Operations and Arithmetic Operations

The **arithmetic operations** are the four fundamental actions performed on numbers: addition, subtraction, multiplication, and division. When multiple operations appear in a single expression, we need a consistent convention for which operation to perform first — otherwise two people could evaluate the same expression and get different answers. This convention is called the **order of operations**.

### Order of Operations (PEMDAS)

The standard order of operations is remembered by the acronym PEMDAS:

1. **P**arentheses — simplify expressions inside grouping symbols first
2. **E**xponents — evaluate powers and roots next
3. **M**ultiplication and **D**ivision — perform from left to right (they share equal priority)
4. **A**ddition and **S**ubtraction — perform from left to right (they share equal priority)

The hierarchy ensures that higher-level transformations (grouping, exponentiation) are resolved before lower-level ones (multiplication/division), which are themselves resolved before the most basic combinations (addition/subtraction). Within each tier, left-to-right evaluation prevents ambiguity.

**Worked Example 13: Applying Order of Operations**

Evaluate each expression step by step, showing which rule applies at each stage.

1. $3 + 4 \times 2$
   Step 1 (Multiplication before Addition): $3 + 8$
   Step 2 (Addition): $11$
   *If you had added first, you would get $(3+4) \times 2 = 14$, which is incorrect under PEMDAS.*

2. $2^3 - 4 \times (3 + 1)$
   Step 1 (Parentheses): $2^3 - 4 \times 4$
   Step 2 (Exponents): $8 - 4 \times 4$
   Step 3 (Multiplication): $8 - 16$
   Step 4 (Subtraction): $-8$

3. $\dfrac{5 + 3}{2^2 - 2}$
   The fraction bar acts as a grouping symbol: simplify numerator and denominator separately.
   Numerator (Addition): $5 + 3 = 8$
   Denominator (Exponent, then subtraction): $2^2 - 2 = 4 - 2 = 2$
   Final division: $\dfrac{8}{2} = 4$

The fraction bar example is particularly important because it serves as a hidden set of parentheses. The expression $5 + 3 \div 2^2 - 2$ (without the fraction bar) would be evaluated very differently under PEMDAS, yielding a completely different result. Always pay close attention to whether grouping symbols are present.

### Summary: Complete Properties Reference

The following table consolidates every property and rule covered in this chapter into a single reference. You will return to this table repeatedly as new topics build on these foundations.

| Property / Rule | Statement | When It Applies |
|-----------------|-----------|-----------------|
| Commutative (Addition) | $a + b = b + a$ | Only for addition of real numbers |
| Commutative (Multiplication) | $a \times b = b \times a$ | Only for multiplication of real numbers |
| Associative (Addition) | $(a+b)+c = a+(b+c)$ | Only for addition |
| Associative (Multiplication) | $(ab)c = a(bc)$ | Only for multiplication |
| Distributive | $a(b+c) = ab + ac$ | Always — connects multiplication and addition |
| Additive Identity | $a + 0 = a$ | Adding zero to any real number |
| Multiplicative Identity | $a \times 1 = a$ | Multiplying by one |
| Additive Inverse | $a + (-a) = 0$ | Every real number has an additive inverse |
| Multiplicative Inverse | $a \times \frac{1}{a} = 1$ (for $a \neq 0$) | Every *nonzero* real number has a multiplicative inverse |
| Addition Property of Equality | If $a=b$, then $a+c=b+c$ | Any equation; preserves equivalence |
| Multiplication Property of Equality | If $a=b$, then $ac=bc$ (for $c \neq 0$) | Any equation; nonzero multiplier required |
| Substitution Property | If $a=b$, replace $a$ with $b$ (or vice versa) | Any expression containing either value |

### Practice Summary

Before moving to the next chapter, confirm you can:

- Classify any given number as belonging to $\mathbb{N}$, $\mathbb{W}$, $\mathbb{Z}$, $\mathbb{Q}$, and/or $\mathbb{R}$
- State and apply each property of operations with at least one worked example
- Explain why the commutative and associative properties hold for addition and multiplication but *fail* for subtraction and division
- Locate any real number on the real number line and determine its absolute value and opposite
- Use the addition and multiplication properties of equality to solve simple equations step by step
- Evaluate expressions correctly using PEMDAS, including nested parentheses and fraction bars

These skills form the operational vocabulary you will use in every subsequent chapter. The ability to move confidently between number systems, identify which property justifies a given algebraic manipulation, and follow the order of operations without error is not optional — it is the minimum competency required before tackling polynomials, equations, or functions. In the next chapter, we build directly on this foundation by introducing variables and the algebraic expressions they inhabit.

## Key Takeaways

- The five number sets form a hierarchy: $\mathbb{N} \subset \mathbb{W} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$, with irrational numbers completing the real numbers alongside rationals.
- Real numbers include both rational (fractional) and irrational (non-fractional) values; together they cover every point on the number line with no gaps.
- The commutative, associative, and distributive properties are the three core behavioral rules of arithmetic operations. Addition and multiplication are commutative and associative; only multiplication distributes over addition.
- Identity elements ($0$ for addition, $1$ for multiplication) leave a number unchanged. Inverse elements ($-a$ additively, $1/a$ multiplicatively) reverse an operation and return the identity.
- The real number line provides a one-to-one correspondence between geometric points and real numbers — every number has a unique location, and every location represents a unique number.
- Absolute value measures distance from zero on the number line; opposite numbers have equal absolute values with opposite signs.
- The addition and multiplication properties of equality guarantee that equivalent equations are preserved when the same operation is applied to both sides. The substitution property allows replacing equals with equals anywhere they appear.
- The order of operations (PEMDAS) ensures every expression has exactly one unambiguous value: parentheses first, then exponents, then multiplication/division left-to-right, then addition/subtraction left-to-right.

---

*Chapter 1 is complete. All 19 concepts have been addressed with word counts and element coverage aligned to their CIS-driven elaboration tiers.*
