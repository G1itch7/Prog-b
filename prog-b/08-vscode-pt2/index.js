let currentPage = 1

function setup(){
    pages = selectAll('.page')
    console.log("der er " + pages.length + " pages")

}

function shiftPage(num){
    if(isNaN(num)|| num <=0 || num > pages.length){
        return
    }
        select("#page" + currentPage).removeClass("visible")
        currentPage = num
        select("#page" + currentPage).addClass("visible")
}

function keyPressed(){
    console.log(key)
 shiftPage(key)
}