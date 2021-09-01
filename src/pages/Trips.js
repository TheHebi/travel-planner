import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// LOCAL IMPORTS
import Tripcard from '../components/Tripcard/Tripcard.js';
import api from '../utils/api.js';

export default function Trips({ user, token }) {
    const { id } = useParams();
    // STATE VARIABLES
    // ---------------
    const [tripData, setTripData] = useState('');
    const [budgetData, setBudgetData] = useState('');

    // GRAB TRIP DATA FROM API
    // ------------------
    useEffect(() => {
        api.getSingleTrip(id).then(res => {setTripData(res.data)});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // GRAB BUDGET DATA FROM API
    // ------------------
    useEffect(() => {
        api.getSingleBudget(id, user.id).then(res => {
            if (res.data) {
                setBudgetData(res.data[0]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // HANDLE ADDING A USER TO TRIP
    const addUser = async (tripId, userId) => {
        const res = await api.addUserToTrip({
            TripId: tripId,
            UserId: userId
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            api.getSingleTrip(id).then(res => {setTripData(res.data)});
        } else {
            alert('Error adding user to trip...');
        };
    }

    return (
        <Tripcard tripData={tripData} budgetData={budgetData} handleUserAdd={addUser} user={user} token={token} />
    )
}