import React, { useState, useEffect } from 'react';

// FONTAWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
        <>
            <div className="home-main" style={{ height: mainHeight }}>
                <h1 className="text-light">Message to Customer</h1>
                <h3 className="text-light">Message to Customer</h3>
                {/* <a href="/trips">
                <button className="mt-3 home-main-button text-light">
                    Get Started
                    <FontAwesomeIcon icon={faPlaneDeparture} size='1x' className="ms-2" />
                </button>
            </a> */}
                <div>
                    <button onClick={loginModalShow} className="modal-button mx-2" id="loginBtn">Login</button>
                    <button onClick={signupModalShow} className="modal-button mx-2" id="signupBtn">Signup</button>
                </div>
                <a href="/#features" className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
            </div>

            <Modal show={loginModalState} onHide={loginModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={loginModalClose}>
                        Login
                    </Button>
                    <Button variant="secondary" onClick={loginModalClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={signupModalState} onHide={signupModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label><strong>Username</strong></Form.Label>
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={signupModalClose}>
                        Signup
                    </Button>
                    <Button variant="secondary" onClick={signupModalClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}