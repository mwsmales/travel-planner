// function imports
const svrFns = require('./serverFunctions');

// require dotenv for environmental variables
const dotenv = require('dotenv');
dotenv.config();

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

// get requests for API keys
app.get('/getGeoNamesKey', svrFns.sendGeoNamesKey);
app.get('/getWeatherbitKey', svrFns.sendWeatherbitKey);
app.get('/getPixabayKey', svrFns.sendPixabayKey);
