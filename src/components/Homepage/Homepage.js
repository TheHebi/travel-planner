import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

// FONTAWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-solid-svg-icons';

import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';

// LOCAL IMPORTS
import './Homepage.css';

export default function Homepage({ setUserContext }) {

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

    // Login and Signup Modal
    const [loginModalState, setLoginModalState] = useState(false);
    const [signupModalState, setSignupModalState] = useState(false);

    const loginModalClose = () => setLoginModalState(false);
    const loginModalShow = () => setLoginModalState(true);
    const signupModalClose = () => setSignupModalState(false);
    const signupModalShow = () => setSignupModalState(true);

    // Login Funtionality
    const [loginFormState, setLoginFormState] = useState({
        username: "",
        password: ""
    });

    const [userState, setUserState] = useState({
        token: "",
        user: {

        }
    });

    useEffect(() => {
        document.title = "Trips Refocused";
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            api.getUser(userId, token).then(res => {
                console.log(res.data)
                setUserState({
                    token: token,
                    user: {
                        email: res.data.email,
                        id: res.data.id,
                        username: res.data.username
                    }
                })
            }).catch(err => {
                console.log('no logged in user');
                setUserState({
                    token: "",
                    user: {}
                })
            })
        } else {
            console.log('no token provided');
        }
    }, [])

    const handleLoginFormSubmit = e => {
        e.preventDefault();
        api.login(loginFormState).then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            setUserState({
                ...userState,
                token: res.data.user.token,
                user: {
                    email: res.data.user.email,
                    username: res.data.user.username,
                }
            })
        }).catch(err => {
            console.log('error occured');
            console.log(err);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setUserState({
                token: "",
                user: {}
            })
        });
        setLoginFormState({
            username: "",
            password: ""
        })
    };

    const handleLogout = () => {
        setUserState({
            token: "",
            user: {}
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <div id="home">
            <div className="home-main" style={{ height: mainHeight }}>
                <h1 className="text-light">Message to Customer</h1>
                <h3 className="mb-4 text-light">Message to Customer</h3>
                {!userState.user?.username ? (<div className="mb-3">
                    <button onClick={loginModalShow} className="modal-button mx-2" id="loginBtn">Login</button>
                    <button onClick={signupModalShow} className="modal-button mx-2" id="signupBtn">Signup</button>
                </div>) : (<div className="d-flex flex-column align-items-center"><h3 style={{ color: "white" }}>Welcome back, {userState.user.username}</h3> <Link to="/createTrip">
                    <button className="modal-button mx-2">
                        Get Started
                        <FontAwesomeIcon icon={faPlaneDeparture} size='1x' className="ms-3" />
                    </button>
                </Link> <button className="logout-button mx-2" onClick={handleLogout}>Logout</button> </div>)}

                <a href="/#features" className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
            </div>

            <LoginModal loginModalState={loginModalState} loginModalClose={loginModalClose} loginFormState={loginFormState} setLoginFormState={setLoginFormState} handleLoginFormSubmit={handleLoginFormSubmit}/>
            <SignupModal signupModalState={signupModalState} signupModalClose={signupModalClose} />

        </div>
    )
}