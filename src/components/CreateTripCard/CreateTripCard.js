import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlacesWidget } from 'react-google-autocomplete';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import "./react_dates_overrides.css";

// BOOTSTRAP IMPORTS
import api from '../../utils/api';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { faPlaneSlash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


// LOCAL IMPORTS
import './CreateTripCard.css';

export default function CreateTripCard(props) {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [destination, setDestination] = useState("");
    const [tripName, setTripName] = useState("");
    // const [tripId, setTripId] = useState(null);
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
        apiKey: process.env.REACT_APP_GOOGLE_API,
        language: "en",
        onPlaceSelected: (place) => {
            setDestination(place.formatted_address);
        },
    });

    const handleCreateTripFormSubmit = async (e) => {
        e.preventDefault();
        const formattedStartDate = moment.unix(startDate / 1000).format("MM/DD/YYYY");
        const formattedEndDate = moment.unix(endDate / 1000).format("MM/DD/YYYY");

        try {
            const res = await api.createTrip({ 
                name: tripName,
                destination: destination,
                departure: formattedStartDate,
                return: formattedEndDate,
                UserId: props.user.id
            }, {
                headers: {
                    authorization: `Bearer ${props.token}`
                }
            });

            const budgetRes = await api.createBudget({
                TripId: res.data.id,
                UserId: props.user.id
            }, {
                headers: {
                    authorization: `Bearer ${props.token}`,
                }
            });
    
            if (res.status === 200 && budgetRes.status === 200) {
                window.location.href = `/trips/${res.data.id}`;
            }

            setDestination("");
            setTripName("");
            setStartDate(null);
            setEndDate(null);

        } catch (err) {
            console.log(err)
            alert('Error creating trip...')
        }
    }

    const toViewTripPage = async () => {
        window.location.href = '/viewTrips';
    }

    return (
        <>
            <div className="createTripBackground">
                <div className="create-trip-main">
                    <h1 className="createTripHeader mb-5">
                        Create your Trip!
                    </h1>

                    <Form onSubmit={handleCreateTripFormSubmit}>

                        <Form.Group className="formGroup mb-5" controlId="tripName">
                            <Form.Label className="labelName"><h5>Trip Name</h5></Form.Label>
                            <InputGroup className="inputStyle">
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPencilAlt} size='1x' />
                                </InputGroup.Text>
                                <Form.Control value={tripName} onChange={(e) => setTripName(e.target.value)} type="text" placeholder="Name your Trip!" />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="formGroup mb-5" controlId="destination">
                            <Form.Label className="labelName"><h5>Destination</h5></Form.Label>
                            <InputGroup className="inputStyle">
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCity} size='1x' />
                                </InputGroup.Text>
                                <Form.Control value={destination} onChange={(e) => setDestination(e.target.value)} type="text" ref={bootstrapRef} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="dates">
                            <Form.Label className="labelName"><h5>Dates</h5></Form.Label>
                            <InputGroup className="datePicker-mobile">
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
                                    reopenPickerOnClearDates={true}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-evenly">
                            <Button type="submit" value="createTrip" className="createTripBtn">
                                <FontAwesomeIcon className="createTripBtnIcon" icon={faSuitcase} size='1x' />Create!
                            </Button>
                            <Link to="/">
                                <Button className="createTripCancelBtn">
                                    <FontAwesomeIcon className="createTripCancelBtnIcon" icon={faPlaneSlash} size='1x' />Cancel
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form>
                </div>
            </div>

        </>
    )
}