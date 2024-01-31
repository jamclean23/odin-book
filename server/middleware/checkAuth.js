// Middleware for checking if the user is logged in.


// ====== FUNCTIONS ======

function checkAuth (req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Authenticated');
        return next();
    } else {
        console.log('Not Authenticated');
        res.redirect('/login');
    }
}


// ====== EXPORTS ======

module.exports = checkAuth;