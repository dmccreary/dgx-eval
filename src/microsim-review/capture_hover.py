"""Capture the info panel of the testing-architecture MicroSim at several widths.

    python3 src/microsim-review/capture_hover.py docs/sims/testing-architecture <out-dir>

Points at the SSH client component, whose description is the longest in the
diagram, and saves a cropped image of the info panel at four widths. Use it to
confirm that long text still fits after an edit.

The pointer position and crop are computed from the sim's own layout
constants, so update them here if the layout in the sim changes.
Needs Playwright: pip install playwright && playwright install chromium
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

# layout constants copied from testing-architecture.js
DESIGN_W, DESIGN_H, DRAW_H = 940, 556, 662
DIAGRAM_TOP, TITLE_BAND = 36, 36
MIN_PANEL, MAX_PANEL = 98, 130
SSH_CLIENT = (114, 232)   # center of the SSH client box, in design coordinates

sim = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve()
out.mkdir(parents=True, exist_ok=True)
errors = []

with sync_playwright() as p:
    try:
        browser = p.chromium.launch()
    except Exception:
        browser = p.chromium.launch(channel="chrome")
    for width in (1100, 800, 700, 560):
        page = browser.new_page(viewport={"width": width, "height": 714})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(sim.as_uri() + "/main.html")
        page.wait_for_timeout(2000)
        s = min(1, width / DESIGN_W)
        ox = (width - DESIGN_W * s) / 2
        oy = TITLE_BAND - DIAGRAM_TOP * s
        bottom = oy + DESIGN_H * s
        panel = max(MIN_PANEL, min(MAX_PANEL, DRAW_H - bottom - 8))
        page.mouse.move(ox + SSH_CLIENT[0] * s, oy + SSH_CLIENT[1] * s)
        page.wait_for_timeout(300)
        page.screenshot(path=str(out / f"ssh-{width}.png"),
                        clip={"x": 0, "y": bottom, "width": width, "height": panel + 12})
        page.close()
    browser.close()
print("page errors:", errors or "none")
