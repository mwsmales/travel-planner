import { getApiKey } from '../src/client/js/backEndFunctions';

test('getApiKey returns a string', async () => {
    fetch.mockResponseOnce(JSON.stringify({key: "testkey1234567890"}));
    const key = await getApiKey('testurl');
    expect(key).toBe("testkey1234567890");
})