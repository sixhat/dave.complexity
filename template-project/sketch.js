function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('p5-canvas-holder');
  canvas.mouseClicked(restartModel);
  restartModel();
}

function restartModel(){
  pixelDensity(1);
  background(0);
}

function draw() {
  // background(0);

}
