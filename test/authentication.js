var test = require('blue-tape');
var ArcGIS = require('../dist/node/index')

console.log(ArcGIS)

test('timing test', function (t) {
    t.plan(2);

    t.equal(typeof Date.now, 'function');
    var start = Date.now();

    setTimeout(function () {
        t.equal(Date.now() - start, 100);
    }, 100);
});