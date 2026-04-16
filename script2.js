const apiKey = "7587bb49d74189c4ec71650ade316852";

/* =========================
   GET WEATHER BY CITY
========================= */
async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  displayWeather(data);
  getForecast(city);
}

/* =========================
   GET WEATHER BY LOCATION
========================= */
function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    displayWeather(data);
    getForecast(data.name);
  });
}

/* =========================
   DISPLAY CURRENT WEATHER
========================= */
function displayWeather(data) {
  if (data.cod !== 200) {
    alert("City not found");
    return;
  }

  document.getElementById("weatherCard").style.display = "block";

  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;

  const icon = data.weather[0].icon;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

/* =========================
   5-DAY FORECAST
========================= */
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const daily = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  daily.slice(0, 5).forEach(day => {
    const date = new Date(day.dt_txt).toLocaleDateString();
    const temp = day.main.temp;
    const icon = day.weather[0].icon;

    forecastDiv.innerHTML += `
      <div>
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png">
        <p>${temp}°C</p>
      </div>
    `;
  });
}

/* =========================
   DARK MODE
========================= */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}