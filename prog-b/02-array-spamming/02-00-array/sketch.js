
let numbers = [1,2,14,3,23,5,453,456,65,78,65,7,978,769,6,5,43,321,324,43]

function setup() {
  background(220);
  createCanvas(400, 400);
   
  for(i = 0 ; i < numbers.length; i++){
  console.log(numbers[i])
  fill(255,7)
  ellipse(random(width),random(height),numbers[i])
      }
}

function draw() {
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}