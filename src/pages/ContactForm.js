import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ContactForm.css';

export default function ContactForm() {

    const [contactFormState, setContactFormState] = useState({
        name: "",
        email: "",
        message: ""
    });

    const contactFormSubmitHandler = (e) => {
        e.preventDefault();

        alert("Thank you for submitting your query!")

        setContactFormState({
            name: "",
            email: "",
            message: ""
        });
    }

    return (
        <div className="contactFormMain">
            <h1 className="contactFormHeader">Feel free to send your message!</h1>
            <Form className="contactFormStyle" onSubmit={contactFormSubmitHandler}>
                <div className="contactFormName mb-4">
                    <label className="form-label formFont text-light">Name</label>
                    <input value={contactFormState.name} onChange={(e) => setContactFormState({ ...contactFormState, name: e.target.value })} type="text" className="form-control" placeholder="Name" />
                </div>

                <div className="contactFormEmail mb-4">
                    <label className="form-label formFont text-light">Email</label>
                    <input value={contactFormState.email} onChange={(e) => setContactFormState({ ...contactFormState, email: e.target.value })} type="email" className="form-control" placeholder="Email" />
                </div>

                <div className="contactFormMessage mb-5">
                    <label className="form-label formFont text-light">Message</label>
                    <textarea value={contactFormState.message} onChange={(e) => setContactFormState({ ...contactFormState, message: e.target.value })} className="form-control" placeholder="Message" rows="5"></textarea>
                </div>

                <Form.Group className="contactFormFooter">
                    <Button type="submit" value="send" className="contactSendBtn mx-2">
                        <span className="material-icons sendIcon">
                            send
                        </span>
                        <h5>Send</h5>
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}