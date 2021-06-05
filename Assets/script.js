// GLOBAL VARIABLES
// Elements
var todaysDateEl = $("#currentDay");

// Tracking data
var date;

// ---------------------------------------------------------------------------------------------------
// FUNCTIONS
// Updates the time on the website to current date down to the second
function currentTime() {
    date = moment().format("dddd, MMMM Do, YYYY, h:mm:ss a");
    todaysDateEl.text(date);
}

// ---------------------------------------------------------------------------------------------------

// Update time to present immediately and every second
currentTime();
var updatingTimeInterval = setInterval(currentTime, 1000);
