let names = []
let nameButton
let deleteButton
function setup() {
  createCanvas(400, 400);
  nameButton = createButton('prompt a name')
  nameButton.mousePressed(addName)
  deleteButton = createButton('slet et navn')
  deleteButton.mousePressed(deleteName)
  showNames()
}

function draw() {
  
}
function deleteName(){
  if(names.length > 0){
    //pop fjerner det sidste element fra et array
    names.pop()
    showNames()
  } else{
    confirm('der er ikke flere navne')
  }
}

function addName(){
  console.log('adding a name')
  named = prompt();
  names.push(named)
  showNames()
}

function showNames(){
  background(100)
  for(i=0;i<names.length;i++){
    text(names[i],random(width),random(height))
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}