// Add a new ribbit post

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const Ribbit = require('../models/ribbit.js');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======

/**
 * 
 * @param {Object} ribbitObj - Ribbet object to be added
 * @returns Id of ribbit document
 */
async function addRibbit (ribbitObj) {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);

        const newRibbit = new Ribbit(ribbitObj);
        await newRibbit.save();
        return newRibbit.id;
    } catch (err) {
        console.log(err);
    }
}


// ====== EXPORTS ======

module.exports = addRibbit;