const board = JXG.JSXGraph.initBoard('jxgbox', {
  boundingbox: [-5, 5, 5, -5],
  axis: true
});

const p1 = board.create('point', [-2, 3], { name: 'A' });
const p2 = board.create('point', [2, -3], { name: 'B' });
board.create('line', [p1, p2], { straightFirst: false, straightLast: false });