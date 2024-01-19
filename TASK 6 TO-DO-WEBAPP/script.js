const title = document.getElementById("title");
const description = document.getElementById("description");
let ul = document.querySelector(".pending-task");
let Cul = document.querySelector(".completed-task");

let edit = 0;

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
};

const createList = (task) => {
  let li = `
  <li>
  <div onclick="showModal(this)" class="defination">
    <div class="todo-title">${task.title}</div>
    <div class="todo-desc">${task.description}</div>
  </div>
  <div class="btn">
    <img onclick='openModal(this)' class="edit" src="svg/edit.svg" alt="" />
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
      <div onclick="showModal(this)" class="defination">
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

const deleteTask = (e, list) => {
  let li = e.parentNode.parentNode;
  let key = li.firstElementChild.firstElementChild.textContent;
  let arr = JSON.parse(localStorage.getItem(list));
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === key) {
      arr.splice(i, 1);
      localStorage.setItem(list, JSON.stringify(arr));
      if (list === "tasks") {
        ul.removeChild(li);
      } else {
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
  deleteTask(e, "tasks");
};

creatPendingTaskList();
creatCompleteTaskList();

// Function to open the modal
const openModal = (e) => {
  let modal = document.getElementById("modalOverlay");
  modal.style.display = "flex";
  let li = e.parentNode.parentNode;
  let task = {
    title: li.firstElementChild.firstElementChild.textContent,
    description: li.firstElementChild.children[1].textContent,
  };

  let arr = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === task.title) {
      edit = i;
      // console.log(edit);
      break;
    }
  }
  let modal_text = modal.childNodes[1].childNodes[1];
  modal_text.childNodes[1].value = task.title;
  modal_text.childNodes[3].value = task.description;
};

// Function to show the modal
const showModal = (e) => {
  let modal = document.getElementById("modalOverlay2");
  modal.style.display = "flex";
  let li = e.parentNode;
  let task = {
    title: li.firstElementChild.firstElementChild.textContent,
    description: li.firstElementChild.children[1].textContent,
  };
  let modal_text = modal.childNodes[1].childNodes[1];
  modal_text.childNodes[1].value = task.title;
  modal_text.childNodes[3].value = task.description;
};

// Function to close the modal
const closeModal = () => {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("modalOverlay2").style.display = "none";
};

// Function to save changes and close the modal
const saveAndClose = (e) => {
  let modal = e.parentNode;
  let data = {
    title: modal.childNodes[1].value,
    description: modal.childNodes[3].value,
  };

  let arr = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < arr.length; i++) {
    if (i === edit) {
      arr[i].title = data.title;
      arr[i].description = data.description;
      localStorage.setItem("tasks", JSON.stringify(arr));
      //reload
      location.reload();
      closeModal();
      break;
    }
  }
  closeModal();
};

// Close the modal if the overlay is clicked
window.onclick = function (event) {
  let modal = document.getElementById("modalOverlay");
  let modal2 = document.getElementById("modalOverlay2");
  if (event.target === modal || event.target === modal2) {
    modal.style.display = "none";
    modal2.style.display = "none";
  }
};
