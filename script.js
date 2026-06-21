let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


 let tasks = [];
   
    function addTask() {

    const text = taskInput.value.trim();

    if(text === "") return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();
    renderTasks();

}
   function renderTasks() {

    taskList.innerHTML = "";
    
    let filteredTasks = tasks;

     if (currentFilter === "active") {
       filteredTasks = tasks.filter(task => !task.completed);
     }

     if (currentFilter === "completed") {
       filteredTasks = tasks.filter(task => task.completed);
     }
     if(filteredTasks.length === 0){
    taskList.innerHTML = "<li>No tasks found</li>";
    return;
   }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
        <span>${task.text}</span>

        <div>
        <button class="toggle-btn" data-id="${task.id}">
            ✓
        </button>

        <button class="edit-btn" data-id="${task.id}">
            Edit
        </button>

        <button class="delete-btn" data-id="${task.id}">
            X
        </button>
         </div>
         `;

        taskList.appendChild(li);

    });
    document.getElementById("taskCount").textContent =
    `Total Tasks: ${tasks.length}`;
} 
    
  function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

     saveTasks();
    renderTasks();

}
  function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

   saveTasks();
    renderTasks();

}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }

    renderTasks();
}

function editTask(id) {

    const newText = prompt("Edit Task:");

    if (!newText || newText.trim() === "") return;

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.text = newText;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        addTask();
    }

});

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});
const clearAllBtn = document.getElementById("clearAllBtn");

clearAllBtn.addEventListener("click", () => {

    if(confirm("Delete all tasks?")) {

        tasks = [];

        saveTasks();
        renderTasks();
    }

});
taskList.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("toggle-btn")) {
        toggleTask(id);
    }

    if (e.target.classList.contains("edit-btn")) {
        editTask(id);
    }

    if (e.target.classList.contains("delete-btn")) {
        deleteTask(id);
    }

});

addBtn.addEventListener("click", addTask);
loadTasks();