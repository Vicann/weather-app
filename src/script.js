let now = new Date();
formateDate(now);

function formateDate(currentDate) {
  let time = document.querySelector("#date");
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = weekdays[now.getDay()];
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  time.innerHTML = `${currentDay} ${currentHour}:${currentMin}`;
}

function getInfo(event) {
  event.preventDefault();
  let textInput = document.querySelector("#citySearch");
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.value}&appid=${apiKey}&units=metric`;

  // let word = textInput.value;
  //let str = word.charAt(0).toUpperCase() + word.slice(1);

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let tempVal = document.querySelector("#temperature");
  let windVal = document.querySelector("#wind");
  let humidityVal = document.querySelector("#humidity");
  let cityName = document.querySelector(".city");
  let placeHolder = document.querySelector("#weather-description");
  tempVal.innerHTML = temp;
  windVal.innerHTML = `Wind: ${wind} km/h`;
  humidityVal.innerHTML = `Humidity: ${humidity}%`;
  cityName.innerHTML = response.data.name;
  placeHolder.innerHTML = description;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", getInfo);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentWind = response.data.wind.speed;
  let currentHumidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let tempVal = document.querySelector("#temperature");
  let windVal = document.querySelector("#wind");
  let humidityVal = document.querySelector("#humidity");
  let currentPlaceHolder = document.querySelector("#weather-description");
  let currentCityName = document.querySelector(".city");

  windVal.innerHTML = `Wind: ${currentWind} km/h`;
  humidityVal.innerHTML = `Humidity: ${currentHumidity}%`;
  tempVal.innerHTML = currentTemp;
  currentPlaceHolder.innerHTML = description;
  currentCityName = response.data.name;
}

let currentForm = document.querySelector("#current");
currentForm.addEventListener("submit", currentPosition);

navigator.geolocation.getCurrentPosition(currentPosition);
