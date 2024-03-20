// Controller for authentication route

// ====== IMPORTS ======

// Functions
const addGoogleUser = require('../functions/addGoogleUser.js');
const addUser = require('../functions/addUser.js');
const findGoogleUser = require('../functions/findGoogleUser.js');
const findUser = require('../functions/findUser.js');
const valUsername = require('../functions/valUsername.js');

// ====== FUNCTIONS ======

async function googleLogin (req, res) {
    // console.log('Looking up google user ...');
    let user = null;
    try {
        user = await findGoogleUser(req.user.id);
    } catch (err) {
    }

    if (user) {
        // User found, redirect with found user info
        res.redirect('/pond');
    } else {
        // No user found, redirect to create google account
        res.redirect('/auth/google/register');
    }
}

async function googleRegister (req, res) {
    // console.log('REGISTER NEW GOOGLE USER');
    let user = null;
    try {
        user = await findGoogleUser(req.user.id);
    } catch (err) {
        console.log(err);
    }

    if (user) {
        res.redirect('/pond');
    } else {
        res.render('googleRegister');
    }
}

async function validateUsername (req, res) {
    const username = req.body.username;
    let result = {};
    try {
        result = await valUsername(username);
    } catch (err) {
        console.log(err);
    }
    res.json(result);
}

async function googleAddUser (req, res) {
    const username = req.body.username;
    let result = { valid: false };
    try {
        result = await valUsername(username);
    } catch (err) {
        console.log(err);
    }

    if (result.valid) {
        try {
            await addGoogleUser(username, req.user.id);
            res.json({ result: 'ok' });
        } catch (err) {
            console.log(err);
            res.json({ result: 'error' });
            return;
        }
    } else {
        res.json({ result: 'error' });
    }
}

function logout (req, res) {
    req.logout((err) => {
        if (err) {
            res.send('<p>Logout Err</p>');
        } else {
            res.redirect('/');
        }
    });
}

// ====== EXPORTS ======

module.exports = {
    googleLogin,
    googleRegister,
    googleAddUser,
    validateUsername,
    logout
};