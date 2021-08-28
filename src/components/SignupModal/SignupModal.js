import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import './SignupModal.css';


const SignupModal = ({ signupModalState, signupModalClose }) => {
    return (
        <Modal show={signupModalState} onHide={signupModalClose}>
            <Modal.Header className="signupModalHeader" closeButton>
                <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body className="signupModalBody">
                <Form>
                    <Form.Group className="mb-3" controlId="signupUsername">
                        <Form.Label><strong>Username</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Username" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupEmail">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faEnvelope} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="Email" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupPassword">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faLock} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Password" />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="signupModalFooter d-flex justify-content-center">
                <Button className="signupModalBtn" onClick={signupModalClose}>
                    Signup
                </Button>
                <Button className="signupModalCancelBtn" onClick={signupModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignupModal;