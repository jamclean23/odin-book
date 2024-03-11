// Controller for pond requests

// ====== IMPORTS ======

// Functions
const findUser = require('../functions/findUser');
const findGoogleUser = require('../functions/findGoogleUser');


// ====== FUNCTIONS ======

async function page (req, res) {
    let pondUser;
    if (req.params.hasOwnProperty('username')) {
        pondUser = req.params.username;
    }

    let user;
    switch (req.user.provider) {
        case 'google':
            try {
                user = await findGoogleUser(req.user.id);
            } catch (err) {
                console.log(err);
            }
            break;
        case 'local':
            try {
                user = await findUser(req.user._doc.username);
            } catch (err) {
                console.log(err);
            }
            break;
    }

    console.log('USER:');
    console.log(user.username);
    console.log('POND USER:');
    console.log(pondUser);

    if (user.username === pondUser || !pondUser) {
        res.send('<p>HOME</p>');
    } else {
        res.send('<p>VISITING</p>');
    }


}

// ====== EXPORTS ======

module.exports = {
    page
};