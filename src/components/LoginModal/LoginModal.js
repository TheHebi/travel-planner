import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import './LoginModal.css';

const LoginModal = ({ loginModalState, loginModalClose }) => {
    return (
        <Modal show={loginModalState} onHide={loginModalClose}>
            <Modal.Header className="loginModalHeader" closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className="loginModalBody">
                <Form>
                    <Form.Group className="mb-3" controlId="loginEmail">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faEnvelope} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="Email" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Password" />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="loginModalFooter d-flex justify-content-center">
                <Button className="loginModalBtn" onClick={loginModalClose}>Login
                </Button>
                <Button className="loginModalCancelBtn" onClick={loginModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal;