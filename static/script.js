// Live Clock
function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').textContent = now.toLocaleString();
    setTimeout(updateClock, 1000);
}
updateClock();

// Dark Mode Toggle
document.getElementById('dark-mode-checkbox').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked);
});

// Initialize dark mode from localStorage
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
        document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.icon}.png`;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Load News
async function loadNews() {
    try {
        const response = await fetch('/get_news');
        const data = await response.json();
        
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';
        
        data.articles.forEach(article => {
            const articleEl = document.createElement('div');
            articleEl.className = 'news-item';
            articleEl.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more →</a>
            `;
            newsContainer.appendChild(articleEl);
        });
    } catch (error) {
        console.error('News load error:', error);
    }
}
loadNews();