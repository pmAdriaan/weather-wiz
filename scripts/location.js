// ================================
// location.js
//
// This file contains functions related to geolocation, including getting the user's current location and handling location errors.
// ================================


// Gets the user's current location and fetches weather data
function getCurrentLocationWeather() {
    getLocation()
        .then(position => {
            const { latitude, longitude } = position.coords;
            const queryURL = buildWeatherQueryURLFromCoords(latitude, longitude);
            fetchWeatherData(queryURL);
        })
        .catch(handleLocationError);
}

// Gets the user's location using geolocation API
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

// Builds weather query URL from coordinates
function buildWeatherQueryURLFromCoords(latitude, longitude) {
    return `${API_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=${UNITS}`;
}

// Handles errors in getting the user's location
function handleLocationError(error) {
    console.error("Error getting current location:", error);
    displayErrorToUser("Error getting current location. Please try again or enter a city manually.");
}
