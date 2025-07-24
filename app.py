from flask import Flask, render_template, request
import requests
import os
from datetime import datetime
import pytz

from dotenv import load_dotenv 
load_dotenv()

app = Flask(__name__)

# Make sure API key is loaded at the top level
api_key = os.environ.get('WEATHER_API_KEY')  # Set this in Render Environment Variables

# Get current time and date in IST
def get_time_date():
    ist = pytz.timezone('Asia/Kolkata')
    now = datetime.now(ist)
    time_str = now.strftime("%I:%M %p")
    date_str = now.strftime("%A, %d %B %Y")
    return time_str, date_str

# Fetch weather data
def get_weather(city):
    if not city:
        return None
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    if response.status_code == 200:
        return {
            "description": data["weather"][0]["description"],
            "temp": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind": data["wind"]["speed"]
        }
    else:
        return None

# Main route
@app.route("/", methods=["GET", "POST"])
def dashboard():
    time_str, date_str = get_time_date()
    city = "Surat"  # Default city
    if request.method == "POST":
        city = request.form.get("city") or "Surat"

    weather = get_weather(city)
    return render_template("index.html", time=time_str, date=date_str, weather=weather, city=city)

@app.route('/news')
def get_news():
    api_key = os.getenv("NEWS_API_KEY")
    url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={api_key}"

    response = requests.get(news_url)
    articles = []
    if response.status_code == 200:
        data = response.json()
    articles == data['articles'][:10]  # Limit to top 10 news
    
    return
render_template("index.html", articles=articles)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
