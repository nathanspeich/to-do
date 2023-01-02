window.addEventListener('load', () => {
  toDos = JSON.parse(localStorage.getItem('to-dos')) || [];
  const nameInput = document.querySelector('#name');
  const newToDoForm = document.querySelector('#new-to-do-form');

  const username = localStorage.getItem('username') || '';

  nameInput.value = username;

  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  });
  newToDoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const toDo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    toDos.push(toDo);

    localStorage.setItem('to-dos', JSON.stringify(toDos));

    e.target.reset();

    DisplayToDos();
  });
  DisplayToDos();
});

const DisplayToDos = () => {
  const toDoList = document.querySelector('#to-do-list');

  toDoList.innerHTML = '';

  toDos
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((toDo) => {
      const toDoItem = document.createElement('div');
      toDoItem.classList.add('to-do-item');

      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const content = document.createElement('div');
      const actions = document.createElement('div');
      const edit = document.createElement('button');
      const deleteButton = document.createElement('button');

      input.type = 'checkbox';
      input.checked = toDo.done;
      span.classList.add('bubble');

      if (toDo.category === 'personal') {
        span.classList.add('personal');
      } else {
        span.classList.add('work');
      }

      content.classList.add('to-do-content');
      actions.classList.add('actions');
      edit.classList.add('edit');
      deleteButton.classList.add('delete');

      content.innerHTML = `<input type="text" value="${toDo.content}" readonly/>`;
      edit.innerHTML = 'Edit';
      deleteButton.innerHTML = 'Delete';

      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      toDoItem.appendChild(label);
      toDoItem.appendChild(content);
      toDoItem.appendChild(actions);

      toDoList.appendChild(toDoItem);

      if (toDo.done) {
        toDoItem.classList.add('done');
      }

      input.addEventListener('click', (e) => {
        toDo.done = e.target.checked;
        localStorage.setItem('to-dos', JSON.stringify(toDos));

        if (toDo.done) {
          toDoItem.classList.add('done');
        } else {
          toDoItem.classList.remove('done');
        }

        DisplayToDos();
      });

      edit.addEventListener('click', (e) => {
        const input = content.querySelector('input');
        input.removeAttribute('readonly');
        input.focus();
        input.addEventListener('blur', (e) => {
          input.setAttribute('readonly', true);
          toDo.content = e.target.value;
          localStorage.setItem('to-dos', JSON.stringify(toDos));
          DisplayToDos();
        });
      });

      deleteButton.addEventListener('click', (e) => {
        toDos = toDos.filter((t) => t !== toDo);
        localStorage.setItem('to-dos', JSON.stringify(toDos));
        DisplayToDos();
      });
    });
};
