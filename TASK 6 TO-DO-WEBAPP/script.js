const title = document.getElementById("title");
const description = document.getElementById("description");
let ul = document.querySelector(".pending-task");
let Cul = document.querySelector(".completed-task");

const addTask = () => {
  const task = {
    title: title.value,
    description: description.value,
  };
  title.value = "";
  description.value = "";

  //saving task to local storage
  if (localStorage.getItem("tasks") === null) {
    //check if localstorage is empty
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("tasks"));
    //if it already has elements,it will set 'arr' to the elements of localStorage
  }
  arr.push(task); //push your new elements
  localStorage.setItem("tasks", JSON.stringify(arr));
  createList(task);
  console.log(task);
};

const createList = (task) => {
  let li = `
  <li>
  <div class="defination">
    <div class="todo-title">${task.title}</div>
    <div class="todo-desc">${task.description}</div>
  </div>
  <div class="btn">
    <img class="edit" src="svg/edit.svg" alt="" />
    <img onclick='deleteTask(this,"tasks")' class="delete" src="svg/delete.svg" alt="" />
    <img onclick="CompleteTask(this)" class="mark" src="svg/mark.svg" alt="" />
  </div>
</li>
  `;

  ul.innerHTML += li;
};

const createCompleteList = (task) => {
  let li = `
    <li>
      <div class="defination">
        <div class="todo-title">${task.title}</div>
        <div class="todo-desc">${task.description}</div>
      </div>
      <div class="btn"> 
        <img onclick='deleteTask(this,"Ctasks")' class="delete" src="svg/delete.svg" alt="" />  
      </div>
    </li>`;

  Cul.innerHTML += li;
};

const creatPendingTaskList = () => {
  if (localStorage.getItem("tasks") !== null) {
    arr = JSON.parse(localStorage.getItem("tasks"));
    // console.log(arr);
    for (const obj of arr) {
      createList(obj);
    }
  }
};

const creatCompleteTaskList = () => {
  if (localStorage.getItem("Ctasks") !== null) {
    arr = JSON.parse(localStorage.getItem("Ctasks"));
    // console.log(arr);
    for (const obj of arr) {
      createCompleteList(obj);
    }
  }
};

const deleteTask = (e,list) => {
  let li = e.parentNode.parentNode; 
  let key = li.firstElementChild.firstElementChild.textContent; 
  let arr = JSON.parse(localStorage.getItem(list));
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === key) {
      arr.splice(i, 1);
      localStorage.setItem(list, JSON.stringify(arr));
      if(list === "tasks"){
        ul.removeChild(li);
      }else{
        Cul.removeChild(li);
      } 
      break;
    }
  }
};

const CompleteTask = (e) => {
  let li = e.parentNode.parentNode;
  let task = {
    title: li.firstElementChild.firstElementChild.textContent,
    description: li.firstElementChild.children[1].textContent,
  };

  if (localStorage.getItem("Ctasks") === null) {
    //check if localstorage is empty
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("Ctasks"));
    //if it already has elements,it will set 'arr' to the elements of localStorage
  }
  arr.push(task); //push your new elements
  localStorage.setItem("Ctasks", JSON.stringify(arr));
  createCompleteList(task);
  deleteTask(e,"tasks");
};

creatPendingTaskList();
creatCompleteTaskList();
