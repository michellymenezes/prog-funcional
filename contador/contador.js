var intervalo;
var state = "stopped";
function start(tempo){
  if( state == "stopped"){
    intervalo = setInterval('update()', tempo);
    state = "running"
  }
}

function stop(){
    state = "stopped"
    clearInterval(intervalo);
}
