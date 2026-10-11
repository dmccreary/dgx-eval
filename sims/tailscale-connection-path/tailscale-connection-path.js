// Tailscale Connection Path MicroSim (sim id: tailscale-connection-path)
// CANVAS_HEIGHT: 602
// The learner first steps through the five steps by which two devices behind
// home routers build an encrypted connection. The learner then answers six
// items: three predict whether a path is direct or relayed, and three assign a
// message to the coordination plane or the data plane. The diagram shows no
// addresses, names, or keys.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 510;
// The control region holds the two answer buttons, then the step buttons
let controlHeight = 92;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Tailscale Connection Path';
const itemNoun = 'Item';
const itemNounPlural = 'Items';
const contentTag = 'synthetic example';
const masteryCount = 5;
const screenReaderText = 'A two-part exercise about how two devices behind home routers connect. A diagram shows a laptop, a DGX, their two home routers, a coordination service, and a relay. First, Next and Previous buttons step through five connection steps. Then six items are shown one at a time: three ask whether a connection is direct or relayed, and three ask whether a message belongs to the coordination plane or the data plane. Confirm each choice to see the answer and the reason. A final screen shows the score and the misconception behind each miss.';

// The walkthrough: five connection steps, and the diagram view that goes with each
const introNoun = 'Step';
const introQuestion = 'How do these two devices end up able to talk?';
const introSteps = [
  'Both devices sign in to the coordination service and give it their public keys.',
  "The service gives each device the other's public key and its candidate addresses.",
  "Each device sends packets to the other's addresses at the same moment, so each router creates a table entry for the conversation.",
  'If those packets get through, the devices talk directly. If they do not, both connect outward to a relay.',
  'Everything the devices exchange is encrypted by the devices themselves, so neither the relay nor the service can read it.'
];
const introViews = ['keysUp', 'keysDown', 'punch', 'either', 'encrypted'];

const pathQuestion = 'Will this connection be direct, or go through a relay?';
const planeQuestion = 'Which plane carries this?';

const misconceptions = [
  'The coordination service carries or can read the traffic.',
  'A relay can read the traffic it forwards.',
  'Two devices behind routers can never connect directly.',
  'A relayed connection is not encrypted.'
];

// Each item has its kind (a path prediction or a plane assignment), the text,
// the correct answer, the diagram view shown after the reveal, the reason, and
// the index of the misconception that a miss most likely reflects.
const items = [
  { kind: 'path', question: pathQuestion, text: 'Laptop and DGX are each behind an ordinary home router.',
    answer: 'Direct', view: 'direct',
    why: 'Ordinary NAT allows the simultaneous-send technique to open both routers.', misconception: 2 },
  { kind: 'path', question: pathQuestion, text: 'The laptop is on a network whose firewall blocks all outgoing UDP.',
    answer: 'Relay', view: 'relay',
    why: 'The direct path uses UDP, so the encrypted packets go through a relay instead.', misconception: null },
  { kind: 'path', question: pathQuestion, text: 'Laptop and DGX are on the same local network.',
    answer: 'Direct', view: 'local',
    why: "They can reach each other's local addresses without leaving the network.", misconception: 2 },
  { kind: 'plane', question: planeQuestion, text: 'A device uploads its public key.',
    answer: 'Coordination plane', view: 'coordination',
    why: 'It is setup information exchanged with the service.', misconception: 0 },
  { kind: 'plane', question: planeQuestion, text: "A packet carrying part of a model's reply.",
    answer: 'Data plane', view: 'data',
    why: 'It is traffic between the two devices.', misconception: 0 },
  { kind: 'plane', question: planeQuestion, text: 'The list of which devices may reach which.',
    answer: 'Coordination plane', view: 'coordination',
    why: 'Access rules are distributed by the service to the devices.', misconception: 0 }
];

// ---------- the diagram ----------
// The diagram is laid out in a fixed design space and scaled to fit the width
const designWidth = 770;
const designHeight = 206;
const parts = [
  { x: 285, y: 0, w: 200, h: 40, label: 'Coordination service', fill: 'paleturquoise', stroke: 'teal' },
  { x: 0, y: 84, w: 110, h: 46, label: 'Laptop', fill: 'lightsteelblue', stroke: 'steelblue' },
  { x: 160, y: 87, w: 104, h: 40, label: 'Home router', fill: 'lightyellow', stroke: 'goldenrod' },
  { x: 506, y: 87, w: 104, h: 40, label: 'Home router', fill: 'lightyellow', stroke: 'goldenrod' },
  { x: 660, y: 84, w: 110, h: 46, label: 'DGX', fill: 'palegreen', stroke: 'forestgreen' },
  { x: 310, y: 164, w: 150, h: 40, label: 'Relay', fill: 'paleturquoise', stroke: 'teal' }
];
// Each view names the links to emphasize, where arrowheads go, and the notes to show
const views = {
  none: { on: [], notes: [] },
  keysUp: { on: ['coordination'], heads: 'toService', notes: [['public key', 150, 46], ['public key', 620, 46]] },
  keysDown: { on: ['coordination'], heads: 'toDevices', notes: [["the other device's key and addresses", 385, 62]] },
  punch: { on: ['direct'], heads: 'meet',
    notes: [['both send at the same moment', 385, 84], ['table entry', 212, 142], ['table entry', 558, 142]] },
  either: { on: ['direct', 'relay'], notes: [['direct, if the packets get through', 385, 84], ['relay, if they do not', 385, 148]] },
  encrypted: { on: ['direct', 'relay'],
    notes: [['encrypted by the devices themselves', 385, 84], ['cannot read it', 385, 148], ['cannot read it', 560, 20]] },
  direct: { on: ['direct'], notes: [['direct path', 385, 84]] },
  local: { on: ['local'], notes: [['direct, on the local network', 385, 66]] },
  relay: { on: ['relay'], notes: [['through the relay, still encrypted', 385, 148]] },
  coordination: { on: ['coordination'], notes: [['coordination plane: keys, addresses, rules', 385, 62]] },
  data: { on: ['direct'], notes: [['data plane: traffic between the two devices', 385, 84]] }
};

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

// The diagram stays on screen above each item. The reveal shows the answer on it.
function drawStimulus(item, x, y, w) {
  y = drawNetwork(revealed ? item.view : 'none', x, y, w);
  return drawTextPanel(itemNoun + ' ' + (current + 1), contentTag, item.text, x, y + 8, w, 17, false);
}

// The diagram for one walkthrough step
function drawDiagram(step, x, y, w) {
  return drawNetwork(introViews[step], x, y, w);
}

// Draw the two devices, their routers, the coordination service, and the relay,
// with the links of the named view emphasized. Returns the y just below.
function drawNetwork(viewName, x, y, w) {
  const view = views[viewName];
  const s = min(1, w / designWidth);
  push();
  translate(x + (w - designWidth * s) / 2, y);
  scale(s);

  const coordinationOn = view.on.includes('coordination');
  const directOn = view.on.includes('direct');
  const relayOn = view.on.includes('relay');
  const localOn = view.on.includes('local');

  // links first, so that the parts sit on top of them
  drawLink(55, 84, 285, 20, coordinationOn);     // laptop to the service
  drawLink(715, 84, 485, 20, coordinationOn);    // DGX to the service
  drawLink(110, 107, 160, 107, directOn || relayOn);  // laptop to its router
  drawLink(610, 107, 660, 107, directOn || relayOn);  // DGX to its router
  drawLink(264, 107, 506, 107, directOn);        // router to router, across the internet
  drawLink(212, 127, 310, 184, relayOn);         // each router out to the relay
  drawLink(558, 127, 460, 184, relayOn);
  if (localOn) {
    // on one local network the devices reach each other without the routers
    noFill();
    stroke('orangered');
    strokeWeight(3);
    bezier(95, 84, 250, 40, 520, 40, 675, 84);
  }

  fill('dimgray');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('internet', 385, 112);

  for (const part of parts) {
    fill(part.fill);
    stroke(part.stroke);
    strokeWeight(1.5);
    rect(part.x, part.y, part.w, part.h, 6);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(part.label, part.x + part.w / 2, part.y + part.h / 2);
    textStyle(NORMAL);
  }

  // arrowheads show which way the step's messages travel
  if (view.heads === 'toService') {
    drawHead(55, 84, 285, 20);
    drawHead(715, 84, 485, 20);
  } else if (view.heads === 'toDevices') {
    drawHead(285, 20, 55, 84);
    drawHead(485, 20, 715, 84);
  } else if (view.heads === 'meet') {
    drawHead(264, 107, 378, 107);
    drawHead(506, 107, 392, 107);
  }

  for (const note of view.notes) drawNote(note[0], note[1], note[2]);
  pop();
  return y + designHeight * s;
}

// One link: strong when the current view uses it, faint and dashed otherwise
function drawLink(x1, y1, x2, y2, isOn) {
  stroke(isOn ? 'orangered' : 'silver');
  strokeWeight(isOn ? 3 : 1.5);
  if (!isOn) drawingContext.setLineDash([5, 5]);
  line(x1, y1, x2, y2);
  drawingContext.setLineDash([]);
}

// An arrowhead at (x2, y2) pointing along the line from (x1, y1)
function drawHead(x1, y1, x2, y2) {
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  fill('orangered');
  noStroke();
  triangle(0, 0, -11, -6, -11, 6);
  pop();
}

// A small label on a white pill, so that it stays readable over the links
function drawNote(label, cx, cy) {
  textStyle(NORMAL);
  textSize(12.5);
  const w = textWidth(label) + 12;
  fill('white');
  stroke('orangered');
  strokeWeight(1);
  rect(cx - w / 2, cy - 10, w, 20, 10);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  text(label, cx, cy);
}

// ---------- answer controls: two buttons, which depend on the kind of item ----------
let pathGroup, planeGroup;

function createAnswerControls() {
  pathGroup = makeChoiceButtons(['Direct', 'Relay']);
  planeGroup = makeChoiceButtons(['Coordination plane', 'Data plane']);
}

function activeGroup() {
  return items[current].kind === 'path' ? pathGroup : planeGroup;
}

function placeAnswerControls() {
  placeButtonsInRows(pathGroup, margin, drawHeight + 10);
  placeButtonsInRows(planeGroup, margin, drawHeight + 10);
}

function resetAnswerControls() {
  pathGroup.selected = null;
  planeGroup.selected = null;
}

function syncAnswerControls() {
  for (const group of [pathGroup, planeGroup]) {
    const isActive = phase === 'quiz' && group === activeGroup();
    group.locked = revealed;
    for (const b of group.buttons) setVisible(b, isActive);
    paintChoiceButtons(group, revealed ? items[current].answer : undefined);
  }
}

function answerReady() {
  return activeGroup().selected !== null;
}

function answerIsCorrect(item) {
  return activeGroup().selected === item.answer;
}

function correctAnswerText(item) {
  return 'Correct answer: ' + item.answer;
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
