// Martha Michelly, Samir Silva

function media_distancias(pontos, d){
  pontos =  pontos.filter((e)=> e[0] > 0 & e[1] > 0 )
                  .map(e => Math.sqrt((e[0]*e[0]) + (e[1] * e[1])))
                  .filter(e => e < d)

  soma = pontos.reduce((a,e) => {return a+e}, 0)
  return soma/pontos.length
}
