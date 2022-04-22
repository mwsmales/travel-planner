async function getPixabayImgUrl(apiKey = '', searchTerm = '') {
    // TODO: Add error handling in case zero images are returned
    const baseUrl = 'https://pixabay.com/api/';
    const requestUrl = `${baseUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo`;
    console.log('Making Pixabay request...');
    console.log(`Pixabay request url: ${requestUrl}`);
    const response = await fetch(requestUrl);
    try {
        console.log('Pixabay image URL retrieved')
        return response.json();
    }
    catch {
        console.log('Pixabay API error: ', error);
    }
}

async function getGeonamesCoords(apiKey = '', placeName = '', countryCode) {
    const baseUrl = 'http://api.geonames.org/search';
    const requestUrl = `${baseUrl}?username=${apiKey}&q=${placeName}&country=${countryCode}&type=json`;
    console.log('Making Geonames request...');
    console.log(`Geonames request url: ${requestUrl}`);
    const response = await fetch(requestUrl);
    try {
        console.log('Geonames image URL retrieved')
        return response.json();
    }
    catch {
        console.log('Geonames API error: ', error);
    }
}


/**
 * Returns the weather at a specified latitude and longitude.  
 * If the date is within one week of today, returns the current weather.  
 * If the date is greater than one week, returns the 16 day weather forecast.
 * Calls functions which use the Weatherbit API.
 * 
 * Returns an object containing the current weather or forecast as an object.
 * 
 * @param {string} date - the date in format YYYY-MM-DD 
 * 
 * @param {float} lat - the latitude of the location
 * 
 * @param {float} lat - the longitude of the location
 * 
 * @param {string} apiKey - the API key for Weatherbit
 * 
 */
async function getWeather(date = '', lat = 0, lng = 0, apiKey = '') {

    // if date = within one week:
    console.log('current weather: ', getCurrentWeather(lat, lng, apiKey));
    // elif date = more than one week:
        // throw error: date is in the past
    console.log(getForecastWeather(lat, lng, apiKey));
    return 'dummy weather forecast'; 
}

/** 
 * Fetch current weather based on lat and lng coords.
 * Uses the Weatherbit API.
 * 
 * Returns object containing the current weather data.
 * 
 * @param {float} lat - the latitude of the location
 * 
 * @param {float} lat - the longitude of the location
 * 
 * @param {string} apiKey - the API key for Weatherbit
 */
async function getCurrentWeather(lat = 0, lng = 0, apiKey = '') {
    const baseUrl = 'https://api.weatherbit.io/v2.0/current';
    const requestUrl = `${baseUrl}?key=${apiKey}&lat=${lat}&lon=${lng}`;
    console.log('Making Weatherbit request for current forecast...');
    console.log(`Weatherbit request url: ${requestUrl}`);
    const response = await fetch(requestUrl);
    try {
        console.log('Weatherbit data received')
        return response.json();
    }
    catch {
        console.log('Weatherbit API error: ', error);
    }
}


/** 
 * Fetch a 16 day forecast for a given location.
 * Location is defined with lat and lng coords.
 * Uses the Weatherbit API.
 * 
 * Returns an object containing the forecast.
 * 
 * @param {float} lat - the latitude of the location
 * 
 * @param {float} lat - the longitude of the location
 * 
 * @param {string} apiKey - the API key for Weatherbit
 */
async function getForecastWeather(lat = 0, lng = 0, apiKey = '') {
    const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    const requestUrl = `${baseUrl}?key=${apiKey}&lat=${lat}&lon=${lng}`;
    console.log('Making Weatherbit request for 16 day forecast...');
    console.log(`Weatherbit request url: ${requestUrl}`);
    const response = await fetch(requestUrl);
    try {
        console.log('Weatherbit data received')
        return response.json();
    }
    catch {
        console.log('Weatherbit API error: ', error);
    }
}




export { 
    getPixabayImgUrl,
    getGeonamesCoords,
    getWeather
}