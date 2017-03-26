class BasicShape {
    /**
     * Create basic shape
     * @param options {Object}
     */
    constructor(options = {}) {
        this.layout = {
            x: options.x || 0,
            y: options.y || 0,
            width: options.width,
            height: options.height
        };
    }

    set updatePosition(position) {
        this.layout.x += position.dx;
        this.layout.y += position.dy;
    }

    get x() {
        return this.layout.x;
    }

    get y() {
        return this.layout.y;
    }

    get height() {
        return this.layout.height;
    }

    get width() {
        return this.layout.width;
    }
}

export default BasicShape;