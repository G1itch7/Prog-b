
let names =["abungus","bruh","cake","deez","eligann","fnug"]

function setup() {
  
  fill(0)
  createCanvas(400, 400);
  fill(255)
  textFont('arial')
  textSize(44)
  textAlign(CENTER,CENTER)
  //lol
  text(names[0], width/2, height/2)
}

let count=  0

function draw() {
  background(0);
  if(frameCount % 60 == 0){
    count++
  }
  text(names[count],height/2,width/2)
  if(count == names.length){count = 0}
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}