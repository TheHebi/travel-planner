import React, { useState } from 'react';

// BOOTSTRAP IMPORTS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Lounge.css';
import Message from '../Loungemessage/Loungemessage.js';
// import api from '../../utils/api';

export default function Lounge({ messages, travellers }) {
    const [viewAll, setViewAll] = useState(true);

    const handleCommentClick = (e) => {
        e.preventDefault();
        viewAll ? setViewAll(false) : setViewAll(true)
    }
    const postSubmitHandler = (e) => {
        e.preventDefault();
        const body = {
            title: e.target.elements[0].value,
            content: e.target.elements[2].value,
        }
        // api.createPost(body)
        console.log(body)
    }
    const commentSubmitHandler = (e) => {
        e.preventDefault();
        const body = {
            content: e.target.elements[0].value
        }
        // api.createComment(body)
        console.log(body)
    }

    return (
        <Row style={{marginTop: '20px'}}>
            <Col lg={3}>
                <div className="travellers">
                    <h3 style={{alignSelf: 'center', lineHeight: '1.5em'}}>Travellers</h3>
                    {travellers.map((traveller, index) => {
                        return (
                            <div className="traveller" key={index}>
                                <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                                {traveller.username}
                            </div>
                        )
                    })}
                    <button className="add-traveller-btn">
                        <FontAwesomeIcon icon={faPlusCircle} size='1x' className="me-2" />
                        Invite a Traveller
                    </button>
                </div>
            </Col>
            <Col lg={9}>
                <div className="message-board">
                    <h3>Message Board</h3>
                    {viewAll ? (
                        <div className="messages">
                            {messages.map(message => {
                                return (
                                    <button className="message-button" onClick={handleCommentClick} key={message.id}>
                                        <Message message={message}/>
                                    </button>
                                )}
                            )}
                        </div>
                    ) : (
                        <div className="messages">
                            <button onClick={handleCommentClick}>
                                <FontAwesomeIcon icon={faChevronCircleLeft} size='1x' className="me-2"/>
                                Back
                            </button>
                        </div>
                    )}
                    {viewAll ? (
                        <form id="post-submit-form" className="message-input" onSubmit={postSubmitHandler}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em'}}>
                                <Form.Control type="text" placeholder="Post Title" style={{width: '60%'}} />
                                <button className="add-post-btn" type="submit">
                                    Submit
                                    <FontAwesomeIcon icon={faChevronCircleRight} size='1x' className="ms-2" />
                                </button>
                            </div>
                            <Form.Control as="textarea" rows={3} placeholder="What needs discussing?" />
                        </form>
                    ) : (
                        <form id="comment-submit-form" onSubmit={commentSubmitHandler}>
                            <Form.Control type="text" placeholder="Send a Comment!" />
                        </form>
                    )}
                </div>
            </Col>
        </Row>
    )
}