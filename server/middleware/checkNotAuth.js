// Middleware for checking if the user is logged in.


// ====== FUNCTIONS ======

function checkNotAuth (req, res, next) {
    if (req.isAuthenticated()) {
        // console.log('---------- Check Not Auth Authenticated ---------------');

        if (req.path === '/') {
            console.log('Requested index, cannot access. Redirecting to pond');
            res.redirect('/pond');
            return;
        }

        console.log('Redirecting to index');
        res.redirect('/');
    } else {
        // console.log('---------- Check Not Auth Not Authenticated ---------------');
        return next();
    }
}


// ====== EXPORTS ======

module.exports = checkNotAuth;