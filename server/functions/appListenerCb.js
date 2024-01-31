// Callback for app listener


// ====== FUNCTIONS ======

function appListenerCb (err, port) {
    if (err) {
        throw new Error(err);
    } else {
        console.log(`***** Server listening on port ${port} *****`);
    }
}


// ====== EXPORTS ======

module.exports = appListenerCb;