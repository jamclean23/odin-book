// Controller for pond requests

// ====== IMPORTS ======

// ====== FUNCTIONS ======

function page (req, res) {
    console.log(req.user);
    res.send('<p>POND</p>');
}

// ====== EXPORTS ======

module.exports = {
    page
};