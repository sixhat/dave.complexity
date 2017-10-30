var dave;
function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('p5-canvas-holder');
  canvas.mouseClicked(restartModel);
  restartModel();

  dave =  new Dave();

  dave.f(45,50,50);

  rect(5,5,100,100);

  dave.g.horizontal.push(45,34,100);
  dave.g.show();
}

function restartModel(){
  pixelDensity(1);
  background(100);
}

function draw() {
  // background(0);

}
