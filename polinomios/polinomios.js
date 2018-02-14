function polinomios(){

    function criaP(base, exp, obj, ...resto){
      if(resto.length === 0){
        if(base !== undefined & exp !== undefined){
          obj.elem.push({ base: Math.trunc(base), exp: Math.trunc(exp)})
        }
        return obj
      }
      if(base !== undefined & exp !== undefined){
        obj.elem.push({ base: Math.trunc(base), exp: Math.trunc(exp)})
      }
      return criaP(resto[0], resto[1], obj, ...resto.slice(2))
    }

    function toString() {
      p = this;
      function aux(p, texto){
        if(p.length === 0) {
          if(texto[1] === "-") return "-" + texto.substring(3);
          return texto.substring(3);
        }
        if(p[0].base === 0) {return aux(p.slice(1), texto)}
        if(p[0].exp === 0) {return aux(p.slice(1), texto + addSignal(p[0].base, ""));}
        if(p[0].exp === 1) {return aux(p.slice(1), texto + addSignal(p[0].base, "x"));}

        return aux(p.slice(1), texto + addSignal(p[0].base, `x${p[0].exp}`));
      }
      return aux(p.elem, "");
    }

    function addSignal(n, texto){
      if(n === 1) return ` + ${texto}`
      if(n === -1) return ` - ${texto}`
      if(n > 0) return ` + ${n}${texto}`
      return ` - ${n*(-1)}${texto}`
    }

    function normal(){
      p = this;
      function aux(lista, atual){
        if(atual.length === 0) {return polinomio(...lista.reverse());}
        if(lista[(atual[0].exp*2)] === undefined){
          lista[(atual[0].exp*2)] = atual[0].exp
          lista[(atual[0].exp*2) + 1] = atual[0].base
        }else{
          lista[(atual[0].exp*2) + 1] += atual[0].base
        }
        return aux(lista, atual.slice(1))
      }
      return aux([], p.elem)
    }

    function calcula(x, base, exp, ...resto){
      function aux(total, base, exp, resto){
        if(resto.length === 0){
          if(base !== undefined & exp !== undefined){
            return total + (base * Math.pow(x, exp));
          }
          return total;
        }
        if(base !== undefined & exp !== undefined){
          return aux(total + (base * Math.pow(x, exp)), resto[0], resto[1], resto.slice(2))
        }
        return aux(total, resto[0], resto[1], resto.slice(2))
      }

      return aux(0, base, exp, resto)
    }

    function igual(p2){
      return p1.normal().toString() === p2.normal().toString();
    }

    function soma(p1, p2){

      function aux(lista, resto){
        if(resto.length === 0) return lista
        lista.push(resto[0].base)
        lista.push(resto[0].exp)
        return aux(lista, resto.slice(1))
      }

      return polinomio(...aux([], p1.elem).concat(aux([], p2.elem)));
    }

    function polinomio(base, exp, ...resto){
        polinomio.prototipo = polinomio.prototipo || {toString, normal,igual, soma};

        const novo = (x) => calcula(x, base, exp, ...resto);
        novo.elem = criaP(base, exp,{elem:[] }, ...resto).elem;
        Object.setPrototypeOf(novo, polinomio.prototipo);

        return novo;
    }
    return {polinomio}
}
