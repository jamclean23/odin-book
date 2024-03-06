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
 * @param {String} username - Username
 */
async function findUser  (username) {
    let user = {};

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);

        // This error handling causes max listeners to be exceeded
        // const db = mongoose.connection;
        // db.on('error', () => {
        //     throw new Error("Mongoose Connection Error");
        // });
        
        user = await User.findOne({ "username": username });
        

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

module.exports = findUser;