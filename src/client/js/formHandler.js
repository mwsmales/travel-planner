/* FUNCTION TO HANDLE FORM SUBMIT */

import { getApiKey } from './backEndFunctions'
import { 
    getPixabayImgUrl,
    getGeonamesCoords,
    getForecastWeather
} from './apiFunctions'
import { 
    addTripUi,
    getCountryCode
} from './uiFunctions'

let trips = {tripCount: 0, idCount: -1, tripData : []}; // global object to hold trip info 

// main function 
async function addTrip(event) {
    event.preventDefault();

    console.log(trips);
    const tripId = trips['idCount']+1;
    
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
    
    // Update the UI
    addTripUi(tripId, city, country, date, imgUrl);   
    
    // update trips object
    addTripData(tripId, country, city, date, lat, lng, weatherForecast, imgUrl)
}

function deleteTrip(tripId) {
    console.log('delete trip card, id: ', tripId);
    document.getElementById(`trip_card_${tripId}`).remove();
    
    // remove trip from data structure
    removeTripData(tripId);
    console.log('trips: ', trips)
}

function addTripData(tripId, country, city, date, lat, lng, weather, imgUrl) {
    // initialize new tripdata entry    
    console.log('Updating trip data...')
    let tripData = {
        'id': tripId,
        'location':{}
    }
    tripData['location']['country'] = country;
    tripData['location']['city'] = city;
    tripData['date'] = date;
    tripData['location']['lat'] = lat;
    tripData['location']['lng'] = lng;
    tripData['weather'] = weather;
    tripData['imgUrl'] = imgUrl;
    trips['tripData'].push(tripData);
    trips['tripCount'] += 1;
    trips['idCount'] += 1;
    console.log('done: ', trips);
}

function removeTripData(tripId) {
    trips['tripCount'] -= 1;
    for (let i = 0; i < trips['tripData'].length; i++) {
        if (trips['tripData'][i]['id'] == tripId) {
            trips['tripData'].splice(i, 1);
            break;
        }
    }

}

export {
    addTrip,
    deleteTrip
}

