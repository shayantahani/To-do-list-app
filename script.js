const list = document.querySelector(".task-list");
const input = document.querySelector("#input");
const addBtn = document.querySelector("#add-task-btn");
const selectBtn = document.querySelector(".dropdown-menu");
// functions
function creatItem() {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task", "unchecked");
    const newTask = `<li>${input.value}</li>`;
    const iconDiv = `
    <span class="check-icon"><i class="far fa-check-square"></i></span>
    <span class="trash-icon"><i class="far fa-trash-alt"></i></span>
    `
    taskDiv.innerHTML = newTask + iconDiv;
    list.appendChild(taskDiv);
    saveTolocal(input.value)
    input.value = "";
}
function addTask(e) {
    e.preventDefault();
    if (input.value.length > 0) {
        creatItem();
    }
};
function addkeyTask(e) {
    if (input.value.length > 0 && e.which === 13) {
        e.preventDefault();
        creatItem();
    }
}
function filterTasks(e) {
    const filterValue = e.target.value;
    const tasks = [...list.childNodes];
    tasks.forEach((task) => {
        switch (filterValue) {
            case "all": task.style.display = "flex"
                break;
            case "completed":
                if (!task.classList.contains("checked")) {
                    task.style.display = "none"
                } else {
                    task.style.display = "flex"
                }
                break;
            case "uncompleted":
                if (task.classList.contains("unchecked")) {
                    task.style.display = "flex"
                } else {
                    task.style.display = "none"
                }
                break;
        }
    })

}
// function removeCheck is for controlling trash and check button behavior
function removeCheck(e) {
    let classList = [...e.target.classList]
    let item = e.target;
    const mainTask = item.parentElement.parentElement;
    if (classList[1] === "fa-check-square") {
        mainTask.classList.remove("unchecked")
        mainTask.classList.toggle("checked");
    } else if (classList[1] === "fa-trash-alt") {
        removeLocalTask(mainTask)
        mainTask.remove()
    }
}
// event listeners
selectBtn.addEventListener("click", filterTasks);
list.addEventListener("click", removeCheck);
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", addkeyTask);
document.addEventListener("DOMContentLoaded", getlocalTask)
// localStorage
function saveTolocal(task) {
    let savedTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
    savedTasks.push(task)
    localStorage.setItem("task", JSON.stringify(savedTasks))
}
function getlocalTask() {
    let savedTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
    savedTasks.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task", "unchecked");
        const newTask = `<li>${task}</li>`;
        const iconDiv = `
        <span class="check-icon"><i class="far fa-check-square"></i></span>
        <span class="trash-icon"><i class="far fa-trash-alt"></i></span>
        `
        taskDiv.innerHTML = newTask + iconDiv;
        list.appendChild(taskDiv);
    })
}
function removeLocalTask(task) {
    let savedTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
    const filteredTasks = savedTasks.filter((t) => t !== task.children[0].innerText);
    localStorage.setItem("task", JSON.stringify(filteredTasks))
}
