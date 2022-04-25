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

async function addTripData(tripId, country, city, date, lat, lng, weather, imgUrl) {
    console.log('Updating trip data...')
    // form new tripData object    
    let tripData = {
        'id': tripId,
        'location':{}
    }
    tripData['location']['country'] = country;
    tripData['location']['city'] = city;
    tripData['date'] = date;
    tripData['location']['lat'] = lat;
    tripData['location']['lng'] = lng;
    tripData['weather'] = weather;
    tripData['imgUrl'] = imgUrl;

    // Post the new trip to the backend
    const response = await fetch('http://localhost:8081/addTripData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData)
    })
    try {
        console.log('trip added');
        const updatedTrips = response.json();
        return updatedTrips;
    } catch(error) {
        console.log("error adding trip data: ", error);
    }
}

async function removeTripData(tripId) {
    // TODO: replace this whole function with a backend function
    // Post the new trip to the backend
    const response = await fetch('http://localhost:8081/delTripData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: `{"tripId":"${tripId}"}`
    })
    try {
        console.log('trip deleted');
        const updatedTrips = response.json();
        return updatedTrips;
    } catch(error) {
        console.log("error deleting trip data: ", error);
    }
}

export { 
    getApiKey,
    addTripData, 
    removeTripData
}