import { apiGet } from '../src/client/js/apiFunctions';

test('apiGet returns an object', async () => {
    fetch.mockResponseOnce(JSON.stringify({
        "key1": "value1",
        "key2": "value2",
        "key3": "value3",
        "key4": "value4",
        "key5": "value5"
    }))
    const response = await apiGet('testurl', 'Test API')
    expect(response).toHaveProperty('key1');
})