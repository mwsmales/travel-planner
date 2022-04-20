async function getApiKey(url = '') {
    console.log('Fetching API key from server', url);
    const response = await fetch(url, {
        method: 'GET', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    try {
        const data = await response.json();
        console.log("API key received", url);
        return(data.key);
    } catch(error) {
        console.log("error fetching API key: ", url, error);
    }
}

export { getApiKey }