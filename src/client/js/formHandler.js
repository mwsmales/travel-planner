/* FUNCTIONS TO HANDLE FORM SUBMIT */

import { 
    getTrips,
    addTripData, 
    removeTripData
} from './backEndFunctions'
import { 
    createTripData
} from './apiFunctions'
import { 
    addAllTripsUi,
    addTripUi
} from './uiFunctions'

/**
 * Gets trips object from the backend, and adds the trips to the UI.
 * Assumes that the UI will start with zero trips.
 */
async function refreshUI() {
    const trips = await getTrips();
    addAllTripsUi(trips);
}

/**
 * Generates a new trip card based on the location and date added to the UI.
 * Adds the new trip card to the UI.
 * 
 * @param {object} event - the click event from the add trip button 
 */
async function addTrip(event) {
    event.preventDefault();

    // TODO: update this with some sort of location validation, otherwise print an error to the UI    
    // get values from UI
    const country = document.getElementById('countryDropDown').value;
    const city = document.getElementById('inputCity').value;
    const date = document.getElementById('dateInput').value;
    
    let tripData = await createTripData(country, city, date);

    // update trips object
    const trips = await addTripData(tripData);
    console.log('trips: ', trips) 
    tripData['id'] = trips['idCount'];
    
    // Update the UI
    addTripUi(tripData);   
}

/**
 * Deletes a trip from the UI and removes it from the backend 'trips' object.
 *  
 * @param {bigint} tripId - the unique id of the trip 
 */
async function deleteTrip(tripId) {
    console.log('delete trip card, id: ', tripId);
    // remove trip from data structure
    const trips = await removeTripData(tripId);
    // remove trip from UI
    document.getElementById(`trip_card_${tripId}`).remove();    
    console.log('trips updated: ', trips)

}

export {
    addTrip,
    deleteTrip,
    refreshUI
}

