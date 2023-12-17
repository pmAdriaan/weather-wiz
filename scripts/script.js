// Constants
const API_KEY = "";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const UNITS = "metric";
const TEMPERATURE_UNIT = "°C";
const WIND_SPEED_UNIT = "m/s";
const HUMIDITY_UNIT = "%";

// DOM Elements
const searchForm = $("#search-form");
const searchInput = $("#search-input");
const todayForecastContainer = $("#today");
const fiveDayForecastContainer = $("#displayForecast");
const historyContainer = $("#history");
const currentLocationButton = $("#use-current-location");
const clearHistoryButton = $("#clear-history-button");

// Bootstrap
const CARD = "card border-2 card-color-bg btn-shadow card-text-color";
const CARD_HEADER = "card-header text-left fw-bold bg-info";
const CARD_BODY = "card-body";
const CARD_TEXT = "card-text";

$(document).ready(init);

// Initialization function
function init() {
    // Event listeners
    searchForm.on("submit", handleSearchFormSubmit);
    currentLocationButton.on("click", getCurrentLocationWeather);
    historyContainer.on("click", "button.btn-outline-primary", handleHistoryButton);
    clearHistoryButton.on("click", clearHistory);

    // Load history from local storage
    loadHistory();

    // Display "Clear History" button if there's at least 1 city in the history
    toggleClearHistoryButton();

    // Clear the search input on page load
    searchInput.val('');
}

// Handles search form submission
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchTerm = searchInput.val();

    if (!searchTerm) {
        displayErrorToUser("Please enter a city name.");
        return;
    }

    // Extract city, state code, and country code from the input
    const { city, stateCode, countryCode } = parseSearchTerm(searchTerm);

    // Build the weather query URL
    const queryURL = buildWeatherQueryURL(city, stateCode, countryCode);

     // Fetch weather data
    fetchWeatherData(queryURL);

    // Clear the search input
    searchInput.val('');
}

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

    query += `&appid=${API_KEY}&units=${UNITS}`;

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
                handleError(error);
            }
        });
}

// Displays weather information on the UI
function displayWeather(data) {
    clearContainers();

    const currentCity = data.city.name;
    const currentCountry = data.city.country;

    data.list.forEach((item, index) => {
        const isCurrentWeather = index === 0;
        const isMidDay = dayjs(item.dt_txt).hour() === 12;

        if (isCurrentWeather) {
            const date = dayjs().format("dddd: D MMMM YYYY");
            const icon = createWeatherIcon(item.weather[0].icon);
            const temperature = item.main.temp;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;

            const weatherCard = createWeatherCard(
                currentCity,
                `The weather in ${currentCity} (${currentCountry}) right now is ${temperature} ${TEMPERATURE_UNIT} - (${date})`,
                icon,
                temperature,
                windSpeed,
                humidity
            );

            todayForecastContainer.append(weatherCard);
        } else if (isMidDay) {
            const date = dayjs(item.dt_txt).format("dddd, DD MMM");
            const icon = createWeatherIcon(item.weather[0].icon);
            const temperature = item.main.temp;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;

            const weatherCard = createWeatherCard(
                currentCity,
                date,
                icon,
                temperature,
                windSpeed,
                humidity
            );

            fiveDayForecastContainer.append(weatherCard);
        }
    });
}

// Creates a weather icon element
function createWeatherIcon(iconCode) {
    return $(`<img src="https://openweathermap.org/img/w/${iconCode}.png">`);
}

// Creates a weather card element
function createWeatherCard(city, date, icon, temperature, windSpeed, humidity) {
    const column = $("<div>").addClass("col");
    const card = $("<div>").addClass(CARD);
    const cardHeader = $("<div>").addClass(CARD_HEADER).text(`${date}`);

    const cardBody = $("<div>").addClass(CARD_BODY);
    const iconContainer = $("<div>").append(icon);

    const weatherInfo = createWeatherInfo(
        ["Temp", temperature, TEMPERATURE_UNIT],
        ["Wind", windSpeed, WIND_SPEED_UNIT],
        ["Humidity", humidity, HUMIDITY_UNIT]);

    cardBody.append(iconContainer, ...weatherInfo);

    card.append(cardHeader, cardBody);
    column.append(card);

    return column;
}

// Creates weather information elements
function createWeatherInfo(...infoItems) {
    return infoItems.map(([label, value, unit]) =>
        $(`<p class="${CARD_TEXT}">${label}: ${value} ${unit}</p>`)
    );
}

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
    return `${API_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${UNITS}`;
}

// Handles errors in getting the user's location
function handleLocationError(error) {
    console.error("Error getting current location:", error);
    displayErrorToUser("Error getting current location. Please try again or enter a city manually.");
}

// Displays an error message to the user
function displayErrorToUser(message) {
    const errorMessageContainer = $("#error-message-container");

    errorMessageContainer.text(message).show();

    setTimeout(() => {
        errorMessageContainer.hide();
    }, 5000);  // Hide the error message after 5 seconds
}

// Adds a city to the search history
function addToHistory(city, country) {
    const existingButton = historyContainer.find(`button:contains('${city}, ${country}')`);

    if (existingButton.length) {
        existingButton.detach().prependTo(historyContainer);
    } else {
        const historyButton = $(`<button class='btn btn-outline-primary mb-2'>${city}, ${country}</button>`);
        historyContainer.prepend(historyButton);

        // Save history to local storage
        saveHistory()
    }

    // Display "Clear History" button
    toggleClearHistoryButton();
}

// Handles click on a history button
function handleHistoryButton() {
    searchInput.val($(this).text());
    searchForm.submit();
}

// Saves history to local storage
function saveHistory() {
    const historyArray = [];
    historyContainer.find('button').each(function () {
        historyArray.push($(this).text());
    });

    localStorage.setItem('weatherHistory', JSON.stringify(historyArray));
}

// Loads history from local storage
function loadHistory() {
    const historyString = localStorage.getItem('weatherHistory');
    if (historyString) {
        const historyArray = JSON.parse(historyString);

        historyArray.forEach(city => {
            const historyButton = $(`<button class='btn btn-outline-primary mb-2'>${city}</button>`);
            historyContainer.append(historyButton);
        });
    }
}

// Clears history from local storage and UI
function clearHistory() {
    historyContainer.empty();
    localStorage.removeItem('weatherHistory');

    // Hide "Clear History" button
    toggleClearHistoryButton();

    // Confirm
    displayErrorToUser("The history has been cleared!");
}

// Toggles the visibility of the "Clear History" button
function toggleClearHistoryButton() {
    if (historyContainer.find('button').length > 0) {
        clearHistoryButton.show();
    } else {
        clearHistoryButton.hide();
    }
}

// Clears forecast containers
function clearContainers() {
    todayForecastContainer.empty();
    fiveDayForecastContainer.empty();
}

// Handles errors in fetching weather data
function handleError(error) {
    console.error("Error fetching weather data:", error);
}
