// Route for '/logout' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/logoutController.js');


// ====== ROUTES ======

router.use('/', controller.logout);


// ====== EXPORTS ======

module.exports = router;