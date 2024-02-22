// Route for '/login' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Middleware
const sanitizeBody = require('../middleware/login/sanitizeLoginBody.js');
const handleSanitizeErrors = require('../middleware/handleSanitizeErrors.js');

// Controller
const controller = require('../controllers/loginController');


// ====== ROUTES ======


function init (passport) {
    router.get('/', (req, res, next) => {console.log('LOGIN ROUTE'); next()}, controller.loginPage);
    router.post('/', sanitizeBody, handleSanitizeErrors('index'), passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    return router;
}
// ====== EXPORTS ======

module.exports = {
    init
};