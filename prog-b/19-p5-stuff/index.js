let currentPage = 2
let pages //array med alle elementer med class = page 

let gravity = 1

//laver menuer ud fra html elementer
class menuMaker{
    constructor(){
        this.menuItems = selectAll('#menu div')
        this.itemSize = 100
        this.itemGap = 100
        this.menuBalls = []
        this.makeMenu()
    }
    makeMenu(){
        let startX = 200
        for(const menuItems of this.menuItems){
            console.log(menuItems.attribute('data-page'))
            let b = new Ball(this.itemSize,menuItems.attribute('data-page'),menuItems.html(),'red',startX)
            startX += this.itemSize + this.itemGap
            this.menuBalls.push(b)
        }

    }
    showMenu(){
        for(const menuBall of this.menuBalls){
            menuBall.show()
            menuBall.move()
            menuBall.collide()
        }
    }


}

class Ball{
    constructor(ballDiameter, ballPage, ballLink, ballColor, ballX){
        this.ballDiameter = ballDiameter
        this.ballPage = ballPage
        this.ballLink = ballLink
        this.ballColor = ballColor
        this.ballX = ballX
        this.gravity = gravity
        this.ballAir = .97
        this.ballVelocity = 0
        this.ballY = 0
        this.ballButton = createButton(this.ballLink)
        this.ballButton.size(this.ballDiameter, this.ballDiameter)
        this.ballButton.mousePressed( () => shiftPage(this.ballPage) )
    }
    show(){
        noStroke()
        fill(this.ballColor)
        ellipse(this.ballX, this.ballY, this.ballDiameter)
    }
    move(){
        //tilføjer tyngdekraft
        this.ballVelocity += this.gravity
        this.ballVelocity *= this.ballAir
        this.ballY += this.ballVelocity
        this.ballButton.position(this.ballX, this.ballY) 
    }
    collide(){
        if(this.ballY >= height - this.ballDiameter){
            this.ballVelocity = -this.ballVelocity
            this.ballY = height - this.ballDiameter
        }    
    }
}

let menu

function setup(){    
    console.log('P5.js er loaded')
    pages = selectAll('.page')
    //nu kan man se at pages er blevet til en liste med alle class = page ting
    console.log(pages.length)

    ellipseMode(CORNER)
    createCanvas(windowWidth, windowHeight)

    menu = new menuMaker()
}

function draw(){
    clear()
    //clear tegner et transparent canvas hver frame 
    menu.showMenu()
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
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}

