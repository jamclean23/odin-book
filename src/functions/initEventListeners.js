// Event Listeners for Index

// ====== FUNCTIONS ======

/**
 * 
 * @param {Object} window - The browser window instance 
 * @param {Object} document - The DOM to be modified
 * 
 */
function initEventListeners () {
    if (!window) {
        throw new Error('No window object');
    }
    if (!document) {
        throw new Error('No document object');
    }

    updateCssVars();
    window.addEventListener('resize', updateCssVars);
}

function updateCssVars () {
    const root = document.querySelector(':root');

    const height = window.innerHeight + 'px';
    root.style.setProperty('--window-height', height);

    const width = window.innerWidth + 'px';
    root.style.setProperty('--window-width', width);
}


// ====== EXPORTS ======

export default initEventListeners;