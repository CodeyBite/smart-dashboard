import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

API_KEY = os.getenv("API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/time')
def get_time():
    from datetime import datetime
    now = datetime.now()
    current_time = now.strftime("%I:%M:%S %p")
    return jsonify(time=current_time)

@app.route('/weather')
def get_weather():
    city = request.args.get('city')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'City not found!'})
    
    data = response.json()
    weather = {
        'city': data['name'],
        'temp': data['main']['temp'],
        'description': data['weather'][0]['description'],
        'humidity': data['main']['humidity']
    }
    return jsonify(weather)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)