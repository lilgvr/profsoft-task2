const dQ = (el, value) => {
    return el.querySelector(value);
}

function* idGenerator(startValue) {
    let i = startValue || 0;

    while (1) yield i++;
}

let todos = JSON.parse(localStorage.getItem('todos'));
if (!todos) todos = [];

const ctr = dQ(document, '#todos-container');

const fillTemplate = (todo) => {
    const template = dQ(document, '#todo-template');
    const clone = template.content.cloneNode(true);
    const title = dQ(clone, 'h3');
    const removeBtn = dQ(clone, 'button');

    title.innerText = todo.title;
    ctr.appendChild(clone);

    const handleRemoveClick = (e) => {
        e.preventDefault();

        todos = todos.filter(t => t.id !== todo.id);
        localStorage.setItem('todos', JSON.stringify(todos));
        render();
    }

    removeBtn.addEventListener('click', handleRemoveClick);
}

const render = () => {
    ctr.innerHTML = '';
    for (const todo of todos) {
        fillTemplate(todo);
    }
}

const handleSubmitClick = (e) => {
    const input = dQ(document, '#todo-input');
    e.preventDefault();
    const value = input.value;

    if (!value) return;

    const newItem = {
        id: idGenerator(todos.length).next().value,
        title: value
    };

    todos.push(newItem);
    fillTemplate(newItem);
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
}

const main = () => {
    const addBtn = dQ(document, '.input-ctr').querySelector('button');
    render();

    addBtn.addEventListener('click', handleSubmitClick);
}

window.onload = main;
