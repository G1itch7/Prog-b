let a = {
  s: 23,
  g: 22,
  strat: 12
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

  function keyPressed(){
    if(key == ' '){
      console.log(a.strat)
    }
  }
