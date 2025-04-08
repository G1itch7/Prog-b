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
  doDaThing("ahar",23,52,123,0.6,0.2)
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