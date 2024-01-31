// Controller for not found requests

// ====== FUNCTIONS ======

function fourOhFourPage (req, res) {
    res.render('fourOhFour');
}


// ====== EXPORTS ======

module.exports = {
    fourOhFourPage
}