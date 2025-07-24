// Live Clock
function updateClock() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('live-clock').textContent = now.toLocaleDateString('en-US', options);
    setTimeout(updateClock, 1000);
}
updateClock();

// Dark Mode Toggle
document.getElementById('dark-mode-checkbox').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
});

// Initialize dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-checkbox').checked = true;
}

// Weather Form
document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    
    try {
        const response = await fetch('/get_weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `city=${encodeURIComponent(city)}`
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        document.getElementById('city-name').textContent = data.city;
        document.getElementById('temp').textContent = `${data.temp}°C`;
        document.getElementById('description').textContent = data.description;
        document.getElementById('humidity').textContent = `💧 Humidity: ${data.humidity}%`;
        document.getElementById('weather-icon').innerHTML = 
            `<img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">`;
    } catch (error) {
        alert(`Weather error: ${error.message}`);
    }
});

// To-Do List
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load saved todos
function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoItem(todo));
}

// Add new todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task) {
        addTodoItem(task);
        todoInput.value = '';
        saveTodos();
    }
});

function addTodoItem(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn">×</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            saveTodos();
        }, 300);
    });
    todoList.appendChild(li);
}

function saveTodos() {
    const tasks = [...todoList.querySelectorAll('li span')].map(t => t.textContent);
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Initialize
loadTodos();

// News Loader
let currentNewsIndex = 0;
const newsContainer = document.getElementById('news-container');

async function loadNews() {
    try {
        const response = await fetch('/get_news');
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        newsContainer.innerHTML = '';
        data.articles.forEach((article, index) => {
            const articleEl = document.createElement('div');
            articleEl.className = 'news-item';
            articleEl.innerHTML = `
                <div class="news-badge">${article.source}</div>
                <h3>${article.title}</h3>
                <p class="news-excerpt">${article.description || 'No description available'}</p>
                <div class="news-footer">
                    <span class="news-source">${article.source}</span>
                    <a href="${article.url}" target="_blank" class="read-more">Read Story →</a>
                </div>
            `;
            newsContainer.appendChild(articleEl);
        });
    } catch (error) {
        console.error('News load error:', error);
        newsContainer.innerHTML = `<p class="error">Failed to load news. Please try again later.</p>`;
    }
}

// News Navigation
document.getElementById('news-prev').addEventListener('click', () => {
    if (currentNewsIndex > 0) {
        currentNewsIndex--;
        newsContainer.scrollBy({ top: -300, behavior: 'smooth' });
    }
});

document.getElementById('news-next').addEventListener('click', () => {
    currentNewsIndex++;
    newsContainer.scrollBy({ top: 300, behavior: 'smooth' });
});

// Initialize news
loadNews();