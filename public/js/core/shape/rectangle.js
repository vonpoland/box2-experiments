import BasicShape from './basic';

class Rectangle extends BasicShape {
    constructor(options) {
        super(options);
    }

    get tag() {
        return 'rect';
    }
}

export default Rectangle;