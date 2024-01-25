const button = document.getElementById("w-button");
const saveButton = document.getElementById("saveButton");
const deleteButton = document.getElementById("deleteButton");
const cityInput = document.getElementById("cityInput");
const resultsContainer = document.getElementById("weather-results");
const key = "YOUR API KEY";
// require(‘dotenv’).config()

//Check for existing weather data in local storage when page loads
const storedWeatherData = localStorage.getItem("weatherData");
if (storedWeatherData) {
  resultsContainer.innerHTML = storedWeatherData;
}

button.addEventListener("click", () => {
  getWeather();
});

saveButton.addEventListener("click", () => {
  saveToLocalStorage();
});

deleteButton.addEventListener("click", () => {
  deleteFromLocalStorage();
});

function getWeather() {
  const city = cityInput.value.trim();
  cityInput.value = "";
  fetchWeatherData(city);
}

function renderWeather(weather) {
  resultsContainer.innerHTML = "";

  var city = document.createElement("h2");
  city.textContent = `Weather in ${weather.name}`;
  resultsContainer.append(city);

  var temp = document.createElement("p");
  temp.textContent = `Temp: ${weather.main.temp} °F`;
  resultsContainer.append(temp);

  var humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${weather.main.humidity} %`;
  resultsContainer.append(humidity);

  var wind = document.createElement("p");
  wind.textContent = `Wind: ${weather.wind.speed} mph, ${weather.wind.deg}°`;
  resultsContainer.append(wind);
}

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch weather data. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => renderWeather(data))
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      resultsContainer.innerHTML =
        "Error fetching weather data. Please try again.";
    });
}

function saveToLocalStorage() {
  const weatherData = resultsContainer.innerHTML;
  localStorage.setItem("weatherData", weatherData);
  alert("Your weather has been saved to local storage");
}

function deleteFromLocalStorage() {
  localStorage.removeItem("weatherData");
  alert("You weather data has been deleted from local storage");
}
// );
