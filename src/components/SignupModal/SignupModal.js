import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import './SignupModal.css';
import api from '../../utils/api';

const SignupModal = ({ signupModalState, signupModalClose }) => {

    const [signupFormState, setSignupFormState] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleSignupFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(signupFormState.password.length);
        // var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        // if (signupFormState.username === "") {
        //     alert("Username cannot be empty.");
        //     return;
        // } else if (!signupFormState.email.match(mailformat)) {
        //     alert("Invalid email format. Please provide valid email");
        //     return;
        // } else if (signupFormState.password.length < 8) {
        //     alert("Password must be more than 8 characters");
        //     return;
        // } else {
            
        // }   
        await api.signup(signupFormState).then(res => {
            console.log(res.data);
        }).catch(err=>{
            console.log('error occured');
            console.log(err);
        });
        setSignupFormState({
            username: "",
            email: "",
            password: ""
        })
    };

    return (
        <Modal show={signupModalState} onHide={signupModalClose}>
            <Modal.Header className="signupModalHeader">
                <Modal.Title><h2><strong>Signup</strong></h2></Modal.Title>
            </Modal.Header>
            <Modal.Body className="signupModalBody">
                <Form onSubmit={handleSignupFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Username</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} size='1x' />
                            </InputGroup.Text>
                            <Form.Control value={signupFormState.username} onChange={(e) => setSignupFormState({ ...signupFormState, username: e.target.value })} type="text" placeholder="Username" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faEnvelope} size='1x' />
                            </InputGroup.Text>
                            <Form.Control value={signupFormState.email} onChange={(e) => setSignupFormState({ ...signupFormState, email: e.target.value })} type="email" placeholder="Email" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faLock} size='1x' />
                            </InputGroup.Text>
                            <Form.Control value={signupFormState.password} onChange={(e) => setSignupFormState({ ...signupFormState, password: e.target.value })} type="password" placeholder="Password" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="signupModalFooter">
                        <Button type="submit" value="signup" className="signupModalBtn mx-2" onClick={signupModalClose}>
                            Signup
                        </Button>
                        <Button className="signupModalCancelBtn mx-2" onClick={signupModalClose}>
                            Cancel
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignupModal;