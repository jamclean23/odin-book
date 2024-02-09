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
                    <form className='signInForm'>
                        <h2>Login</h2>
                        <div className='inputWrapper'>
                            <label>Username</label>
                            <input name='username' type='text'/>
                        </div>
                        <div className='inputWrapper'>
                            <label>Password</label>
                            <input name='password' type='text'/>
                        </div>
                        <div className='submitBtnWrapper'>
                            <button type='button'>Sign In</button>
                        </div>
                    </form>
                    <div className='signUpDiv'>
                        <span>No account?</span>
                        <a href='/register'>Sign up</a>
                    </div>
                </div>

            </section>
        </div>
    );
}


// ====== EXPORTS ======

export default App;