// Agent Loop Stepper MicroSim (sim id: agent-loop-stepper)
// CANVAS_HEIGHT: 632
// The learner first steps through the five phases of one agent turn and watches
// the conversation grow. The learner then reads six situations and chooses what
// the harness does next in each. A choice is confirmed before the answer is
// revealed, and the final screen names the misconception behind each miss.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 450;
// The control region holds the list of six outcomes, then the step buttons
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Agent Loop Stepper';
const itemNoun = 'Situation';
const itemNounPlural = 'Situations';
const question = 'What does the harness do next?';
const answerNoun = 'outcome';
const contentTag = 'synthetic example';
const masteryCount = 5;
const choices = [
  'The harness runs the tool, appends the result, and calls the model again',
  'The loop ends and the reply is returned',
  'The harness sees no tool call and the loop ends early',
  'The conversation grows by the size of the result',
  'The harness compacts or truncates earlier content',
  'The run stalls waiting for an approval'
];
const screenReaderText = 'A two-part exercise about the agent loop. First, Next and Previous buttons step through the five phases of one turn on a diagram of the harness, the model, and the conversation. Then six situations are shown one at a time. For each, choose what the harness does next from a list of six outcomes and confirm to see the correct outcome and the reason. A final screen shows the score and the misconception behind each miss.';

// The walkthrough: the five phases of one turn
const introNoun = 'Phase';
const introQuestion = "What does the harness do with the model's reply?";
const introSteps = [
  'The harness sends the whole conversation to the model.',
  'The model writes a reply.',
  'The harness checks the reply for a tool call.',
  'If there is one, the harness checks the permission rules and runs the tool.',
  'The harness appends the reply and the result to the conversation, and the loop starts again.'
];
// Short labels for the five phase boxes, and which part does the work
const phaseBoxes = [
  { label: 'Send the whole conversation', actor: 'harness' },
  { label: 'Write a reply', actor: 'model' },
  { label: 'Check the reply for a tool call', actor: 'harness' },
  { label: 'Check permission, run the tool', actor: 'harness' },
  { label: 'Append the reply and the result', actor: 'harness' }
];

const misconceptions = [
  'The model runs its own tools.',
  'A tool call written as text still runs.',
  'The conversation is reset each turn.',
  'A permission question is answered automatically.'
];

// Each item has the situation, its correct outcome, the reason shown after the
// reveal, and the index of the misconception that a miss most likely reflects
// (null when none fits).
const items = [
  { text: 'The reply contains a well-formed request to read a file.',
    answer: 'The harness runs the tool, appends the result, and calls the model again',
    why: 'A tool call is exactly what the loop acts on.', misconception: 0 },
  { text: 'The reply is a finished answer with no tool call.',
    answer: 'The loop ends and the reply is returned',
    why: 'With no tool call the loop has nothing to run.', misconception: null },
  { text: 'The reply writes the tool call out as plain text inside its answer.',
    answer: 'The harness sees no tool call and the loop ends early',
    why: 'Only a structured request is a tool call, so the text is treated as a final reply.', misconception: 1 },
  { text: 'A shell command returns 8,000 tokens of output.',
    answer: 'The conversation grows by the size of the result',
    why: 'The result is appended, so every later turn reads it.', misconception: 2 },
  { text: "The conversation is about to exceed the model's window.",
    answer: 'The harness compacts or truncates earlier content',
    why: 'The conversation has to shrink to fit, by summary or by dropping the oldest content.', misconception: 2 },
  { text: 'A permission rule requires approval for the tool and nobody is present.',
    answer: 'The run stalls waiting for an approval',
    why: 'An unattended run cannot answer, so it waits.', misconception: 3 }
];

// ---------- quiz state ----------
let phase = 'intro';     // 'intro' for the walkthrough, 'quiz' while items are answered, then 'results'
let current = 0;         // index of the item on screen
let revealed = false;    // true once the answer to the current item is shown
let outcomes = [];       // true or false for each answered item, in order
let textScale = 1;       // shrinks the text when a narrow canvas would overflow
let lastWidth = 0;       // canvas width at the previous frame
let confirmButton, nextButton, restartButton;

// ---------- walkthrough ----------
let introStep = 0;       // index of the walkthrough step on screen
let previousButton, forwardButton;

function createIntroControls() {
  previousButton = createButton('Previous');
  previousButton.mousePressed(() => {
    introStep = max(0, introStep - 1);
    textScale = 1;
    syncControls();
  });
  forwardButton = createButton('Next');
  forwardButton.mousePressed(() => {
    if (introStep < introSteps.length - 1) introStep++;
    else phase = 'quiz';
    textScale = 1;
    syncControls();
  });
  for (const b of [previousButton, forwardButton]) b.style('font-size', '15px');
}

function resetIntro() {
  introStep = 0;
}

function placeIntroControls(y) {
  previousButton.position(margin, y);
  forwardButton.position(margin + 92, y);
}

function syncIntroControls() {
  const inIntro = phase === 'intro';
  setVisible(previousButton, inIntro);
  setVisible(forwardButton, inIntro);
  setEnabled(previousButton, inIntro && introStep > 0);
  forwardButton.html(introStep < introSteps.length - 1 ? 'Next' : 'Start the ' + itemNounPlural.toLowerCase());
}

// One walkthrough step: the diagram with this step marked, then the step's text
function drawIntro() {
  const x = margin;
  const w = canvasWidth - 2 * margin;
  fill('dimgray');
  noStroke();
  textSize(15 * textScale);
  textAlign(LEFT, TOP);
  text(introNoun + ' ' + (introStep + 1) + ' of ' + introSteps.length, x, 40);
  textAlign(RIGHT, TOP);
  text('Walkthrough, not scored', x + w, 40);

  let y = drawDiagram(introStep, x, 64, w);
  fill('black');
  y = drawWrapped(introQuestion, x, y + 10, w, 17 * textScale, BOLD);
  return drawTextPanel(introNoun + ' ' + (introStep + 1), '', introSteps[introStep], x, y + 6, w, 17, false);
}

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Always use the native builtin p5.js controls
  createIntroControls();
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

  let bottom;
  if (phase === 'intro') bottom = drawIntro();
  else if (phase === 'quiz') bottom = drawItem();
  else bottom = drawResults();
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
  phase = 'intro';
  resetIntro();
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
  syncIntroControls();
  syncAnswerControls();
}

// Position every control. Called at setup and whenever the width changes.
function placeControls() {
  const y = drawHeight + controlHeight - 38;
  placeIntroControls(drawHeight + 12);
  placeAnswerControls();
  confirmButton.position(margin, y);
  nextButton.position(margin + 92, y);
  restartButton.position(margin, drawHeight + 12);
}

// The loop diagram stays on screen above each situation
function drawStimulus(item, x, y, w) {
  y = drawDiagram(-1, x, y, w);
  return drawTextPanel(itemNoun + ' ' + (current + 1), contentTag, item.text, x, y + 8, w, 17, false);
}

// The five phases in a row with the conversation beside them. activeStep is the
// phase to mark, or -1 for none. Returns the y just below the diagram.
function drawDiagram(activeStep, x, y, w) {
  const stackWidth = min(190, w * 0.27);     // the conversation column on the right
  const rowWidth = w - stackWidth - 16;      // the five phase boxes
  const gap = 12;
  const boxWidth = (rowWidth - 4 * gap) / 5;
  const boxHeight = 84;
  const small = constrain(boxWidth / 7.6, 10, 14) * textScale;

  for (let i = 0; i < 5; i++) {
    const box = phaseBoxes[i];
    const bx = x + i * (boxWidth + gap);
    const isActive = i === activeStep;
    fill(box.actor === 'model' ? 'plum' : 'peachpuff');
    stroke(isActive ? 'black' : (box.actor === 'model' ? 'purple' : 'chocolate'));
    strokeWeight(isActive ? 3.5 : 1.2);
    rect(bx, y, boxWidth, boxHeight, 6);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(small);
    text((i + 1) + '. ' + (box.actor === 'model' ? 'Model' : 'Harness'), bx + boxWidth / 2, y + 7);
    textStyle(NORMAL);
    text(box.label, bx + 5, y + 9 + small * 1.4, boxWidth - 10, boxHeight - small * 1.4 - 10);

    // arrow to the next phase
    if (i < 4) drawArrow(bx + boxWidth, y + boxHeight / 2, bx + boxWidth + gap, y + boxHeight / 2, 'dimgray');
  }

  // the return path from phase 5 back to phase 1
  const loopY = y + boxHeight + 16;
  const lastX = x + 4 * (boxWidth + gap) + boxWidth / 2;
  const firstX = x + boxWidth / 2;
  stroke(activeStep === 4 ? 'black' : 'dimgray');
  strokeWeight(activeStep === 4 ? 3 : 1.5);
  noFill();
  line(lastX, y + boxHeight, lastX, loopY);
  line(lastX, loopY, firstX, loopY);
  drawArrow(firstX, loopY, firstX, y + boxHeight + 1, activeStep === 4 ? 'black' : 'dimgray');
  fill('dimgray');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13 * textScale);
  text('the loop starts again', (firstX + lastX) / 2, loopY + 4);

  // the conversation: two messages at the start of the turn, four once phase 5
  // has appended the reply and the tool result
  const sx = x + w - stackWidth;
  const messages = ['System prompt', 'User request'];
  if (activeStep === 4) messages.push('Model reply', 'Tool result');
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(sx, y, stackWidth, boxHeight + 34, 6);
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(13 * textScale);
  text('Conversation', sx + stackWidth / 2, y + 5);
  textStyle(NORMAL);
  for (let i = 0; i < messages.length; i++) {
    const my = y + 24 + i * 23;
    fill(i < 2 ? 'gainsboro' : 'khaki');
    stroke(i < 2 ? 'gray' : 'darkgoldenrod');
    strokeWeight(1);
    rect(sx + 8, my, stackWidth - 16, 19, 4);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12.5 * textScale);
    text(messages[i], sx + stackWidth / 2, my + 10);
  }
  return y + boxHeight + 34;
}

// A straight line with an arrowhead at the far end
function drawArrow(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(1.8);
  line(x1, y1, x2, y2);
  const angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  fill(col);
  noStroke();
  triangle(0, 0, -8, -4.5, -8, 4.5);
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
