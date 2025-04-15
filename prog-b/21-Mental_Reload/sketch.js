//VIEW MODEL CONTROLLER 
let dataModel
let client 

function setup() {
  noCanvas()
  //loading firebase
  database.collection('reload').doc('presets')
    .onSnapshot( (doc) => {
    console.log('Fik dette fra databasen: ', doc.data() )
    dataModel = doc.data()
    
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

function mousePressed(){
  console.log('mouse pressed')
  doDaThing("ahar",23,52,123,0.6,0.2)
}

function sendToMotor(steps,speed,dir,microstep){
  let message = {
    "Steps": steps,
    "Speed": speed,
    "Dir": dir,
    "MicroSteps": microstep
  }
  client.publish('ESPStepper1/Motor', message) 
}



function doDaThing(name, r, g, b, speed, rotate){
  let cheese = {
    "name": name,
    "r": r,
    "g": g,
    "b": b,
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
}