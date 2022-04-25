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

async function getTrips() {
    console.log('getting trip data from backend');
    const response = await fetch('http://localhost:8081/getTrips', {
        method: 'GET', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    try {
        let trips = await response.json(); // update global variable
        console.log('trip data received :', trips);
        return(trips)
    } 
    catch(error) {
        console.log("error getting trip data: ", error);
    }
}

async function addTripData(tripData) {
    console.log('Updating trip data...')
    console.log('trip data to be added: ', tripData)

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
    getTrips,
    addTripData, 
    removeTripData
}