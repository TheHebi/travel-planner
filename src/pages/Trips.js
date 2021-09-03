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
        if (user) {
            api.getSingleBudget(id, user.id).then(res => {
                if (res.data) {
                    setBudgetData(res.data[0]);
                }
            });
        }
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

        const budgetRes = await api.createBudget({
            TripId: tripId,
            UserId: userId
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200 && budgetRes.status === 200) {
            api.getSingleTrip(id).then(res => {setTripData(res.data)});
        } else {
            alert('Error adding user to trip...');
        };
    }

    // HANDLE CHANGING BUDGET DATA
    const changeBudget = async (budgetId, newTotal) => {
        // axios put request
        const res = await api.updateBudget(budgetId, {
            total: newTotal
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 200) {
            // set on success
            const budgetRes = await api.getSingleBudget(id, user.id);
            setBudgetData(budgetRes.data[0]);
        } else {
            alert('Error connecting to server... please try again later.')
        }
    }

    return (
        <Tripcard
            user={user}
            token={token}

            tripData={tripData}
            budgetData={budgetData}

            changeBudgetTotal={changeBudget}
            handleUserAdd={addUser}
        />
    )
}