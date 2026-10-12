// Words to Tokens Estimator MicroSim (sim id: words-to-tokens-estimator)
// CANVAS_HEIGHT: 586
// The learner estimates the token count of six documents from their word
// counts, then decides whether each document and a 2,000-token reply fit in a
// given context window. Both answers are confirmed before the reveal, which
// draws the document and the reply against the window.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 456;
// The control region holds the token entry, the two fit buttons, then Confirm
// and Next
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Words to Tokens Estimator';
const itemNoun = 'Item';
const itemNounPlural = 'Items';
const question = 'How many tokens is this, and does it fit?';
const contentTag = 'illustrative';
const masteryCount = 5;
const choices = ['Fits', 'Does not fit'];
const tokensPerWord = 1.33;
const replyTokens = 2000;    // the reply that is always reserved
const rule = 'Estimated tokens = words × 1.33. The reply always reserves 2,000 tokens. An item fits when the estimated tokens plus 2,000 is at most the window.';
const screenReaderText = 'A calculation exercise with six items. Each item gives a document length in words and a context window in tokens. Estimated tokens are words times 1.33, and a reply of 2,000 tokens is always reserved. Enter the estimated token count, choose Fits or Does not fit, and confirm to see the model value, the total with the reply, and the reason. A final screen shows the score and the misconception behind each miss.';

const misconceptions = [
  'A token is a word, so the token count equals the word count.',
  'The context window holds only the document, and the reply does not count against it.',
  'A document that fits by itself also fits with the reply.',
  'A model with a larger window can always use all of it.'
];

// Each item has the document length in words, the window in tokens, the correct
// choice, the reason shown after the reveal, and the index of the misconception
// that a miss most likely reflects.
const items = [
  { words: 1000, window: 8000, answer: 'Fits',
    why: '3,330 is below 8,000, so there is room to spare.', misconception: 0 },
  { words: 5000, window: 8000, answer: 'Does not fit',
    why: 'The document alone is 6,650 tokens, but with the 2,000-token reply the total is 8,650, which is over 8,000.', misconception: 1 },
  { words: 4000, window: 8000, answer: 'Fits',
    why: '7,320 is below 8,000, so the reply also fits.', misconception: 0 },
  { words: 55000, window: 128000, answer: 'Fits',
    why: '75,150 is below 128,000, so a whole book of this size fits.', misconception: 0 },
  { words: 95000, window: 128000, answer: 'Does not fit',
    why: 'The document alone is under the window, but 128,350 is over 128,000 by 350 tokens.', misconception: 2 },
  { words: 95000, window: 256000, answer: 'Fits',
    why: 'The same document fits easily in a 256,000-token window.', misconception: 0 }
];

// ---------- quiz state ----------
let phase = 'quiz';      // 'quiz' while items are answered, then 'results'
let current = 0;         // index of the item on screen
let revealed = false;    // true once the answer to the current item is shown
let outcomes = [];       // true or false for each answered item, in order
let textScale = 1;       // shrinks the text when a narrow canvas would overflow
let lastWidth = 0;       // canvas width at the previous frame
let confirmButton, nextButton, restartButton;

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Always use the native builtin p5.js controls
  createAnswerControls();
  confirmButton = createButton('Confirm');
  confirmButton.mousePressed(confirmAnswer);
  nextButton = createButton('Next');
  nextButton.mousePressed(nextItem);
  restartButton = createButton('Start over');
  restartButton.mousePressed(restartQuiz);
  for (const b of [confirmButton, nextButton, restartButton]) b.style('font-size', '15px');

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

  const bottom = phase === 'quiz' ? drawItem() : drawResults();
  // if the content ran past the drawing area, use smaller text on the next frame
  if (bottom > drawHeight - 6 && textScale > 0.6) textScale -= 0.04;

  drawControlLabels();
}

// One item: the progress line, the stimulus, the question, and the feedback
function drawItem() {
  const item = items[current];
  const x = margin;
  const w = canvasWidth - 2 * margin;

  // progress on the left, and the running score on the right
  fill('dimgray');
  noStroke();
  textSize(15 * textScale);
  textAlign(LEFT, TOP);
  text(itemNoun + ' ' + (current + 1) + ' of ' + items.length, x, 40);
  textAlign(RIGHT, TOP);
  text('Correct so far: ' + countCorrect() + ' of ' + outcomes.length, x + w, 40);

  let y = drawStimulus(item, x, 64, w);

  fill('black');
  y = drawWrapped(question, x, y + 10, w, 17 * textScale, BOLD);
  if (revealed) y = drawFeedback(item, x, y + 8, w);
  return y;
}

// The reveal: correct or not, the right answer after a miss, and the reason
function drawFeedback(item, x, y, w) {
  const correct = outcomes[current];
  const pad = 10;
  const bar = 6;
  const size = 16 * textScale;
  const inner = w - 2 * pad - bar;
  const verdict = correct ? 'Correct' : 'Not quite';
  const answerLine = correct ? '' : correctAnswerText(item);
  let h = 2 * pad + wrappedHeight(verdict, inner, size, BOLD) + wrappedHeight(item.why, inner, size, NORMAL);
  if (answerLine) h += wrappedHeight(answerLine, inner, size, BOLD);

  fill('white');
  stroke(correct ? 'forestgreen' : 'darkorange');
  strokeWeight(2);
  rect(x, y, w, h, 8);
  // the bar and the wording both carry the result, so color is not the only cue
  noStroke();
  fill(correct ? 'forestgreen' : 'darkorange');
  rect(x, y, bar, h, 8, 0, 0, 8);

  let ty = y + pad;
  fill(correct ? 'darkgreen' : 'saddlebrown');
  ty = drawWrapped(verdict, x + pad + bar, ty, inner, size, BOLD);
  fill('black');
  if (answerLine) ty = drawWrapped(answerLine, x + pad + bar, ty, inner, size, BOLD);
  drawWrapped(item.why, x + pad + bar, ty, inner, size, NORMAL);
  return y + h;
}

// The final screen: the score, then the misconception behind each miss
function drawResults() {
  const x = margin;
  const w = canvasWidth - 2 * margin;
  const score = countCorrect();
  const size = 16 * textScale;

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(26 * textScale);
  text(score + ' of ' + items.length + ' correct', canvasWidth / 2, 46);
  textStyle(NORMAL);

  let y = 46 + 38 * textScale;
  const mark = masteryCount + ' of ' + items.length;
  const summary = score >= masteryCount
    ? 'You reached the mastery mark of ' + mark + ' on this attempt.'
    : 'The mastery mark is ' + mark + ' on a first attempt. Review the misses below, then start over.';
  y = drawWrapped(summary, x, y, w, size, NORMAL) + 8;

  if (score === items.length) {
    fill('darkgreen');
    return drawWrapped('No misses. Every answer matched the key.', x, y, w, size, BOLD);
  }

  // group the missed items by the misconception each one points to
  const groups = {};
  outcomes.forEach((ok, i) => {
    if (ok) return;
    const key = items[i].misconception;
    if (!groups[key]) groups[key] = [];
    groups[key].push(i + 1);
  });
  const rows = [];
  for (const key in groups) {
    const numbers = groups[key];
    rows.push({
      lead: (numbers.length > 1 ? itemNounPlural : itemNoun) + ' ' + numbers.join(', '),
      body: key === 'null'
        ? 'No single listed misconception explains this. Read the reason shown after the reveal.'
        : misconceptions[key]
    });
  }

  // two columns: which items were missed, and the misconception to check
  const pad = 12;
  textSize(size);
  textStyle(BOLD);
  let leadWidth = textWidth('Missed');
  for (const row of rows) leadWidth = max(leadWidth, textWidth(row.lead));
  textStyle(NORMAL);
  const bodyX = x + pad + leadWidth + 18;
  const bodyWidth = x + w - pad - bodyX;
  const headHeight = size * 1.7;
  let h = 2 * pad + headHeight;
  for (const row of rows) h += wrappedHeight(row.body, bodyWidth, size, NORMAL) + 7;

  fill('white');
  stroke('darkorange');
  strokeWeight(1.5);
  rect(x, y, w, h, 8);
  fill('saddlebrown');
  drawWrapped('Missed', x + pad, y + pad, leadWidth + 4, size, BOLD);
  drawWrapped('Misconception to check', bodyX, y + pad, bodyWidth, size, BOLD);
  fill('black');
  let ty = y + pad + headHeight;
  for (const row of rows) {
    drawWrapped(row.lead, x + pad, ty, leadWidth + 4, size, BOLD);
    ty = drawWrapped(row.body, bodyX, ty, bodyWidth, size, NORMAL) + 7;
  }
  return y + h;
}

function countCorrect() {
  return outcomes.filter(Boolean).length;
}

// Lock in the answer and reveal the result. There is no second attempt.
function confirmAnswer() {
  if (phase !== 'quiz' || revealed || !answerReady()) return;
  outcomes[current] = answerIsCorrect(items[current]);
  revealed = true;
  syncControls();
}

function nextItem() {
  if (!revealed) return;
  revealed = false;
  textScale = 1;
  if (current < items.length - 1) current++;
  else phase = 'results';
  resetAnswerControls();
  syncControls();
}

function restartQuiz() {
  phase = 'quiz';
  current = 0;
  revealed = false;
  outcomes = [];
  textScale = 1;
  resetAnswerControls();
  syncControls();
}

// Called by an answer control whenever the learner changes a choice
function answerChanged() {
  syncControls();
}

// Show, hide, enable, and disable the controls to match the current state
function syncControls() {
  const inQuiz = phase === 'quiz';
  setVisible(confirmButton, inQuiz);
  setEnabled(confirmButton, inQuiz && !revealed && answerReady());
  setVisible(nextButton, inQuiz);
  setEnabled(nextButton, inQuiz && revealed);
  nextButton.html(current < items.length - 1 ? 'Next ' + itemNoun.toLowerCase() : 'See results');
  setVisible(restartButton, phase === 'results');
  syncAnswerControls();
}

// Position every control. Called at setup and whenever the width changes.
function placeControls() {
  const y = drawHeight + controlHeight - 38;
  placeAnswerControls();
  confirmButton.position(margin, y);
  nextButton.position(margin + 92, y);
  restartButton.position(margin, drawHeight + 12);
}

// The rule, the item's two numbers, and after the reveal a bar that sets the
// document and the reply against the window
function drawStimulus(item, x, y, w) {
  y = drawTextPanel('The rule', contentTag, rule, x, y, w, 15, false);
  const facts = 'Document: ' + formatNumber(item.words) + ' words        Context window: ' + formatNumber(item.window) + ' tokens';
  y = drawTextPanel(itemNoun + ' ' + (current + 1), '', facts, x, y + 8, w, 18, false);
  if (revealed) y = drawWindowBar(item, x, y + 10, w);
  return y;
}

// Document tokens and reply tokens end to end, with the window marked
function drawWindowBar(item, x, y, w) {
  const tokens = estimatedTokens(item);
  const total = tokens + replyTokens;
  const fullScale = max(total, item.window) * 1.08;   // tokens across the full width
  const barHeight = 26;
  const toX = value => x + w * value / fullScale;

  fill('steelblue');
  noStroke();
  rect(x, y, toX(tokens) - x, barHeight);
  fill('darkorange');
  rect(toX(tokens), y, toX(total) - toX(tokens), barHeight);

  // the window is a vertical line through the bar
  stroke('black');
  strokeWeight(2.5);
  line(toX(item.window), y - 5, toX(item.window), y + barHeight + 5);

  fill('black');
  noStroke();
  textSize(14 * textScale);
  textAlign(LEFT, TOP);
  const key = 'Blue: document, ' + formatNumber(tokens) + ' tokens.  Orange: reply, 2,000 tokens.  Total: ' +
    formatNumber(total) + '.  Black line: window, ' + formatNumber(item.window) + '.';
  return drawWrapped(key, x, y + barHeight + 9, w, 14 * textScale, NORMAL);
}

function estimatedTokens(item) {
  return Math.round(item.words * tokensPerWord);
}

function formatNumber(value) {
  return value.toLocaleString('en-US');
}

// ---------- answer controls: a token count, then fits or does not fit ----------
let tokenInput, choiceGroup;

function createAnswerControls() {
  tokenInput = createInput('', 'number');
  tokenInput.attribute('min', '0');
  tokenInput.attribute('max', '300000');
  tokenInput.attribute('step', '1');
  tokenInput.style('font-size', '16px');
  tokenInput.input(answerChanged);
  choiceGroup = makeChoiceButtons(choices);
}

function placeAnswerControls() {
  tokenInput.position(margin + 150, drawHeight + 10);
  tokenInput.size(110);
  placeButtonsInRows(choiceGroup, margin + 150, drawHeight + 48);
}

function resetAnswerControls() {
  tokenInput.value('');
  choiceGroup.selected = null;
}

function syncAnswerControls() {
  const inQuiz = phase === 'quiz';
  setVisible(tokenInput, inQuiz);
  setEnabled(tokenInput, !revealed);
  choiceGroup.locked = revealed;
  for (const b of choiceGroup.buttons) setVisible(b, inQuiz);
  paintChoiceButtons(choiceGroup, revealed ? items[current].answer : undefined);
}

// The entry must be a whole number from 0 to 300,000, and a choice must be made
function answerReady() {
  const value = Number(tokenInput.value());
  const entryReady = tokenInput.value() !== '' && Number.isInteger(value) && value >= 0 && value <= 300000;
  return entryReady && choiceGroup.selected !== null;
}

// The entry must be within 1% of the model value, and the choice must match
function answerIsCorrect(item) {
  const tokens = estimatedTokens(item);
  const entryCorrect = abs(Number(tokenInput.value()) - tokens) <= tokens * 0.01;
  return entryCorrect && choiceGroup.selected === item.answer;
}

function correctAnswerText(item) {
  const tokens = estimatedTokens(item);
  return 'Model value: ' + formatNumber(tokens) + ' tokens, ' + formatNumber(tokens + replyTokens) +
    ' with the reply. Correct choice: ' + item.answer;
}

function drawControlLabels() {
  if (phase !== 'quiz') return;
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Estimated tokens:', margin, drawHeight + 14);
  text('With the reply, it:', margin, drawHeight + 54);
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
