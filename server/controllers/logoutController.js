// Controller for logout 


// ====== FUNCTIONS ======

async function logout (req, res) {
    req.logout((err) => {
        if (err) {
            console.log('LOGOUT ERROR');
            console.log(err);
            next(err);
        } else {
            res.redirect('/');
        }
    });
}


// ====== EXPORTS ======

module.exports = {
    logout
}