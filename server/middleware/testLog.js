// Logs incoming request path to the console. Placeholder.


// ====== FUNCTIONS ======

function testLog (req, res, next) {
    console.log(`Incoming request: ${req.path}`);
    next();
}


// ====== EXPORTS ======

module.exports = testLog;
