// CIS Calculator MicroSim (sim id: cis-calculator)
// CANVAS_HEIGHT: 532
// The learner calculates the concept impact score (CIS) of six concepts in a
// small dependency graph. The concepts are presented in an order in which each
// one's dependents already have scores. An entry is confirmed before the
// correct value is revealed, and each confirmed value is then shown on the graph.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 440;
// The control region holds the number entry, then Confirm and Next
let controlHeight = 92;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'CIS Calculator';
const itemNoun = 'Step';
const itemNounPlural = 'Steps';
const contentTag = 'synthetic example';
const masteryCount = 5;
const rule = 'CIS(x) = 1 + the sum of CIS(d) for every concept d that needs x directly. A concept with no dependents scores 1.';
const screenReaderText = 'A calculation exercise on a dependency graph of six concepts, A to F. B and C need A. D needs B and C. E needs D. F needs C. The concept impact score of a concept is 1 plus the sum of the scores of the concepts that need it directly. Concepts are presented in the order E, F, D, C, B, A. Enter a whole number from 1 to 20 for each and confirm to see the correct value and the reason. A final screen shows the score and the misconception behind each miss.';

// The graph. Each node is placed in a unit square, and each edge is
// [dependent, prerequisite], read as "dependent needs prerequisite".
const nodes = { A: [0.05, 0.5], B: [0.35, 0.14], C: [0.35, 0.86], D: [0.65, 0.4], E: [0.95, 0.4], F: [0.65, 0.92] };
const edges = [['B', 'A'], ['C', 'A'], ['D', 'B'], ['D', 'C'], ['E', 'D'], ['F', 'C']];

const misconceptions = [
  "A concept's score counts only its direct dependents' count, not their scores.",
  "A concept's score excludes itself.",
  'The concept with the most direct dependents always has the highest score.'
];

// Each item has the concept, the question shown, its score, the reason shown
// after the reveal, and the index of the misconception that a miss most likely
// reflects.
const items = [
  { concept: 'E', question: 'How much of this graph rests on E?', cis: 1,
    why: 'Nothing depends on E, so only E itself counts: 1.', misconception: 1 },
  { concept: 'F', question: 'How much of this graph rests on F?', cis: 1,
    why: 'Nothing depends on F, so only F itself counts: 1.', misconception: 1 },
  { concept: 'D', question: 'How much of this graph rests on D?', cis: 2,
    why: "D counts itself plus E's score: 1 + 1 = 2.", misconception: 1 },
  { concept: 'C', question: 'How much of this graph rests on C?', cis: 4,
    why: "C counts itself plus D's score and F's score: 1 + 2 + 1 = 4.", misconception: 0 },
  { concept: 'B', question: 'How much of this graph rests on B?', cis: 3,
    why: "B counts itself plus D's score: 1 + 2 = 3.", misconception: 0 },
  { concept: 'A', question: 'How much of this graph rests on A?', cis: 8,
    why: "A counts itself plus B's score and C's score: 1 + 3 + 4 = 8.", misconception: 0 }
];

const nodeRadius = 22;

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
  y = drawWrapped(item.question, x, y + 10, w, 17 * textScale, BOLD);
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

// The graph on the left and the rule on the right
function drawStimulus(item, x, y, w) {
  const gap = 12;
  const graphWidth = (w - gap) * 0.62;
  const graphHeight = 236 * textScale;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, graphWidth, graphHeight, 8);
  drawGraph(item, x, y, graphWidth, graphHeight);

  const sideX = x + graphWidth + gap;
  const sideWidth = w - graphWidth - gap;
  const ruleBottom = drawTextPanel('The rule', contentTag, rule, sideX, y, sideWidth, 15, false);
  fill('dimgray');
  drawWrapped('An arrow from one concept to another means the first needs the second, so the first is a dependent of the second.',
    sideX, ruleBottom + 8, sideWidth, 14 * textScale, NORMAL);
  return y + graphHeight;
}

function drawGraph(item, gx, gy, gw, gh) {
  // where a concept's circle is centered inside the graph area
  const center = name => ({
    x: gx + nodeRadius + 26 + nodes[name][0] * (gw - 2 * nodeRadius - 52),
    y: gy + nodeRadius + 16 + nodes[name][1] * (gh - 2 * nodeRadius - 54)
  });

  for (const edge of edges) {
    const a = center(edge[0]);
    const b = center(edge[1]);
    const d = dist(a.x, a.y, b.x, b.y);
    const ux = (b.x - a.x) / d;
    const uy = (b.y - a.y) / d;
    drawArrow(a.x + ux * (nodeRadius + 2), a.y + uy * (nodeRadius + 2),
      b.x - ux * (nodeRadius + 3), b.y - uy * (nodeRadius + 3), 'dimgray', 1.8);
  }

  for (let i = 0; i < items.length; i++) {
    const name = items[i].concept;
    const c = center(name);
    const isCurrent = i === current;
    // a value is known once its step has been confirmed
    const isKnown = i < current || (isCurrent && revealed);
    fill(isKnown ? 'palegreen' : 'lightsteelblue');
    stroke(isCurrent ? 'darkorange' : 'steelblue');
    strokeWeight(isCurrent ? 4 : 1.5);
    circle(c.x, c.y, nodeRadius * 2);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(18);
    text(name, c.x, c.y);
    textStyle(NORMAL);
    textSize(14);
    textAlign(CENTER, TOP);
    text(isKnown ? 'CIS ' + items[i].cis : (isCurrent ? 'CIS ?' : ''), c.x, c.y + nodeRadius + 4);
  }
}

// ---------- answer controls: one whole number ----------
let scoreInput;

function createAnswerControls() {
  scoreInput = createInput('', 'number');
  scoreInput.attribute('min', '1');
  scoreInput.attribute('max', '20');
  scoreInput.attribute('step', '1');
  scoreInput.style('font-size', '16px');
  scoreInput.input(answerChanged);
}

function placeAnswerControls() {
  scoreInput.position(margin + 200, drawHeight + 10);
  scoreInput.size(70);
}

function resetAnswerControls() {
  scoreInput.value('');
}

function syncAnswerControls() {
  setVisible(scoreInput, phase === 'quiz');
  setEnabled(scoreInput, !revealed);
}

// The entry must be a whole number from 1 to 20
function answerReady() {
  const value = Number(scoreInput.value());
  return scoreInput.value() !== '' && Number.isInteger(value) && value >= 1 && value <= 20;
}

function answerIsCorrect(item) {
  return Number(scoreInput.value()) === item.cis;
}

function correctAnswerText(item) {
  return 'Correct value: ' + item.cis;
}

function drawControlLabels() {
  if (phase !== 'quiz') return;
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('CIS of ' + items[current].concept + ' (1 to 20):', margin, drawHeight + 14);
}

// A straight line with an arrowhead at the far end
function drawArrow(x1, y1, x2, y2, col, weight) {
  stroke(col);
  strokeWeight(weight);
  line(x1, y1, x2, y2);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  fill(col);
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
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
