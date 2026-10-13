#!/usr/bin/env python3
r"""Regression cases for the equation check in chapter_quality.py.

    python3 src/scoring/test_equations.py

Each case is a snippet of Markdown, the number of well-formed and malformed
equations it should hold, and, for malformed ones, the fault that must be named.
The first group must stay well formed: prices, `$n$th`, escaped dollars, code,
and the TeX that models actually write. Run it after changing the command lists
or the delimiter rules. It exits non-zero if any case fails.

These cases check the rules in the file. They are not a KaTeX run.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from chapter_quality import scan_equations, summarize_equations  # noqa: E402

# (label, markdown, well formed, malformed, fault that must appear in the detail)
CASES = [
    # ---- must stay well formed ---------------------------------------------
    ("inline dollar", "Solve $x + 2 = 5$ now.", 1, 0, ""),
    ("inline paren", r"Solve \(x + 2 = 5\) now.", 1, 0, ""),
    ("display dollar", "$$\nx = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n$$", 1, 0, ""),
    ("display bracket", "\\[ y = mx + b \\]", 1, 0, ""),
    ("word character after closing dollar", "The $n$th term is $a_n$.", 2, 0, ""),
    ("letter after degree", "It is $0^\\circ$C outside.", 1, 0, ""),
    ("prices are text", "It costs $5 for the first hour and $10 for the second, or $1,000.", 0, 0, ""),
    ("escaped dollar", r"A fee of \$30 plus \$5.", 0, 0, ""),
    ("escaped dollar inside math", r"Total is $\$5 \times 10 = \$50$.", 1, 0, ""),
    ("price beside an equation", "It costs $5 and $x + 1$ is the rule.", 1, 0, ""),
    ("code span ignored", "Type `$x + {` in the box and `\\( \\)` for inline.", 0, 0, ""),
    ("fenced code ignored", "```\n$x^\n\\frac{1}\n```\n", 0, 0, ""),
    ("aligned environment", "$$\n\\begin{aligned} x &= 1 \\\\ y &= 2 \\end{aligned}\n$$", 1, 0, ""),
    ("cases environment", "$$ f(x) = \\begin{cases} 1 & x > 0 \\\\ 0 & \\text{otherwise} \\end{cases} $$", 1, 0, ""),
    ("left and right", "$\\left( \\frac{a}{b} \\right)^2$", 1, 0, ""),
    ("escaped braces after left", "$\\left\\{ x \\right\\}$", 1, 0, ""),
    ("left dot", "$\\left. \\frac{d}{dx} x^2 \\right|_{x=1}$", 1, 0, ""),
    ("superscript and subscript", "$x_1^2 + x^2_1 + \\sum_{i=1}^{n} i$", 1, 0, ""),
    ("superscript on a group", "${x^2}^3$", 1, 0, ""),
    ("prime then superscript", "$f'^2 + f''(x)$", 1, 0, ""),
    ("escaped percent", "$15\\%$ of $x$", 2, 0, ""),
    ("text group with _ ^ &", "$\\text{rise_over^run & more}$", 1, 0, ""),
    ("optional sqrt index", "$\\sqrt[3]{27} = 3$", 1, 0, ""),
    ("single-token fraction arguments", "$\\frac12 + \\frac\\pi2$", 1, 0, ""),
    ("operatorname", "$\\operatorname{lcm}(a,b)$", 1, 0, ""),
    ("inline math over a line break", "The value $a +\nb$ is.", 1, 0, ""),
    ("markdown escapes", r"Use \* and \_ here.", 0, 0, ""),
    ("macro defined in the body", "$\\newcommand{\\foo}{x}\\foo$", 1, 0, ""),
    # ---- must be malformed -------------------------------------------------
    ("unbalanced open brace", "$\\frac{1}{2$", 0, 1, "unbalanced_braces"),
    ("extra closing brace", "$x + 1}$", 0, 1, "unbalanced_braces"),
    ("left without right", "$\\left( x + 1$", 0, 1, "unmatched_left_right"),
    ("right without left", "$x + 1 \\right)$", 0, 1, "unmatched_left_right"),
    ("unescaped brace after left", "$\\left{ x \\right}$", 0, 1, "bad_delimiter"),
    ("begin without end", "$$\\begin{aligned} x &= 1 $$", 0, 1, "unmatched_environment"),
    ("end names another environment", "$$\\begin{aligned} x \\end{cases}$$", 0, 1, "unmatched_environment"),
    ("unknown environment", "$$\\begin{tabular}{c} 1 \\end{tabular}$$", 0, 1, "unknown_environment:tabular"),
    ("unknown command", "$\\mathbbm{R}$", 0, 1, "unknown_command:\\mathbbm"),
    ("fraction with one argument", "$\\frac{1}$", 0, 1, "missing_argument"),
    ("fraction with no argument", "$\\frac$", 0, 1, "missing_argument"),
    ("text with no argument", "$x = \\text$", 0, 1, "missing_argument"),
    ("dangling superscript", "$x^$", 0, 1, "dangling_script"),
    ("dangling subscript in a group", "${x_}$", 0, 1, "dangling_script"),
    ("double superscript", "$x^2^3$", 0, 1, "double_superscript"),
    ("double subscript", "$x_1_2$", 0, 1, "double_subscript"),
    ("prime after superscript", "$x^2'$", 0, 1, "double_superscript"),
    ("ampersand outside an environment", "$a & b$", 0, 1, "ampersand_outside_environment"),
    ("dollar inside math", r"\( 5 + $3 \)", 0, 1, "dollar_in_math"),
    ("unescaped percent", "$25% of 80$", 0, 1, "unescaped_percent"),
    ("empty parentheses", r"\( \)", 0, 1, "empty"),
    ("empty display", "$$ $$", 0, 1, "empty"),
    ("paren never closes", r"Solve \(x + 2 = 5 for x.", 0, 1, "unclosed_paren"),
    ("bracket never closes", "\\[ x + 2 = 5\n", 0, 1, "unclosed_bracket"),
    ("display dollar never closes", "$$ x + 2 = 5\n", 0, 1, "unclosed_display_dollar"),
    ("closing with no opening", r"so x = 5\)", 0, 1, "closing_without_opening"),
    ("spaces inside the dollars", "Solve $ x + 2 = 5 $ now.", 0, 1, "stray_dollar"),
    ("lone dollar", "Let $x be the number of apples.", 0, 1, "stray_dollar"),
    ("TeX in a sentence", r"The slope is \frac{y_2 - y_1}{x_2 - x_1} in general.", 0, 1, "naked_tex"),
    ("TeX in square brackets", "[ x = \\frac{1}{2} ]", 0, 1, "naked_tex"),
    ("command without its backslash", "$frac{1}{2}$", 0, 1, "missing_backslash"),
    ("equation split by a blank line", "Start $x +\n\n y$ end.", 0, 2, "stray_dollar"),
    ("one good and two bad", "$x^$ and $y$ and \\(\\frac{1}\\)", 1, 2, ""),
]


def main():
    failed = 0
    for label, text, want_ok, want_bad, fault in CASES:
        ok, bad, detail = summarize_equations(scan_equations(text))
        if (ok, bad) != (want_ok, want_bad) or fault not in detail:
            failed += 1
            print(f"FAIL {label}: got {ok} ok, {bad} bad [{detail}]; "
                  f"expected {want_ok} ok, {want_bad} bad [{fault}]")
    print(f"{len(CASES)} cases, {failed} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
