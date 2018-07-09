import "./styles/styles.scss";
import moment from "moment";

import { inputLocation, userInput } from './requests';

const outputLocation = document.querySelector(".output-location"),
      outputTemp = document.querySelector(".output-temp"),
      tempFormat = document.querySelector(".temp-format"),
      btnCelcius = document.querySelector(".celcius"),
      btnFarenheit = document.querySelector(".farenheit"),
      minTemp = document.querySelector("#min-temp"),
      maxTemp = document.querySelector("#max-temp"),
      classFar = document.querySelector(".far"),
      classCel = document.querySelector(".cel"),
      mphKph = document.querySelector(".mph-kph"),
      outputDesc = document.querySelector(".output-desc"),
      outputMaxTemp = document.querySelector(".output-max-temp"),
      outputMinTemp = document.querySelector(".output-min-temp"),
      outputWind = document.querySelector(".output-wind"),
      outputHumidity = document.querySelector(".output-humidity"),
      outputSunrise = document.querySelector(".output-sunrise"),
      outputSunset = document.querySelector(".output-sunset"),
      app = document.querySelector(".app"),
      loader = document.querySelector(".loader"),
      btnInput = document.querySelector(".btn-input"),
      myLocation = document.querySelector(".my-location"),
      headline = document.querySelector(".headline"),
      clearSky = document.querySelector("#clearsky"),
      fewClouds = document.querySelector("#few-clouds"),
      clouds = document.querySelector("#clouds"),
      rain = document.querySelector("#rain"),
      storm = document.querySelector("#storm"),
      snow = document.querySelector("#snow"),
      nightClearSky = document.querySelector("#night-clearsky"),
      nightClouds = document.querySelector("#night-clouds"),
      wind = document.querySelector("#wind"),
      mist = document.querySelector("#mist");
 

// USER MANUAL LOCATION INPUT BUTTON
btnInput.addEventListener("click", function() {
	const userLocInput = document.querySelector(".user-location-input").value;
    userInput(userLocInput);
    document.querySelector(".user-location-input").value = "";
});

// KEYPRESS EVENT WHEN USER ENTERS LOCATION INPUT
document.addEventListener("keypress", function(event) {
	if (event.keyCode === 13 || event.which === 13) {
		const userLocInput = document.querySelector(".user-location-input").value;
	    userInput(userLocInput);
	    document.querySelector(".user-location-input").value = "";
	}
});

// USE MY LOCATION BUTTON
myLocation.addEventListener("click", function() {
    inputLocation();
});

// CONVERT TO IMPERIAL BUTTON
btnFarenheit.addEventListener("click", function() {
    toImperial();
});

// CONVERT TO METRIC BUTTON
btnCelcius.addEventListener("click", function() {
	toMetric();
});


// Loader
loader.style.display = 'block';

const loaderFunc = () => {
	setTimeout(() => {
		loader.style.display = 'none'
	},2000);
}

// DISPLAY MAIN WEATHER DATA
const renderWeather = (data) => {
	outputLocation.textContent = data.name + ", " + data.sys.country;
	outputTemp.textContent = Math.round(data.main.temp);
	outputDesc.textContent = " " + data.weather[0].description;
	outputMaxTemp.textContent = " " + Math.round(data.main.temp_max);
	outputMinTemp.textContent = " " + Math.round(data.main.temp_min);
	outputWind.textContent = Math.round(data.wind.speed);
	outputHumidity.textContent = data.main.humidity;
   
}

// DISPLAY LOCAL SUNRISE AND SUNSET TIMES
const renderDates = (data) => {
	var sunrise = new Date(1000 * data.sys.sunrise);
	var sunset = new Date(1000 * data.sys.sunset);

    outputSunrise.textContent = moment(sunrise).format("HH:mm");
    outputSunset.textContent =  moment(sunset).format("HH:mm");
	
}

// CHANGE WEATHER ICON ACCORDING TO CURRENT WEATHER ID
const iconDisplay = (data) => {
	let dayOrNight;
	const time = Date.now().toString();
	const curTimeStr = time.slice(0, time.length - 3);
	const curTime = parseFloat(curTimeStr);
	const sunset = data.sys.sunset;
	const sunrise = data.sys.sunrise;
	if (curTime >= sunrise && curTime <= sunset) {
		dayOrNight = true;
		document.body.style.backgroundImage = "url('./images/day.jpg')";
		headline.style.backgroundColor = '#9b59b6';
		myLocation.style.backgroundColor = '#8e44ad';
		btnInput.style.backgroundColor = '#8e44ad';
	} else {
		dayOrNight = false;
		document.body.style.backgroundImage = 'linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, 1)),url("./images/night.jpg")';
		headline.style.backgroundColor = '#1976D2';
		myLocation.style.backgroundColor = '#2196F3';
		btnInput.style.backgroundColor = '#2196F3';
	}

	if (dayOrNight && data.weather[0].id === 800) {
		clearSky.style.display = "inline";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (!dayOrNight && data.weather[0].id === 800) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "inline";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (!dayOrNight && data.weather[0].id >= 801 &&data.weather[0].id <= 804) {
	    clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "inline";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (data.weather[0].id >= 300 && data.weather[0].id <= 531) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "inline";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (data.weather[0].id >= 200 && data.weather[0].id <= 232 || data.weather[0].id === 901 || data.weather[0].id === 900 || data.weather[0].id === 960 || data.weather[0].id === 961 || data.weather[0].id === 962 ) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "inline";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "inline";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "inline";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "none";
	} else if (data.weather[0].id === 801) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "inline";
		wind.style.display = "none";
		mist.style.display = "none";
	}  else if (data.weather[0].id === 905 || data.weather[0].id === 902 || (data.weather[0].id >= 952 && data.weather[0].id <= 959)) {
		clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "inline";
		mist.style.display = "none";
	} else if (data.weather[0].id >= 700 && data.weather[0].id <= 781) {
        clearSky.style.display = "none";
		nightClearSky.style.display = "none";
		nightClouds.style.display = "none";
		rain.style.display = "none";
		storm.style.display = "none";
		snow.style.display = "none";
		clouds.style.display = "none";
		fewClouds.style.display = "none";
		wind.style.display = "none";
		mist.style.display = "inline";
	} else {
		console.log("other");
	}
}

const init = () => {
	loaderFunc();
	inputLocation();
	clearSky.style.display = "none";
	nightClearSky.style.display = "none";
	nightClouds.style.display = "none";
	rain.style.display = "none";
	storm.style.display = "none";
	snow.style.display = "none";
	clouds.style.display = "none";
	wind.style.display = "none";
	mist.style.display = "none";
	fewClouds.style.display = "none";
	tempFormat.textContent = "F";
	btnFarenheit.classList.add("selected");
	minTemp.classList.add("far");
	minTemp.classList.remove("cel");
	maxTemp.classList.add("far");
	maxTemp.classList.remove("cel");
	mphKph.textContent = "mph";

}

const toImperial = () => {
	if (tempFormat.textContent === "C" && classCel) {
    	tempFormat.textContent = "F";
    	mphKph.textContent = "mph";
        btnFarenheit.classList.toggle("selected");
        btnCelcius.classList.toggle("selected");
    	maxTemp.classList.toggle("cel");
    	minTemp.classList.toggle("cel");
    	parseFloat(outputTemp.textContent);
    	parseFloat(outputMaxTemp.textContent);
    	parseFloat(outputMinTemp.textContent);
    	parseFloat(outputWind.textContent);
    	outputTemp.textContent = Math.round((outputTemp.textContent * 9) / 5 + 32);
    	outputMaxTemp.textContent = " " + Math.round((outputMaxTemp.textContent * 9) / 5 + 32);
    	outputMinTemp.textContent = " " + Math.round((outputMinTemp.textContent * 9) / 5 + 32);
    	outputWind.textContent = Math.round(outputWind.textContent / 1.60934);
    }
}

const toMetric = () => {
	if (tempFormat.textContent === "F" && classFar) {
    	tempFormat.textContent = "C";
    	mphKph.textContent = "kph";
    	btnFarenheit.classList.toggle("selected");
        btnCelcius.classList.toggle("selected");
    	maxTemp.classList.toggle("far");
    	minTemp.classList.toggle("far");
    	parseFloat(outputTemp.textContent);
    	parseFloat(outputMaxTemp.textContent);
    	parseFloat(outputMinTemp.textContent);
    	parseFloat(outputWind.textContent);
    	outputTemp.textContent = Math.round(((outputTemp.textContent - 32) * 5) / 9);
    	outputMaxTemp.textContent = " " + Math.round(((outputMaxTemp.textContent - 32) * 5) / 9);
    	outputMinTemp.textContent = " " + Math.round(((outputMinTemp.textContent - 32) * 5) / 9);
    	outputWind.textContent = Math.round(outputWind.textContent * 1.60934);
    }
}

init();

export { renderDates, renderWeather, iconDisplay };
