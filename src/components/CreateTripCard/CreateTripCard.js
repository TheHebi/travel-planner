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
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyBCkCMjgFyX6U9QyzmjTmbOfrUKAd_mO7w",
        onPlaceSelected: (place) => console.log(place),
    });

    return (
        <>
            <div className="create-trip-main">
                <h1>
                    <strong>
                        Create your Trip!
                    </strong>
                </h1>


                <Form>
                    <Form.Group className="mb-3" controlId="destination">
                        <Form.Label><strong>Destination</strong></Form.Label>
                        <InputGroup style={{ width: "40%", height: "45px" }}>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faCity} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="text" ref={bootstrapRef} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="dates">
                        <Form.Label><strong>Dates</strong></Form.Label>
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

                    <Form.Group>
                        <Form.Label><strong>Invite</strong></Form.Label>
                        <InputGroup style={{ width: "40%", height: "45px" }}>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUsers} size='1x' />
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="User Email" />
                            <Button className="inviteUserBtn" onClick="">
                                <FontAwesomeIcon icon={faUserPlus} size='1x' />
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Button className="createTripBtn">
                        Create!
                    </Button>
                    <Link to="/">
                        <Button className="createTripCancelBtn">
                            Cancel
                        </Button>
                    </Link>
                </Form>



                {/* <div>
                    <form>
                        <div className="mb-3">
                            <label for="destination" className="form-label">Destination</label>
                            <input type="email" className="form-control" id="destination" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="date-range" className="form-label">Dates</label>
                            <input type="password" className="form-control" id="date-range" />
                        </div>
                        <div className="mb-3">

                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div> */}
            </div>
        </>
    )
}