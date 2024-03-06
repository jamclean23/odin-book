// Small form page header

// ====== IMPORTS ======

// React
import React, { useEffect, useRef } from "react";

// Styling
import './SmallHeader.css';

// Images
import logo from '../../assets/rippl-logo-light.png';
import { header } from "express-validator";


// ====== FUNCTIONS ======

function SmallHeader () {

    // == STATE
    
    const hasRendered = useRef(false);

    // == USE EFFECT

    // On mount
    useEffect(() => {

        // If component has rendered before, return. Prevents from running more than once in dev mode
        if (hasRendered.current) {
            return;
        }
        hasRendered.current = true;

        setHeaderCssVar();

    }, []);

    // == FUNCTIONS

    function setHeaderCssVar () {
        const headerHeight = document.querySelector('.SmallHeader').getBoundingClientRect().height + 'px';
        const root = document.querySelector(':root');
        root.style.setProperty('--header-height', headerHeight);
    }


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