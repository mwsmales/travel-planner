/* FUNCTION TO HANDLE FORM SUBMIT */

import { getApiKey } from './backEndFunctions'
import { getPixabayImgUrl } from './apiFunctions'


// main function 
async function addTrip(event) {
    event.preventDefault();

    // TODO: update this with some sort of location validation, otherwise print an error to the UI    
    // get values from form
    const tripDestination = document.getElementById('inputPara').value;
    const tripDate = document.getElementById('dateInput');

    // retrieve API keys from backend
    const geoNamesKey = await getApiKey('http://localhost:8081/getGeoNamesKey');
    const weatherbitKey = await getApiKey('http://localhost:8081/getWeatherbitKey');
    const pixabayKey = await getApiKey('http://localhost:8081/getPixabayKey');

    console.log(`GeoNames Key: ${geoNamesKey}`)
    console.log(`Weatherbit Key: ${weatherbitKey}`)
    console.log(`Pixabay Key: ${pixabayKey}`)

    // Call Geonames API to get coords

    // Call Weatherbit API to get forecast
    //   if date = this week, get today weather
    //   else if date = future, get weather that date
    //   else (date is in past) - throw error
    
    // API request to get picture of the location
    const locationImgUrl = await getPixabayImgUrl(pixabayKey, tripDestination);
    console.log('location image url', locationImgUrl['hits'][0]['webformatURL'])


    // Update the UI


}

export {
    addTrip
}

