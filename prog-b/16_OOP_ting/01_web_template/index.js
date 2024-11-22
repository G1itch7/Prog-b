function setup(){
    //variablen c, er en instans af klassen clock, som får div'en #clock med i sin construct
    let c = new Clock(select('#clock'),'black')
    c.start()
}

function preload(){
    sound = new Audio('timer_beep.mp3')
}

let h, m, s, hValue, mValue, sValue
function timer(){
    clearInterval(a)
    h = document.getElementById("hours")
    m = document.getElementById("minutes")
    s = document.getElementById("seconds")
    hValue = h.value
    mValue = m.value
    sValue = s.value
}

let a
function draw(){
    if(hValue == hour() && mValue == minute() && sValue == second()){
        clearInterval(a)
        a = setInterval(()=>{
            sound.load()
            sound.play()
        },1000)   
    }
}