// Route for '/' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

const noCache = require('../middleware/noCache.js');

// Controller
const indexController = require('../controllers/indexController.js'); 


// ====== ROUTES ======

router.get('/', noCache, indexController.testIndexRoute);


// ====== EXPORTS ======

module.exports = router;