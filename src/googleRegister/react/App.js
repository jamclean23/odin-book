// App for google register page

// ====== IMPORTS ======

// React
import React, { useState, useEffect, useRef } from 'react';

// Styling
import './App.css';

// Images
import loadIcon from '../../assets/load-icon.png';

// Components
import SmallHeader from '../../components/SmallHeader/SmallHeader';

// ====== FUNCTIONS ======

function App (props) {

    // == STATE

    const username = useRef('');
    const [processing, setProcessing] = useState(false);
    const [userInvalid, setUserInvalid] = useState(true);

    // == USE EFFECT

    // Submit Processing
    useEffect(() => {
        if (processing) {
            processSubmit();
        }
    }, [processing]);

    // == FUNCTIONS

    async function processSubmit () {
        const currentUser = username.current;

        // Check if username is valid
        let result = { valid: false };

        try {
            result = await checkUsernameBeforeSubmit(currentUser);
        } catch (err) {
            console.log(err);
        }

        // If valid, submit to server
        if (result.valid) {
            // TEST SLEEP
            // const result = await (() => {
            //     return new Promise((resolve) => {
            //         function lambda () {
            //             resolve('ok');
            //         }
            //         setTimeout(lambda, 3000);
            //     });
            // })();

            let result = { result: '' };

            try {

                const response = await fetch('/auth/google/addUser', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: currentUser })
                });
                result = await response.json();
            } catch (err) {
                console.log('Error occured in adding user');
                console.log(err);
            }
                
            // If server responds ok then account is added, redirect to user homepage
            if (result.result === 'ok') {
                window.location.href = '/pond/' + currentUser;
            }
        }

        // If page has not been redirected then account was not added. Set submit button to default
        setProcessing(false);
    }

    async function checkUsernameBeforeSubmit (toCheck) {

        let result = { valid: false };

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

        return result;
    }

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
            setUserInvalid(!result.valid);
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

    async function handleSubmit () {
        // Start Processing request
        setProcessing(true);
    }

    // == RENDER
    
    return (
        <div className='App'>
            <SmallHeader />
            <main>
                <div className='registerForm'>

                    <h2>Register</h2>

                    <p>You've successfully logged in with Google! Choose a RippL Username to continue.</p>
                    <ul>
                        <li>At least 8 characters</li>
                        <li>Fewer than 15 characters</li>
                        <li>No special characters or spaces</li>
                    </ul>
                    <div className='inputWrapper'>
                        <label>Username</label>
                        <input
                            type='text'
                            onChange={handleUsernameChange}
                        />
                        <span className='usernameErrSpan'></span>
                    </div>

                    <div className='submitBtnWrapper'>
                        {(() => {
                            if (processing) {
                                return <img className='loadIcon' src={loadIcon}/>
                            } else {
                                return <button
                                    className='submitBtn'
                                    type='button'
                                    disabled={userInvalid}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>                                
                            }
                        })()}


                    </div>

                </div>
            </main>
        </div>
    );
}


// ====== EXPORTS ======

export default App;