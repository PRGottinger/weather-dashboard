var submitButton = document.querySelector("#city-search");
submitButton.addEventListener("click", getWeatherData);

var apiKey = "73bbd2f586aef621510ff0f4728c0bc6";

function getWeatherData() {
  var cityInfo = document.querySelector("#city");
  var cityName = cityInfo.value;
  var geoCodingURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=" +
    apiKey;

  fetch(geoCodingURL)
    .then((response) => response.json())
    .then(function (geoData) {
      console.log(geoData);
      var lat = geoData[0].lat;
      var lon = geoData[0].lon;
      var weatherURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=" +
        apiKey;

      fetch(weatherURL)
        .then((response) => response.json())
        .then(function (weatherData) {
          console.log(weatherData);

          document.querySelector("#temp").textContent =
            weatherData.current.temp;
        });
    });
}
