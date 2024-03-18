// Add a user's document to the database

// ====== IMPORTS ======

// System
const path = require('path');

// Mongoose
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Password hashing
const bcrypt = require('bcryptjs');

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
async function addUser  (username, password) {
    try {
        console.log(`Adding user: ${username}, ${password}`);
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        
        // Error handling cuases trace errors
        // const db = mongoose.connection;
        // db.on('error', () => {
        //     throw new Error("Mongoose Connection Error");
        // });
        
        const newUser = new User({
            username: username,
            password: bcrypt.hashSync(password, 10),
            admin: false
        });

        await newUser.save();

    } catch (err) {
        console.log(err);
    }
}


// ====== EXPORTS ======

module.exports = addUser;