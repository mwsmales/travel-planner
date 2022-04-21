async function getPixabayImgUrl(apiKey = '', searchTerm = '') {
    const baseUrl = 'https://pixabay.com/api/';
    const requestUrl = `${baseUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo`;
    console.log('Making Pixabay request...');
    console.log(`Pixabay request url: ${requestUrl}`);
    const response = await fetch(requestUrl);
    try {
        console.log('Pixabay image URL retrieved')
        const resObject = response.json();
        return resObject;
    }
    catch {
        console.log('Pixabay API error: ', error);
    }
}

export { getPixabayImgUrl }