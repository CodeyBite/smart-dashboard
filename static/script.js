// Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
});

// Load dark mode preference
window.addEventListener('load', () => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.getElementById('theme-toggle').checked = isDark;
    if (isDark) document.body.classList.add('dark-mode');
    updateTime();
    loadTodos();
});

// Live Time Update
function updateTime() {
    const timeDisplay = document.getElementById('time');
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        timeDisplay.textContent = `${dateString} ${timeString}`;
    }, 1000);
}

// To-do List
function addTodo(text) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.onclick = () => {
        todoList.removeChild(li);
        saveTodos();
    };

    li.appendChild(delBtn);
    todoList.appendChild(li);
    saveTodos();
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        todos.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const saved = JSON.parse(localStorage.getItem('todos') || "[]");
    saved.forEach(text => addTodo(text));
}

document.getElementById('todo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    if (input.value.trim()) {
        addTodo(input.value.trim());
        input.value = '';
    }
});

// Weather form
document.getElementById('weather-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-result');
    if (!city.trim()) return;

    try {
        const res = await fetch(`/weather?city=${city}`);
        const data = await res.json();

        if (data.error) {
            weatherInfo.innerHTML = `<p>${data.error}</p>`;
        } else {
            weatherInfo.innerHTML = `
                <p>${data.city}, ${data.country}</p>
                <p>${data.temp}°C - ${data.description}</p>
                <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather Icon">
            `;
        }
    } catch (err) {
        weatherInfo.innerHTML = `<p>Could not fetch weather info</p>`;
    }
});