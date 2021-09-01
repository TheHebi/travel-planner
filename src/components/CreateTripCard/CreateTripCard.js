import React, { useState, useEffect, useRef } from 'react';
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

    // const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [destination, setDestination] = useState("");
    const [tripName, setTripName] = useState("");
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
        // console.log(startDate);
        // console.log(endDate);
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyBCkCMjgFyX6U9QyzmjTmbOfrUKAd_mO7w",
        language: "en",
        onPlaceSelected: (place) => {
            console.log(place)
            setDestination(place.formatted_address);
            // if (place.address_components[3].long_name === "United States") {
            //     setDestination(place.address_components[0].long_name + ", " + place.address_components[2].short_name + ", " + place.address_components[3].short_name)
            // } else {
            //     setDestination(place.address_components[0].long_name + ", " + place.address_components[3].long_name)
            // }
        },
    });

    const handleCreateTripFormSubmit = e => {
        e.preventDefault();
        console.log('Trip Name: ' + tripName);
        console.log('Destination: ' + destination);
        const formattedStartDate = moment.unix(startDate / 1000).format("MM/DD/YYYY");
        const formattedEndDate = moment.unix(endDate / 1000).format("MM/DD/YYYY");
        console.log('Start Date: ' + formattedStartDate);
        console.log('End Date: ' + formattedEndDate);
        console.log('Username: ' + props.user.username);
        console.log('User ID: ' + props.user.id);

        // TODO: api post route
        api.createTrip({ name: tripName, destination: destination, departure: formattedStartDate, return: formattedEndDate, UserId: props.user.id }, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        }).then(res => {
            console.log(res.data);

        }).catch(err => {
            console.log('error occured');
            console.log(err);
        });

        setDestination("");
        setTripName("");
        setStartDate(null);
        setEndDate(null);
    }

    const toTripOverviewPage = () => {
        window.location.href = '/trips'
    }

    return (
        <>
            <div className="createTripBackground">
                <div className="create-trip-main">
                    <h1 className="mb-5">
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