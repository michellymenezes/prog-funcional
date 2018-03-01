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

// update (mock para testes)
var count;
function update() {
    count += 1;
}

describe('', function (){

    it('update não é chamado antes de start', function () {
        //start(50);
        count = 0;
        return new Promise(function(resolve, reject) {
            setTimeout(() => {stop(); resolve()}, 500);
        }).then(function () {
            assert(true);
            assert(count === 0);
        });
    });

    it('start chama update pelo menos 5 vezes', function () {
        count = 0;
        start(50);
        return new Promise(function(resolve, reject) {
            setTimeout(() => {stop(); resolve()}, 600);
        }).then(function () {
            assert(true);
            assert(count > 10);
        });
    });

    it('start não tem efeito se invocado mais de uma vez seguida', function () {
        count = 0;
        start(100); // primeira chamada ok
        start(10);  // chamada a ser ignorada
        return new Promise(function(resolve, reject) {
            setTimeout(() => {stop(); resolve()}, 600);
        }).then(function () {
            assert(true);
            assert(count < 10);
        });
    });

    it('stop para a contagem', function () {
        var count_final;
        count = 0;
        start(30); 
        return new Promise(function(resolve, reject) {
            // deixa rodar por 300ms antes de stop()
            setTimeout(() => {
                stop();
                count_final = count;
                resolve()
            }, 300);
        }).then(function () {
            // deixa rodar por mais 300ms depois do stop()
            setTimeout(() => {
                assert.equal(count, count_final);
            }, 300);
        });
    });


});
