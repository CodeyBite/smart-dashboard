function updateTimeAndDate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
document.getElementById('time').innerText = timeString;
}

             // Update every second
setInterval(updateTime, 1000);
updateTime(); // Run once on load

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.background = "none";
    removeBtn.style.border = "none";
    removeBtn.style.color = "red";
    removeBtn.style.fontSize = "1em";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    document.getElementById("task-list").appendChild(li);

    taskInput.value = "";
}

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return;

    fetch(`/weather?city=${city}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                document.getElementById("weatherResult").textContent = data.error;
            } else {
                document.getElementById("weatherResult").innerHTML = `
                    <p><strong>${data.city}</strong></p>
                    <p>🌡️ Temp: ${data.temp}°C</p>
                    <p>☁️ Condition: ${data.description}</p>
                    <p>💧 Humidity: ${data.humidity}%</p>
                `;
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");

    // Get saved todos from localStorage or set to empty array
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Load saved todos on page load
    savedTodos.forEach(task => {
        addTodo(task);
    });

    // Add button click
    addBtn.addEventListener("click", function () {
        const task = todoInput.value.trim();
        if (task) {
            addTodo(task);
            savedTodos.push(task);
            localStorage.setItem("todos", JSON.stringify(savedTodos));
            todoInput.value = "";
        }
    });

    // Function to add todo item to list
    function addTodo(task) {
        const li = document.createElement("li");
        li.textContent = task;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.classList.add("del-btn");

        delBtn.addEventListener("click", function () {
            li.remove();
            savedTodos = savedTodos.filter(t => t !== task);
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        });

        li.appendChild(delBtn);
        todoList.appendChild(li);
    }
});
