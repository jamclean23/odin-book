// Route for '/pond' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Middleware
const checkAuth = require('../middleware/checkAuth.js');

// Controller
const controller = require('../controllers/pondController.js');


// ====== ROUTES ======

router.use('/:user', checkAuth, controller.page);
router.use('/*', checkAuth, controller.page);


// ====== EXPORTS ======

module.exports = router;