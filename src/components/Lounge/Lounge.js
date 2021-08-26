import React from 'react';

// BOOTSTRAP IMPORTS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Lounge.css';

export default function Lounge() {
    const postSubmitHandler = (e) => {
        e.preventDefault();
        console.log('post submitted')
    }

    return (
        <Row style={{marginTop: '20px'}}>
            <Col lg={3}>
                <div className="travellers">
                    <h3 style={{alignSelf: 'center', lineHeight: '1.5em'}}>Travellers</h3>
                    <div className="traveller">
                        <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                        User 1 Name
                    </div>
                    <div className="traveller">
                        <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                        Example name 2
                    </div>
                    <div className="traveller">
                        <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                        Another user's name
                    </div>
                    <div className="traveller">
                        <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                        Etc etc etc etc
                    </div>
                    <button className="add-traveller-btn">
                        <FontAwesomeIcon icon={faPlusCircle} size='1x' className="me-2" />
                        Invite a Traveller
                    </button>
                </div>
            </Col>
            <Col lg={9}>
                <div className="message-board">
                    <h3>Message Board</h3>
                    <div className="messages">
                        messages will go here
                    </div>
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
                </div>
            </Col>
        </Row>
    )
}