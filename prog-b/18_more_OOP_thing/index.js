console.log('cheese 2')


function setup(){
    noCanvas()
}

function bringAdvice(){
    new Advice('https://api.adviceslip.com/advice',select('#container'))
}