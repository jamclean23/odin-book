// Controller for requests to register route


// ====== IMPORTS ======

// Functions
const addUser = require('../functions/addUser.js');
const findUser = require('../functions/findUser.js');


// ====== FUNCTIONS ======

function registerPage (req, res) {
    res.render('register');
}

async function processRegister (req, res) {
    const existingUser = await findUser(req.body.email, req.body.password);

    if (existingUser) {
        res.render('register', {errorMessages: { "email": "Username taken" }});
    } else {
        await addUser(req.body.email, req.body.password);
        res.redirect('/login');
    }
}


// ====== EXPORTS ======

module.exports = {
    registerPage,
    processRegister
}