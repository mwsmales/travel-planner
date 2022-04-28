import { 
    addTrip, 
    deleteTrip,
    refreshUI
} from './js/formHandler'
import { 
    addCountryList,
    uiDisplayError,
    uiClearError,
     } from './js/uiFunctions'


// styles
import './styles/resets.scss'
import './styles/fonts.scss'
import './styles/header.scss'
import './styles/main.scss'

// icons
import './images/a01d.png'
import './images/a01n.png'
import './images/a02d.png'
import './images/a02n.png'
import './images/a03d.png'
import './images/a03n.png'
import './images/a04d.png'
import './images/a04n.png'
import './images/a05d.png'
import './images/a05n.png'
import './images/a06d.png'
import './images/a06n.png'
import './images/c01d.png'
import './images/c01n.png'
import './images/c02d.png'
import './images/c02n.png'
import './images/c03d.png'
import './images/c03n.png'
import './images/c04d.png'
import './images/c04n.png'
import './images/d01d.png'
import './images/d01n.png'
import './images/d02d.png'
import './images/d02n.png'
import './images/d03d.png'
import './images/d03n.png'
import './images/f01d.png'
import './images/f01n.png'
import './images/r01d.png'
import './images/r01n.png'
import './images/r02d.png'
import './images/r02n.png'
import './images/r03d.png'
import './images/r03n.png'
import './images/r04d.png'
import './images/r04n.png'
import './images/r05d.png'
import './images/r05n.png'
import './images/r06d.png'
import './images/r06n.png'
import './images/s01d.png'
import './images/s01n.png'
import './images/s02d.png'
import './images/s02n.png'
import './images/s03d.png'
import './images/s03n.png'
import './images/s04d.png'
import './images/s04n.png'
import './images/s05d.png'
import './images/s05n.png'
import './images/s06d.png'
import './images/s06n.png'
import './images/t01d.png'
import './images/t01n.png'
import './images/t02d.png'
import './images/t02n.png'
import './images/t03d.png'
import './images/t03n.png'
import './images/t04d.png'
import './images/t04n.png'
import './images/t05d.png'
import './images/t05n.png'
import './images/u00d.png'
import './images/u00n.png'


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
    addCountryList,
    uiDisplayError,
    uiClearError
}