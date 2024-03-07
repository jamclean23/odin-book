// Validates a username string

// ====== IMPORTS ======

const findUser = require('./findUser.js');


// ====== FUNCTIONS ======

async function valUsername (username) {
    let valid = false;
    let msg = '';

    let existingUser;

    try {
        existingUser = await findUser(username);
    } catch (err) {
        console.log(err);
        return {
            valid: false,
            msg: 'Error looking up users',
            checkedUser: username
        };
    }

    validCharsRegex = /[\s\S]*[\W\s_][\s\S]*/;

    if (username == '') {
        msg = 'Please enter a username';
    } else if (validCharsRegex.test(username)) {
        msg = 'May not contain special characters or spaces';
    } else if (username.length < 8) {
        msg = 'Must be at least 8 characters';
    } else if (username.length > 15) {
        msg = 'Must be fewer than 15 characters';
    } else if (!existingUser) {
        valid = true;
    } else {
        msg = 'Username taken';
    }

    return {
        valid,
        msg,
        checkedUser: username
    };
}

// ====== EXPORTS ======

module.exports = valUsername;