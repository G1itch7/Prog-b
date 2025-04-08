//VIEW MODEL CONTROLLER 
let dataModel
let todosDiv

function setup() {
  noCanvas()
  database.collection('Presets').doc('Preset')
    .onSnapshot( (doc) => {
    console.log('Fik dette fra databasen: ', doc.data() )
    dataModel = doc.data()
    })
}


