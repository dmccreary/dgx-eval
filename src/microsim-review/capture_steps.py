"""Capture every step of the testing-architecture MicroSim for layout review.

    python3 src/microsim-review/capture_steps.py docs/sims/testing-architecture <out-dir> [width]

Saves one image for the overview, one for each of the eight steps, and one
with the pointer on the GPU of DGX unit A. Reports any JavaScript errors.

The pointer position is computed from the sim's own layout constants, so
update it here if the layout in the sim changes.
Needs Playwright: pip install playwright && playwright install chromium
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sim = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve()
width = int(sys.argv[3]) if len(sys.argv) > 3 else 800
out.mkdir(parents=True, exist_ok=True)
errors = []

with sync_playwright() as p:
    try:
        browser = p.chromium.launch()
    except Exception:
        browser = p.chromium.launch(channel="chrome")
    page = browser.new_page(viewport={"width": width, "height": 714})
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(sim.as_uri() + "/main.html")
    page.wait_for_timeout(2500)
    page.screenshot(path=str(out / f"w{width}-step0.png"))
    for n in range(1, 9):
        page.get_by_role("button", name="Next").click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(out / f"w{width}-step{n}.png"))
    # hover the GPU of unit A in the overview
    page.get_by_role("button", name="Overview").click()
    s = min(1, width / 940)
    ox = (width - 940 * s) / 2
    oy = 36 - 36 * s
    page.mouse.move(ox + 832 * s, oy + (58 + 98) * s)
    page.wait_for_timeout(300)
    page.screenshot(path=str(out / f"w{width}-hover-gpu.png"))
    browser.close()

print("console errors:", errors or "none")
