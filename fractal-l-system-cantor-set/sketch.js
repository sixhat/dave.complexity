var cantorSet = {
  'alphabet': 'AB',
  'axiom': 'A',
  'rules': {
    'A': 'ABA',
    'B': 'BBB'
  }
}
var cantor;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('p5-canvas-holder');
  // canvas.mouseClicked(restartModel);
  restartModel();
}

function restartModel() {
  if (mouseY<120 && mouseY>100){
    loop();
    return;
  }
  pixelDensity(1);
  background(0);

  cantor = new LSystem(cantorSet);

  cantor.draw = function () {
    var size = width / cantor.startString.length;
    for (var i = 0; i < cantor.startString.length; i++) {
      switch (cantor.startString[i]) {
      case 'A':
        rect(i*size, 100+cantor.nIters*25, size, 20)
        break;
      case 'B':
        break;
      }
    }
  }
}

function draw() {
  noStroke();
  cantor.draw();
  cantor.iterate(1);
  if (frameCount >= 1) {
    noLoop();
  }
}
function mousePressed(){
  
  if (cantor.nIters>=10){
    restartModel();
  }
  loop();
}
