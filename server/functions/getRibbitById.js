// Return a Ribbit document using its id

// ====== IMPORTS ======

// Mongoose
const Ribbit = require('../models/ribbit.js');
const mongoose = require('mongoose');

// System
const path = require('path');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======

/**
 * 
 * @param {String} ribbitId 
 * @returns Ribbit Document or null
 */
async function getRibbitById (ribbitId) {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const ribbit = await Ribbit.findOne({ "_id": new mongoose.Types.ObjectId(ribbitId) });
        if (ribbit) {
            return ribbit;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
    return null;
}


// ====== EXPORTS ======

module.exports = getRibbitById