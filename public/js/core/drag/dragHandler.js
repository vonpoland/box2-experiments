import EVENTS from 'core/events/events';

const ON_SELECT = 'ON_SELECT';
const ON_STOP = 'ON_STOP';
const ON_MOVE = 'ON_MOVE';

function callIfHandled(handler) {
    return event => {
        var fn = this.handlers[handler];

        if (typeof fn !== 'function') {
            return () => {
            }
        }

        this.handlers[handler](event)
    };
}
function normalizeEvents(event) {
    if (event.touches) {
        return {
            target: event.target,
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        }
    }

    return event;
}

function onMove(event, lastEvent = {x: 0, y: 0}) {
    console.info(event.x, lastEvent.x, event.x - lastEvent.x);
    return {
        dx: event.x - lastEvent.x,
        dy: event.y - lastEvent.y,
        target: event.target
    };
}

class DragHandler {
    constructor(element) {
        element.addEventListener(EVENTS.DOM.MOUSE.DOWN, callIfHandled.call(this, ON_SELECT));
        element.addEventListener(EVENTS.DOM.MOUSE.UP, callIfHandled.call(this, ON_STOP));
        element.addEventListener(EVENTS.DOM.MOUSE.MOVE, callIfHandled.call(this, ON_MOVE));
        element.addEventListener(EVENTS.DOM.TOUCH.DOWN, callIfHandled.call(this, ON_SELECT));
        element.addEventListener(EVENTS.DOM.TOUCH.UP, callIfHandled.call(this, ON_STOP));
        element.addEventListener(EVENTS.DOM.TOUCH.MOVE, callIfHandled.call(this, ON_MOVE));

        this.handlers = [];
    }

    onMove(callback) {
        this.handlers[ON_MOVE] = event => {
            event = normalizeEvents(event);
            callback(onMove(event, this.lastMousePosition));
            this.lastMousePosition = {x: event.x, y: event.y};
        };
    }

    onSelect(callback) {
        this.lastMousePosition = undefined;
        this.handlers[ON_SELECT] = callback;
    }

    onStop(callback) {
        this.handlers[ON_STOP] = callback;
    }
}

export default DragHandler;