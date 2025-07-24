import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

API_KEY = os.getenv("WEATHER_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/time')
def get_time():
    from datetime import datetime
    import pytz
    
    ist = pytz.timezoe('Asia/Kolkata')
    now = datetime.now(ist)
    time_str = now.strftime("%I:%M %p")
    date_str = now.strftime("%A, %d %B %Y")

@app.route('/weather')
def get_weather():
    city = request.args.get('city')
    API_KEY = os.getenv("WEATHER_API_KEY")  # Make sure this is set on Render
    if not API_KEY:
        return {"error": "API key missing"}

    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200 or "main" not in data:
            return {"error": "City not found or API issue"}

        weather = {
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"].capitalize(),
            "city": data["name"]
        }
        return weather

    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
