import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import './LoginModal.css';

const LoginModal = ({ loginModalState, loginModalClose, loginFormState, setLoginFormState, handleLoginFormSubmit }) => {

    return (
        <>
        <Modal show={loginModalState} onHide={loginModalClose}>
            <Modal.Header className="loginModalHeader">
                <Modal.Title><h2><strong>Login</strong></h2></Modal.Title>
            </Modal.Header>
            <Modal.Body className="loginModalBody">
                <Form onSubmit={handleLoginFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Username</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} size='1x' />
                            </InputGroup.Text>
                            <Form.Control value={loginFormState.username} onChange={(e) => setLoginFormState({...loginFormState, username: e.target.value })} type="text" placeholder="Username" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} size='1x' />
                            </InputGroup.Text>
                            <Form.Control value={loginFormState.password} onChange={(e) => setLoginFormState({...loginFormState, password: e.target.value })} type="password" placeholder="Password" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="loginModalFooter">
                        <Button type="submit" value="login" className="loginModalBtn mx-2" onClick={loginModalClose}>Login
                        </Button>
                        <Button className="loginModalCancelBtn mx-2" onClick={loginModalClose}>
                            Cancel
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default LoginModal;