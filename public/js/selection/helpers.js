const SELECTION_MARGIN = 2;

export function updateSelection(target, content) {
    var rect = target.getBoundingClientRect();

    content.setAttribute('width', rect.width + 2 * SELECTION_MARGIN);
    content.setAttribute('height', rect.height + 2 * SELECTION_MARGIN);

    requestAnimationFrame(() => {
        rect = target.getBoundingClientRect();
        content.style.transform = `translate(${rect.left - SELECTION_MARGIN}px, ${rect.top - SELECTION_MARGIN}px)`;
    });

}

export function showSelection(target, content, id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    id && svg.setAttribute('identifier', id);
    svg.style.position = 'absolute';
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('stroke', 'blue');
    rect.setAttribute('stroke-dasharray', '5,5');
    rect.setAttribute('fill-opacity', '0');
    rect.setAttribute('stroke-width', '1');
    rect.setAttribute('stroke-linecap', 'butt');

    svg.append(rect);
    updateSelection(target, svg);
    content.append(svg);
}