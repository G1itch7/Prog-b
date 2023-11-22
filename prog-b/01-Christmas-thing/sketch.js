let x
let y

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240)
  fill(200,200,200)
  for(y = 1;y<4;y+=1){
    for(x = 1;x<9;x+=1){
    
    ellipse(windowWidth/9*x,windowHeight/4*y,random(30,50))
    }
    }
  }

function draw(){
 
  

}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}