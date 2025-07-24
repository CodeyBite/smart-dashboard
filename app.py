from flask import Flask, render_template, request
import requests
import os
from dotenv import load_dotenv
from datetime import datetime
import pytz

# Load environment variables
load_dotenv()

app = Flask(__name__)

@app.route("/")
def home():
    # Weather Section
    weather_api_key = os.getenv("WEATHER_API_KEY")
    city = "Mumbai"  # Default city
    weather_data = None

    if weather_api_key:
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_api_key}&units=metric"
        response = requests.get(weather_url)
        if response.status_code == 200:
            weather_data = response.json()

    # Time Section (India Time)
    india_timezone = pytz.timezone("Asia/Kolkata")
    india_time = datetime.now(india_timezone).strftime("%I:%M %p")
    india_date = datetime.now(india_timezone).strftime("%A, %d %B %Y")

    # News Section
    news_api_key = os.getenv("NEWS_API_KEY")
    articles = []
    if news_api_key:
        news_url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={news_api_key}"
        news_response = requests.get(news_url)
        if news_response.status_code == 200:
            data = news_response.json()
            articles = data.get("articles", [])[:10]  # Get top 10

    return render_template("index.html",
                           weather=weather_data,
                           time=india_time,
                           date=india_date,
                           articles=articles)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
