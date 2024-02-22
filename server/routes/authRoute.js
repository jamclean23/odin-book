// Authentication route

// ====== IMPORTS ======

// Express
const express = require('express');
const router = express.Router();

// Middleware
const sanitizeLoginBody = require('../middleware/login/sanitizeLoginBody.js');
const sanitizeRegisterBody = require('../middleware/register/sanitizeRegisterBody.js');
const checkNotAuth = require('../middleware/checkNotAuth.js');

// Routes
const registerRoute = require('../routes/registerRoute.js');

// Controllers
const indexController = require('../controllers/indexController.js');

// ====== ROUTING ======

function init (passport) {
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

    router.get('/google/callback',
        passport.authenticate(
            'google',
            { failureRedirect: '/' }),
            (req, res) => {
                // Successful authentication, redirect success.
                res.redirect('/test');
            }
    );
    

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
                        res.redirect('/test');
                    }
                });
            } else {
                console.log('REASON FOR FAILURE:');
                console.log(options.message);
                indexController.indexPage(req, res, {loginErr: options.message});
                // res.render('index', {error: options.message});
            }
        })(req, res);
    }
);

    // router.post('/local/login',
    //     sanitizeLoginBody,
    //     passport.authenticate(
    //         'local',
    //         { failureRedirect: '/' }
    //     ),
    //     (req, res) => {
    //         // console.log('******** LOCAL STRATEGY SUCCESS **********');
    //         res.redirect('/test');
    //     }
    // );

    router.use('/local/register', checkNotAuth, registerRoute);


    return router;
}

module.exports = {
    init
};