//https://developers.meethue.com/develop/hue-api/

var ip = '10.78.65.185' // the hub IP address
var username = 'kgMgko5iDYljmA3ERym5GDibEkDzQTxutUSDqN36'       // fill in your Hub-given username here
let myLight = 1
let url = 'http://' + ip + '/api/' + username + '/lights/' + myLight 

let hInput, sInput, bInput
let hPercentInput, sPercentInput, bPercentInput


function setup() {
  
    hInput = createSlider(0, 65535)
    sInput = createSlider(0, 254)
    bInput = createSlider(1, 254)

    hPercentInput = createInput()
    sPercentInput = createInput()
    bPercentInput = createInput()

    hInput.mouseReleased(updateLight)
    sInput.mouseReleased(updateLight)
    bInput.mouseReleased(updateLight)

    hPercentInput.changed(updateSlider)
    sPercentInput.changed(updateSlider)
    bPercentInput.changed(updateSlider)

    select('main').child(hInput)
    select('main').child(hPercentInput)
    select('main').child(sInput)
    select('main').child(sPercentInput)
    select('main').child(bInput)
    select('main').child(bPercentInput)

    console.log('http://' + ip + '/api/' + username + '/lights/' + myLight)
    httpDo('http://' + ip + '/api/' + username + '/lights/' + myLight , 'GET', getLight)
}


/*
this function uses the response from the hub
to create a new div for the UI elements
*/

function getLight(result) {
  result=JSON.parse(result)
  console.log(result.state)

  hInput.value(result.state.hue)
  sInput.value(result.state.sat)
  bInput.value(result.state.bri)

  let hsb = HSBtoPercentage(result.state.hue,result.state.sat,result.state.bri)

  console.log(hsb)

  hPercentInput.value(hsb.hue)
  sPercentInput.value(hsb.sat)
  bPercentInput.value(hsb.bri)
}

function updateSlider(){
  let hsb = HSBfromPercentage(hPercentInput.value(), sPercentInput.value(), bPercentInput.value())
  hInput.value(hsb.hue)
  sInput.value(hsb.sat)
  bInput.value(hsb.bri)
  updateLight()
}
function updateLight(){
  let hsb = HSBtoPercentage(hInput.value(),sInput.value(),bInput.value())

  hPercentInput.value(hsb.hue)
  sPercentInput.value(hsb.sat)
  bPercentInput.value(hsb.bri)
 
  let body = {
    "hue":float(hInput.value()),
    "sat":float(sInput.value()),
    "bri":float(bInput.value())
  }
  setLight(body, 'state')
}

/*
this function makes an HTTP PUT call to change
the properties of the lights
*/
function setLight(data, command) {
  var path = url + '/' + command 		  // assemble the full URL
  console.log('setting ' + path)
  var content = JSON.stringify(data)				        // convert JSON obj to string
  httpDo( path, 'PUT', content, 'text', setLightsCallback)  //HTTP PUT the change
}

function setLightsCallback(response){
  console.log(response)
}

function HSBfromPercentage(_h,_s,_b) {
  let h=int(map(_h,0,100,0,65535))
  let s=int(map(_s,0,100,0,254))
  let b=int(map(_b,0,100,1,254))

  return{hue:h,sat:s,bri:b}
}

function HSBtoPercentage(_h,_s,_b) {
  let h=int(map(_h,0,65535,0,100))
  let s=int(map(_s,0,254,0,100))
  let b=int(map(_b,1,254,0,100))
  return{hue:h,sat:s,bri:b}

}
