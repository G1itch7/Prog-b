let currentPage = 2

let pages //array med alle elementer med class = page 
let menuItems //array med alle menupunkterne  

function setup(){
    setupMenuStructure()
}

function setupMenuStructure(){
    pages = selectAll('.page')
    menuItems = selectAll('.menuitem')

    //menu items skal reagere ved at skifte side
    for( m of menuItems ){
        m.mousePressed( function(e) {
            //e.target er selve html div'en 
            console.log(e.target.id)
            //slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            //nu kan vi kalde shiftPage som skifter side
            shiftPage(nr)
        })
    }

    //shiftPage er funktionen der tager et tal og skifter til en side        
    shiftPage(currentPage)
    //vent to sekunder og sæt så klassen "hidden" på headeren - så menuen bliver væk
    setTimeout(function(){
        select('header').addClass('hidden')
    }, 10000)

}

function pageOne(){
    console.log('Side 1 funktionen kaldes')

}

function pageTwo(){
    //Først beder vi fetch hente den lokale fil
    fetch('./mydata.json')

    //så venter vi på kaldets promise, der kommer tilbage med .then()
    .then(
        function(response){
            //lad os tjekke om serverens response er okay
            console.log(response)
            //og hvis det er det, beder vi serveren om at give os json resultatet 
            return response.json()
        }
    )
    //og når DET så komer tilbage 
    .then(
        function (data){
            //vi har nu en random drink
            console.log(data)
            //p5 funktion der laver en ny div
            let newDiv = createElement('div')
            //så laver vi en overskrift
            let newHeader = createElement('h1', data.Name)
            //så laver vi et p-element
            let newP = createElement('p', data.Description)
            //nu laver vi en underoverskrift
            let hairHeader = createElement('h3', 'Tidligere hårfarver')
            //nu skal jeg løbe et array igennem fra json
            let hairList = createElement('ul')
            for( color of data.formerHairColors ){
                //console.log(color)
                let listItem = createElement('li', color)
                hairList.child(listItem)
            } 
            //til sidst lægger vi de nye elementer ind i den div vi oprettede
            newDiv.child(newHeader)
            newDiv.child(newP)
            newDiv.child(hairHeader)
            newDiv.child(hairList)
            //tag fat i html elementet med id = localData
            //tøm det
            select('#localData').html('')
            //og sæt data ind i det 
            select('#localData').child(newDiv)



        }
    )
}

function pageThree(){
    //Først kalder vi server API'ets endpoint
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')

    //så venter vi på serverens promise, der kommer tilbage med .then()
    .then(
        function(response){
            //lad os tjekke om serverens response er okay
            console.log(response)
            //og hvis det er det, beder vi serveren om at give os json resultatet 
            return response.json()
        }
    )
    //og når DET så komer tilbage 
    .then(
        function (data){
            //vi har nu en random drink
            console.log(data)
        }
    )
}

function pageFour(){
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
    select("#menu" + currentPage).removeClass('active')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
    select("#menu" + currentPage).addClass('active')

    if(currentPage == 1) {
        pageOne()
    }
    if(currentPage == 2) {
        pageTwo()
    }
    if(currentPage == 3) {
        pageThree()
    }
    if(currentPage == 4) {
        pageFour()
    }
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}



