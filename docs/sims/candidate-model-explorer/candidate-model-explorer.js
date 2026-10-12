// Candidate Model Explorer MicroSim (sim id: candidate-model-explorer)
// CANVAS_HEIGHT: 750
// A bubble chart places ten candidate models by parameter count and generation
// speed, with the bubble's size showing the download size. The learner answers
// five questions by choosing one model for each, and a choice is confirmed
// before the answer is revealed. The values are measured, one run each, and
// provisional.

// ---------- content ----------
const elementNoun = 'model';
const masteryCount = 4;

// The ten models: a letter drawn on the bubble, the model name, parameters in
// billions, speed in tokens per second, and download size in gigabytes.
// labelSide moves a letter outside its bubble where two bubbles overlap.
const elements = [
  { id: 'A', label: 'qwen3.8:27b', parameters: 27, speed: 26, download: 17 },
  { id: 'B', label: 'gemma4:31b', parameters: 30.7, speed: 34, download: 20 },
  { id: 'C', label: 'muse-glimmer:30b', parameters: 30, speed: 13, download: 18, labelSide: 'left' },
  { id: 'D', label: 'qwen3.6:35b', parameters: 35, speed: 94, download: 22 },
  { id: 'E', label: 'gemma4:26b', parameters: 25.2, speed: 108, download: 18 },
  { id: 'F', label: 'nemotron-3.5-lightning:30b', parameters: 30, speed: 95, download: 25 },
  { id: 'G', label: 'mistral-medium-3.5:128b', parameters: 128, speed: 3, download: 80 },
  { id: 'H', label: 'gpt-oss:120b', parameters: 117, speed: 41, download: 65 },
  { id: 'I', label: 'devstral-small-2:24b', parameters: 24, speed: 15, download: 15 },
  { id: 'J', label: 'granite4.2:30b', parameters: 30, speed: 12, download: 17, labelSide: 'right' }
];

const misconceptions = [
  'A bigger model is a faster model.',
  'A bigger download means more parameters.',
  'A mixture-of-experts model needs less memory.',
  'The model with the most parameters is the best choice.'
];

// Each question has its text, the id of the correct model, the reason shown
// after the reveal, and the index of the misconception that a miss most likely
// reflects (null when none fits).
const questions = [
  { text: 'Which model has the highest generation speed?', answer: 'E',
    why: 'At 108 tokens per second it is the highest point on the chart.', misconception: 0 },
  { text: 'Which model has the largest download?', answer: 'G',
    why: 'At 80 GB it is the largest bubble.', misconception: null },
  { text: 'Among models faster than 80 tokens per second, which has the largest download?', answer: 'F',
    why: 'The three above 80 are 18, 22, and 25 GB, and 25 GB is the largest.', misconception: 1 },
  { text: 'Which model has more than 100 billion parameters and runs faster than 30 tokens per second?', answer: 'H',
    why: 'It has 117 billion parameters at 41 tokens per second, and the other model above 100 billion runs at 3.', misconception: 3 },
  { text: 'Which model has the fewest parameters?', answer: 'I',
    why: 'At 24 billion it is the leftmost bubble.', misconception: 1 }
];

// ---------- quiz state ----------
let mode = 'quiz';        // 'quiz' while questions are answered, then 'results'
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

// ---------- the chart ----------
// The bubble's radius grows with the square root of the download, so that its
// area is in proportion to the download size
const bubbleRadius = element => 3.2 * Math.sqrt(element.download);

// Fill and outline for each state of a bubble
const bubbleStyles = {
  '': { fill: 'rgba(70, 130, 180, 0.55)', stroke: 'steelblue', width: 1.5 },
  selected: { fill: 'rgba(135, 206, 250, 0.9)', stroke: 'navy', width: 3.5 },
  correct: { fill: 'rgba(152, 251, 152, 0.9)', stroke: 'forestgreen', width: 3.5 },
  wrong: { fill: 'rgba(255, 160, 122, 0.9)', stroke: 'navy', width: 3.5 }
};

// Draw each model's letter on its bubble, or beside it where two bubbles overlap
const letterPlugin = {
  id: 'letters',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    chart.getDatasetMeta(0).data.forEach((point, i) => {
      const element = elements[i];
      const offset = bubbleRadius(element) + 8;
      const dx = element.labelSide === 'left' ? -offset : element.labelSide === 'right' ? offset : 0;
      ctx.fillText(element.id, point.x + dx, point.y);
    });
    ctx.restore();
  }
};

const chart = new Chart(byId('chart'), {
  type: 'bubble',
  data: {
    datasets: [{
      data: elements.map(e => ({ x: e.parameters, y: e.speed, r: bubbleRadius(e) })),
      hoverRadius: 0
    }]
  },
  plugins: [letterPlugin],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    layout: { padding: { top: 6, right: 10 } },
    scales: {
      x: {
        // a logarithmic scale spreads out the eight models between 24 and 35 billion
        type: 'logarithmic',
        min: 20,
        max: 160,
        title: { display: true, text: 'Parameters (billions, logarithmic scale)', color: 'black', font: { size: 14 } },
        ticks: { color: 'black', callback: value => [20, 25, 30, 40, 50, 70, 100, 150].includes(value) ? value : '' }
      },
      y: {
        // the axis starts a little below zero so that the slowest model's bubble is not cut off
        min: -10,
        max: 120,
        title: { display: true, text: 'Generation speed (tokens per second)', color: 'black', font: { size: 14 } },
        ticks: { color: 'black', stepSize: 20, callback: value => value < 0 ? '' : value }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: item => {
            const e = elements[item.dataIndex];
            return e.id + '  ' + e.label + ': ' + e.parameters + ' billion parameters, ' + e.speed + ' tokens/s, ' + e.download + ' GB download';
          }
        }
      }
    },
    // clicking a bubble chooses that model
    onClick: (event, items) => {
      if (items.length > 0) pick(elements[items[0].index].id);
    }
  }
});

// Color each bubble to match the state of its model
function paintStage() {
  const styles = elements.map(e => bubbleStyles[stateOf(e.id)]);
  const dataset = chart.data.datasets[0];
  dataset.backgroundColor = styles.map(s => s.fill);
  dataset.borderColor = styles.map(s => s.stroke);
  dataset.borderWidth = styles.map(s => s.width);
  chart.update('none');
}

buildChoices();
// each button carries the letter that is drawn on its model's bubble
for (const button of document.querySelectorAll('.choice')) {
  button.textContent = button.dataset.id + '  ' + button.textContent;
}
render();
