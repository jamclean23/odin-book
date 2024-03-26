// Schema for comments

// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITION ======

const commentSchema = mongoose.Schema({
    ownerRibbit: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    }
});

const Comment = mongoose.model('comments', commentSchema);


// ====== EXPORTS ======

module.exports = Comment;