// Authentication route

// ====== IMPORTS ======

// Express
const express = require('express');
const router = express.Router();

// Middleware
const sanitizeLoginBody = require('../middleware/login/sanitizeLoginBody.js');
const sanitizeRegisterBody = require('../middleware/register/sanitizeRegisterBody.js');
const checkNotAuth = require('../middleware/checkNotAuth.js');
const checkAuth = require('../middleware/checkAuth.js');

// Routes
const registerRoute = require('../routes/registerRoute.js');

// Controllers
const indexController = require('../controllers/indexController.js');
const authController = require('../controllers/authController.js');

// ====== ROUTING ======

function init (passport) {

    // == COMMON

    router.post('/validateUsername', authController.validateUsername);
    router.get('/logout', authController.logout);
    // == GOOGLE

    router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt : "select_account"
    }));

    router.get('/google/callback',
        passport.authenticate(
            'google',
            { failureRedirect: '/' }),
            (req, res) => {
                // Successful authentication, redirect success.
                res.redirect('/auth/google/login');
            }
    );
    
    router.get('/google/login', checkAuth, authController.googleLogin);
    router.get('/google/register', checkAuth, authController.googleRegister);
    router.post('/google/addUser',checkAuth, authController.googleAddUser);

    // == LOCAL

    // MOVE TO LOGIN CONTROLLER, ADD RENDERING MAIN WITH OPTION MESSAGES
    router.post('/local/login',
    sanitizeLoginBody,
    (req, res) => {
        console.log('AUTHENTICATING');
        passport.authenticate('local', (err, user, options) => {
            if (err) {
                console.log('AUTH ERROR:');
                console.log(err);
            }

            if (user) {
                req.login(user, (err) => {
                    if (err) {
                        console.log('LOGIN ERROR')
                        console.log(err);
                        res.render('index', { errors: [err] });
                    } else {
                        res.redirect('/pond');
                    }
                });
            } else {
                console.log('REASON FOR FAILURE:');
                console.log(options.message);
                indexController.indexPage(req, res, {loginErr: options.message});
                // res.render('index', {error: options.message});
            }
        })(req, res);
    });

    router.use('/local/register', checkNotAuth, registerRoute);


    return router;
}

module.exports = {
    init
};