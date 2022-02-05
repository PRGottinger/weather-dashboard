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
            var dateContent = new Date(weatherData.daily[i].dt * 1000);
            var cardEl = document.createElement("div");
            cardEl.className = "card";

            var cardIconEl = document.createElement("div");
            cardIconEl.textContent = weatherData.daily[i].weather[0].main;

            var weatherIcon = $("<img>");

            if (cardIconEl === "Clouds") {
              weatherIcon.attr(
                "src",
                "https://img.icons8.com/color/48/000000/cloud.png"
              );
            } else if (cardIconEl === "Clear") {
              weatherIcon.attr(
                "src",
                "https://img.icons8.com/color/48/000000/summer.png"
              );
            } else if (cardIconEl === "Snow") {
              weatherIcon.attr(
                "src",
                "https://img.icons8.com/color/48/000000/snow.png"
              );
            } else if (cardIconEl === "Rain") {
              weatherIcon.attr(
                "src",
                "https://img.icons8.com/color/48/000000/rain.png"
              );
            }

            var cardDateEl = document.createElement("div");
            // cardDateEl.className = "card";
            cardDateEl.textContent = dateContent.toLocaleDateString();

            var cardTempEl = document.createElement("div");
            // cardTempEl.className = "card";
            cardTempEl.textContent = weatherData.daily[i].temp.max;

            var cardWindEl = document.createElement("div");
            cardWindEl.textContent = weatherData.daily[i].wind_speed;

            cardEl.appendChild(cardDateEl);
            cardEl.appendChild(cardIconEl);
            cardEl.appendChild(cardTempEl);
            cardEl.appendChild(cardWindEl);

            document.querySelector("#forcast").appendChild(cardEl);

            // document.querySelector("#forcast").innerHTML +=
            //   "<div class='card'>" +
            //   (dateContent.toLocaleDateString() + "</div>");

            // var tempContent = weatherData.daily[i].temp.max;
            // document.querySelector("#forcast").innerHTML +=
            //   "<div class='card'>" + (tempContent + "</div>");
            i += 1;
          }
        });
    });
}
