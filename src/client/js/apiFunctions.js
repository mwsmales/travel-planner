async function getPixabayImgUrl(apiKey = '', searchTerm = '') {
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
        console.log('Pixabay image URL retrieved')
        return response.json();
    }
    catch {
        console.log('Pixabay API error: ', error);
    }
}


export { 
    getPixabayImgUrl,
    getGeonamesCoords
}