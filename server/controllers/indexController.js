// Controller for requests to the index route


// ====== FUNCTIONS ======

function testIndexRoute (req, res) {
    res.render('index');
}


// ====== EXPORTS ======

module.exports = {
    testIndexRoute,
}