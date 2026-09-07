// Define the id of your board in BOARDID

var board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-5, 5, 5, -5], axis: false, keepaspectratio: true });

// var p1 = board.create('point', [0, 0], { name: 'p1', visible: false, fixed: true });
// var p2 = board.create('point', [5, 0], { name: 'p2', size: 1, fixed: true });
// var l1 = board.create('segment', [p1, p2]);

const offset = 1;

var a = board.create('point', [0.0, 0.0], { visible: false });
var b = board.create('point', [5.0, 0.0], { visible: false });
var c = board.create('point', [5.0, -5.0], { visible: false });
var d = board.create('point', [0.0, -5.0], { visible: false });

var pol = board.create('polygon', [a, b, c, d], {
    fillColor: '#0000FF',
    fillOpacity: 0.3,
    borders: {
        strokeColor: '#0000FF',
        strokeWidth: 2
    }
});


let n_2 = 1;
const n_2Min = 1, n_2Max = 3, n_2Step = 0.01;

board.create('button', [-4, 0, '+', function () {
    n_2 = Math.min(n_2Max, +(n_2 + n_2Step).toFixed(2));
    board.update();
}]);

board.create('text', [-4, -0.5, () => `n_2 = ${n_2.toFixed(2)}`], { fontSize: 20 });

board.create('button', [-4, -1, '-', function () {
    n_2 = Math.max(n_2Min, +(n_2 - n_2Step).toFixed(2));
    board.update();
}]);

// Incident ray
var r1a = board.create('point', [
               () => offset + 5 * Math.cos(60 * Math.PI / 180),
               () => 5 * Math.sin(60 * Math.PI / 180),
            ], { visible: false });
var r1b = board.create('point', [offset, 0.0], { visible: false });
// 2. Construct an invisible midpoint
const r1Mid = board.create('midpoint', [r1a, r1b], { visible: false });

var r1 = board.create('arrow', [r1a, r1Mid], { strokeColor: 'orange', strokeWidth: 4 });
var r1 = board.create('segment', [r1Mid, r1b], { strokeColor: 'orange', strokeWidth: 4 });

var t = () => Math.asin((1 / n_2) * Math.sin(30 * Math.PI / 180));

var r2by = () => -1 * offset / Math.tan(t());

var r2b = board.create('point', [
               0.0,
               () => r2by()
            ], { visible: false });

var r2 = board.create('segment', [r1b, r2b], { strokeColor: 'orange', strokeWidth: 4 });

var r3by = () => -2 * Math.tan(Math.asin(n_2 * Math.cos(t())));

var r3b = board.create('point', [
               -2.0,
               () => r2by() + r3by()
            ], { visible: false });

var r3 = board.create('segment', [r2b, r3b], { strokeColor: 'orange', strokeWidth: 4 });

var ref3b = board.create('point', [
               2.0,
               () => -2 / Math.tan(t())
            ], { visible: false });

var ref3 = board.create('segment', [r2b, ref3b], { strokeColor: 'orange', strokeWidth: 4 });


