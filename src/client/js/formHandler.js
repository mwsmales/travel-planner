/* FUNCTION TO HANDLE FORM SUBMIT */

import { getApiKey } from './backEndFunctions'
import { 
    getPixabayImgUrl,
    getGeonamesCoords,
    getForecastWeather
} from './apiFunctions'
import { addTripUi } from './uiFunctions'

let trips = {tripCount: 0, idCount: 0, tripData : []}; // global object to hold trip info 

// main function 
async function addTrip(event) {
    event.preventDefault();

    // initialize new tripdata entry    
    let tripData = {
        'id': trips['idCount']+1,
        'location':{}
    }  
    console.log(trips);

    // TODO: update this with some sort of location validation, otherwise print an error to the UI    
    // get values from form
    tripData['location']['country'] = document.getElementById('inputCountry').value;
    tripData['location']['city'] = document.getElementById('inputCity').value;
    tripData['date'] = document.getElementById('dateInput').value;
    console.log(tripData);

    // retrieve API keys from backend
    const geoNamesKey = await getApiKey('http://localhost:8081/getGeoNamesKey');
    const weatherbitKey = await getApiKey('http://localhost:8081/getWeatherbitKey');
    const pixabayKey = await getApiKey('http://localhost:8081/getPixabayKey');

    console.log(`GeoNames Key: ${geoNamesKey}`);
    console.log(`Weatherbit Key: ${weatherbitKey}`);
    console.log(`Pixabay Key: ${pixabayKey}`);

    // TODO convert country name to ISO-3166 country code 

    // Call Geonames API to get coords
    const coords = await getGeonamesCoords(geoNamesKey, tripData['location']['city'], tripData['location']['country']);
    tripData['location']['lat'] = coords['geonames'][0]['lat'];
    tripData['location']['lng'] = coords['geonames'][0]['lng'];
    console.log('Coordinates', tripData['location']['lat'], tripData['location']['lng']);

    // Call Weatherbit API to get forecast
    const weatherForecast = await getForecastWeather(tripData['location']['lat'], tripData['location']['lng'], weatherbitKey);
    tripData['weather'] = weatherForecast;

    // API request to get picture of the location
    const locationImgUrl = await getPixabayImgUrl(pixabayKey, tripData['location']['country'] + ' ' + tripData['location']['city']);
    // TODO: add error handling to display blank image if there are no results 
    console.log('location image url', locationImgUrl['hits'][0]['webformatURL']);
    tripData['imgUrl'] = locationImgUrl['hits'][0]['webformatURL'];

    // Update the UI
    console.log(tripData);
    addTripUi(tripData['id'], tripData['location']['city'], tripData['location']['country'], tripData['date'], tripData['imgUrl']);   

    // update trips object
    trips['tripData'].push(tripData);
    trips['tripCount'] += 1;
    trips['idCount'] += 1;
    console.log(trips);
}

export {
    addTrip
}

