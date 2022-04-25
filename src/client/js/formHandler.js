/* FUNCTION TO HANDLE FORM SUBMIT */

import { 
    getApiKey,
    getTrips,
    addTripData, 
    removeTripData
} from './backEndFunctions'
import { 
    getPixabayImgUrl,
    getGeonamesCoords,
    getForecastWeather
} from './apiFunctions'
import { 
    addAllTripsUi,
    addTripUi,
    getCountryCode
} from './uiFunctions'


async function refreshUI() {
    const trips = await getTrips();
    addAllTripsUi(trips);
}

// main function 
async function addTrip(event) {
    event.preventDefault();

    // TODO: update this with some sort of location validation, otherwise print an error to the UI    
    // get values from form
    const country = document.getElementById('countryDropDown').value;
    const city = document.getElementById('inputCity').value;
    const date = document.getElementById('dateInput').value;
    
    // retrieve API keys from backend
    const geoNamesKey = await getApiKey('http://localhost:8081/getGeoNamesKey');
    const weatherbitKey = await getApiKey('http://localhost:8081/getWeatherbitKey');
    const pixabayKey = await getApiKey('http://localhost:8081/getPixabayKey');
    
    console.log(`GeoNames Key: ${geoNamesKey}`);
    console.log(`Weatherbit Key: ${weatherbitKey}`);
    console.log(`Pixabay Key: ${pixabayKey}`);
    
    // convert country name to ISO-3166 country code 
    const countryCode = getCountryCode(country);
    
    // Call Geonames API to get coords
    const coords = await getGeonamesCoords(geoNamesKey, city, countryCode);
    const lat = coords['geonames'][0]['lat'];
    const lng = coords['geonames'][0]['lng'];
    console.log('Coordinates', lat, lng);
    
    // Call Weatherbit API to get forecast
    const weatherForecast = await getForecastWeather(lat, lng, weatherbitKey);
    
    // API request to get picture of the location
    const pixabayResults = await getPixabayImgUrl(pixabayKey, country + ' ' + city);
    // TODO: add error handling to display blank image if there are no results 
    const imgUrl = pixabayResults['hits'][0]['webformatURL'];
    console.log('location image url', imgUrl);
    
    // update trips object
    const trips = await addTripData(country, city, date, lat, lng, weatherForecast, imgUrl);
    console.log('trips: ', trips) 
    const tripId = trips['idCount'];
    
    // Update the UI
    addTripUi(tripId, city, country, date, imgUrl);   
    
}

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

