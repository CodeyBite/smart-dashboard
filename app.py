from flask import Flask, render_template, request
import requests
import os
from datetime import datetime
import pytz

app = Flask(__name__)

# Get current time and date in IST
def get_time_date():
    ist = pytz.timezone('Asia/Kolkata')
    now = datetime.now(ist)
    time_str = now.strftime("%I:%M %p")
    date_str = now.strftime("%A, %d %B %Y")
    return time_str, date_str

# Get weather info using OpenWeatherMap API
def get_weather(city):
    API_KEY = os.getenv("WEATHER_API_KEY")
    if not API_KEY:
        return {"error": "API key not found. Please set WEATHER_API_KEY in your environment."}

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200 or "main" not in data:
            return {"error": f"City '{city}' not found or API error."}

        return {
            "temperature": round(data["main"]["temp"]),
            "description": data["weather"][0]["description"].capitalize(),
            "city": data["name"]
        }
    except Exception as e:
        return {"error": f"Error fetching weather: {str(e)}"}

@app.route("/", methods=["GET", "POST"])
def dashboard():
    time_str, date_str = get_time_date()
    city = "Surat"  # Default city
    if request.method == "POST":
        city = request.form.get("city") or "Surat"

    weather = get_weather(city)
    return render_template("dashboard.html", time=time_str, date=date_str, weather=weather, city=city)

if __name__ == "__main__":
    app.run(debug=True)