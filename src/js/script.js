import {dQ, idGenerator} from "./service";

let todos = JSON.parse(localStorage.getItem('todos'));
if (!todos) todos = [];

const ctr = dQ(document, '#todos-container');
const len = todos.length;

const render = () => {
    const emptyPlaceholder = document.createElement('h2');
    emptyPlaceholder.innerText = "List's empty";


    // TODO placeholder
    if (todos.length === 0) {
        ctr.appendChild(emptyPlaceholder);
        ctr.style.display = 'flex';
        return;
    } else {
        ctr.style.display = 'block';
        ctr.innerHTML = '';
    }

    if (todos.length > len) {
        for (let i = todos.length - len; i < todos.length; i++) {
            fillTemplate(todos[i]);
        }
        return;
    }

    if (todos.length < len) ctr.innerHTML = '';

    for (const todo of todos) {
        fillTemplate(todo);
    }
}

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
    render();
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
}

const main = () => {
    const addBtn = dQ(document, '.input-ctr').querySelector('button');
    render();

    addBtn.addEventListener('click', handleSubmitClick);
}

window.onload = main;
