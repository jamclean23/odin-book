// Main app for Index

// ====== IMPORTS ======

// Styling
import './App.css';

// React
import React from 'react';

// Imgs
import ripplLogo from '../assets/rippl-logo-light.png';


// ====== FUNCTIONS ======

function App () {
    return (
        <div className='App'>
            <div className='logoWrapper'>
                <img src={ripplLogo}/>
            </div>
        </div>
    );
}


// ====== EXPORTS ======

export default App;