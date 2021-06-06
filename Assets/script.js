// GLOBAL VARIABLES
// Elements
var todaysDateEl = $("#currentDay");
var hourBlockContainerEl = $("#hourBlockContainer");

// Tracking data
var date;

// ---------------------------------------------------------------------------------------------------
// FUNCTIONS
// Updates the time on the website to current date down to the second
function currentTime() {
    date = moment().format("dddd, MMMM Do, YYYY, h:mm:ss a");
    todaysDateEl.text(date);
}

function hourPasPreFut(hourIndex) {
    var currentHour = moment().format("H")
    return (hourIndex < currentHour ? "past" : (hourIndex > currentHour ? "future" : "present"));
}

// ---------------------------------------------------------------------------------------------------

// Update time to present immediately and every second
currentTime();
var updatingTimeInterval = setInterval(currentTime, 1000);

for(var i = 0; i < 9; i++) {
    hourBlockContainerEl.append(`
        <div class="row">
            <div class="col-1 hour">
                <p>${moment(i+9,"H").format("h a")}</p>
            </div>
            <textarea class="col-10 ${hourPasPreFut(i+11)}"></textarea>
            <div class="col-1 saveBtn">
                <i class="fas fa-save fa-2x"></i>
            </div>
        </div>
    `);
}