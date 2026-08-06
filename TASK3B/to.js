// ================================
// Elements
// ================================

const taskInput = document.getElementById("taskinput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("tasklist");
const taskCounter = document.getElementById("taskcounter");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

// ================================
// Data
// ================================

let tasks = [];

// ================================
// Local Storage
// ================================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        tasks = JSON.parse(savedTasks);

    }

}

// ================================
// Counter
// ================================

function updateCounter() {

    taskCounter.textContent = `${tasks.length} Tasks`;

}

// ================================
// Render Tasks
// ================================

function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    tasks.forEach(function(task, index){
        const searchValue = searchInput.value.toLowerCase();
if(!task.text.toLowerCase().includes(searchValue)){
    return;

}

        if(filter === "active" && task.completed){
            return;
        }
        if(filter === "completed" && !task.completed){
            return;
        }
        const li = document.createElement("li");
        li.className = "task-item";
        if(task.completed){
            li.classList.add("completed");
        }
        li.innerHTML = `
            <div class="task-content">

                <input
                    type="checkbox"
                    class="task-check"
                    data-index="${index}"
                    ${task.completed ? "checked" : ""}
                >
                <span class="task-text">
                    ${task.text}
                </span>
            </div>
           <div class="task-actions">

    <button
    class="edit-btn"
    data-index="${index}"
    title="Edit Task">
    <i class="fa-solid fa-pen"></i>
</button>

<button
    class="delete-btn"
    data-index="${index}"
    title="Delete Task">
    <i class="fa-solid fa-trash"></i>
</button>

</div>
        `;
        taskList.appendChild(li);
    });
    updateCounter();
}

// ================================
// Add Task
// ================================

function addTask(){
    const text = taskInput.value.trim();
    if(text === ""){
        alert("Please enter a task.");
        return;
    }
    tasks.push({
        text: text,
        completed: false
    });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
}
// ================================
// Delete - Edit - Complete
// ================================

taskList.addEventListener("click", function (event) {
    const index = event.target.dataset.index;

    // Delete Task
    if (event.target.classList.contains("delete-btn")) {
        tasks.splice(index, 1);
        saveTasks();
        const activeFilter = document.querySelector(".filter-btn--active").dataset.filter;
        renderTasks(activeFilter);
    }

    // Edit Task
    if (event.target.classList.contains("edit-btn")) {
        const newText = prompt("Edit Task", tasks[index].text);
        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
            saveTasks();
            const activeFilter = document.querySelector(".filter-btn--active").dataset.filter;
            renderTasks(activeFilter);
        }
    }
});
taskList.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-check")) {
        const index = event.target.dataset.index;
        tasks[index].completed = event.target.checked;
        saveTasks();
        const activeFilter = document.querySelector(".filter-btn--active").dataset.filter;
        renderTasks(activeFilter);
    }
});

// ================================
// Filter
// ================================

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("filter-btn--active");
        });
        button.classList.add("filter-btn--active");
        renderTasks(button.dataset.filter);
    });
});

// ================================
// Add Task Events
// ================================

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// ================================
// Start App
// ================================

loadTasks();
renderTasks();

searchInput.addEventListener("input", function(){
    const activeFilter = document.querySelector(".filter-btn--active").dataset.filter;
    renderTasks(activeFilter);
});