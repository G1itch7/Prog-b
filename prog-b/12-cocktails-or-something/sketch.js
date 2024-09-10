fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then( function(response){
    console.log(response)
    return response.json()
  })
    .then( function(json){
      console.log(json)
      //brug data resultaterne...
    })

    