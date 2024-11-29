let classContainer
let doorSound
let dataStructure = [
  {
    day: "1"
    
  }
]

function preload() {
}

function setup() {
  //HTML containeren
  calendarContainer = select('#calendar')

  let door = new Door(calendarContainer,12,'./assets/untitled.jpg')

  for( door of dataStructure){
    new Door(calendarContainer,door.day,door.)
  }
}