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


// ====== RENDER/MAIN ======


initEventListeners();

const root = createRoot(document.querySelector('#reactEntry'));
root.render(<App />);


