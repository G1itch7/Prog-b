let walls = []
let player 
let scoreBoard
const startLife = 5
let life = 0
let millisecondsPlayed
let state = 'splash'

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight)
  player = createPlayer()
  splashScreen()
  scoreBoard = createScoreboard()
  cnv.mousePressed( () => player.jump() )
  if(key==" "){
    player.jump
  }
}

function draw() {
  background(220)
  
  for(i=0; i < walls.length; i++){
    walls[i].show()
    walls[i].move()
    walls[i].collide()
  }
  if(walls.length > 10 ){
    walls.splice(0, 1)
  }
  
  player.show()
  player.move()
  player.bounce()
  
  scoreBoard.showLife()
  if(life == 0){
    gameOver()
  }
}

let splashTitle, startButton
function splashScreen(){
  frameRate(0)
  background(0)
  //lav en html overskrift
  //og gør den hvid og sæt den midt på skærmen
  splashTitle = createElement('h1', 'Flappy ish')
  splashTitle.style('color', 'white')
  splashTitle.center()
  startButton = createButton('Start Spil')
  startButton.style('color', 'white')
  startButton.position(width/2 - startButton.width/2, height/2 + 50)
  startButton.mousePressed(startGame)
  
}

let spawnWallInterval = 2500
let spawnTimer 

function startGame(){
  life = startLife
  state = 'playing'
  timeStamp = millis()
  frameRate(60)
  splashTitle.hide()
  startButton.hide()
  //spawn nye vægge
  spawnTimer = setInterval(createWall, spawnWallInterval)
  
}

function createScoreboard(){
  let lifeHeart = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png','hjerte')
  lifeHeart.size(50,50)
  lifeHeart.position(width-60,20)
  let lifeLabel = createElement('h1',life.toString())
  lifeLabel.style('color','white')
  lifeLabel.style('font-size','25px')
  lifeLabel.style('text-align','center')
  lifeLabel.position(width-49,30)
  
  return {
    showLife(){
      if(state=='playing'){
        lifeLabel.html(life)
        lifeLabel.show()
        lifeHeart.show()
      } else {
        //lifeLabel.hide()
        //lifeHeart.hide()
      }
    }
  }
}

let goTitle, restartButton, resultLabel
function gameOver(){
  millisecondsPlayed = millis() - timeStamp
  background(0)
  state = 'gameOver'
  scoreBoard.showLife()
  frameRate(0)

}


//safeSpace er rummet mellem søjler
const safeSpace = 200
const minHeight = 50
let wallSpeed = 5
function createWall(){
  //wall er et json objekt som bliver til en ny væg
  let wall = {
    x: width, 
    h: random(minHeight, height - (60 + minHeight)),
    w: 40, 
    col:(150,150,150),
    show(){
      //rektangel fra toppen af skærmen
      fill(this.col)
      rect(this.x, 0, this.w, this.h)
      //tegn det andet rektangel i bunden
      rect(this.x, this.h + safeSpace, this.w, height - (this.h + safeSpace) )
    },
    move(){
      this.x -= wallSpeed
    },
    collide(){
      if(!this.hit){
      let wallLeft =this.x
      let wallRight = this.x+this.w
      let wallTop = this.h
      let wallBottom = this.h+safeSpace
      let playerTop = player.y -player.size/2
      let playerBottom = player.y+ player.size/2
      let playerRight = player.x + player.size/2
      let playerLeft = player.x - player.size/2
      if(playerRight > wallLeft && playerLeft < wallRight){
        if(playerTop < wallTop || playerBottom > wallBottom){
          this.col = color(255,0,0)
          life--
          this.hit = true
          
         }
        }
      }
    }
  }
  walls.push(wall)
}

let gravity = 0.5
let friction = 0.97

function createPlayer(){
  return {
    x: width/4, 
    size: 40, 
    y: height/2 + 20,
    col: color(255, 80, 120),
    velocity: 0,
    jumpSpeed: -10,
    show(){
      fill(this.col)
      ellipse(this.x, this.y, this.size)
    }, 
    move(){
      //her skal vi flytte playeren
      this.velocity += gravity
      this.velocity *= friction
      this.y += this.velocity
    },
    bounce(){
      if( this.y + this.size/2  >= height){
        this.y = height - this.size/2
        this.velocity = -this.velocity
      }
    },
    jump(){
      this.velocity = this.jumpSpeed
    }
  }
}

function keyPressed(){
  if(key == ' '){
    player.jump()
  }
}