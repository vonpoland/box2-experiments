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


function onMove(event, lastEvent) {
    return {
        dx: event.x - lastEvent.x,
        dy: event.y - lastEvent.y,
        target: event.target,
        identifier: event.identifier
    };
}

class DragMultipleHandler {
    constructor(element) {
        element.addEventListener(EVENTS.DOM.MOUSE.DOWN, callIfHandled.call(this, ON_SELECT));
        element.addEventListener(EVENTS.DOM.MOUSE.UP, callIfHandled.call(this, ON_STOP));
        element.addEventListener(EVENTS.DOM.MOUSE.MOVE, callIfHandled.call(this, ON_MOVE));
        element.addEventListener(EVENTS.DOM.TOUCH.DOWN, callIfHandled.call(this, ON_SELECT));
        element.addEventListener(EVENTS.DOM.TOUCH.UP, callIfHandled.call(this, ON_STOP));
        element.addEventListener(EVENTS.DOM.TOUCH.MOVE, callIfHandled.call(this, ON_MOVE));

        this.handlers = [];
        this.pointerPosition = {};
    }

    storeLastPointerPosition(position, identifier = 'mouse',) {
        this.pointerPosition[identifier] = position
    }

    getLastPointerPosition(identifier = 'mouse') {
        return this.pointerPosition[identifier];
    }

    onMove(callback) {
        this.handlers[ON_MOVE] = event => {
            event.preventDefault();

            if (!event.touches) {
                let lastMousePosition = this.getLastPointerPosition();

                if (lastMousePosition) {
                    callback(onMove(event, lastMousePosition));
                }

                this.storeLastPointerPosition({x: event.x, y: event.y});
            } else {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    let touch = event.changedTouches[i];
                    let lastTouch = this.getLastPointerPosition(touch.identifier);

                    if (lastTouch) {
                        callback(onMove({
                            x: touch.pageX,
                            y: touch.pageY,
                            target: touch.target,
                            identifier: touch.identifier
                        }, lastTouch), true);
                    }

                    this.storeLastPointerPosition({x: touch.pageX, y: touch.pageY}, touch.identifier);
                }
            }
        };
    }

    onSelect(callback) {
        this.handlers[ON_SELECT] = event => {
            // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
            /***
             Since calling preventDefault() on a touchstart or the first touchmove event of a series prevents the
             corresponding mouse events from firing, it's common to call preventDefault() on touchmove rather than touchstart.
             That way, mouse events can still fire and things like links will continue to work.
             Alternatively, some frameworks have taken to refiring touch events as mouse events for this same purpose.
             (This example is oversimplified and may result in strange behavior. It is only intended as a guide.)
             ***/
            if (!event.touches) {
                event.preventDefault();
                callback({
                    target: event.target
                })
            } else {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    let touch = event.changedTouches[i];

                    callback({
                        target: event.target,
                        identifier: touch.identifier
                    })
                }
            }
        }
    }

    onStop(callback) {
        this.handlers[ON_STOP] = event => {
            event.preventDefault();
            if (!event.touches) {
                callback({
                    target: event.target
                })
            } else {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    let touch = event.changedTouches[i];

                    callback({
                        target: event.target,
                        identifier: touch.identifier
                    })
                }
            }
        }
    }
}

export default DragMultipleHandler;