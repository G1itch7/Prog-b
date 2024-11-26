console.log("clock is here")

//når en klasses objekter kan opfører sig på forskellige måde baseret på argumenter i constructoren
//kaldes det polymorfi
class Clock{
    //constructor er klassens "setup" funktion, som kaldes når vi opretter nye objekter med klassen
   
    constructor(div, style){
        this.div = div
        this.style = style
        this.shape = style.shape
        this.background = style.background
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

        switch(this.shape){
            case 'circle': 
                this.div.style('height','16rem')
                this.div.style('border-radius','50%')
                break
            case 'ellipse':
                this.div.style('height','8rem')
                this.div.style('border-radius','50%')
                break
        }
        switch(this.background){
            case "pink": 
                this.div.style('background','hotpink')
                break
            case "black": 
                this.div.style('background','black')
                this.div.style('color','white')
                break
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