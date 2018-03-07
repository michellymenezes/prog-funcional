// módulos node
const assert = require('assert');
const fs = require('fs');

process.on('uncaughtException', function (e) {
    console.log(e);
});

// arquivo a testar é incluído como string... 
//eval(fs.readFileSync('polinomios.js').toString());
var cut = process.argv[process.argv.length - 1];
if (!cut.endsWith('solucao.js')) {
    cut = process.argv[process.argv.length - 1];
};

const original = fs.readFileSync(cut, 'utf8');
const linhas = original.split(/\r?\n/);
const uteis = linhas.map(l => l.replace(/# .*: .*$|####$/, ''));
const code = uteis.join('\n');
eval(code);

describe('fibonacci recursão de cauda', function (){

    it('único ponto válido define a média', function () {
        assert.equal(media_distancias([[3, 4]], 100), 5.0);
        assert.equal(media_distancias([[6, 8]], 100), 10.0);
    });

    it('dois pontos válidos', function () {
        assert.equal(media_distancias([[3, 4], [6, 8]], 100), 7.5);
        assert.equal(media_distancias([[4, 3], [8, 6]], 100), 7.5);
    });

    it('três pontos', function () {
        assert.equal(media_distancias([[3, 4], [6, 8], [12, 9]], 100), 10.0);
    });

    it('pontos nos quadrantes errados são descartados', function () {
        assert.equal(media_distancias([[-3, 4], [3, 4], [6, 8], [12, 9]], 100), 10.0);
        assert.equal(media_distancias([[3, 4], [3, -4], [6, 8], [12, 9]], 100), 10.0);
        assert.equal(media_distancias([[3, 4], [6, 8], [12, 9], [-3, -4]], 100), 10.0);
    });

    it('pontos distantes demais são descartados', function () {
        assert.equal(media_distancias([[300, 400], [3, 4], [6, 8], [12, 9]], 100), 10.0);
        assert.equal(media_distancias([[3, 4], [300, 400], [6, 8], [12, 9]], 100), 10.0);
        assert.equal(media_distancias([[3, 4], [6, 8], [12, 9], [300, 400]], 100), 10.0);
    });

    it('media é NaN se todos os pontos são descartados', function () {
        assert(Number.isNaN(media_distancias([[300, 400]], 10)));
    });

});
