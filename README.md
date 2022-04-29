# Trip Planner Project

## Introduction

This is a single-page app for trip planning.  I wrote this for the final project of the Udacity Frontend Web Developer Nanodegree.  Although the UI is simple, the aim was to demonstrate the concepts covered during the course i.e. node.js and express; webpack; chaining API calls; unit tests; service workers and, of course, HTML and CSS styling.

## Usage

This app allows you to plan a number of trips you intend to make.  Enter the country, a location within the country, and a date, then hit 'add trip!'.  The trip will be added to the list, along with the current weather forecast.  Trips are automatically sorted by date.  The trip data is stored on the express backend, so you can refresh the page and the trip data will be maintained.

To delete a trip, just hit the 'delete trip' button.

## Installation 

* Clone the repo to your local machine
* Install node.js
* Run `npm install` to install dependencies 
* Run `npm run build-prod`
* Run `npm run start` to start the local server
* Open a browser and go to `localhost:8081`
* You'll need to set up accounts for each of the three APIs used by the app (see the list below).  
* When you have done that, save the keys by creating a `".env"` file in the root directory.  Enter one the following lines of text, replacing the stars with your keys:   
    `GEONAMES_KEY=***************************`

    `WEATHERBIT_KEY=***************************`
    
    `PIXABAY_KEY=***************************`

*Note that for GeoNames, you enter your username, rather than a key.*

## Dependencies

_See package.json for a full list_

## Future development

Some of the elements I'd like to add to this project are:
* Automatically refreshing an updated weather forecast on page reload.  Currently the app just displays the forecast as-of the date when the trip as added.
* The ability to add other elements to the trip e.g.:
    - flight info, which could pull the flight details and status from an API
    - a packing list for the trip
    - hotel info 
    - car rental info   

## Credit

This project uses a dictionary of country names provided by Luke Duncalfe at:
https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes

It also uses the following APIs:
* geonames.org
* weatherbit.io
* pixabay.com