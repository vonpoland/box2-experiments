import BasicShape from './basic';

class Rectangle extends BasicShape {
    constructor(options = {}) {
        super(options);

        this.cx = options.cx = 100;
        this.cy = options.cy = 100;
        this.r = options.r = 100;
    }

    get tag() {
        return 'circle';
    }

    render(element) {
        element.setAttribute('cx', this.cx);
        element.setAttribute('cy', this.cy);
        element.setAttribute('r', this.r);
    }
}

export default Rectangle;