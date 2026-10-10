// iBook Skill Testing Environment MicroSim (sim id: testing-architecture)
// CANVAS_HEIGHT: 712
// A step-through architecture diagram: a laptop, two home networks, the
// internet, Tailscale, and two DGX systems, and the flows between them when a
// local model generates textbook content.
// Every address, hostname, and login is deliberately left out of this diagram.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 940;
// A fixed top drawing region above the interactive controls
let drawHeight = 662;
// The control region holds the three buttons and the step label
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;
let defaultTextSize = 16;

// The diagram is laid out in a fixed design space and scaled to fit the width
const designWidth = 940;
const designHeight = 556;
const diagramTop = 36;   // where the first container starts in the design space
const titleBand = 36;    // canvas pixels reserved for the title
const minPanelHeight = 98;
const maxPanelHeight = 130;

// application state
let step = 0;        // 0 is the overview, 1..8 are the flows
let hoveredId = null;
let prevButton, nextButton, overviewButton;

// fill and outline colors by kind of component
const kinds = {
  tailscale: { fill: 'paleturquoise', stroke: 'teal' },
  harness: { fill: 'peachpuff', stroke: 'chocolate' },
  ssh: { fill: 'lightsteelblue', stroke: 'steelblue' },
  ollama: { fill: 'plum', stroke: 'purple' },
  cpu: { fill: 'gainsboro', stroke: 'dimgray' },
  gpu: { fill: 'palegreen', stroke: 'forestgreen' },
  memory: { fill: 'khaki', stroke: 'darkgoldenrod' },
  disk: { fill: 'lightgray', stroke: 'dimgray' },
  service: { fill: 'white', stroke: 'slateblue' },
  router: { fill: 'lightyellow', stroke: 'goldenrod' }
};

// the three network containers and the three machines
const containers = [
  { x: 10, y: 36, w: 209, h: 516, label: "Author's home network", fill: 'ivory', stroke: 'tan' },
  { x: 235, y: 36, w: 220, h: 516, label: 'Internet', fill: 'lavender', stroke: 'slateblue' },
  { x: 471, y: 36, w: 459, h: 516, label: "Administrator's home network", fill: 'ivory', stroke: 'tan' }
];
const machines = [
  { x: 20, y: 62, w: 189, h: 280, label: 'Mac laptop' },
  { x: 573, y: 58, w: 347, h: 234, label: 'DGX unit A' },
  { x: 573, y: 312, w: 347, h: 234, label: 'DGX unit B' }
];

// every component, keyed by id
const comps = {};

function addComp(id, x, y, w, h, kind, title, sub, detail, dashed) {
  comps[id] = { id, x, y, w, h, kind, title, sub, detail, dashed: !!dashed };
}

function buildComponents() {
  // Mac laptop
  addComp('mac.harness', 30, 88, 169, 44, 'harness', 'Claude Code harness', ['first runs only'],
    'First runs only. A headless copy of Claude Code ran on the Mac and used the DGX model through an SSH port forward. Later runs moved the harness into a container on the DGX.', true);
  addComp('mac.session', 30, 144, 169, 54, 'harness', 'Claude Code session', ['orchestrator'],
    'The orchestrator: Claude Code on the Mac, using a cloud Claude model. It starts runs over SSH, watches them, and scores the output. It writes none of the benchmark content.');
  addComp('mac.ssh', 30, 210, 169, 44, 'ssh', 'SSH client', ['ed25519 key, no password'],
    'The OpenSSH client. Ed25519 is a modern public-key signature algorithm. The key is a pair: a private half that stays on the laptop and a public half installed on each DGX. The DGX checks a signature made by the private half, so login needs no password and scripts can log in unattended.');
  addComp('mac.ts', 30, 266, 169, 66, 'tailscale', 'Tailscale', ['tailscale + tailscaled', 'in the dgx conda env'],
    'The dgx conda environment holds two packages: the tailscale command-line client and the tailscaled daemon it talks to. The daemon is the laptop end of the tunnel.');
  addComp('home.router', 49, 456, 131, 40, 'router', 'Home router', ['NAT'],
    "The author's home router. It translates addresses (NAT) and sees only encrypted WireGuard packets.");

  // Internet
  addComp('net.coord', 245, 66, 200, 54, 'tailscale', 'Coordination server', ['Tailscale keys and addresses'],
    "Tailscale's coordination server is the control plane. It authenticates each machine and shares public keys and addresses. No project data passes through it.");
  addComp('net.registry', 245, 146, 200, 46, 'service', 'Model registry', ['model weights'],
    'The Ollama model library. Four models, about 120 GB in total, were downloaded once and stored on the DGX disks.');
  addComp('net.sources', 245, 208, 200, 46, 'service', 'Software sources', ['container image, installer'],
    'Public sources for the container base image, Python packages, and the Claude Code installer. They were used once, when the harness container was built.');
  addComp('net.api', 245, 286, 200, 54, 'service', 'Claude API', ["the orchestrator's own model"],
    'The cloud model behind the orchestrator session. It receives the commands the orchestrator sends and the results it reads. It never receives the generation prompts.');
  addComp('net.relay', 270, 502, 150, 42, 'tailscale', 'Tailscale relay', ['if no direct path'],
    'A Tailscale relay forwards encrypted packets when two machines cannot reach each other directly. It cannot read what it forwards.');

  // Administrator's home network
  addComp('adm.router', 481, 456, 74, 40, 'router', 'Router', ['NAT'],
    "The Administrator's home router. It translates addresses (NAT) and sees only encrypted WireGuard packets.");

  const models = {
    a: ['qwen3.8:27b (17 GB)', 'gpt-oss:120b (65 GB)'],
    b: ['gemma4:26b (18 GB)', 'gemma4:31b (20 GB)']
  };
  for (const [unit, y0] of [['a', 58], ['b', 312]]) {
    addComp(unit + '.docker', 581, y0 + 26, 160, 44, 'harness', 'Docker container', ['harness + ibook-skills'],
      'A Docker container holding Claude Code as the agent loop, the ibook-skills skills, Python, and MkDocs. The agent inside can write only to its run directory.');
    addComp(unit + '.ollama', 753, y0 + 26, 159, 44, 'ollama', 'Ollama server', ['localhost only'],
      "Ollama, installed in the user's home directory. It listens on this machine only and serves the model through an Anthropic-compatible API.");
    addComp(unit + '.cpu', 581, y0 + 78, 160, 40, 'cpu', 'CPU', ['20 Arm cores'],
      '20 Arm cores: 10 Cortex-X925 and 10 Cortex-A725. The CPU runs the harness, the tools it calls, and Ollama itself.');
    addComp(unit + '.gpu', 753, y0 + 78, 159, 40, 'gpu', 'GPU: NVIDIA GB10', ['6,144 CUDA cores'],
      'NVIDIA GB10, Blackwell architecture, with 6,144 CUDA cores. It generates every token and has no memory of its own.');
    addComp(unit + '.mem', 581, y0 + 126, 331, 40, 'memory', 'Unified memory: 128 GB', ['shared by the CPU and the GPU'],
      '128 GB of unified memory, shared by the CPU and the GPU. Model weights and the conversation context both live here, so a large context competes with everything else.');
    addComp(unit + '.ts', 581, y0 + 174, 96, 54, 'tailscale', 'tailscaled', ['tunnel end'],
      'The tailscaled daemon on this DGX: its end of the encrypted tunnel.');
    addComp(unit + '.disk', 689, y0 + 174, 223, 54, 'disk', 'NVMe disk, 1 TB', models[unit],
      'A 1 TB NVMe solid-state disk. The two models listed were downloaded here. Run output is written here too.');
  }
}

// the overview plus eight flows
const steps = [
  { title: 'Overview',
    text: 'Two home networks and the internet sit between the laptop and the DGX systems. Press Next to follow one flow at a time, or point at any component to see what it does.' },
  { title: 'Join the tailnet',
    active: ['mac.ts', 'net.coord', 'a.ts', 'b.ts'],
    text: "Each machine runs a tailscaled daemon that registers with Tailscale's coordination server. The server authenticates the machines and shares their public keys and addresses. No project data passes through it." },
  { title: 'Build the encrypted tunnel', tunnel: true,
    active: ['mac.ts', 'home.router', 'adm.router', 'a.ts', 'b.ts', 'net.relay'],
    text: 'With those keys, the daemons build a WireGuard tunnel through both home routers. They connect directly when they can and through a Tailscale relay when they cannot. Routers and relays see only encrypted packets.' },
  { title: 'Orchestrate over SSH', tunnel: true, tunnelLabel: 'SSH inside the tunnel',
    active: ['mac.session', 'mac.ssh', 'mac.ts', 'home.router', 'adm.router', 'a.ts', 'b.ts', 'net.api'],
    text: 'A Claude Code session on the Mac logs in to each DGX with an SSH key, inside the tunnel. It starts runs, watches them, and scores the output. Its own model runs in the cloud, so its commands and the results it reads go to the Claude API.' },
  { title: 'Download models and software, once',
    active: ['net.registry', 'net.sources', 'a.ollama', 'a.disk', 'a.docker', 'b.ollama', 'b.disk', 'b.docker'],
    text: 'Ollama on each DGX downloaded two models from the model registry to the NVMe disk, about 120 GB in all. The harness container was built from public software sources. After this step, generating text needs nothing from the internet.' },
  { title: 'Load a model into memory',
    active: ['a.disk', 'a.ollama', 'a.mem', 'a.gpu', 'b.disk', 'b.ollama', 'b.mem', 'b.gpu'],
    text: 'To serve a model, Ollama reads its weights from disk into unified memory. The GPU has no memory of its own: its 6,144 CUDA cores work on the same 128 GB that the CPU uses.' },
  { title: 'Generate, entirely on the DGX',
    active: ['a.docker', 'a.ollama', 'a.cpu', 'a.gpu', 'a.mem', 'a.disk', 'b.docker', 'b.ollama', 'b.cpu', 'b.gpu', 'b.mem', 'b.disk'],
    text: 'The Claude Code harness in the container loads a skill and sends prompts to Ollama on the same machine. The GPU generates every token. The harness runs the tools the model asks for and writes the results to disk. No prompt or token in this loop leaves the DGX.' },
  { title: 'Collect and score results', tunnel: true, tunnelLabel: 'results over SSH',
    active: ['a.disk', 'a.ts', 'b.disk', 'b.ts', 'adm.router', 'home.router', 'mac.ts', 'mac.ssh', 'mac.session'],
    text: "The orchestrator reads each run's event log and output files over SSH, then scores them on the Mac. The generated files stay on the DGX disk." },
  { title: 'Earlier arrangement: harness on the Mac', tunnel: true, tunnelLabel: 'prompts and tokens',
    active: ['mac.harness', 'mac.ssh', 'mac.ts', 'home.router', 'adm.router', 'a.ts', 'a.ollama', 'a.gpu', 'a.mem', 'b.ts', 'b.ollama', 'b.gpu', 'b.mem'],
    text: 'In the first runs the harness ran on the Mac. It reached Ollama through an SSH port forward inside the tunnel, so prompts and tokens crossed the tailnet. The model still ran on the DGX GPU.' }
];

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);
  frameRate(30);
  buildComponents();

  // Always use the native builtin p5.js controls
  prevButton = createButton('Previous');
  prevButton.position(10, drawHeight + 12);
  prevButton.mousePressed(() => { step = max(0, step - 1); });

  nextButton = createButton('Next');
  nextButton.position(88, drawHeight + 12);
  nextButton.mousePressed(() => { step = min(steps.length - 1, step + 1); });

  overviewButton = createButton('Overview');
  overviewButton.position(142, drawHeight + 12);
  overviewButton.mousePressed(() => { step = 0; });

  describe('Architecture diagram of a laptop on one home network reaching two DGX systems on another home network through an encrypted Tailscale tunnel across the internet. Next and Previous buttons step through eight flows, and pointing at a component shows its details.', LABEL);
}

function draw() {
  // check for window resize
  updateCanvasSize();

  // drawing area: very light blue background with a silver border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control area: white background with the same silver border
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  noStroke();

  // scale the fixed design space to the available width, never above 1
  const s = min(1, canvasWidth / designWidth);
  const offsetX = (canvasWidth - designWidth * s) / 2;
  // center the diagram and its panel vertically when the width leaves room
  // the diagram starts just under the title band, whatever the scale
  const offsetY = titleBand - diagramTop * s;
  const diagramBottom = offsetY + designHeight * s;
  // a narrower diagram is shorter, which leaves room for a taller info panel
  const panelHeight = constrain(drawHeight - diagramBottom - 8, minPanelHeight, maxPanelHeight);
  hoveredId = findHovered((mouseX - offsetX) / s, (mouseY - offsetY) / s);

  // title, drawn at full size at the top of the canvas
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(canvasWidth < 460 ? 18 : 24);
  text('iBook Skill Testing Environment', canvasWidth / 2, 5);
  textStyle(NORMAL);

  push();
  translate(offsetX, offsetY);
  scale(s);
  drawDiagram();
  pop();

  drawInfoPanel(diagramBottom + 4, panelHeight);

  // step label in the control area
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  textSize(defaultTextSize);
  const label = step === 0 ? 'Press Next to follow the flows' : 'Step ' + step + ' of ' + (steps.length - 1) + ': ' + steps[step].title;
  text(label, 228, drawHeight + 25);
}

function drawDiagram() {
  const current = steps[step];
  const active = current.active ? new Set(current.active) : null;

  // network containers
  for (const c of containers) {
    fill(c.fill);
    stroke(c.stroke);
    strokeWeight(1.5);
    rect(c.x, c.y, c.w, c.h, 10);
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(14);
    text(c.label, c.x + 8, c.y + 6);
  }

  // machines
  for (const m of machines) {
    fill('white');
    stroke('gray');
    strokeWeight(1.5);
    rect(m.x, m.y, m.w, m.h, 6);
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(14);
    text(m.label, m.x + 8, m.y + 6);
  }

  // the cable between the two DGX units
  stroke('dimgray');
  strokeWeight(3);
  line(746, 292, 746, 312);
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  textSize(12);
  text('200 Gb/s link', 754, 302);

  // the tunnel is always present: strong when the step uses it, faint otherwise
  drawTunnel(step === 0 || current.tunnel ? 1 : 0.25, current.tunnel);

  // components: the ones outside the current flow are dimmed
  for (const id in comps) {
    drawComp(comps[id], !active || active.has(id), id === hoveredId);
  }

  drawFlow(step, current);
}

function drawComp(c, isActive, isHovered) {
  const k = kinds[c.kind];
  drawingContext.globalAlpha = isActive ? 1 : 0.28;
  fill(k.fill);
  stroke(isHovered ? 'black' : k.stroke);
  strokeWeight(isHovered ? 3 : (isActive && step > 0 ? 2.5 : 1.2));
  if (c.dashed) drawingContext.setLineDash([5, 4]);
  rect(c.x, c.y, c.w, c.h, 5);
  drawingContext.setLineDash([]);

  // the title and its detail lines, centered as a block
  const lines = c.sub.length;
  let ty = c.y + (c.h - (17 + 15 * lines)) / 2;
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(14);
  text(c.title, c.x + c.w / 2, ty);
  textStyle(NORMAL);
  textSize(12.5);
  for (let i = 0; i < lines; i++) {
    noStroke();
    text(c.sub[i], c.x + c.w / 2, ty + 18 + 15 * i);
  }
  drawingContext.globalAlpha = 1;
}

// the encrypted tunnel: laptop daemon, both routers, and each DGX daemon
function drawTunnel(alpha, strong) {
  drawingContext.globalAlpha = alpha;
  stroke('teal');
  strokeWeight(strong ? 5 : 3);
  drawingContext.setLineDash([9, 6]);
  line(114, 332, 114, 456);   // laptop daemon to the home router
  line(180, 476, 481, 476);   // router to router, across the internet
  line(518, 456, 518, 259);   // Administrator's router up to unit A
  line(518, 259, 581, 259);
  line(518, 496, 518, 513);   // Administrator's router down to unit B
  line(518, 513, 581, 513);
  drawingContext.setLineDash([]);
  tag('WireGuard tunnel', 345, 462, 'teal');
  drawingContext.globalAlpha = 1;
}

// the arrows and labels that belong to one step
function drawFlow(n, current) {
  const flow = 'orangered';
  if (n === 1) {
    arrow(199, 299, 245, 93, flow);
    arrow(581, 259, 445, 93, flow);
    arrow(581, 513, 445, 93, flow);
    tag('keys and addresses', 513, 150, flow);
  } else if (n === 2) {
    // the fallback path through a relay
    stroke('teal');
    strokeWeight(2);
    drawingContext.setLineDash([3, 4]);
    line(180, 486, 270, 523);
    line(420, 523, 481, 486);
    drawingContext.setLineDash([]);
    tag('direct when possible', 345, 490, 'teal');
  } else if (n === 3) {
    arrow(180, 193, 180, 215, flow);
    arrow(180, 249, 180, 271, flow);
    arrow(199, 171, 245, 313, 'slateblue', true);
    tag("orchestrator's conversation", 345, 270, 'slateblue');
  } else if (n === 4) {
    arrow(445, 169, 573, 100, flow);
    arrow(445, 169, 573, 354, flow);
    arrow(445, 231, 573, 112, 'slateblue');
    arrow(445, 231, 573, 366, 'slateblue');
    tag('models', 513, 124, flow);
    tag('software', 513, 300, 'slateblue');
  } else if (n === 5) {
    for (const y0 of [58, 312]) {
      arrow(890, y0 + 180, 890, y0 + 160, flow);        // disk up to memory
      arrow(900, y0 + 133, 900, y0 + 111, flow, true);  // memory and GPU
    }
  } else if (n === 6) {
    for (const y0 of [58, 312]) {
      arrow(735, y0 + 62, 759, y0 + 62, flow, true);    // harness and Ollama
      arrow(900, y0 + 64, 900, y0 + 84, flow);          // Ollama down to the GPU
      arrow(900, y0 + 111, 900, y0 + 133, flow, true);  // GPU and memory
      arrow(593, y0 + 111, 593, y0 + 133, flow, true);  // CPU and memory
    }
  } else if (n === 7) {
    arrow(180, 271, 180, 249, flow);
    arrow(180, 215, 180, 193, flow);
  } else if (n === 8) {
    // the harness hands its requests to the SSH client, along the left margin
    stroke(flow);
    strokeWeight(2.5);
    noFill();
    line(30, 110, 25, 110);
    line(25, 110, 25, 232);
    arrow(25, 232, 34, 232, flow);
    arrow(180, 249, 180, 271, flow);
  }
  if (current.tunnelLabel) tag(current.tunnelLabel, 345, 490, flow);
}

// a straight arrow, optionally with a head at both ends
function arrow(x1, y1, x2, y2, col, bothEnds) {
  stroke(col);
  strokeWeight(2.5);
  line(x1, y1, x2, y2);
  // short arrows between neighboring boxes get smaller heads so they fit
  const head = min(9, dist(x1, y1, x2, y2) * (bothEnds ? 0.45 : 0.9));
  arrowHead(x1, y1, x2, y2, col, head);
  if (bothEnds) arrowHead(x2, y2, x1, y1, col, head);
}

function arrowHead(x1, y1, x2, y2, col, head) {
  const angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  fill(col);
  noStroke();
  triangle(0, 0, -head, -head * 0.6, -head, head * 0.6);
  pop();
}

// a small label on a white pill, so it stays readable over lines
function tag(label, cx, cy, col) {
  textStyle(NORMAL);
  textSize(12);
  const w = textWidth(label) + 10;
  fill('white');
  stroke(col);
  strokeWeight(1);
  rect(cx - w / 2, cy - 9, w, 18, 9);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  text(label, cx, cy);
}

// the panel under the diagram: the hovered component, or the current step
function drawInfoPanel(y, panelHeight) {
  const x = margin;
  const w = canvasWidth - 2 * margin;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, panelHeight, 8);

  let heading, body;
  if (hoveredId) {
    const c = comps[hoveredId];
    const unit = hoveredId.startsWith('a.') ? ' (DGX unit A)' : hoveredId.startsWith('b.') ? ' (DGX unit B)' : '';
    heading = c.title + unit;
    body = c.detail;
  } else {
    heading = step === 0 ? steps[0].title : 'Step ' + step + ': ' + steps[step].title;
    body = steps[step].text;
  }
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(16);
  text(heading, x + 12, y + 8);
  noStroke();
  textStyle(NORMAL);
  textSize(canvasWidth < 700 ? 12 : (canvasWidth < 900 ? 14 : 15));
  text(body, x + 12, y + 31, w - 24, panelHeight - 34);
}

// which component, if any, is under the pointer (in design coordinates)
function findHovered(mx, my) {
  for (const id in comps) {
    const c = comps[id];
    if (mx >= c.x && mx <= c.x + c.w && my >= c.y && my <= c.y + c.h) return id;
  }
  return null;
}

// These two functions must be present for width responsive MicroSims
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  // Get the width of the <main> element
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}
