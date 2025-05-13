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
  //Forbinder til broker
  client = mqtt.connect('mqtt://mqtt-plain.nextservices.dk:9001')

  //on er en asynkron event listener som venter på besked om forbindelsen
  client.on('connect', function(svar){
    console.log(svar, 'serveren er klar til mqtt kommunikation')
  })

  client.subscribe('ControlPanel2/Response')
  
  client.on('message', function(topic, message){
    let rawMessage = message.toString();

    // Ensure the message starts and ends with curly braces, as valid JSON must be enclosed in them
    if (!rawMessage.startsWith('{') || !rawMessage.endsWith('}')) {
        throw new Error('Invalid message format');
    }

    // Replace unquoted property names with quoted ones
    // https://stackoverflow.com/questions/44562635/regular-expression-add-double-quotes-around-values-and-keys-in-javascript
    rawMessage = rawMessage.replace(/([a-zA-Z0-9]+):/g, '"$1":'); // Quote property names
    rawMessage = rawMessage.replace(/: ([a-zA-Z0-9/]+)/g, ': "$1"'); // Quote string values

    // Parse the fixed JSON string into a JavaScript object
    const response = JSON.parse(rawMessage);
    console.log('Received response from Pairing/Client:', response);
    handleInterface(response)
  })
}

//knob, toggle, button

function handleInterface(r){
  if(r.ComponentType == 'knob'){
    handleKnob(r)
  } else if (r.ComponentType == 'toggle'){
    handleToggle(r)
  } else if (r.ComponentType == 'button'){
    handleButton()
  }
} 

function handleKnob(r){
  if(r.ID == 1){
    if(r.Direction == 1){
      animateParams.lightIntensity += 1
    } else {
      animateParams.lightIntensity -= 1
    }
  }
  if(r.ID == 2){
    if(r.Direction == 1){
      animateParams.earthRotationSpeed += 1
    } else {
      animateParams.earthRotationSpeed -= 1
    }
  }
  if(r.ID == 3){
    if(r.Direction == 1){
      song.num += 1
    } else {
      song.num -= 1
    }
  }
  if(r.ID == 4){
    if(r.Direction == 1){
      color += 1
    } else {
      color -= 1
    }
  }
  if(r.ID == 5){
    if(r.Direction == 1){
      LightIntensity2 += 1
    } else {
      LightIntensity1 -= 1
    }
  }
}

function handleToggle(r){
  if(r.ID == 1){
    if(rotationDirection == 1){
      rotationDirection = 0
      return
    }
    rotationDirection = 1
  }
  if(r.ID == 2){
    if(on == 1){
      on = 0
      return
    }
    on = 1
  }
}
function handleButton(){
  savePreset()
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
  dataModel.presets.push(cheese)
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
  for (let i = 0; i < dataModel.presets.length; i++){
    savedPresets.push(dataModel.presets[i])
  }
  savedPresets.sort((a, b) => (a.name > b.name ? 1 : -1))
  console.log("Her er presets fra databasen der er lagt i et array",savedPresets)
}