import React from 'react';
import Logo from '../../images/Logo.png';
import { Link } from 'react-router-dom';

// LOCAL IMPORTS
import './Contact.css';

export default function Contact() {

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
                <Link className="meet-our-team-button" to="/contactForm">
                    Contact Us
                </Link>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                <img className="contact-logo mb-2" src={Logo} alt="team logo" />
            </div>

            <div className="contact-copyright">
                <p>© 2021 Trips Refocused - All rights reserved.</p>
            </div>
        </div>
    )
}