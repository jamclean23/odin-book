// Route for requests not found


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/fourOhFourController');

// ====== ROUTES ======

router.use(controller.fourOhFourPage);

// ====== EXPORTS ======

module.exports = router;