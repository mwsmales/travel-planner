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
    const date = document.getElementById('dateInput').value;
    
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
    
    let tripData = await createTripData(country, city, date, apiKeys);
    
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
    const countryCode = getCountryCode(country);
    const placeExists = await geoNamesSearch(apiKey, city, countryCode)
    if (placeExists) {
        console.log(`${city}, ${countryCode} found on GeoNames search API`)
        return city;
    }
    else {
        // TODO: replace with error printed to UI
        console.log('Error: place name not found in that country')
        return null
    }
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

