// Handle errors in body sanitation


// ====== IMPORTS ======

const { validationResult } = require('express-validator');


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
                res.render(failureRoute, {errorMessages});
            }
        } else {
            next();
        }
    }
}


// ====== EXPORTS ======

module.exports = handleSanitizeErrors;