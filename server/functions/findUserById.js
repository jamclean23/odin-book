// Find a local users document in the database

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../../../config/.env')
});


// ====== FUNCTIONS ======
/**
 * 
 * @param {String} userId - User's id in string format
 */
async function findUserById  (userId) {
    if (!userId || typeof userId != 'string') {
        return null;
    }

    let user = {};

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        
        user = await User.findOne({ "_id": new mongoose.Types.ObjectId(userId) });
        

    } catch (err) {
        console.log(err);
    }

    if (user) {
        return user;
    } else {
        return null;
    }
}


// ====== EXPORTS ======

module.exports = findUserById;