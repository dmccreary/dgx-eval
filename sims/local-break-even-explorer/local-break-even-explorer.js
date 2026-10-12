// Local Versus Cloud Break-Even Explorer MicroSim (sim id: local-break-even-explorer)
// CANVAS_HEIGHT: 704
// The learner calculates the volume at which a local machine costs the same as
// a per-book alternative, and decides whether one unit can reach that volume.
// Three fixed challenges come first, with two attempts each. Then four sliders
// drive the two yearly cost lines, the break-even point, and the capacity.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 549;
// The control region holds four sliders in exploration. In a challenge it holds
// the volume entry, the two reachability buttons, then Check and Next.
let controlHeight = 155;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 350;   // room for a slider's name and value on its left
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Local Versus Cloud Break-Even Explorer';
const challengeNoun = 'Challenge';
const challengeNounPlural = 'Challenges';
const question = 'At what volume does the local machine cost the same as the alternative?';
const contentTag = 'illustrative, not a provider quote';
const reachChoices = ['Reachable', 'Not reachable'];
const chartMaxVolume = 400;   // the chart always spans 0 to 400 books a year
const rules = 'Break-even N = F ÷ (P − v), when P is above v. It is reachable when N is at most the capacity. The yearly local cost at volume V is F + v × V, and the yearly cost of the alternative is P × V.';
const exploreHint = 'Try this: lower the yearly fixed cost and watch the break-even move down. Then lower the capacity until Reachable turns into Not reachable, and notice that the break-even has not moved.';
const screenReaderText = 'A calculation exercise about break-even volume. The break-even volume is the yearly fixed cost divided by the price per book of the alternative minus the local variable cost per book. It is reachable when it is at most the local capacity. Three challenges give the inputs. Type the break-even volume in books per year, choose Reachable or Not reachable, and press Check, with two attempts each. After the challenges, four sliders change the inputs, and a chart shows the two yearly cost lines, the break-even point, and the capacity.';

// The four quantities the learner can change in exploration
const quantities = [
  { key: 'fixed', label: 'Yearly fixed cost F', min: 2000, max: 20000, step: 25, start: 8275,
    format: v => '$' + formatNumber(v, 0) + ' a year' },
  { key: 'price', label: 'Price per book of the alternative P', min: 5, max: 300, step: 5, start: 100,
    format: v => '$' + formatNumber(v, 0) },
  { key: 'variable', label: 'Local variable cost per book v', min: 0, max: 5, step: 0.01, start: 0.58,
    format: v => '$' + formatNumber(v, 2) },
  { key: 'capacity', label: 'Local capacity', min: 20, max: 400, step: 1, start: 156,
    format: v => formatNumber(v, 0) + ' books a year' }
];

// The three challenges, with the working shown after a wrong check
const challenges = [
  { inputs: { fixed: 8275, price: 100, variable: 0.58, capacity: 156 },
    feedback: 'N = 8,275 ÷ (100 − 0.58) = 83.2, which is below the capacity of 156.' },
  { inputs: { fixed: 8275, price: 50, variable: 0.58, capacity: 156 },
    feedback: 'N = 8,275 ÷ (50 − 0.58) = 167.4, which is above the capacity of 156, so one unit cannot reach it.' },
  { inputs: { fixed: 4000, price: 40, variable: 0.58, capacity: 156 },
    feedback: 'N = 4,000 ÷ (40 − 0.58) = 101.5, which is below the capacity of 156.' }
];

// The model. There is no break-even when the alternative costs no more per
// book than the local variable cost.
function compute(inputs) {
  const hasBreakEven = inputs.price > inputs.variable;
  const breakEven = hasBreakEven ? inputs.fixed / (inputs.price - inputs.variable) : null;
  return {
    breakEven: breakEven,
    reachable: hasBreakEven && breakEven <= inputs.capacity
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

// The verdict in words, then the two yearly cost lines
function drawResult(inputs, result, x, y, w) {
  let summary;
  if (result.breakEven === null) {
    summary = 'No break-even: the alternative is cheaper at every volume.';
  } else {
    summary = 'Break-even: ' + formatNumber(result.breakEven, 1) + ' books a year. ' +
      (result.reachable ? 'Reachable' : 'Not reachable') + ' with a capacity of ' + formatNumber(inputs.capacity, 0) + '.';
  }
  fill('black');
  noStroke();
  y = drawWrapped(summary, x, y, w, 17 * textScale, BOLD) + 6;
  return drawCostChart(inputs, result, x, y, w, 190 * textScale);
}

// Yearly cost against volume for the local machine and for the alternative
function drawCostChart(inputs, result, x, y, w, h) {
  const left = x + 70;           // room for the cost labels
  const right = x + w - 14;
  const top = y + 8;
  const bottom = y + h - 34;     // room for the volume labels
  // round the cost axis up to four even steps
  const largestCost = max(inputs.price * chartMaxVolume, inputs.fixed + inputs.variable * chartMaxVolume);
  const magnitude = pow(10, floor(log(largestCost / 4) / log(10)));
  const costStep = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(m => m * magnitude >= largestCost / 4) * magnitude;
  const maxCost = costStep * 4;
  const toX = volume => left + (right - left) * volume / chartMaxVolume;
  const toY = cost => bottom - (bottom - top) * cost / maxCost;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);

  // grid lines and axis labels
  textSize(12.5 * textScale);
  for (let i = 0; i <= 4; i++) {
    const volume = chartMaxVolume * i / 4;
    const cost = maxCost * i / 4;
    stroke('gainsboro');
    strokeWeight(1);
    line(toX(volume), top, toX(volume), bottom);
    line(left, toY(cost), right, toY(cost));
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    text(formatNumber(volume, 0), toX(volume), bottom + 4);
    textAlign(RIGHT, CENTER);
    text('$' + formatNumber(cost, 0), left - 6, toY(cost));
  }
  textAlign(CENTER, TOP);
  text('Books a year', (left + right) / 2, bottom + 18);

  // the capacity of one unit
  stroke('dimgray');
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 5]);
  line(toX(inputs.capacity), top, toX(inputs.capacity), bottom);
  drawingContext.setLineDash([]);
  fill('dimgray');
  noStroke();
  textAlign(inputs.capacity > chartMaxVolume * 0.8 ? RIGHT : LEFT, TOP);
  text('capacity', toX(inputs.capacity) + (inputs.capacity > chartMaxVolume * 0.8 ? -5 : 5), top);

  // the alternative: price × volume
  stroke('darkorange');
  strokeWeight(3);
  line(toX(0), toY(0), toX(chartMaxVolume), toY(inputs.price * chartMaxVolume));

  // the local machine: fixed + variable × volume, up to its capacity
  stroke('steelblue');
  line(toX(0), toY(inputs.fixed), toX(inputs.capacity), toY(inputs.fixed + inputs.variable * inputs.capacity));
  // past the capacity one unit is not enough, so the line turns faint and dashed
  stroke('lightsteelblue');
  strokeWeight(2);
  drawingContext.setLineDash([4, 5]);
  line(toX(inputs.capacity), toY(inputs.fixed + inputs.variable * inputs.capacity),
    toX(chartMaxVolume), toY(inputs.fixed + inputs.variable * chartMaxVolume));
  drawingContext.setLineDash([]);

  // the break-even point, when it falls inside the chart
  if (result.breakEven !== null && result.breakEven <= chartMaxVolume) {
    fill(result.reachable ? 'forestgreen' : 'firebrick');
    stroke('white');
    strokeWeight(2);
    circle(toX(result.breakEven), toY(inputs.price * result.breakEven), 14);
  }

  // the key
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13 * textScale);
  const note = result.breakEven !== null && result.breakEven > chartMaxVolume ? ' The break-even is beyond this chart.' : '';
  return drawWrapped('Orange: the alternative. Blue: the local machine, dashed where it needs another unit. Dashed gray: capacity. Dot: break-even.' + note,
    x, y + h + 4, w, 13.5 * textScale, NORMAL);
}

// The calculation written out with the current values
function working(inputs, result) {
  if (result.breakEven === null) {
    return 'P is not above v, so P − v is not positive and the two cost lines never cross.';
  }
  const comparison = result.reachable ? ' is at most ' : ' is above ';
  return 'Break-even: $' + formatNumber(inputs.fixed, 0) + ' ÷ ($' + formatNumber(inputs.price, 0) + ' − $' + formatNumber(inputs.variable, 2) + ') = ' + formatNumber(result.breakEven, 1) + ' books a year\n' +
    formatNumber(result.breakEven, 1) + comparison + 'the capacity of ' + formatNumber(inputs.capacity, 0) + ', so it is ' + (result.reachable ? 'reachable' : 'not reachable');
}

// ---------- answer controls: a volume, then reachable or not ----------
let volumeInput, reachGroup;

function createAnswerControls() {
  volumeInput = createInput('', 'number');
  volumeInput.attribute('min', '0');
  volumeInput.attribute('step', '0.1');
  volumeInput.style('font-size', '16px');
  volumeInput.input(answerChanged);
  reachGroup = makeChoiceButtons(reachChoices);
}

function placeAnswerControls() {
  volumeInput.position(margin + 250, drawHeight + 10);
  volumeInput.size(90);
  placeButtonsInRows(reachGroup, margin + 250, drawHeight + 46);
}

function resetAnswerControls() {
  volumeInput.value('');
  reachGroup.selected = null;
}

function reachLabel(result) {
  return result.reachable ? 'Reachable' : 'Not reachable';
}

function syncAnswerControls() {
  const inChallenge = phase === 'challenge';
  setVisible(volumeInput, inChallenge);
  setEnabled(volumeInput, status === 'open');
  reachGroup.locked = status !== 'open';
  for (const b of reachGroup.buttons) setVisible(b, inChallenge);
  paintChoiceButtons(reachGroup, status !== 'open' ? reachLabel(compute(challenges[current].inputs)) : undefined);
}

function answerReady() {
  return volumeInput.value() !== '' && !isNaN(Number(volumeInput.value())) && reachGroup.selected !== null;
}

// The volume must be within 1 book, and the reachability choice must match
function answerIsCorrect(result) {
  return abs(Number(volumeInput.value()) - result.breakEven) <= 1 && reachGroup.selected === reachLabel(result);
}

function answerText(result) {
  return 'break-even is ' + formatNumber(result.breakEven, 1) + ' books a year, ' + reachLabel(result) + '.';
}

function drawAnswerLabels() {
  text('Break-even volume (books a year):', margin, drawHeight + 14);
  text('With one unit, that volume is:', margin, drawHeight + 52);
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
