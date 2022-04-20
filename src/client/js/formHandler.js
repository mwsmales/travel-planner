/* FUNCTION TO HANDLE FORM SUBMIT */

import { getApiKey } from './backEndFunctions'


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

    /**
     * send API request to get coords
     * 
     * send API request to get weather forecast at coords 
     *   if date = this week, get today weather
     *   else if date = future, get weather that date
     *   else (date is in past) - throw error
     * 
     * API request to get a picture of the location
     * 
     * Update the UI
     * 
     */


}

export {
    addTrip
}

