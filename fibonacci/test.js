// módulos node
const assert = require('assert');
const fs = require('fs');

process.on('uncaughtException', function (e) {
    console.log(e);
});

// arquivo a testar é incluído como string... 
//eval(fs.readFileSync('polinomios.js').toString());
var cut = process.argv[process.argv.length - 1];
//if (!cut.endsWith('fibonacci.js')) {
//    cut = process.argv[process.argv.length - 1];
//};

const original = fs.readFileSync(cut, 'utf8');
const linhas = original.split(/\r?\n/);
const uteis = linhas.map(l => l.replace(/# .*: .*$|####$/, ''));
const code = uteis.join('\n');
eval(code);

describe('fibonacci recursão de cauda', function (){

    it('exemplo simples 1', function () {
        assert.equal(fib(10), 89);
    });

    it('exemplo simples 2', function () {
        assert.equal(fib(20), 10946);
    });

    it('exemplo complexo 2: timeout pra algoritmo errado', function () {
        assert.equal(fib(85), 420196140727489660);
    });

    it('exemplo complexo 1: timeout pra algoritmo errado', function () {
        assert.equal(fib(100), 573147844013817200000);
    });

});
