import React from 'react';
import Logo from '../../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Contact.css';

export default function Contact() {
    return (
        <div className="contact-main" id="contact">
            <div className="contact-header">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-team">


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

            </div>
            <div className="d-flex justify-content-center align-items-center">
                <span className="custom-navlink-text mx-4" href="/"><img src={Logo} width="180" height="60" /></span>
            </div>
            <div className="contact-copyright">
                <p>© 2021 Trips Refocused - All rights reserved.</p>
            </div>
        </div>
    )
}