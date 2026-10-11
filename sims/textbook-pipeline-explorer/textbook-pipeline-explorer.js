// Textbook Generation Pipeline Explorer MicroSim (sim id: textbook-pipeline-explorer)
// CANVAS_HEIGHT: 592
// The learner first opens the eight artifacts of the textbook pipeline to read
// what each contains and where it lives. The learner then checks, for each of
// the seven generated artifacts, every other artifact it is built from. A set
// is submitted before the answer is revealed, and it must match exactly.

// global variables for width and height
let canvasWidth = 800;   // reset from the container on init and on resize
// A fixed top drawing region above the interactive controls
let drawHeight = 454;
// The control region holds the eight artifact checkboxes in two rows, then
// Submit and Next
let controlHeight = 138;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---------- content ----------
const title = 'Textbook Generation Pipeline Explorer';
const itemNoun = 'Check';
const itemNounPlural = 'Checks';
const contentTag = 'from the ibook-skills pipeline';
const masteryCount = 6;
const introQuestion = 'What is each artifact built from?';
const screenReaderText = 'A two-part exercise about the eight artifacts of the textbook pipeline: Course Description, Learning Graph, Chapter Structure, Chapter Content, MicroSims, Glossary, FAQ, and Quizzes. First, click any artifact to read what it contains and where it is stored. Then, for each of the seven generated artifacts in turn, check every other artifact it is built from and submit to see the correct set and the reason. A final screen shows the score and the misconception behind each miss.';

// The eight artifacts, in pipeline order
const artifacts = [
  { name: 'Course Description', contains: 'audience, prerequisites, overview, topics, exclusions, outcomes',
    location: 'docs/course-description.md' },
  { name: 'Learning Graph', contains: 'concepts and dependency edges, as a CSV file and a JSON file',
    location: 'docs/learning-graph/learning-graph.json' },
  { name: 'Chapter Structure', contains: 'chapter folders with titles, summaries, and assigned concept lists',
    location: 'docs/chapters/NN-slug/index.md' },
  { name: 'Chapter Content', contains: 'prose, tables, and specifications for interactive elements',
    location: 'docs/chapters/NN-slug/index.md' },
  { name: 'MicroSims', contains: 'one main.html and one index.md per simulation',
    location: 'docs/sims/<sim-id>/' },
  { name: 'Glossary', contains: 'one definition for each concept in the concept list',
    location: 'docs/glossary.md' },
  { name: 'FAQ', contains: 'questions and answers drawn from the book',
    location: 'docs/faq.md' },
  { name: 'Quizzes', contains: 'questions for each chapter',
    location: 'docs/chapters/NN-slug/quiz.md' }
];

const misconceptions = [
  'The chapters are written directly from the course description without a learning graph.',
  'The glossary is written from the chapters rather than from the concept list.',
  'A MicroSim is built from the course description rather than from a specification inside a chapter.'
];

// Each item checks one generated artifact. artifact and builtFrom are indexes
// into the artifacts list. The Course Description has no inputs, so it is
// never checked. misconception is null when no listed misconception fits.
const items = [
  { artifact: 1, name: 'Learning Graph', question: 'What is the Learning Graph built from?', builtFrom: [0],
    why: 'The concepts are enumerated from the topics and outcomes the course description states.', misconception: null },
  { artifact: 2, name: 'Chapter Structure', question: 'What is the Chapter Structure built from?', builtFrom: [0, 1],
    why: "Chapters group the graph's concepts under the course description's scope, with prerequisites in the same or an earlier chapter.", misconception: 0 },
  { artifact: 3, name: 'Chapter Content', question: 'What is the Chapter Content built from?', builtFrom: [0, 1, 2],
    why: "Each chapter is written from its outline and concept list, within the course description's audience and scope, and the graph's impact scores set how much space each concept gets.", misconception: 0 },
  { artifact: 4, name: 'MicroSims', question: 'What are the MicroSims built from?', builtFrom: [3],
    why: 'A MicroSim is built from the specification block written inside a chapter.', misconception: 2 },
  { artifact: 5, name: 'Glossary', question: 'What is the Glossary built from?', builtFrom: [1],
    why: "One definition is written for each concept in the graph's concept list.", misconception: 1 },
  { artifact: 6, name: 'FAQ', question: 'What is the FAQ built from?', builtFrom: [1, 3, 5],
    why: 'Questions come from what the chapters teach, the concepts in the graph, and the terms the glossary defines.', misconception: null },
  { artifact: 7, name: 'Quizzes', question: 'What are the Quizzes built from?', builtFrom: [1, 3],
    why: "Questions test what a chapter teaches and are aligned to the graph's concepts.", misconception: null }
];

// The artifact boxes sit in a grid of four columns and two rows
const boxHeight = 52;
const boxGap = 10;
let grid = { x: 0, y: 0, w: 0 };   // set each frame, used for clicks

// ---------- quiz state ----------
let phase = 'intro';     // 'intro' for the walkthrough, 'quiz' while items are answered, then 'results'
let current = 0;         // index of the item on screen
let revealed = false;    // true once the answer to the current item is shown
let outcomes = [];       // true or false for each answered item, in order
let textScale = 1;       // shrinks the text when a narrow canvas would overflow
let lastWidth = 0;       // canvas width at the previous frame
let confirmButton, nextButton, restartButton;

// ---------- exploration ----------
let opened = [];           // which artifacts have been opened in the exploration
let openArtifact = -1;     // the artifact whose details are on screen, or -1
let startButton;

function createIntroControls() {
  startButton = createButton('Start the check');
  startButton.style('font-size', '15px');
  startButton.mousePressed(() => {
    phase = 'quiz';
    textScale = 1;
    syncControls();
  });
}

function placeIntroControls(y) {
  startButton.position(margin, y);
}

function syncIntroControls() {
  setVisible(startButton, phase === 'intro');
}

function resetIntro() {
  opened = [];
  openArtifact = -1;
}

// The exploration: the eight artifacts, and the details of the one that is open
function drawIntro() {
  const x = margin;
  const w = canvasWidth - 2 * margin;
  fill('dimgray');
  noStroke();
  textSize(15 * textScale);
  textAlign(LEFT, TOP);
  text('Artifacts opened: ' + opened.filter(Boolean).length + ' of ' + artifacts.length, x, 40);
  textAlign(RIGHT, TOP);
  text('Exploration, not scored', x + w, 40);

  let y = drawArtifacts(null, x, 64, w);
  fill('black');
  y = drawWrapped(introQuestion, x, y + 10, w, 17 * textScale, BOLD);
  if (openArtifact < 0) {
    return drawTextPanel('Open an artifact', '', 'Click any artifact above to read what it contains and where it is stored. When you have read all eight, start the check.',
      x, y + 6, w, 16, false);
  }
  return drawDetails(openArtifact, x, y + 6, w);
}

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Always use the native builtin p5.js controls
  createIntroControls();
  createAnswerControls();
  confirmButton = createButton('Submit');
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
      lead: numbers.map(n => items[n - 1].name).join(', '),
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

// The artifacts, with the details of the one being checked beneath them
function drawStimulus(item, x, y, w) {
  y = drawArtifacts(item, x, y, w);
  return drawDetails(item.artifact, x, y + 8, w);
}

// What one artifact contains and where it is stored
function drawDetails(index, x, y, w) {
  const a = artifacts[index];
  return drawTextPanel((index + 1) + '. ' + a.name, contentTag, 'Contains: ' + a.contains + '\nLocation: ' + a.location, x, y, w, 16, false);
}

// Where artifact i sits in the grid
function boxRect(i) {
  const boxWidth = (grid.w - 3 * boxGap) / 4;
  return {
    x: grid.x + (i % 4) * (boxWidth + boxGap),
    y: grid.y + floor(i / 4) * (boxHeight + boxGap),
    w: boxWidth,
    h: boxHeight
  };
}

// Draw the eight artifacts. item is the check in progress, or null during the
// exploration. Returns the y just below the grid.
function drawArtifacts(item, x, y, w) {
  grid = { x: x, y: y, w: w };
  for (let i = 0; i < artifacts.length; i++) {
    const r = boxRect(i);
    let boxFill = 'white';
    let boxStroke = 'gray';
    let weight = 1.2;
    let note = '';
    if (item === null) {
      // exploration: mark the artifacts that have been read
      if (opened[i]) note = 'read';
      if (i === openArtifact) { boxFill = 'lightsteelblue'; boxStroke = 'steelblue'; weight = 3; }
    } else if (i === item.artifact) {
      boxFill = 'lightsteelblue';
      boxStroke = 'navy';
      weight = 3;
      note = 'being checked';
    } else {
      const isChecked = artifactBoxes[i].checked();
      const isInput = item.builtFrom.includes(i);
      if (isChecked) boxFill = 'khaki';
      if (revealed && isInput) { boxStroke = 'forestgreen'; weight = 3.5; note = 'built from this'; }
      if (revealed && isChecked && !isInput) { boxFill = 'lightsalmon'; note = 'not an input'; }
    }
    fill(boxFill);
    stroke(boxStroke);
    strokeWeight(weight);
    rect(r.x, r.y, r.w, r.h, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(min(15, r.w / 10.5) * textScale);
    text((i + 1) + '. ' + artifacts[i].name, r.x + 4, r.y + 8, r.w - 8, 22);
    textStyle(NORMAL);
    fill('dimgray');
    textSize(13 * textScale);
    text(note, r.x + r.w / 2, r.y + 31);
  }
  return y + 2 * boxHeight + boxGap;
}

// ---------- answer controls: one checkbox per artifact ----------
let artifactBoxes = [];

function createAnswerControls() {
  for (const a of artifacts) {
    const box = createCheckbox(a.name, false);
    box.style('font-size', '15px');
    box.changed(answerChanged);
    artifactBoxes.push(box);
  }
}

// The checkboxes line up under the columns of the artifact grid
function placeAnswerControls() {
  const columnWidth = (canvasWidth - 2 * margin) / 4;
  for (let i = 0; i < artifactBoxes.length; i++) {
    artifactBoxes[i].position(margin + (i % 4) * columnWidth, drawHeight + 34 + floor(i / 4) * 27);
  }
}

function resetAnswerControls() {
  for (const box of artifactBoxes) box.checked(false);
}

function syncAnswerControls() {
  for (let i = 0; i < artifactBoxes.length; i++) {
    // every other artifact is offered, including the ones later in the pipeline
    setVisible(artifactBoxes[i], phase === 'quiz' && i !== items[current].artifact);
    // the checkbox input itself is what gets locked after the reveal
    artifactBoxes[i].elt.querySelector('input').disabled = revealed;
  }
}

// An empty set can be submitted, so the answer is always ready
function answerReady() {
  return true;
}

function checkedArtifacts(item) {
  const picked = [];
  for (let i = 0; i < artifactBoxes.length; i++) {
    if (i !== item.artifact && artifactBoxes[i].checked()) picked.push(i);
  }
  return picked;
}

// The checked set must equal the built-from set exactly
function answerIsCorrect(item) {
  const picked = checkedArtifacts(item);
  return picked.length === item.builtFrom.length && item.builtFrom.every(i => picked.includes(i));
}

function correctAnswerText(item) {
  return 'It is built from: ' + item.builtFrom.map(i => artifacts[i].name).join(', ');
}

function drawControlLabels() {
  if (phase !== 'quiz') return;
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  text('Built from (check every artifact that applies):', margin, drawHeight + 10);
}

// Clicking an artifact opens it during the exploration, and checks or unchecks
// its checkbox during the check
function mousePressed() {
  if (phase === 'results') return;
  for (let i = 0; i < artifacts.length; i++) {
    const r = boxRect(i);
    if (mouseX < r.x || mouseX > r.x + r.w || mouseY < r.y || mouseY > r.y + r.h) continue;
    if (phase === 'intro') {
      openArtifact = i;
      opened[i] = true;
      textScale = 1;
    } else if (!revealed && i !== items[current].artifact) {
      artifactBoxes[i].checked(!artifactBoxes[i].checked());
      answerChanged();
    }
  }
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
