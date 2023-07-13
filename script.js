var APIkey = "19c51255668e36926db7807f46f27e32";

var inputCity = document.getElementById("city-input");
inputCity.addEventListener("change", handleChange);
var selectedCity;
function handleChange(e) {
  // console.log(e.target.value)
  selectedCity = e.target.value;
}

var lat;
var lon;

var currentTemperature;
var currentHumidity;
var currentWindSpeed;

async function getAllWeather() {

if (!selectedCity) {
    alert("Please enter a city");
    return;
}  
//update city
  document.getElementById("current-city").textContent = selectedCity;
// update date
  document.getElementById("current-date").textContent = dayjs().format("MM/DD/YYYY");





  await getCoordinates(selectedCity).then(() => {
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

  // update temp
  document.getElementById("current-temp").textContent = currentTemperature;
//update humidity
  document.getElementById("current-humidity").textContent = currentHumidity;
//update wind speed
  document.getElementById("current-wind").textContent = currentWindSpeed;

  // update the display attribute to make it visible (it's hidden by default) 
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
  // update temp, humidity, wind speed for 5 days
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
