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

    if (user.username === pondUser || !pondUser) {
        res.render('myPond');
    } else {
        res.render('pond');
    }


}

// ====== EXPORTS ======

module.exports = {
    page
};