//VIEW MODEL CONTROLLER 
let dataModel
let client 
let savedPresets = []


function setup() {
  noCanvas()
  //loading firebase
  database.collection('reload').doc('presets')
    .onSnapshot( (doc) => {
    console.log('Fik dette fra databasen: ', doc.data() )
    dataModel = doc.data()
    getSavedPresets()
    })
  //Loading mqtt  
    //vi kan bruge mqtt.connect fordi vi har inkluderet mqtt.js i HTML filen
    client = mqtt.connect('mqtt://mqtt-plain.nextservices.dk:9001')
  
    //on er en asynkron EVENT, som kaldes når vi får en besked fra mqtt serveren 
    client.on('connect', function(svar){
      console.log(svar, 'serveren er klar til mqtt kommunikation')
    })

    //nu vil vi gerne subscribe på et emne
    client.subscribe('ESPStepper1/Motor') 
  
    //og så skal vi sætte den LISTENER op som skal modtage input fra MQTT
    client.on('message', function(emne, besked){
      //emnet kommer som en string 
      console.log(emne)
      //beskeden skal vi lige parse før vi kan læse den
      console.log(besked.toString())
      //det vi får fra m5'eren er i det her eksempel JSON format 
      let json = JSON.parse(besked.toString())
      //nu kan jeg bruge data fra JSON objektet 
      console.log(json.name, 'her er navnet fra JSON objektet')
    })
    
}

//for testing
function mousePressed(){
  sendToMotor(500,10,1,256)
  savePreset('test', 255, 0, 0, 255, 0, 0, 10, 1)
  sendToLED(255, 0, 0)
}

//sends instructions to the motor via mqtt
function sendToMotor(steps,speed,dir,microstep){
  if(speed > 10 || speed < 0){
    console.log('speed is too high')
    return
  }
  if(dir != 1 && dir != 0){
    console.log('direction is not 1 or 0')
    return
  }
  let message = {
    "Steps": steps,
    "Speed": speed,
    "Dir": dir,
    "MicroSteps": microstep
  }
  client.publish('ESPStepper1/Motor', JSON.stringify(message)) 
  console.log("sent to motor")
}

function sendToLED(ra, ga, ba){
  if(ra > 255 || ga > 255 || ba > 255){
    console.log('one RGB value is too high')
    return
  }
  let message1 = {
    "ra": ra,
    "ga": ga,
    "ba": ba
  }
  client.publish('LED', JSON.stringify(message1))
  console.log("sent to LED")
}

//A function that sends presets with rgb values of accent lighting and main lighting, and speed + rotation direction 
//of the motors to the firebase database.
function savePreset(name, r, g, b, ra, ga, ba, speed, rotate){
  let cheese = {
    "name": name,
    "r": r,
    "g": g,
    "b": b,
    "ra": ra,
    "ga": ga,
    "ba": ba,
    "speed": speed,
    "rotate": rotate
  }
  dataModel.preset.push(cheese)
  database.collection('reload').doc('presets').set(dataModel)
  .then( ()=>{
    console.log('database updated', cheese)
  })
  .catch( (error) => {
    console.log('det gik mindre godt', error)
  })
  getSavedPresets()
}

//A function that takes the presets from the database and puts them in an array alphabetically.
function getSavedPresets(){
  savedPresets = []
  for (let i = 0; i < dataModel.preset.length; i++){
    savedPresets.push(dataModel.preset[i])
  }
  savedPresets.sort((a, b) => (a.name > b.name ? 1 : -1))
  console.log("Her er presets fra databasen der er lagt i et array",savedPresets)
}