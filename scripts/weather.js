// ================================
// weather.js
//
// This file contains functions related to weather data, including API interaction and data manipulation.
// ================================


// Weather API
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const UNITS = "metric";
const TEMPERATURE_UNIT = "°C";
const WIND_SPEED_UNIT = "m/s";
const HUMIDITY_UNIT = "%";

// Parses the search term to extract city, state code, and country code
function parseSearchTerm(searchTerm) {
    // Split the input into words
    const words = searchTerm.split(/\s+/);

    // Extract city, state code, and country code
    let city = '';
    let stateCode = '';
    let countryCode = '';

    // Check if state code and country code are provided
    if (words.length > 1) {
        const lastWord = words[words.length - 1];
        if (lastWord.length === 2) {
            // Assume it's a country code
            countryCode = lastWord.toUpperCase();
            city = words.slice(0, -1).join(' ');
        } else if (lastWord.length === 5) {
            // Assume it's a state code
            stateCode = lastWord.toUpperCase();
            city = words.slice(0, -1).join(' ');
        } else {
            // If the last word is not a state code or country code, assume it's part of the city name
            city = words.join(' ');
        }
    } else {
        // If there's only one word, consider it as the city name
        city = words[0];
    }

    return { city, stateCode, countryCode };
}

// Builds weather query URL
function buildWeatherQueryURL(city, stateCode, countryCode) {
    let query = `${API_BASE_URL}?q=${city}`;

    // Include state code if provided
    if (stateCode) {
        query += `,${stateCode}`;
    }

    // Include country code if provided
    if (countryCode) {
        query += `,${countryCode}`;
    }

    query += `&appid=${OPEN_WEATHER_MAP_API_KEY}&units=${UNITS}`;

    return query;
}

// Fetches weather data from the API
function fetchWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            addToHistory(data.city.name, data.city.country);
        })
        .catch(error => {
            if (error.message.includes('Status: 404')) {
                displayErrorToUser("Invalid city. Please enter a valid city name.");
            } else if (error.message.includes('Status: 401')) {
                displayErrorToUser("Unauthorized request. Please check your API key.");
            } else {
                handleWeatherDataError(error);
            }
        });
}

// Handles errors in fetching weather data
function handleWeatherDataError(error) {
    console.error("Error fetching weather data:", error);
}
