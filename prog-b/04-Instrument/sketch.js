let connection 
let sensorData
let s = 0

let time = 0
const cD = 5000

function setup() {
  createCanvas(400,400)
  connection = mqtt.connect("wss://mqtt.nextservices.dk")
  connection.on("connect", () => {
    console.log("Er nu forbundet til Next's MQTT server")    
  })
  
  
connection.subscribe('iHateLife')
connection.on("message", (topic, ms) => {
  console.log("Modtager data: " + ms + " - på emnet: " + topic) 
  sensorData = ms.toString()
  if(sensorData > 600){
    cooldown()
  }
})
}

function cooldown() {
  //grabs current time
  const currentTime = Date.now();
  //makes sure the code can't be executed if you tried to executed before cooldown
  if (currentTime - time >= cD && s <5) {

    s = s+1
    //sets the time the cooldown counts from
      time = currentTime;
  } else {
    console.log("you can't man")
}
}

//funny circle visualiser
function draw() {
  background(220);
  fill(100,90,120,100)
  ellipse(width/2,height/2,s*100)
  text(s,200,200)
}