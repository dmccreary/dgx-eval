// KaTeX auto-render configuration.
// Authors may write $...$, \( ... \), $$...$$ or \[ ... \]. The pymdownx.arithmatex
// extension (mkdocs.yml) recognizes the $ forms at build time, with smart_dollar
// so prices like $20 or $1.99 stay text, and emits \( ... \) and \[ ... \].
// This script renders those. A single $ is deliberately not listed below: it
// would turn any stray price left in raw HTML into broken math.
function renderBookMath() {
  renderMathInElement(document.body, {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "\\[", right: "\\]", display: true},
      {left: "\\(", right: "\\)", display: false}
    ],
    throwOnError: false
  });
}

// document$ fires on every page load, including instant-navigation swaps.
if (typeof document$ !== "undefined") {
  document$.subscribe(renderBookMath);
} else {
  document.addEventListener("DOMContentLoaded", renderBookMath);
}
