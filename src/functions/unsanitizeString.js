// Replace html codes with original characters

// ====== FUNCTIONS ======

function sanitizeString (string) {
    if (typeof string === 'string' && string.length) {
        return string
            .replaceAll('&amp;', '&')
            .replaceAll('&lt;', '<')
            .replaceAll('&gt;', '>')
            .replaceAll('&quot;', '"')
            .replaceAll('&#x27;', `'`)
            .replaceAll('&#x2F;', '/')
            .replaceAll('&#96;', '`')
    }
}


// ====== EXPORTS ======

export default sanitizeString;