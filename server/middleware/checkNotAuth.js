// Middleware for checking if the user is logged in.


// ====== FUNCTIONS ======

function checkAuth (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        return next();
    }
}


// ====== EXPORTS ======

module.exports = checkAuth;