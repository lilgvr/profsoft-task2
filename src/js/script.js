const dQ = (el, value) => {
    return el.querySelector(value);
}

let todos = JSON.parse(localStorage.getItem('todos'));
if (!todos) todos = [];

const ctr = dQ(document, '.container');

const fillTemplate = (todo) => {
    const template = dQ(document, '#todo-template');
    const clone = template.content.cloneNode(true);
    const title = dQ(clone, 'h3');
    const removeBtn = dQ(clone, 'button');

    const handleRemoveClick = (e) => {
        e.preventDefault();
    }

    removeBtn.addEventListener('click', handleRemoveClick);

    title.innerText = todo.title;
    ctr.appendChild(clone);
}

const render = () => {
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
