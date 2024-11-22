const cheese = {
    name: "charles",
    log (){
        console.log(this.name)
    },
    log1: () => console.log(this.name)
}

cheese.log();
cheese.log1();