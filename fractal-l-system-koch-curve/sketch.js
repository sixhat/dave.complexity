var koch;
var turnAngle = 60;
var kochSystem = {
  'alphabet' :{
    'variables' : ['F','B','-','+'],
    'constants' : []
  },
  'axiom': 'F',
  'rules': {
    'F': 'F-F++F-F'
  }
};

function setup() {
  var canvas = createCanvas(500, 500);

  canvas.parent('p5-canvas-holder');
  canvas.mouseClicked(restartModel);

  pixelDensity(1);
  angleMode(DEGREES);

  restartModel();

  sliderRange(1, 100, 1);
  gui = createGui('Koch Curve and Derivates', 10, 10);
  gui.addGlobals('turnAngle');
}

function restartModel() {
  background(0);

  if (mouseX > width / 2) {
    loop();
    return;
  }

  koch = new Lsystem(kochSystem);
  koch.x = 0;
  koch.y = 0.7*height;
  koch.angle = 0;
  koch.size = width / koch.startString.length;

  koch.drawForward = function () {
    push();
    stroke(255);
    dx = koch.x + koch.size * cos(koch.angle);
    dy = koch.y + koch.size * sin(koch.angle);

    line(koch.x, koch.y, dx, dy);

    koch.x = dx;
    koch.y = dy;
    pop();
  };
  koch.angleRight = function (_ang) {
    koch.angle += -_ang;
  };
  if (frameCount > 1) loop();
}

function draw() {
  background(0);
  // Draw 

  for (let i = 0; i < koch.startString.length; i++) {
    switch (koch.startString[i]) {
    case 'F':
      koch.drawForward(koch.size);
      break;
    case 'B':
      koch.drawForward(-koch.size);
      break;
    case '-':
      koch.angleRight(turnAngle);
      break;
    case '+':
      koch.angleRight(-turnAngle);
      break;
    }
  }
  // Update
  koch.iterate(1);

  koch.x = 0;
  koch.y = 0.7*height;
  koch.angle = 0;
  koch.size = koch.size / (1 + cos(turnAngle))/2;

  // print(koch);
  noFill();
  stroke(100);
  ellipse(0, 500, 150);
  ellipse(500, 500, 150);
  fill(100);

  text('Reset', 10, height - 10);
  text('Iterate', width - 50, height - 10);
  text('Iteration ' + (koch.nIters - 1), width / 2 - 25, height * .8);
  if (koch.nIters == 8) {
    alert('More iterations will slow down the L-System.\n\n Please consider resetting the simulation');
  }
  noLoop();
}