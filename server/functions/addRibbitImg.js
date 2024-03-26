// Add a new ribbit post

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const RibbitImg = require('../models/ribbitImg.js');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======

/**
 * 
 * @param {String} ribbitOwner - Id of ribbit post that img belongs to
 * @param {*} base64ImgString  - Base 64 string decoded from blob
 * @returns String - 'success' or 'fail'
 */
async function addRibbitImg (owner, base64ImgString) {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);

        const newRibbitImg = new RibbitImg({
            ribbitOwner: owner,
            img: 'data:image/png;base64,' + base64ImgString
        });
        await newRibbitImg.save();
        return 'success'
    } catch (err) {
        console.log(err);
    }
    return 'fail';
}


// ====== EXPORTS ======

module.exports = addRibbitImg;