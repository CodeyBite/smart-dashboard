from flask import Flask, render_template, request, redirect, url_for
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Store to-do items in memory (will reset on restart)
todo_items = []

@app.route("/", methods=["GET", "POST"])
def home():
    weather = None
    error = None

    if request.method == "POST":
        city = request.form.get("city")
        if city:
            weather_api = os.getenv("WEATHER_API_KEY")
            weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_api}&units=metric"

            response = requests.get(weather_url)
            if response.status_code == 200:
                data = response.json()
                weather = {
                    "city": data["name"],
                    "temp": data["main"]["temp"],
                    "description": data["weather"][0]["description"].title(),
                    "icon": data["weather"][0]["icon"]
                }
            else:
                error = "City not found."

    # Get top 10 news headlines
    news_api = os.getenv("NEWS_API_KEY")
    news_url = f"https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey={news_api}"
    articles = []

    try:
        news_response = requests.get(news_url)
        if news_response.status_code == 200:
            news_data = news_response.json()
            articles = news_data.get("articles", [])[:10]
    except:
        articles = []

    return render_template("index.html", weather=weather, error=error, articles=articles, todo_items=todo_items)

@app.route("/add", methods=["POST"])
def add():
    item = request.form.get("todo")
    if item:
        todo_items.append(item)
    return redirect(url_for("home"))

@app.route("/delete/<int:index>")
def delete(index):
    if 0 <= index < len(todo_items):
        del todo_items[index]
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
