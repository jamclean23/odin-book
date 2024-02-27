// Javasccript for google register page

// ====== IMPORTS ======

// Styling
import './googleRegister.css';

// React
import React from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './react/App.js';

// Functions 
import initEventListeners from '../functions/initEventListeners.js';

// ====== RENDER/MAIN ======

initEventListeners();

const root = createRoot(document.querySelector('#reactEntry'));
root.render(<App />);