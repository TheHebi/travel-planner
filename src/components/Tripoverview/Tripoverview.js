import React from 'react';
import Moment from 'react-moment';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Tripoverview.css';

export default function Tripoverview({trip}) {
    return (
        <div className="overview-wrapper">
            <div className="overview-header">
                <h1>{trip.name}</h1>
                <h2>{trip.destination}</h2>
            </div>
            
            <div className="date-wrapper">
                <FontAwesomeIcon className="mx-3" icon={faPlaneDeparture} size='1x' />
                <Moment className="date-item" format="MMM Do YYYY" date = {trip.departure} />
                <FontAwesomeIcon className="mx-3" icon={faArrowRight} size='1x' />
                <Moment className="date-item" format="MMM Do YYYY" date = {trip.return} />
                <FontAwesomeIcon className="mx-3" icon={faPlaneArrival} size='1x' />
            </div>
        </div>
    )
}