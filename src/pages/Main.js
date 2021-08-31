import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

// LOCAL IMPORTS
// import Homepage from '../components/Homepage/Homepage';
import Features from '../components/Features/Features';
import Contact from '../components/Contact/Contact';
import Recommendation from '../components/Recommendation/Recommendation';
import LoginModal from '../components/LoginModal/LoginModal';
import SignupModal from '../components/SignupModal/SignupModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

import './Main.css';

export default function Main(props) {
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

    const handleLoginFormSubmit = e => {
        e.preventDefault();
        api.login(loginFormState).then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            props.setUserState({
                ...props.userState,
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
            props.setUserState({
                token: "",
                user: {}
            })
        });
        setLoginFormState({
            username: "",
            password: ""
        })
    };

    return (
        <div>
            <div id="home">
                <div className="home-main" style={{ height: mainHeight }}>
                    <h1 className="text-light">Message to Customer</h1>
                    <h3 style={{marginBottom:"60px"}} className="text-light">Message to Customer</h3>
                    {!props.user?.username ? (<div className="mb-3">
                        <button onClick={loginModalShow} className="modal-button mx-2" id="loginBtn">Login</button>
                        <button onClick={signupModalShow} className="modal-button mx-2" id="signupBtn">Signup</button>
                    </div>) : (<div className="d-flex flex-column align-items-center"><h3 style={{ color: "white" }}>Welcome back, {props.user.username}</h3> <Link to="/createTrip">
                        <button className="modal-button mx-2">
                            Get Started
                            <FontAwesomeIcon icon={faPlaneDeparture} size='1x' className="ms-3" />
                        </button>
                    </Link> </div>)}

                    <a href="/#features" className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon="" />
                </div>
                <LoginModal loginModalState={loginModalState} loginModalClose={loginModalClose} loginFormState={loginFormState} setLoginFormState={setLoginFormState} handleLoginFormSubmit={handleLoginFormSubmit} />
                <SignupModal signupModalState={signupModalState} signupModalClose={signupModalClose} />
            </div>
            <Features />
            <Recommendation />
            <Contact />
        </div>
    )
}