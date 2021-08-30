import React, { useState } from 'react';

import Logo from '../../images/Logo.png';

// BOOTSTRAP IMPORTS
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarDropdown from 'react-navbar-dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


// LOCAL IMPORTS
import './Navigation.css';

export default function Navigation(props) {
    // get whether user is on homepage
    const location = window.location.pathname
    const isHome = (location === '/');

    const toCreateTripPage = () => {
        window.location = '/createTrip'
    };

    return (
        <div>
            {!props.user?.username ? (<Navbar
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
                                        <Nav.Link className="custom-navlink-text mx-4 text-light" href="#contact">Contact Us</Nav.Link>
                                    </div>
                                }
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>) : (<Navbar
                expand="lg"
                className="navbar custom-nav fixed-top">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="navbar-container">
                        <Nav className="custom-navbar-items">
                            <div style={{ display: 'flex' }}>
                                <Nav.Link className="custom-navlink-text mx-4" href="/"><img src={Logo} width="180" height="60" /></Nav.Link>
                            </div>
                            <div className="mx-3">
                                <span className="navbar-welcome mx-2">Hello, {props.user.username}</span>
                                <NavbarDropdown>
                                    <NavbarDropdown.Toggle className="menu__item">
                                        <NavbarDropdown.Open>
                                            <FontAwesomeIcon style={{color:"white"}} icon={faCaretDown} fixedWidth />
                                        </NavbarDropdown.Open>
                                        <NavbarDropdown.Close>
                                            <FontAwesomeIcon style={{color:"white"}} icon={faCaretUp} fixedWidth />
                                        </NavbarDropdown.Close>
                                    </NavbarDropdown.Toggle>
                                    <NavbarDropdown.CSSTransitionMenu
                                        className="example1-dropdown-menu" timeout={200}
                                    >
                                        <NavbarDropdown.Item className="example1-dropdown-menu-item" onClick={toCreateTripPage}>
                                            <div>
                                                <FontAwesomeIcon icon={faCalendarPlus} fixedWidth />
                                            </div>
                                            <div className="example1-dropdown-menu-item__spacer" />
                                            <div className="example1-dropdown-menu-item__text">Create New Trip</div>
                                        </NavbarDropdown.Item>
                                        <NavbarDropdown.Item className="example1-dropdown-menu-item" onClick={() => alert('Item 2: clicked!')}>
                                            <div>
                                                <FontAwesomeIcon icon={faBookmark} fixedWidth />
                                            </div>
                                            <div className="example1-dropdown-menu-item__spacer" />
                                            <div className="example1-dropdown-menu-item__text">View My Trips</div>
                                        </NavbarDropdown.Item>
                                        <NavbarDropdown.Item className="example1-dropdown-menu-item" onClick={() => alert('Item 3: clicked!')}>
                                            <div>
                                                <FontAwesomeIcon icon={faUserEdit} fixedWidth />
                                            </div>
                                            <div className="example1-dropdown-menu-item__spacer" />
                                            <div className="example1-dropdown-menu-item__text">Edit User Profile</div>
                                        </NavbarDropdown.Item>
                                        <NavbarDropdown.Item className="example1-dropdown-menu-item" onClick={props.handleLogout}>
                                            <div>
                                                <FontAwesomeIcon style={{color:"red"}} icon={faSignOutAlt} fixedWidth />
                                            </div>
                                            <div className="example1-dropdown-menu-item__spacer" />
                                            <div style={{color:"red"}} className="example1-dropdown-menu-item__text">Logout</div>
                                        </NavbarDropdown.Item>
                                    </NavbarDropdown.CSSTransitionMenu>
                                </NavbarDropdown>
                                );
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>)}
        </div>
    );
}