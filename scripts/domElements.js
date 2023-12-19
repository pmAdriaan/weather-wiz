// ================================
// domElements.js
//
// This file contains DOM elements and styling constants used in the weather app.
// ================================


// DOM Elements
const searchForm = $("#search-form");
const searchInput = $("#search-input");
const todayForecastContainer = $("#today");
const fiveDayForecastContainer = $("#display-forecast");
const historyContainer = $("#history");
const currentLocationButton = $("#use-current-location");
const clearHistoryButton = $("#clear-history-button");

// Bootstrap
const CARD = "card border-2 card-color-bg btn-shadow card-text-color";
const CARD_HEADER = "card-header text-center fw-bold";
const CARD_BODY = "card-body m-0";
const CARD_TEXT = "card-text m-1";

// FontAwesome weather icons
const TEMPERATURE_ICON = "<i id='weather-icon-unit' class='fa-sharp fa-solid fa-temperature-three-quarters'></i>";
const WIND_SPEED_ICON = "<i id='weather-icon-unit' class='fa-sharp fa-solid fa-wind'></i>";
const HUMIDITY_UNIT_ICON = "<i id='weather-icon-unit' class='fa-sharp fa-solid fa-droplet'></i>";
