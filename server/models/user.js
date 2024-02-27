// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String
    },
    admin: Boolean
});

const User = new mongoose.model('users', userSchema);


// ====== EXPORTS ======

module.exports = User;