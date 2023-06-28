let currentDate = new Date();
let today = document.querySelector("#today");
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = dayNames[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
let formattedTime = `${currentDay} ${currentHour}:${currentMinutes}`;

today.innerHTML = formattedTime;

let apiKey = "7add5384ea7cc597f7f5d9570fba1868";
let city = "";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

function weatherDetails(response) {
  let getTemp = Math.round(response.data.main.temp);
  let weatherCelsius = (document.querySelector(
    "#temperature"
  ).innerHTML = `${getTemp}<span class="celsign"> °C</span>`);

  let getHum = Math.round(response.data.main.humidity);
  let humDetails = (document.querySelector(
    ".hum"
  ).innerHTML = `Humidity: ${getHum}%`);

  let getWind = Math.round(response.data.wind.speed);
  let windDetails = (document.querySelector(
    ".win"
  ).innerHTML = `Wind: ${getWind} km/h`);

  let getWeather = response.data.weather[0].main;
  let weatherDetailsEl = document.querySelector(".details");
  weatherDetailsEl.innerHTML = getWeather;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherDetails);
}

searchCity("New York");
function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form input");
  let cityText = document.querySelector("#cityText");
  let inputValue = searchInput.value.trim();
  if (inputValue === "") {
    alert("Please enter a city in the search field.");
  } else {
    city = inputValue;
    cityText.textContent = inputValue;
    searchCity(city);
  }
}

let searchForm = document.querySelector(".search-form");
let submitButton = document.querySelector(".search-form .btn-one");

searchForm.addEventListener("submit", searchSubmit);
submitButton.addEventListener("click", searchSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then((response) => {
    let currentCity = response.data.name;
    let cityText = document.querySelector("#cityText");
    cityText.textContent = currentCity;

    weatherDetails(response);
  });
}

let currentLocation = document.querySelector(".btn-two");
currentLocation.addEventListener("click", getCurrentLocation);
searchCity("New York");
