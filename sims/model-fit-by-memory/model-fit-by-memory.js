// Parameters That Fit in Memory MicroSim
// CANVAS_HEIGHT: 540
// A memory slider moves three limits along a parameter-count axis: the most
// parameters that fit at 16-bit, 8-bit, and 4-bit precision. The candidate
// models sit on the axis as points, colored by the best precision that fits.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 800;
// A fixed top drawing region above the interactive controls
let drawHeight = 490;
// The control region holds the Reset button and the memory slider
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
// room to the left of the slider for the Reset button and the label with its value
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// the model: memory for weights = memory - headroom, and
// parameters that fit = memory for weights x 8 / bits per parameter
const defaultMemory = 128;  // GB of unified memory in each DGX unit
const headroom = 0.20;      // share kept free for the operating system and the context
const axisMax = 250;        // billions of parameters at the right end of the axis

// from highest precision to lowest, plus the case where nothing fits
const levels = [
  { bits: 16, status: 'fits at 16-bit', zone: 'palegreen', dot: 'forestgreen', ink: 'darkgreen' },
  { bits: 8, status: 'fits at 8-bit', zone: 'paleturquoise', dot: 'darkturquoise', ink: 'teal' },
  { bits: 4, status: 'fits at 4-bit', zone: 'khaki', dot: 'gold', ink: 'darkgoldenrod' },
  { bits: 0, status: 'does not fit', zone: 'mistyrose', dot: 'lightcoral', ink: 'firebrick' }
];

// candidate models: parameters in billions, 4-bit download size in GB
const models = [
  { name: 'gemma4:26b', params: 25.2, download: 18, tested: true },
  { name: 'qwen3.8:27b', params: 27, download: 17, tested: true },
  { name: 'gemma4:31b', params: 30.7, download: 20, tested: true },
  { name: 'gpt-oss:120b', params: 117, download: 65, tested: true },
  { name: 'qwen3.5:122b', params: 122, download: 81, tested: false }
];

// plot geometry
const plotLeft = 200;
const rowsTop = 140;
const rowHeight = 38;
let plotRight;
let plotBottom;

let memorySlider;
let resetButton;
let hovered = -1;

function setup() {
  updateCanvasSize(); // set the container dimensions to get the correct container width
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);
  frameRate(30);

  // Always use the native builtin p5.js controls
  resetButton = createButton('Reset');
  resetButton.position(10, drawHeight + 12);
  resetButton.mousePressed(() => memorySlider.value(defaultMemory));

  memorySlider = createSlider(8, 256, defaultMemory, 8);
  memorySlider.position(sliderLeftMargin, drawHeight + 14);
  memorySlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('A memory slider from 8 to 256 gigabytes moves three vertical limits along an axis of parameter count, showing the most parameters that fit at 16-bit, 8-bit, and 4-bit precision. Five candidate language models appear as points on the axis, colored by the highest precision at which each one fits.', LABEL);
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

  plotRight = canvasWidth - 30;
  plotBottom = rowsTop + rowHeight * models.length;

  const memory = memorySlider.value();
  const kept = memory * headroom;
  const forWeights = memory - kept;
  // the most parameters, in billions, that fit at each precision
  const fits = levels.slice(0, 3).map(level => forWeights * 8 / level.bits);

  // title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(canvasWidth < 520 ? 18 : 24);
  text('How Many Parameters Fit in Memory?', canvasWidth / 2, 8);

  // the memory budget, in words
  noStroke();
  textStyle(NORMAL);
  textSize(canvasWidth < 640 ? 12 : 16);
  text(memory + ' GB of memory, with ' + round(headroom * 100) + '% kept free (' + gb(kept) +
       ' GB), leaves ' + gb(forWeights) + ' GB for model weights', canvasWidth / 2, 46);

  drawZones(fits);
  drawModels(fits);
  drawLimits(fits);
  drawAxis();
  drawLegend();
  drawInfo(fits, forWeights);

  // slider label and value in the control area
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  textSize(defaultTextSize);
  text('Memory: ' + memory + ' GB', 75, drawHeight + 25);
}

// x position on the parameter axis, clamped to the plot
function xFor(params) {
  return plotLeft + (plotRight - plotLeft) * constrain(params, 0, axisMax) / axisMax;
}

// which level a model of this size lands in: 0, 1, 2, or 3 for "does not fit"
function levelFor(params, fits) {
  for (let i = 0; i < fits.length; i++) {
    if (params <= fits[i]) return i;
  }
  return 3;
}

// shaded bands: the precision a model of each size needs
function drawZones(fits) {
  const edges = [0, fits[0], fits[1], fits[2], axisMax];
  noStroke();
  for (let i = 0; i < 4; i++) {
    const x1 = xFor(edges[i]);
    const x2 = xFor(edges[i + 1]);
    if (x2 > x1) {
      fill(levels[i].zone);
      rect(x1, rowsTop, x2 - x1, plotBottom - rowsTop);
    }
  }
  noFill();
  stroke('silver');
  strokeWeight(1);
  rect(plotLeft, rowsTop, plotRight - plotLeft, plotBottom - rowsTop);
}

// one row per model: its name, size, verdict, and a point on the axis
function drawModels(fits) {
  hovered = -1;
  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    const top = rowsTop + rowHeight * i;
    const cy = top + rowHeight / 2;
    const level = levels[levelFor(m.params, fits)];
    if (mouseY >= top && mouseY < top + rowHeight && mouseX >= 0 && mouseX <= canvasWidth) hovered = i;

    // row separator and a guide line out to the point
    stroke('silver');
    strokeWeight(1);
    if (i > 0) line(plotLeft, top, plotRight, top);
    stroke('gray');
    line(plotLeft, cy, xFor(m.params), cy);

    // name, with a note for the model that was not tested
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(15);
    text(m.name, 12, cy - 9);
    if (!m.tested) {
      const nameWidth = textWidth(m.name);
      fill('dimgray');
      noStroke();
      textStyle(NORMAL);
      textSize(12);
      text('not tested', 18 + nameWidth, cy - 9);
    }
    // size and verdict
    fill(level.ink);
    noStroke();
    textStyle(NORMAL);
    textSize(13);
    text(m.params + ' B, ' + level.status, 12, cy + 9);

    // the point: solid for a tested model, a ring for one that was only considered
    if (m.tested) {
      fill(level.dot);
      stroke('black');
      strokeWeight(i === hovered ? 3 : 1.5);
    } else {
      fill('white');
      stroke(level.ink);
      strokeWeight(i === hovered ? 5 : 3.5);
    }
    circle(xFor(m.params), cy, 17);
  }
}

// the three moving limits, each with a tag on its own level so tags never collide
function drawLimits(fits) {
  for (let i = 0; i < 3; i++) {
    const level = levels[i];
    const offScale = fits[i] > axisMax;
    const x = xFor(fits[i]);
    const tagY = 82 + 20 * i;
    stroke(level.ink);
    strokeWeight(2.5);
    if (offScale) drawingContext.setLineDash([5, 4]);
    line(x, tagY + 9, x, plotBottom);
    drawingContext.setLineDash([]);

    const label = level.bits + '-bit: ' + count(fits[i]) + ' B' + (offScale ? ' (off the scale)' : '');
    textStyle(BOLD);
    textSize(13);
    const w = textWidth(label) + 14;
    const cx = constrain(x, plotLeft + w / 2, plotRight - w / 2);
    fill('white');
    stroke(level.ink);
    strokeWeight(1.5);
    rect(cx - w / 2, tagY - 9, w, 18, 9);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    text(label, cx, tagY);
  }
  textStyle(NORMAL);
}

function drawAxis() {
  stroke('black');
  strokeWeight(1.5);
  line(plotLeft, plotBottom, plotRight, plotBottom);
  textStyle(NORMAL);
  textSize(13);
  for (let v = 0; v <= axisMax; v += 50) {
    const x = xFor(v);
    stroke('black');
    strokeWeight(1.5);
    line(x, plotBottom, x, plotBottom + 5);
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    text(v, x, plotBottom + 8);
  }
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Parameters (billions)', (plotLeft + plotRight) / 2, plotBottom + 26);
}

function drawLegend() {
  const y = plotBottom + 60;
  const labels = ['fits at 16-bit', 'needs 8-bit or lower', 'needs 4-bit', 'does not fit'];
  textStyle(NORMAL);
  textSize(canvasWidth < 640 ? 11 : 13);
  // lay the four entries out from the center
  const widths = labels.map(l => 20 + textWidth(l) + 18);
  let x = (canvasWidth - widths.reduce((a, b) => a + b, 0) + 18) / 2;
  for (let i = 0; i < 4; i++) {
    fill(levels[i].zone);
    stroke(levels[i].ink);
    strokeWeight(1.5);
    rect(x, y - 7, 14, 14, 3);
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text(labels[i], x + 20, y);
    x += widths[i];
  }
}

// the formula with the current numbers, or the details of the model under the pointer
function drawInfo(fits, forWeights) {
  const y = plotBottom + 76;
  const x = 12;
  const w = canvasWidth - 24;
  const h = drawHeight - y - 6;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);

  let message;
  if (hovered >= 0) {
    const m = models[hovered];
    message = m.name + ': ' + m.params + ' billion parameters. Its weights need ' +
      gb(m.params * 4 / 8) + ' GB at 4-bit, ' + gb(m.params * 8 / 8) + ' GB at 8-bit, and ' +
      gb(m.params * 16 / 8) + ' GB at 16-bit. The 4-bit download is ' + m.download +
      ' GB, more than the formula gives, because a quantized file keeps some layers at higher precision.' +
      (m.tested ? '' : ' This model was considered and not tested.');
  } else {
    message = 'Parameters that fit = memory for weights × 8 ÷ bits per parameter. At 4-bit: ' +
      gb(forWeights) + ' GB × 8 ÷ 4 = ' + count(fits[2]) +
      ' billion. Point at a model to see how much memory its weights need.';
  }
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(canvasWidth < 700 ? 12 : 15);
  text(message, x + 10, y + 8, w - 20, h - 12);
}

// a parameter count in billions, with one decimal only when it is small
function count(v) {
  return v >= 20 ? round(v) : nf(v, 0, 1);
}

// gigabytes, with one decimal only when it is small
function gb(v) {
  return v >= 20 ? round(v) : nf(v, 0, 1);
}

// These two functions must be present for width responsive MicroSims
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  memorySlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  // Get the width of the <main> element
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}
