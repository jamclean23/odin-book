// Sign up modal for index page


// ====== IMPORTS ======

// React
import React from 'react';

// Css
import './SignUpModal.css';

// ====== FUNCTIONS ======

function SignUpModal (props) {

    // == FUNCTIONS

    function handleCloseBtnClick () {
        props.setShowSignUp(false);
    }


    // == RENDER

    return (<div className="SignUpModal">

        <button onClick={handleCloseBtnClick} className='closeBtn'>X</button>

        <form action='/register' method='POST' className='signUpForm'>

            <h2>Register</h2>

            <div className='inputWrapper usernameInputWrapper'>
                <label className='inputLabel'>Username</label>
                <input
                    name='username'
                    className='usernameInput'
                    placeholder='Choose a unique username'
                    type='text'
                />
            </div>

            <div className='inputWrapper passwordInputWrapper'>
                <label className='inputLabel'>Password</label>
                <input
                    name='password'
                    className='passwordInput'
                    type='password'
                />
            </div>
            
            <div className='submitBtnWrapper'>
                <button className='submitBtn' type='submit'>Submit</button>   
            </div>

        </form>

    </div>)
}


// ====== EXPORTS ======

export default SignUpModal;