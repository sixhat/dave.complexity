var matasize = 500,
  automata1 = new Array(matasize),
  automata2 = new Array(matasize),
  rule = 110,
  framesPerSecond = 30,
  randomizedStart = false;

function setup() {
  var canvas =createCanvas(matasize, matasize);
  canvas.parent('p5-canvas-holder');
  canvas.mouseClicked(initialize);

  pixelDensity(1);
  background(0);
  for (var i = automata2.length - 1; i >= 0; i--) {
    automata1[i] = 0;
    automata2[i] = 0;
  }
  automata1[400] = 1;

  stroke(255);

  sliderRange(1, 255, 1);
  gui = createGui("Sandpile", 10, 10);
  gui.addGlobals('framesPerSecond', 'rule', 'randomizedStart');

}

function draw() {
  frameRate(framesPerSecond);
  var ruleString = rule.toString(2)
  while (ruleString.length < 8) {
    ruleString = "0" + ruleString;
  }
  // print(ruleString);

  // background(20);

  // print(automata1);

  for (var i = 0; i < automata1.length; i++) {
    noStroke();
    fill(0);
    rect(i, frameCount % matasize, matasize, 1);
    if (automata1[i]) {
      stroke(255);
      point(i, frameCount % matasize);
    }

    var _prev = "" + automata1[(i + matasize - 1) % matasize] + automata1[i] + automata1[(i + 1) % matasize];
    // print(i,_prev);

    switch (_prev) {
    case "111":
      automata2[i] = parseInt(ruleString[0]);
      break;
    case "110":
      automata2[i] = parseInt(ruleString[1]);
      break;
    case "101":
      automata2[i] = parseInt(ruleString[2]);
      break;
    case "100":
      automata2[i] = parseInt(ruleString[3]);
      break;
    case "011":
      automata2[i] = parseInt(ruleString[4]);
      break;
    case "010":
      automata2[i] = parseInt(ruleString[5]);
      break;
    case "001":
      automata2[i] = parseInt(ruleString[6]);
      break;
    case "000":
      automata2[i] = parseInt(ruleString[7]);
      break;
    }
  }

  for (var i = automata1.length - 1; i >= 0; i--) {
    automata1[i] = automata2[i];
  }
  // if (frameCount % matasize == matasize-1){
  //   initialize();
  // }
}

function initialize() {

  if (randomizedStart) {
    for (var i = automata2.length - 1; i >= 0; i--) {
      automata1[i] = random(2) | 0;
      automata2[i] = 0;
    }
  } else {
    for (var i = automata2.length - 1; i >= 0; i--) {
      automata1[i] = 0;
      automata2[i] = 0;
    }
    automata1[400] = 1;
  }

}

