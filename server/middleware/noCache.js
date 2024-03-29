// Middleware for turning off caching to the next resource

// ====== FUNCTIONS ======

function noCache (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

// ====== EXPORTS ======

module.exports = noCache;