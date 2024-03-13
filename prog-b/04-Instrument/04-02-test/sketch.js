
function setup() {
  createCanvas(400, 400);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeAndDelay() {
  // Your asynchronous code to be executed goes here
  console.log("Executing code...");

  // Wait for 5 seconds asynchronously
  await delay(5000);

  console.log("Resuming after 5 seconds...");
}

// Call the asynchronous function
executeAndDelay();

function draw() {
  background(220);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}