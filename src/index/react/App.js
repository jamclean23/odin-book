// Main app for Index

// ====== IMPORTS ======

// Styling
import './App.css';

// React
import React, { useState, useEffect } from 'react';

// Imgs
import ripplLogo from '../assets/rippl-logo-light.png';
import googleLogo from '../assets/google-logo.png';

// Components
import SignUpModal from './SignUpModal/SignUpModal.js';


// ====== FUNCTIONS ======

function App () {

    // == VARIABLES
    
    const [showSignUp, setShowSignUp] = useState(false);


    // == USE EFFECT

    // useEffect(() => {
    //     console.log('Sign up modal:');
    //     console.log(showSignUp);
    // }, [showSignUp]);

    // == FUNCTIONS

    function handleSignUpClick () {
        setShowSignUp(true);
    }

    // == RENDER
    
    return (
        <div className='App'>

            <section className='logoSection'>
                <h1 className='ripplHeader'>RippL</h1>
                <div className='ripplLogoWrapper'>
                    <img className='ripplLogo' src={ripplLogo}/>
                </div>
            </section>

            <section className='infoSection'>

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
                    <div className='orDiv'>
                        <span>
                            <div className='orLine'></div>
                        </span>
                        <span>or</span>
                        <span>
                            <div className='orLine'></div>
                        </span>
                    </div>
                    <form action='/auth/local' method='POST' className='signInForm'>
                        <h2>Login</h2>
                        <div className='inputWrapper'>
                            <label>Username</label>
                            <input name='username' type='text'/>
                        </div>
                        <div className='inputWrapper'>
                            <label>Password</label>
                            <input name='password' type='password'/>
                        </div>
                        <div className='submitBtnWrapper'>
                            <button type='submit'>Sign In</button>
                        </div>
                    </form>
                    <div className='signUpDiv'>
                        <span>No account?</span>

                        <a
                            className='signUpLink'
                            onClick={handleSignUpClick}
                        >
                            Sign up
                        </a>

                    </div>
                </div>

            </section>

            { showSignUp 
                ? 
                    <SignUpModal
                        setShowSignUp={setShowSignUp}
                    /> 
                : 
                    ''
            }

        </div>
    );
}


// ====== EXPORTS ======

export default App;