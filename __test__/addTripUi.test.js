/**
 * @jest-environment jsdom
 */
import { addTripUi } from '../src/client/js/uiFunctions';

let tripData = {};

beforeAll(function() {
    tripData = require('./dummyTripData.json');
    document.body.innerHTML = '<div id="outputSection"></div>';
})

test('check that addTripUI creates tripCard element', function() {
    addTripUi(tripData);
    expect(document.body.innerHTML).toContain('class="tripCard')
})