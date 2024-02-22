// Entry javascript for Index page

// ====== IMPORTS ======

// Styling
import './index.css';

// React
import React from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './react/App';

// Functions
import initEventListeners from '../functions/initEventListeners.js';
import replaceUrl from '../functions/replaceUrl.js';

// ====== RENDER/MAIN ======

replaceUrl();

initEventListeners();

const root = createRoot(document.querySelector('#reactEntry'));
root.render(<App />);


