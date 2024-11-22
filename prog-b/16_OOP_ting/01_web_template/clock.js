class Clock{
    //constructor er klassens "setup" funktion, som kaldes når vi opretter nye objekter med klassen
    //kaldes polymorfi når den skifte form baseret på argumenterne, eller bare generelt
    constructor(div, style){
        this.div = div
        this.style = style
        //divs for hours, minutes and seconds 
        this.hDiv = createDiv()     
        this.mDiv = createDiv()
        this.sDiv = createDiv()
        this.div.child(this.hDiv)
        this.div.child(this.mDiv)
        this.div.child(this.sDiv)
        //interval til at sætte tiden ind.
        this.interval
        //style
        this.div.style('width','16rem')
        this.div.style('height','5rem')
        this.div.style('border','4px dotted gray')
        this.div.style('display','grid')
        this.div.style('place-items','center')
        this.div.style('padding','1rem')
        this.div.style('border-radius','2rem')
        switch(style){
            case "pink": this.div.style('background','hotpink')
                return
            case "black": 
                this.div.style('background','black')
                this.div.style('color','white')
                return
        }
    }
    start(){
        this.interval = setInterval(()=>{
            this.hDiv.html(hour() < 10 ? '0' + hour() : hour())
            this.mDiv.html(minute() < 10 ? '0' + minute() : minute())
            this.sDiv.html(second() < 10 ? '0' + second() : second())
        },1000)
    }
    stop(){
        //holy fucking shit the thing stopped
        clearInterval(this.interval)
    }
}