# Cover Image Prompt

Please generate a professional-quality cover image for this textbook.
This image will be used in social media previews and must follow the
formatting guidelines for an Open Graph image preview.

**Required specifications:**

- Format: PNG
- Wide-landscape format
- Size: 1200x630 pixels (1.91:1 aspect ratio)
- This is the Open Graph standard for social media previews
- Keep the title and the mascot at least 40 pixels inside every edge,
  because some platforms crop the preview

**Reference image:** attach `docs/img/mascot/welcome.png`, a waving robot
named Tera. If your tool cannot take an image attachment, use the mascot
description in the Mascot section below.

The image has four layers, back to front: background montage, color
treatment, mascot, and title text.

## Subject & Tone

DGX Evaluation for Textbook Generation is a textbook about measuring, with
evidence instead of opinions, whether a single local NVIDIA DGX computer can
generate a complete interactive intelligent textbook using an open-weight
small language model on its own GPU, without sending a token to the cloud.
The intended audience is AI and machine-learning engineers, instructional
technologists, technical authors, and IT infrastructure leads. The visual
tone should be modern, technical, and trustworthy, like the cover of an
engineering lab report with a friendly touch from the mascot. It should not
look like a sci-fi poster or a gaming product.

## Title

Place this exact text in the center of the image, on two lines, in a clean,
highly legible, bold sans-serif font. Use a white font color with a subtle
drop shadow over a soft dark scrim so it stays readable against the montage.

- Line 1 (largest): `DGX Evaluation`
- Line 2 (about 60% of the size of line 1): `for Textbook Generation`

Spell the title exactly as written, with no extra words, no tagline, and no
other lettering anywhere in the image. Do not shrink the title to make room
for the montage; move the montage away from the text instead.

## Background Montage

Arrange a montage of the following 7 concepts around the title, each
rendered in the same flat vector style (see Style below) so the composition
reads as one image. None of the elements contains readable text; use shapes,
icons, and abstract marks only.

- **Learning graph** (top-left): a small network of round concept nodes
  joined by arrows, flowing left to right like a dependency diagram, with a
  few nodes lit in cyan and a few still dim.
- **Secure remote access** (top-center): a laptop on the left and a compact
  computer on the right joined by a glowing dashed link, with small padlock
  icons on the link and a faint mesh of three or four extra nodes behind
  them.
- **Hardware probe report** (top-right): a dark terminal window filled with
  rows of short, unreadable, abstract lines in green and cyan, with two mini
  gauges (temperature and power) in its corner.
- **Sanitizing results** (left-middle, above the mascot): a document page
  with several solid black redaction bars across its lines and a small
  shield with a check mark overlapping its corner.
- **Cost, price, and quality** (right-middle): a simple line chart with two
  straight lines that cross at a highlighted break-even point, one line flat
  and rising slowly, the other starting at zero and rising steeply.
- **The DGX, the hero object** (bottom-center, directly below the title): a
  sleek, compact, desktop-sized AI computer with a metal case, a slim
  glowing memory-level strip along its front, and no logos or markings. A
  stopwatch rests beside it, echoing the mascot's tool belt.
- **The finished textbook** (bottom-right): a short row of small page icons
  (a course description, a graph, chapters, a glossary, a quiz) flowing into
  a large open book, with a small simulation window floating above its
  pages.

## Mascot

Place the book's mascot, Tera the Robot, in the **lower-left corner**,
standing and facing the viewer, in the same waving "welcome" pose as the
attached `welcome.png`. Make Tera about 280 pixels tall (roughly 45% of the
image height), with the feet about 40 pixels above the bottom edge and the
left side about 40 pixels from the left edge. Do not let any montage element
or the title overlap Tera. Add a soft light halo or rim glow behind Tera so
the blue panels separate cleanly from the dark background.

Tera is described as: a compact, rounded, friendly robot with a white head
and a dark navy face screen showing two large cyan-white round eyes and a
small smile; blue ear pieces on each side of the head; a short antenna with
an orange ball tip; a white body with royal-blue panels, arms, and legs and
a small glowing round light in the center of the chest; one hand raised in a
cheerful wave on the right side of the image (the viewer's right); and an
orange tool belt holding a stopwatch, a digital caliper, and a small tape
measure. The art style is modern flat vector with clean lines and flat
colors.

Do not redesign, recolor, mirror, or re-pose Tera, and do not add any text,
numbers, or logos to Tera.

## Style & Composition

- Illustration style: modern flat vector with clean lines, flat colors, and
  only subtle soft glows. Apply this one style to every montage element so
  they match Tera's art style.
- Color palette: deep navy-indigo background (about `#1a237e` shading up to
  `#3f51b5`) with cyan glow accents and small orange (`#f57c00`) highlights
  that echo Tera's tool belt and antenna tip. Keep the title and Tera white
  and bright against the dark ground.
- Lighting/mood: calm, precise, and optimistic; a soft radial glow behind
  the title and a slightly dimmer, lower-contrast treatment for the montage
  so Tera and the title are the first things the eye lands on.
- Composition: title centered; the seven montage elements in a loose ring
  around it as listed above; Tera in the lower-left; generous negative space
  immediately behind the title so it stays readable even at thumbnail size.

## Avoid

- Do not render any readable text anywhere except the two title lines. Any
  screen, document, or terminal must show only abstract, unreadable marks.
- Do not show anything that looks like a real network address, hostname,
  username, password, key, serial number, or hardware identifier, even as a
  placeholder. This book is public and its subject is a real machine; the
  cover must not make that machine easier to find.
- Do not use any vendor logos or trademarks (no GPU maker, VPN, or cloud
  provider marks), and do not copy the look of any specific company's
  product page.
- Avoid generic stock-photo cliches (handshakes, isolated lightbulbs,
  glowing brains, people pointing at whiteboards).
- Avoid photorealistic human faces and avoid any human figures; the only
  character is Tera.
- Do not let montage elements visually compete with, crowd, or overlap the
  title or the mascot.

---

## Notes for the Author (not part of the prompt)

Everything above this line is the prompt. Copy only that part.

1. Paste the prompt into your text-to-image tool and attach
   `docs/img/mascot/welcome.png` as the reference image.
2. Generate 2-4 drafts and compare them. If Tera drifts from the reference
   (colors, belt tools, wave side), fix that in the Mascot section and
   regenerate rather than only re-rolling.
3. Check the title spelling and check every terminal, document, and screen in
   the montage for anything that looks like a real address or name. Reject
   any draft that has one.
4. When a draft is right, resize it to 1200x630 and save it as
   `docs/img/cover.png`. The existing `cover.png` is the generic
   "Intelligent Textbook" template art and does not mention this book.
5. Do not attach the MicroSim screenshots. They carry dense interface text
   that a text-to-image model will try to reproduce, which is how readable
   (and sometimes misleading) lettering ends up on a cover.

Concepts chosen, and the chapters they come from:

| Montage element | Chapter |
|---|---|
| Learning graph | 02 Learning Graphs, MicroSims, and Rules |
| Secure remote access | 07 Remote Access, 09 Tailscale and Inventory |
| Hardware probe report | 10 Hardware Probes |
| Sanitizing results | 23 Sanitizing and Publishing |
| Cost, price, and quality | 06 Cost, Price, and Quality |
| The DGX | 05 DGX Hardware Architecture |
| The finished textbook | 01 Intelligent Textbooks, 21 Running the Benchmark |
