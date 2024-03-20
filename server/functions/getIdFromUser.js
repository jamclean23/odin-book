// Gets Id from user object in cookie

// ====== IMPORTS ======

const findGoogleUser = require('./findGoogleUser');

// ====== FUNCTIONS ======

async function getIdFromUser (userObj) {
    console.log(userObj);
    if ((typeof userObj === 'object')) {
        if ("provider" in userObj) {
            switch (userObj.provider) {
                case 'local':
                    return userObj._doc._id;
                case 'google':
                    try {
                        const userDoc = await findGoogleUser(userObj.id);
                        if (userDoc) {
                            return userDoc.id;
                        }
                    } catch (err) {
                        console.log(err);
                    }
            }
        }
    }

    return null;
}

// ====== EXPORTS ======

module.exports = getIdFromUser;