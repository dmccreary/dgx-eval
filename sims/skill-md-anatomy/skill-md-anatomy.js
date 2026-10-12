// SKILL.md Anatomy MicroSim (sim id: skill-md-anatomy)
// CANVAS_HEIGHT: 728
// An annotated skill folder has six regions. Hovering over a region shows its
// label. The learner answers six questions about how a harness uses a skill by
// selecting one region for each, and a selection is confirmed before the
// answer is revealed. The skill shown is a synthetic example.

// ---------- content ----------
const elementNoun = 'region';
const masteryCount = 5;
const hoverHint = 'Hover over a region to read its label';

// The six regions of the annotated folder. Each id matches the data-id of a
// region button in main.html.
const elements = [
  { id: 'name', label: 'name field' },
  { id: 'description', label: 'description field' },
  { id: 'metadata', label: 'metadata field' },
  { id: 'body', label: 'instruction body' },
  { id: 'references', label: 'references folder' },
  { id: 'scripts', label: 'scripts folder' }
];

const misconceptions = [
  'The harness reads every file in a skill at startup.',
  'The body of SKILL.md is how a skill is chosen.',
  'Reference documents are loaded with the instructions.',
  "A skill's scripts run by themselves."
];

// Each question has its text, the id of the correct region, the reason shown
// after the reveal, and the index of the misconception that a miss most likely
// reflects (null when none fits).
const questions = [
  { text: "Which part is the skill's identifier, matching the directory name?", answer: 'name',
    why: 'The name identifies the skill to the harness.', misconception: null },
  { text: 'Which part does the harness read at startup to decide whether the skill applies?', answer: 'description',
    why: 'Only the name and description of each skill are loaded at startup.', misconception: 1 },
  { text: 'Which part holds the step-by-step procedure, loaded when the skill is invoked?', answer: 'body',
    why: 'The body is loaded on selection, not at startup.', misconception: 0 },
  { text: 'Which part holds long documents that are read only when a step names them?', answer: 'references',
    why: 'References are loaded last, one at a time.', misconception: 2 },
  { text: 'Which part holds helper programs that a step tells the model to run?', answer: 'scripts',
    why: 'Scripts are run by a step, and they do not run on their own.', misconception: 3 },
  { text: "Which part records the skill's version?", answer: 'metadata',
    why: 'The version is carried in the metadata block of the header.', misconception: null }
];

// ---------- quiz state ----------
let mode = 'quiz';        // 'quiz' while questions are answered, then 'results'
let current = 0;          // index of the question on screen
let selected = null;      // id of the chosen element, or null
let revealed = false;     // true once the answer to the current question is shown
let outcomes = [];        // true or false for each answered question, in order

const byId = id => document.getElementById(id);
const labelOf = id => elements.find(e => e.id === id).label;

// Wire up the choices and the action buttons
function buildChoices() {
  // the choices are the regions already drawn on the page
  for (const button of document.querySelectorAll('.choice')) {
    button.addEventListener('click', () => pick(button.dataset.id));
  }
  byId('confirm').addEventListener('click', confirmAnswer);
  byId('next').addEventListener('click', nextQuestion);
  byId('restart').addEventListener('click', restart);
}

// Called when an element is clicked in the diagram or through its button
function pick(id) {
  if (mode === 'quiz' && !revealed) selected = id;
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
  mode = 'quiz';
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

  if (mode === 'quiz') {
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

// ---------- the annotated folder ----------
let hovered = null;   // id of the region under the pointer or with keyboard focus

// Hovering or focusing a region shows its label
for (const region of document.querySelectorAll('.choice')) {
  const show = () => { hovered = region.dataset.id; paintStage(); };
  const hide = () => { hovered = null; paintStage(); };
  region.addEventListener('mouseenter', show);
  region.addEventListener('focus', show);
  region.addEventListener('mouseleave', hide);
  region.addEventListener('blur', hide);
}

// The line under the folder names the hovered region, or else the selected one
function paintStage() {
  let line = hoverHint;
  if (hovered !== null) line = 'Region: ' + labelOf(hovered);
  else if (mode === 'quiz' && selected !== null) line = 'Selected region: ' + labelOf(selected);
  byId('region-label').textContent = line;
}

buildChoices();
render();
