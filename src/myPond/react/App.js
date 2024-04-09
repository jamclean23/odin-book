// Main app for My Pond page

// ====== IMPORTS ======

// React
import React, { createElement, useEffect, useRef, useState } from 'react';

// Components
import SmallHeader from '../../components/SmallHeader/SmallHeader.js';

// Styling
import '../../assets/common.css';
import './App.css';

// Functions
import unsanitizeString from '../../functions/unsanitizeString.js';
import uniqid from 'uniqid';




// ====== FUNCTIONS ======

function App (props) {

    // == STATE

    const [pondObj, setPondObj] = useState({});
    const hasRendered = useRef(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [aboutTextAreaContent, setAboutTextAreaContent] = useState('');
    const [ribbitImgBlob, setRibbitImgBlob] = useState();
    const [ribbitImgBase64, setRibbitImgBase64] = useState();
    const [ribbitTextArea, setRibbitTextArea] = useState('');
    const [ribbits, setRibbits] = useState([]);
    const [ribbitDivs, setRibbitDivs] = useState([]);



    // == USE EFFECT

    useEffect(() => {
        if (!hasRendered.current) {
            initPondObj();
            initRibbits();
            hasRendered.current = true;
        }
    }, []);

    // Handle Ribbits change
    useEffect(() => {
        updateRibbitsSection();
    }, [ribbits]);

    // log ribbit divs
    useEffect(() => {

    }, [ribbitDivs]);

    // == FUNCTIONS

    async function initRibbits () {
        await addRibbits(0);
    }

    async function addRibbits (startIndex, quantity) {
        const response = await fetch('/pond/get_ribbits', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                range: {
                    startIndex,
                    quantity
                }
            })
        });

        const result = await response.json();

        if ("ribbits" in result) {
            const ribbitsCopy = ribbits.concat(result.ribbits);
            setRibbits(ribbitsCopy);
        }
    }

    async function updateRibbitsSection () {
        
        let newRibbitsArray = [];

        for (let i = 0; i < ribbits.length; i++) {
            const ribbit = ribbits[i];
                
            let newRibbitDiv;
            try {
                newRibbitDiv = await createRibbitDiv(ribbit);
            } catch (err) {
                console.log(err);
            }
            newRibbitsArray.push(newRibbitDiv);

        }

        const ribbitDivsCopy = ribbitDivs.concat(newRibbitsArray);

        setRibbitDivs(ribbitDivsCopy);

    }

    async function createRibbitDiv (ribbitObj) {

        // Get username from ribbitObj
        let username;
        try {
            const response = await fetch(`/pond/id_to_username/${ribbitObj.owner}`);
            const result = await response.json();
            username = result.username;
        } catch (err) {
            console.log(err);
            username = 'Unknown'
        }

        // Fetch any single existing ribbit image
        let ribbitImg;
        try {
            const response = await fetch('/pond/get_ribbit_img', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "ribbitId": ribbitObj._id.toString()
                })
            });
            const result = await response.json();
            if ("img" in result) {
                ribbitImg = result.img;
            }
        } catch (err) {
            console.log(err);
        }

        const newRibbitDiv = <div className='ribbitDiv' key={uniqid()} data-id={ribbitObj._id}>
            <h3>{username}</h3>
            <p>{ribbitObj.content}</p>
            <img className='ribbitImg' src={ribbitImg} />
        </div>
        return newRibbitDiv;

    }

    async function initPondObj () {
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

    async function handleRibbitClick () {
        const ribbitObj = {};

        // Build submission object
        ribbitObj.content = ribbitTextArea;

        // Submit if there's any content and receive the Ribbit id
        let ribbitId;
        if (ribbitObj.content) {
            try {
                const response = await fetch('/pond/submit_ribbit', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(ribbitObj)
                });
                const result = await response.json();
                if ("ribbitId" in result) {
                    ribbitId = result.ribbitId;
                }
            } catch (err) {
                console.log(err);
            }
        }

        // Notify user of error if Ribbit wasn't added
        if (!ribbitId) {
            alert('An error occured while trying to add a Ribbit, Try again later.');
            return;
        }

        // Handle image submission
        if (ribbitImgBlob) {
            let success = false;
            try {
                const response = await fetch(`/pond/add_ribbit_img/${ribbitId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    body: ribbitImgBlob
                })
                const result = response.json();
                if ('msg' in result && result.msg === 'success') {
                    success = true;
                }
            } catch (err) {
                console.log(err);
            }
        }

        // Update
    }

    async function handleChangeRibbitImgBtnClick (event) {
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

            setRibbitImgBase64(event.target.result);
            setRibbitImgBlob(imgBlob);
        };

        reader.readAsDataURL(file);
    }

    function handlePreviewXClick () {
        setRibbitImgBase64();
        setRibbitImgBlob();
    }

    function handleRibbitTextAreaChange (event) {
        setRibbitTextArea(event.target.value);
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
                        <input 
                            onChange={handleCoverImgChange} 
                            className='fileInput' 
                            type='file' 
                            accept='.png'
                        />
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
                                    <button 
                                        className='checkBtn' 
                                        onClick={handleSubmitEditAboutClick}
                                    >✔</button>
                                    <button 
                                        className='xBtn' 
                                        onClick={handleCancelEditAboutClick}
                                    >X</button>
                                </>
                            }
                        })()}
                    </div>
                    {(() => {
                        if (isEditingBio) {
                            return <textarea 
                                        className='editAboutTextArea' 
                                        onChange={handleAboutTextAreaChange} 
                                        value={aboutTextAreaContent}>    
                                    </textarea>
                        } else {
                            return <p className='about'>{unsanitizeString(pondObj.bio)}</p>
                        }
                    })()}
                </section>

                {/* Ribbit */}
                <section className='ribbitWrapper'>
                    <h2>What's new?</h2>
                    {(() => {
                        if (ribbitImgBase64) {
                            return <>
                                <div className='ribbitPreviewWrapper'>
                                    <button onClick={handlePreviewXClick} className='xBtn'>X</button>
                                    <img className='ribbitPreviewImg' src={ribbitImgBase64}/>
                                </div>
                            </>
                        } else {
                            return <>
                                <div className='changeRibbitImgWrapper'>
                                    <label>Add an Image:</label>
                                    <button className='changeRibbitImgBtn'>
                                        +
                                        <input 
                                            onChange={handleChangeRibbitImgBtnClick} 
                                            className='ribbitFileInput' 
                                            type='file'
                                            accept='.png'
                                        />
                                    </button>
                                </div>
                            </>
                        }
                    })()}
                    
                    <textarea 
                        className='ribbitContentTextArea' 
                        onChange={handleRibbitTextAreaChange} 
                        placeholder='Type here!'
                        value={ribbitTextArea}
                    />
                    <button onClick={handleRibbitClick} className='ribbitBtn'>Ribbit!</button>
                </section>

                {/* Ribbits */}
                <div className='ribbitsWrapper'></div>
                <h2>Your Ribbits</h2>
                <div className='yourRibbitsWrapper'>
                    {ribbitDivs}
                </div>
            </div>
        </main>
    </div>);
}


// ====== EXPORTS ======

export default App;