// Scheme for images to bbe linked to ribbit posts


// ====== IMPORTS ======

const mongoose = require('mongoose');


// ====== DEFINITIONS ======

const ribbitImgSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    ribbitOwner: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

const RibbitImg = new mongoose.model('ribbitImgs', ribbitImgSchema);


// ====== EXPORTS ======

module.exports = RibbitImg;