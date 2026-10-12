// Model-Fit Calculator MicroSim (sim id: model-fit-calculator)
// CANVAS_HEIGHT: 730
// The learner calculates the memory a model needs from its parameter count,
// precision, and context length, and states whether it fits. Three fixed
// challenges come first, with two attempts each. Then seven sliders drive a bar
// split into weights, cache, and overhead, with the usable limit and the
// memory marked on it.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 495;
// The control region holds seven sliders in exploration. In a challenge it
// holds the gigabyte entry, the three verdict buttons, then Check and Next.
let controlHeight = 235;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 350;   // room for a slider's name and value on its left
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Model-Fit Calculator';
const challengeNoun = 'Challenge';
const challengeNounPlural = 'Challenges';
const question = 'How much memory does this model need, and does it fit?';
const contentTag = 'illustrative, not a published figure';
const verdicts = ['Fits', 'Fits without headroom', 'Does not fit'];
// The precision slider steps through these three files
const precisions = [
  { name: '16-bit file', bits: 16 },
  { name: '8-bit file', bits: 8.5 },
  { name: '4-bit file', bits: 5.0 }
];
const rules = 'Weights in GB = parameters in billions × effective bits ÷ 8. Cache in GB = context × KV cache per token in KiB × 1,024 ÷ 1,000,000,000. Needed = weights + cache + overhead. Usable = memory × (1 − headroom). Fits: needed is at most usable. Fits without headroom: needed is above usable and at most memory. Does not fit: needed is above memory.';
const exploreHint = 'Try this: raise the context length and watch the cache grow. Then change the precision of a small model and compare how far each one moves the total.';
const screenReaderText = 'A calculation exercise about the memory a model needs. Weights in gigabytes are parameters in billions times effective bits divided by 8. The cache is context length times cache per token. Memory needed is weights plus cache plus overhead. Usable memory is memory times one minus the headroom. Three challenges give the inputs. Type the memory needed in gigabytes, choose Fits, Fits without headroom, or Does not fit, and press Check, with two attempts each. After the challenges, seven sliders change the inputs and a bar shows weights, cache, and overhead against the usable limit and the memory.';

// The seven quantities the learner can change in exploration
const quantities = [
  { key: 'parameters', label: 'Parameters', min: 1, max: 200, step: 0.1, start: 30.5,
    format: v => formatNumber(v, 1) + ' billion' },
  { key: 'precision', label: 'Precision', min: 0, max: 2, step: 1, start: 2,
    format: v => precisions[v].name + ', ' + formatNumber(precisions[v].bits, 1) + ' effective bits' },
  { key: 'context', label: 'Context length', min: 4096, max: 262144, step: 4096, start: 32768,
    format: v => formatNumber(v, 0) + ' tokens' },
  { key: 'kvPerToken', label: 'KV cache per token', min: 32, max: 512, step: 32, start: 192,
    format: v => formatNumber(v, 0) + ' KiB' },
  { key: 'overhead', label: 'Runtime overhead', min: 0, max: 10, step: 0.5, start: 3,
    format: v => formatNumber(v, 1) + ' GB' },
  { key: 'memory', label: 'Memory', min: 16, max: 512, step: 16, start: 128,
    format: v => formatNumber(v, 0) + ' GB' },
  { key: 'headroom', label: 'Headroom', min: 0.05, max: 0.4, step: 0.05, start: 0.2,
    format: v => formatNumber(v, 2) + ' of memory' }
];

// The three challenges, with the working shown after a wrong check
const challenges = [
  { inputs: { parameters: 30.7, precision: 2, context: 32768, kvPerToken: 192, overhead: 3, memory: 128, headroom: 0.2 },
    feedback: 'Weights 30.7 × 5.0 ÷ 8 = 19.2 GB, cache 32,768 × 192 KiB = 6.4 GB, overhead 3 GB, total 28.6 GB, which is under the usable 102.4 GB.' },
  { inputs: { parameters: 30.7, precision: 2, context: 262144, kvPerToken: 192, overhead: 3, memory: 64, headroom: 0.2 },
    feedback: 'Weights 19.2 GB, cache 262,144 × 192 KiB = 51.5 GB, overhead 3 GB, total 73.7 GB, which is above all 64 GB of memory.' },
  { inputs: { parameters: 110, precision: 1, context: 32768, kvPerToken: 192, overhead: 3, memory: 128, headroom: 0.2 },
    feedback: 'Weights 110 × 8.5 ÷ 8 = 116.9 GB, cache 6.4 GB, overhead 3 GB, total 126.3 GB, which is under 128 GB and above the usable 102.4 GB.' }
];

// The model. All sizes are in gigabytes.
function compute(inputs) {
  const weights = inputs.parameters * precisions[inputs.precision].bits / 8;
  const cache = inputs.context * inputs.kvPerToken * 1024 / 1e9;
  const needed = weights + cache + inputs.overhead;
  const usable = inputs.memory * (1 - inputs.headroom);
  let verdict = 'Does not fit';
  if (needed <= usable) verdict = 'Fits';
  else if (needed <= inputs.memory) verdict = 'Fits without headroom';
  return { weights: weights, cache: cache, needed: needed, usable: usable, verdict: verdict };
}

// ---------- challenge state ----------
let phase = 'challenge';   // 'challenge' while the fixed cases are worked, then 'explore'
let current = 0;           // index of the challenge on screen
let attempts = 0;          // checks used on the current challenge, at most two
let status = 'open';       // 'open', then 'correct' or 'missed'
let correctCount = 0;      // challenges answered correctly
let feedback = '';         // the message shown after a check
let textScale = 1;         // shrinks the text when a narrow canvas would overflow
let lastWidth = 0;         // canvas width at the previous frame
let sliders = {};          // one slider per quantity, by key
let checkButton, nextButton, restartButton;
const sliderRow = 27;      // vertical distance between slider rows

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Always use the native builtin p5.js controls
  for (const q of quantities) {
    sliders[q.key] = createSlider(q.min, q.max, q.start, q.step);
  }
  createAnswerControls();
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next');
  nextButton.mousePressed(nextChallenge);
  restartButton = createButton('Restart the ' + challengeNounPlural.toLowerCase());
  restartButton.mousePressed(restartChallenges);
  for (const b of [checkButton, nextButton, restartButton]) b.style('font-size', '15px');

  placeControls();
  syncControls();
  describe(screenReaderText, LABEL);
}

function draw() {
  // check for window resize
  updateCanvasSize();
  if (canvasWidth !== lastWidth) {
    lastWidth = canvasWidth;
    textScale = 1;
    placeControls();
  }

  // drawing area: very light blue background with a silver border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control area: white background with the same silver border
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  // title
  fill('black');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(canvasWidth < 520 ? 18 : 22);
  text(title, canvasWidth / 2, 8);
  textStyle(NORMAL);

  const x = margin;
  const w = canvasWidth - 2 * margin;
  const inputs = currentInputs();
  const result = compute(inputs);
  const bottom = phase === 'challenge' ? drawChallenge(inputs, result, x, w) : drawExploration(inputs, result, x, w);
  // if the content ran past the drawing area, use smaller text on the next frame
  if (bottom > drawHeight - 6 && textScale > 0.6) textScale -= 0.04;

  drawControlLabels();
}

// The values in use: the challenge's fixed inputs, or the sliders in exploration
function currentInputs() {
  if (phase === 'challenge') return challenges[current].inputs;
  const inputs = {};
  for (const q of quantities) inputs[q.key] = sliders[q.key].value();
  return inputs;
}

// One challenge: what is given, the rules, the question, and after a check the
// feedback. The worked result is drawn once the challenge is settled.
function drawChallenge(inputs, result, x, w) {
  fill('dimgray');
  noStroke();
  textSize(15 * textScale);
  textAlign(LEFT, TOP);
  text(challengeNoun + ' ' + (current + 1) + ' of ' + challenges.length, x, 40);
  textAlign(RIGHT, TOP);
  text(challengeNounPlural + ' correct: ' + correctCount + ' of ' + challenges.length, x + w, 40);

  const given = quantities.map(q => [q.label, q.format(inputs[q.key])]);
  let y = drawFacts(challengeNoun + ' ' + (current + 1) + ': what is given', contentTag, given, x, 64, w);
  // the rules make way for the worked result once the challenge is settled
  if (status === 'open') y = drawTextPanel('Rules', '', rules, x, y + 8, w, 14, false);
  fill('black');
  y = drawWrapped(question, x, y + 10, w, 17 * textScale, BOLD);
  if (feedback) y = drawFeedback(x, y + 8, w);
  if (status !== 'open') y = drawResult(inputs, result, x, y + 10, w);
  return y;
}

// Free exploration: the result follows the sliders
function drawExploration(inputs, result, x, w) {
  fill('dimgray');
  noStroke();
  textSize(15 * textScale);
  textAlign(LEFT, TOP);
  text('Exploration: move any slider', x, 40);
  textAlign(RIGHT, TOP);
  text(challengeNounPlural + ' correct: ' + correctCount + ' of ' + challenges.length, x + w, 40);

  let y = drawResult(inputs, result, x, 64, w);
  y = drawTextPanel('The working', contentTag, working(inputs, result), x, y + 10, w, 15, false);
  fill('black');
  return drawWrapped(exploreHint, x, y + 10, w, 16 * textScale, NORMAL);
}

// The message after a check, in a panel whose color and wording carry the result
function drawFeedback(x, y, w) {
  const pad = 10;
  const bar = 6;
  const size = 15.5 * textScale;
  const inner = w - 2 * pad - bar;
  const good = status === 'correct';
  const h = 2 * pad + wrappedHeight(feedback, inner, size, NORMAL);
  fill('white');
  stroke(good ? 'forestgreen' : 'darkorange');
  strokeWeight(2);
  rect(x, y, w, h, 8);
  noStroke();
  fill(good ? 'forestgreen' : 'darkorange');
  rect(x, y, bar, h, 8, 0, 0, 8);
  fill('black');
  drawWrapped(feedback, x + pad + bar, y + pad, inner, size, NORMAL);
  return y + h;
}

// A white panel listing names and values in two columns
function drawFacts(heading, tag, rows, x, y, w) {
  const pad = 12;
  const headSize = 15 * textScale;
  const size = 15 * textScale;
  const rowHeight = size * 1.45;
  const perColumn = ceil(rows.length / 2);
  const columnWidth = (w - 2 * pad) / 2;
  const h = pad + headSize * 1.6 + perColumn * rowHeight + pad - 4;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();
  fill('dimgray');
  textSize(headSize);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(heading, x + pad, y + pad);
  textStyle(ITALIC);
  textAlign(RIGHT, TOP);
  text(tag, x + w - pad, y + pad);
  textStyle(NORMAL);

  fill('black');
  textSize(size);
  textAlign(LEFT, TOP);
  for (let i = 0; i < rows.length; i++) {
    const rx = x + pad + floor(i / perColumn) * columnWidth;
    const ry = y + pad + headSize * 1.6 + (i % perColumn) * rowHeight;
    noStroke();
    text(rows[i][0] + ': ' + rows[i][1], rx, ry);
  }
  return y + h;
}

// Check the answer. Each challenge allows two attempts.
function checkAnswer() {
  if (phase !== 'challenge' || status !== 'open' || !answerReady()) return;
  const challenge = challenges[current];
  const result = compute(challenge.inputs);
  attempts++;
  if (answerIsCorrect(result)) {
    status = 'correct';
    correctCount++;
    feedback = 'Correct: ' + answerText(result);
  } else if (attempts < 2) {
    feedback = 'Not quite. ' + challenge.feedback + ' You have one more attempt.';
  } else {
    status = 'missed';
    feedback = 'Missed. The model values are ' + answerText(result) + ' The working: ' + challenge.feedback;
  }
  textScale = 1;
  syncControls();
}

function nextChallenge() {
  if (status === 'open') return;
  if (current < challenges.length - 1) {
    current++;
  } else {
    // the exploration starts from the default values
    phase = 'explore';
    for (const q of quantities) sliders[q.key].value(q.start);
  }
  attempts = 0;
  status = 'open';
  feedback = '';
  textScale = 1;
  resetAnswerControls();
  syncControls();
}

function restartChallenges() {
  phase = 'challenge';
  current = 0;
  attempts = 0;
  status = 'open';
  correctCount = 0;
  feedback = '';
  textScale = 1;
  resetAnswerControls();
  syncControls();
}

// Called by an answer control whenever the learner changes an entry or a choice
function answerChanged() {
  syncControls();
}

// Show, hide, enable, and disable the controls to match the current state
function syncControls() {
  const inChallenge = phase === 'challenge';
  for (const q of quantities) setVisible(sliders[q.key], !inChallenge);
  setVisible(checkButton, inChallenge);
  setEnabled(checkButton, inChallenge && status === 'open' && answerReady());
  setVisible(nextButton, inChallenge);
  setEnabled(nextButton, inChallenge && status !== 'open');
  nextButton.html(current < challenges.length - 1 ? 'Next ' + challengeNoun.toLowerCase() : 'Start exploring');
  setVisible(restartButton, !inChallenge);
  syncAnswerControls();
}

// Position every control. Called at setup and whenever the width changes.
function placeControls() {
  for (let i = 0; i < quantities.length; i++) {
    const slider = sliders[quantities[i].key];
    slider.position(sliderLeftMargin, drawHeight + 8 + i * sliderRow);
    slider.size(canvasWidth - sliderLeftMargin - margin);
  }
  placeAnswerControls();
  // Check and Next sit under the two answer rows, and Restart under the sliders
  checkButton.position(margin, drawHeight + 92);
  nextButton.position(margin + 78, drawHeight + 92);
  restartButton.position(margin, drawHeight + controlHeight - 38);
}

// In exploration each slider has its name and current value to its left. In a
// challenge the labels belong to the answer controls.
function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  if (phase === 'challenge') {
    drawAnswerLabels();
    return;
  }
  for (let i = 0; i < quantities.length; i++) {
    const q = quantities[i];
    text(q.label + ': ' + q.format(sliders[q.key].value()), margin, drawHeight + 10 + i * sliderRow);
  }
}

// A number with thousands separators and a fixed count of decimals
function formatNumber(value, decimals) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// The memory needed as one bar, with the usable limit and the memory marked
function drawResult(inputs, result, x, y, w) {
  fill('black');
  noStroke();
  y = drawWrapped('Memory needed: ' + formatNumber(result.needed, 1) + ' GB. Verdict: ' + result.verdict + '.',
    x, y, w, 17 * textScale, BOLD) + 4;

  const fullScale = max(inputs.memory, result.needed) * 1.04;
  const toX = value => x + w * value / fullScale;
  // the two limits are named above the bar, one line each
  drawLimitLabel('Usable with headroom: ' + formatNumber(result.usable, 1) + ' GB', toX(result.usable), y, x, w);
  drawLimitLabel('Memory: ' + formatNumber(inputs.memory, 0) + ' GB', toX(inputs.memory), y + 17 * textScale, x, w);
  const barTop = y + 38 * textScale;

  const segments = [
    { label: 'Weights', value: result.weights, color: 'steelblue' },
    { label: 'Cache', value: result.cache, color: 'darkorange' },
    { label: 'Overhead', value: inputs.overhead, color: 'gray' }
  ];
  const bottom = drawStackedBar(segments, fullScale, 'GB', x, barTop, w, 32);

  // the usable limit is dashed and the memory is solid
  stroke('black');
  strokeWeight(2);
  drawingContext.setLineDash([5, 4]);
  line(toX(result.usable), barTop - 5, toX(result.usable), barTop + 37);
  drawingContext.setLineDash([]);
  strokeWeight(3);
  line(toX(inputs.memory), barTop - 5, toX(inputs.memory), barTop + 37);
  return bottom;
}

// A label centered on a limit line, kept inside the drawing width
function drawLimitLabel(label, lineX, y, x, w) {
  textSize(13.5 * textScale);
  const half = textWidth(label) / 2;
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  text(label, constrain(lineX, x + half, x + w - half), y);
}

// The calculation written out with the current values
function working(inputs, result) {
  const bits = precisions[inputs.precision].bits;
  return 'Weights: ' + formatNumber(inputs.parameters, 1) + ' × ' + formatNumber(bits, 1) + ' ÷ 8 = ' + formatNumber(result.weights, 1) + ' GB\n' +
    'Cache: ' + formatNumber(inputs.context, 0) + ' × ' + formatNumber(inputs.kvPerToken, 0) + ' KiB = ' + formatNumber(result.cache, 1) + ' GB\n' +
    'Needed: ' + formatNumber(result.weights, 1) + ' + ' + formatNumber(result.cache, 1) + ' + ' + formatNumber(inputs.overhead, 1) + ' = ' + formatNumber(result.needed, 1) + ' GB\n' +
    'Usable: ' + formatNumber(inputs.memory, 0) + ' × (1 − ' + formatNumber(inputs.headroom, 2) + ') = ' + formatNumber(result.usable, 1) + ' GB';
}

// ---------- answer controls: gigabytes, then a verdict ----------
let neededInput, verdictGroup;

function createAnswerControls() {
  neededInput = createInput('', 'number');
  neededInput.attribute('min', '0');
  neededInput.attribute('step', '0.1');
  neededInput.style('font-size', '16px');
  neededInput.input(answerChanged);
  verdictGroup = makeChoiceButtons(verdicts);
}

function placeAnswerControls() {
  neededInput.position(margin + 190, drawHeight + 10);
  neededInput.size(90);
  placeButtonsInRows(verdictGroup, margin + 190, drawHeight + 46);
}

function resetAnswerControls() {
  neededInput.value('');
  verdictGroup.selected = null;
}

function syncAnswerControls() {
  const inChallenge = phase === 'challenge';
  setVisible(neededInput, inChallenge);
  setEnabled(neededInput, status === 'open');
  verdictGroup.locked = status !== 'open';
  for (const b of verdictGroup.buttons) setVisible(b, inChallenge);
  paintChoiceButtons(verdictGroup, status !== 'open' ? compute(challenges[current].inputs).verdict : undefined);
}

function answerReady() {
  return neededInput.value() !== '' && !isNaN(Number(neededInput.value())) && verdictGroup.selected !== null;
}

// The memory must be within 1 GB, and the verdict must match
function answerIsCorrect(result) {
  return abs(Number(neededInput.value()) - result.needed) <= 1 && verdictGroup.selected === result.verdict;
}

function answerText(result) {
  return formatNumber(result.needed, 1) + ' GB, ' + result.verdict + '.';
}

function drawAnswerLabels() {
  text('Memory needed (GB):', margin, drawHeight + 14);
  text('Verdict:', margin, drawHeight + 52);
}

// A horizontal bar made of segments placed end to end, with a key under it.
// Each segment is { label, value, color } and fullScale is the value at the
// full width. Returns the y just below the key.
function drawStackedBar(segments, fullScale, unit, x, y, w, barHeight) {
  let left = x;
  for (const s of segments) {
    const sw = w * s.value / fullScale;
    fill(s.color);
    stroke('white');
    strokeWeight(1);
    rect(left, y, sw, barHeight);
    left += sw;
  }
  // the key: a swatch, the name, and the value of each segment
  let kx = x;
  let ky = y + barHeight + 10;
  textSize(14 * textScale);
  textAlign(LEFT, TOP);
  for (const s of segments) {
    const label = s.label + ': ' + formatNumber(s.value, 1) + ' ' + unit;
    const kw = 20 + textWidth(label) + 18;
    if (kx > x && kx + kw > x + w) {
      kx = x;
      ky += 20 * textScale;
    }
    fill(s.color);
    noStroke();
    rect(kx, ky + 1, 14, 12 * textScale);
    fill('black');
    text(label, kx + 20, ky);
    kx += kw;
  }
  return ky + 18 * textScale;
}

// A white rounded panel with a small heading and wrapped body text. The tag,
// when given, sits at the right of the heading and states where the content
// comes from. Returns the y just below the panel.
function drawTextPanel(heading, tag, body, x, y, w, size, mono) {
  const pad = 12;
  const headSize = 15 * textScale;
  const bodySize = size * textScale;
  push();
  if (mono) textFont('monospace');
  const bodyHeight = wrappedHeight(body, w - 2 * pad, bodySize, NORMAL);
  pop();
  const h = pad + headSize * 1.6 + bodyHeight + pad;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();

  fill('dimgray');
  textSize(headSize);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(heading, x + pad, y + pad);
  textStyle(ITALIC);
  textAlign(RIGHT, TOP);
  text(tag, x + w - pad, y + pad);
  textStyle(NORMAL);

  fill('black');
  push();
  if (mono) textFont('monospace');
  drawWrapped(body, x + pad, y + pad + headSize * 1.6, w - 2 * pad, bodySize, NORMAL);
  pop();
  return y + h;
}

// ---------- choice buttons ----------

// Create one button per label. Clicking a button selects that choice, and the
// choice can be changed until the answer is confirmed.
function makeChoiceButtons(labels) {
  const group = { labels: labels, buttons: [], widths: [], selected: null, locked: false };
  for (const label of labels) {
    const b = createButton(label);
    b.style('font-size', '15px');
    b.style('padding', '5px 12px');
    b.style('border', '1px solid gray');
    b.style('border-radius', '6px');
    b.style('cursor', 'pointer');
    b.mousePressed(() => {
      if (group.locked) return;
      group.selected = label;
      answerChanged();
    });
    group.buttons.push(b);
    group.widths.push(b.elt.offsetWidth);  // measured once, while the button is visible
  }
  return group;
}

// Color the buttons. The selected choice is blue. After the reveal the correct
// choice turns green and a wrong selection turns salmon.
function paintChoiceButtons(group, correctLabel) {
  for (let i = 0; i < group.labels.length; i++) {
    const label = group.labels[i];
    const isSelected = label === group.selected;
    let color = isSelected ? 'lightskyblue' : 'white';
    if (correctLabel !== undefined) {
      if (label === correctLabel) color = 'palegreen';
      else if (isSelected) color = 'lightsalmon';
    }
    group.buttons[i].style('background-color', color);
    group.buttons[i].style('outline', isSelected ? '2px solid navy' : 'none');
  }
}

// Place the buttons left to right from (x, y), starting a new row when a
// button would pass the right margin
function placeButtonsInRows(group, x, y) {
  let cx = x;
  for (let i = 0; i < group.buttons.length; i++) {
    if (cx > x && cx + group.widths[i] > canvasWidth - margin) {
      cx = x;
      y += 36;
    }
    group.buttons[i].position(cx, y);
    cx += group.widths[i] + 8;
  }
}

// ---------- control helpers ----------

function setVisible(control, on) {
  if (on) control.show();
  else control.hide();
}

function setEnabled(control, on) {
  if (on) control.removeAttribute('disabled');
  else control.attribute('disabled', '');
}

// ---------- text helpers ----------

// Split a string into the lines that fit in maxWidth at the current text settings
function wrapLines(str, maxWidth) {
  const lines = [];
  for (const paragraph of String(str).split('\n')) {
    let line = '';
    for (const word of paragraph.split(' ')) {
      const candidate = line === '' ? word : line + ' ' + word;
      if (line !== '' && textWidth(candidate) > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    lines.push(line);
  }
  return lines;
}

// Height of a string once it is wrapped to maxWidth
function wrappedHeight(str, maxWidth, size, style) {
  textSize(size);
  textStyle(style);
  const h = wrapLines(str, maxWidth).length * size * 1.3;
  textStyle(NORMAL);
  return h;
}

// Draw wrapped text from (x, y) and return the y just below the last line
function drawWrapped(str, x, y, maxWidth, size, style) {
  textSize(size);
  textStyle(style);
  textAlign(LEFT, TOP);
  noStroke();
  for (const line of wrapLines(str, maxWidth)) {
    text(line, x, y);
    y += size * 1.3;
  }
  textStyle(NORMAL);
  return y;
}

// These two functions must be present for width responsive MicroSims
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  // Get the width of the <main> element
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);  // Avoid fractional pixels
}
