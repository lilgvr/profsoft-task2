export const dQ = (el, value) => {
    return el.querySelector(value);
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const ctr = dQ(document, '#todos-container');

const render = () => {
    console.log(todos)
    const appendEmptyPlaceholder = () => {
        const emptyPlaceholder = document.createElement('h2');
        emptyPlaceholder.innerText = "List is empty";

        ctr.innerHTML = '';
        ctr.appendChild(emptyPlaceholder);
        ctr.style.display = 'flex';
    }

    if (todos.length === 0) {
        appendEmptyPlaceholder();
        return;
    }

    ctr.style.display = 'block';
    ctr.innerHTML = '';

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

const main = () => {
    const addBtn = dQ(document, '.input-ctr').querySelector('button');

    const handleSubmitClick = (e) => {
        const input = dQ(document, '#todo-input');
        e.preventDefault();
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
