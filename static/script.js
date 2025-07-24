// TIME CLOCK
function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  timeElement.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// DARK MODE TOGGLE
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", toggle.checked);
});

// WEATHER FETCH
document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.getElementById("cityInput").value;
  fetch(`/weather?city=${encodeURIComponent(city)}`)
    .then((response) => response.json())
    .then((data) => {
      const weatherBox = document.getElementById("weather-box");
      if (data.error) {
        weatherBox.innerHTML = `<p>${data.error}</p>`;
      } else {
        weatherBox.innerHTML = `
          <h3>${data.city}</h3>
          <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather Icon">
          <p>${data.description}</p>
          <p>${data.temp}°C</p>
        `;
      }
    })
    .catch(() => {
      document.getElementById("weather-box").innerHTML = `<p>Failed to fetch weather</p>`;
    });
});