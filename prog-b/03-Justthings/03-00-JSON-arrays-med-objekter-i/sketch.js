let names = ["Bryan", "Tromme","Frida"]

//tomt array
let bubbles = []

//JSON objekt med 4 attributes

let bubble = {
  x: 100,
  y: 80,
  s: 40,
  n: names[1]
}
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER,CENTER)

  for(i=0; i<100; i++){
    let b = {
      x: random(width),
      y: random(height),
      s: random(12,120),
      //random tager et tilfældigt navn fra names
      n: random(names),
      c: color(random(255),random(255),random(255),random(255))
    }
    bubbles.push(b)
  }
  console.log(bubbles)
}

function draw() {
  background(220);
  //tegner shaky fella
  fill(120,80,50,100)
  //Tager fat i bubbles værdier ved dot-notation
  bubble.x += random(-1,1)
  bubble.y += random(-1,1)
  ellipse(bubble.x,bubble.y,bubble.s)
  fill(255)
  text(bubble.n,bubble.x,bubble.y)

  //løb arrayet igennem og tegn alle bubbles
  for(i=0;i<bubbles.length;i++){
    fill(bubbles[i].c)
    bubbles[i].x += random(-5,5)
    bubbles[i].y += random(-5,5)
    ellipse(bubbles[i].x,bubbles[i].y,bubbles[i].s)
    fill(255)
    text(bubbles[i].n,bubbles[i].x,bubbles[i].y)
  }
}