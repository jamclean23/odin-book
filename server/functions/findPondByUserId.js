// Find a Pond by a user's id

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const Pond = require('../models/pond.js');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======

/**
 * @param {String} userId - Id from user in string format
 */
async function findPondByUserId (userId) {
    let pond = {};

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        pond = await Pond.findOne({"owner": userId});
    } catch (err) {
        console.log(err);
    }

    if (pond) {
        return pond;
    } else {
        return null;
    }
}


// ====== EXPORTS ======

module.exports = findPondByUserId;