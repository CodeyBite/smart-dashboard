# 🌐 Smart Dashboard

A feature-rich dashboard with real-time weather, news, and task management. Built with Flask, Python, and modern CSS/JS.
 
*Live demo: https://smart-dashboard-yw5p.onrender.com/
## ✨ Features

- **Real-Time Data**
  - Live clock with date display
  - Current weather by city (OpenWeatherMap API)
  - Top 10 news headlines (NewsAPI)

- **Productivity Tools**
  - Interactive to-do list (Add/Delete tasks)
  - Local storage persistence

- **Modern UI**
  - Dark/Light mode toggle
  - Responsive grid layout
  - Animated transitions
  - Weather icons with visual clarity

## 🛠️ Tech Stack

| Component       | Technology |
|-----------------|------------|
| Frontend        | HTML5, CSS3, Vanilla JS |
| Backend         | Python Flask |
| APIs            | OpenWeatherMap, NewsAPI |
| Deployment      | Render |
| CSS Framework   | Custom (No Bootstrap) |

## 🚀 Deployment

1. **Set up on Render**
   ```bash
   # Environment variables
   OWM_API_KEY=your_openweathermap_key
   NEWS_API_KEY=your_newsapi_key
   ```

2. **Build Commands**
   ```bash
   pip install -r requirements.txt
   gunicorn app:app
   ```

## 📂 Project Structure

```
smart-dashboard/
├── static/           # Frontend assets
│   ├── script.js     # All interactive logic
│   └── style.css     # Responsive styles
├── templates/
│   └── index.html    # Main dashboard UI
├── app.py            # Flask backend
└── requirements.txt  # Python dependencies
```

## 🎨 UI Highlights

| Feature          | Implementation Details |
|------------------|------------------------|
| Weather Display  | High-res OpenWeatherMap icons with hover effects |
| News Cards       | Source badges, smooth scrolling, and excerpt previews |
| Dark Mode        | CSS variables with localStorage persistence |
| Mobile Friendly  | Flexbox/grid with mobile-first breakpoints |

## 💡 Development Tips

```bash
# Local setup
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows
pip install -r requirements.txt
flask run
```

## 📜 License

MIT © [CodeyBite]  
*Weather data provided by [OpenWeatherMap](https://openweathermap.org/)*  
*News data from [NewsAPI](https://newsapi.org/)*
