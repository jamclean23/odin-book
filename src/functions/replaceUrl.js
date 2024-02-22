// Replaces history with new url

// ====== FUNCTIONS ======

/**
 * 
 * @param {string} newPath - new path without leading '/'
 */
function replaceUrl (newPath = '') {
    window.history.replaceState(null, null, window.location.origin + '/' + newPath);
}

// ====== EXPORTS ======

export default replaceUrl;