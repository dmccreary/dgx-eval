// Benchmark Stage Pipeline MicroSim (sim id: benchmark-stage-pipeline)
// CANVAS_HEIGHT: 520
// The learner opens each of the seven elements of the benchmark pipeline to
// read what it starts from and what it leaves. The four questions then unlock.
// Each is answered by choosing one element, and the choice is confirmed before
// the answer is revealed.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

// ---------- content ----------
const elementNoun = 'element';
const exploreInstruction = 'Open each element to see what it does';
const masteryCount = 3;

// The seven elements, in pipeline order. A run is drawn as a box and a
// directory as a cylinder.
const elements = [
  { id: 'T', label: 'Template workspace',
    description: 'The fixed starting directory with the course description. It is copied for each run and never changed.' },
  { id: 'S1', label: 'Stage 1 run',
    description: 'Runs the learning-graph skill on a copy of the template, with a 150-minute limit.' },
  { id: 'O1', label: 'Stage 1 output',
    description: 'The run directory holding the seven required files of the learning graph.' },
  { id: 'S2', label: 'Stage 2 run',
    description: 'Runs the chapter-structure skill on a copy of the stage 1 output, with a 2-hour limit.' },
  { id: 'O2', label: 'Stage 2 output',
    description: 'The run directory holding one directory and outline per chapter.' },
  { id: 'S3', label: 'Stage 3 runs',
    description: 'One run per chapter, each on a copy of the book so far, with a 90-minute limit each.' },
  { id: 'B', label: 'Finished book',
    description: 'The run directory after the last chapter, which is the book the model wrote.' }
];

const diagram = `flowchart LR
    T[("Template<br/>workspace")] -->|copy| S1["Stage 1<br/>run"]
    S1 -->|writes| O1[("Stage 1<br/>output")]
    O1 -->|copy| S2["Stage 2<br/>run"]
    S2 -->|writes| O2[("Stage 2<br/>output")]
    O2 -->|copy| S3["Stage 3<br/>runs"]
    S3 -->|writes| B[("Finished<br/>book")]`;

const misconceptions = [
  'Every stage starts from the template.',
  'Stage 3 is one run for the whole book.',
  'A run that hits its time limit loses what it wrote.',
  'A run can change its starting directory.'
];

// Each question has its text, the id of the correct element, the reason shown
// after the reveal, and the index of the misconception that a miss most likely
// reflects (null when none fits).
const questions = [
  { text: 'Which element is the starting point of stage 2?', answer: 'O1',
    why: "Each stage starts from a copy of the previous stage's output.", misconception: 0 },
  { text: 'Which element runs once for each chapter?', answer: 'S3',
    why: 'The chapter skill is run once per chapter so each gets its own timing and limit.', misconception: 1 },
  { text: 'Which element must never be changed by a run?', answer: 'T',
    why: 'It is copied for each run, so every run starts from the same input.', misconception: 3 },
  { text: 'Which element holds the seven required files of the learning graph?', answer: 'O1',
    why: 'The seven files are the required output of stage 1.', misconception: null }
];

// ---------- quiz state ----------
let mode = 'explore';     // 'explore' until every element is opened, then 'quiz', then 'results'
let opened = new Set();   // ids of the elements opened so far
let shown = null;         // id of the element whose description is on screen
let current = 0;          // index of the question on screen
let selected = null;      // id of the chosen element, or null
let revealed = false;     // true once the answer to the current question is shown
let outcomes = [];        // true or false for each answered question, in order

const byId = id => document.getElementById(id);
const labelOf = id => elements.find(e => e.id === id).label;

// One button per element. A button opens its element during the exploration
// and chooses it during the questions.
function buildChoices() {
  for (const element of elements) {
    const button = document.createElement('button');
    button.className = 'choice';
    button.dataset.id = element.id;
    button.textContent = element.label;
    button.addEventListener('click', () => pick(element.id));
    byId('choices').appendChild(button);
  }
  byId('start').addEventListener('click', startQuestions);
  byId('confirm').addEventListener('click', confirmAnswer);
  byId('next').addEventListener('click', nextQuestion);
  byId('restart').addEventListener('click', restart);
}

// Called when an element is clicked in the diagram or through its button
function pick(id) {
  if (mode === 'explore') {
    opened.add(id);
    shown = id;
  } else if (mode === 'quiz' && !revealed) {
    selected = id;
  }
  render();
}

function startQuestions() {
  if (opened.size < elements.length) return;
  mode = 'quiz';
  render();
}

// Lock in the answer and reveal the result. There is no second attempt.
function confirmAnswer() {
  if (mode !== 'quiz' || revealed || selected === null) return;
  outcomes[current] = selected === questions[current].answer;
  revealed = true;
  render();
}

function nextQuestion() {
  if (!revealed) return;
  revealed = false;
  selected = null;
  if (current < questions.length - 1) current++;
  else mode = 'results';
  render();
}

function restart() {
  mode = 'explore';
  opened = new Set();
  shown = null;
  current = 0;
  selected = null;
  revealed = false;
  outcomes = [];
  render();
}

// The state of one element, used to color both its button and its place in the diagram
function stateOf(id) {
  if (mode === 'quiz' && revealed) {
    if (id === questions[current].answer) return 'correct';
    if (id === selected) return 'wrong';
    return '';
  }
  if (mode === 'quiz' && id === selected) return 'selected';
  if (mode === 'explore' && id === shown) return 'selected';
  if (mode === 'explore' && opened.has(id)) return 'opened';
  return '';
}

// Redraw the panel from the current state
function render() {
  const score = outcomes.filter(Boolean).length;
  const question = questions[current];
  byId('feedback').hidden = true;
  byId('feedback').className = 'feedback';
  byId('results').hidden = mode !== 'results';
  byId('choices').hidden = mode === 'results';
  byId('detail').hidden = true;

  if (mode === 'explore') {
    byId('status').textContent = 'Opened ' + opened.size + ' of ' + elements.length;
    byId('score').textContent = 'Exploration, not scored';
    byId('prompt').textContent = exploreInstruction;
    if (shown !== null) {
      const element = elements.find(e => e.id === shown);
      byId('detail').hidden = false;
      byId('detail').innerHTML = '<strong>' + element.label + '</strong> ' + element.description;
    }
  } else if (mode === 'quiz') {
    byId('status').textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
    byId('score').textContent = 'Correct so far: ' + score + ' of ' + outcomes.length;
    byId('prompt').textContent = question.text;
    if (revealed) {
      const correct = outcomes[current];
      byId('feedback').hidden = false;
      byId('feedback').classList.add(correct ? 'is-correct' : 'is-wrong');
      byId('feedback').innerHTML = '<strong>' + (correct ? 'Correct' : 'Not quite') + '</strong> ' +
        (correct ? '' : '<strong>Correct ' + elementNoun + ': ' + labelOf(question.answer) + '.</strong> ') + question.why;
    }
  } else {
    byId('status').textContent = 'Finished';
    byId('score').textContent = '';
    byId('prompt').textContent = score + ' of ' + questions.length + ' correct';
    byId('results').innerHTML = resultsHtml(score);
  }

  for (const button of document.querySelectorAll('.choice')) {
    button.classList.remove('is-opened', 'is-selected', 'is-correct', 'is-wrong');
    const state = stateOf(button.dataset.id);
    if (state) button.classList.add('is-' + state);
    button.disabled = mode === 'quiz' && revealed;
  }
  byId('start').hidden = mode !== 'explore';
  byId('start').disabled = opened.size < elements.length;
  byId('confirm').hidden = mode !== 'quiz';
  byId('confirm').disabled = revealed || selected === null;
  byId('next').hidden = mode !== 'quiz';
  byId('next').disabled = !revealed;
  byId('next').textContent = current < questions.length - 1 ? 'Next question' : 'See results';
  byId('restart').hidden = mode !== 'results';
  paintStage();
}

// The final screen: whether the mastery mark was met, then the misconception behind each miss
function resultsHtml(score) {
  const mark = masteryCount + ' of ' + questions.length;
  let html = '<p>' + (score >= masteryCount
    ? 'You reached the mastery mark of ' + mark + ' on this attempt.'
    : 'The mastery mark is ' + mark + ' on a first attempt. Review the misses below, then start over.') + '</p>';
  if (score === questions.length) return html + '<p><strong>No misses. Every answer matched the key.</strong></p>';

  // group the missed questions by the misconception each one points to
  const groups = {};
  outcomes.forEach((ok, i) => {
    if (ok) return;
    const key = questions[i].misconception;
    if (!groups[key]) groups[key] = [];
    groups[key].push(i + 1);
  });
  html += '<table><tr><th>Missed</th><th>Misconception to check</th></tr>';
  for (const key in groups) {
    const numbers = groups[key];
    html += '<tr><td>' + (numbers.length > 1 ? 'Questions ' : 'Question ') + numbers.join(', ') + '</td><td>' +
      (key === 'null' ? 'No single listed misconception explains this. Read the reason shown after the reveal.' : misconceptions[key]) +
      '</td></tr>';
  }
  return html + '</table>';
}

// ---------- the diagram ----------
// Mermaid draws the flowchart as SVG. Each node is then matched to its element
// by the id that Mermaid gives it.
let nodes = {};   // element id -> the node's SVG group

async function drawDiagram() {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    themeVariables: { fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif' },
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 20, rankSpacing: 26, padding: 10 }
  });
  const { svg } = await mermaid.render('diagram-svg', diagram);
  byId('diagram').innerHTML = svg;
  for (const node of document.querySelectorAll('#diagram .node')) {
    // Mermaid ids look like "diagram-svg-flowchart-<id>-<index>"
    const match = node.id.match(/flowchart-(.+)-\d+$/);
    if (!match) continue;
    nodes[match[1]] = node;
    node.addEventListener('click', () => pick(match[1]));
  }
}

// Color each node in the diagram to match the state of its element
function paintStage() {
  for (const id in nodes) {
    nodes[id].classList.remove('is-opened', 'is-selected', 'is-correct', 'is-wrong');
    const state = stateOf(id);
    if (state) nodes[id].classList.add('is-' + state);
  }
}

buildChoices();
render();
drawDiagram().then(render);
