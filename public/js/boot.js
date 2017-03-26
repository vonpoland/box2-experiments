import Renderer from 'core/renderer/renderer';
import Rectangle from 'core/shape/rectangle';
import Circle from 'core/shape/circle';
import Selection from 'selection';

const RENDERER_ID = 'renderer';
const SELECTION_ID = 'selection';

var renderer = new Renderer(document.getElementById(RENDERER_ID));
var selection = new Selection(document.getElementById(SELECTION_ID));

renderer.add(new Rectangle({
    width: 100,
    height: 100
}));
renderer.add(new Circle({
    x: 100,
    y: 100
}));
renderer.add(new Circle({
    x: 100,
    y: 100
}));
renderer.renderAll();



