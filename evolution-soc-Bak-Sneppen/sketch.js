var population = new Array(500),
  populationOrigin = new Array(500),
  die = -10,
  framesPerSecond = 20,
  speciesSize = 6,
  drawOrigin = true;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('p5-canvas-holder');
  canvas.mouseClicked(restartPopulation);
  pixelDensity(1);
  background(0);

  restartPopulation();

  sliderRange(1, 40, 1);
  gui = createGui('Bak-Sneppen', 10, 10);
  gui.addGlobals('framesPerSecond', 'speciesSize', 'drawOrigin');
}

function draw() {
  background(0);
  frameRate(framesPerSecond);
  var pop2 = population.slice();
  pop2.sort();

  die = population.indexOf(pop2[0]);

  fillHsluv(160, 40, 25);
  noStroke();

  rect(0, (1 - pop2[3]) * 500, width, 500 - (1 - pop2[3]) * 500);
  // rect(0,(1-population[die])*500, width,500-(1-population[die])*500);
  // Draw
  // 
  // 
  if (drawOrigin) {
    for (let i = population.length - 1; i >= 0; i--) {
      strokeHsluv(population[i] * 160, 80, 35);
      line(i, (1 - population[i]) * 500, i, (1 - populationOrigin[i]) * 500);
    }
  }
  for (let i = population.length - 1; i >= 0; i--) {
    fillHsluv(population[i] * 160, 100, 80);
    strokeHsluv(population[i] * 160, 80, 60);
    if (i === die) {
      stroke(255, 0, 0);
      fill(255, 0, 0);
    }
    if (i === (die + 1) % population.length || i === (die + population.length - 1) % population.length) {
      stroke(255, 255, 0);
      fill(255, 255, 0);
    }

    ellipse(i, (1 - population[i]) * 500, speciesSize);

  }

  // Update

  population[die] = random();
  population[(die + 1) % population.length] = random();
  population[(die + population.length - 1) % population.length] = random();
}

function restartPopulation() {
  for (let i = population.length - 1; i >= 0; i--) {
    population[i] = random();
    populationOrigin[i] = population[i];
  }
}