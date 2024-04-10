let player
//bullets er en liste over bullets :sunglasses:
let bullets = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  // JSON objekt "Player" oprettes
  // w = width, h = height, s = speed
  player = {
    x:width/2,
    y:height-40,
    w:width/10,
    h:height/15,
    s:25,
    show(){
      rectMode(CENTER)
      fill(0)
      rect(this.x,this.y,this.w,this.h)
    },
    move(direction){
      // Direction er endten -1 eller 1
      // Dette rykker spilleren
      this.x += direction * this.s
      this.x = constrain(this.x, 0, width)
    },
    shoot: function(){
      //createBullet returnerer et JSON kugle
      let b= createBullet()
      //bullets er arrayet med kugler
      bullets.push(b)
    }
  }
}

function draw() {
  background(220);

  // Dette kalder move funktionen der rykker playeren
  if(keyIsDown(LEFT_ARROW)){
    player.move(-1)
  }
  else if(keyIsDown(RIGHT_ARROW)){
    player.move(1)
  }

  player.show()
  //løb alle kuglerne i bullets i gennem med et loop
  //og kald show og move funktionen på hver kugle
  for(let i=0; i < bullets.length; i++){
    bullets[i].show()
    bullets[i].move()
  }
}

function createBullet(){
  //giver et objekt med en kugle tilbage
  return{
    x: player.x,
    y: player.y,
    d: 8,
    s: 10,
    show: function(){
      fill('yellow')
      ellipse(this.x, this.y,this.d)
    },
    move: function(){
      this.y -=this.s
    }
  }
}

function keyPressed(){
  if (key == 'z'|| key =='x'||key==' '){
    //Vi kalder shoot funktionen inde i player objektet
    player.shoot()
  }
}