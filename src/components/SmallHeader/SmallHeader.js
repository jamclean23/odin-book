// Small form page header

// ====== IMPORTS ======

// React
import React from "react";

// Styling
import './SmallHeader.css';

// Images
import logo from '../../assets/rippl-logo-light.png';


// ====== FUNCTIONS ======

function SmallHeader () {
    // == RENDER
    return (
        <header className="SmallHeader">
            <div className="logoWrapper">
                <img className="logo" src={logo}/>
                <h1>RippL</h1>
            </div>
        </header>
    );
}


// ====== EXPORTS ======

export default SmallHeader;