import React from 'react';
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import './ViewTripsCard.css';



export default function ViewTripsCard({ user, userTripData, handleDelete, toThatTripHandler }) {
    return (
        <>
        {userTripData ? (
        <div data-id={userTripData.id} className="viewTripsCard">
            <div className="cardTripName">
                <h3 >{userTripData.name}</h3>
            </div>

            {(user === userTripData.UserId) ? 
            (<div style={{alignSelf: "center", marginBottom: "10px"}}>
                <span style={{color:"#4d5e85", padding:"5px", borderRadius: "5px", fontWeight:"bolder"}}><FontAwesomeIcon className="me-1" icon={faCrown} size='1x' /> Host</span>
            </div>) :
            (<div style={{alignSelf: "center", marginBottom: "10px"}}><span style={{color: "#4d5e85", padding:"5px", borderRadius: "5px", fontWeight:"bolder"}}><FontAwesomeIcon className="me-1" icon={faIdBadge} size='1x' /> Participant</span></div>)
            }

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
                    toThatTripHandler(userTripData.id)
                }} className="btn tripViewBtn mb-2">
                    View this Trip
                </button>
                {(user === userTripData.UserId) ?
                (<button onClick={(e) => {
                    e.preventDefault()
                    handleDelete(userTripData.id)
                }} className="btn tripDeleteBtn" >
                    Delete this Trip
                </button>) : (<></>)}
            </div>
        </div>
        ) : ( null )}
        </>
    )
}