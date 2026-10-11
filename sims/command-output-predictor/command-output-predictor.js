// Command Output Predictor MicroSim (sim id: command-output-predictor)
// CANVAS_HEIGHT: 712
// The learner predicts what five shell commands print when they run, in order,
// against a small practice directory. The working directory carries over from
// one command to the next. Clicking a prediction is final: the real output
// appears in the terminal at once, with the reason.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 522;
// The control region holds the four prediction buttons, then Next
let controlHeight = 190;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Command Output Predictor';
const itemNoun = 'Command';
const itemNounPlural = 'Commands';
const question = 'What does the shell print?';
const contentTag = 'synthetic example';
const masteryCount = 4;
const screenReaderText = 'A prediction exercise. A practice directory at /home/student/lab holds notes.txt, readme.md, a probes folder with cpu.py and gpu.py, and an empty results folder. Five commands run in order: pwd, ls, cd probes, ls, and cat ../notes.txt. For each one, click one of four predicted outputs. The choice is final, and the terminal then shows the real output and the reason. A final screen shows the score and the misconception behind each miss.';

// The practice directory. Each line starts with a visible character so that
// the indentation survives text wrapping.
const directoryTree = [
  '/home/student/lab',
  '|-- notes.txt',
  '|-- readme.md',
  '|-- probes/',
  '|   |-- cpu.py',
  '|   |-- gpu.py',
  '|-- results/   (empty)'
];
const fileNote = 'notes.txt holds three lines: model: unset, context: 4096, status: draft. readme.md holds one line: Probe results go in results.';
// Which line of the tree is the working directory before and after "cd probes"
const labLine = 0;
const probesLine = 3;

const misconceptions = [
  'ls lists everything below the working directory, including the contents of subfolders.',
  'cd prints the new path.',
  '.. names the current folder rather than the parent folder.',
  'Each command starts fresh instead of continuing from the working directory the previous command left.'
];

// Each item has the command, its four options in a fixed order, the index of
// the correct option, the lines the shell really prints, the reason shown after
// the reveal, and the index of the misconception that a miss most likely
// reflects (null when none fits).
const items = [
  { command: 'pwd',
    options: ['/home/student', '/home/student/lab', 'lab', 'notes.txt  probes  readme.md  results'],
    correct: 1, output: ['/home/student/lab'],
    why: 'pwd prints the full absolute path of the working directory, not just its last folder name.', misconception: null },
  { command: 'ls',
    options: ['probes  results', 'notes.txt  readme.md', 'notes.txt  probes  readme.md  results', 'cpu.py  gpu.py'],
    correct: 2, output: ['notes.txt  probes  readme.md  results'],
    why: 'ls lists both files and folders in the working directory, and does not list what is inside the folders.', misconception: 0 },
  { command: 'cd probes',
    options: ['Prints cpu.py  gpu.py', 'Prints /home/student/lab/probes',
      'Prints nothing; the working directory becomes /home/student/lab/probes', 'Prints probes: Is a directory'],
    correct: 2, output: [],
    why: 'cd changes state silently. Its only evidence is the working directory that later commands see.', misconception: 1 },
  { command: 'ls',
    options: ['notes.txt  probes  readme.md  results', 'cpu.py  gpu.py', 'cpu.py  gpu.py  notes.txt', 'Prints nothing'],
    correct: 1, output: ['cpu.py  gpu.py'],
    why: "After cd probes the working directory is probes, so ls lists that folder's two files.", misconception: 3 },
  { command: 'cat ../notes.txt',
    options: ['cat: ../notes.txt: No such file or directory', 'notes.txt', 'cpu.py  gpu.py',
      'The three lines model: unset, context: 4096, status: draft'],
    correct: 3, output: ['model: unset', 'context: 4096', 'status: draft'],
    why: '.. names the parent folder, so the path reaches /home/student/lab/notes.txt, and cat prints the file\'s contents.', misconception: 2 }
];

const letters = ['A', 'B', 'C', 'D'];
const terminalRows = 8;   // the terminal shows the most recent lines of the session

// ---------- quiz state ----------
let phase = 'quiz';      // 'quiz' while items are answered, then 'results'
let current = 0;         // index of the item on screen
let revealed = false;    // true once the answer to the current item is shown
let outcomes = [];       // true or false for each answered item, in order
let textScale = 1;       // shrinks the text when a narrow canvas would overflow
let lastWidth = 0;       // canvas width at the previous frame
let nextButton, restartButton;

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Always use the native builtin p5.js controls
  createAnswerControls();
  nextButton = createButton('Next');
  nextButton.mousePressed(nextItem);
  restartButton = createButton('Start over');
  restartButton.mousePressed(restartQuiz);
  for (const b of [nextButton, restartButton]) b.style('font-size', '15px');

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
  // the first selection is final, so it is confirmed at once
  confirmAnswer();
  syncControls();
}

// Show, hide, enable, and disable the controls to match the current state
function syncControls() {
  const inQuiz = phase === 'quiz';
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
  nextButton.position(margin, y);
  restartButton.position(margin, drawHeight + 12);
}

// The practice directory on the left and the terminal session on the right
function drawStimulus(item, x, y, w) {
  const gap = 12;
  const leftWidth = (w - gap) * 0.42;
  const rightX = x + leftWidth + gap;

  // every command so far with its real output, then the current command, whose
  // output is added once the prediction has been made
  const session = [];
  for (let i = 0; i <= current; i++) {
    session.push('$ ' + items[i].command);
    if (i < current || revealed) for (const line of items[i].output) session.push(line);
  }
  const shown = session.slice(-terminalRows);
  while (shown.length < terminalRows) shown.push('');
  const terminalBottom = drawTerminal('Terminal', '', shown, rightX, y, w - leftWidth - gap).bottom;

  const directoryBottom = drawDirectory(x, y, leftWidth, terminalBottom - y);
  return max(terminalBottom, directoryBottom);
}

// The directory tree with the working directory marked, and the file contents.
// The panel is at least minHeight tall. Returns the y just below it.
function drawDirectory(x, y, w, minHeight) {
  const pad = 12;
  const headSize = 15 * textScale;
  // cd probes takes effect once command 3 has run
  const inProbes = current > 2 || (current === 2 && revealed);
  const here = inProbes ? probesLine : labLine;
  const workingDirectory = 'Working directory: ' + (inProbes ? '/home/student/lab/probes' : '/home/student/lab');
  const size = fitMonoSize(directoryTree.concat(['|-- results/   (empty)  <- here']), w - 2 * pad, 15 * textScale);
  const lineHeight = size * 1.4;
  const h = max(minHeight, pad + headSize * 1.6 + directoryTree.length * lineHeight + 6 +
    wrappedHeight(workingDirectory, w - 2 * pad, 14 * textScale, BOLD) + 4 +
    wrappedHeight(fileNote, w - 2 * pad, 13 * textScale, NORMAL) + pad);

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();
  fill('dimgray');
  textSize(headSize);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Practice directory', x + pad, y + pad);
  textStyle(ITALIC);
  textAlign(RIGHT, TOP);
  text(contentTag, x + w - pad, y + pad);
  textStyle(NORMAL);

  let ty = y + pad + headSize * 1.6;
  push();
  textFont('monospace');
  textSize(size);
  textAlign(LEFT, TOP);
  for (let i = 0; i < directoryTree.length; i++) {
    if (i === here) {
      // highlight the working directory
      fill('khaki');
      noStroke();
      rect(x + pad - 4, ty - 2, w - 2 * pad + 8, lineHeight, 4);
    }
    fill('black');
    noStroke();
    text(directoryTree[i] + (i === here ? '  <- here' : ''), x + pad, ty);
    ty += lineHeight;
  }
  pop();

  fill('black');
  ty = drawWrapped(workingDirectory, x + pad, ty + 6, w - 2 * pad, 14 * textScale, BOLD);
  fill('dimgray');
  drawWrapped(fileNote, x + pad, ty + 4, w - 2 * pad, 13 * textScale, NORMAL);
  return y + h;
}

// ---------- answer controls: four prediction buttons ----------
let optionButtons = [];
let selectedOption = -1;   // index of the prediction that was clicked, or -1

function createAnswerControls() {
  for (let i = 0; i < 4; i++) {
    const b = createButton('');
    b.style('font-family', 'monospace');
    b.style('font-size', '14px');
    b.style('text-align', 'left');
    b.style('white-space', 'pre');   // keep the double spaces that separate file names
    b.style('padding', '4px 10px');
    b.style('border', '1px solid gray');
    b.style('border-radius', '6px');
    b.style('cursor', 'pointer');
    b.mousePressed(() => {
      if (revealed) return;
      selectedOption = i;
      answerChanged();
    });
    optionButtons.push(b);
  }
}

function placeAnswerControls() {
  for (let i = 0; i < 4; i++) {
    optionButtons[i].position(margin, drawHeight + 8 + i * 35);
    optionButtons[i].size(canvasWidth - 2 * margin, 30);
  }
}

function resetAnswerControls() {
  selectedOption = -1;
}

// Label the buttons with the current command's options and color them. After
// the reveal the correct option is green and a wrong pick is salmon.
function syncAnswerControls() {
  const item = items[current];
  for (let i = 0; i < 4; i++) {
    setVisible(optionButtons[i], phase === 'quiz');
    optionButtons[i].html(letters[i] + '   ' + item.options[i]);
    let color = 'white';
    if (revealed && i === item.correct) color = 'palegreen';
    else if (revealed && i === selectedOption) color = 'lightsalmon';
    optionButtons[i].style('background-color', color);
  }
}

function answerReady() {
  return selectedOption >= 0;
}

function answerIsCorrect(item) {
  return selectedOption === item.correct;
}

function correctAnswerText(item) {
  return 'Correct option: ' + letters[item.correct];
}

// ---------- terminal panel ----------

// The largest monospace size, up to maxSize, at which the longest line fits in maxWidth
function fitMonoSize(lines, maxWidth, maxSize) {
  push();
  textFont('monospace');
  textSize(10);
  let widest = 1;
  for (const line of lines) widest = max(widest, textWidth(line));
  pop();
  return min(maxSize, 10 * maxWidth / widest);
}

// A panel with a heading and a dark terminal window of fixed-width lines that
// are never wrapped. Returns the layout of the text, so that a caller can mark
// part of a line: { size, left, top, lineHeight, bottom }.
function drawTerminal(heading, tag, lines, x, y, w) {
  const pad = 12;
  const headSize = 15 * textScale;
  const size = fitMonoSize(lines, w - 4 * pad, 16 * textScale);
  const lineHeight = size * 1.5;
  const boxTop = y + pad + headSize * 1.6;
  const boxHeight = lines.length * lineHeight + pad;
  const h = boxTop - y + boxHeight + pad;

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

  fill('darkslategray');
  rect(x + pad, boxTop, w - 2 * pad, boxHeight, 6);
  push();
  textFont('monospace');
  textSize(size);
  textAlign(LEFT, TOP);
  fill('white');
  noStroke();
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x + 2 * pad, boxTop + pad / 2 + i * lineHeight);
  }
  pop();
  return { size: size, left: x + 2 * pad, top: boxTop + pad / 2, lineHeight: lineHeight, bottom: y + h };
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
