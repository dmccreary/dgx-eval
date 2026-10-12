// Model Shortlist Filter MicroSim (sim id: model-shortlist-filter)
// CANVAS_HEIGHT: 634
// The learner applies four selection criteria, in a fixed order, to eight
// candidate models for a 128 GB unified-memory machine. Each card is either
// shortlisted or excluded, and an exclusion names the first criterion that
// fails. Both choices are confirmed before the answer is revealed.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 456;
// The control region holds the decision buttons, the list of four criteria,
// then Confirm and Next
let controlHeight = 178;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Model Shortlist Filter';
const itemNoun = 'Card';
const itemNounPlural = 'Cards';
const question = 'Does this model go on the shortlist, and if not, which criterion fails first?';
const contentTag = 'synthetic example';
const masteryCount = 7;
const verdicts = ['Shortlist', 'Exclude'];
const reasons = ['Tool calling', 'Context window', 'Fit with headroom', 'Publisher and terms'];
const reasonNeededFor = 'Exclude';   // a shortlisted model fails no criterion
const verdictNoun = 'decision';
const reasonNoun = 'First failed criterion';
const verdictLabel = 'Decision:';
const reasonLabel = 'First failed criterion, if excluding:';
const screenReaderText = 'A selection exercise with eight candidate model cards for a machine with 128 gigabytes of unified memory. Four criteria are checked in order: tool calling, context window, fit with headroom, and publisher and terms. For each card, choose Shortlist or Exclude. For Exclude, also choose the first criterion that fails. Confirm to see the correct decision and the reason. A final screen shows the score and the misconception behind each miss.';

// The machine, and the four criteria in the order they are checked
const machineNote = '128 GB of unified memory with 20% headroom leaves 102.4 GB usable. Each memory figure is the estimate at a 32,768-token context.';
const criteria = [
  ['1. Tool calling', 'supports tool calling'],
  ['2. Context window', 'at least 64,000 tokens'],
  ['3. Fit with headroom', 'memory at most 102.4 GB'],
  ['4. Publisher and terms', 'publisher identified, license readable']
];

const misconceptions = [
  'A model that fits in raw memory is acceptable.',
  'A large context window makes up for a missing tool-calling feature.',
  'A missing license statement is as good as a permissive one.',
  'A popular name is proof of provenance.'
];

// Each item is one model card: its five facts, the correct decision, the first
// failed criterion (null for a shortlisted model), the reason shown after the
// reveal, and the index of the misconception that a miss most likely reflects.
const items = [
  { name: 'Model A', tools: 'yes', window: '256,000 tokens', memory: '29 GB', license: 'Apache 2.0', publisher: 'identified',
    verdict: 'Shortlist', reason: null,
    why: 'It passes all four criteria.', misconception: null },
  { name: 'Model B', tools: 'no', window: '128,000 tokens', memory: '20 GB', license: 'Apache 2.0', publisher: 'identified',
    verdict: 'Exclude', reason: 'Tool calling',
    why: 'A harness acts through tool calls, so a model without them cannot run a skill.', misconception: 1 },
  { name: 'Model C', tools: 'yes', window: '32,000 tokens', memory: '18 GB', license: 'Apache 2.0', publisher: 'identified',
    verdict: 'Exclude', reason: 'Context window',
    why: '32,000 tokens is below the 64,000 minimum, and the harness prompt alone takes about 19,000.', misconception: null },
  { name: 'Model D', tools: 'yes', window: '128,000 tokens', memory: '118 GB', license: 'Apache 2.0', publisher: 'identified',
    verdict: 'Exclude', reason: 'Fit with headroom',
    why: '118 GB is above the usable 102.4 GB, so it would run with no margin on a unified-memory machine.', misconception: 0 },
  { name: 'Model E', tools: 'yes', window: '256,000 tokens', memory: '40 GB', license: 'not stated', publisher: 'identified',
    verdict: 'Exclude', reason: 'Publisher and terms',
    why: 'Without a license the terms cannot be checked, so a result could not be recommended.', misconception: 2 },
  { name: 'Model F', tools: 'yes', window: '128,000 tokens', memory: '69 GB', license: 'Apache 2.0', publisher: 'identified',
    verdict: 'Shortlist', reason: null,
    why: 'It passes all four criteria, and 69 GB is under 102.4 GB.', misconception: null },
  { name: 'Model G', tools: 'yes', window: '256,000 tokens', memory: '24 GB', license: 'Apache 2.0', publisher: 'an unknown repackager',
    verdict: 'Exclude', reason: 'Publisher and terms',
    why: 'The weights cannot be traced to the original publisher, so the measurement would be of an unknown file.', misconception: 3 },
  { name: 'Model H', tools: 'yes', window: '1,000,000 tokens', memory: '25 GB',
    license: "custom, published in the repository's license file", publisher: 'identified',
    verdict: 'Shortlist', reason: null,
    why: 'The terms are readable, so they can be checked, and every other criterion passes.', misconception: null }
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

// The machine note, then the model card beside the four criteria
function drawStimulus(item, x, y, w) {
  fill('black');
  y = drawWrapped(machineNote, x, y, w, 15 * textScale, NORMAL) + 6;

  const gap = 12;
  const cardWidth = (w - gap) * 0.52;
  const rows = [
    ['Tool calling', item.tools],
    ['Context window', item.window],
    ['Memory', item.memory],
    ['License', item.license],
    ['Publisher', item.publisher]
  ];
  const cardBottom = drawFactPanel(item.name, contentTag, rows, x, y, cardWidth, 0.42);
  const criteriaBottom = drawFactPanel('Criteria, checked in this order', '', criteria, x + cardWidth + gap, y, w - cardWidth - gap, 0.46);
  return max(cardBottom, criteriaBottom);
}

// A white panel holding rows of a name and a value. split is the share of the
// width given to the name column. Returns the y just below the panel.
function drawFactPanel(heading, tag, rows, x, y, w, split) {
  const pad = 12;
  const headSize = 15 * textScale;
  const size = 15 * textScale;
  const nameWidth = (w - 2 * pad) * split;
  const valueWidth = w - 2 * pad - nameWidth;
  let h = pad + headSize * 1.6 + pad;
  for (const row of rows) {
    h += max(wrappedHeight(row[0], nameWidth - 8, size, BOLD), wrappedHeight(row[1], valueWidth, size, NORMAL)) + 3;
  }

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
  let ty = y + pad + headSize * 1.6;
  for (const row of rows) {
    const nameBottom = drawWrapped(row[0], x + pad, ty, nameWidth - 8, size, BOLD);
    const valueBottom = drawWrapped(row[1], x + pad + nameWidth, ty, valueWidth, size, NORMAL);
    ty = max(nameBottom, valueBottom) + 3;
  }
  return y + h;
}

// ---------- answer controls: a verdict, then a reason ----------
let verdictGroup, reasonList;
const labelWidth = 150;  // room for the two labels drawn beside the controls

function createAnswerControls() {
  verdictGroup = makeChoiceButtons(verdicts);
  reasonList = makeChoiceList(reasons);
}

function placeAnswerControls() {
  placeButtonsInRows(verdictGroup, margin + labelWidth, drawHeight + 8);
  reasonList.position(margin + labelWidth, drawHeight + 48);
  reasonList.size(canvasWidth - 2 * margin - labelWidth);
}

// A reason is asked for every verdict, or only for the one named in reasonNeededFor
function reasonNeeded() {
  return reasonNeededFor === null || verdictGroup.selected === reasonNeededFor;
}

function resetAnswerControls() {
  verdictGroup.selected = null;
  reasonList.elt.selectedIndex = -1;
}

function syncAnswerControls() {
  const inQuiz = phase === 'quiz';
  verdictGroup.locked = revealed;
  for (const b of verdictGroup.buttons) setVisible(b, inQuiz);
  paintChoiceButtons(verdictGroup, revealed ? items[current].verdict : undefined);
  setVisible(reasonList, inQuiz);
  if (!reasonNeeded()) reasonList.elt.selectedIndex = -1;
  setEnabled(reasonList, !revealed && reasonNeeded());
}

function answerReady() {
  if (verdictGroup.selected === null) return false;
  return !reasonNeeded() || reasonList.elt.selectedIndex >= 0;
}

// Both parts must match. An item whose verdict needs no reason has reason null.
function answerIsCorrect(item) {
  if (verdictGroup.selected !== item.verdict) return false;
  return item.reason === null || reasonList.value() === item.reason;
}

function correctAnswerText(item) {
  let line = 'Correct ' + verdictNoun + ': ' + item.verdict;
  if (item.reason !== null) line += '. ' + reasonNoun + ': ' + item.reason;
  return line;
}

// The labels beside the verdict buttons and the reason list
function drawControlLabels() {
  if (phase !== 'quiz') return;
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  text(verdictLabel, margin, drawHeight + 15);
  text(reasonLabel, margin, drawHeight + 52, labelWidth - 8, 80);
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

// ---------- choice list ----------

// A list box that shows every choice at once. One row can be selected.
function makeChoiceList(labels) {
  const list = createSelect();
  list.attribute('size', labels.length);
  list.style('font-size', '15px');
  for (const label of labels) list.option(label);
  list.elt.selectedIndex = -1;  // nothing is chosen yet
  list.changed(answerChanged);
  return list;
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
