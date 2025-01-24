let classContainer
let doorSound

function preload() {
  for( door of dataStructure)
    if(door.sound){
      door.sound = loadSound('./assets/doorSound.mp3')
    }
}

function setup() {
  //HTML containeren
  calendarContainer = select('#calendar')

  //let door = new Door(calendarContainer, "12", './assets/jul.jpg', doorSound)

  for( door of dataStructure ){
    Doorfactory.createDoor(calendarContainer, door)
  }
}