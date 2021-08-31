import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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
import api from '../../utils/api';

export default function Lounge({ messages, travellers, user, token }) {
    const { id } = useParams();
    // STATE VARIABLES
    // ---------------
    const [viewAll, setViewAll] = useState(null);
    const [tripComments, setTripComments] = useState(messages);

    // VISUAL CHANGES
    // --------------
    const handleCommentClick = (e) => {
        e.preventDefault();
        setViewAll(e.target)
        console.log(e.target)
        // viewAll ? setViewAll(false) : setViewAll(true)
    }

    const handleExitCommentViewerClick = (e) => {
        e.preventDefault();
        setViewAll(null);
    }

    // CREATE NEW COMMENT ON TRIP
    const postSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            UserId: user.id,
            content: e.target.elements[0].value,
            TripId: id,
        }
        const res = await api.createComment(body, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            const newCommentData = await api.getAllTripComments(id);
            setTripComments(newCommentData.data);
            e.target.elements[0].value = '';
        } else {
            alert('Error posting comment...')
        }
    }

    // CREATE NEW COMMENT ON COMMENT
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
                    {viewAll === null ? (
                        <div className="messages">
                            {tripComments.map(message => {
                                return (
                                    <button className="message-button" onClick={handleCommentClick} key={message.id} message={message}>
                                        <Message message={message}/>
                                    </button>
                                )}
                            )}
                        </div>
                    ) : (
                        <div className="messages">
                            <button onClick={handleExitCommentViewerClick}>
                                <FontAwesomeIcon icon={faChevronCircleLeft} size='1x' className="me-2"/>
                                Back
                            </button>
                            <h6>{tripComments[0].content}</h6>
                            {tripComments[0].User.username}
                        </div>
                    )}
                    {viewAll === null ? (
                        <form id="post-submit-form" onSubmit={postSubmitHandler}>
                            <Form.Control type="text" placeholder="Share your thoughts!" />
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