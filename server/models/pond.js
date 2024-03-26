// Schema for pond

// ====== IMPORTS ======

const defaultCover = require('../assets/defaultCover.js');

const mongoose = require('mongoose');

// ====== DEFINITION ======

const pondSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: defaultCover
    },
    bio: {
        type: String,
        default: ''
    },
    ribbitIds: [String]
});

const Pond = new mongoose.model('ponds', pondSchema);


// ====== EXPORTS ======

module.exports = Pond;