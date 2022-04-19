/**
 * @jest-environment jsdom
 */

import { helloWorld } from '../src/client/js/functions';

test('sample test', function() {
    helloWorld();
})