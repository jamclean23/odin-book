// Controller for pond requests

// ====== IMPORTS ======

// System
const fs = require('fs');

// Functions
const findUser = require('../functions/findUser');
const findGoogleUser = require('../functions/findGoogleUser');
const findPondByUserId = require('../functions/findPondByUserId');
const addPond = require('../functions/addPond.js');


// ====== FUNCTIONS ======

async function page (req, res) {
    console.log('POND ACCESSED');
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

    if (!user) {
        console.log('NO USER');
        req.logout((err) => {
            res.redirect('/');
        });
        return;
    }

    console.log('USER');
    console.log(user);



    if (user.username === pondUser || !pondUser) {
        let pond;
        try {
            pond = await findPondByUserId(user.id);

            // If user doesn't have a pond, then create one
            if (!pond) {
                pond = await addPond(user.id);
            }
        } catch (err) {
            console.log(err);
            req.logout((err) => {
                res.redirect('/');
                return;
            });
        }

        res.render('myPond', {pond: pond});
    } else {
        // Get pond object for pondUser

        res.render('pond');
    }
}

async function uploadCover (req, res) {
    const buffer = Buffer.from(req.body, 'binary');
    const base64Img = buffer.toString('base64');
    
    let pond;
    try {
        pond = await findPondByUserId(req.user._doc._id);
        pond.coverImage = 'data:image/png;base64,' + base64Img;
        await pond.save();
    } catch (err) {
        console.log(err);
        res.json({
            status: 'Error uploading image'
        });
    }
    console.log(pond);

    res.json({
        status: 'ok'
    });
}

async function submitBio (req, res) {
    console.log(req.user);
    console.log(req.body);
}

// ====== EXPORTS ======

module.exports = {
    page,
    uploadCover,
    submitBio
};