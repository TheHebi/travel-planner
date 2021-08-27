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
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#recommendation">Recommendation</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#contact">Contact</Nav.Link>
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}