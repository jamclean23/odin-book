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

    if (userId) {
        let pond;
        try {
            pond = await findPondByUserId(userId);
            return pond;
        } catch (err) {
            console.log(err);
        }
    }

    return null;
}


// ====== EXPORTS ======

module.exports = getPondFromUserObj;