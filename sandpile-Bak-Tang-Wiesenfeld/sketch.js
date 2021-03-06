var sandpile = new Array(500),
  toppleValue = 4,
  radius = 1,
  side = 1,
  gui,
  framesPerSecond=4;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('p5-canvas-holder');
  canvas.mouseClicked(restart);

  pixelDensity(1);
  background(0);
  restart();
  sliderRange(1, 60, 1);
  gui = createGui('Sandpile', 10, 10);
  gui.addGlobals('framesPerSecond');

}

function restart() {
  for (let i = 0; i < 500; i++) {
    sandpile[i] = new Array(500);
    for (let j = 0; j < 500; j++) {
      sandpile[i][j] = 0;
    }
  }
}

function draw() {
  frameRate(framesPerSecond);
  background(0);
  sandpile[250][250]++;

  topple();

  side = width / (2 * radius + 1);

  // if (frameCount % 60 === 1) {
  for (let i = 250 - radius; i < 251 + radius; i++) {
    for (let j = 250 - radius; j < 251 + radius; j++) {
      push();
      translate((i - 250) * side - side / 2, (j - 250) * side - side / 2);
      if (sandpile[i][j]) {
        var color = 360 * sandpile[i][j] / (toppleValue - 1);

        noStroke();
        // stroke(color, 100, 100);
        fillHsluv(color, 100, 75);
        rect(i, j, side, side);
        // point(i, j);
      }
      pop();
    }
  }

  // Legend
  strokeHsluv(0, 0, 25);
  noFill();
  rect(1, 470, 20, 19);

  noStroke();
  fillHsluv(0, 0, 75);
  text('0', 7, 485);

  for (let i = 1; i < 4; i++) {
    fillHsluv(120 * i, 100, 75);
    rect(i * 20, 470, 20, 20);
    fillHsluv(0, 0, 25);
    text(i, 7 + i * 20, 485);
  }
}

function topple() {
  var repeat = false;
  for (let i = 250 - radius; i < 251 + radius; i++) {
    for (let j = 250 - radius; j < 251 + radius; j++) {

      if (sandpile[i][j] === toppleValue) {
        if (i === 250 - radius || j === 250 - radius || i === 249 + radius || j === 249 + radius) {
          radius++;
        }

        repeat = true;

        sandpile[i][j] -= toppleValue;
        // UP
        sandpile[i - 1][j] += toppleValue / 4;
        // Down
        sandpile[i + 1][j] += toppleValue / 4;
        // Left
        sandpile[i][j - 1] += toppleValue / 4;
        // Right
        sandpile[i][j + 1] += toppleValue / 4;
        // break outloop;
      }
    }
  }
  if (repeat) {
    topple();
  }
}