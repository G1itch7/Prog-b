let player
let colors
let circles = []

let globalInterval

/* to do list
Lav cirkler
Lav slowdown button
Lav trail
Find lyde
add level indicator
*/

function setup(){
  createCanvas(windowWidth, windowHeight);
//gør at kanterne af cirklerne ikke ser dumme ud.
  strokeWeight(0.2)
//Laver en farve mappe for mig selv
  colors = {
    c1: color("#aad8ff"),
    c2: color("#f0f0f0"),
    c3: color("#80808080")
  }
//Laver musen
  player = {
    //position placeholder
    x: 0,
    y: 0,
    //størrelsen på cirkler
    d1: 30,
    d2: 22,
    //funktioner der laver cirklerne på musen
    show: function (){
      fill(colors.c1)
      ellipse(this.x,this.y,this.d1)
    },
    showInner: function (){
      fill(colors.c2)
      ellipse(this.x,this.y,this.d2)
    }
  }

  globalInterval = setInterval(createCircle, 1000)
}

function draw(){
  background(50)
  //fjerner cursoren over player cirklen
  noCursor()
  //opdatere player cirklens position
  player.x = mouseX
  player.y = mouseY
  //viser cirklerne
  player.show()
  player.showInner()
}

let interval = 2000
//interval ting
function intervalCreator(){
 if(frameCount % 1800==0){
  clearInterval(globalInterval)
  globalInterval = setInterval(createCircle, interval/4)
 }
}

function createCircle(){
 let circle = {
  x: random(20,windowWidth-20),
  y: random(20,windowHeight-20),
  w: 100,

 }
}