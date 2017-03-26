import BasicShape from './basic';

class Rectangle extends BasicShape {
    constructor(options) {
        super(options);
    }

    get template() {
        return '<rect/>';
    }
}

export default Rectangle;