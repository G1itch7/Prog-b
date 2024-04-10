//array med vægge/fjender
let walls = []
//playeren er et JSON objekt med funktioner til at vise, opdatere og hoppe 
let player
let scoreBoard
const startLife = 10
let life = 0

let millisecondsPlayed, timeStamp
//state er spillets tilstand - programmeret som en "stateMachine"
let state = 'splash'
let BG
let splashBG
let playerSkin

function preload(){
  BG = loadImage('https://images.squarespace-cdn.com/content/v1/551a19f8e4b0e8322a93850a/1573952967368-Y1FYKQ2QP2R4SPM9YYQA/Parallax_No_Car.gif')
  splashBG = loadImage('https://as1.ftcdn.net/v2/jpg/05/98/38/04/1000_F_598380474_ihvfq2vQXFhUhVkojAeekeh57UI0CF5j.jpg')
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight)
  player = createPlayer()
  scoreBoard = createScoreboard()
  splashScreen()
  cnv.mousePressed( () => player.jump() )
  textAlign(CENTER, CENTER) 
  textFont('Arial')
}

function draw() {
  imageMode(CORNERS)
  image(BG, 0, 0, windowWidth, windowHeight)
  
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
  scoreBoard.showTime()
  
  if(life == 0){
    gameOver()
  }
  


}

let splashTitle, startButton
function splashScreen(){
  frameRate(0)
  image(splashBG, 0, 0, windowWidth, windowHeight)

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

let lifeLabel 
let spawnWallInterval = 2500
let spawnTimer 

function startGame(){
  if(restartButton) {
    restartButton.hide()
  }
  player.y = 0
  walls = []
  life = startLife
  state = "playing"
  //tjek hvad "klokken" i spillet er lige nu  
  timeStamp = millis() 
  frameRate(60)
  splashTitle.hide()
  startButton.hide()
  //spawn nye vægge
  clearInterval(spawnTimer)
  spawnTimer = setInterval(createWall, spawnWallInterval)
}

function createScoreboard(){
  let lifeHeart = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/1125px-Love_Heart_symbol.svg.png', 'hjerte').hide()
  lifeHeart.size(60, 60)
  lifeHeart.position(width - 60, 20)
  let lifeLabel = createElement('h1', life.toString()).hide()
  lifeLabel.style('color', 'white')
  lifeLabel.style('font-size', '32px')
  lifeLabel.style('width', '40px')    
  lifeLabel.style('text-align', 'center')  
  lifeLabel.position(width - 50, 25)
  return {
    showLife(){
      if(state=='playing'){
        lifeLabel.html(life)
        lifeLabel.show()
        lifeHeart.show()
      }else{
        lifeLabel.hide()
        lifeHeart.hide()
      }
      if(state=='gameOver'){
        textSize(40)
        text('Din tid ', width/2, height/2)
        textSize(60)
        text(millisecondsPlayed, width/2, height/2 + 60)
        
      }
    }, 
    showTime(){
      if(state=='playing'){
        fill('green')
        textSize(32)
        let t = millis() - timeStamp
        t = t/1000
        t = round(t, 2)
        text( t, 40, 40)
      }
    }  
  }
}

let goTitle, restartButton, resultLabel
function gameOver(){
  //tjek hvad "klokken" er nu og træk timeStamp fra
  //så har du hvor længe runden har varet
  let t = millis() - timeStamp
  t = t/1000
  millisecondsPlayed = round(t, 2)

  state = "gameOver"
  frameRate(0)
  background('lightblue')
  imageMode(CORNERS)

  image(BG, 0, 0, windowWidth, windowHeight)

  scoreBoard.showLife()
  
  restartButton = createButton('new game')
  restartButton.position(width/2 - restartButton.width/2, height/2 + 100)
  restartButton.style('background-color', 'hotpink')
  restartButton.mousePressed(startGame)
  
}


//safeSpace er rummet mellem søjler
const safeSpace = 250
const minHeight = 50
let wallSpeed = 2

function createWall(){
  //wall er et json objekt som blivder til en ny væg
  let wall = {
    x: width, 
    h: random(minHeight, height - (safeSpace + minHeight)),
    w: 40, 
    hit: false,
    col: color(64, 224, 208),
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
        let wallLeft = this.x
        let wallRight = this.x + this.w
        let wallTop = this.h
        let wallBottom = this.h + safeSpace
        let playerTop = player.y - player.size/2
        let playerBottom = player.y + player.size/2
        let playerRight = player.x + player.size/2
        let playerLeft = player.x - player.size/2
        if(playerRight > wallLeft && playerLeft < wallRight){
          if(playerTop < wallTop || playerBottom > wallBottom){
              //væg ramt    
              this.col = color(255, 0, 0)
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
    jumpSpeed: 15,
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
      this.velocity = -this.jumpSpeed
    }
  }
}

function keyPressed(){
  if(key == ' '){
    player.jump()
  }
}

