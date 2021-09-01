import React from 'react';
import Moment from 'react-moment';

import './ViewTripsCard.css';



export default function ViewTripsCard({userTripData, handleDelete, toThatTripHandler}) {
    return (
        <div data-id={userTripData.id} className="viewTripsCard">
            <div className="cardTripName">
                <h1 >{userTripData.name}</h1>
            </div>

            <div className="cityName">
                <span className="material-icons locationIcon me-2">
                    location_city
                </span>
                <p className="pTag">{userTripData.destination}</p>
            </div>

            <div className="tripDuration">
                <span className="material-icons durationIcon me-2">
                    date_range
                </span>
                <p className="pTag"><Moment format="MMM Do YYYY" date={userTripData.departure} />  -  <Moment format="MMM Do YYYY" date={userTripData.return} /></p>
            </div>

            <div className="numberOfTraveler">
                <span className="material-icons groupIcon me-2">
                    group
                </span>
                <p className="pTag">{userTripData.SavedUser.length + 1}</p>
            </div>

            <div className="viewDeleteBtn">
                <button onClick={(e) => {
                    e.preventDefault()
                    toThatTripHandler(userTripData.id)}} className="btn tripViewBtn mb-2">
                    View this Trip
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleDelete(userTripData.id)}} className="btn tripDeleteBtn" >
                    Delete this Trip
                </button>
            </div>
        </div>
    )
}