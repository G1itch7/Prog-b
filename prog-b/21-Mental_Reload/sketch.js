//VIEW MODEL CONTROLLER 
let dataModel

function setup() {
  noCanvas()
  database.collection('reload').doc('presets')
    .onSnapshot( (doc) => {
    console.log('Fik dette fra databasen: ', doc.data() )
    dataModel = doc.data()
    
    })
    
    
}

function mousePressed(){
  console.log('mouse pressed')
  doDaThing()
}

let name = "chees"
let r =22
let g = 23
let b = 24
let speed = 0.1
let rotate = "fast" 

function doDaThing(name, r, g, b, speed, rotate){
  let cheese = {
    "x": 2,
    "y": 1,
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