console.log('cheese 2')


function setup(){
    noCanvas()
    new Advice('https://api.adviceslip.com/advice',select('#container'))
    new Advice('https://api.adviceslip.com/advice',select('#container'))
    
  
}
