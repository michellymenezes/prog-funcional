// Martha Michelly, Samir Silva

function fib(n){

  function auxFib(a, b, contador){
    if(contador === n) return b;
    return auxFib(b, a + b, contador + 1);
  }

return auxFib(0, 1, 0)
}
