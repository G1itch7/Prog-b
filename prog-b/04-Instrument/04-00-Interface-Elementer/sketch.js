let btn
let header
let h = window.innerHeight
let w = window.innerWidth
let slider, sliderLabel
let inp
let chk, chkLabel
let chkImage

function setup() {
  createCanvas(w, h);
  btn = createButton('tryk på mig')
  btn.position(20,20)
  btn.mousePressed(handleButton)
  header = createElement('h1', 'bruh')
  header.position(20,80)
  header.mousePressed(handleHeaderPressed)
  slider = createSlider(0,255,)
  slider.position(20,160)
  sliderLabel = createSpan('0')
  sliderLabel.position(250,160)
  slider.input(handleSlider)
  inp = createInput().position(20, 220)
  inp.input(handleInput)
}

function handleInput(){
  header.html(inp.value())
}

function handleSlider(){
  sliderLabel.html(slider.value())
  background(120,slider.value(),100)
}

function handleHeaderPressed(){
  header.position(random(width - 120,80))
}

function handleButton(){
  background('hotpink')
}

function draw() {
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}