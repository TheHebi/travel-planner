import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import "./react_dates_overrides.css";


// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faPlaneSlash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


// LOCAL IMPORTS
import './CreateTripCard.css';

export default function CreateTripCard() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [calendarStack, setCalendarStack] = useState("horizontal");

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setCalendarStack("vertical");
        } else {
            setCalendarStack("horizontal");
        }
    }, [window.innerWidth]);

    const handleDatesChange = ({ startDate, endDate }) => {
        console.log(startDate);
        console.log(endDate);
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyBCkCMjgFyX6U9QyzmjTmbOfrUKAd_mO7w",
        language: "en",
        onPlaceSelected: (place) => console.log(place),
    });

    return (
        <>
            <div className="createTripBackground">
                <div className="create-trip-main">
                    <h1 className="mb-5">

                        Create your Trip!

                    </h1>


                    <Form className="">

                        <Form.Group className="mb-3" controlId="tripName">
                            <Form.Label><h5>Trip Name</h5></Form.Label>
                            <InputGroup style={{ width: "auto", height: "45px" }}>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPencilAlt} size='1x' />
                                </InputGroup.Text>
                                <Form.Control type="text" placeholder="Name your Trip!"/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destination">
                            <Form.Label><h5>Destination</h5></Form.Label>
                            <InputGroup style={{ width: "auto", height: "45px" }}>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCity} size='1x' />
                                </InputGroup.Text>
                                <Form.Control type="text" ref={bootstrapRef} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dates">
                            <Form.Label><h5>Dates</h5></Form.Label>
                            <InputGroup>
                                <DateRangePicker
                                    startDate={startDate} // momentPropTypes.momentObj or null,
                                    startDateId="trip-start-date" // PropTypes.string.isRequired,
                                    endDate={endDate} // momentPropTypes.momentObj or null,
                                    endDateId="trip-end-date" // PropTypes.string.isRequired,
                                    onDatesChange={handleDatesChange} // PropTypes.func.isRequired,
                                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                                    showDefaultInputIcon={true}
                                    showClearDates={true}
                                    isOutsideRange={() => false}
                                    orientation={calendarStack}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label><h5>Invite</h5></Form.Label>
                            <InputGroup style={{ width: "auto", height: "45px" }}>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUsers} size='1x' />
                                </InputGroup.Text>
                                <Form.Control type="email" placeholder="User Email" />
                                <Button className="inviteUserBtn">
                                    <FontAwesomeIcon icon={faUserPlus} size='1x' />
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-evenly">
                            <Button className="createTripBtn">
                                <FontAwesomeIcon className="createTripBtnIcon" icon={faSuitcase} size='1x' />Create!
                            </Button>
                            <Link to="/">
                                <Button className="createTripCancelBtn">
                                    <FontAwesomeIcon className="createTripBtnIcon" icon={faPlaneSlash} size='1x' />Cancel
                                </Button>
                            </Link>
                        </Form.Group>

                    </Form>
                </div>
            </div>

        </>
    )
}