import React, { useState } from 'react';

import Logo from '../../images/Logo.png';

// BOOTSTRAP IMPORTS
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

// LOCAL IMPORTS
import './Navigation.css';

export default function Navigation() {
    const [loginModalState, setLoginModalState] = useState(false);
    const [signupModalState, setSignupModalState] = useState(false);

    const loginModalClose = () => setLoginModalState(false);
    const loginModalShow = () => setLoginModalState(true);
    const signupModalClose = () => setSignupModalState(false);
    const signupModalShow = () => setSignupModalState(true);

    return (
        <>
            <Navbar
                expand="lg"
                className="navbar custom-nav fixed-top">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="navbar-container">
                        <Nav className="custom-navbar-items">
                            <div style={{ display: 'flex' }}>
                                <Nav.Link className="custom-navlink-text mx-4" href="/"><img src={Logo} width="180" height="60" /></Nav.Link>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="custom-navlink-list d-flex flex-row align-items-center">
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="/">Home</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#features">Features</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#trending">Trending</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#contact">Contact</Nav.Link>
                                </div>
                                <button onClick={loginModalShow} className="navbar-button mx-2" id="navbarLoginBtn">Login</button>
                                <button onClick={signupModalShow} className="navbar-button mx-2" id="navbarSignupBtn">Signup</button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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
    );
}