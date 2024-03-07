// Controller for requests to the index route


// ====== FUNCTIONS ======

function testIndexRoute (req, res) {
    res.render('index');
}

function indexPage (req, res, paramsObj = {}) {
    // console.log(paramsObj);
    res.render('index', paramsObj);
}


// ====== EXPORTS ======

module.exports = {
    testIndexRoute,
    indexPage
}