import React from 'react';
import Moment from 'react-moment';

// FONT AWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlaneDeparture, faPlaneArrival, faCrown, faUser } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Tripoverview.css';

export default function Tripoverview({ trip }) {
    return (
        <>
        {!trip ? ( null ) : (
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

            <div className="travellers-wrapper">
                <h4>The crew:</h4>
                <div className="overview-traveller trip-owner">
                    <FontAwesomeIcon icon={faCrown} size='1x' className='me-2' />
                    {trip.User.username}
                </div>
                {trip.SavedUser.map((traveller, index) => {
                    return (
                        <div className="overview-traveller" key={index}>
                            <FontAwesomeIcon icon={faUser} size='1x' className="me-2" />
                            {traveller.username}
                        </div>
                    )
                })}
            </div>
        </div>
        )}
        </>
    )
}