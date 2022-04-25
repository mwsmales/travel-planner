import { 
    addTrip, 
    deleteTrip,
    getTrips
} from './js/formHandler'
import { addCountryList } from './js/uiFunctions'


import './styles/resets.scss'
import './styles/fonts.scss'
import './styles/header.scss'
import './styles/main.scss'

// event listeners
window.addEventListener('load', (event) => {
    addCountryList();
});

window.addEventListener('load', (event) => {
    getTrips();
});



export {
    addTrip,
    deleteTrip,
    addCountryList
}