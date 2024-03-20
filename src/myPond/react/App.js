// Main app for My Pond page

// ====== IMPORTS ======

// React
import React, { useEffect, useRef, useState } from 'react';

// Components
import SmallHeader from '../../components/SmallHeader/SmallHeader.js';

// Styling
import '../../assets/common.css';
import './App.css';

// Functions
import unsanitizeString from '../../functions/unsanitizeString.js';



// ====== FUNCTIONS ======

function App (props) {

    // == STATE

    const [pondObj, setPondObj] = useState({});
    const hasRendered = useRef(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [aboutTextAreaContent, setAboutTextAreaContent] = useState('');



    // == USE EFFECT

    useEffect(() => {
        if (!hasRendered.current) {
            initPondObj();
            hasRendered.current = true;
        }

    }, []);

    // == FUNCTIONS

    async function initPondObj () {
        // setPondObj(JSON.parse(document.querySelector('#pondInfo').getAttribute('data-content')));
        let pond;
        try {
            const response = await fetch('/pond/get_pond');
            pond = await response.json();
        } catch (err) {
            console.log(err);
        }

        if (pond) {
            setPondObj(pond);
        }
    }

    async function handleCoverImgChange (event) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = async (event) => {
            const base64Img = event.target.result;

            let imgBlob;
            try {
                const response = await fetch(base64Img);
                imgBlob = await response.blob();
            } catch (err) {
                console.log(err);
            }

            if (!imgBlob) {
                return;
            }

            try {
                const response = await fetch('/pond/upload_cover', {
                    method: 'POST',
                    body: imgBlob,
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    }
                });
        
                const result = await response.json();
        
                if (result.status === 'ok') {
                    const pondCopy = Object.assign({}, pondObj);
                    pondCopy.coverImage = base64Img;
                    setPondObj(pondCopy);
                }
            } catch (err) {
                console.log(err);
            }
        };

        reader.readAsDataURL(file);
    }

    function handleAboutTextAreaChange (event) {
        setAboutTextAreaContent(event.target.value);
    }

    function handleEditAboutClick () {
        setAboutTextAreaContent(unsanitizeString(pondObj.bio));
        setIsEditingBio(true);
    }

    function handleCancelEditAboutClick () {
        setIsEditingBio(false);
    }

    async function handleSubmitEditAboutClick () {
        const newBioText = aboutTextAreaContent;
        setIsEditingBio(false);

        try {

            const response = await fetch('/pond/submit_bio', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    "newBioText": newBioText || ''
                })
            });

            const result = await response.json();

            if (result.msg === 'Bio saved') {
                const pondCopy = Object.assign({}, pondObj);
                pondCopy.bio = result.bio;
                setPondObj(pondCopy);
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    // == RENDER

    return (<div className='App'>
        <SmallHeader />
        <main>
            <div className='pondDiv'>
                {/* Pond header */}
                <section>
                    <h1 className='pondHeader'>My Pond</h1>
                </section>

                {/* Cover image */}
                <section className='coverImgWrapper'>
                    <img id='coverImg' src={pondObj.coverImage}/>
                    <button className='changeCoverBtn'>
                        🖉
                        <input onChange={handleCoverImgChange} className='fileInput' type='file' />
                    </button>
                </section>

                {/* Username */}
                <section className='usernameWrapper'>
                    <h2 className='pondUserHeader'>@{pondObj.username}</h2>
                </section>

                {/* Bio */}
                <section className='aboutWrapper'>
                    <div className='aboutHeaderWrapper'>
                        <h2>About Me</h2>
                        {(() => {
                            if (!isEditingBio) {
                                return <button onClick={handleEditAboutClick}>🖉</button>
                            } else {
                                return <>
                                    <button className='checkBtn' onClick={handleSubmitEditAboutClick}>✔</button>
                                    <button className='xBtn' onClick={handleCancelEditAboutClick}>X</button>
                                </>
                            }
                        })()}
                    </div>
                    {(() => {
                        if (isEditingBio) {
                    console.log('Updating pond object');
                            return <textarea onChange={handleAboutTextAreaChange} value={aboutTextAreaContent}></textarea>
                        } else {
                            return <p className='about'>{unsanitizeString(pondObj.bio)}</p>
                        }
                    })()}
                </section>

                {/* Ribbit */}
                <section className='ribbitWrapper'>
                    <h2>What's new?</h2>
                    <textarea placeholder='Type here!'/>
                    <button>Ribbit!</button>
                </section>

                {/* Ribbits */}
                <div className='ribbitsWrapper'></div>
                <h2>Your Ribbits</h2>
                <div className='yourRibbitsWrapper'></div>
            </div>
        </main>
    </div>);
}


// ====== EXPORTS ======

export default App;