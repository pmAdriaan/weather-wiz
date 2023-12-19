// ================================
// main.js
//
// This file initializes the weather app and contains functions related to the user interface of the weather app
// ================================


$(document).ready(init);

// Initialization function
function init() {
    // Event listeners
    searchForm.on("submit", handleSearchFormSubmit);
    currentLocationButton.on("click", getCurrentLocationWeather);
    historyContainer.on("click", "button.history-city-button", handleHistoryButton);
    clearHistoryButton.on("click", clearHistory);

    // Load history from local storage
    loadHistory();

    // Display "Clear History" button if there's at least 1 city in the history
    toggleClearHistoryButton();

    // Clear the search input on page load
    searchInput.val('');

    // Display a random gif
    fetchGiphy();
}

// Handles search form submission
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchTerm = searchInput.val();

    if (!searchTerm) {
        displayErrorToUser("Please enter a city name.");
        return;
    }

    $("#welcome-message").hide();

    // Extract city, state code, and country code from the input
    const { city, stateCode, countryCode } = parseSearchTerm(searchTerm);

    // Build the weather query URL
    const queryURL = buildWeatherQueryURL(city, stateCode, countryCode);

    // Fetch weather data
    fetchWeatherData(queryURL);

    // Clear the search input
    searchInput.val('');
}

// Displays weather information on the UI
function displayWeather(data) {
    clearContainers();

    const currentCity = data.city.name;
    const currentCountry = data.city.country;
    const header = $("<div>").addClass("text-center");
    header.append($("<h3>").addClass("py-2 fw-bold pt-1").text("5-Day Forecast - MidDay Weather"));

    fiveDayForecastContainer.append(header);

    data.list.forEach((item, index) => {
        const isCurrentWeather = index === 0;
        const isMidDay = dayjs(item.dt_txt).hour() === 12;
        const isDayOrNight = item.sys.pod === "d";

        if (isCurrentWeather) {
            const date = dayjs().format("dddd: D MMM YYYY");
            const icon = createWeatherIcon(item.weather[0].id, isDayOrNight);
            const description = item.weather[0].description;
            const temperature = item.main.temp;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;

            const weatherCard = createWeatherCard(
                currentCity,
                `The weather in <span id="city-name">${currentCity}</span> (${currentCountry}) is ${temperature} ${TEMPERATURE_UNIT} - ${date}`,
                icon,
                description,
                temperature,
                windSpeed,
                humidity
            );

            todayForecastContainer.append(weatherCard);

        } else if (isMidDay) {
            const date = dayjs(item.dt_txt).format("dd, DD MMM");
            const icon = createWeatherIcon(item.weather[0].id, isMidDay);
            const description = item.weather[0].description;
            const temperature = item.main.temp;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;

            const weatherCard = createWeatherCard(
                currentCity,
                date,
                icon,
                description,
                temperature,
                windSpeed,
                humidity
            );

            fiveDayForecastContainer.append(weatherCard);
        }
    });
}

// Creates a weather card element
function createWeatherCard(city, date, icon, description, temperature, windSpeed, humidity) {
    // Create elements for the card
    const column = $("<div>").addClass("col");
    const card = $("<div>").addClass(CARD);
    const cardHeader = $("<div>").addClass(CARD_HEADER);
    cardHeader.append(`<h5>${date}</h5>`);
    const cardBody = $("<div>").addClass(CARD_BODY);
    const weatherDataContainer = $("<div>").addClass("weather-data");
    const iconContainer = $("<div>").addClass("weather-icon-container text-center").append(icon);
    const weatherDescription = $("<p>").addClass("text-center weather-description").text(`${description}`)
    iconContainer.append(weatherDescription);

    const weatherInfo = createWeatherInfo(
        ["Temp", temperature, TEMPERATURE_UNIT],
        ["Wind", windSpeed, WIND_SPEED_UNIT],
        ["Humidity", humidity, HUMIDITY_UNIT]);

    weatherDataContainer.append(...weatherInfo);
    cardBody.append(iconContainer, weatherDataContainer);

    card.append(cardHeader, cardBody);
    column.append(card);

    return column;
}

// Creates weather information elements
function createWeatherInfo(...infoItems) {
    return infoItems.map(([label, value, unit]) => {
        let icon = "";
        switch (unit) {
            case TEMPERATURE_UNIT:
                icon = TEMPERATURE_ICON;
                break;
            case WIND_SPEED_UNIT:
                icon = WIND_SPEED_ICON;
                break;
            case HUMIDITY_UNIT:
                icon = HUMIDITY_UNIT_ICON;
                break;
            default:
                icon = "";
        }
        return $(`<p class="${CARD_TEXT}">
        ${icon} ${label}: ${value} ${unit}
        </p>`);
    });
}

// Displays an error message to the user
function displayErrorToUser(message) {
    const errorMessageContainer = $("#error-message-container");

    errorMessageContainer.text(message).show();

    setTimeout(() => {
        errorMessageContainer.hide();
    }, 5000);  // Hide the error message after 5 seconds
}

// Clears forecast containers
function clearContainers() {
    todayForecastContainer.empty();
    fiveDayForecastContainer.empty();
}
