/* FUNCTION TO HANDLE FORM SUBMIT */

import { getApiKey } from './backEndFunctions'
import { 
    getPixabayImgUrl,
    getGeonamesCoords,
    getForecastWeather
} from './apiFunctions'


// main function 
async function addTrip(event) {
    event.preventDefault();

    // TODO: update this with some sort of location validation, otherwise print an error to the UI    
    // get values from form
    const destCountry = document.getElementById('inputCountry').value;
    const destCity = document.getElementById('inputCity').value;
    const tripDate = document.getElementById('dateInput').value;

    // retrieve API keys from backend
    const geoNamesKey = await getApiKey('http://localhost:8081/getGeoNamesKey');
    const weatherbitKey = await getApiKey('http://localhost:8081/getWeatherbitKey');
    const pixabayKey = await getApiKey('http://localhost:8081/getPixabayKey');

    console.log(`GeoNames Key: ${geoNamesKey}`)
    console.log(`Weatherbit Key: ${weatherbitKey}`)
    console.log(`Pixabay Key: ${pixabayKey}`)

    // TODO convert country name to ISO-3166 country code 

    // Call Geonames API to get coords
    const coords = await getGeonamesCoords(geoNamesKey, destCity, destCountry);
    const lat = coords['geonames'][0]['lat'];
    const lng = coords['geonames'][0]['lng'];
    console.log('Coordinates', lat, lng)


    // Call Weatherbit API to get forecast
    const weatherForecast = await getForecastWeather(lat, lng, weatherbitKey);
    
    // API request to get picture of the location
    const locationImgUrl = await getPixabayImgUrl(pixabayKey, destCountry + ' ' + destCity);
    // TODO: add error handling to display blank image if there are no results 
    console.log('location image url', locationImgUrl['hits'][0]['webformatURL'])

    // Update the UI


}

export {
    addTrip
}

