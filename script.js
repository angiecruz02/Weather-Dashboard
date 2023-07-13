var APIkey = "19c51255668e36926db7807f46f27e32";

var inputCity = document.getElementById("city-input");
inputCity.addEventListener("change", handleChange);
var selectedCity;
function handleChange(e) {
  selectedCity = e.target.value;
}

var lat;
var lon;

var currentTemperature;
var currentHumidity;
var currentWindSpeed;
var searchHistory = {};

async function getAllWeather(city = selectedCity) {
console.log("city", city);
if (!city) {
    alert("Please enter a city");
    return;
}  
document.getElementById("loader").setAttribute("style", "display: block");
  document.getElementById("current-city").textContent = city;
  document.getElementById("current-date").textContent = dayjs().format("MM/DD/YYYY");

  await getCoordinates(city).then(() => {
    getCurrentWeather();
    getUpcomingWeather();
    document.getElementById("loader").setAttribute("style", "display: none");
    document.getElementById("city-input").value = "";

    if (!searchHistory[city]) {
      var searchEntryButton = createButton(city, `getAllWeather("${city}")`);
      console.log("searchEntryButton", searchEntryButton)
      document.getElementById("search-box").appendChild(searchEntryButton);
      searchHistory[city] = true;
    }
    selectedCity = "";
  });
}
async function getCurrentWeather() {
  console.log("test");
  var response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
  );
  var currentWeather = await response.json();
  console.log("currentWeather", currentWeather);
  currentTemperature = currentWeather.main.temp;
  currentHumidity = currentWeather.main.humidity;
  currentWindSpeed = currentWeather.wind.speed;

  document.getElementById("current-temp").textContent = currentTemperature;
  document.getElementById("current-humidity").textContent = currentHumidity;
  document.getElementById("current-wind").textContent = currentWindSpeed;
  document.getElementById("current-weather").setAttribute("style", "display: block");

}

async function getUpcomingWeather() {
  console.log(selectedCity);
 
  // console.log(lat, lon);
  var response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
  );
  var weatherData = await response.json();
  console.log(weatherData);
  var upcomingWeather = weatherData.list;

  var weekDates = []; 
  for (var i = 0; i < 5; i++) {
    var date = dayjs().add(i + 1, "day")
    weekDates.push(date);
    document.getElementById(`day${i}`).querySelector("h3").textContent = date.format("MM/DD/YYYY");;
  }
  console.log("weekDates", weekDates[0]+" 15:00:00");

  var startingIndex = upcomingWeather.map(function(e) { 
    console.log("dt_txt", e.dt_txt);
    return e.dt_txt; 
  }).indexOf(weekDates[0].format("YYYY-MM-DD")+" 15:00:00");
console.log("starting index", startingIndex);
var dayElementIndex = 0;  
  for (var i = startingIndex; i < upcomingWeather.length; i+=8) {
    console.log("i", i);
    var currentDay = upcomingWeather[i];
    var currentDayTemperature = currentDay.main.temp;
    var currentDayHumidity = currentDay.main.humidity;
    var currentDayWind = currentDay.wind.speed;

    document.querySelector(`#temp-day-${dayElementIndex}`).textContent = currentDayTemperature;
    document.querySelector(`#humidity-day-${dayElementIndex}`).textContent = currentDayHumidity;
    document.querySelector(`#wind-day-${dayElementIndex}`).textContent = currentDayWind;
 dayElementIndex++;
  }

  document.getElementById("forecast-weather-header").setAttribute("style", "display: block");
  document.getElementById("forecast-weather").setAttribute("style", "display: flex");
}

async function getCoordinates(selectedCity) {
  var testing = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${APIkey}`
  );

  await testing.json().then((res) => {
    console.log("coordinates response", res);
    lat = res[0].lat;
    lon = res[0].lon;
  });
}

function createButton(buttonText, onclickValue) {
  var currentButton = document.createElement("button"); 
  currentButton.innerText = buttonText; 
  currentButton.setAttribute("onclick", onclickValue); 
  return currentButton;
}