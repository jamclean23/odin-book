// Controller for test page

// ====== FUNCTIONS ======

function page (req, res) {
    res.render('test', {user: JSON.stringify(req.user)});
}


// ====== EXPORTS ======

module.exports = {
    page
};