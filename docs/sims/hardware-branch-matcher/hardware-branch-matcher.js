// Hardware Finding to Setup Branch Matcher MicroSim (sim id: hardware-branch-matcher)
// CANVAS_HEIGHT: 532
// The learner reads six hardware probe findings and chooses the setup branch
// that each finding triggers. A branch is confirmed before the answer is
// revealed, and the final screen names the misconception behind each miss.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 350;
// The control region holds the list of six branches, then Confirm and Next
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Hardware Finding to Setup Branch Matcher';
const itemNoun = 'Finding';
const itemNounPlural = 'Findings';
const question = 'Which setup branch does this finding trigger?';
const answerNoun = 'branch';
const contentTag = 'synthetic example';
const masteryCount = 5;
const choices = [
  'Use aarch64 packages',
  'Use x86_64 packages',
  'Size models against one shared memory pool',
  "Size models against one GPU's dedicated memory",
  'Plan to split the model across several GPUs',
  "Choose a CUDA build at or below the driver's version"
];
const screenReaderText = 'A matching exercise with six hardware probe findings. For each finding, choose the setup branch it triggers from a list of six, then confirm to see the correct branch and the reason. A final screen shows the score and the misconception behind each miss.';

const misconceptions = [
  'Every DGX has dedicated GPU memory.',
  'A download that completes will run on any DGX.',
  'nvidia-smi always reports how much GPU memory there is.',
  'A newer CUDA build is always better.'
];

// Each item has the finding, its correct branch, the reason shown after the
// reveal, and the index of the misconception that a miss most likely reflects
// (null when none fits).
const items = [
  { text: 'uname -m prints aarch64.',
    answer: 'Use aarch64 packages',
    why: 'The processor is Arm, so only builds for aarch64 will run.', misconception: 1 },
  { text: 'uname -m prints x86_64.',
    answer: 'Use x86_64 packages',
    why: 'The processor is Intel or AMD, so builds for x86_64 are the ones that run.', misconception: 1 },
  { text: 'nvidia-smi lists one GPU with memory reported as Not Supported; free -h shows about 120 GiB of memory.',
    answer: 'Size models against one shared memory pool',
    why: "The GPU has no memory of its own, so the system's memory is the limit.", misconception: 0 },
  { text: 'nvidia-smi lists one GPU with 80 GB of memory; free -h shows 512 GiB.',
    answer: "Size models against one GPU's dedicated memory",
    why: "The weights must fit in the GPU's own 80 GB, however much system RAM there is.", misconception: null },
  { text: 'nvidia-smi lists eight GPUs of 80 GB each.',
    answer: 'Plan to split the model across several GPUs',
    why: 'A model larger than 80 GB can run only if it is divided across the GPUs.', misconception: null },
  { text: 'The driver reports CUDA 13.0; the framework build you downloaded needs CUDA 13.2.',
    answer: "Choose a CUDA build at or below the driver's version",
    why: 'The driver sets a ceiling, and a runtime above it will not start.', misconception: 3 }
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

// The probe finding to act on
function drawStimulus(item, x, y, w) {
  return drawTextPanel(itemNoun + ' ' + (current + 1), contentTag, item.text, x, y, w, 17, false);
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

// ---------- answer controls: one list of choices ----------
let choiceList;

function createAnswerControls() {
  choiceList = makeChoiceList(choices);
}

function placeAnswerControls() {
  choiceList.position(margin, drawHeight + 10);
  choiceList.size(canvasWidth - 2 * margin);
}

function resetAnswerControls() {
  choiceList.elt.selectedIndex = -1;
}

function syncAnswerControls() {
  setVisible(choiceList, phase === 'quiz');
  setEnabled(choiceList, !revealed);
}

function answerReady() {
  return choiceList.elt.selectedIndex >= 0;
}

function answerIsCorrect(item) {
  return choiceList.value() === item.answer;
}

function correctAnswerText(item) {
  return 'Correct ' + answerNoun + ': ' + item.answer;
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
