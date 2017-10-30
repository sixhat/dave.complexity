// A couple of functions from https://programmingdesignsystems.com/color/perceptually-uniform-color-spaces/index.html#perceptually-uniform-color-spaces-e7zMSWy
// for perceptually uniform color spaces

function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

//  A simple Grid System to place over drawings
class Grid {
  constructor(){
    this.horizontal = [];
    this.vertical = [];
    this.rectangles = [];
    this.color = color("#FF00FFAA");
  }
  show(){
    push();
    stroke(this.color);
    noFill();

    for(let y of this.horizontal){
      line(0,y,width,y);
    }
     for(let x of this.vertical){
      line(x,0,x,height);
    }

    rectMode(CORNERS);
    for(let r of this.rectangles){
      rect(r[0],r[1],r[2],r[3]);
    }
    pop();
  }
}

// A Simple LSystem Generator
//
function LSystem(system) {
  this.alphabet = system.alphabet;
  this.startString = system.axiom;
  this.endString = '';
  this.rules = system.rules;
  this.nIters = 0;
}

LSystem.prototype.processString = function (oldStr) {
  let newStr = '';
  for (let i = 0; i < oldStr.length; i++) {
    newStr += this.applyRules(oldStr[i]);
  }
  return newStr;
};

LSystem.prototype.applyRules = function (ch) {
  if (this.rules[ch]) {
    return this.rules[ch];
  } else {
    return ch;
  }
};

LSystem.prototype.iterate = function(nIters){
  for (var i = 0; i < nIters; i++) {
    this.endString = this.processString(this.startString);
    this.startString = this.endString;
  }
  this.nIters += nIters;
  return this.endString;
};
