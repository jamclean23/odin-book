// Get Pond db document from a user object

// ====== IMPORTS ======

// Functions
const getIdFromUser = require('../functions/getIdFromUser.js');
const findPondByUserId = require('../functions/findPondByUserId.js');


// ====== FUNCTIONS ======

async function getPondFromUserObj (userObj) {
    let userId;
    try {
        userId = await getIdFromUser(userObj);
    } catch (err) {
        console.log(err);
    }

    console.log('USER ID : ' + userId);
    if (userId) {
        let pond;
        try {
            pond = await findPondByUserId(userId);
            console.log('POND');
            console.log(pond);
            return pond;
        } catch (err) {
            console.log(err);
        }
    }

    return null;
}


// ====== EXPORTS ======

module.exports = getPondFromUserObj;