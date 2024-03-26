// Schema for a ribbit

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const ribbitSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    comments: {
        type: [String],
        default: []
    },
},
{
    timestamps: true
});

const Ribbit = new mongoose.model('ribbits', ribbitSchema);

// ====== EXPORTS ======

module.exports = Ribbit;