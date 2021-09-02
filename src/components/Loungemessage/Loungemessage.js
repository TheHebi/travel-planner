import React from 'react';
import Moment from 'react-moment';

// LOCAL IMPORTS
import './Loungemessage.css';

export default function Message({ message, user, handleDelete }) {
    // STATE VARIABLES
    // ------------------
    return (
        <div
            className="message-wrapper"
            data-id={message.id}
        >
            <div className="message-content" data-id={message.id}>
                <h6 data-id={message.id}>{message.content}</h6>
                <div className="message-metadata">
                    <p>
                        {message.User.username} -
                        <Moment className="comment-subject-date" format="MMM Do YYYY" date = {message.createdAt} />
                    </p>
                </div>
            </div>
            {message.User.id === user.id ? (
                <button
                    className="message-delete-button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // thanks nate :)
                        handleDelete(message.id)
                    }}
                >
                    ✖️
                </button>
            ) : (
                null
            )}
        </div>
    )
};