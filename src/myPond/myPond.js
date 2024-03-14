// Entry point for My Pond page

// ====== IMPORTS ======

// React
import React from 'react';
import { createRoot } from 'react-dom/client';

// Functions
import initEventListeners from '../functions/initEventListeners.js';

// App
import App from './react/App.js';


// ====== RENDER/MAIN ======

initEventListeners();

const root = createRoot(document.querySelector('#reactEntry'));
root.render(<App />);