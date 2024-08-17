let form = document.querySelector(".form");
let time = document.querySelector(".time");
let list = document.querySelector(".list");
let message = document.querySelector(".text");
let todoTime;

setInterval(() => {
  let realTime = new Date();
  let h = realTime.getHours();
  let min = realTime.getMinutes();
  let s = realTime.getSeconds();
  let d = realTime.getDay() + 2;
  let m = realTime.getMonth() + 1;
  let y = realTime.getFullYear();
  h < 10 ? (h = "0" + h) : h;
  min < 10 ? (min = "0" + min) : min;
  s < 10 ? (s = "0" + s) : s;
  d < 10 ? (d = "0" + d) : d;
  m < 10 ? (m = "0" + m) : m;
  time.textContent = `${h}:${min}:${s} ${d}.${m}.${y}`;
  todoTime = `${h}:${min}:${s} ${d}.${m}.${y}`;
}, 1000);

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

function addTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function showTodos() {
  let todos = JSON.parse(localStorage.getItem("list"));
  list.innerHTML = "";
  todos.forEach((item, i) => {
    list.innerHTML += `
        <li ondblclick="setCompleted(${i})" class="item ${
      item.completed == true ? "completed" : ""
    }">
            <p class="text">${item.text}</p>
            <div class="about">
                <p class="time">${item.time}</p>
                <img src="images/edit.svg" alt="trash">
                <img onclick="deleteTodo(${i})" src="images/trash.svg" alt="trash">
            </div>
        </li>
        `;
  });
}

function errorMessage(where, text) {
  document.querySelector(`${where}`).textContent = `${text}`;
  setTimeout(() => {
    document.querySelector(`${where}`).textContent = "";
  }, 10000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = form["todoText"].value.trim();
  if (todoText.length) {
    todos.push({ text: todoText, time: todoTime, completed: false });
    addTodos();
    showTodos();
  } else {
    errorMessage(".message", "Please, enter some text...");
  }
  form.reset();
});

function deleteTodo(id) {
  const deletingTodo = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletingTodo;
  addTodos();
  showTodos();
}

function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = completedTodos;
  addTodos();
  showTodos();
}
