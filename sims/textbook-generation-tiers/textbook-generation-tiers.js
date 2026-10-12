// Five Tiers of Textbook Generation MicroSim (sim id: textbook-generation-tiers)
// CANVAS_HEIGHT: 640
// The five tiers are drawn as a stack, each one wider than the tier above it.
// The learner opens each tier to read what it holds and one rule it must
// follow. The five questions then unlock. Each is answered by choosing one
// tier, and the choice is confirmed before the answer is revealed.

// ---------- content ----------
const exploreInstruction = 'Open each tier to see what it holds';
// Shown in the detail box before any tier is opened
const overview = 'Each tier is built from the tiers above it. A person writes tier 1. In the benchmark the model must produce tiers 2, 3, and 4, and tier 5 is outside it.';
const masteryCount = 4;

// The five tiers, from the top of the stack to the bottom. kind says who makes
// the tier: 'by-person', 'by-model' (inside the benchmark), or 'outside'.
const tiers = [
  { id: '1', name: 'Course Description', kind: 'by-person',
    size: 'One document of a few pages', maker: 'Written by a person',
    description: 'States who the course is for, what it covers, what it leaves out, and what students will be able to do. Every model starts from the same copy.',
    rule: 'It names the topics the course leaves out, so that the tiers below do not invent them.' },
  { id: '2', name: 'Learning Graph', kind: 'by-model',
    size: '200 concepts', maker: 'Model: benchmark stage 1',
    description: 'Lists the concepts of the course and records which concept depends on which.',
    rule: 'Every concept label is in Title Case and at most 32 characters long, and the graph has no cycles.',
    image: 'learning-graph-viewer.png',
    imageAlt: 'The learning graph viewer showing the Algebra I graph that the model qwen3.6:35b generated: 200 concept boxes colored by topic, joined by dependency lines, beside a list of topic categories.',
    link: '../graph-viewer/main.html?model=qwen3.6-35b',
    linkText: 'Open this graph in the viewer' },
  { id: '3', name: 'Book Structure', kind: 'by-model',
    size: 'About 10 chapters', maker: 'Model: benchmark stage 2',
    description: "Places every concept into a chapter and writes each chapter's title, summary, and concept list.",
    rule: 'Every concept appears in exactly one chapter, and no concept appears before the concepts it depends on.' },
  { id: '4', name: 'Chapter Content', kind: 'by-model',
    size: 'About 20 concepts per chapter', maker: 'Model: benchmark stage 3',
    description: 'Writes the prose, tables, and worked examples for each chapter, and the specification for each MicroSim.',
    rule: 'Every sentence suits the reading level of the audience.' },
  { id: '5', name: 'MicroSims and Supplementary Content', kind: 'outside',
    size: 'MicroSims, a glossary, an FAQ, and quizzes', maker: 'Not in this benchmark',
    description: 'Builds the working MicroSims from their specifications, and writes the glossary, the FAQ, and the quizzes.',
    rule: 'Each MicroSim demonstrates exactly one idea.' }
];

const misconceptions = [
  'The model writes the course description.',
  'Chapters are written straight from the course description, with no learning graph and no structure step.',
  'MicroSim specifications are written in tier 5, when the MicroSims are built.',
  'The benchmark covers all five tiers.'
];

// Each question has its text, the id of the correct tier, the reason shown
// after the reveal, and the index of the misconception that a miss most likely
// reflects.
const questions = [
  { text: 'Which tier decides which chapter each concept goes in?', answer: '3',
    why: 'Book structure design places every concept into exactly one chapter.', misconception: 1 },
  { text: 'Which tier is written by a person?', answer: '1',
    why: 'A person writes the course description, and every model starts from the same copy of it.', misconception: 0 },
  { text: 'Which tier is not part of this benchmark?', answer: '5',
    why: 'The benchmark stops after chapter content. MicroSims, the glossary, the FAQ, and the quizzes are outside it.', misconception: 3 },
  { text: 'Which tier records which concept depends on which?', answer: '2',
    why: 'The learning graph stores the concepts and the dependencies between them as data.', misconception: 1 },
  { text: 'Which tier writes the specification for each MicroSim?', answer: '4',
    why: 'The specification is written inside a chapter. Tier 5 builds the MicroSim from it.', misconception: 2 }
];

// ---------- quiz state ----------
let mode = 'explore';     // 'explore' until every tier is opened, then 'quiz', then 'results'
let opened = new Set();   // ids of the tiers opened so far
let shown = null;         // id of the tier whose description is on screen
let current = 0;          // index of the question on screen
let selected = null;      // id of the chosen tier, or null
let revealed = false;     // true once the answer to the current question is shown
let outcomes = [];        // true or false for each answered question, in order

const byId = id => document.getElementById(id);
const tierOf = id => tiers.find(t => t.id === id);
const titleOf = id => 'Tier ' + id + ': ' + tierOf(id).name;

// One button per tier, with an arrow between each pair. A button opens its
// tier during the exploration and chooses it during the questions.
function buildTiers() {
  tiers.forEach((tier, i) => {
    if (i > 0) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '▼';
      byId('tiers').appendChild(arrow);
    }
    const button = document.createElement('button');
    button.className = 'tier ' + tier.kind;
    button.dataset.id = tier.id;
    button.innerHTML = '<span class="num">' + tier.id + '</span>' +
      '<span class="body"><span class="name">' + tier.name + '</span>' +
      '<span class="facts"><span>' + tier.size + '</span><span class="maker">' + tier.maker + '</span></span></span>' +
      (tier.image ? '<img src="' + tier.image + '" alt="' + tier.imageAlt + '">' : '');
    button.addEventListener('click', () => pick(tier.id));
    byId('tiers').appendChild(button);
  });
  byId('start').addEventListener('click', startQuestions);
  byId('confirm').addEventListener('click', confirmAnswer);
  byId('next').addEventListener('click', nextQuestion);
  byId('restart').addEventListener('click', restart);
}

// Called when a tier is clicked
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
  if (opened.size < tiers.length) return;
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

// The state of one tier, used to color its button
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
  // the results need the room, and the score line already says the run is over
  document.querySelector('.status-row').hidden = mode === 'results';
  byId('detail').hidden = true;
  // the sizes and makers would give answers away, so they show only outside the questions
  byId('tiers').classList.toggle('is-quiz', mode === 'quiz');

  if (mode === 'explore') {
    byId('status').textContent = 'Opened ' + opened.size + ' of ' + tiers.length;
    byId('score').textContent = 'Exploration, not scored';
    byId('prompt').textContent = exploreInstruction;
    byId('detail').hidden = false;
    if (shown === null) {
      byId('detail').textContent = overview;
    } else {
      const tier = tierOf(shown);
      byId('detail').innerHTML = '<strong>' + titleOf(shown) + '.</strong> ' + tier.description +
        '<br><strong>Example rule:</strong> ' + tier.rule +
        (tier.link ? ' <a href="' + tier.link + '" target="_blank" rel="noopener">' + tier.linkText + '</a>' : '');
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
        (correct ? '' : '<strong>Correct tier: ' + tierOf(question.answer).name + '.</strong> ') + question.why;
    }
  } else {
    byId('prompt').textContent = score + ' of ' + questions.length + ' correct. ' + (score >= masteryCount
      ? 'You reached the mastery mark of ' + masteryCount + ' of ' + questions.length + '.'
      : 'The mastery mark is ' + masteryCount + ' of ' + questions.length + ' on a first attempt.');
    byId('results').innerHTML = resultsHtml(score);
  }

  for (const button of document.querySelectorAll('.tier')) {
    button.classList.remove('is-opened', 'is-selected', 'is-correct', 'is-wrong');
    const state = stateOf(button.dataset.id);
    if (state) button.classList.add('is-' + state);
    button.setAttribute('aria-pressed', state === 'selected' ? 'true' : 'false');
    button.disabled = (mode === 'quiz' && revealed) || mode === 'results';
  }
  byId('start').hidden = mode !== 'explore';
  byId('start').disabled = opened.size < tiers.length;
  byId('confirm').hidden = mode !== 'quiz';
  byId('confirm').disabled = revealed || selected === null;
  byId('next').hidden = mode !== 'quiz';
  byId('next').disabled = !revealed;
  byId('next').textContent = current < questions.length - 1 ? 'Next question' : 'See results';
  byId('restart').hidden = mode !== 'results';
}

// The final screen: the misconception behind each miss
function resultsHtml(score) {
  if (score === questions.length) return '<p><strong>No misses. Every answer matched the key.</strong></p>';
  let html = '';

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
      misconceptions[key] + '</td></tr>';
  }
  return html + '</table>';
}

buildTiers();
render();
