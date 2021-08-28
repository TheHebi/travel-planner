import React from 'react';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Loungemessage.css';

export default function Message({ message }) {
    return (
        <div className="message-wrapper">
            <div className="message-content">
                <h6>{message.content}</h6>
                {message.User.username}
            </div>
            <FontAwesomeIcon icon={faChevronRight} size='1x' />
        </div>
    )
};