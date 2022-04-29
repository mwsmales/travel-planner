import { helloWorld } from './js/functions'

import './styles/resets.scss'
import './styles/base.scss'

// test JS is working
helloWorld();

export { helloWorld }

// code to register service worker (UNCOMMENT WHEN READY)
/* 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
*/