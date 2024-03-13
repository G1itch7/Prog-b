let colors = ["red","lightblue","hotpink","darkgreen","grey"]
let names = ["coca-cola-manden","samba-søren","karen-lort","pizza-john"]
let objekter = []
let button, button2, button3

function setup() {
  createCanvas(400, 400);
  button = createButton('Kill one.')
  button.position(10,10)
  button.mousePressed(eliminate)
  button2 = createButton('Revive forty')
  button2.position(310,10)
  button2.mousePressed(createObjects)
  button3 = createButton('Destruction.')
  button3.position(150,10)
  button3.mousePressed(()=>objekter = [])

  rectMode(CENTER)
  textAlign(CENTER,CENTER)
  createObjects()
}

function draw() {
  background(220);
  for(i=0;i <objekter.length;i++){
    //condenser det hele// laver en reference til objektet med et simpelt navn
    let b = objekter[i]
    b.x += b.speed
    if(b.x > width){
      b.speed = -b.speed
    }
    if(b.x < 0){
      b.speed = -b.speed
    }
    fill(b.c)
    rect(b.x,b.y,b.s)
    fill(255)
    text(b.n,b.x,b.y)
  }
}

function eliminate(){
  //Hent et index på et tilfældigt objekt i arrayet
  let deleteIndex = round(random(objekter.length-1))
  //splice sletter fra en bestemt plads i arrayet
  objekter.splice(deleteIndex,1)
}

function createObjects(){
  for(i=0;i<40;i++){
    let o = {
      x: random(width),
      y: random(height),
      s: random(20,60),
      n: random(names),
      c: random(colors),
      speed: random(1,10),
    }
    objekter.push(o)
  }
  console.log(objekter)
}