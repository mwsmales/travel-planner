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

module.exports = {
    sendGeoNamesKey,
    sendWeatherbitKey,
    sendPixabayKey,
}