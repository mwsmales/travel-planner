// function imports
const svrFns = require('./serverFunctions');

// require dotenv for environmental variables
const dotenv = require('dotenv');
dotenv.config();

// global object to hold trip info 
let trips = {tripCount: 0, idCount: -1, tripData : []};

//initialize app
const express = require('express');
const app = express();

/* dependencies */
const bodyParser = require('body-parser');
const cors = require ('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// refer local server to ./dist/ files
app.use(express.static('dist'));

// initalize serer
const port = 8081;
app.listen(port, function(){
    console.log(`App listening on port ${port}!`)
})

// get routes for API keys
app.get('/getGeoNamesKey', svrFns.sendGeoNamesKey);
app.get('/getWeatherbitKey', svrFns.sendWeatherbitKey);
app.get('/getPixabayKey', svrFns.sendPixabayKey);

// post route to add new trip data
app.post('/addTripData', svrAddTrip);
app.post('/delTripData', svrRemoveTrip);
app.get('/getTrips', getTrips);
    

function svrAddTrip(req, res) {
    let tripData = req.body;
    console.log('New trip data received: ', tripData);
    tripData['id'] = trips['idCount'] + 1; // set trip id for newly received trip
    trips['tripData'].push(tripData);
    trips['tripCount'] += 1;
    trips['idCount'] += 1;
    res.send(JSON.stringify(trips));
    console.log('all trip data: :', trips['tripData']);
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

function getTrips(req, res) {
    console.log('get request received')
    res.send(JSON.stringify(trips));
    console.log('trip data sent: :', trips);
}