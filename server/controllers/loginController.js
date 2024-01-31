// Controller for requests to login route


// ====== FUNCTIONS ======

function loginPage (req, res) {
    res.render('login');
}

function processLogin (req, res) {
    console.log(req.body);
    res.redirect('/');
}


// ====== EXPORTS ======

module.exports = {
    loginPage,
    processLogin
}