// Add a google user's document to the database

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
 * @param {String} password - Password
 */
async function addGoogleUser  (username) {
    try {
        console.log(`Adding google user: ${username}`);
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const db = mongoose.connection;
        db.on('error', () => {
            throw new Error("Mongoose Connection Error");
        });
        
        const newUser = new User({
            username: username,
            admin: false
        });

        await newUser.save();

    } catch (err) {
        console.log(err);
    }
}


// ====== EXPORTS ======

module.exports = addGoogleUser;