// Middleware for checking if the user is logged in.


// ====== FUNCTIONS ======

function checkAuth (req, res, next) {
    if (req.isAuthenticated()) {
        // console.log('---------- Authenticated ---------------');
        res.redirect('/test');
    } else {
        // console.log('---------- Not Authenticated ---------------');
        return next();
    }
}


// ====== EXPORTS ======

module.exports = checkAuth;