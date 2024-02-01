// Main app for Index

// ====== IMPORTS ======

// Styling
import './App.css';

// React
import React from 'react';

// Imgs
import ripplLogo from '../assets/rippl-logo-light.png';
import googleLogo from '../assets/google-logo.png';


// ====== FUNCTIONS ======

function App () {

    

    return (
        <div className='App'>

            <section className='logoSection'>
                <img className='ripplLogo' src={ripplLogo}/>
            </section>

            <section className='infoSection'>
                <h1 className='ripplHeader'>RippL</h1>

                <div className='sloganTxtOuterWrapper'>
                    <div className='sloganTxtInnerWrapper'>
                        <p className='sloganTxt connectP'>Connect.</p>
                        <p className='sloganTxt flowP'>Flow.</p>
                        <p className='sloganTxt wanderP'>Wander.</p>
                    </div>
                </div>

                <div className='btnsWrapper'>
                    <a href='auth/google' className='gSignInBtn'>
                        <span className='imgWrapper'><img src={googleLogo}/></span>
                        <span className='textWrapper'>Continue with Google</span>
                    </a>
                </div>

            </section>
        </div>
    );
}


// ====== EXPORTS ======

export default App;