import { 
    addTrip, 
    deleteTrip 
} from './js/formHandler'
import { addCountryList } from './js/uiFunctions'


import './styles/resets.scss'
import './styles/fonts.scss'
import './styles/header.scss'
import './styles/main.scss'

// event listeners
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    addCountryList();
  });

export {
    addTrip,
    deleteTrip,
    addCountryList
}