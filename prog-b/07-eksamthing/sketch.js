let point = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor()

  mouse = {
   x: 0,
   y: 0,
   dia: 20,
   show: function (){
    fill("#ffffff")
    ellipse(this.x,this.y,this.dia)
    } 
  }

  cirk = {
    x: 0,
    y: 0,
    dia: 100,
    c: "#ffffff",
    show: function (){
      fill(this.c)
      ellipse(this.x,this.y,this.dia)
    }
  }
}

function draw() {
  background(100);
  textAlign(CENTER)
  textSize(50)
  fill("limegreen")
  text(point,width/2,100)


  within(cirk)

  if(frameCount % 120 == 0){
    cirk.x = random(200, width-200)
    cirk.y = random(200, height-200)
  }
  cirk.show()

  mouse.x = mouseX
  mouse.y = mouseY
  mouse.show()

}

function within(cir){
  let cLeft = cir.x - cir.dia / 2
  let cRight = cir.x + cir.dia / 2
  let cTop = cir.y - cir.dia / 2
  let cBottom = cir.y + cir.dia / 2

  let mouseLeft = mouse.x - mouse.dia / 4
  let mouseRight = mouse.x + mouse.dia / 4
  let mouseTop = mouse.y - mouse.dia / 4
  let mouseBottom = mouse.y + mouse.dia / 4
  if(
    mouseRight < cLeft ||
    mouseBottom < cTop ||
    mouseTop > cBottom ||
    mouseLeft > cRight
  ){ 
    cirk.c = "#ffffff"
  } else {
    cirk.c = "#ff0000"
    if(frameCount % 30 == 0){
      point += 1
    }
  }
}