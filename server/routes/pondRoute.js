// Route for '/pond' level requests


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Middleware
const checkAuth = require('../middleware/checkAuth.js');

// Controller
const controller = require('../controllers/pondController.js');


// ====== ROUTES ======

router.get('/id_to_username/:id', controller.idToUsername);
router.post('/get_ribbit_img', controller.getRibbitImg);
router.get('/get_pond', controller.getPond);
router.post('/get_ribbits', controller.getRibbits);
router.post('/add_ribbit_img/:ribbitId', controller.addRibbitImg);
router.post('/submit_bio', controller.submitBio);
router.post('/upload_cover', checkAuth, controller.uploadCover);
router.post('/submit_ribbit', checkAuth, controller.submitRibbit);
router.use('/:username', checkAuth, controller.page);
router.use('*', checkAuth, controller.page);

// ====== EXPORTS ======

module.exports = router;