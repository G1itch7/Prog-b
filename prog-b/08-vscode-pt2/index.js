let currentPage = 1

function setup(){

}

function shiftPage(num){
    select("page" + currentPage).removeClass(visible)
    currentPage = num
    select("page" + currentPage).addClass(visible)
}

function keyPressed(){
    console.log(key)
 shiftPage(key)
}