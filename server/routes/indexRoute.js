// Route for '/' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

const checkNotAuth = require('../middleware/checkNotAuth.js');

const noCache = require('../middleware/noCache.js');

// Controller
const indexController = require('../controllers/indexController.js'); 


// ====== ROUTES ======

router.get('/', checkNotAuth,noCache, indexController.testIndexRoute);


// ====== EXPORTS ======

module.exports = router;