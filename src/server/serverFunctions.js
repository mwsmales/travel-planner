// global object to hold trip info 
let trips = {tripCount: 0, idCount: -1, tripData : []};

/* Get route to provide API keys */
function sendGeoNamesKey (req, res) {
    console.log('GeoNames API key request received')
    res.send(`{"key": "${process.env.GEONAMES_KEY}"}`)
}

function sendWeatherbitKey (req, res) {
    console.log('Weatherbay API key request received')
    res.send(`{"key": "${process.env.WEATHERBIT_KEY}"}`)
}

function sendPixabayKey (req, res) {
    console.log('Pixabay API key request received')
    res.send(`{"key": "${process.env.PIXABAY_KEY}"}`)
}

function getTrips(req, res) {
    console.log('get request received')
    res.send(JSON.stringify(trips));
    console.log('trip data sent: ', trips);
}

function svrAddTrip(req, res) {
    let tripData = req.body;
    console.log('New trip data received: ', tripData);
    tripData['id'] = trips['idCount'] + 1; // set trip id for newly received trip
    trips['tripData'].push(tripData);
    trips['tripCount'] += 1;
    trips['idCount'] += 1;
    trips['tripData'].sort((a, b) => (a.date > b.date) ? 1: -1); // sort the trips in chronological order
    for (let i = 0; i < trips['tripData'].length; i++) {
        trips['tripData'][i]['displayOrder'] = i; // set the trip display order
    }
    console.log('trip data sorted...')
    res.send(JSON.stringify(trips));
    console.log('all trip data: ', trips['tripData']);
}

function svrRemoveTrip(req, res) {
    console.log('post received')
    let tripId = req.body.tripId;
    console.log('Deleting trip: ', tripId);
    trips['tripCount'] -= 1;
    for (let i = 0; i < trips['tripData'].length; i++) {
        if (trips['tripData'][i]['id'] == tripId) {
            trips['tripData'].splice(i, 1);
            break;
        }
    }
    res.send(JSON.stringify(trips));
    console.log('all trip data: :', trips['tripData']);
}




module.exports = {
    sendGeoNamesKey,
    sendWeatherbitKey,
    sendPixabayKey,
    svrAddTrip,
    svrRemoveTrip,
    getTrips
}