let colors = ["red","lightblue","purple","hotpink", "darkgreen","darkblue"]
let deleteButton

function setup() {
createCanvas(400,400)
showColors()
deleteButton = createButton('slet en farve')
deleteButton.mousepressed(deletePrompt)
}
function deletePrompt(){
  let deleteThis = prompt("vælg et tal mellem 0 og " + (colors.length - 1))
  colors.splice(deleteThis,1)
  showColors()
}

function draw() {
 
}
function showColors(){
  background(255)
  for(i=0;i<colors.length;i++){
    fill(colors[i])
    ellipse(random(width),random(height),100)
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}