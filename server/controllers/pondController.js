// Controller for pond requests

// ====== IMPORTS ======

// System
const fs = require('fs');

// Functions
const findUser = require('../functions/findUser');
const findGoogleUser = require('../functions/findGoogleUser');
const findPondByUserId = require('../functions/findPondByUserId');
const addPond = require('../functions/addPond.js');
const sanitizeString = require('../functions/sanitizeString.js');
const unsanitizeString = require('../functions/unsanitizeString.js');
const getPondFromUserObj = require('../functions/getPondFromUserObj.js');
const getIdFromUser = require('../functions/getIdFromUser.js');
const addRibbit = require('../functions/addRibbit.js');
const addRibbitImgToDb = require('../functions/addRibbitImg.js');
const getRibbitById = require('../functions/getRibbitById.js');
const retrieveRibbitsByRange = require('../functions/retrieveRibbitsByRange.js');
const findUserById = require('../functions/findUserById.js');
const getImgByRibbitId = require('../functions/getImgByRibbitId.js');


// ====== FUNCTIONS ======

async function page (req, res) {
    // console.log('POND ACCESSED');
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
        // console.log('NO USER');
        req.logout((err) => {
            res.redirect('/');
        });
        return;
    }

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

    res.json({
        status: 'ok'
    });
}

async function submitRibbit (req, res) {
    let ribbitObj = {};
    if ("body" in req && "content" in req.body) {

        // Text content
        ribbitObj.content = req.body.content || '';

        // Owner assignment
        try {   
            ribbitObj.owner = await getIdFromUser(req.user);
        } catch (err) {
            console.log(err);
        }
        if (!ribbitObj.owner) {
            response.status(400).json({
                msg: 'No user found'
            });
            return;
        }

    } else {
        res.status(400).json({
            msg: 'Error, no body in request'
        });
        return;
    }

    // Submit Ribbit and return its id
    try {
        const ribbitId = await addRibbit(ribbitObj);
        res.json({
            msg: 'success',
            ribbitId: ribbitId
        });
    } catch (err) {
        res.status(400).json({
            msg: 'Error while adding ribbit'
        });
    }
}

async function addRibbitImg (req, res) {

    // Check for a ribbit id
    if (!("ribbitId" in req.params)) {
        res.status(400).json({
            msg: 'Error uploading image, no ribbit id provided'
        });
        return;
    }

    // Verify that ribbit exists
    if (!(await getRibbitById(req.params.ribbitId))) {
        res.status(400).json({
            msg: 'Error finding Ribbit owner'
        });
        return;
    }



    const base64Img = Buffer.from(req.body, 'binary').toString('base64');
    

    try {
        const result = await addRibbitImgToDb(req.params.ribbitId, base64Img);

        if (result === 'success') {
            res.json({
                msg: 'success'
            });
            return;
        } else {
            res.status(400).json({
                msg: 'Error uploading image'
            });
            return;
        }
    } catch (err) {
        console.log(err);
        res.json({
            msg: 'Error uploading image'
        });
        return;
    }

    res.json({
        msg: 'success'
    });
    return;
}

async function submitBio (req, res) {
    
    if (!req.user) {
        res.status(400).json({
            msg: 'Error, user not found'
        });
    }
    
    let pond;
    try {
        pond = await getPondFromUserObj(req.user);
    } catch (err) {
        console.log(err);
    }

    if (!pond) {
        res.status(400).json({
            msg: 'Error, pond not found'
        });
    }

    if (!("newBioText" in req.body) || !(typeof req.body.newBioText === 'string')) {
        res.status(400).json({
            msg: 'Error, bad scheme in request'
        });
        return;
    }

    const sanitizedText = sanitizeString(req.body.newBioText);

    pond.bio = sanitizedText;
    await pond.save();
    res.status(200).json({
        msg: 'Bio saved',
        bio: sanitizedText
    });
}

// This functions get ribbits specifically for the user's own page
async function getRibbits (req, res) {
    console.log('GETTING RIBBITS');

    // Fail conditions
    if (!("range" in req.body) || !("startIndex" in req.body.range)) {
        res.status(400).json({
            msg: 'Bad Request Schema'
        });
        return;
    }

    // Parameters
    const startIndex = req.body.range.startIndex;
    const quantity = ("quantity" in req.body.range)
        ? req.body.range.quantity
        : null
    ;
    

    // Get User Id
    let userId;
    try {
        userId = await getIdFromUser(req.user);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'Error Retrieving User Id'
        });
        return;
    }
    // User fail conditions
    if (!userId) {
        res.status(400).json({
            msg: 'User not found'
        });
        return;
    }

    // Retrieve ribbits within specified range, sorted by date
    let ribbits;
    try {
        ribbits = await retrieveRibbitsByRange(userId, startIndex, quantity);
    } catch (err) {
        console.log(err);
    }

    console.log('RIBBITS');
    console.log(ribbits);

    if (Array.isArray(ribbits)) {
        res.json({
            ribbits
        });
        return;
    } else {
        res.status(400).json({
            msg: 'Could not retrieve Ribbits'
        });
    }
}

async function getPond (req, res) {
    if (!req.user) {
        res.status(400).json({
            msg: 'Error, user not found'
        });
    }

    let pond;
    try {
        pond = await getPondFromUserObj(req.user);
    } catch (err) {
        console.log(err);
    }

    if (pond) {
        res.json(pond);
    } else {
        res.json({});
    }
}

async function idToUsername (req, res) {
    let username;
    try {
        const user = await findUserById(req.params.id);
        
        if (user && "username" in user) {
            username = user.username;
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'Error fetching user'
        });
        return;
    }
    res.json({
        username
    });
}

async function getRibbitImg (req, res) {
    // Assign ribbitId
    let ribbitId;
    try {
        ribbitId = req.body.ribbitId
    } catch (err) { 
        console.log(err);
    }

    if (!ribbitId) {
        res.status(400).json({
            msg: 'Error, ribbitId not found in request'
        });
        return;
    }

    // Get the image objet
    let imgObj;
    try {
        imgObj = await getImgByRibbitId(ribbitId); 
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'Error fetching image'
        });
        return;
    }

    if (imgObj) {
        res.json(imgObj);
    } else {
        res.json({});
    }
}

// ====== EXPORTS ======

module.exports = {
    page,
    uploadCover,
    submitBio,
    getPond,
    submitRibbit,
    addRibbitImg,
    getRibbits,
    idToUsername,
    getRibbitImg
};