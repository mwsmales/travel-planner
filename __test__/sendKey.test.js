const serverFunctions = require('../src/server/serverFunctions')

test('sendGeoNamesKey returns a json containing "key"', () => {
    const req = { };
    const res = { 
        text: '', 
        send: function(input) {this.text = input}
    };
    
    serverFunctions.sendGeoNamesKey(req, res);
    
    expect(res.text).toContain('key');
})