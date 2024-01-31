const { execPath } = require('process');
const getDirectories = require('./getDirectories.js');
const path = require('path');


describe('getDirectories', () =>{
    test('Returned array contains expected directories', () => {
        expect(getDirectories(path.join(__dirname, 'testDir'))).toEqual(expect.arrayContaining(['1', '3', '2']));
    })
});