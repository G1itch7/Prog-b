let classContainer

function preload() {
}

function setup() {
  //HTML containeren
  calendarContainer = select('#calendar')

  let door = new Door(calendarContainer,12,'./assets/untitled.jpg')
}