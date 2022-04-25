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


export { 
    getPixabayImgUrl,
    getGeonamesCoords,
    getForecastWeather,
}