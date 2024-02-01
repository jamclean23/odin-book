// Test route for '/test'  requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/testController');


// ====== ROUTES ======

router.get('/', controller.page);


// ====== EXPORTS ======

module.exports = router;