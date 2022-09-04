const getElement = (el, value) => {
    return el.querySelector(value);
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const container = getElement(document, '#todos-container');
const template = getElement(document, '#todo-template');

const render = () => {
    const appendEmptyPlaceholder = () => {
        const emptyPlaceholder = document.createElement('h2');
        emptyPlaceholder.innerText = "List is empty";

        container.innerHTML = '';
        container.style.display = 'flex';
        container.appendChild(emptyPlaceholder);
    }

    if (todos.length === 0) {
        appendEmptyPlaceholder();
        return;
    }

    container.style.display = 'block';
    container.innerHTML = '';

    for (const todo of todos) {
        fillTemplate(todo);
    }
}

const fillTemplate = (todo) => {
    const clone = template.content.cloneNode(true);
    const title = getElement(clone, 'h3');
    const removeBtn = getElement(clone, 'button');

    title.innerText = todo.title;
    container.appendChild(clone);

    const handleRemoveClick = (e) => {
        e.preventDefault();

        todos = todos.filter(t => t.id !== todo.id);
        localStorage.setItem('todos', JSON.stringify(todos));
        render();
    }

    removeBtn.addEventListener('click', handleRemoveClick);
}

const main = () => {
    const addBtn = getElement(document, '.input-ctr').querySelector('button');

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const input = getElement(document, '#todo-input');
        const value = input.value;

        if (!value) return;

        const newItem = {
            id: todos.length,
            title: value
        };

        todos.push(newItem);
        localStorage.setItem('todos', JSON.stringify(todos));
        render();
        input.value = '';
    }

    render();

    addBtn.addEventListener('click', handleSubmitClick);
}

window.onload = main;
