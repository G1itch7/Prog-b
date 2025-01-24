console.log('cheese')

class Advice {
    constructor(apiURL,containerDiv){
        this.containerDiv = containerDiv
        this.apiURL = apiURL
        this.fetchData()
    }

    //fetcher data
    fetchData(){
        fetch('https://api.adviceslip.com/advice')
        .then(
            function(response){
                console.log(response)
                return response.json()
            }
        )
        .then(
            function(data){
                console.log(data.slip.advice)
                //laver div til advice data
                    let newDiv = createDiv()
                    let slipDiv = createElement('p', 'Slip: '+ data.slip.id)
                    let adviceDiv = createElement('h4', data.slip.advice)
                    //sætter advice id og advice ind i et div
                    newDiv.child(slipDiv)
                    newDiv.child(adviceDiv)
                    newDiv.class('advice')
                    //sætter det newDiv ind i container div'en
                    select('#container').child(newDiv)
            }
        )
    }
}