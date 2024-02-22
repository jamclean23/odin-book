// Route for '/register' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Middleware
const sanitizeBody = require('../middleware/register/sanitizeRegisterBody.js');
const handleSanitizeErrors = require('../middleware/handleSanitizeErrors.js');

// Controller
const controller = require('../controllers/registerController');


// ====== ROUTES ======

router.get('/', controller.registerPage);
router.post('/', sanitizeBody, handleSanitizeErrors('index'),controller.processRegister);


// ====== EXPORTS ======

module.exports = router;