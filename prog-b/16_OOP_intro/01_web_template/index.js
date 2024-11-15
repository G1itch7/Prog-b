function setup(){
    //variablen c, er en instans af klassen clock, som får div'en #clock med i sin construct
    let c = new Clock(select('#clock'),'pink')
    c.start()
}