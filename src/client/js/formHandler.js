/* FUNCTIONS TO HANDLE FORM SUBMIT */

import { 
    getApiKey,
    getTrips,
    addTripData, 
    removeTripData
} from './backEndFunctions'
import { 
    createTripData,
    getCountryCode,
    geoNamesSearch
} from './apiFunctions'
import { 
    addAllTripsUi,
    addTripUi,
    uiDisplayError,
    uiClearError
} from './uiFunctions'

/**
 * Gets trips object from the backend, and adds the trips to the UI.
 * Assumes that the UI will start with zero trips.
 */
async function refreshUI() {
    const trips = await getTrips();
    addAllTripsUi(trips);
}

/**
 * Generates a new trip card based on the location and date added to the UI.
 * Adds the new trip card to the UI.
 * 
 * @param {object} event - the click event from the add trip button 
 */
async function addTrip(event) {
    event.preventDefault();

    // get values from UI
    const country = document.getElementById('countryDropDown').value;
    const cityInput = document.getElementById('inputCity').value;
    let tripDate = document.getElementById('dateInput').value;
    
    // Retrieve API keys
    const geoNamesKey = await getApiKey('http://localhost:8081/getGeoNamesKey');
    const weatherbitKey = await getApiKey('http://localhost:8081/getWeatherbitKey');
    const pixabayKey = await getApiKey('http://localhost:8081/getPixabayKey');
    const apiKeys = {
        'geoNamesKey': geoNamesKey,
        'weatherbitKey': weatherbitKey,
        'pixabayKey': pixabayKey
    }

    console.log(`GeoNames Key: ${geoNamesKey}`);
    console.log(`Weatherbit Key: ${weatherbitKey}`);
    console.log(`Pixabay Key: ${pixabayKey}`);

    const city = await validateCity(apiKeys['geoNamesKey'], cityInput, country);
    if (city == null) {
        return;
    }

    tripDate = validateDate(tripDate);
    if (tripDate == null) {
        return;
    }

    uiClearError(); // if all validation passes, clear any UI error messages
    
    let tripData = await createTripData(country, city, tripDate, apiKeys);
    
    // update trips object
    const trips = await addTripData(tripData);
    console.log('trips: ', trips) 
    tripData['id'] = trips['idCount'];
    
    // Update the UI
    addTripUi(tripData);   
}


/**
 * Use Geonames API to check if a specified city / town exists in a given country.
 * 
 * @param {string} apiKey - the geonames user name
 * @param {string} city - the city / town / place name to search for.
 * @param {string} country - ISO 3166 code for the country where the city should be found. 
 * @returns 
 */
async function validateCity(apiKey='', city = '', country = '') {
    if (city == '') {
        uiDisplayError('Error: please enter the name of a city or town');
        return null
    } 
    
    const countryCode = getCountryCode(country);
    
    const placeExists = await geoNamesSearch(apiKey, city, countryCode)
    if (placeExists) {
        console.log(`${city}, ${countryCode} found on GeoNames search API`)
        return city;
    }
    else {
        uiDisplayError('Error: place name not found in that country')
        return null
    }
}


/**
 * Validates the date entered on the page, and converts to to a javascript date object.
 * If the date is invalid (i.e. not entered or in the past) display an error and return null value.
 * The trip date entered is interpreted as being at midnight that morning, local time.
 * @param {string} tripDate - date in the format "YYYY-MM-DD"
 * @returns {object} - javascript date object (if the date is valid), or null otherwise.
 */
function validateDate(tripDate) {
    // check that a date has been entered
    if (tripDate == '') {
        uiDisplayError('Please enter a valid date');
        return(null);
    }

    // convert date to an object, accounting for timzone difference
    console.log('Trip date string: ', tripDate)
    const tripYear = tripDate.slice(0, 4);
    const tripMonth = tripDate.slice(5,7);
    const tripDay = tripDate.slice(8,10);
    const tripDateObj = new Date(tripYear, tripMonth-1, tripDay); // date set as midnight local time
        
    // check that the date is today or later
    let today = new Date();
    today.setHours(0, 0, 0, 0); // set today to midnight, local time
    if (tripDateObj < today) {
        uiDisplayError('Please enter a date in the future');
        return(null);
    }
    
    return(tripDateObj);
}


/**
 * Deletes a trip from the UI and removes it from the backend 'trips' object.
 *  
 * @param {bigint} tripId - the unique id of the trip 
 */
async function deleteTrip(tripId) {
    console.log('delete trip card, id: ', tripId);
    // remove trip from data structure
    const trips = await removeTripData(tripId);
    // remove trip from UI
    document.getElementById(`trip_card_${tripId}`).remove();    
    console.log('trips updated: ', trips)

}

export {
    addTrip,
    deleteTrip,
    refreshUI
}

