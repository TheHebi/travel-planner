import React from 'react';

// BOOTSTRAP IMPORTS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Lounge.css';

export default function Lounge() {
    return (
        <Row style={{marginTop: '20px'}}>
            <Col lg={3}>
                <div className="travellers">
                    <h3 style={{alignSelf: 'center', marginBottom: '18px'}}>Travellers</h3>
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
                        <FontAwesomeIcon icon={faPlusSquare} size='1x' className="me-2" />
                        Invite a Traveller
                    </button>
                </div>
            </Col>
            <Col lg={9}>
                <div className="message-board">
                    <h3 style={{alignSelf: 'center'}}>Thoughts?</h3>
                </div>
            </Col>
        </Row>
    )
}