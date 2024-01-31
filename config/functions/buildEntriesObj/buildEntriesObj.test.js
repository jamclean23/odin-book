// Test for buildEntriesObj function

// ====== IMPORTS ======

const buildEntriesObj = require('./buildEntriesObj.js');


// ====== TESTS ======

describe('buildEntriesObj', () => {

    const testEntries = [
        'one',
        'two',
        'three'
    ];

    test('Returns an object', () => {
        expect(typeof buildEntriesObj(testEntries)).toBe('object');
    });

    test('Object contains entries in required format', () => {
        expect(JSON.stringify(buildEntriesObj(testEntries))).toBe(JSON.stringify({
            '/one/one': './src/one/one.js',
            '/two/two': './src/two/two.js',
            '/three/three': './src/three/three.js',
        }));
    });

    test ('Providing dirNames parameter other than array throws error', () => {
        expect(() => { buildEntriesObj('should be an array') }).toThrow('Provided dirNames was not an array.');
    })
});