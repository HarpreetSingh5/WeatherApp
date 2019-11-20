"use strict";


//Variable Initialisations /////////////////////////////////
var searchButton = document.querySelector('#searchbutton');
var searchCity = document.querySelector('#city');
var loadingText = document.querySelector('#load');

var weatherBox = document.querySelector('#weather');
var weatherCity = weatherBox.firstElementChild;
var weatherDescription = document.querySelector('#weatherDescription');
var weatherTemperature = weatherBox.lastElementChild;

function Weather(yourcity, description) { // General Object constructor that we'll usue later.
  this.city = yourcity;
  this.details = description;
  this._details = '';
  this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
  get: function() {
    return this._temperature;
  },
  set: function(value) {
    this._temperature = (value * 1.8 + 32).toFixed(2) + 'F'; //this means temperature is actually a function that updates the _temperature field with a farenheight value of the temp.
  }
});


function searchWeather() {
  var cityName = searchCity.value;
  if (cityName.trim().length == 0) {
    return alert("Please Enter a City name");
  }
  var http = new XMLHttpRequest(); //creating http request object
  var apiKey = '4e70a151c3b908734e191ab3ba7ef6a8';
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;

  http.open('GET', url);
  http.onreadystatechange = function() { // this is the event handler for state change
    if (http.readyState == XMLHttpRequest.DONE && http.status == 200) { // case where we sent  request and got data back
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(cityName, data.weather[0].description);
      weatherData.temperature = data.main.temp;
      updateWeather(weatherData);

    } else if (http.readyState === XMLHttpRequest.DONE) { // where we sent request but no data was returned
      return alert("Something went horribly wrong");
    }
  };
  http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.city;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}

searchButton.addEventListener('click', searchWeather);