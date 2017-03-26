const events = {
  SELECTION: {
      SHAPE_SELECTED: 1,
      SHAPE_DESELECTED: 2,
      SHAPE_MOVED: 3
  }
};

class Eventbus {
    constructor () {
        this.handlers = {};
    }

    on(event, handler) {
        var handlers = this.handlers[event] || [];
        handlers.push(handler);

        this.handlers[event] = handlers;

        return () => this.off(event, handler);
    }

    off(event, handler) {
        var handlers = this.handlers[event];

        if(!handlers) {
            return;
        }

        this.handlers[event] = this.handlers.filter(currentHandler => currentHandler !== handler)
    }

    trigger(event, data) {
        var handlers = this.handlers[event];

        handlers && handlers.forEach(handler => handler(data));
    }

    get EVENTS () {
        return events
    }
}

const eventbus = new Eventbus();

export default eventbus;