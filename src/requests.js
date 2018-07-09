import { renderDates, renderWeather, iconDisplay } from "./index";
import moment from 'moment';
import tz from 'moment-timezone';


const tempFormat = document.querySelector(".temp-format");
const btnFarenheit = document.querySelector(".farenheit");
const btnCelcius = document.querySelector(".celcius");
const mphKph = document.querySelector(".mph-kph");
const outputSunrise = document.querySelector(".output-sunrise");
const outputSunset = document.querySelector(".output-sunset");

const getCurrentLocation = () => new Promise((res, rej) => {
	navigator.geolocation.getCurrentPosition((pos) => {
		res(pos);
		rej('Unable to get location data');
	});	
});


const getUserInputLocation = async (userInput) => {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=34fb6e34f6b56c480b19f84502d25032`);
	if (response.status === 200) {
		const data = await response.json();
		return data;
	}
}

const inputLocation = async () => {
	let lat, long;
	await getCurrentLocation().then((data) => {
		lat = data.coords.latitude;
		long = data.coords.longitude;
	}).catch((err) => {
		console.log(err)
	});
	
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=34fb6e34f6b56c480b19f84502d25032`);
	if (response.status === 200) {
		const data = await response.json();
		renderWeather(data);
		renderDates(data);
		iconDisplay(data);
		
		// CONVERT TO IMPERIAL BY DEFAULT
		tempFormat.textContent = "F";
        btnFarenheit.classList.add("selected");
        btnCelcius.classList.remove("selected");

        mphKph.textContent = "mph";
	} else {
		throw new Error ('Unable to get location');
	}
}



const userInput = async (inputLocation) => {
	let lat, long, sunrisestr, sunsetstr;
	await getUserInputLocation(inputLocation).then((data) => {
		lat = data.coord.lat;
		long = data.coord.lon;
		renderWeather(data);
		iconDisplay(data);
		const sunrise = new Date(1000 * data.sys.sunrise);
		const sunset = new Date(1000 * data.sys.sunset);
		sunrisestr = sunrise.toUTCString();
		sunsetstr = sunset.toUTCString();
	}).catch((err) => {
		console.log(err);
	});
	
	const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&timestamp=1331161200&key=AIzaSyAraYpKJY-RQjtaXMfEuXED_AJBsSJqCEA`);
	if (response.status === 200) {
		const data = await response.json();
		const timeZoneId = data.timeZoneId;
    	// DETERMINE REALATIVE SUNRISE AND SUNSET TIMES
		const offsetSunrise = moment.tz(sunrisestr, timeZoneId);
		const localSunrise = offsetSunrise.format("HH:mm");
		const offsetSunset = moment.tz(sunsetstr, timeZoneId);
		const localSunset = offsetSunset.format("HH:mm");

        outputSunrise.textContent = localSunrise;
        outputSunset.textContent = localSunset;

        // SET IMPERIAL BY DEFAULT
        tempFormat.textContent = "F";
        btnFarenheit.classList.add("selected");
        btnCelcius.classList.remove("selected");

        mphKph.textContent = "mph";
	}
}

export { inputLocation, userInput };
