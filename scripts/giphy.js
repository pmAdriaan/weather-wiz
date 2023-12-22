// ================================
// giphy.js
//
// This file contains functions related to the Giphy API, including fetching a random GIF based on weather tags.
// ================================


// Giphy API
const GIPHY_API_BASE_URL = "https://api.giphy.com/v1/gifs/random";
const GIPHY_RATING = "g";
const GIPHY_TAGS = ["sun", "rain", "clouds", "storm", "snow", "windy", "sunny", "thunderstorm", "clear sky", "weather", "cold", "warm", "lighting", "nature"];
const randomTag = GIPHY_TAGS[Math.floor(Math.random() * GIPHY_TAGS.length)];
const GIPHY_API_URL = `${GIPHY_API_BASE_URL}?api_key=${GIPHY_API_KEY}&tag=${randomTag}&rating=${GIPHY_RATING}`;

// Fetches a random gif from Giphy API
function fetchGiphy() {
    fetch(GIPHY_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            results = data.data;
            const gifUrl = results.images.fixed_height.url;

            // Display the GIF in the welcome-message div
            $("#welcome-message").append(`<img src="${gifUrl}" alt="Welcome GIF">`);
        })
        .catch(error => {
            handleGiphyError(error);
        });
}

// Handles errors in fetching gif data
function handleGiphyError(error) {
    console.error("Error fetching Giphy data:", error);
}
