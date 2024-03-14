// Schema for pond

// ====== IMPORTS ======

import mongoose from 'mongoose';

import defaultCover from '../assets/defaultCover.js';

// ====== DEFINITION ======

const pondSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: defaultCover
    }
});

const Pond = new mongoose.model('ponds', pondSchema);


// ====== EXPORTS ======

module.exports = Pond;