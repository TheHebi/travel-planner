import React, { useState } from 'react';
import Logo from '../../images/Logo.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Contact.css';

export default function Contact() {

    const handleContactFormSubmit = e => {
        e.preventDefault();
        alert("Thank you for submitting your query!")
    }

    // Contact Us Modal
    // const [contactModalState, setContactModalState] = useState(false);

    // const contactModalClose = () => setContactModalState(false);
    // const contactModalShow = () => setContactModalState(true);

    return (
        <div className="contact-main" id="contact">
            <div className="contact-header">
                <h1>CONTACT</h1>
            </div>

            <div>
                <Link className="meet-our-team-button" to="/about">
                    Meet Our Team
                </Link>
            </div>

            <div className="contact-us-modal-button">
                <p>Contact Us</p>
            </div>

            {/* <div className="contact-team">
                <div className="fe-be-team">
                    <div className="mb-3">
                        <h3>Front-End Team</h3>
                    </div>
                    <div className="contact-individual">
                        <h5>Kevin Choi</h5>
                        <ul className="contact-list">
                            <li>
                                <FontAwesomeIcon icon={faGithubSquare} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faLinkedinIn} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} size='2x' className="ms-2" />
                            </li>
                        </ul>
                    </div>
                    <div className="contact-individual">
                        <h5>Koppi Kolyvek</h5>
                        <ul className="contact-list">
                            <li>
                                <FontAwesomeIcon icon={faGithubSquare} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faLinkedinIn} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} size='2x' className="ms-2" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="fe-be-team">
                    <div className="mb-3">
                        <h3>Back-End Team</h3>
                    </div>
                    <div className="contact-individual">
                        <h5>Kaleb Muse</h5>
                        <ul className="contact-list">
                            <li>
                                <FontAwesomeIcon icon={faGithubSquare} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faLinkedinIn} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} size='2x' className="ms-2" />
                            </li>
                        </ul>
                    </div>
                    <div className="contact-individual">
                        <h5>Nathaniel Turcotte</h5>
                        <ul className="contact-list">
                            <li>
                                <FontAwesomeIcon icon={faGithubSquare} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faLinkedinIn} size='2x' className="ms-2" />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} size='2x' className="ms-2" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}

            <div className="d-flex justify-content-center align-items-center">
                <img className="contact-logo mb-2" src={Logo} alt="team logo" />
            </div>

            <div className="contact-copyright">
                <p>© 2021 Trips Refocused - All rights reserved.</p>
            </div>
        </div>
    )
}