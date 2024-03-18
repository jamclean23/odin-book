// Add a new pond

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

// Functions
const findUserById = require('./findUserById.js');


// ====== FUNCTIONS ======

/**
 * @param {String} userId - The user's id in string type 
 * @returns {Objecct} The new pond object
 */
async function addPond (userId) {

    if (!userId) {
        throw new Error('No userId provided to addPond function');
    }

    if (typeof userId != 'string') {
        throw new Error('userId must be of type string');
    }

    try {
        await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);

        const user = await findUserById(userId);

        if (!user) {
            throw new Error('Could not retrieve user');
        }

        const newPond = new Pond({
            owner: userId,
            username: user.username
        });
        await newPond.save();
        return newPond;
    } catch (err) {
        console.log(err);
        throw new Error('Error adding pond');
    }

}


// ====== EXPORTS ======

module.exports = addPond;