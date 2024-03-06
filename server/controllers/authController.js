// Controller for authentication route

// ====== IMPORTS ======

const findGoogleUser = require('../functions/findGoogleUser.js');
const findUser = require('../functions/findUser.js');

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

async function validateUsername (req, res) {
    const username = req.body.username;
    let valid = false;
    let msg = '';

    let existingUser;

    try {
        existingUser = await findUser(username);
    } catch (err) {
        console.log(err);
        res.json({
            valid: false,
            msg: 'Error looking up users',
            checkedUser: username
        });
        return;
    }

    validCharsRegex = /[\s\S]*[\W\s_][\s\S]*/;

    if (username == '') {
        msg = 'Please enter a username';
    } else if (validCharsRegex.test(username)) {
        msg = 'Username may not contain special characters or spaces';
    } else if (username.length < 8) {
        msg = 'Must be at least 8 characters';
    } else if (username.length > 15) {
        msg = 'Must be fewer than 15 character';
    } else if (!existingUser) {
        valid = true;
    } else {
        msg = 'Username taken';
    }

    res.json({
        valid,
        msg,
        checkedUser: username
    })
}

// ====== EXPORTS ======

module.exports = {
    googleLogin,
    googleRegister,
    validateUsername
};