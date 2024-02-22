// Handle errors in body sanitation


// ====== IMPORTS ======

const { validationResult } = require('express-validator');

// Controllers
const indexController = require('../controllers/indexController.js');

// ====== FUNCTIONS ======



function handleSanitizeErrors (failureRoute) {

    return (req, res, next) => {
        // Get validation errors
        const errors = validationResult(req);

        // Parse messages
        const errorMessages = {};
        
        console.log(errors);

        errors.errors.forEach((error) => {
            errorMessages[error.path] = error.msg;
        });

        if (!errors.isEmpty()) {
            if (failureRoute) {
                indexController.indexPage(req, res, { "registerErr": JSON.stringify({
                    type: 'password err',
                    message: 'Password invalid'
                })});
            }
        } else {
            next();
        }
    }
}


// ====== EXPORTS ======

module.exports = handleSanitizeErrors;