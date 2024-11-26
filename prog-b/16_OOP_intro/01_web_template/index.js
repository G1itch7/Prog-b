function setup(){
    //variablen c, er en instans af klassen clock, som får div'en #clock med i sin construct
    //json objekt med styling parametre som det andet argument
    let style = {
        background: 'black',
        shape: 'circle'
    }
    let c = new Clock(select('#clock'), style)
    c.start()
}