let turtle;


function setup() {
  var canvas = createCanvas(innerWidth, innerHeight);
  background('lemonchiffon');
  frameRate(1);
  turtle = new Turtle();
  // turtle.pos(width / 2, height / 2);
  turtle.color(color(20,255,0));
  turtle.pd();
}

let lsystem = 'L';// Tree
// let lsystem = 'FX';// Dragon
function draw() {
  background(50);
  print(frameCount);
  if (frameCount===7){
    noLoop();
  }
  let nova = '';
  turtle.pos(width / 2, height/2);
  turtle.hd(-90);


  for (let i = 0; i < lsystem.length; i++) {
    if (lsystem[i] === 'L') {nova+='+RF-LFL-FR+';}
    if (lsystem[i] === 'R') {nova+='-LF+RFR+FL-';}
    if (lsystem[i] === 'F') {nova+='F';turtle.forward(6);}
    if (lsystem[i] === '+') {nova+='+';turtle.right(90);}
    if (lsystem[i] === '-') {nova+='-';turtle.left(90);}
  }



  // for (let i = 0; i < lsystem.length; i++) {
  //   if (lsystem[i] === 'X') {nova+='F[-X][X]F[-X]+FX';}
  //   if (lsystem[i] === 'F') {nova+='FF';turtle.forward(36/frameCount);}
  //   if (lsystem[i] === '[') {nova+='[';turtle.push();}
  //   if (lsystem[i] === ']') {nova+=']';turtle.pop();}
  //   if (lsystem[i] === '+') {nova+='+';turtle.color(color(20,255,50));turtle.right(25);}
  //   if (lsystem[i] === '-') {nova+='-';turtle.color(color(20,130,0));turtle.left(25);}
  // }


  // Dragon
  // for (let i = 0; i < lsystem.length; i++) {
  //   if (lsystem[i] === 'X') nova += 'X+YF+';
  //   if (lsystem[i] === 'Y') nova += '-FX-Y';
  //   if (lsystem[i] === 'F') turtle.forward(12);
  //   if (lsystem[i] === '+') {nova+='+';turtle.right(90);}
  //   if (lsystem[i] === '-') {nova+='-';turtle.left(90);}
  // }
  lsystem = nova;
}

function mousePressed(){
  noLoop();
}
