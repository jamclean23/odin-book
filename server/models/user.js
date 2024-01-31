// Schema for user authentication pairs

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean
});

const User = new mongoose.model('users', userSchema);


// ====== EXPORTS ======

module.exports = User;