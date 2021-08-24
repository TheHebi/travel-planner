import React from 'react';

// BOOTSTRAP IMPORTS
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Navigation.css';

export default function Navigation() {
    return (
        <Navbar
        expand="lg"
        className="navbar custom-nav">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="navbar-container">
                    <Nav className="custom-navbar-items">
                        <div style={{display: 'flex'}}>
                            <Nav.Link className="custom-navlink-text mx-4" href="/">LOGO</Nav.Link>
                        </div>
                        <div style={{display: 'flex'}}>
                            <Nav.Link className="custom-navlink-text mx-4" href="/">Home</Nav.Link>
                            <Nav.Link className="custom-navlink-text mx-4" href="#features">Features</Nav.Link>
                            <Nav.Link className="custom-navlink-text mx-4" href="#contact">Contact Us</Nav.Link>
                            <button className="navbar-button mx-4">Login</button>
                            <button className="navbar-button mx-4">Sign Up</button>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}