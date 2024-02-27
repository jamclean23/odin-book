// Controller for authentication route

// ====== IMPORTS ======

const findGoogleUser = require('../functions/findGoogleUser.js');

// ====== FUNCTIONS ======

async function googleLogin (req, res) {
    console.log('Looking up google user ...');
    console.dir(req.user);
    let user = null;
    try {
        user = await findGoogleUser(req.user.id);
    } catch (err) {
    }

    if (user) {
        // User found, redirect with found user info
        res.send(`<h2>Google login results:</h2><p>${user}</p>`);
    } else {
        // No user found, redirect to create google account
        res.redirect('/auth/google/register');
    }
}

async function googleRegister (req, res) {
    console.log('REGISTER NEW GOOGLE USER');
    let user = null;
    try {
        user = await findGoogleUser(req.user.id);
    } catch (err) {
    }

    if (user) {
        res.redirect('/wall');
    } else {
        res.render('googleRegister');
    }
}

// ====== EXPORTS ======

module.exports = {
    googleLogin,
    googleRegister
};