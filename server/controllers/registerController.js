// Controller for requests to register route


// ====== IMPORTS ======

// Functions
const addUser = require('../functions/addUser.js');
const findUser = require('../functions/findUser.js');

// External controllers
const indexController = require('../controllers/indexController.js');


// ====== FUNCTIONS ======

function registerPage (req, res) {
    res.render('register');
}

async function processRegister (req, res) {
    // console.log('Looking for existing user ...');
    const existingUser = await findUser(req.body.username, req.body.password);

    if (existingUser) {
        indexController.indexPage(req, res, { "registerErr": JSON.stringify({
            type: 'username taken',
            message: 'Username not available'
        })});
    } else if (!req.body.username){
        indexController.indexPage(req, res, { "registerErr": JSON.stringify({
            type: 'username taken',
            message: 'Username not valid'
        })});
    } else if (!req.body.password) {
        indexController.indexPage(req, res, { "registerErr": JSON.stringify({
            type: 'password err',
            message: 'Password invalid'
        })});
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