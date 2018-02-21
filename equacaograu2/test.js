// módulos node
const assert = require('assert');
const fs = require('fs');

process.on('uncaughtException', function (e) {
    console.log(e);
});

// arquivo a testar é incluído como string... 
//eval(fs.readFileSync('polinomios.js').toString());
var cut = process.argv[process.argv.length - 1];
if (!cut.endsWith('equacoes.js')) {
    cut = 'equacoes.js';
};

const original = fs.readFileSync(cut, 'utf8');
const linhas = original.split(/\r?\n/);
const uteis = linhas.map(l => l.replace(/# .*: .*$|####$/, ''));
const code = uteis.join('\n');
eval(code);

describe('eq2grau', function (){

    it('exemplo 1 do texto', function () {
        assert.deepEqual(eq2grau({a:1, b:-5, c:6}), {delta: 1.0, x1: 3.0, x2: 2.0});
    });

    it('exemplo 2 do texto', function () {
        assert.deepEqual(eq2grau({a:2, b:8, c:-24}), {delta: 256.0, x1: 2.0, x2: -6.0});
    });

    it('similar aos exemplos', function () {
        assert.deepEqual(eq2grau({a:1, b:-1, c:-30}), {delta: 121.0, x1: 6.0, x2: -5.0});
    });

    it('não produz x2 quando delta é zero', function () {
        assert.deepEqual(eq2grau({a:1, b:8, c:16}), {delta: 0.0, x1: -4.0});
    });

    it('não produz nem x1, nem x2 quando delta é negativo', function () {
        assert.deepEqual(eq2grau({a:10, b:6, c:10}), {delta: -364.0});
    });

});
