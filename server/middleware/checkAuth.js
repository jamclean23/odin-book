// Middleware for checking if the user is logged in.


// ====== FUNCTIONS ======

function checkAuth (req, res, next) {
    if (req.isAuthenticated()) {

        // console.log('---------- Check Auth Authenticated ---------------');
        return next();
    } else {
        // console.log('------------ Check Auth Not Authenticated ------------');
        res.redirect('/');
    }
}


// ====== EXPORTS ======

module.exports = checkAuth;