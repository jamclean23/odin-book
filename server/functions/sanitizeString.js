// Replace forbidden characters with html equivalents

// ====== FUNCTIONS ======

function sanitizeString (string) {
    return string
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll(`'`, '&#x27;')
        .replaceAll('/', '&#x2F;')
        .replaceAll('`', '&#96;')
}


// ====== EXPORTS ======

module.exports = sanitizeString;