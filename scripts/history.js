// ================================
// history.js
//
// This file contains functions related to the search history functionality, including saving, loading, and clearing history.
// ================================


// Adds a city to the search history
function addToHistory(city, country) {
    const existingButton = historyContainer.find(`button:contains('${city}, ${country}')`);

    if (existingButton.length) {
        existingButton.detach().prependTo(historyContainer);
    } else {
        const historyButton = $("<button>").addClass("btn history-city-button mb-2").text(`${city}, ${country}`);
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
            const historyButton = $(`<button class='btn history-city-button mb-2'>${city}</button>`);
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
