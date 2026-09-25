// Define the id of your board in BOARDID

var board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [-8, 10, 8, 0], axis: false, keepaspectratio: false });


var hSlider = board.create('slider', [[-3, 7], [-1, 7], [1, 1, 10]], { name: 'h', snapWidth: 0.1, label: { fontSize: 20 } });

var p1 = board.create('point', [-6, () => hSlider.Value()], { name: 'p1', visible: false, fixed: true });
var p2 = board.create('point', [6, () => hSlider.Value()], { name: 'p2', visible: false, fixed: true });
var l1 = board.create('line', [p1, p2]);

var l2Toggle = board.create('checkbox', [-3, 8, 'Colocar cartulina'], { checked: false , fontSize: 20 });
var l2 = board.create('segment', [p1, p2], { strokeColor: 'black', strokeWidth: 4, visible: () => l2Toggle.Value() });


var ineq = board.create('inequality', [l1], { inverse: true, fillColor: 'blue', fillOpacity: 0.1 });

var s = board.create('point', [0, 0], { name: 'fuente', size: 2, fixed: true, label: { fontSize: 20 } });



const anglesDeg = [15, 30, 35, 40, 43, 45];
var angles = [];
var ax = [];
var a = [];
var ar = [];
var at = [];
var line = [];
var ref = [];
var trans = [];

for (let i = 0; i < anglesDeg.length; i++) {
   angles[i] = anglesDeg[i] * Math.PI / 180;
   ax[i] = (() => {
      const angle = angles[i];
      return () => -Math.tan(angle) * hSlider.Value();
   })();
   a[i] = board.create('point', [
                  () => ax[i](),
                  () => hSlider.Value()
               ], { visible: false });
   ar[i] = board.create('point', [
                  () => -2 * Math.tan(angles[i]) * hSlider.Value(),
                  0.0
               ], { visible: false });
   at[i] = board.create('point', [
                  () => ax[i]() -2 * Math.tan(Math.asin(1.36*Math.sin(angles[i]))),
                  () => hSlider.Value() + 2
               ], { visible: false });
   line[i] = board.create('segment', [s, a[i]], { strokeColor: 'orange', strokeWidth: 3 });
   ref[i] = board.create('segment', [a[i], ar[i]], { strokeColor: 'orange', strokeWidth: 1 });
   trans[i] = board.create('segment', [a[i], at[i]], { strokeColor: 'orange', strokeWidth: 1, visible: () => !(l2Toggle.Value() && ax[i]() >= -6) });
}


const anglesDeg2 = [50, 55, 60, 65];
var angles2 = [];
var ax2 = [];
var a2 = [];
var ar2 = [];
var line2 = [];
var ref2 = [];

for (let i = 0; i < anglesDeg2.length; i++) {
   angles2[i] = anglesDeg2[i] * Math.PI / 180;
   ax2[i] = (() => {
      const angle = angles2[i];
      return () => -Math.tan(angle) * hSlider.Value();
   })();
   a2[i] = board.create('point', [
                  () => ax2[i](),
                  () => hSlider.Value()
               ], { visible: false });
   ar2[i] = board.create('point', [
                  () => -2 * Math.tan(angles2[i]) * hSlider.Value(),
                  0.0
               ], { visible: false });
   line2[i] = board.create('segment', [s, a2[i]], { strokeColor: 'orange', strokeWidth: 3 });
   ref2[i] = board.create('segment', [a2[i], ar2[i]], { strokeColor: 'orange', strokeWidth: 1 });
}

// var criticox = () => {-Math.tan(47.33 * Math.PI / 180) * hSlider.Value();
//    }; 
// var criticop = board.create('point', [
//                   () => criticox(),
//                   () => hSlider.Value()
//                ], { visible: false });
// var criticar2 = board.create('point', [
//                   () => -2 * Math.tan(angles2[i]) * hSlider.Value(),
//                   0.0
//                ], { visible: false });
// var lineCritico = board.create('segment', [s, criticop], { strokeColor: 'orange', strokeWidth: 3 });
// var refCritico = board.create('segment', [criticop, criticar2], { strokeColor: 'orange', strokeWidth: 1 });