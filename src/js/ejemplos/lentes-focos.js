// Define the id of your board in BOARDID

var board = JXG.JSXGraph.initBoard('jxgbox', {
	boundingbox: [-6.5, 4, 7.5, -4],
	axis: false,
	keepaspectratio: false
});

const focalX = 3.8;
const lensHalfHeight = 3;
const lensMaxWidth = 0.38;
const rayColor = '#168aa0';

// Optical axis
var axisStart = board.create('point', [-6.3, 0], { visible: false, fixed: true });
var axisEnd = board.create('point', [7.2, 0], { visible: false, fixed: true });
board.create('segment', [axisStart, axisEnd], {
	strokeColor: '#777777',
	strokeWidth: 1
});

// Draw a thin biconvex lens from two sampled curved sides.
var lensVertices = [];
for (let i = 0; i <= 12; i++) {
	const y = -lensHalfHeight + (2 * lensHalfHeight * i) / 12;
	const x = lensMaxWidth * Math.sqrt(1 - (y * y) / (lensHalfHeight * lensHalfHeight));
	lensVertices.push(board.create('point', [-x, y], { visible: false, fixed: true }));
}
for (let i = 12; i >= 0; i--) {
	const y = -lensHalfHeight + (2 * lensHalfHeight * i) / 12;
	const x = lensMaxWidth * Math.sqrt(1 - (y * y) / (lensHalfHeight * lensHalfHeight));
	lensVertices.push(board.create('point', [x, y], { visible: false, fixed: true }));
}
board.create('polygon', lensVertices, {
	fillColor: '#a9d9e8',
	fillOpacity: 0.55,
	borders: {
		strokeColor: '#8bb9c7',
		strokeWidth: 1
	}
});

// Dashed centerline through the lens.
var centerTop = board.create('point', [0, 3.8], { visible: false, fixed: true });
var centerBottom = board.create('point', [0, -3.8], { visible: false, fixed: true });
board.create('segment', [centerTop, centerBottom], {
	strokeColor: '#777777',
	strokeWidth: 1,
	dash: 2
});

// Parallel rays enter the lens and converge at its focal point.
var focus = board.create('point', [focalX, 0], {
	name: 'F',
	size: 2.5,
	color: '#d43b36',
	fixed: true,
	label: { fontSize: 20, offset: [0, 16] }
});

const rayHeights = [-2, -1, 0, 1, 2];
rayHeights.forEach((y) => {
	const bend = board.create('point', [0, y], { visible: false, fixed: true });
	const start = board.create('point', [-6.3, y], { visible: false, fixed: true });
	const endX = 7.0;
	const endY = y * (focalX - endX) / focalX;
	const end = board.create('point', [endX, endY], { visible: false, fixed: true });

	board.create('segment', [start, bend], { strokeColor: rayColor, strokeWidth: 2 });
	board.create('segment', [bend, focus], { strokeColor: rayColor, strokeWidth: 2 });
	board.create('arrow', [focus, end], { strokeColor: rayColor, strokeWidth: 2 });
});

// Focal length marker and dimension line.
const dimensionY = -1.4;
var lensTickTop = board.create('point', [0, -1.15], { visible: false, fixed: true });
var lensTickBottom = board.create('point', [0, -1.65], { visible: false, fixed: true });
board.create('segment', [lensTickTop, lensTickBottom], { strokeColor: '#222222', strokeWidth: 1 });

var focusMarkerBottom = board.create('point', [focalX, -2.1], { visible: false, fixed: true });
board.create('segment', [focus, focusMarkerBottom], { strokeColor: '#222222', strokeWidth: 1 });

var dimensionLeft = board.create('point', [0.08, dimensionY], { visible: false, fixed: true });
var dimensionRight = board.create('point', [focalX - 0.08, dimensionY], { visible: false, fixed: true });
board.create('arrow', [dimensionLeft, dimensionRight], { strokeColor: '#111111', strokeWidth: 1 });
board.create('arrow', [dimensionRight, dimensionLeft], { strokeColor: '#111111', strokeWidth: 1 });
board.create('text', [focalX / 2, -1.95, 'f'], {
	fontSize: 20,
	anchorX: 'middle'
});
