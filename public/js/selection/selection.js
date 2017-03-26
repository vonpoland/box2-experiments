import eventbus from 'eventbus';
import {updateSelection, showSelection} from './helpers';

class Selection {
    constructor(element) {
        element.style.position = 'absolute';
        element.style.left = 0;
        element.style.top = 0;
        element.style.zIndex = -1;

        this.element = element;

        eventbus.on(eventbus.EVENTS.SELECTION.SHAPE_SELECTED, this.onShapeSelected.bind(this));
        eventbus.on(eventbus.EVENTS.SELECTION.SHAPE_MOVED, this.onSelectionChange.bind(this));
        eventbus.on(eventbus.EVENTS.SELECTION.SHAPE_DESELECTED, this.onEndSelection.bind(this));
    }

    onEndSelection (event) {
        var childLength = this.element.childNodes.length;

        for(var i = 0; i < childLength; i++) {
            let child = this.element.childNodes[i];
            let isMouseEvent = typeof event.identifier === 'undefined';

            if(isMouseEvent || parseInt(child.getAttribute('identifier')) === event.identifier) {
                this.element.removeChild(child);
            }
        }
    }

    show() {
        showSelection(this.content);
    }

    onShapeSelected(event) {
        showSelection(event.target, this.element, event.identifier);
    }
    onSelectionChange(event) {
        var childLength = this.element.childNodes.length;
        var selected = null;

        for(var i = 0; i < childLength; i++) {
            let child = this.element.childNodes[i];
            let isMouseEvent = typeof event.identifier === 'undefined';
            console.info(event.identifier);
            if(isMouseEvent || parseInt(child.getAttribute('identifier')) === event.identifier) {
                selected = child;
                break;
            }
        }

        updateSelection(event.target, selected, event.identifier);
    }
}

export default Selection;