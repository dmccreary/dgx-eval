// Learning Graph Defect Finder MicroSim (sim id: learning-graph-defect-finder)
// CANVAS_HEIGHT: 836
// A dependency graph of 16 concepts hides four structural defects: a duplicate
// label, an orphan, a cycle, and a label that is too long. The learner flags
// concepts with a defect type, then submits once. Two legitimate look-alikes
// are included, so flagging everything unusual does not work.

// ---------- content ----------
const labelLimit = 32;   // a label is too long when it has more characters than this
const defectTypes = ['Duplicate label', 'Orphan', 'Cycle', 'Label too long'];
const typeColors = {
  'Duplicate label': 'khaki',
  'Orphan': 'plum',
  'Cycle': 'lightsalmon',
  'Label too long': 'paleturquoise'
};
// What each check looks for
const typeRules = {
  'Duplicate label': 'two labels that are equal when compared without regard to case',
  'Orphan': 'a concept with no prerequisites and no dependents',
  'Cycle': 'a set of concepts that cannot be ordered so that every concept follows its prerequisites',
  'Label too long': 'a label with more than ' + labelLimit + ' characters'
};
const startInstruction = 'Find the four structural defects in this learning graph';

// The 16 concepts. dependsOn lists the ids of the concepts each one depends
// on, and x and y place its box in the drawing.
const concepts = [
  { id: 1, label: 'Numbers', dependsOn: [], x: 48, y: 100 },
  { id: 2, label: 'Variables', dependsOn: [1], x: 146, y: 100 },
  { id: 3, label: 'Expressions', dependsOn: [2], x: 250, y: 100 },
  { id: 4, label: 'Equations', dependsOn: [3], x: 352, y: 100 },
  { id: 5, label: 'Linear Equations', dependsOn: [4], x: 452, y: 42 },
  { id: 6, label: 'Slope', dependsOn: [5], x: 552, y: 20 },
  { id: 7, label: 'slope', dependsOn: [5], x: 552, y: 70 },
  { id: 8, label: 'Graphing Lines', dependsOn: [6], x: 652, y: 20 },
  { id: 9, label: 'Systems of Equations', dependsOn: [5, 8], x: 736, y: 76 },
  { id: 10, label: 'Inequalities', dependsOn: [4], x: 452, y: 108 },
  { id: 11, label: 'Factoring', dependsOn: [13], x: 180, y: 250 },
  { id: 12, label: 'Quadratic Expressions', dependsOn: [11], x: 372, y: 256 },
  { id: 13, label: 'Polynomials', dependsOn: [12], x: 276, y: 312 },
  { id: 14, label: 'Scientific Notation', dependsOn: [], x: 56, y: 250 },
  { id: 15, label: 'Representing Linear Relationships in Tables Graphs and Equations', dependsOn: [5], x: 620, y: 176 },
  { id: 16, label: 'Absolute Value Function Examples', dependsOn: [4], x: 470, y: 184 }
];

// The answer key. A defect is found when every concept listed for it is
// flagged with that type.
const answerKey = [
  { type: 'Duplicate label', concepts: [6, 7],
    reason: 'Slope and slope are equal when compared without regard to case.' },
  { type: 'Orphan', concepts: [14],
    reason: 'Scientific Notation depends on nothing, and nothing depends on it.' },
  { type: 'Cycle', concepts: [11, 12, 13],
    reason: 'Factoring, Polynomials, and Quadratic Expressions each depend on the next, so no study order exists.' },
  { type: 'Label too long', concepts: [15],
    reason: 'Its label has 64 characters, which is over the 32-character limit.' }
];
// Why the two look-alikes are not defects
const lookAlikes = {
  1: 'Numbers is foundational: it has no prerequisites, but other concepts depend on it.',
  16: 'Its label has exactly 32 characters, which is at the limit and not over it.'
};

// ---------- state ----------
let selectedId = null;   // id of the concept on show, or null
let flags = {};          // concept id -> the defect type it is flagged with
let submitted = false;   // there is one submission

const byId = id => document.getElementById(id);
const conceptOf = id => concepts.find(c => c.id === id);
const nameOf = id => id + ' ' + conceptOf(id).label;

// ---------- the graph ----------
const nodes = new vis.DataSet(concepts.map(c => ({
  id: c.id,
  label: c.label,
  x: c.x,
  y: c.y,
  widthConstraint: { maximum: c.label.length > 40 ? 170 : (c.label.length > 24 ? 112 : 92) }
})));
// an arrow points from a concept to each concept it depends on
const edges = new vis.DataSet(concepts.flatMap(c => c.dependsOn.map(p => ({ from: c.id, to: p }))));

const network = new vis.Network(byId('network'), { nodes: nodes, edges: edges }, {
  physics: false,
  nodes: {
    shape: 'box',
    fixed: true,
    margin: 6,
    font: { size: 13, face: 'Arial, Helvetica, sans-serif', color: 'black' },
    color: { background: 'white', border: 'steelblue', highlight: { background: 'white', border: 'navy' } }
  },
  edges: {
    arrows: { to: { enabled: true, scaleFactor: 0.7 } },
    color: { color: 'dimgray', highlight: 'dimgray' },
    smooth: false
  },
  // the graph never captures the mouse wheel or a drag, so the page scrolls normally
  interaction: { zoomView: false, dragView: false, dragNodes: false, selectConnectedEdges: false }
});

// Fit the drawing to the box, but never enlarge it beyond full size
function fitGraph() {
  network.fit({ animation: false });
  if (network.getScale() > 1) network.moveTo({ scale: 1, animation: false });
}
network.once('afterDrawing', fitGraph);
window.addEventListener('resize', fitGraph);

network.on('click', params => {
  if (params.nodes.length > 0) selectConcept(params.nodes[0]);
});

// ---------- actions ----------
function selectConcept(id) {
  selectedId = id;
  render();
}

function flagSelected() {
  if (submitted || selectedId === null) return;
  flags[selectedId] = byId('type-select').value;
  render();
}

function removeFlag() {
  if (submitted || selectedId === null) return;
  delete flags[selectedId];
  render();
}

function submit() {
  submitted = true;
  render();
}

function restart() {
  selectedId = null;
  flags = {};
  submitted = false;
  render();
}

// ---------- drawing the page ----------
function render() {
  byId('prompt').textContent = submitted ? scoreLine() + '. ' + masteryLine() : startInstruction;
  byId('workbench').hidden = submitted;
  byId('checks').hidden = submitted;
  byId('results').hidden = !submitted;
  byId('restart').hidden = !submitted;
  byId('concept-select').value = selectedId === null ? '' : String(selectedId);
  byId('flag').disabled = selectedId === null;
  byId('unflag').disabled = selectedId === null || !(selectedId in flags);
  byId('detail').innerHTML = detailHtml();
  byId('flags').innerHTML = flagsHtml();
  if (submitted) byId('results').innerHTML = resultsHtml();
  paintNodes();
}

// What is known about the selected concept: its label length and its neighbors
function detailHtml() {
  if (selectedId === null) return 'Click a concept in the graph, or choose one from the list, to read its label length, its prerequisites, and its dependents.';
  const c = conceptOf(selectedId);
  const dependents = concepts.filter(d => d.dependsOn.includes(c.id));
  const list = items => items.length > 0 ? items.map(i => nameOf(i)).join(', ') : 'none';
  return '<strong>' + nameOf(c.id) + '</strong><br>' +
    'Label length: ' + c.label.length + ' characters (limit ' + labelLimit + ')<br>' +
    'Depends on: ' + list(c.dependsOn) + '<br>' +
    'Dependents: ' + list(dependents.map(d => d.id));
}

function flagsHtml() {
  const ids = Object.keys(flags).map(Number).sort((a, b) => a - b);
  if (ids.length === 0) return 'No flags yet.';
  return 'Flags: ' + ids.map(id =>
    '<span class="swatch" style="background: ' + typeColors[flags[id]] + '">' + nameOf(id).slice(0, 22) + ': ' + flags[id] + '</span>').join('');
}

function isFound(defect) {
  return defect.concepts.every(id => flags[id] === defect.type);
}

// Flags on concepts that are in no defect
function falseFlags() {
  const keyed = answerKey.flatMap(d => d.concepts);
  return Object.keys(flags).map(Number).filter(id => !keyed.includes(id)).sort((a, b) => a - b);
}

function scoreLine() {
  const found = answerKey.filter(isFound).length;
  const extra = falseFlags().length;
  return found + ' of ' + answerKey.length + ' defects found, ' + extra + (extra === 1 ? ' false flag' : ' false flags');
}

// Mastery is all four defects found with at most one false flag
function masteryLine() {
  const mastered = answerKey.every(isFound) && falseFlags().length <= 1;
  return mastered ? 'You reached the mastery mark.' : 'The mastery mark is all four found with at most one false flag.';
}

// After the submission: each defect found or missed, then each false flag
function resultsHtml() {
  const extra = falseFlags();
  let html = '<table><tr><th>Defect</th><th>Result</th><th>Reason</th></tr>';
  for (const defect of answerKey) {
    html += '<tr><td>' + defect.type + ': ' + defect.concepts.join(', ') + '</td><td>' +
      (isFound(defect) ? 'Found' : 'Missed') + '</td><td>' + defect.reason + '</td></tr>';
  }
  // the reasons for the first two false flags are shown, and any others are counted
  for (const id of extra.slice(0, 2)) {
    html += '<tr><td>False flag: ' + nameOf(id).slice(0, 24) + '</td><td>Not a defect</td><td>' +
      (lookAlikes[id] || 'It is connected, its label is unique and within the limit, and it is on no cycle.') + '</td></tr>';
  }
  if (extra.length > 2) {
    html += '<tr><td colspan="3">' + (extra.length - 2) + ' more false ' + (extra.length === 3 ? 'flag is' : 'flags are') + ' not listed.</td></tr>';
  }
  return html + '</table>';
}

// Color each box: a flag fills it with the color of its type. After the
// submission, the border shows whether a flag was right.
function paintNodes() {
  const keyed = {};
  for (const defect of answerKey) for (const id of defect.concepts) keyed[id] = defect;
  nodes.update(concepts.map(c => {
    let border = c.id === selectedId ? 'navy' : 'steelblue';
    let width = c.id === selectedId ? 3 : 1;
    let dashes = false;
    if (submitted && c.id in keyed) {
      const right = flags[c.id] === keyed[c.id].type;
      border = right ? 'forestgreen' : 'firebrick';
      width = 4;
      dashes = !right;   // a missed defect has a dashed border as well as a different color
    } else if (submitted && c.id in flags) {
      border = 'darkorange';
      width = 4;
      dashes = true;
    }
    const fill = c.id in flags ? typeColors[flags[c.id]] : 'white';
    return {
      id: c.id,
      borderWidth: width,
      borderWidthSelected: width,
      shapeProperties: { borderDashes: dashes ? [6, 4] : false },
      color: { background: fill, border: border, highlight: { background: fill, border: border } }
    };
  }));
}

// ---------- setup ----------
byId('concept-select').innerHTML = '<option value="">choose a concept</option>' +
  concepts.map(c => '<option value="' + c.id + '">' + nameOf(c.id).slice(0, 40) + '</option>').join('');
byId('type-select').innerHTML = defectTypes.map(t => '<option>' + t + '</option>').join('');
// the four checks, each with the color its flags use
byId('checks').innerHTML = '<strong>The four checks.</strong> A concept on a cycle or in a duplicate pair is flagged individually.<br>' +
  defectTypes.map(t => '<span class="swatch" style="background: ' + typeColors[t] + '">' + t + '</span> ' + typeRules[t]).join('<br>');
byId('concept-select').addEventListener('change', event => {
  selectConcept(event.target.value === '' ? null : Number(event.target.value));
});
byId('flag').addEventListener('click', flagSelected);
byId('unflag').addEventListener('click', removeFlag);
byId('submit').addEventListener('click', submit);
byId('restart').addEventListener('click', restart);
render();
