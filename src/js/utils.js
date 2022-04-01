export function createHints(dom) {
    const hints = [];
    for (let x = 0; x < 5; x++) {
        const hint = createElement("li", "hint"); 
        dom.appendChild(hint);
        hints.push(hint);  
    }
    return hints;
}

export function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    if (text) {
        element.innerText = text;
    }
    return element;
}

export function appendChildren(dom, ...children) {
    children.forEach(child => {
        dom.appendChild(child);
    });
}