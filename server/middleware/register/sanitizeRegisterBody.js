// Validation array


// ====== IMPORTS ======

const { check } = require('express-validator');



// ====== FUNCTIONS ======

const reqKeyValidate = [
    check('username').escape().toLowerCase().trim(),
    check('password', 'Password must be at least 8 characters').trim().isLength({ min: 8 }),
]


// ====== EXPORTS ======

module.exports = reqKeyValidate;