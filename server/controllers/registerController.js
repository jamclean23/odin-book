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
    console.log('Looking for existing user ...');
    const existingUser = await findUser(req.body.username, req.body.password);

    if (existingUser) {
        // Eventual server side validation goes through this route
        res.redirect('/name-taken');
    } else {
        await addUser(req.body.username, req.body.password);
        res.redirect('/');
    }
}


// ====== EXPORTS ======

module.exports = {
    registerPage,
    processRegister
}