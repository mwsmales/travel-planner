const countryLookup = require('./country_lookup.json');

/**
 * Update the UI when a new trip is added.
 * Assigns the trip ID to the containing HTML div
 * No return value.
 * 
 * @param {bigint} tripId - the unique ID of the trip 
 * 
 * @param {string} city - the destination city / town name
 * 
 * @param {string} country - the destination country name
 * 
 * @param {string} startDate - the start date in format 'YYYY-MM-DD'
 * 
 * @param {string} imgUrl - the URL for the image
 * 
 */
function addTripUi(tripId, city, country, startDate, imgUrl) {
    // create a new fragment
    const fragment = document.createDocumentFragment();
    // addpend tripCard div to the fragment and set its ID
    const cardDiv = document.createElement('div');
    cardDiv.id = `trip_card_${tripId}`;
    cardDiv.classList += 'tripCard';
    fragment.appendChild(cardDiv);
    
    // create & append child with the image
    let imgDiv = document.createElement('div');
    imgDiv.innerHTML = `<img src="${imgUrl}" alt="Trip Headline">`;
    cardDiv.appendChild(imgDiv);
    
    // create & append child div with the tripinfo.  Incl. innerHTML to the tripinfo div with the destination; dates; number of nights
    let tripInfoDiv = document.createElement('div');
    tripInfoDiv.classList += 'tripInfo';
    tripInfoDiv.innerHTML = 
        `<h2>${city}, ${country}</h2>
        <h3>${startDate} - YYYY-MM-DD</h3>
        <h3>XX Nights</h3>`;
        
    // create and append child div with weatherforecast
    let weatherDiv = document.createElement('div');
    weatherDiv.classList += 'weatherForecast';
    weatherDiv.innerHTML = '<p>Weather Forecast Placeholder</p>';
    tripInfoDiv.appendChild(weatherDiv);
    
    // create and append child with tripcontrols.  Incl. innerHTML with a remove trip button
    let controlsDiv = document.createElement('div');
    controlsDiv.classList += 'tripControls';
    controlsDiv.innerHTML = `<input type="button" value="Delete Trip" onclick="Client.deleteTrip(parseInt(${tripId}))">`;
    tripInfoDiv.appendChild(controlsDiv);

    cardDiv.appendChild(tripInfoDiv);
    document.getElementById('outputSection').appendChild(fragment);
}


// function to populate country drop-down
function addCountryList() {
    // create fragment with drop down
    let fragment = document.createDocumentFragment()
    // loop thorough array of countries, and for each one
    for (let country of countryLookup) {
        // add an HTML child element with the country name
        const option = document.createElement('option');
        option.value = country['name'];
        option.innerText = country['name'];
        fragment.append(option);
        // append to the fragment
    } 
    // add the fragment to the DOM
    document.getElementById('countryDropDown').append(fragment);
}

export {
    addTripUi,
    addCountryList
}