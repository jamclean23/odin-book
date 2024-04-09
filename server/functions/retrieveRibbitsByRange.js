// Retrieves and returns Ribbits within a specified range, sorted by date

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
 * @param {String} owner - Owner id
 * @param {Number} startIndex - Starting index of items in Ribbits sorted by date (ascending) 
 * @param {Number} quantity - How many Ribbits to retrieve
 * @returns 
 */
async function retrieveRibbitsByRange (owner, startIndex, quantity) {
    // Type checking
    if (!(typeof owner === 'string') || !(typeof startIndex === 'number')) {
        throw new Error('Type error in parameters');
    }
    // Fail conditions
    if (!owner || (startIndex < 0)) {
        throw new Error('Invalid parameters');
    }

    try {
        mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
        let ribbits;
        if (quantity) {

            ribbits = await Ribbit
            .find({ "owner": owner })
            .sort({"createdAt": -1})
            .skip(startIndex)
            .limit(quantity);
            return ribbits;
        } else {
            ribbits = await Ribbit
            .find({ "owner": owner })
            .sort({"createdAt": -1})
            .skip(startIndex)
            return ribbits;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}


// ====== EXPORTS ======

module.exports = retrieveRibbitsByRange;