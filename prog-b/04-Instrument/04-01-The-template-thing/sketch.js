
//connection variablen bruges til at 
//forbinde til MQTT serveren 
let connection 
//info er en tekst variabel til at vise info på skærmen
let info = "String som bruges til at vise info på skærmen"
//sensorData indeholder de data vi får fra M5'eren
let sensorData = 20
let synth 
let volSlider
let dropDown

function setup() {
  //sæt info tekstboksen ind i HTML
  
  let cnv = createCanvas(400, 400)
  cnv.mousePressed(playOsc)
  synth = new p5.Oscillator('sine')

  volSlider = createSlider(0,1,0.1,0.01).position(20,20)
  volSlider.input(handleVolume)

  dropDown = createSelect().position(20,80)
  dropDown.option('sine')
  dropDown.option('square')
  dropDown.option('sawtooth')
  dropDown.option('triangle')

  dropDown.input(handleType)
  

  background(220)
  //lav en div til infoteksten
  infoDiv = createDiv(info)
  //sæt den nederst på canvas
  infoDiv.position(20, height-40)
  //Opret forbindelse til MQTT serveren (den der står i USA)
  connection = mqtt.connect("wss://mqtt.nextservices.dk")
  //Når serveren kommer tilbage til os og siger KLAR
  connection.on("connect", (m) => {
    //vis i inforteksten at der er forbindelse 
    infoDiv.html("Er nu forbundet til Next's MQTT server")    
  })

  //vi abonnerer på et emne - her "current"
  connection.subscribe('current')
  //hver gang vi får en besked på emnet "current"  
  connection.on("message", (topic, ms) => {
    infoDiv.html("Modtager data: " + ms + " - på emne: " + topic) 
  })
}

function handleVolume(){
  synth.amp(volSlider.value())
}

function handleType(){
  synth.setType(dropDown.value())
}

function draw() {
  let fre = map(mouseX,0,width,0,2200)
  synth.freq(fre)

  fill(100,80,50,50)
  stroke(255)
  let s = map(fre, 0, 2200, 0 ,width)
  for(i = 0; i<10; i++){
    ellipse(width/2, height/2, i*2+s)
  }

}

function playOsc(){
  synth.amp(0.01)
  synth.start()
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}