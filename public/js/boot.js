import Renderer from 'core/renderer/renderer';
import Rectangle from 'core/shape/rectangle';
import Circle from 'core/shape/circle';
import ScratchCard from 'scratch/scartchcard';

import Selection from 'selection';

const RENDERER_ID = 'renderer';
const SELECTION_ID = 'selection';

//var renderer = new Renderer(document.getElementById(RENDERER_ID));
//var selection = new Selection(document.getElementById(SELECTION_ID));

var options = {
    id: 'canvas',
    brushSize: 50,
    lineJoin: 'round',
    percentRequired: 80,
    fillColor: 'rgb(100, 100, 13)'
};

var scratch = new ScratchCard(options);


scratch.addEventListener('success', function (e) {
    console.info('You can do whatever you want here!');
}, false);
// renderer.add(new Rectangle({
//     width: 100,
//     height: 100
// }));
// renderer.add(new Circle({
//     x: 100,
//     y: 100
// }));
// renderer.add(new Circle({
//     x: 100,
//     y: 100
// }));
//
// renderer.renderAll();



