var submitButton = document.querySelector("#city-search");
submitButton.addEventListener("click", getWeatherData);
var cityList = $("#city-list");
// var city1 = $("#city");
// console.log(city1);
var cities = [];

var cityInfo = document.querySelector("#city");

var apiKey = "73bbd2f586aef621510ff0f4728c0bc6";

function getWeatherData() {
  var cityInfo = document.querySelector("#city");
  var cityName = cityInfo.value;
  var saveCity = localStorage.setItem("city-list", JSON.stringify(cityName));
  var printCity = localStorage.getItem("city-list");

  // $("#add-city").on("click", function (event) {
  //   event.preventDefault();

  //   var city = $("#city").val().trim();

  //   cities.push(city);
  // });

  // function storeCities() {
  //   // Stringify and set "cities" key in localStorage to cities array
  //   localStorage.setItem("cities", JSON.stringify(cities));
  //   console.log(localStorage);
  // }

  // function renderCities() {
  //   // Clear cityList element
  //   // cityList.text = "";
  //   // cityList.HTML = "";
  //   cityList.empty();

  //   // Render a new li for each city
  //   for (var i = 0; i < cities.length; i++) {
  //     var city = cities[i];

  //     var li = $("<li>").text(city);

  //     cityList.prepend(li);
  //   }
  // }

  // var citiesArray = JSON.parse(printCity);
  // document.getElementById("city-list").innHTML = citiesArray;
  // document.getElementById("city-list").appendChild(ul);

  // console.log(printCity);

  document.querySelector("#city-name").textContent = cityName;
  document.querySelector("#city-list").textContent = cityName;

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
            cardIconEl.textContent = weatherData.daily[i].weather[0].icon;

            var openWeatherIcon = `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`;
            let weatherIcon = document.createElement("img");
            weatherIcon.src = openWeatherIcon;

            cardEl.appendChild(weatherIcon);

            var cardDateEl = document.createElement("div");
            // cardDateEl.className = "card";
            cardDateEl.textContent = dateContent.toLocaleDateString();

            var cardTempEl = document.createElement("div");
            // cardTempEl.className = "card";
            cardTempEl.textContent =
              "Temp: " + weatherData.daily[i].temp.max + " °F";

            var cardWindEl = document.createElement("div");
            cardWindEl.textContent =
              "Wind Speed: " + weatherData.daily[i].wind_speed + " MPH";

            cardEl.appendChild(cardDateEl);

            cardEl.appendChild(cardTempEl);
            cardEl.appendChild(cardWindEl);

            document.querySelector("#forecast").appendChild(cardEl);

            i++;
          }
        });
    });
}
