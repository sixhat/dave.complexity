// David Sousa-Rodrigues
// A set of utilities for working with P5.js

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
  clear(){
    this.clearHorizontal();
    this.clearVertical();
    this.clearRectangles();
    this.color = color("#FF00FFAA");
  }
  clearHorizontal(){
    this.horizontal = [];
  }
  clearVertical(){
    this.vertical = [];
  }
  clearRectangles(){
    this.rectangles = [];
  }
}

// Class with perceptual color manipulation
// A couple of functions are from https://programmingdesignsystems.com/color/perceptually-uniform-color-spaces/index.html#perceptually-uniform-color-spaces-e7zMSWy
class Dave {
  // Short version of functions bellow.
  constructor(){
    this.grid=new Grid();
    this.g = this.grid;
  }
  // alias for fillHsluv
  f(h, s, l) {
    this.fillHsluv(h,s,l);
  }
  // alias for strokeHsluv
  s(h, s, l) {
    this.strokeHsluv(h,s,l);
  }
  // sets fill according to hsluv parameters
  fillHsluv(h, s, l) {
    let rgb = hsluv.hsluvToRgb([h, s, l]);
    fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
  }
  // sets stroke according to hsluv parameters
  strokeHsluv(h, s, l) {
    let rgb = hsluv.hsluvToRgb([h, s, l]);
    stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
  }
}



// Implements an L-System
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

// The Turtle class implements the basic methods of Turtle graphics from the logo languages.
class Turtle{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.penDown = false;
    this.penColor = 0;
    this.penWeight = 1;
    this.heading = -HALF_PI;
    this.stack = [];
  }

  // Pushes the current state of turtle to stack.
  push(){
    this.stack.push({
      'x': this.x,
      'y': this.y,
      'penDown':this.penDown,
      'penColor':this.penColor,
      'penWeight':this.penWeight,
      'heading':this.heading
    });
  }
  // Reverts to previous saved state of the turtle removing it from the stack.
  pop(){
    const el = this.stack.pop();
    this.x = el.x;
    this.y = el.y;
    this.penDown = el.penDown;
    this.penColor = el.penColor;
    this.penWeight = el.penWeight;
    this.heading = el.heading;
  }

  // Alias to color
  cl(c){this.color(c);}
  color(c){
    this.penColor = c;
  }

  // Alias to up
  pu(){this.up();}
  up(){
    this.penDown=false;
  }

  // Alias to down
  pd(){this.down();}
  down(){
    this.penDown= true;
  }

  // Alias to right
  rt(r){this.right(r);}
  right(rot){
    this.heading+=radians(rot);
  }

  // Alias to left
  lt(l){this.left(l);}
  left(rot){
    this.heading-=radians(rot);
  }

  // Set turtle position in coordinate system
  pos(x,y){
    this.x = x;
    this.y = y;
  }
  // Alias to forward
  fw(s){this.forward(s);}
  forward(steps){
    const tx = this.x+steps*cos(this.heading);
    const ty = this.y+steps*sin(this.heading);

    if (this.penDown){
      push();
      stroke(this.penColor);
      strokeWeight(this.penWeight);
      line(this.x, this.y, tx, ty);
      pop();
    }
    this.x = tx;
    this.y = ty;
  }
  // Alias to backward
  bk(s){this.backward(s);}
  backward(steps){
    const ps = this.penDown;
    this.penDown = false;
    this.forward(-steps);
    this.penDown = ps;
  }
  st(s){this.style(s);} // Alias
  style(weight) {
    this.penWeight = weight;
  }
  // Set heading of turtle East=0, CW
  hd(h){this.heading=radians(h)};
}
