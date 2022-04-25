const countryLookup = require('./country_lookup.json');

import { 
    getApiKey
} from './backEndFunctions'

// function to create trip data
// input is country, city & date
// return is tripData
async function createTripData(country, city, date) {

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

    // form new tripData object    
    let tripData = {
        'id': null, // trip ID filled in by backend based on idCount
        'location':{}
    }
    tripData['location']['country'] = country;
    tripData['location']['city'] = city;
    tripData['date'] = date;
    tripData['location']['lat'] = lat;
    tripData['location']['lng'] = lng;
    tripData['weather'] = weatherForecast;
    tripData['imgUrl'] = imgUrl;
    console.log('trip data object: ', tripData)

    return tripData;
}


/** 
 * Performs an API get for a given request URL
 * 
 * @param {string} requestUrl - the request URL
 * @param {string} apiName - the name of the API (used in console.log messages)
 * @returns - API response.json()
 */
async function apiGet(requestUrl='', apiName='') {
    console.log(`Making ${apiName} request...`);
    console.log(`${apiName} request url: ${requestUrl}`);
    const response = await fetch(requestUrl);
    try {
        console.log(`${apiName} API request complete`)
        return response.json();
    }
    catch {
        console.log(`${apiName} API error: `, error);
    }
}

/**
 * Function to retrieve an image URL from the pixabay API
 * 
 * @param {string} apiKey - The API key  
 * @param {string} searchTerm - The term to search for 
 * @returns 
 */
async function getPixabayImgUrl(apiKey = '', searchTerm = '') {
    // TODO: Add error handling in case zero images are returned
    const baseUrl = 'https://pixabay.com/api/';
    const requestUrl = `${baseUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal`;
    return(await apiGet(requestUrl, 'Pixabay'));
}

/**
 * Function to fetch coordinates for a given place name.
 * 
 * @param {string} apiKey - the Geonames API username
 * @param {string} placeName - the name of a city, town etc.
 * @param {string} countryCode - the two-character ISO-3166 country code, e.g. 'GB'
 * @returns the GeoNames coordinates object
 */
async function getGeonamesCoords(apiKey = '', placeName = '', countryCode) {
    const baseUrl = 'http://api.geonames.org/search';
    const requestUrl = `${baseUrl}?username=${apiKey}&q=${placeName}&country=${countryCode}&type=json`;
    return(await apiGet(requestUrl, 'GeoNames'))
}


/** 
 * Fetch current weather based on lat and lng coords.
 * Uses the Weatherbit API.
 * 
 * @param {float} lat - the latitude of the location
 * @param {float} lng - the longitude of the location
 * @param {string} apiKey - the API key for Weatherbit
 * @returns - Object containing the current weather data.
 */
async function getCurrentWeather(lat = 0, lng = 0, apiKey = '') {
    const baseUrl = 'https://api.weatherbit.io/v2.0/current';
    const requestUrl = `${baseUrl}?key=${apiKey}&lat=${lat}&lon=${lng}`;
    return(await apiGet(requestUrl, 'Weatherbit'))
}


/** 
 * Fetch a 16 day forecast for a given location.
 * Location is defined with lat and lng coords.
 * Uses the Weatherbit API.
 * 
 * @param {float} lat - the latitude of the location
 * @param {float} lng - the longitude of the location
 * @param {string} apiKey - the API key for Weatherbit
 * @returns - Object containing the forecast.
 */
async function getForecastWeather(lat = 0, lng = 0, apiKey = '') {
    const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    const requestUrl = `${baseUrl}?key=${apiKey}&lat=${lat}&lon=${lng}`;
    return(await apiGet(requestUrl, 'Weatherbit'))
}

/**
 * Converts the country name to the two-digit ISO 3166 country code.
 * 
 * @param {string} countryName - the country name from the drop down
 * @returns {string} the ISO 3166 country code
 */
 function getCountryCode(countryName) {
    let countryCode;
    for (let country of countryLookup) {
        if (country['name'] == countryName) {
            countryCode = country['alpha-2'];
            break;
        }
    }
    // const countryCode = 'GB';
    console.log('country name: ', countryName)
    console.log('country code: ', countryCode)
    return(countryCode);
}


export { 
    createTripData,
}