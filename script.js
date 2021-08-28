const addBtn = document.querySelector(".inputField span");
const inputBox = document.querySelector(".inputField input");
const todoList = document.querySelector(".todoList ul");
const tasksNumber = document.querySelector(".footer .number");
const clearAllBtn = document.querySelector('.footer button');
const modal = document.querySelector('.modal-result');


function createTask() {
  let userData = inputBox.value;
  if (userData.trim() != 0) {
    modal.style.display = '';
    inputBox.style.border = '2px solid #ccc'
    createLi(userData);
    saveTasks();
    inputBox.value = "";
  } else {
    modal.style.display = 'block';
    inputBox.style.border = '1px solid #f00'
  }
}

function createLi(userData) {
  let createElement = document.createElement("li");
  createElement.innerHTML = `${userData}<span class="delTask">X</span>`;
  todoList.appendChild(createElement);
  numberOfTasks();
}

function numberOfTasks() {
  const lis = todoList.querySelectorAll("li");
  tasksNumber.innerText = lis.length;
}

document.addEventListener('click', e=>{
  const el = e.target;
  if(el.classList.contains('delTask')) {
    el.parentElement.remove();
    saveTasks();
  }
  numberOfTasks();
})

function saveTasks() {
  let lis = todoList.querySelectorAll('li');
  const arr = [];
  for(let i of lis) {
    const textTask = i.innerText;
    arr.push(textTask.replace('\nX', ''))
  }
  const tasksJSON = JSON.stringify(arr);
  localStorage.setItem('New Todo', tasksJSON);
}

function showSavedTasks() {
  const tasks = localStorage.getItem('New Todo');
  const taskList = JSON.parse(tasks);
  
  for(let i of taskList) {
    createLi(i)
  }
}

addBtn.addEventListener("click", () => {
  createTask();

});

inputBox.addEventListener("keypress", e => {
  if (e.keyCode === 13) {
    createTask();
  }
});

clearAllBtn.addEventListener('click', ()=> {
  let lis = todoList.querySelectorAll('li');
  for(let i of lis) {
    todoList.removeChild(i);
  }
  saveTasks();
  inputBox.value = "";
})

showSavedTasks();