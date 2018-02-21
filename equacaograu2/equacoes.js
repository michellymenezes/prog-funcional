function eq2grau(coefs) {
  const resposta = {}

  resposta.delta = (coefs.b * coefs.b) - (4 * coefs.a * coefs.c)

  if(resposta.delta >= 0){
    resposta.x1 = (-Number(coefs.b) + Math.sqrt(resposta.delta))/(2 * coefs.a)

    if(resposta.delta > 0){
      resposta.x2 = (-Number(coefs.b) - Math.sqrt(resposta.delta))/(2 * coefs.a)
    }
  }

  return resposta
}
