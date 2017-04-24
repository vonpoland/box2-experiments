var id = 1;

function createDom(element, shape) {
    element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', shape.tag));

    var dom = element.childNodes[element.childNodes.length - 1];

    dom.setAttribute('id', id++);
    addLayout(shape, dom);
    dom.shape = shape;
}

function addLayout(shape, shapeDom) {
    if(typeof shape.render === 'function') {
       shape.render(shapeDom)
    } else {
        shapeDom.setAttribute('width', shape.width);
        shapeDom.setAttribute('height', shape.height);
    }

    shapeDom.style.transform = `translate(${shape.x}px, ${shape.y}px)`;
}

export function renderContent(element) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    element.insertAdjacentElement('beforeEnd', svg);

    return svg;
}

export function renderShape(element, shape) {
   createDom(element, shape);
}

export function hasShape(event) {
    return typeof event.target.shape !== 'undefined';
}

export function updateShapeLayout(event, shapeDom) {
    var shape = shapeDom.shape;
    shape.updatePosition = event;
    requestAnimationFrame(() => shapeDom.style.transform = `translate(${shape.x}px, ${shape.y}px)`)
}