// módulos node
const assert = require('assert');
const fs = require('fs');

// arquivo a testar é incluído como string...
eval(fs.readFileSync('polinomios.js').toString());

// importando polinomio do módulo
const pol = polinomios().polinomio;

// construção de polinomios (os comments abaixo não são a saída do toString!)
const p1 = pol(3, 2); // 3x2
const p2 = pol(5, 2, -3, 3, 10, 1, -2, 0); // 5x2 - 3x3 + 10x - 2
const p3 = pol(3, 3, 4, 1, -5, 0); // 3x3 + 4x - 5
const p4 = pol(1, 2, 2, 2); // x2 + 2x2
const p5 = pol(1, 2, -2, 2); // x2 - 2x2
const p6 = pol(0, 2, 1, 3); // x3 (mas criado a partir de 0x2 + 1x3)

describe('polinomio', function (){

    it('toString para forma textual humanizada', function () {
        assert.equal(p1.toString(), '3x2');
        assert.equal(p2.toString(), '5x2 - 3x3 + 10x - 2');
        assert.equal(p3.toString(), '3x3 + 4x - 5');
        assert.equal(p4.toString(), 'x2 + 2x2');
        assert.equal(p5.toString(), 'x2 - 2x2');
        assert.equal(p6.toString(), 'x3');
    });

    it('polinomios podem ser aplicados', function () {
        assert.equal(p1(3), 27); // 3x2 (3) = 3*3^2 == 2*9 == 27
        assert.equal(p1(4), 48);
        assert.equal(p3(4), 203);
        assert.equal(p3(p2(2)), 8283);
        assert.equal(p4(4), 48);
        assert.equal(p4(3), 27);
    });

    it('polinomios podem ser normalizados', function () {
        assert.equal(p1.normal().toString(), '3x2');
        assert.equal(p2.normal().toString(), '-3x3 + 5x2 + 10x - 2');
        assert.equal(p3.normal().toString(), '3x3 + 4x - 5');
        assert.equal(p4.normal().toString(), '3x2');
        assert.equal(p5.normal().toString(), '-x2');
        assert.equal(p6.normal().toString(), 'x3');
    });

    it('polinomios podem ser comparados uns a outros', function () {
        assert.equal(p1.igual(p1), true);
        assert.equal(p1.igual(p4), true);
    });

});
