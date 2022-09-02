export const dQ = (el, value) => {
    return el.querySelector(value);
}

export function* idGenerator(startValue) {
    let i = startValue || 0;

    while (1) yield i++;
}
