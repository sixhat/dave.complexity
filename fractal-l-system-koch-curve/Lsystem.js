function Lsystem(system) {
  this.alphabet = system.alphabet;
  this.startString = system.axiom;
  this.endString = '';
  this.rules = system.rules;
  this.nIters = 0;
}

Lsystem.prototype.processString = function (oldStr) {
  let newStr = '';
  for (let i = 0; i < oldStr.length; i++) {
    newStr += this.applyRules(oldStr[i]);
  }
  return newStr;
};

Lsystem.prototype.applyRules = function (ch) {
  if (this.rules[ch]) {
    return this.rules[ch];
  } else {
    return ch;
  }
};

Lsystem.prototype.iterate = function(nIters){
  for (var i = 0; i < nIters; i++) {
    this.endString = this.processString(this.startString);
    this.startString = this.endString;
  }
  this.nIters += nIters;
  return this.endString;
};
