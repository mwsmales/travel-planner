/**
 * @jest-environment jsdom
 */

import { addCountryList } from '../src/client/js/uiFunctions';
const countryLookup = require('../src/client/js/country_lookup.json');

beforeAll(() => {
   document.body.innerHTML = 
      '<form class="inputForm">' +
         '<select id="countryDropDown" name="country">' +
      '</form>';
})

test('check that addCountryList adds United Kingdom to the innerHTML', function() {
   addCountryList();
   expect(document.body.innerHTML).toContain('United Kingdom');
})


test('check that addCountryList adds Algeria to the innerHTML', function() {
   addCountryList();
   expect(document.body.innerHTML).toContain('Algeria');
})