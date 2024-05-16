let player
let colors
let circles = []
let lives = 1
let globalInterval

/* to do list
Lav slowdown button
Lav trail
Find lyde
add level indicator
add timer
start menu
difficulty slider
*/

function setup(){
  createCanvas(windowWidth, windowHeight);

//Laver en farve mappe for mig selv
  colors = {
    c1: color("#aad8ff"),
    c2: color("#f0f0f0"),
    c3: color("#80808080"),
    c4: color("#90909090"),
    c5: color("#e0e0e0e0")
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
      //gør at kanterne af cirklerne ikke ser dumme ud.
      stroke(0)
      strokeWeight(0.2)
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

  for(let i=0; i < circles.length; i++){
    //hvis en cirkel bliver for lille fjernes den
    if(circles[i].dia <0){
    circles.splice(i,1)
    lives -= 1
  }
    //køre hver eneste cirkels funktioner
    circles[i].show()
    circles[i].big()
  }

  //viser player
  player.show()
  player.showInner()
}

let interval = 2000
//interval ting
function intervalCreator(){
 if(frameCount % 1800==0){ 
  clearInterval(globalInterval)
  interval -= interval/4
  globalInterval = setInterval(createCircle, interval)
 }
}

let growSpeed = 1
let maxGrow = 100
function createCircle(){
 let circle = {
  x: random(100,windowWidth-100),
  y: random(100,windowHeight-100),
  dia: 1,
  max: false,
  show: function (){
    //laver cirklerne
    stroke(colors.c5)
    strokeWeight(5)
    fill(colors.c4)
    ellipse(this.x,this.y,this.dia)
  },
  big: function (){
    if(!this.max){
      //for cirklerne til at gro
      this.dia += growSpeed
      //hvis cirklen er større end maxGrow vil if statementet gå til else
      if(this.dia > maxGrow){
        this.max = true
      }
    } else {
      this.dia -= growSpeed
    }
  }
 }
 circles.push(circle)
}