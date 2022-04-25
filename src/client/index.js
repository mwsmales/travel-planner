import { 
    addTrip, 
    deleteTrip,
    refreshUI
} from './js/formHandler'
import { 
    addCountryList, 
     } from './js/uiFunctions'


import './styles/resets.scss'
import './styles/fonts.scss'
import './styles/header.scss'
import './styles/main.scss'

// event listeners
window.addEventListener('load', (event) => {
    addCountryList();
});

window.addEventListener('load', (event) => {
    refreshUI();
});

export {
    addTrip,
    deleteTrip,
    addCountryList
}