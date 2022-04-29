
/**
 * Add all trips listed in 'trips' object.
 * Uses the 'trips' global object.
 * 
 * @param {object} - trips, an object containing data about all trips
 * 
 *  @returns - None.
 */
 function addAllTripsUi(trips) {
    console.log('updating UI with trips :', trips)
    for (let tripData of trips['tripData']) {
        addTripUi(tripData, -1);   
    }
}

/**
 * Adds a new trip to the UI, to the bottom of the list of trips.
 * Assigns the trip ID to the containing HTML div.
 * @param {object} tripData - object containing the trip data
 * @param {bigint} displayOrder - the display order of the card, starting at 0.  -1 indicates that the trip should be appended to the end 
 * @returns - None.
 */
function addTripUi(tripData, displayOrder) {
    //unpack data from tripData object
    console.log('tripData: ', tripData)
    const tripId = tripData['id'];
    const city = tripData['location']['city'];
    const country = tripData['location']['country'];
    const dateString = tripData['date'];
    const imgUrl = tripData['imgUrl'];

    const tripDate = new Date(dateString);

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
    imgDiv.classList += 'tripImg'
    cardDiv.appendChild(imgDiv);
    
    // create & append child div with the tripinfo.  Incl. innerHTML to the tripinfo div with the destination; dates; number of nights
    let tripInfoDiv = document.createElement('div');
    tripInfoDiv.classList += 'tripInfo';
    tripInfoDiv.innerHTML = 
        `<h2>${city}, ${country}</h2>
        <h3>${tripDate.toLocaleDateString('en-US')}</h3>`;
    console.log('tripDate: ', tripDate)

    // create and append child with tripcontrols.  Incl. innerHTML with a remove trip button
    let controlsDiv = document.createElement('div');
    controlsDiv.classList += 'tripControls';
    controlsDiv.innerHTML = `<input type="button" value="Delete Trip" onclick="Client.deleteTrip(parseInt(${tripId}))">`;
    tripInfoDiv.appendChild(controlsDiv);
    cardDiv.appendChild(tripInfoDiv);
    
    // create and append child div with weatherforecast
    let weatherDiv = document.createElement('div');
    weatherDiv.classList += 'weatherForecast';
    weatherDiv = createWeatherDiv(tripData, weatherDiv);
    cardDiv.appendChild(weatherDiv);
    
    let outputSection = document.getElementById('outputSection');

    // depending on the display order, and the number of elements present, append the div to the end or before one of the children
    if (displayOrder == -1 || outputSection.childElementCount == 0 || displayOrder == outputSection.childElementCount ) {
        outputSection.appendChild(fragment);
    }
    else {
        outputSection.insertBefore(fragment, outputSection.children[displayOrder]);
    }
}


// create the weather div HTML which can be appended to the document when the UI is drawn
function createWeatherDiv(tripData, weatherDiv) {
    for (let i = 0; i <= 10; i++) {
        let dailyWeather = document.createElement('div');
        let weatherData = tripData['weather']['data'][i];
        let forecastDate = weatherData['datetime'].slice(5,7) + '/' + weatherData['datetime'].slice(8,10) // reformat the weather data string to US
        dailyWeather.classList += 'dailyForecast';
        dailyWeather.id = `trip_${tripData['id']}_forecast_${i+1}`;
        dailyWeather.innerHTML = 
        `<img src="./images/${weatherData['weather']['icon']}.png" alt="weather_icon">` +
        `<p>${forecastDate}</p>` +
        `<p>H ${weatherData['high_temp']} C</p>` +
        `<p>L ${weatherData['low_temp']} C</p>`
        weatherDiv.appendChild(dailyWeather);
    }
    return(weatherDiv)
}


/**
 * Function to populate country drop-down.
 * 
 * @returns - None
 */
function addCountryList() {
    const countryLookup = require('./country_lookup.json');
    let fragment = document.createDocumentFragment()
    for (let country of countryLookup) {
        const option = document.createElement('option');
        option.value = country['name'];
        option.innerText = country['name'];
        fragment.append(option);
    } 
    // add the fragment to the DOM
    document.getElementById('countryDropDown').append(fragment);
}

/**
 * Display an error message at the bottom of the input section.
 * @param {string} errorMsg - the error message to be displayed. 
 */
function uiDisplayError(errorMsg='') {
    let errorDiv = document.getElementById('inputError');
    errorDiv.innerHTML = `<p>${errorMsg}</p>`
}

/**
 * Clear any error messages displayed at the bottom of the input section.
 */
function uiClearError() {
    let errorDiv = document.getElementById('inputError');
    errorDiv.innerHTML = ''
}

export {
    addAllTripsUi,
    addTripUi,
    addCountryList,
    uiDisplayError,
    uiClearError
}