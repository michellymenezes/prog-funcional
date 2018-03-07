// módulos node
const assert = require('assert');
const fs = require('fs');

process.on('uncaughtException', function (e) {
    console.log(e);
});

// arquivo a testar é incluído como string... 
var cut = process.argv[process.argv.length - 1];

const original = fs.readFileSync(cut, 'utf8');
const linhas = original.split(/\r?\n/);
const uteis = linhas.map(l => l.replace(/# .*: .*$|####$/, ''));
const code = uteis.join('\n');
eval(code);

describe('busca e filtra recursos rest', function (){

    it('a função recebe url e retorna uma Promise', function () {
        var p = busca_e_filtra('http://www.dsc.ufcg.edu.br/~dalton/prog3')
                .catch(() => {});

        assert(p instanceof Promise);
    });

    it('filtra valores entre 12 e 16', function () {
        var p = busca_e_filtra('http://www.dsc.ufcg.edu.br/~dalton/prog3/caso1');

        return p.then(function (dados) {
            assert.deepEqual(dados, [16, 12, 14, 16, 15]);
        });
    });

    it('filtra valores entre 5 e 16', function () {
        var p = busca_e_filtra('http://www.dsc.ufcg.edu.br/~dalton/prog3/caso2');

        return p.then(function (dados) {
            assert.deepEqual(dados, [10, 8, 7, 11, 16, 12, 14, 5, 11, 9, 16, 15]);
        });
    });

    it('filtra valores entre 16 e 30', function () {
        var p = busca_e_filtra('http://www.dsc.ufcg.edu.br/~dalton/prog3/caso3');

        return p.then(function (dados) {
            assert.deepEqual(dados, [16, 18, 16]);
        });
    });

});
