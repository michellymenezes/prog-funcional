var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var tests_script = path.join(__dirname, 'test.js');

var files = fs.readdirSync(__dirname).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';
});

files.forEach(function () {
    // create quiet mocha instance
    var mocha = new Mocha({ reporter: function () {} }) // no logs

    // add test script to mocha instance
    mocha.addFile(tests_script);
    mocha.run()
        .on('pass', function(test) {
            process.stdout.write(".");
        })
        .on('fail', function(test, err) {
            process.stdout.write("f");
        })
        .on('end', function(test, err) {
            process.stdout.write("\n");
        });
});
