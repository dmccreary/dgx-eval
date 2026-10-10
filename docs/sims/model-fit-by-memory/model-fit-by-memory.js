// Parameters That Fit in Memory MicroSim
// CANVAS_HEIGHT: 710
// A memory slider moves three limits along a parameter-count axis: the most
// parameters that fit at 16-bit, 8-bit, and 4-bit precision. The candidate
// models sit on the axis as points, colored by the best precision that fits.
// The models and the assumptions are read from model-data.json, in this folder.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 800;
// A fixed top drawing region above the interactive controls
let drawHeight = 660;
// The control region holds the Reset button and the memory slider
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
// room to the left of the slider for the Reset button and the label with its value
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// The data file. Everything a reader might want to change lives there:
//   defaultMemoryGB   where the slider starts, and where Reset returns it
//   keptFreeFraction  share of memory kept free for the system and the context
//   axisMaxBillions   parameter count at the right end of the axis
//   models            name, parametersBillions, downloadGB, tested, and
//                     optionally activeBillions for a mixture-of-experts model
const dataFile = 'model-data.json';
let data = null;       // the parsed file, once it has loaded
let loadError = null;  // why it did not load, if it did not

// from highest precision to lowest, plus the case where nothing fits
const levels = [
  { bits: 16, status: 'fits at 16-bit', zone: 'palegreen', dot: 'forestgreen', ink: 'darkgreen' },
  { bits: 8, status: 'fits at 8-bit', zone: 'paleturquoise', dot: 'darkturquoise', ink: 'teal' },
  { bits: 4, status: 'fits at 4-bit', zone: 'khaki', dot: 'gold', ink: 'darkgoldenrod' },
  { bits: 0, status: 'does not fit', zone: 'mistyrose', dot: 'lightcoral', ink: 'firebrick' }
];

// plot geometry: the rows share a fixed band, so more models means thinner rows
const plotLeft = 232;
const rowsTop = 140;
const rowsBand = 320;
let rowHeight = 32;
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
  resetButton.mousePressed(() => memorySlider.value(data ? data.defaultMemoryGB : 128));

  memorySlider = createSlider(8, 256, 128, 8);
  memorySlider.position(sliderLeftMargin, drawHeight + 14);
  memorySlider.size(canvasWidth - sliderLeftMargin - margin);

  loadData();

  describe('A memory slider from 8 to 256 gigabytes moves three vertical limits along an axis of parameter count, showing the most parameters that fit at 16-bit, 8-bit, and 4-bit precision. The candidate language models appear as points on the axis, one per row, colored by the highest precision at which each one fits.', LABEL);
}

// read model-data.json, then order the models from smallest to largest
function loadData() {
  fetch(dataFile)
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(json => {
      json.models.sort((a, b) => a.parametersBillions - b.parametersBillions);
      data = json;
      memorySlider.value(data.defaultMemoryGB);
    })
    .catch(error => { loadError = String(error); });
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

  // title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(canvasWidth < 520 ? 18 : 24);
  text('How Many Parameters Fit in Memory?', canvasWidth / 2, 8);
  textStyle(NORMAL);

  const memory = memorySlider.value();

  // slider label and value in the control area
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Memory: ' + memory + ' GB', 75, drawHeight + 25);

  if (!data) {
    drawWaiting();
    return;
  }

  plotRight = canvasWidth - 30;
  rowHeight = min(40, rowsBand / data.models.length);
  plotBottom = rowsTop + rowHeight * data.models.length;

  const kept = memory * data.keptFreeFraction;
  const forWeights = memory - kept;
  // the most parameters, in billions, that fit at each precision
  const fits = levels.slice(0, 3).map(level => forWeights * 8 / level.bits);

  // the memory budget, in words
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 640 ? 12 : 16);
  text(memory + ' GB of memory, with ' + round(data.keptFreeFraction * 100) + '% kept free (' + amount(kept) +
       ' GB), leaves ' + amount(forWeights) + ' GB for model weights', canvasWidth / 2, 46);

  drawZones(fits);
  drawModels(fits);
  drawLimits(fits);
  drawAxis();
  drawLegend();
  drawInfo(fits, forWeights);
}

// shown until the data file arrives, or in its place if it never does
function drawWaiting() {
  fill(loadError ? 'firebrick' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  const message = loadError
    ? 'Could not load ' + dataFile + ' (' + loadError + ').\nOpen this MicroSim through a web server. A browser will not read the data file from a local folder.'
    : 'Loading ' + dataFile + '...';
  text(message, 30, 150, canvasWidth - 60, 120);
}

// x position on the parameter axis, clamped to the plot
function xFor(params) {
  return plotLeft + (plotRight - plotLeft) * constrain(params, 0, data.axisMaxBillions) / data.axisMaxBillions;
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
  const edges = [0, fits[0], fits[1], fits[2], data.axisMaxBillions];
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
  const twoLines = rowHeight >= 28;
  for (let i = 0; i < data.models.length; i++) {
    const m = data.models[i];
    const top = rowsTop + rowHeight * i;
    const cy = top + rowHeight / 2;
    const level = levels[levelFor(m.parametersBillions, fits)];
    if (mouseY >= top && mouseY < top + rowHeight && mouseX >= 0 && mouseX <= canvasWidth) hovered = i;

    // row separator and a guide line out to the point
    stroke('silver');
    strokeWeight(1);
    if (i > 0) line(plotLeft, top, plotRight, top);
    stroke('gray');
    line(plotLeft, cy, xFor(m.parametersBillions), cy);

    // name, then size and verdict; thin rows keep only the name
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(twoLines ? 14 : 12);
    text(m.name, 12, twoLines ? cy - 8 : cy);
    if (twoLines) {
      fill(level.ink);
      noStroke();
      textStyle(NORMAL);
      textSize(12.5);
      text(m.parametersBillions + ' B, ' + level.status, 12, cy + 8);
    }

    // the point: solid for a tested model, a ring for one not yet tested
    const size = min(17, rowHeight - 8);
    if (m.tested) {
      fill(level.dot);
      stroke('black');
      strokeWeight(i === hovered ? 3 : 1.5);
    } else {
      fill('white');
      stroke(level.ink);
      strokeWeight(i === hovered ? 5 : 3.5);
    }
    circle(xFor(m.parametersBillions), cy, size);
  }
  textStyle(NORMAL);
}

// the three moving limits, each with a tag on its own level so tags never collide
function drawLimits(fits) {
  for (let i = 0; i < 3; i++) {
    const level = levels[i];
    const offScale = fits[i] > data.axisMaxBillions;
    const x = xFor(fits[i]);
    const tagY = 82 + 20 * i;
    stroke(level.ink);
    strokeWeight(2.5);
    if (offScale) drawingContext.setLineDash([5, 4]);
    line(x, tagY + 9, x, plotBottom);
    drawingContext.setLineDash([]);

    const label = level.bits + '-bit: ' + amount(fits[i]) + ' B' + (offScale ? ' (off the scale)' : '');
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
  for (let v = 0; v <= data.axisMaxBillions; v += 50) {
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

// two centered rows: what the bands mean, and what the two kinds of point mean
function drawLegend() {
  const small = canvasWidth < 640;
  textStyle(NORMAL);
  textSize(small ? 11 : 13);

  // row 1: the four bands
  let y = plotBottom + 60;
  const bands = ['fits at 16-bit', 'needs 8-bit or lower', 'needs 4-bit', 'does not fit'];
  let widths = bands.map(l => 20 + textWidth(l) + 18);
  let x = (canvasWidth - widths.reduce((a, b) => a + b, 0) + 18) / 2;
  for (let i = 0; i < 4; i++) {
    fill(levels[i].zone);
    stroke(levels[i].ink);
    strokeWeight(1.5);
    rect(x, y - 7, 14, 14, 3);
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text(bands[i], x + 20, y);
    x += widths[i];
  }

  // row 2: solid point or ring
  y = plotBottom + 82;
  const points = ['tested in this evaluation', 'not yet tested'];
  widths = points.map(l => 22 + textWidth(l) + 22);
  x = (canvasWidth - widths.reduce((a, b) => a + b, 0) + 22) / 2;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      fill('gray');
      stroke('black');
      strokeWeight(1.5);
    } else {
      fill('white');
      stroke('gray');
      strokeWeight(3.5);
    }
    circle(x + 8, y, 14);
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text(points[i], x + 22, y);
    x += widths[i];
  }
}

// the formula with the current numbers, or the details of the model under the pointer
function drawInfo(fits, forWeights) {
  const y = plotBottom + 98;
  const x = 12;
  const w = canvasWidth - 24;
  const h = drawHeight - y - 6;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);

  let message;
  if (hovered >= 0) {
    const m = data.models[hovered];
    const at4 = m.parametersBillions * 4 / 8;
    message = m.name + ': ' + m.parametersBillions + ' billion parameters';
    if (m.activeBillions) {
      message += ', ' + m.activeBillions + ' billion active for each token, which helps speed and not memory';
    }
    message += '. Its weights need ' + amount(at4) + ' GB at 4-bit, ' + amount(m.parametersBillions) +
      ' GB at 8-bit, and ' + amount(m.parametersBillions * 2) + ' GB at 16-bit. The 4-bit download is ' +
      m.downloadGB + ' GB';
    if (m.downloadGB > at4) {
      message += ', more than the formula gives, because a quantized file keeps some layers at higher precision';
    }
    message += m.tested ? '.' : '. Not yet tested in this evaluation.';
  } else {
    message = 'Parameters that fit = memory for weights × 8 ÷ bits per parameter. At 4-bit: ' +
      amount(forWeights) + ' GB × 8 ÷ 4 = ' + amount(fits[2]) +
      ' billion. Point at a model to see how much memory its weights need.';
  }
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(canvasWidth < 700 ? 12 : 15);
  text(message, x + 10, y + 8, w - 20, h - 12);
}

// a count or a size, with one decimal only when it is small
function amount(v) {
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
