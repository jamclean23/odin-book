// Gets image to go with Ribbit post, given the id of the Ribbit

// ====== IMPORTS ======

const mongoose = require('mongoose');

// System
const path = require('path');

const RibbitImg = require('../models/ribbitImg');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======

async function getImgByRibbitId (ribbitId) {
    // Type check
    if (!(typeof ribbitId === 'string')) {
        throw new Error('ribbitId not of type "string"');
    }

    let img = null;

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const result = await RibbitImg.findOne({"ribbitOwner": ribbitId});
        img = result;
    } catch (err) {
        console.log(err);
    }

    return img;
}


// ====== EXPORTS ======

module.exports = getImgByRibbitId;