from flask import Flask, render_template, request, jsonify
import requests
import datetime
import pytz
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.form['city']
    api_key = os.getenv("WEATHER_API_KEY")
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        weather_info = {
            'city': city.title(),
            'temp': data['main']['temp'],
            'desc': data['weather'][0]['description'].title(),
            'icon': data['weather'][0]['icon']
        }
        return render_template("index.html", weather=weather_info)
    else:
        return render_template("index.html", error="City not found")

@app.route('/news')
def news():
    api_key = os.getenv("NEWS_API_KEY")
    url = f"https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey={api_key}"
    response = requests.get(url)
    articles = []
    if response.status_code == 200:
        data = response.json()
        articles = data.get('articles', [])
    return jsonify(articles)

@app.route('/time')
def time():
    india_time = datetime.datetime.now(pytz.timezone("Asia/Kolkata"))
    return jsonify({'time': india_time.strftime("%I:%M:%S %p")})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
