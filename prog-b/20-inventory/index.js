function setup(){
    //fullscreen
    select('#title').mousePressed( ()=>{
      let fs = fullscreen()
      fullscreen(!fs)
    })
}
