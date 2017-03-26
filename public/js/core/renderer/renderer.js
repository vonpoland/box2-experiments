import DragHandler from 'core/drag/dragHandler';
import {renderShape, renderContent, hasShape, updateShapeLayout} from './helpers';
import eventbus from 'eventbus';

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

    onMove(event, isTouch) {
        if(this.dragData && this.dragData.canMove) {
            updateShapeLayout(event, isTouch ? event.target : this.dragData.target);
            eventbus.trigger(eventbus.EVENTS.SELECTION.SHAPE_MOVED, isTouch ? event : this.dragData);
        }
    }

    onSelect(event) {
        //eventbus.trigger(eventbus.EVENTS.SELECTION.SHAPE_DESELECTED, event);
        var selected = !! hasShape(event);

        if(selected) {
            this.dragData = {
                canMove: selected,
                target: event.target
            };

            eventbus.trigger(eventbus.EVENTS.SELECTION.SHAPE_SELECTED, event);
        }
    }

    onStop(event) {
        eventbus.trigger(eventbus.EVENTS.SELECTION.SHAPE_DESELECTED, event);
        this.dragData && (this.dragData.canMove = false);
    }

    add(shape) {
        this.shapes.push(shape);
    }

    renderAll() {
        this.shapes.forEach(renderShape.bind(null, this.content));
    }
}

export default Renderer;