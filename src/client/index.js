window.addEventListener('DOMContentLoaded', e => {
  const todos = document.querySelector('.todos');
  const addBtn = document.querySelector('.add-btn');
  const todo = document.querySelector('.add-todo');
  const logoutBtn = document.querySelector('.logout-btn');

  fetch('/todo/get-todo')
    .then(data => data.json())
    .then(res => {
      res.map(todo => {
        const updateBtn = document.createElement('button');
        updateBtn.classList.add('update-btn');
        updateBtn.innerText = 'UPDATE';
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'DELETE';

        const newTodo = document.createElement('div');
        const inputTodo = document.createElement('input');
        inputTodo.classList.add('update-input');
        inputTodo.setAttribute('value', todo.todo);
        newTodo.setAttribute('value', todo._id);
        inputTodo.innerText = todo.todo;
        // newTodo.innerText = todo.todo;
        todos.appendChild(newTodo);
        newTodo.appendChild(inputTodo);
        newTodo.appendChild(updateBtn);
        newTodo.appendChild(deleteBtn);
      });

      const updateBtn = document.querySelector('.update-btn');
      const inputTodo = document.querySelector('.update-input');
      const deleteBtn = document.querySelector('.delete-btn');

      todos.addEventListener('click', e => {
        console.log('TODOS:', e);
      });

      deleteBtn.addEventListener('click', () => {
        const id = deleteBtn.closest('div').getAttribute('value');
        console.log('DELETE BUTTON', id);
        fetch('/todo/delete-todo', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
          }),
        }).then(() => {
          window.location.replace('/homepage');
          location.reload();
        });
      });

      updateBtn.addEventListener('click', () => {
        const id = updateBtn.closest('div').getAttribute('value');
        const newTodo = inputTodo.value;
        console.log('IS THIS RIGHT?', newTodo);
        fetch('/todo/update-todo', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            newTodo,
          }),
        })
          .then(response => response.json())
          .then(newRes => {
            console.log('fuck this hsietttt', newRes);
          });
      });
    });

  addBtn.addEventListener('click', () => {
    fetch('todo/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todo.value,
      }),
    })
      .then(data => data.json())
      .then(data2 => {
        console.log('here is the data', data2);

        const updateBtn = document.createElement('button');
        updateBtn.classList.add('update-btn');
        updateBtn.innerText = 'UPDATE';
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'DELETE';
        const inputTodo = document.createElement('input');
        inputTodo.classList.add('update-input');
        inputTodo.setAttribute('value', data2.todo);
        const newTodo = document.createElement('div');

        newTodo.setAttribute('value', data2._id);
        // newTodo.innerText = data2.todo;
        todos.appendChild(newTodo);
        newTodo.appendChild(inputTodo);
        newTodo.appendChild(updateBtn);
        newTodo.appendChild(deleteBtn);
      });
  });

  logoutBtn.addEventListener('click', () => {
    window.location.replace('/');
  });
});
