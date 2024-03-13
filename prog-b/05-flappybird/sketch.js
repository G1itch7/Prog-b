let h = window.innerHeight
let w = window.innerWidth
let walls = []
let player
function setup() {
  let cnv = createCanvas(w, h);
  player = createPlayer()
  cnv.mousePressed(player.jump)
  splashScreen()
}



function draw() {
  background(220);
  for(i=0; i<walls.length;i++){
    walls[i].show()
    walls[i].move()
    }
    if(walls.length > 10){
      walls.splice(0,1)
  }
  player.show()
  player.move()
  player.bounce()
}



let splashTitle, startButton
function splashScreen(){
  frameRate(0)
  background(0)
  splashTitle = createElement('h1','Flappy-ish')
  splashTitle.style('color','white')
  splashTitle.center()
  startButton = createButton('Start Spil')
  startButton.style('color','white')
  startButton.position(width/2 -startButton.width/2,height/2+50)
  startButton.mousePressed(startGame)
}



let lifeLabel
let spawnWallInterval = 2000
let spawnTimer
function startGame(){
  frameRate(60)
  splashTitle.hide()
  startButton.hide()
  //spawn nye vægge
  spawnTimer = setInterval(createWall,spawnWallInterval)
}



let goTitle, restartButton, resultLabel
function gameOver(){

}



const minHeight = 50
const safeSpace = 150
let wallSpeed = 5
function createWall(){
  let wall = {
    x: width,
    h: random(minHeight, height - (60 + minHeight)),
    w: 40,
    show(){
      //rect fra toppen af skærmen
      fill('gray')
      rect(this.x, 0,this.w,this.h)
      rect(this.x,this.h+safeSpace,this.w, height-(this.h+safeSpace))
    },
    move(){
      this.x -=wallSpeed
    }
  }
  walls.push(wall)
}


let gravity = 1
let friction = 0.97
function createPlayer(){
  return {
    x: width/4,
    si: 40,
    y: height/2 +20,
    col: color(255,80,120),
    velocity: 0,
    jumpSpeed: 15,
    show(){
      fill(this.col)
      ellipse(this.x,this.y,this.si)
    },
    move(){
      //flytte bro
      this.velocity += gravity
      this.velocity *= friction
      this.y += this.velocity
    },
    bounce(){
      if(this.y + this.size/2 >=height){
        this.y = height - this.size/2
        this.velocity = -this.velocity
      }
    },
    jump(){
      this.velocity -= this.jumpSpeed
    }
  }
}


function keyPressed(){
  if(key == ' '){
    player.jump()
  }
}


function mousePressed(){
  player.jump()
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}