const todoList =  JSON.parse(localStorage.getItem('todoList')) || [];
let checked =  JSON.parse(localStorage.getItem('checked')) || [];
let editting = false;
const todoInputElem = document.querySelector('.js-name-input');
const dateInputElem = document.querySelector('.js-due-date-input');
const addDoneBtnElem = document.querySelector('.js-add-done-button');
const todoInfoElem = document.querySelector('.js-todo-info-container');
const notificationElem = document.querySelector('.js-notification');

renderTodoList();

document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-add-button')) {
    const todoInputElem = document.querySelector('.js-name-input');
    const name = todoInputElem.value;
  
    const dateInputElem = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElem.value;

    const notificationElem = document.querySelector('.js-notification');
  
    let message;
    function runMessage(message) {
      notificationElem.innerHTML = `
        <p class="notification-text">${message}</p>
      `;
      setTimeout(() => {notificationElem.innerHTML = '';}, 3000);
    }
  
    if ((name !== '') & (dueDate !== '')) {
      addTodo();
    } else if ((name === '') && (dueDate === '')) {
      message = 'Please Add A Todo Name And A Duedate';
      runMessage(message);
      todoInputElem.focus();
    }  else if (name === '') {
      message = 'Please Add A Todo Name';
      runMessage(message);
      todoInputElem.focus();
    } else if (dueDate === '') {
      message = 'Please Add A Duedate';
      runMessage(message);
      dateInputElem.focus();
    }
  }
});

// KEYDOWNS
todoInputElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !editting) {
    const notificationElem = document.querySelector('.js-notification');
    const todoInputElem = document.querySelector('.js-name-input');
    const dateInputElem = document.querySelector('.js-due-date-input');
    const name = todoInputElem.value;
    const dueDate = dateInputElem.value;
  
    let message;
    function runMessage(message) {
      notificationElem.innerHTML = `
        <p class="notification-text">${message}</p>
      `;
      setTimeout(() => {notificationElem.innerHTML = '';}, 3000);
    }
  
    if ((name !== '') & (dueDate !== '')) {
      addTodo();
    } else if ((name === '') && (dueDate === '')) {
      message = 'Please Add A Todo Name And A Duedate';
      runMessage(message);
      todoInputElem.focus();
    }  else if (name === '') {
      message = 'Please Add A Todo Name';
      runMessage(message);
      todoInputElem.focus();
    } else if (dueDate === '') {
      message = 'Please Add A Duedate';
      runMessage(message);
      dateInputElem.focus();
    }
  }
});

dateInputElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !editting) {
    const notificationElem = document.querySelector('.js-notification');
    const todoInputElem = document.querySelector('.js-name-input');
    const dateInputElem = document.querySelector('.js-due-date-input');
    const name = todoInputElem.value;
    const dueDate = dateInputElem.value;
  
    let message;
    function runMessage(message) {
      notificationElem.innerHTML = `
        <p class="notification-text">${message}</p>
      `;
      setTimeout(() => {notificationElem.innerHTML = '';}, 3000);
    }
  
    if ((name !== '') & (dueDate !== '')) {
      addTodo();
    } else if ((name === '') && (dueDate === '')) {
      message = 'Please Add A Todo Name And A Duedate';
      runMessage(message);
      todoInputElem.focus();
    }  else if (name === '') {
      message = 'Please Add A Todo Name';
      runMessage(message);
      todoInputElem.focus();
    } else if (dueDate === '') {
      message = 'Please Add A Duedate';
      runMessage(message);
      dateInputElem.focus();
    }
  }
});



function addTodo() {
  const todoInputElem = document.querySelector('.js-name-input');
  const name = todoInputElem.value;

  const dateInputElem = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElem.value;

  todoList.push({
    name,
    dueDate
  });

  todoInputElem.value = '';
  dateInputElem.value = '';
  saveTodoList();
  renderTodoList();
}


function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    
    const html = `
      <div class="col-1">
        <input type="checkbox" class="done-checkbox js-done-checkbox">
        <p>${name}</p>
      </div>

      <div class="col-2">${dueDate}</div>

      <div class="col-3">
        <button class="delete-button js-delete-todo-button">
          <svg  class="js-remove-item-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path  class="js-remove-item-btn" d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"></path>
          </svg>
        </button>
        <button class="edit-button js-edit-button">/</button>
      </div>
    `;
    todoListHTML += html;
  });
  document.querySelector('.js-itodo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      saveTodoList();
      if (document.querySelectorAll('.js-done-checkbox')[index].checked) {
        checked = checked.filter(value => value !== index);
      }
      let newArr = [];
      for (let i = 0; i < checked.length; i++) {
        let element = checked[i];
        if (index < element || ((element === index) && (index === '0'))) {
          element--;
        }
        newArr.push(element);
      }
      checked = [...new Set(newArr)];
      saveChecked();
      renderTodoList();
    });
  });

  document.querySelectorAll('.js-edit-button').forEach((editBttn, index) => {
    editBttn.addEventListener('click', () => {
      if (!editting && editBttn.innerHTML === '/') {
        editBttn.innerHTML = 'x';
        editBttn.classList.add('delete-button-cancel');

        editting = true;
        todoInputElem.value = todoList[index].name;
        dateInputElem.value = todoList[index].dueDate;
        addDoneBtnElem.innerHTML = `
          <button class="edit-done-btn js-edit-done-btn">Done</button>
        `;
        todoInputElem.focus();
  
        document.querySelector('.js-edit-done-btn').addEventListener('click', () => {
          let message;
          function runMessage(message) {
            notificationElem.innerHTML = `
              <p class="notification-text">${message}</p>
            `;
            setTimeout(() => {notificationElem.innerHTML = '';}, 3000);
          }
        
          if ((todoInputElem.value !== '') & (dateInputElem.value !== '')) {
            todoList[index].name = todoInputElem.value;
            todoList[index].dueDate = dateInputElem.value; 
            saveTodoList();
            renderTodoList();
            addDoneBtnElem.innerHTML = `
              <button class="add-button js-add-button">+</button>
            `;
            todoInputElem.value = '';
            dateInputElem.value = '';
            editting = false;
          } else if ((todoInputElem.value === '') && (dateInputElem.value === '')) {
            message = 'Please Add A Todo Name And A Duedate';
            runMessage(message);
            todoInputElem.focus();
          } else if (todoInputElem.value === '') {
            message = 'Please Add A Todo Name';
            runMessage(message);
            todoInputElem.focus();
          } else if (dateInputElem.value === '') {
            message = 'Please Add A Duedate';
            runMessage(message);
            dateInputElem.focus();
          }
        });
      } 
      else if (editBttn.innerHTML === 'x') {
        editting = false;
        editBttn.innerHTML = '/';
        todoInputElem.value = '';
        dateInputElem.value = '';

        addDoneBtnElem.innerHTML = `
          <button class="add-button js-add-button">+</button>
        `;
        editBttn.classList.remove('delete-button-cancel');
      }
    });
  });

  const checkboxes = document.querySelectorAll('.js-done-checkbox');

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('click', () => {

      if (checkbox.checked) {
        checked.push(index);
      } else {
        checked = checked.filter(value => value !== index);
      }
      saveChecked();
      displayTodoInfo();
    });
  });

  checked.forEach((eachValue) => {
    checkboxes[eachValue].checked = true;
  });
  displayTodoInfo();
}


function saveChecked() {
  localStorage.setItem('checked', JSON.stringify(checked));
}


function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}


function displayTodoInfo() {
  let text = '';

  if (todoList.length === 0) {
    todoInfoElem.innerHTML = '';
    return;
  } else if (checked.length === 0) {
    text = checked.length;
  } else if (checked.length === todoList.length) {
    text = 'All';
  } else if (todoList.length > checked.length) {
    text = `${checked.length}/${todoList.length}`;
  }

  todoInfoElem.innerHTML = `
    <p class="todo-info-text">
      ${text} Done
    </p>
  `;
}