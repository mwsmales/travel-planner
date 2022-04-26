/**
 * @jest-environment jsdom
 */
import { addTripUi } from '../src/client/js/uiFunctions';

let tripData = {};

beforeAll(function() {
    tripData = {
        'id': 0, 
        'location':{}
    }
    tripData['location']['country'] = 'Morocco';
    tripData['location']['city'] = 'Marrakesh';
    tripData['location']['countryCode'] = 'MA';
    tripData['date'] = '2022-04-26';
    tripData['location']['lat'] = "31.63416";
    tripData['location']['lng'] = "-7.99994";
    tripData['weather'] = {'data':[]};
    tripData['imgUrl'] = "https://pixabay.com/get/g8f508934dd27ef95cc06f394a080f480d91b73d6e70f8026f7651cb0089941409f6f17cc1be1a81bf1d488b5dbd611f9ba6421e848c0917675668abbda17de08_640.jpg";

    document.body.innerHTML = '<div id="outputSection"></div>';
})

test('check that addTripUI creates tripCard element', function() {
    addTripUi(tripData);
    expect(document.body.innerHTML).toContain('class="tripCard')
})