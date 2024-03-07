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
async function addGoogleUser  (username, googleId) {
    if (!username || !googleId) {
        throw new Error('Username or googleId error');
    }
    try {
        console.log(`Adding google user: ${username}`);
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        const db = mongoose.connection;

        // This error handling causes max listeners to overflow
        // db.on('error', () => {
        //     throw new Error("Mongoose Connection Error");
        // });
        
        const newUser = new User({
            username: username,
            admin: false,
            googleId: googleId
        });

        await newUser.save();

    } catch (err) {
        console.log(err);
        throw new Error('Error adding user');
    }
}


// ====== EXPORTS ======

module.exports = addGoogleUser;