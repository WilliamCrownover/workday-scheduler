/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// GLOBAL VARIABLES
// Elements
var todaysDateEl = $( '#currentDay' );
var hourBlockContainerEl = $( '#hourBlockContainer' );
// Useful data
var workHours = 9;
var startHour = 9;
// Retrieve local data
var unpackedHourlyContent = JSON.parse( localStorage.getItem( 'savedHourlyContent' ) ) || emptyTextBoxes();
// Special day inspirations
var specialDay = ['Soulful', 'Motivation', 'Transformation', 'Wisdom', 'Thoughtful', 'Fearless', 'Satisfying'];

// ---------------------------------------------------------------------------------------------------
// FUNCTIONS
// First time visiters need an empty array in place of local data
function emptyTextBoxes() {
	var emptyArray = [];
	for ( var i = 0; i < workHours; i++ ) {
		emptyArray.push( '' );
	}
	return emptyArray;
}

// Updates the time on the website to current date down to the second. Refreshes page every hour.
function currentTime() {
	var date = moment().format( 'dddd, MMMM Do, YYYY, h:mm a' );
	todaysDateEl.text( `${specialDay[moment().format( 'd' )]} ${date}` );
	if( moment().format( 'mm:ss' ) === '00:00' ) {
		location.reload();
	}
}

// Compare the looping index value to the current hour returning a corresponding class name
function hourPasPreFut( hourIndex ) {
	var currentHour = moment().format( 'H' );
	return ( hourIndex < currentHour ? 'past' : ( hourIndex > currentHour ? 'future' : 'present' ) );
}

// Write the content of the text areas to the local storage
function saveTextboxContent() {
	var savedHourlyContent = [];
	for( var i = 0; i < workHours; i++ ) {
		savedHourlyContent.push( $( `#${i}hourText` ).val() );
	}
	localStorage.setItem( 'savedHourlyContent', JSON.stringify( savedHourlyContent ) );
}

// Save click flashes the background color on the button
function showClick( target ) {
	target.classList.add( 'clicked' );
	var clickedDisplay = setTimeout( function() {
		target.classList.remove( 'clicked' );
	}, 150 );
}

// Check if the save button was pressed then save if true and show click
function saveClicked( event ) {
	if( $( event.target ).hasClass( 'saveID' ) ) {
		saveTextboxContent();
		( event.target.nodeName === 'DIV' ? showClick( event.target ) : showClick( event.target.parentNode ) );
	}
}

// ---------------------------------------------------------------------------------------------------

// Update time to present immediately and every second
currentTime();
var updatingTimeInterval = setInterval( currentTime, 1000 );

// Load the hour rows to the page
for( var i = 0; i < workHours; i++ ) {
	hourBlockContainerEl.append( `
        <div class="row">
            <div class="col-1 hour">
                <p>${moment( i+startHour, 'H' ).format( 'h a' )}</p>
            </div>
            <textarea class="col-10 ${hourPasPreFut( i+startHour )}" id="${i}hourText">${unpackedHourlyContent[i]}</textarea>
            <div class="col-1 saveBtn saveID">
                <i class="fas fa-save fa-2x saveID"></i>
            </div>
        </div>
    ` );
}

// Event listener save button click
hourBlockContainerEl.on( 'click', saveClicked );