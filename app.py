from flask import Flask, render_template, request, redirect, url_for
import requests
import os
from datetime import datetime
import pytz

app = Flask(__name__)
to_do_items = []

@app.route("/", methods=["GET", "POST"])
def index():
    weather_data = None
    city = "Surat"  # default city

    if request.method == "POST":
        if "city" in request.form:
            city = request.form["city"]
        if "task" in request.form:
            task = request.form["task"]
            if task:
                to_do_items.append(task)

    api_key = os.getenv("WEATHER_API_KEY")
    if api_key and city:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            weather_data = {
                "city": city,
                "temperature": round(data["main"]["temp"]),
                "description": data["weather"][0]["description"].title(),
                "icon": data["weather"][0]["icon"]
            }

    # Get local time
    tz = pytz.timezone("Asia/Kolkata")
    current_time = datetime.now(tz).strftime("%I:%M %p")

    return render_template("index.html", weather=weather_data, time=current_time, tasks=to_do_items)

@app.route("/delete/<int:index>")
def delete(index):
    if 0 <= index < len(to_do_items):
        del to_do_items[index]
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
