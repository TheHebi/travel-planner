import React, { useState, useEffect } from 'react';
import ViewTripsCard from '../components/ViewTripsCard/ViewTripsCard';

import viewTripImg from '../images/viewTrip.png';
import earth from '../images/earth.png';
import './ViewTrips.css';
import api from '../utils/api';

export default function ViewTrips(props) {

    const [userTripData, setUserTripData] = useState([]);

    useEffect(() => {
        if (props.user.id) {
            api.getUser(props.user.id).then(res => {
                setUserTripData([...res.data.Trips, ...res.data.SavedTrip]);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [props.user.id]);

    const tripDeleteHandler = async (tripId) => {
        const res = await api.deleteTrip(tripId, {
            headers: {
                authorization: `Bearer ${props.token}`
            }
        });
        if (res.status === 200) {
            api.getUser(props.user.id).then(res => {
                setUserTripData([...res.data.Trips, ...res.data.SavedTrip]);
            })
        } else {
            console.log('Error updating trip');
        }
    };

    const toThatTripHandler = (id) => {
        window.location = `/trips/${id}`
    }

    const toCreateTripHandler = () => {
        window.location = '/createTrip'
    }

    return (
        <div className="viewTripsMain">

            <div className="viewTripsHeaderBox">
                <img className="viewTripsBackgroundImg" src={viewTripImg} />
                <h1 className="viewTripsHeader">Your Trips</h1>
                <img className="earthImg" src={earth} />
            </div>

            <div className="viewTripsCardContainer">
                {(userTripData.length === 0) ?
                    (<div style={{ color: "white" }}><h3>You currently have no trip!</h3></div>)
                    :
                    <>
                        {
                            userTripData.map((tripData, i) =>
                                <ViewTripsCard user={props.user.id} handleDelete={tripDeleteHandler} key={i} userTripData={tripData} toThatTripHandler={toThatTripHandler} />
                            )
                        }
                    </>}
            </div>

            <div>
                <button style={{marginBottom:"40px"}} onClick={toCreateTripHandler} className="btn viewTripPageCreateBtn">
                    Create a New Trip!
                </button>
            </div>
        </div>
    )
}