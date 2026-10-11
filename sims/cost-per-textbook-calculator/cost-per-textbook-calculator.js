// Cost per Textbook Calculator MicroSim (sim id: cost-per-textbook-calculator)
// CANVAS_HEIGHT: 620
// The learner calculates what one generated textbook costs on an owned machine
// and what it must sell for at a stated margin. Three fixed scenarios come
// first, with two attempts each. Then five sliders drive the cost per book,
// the price, the cost per chapter, and the books a year. All values are
// estimates from the book's cost analysis, not measurements.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 440;
// The control region holds five sliders in exploration. In a scenario it holds
// the two dollar entries, then Check and Next.
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 330;   // room for a slider's name and value on its left
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Cost per Textbook Calculator';
const challengeNoun = 'Scenario';
const challengeNounPlural = 'Scenarios';
const question = 'What does one textbook cost, and what must it sell for?';
const contentTag = 'estimate, not a measurement';
const hoursPerYear = 8760;
const rules = 'Generating hours = 8,760 × utilization. Cost per generating hour = yearly cost ÷ generating hours. Cost per book = whole-book hours × cost per generating hour. Price = cost per book ÷ (1 − margin).';
const exploreHint = 'Try this: halve the utilization and watch the cost per book double. Then change the yearly cost by 10% and compare.';
const screenReaderText = 'A calculation exercise about the cost of one generated textbook. Generating hours are 8,760 times utilization. Cost per generating hour is yearly cost divided by generating hours. Cost per book is whole-book hours times cost per generating hour. Price is cost per book divided by one minus the margin. Three scenarios give the inputs. Type the cost per book and the price in dollars and press Check, with two attempts each. After the scenarios, five sliders change the inputs and the readouts follow.';

// The five quantities the learner can change in exploration
const quantities = [
  { key: 'yearlyCost', label: 'Yearly cost', min: 2000, max: 20000, step: 25, start: 8275,
    format: v => '$' + formatNumber(v, 0) + ' a year' },
  { key: 'utilization', label: 'Utilization', min: 0.05, max: 0.95, step: 0.05, start: 0.5,
    format: v => formatNumber(v, 2) + ' of 8,760 hours' },
  { key: 'bookHours', label: 'Whole-book hours', min: 5, max: 100, step: 1, start: 28,
    format: v => formatNumber(v, 0) + ' hours' },
  { key: 'margin', label: 'Margin', min: 0, max: 0.5, step: 0.05, start: 0.2,
    format: v => formatNumber(v, 2) + ' of the price' },
  { key: 'chapters', label: 'Chapters', min: 5, max: 30, step: 1, start: 13,
    format: v => formatNumber(v, 0) + ' chapters' }
];

// The three scenarios, with the working shown after a wrong check
const challenges = [
  { inputs: { yearlyCost: 8275, utilization: 0.5, bookHours: 28, margin: 0.2, chapters: 13 },
    feedback: '8,760 × 0.50 = 4,380 hours, $8,275 ÷ 4,380 = $1.89 an hour, × 28 = $52.9, ÷ 0.80 = $66.1.' },
  { inputs: { yearlyCost: 8275, utilization: 0.25, bookHours: 28, margin: 0.2, chapters: 13 },
    feedback: '8,760 × 0.25 = 2,190 hours, $8,275 ÷ 2,190 = $3.78 an hour, × 28 = $105.8, ÷ 0.80 = $132.2.' },
  { inputs: { yearlyCost: 8275, utilization: 0.5, bookHours: 17, margin: 0.2, chapters: 13 },
    feedback: '$1.89 an hour × 17 = $32.1, ÷ 0.80 = $40.1.' }
];

// The model. Dollar values are shown to one decimal.
function compute(inputs) {
  const generatingHours = hoursPerYear * inputs.utilization;
  const costPerHour = inputs.yearlyCost / generatingHours;
  const costPerBook = inputs.bookHours * costPerHour;
  return {
    generatingHours: generatingHours,
    costPerHour: costPerHour,
    costPerBook: costPerBook,
    price: costPerBook / (1 - inputs.margin),
    costPerChapter: costPerBook / inputs.chapters,
    booksPerYear: floor(generatingHours / inputs.bookHours)
  };
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
  const y = drawHeight + controlHeight - 38;
  checkButton.position(margin, y);
  nextButton.position(margin + 78, y);
  restartButton.position(margin, y);
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

// The price as one bar, split into the cost of the book and the margin on top
// of it, then the other readouts
function drawResult(inputs, result, x, y, w) {
  fill('black');
  noStroke();
  y = drawWrapped('Cost per book: $' + formatNumber(result.costPerBook, 1) + '. Price: $' + formatNumber(result.price, 1) + '.',
    x, y, w, 17 * textScale, BOLD) + 6;
  const segments = [
    { label: 'Cost per book', value: result.costPerBook, color: 'steelblue' },
    { label: 'Margin', value: result.price - result.costPerBook, color: 'darkorange' }
  ];
  y = drawStackedBar(segments, result.price, 'dollars', x, y, w, 30);
  fill('black');
  noStroke();
  return drawWrapped('Cost per chapter: $' + formatNumber(result.costPerChapter, 2) + '.   Books per year: ' +
    formatNumber(result.booksPerYear, 0) + '.', x, y + 4, w, 15 * textScale, NORMAL);
}

// The calculation written out with the current values
function working(inputs, result) {
  return 'Generating hours: 8,760 × ' + formatNumber(inputs.utilization, 2) + ' = ' + formatNumber(result.generatingHours, 0) + '\n' +
    'Cost per generating hour: $' + formatNumber(inputs.yearlyCost, 0) + ' ÷ ' + formatNumber(result.generatingHours, 0) + ' = $' + formatNumber(result.costPerHour, 2) + '\n' +
    'Cost per book: ' + formatNumber(inputs.bookHours, 0) + ' × $' + formatNumber(result.costPerHour, 2) + ' = $' + formatNumber(result.costPerBook, 1) + '\n' +
    'Price: $' + formatNumber(result.costPerBook, 1) + ' ÷ (1 − ' + formatNumber(inputs.margin, 2) + ') = $' + formatNumber(result.price, 1);
}

// ---------- answer controls: two dollar amounts ----------
let costInput, priceInput;

function createAnswerControls() {
  costInput = createInput('', 'number');
  priceInput = createInput('', 'number');
  for (const box of [costInput, priceInput]) {
    box.attribute('min', '0');
    box.attribute('step', '0.1');
    box.style('font-size', '16px');
    box.input(answerChanged);
  }
}

function placeAnswerControls() {
  costInput.position(margin + 250, drawHeight + 10);
  costInput.size(90);
  priceInput.position(margin + 250, drawHeight + 48);
  priceInput.size(90);
}

function resetAnswerControls() {
  costInput.value('');
  priceInput.value('');
}

function syncAnswerControls() {
  for (const box of [costInput, priceInput]) {
    setVisible(box, phase === 'challenge');
    setEnabled(box, status === 'open');
  }
}

function isNumberEntry(box) {
  return box.value() !== '' && !isNaN(Number(box.value()));
}

function answerReady() {
  return isNumberEntry(costInput) && isNumberEntry(priceInput);
}

// Both amounts must be within 1 dollar of the model values
function answerIsCorrect(result) {
  return abs(Number(costInput.value()) - result.costPerBook) <= 1 && abs(Number(priceInput.value()) - result.price) <= 1;
}

function answerText(result) {
  return 'cost $' + formatNumber(result.costPerBook, 1) + ', price $' + formatNumber(result.price, 1) + '.';
}

function drawAnswerLabels() {
  text('Cost per textbook (dollars):', margin, drawHeight + 14);
  text('Price at the stated margin (dollars):', margin, drawHeight + 52);
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
