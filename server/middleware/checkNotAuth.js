// Middleware for checking if the user is logged in.


// ====== FUNCTIONS ======

function checkAuth (req, res, next) {
    if (req.isAuthenticated()) {
        // console.log('---------- Check Not Auth Authenticated ---------------');
        if (req.path === '/') {
            res.redirect('/fourOhFour');
            return;
        }
        res.redirect('/');
    } else {
        // console.log('---------- Check Not Auth Not Authenticated ---------------');
        return next();
    }
}


// ====== EXPORTS ======

module.exports = checkAuth;