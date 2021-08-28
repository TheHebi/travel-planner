import React, { useState } from 'react';

import Logo from '../../images/Logo.png';

// BOOTSTRAP IMPORTS
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Navigation.css';

export default function Navigation() {
    // get whether user is on homepage
    const location = window.location.pathname
    const isHome = (location === '/');

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
                                {isHome === true &&
                                <div className="custom-navlink-list d-flex flex-row align-items-center">
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#home">Home</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#features">Features</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#recommendation">Recommendations</Nav.Link>
                                    <Nav.Link className="custom-navlink-text mx-4 text-light" href="#contact">Contact</Nav.Link>
                                </div>
                                }
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}