// Inference Request Path MicroSim (sim id: inference-request-path)
// CANVAS_HEIGHT: 520
// The learner opens each of the six stages of a chat completion request to
// read what it does. The four questions then unlock. Each describes an event
// and is answered by choosing the stage responsible, and the choice is
// confirmed before the answer is revealed.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

// ---------- content ----------
const elementNoun = 'stage';
const exploreInstruction = 'Open each stage to see what it does';
const masteryCount = 3;

// The six stages of one request, in order
const elements = [
  { id: 'C', label: 'Client',
    description: "A program such as curl or a Python script builds a JSON body with a model name and messages, and sends it to the endpoint's address." },
  { id: 'E', label: 'Endpoint',
    description: "The address 127.0.0.1 on port 11434, where the server listens. If nothing is listening, the client's connection is refused." },
  { id: 'H', label: 'Request handler',
    description: 'The server reads the body, checks that the named model exists, and counts the tokens in the prompt. An unknown model is rejected here.' },
  { id: 'L', label: 'Model loader',
    description: 'If the model is not in memory, the server reads its file from disk and places it on the GPU. This is the slow part of a first request.' },
  { id: 'G', label: 'Generation',
    description: 'The model produces the reply one token at a time on the GPU, reading the weights and the KV cache for each token.' },
  { id: 'R', label: 'Response',
    description: 'The server returns JSON with the reply text and a usage block holding the prompt and completion token counts.' }
];

const diagram = `flowchart LR
    C(["Client"]) --> E["Endpoint"]
    E --> H["Request<br/>handler"]
    H --> L["Model<br/>loader"]
    L --> G["Generation"]
    G --> R(["Response"])`;

const misconceptions = [
  'The first request is slow because the GPU is slow.',
  'A wrong model name is rejected by the model.',
  'A refused connection is a model problem.',
  'Token counts are computed by the client.'
];

// Each question has its text, the id of the correct stage, the reason shown
// after the reveal, and the index of the misconception that a miss most likely
// reflects.
const questions = [
  { text: 'The first request after the model was unloaded takes 40 seconds, and the second takes 2. Which stage accounts for the difference?',
    answer: 'L',
    why: 'The first request pays to read the model from disk into memory, which later requests skip.', misconception: 0 },
  { text: 'A request names a model that was never pulled and returns "model not found". Which stage rejected it?',
    answer: 'H',
    why: 'The handler checks the model name before any loading or generation.', misconception: 1 },
  { text: 'A request fails at once with "connection refused". Which stage is at fault?',
    answer: 'E',
    why: 'Nothing is listening at the address, usually because the server is not running.', misconception: 2 },
  { text: 'Which stage reports how many tokens the prompt and the reply used?',
    answer: 'R',
    why: 'The server returns the counts in the usage block of its reply.', misconception: 3 }
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
