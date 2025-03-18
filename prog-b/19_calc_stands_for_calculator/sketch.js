let runningTotal = 0
let buffer ="0";
let previousOperator;

const screen = document.querySelector('.screen')

//makes numbers do number things and NaN things do the calc things.
function buttonClick(value){
  if(isNaN(value)){
    handleSymbol(value);
  } else{
    handleNumber(value);
  }
  screen.innerText = buffer;
}

//Makes the buttons do calc things
function handleSymbol(symbol){
  switch(symbol){
    case 'C': 
      buffer ='0'; 
      runningTotal = 0;
      break;
    case '=': 
      if(previousOperator === null){
        return
      }
      doMath(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal=0;
      break;
    case '←':
      if(buffer.length ===1){
        buffer ='0';
      } else{
        buffer = buffer.substring(0,buffer.length-1);
      }
      break; 
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
  }
}

//checks if the stuff you put in the calc is calcable
function handleMath(symbol){
  if(buffer === '0'){
    return;
  }

  const intBuffer = parseInt(buffer);

  if(runningTotal === 0){
    runningTotal  = intBuffer;
  } else {
    doMath(intBuffer);
  }
  previousOperator = symbol;
  buffer = '0';
}

//literally does the math
function doMath(intBuffer){
  if(previousOperator === '+'){
    runningTotal += intBuffer;
  } else if(previousOperator === '−'){
    runningTotal -= intBuffer;
  } else if(previousOperator === '×'){
    runningTotal *= intBuffer;
  } else if(previousOperator === '÷'){
  runningTotal /= intBuffer;
  }
}

//puts numbers on the calc
function handleNumber(numberString){
  if(buffer ==='0'){
    buffer = numberString;
  } else{
    buffer += numberString;
  }
}

//makes the calc work
function setup(){
  document.querySelector('.calc-buttons').
  addEventListener('click',function(event){
    buttonClick(event.target.innerText);
  })
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}