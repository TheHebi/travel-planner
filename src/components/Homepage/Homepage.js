import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// FONTAWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';

// LOCAL IMPORTS
import './Homepage.css';

export default function Homepage() {
    // states
    // Navbar height: (124px)
    const [mainHeight, setMainHeight] = useState(window.innerHeight);

    // set height
    useEffect(() => {
        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            setMainHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    }, [mainHeight])

    const [loginModalState, setLoginModalState] = useState(false);
    const [signupModalState, setSignupModalState] = useState(false);

    const loginModalClose = () => setLoginModalState(false);
    const loginModalShow = () => setLoginModalState(true);
    const signupModalClose = () => setSignupModalState(false);
    const signupModalShow = () => setSignupModalState(true);

    return (
        <div id="home">
            <div className="home-main" style={{ height: mainHeight }}>
                <h1 className="text-light">Message to Customer</h1>
                <h3 className="mb-4 text-light">Message to Customer</h3>
                <div className="mb-3">
                    <button onClick={loginModalShow} className="modal-button mx-2" id="loginBtn">Login</button>
                    <button onClick={signupModalShow} className="modal-button mx-2" id="signupBtn">Signup</button>
                </div>
                <Link to="/createTrip">
                <button className="modal-button mx-2">
                    Get Started
                    <FontAwesomeIcon icon={faPlaneDeparture} size='1x' className="ms-3" />
                </button>
                </Link>
                <a href="/#features" className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
            </div>

            <LoginModal loginModalState={loginModalState} setLoginModalState={setLoginModalState} loginModalShow={loginModalShow} loginModalClose={loginModalClose}/>
            <SignupModal signupModalState={signupModalState} setSignupModalState={setSignupModalState} signupModalShow={signupModalShow} signupModalClose={signupModalClose}/>

        </div>
    )
}