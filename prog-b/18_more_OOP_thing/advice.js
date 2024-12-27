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
                    let slipDiv = createDiv('Slip: '+ data.slip.id)
                    let adviceDiv = createDiv(data.slip.advice)
                    
            }
        )
        //laver en div til at separere hvert advice
        this.newDiv = createDiv('')
        this.containerDiv.child(this.newDiv)
        this.newDiv.child(this.slipDiv)
        this.newDiv.child(this.adviceDiv)
        
    }
}