// Agent Turn Time Breakdown MicroSim (sim id: turn-time-breakdown)
// CANVAS_HEIGHT: 590
// The learner calculates the time of one agent turn from its prompt tokens,
// reply tokens, the two speeds, and the tool time, and names the part that
// dominates. Three fixed challenges come first, with two attempts each. Then
// five sliders drive a bar that splits the turn into reading, writing, and
// tool time.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 410;
// The control region holds five sliders in exploration. In a challenge it holds
// the seconds entry, the three component buttons, then Check and Next.
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let sliderLeftMargin = 330;   // room for a slider's name and value on its left
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Agent Turn Time Breakdown';
const challengeNoun = 'Challenge';
const challengeNounPlural = 'Challenges';
const question = 'How long does this turn take, and where does the time go?';
const contentTag = 'measured speeds, illustrative tool times';
const components = ['Reading the prompt', 'Writing the reply', 'Running the tool'];
const rules = 'Turn time = prompt tokens ÷ reading speed + reply tokens ÷ writing speed + tool time, in seconds. The dominant component is the largest of the three terms. Model load time is not included.';
const exploreHint = 'Try this: make reading the largest part, then change the generation speed and watch how little the bar moves.';
const screenReaderText = 'A calculation exercise about the time of one agent turn. Turn time is prompt tokens divided by reading speed, plus reply tokens divided by writing speed, plus tool time. Three challenges give the inputs. Type the turn time in seconds, choose the dominant component, and press Check, with two attempts each. After the challenges, five sliders change the inputs and a bar shows the reading, writing, and tool parts of the turn.';

// The five quantities the learner can change in exploration
const quantities = [
  { key: 'promptTokens', label: 'Prompt tokens read this turn', min: 0, max: 100000, step: 500, start: 2000,
    format: v => formatNumber(v, 0) + ' tokens' },
  { key: 'readSpeed', label: 'Prompt processing speed', min: 100, max: 5000, step: 100, start: 3000,
    format: v => formatNumber(v, 0) + ' tokens/s' },
  { key: 'replyTokens', label: 'Reply tokens', min: 50, max: 5000, step: 50, start: 600,
    format: v => formatNumber(v, 0) + ' tokens' },
  { key: 'writeSpeed', label: 'Generation speed', min: 5, max: 150, step: 1, start: 34,
    format: v => formatNumber(v, 0) + ' tokens/s' },
  { key: 'toolTime', label: 'Tool time', min: 0, max: 60, step: 1, start: 5,
    format: v => formatNumber(v, 0) + ' s' }
];

// The three challenges, with the working shown after a wrong check
const challenges = [
  { inputs: { promptTokens: 2000, readSpeed: 3000, replyTokens: 600, writeSpeed: 34, toolTime: 5 },
    feedback: '2,000 ÷ 3,000 = 0.7 s, 600 ÷ 34 = 17.6 s, tool 5 s, total 23.3 s, and writing is the largest.' },
  { inputs: { promptTokens: 55000, readSpeed: 500, replyTokens: 600, writeSpeed: 26, toolTime: 5 },
    feedback: '55,000 ÷ 500 = 110 s, 600 ÷ 26 = 23.1 s, tool 5 s, total 138.1 s, and reading is the largest.' },
  { inputs: { promptTokens: 2000, readSpeed: 3000, replyTokens: 600, writeSpeed: 108, toolTime: 8 },
    feedback: '0.7 s reading, 600 ÷ 108 = 5.6 s writing, tool 8 s, total 14.2 s, and the tool is the largest.' }
];

// The model: three terms in seconds, their total, and the largest term
function compute(inputs) {
  const reading = inputs.promptTokens / inputs.readSpeed;
  const writing = inputs.replyTokens / inputs.writeSpeed;
  const tool = inputs.toolTime;
  const parts = [reading, writing, tool];
  const largest = max(parts);
  const isTie = parts.filter(p => p === largest).length > 1;
  return {
    reading: reading,
    writing: writing,
    tool: tool,
    total: reading + writing + tool,
    dominant: isTie ? 'tie' : components[parts.indexOf(largest)]
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

// The turn as one bar: reading, writing, and tool time end to end
function drawResult(inputs, result, x, y, w) {
  fill('black');
  noStroke();
  const dominantText = result.dominant === 'tie' ? 'The largest components are a tie.' : result.dominant + ' dominates.';
  y = drawWrapped('Turn time: ' + formatNumber(result.total, 1) + ' s. ' + dominantText, x, y, w, 17 * textScale, BOLD) + 6;
  const segments = [
    { label: 'Reading the prompt', value: result.reading, color: 'steelblue' },
    { label: 'Writing the reply', value: result.writing, color: 'darkorange' },
    { label: 'Running the tool', value: result.tool, color: 'mediumseagreen' }
  ];
  return drawStackedBar(segments, max(result.total, 0.001), 's', x, y, w, 34);
}

// The calculation written out with the current values
function working(inputs, result) {
  return 'Reading: ' + formatNumber(inputs.promptTokens, 0) + ' ÷ ' + formatNumber(inputs.readSpeed, 0) + ' = ' + formatNumber(result.reading, 1) + ' s\n' +
    'Writing: ' + formatNumber(inputs.replyTokens, 0) + ' ÷ ' + formatNumber(inputs.writeSpeed, 0) + ' = ' + formatNumber(result.writing, 1) + ' s\n' +
    'Tool: ' + formatNumber(result.tool, 1) + ' s\n' +
    'Total: ' + formatNumber(result.reading, 1) + ' + ' + formatNumber(result.writing, 1) + ' + ' + formatNumber(result.tool, 1) + ' = ' + formatNumber(result.total, 1) + ' s';
}

// ---------- answer controls: seconds, then the dominant component ----------
let secondsInput, componentGroup;

function createAnswerControls() {
  secondsInput = createInput('', 'number');
  secondsInput.attribute('min', '0');
  secondsInput.attribute('step', '0.1');
  secondsInput.style('font-size', '16px');
  secondsInput.input(answerChanged);
  componentGroup = makeChoiceButtons(components);
}

function placeAnswerControls() {
  secondsInput.position(margin + 190, drawHeight + 10);
  secondsInput.size(90);
  placeButtonsInRows(componentGroup, margin + 190, drawHeight + 48);
}

function resetAnswerControls() {
  secondsInput.value('');
  componentGroup.selected = null;
}

function syncAnswerControls() {
  const inChallenge = phase === 'challenge';
  setVisible(secondsInput, inChallenge);
  setEnabled(secondsInput, status === 'open');
  componentGroup.locked = status !== 'open';
  for (const b of componentGroup.buttons) setVisible(b, inChallenge);
  paintChoiceButtons(componentGroup, status !== 'open' ? compute(challenges[current].inputs).dominant : undefined);
}

function answerReady() {
  return secondsInput.value() !== '' && !isNaN(Number(secondsInput.value())) && componentGroup.selected !== null;
}

// The time must be within 1 second, and the dominant component must match
function answerIsCorrect(result) {
  return abs(Number(secondsInput.value()) - result.total) <= 1 && componentGroup.selected === result.dominant;
}

function answerText(result) {
  return formatNumber(result.total, 1) + ' s, ' + result.dominant + ' dominates.';
}

function drawAnswerLabels() {
  text('Turn time (seconds):', margin, drawHeight + 14);
  text('Dominant component:', margin, drawHeight + 54);
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
