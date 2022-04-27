/**
 * Retrieve API key from backend.
 * @param {string} url - the backend endpoint for the relevant API key. 
 * @returns {string} the API key
 */
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
        console.log("API key received");
        return(data.key);
    } catch(error) {
        console.log("error fetching API key: ", url, error);
    }
}

/**
 * Retrieves the `trips` object from the backend.
 * @returns {object} `trips` data object
 */
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

/**
 * Adds a single trip entry to the end of the `trips` object, which is stored on the backend.
 * @param {object} tripData - contains the data for a single trip.
 * @returns {object} the updated `trips` object, including the added trip.
 */
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

/**
 * Removes a specified trip from the `trips` data, which is stored on the backend.
 * @param {bigint} tripId - the unique id of the trip to be removed. 
 * @returns {object} - the updadted `trips` object
 */
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