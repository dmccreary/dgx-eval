"""Capture the model-fit-by-memory MicroSim in several states for layout review.

    python3 src/microsim-review/capture_model_fit.py docs/sims/model-fit-by-memory <out-dir>

Saves the default view, two other memory settings, two hovered models, and a
narrow view. The sim reads model-data.json with fetch(), which a browser
refuses for a page opened from a local folder, so this script serves the sim
folder over HTTP on a free local port while it runs.

Needs Playwright: pip install playwright && playwright install chromium
"""
import functools
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

# layout constants copied from model-fit-by-memory.js
ROWS_TOP, ROWS_BAND, MAX_ROW, CANVAS_H = 84, 320, 40, 680

sim = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve()
out.mkdir(parents=True, exist_ok=True)


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


server = ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(sim)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f"http://127.0.0.1:{server.server_address[1]}/main.html"
errors = []

with sync_playwright() as p:
    try:
        browser = p.chromium.launch()
    except Exception:
        browser = p.chromium.launch(channel="chrome")

    def shot(name, width, memory=None, hover_row=None):
        page = browser.new_page(viewport={"width": width, "height": CANVAS_H + 2})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(url)
        page.wait_for_function("data !== null || loadError !== null", timeout=10000)
        if memory is not None:
            page.evaluate(f"memorySlider.value({memory})")
        if hover_row is not None:
            rows = page.evaluate("data.models.length")
            row_height = min(MAX_ROW, ROWS_BAND / rows)
            page.mouse.move(width * 0.7, ROWS_TOP + row_height * (hover_row + 0.5))
        page.wait_for_timeout(300)
        page.screenshot(path=str(out / f"{name}.png"))
        page.close()

    shot("default-800", 800)
    shot("memory-32", 800, memory=32)
    shot("memory-256", 800, memory=256)
    shot("hover-row-5", 800, hover_row=5)
    shot("hover-last-row", 1100, memory=64, hover_row=9)
    shot("narrow-560", 560, memory=64, hover_row=3)
    browser.close()

server.shutdown()
print("page errors:", errors or "none")
