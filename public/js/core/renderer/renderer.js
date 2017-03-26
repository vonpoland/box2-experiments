import DragHandler from 'core/drag/dragHandler';
import {renderShape, renderContent, hasShape, updateShapeLayout} from './helpers';

class Renderer {
    constructor(element, options = {}) {
        this.width = options.width || '100%';
        this.height = options.height || '100vh';

        element.style.width = this.width;
        element.style.height = this.height;

        this.shapes = [];

        var draggable = new DragHandler(element);

        draggable.onSelect(this.onSelect.bind(this));
        draggable.onStop(this.onStop.bind(this));
        draggable.onMove(this.onMove.bind(this));

        this.content = renderContent(element);
    }

    onMove(event) {
        if(this.dragData && this.dragData.canMove) {
            updateShapeLayout(event, this.dragData.target)
        }
    }

    onSelect(event) {
        this.dragData = {
            canMove : !! hasShape(event),
            target: event.target
        }
    }

    onStop() {
        this.dragData = undefined;
    }

    add(shape) {
        this.shapes.push(shape);
    }

    renderAll() {
        this.shapes.forEach(renderShape.bind(null, this.content));
    }
}

export default Renderer;