// App for google register page

// ====== IMPORTS ======

// React
import React, { useState, useEffect, useRef } from 'react';

// Styling
import './App.css';

// Components
import SmallHeader from '../../components/SmallHeader/SmallHeader';

// ====== FUNCTIONS ======

function App (props) {

    // == STATE

    const username = useRef('');


    // == FUNCTIONS

    async function checkUsername (toCheck) {

        let result;

        try {

            const response = await fetch('/auth/validateUsername', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: toCheck })
            });
            result = await response.json();

        } catch (err) {
            console.log(err);
        }

        if (result && toCheck == username.current) {
            console.log(result);
            displayUserErrMsg(result.msg);
        }
    }

    function displayUserErrMsg (errMsg = '') {
        const usernameErrSpan = document.querySelector('.usernameErrSpan');
        
        // Update content
        usernameErrSpan.innerText = errMsg;
        
        // Show or hide depending on whether there is a message
        if (errMsg) {
            usernameErrSpan.style.opacity = '1';
        } else {
            usernameErrSpan.style.opacity = '0';
        }

    }

    function handleUsernameChange (event) {
        username.current = event.target.value;
        checkUsername(event.target.value);
    }

    // == RENDER
    
    return (
        <div className='App'>
            <SmallHeader />
            <main>
                <form className='registerForm'>

                    <h2>Register</h2>

                    <p>You've successfully logged in with Google! Choose a RippL Username to continue.</p>

                    <div className='inputWrapper'>
                        <label>Username</label>
                        <input
                            type='text'
                            onChange={handleUsernameChange}
                        />
                        <span className='usernameErrSpan'></span>
                    </div>

                    <div className='submitBtnWrapper'>

                        <button
                            className='submitBtn'
                            type='button'
                            disabled
                        >
                            Submit
                        </button>

                    </div>

                </form>
            </main>
        </div>
    );
}


// ====== EXPORTS ======

export default App;