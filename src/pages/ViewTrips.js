import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import ViewTripsCard from '../components/ViewTripsCard/ViewTripsCard';

import viewTripImg from '../images/viewTrip.png';
import earth from '../images/earth.png';
import './ViewTrips.css';
import api from '../utils/api';

export default function ViewTrips(props) {

    const [userTripData, setUserTripData] = useState([]);

    useEffect(() => {
        api.getUser(props.user.id).then(res => {
            console.log(res.data.Trips);
            setUserTripData(res.data.Trips);
        }).catch(err => {
            console.log(err);
        });
    }, [props.user.id]);

    console.log(userTripData);

    const tripDeleteHandler = async (tripId) => {
        const res = await api.deleteTrip(tripId,{
            headers: {
                authorization: `Bearer ${props.token}`
            }
        });
        if (res.status === 200) {
            api.getUser(props.user.id).then(res => {
                console.log(res.data.Trips);
                setUserTripData(res.data.Trips);
            })
        } else {
            console.log('Error updating trip');
        }
    };

    const toThatTripHandler = (id) => {
        window.location = `/trips/${id}`
    }

    return (
        <div className="viewTripsMain">

            <div className="viewTripsHeaderBox">
                <img className="viewTripsBackgroundImg" src={viewTripImg} />
                <h1 className="viewTripsHeader">Your Trips</h1>
                <img className="earthImg" src={earth} />
            </div>
            <div className="viewTripsCardContainer">
                {userTripData.map((tripData, i) =>
                    <ViewTripsCard handleDelete={tripDeleteHandler} key={i} userTripData={tripData} toThatTripHandler={toThatTripHandler}/>
                )}
            </div>
        </div>
    )
}