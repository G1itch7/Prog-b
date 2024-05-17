let player
let colors
let circles = []
let lives = 10
let globalInterval
let point = 0
let level = 1
let tryAgain
let sound1
let sound2
/* to do list
Lav slowdown button
*/

function preload(){
  sound1 = new Audio('assets/pop.mp3')
  sound2 = new Audio('assets/bloop.mp3')
}

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

  globalInterval = setInterval(createCircle, interval)
}

function draw(){
  background(50)
  //fjerner cursoren over player cirklen
  noCursor()
  //opdatere player cirklens position
  player.x = mouseX
  player.y = mouseY
 
  for(let i=0; i < circles.length; i++){
    //hvis en cirkel bliver for lille fjernes den og du mister et liv
    if(circles[i].dia <0){
      circles.splice(i,1)
      lives -= 1
    }
    //kører hver eneste cirkels funktioner
    circles[i].show()
    circles[i].big() 
  }
  //viser player
  player.show()
  player.showInner()

  intervalCreator()

  //viser UI'en
  scoreBoard()

  //Hvis du har 0 eller under liv så dør du
  if(lives <= 0){
    gameOver()
  }
}

//Scoreboard så jeg nemmere kan lave UI'en
function scoreBoard(){
  textSize(32)
  textAlign(LEFT)
  fill('cornflowerblue')
  text('Level: ' + level,20,40)
  fill('tomato')
  text('Points: ' + point,20,80)
  fill('limegreen')
  text('Lives: ' + lives,20,120)
  if(level == 1){
    textSize(40)
    textAlign(CENTER)
    fill('ForestGreen')
    text('Brug venstreklik, x eller z til at fjerne cirklerne.',width/2,100)
  }
}

//interval ting
let interval = 1000
function intervalCreator(){
//når 15 sekunder er gået vil intervallet af createCircle forkortes, du stiger i level og spillet bliver sværre
 if(frameCount % 600==0){ 
  //fjerner oprindelige interval for at undgå overlap
  clearInterval(globalInterval)
  interval -= interval/10
  growSpeed += growSpeed/25
  level += 1
  globalInterval = setInterval(createCircle, interval)
 }
}

let growSpeed = 1
let maxGrow = 100
function createCircle(){
 let circle = {
  //ramme for hvor de kan spawne
  x: random(200,width-200),
  y: random(200,height-200),
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

//tjekker om musen er over en cirkel
function within(cirk){
  let cLeft = cirk.x - cirk.dia / 2
  let cRight = cirk.x + cirk.dia / 2
  let cTop = cirk.y - cirk.dia / 2
  let cBottom = cirk.y + cirk.dia / 2

  let mouseLeft = player.x - player.d1 / 4
  let mouseRight = player.x + player.d1 / 4
  let mouseTop = player.y - player.d1 / 4
  let mouseBottom = player.y + player.d1 / 4

  //udelukkelses metode
  let overlap = true
  if(
    //hvis bare en af de her ting er rigtige er der intet overlap
    //Player er til venstre for cirkel
    mouseRight < cLeft ||
    //Player er under cirkel
    mouseBottom < cTop ||
    //Player er under cirkel
    mouseTop > cBottom ||
    //Player er til højre for cirkel
    mouseLeft > cRight
  ){
     overlap = false 
  }
  //returner om der er overlap
  return overlap
}

function gameOver(){
  //laver en masse til at dække over spillet
  background(50)
  //giver dig din cursor tilbage
  cursor(ARROW)
  textAlign(CENTER)
  textSize(50)
  fill('Limegreen')
  text('You died',width/2,height/5)
  textSize(40)
  fill('cornflowerblue')
  text('Level: ' + level,width/2,height/3)
  fill('tomato')
  text('Points: ' + point,width/2,height/2.5)
  tryAgain = createButton('Try again')
  tryAgain.style('color','white')
  tryAgain.position(width/2 - tryAgain.width/2, height/2 + 100)
  tryAgain.mousePressed(refresh)
  //stopper draw med at køre
  noLoop()
}

function refresh(){
  //refresher siden da det er hurtigst
  window.location.reload()
}

//Kører "within" funktionen når der klikkes på x eller z 
function keyPressed(){
  if(key == "z" || key == "x"){
    for(i=0;i <circles.length;i++){
      //hvis musen er over en cirkel og der trykkes vil cirklen fjernes
      let theCirk = circles[i]
      if(within(theCirk)){
        circles.splice(i,1)
        point += 1
        //restarter lyd så man kan spamme den
        sound1.load()
        //spiller min lyd
        sound1.play() 
        return
      }
    }
     //Den her del bliver sat ude af loopet, siden hvis man klikker en cirkel der ikke er først i arrayet, vil den spille begge lyde på samme tid.
     //restarter lyd så man kan spamme den
     sound2.load()
     //spiller min lyd
     sound2.play()
  }
}

//det samme som over, bare med musen
function mousePressed(){
  for(i=0;i <circles.length;i++){
    //hvis musen er over en cirkel og der trykkes vil cirklen fjernes
    let theCirk = circles[i]
    if(within(theCirk)){
      circles.splice(i,1)
      point += 1
      //restarter lyd så man kan spamme den
      sound1.load() 
      //spiller min lyd
      sound1.play()
      return
    }
  }
   //Den her del bliver sat ude af loopet, siden hvis man klikker en cirkel der ikke er først i arrayet, vil den spille begge lyde på samme tid.
   //restarter lyd så man kan spamme den
   sound2.load()
   //spiller min lyd
   sound2.play()
}