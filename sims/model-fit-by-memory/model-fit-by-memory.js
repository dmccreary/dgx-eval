// Parameters That Fit in Memory MicroSim
// CANVAS_HEIGHT: 680
// The candidate models sit on a fixed chart, one point each, placed by
// parameter count. A memory slider moves one dashed line: the largest model
// whose weights still fit in memory. Nothing else on the chart moves.
// The models and the assumptions are read from model-data.json, in this folder.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 800;
// A fixed top drawing region above the interactive controls
let drawHeight = 630;
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
//   bitsPerParameter  precision of the weights the limit line is drawn for
//   axisMaxBillions   parameter count at the right end of the axis
//   models            name, parametersBillions, downloadGB, tested, and
//                     optionally activeBillions for a mixture-of-experts model
const dataFile = 'model-data.json';
let data = null;       // the parsed file, once it has loaded
let loadError = null;  // why it did not load, if it did not

// plot geometry: the rows share a fixed band, so more models means thinner rows
const plotLeft = 232;
const rowsTop = 84;
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

  describe('A fixed chart places candidate language models as points along an axis of parameter count, one model per row. A memory slider from 8 to 256 gigabytes moves a single dashed vertical line that marks the largest model whose weights fit in memory. Models to the right of the line do not fit.', LABEL);
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

  // the memory budget, and the largest model it holds, in billions of parameters
  const forWeights = memory * (1 - data.keptFreeFraction);
  const largest = forWeights * 8 / data.bitsPerParameter;

  // everything here is fixed: it does not depend on the slider
  drawModels();
  drawAxes();
  drawLegend();

  // the one thing the slider moves
  drawLimit(largest);

  drawInfo(memory, forWeights, largest);
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

// one row per model: its name, size, download, and a point on the axis
function drawModels() {
  // plot background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(plotLeft, rowsTop, plotRight - plotLeft, plotBottom - rowsTop);

  hovered = -1;
  const twoLines = rowHeight >= 28;
  for (let i = 0; i < data.models.length; i++) {
    const m = data.models[i];
    const top = rowsTop + rowHeight * i;
    const cy = top + rowHeight / 2;
    if (mouseY >= top && mouseY < top + rowHeight && mouseX >= 0 && mouseX <= canvasWidth) hovered = i;

    // row separator and a guide line out to the point
    stroke('gainsboro');
    strokeWeight(1);
    if (i > 0) line(plotLeft, top, plotRight, top);
    stroke('gray');
    line(plotLeft, cy, xFor(m.parametersBillions), cy);

    // name, then size and download; thin rows keep only the name
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(twoLines ? 14 : 12);
    text(m.name, 12, twoLines ? cy - 8 : cy);
    if (twoLines) {
      fill('dimgray');
      noStroke();
      textStyle(NORMAL);
      textSize(12.5);
      text(m.parametersBillions + ' B, ' + m.downloadGB + ' GB download', 12, cy + 8);
    }

    // the point: solid for a tested model, a ring for one not yet tested
    const size = min(17, rowHeight - 8);
    if (m.tested) {
      fill('steelblue');
      stroke('black');
      strokeWeight(i === hovered ? 3 : 1.5);
    } else {
      fill('white');
      stroke('steelblue');
      strokeWeight(i === hovered ? 5 : 3.5);
    }
    circle(xFor(m.parametersBillions), cy, size);
  }
  textStyle(NORMAL);
}

// two fixed scales for the same axis: parameters, and the memory their weights need
function drawAxes() {
  const memoryScaleY = plotBottom + 50;
  textStyle(NORMAL);

  // parameters
  stroke('black');
  strokeWeight(1.5);
  line(plotLeft, plotBottom, plotRight, plotBottom);
  for (let v = 0; v <= data.axisMaxBillions; v += 50) {
    const x = xFor(v);
    stroke('black');
    strokeWeight(1.5);
    line(x, plotBottom, x, plotBottom + 5);
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text(v, x, plotBottom + 8);
  }
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Parameters (billions)', (plotLeft + plotRight) / 2, plotBottom + 25);

  // the memory those parameters need at the chosen precision
  stroke('dimgray');
  strokeWeight(1.5);
  line(plotLeft, memoryScaleY, plotRight, memoryScaleY);
  for (let v = 0; v <= data.axisMaxBillions; v += 50) {
    const x = xFor(v);
    stroke('dimgray');
    strokeWeight(1.5);
    line(x, memoryScaleY, x, memoryScaleY + 5);
    fill('dimgray');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text(amount(v * data.bitsPerParameter / 8), x, memoryScaleY + 8);
  }
  fill('dimgray');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Memory the weights need at ' + data.bitsPerParameter + '-bit (GB)',
       (plotLeft + plotRight) / 2, memoryScaleY + 25);
}

// what the two kinds of point and the dashed line mean
function drawLegend() {
  const y = plotBottom + 108;
  const small = canvasWidth < 640;
  textStyle(NORMAL);
  textSize(small ? 11 : 13);
  const labels = ['tested in this evaluation', 'not yet tested', 'largest model that fits'];
  const widths = labels.map(l => 26 + textWidth(l) + 22);
  let x = (canvasWidth - widths.reduce((a, b) => a + b, 0) + 22) / 2;
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      fill('steelblue');
      stroke('black');
      strokeWeight(1.5);
      circle(x + 9, y, 14);
    } else if (i === 1) {
      fill('white');
      stroke('steelblue');
      strokeWeight(3.5);
      circle(x + 9, y, 14);
    } else {
      stroke('firebrick');
      strokeWeight(3);
      drawingContext.setLineDash([6, 5]);
      line(x + 9, y - 9, x + 9, y + 9);
      drawingContext.setLineDash([]);
    }
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text(labels[i], x + 26, y);
    x += widths[i];
  }
}

// the dashed line: the largest model whose weights fit in the memory left for them
function drawLimit(largest) {
  const offScale = largest > data.axisMaxBillions;
  const x = xFor(largest);
  const tagY = 62;
  stroke('firebrick');
  strokeWeight(3);
  drawingContext.setLineDash([8, 6]);
  line(x, tagY + 10, x, plotBottom + 6);
  drawingContext.setLineDash([]);
  // the same position marked on the memory scale, leaving the axis title clear
  line(x, plotBottom + 42, x, plotBottom + 56);

  const label = 'Largest model that fits: ' + amount(largest) + ' B' + (offScale ? ' (off the scale)' : '');
  textStyle(BOLD);
  textSize(13);
  const w = textWidth(label) + 16;
  const cx = constrain(x, plotLeft + w / 2, plotRight - w / 2);
  fill('white');
  stroke('firebrick');
  strokeWeight(1.5);
  rect(cx - w / 2, tagY - 10, w, 20, 10);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  text(label, cx, tagY);
  textStyle(NORMAL);
}

// the arithmetic behind the line, or the details of the model under the pointer
function drawInfo(memory, forWeights, largest) {
  const y = plotBottom + 124;
  const x = 12;
  const w = canvasWidth - 24;
  const h = drawHeight - y - 6;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);

  const bits = data.bitsPerParameter;
  let message;
  if (hovered >= 0) {
    const m = data.models[hovered];
    const needs = m.parametersBillions * bits / 8;
    message = m.name + ': ' + m.parametersBillions + ' billion parameters';
    if (m.activeBillions) {
      message += ', ' + m.activeBillions + ' billion active for each token, which helps speed and not memory';
    }
    message += '. Its weights need ' + amount(needs) + ' GB at ' + bits + '-bit, and its download is ' +
      m.downloadGB + ' GB';
    if (m.downloadGB > needs) {
      message += ', because a quantized file keeps some layers at higher precision';
    }
    message += '. With ' + memory + ' GB of memory it ' +
      (m.parametersBillions <= largest ? 'fits.' : 'does not fit: it would slow badly or fail to load.');
    if (!m.tested) message += ' Not yet tested in this evaluation.';
  } else {
    const tooLarge = data.models.filter(m => m.parametersBillions > largest).map(m => m.name);
    message = memory + ' GB of memory, with ' + round(data.keptFreeFraction * 100) + '% kept free, leaves ' +
      amount(forWeights) + ' GB for weights. At ' + bits + ' bits per parameter that holds ' +
      amount(forWeights) + ' × 8 ÷ ' + bits + ' = ' + amount(largest) + ' billion parameters. ';
    if (tooLarge.length === 0) {
      message += 'Every model on the chart fits.';
    } else if (tooLarge.length === data.models.length) {
      message += 'No model on the chart fits.';
    } else {
      message += 'Right of the dashed line, a model does not fit and would slow badly or fail to load: ' +
        tooLarge.join(', ') + '.';
    }
  }
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(canvasWidth < 700 ? 12 : 15);
  text(message, x + 10, y + 8, w - 20, h - 12);
}

// a count or a size: whole numbers as they are, one decimal for small fractions
function amount(v) {
  if (v >= 20 || abs(v - round(v)) < 0.05) return round(v);
  return nf(v, 0, 1);
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
