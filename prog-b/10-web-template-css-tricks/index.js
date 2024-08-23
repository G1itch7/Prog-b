let currentPage = 1
let menuNumber = 1

let pages //array med alle elementer med class = page 
let menuItems //array med alle menupunkterne  

function setup(){
    //shift page er funktionen der tager et tal og skifter til en side
   
    pages = selectAll('.page')
    menuItems = selectAll('.menuitem')
    shiftPage(currentPage)
    //menuItems skal reagere ved at skifte side
    for( m of menuItems ){
        m.mousePressed( function(e) {
            //e.target er selve html div'en 
            console.log(e.target.id)
            //slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            //kald shiftPage some skifter side
            shiftPage(nr)
        })
    }

    //nu kan man se at pages er blevet til en liste med alle class = page ting
    console.log(pages.length)
}

function shiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }
    if(num == "ArrowRight"){
        num = currentPage + 1
    }

    if(isNaN(num) || num > pages.length || num == 0){
        return
    }

    select("#page" + currentPage).removeClass('visible')
    currentPage = num
    select("#page" + currentPage).addClass('visible')

    select("#menu" + menuNumber).removeClass('active')
    menuNumber = num
    select("#menu" + menuNumber).addClass('active')
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}