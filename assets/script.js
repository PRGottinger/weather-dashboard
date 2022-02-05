var submitButton = document.querySelector("#city-search");
submitButton.addEventListener("click", getWeatherData);

var cityInfo = document.querySelector("#city");

var apiKey = "73bbd2f586aef621510ff0f4728c0bc6";

function getWeatherData() {
  var cityInfo = document.querySelector("#city");
  var cityName = cityInfo.value;

  document.querySelector("#city-name").textContent = cityName;

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

      var weatherFiveDayURL = fetch(weatherURL)
        .then((response) => response.json())
        .then(function (weatherData) {
          console.log(weatherData);

          document.querySelector("#temp").textContent =
            weatherData.current.temp;

          document.querySelector("#wind").textContent =
            weatherData.current.wind_speed;

          document.querySelector("#humidity").textContent =
            weatherData.current.humidity;

          document.querySelector("#uv").textContent = weatherData.current.uvi;

          var i = 0;
          while (i < 5) {
            var content = new Date(weatherData.daily[i].dt * 1000);
            document.querySelector("#deez-nutz").innerHTML +=
              "<div class='card'>" + (content.toLocaleDateString() + "</div>");
            i += 1;
          }
        });
    });
}
