var APIkey = "19c51255668e36926db7807f46f27e32"

var inputCity = document.getElementById("city-input");
inputCity.addEventListener("change", handleChange);
var testCity;
function handleChange(e) {
    // console.log(e.target.value)
    testCity = e.target.value;
}
var testStateCode = "TX";
var testCountryCode = "USA";

var lat
var lon

var currentTemperature
var currentHumidity
var currentWindSpeed 

async function getAllWeather() {
    await getCoordinates(testCity).then((res)=>{
        console.log(res)
        getCurrentWeather()
        getUpcomingWeather()

    })

}
async function getCurrentWeather() {
    console.log("test")
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`);
    var currentWeather = await response.json();
    console.log("currentWeather", currentWeather);

}


async function getUpcomingWeather() {
    console.log(testCity);
     

    // console.log(lat, lon);
    var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`);
    var weatherData = await response.json();
    console.log(weatherData);


}


async function getCoordinates(testCity) {
    var testing = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${testCity}&limit=1&appid=${APIkey}`);

    await testing.json().then((res)=>{
        console.log("coordinates response", res)
        lat = res[0].lat
        lon = res[0].lon

    })

}

// getCurrentWeather()
