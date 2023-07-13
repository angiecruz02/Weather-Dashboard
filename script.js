var APIkey = "19c51255668e36926db7807f46f27e32";

var inputCity = document.getElementById("city-input");
inputCity.addEventListener("change", handleChange);
var testCity;
function handleChange(e) {
  // console.log(e.target.value)
  testCity = e.target.value;
}
var testStateCode = "TX";
var testCountryCode = "USA";

var lat;
var lon;

var currentTemperature;
var currentHumidity;
var currentWindSpeed;

async function getAllWeather() {
  await getCoordinates(testCity).then(() => {
    getCurrentWeather();
    getUpcomingWeather();
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
  alert(currentTemperature);
  alert(currentHumidity);
  alert(currentWindSpeed);
}

async function getUpcomingWeather() {
  console.log(testCity);

  // console.log(lat, lon);
  var response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
  );
  var weatherData = await response.json();
  console.log(weatherData);
}

async function getCoordinates(testCity) {
  var testing = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${testCity}&limit=1&appid=${APIkey}`
  );

  await testing.json().then((res) => {
    console.log("coordinates response", res);
    lat = res[0].lat;
    lon = res[0].lon;
  });
}

// getCurrentWeather()

getUpcomingWeather() 

// 5 day forecast for the city that was searched for in the search bar (use the lat and lon from the previous API call) (https://openweathermap.org/forecast5) (https://openweathermap.org/api/one-call-api) (https://openweathermap.org/api/hourly-forecast) 
// UV index for the city that was searched for in the search bar (use the lat and lon from the previous API call) (https://openweathermap.org/api/uvi)  (https://openweathermap.org/api/one-call-api) (https://openweathermap.org/api/hourly-forecast) 
// Save the city that was searched for in the search bar to local storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
// Display the city that was searched for in the search bar on the page (https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces)
// Display the current date on the page (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
// Display the current weather conditions for the city that was searched for in the search bar on the page (https://openweathermap.org/current) (https://openweathermap.org/api/one-call-api) (https://openweathermap.org/api/hourly-forecast)