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
}

// Handles search form submission
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchTerm = searchInput.val();
    const queryURL = buildWeatherQueryURL(searchTerm);
    fetchWeatherData(queryURL);
}

// Builds weather query URL
function buildWeatherQueryURL(city) {
    return `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=${UNITS}`;
}

// Fetches weather data from the API
function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            addToHistory(data.city.name);
        })
        .catch(handleError);
}

// Displays weather information on the UI
function displayWeather(data) {
    clearContainers();

    const currentCity = data.city.name;

    data.list.forEach((item, index) => {
        const isCurrentWeather = index === 0;

        const date = isCurrentWeather ?
            dayjs().format("MMMM D, YYYY") :
            dayjs(item.dt_txt).format("DD/MM/YYYY");

        const icon = createWeatherIcon(item.weather[0].icon);
        const temperature = item.main.temp;
        const windSpeed = item.wind.speed;
        const humidity = item.main.humidity;

        const weatherCard = createWeatherCard(currentCity, isCurrentWeather ? `${currentCity}, Today: ${date}` : date, icon, temperature, windSpeed, humidity);

        if (isCurrentWeather) {
            todayForecastContainer.append(weatherCard);
        } else if (index % 8 === 1) {
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
function addToHistory(city) {
    const existingButton = historyContainer.find(`button:contains('${city}')`);

    if (existingButton.length) {
        existingButton.detach().prependTo(historyContainer);
    } else {
        const historyButton = $(`<button class='btn btn-outline-primary mb-2'>${city}</button>`);
        historyContainer.prepend(historyButton);
    }
}

// Handles click on a history button
function handleHistoryButton() {
    searchInput.val($(this).text());
    searchForm.submit();
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
